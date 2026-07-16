# Multiline Find

[Русский](readme_ru.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Repository](https://github.com/rufatpro/plugins)

PyCharm-style **Ctrl+F** for multiline text: select a block, press Ctrl+F, then **F3** to find the next match in the **whole file**.

> Developed with AI assistance (Cursor / LLM). Part of the [plugins](https://github.com/rufatpro/plugins) monorepo.

> **Compatibility:** Not limited to VS Code or Cursor — runs in any **VS Code-compatible editor**, including **Google Antigravity IDE**, VSCodium, Windsurf, and other forks that support standard VS Code extensions (Open VSX or VSIX).

## Problem

Built-in `actions.find` does not seed the find widget with multiline selections. `editor.find.autoFindInSelection: "multiline"` limits search to the selection and breaks **F3** outside it.

## Solution

This extension:

1. Copies the selected text (including newlines) into the find widget
2. Collapses the selection so search is not scoped to it
3. Rebinds **Ctrl+F** in the editor to `multilineFind.open`

## Settings (applied automatically)

When the extension is **enabled**, it contributes default values via `configurationDefaults`:

```json
{
  "editor.find.autoFindInSelection": "never",
  "editor.find.seedSearchStringFromSelection": "selection"
}
```

You do **not** need to add these to `settings.json` manually. If you already set these keys yourself, **your values take precedence** over the extension defaults.

### What these options do

| Setting | Value | Purpose |
|---------|-------|---------|
| `editor.find.autoFindInSelection` | `"never"` | Do **not** enable «Find in Selection» automatically. With `"multiline"`, VS Code restricts search to the highlighted block when the selection spans several lines — **F3** then stops at the selection boundary. `"never"` keeps search file-wide. |
| `editor.find.seedSearchStringFromSelection` | `"selection"` | When opening find **without** this extension (or via built-in paths), put the **entire** selected text into the find box, not only the word under the cursor. Helps single-line selections; multiline is handled by the extension itself. |

Other values for reference:

- `autoFindInSelection`: `"always"` — always search only inside the selection; `"multiline"` — same, but only for multiline selections.
- `seedSearchStringFromSelection`: `"never"` — empty find box or clipboard; `"always"` — seed from selection only when it is a single word on one line (multiline is ignored by built-in find).

These settings complement the extension; they do not replace it — built-in find still cannot populate multiline queries on its own.

To override, add the keys to User or Workspace settings in `settings.json`.

## Install from VSIX

Build:

```powershell
cd vscode/multiline-find
build.bat
```

Install:

```powershell
cursor --install-extension build/multiline-find-0.1.6.vsix
```

Or in any VS Code-compatible editor (VS Code, Cursor, Antigravity, …): Extensions → `...` → **Install from VSIX...**

## Manual multiline search

You can also paste multiline text into the find box, or press **Ctrl+Enter** to insert a newline in the query.

## License

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — free to use, modify, and distribute, at your own risk.  
[plugins monorepo](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Author

[Rufat](https://rufat.top/)

**Cursor IDE:** [Sign up with referral link](https://cursor.com/referral?code=GCE2SLLVIM87) — supports the author when you subscribe.
