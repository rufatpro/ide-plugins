const vscode = require("vscode");

const MAX_DEPTH = 12;
const MAX_STRING = 64_000;

/**
 * @param {unknown} value
 * @param {number} [depth]
 * @returns {unknown}
 */
function serializeValue(value, depth = 0) {
  if (depth > MAX_DEPTH) {
    return "[MaxDepth]";
  }

  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  if (value instanceof vscode.Uri) {
    return serializeUri(value);
  }

  if (value instanceof vscode.Range) {
    return {
      _type: "Range",
      start: serializeValue(value.start, depth + 1),
      end: serializeValue(value.end, depth + 1),
    };
  }

  if (value instanceof vscode.Position) {
    return {
      _type: "Position",
      line: value.line,
      character: value.character,
    };
  }

  if (value instanceof vscode.Location) {
    return {
      _type: "Location",
      uri: serializeUri(value.uri),
      range: serializeValue(value.range, depth + 1),
    };
  }

  if (typeof value === "bigint") {
    return value.toString();
  }

  if (typeof value === "function") {
    return `[Function ${value.name || "anonymous"}]`;
  }

  if (typeof value === "symbol") {
    return value.toString();
  }

  if (typeof value === "string") {
    if (value.length <= MAX_STRING) {
      return value;
    }
    return `${value.slice(0, MAX_STRING)}…[+${value.length - MAX_STRING} chars]`;
  }

  if (typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => serializeValue(item, depth + 1));
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (value instanceof Error) {
    return {
      _type: "Error",
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }

  /** @type {Record<string, unknown>} */
  const out = { _type: value.constructor?.name || "Object" };
  for (const [key, nested] of Object.entries(value)) {
    try {
      out[key] = serializeValue(nested, depth + 1);
    } catch (err) {
      out[key] = `[Unserializable: ${err instanceof Error ? err.message : String(err)}]`;
    }
  }
  return out;
}

/**
 * @param {vscode.Uri} uri
 * @returns {Record<string, unknown>}
 */
function serializeUri(uri) {
  return {
    _type: "Uri",
    scheme: uri.scheme,
    authority: uri.authority,
    path: uri.path,
    query: uri.query,
    fragment: uri.fragment,
    fsPath: uri.fsPath,
    toString: uri.toString(true),
  };
}

/**
 * @param {unknown[]} args
 * @returns {unknown[]}
 */
function serializeArgs(args) {
  return args.map((arg) => serializeValue(arg));
}

module.exports = {
  serializeValue,
  serializeUri,
  serializeArgs,
};
