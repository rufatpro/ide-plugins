const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const config = require("./config");
const { appendLog } = require("./logWriter");

/**
 * Spawn resolves as soon as the OS process starts, so a working-looking
 * "ok: true" can still hide a CLI arg mismatch that makes the target app
 * exit immediately (e.g. JetBrains launchers rejecting unknown flags).
 * When `diagnostics` is set, stderr/exit code are captured and, on a
 * non-zero exit shortly after launch, logged separately for troubleshooting.
 * @param {string} command
 * @param {string[]} args
 * @param {string} method
 * @param {boolean} [diagnostics]
 * @returns {Promise<{ ok: boolean; method: string; error?: string }>}
 */
function spawnDetached(command, args, method, diagnostics = false) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (/** @type {{ ok: boolean; method: string; error?: string }} */ result) => {
      if (settled) {
        return;
      }
      settled = true;
      resolve(result);
    };

    const child = spawn(command, args, {
      detached: true,
      stdio: diagnostics ? ["ignore", "ignore", "pipe"] : "ignore",
      windowsHide: true,
      shell: false,
    });

    let stderr = "";
    if (diagnostics && child.stderr) {
      child.stderr.on("data", (chunk) => {
        stderr += chunk.toString();
      });
    }

    if (diagnostics) {
      child.on("exit", (code, signal) => {
        if (code !== 0 && code !== null) {
          appendLog("redirect.ideProcessExitedWithError", {
            method,
            command,
            args,
            exitCode: code,
            signal,
            stderr: stderr.slice(0, 2000),
          }).catch(() => {});
        }
      });
    }

    child.on("error", (err) => {
      finish({ ok: false, method, error: err.message });
    });

    child.on("spawn", () => {
      child.unref();
      finish({ ok: true, method });
    });

    // If spawn event did not fire within 400 ms, assume success (process may already be running).
    setTimeout(() => {
      finish({ ok: true, method, error: "spawn timeout — assumed ok" });
    }, 400);
  });
}

/**
 * @returns {string | null}
 */
function readConfiguredIdePath() {
  const custom = String(config.get("externalIdePath", "") || "").trim();
  if (custom && fs.existsSync(custom)) {
    return custom;
  }
  return null;
}

/**
 * @returns {string | null}
 */
function findPyCharmExecutable() {
  /** @type {string[]} */
  const roots = [];

  // Use LOCALAPPDATA (not LOCALAPDATA).
  const localAppData = process.env.LOCALAPPDATA;
  const programFiles = process.env.ProgramFiles;
  const programFilesX86 = process.env["ProgramFiles(x86)"];

  if (localAppData) {
    roots.push(path.join(localAppData, "Programs"));
    roots.push(path.join(localAppData, "JetBrains", "Toolbox", "apps"));
  }
  if (programFiles) {
    roots.push(path.join(programFiles, "JetBrains"));
  }
  if (programFilesX86) {
    roots.push(path.join(programFilesX86, "JetBrains"));
  }

  /** @type {string[]} */
  const candidates = [];

  for (const root of roots) {
    if (!fs.existsSync(root)) {
      continue;
    }
    collectPyCharmBins(root, candidates, 0, 4);
  }

  candidates.sort((a, b) => b.length - a.length);
  return candidates.find((p) => fs.existsSync(p)) || null;
}

/**
 * @param {string} dir
 * @param {string[]} out
 * @param {number} depth
 * @param {number} maxDepth
 */
function collectPyCharmBins(dir, out, depth, maxDepth) {
  if (depth > maxDepth) {
    return;
  }
  /** @type {import("fs").Dirent[]} */
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isFile()) {
      if (/^pycharm64?\.exe$/i.test(entry.name)) {
        out.push(full);
      }
      continue;
    }
    if (!entry.isDirectory()) {
      continue;
    }
    if (entry.name === "bin") {
      for (const exe of ["pycharm64.exe", "pycharm.exe"]) {
        const binPath = path.join(full, exe);
        if (fs.existsSync(binPath)) {
          out.push(binPath);
        }
      }
    }
    if (/pycharm|jetbrains/i.test(entry.name) || depth < 2) {
      collectPyCharmBins(full, out, depth + 1, maxDepth);
    }
  }
}

/**
 * @param {string} template
 * @param {string} file
 * @param {number} line
 * @returns {string}
 */
function applyOpenTemplate(template, file, line) {
  return template
    .replace(/\{file\}/g, file)
    .replace(/\{line\}/g, String(line));
}

/**
 * @param {string} idePath
 * @param {string} fsPath
 * @param {number} line
 * @returns {Promise<{ ok: boolean; method: string; error?: string }>}
 */
async function openWithConfiguredIde(idePath, fsPath, line) {
  // JetBrains launchers (PyCharm 2024.x/2025.x) reject "--line N file" —
  // "unrecognized option: --line". The file path must come first.
  const rawTemplates = config.get("externalIdeArgs", [
    "{file}",
    "--line",
    "{line}",
  ]);
  const argTemplates = Array.isArray(rawTemplates)
    ? rawTemplates
    : ["{file}", "--line", "{line}"];

  const args = argTemplates.map((part) =>
    applyOpenTemplate(String(part), fsPath, line)
  );

  return spawnDetached(idePath, args, `ide:${path.basename(idePath)}`, true);
}

/**
 * @param {string} fsPath
 * @returns {Promise<{ ok: boolean; method: string; error?: string }>}
 */
function openWindowsInvokeItem(fsPath) {
  const script = `Invoke-Item -LiteralPath ${JSON.stringify(fsPath)}`;
  return spawnDetached(
    "powershell.exe",
    ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script],
    "win32-powershell-invoke-item"
  );
}

/**
 * @param {string} fsPath
 * @returns {Promise<{ ok: boolean; method: string; error?: string }>}
 */
function openWindowsExplorer(fsPath) {
  return spawnDetached("explorer.exe", [fsPath], "win32-explorer");
}

/**
 * @param {string} fsPath
 * @returns {Promise<{ ok: boolean; method: string; error?: string }>}
 */
function openWindowsCmdStart(fsPath) {
  return spawnDetached(
    process.env.ComSpec || "cmd.exe",
    ["/d", "/c", "start", "", fsPath],
    "win32-cmd-start"
  );
}

/**
 * @param {string} fsPath
 * @param {number} [line]
 * @returns {Promise<{ ok: boolean; method: string; attempts: object[] }>}
 */
async function openFileInOs(fsPath, line = 1) {
  const normalized = path.normalize(fsPath);
  /** @type {object[]} */
  const attempts = [];

  if (process.platform === "win32") {
    const idePath = readConfiguredIdePath() || findPyCharmExecutable();
    if (idePath) {
      const ideResult = await openWithConfiguredIde(idePath, normalized, line);
      attempts.push({ ...ideResult, idePath });
      if (ideResult.ok) {
        return { ok: true, method: ideResult.method, attempts };
      }
    }

    for (const fn of [openWindowsInvokeItem, openWindowsExplorer, openWindowsCmdStart]) {
      const result = await fn(normalized);
      attempts.push(result);
      if (result.ok) {
        return { ok: true, method: result.method, attempts };
      }
    }

    return { ok: false, method: "win32-all-failed", attempts };
  }

  if (process.platform === "darwin") {
    const result = await spawnDetached("open", [normalized], "darwin-open");
    attempts.push(result);
    return { ...result, attempts };
  }

  const result = await spawnDetached("xdg-open", [normalized], "linux-xdg-open");
  attempts.push(result);
  return { ...result, attempts };
}

module.exports = {
  openFileInOs,
  findPyCharmExecutable,
  readConfiguredIdePath,
};
