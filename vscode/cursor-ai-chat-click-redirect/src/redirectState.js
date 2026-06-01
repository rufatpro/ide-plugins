const vscode = require("vscode");
const config = require("./config");
const {
  parseRedirectExtensions,
  matchesRedirectExtension,
  isLocalFileUri,
} = require("./extensions");

/**
 * @returns {string[]}
 */
function getRedirectExtensions() {
  const raw = String(config.get("redirectFileExtensions", "") || "");
  return parseRedirectExtensions(raw);
}

/**
 * @returns {string}
 */
function getRedirectExtensionsString() {
  return getRedirectExtensions().join(",");
}

/**
 * @returns {boolean}
 */
function isRedirectEnabled() {
  return getRedirectExtensions().length > 0;
}

/**
 * @param {import("vscode").Uri} uri
 * @returns {boolean}
 */
function shouldRedirectUri(uri) {
  if (!isLocalFileUri(uri)) {
    return false;
  }
  return matchesRedirectExtension(uri.fsPath, getRedirectExtensions());
}

/**
 * @returns {boolean}
 */
function shouldKeepTabInCursorAfterRedirect() {
  if (!isRedirectEnabled()) {
    return false;
  }
  return Boolean(config.get("keepTabInCursorAfterRedirect", false));
}

/**
 * @param {string} raw
 * @returns {Promise<void>}
 */
async function setRedirectFileExtensions(raw) {
  const normalized = parseRedirectExtensions(raw).join(",");
  await vscode.workspace
    .getConfiguration(config.SECTION)
    .update(
      "redirectFileExtensions",
      normalized,
      vscode.ConfigurationTarget.Global
    );
}

module.exports = {
  getRedirectExtensions,
  getRedirectExtensionsString,
  isRedirectEnabled,
  shouldRedirectUri,
  shouldKeepTabInCursorAfterRedirect,
  setRedirectFileExtensions,
};
