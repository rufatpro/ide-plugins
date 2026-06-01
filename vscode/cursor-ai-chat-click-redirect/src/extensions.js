const path = require("path");

/**
 * @param {string} raw
 * @returns {string[]}
 */
function parseRedirectExtensions(raw) {
  if (!raw || typeof raw !== "string") {
    return [];
  }
  return [
    ...new Set(
      raw
        .split(",")
        .map((part) => part.trim().replace(/^\./, "").toLowerCase())
        .filter(Boolean)
    ),
  ];
}

/**
 * @param {string} fsPath
 * @param {string[]} extensions
 * @returns {boolean}
 */
function matchesRedirectExtension(fsPath, extensions) {
  if (!extensions.length || !fsPath) {
    return false;
  }
  const ext = path.extname(fsPath).replace(/^\./, "").toLowerCase();
  return extensions.includes(ext);
}

/**
 * @param {import("vscode").Uri} uri
 * @returns {boolean}
 */
function isLocalFileUri(uri) {
  return uri.scheme === "file";
}

module.exports = {
  parseRedirectExtensions,
  matchesRedirectExtension,
  isLocalFileUri,
};
