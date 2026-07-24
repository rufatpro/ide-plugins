const vscode = require("vscode");
const path = require("path");
const { appendLog } = require("./logWriter");
const {
  logClosedInCursor,
  logOpenedInExternalApp,
} = require("./fileFlowLog");
const {
  openFileInOs,
  findPyCharmExecutable,
  readConfiguredIdePath,
} = require("./osOpen");
const redirectState = require("./redirectState");
const {
  markPendingTabOpen,
  consumePendingTabOpen,
  clearPendingTabOpens,
  pruneExpiredPending,
  normalizeKey,
} = require("./pendingTabOpen");

/** @type {((command: string, ...args: unknown[]) => Thenable<unknown>) | null} */
let originalExecuteCommand = null;

let redirectInProgress = false;

/** @type {string} */
let lastHandledFsPath = "";
/** @type {number} */
let lastHandledTime = 0;

/** @type {number} */
let activatedAtMs = 0;

const DEDUP_MS = 1500;
/** Skip redirects while Cursor restores tabs after startup. */
const STARTUP_GRACE_MS = 800;
/**
 * If chat keeps focus, activeTextEditor may not change. After a new tab opens,
 * retry redirect by tab URI once — do NOT hook onDidOpenTextDocument (that
 * fires on agent/editor loads and wrongly sends files to PyCharm).
 */
const TAB_OPEN_FOCUS_FALLBACK_MS = 150;

/** @param {(command: string, ...args: unknown[]) => Thenable<unknown>} fn */
function setOriginalExecuteCommand(fn) {
  originalExecuteCommand = fn;
}

/** @param {string} fsPath */
function markHandled(fsPath) {
  lastHandledFsPath = normalizeKey(fsPath);
  lastHandledTime = Date.now();
}

/** @param {string} fsPath @returns {boolean} */
function isRecentlyHandled(fsPath) {
  return (
    lastHandledFsPath === normalizeKey(fsPath) &&
    Date.now() - lastHandledTime < DEDUP_MS
  );
}

function resetDedup() {
  lastHandledFsPath = "";
  lastHandledTime = 0;
  clearPendingTabOpens();
}

function inStartupGrace() {
  return activatedAtMs > 0 && Date.now() - activatedAtMs < STARTUP_GRACE_MS;
}

/**
 * @param {vscode.Tab} tab
 * @returns {vscode.Uri | null}
 */
function uriFromOpenedTab(tab) {
  const { input } = tab;
  if (input instanceof vscode.TabInputText) {
    return input.uri;
  }
  if (input instanceof vscode.TabInputTextDiff) {
    return input.modified;
  }
  // Cursor/VS Code may expose plain objects instead of class instances.
  if (input && typeof input === "object") {
    if (input.uri instanceof vscode.Uri) {
      return input.uri;
    }
    if (input.modified instanceof vscode.Uri) {
      return input.modified;
    }
  }
  return null;
}

/**
 * @param {vscode.Uri} uri
 * @returns {vscode.Uri | null}
 */
function asRedirectableLocalFileUri(uri) {
  if (!(uri instanceof vscode.Uri)) {
    return null;
  }
  if (redirectState.shouldRedirectUri(uri)) {
    return uri;
  }
  return null;
}

/**
 * @param {vscode.Uri} uri
 * @returns {vscode.Tab | undefined}
 */
function findTabByUri(uri) {
  const target = normalizeKey(uri.fsPath);
  for (const group of vscode.window.tabGroups.all) {
    for (const tab of group.tabs) {
      const tabUri = uriFromOpenedTab(tab);
      if (tabUri && normalizeKey(tabUri.fsPath) === target) {
        return tab;
      }
    }
  }
  return undefined;
}

/**
 * @param {vscode.Uri} fileUri
 * @param {{ line?: number; source?: string }} [options]
 * @returns {Promise<boolean>}
 */
async function openFileInExternalIde(fileUri, options = {}) {
  const fsPath = path.normalize(fileUri.fsPath);
  const line = options.line && options.line > 0 ? options.line : 1;

  const shellResult = await openFileInOs(fsPath, line);

  await logOpenedInExternalApp(fsPath, {
    line,
    source: options.source || "chatClickRedirect",
    platform: process.platform,
    configuredIde: readConfiguredIdePath(),
    detectedPyCharm: findPyCharmExecutable(),
    redirectExtensions: redirectState.getRedirectExtensions(),
    shellResult,
  });

  return shellResult.ok;
}

async function closeActiveEditorSafely() {
  const cmd =
    originalExecuteCommand ||
    vscode.commands.executeCommand.bind(vscode.commands);
  await cmd("workbench.action.closeActiveEditor");
}

/**
 * @param {vscode.Uri} uri
 * @returns {Promise<void>}
 */
async function closeTabForUri(uri) {
  const tab = findTabByUri(uri);
  if (tab && typeof vscode.window.tabGroups.close === "function") {
    try {
      await vscode.window.tabGroups.close(tab);
      return;
    } catch {
      // fall through
    }
  }

  const active = vscode.window.activeTextEditor;
  if (
    active &&
    normalizeKey(active.document.uri.fsPath) === normalizeKey(uri.fsPath)
  ) {
    await closeActiveEditorSafely();
  }
}

/**
 * Resolve 1-based line from the active editor when it matches the file.
 * @param {vscode.Uri} uri
 * @returns {number}
 */
function lineForUri(uri) {
  const editor = vscode.window.activeTextEditor;
  if (
    editor &&
    normalizeKey(editor.document.uri.fsPath) === normalizeKey(uri.fsPath)
  ) {
    return editor.selection.active.line + 1;
  }
  return 1;
}

/**
 * @param {vscode.Uri} uri
 * @param {string} source
 * @param {{ line?: number }} [options]
 * @returns {Promise<boolean>}
 */
async function redirectUriToExternalIde(uri, source, options = {}) {
  if (!redirectState.isRedirectEnabled() || redirectInProgress || inStartupGrace()) {
    return false;
  }

  const redirectable = asRedirectableLocalFileUri(uri);
  if (!redirectable) {
    return false;
  }

  const fsPath = redirectable.fsPath;
  pruneExpiredPending();

  if (!consumePendingTabOpen(fsPath)) {
    return false;
  }

  if (isRecentlyHandled(fsPath)) {
    return false;
  }

  redirectInProgress = true;

  try {
    const keepTab = redirectState.shouldKeepTabInCursorAfterRedirect();
    const line =
      options.line && options.line > 0 ? options.line : lineForUri(redirectable);

    const opened = await openFileInExternalIde(redirectable, { line, source });
    markHandled(fsPath);

    if (!keepTab) {
      await new Promise((r) => setTimeout(r, 200));
      await logClosedInCursor(redirectable, {
        reason: "afterExternalOpen",
        source,
      });
      await closeTabForUri(redirectable);
    }

    if (!opened) {
      await vscode.window.showWarningMessage(
        `AI Chat Click Redirect: could not open in external IDE: ${path.basename(fsPath)}`
      );
    }

    return opened;
  } finally {
    redirectInProgress = false;
  }
}

/**
 * @param {vscode.TextEditor} editor
 * @param {string} source
 * @returns {Promise<boolean>}
 */
async function redirectEditorToExternalIde(editor, source) {
  return redirectUriToExternalIde(editor.document.uri, source, {
    line: editor.selection.active.line + 1,
  });
}

function flushPendingRedirectForActiveEditor(source) {
  const editor = vscode.window.activeTextEditor;
  if (!editor || redirectInProgress) {
    return;
  }
  redirectEditorToExternalIde(editor, source).catch(() => {});
}

/**
 * After a **new editor tab** opens: mark pending, try active editor, then
 * fall back to the tab URI if chat kept focus (active editor never changes).
 * @param {vscode.Uri} uri
 */
function scheduleRedirectForNewTab(uri) {
  const redirectable = asRedirectableLocalFileUri(uri);
  if (!redirectable || inStartupGrace()) {
    return;
  }
  if (isRecentlyHandled(redirectable.fsPath) || redirectInProgress) {
    return;
  }

  markPendingTabOpen(redirectable.fsPath);

  queueMicrotask(() => {
    flushPendingRedirectForActiveEditor("tabOpened");
  });

  setTimeout(() => {
    if (redirectInProgress || isRecentlyHandled(redirectable.fsPath)) {
      return;
    }
    // Pending still set ⇒ active editor never consumed it (focus stayed in chat).
    redirectUriToExternalIde(redirectable, "tabOpenedChatFocus").catch(() => {});
  }, TAB_OPEN_FOCUS_FALLBACK_MS);
}

/**
 * @param {vscode.ExtensionContext} context
 */
function registerEditorRedirect(context) {
  activatedAtMs = Date.now();

  if (vscode.window.tabGroups?.onDidChangeTabs) {
    context.subscriptions.push(
      vscode.window.tabGroups.onDidChangeTabs((e) => {
        if (inStartupGrace() || !redirectState.isRedirectEnabled()) {
          return;
        }

        /** @type {vscode.Uri[]} */
        const openedUris = [];
        for (const tab of e.opened) {
          const tabUri = uriFromOpenedTab(tab);
          const redirectable = tabUri
            ? asRedirectableLocalFileUri(tabUri)
            : null;
          if (redirectable) {
            openedUris.push(redirectable);
            scheduleRedirectForNewTab(redirectable);
          }
        }

        if (openedUris.length) {
          appendLog("redirect.tabsOpened", {
            paths: openedUris.map((u) => u.fsPath),
            activeFsPath: vscode.window.activeTextEditor?.document.uri.fsPath,
          }).catch(() => {});
        }
      })
    );
  }

  // Intentionally NO onDidOpenTextDocument redirect: that fires when the agent
  // or editor loads a .md/.py into memory and wrongly opens PyCharm.

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (!editor || redirectInProgress || inStartupGrace()) {
        return;
      }
      flushPendingRedirectForActiveEditor("tabOpenedThenActive");
    })
  );
}

module.exports = {
  setOriginalExecuteCommand,
  resetDedup,
  asRedirectableLocalFileUri,
  openFileInExternalIde,
  redirectEditorToExternalIde,
  redirectUriToExternalIde,
  registerEditorRedirect,
};
