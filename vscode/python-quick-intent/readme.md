# Python Quick Intent

[Русский](readme_ru.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Repository](https://github.com/rufatpro/plugins)

**PyCharm-style intentions** for Python in Cursor, VS Code, and other VS Code-compatible editors: import assistance, AI-powered fixes, and Quick Edit — without Roo Code intercepting **Alt+Enter**.

> Developed with AI assistance (Cursor / LLM). Part of the [plugins](https://github.com/rufatpro/plugins) monorepo.

> **Compatibility:** Not limited to VS Code or Cursor — runs in any **VS Code-compatible editor**, including **Google Antigravity IDE**, VSCodium, Windsurf, and other forks that support standard VS Code extensions (Open VSX or VSIX).

## Problem

In Cursor, **Alt+Enter** is often bound to Roo Code or other AI extensions instead of the editor **Quick Fix**. PyCharm users expect **Alt+Enter** on underlined code to show intentions: add import, fix with AI, inline edit.

## Solution

| Command | Key | Action |
|---------|-----|--------|
| Quick Intent: Show Menu | `Alt+Enter` | In-editor menu when diagnostics exist; otherwise system Quick Fix |
| Quick Intent: Add Import | `Alt+I` | Add import (workspace module or language server) |
| Quick Intent: Fix with AI | `Ctrl+Alt+Enter` | Open Cursor chat with @-mention + fix prompt |
| Quick Intent: Quick Edit | `Ctrl+Shift+Space` | Cursor Quick Edit (Ctrl+K) on the diagnostic line |

### Alt+Enter behavior

- **Underlined code** (Pylance/Pyright/Ruff diagnostics): code-action menu with **Add import**, **Fix with AI**, **Quick edit**.
- **No squiggles**: delegates to `editor.action.quickFix` (e.g. IntelliJ Keybindings, built-in fixes).

## Requirements

- Python file open (`language: python`)
- Python language support (e.g. Python extension, Cursor Pyright)
- **Fix with AI** / **Quick edit**: Cursor with Composer / Quick Edit commands available

## Install from VSIX

Build:

```powershell
cd vscode/python-quick-intent
build.bat
```

Install:

```powershell
cursor --install-extension build/python-quick-intent-0.4.4.vsix
```

Or in any VS Code-compatible editor (VS Code, Cursor, Antigravity, …): Extensions → `...` → **Install from VSIX...**

Package path after build:

`vscode/python-quick-intent/build/python-quick-intent-<version>.vsix`

**Development:** Extensions → **Install Extension from Location...** → this folder → **Reload Window**.

## Limitations

- Cursor has no stable public API for chat; **Fix with AI** uses known commands with clipboard fallback.
- Does not replace Cursor Tab inline completion.
- Import resolution depends on the active Python language server and workspace layout.
- Keybindings may conflict with Roo Code, IntelliJ Keybindings, or other extensions — adjust in Keyboard Shortcuts.

## License

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — free to use, modify, and distribute, at your own risk.  
[plugins monorepo](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Author

[Rufat](https://rufat.top/)

**Cursor IDE:** [Sign up with referral link](https://cursor.com/referral?code=GCE2SLLVIM87) — supports the author when you subscribe.
