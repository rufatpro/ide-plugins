const fs = require("fs");
const path = require("path");
const config = require("./config");

/** @type {Promise<void>} */
let writeChain = Promise.resolve();

/**
 * @returns {string}
 */
function getLogPath() {
  return String(config.get("logPath", "") || "").trim();
}

/**
 * @returns {boolean}
 */
function isLoggingEnabled() {
  return getLogPath().length > 0;
}

/**
 * @param {string} event
 * @param {Record<string, unknown>} payload
 * @returns {Promise<void>}
 */
function appendLog(event, payload) {
  const logPath = getLogPath();
  if (!logPath) {
    return Promise.resolve();
  }

  const entry = {
    ts: new Date().toISOString(),
    event,
    ...payload,
  };

  const block =
    "========== AI CHAT CLICK ==========\n" +
    JSON.stringify(entry, null, 2) +
    "\n\n";

  writeChain = writeChain
    .then(() => writeBlock(logPath, block))
    .catch(() => {});
  return writeChain;
}

/**
 * @param {string} logPath
 * @param {string} block
 * @returns {Promise<void>}
 */
async function writeBlock(logPath, block) {
  const dir = path.dirname(logPath);
  await fs.promises.mkdir(dir, { recursive: true });
  await fs.promises.appendFile(logPath, block, "utf8");
}

module.exports = {
  appendLog,
  getLogPath,
  isLoggingEnabled,
};
