const vscode = require("vscode");
const fs = require("fs");
const { appendLog, getLogPath } = require("./logWriter");
const { installHooks } = require("./hooks");
const { registerExternalUriOpener } = require("./externalUriOpener");
const { captureSnapshot } = require("./contextSnapshot");
const redirectState = require("./redirectState");
const { setOriginalExecuteCommand, resetDedup } = require("./externalRedirect");
const { clearTrackedPaths } = require("./fileFlowLog");
const { SECTION } = require("./config");

/**
 * @param {vscode.StatusBarItem} bar
 */
function refreshStatusBar(bar) {
  const exts = redirectState.getRedirectExtensionsString();
  const on = redirectState.isRedirectEnabled();
  bar.text = on
    ? `$(link-external) ${exts} → OS`
    : "$(circle-slash) redirect off";
  bar.tooltip = on
    ? `OS redirect for: ${exts} (click to edit)`
    : "Redirect off (click to set extensions, e.g. py,js,md)";
  bar.backgroundColor = on
    ? new vscode.ThemeColor("statusBarItem.warningBackground")
    : undefined;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  setOriginalExecuteCommand(vscode.commands.executeCommand.bind(vscode.commands));

  installHooks(context);
  // Must not throw: proposed externalUriOpener is blocked in current Cursor builds.
  try {
    registerExternalUriOpener(context);
  } catch (err) {
    appendLog("redirect.externalUriOpenerSkipped", {
      reason: err instanceof Error ? err.message : String(err),
    }).catch(() => {});
  }

  const bar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    90
  );
  bar.command = "cursorAiChatClickRedirect.editRedirectExtensions";
  refreshStatusBar(bar);
  bar.show();
  context.subscriptions.push(bar);

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(SECTION)) {
        refreshStatusBar(bar);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "cursorAiChatClickRedirect.editRedirectExtensions",
      async () => {
        const current = redirectState.getRedirectExtensionsString();
        const value = await vscode.window.showInputBox({
          title: "OS redirect file extensions",
          prompt: "Comma-separated, no dot. Empty disables redirect.",
          value: current,
          placeHolder: "py,js,md",
        });
        if (value === undefined) {
          return;
        }
        await redirectState.setRedirectFileExtensions(value);
        resetDedup();
        clearTrackedPaths();
        refreshStatusBar(bar);
        const normalized = redirectState.getRedirectExtensionsString();
        await vscode.window.showInformationMessage(
          normalized
            ? `OS redirect enabled for: ${normalized}`
            : "OS redirect disabled"
        );
        await appendLog("redirect.extensions", {
          redirectFileExtensions: normalized,
        });
      }
    ),

    vscode.commands.registerCommand(
      "cursorAiChatClickRedirect.openLogFile",
      async () => {
        const logPath = getLogPath();
        if (!logPath) {
          await vscode.window.showWarningMessage(
            "AI Chat Click Redirect: set cursorAiChatClickRedirect.logPath to enable logging."
          );
          return;
        }
        const logUri = vscode.Uri.file(logPath);
        try {
          await fs.promises.access(logPath);
        } catch {
          await appendLog("redirect.logCreated", {});
        }
        await vscode.commands.executeCommand("vscode.open", logUri);
      }
    ),

    vscode.commands.registerCommand(
      "cursorAiChatClickRedirect.clearLog",
      async () => {
        const logPath = getLogPath();
        if (!logPath) {
          await vscode.window.showWarningMessage(
            "AI Chat Click Redirect: set cursorAiChatClickRedirect.logPath to enable logging."
          );
          return;
        }
        await fs.promises
          .writeFile(logPath, "", "utf8")
          .catch(async () => {
            await fs.promises.mkdir(require("path").dirname(logPath), {
              recursive: true,
            });
            await fs.promises.writeFile(logPath, "", "utf8");
          });
        clearTrackedPaths();
        await vscode.window.showInformationMessage(`Log cleared: ${logPath}`);
      }
    ),

    vscode.commands.registerCommand(
      "cursorAiChatClickRedirect.testLog",
      async () => {
        const logPath = getLogPath();
        if (!logPath) {
          await vscode.window.showWarningMessage(
            "AI Chat Click Redirect: set cursorAiChatClickRedirect.logPath to enable logging."
          );
          return;
        }
        await appendLog("redirect.test", {
          redirectFileExtensions: redirectState.getRedirectExtensionsString(),
          keepTabInCursorAfterRedirect:
            redirectState.shouldKeepTabInCursorAfterRedirect(),
          snapshot: await captureSnapshot(),
        });
        await vscode.window.showInformationMessage(`Wrote test entry to ${logPath}`);
      }
    )
  );

  appendLog("redirect.activate", {
    extensionId: context.extension.id,
    redirectFileExtensions: redirectState.getRedirectExtensionsString(),
    keepTabInCursorAfterRedirect:
      redirectState.shouldKeepTabInCursorAfterRedirect(),
    logPath: getLogPath(),
  }).catch(() => {});
}

function deactivate() {}

module.exports = { activate, deactivate };
