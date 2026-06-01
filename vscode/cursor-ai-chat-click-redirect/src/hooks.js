const vscode = require("vscode");
const { registerEditorRedirect } = require("./externalRedirect");
const {
  logOpenedInCursor,
  logClosedInCursor,
} = require("./fileFlowLog");

/**
 * @param {vscode.ExtensionContext} context
 */
function installHooks(context) {
  registerEditorRedirect(context);

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((doc) => {
      logOpenedInCursor(doc).catch(() => {});
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidCloseTextDocument((doc) => {
      logClosedInCursor(doc.uri, { reason: "documentClosed" }).catch(() => {});
    })
  );
}

module.exports = { installHooks };
