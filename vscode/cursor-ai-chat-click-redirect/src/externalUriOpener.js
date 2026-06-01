const vscode = require("vscode");
const { logOpenedInExternalApp } = require("./fileFlowLog");
const { serializeUri, serializeValue } = require("./serialize");

const OPENER_ID = "rufat.cursorAiChatClickRedirect.external";

/**
 * @param {vscode.ExtensionContext} context
 */
function registerExternalUriOpener(context) {
  if (typeof vscode.window.registerExternalUriOpener !== "function") {
    return;
  }

  const disposable = vscode.window.registerExternalUriOpener(
    OPENER_ID,
    {
      canOpenExternalUri() {
        return vscode.ExternalUriOpenerPriority.Default;
      },
      async openExternalUri(resolvedUri, ctx) {
        await logOpenedInExternalApp(resolvedUri.toString(), {
          via: "httpLink",
          resolvedUri: serializeUri(resolvedUri),
          context: serializeValue(ctx),
        });
        return vscode.env.openExternal(resolvedUri);
      },
    },
    {
      schemes: ["http", "https"],
      label: "AI Chat Click Redirect",
    }
  );

  context.subscriptions.push(disposable);
}

module.exports = { registerExternalUriOpener, OPENER_ID };
