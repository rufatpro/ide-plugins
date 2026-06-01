const vscode = require("vscode");
const { serializeUri, serializeValue } = require("./serialize");

const AI_CHAT_URI_HINTS = [
  "chat",
  "composer",
  "aichat",
  "cursor",
  "vscode-chat",
  "interactive",
  "copilot",
  "agent",
];

/**
 * @param {vscode.Uri | undefined} uri
 * @returns {boolean}
 */
function uriLooksLikeAiChat(uri) {
  if (!uri) {
    return false;
  }
  const haystack = uri.toString(true).toLowerCase();
  return AI_CHAT_URI_HINTS.some((hint) => haystack.includes(hint));
}

/**
 * @param {vscode.TextEditor | undefined} editor
 * @returns {Record<string, unknown> | undefined}
 */
function serializeEditor(editor) {
  if (!editor) {
    return undefined;
  }
  const doc = editor.document;
  return {
    document: {
      uri: serializeUri(doc.uri),
      languageId: doc.languageId,
      fileName: doc.fileName,
      isUntitled: doc.isUntitled,
      lineCount: doc.lineCount,
    },
    selection: serializeValue(editor.selection),
    viewColumn: editor.viewColumn,
  };
}

/**
 * @returns {Promise<Record<string, unknown>>}
 */
async function captureSnapshot() {
  const activeEditor = vscode.window.activeTextEditor;
  const visibleEditors = vscode.window.visibleTextEditors.map((ed) =>
    serializeEditor(ed)
  );

  /** @type {Record<string, unknown>} */
  const snapshot = {
    env: {
      appName: vscode.env.appName,
      appHost: vscode.env.appHost,
      appRoot: vscode.env.appRoot,
      language: vscode.env.language,
      uriScheme: vscode.env.uriScheme,
      sessionId: vscode.env.sessionId,
    },
    workspace: {
      name: vscode.workspace.name,
      folders: (vscode.workspace.workspaceFolders ?? []).map((f) => ({
        name: f.name,
        index: f.index,
        uri: serializeUri(f.uri),
      })),
    },
    window: {
      activeTextEditor: serializeEditor(activeEditor),
      visibleEditors,
      activeTabGroup: vscode.window.tabGroups.activeTabGroup
        ? {
            viewColumn: vscode.window.tabGroups.activeTabGroup.viewColumn,
            tabs: vscode.window.tabGroups.activeTabGroup.tabs.map((tab) => ({
              label: tab.label,
              input: serializeValue(tab.input),
            })),
          }
        : undefined,
    },
    likelyFromAiChat: {
      activeEditorUri: uriLooksLikeAiChat(activeEditor?.document.uri),
      anyVisibleEditorUri: vscode.window.visibleTextEditors.some((ed) =>
        uriLooksLikeAiChat(ed.document.uri)
      ),
    },
  };

  try {
    const keys = await vscode.commands.getCommands(true);
    snapshot.commandsSample = {
      total: keys.length,
      linkRelated: keys.filter((id) => isLinkRelatedCommand(id)).slice(0, 80),
    };
  } catch {
    // optional
  }

  return snapshot;
}

/**
 * @param {string} command
 * @returns {boolean}
 */
function isLinkRelatedCommand(command) {
  const id = command.toLowerCase();
  return (
    id.includes("open") ||
    id.includes("link") ||
    id.includes("uri") ||
    id.includes("goto") ||
    id.includes("reveal") ||
    id.includes("definition") ||
    id.includes("reference")
  );
}

module.exports = {
  captureSnapshot,
  isLinkRelatedCommand,
  uriLooksLikeAiChat,
};
