const vscode = require("vscode");
const path = require("path");
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
} = require("./pendingTabOpen");

/** @type {((command: string, ...args: unknown[]) => Thenable<unknown>) | null} */
let originalExecuteCommand = null;

let redirectInProgress = false;

/** @type {string} */
let lastHandledFsPath = "";
/** @type {number} */
let lastHandledTime = 0;

const DEDUP_MS = 1500;

/** @param {(command: string, ...args: unknown[]) => Thenable<unknown>} fn */
function setOriginalExecuteCommand(fn) {
  originalExecuteCommand = fn;
}

/** @param {string} fsPath */
function markHandled(fsPath) {
  lastHandledFsPath = fsPath;
  lastHandledTime = Date.now();
}

/** @param {string} fsPath @returns {boolean} */
function isRecentlyHandled(fsPath) {
  return lastHandledFsPath === fsPath && Date.now() - lastHandledTime < DEDUP_MS;
}

function resetDedup() {
  lastHandledFsPath = "";
  lastHandledTime = 0;
  clearPendingTabOpens();
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
 * @param {vscode.TextEditor} editor
 * @param {string} source
 * @returns {Promise<boolean>}
 */
async function redirectEditorToExternalIde(editor, source) {
  if (!redirectState.isRedirectEnabled() || redirectInProgress) {
    return false;
  }

  const uri = asRedirectableLocalFileUri(editor.document.uri);
  if (!uri) {
    return false;
  }

  const fsPath = uri.fsPath;
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
    const line = editor.selection.active.line + 1;

    const opened = await openFileInExternalIde(uri, { line, source });
    markHandled(fsPath);

    if (!keepTab) {
      await new Promise((r) => setTimeout(r, 200));
      await logClosedInCursor(uri, { reason: "afterExternalOpen", source });
      await closeActiveEditorSafely();
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
 * @param {vscode.ExtensionContext} context
 */
function flushPendingRedirectForActiveEditor(source) {
  const editor = vscode.window.activeTextEditor;
  if (!editor || redirectInProgress) {
    return;
  }
  redirectEditorToExternalIde(editor, source).catch(() => {});
}

function registerEditorRedirect(context) {
  if (vscode.window.tabGroups?.onDidChangeTabs) {
    context.subscriptions.push(
      vscode.window.tabGroups.onDidChangeTabs((e) => {
        let marked = false;
        for (const tab of e.opened) {
          const tabUri = uriFromOpenedTab(tab);
          const redirectable = tabUri
            ? asRedirectableLocalFileUri(tabUri)
            : null;
          if (redirectable) {
            markPendingTabOpen(redirectable.fsPath);
            marked = true;
          }
        }
        if (marked) {
          queueMicrotask(() => flushPendingRedirectForActiveEditor("tabOpened"));
        }
      })
    );
  }

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (!editor || redirectInProgress) {
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
  registerEditorRedirect,
};
