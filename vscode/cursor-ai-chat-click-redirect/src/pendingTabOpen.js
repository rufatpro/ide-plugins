const path = require("path");

/** @type {Map<string, number>} fsPath -> expiresAt */
const pendingByFsPath = new Map();

const PENDING_TTL_MS = 10_000;

/**
 * @param {string} fsPath
 */
function markPendingTabOpen(fsPath) {
  const key = path.normalize(fsPath);
  pendingByFsPath.set(key, Date.now() + PENDING_TTL_MS);
}

/**
 * @param {string} fsPath
 * @returns {boolean}
 */
function consumePendingTabOpen(fsPath) {
  const key = path.normalize(fsPath);
  const expiresAt = pendingByFsPath.get(key);
  if (expiresAt === undefined) {
    return false;
  }
  pendingByFsPath.delete(key);
  return expiresAt >= Date.now();
}

function clearPendingTabOpens() {
  pendingByFsPath.clear();
}

function pruneExpiredPending() {
  const now = Date.now();
  for (const [key, expiresAt] of pendingByFsPath) {
    if (expiresAt < now) {
      pendingByFsPath.delete(key);
    }
  }
}

module.exports = {
  markPendingTabOpen,
  consumePendingTabOpen,
  clearPendingTabOpens,
  pruneExpiredPending,
};
