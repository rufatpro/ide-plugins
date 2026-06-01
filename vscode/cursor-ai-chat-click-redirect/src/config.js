const vscode = require("vscode");

const SECTION = "cursorAiChatClickRedirect";

/**
 * @param {string} key
 * @param {unknown} defaultValue
 * @returns {unknown}
 */
function get(key, defaultValue) {
  return vscode.workspace.getConfiguration(SECTION).get(key, defaultValue);
}

module.exports = { SECTION, get };
