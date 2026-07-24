const vscode = require("vscode");
const { appendLog } = require("./logWriter");
const { serializeUri, serializeValue } = require("./serialize");

const OPENER_ID = "rufat.cursorAiChatClickRedirect.external";

/**
 * Optional http(s) logging via proposed API.
 * Cursor 3.x blocks proposed `externalUriOpener` for third-party extensions —
 * must never throw, or activate() aborts and status bar/commands never register.
 * @param {vscode.ExtensionContext} context
 */
function registerExternalUriOpener(context) {
  if (typeof vscode.window.registerExternalUriOpener !== "function") {
    return;
  }

  try {
    const disposable = vscode.window.registerExternalUriOpener(
      OPENER_ID,
      {
        canOpenExternalUri() {
          return vscode.ExternalUriOpenerPriority.Default;
        },
        async openExternalUri(resolvedUri, ctx) {
          await appendLog("httpLink", {
            via: "externalUriOpener",
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
  } catch (err) {
    appendLog("redirect.externalUriOpenerSkipped", {
      reason: err instanceof Error ? err.message : String(err),
    }).catch(() => {});
  }
}

module.exports = { registerExternalUriOpener, OPENER_ID };
