# TypeScript Doc Links

Package id: `ts-doc-links`.

[Русский](https://github.com/rufatpro/plugins/blob/main/vscode/ts-doc-links/readme_ru.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Repository](https://github.com/rufatpro/plugins)

**VS Code-compatible extension** that enables go-to-definition from TypeScript/JavaScript **comments** and **JSDoc** — for patterns that **TypeScript (Native Preview)** does not handle.

It makes references like `@see ./emailValidator.ts`, `File: utils.ts`, and `// See utils.ts:3` navigable with Ctrl+Click (or F12).

> Developed with AI assistance (Cursor / LLM). Part of the [plugins](https://github.com/rufatpro/plugins) monorepo.

> **Compatibility:** Not limited to VS Code or Cursor — runs in any **VS Code-compatible editor**, including **Google Antigravity IDE**, VSCodium, Windsurf, and other forks that support standard VS Code extensions (Open VSX or VSIX).  

## Supported patterns

| Pattern | Resolves to |
|--------|-------------|
| `@see ./file.ts` | File (relative to current file) |
| `{@link ./userService.ts}` | File |
| `{@link formatDate}` | Export/symbol in current file |
| `{@link utils.formatDate}` | `utils.ts` + export |
| `{@link UserService#getById}` | Class method (via import → `userService.ts`) |
| `{@link UserService.getById}` | Same as `#` form |
| `{@link userService.ts.getById}` | File + symbol (tolerant form) |
| `File: utils.ts` | File (same-folder priority vs `docs/`) |
| `// See utils.ts:3` | File + line (1-based) |
| `` `src/foo.ts` `` | File |
| `client.ts:42`, `client.ts#L42` | File + line |
| `@/lib/formatDate` | Path from nearest `tsconfig.json` `paths` |

## Example

```typescript
/**
 * @see ./emailValidator.ts
 * File: utils.ts
 * {@link formatDate}
 * {@link UserService#getById}
 */
export function login() {
  // See utils.ts:3
}
```

## Install (persistent, via VSIX)

Build the VSIX package:

```bash
npm install -g @vscode/vsce
cd vscode/ts-doc-links
build.bat
```

Then install the generated `.vsix`.

**Command Palette (any VS Code-compatible editor):**

1. **F1** / **Ctrl+Shift+P** → `Install from VSIX`
2. Select **Extensions: Install from VSIX...**
3. Pick `vscode/ts-doc-links/build/ts-doc-links-0.1.7.vsix`

## Limitations

- Heuristic symbol search (`export function`, `export class`, …).
- Duplicate basenames: prefers the file next to the source; de-prioritizes `docs/`, `dist/`, `node_modules/`, etc.
- Class members: prefers symbol from `import { Class } from '...'` in the current file.
- No rename/find-usages for textual references.

## License

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — free to use, modify, and distribute, at your own risk.  
[plugins monorepo](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Author

[Rufat](https://rufat.top/)

**Cursor IDE:** [Sign up with referral link](https://cursor.com/referral?code=GCE2SLLVIM87) — supports the author when you subscribe.
