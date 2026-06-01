const { appendLog } = require("./logWriter");
const { serializeUri } = require("./serialize");
const redirectState = require("./redirectState");

/** @type {Set<string>} */
const trackedOpenInCursor = new Set();

/**
 * @param {import("vscode").Uri} uri
 * @returns {boolean}
 */
function shouldTrackUri(uri) {
  return redirectState.shouldRedirectUri(uri);
}

/**
 * @param {import("vscode").TextDocument} doc
 * @returns {Promise<void>}
 */
async function logOpenedInCursor(doc) {
  if (!shouldTrackUri(doc.uri)) {
    return;
  }

  trackedOpenInCursor.add(doc.uri.fsPath);

  await appendLog("file.openedInCursor", {
    uri: serializeUri(doc.uri),
    fsPath: doc.uri.fsPath,
    languageId: doc.languageId,
    extension: doc.uri.fsPath.replace(/^.*\./, "").toLowerCase(),
  });
}

/**
 * @param {import("vscode").Uri} uri
 * @param {Record<string, unknown>} [extra]
 * @returns {Promise<void>}
 */
async function logClosedInCursor(uri, extra = {}) {
  if (!shouldTrackUri(uri)) {
    return;
  }

  const wasOpenInCursor = trackedOpenInCursor.has(uri.fsPath);
  trackedOpenInCursor.delete(uri.fsPath);

  await appendLog("file.closedInCursor", {
    uri: serializeUri(uri),
    fsPath: uri.fsPath,
    wasOpenInCursor,
    ...extra,
  });
}

/**
 * @param {string | import("vscode").Uri} target
 * @param {Record<string, unknown>} [extra]
 * @returns {Promise<void>}
 */
async function logOpenedInExternalApp(target, extra = {}) {
  const fsPath =
    typeof target === "string"
      ? target
      : target.fsPath;

  await appendLog("file.openedInExternalApp", {
    fsPath,
    uri:
      typeof target === "string"
        ? undefined
        : serializeUri(target),
    ...extra,
  });
}

function clearTrackedPaths() {
  trackedOpenInCursor.clear();
}

module.exports = {
  logOpenedInCursor,
  logClosedInCursor,
  logOpenedInExternalApp,
  clearTrackedPaths,
};
