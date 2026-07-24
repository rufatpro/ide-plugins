const path = require("path");

/** @type {Map<string, number>} fsPath -> expiresAt */
const pendingByFsPath = new Map();

const PENDING_TTL_MS = 10_000;

/**
 * @param {string} fsPath
 * @returns {string}
 */
function normalizeKey(fsPath) {
  const normalized = path.normalize(fsPath);
  return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}

/**
 * @param {string} fsPath
 */
function markPendingTabOpen(fsPath) {
  pendingByFsPath.set(normalizeKey(fsPath), Date.now() + PENDING_TTL_MS);
}

/**
 * @param {string} fsPath
 * @returns {boolean}
 */
function consumePendingTabOpen(fsPath) {
  const key = normalizeKey(fsPath);
  const expiresAt = pendingByFsPath.get(key);
  if (expiresAt === undefined) {
    return false;
  }
  pendingByFsPath.delete(key);
  return expiresAt >= Date.now();
}

/**
 * @param {string} fsPath
 * @returns {boolean}
 */
function hasPendingTabOpen(fsPath) {
  const key = normalizeKey(fsPath);
  const expiresAt = pendingByFsPath.get(key);
  if (expiresAt === undefined) {
    return false;
  }
  if (expiresAt < Date.now()) {
    pendingByFsPath.delete(key);
    return false;
  }
  return true;
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
  hasPendingTabOpen,
  clearPendingTabOpens,
  pruneExpiredPending,
  normalizeKey,
};
