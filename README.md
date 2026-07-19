# plugins

[Русский](README_RU.md) · [Releases](https://github.com/rufatpro/plugins/releases)

Monorepo of IDE plugins and extensions — **JetBrains**, **VS Code**, and more.  
Each plugin lives in its own directory with a `readme.md`.

**Cursor IDE:** [Sign up with referral link](https://cursor.com/referral?code=GCE2SLLVIM87) — supports the author when you subscribe.

## Plugin catalog

| Plugin | Platform | Version | Summary | Docs |
|--------|----------|---------|---------|------|
| [AI Chat File Links](jetbrains/ai-chat-file-links/) | JetBrains | 0.3.4 | Fixes file links from **AI Chat** not opening in the editor (PyCharm, IntelliJ, WebStorm, …) | [EN](jetbrains/ai-chat-file-links/readme.md) · [RU](jetbrains/ai-chat-file-links/readme_ru.md) |
| [Python Doc Links](jetbrains/py-doc-links/) | JetBrains | 0.2.10 | Ctrl+Click in Python **docstrings** / **comments** (`filename.py`, `:py:func:`, `:py:class:`, `:py:data:`, `:py:mod:`, short forms) | [EN](jetbrains/py-doc-links/readme.md) · [RU](jetbrains/py-doc-links/readme_ru.md) |
| [Python Doc Links](vscode/py-doc-links/) | VS Code-compatible | 0.2.12 | Ctrl+Click for Python docstring/comment references (`filename.py`, `:py:func:`, `:py:class:`, `:py:data:`, `:py:mod:`, short forms) | [EN](vscode/py-doc-links/readme.md) · [RU](vscode/py-doc-links/readme_ru.md) |
| [Multiline Find](vscode/multiline-find/) | VS Code-compatible | 0.1.8 | PyCharm-like **Ctrl+F** for multiline selections; **F3** searches the whole file | [EN](vscode/multiline-find/readme.md) · [RU](vscode/multiline-find/readme_ru.md) |
| [Python Quick Intent](vscode/python-quick-intent/) | VS Code-compatible | 0.4.6 | PyCharm-style **Alt+Enter** intentions for Python: import, Fix with AI, Quick Edit in Cursor | [EN](vscode/python-quick-intent/readme.md) · [RU](vscode/python-quick-intent/readme_ru.md) |
| [TypeScript Doc Links](vscode/ts-doc-links/) | VS Code-compatible | 0.1.9 | Ctrl+Click in TS/JS **comments** / **JSDoc** (`@see`, `{@link ./file.ts}`, `File:`, `// See`, `@/` aliases) | [EN](vscode/ts-doc-links/readme.md) · [RU](vscode/ts-doc-links/readme_ru.md) |
| [Cursor Chat Prompt Library](vscode/cursor-chat-prompt-library/) | VS Code-compatible | 0.8.11 | **Ctrl+Alt+T** (primary), **Ctrl+Alt+Shift+P** → **AI chat**; **1300** templates, **53** categories | [EN](vscode/cursor-chat-prompt-library/readme.md) · [RU](vscode/cursor-chat-prompt-library/readme_ru.md) |
| [Cursor Chat Prompt Library RU](vscode/cursor-chat-prompt-library-ru/) | VS Code-compatible | 0.6.8 | **1300** Russian prompts, **53** categories; **Ctrl+Alt+Shift+P**; parallel install with EN | [RU](vscode/cursor-chat-prompt-library-ru/readme.md) · [EN](vscode/cursor-chat-prompt-library-ru/readme_en.md) |
| [Cursor AI Chat Click Redirect](vscode/cursor-ai-chat-click-redirect/) | VS Code-compatible | 0.6.8 | **AI chat** → external IDE by extension; redirect on **new tab** only (not if file tab already open / tab-bar click); optional log | [EN](vscode/cursor-ai-chat-click-redirect/readme.md) · [RU](vscode/cursor-ai-chat-click-redirect/readme_ru.md) |

> VS Code-compatible extensions live under `vscode/<name>/`. They work in **VS Code**, **Cursor**, **Google Antigravity IDE**, and other VS Code forks (Open VSX or VSIX).

## Repository layout

```
plugins/            ← git root (plugins)
  README.md             # index (EN)
  README_RU.md          # index (RU)
  license               # MIT
  jetbrains/
    <plugin-name>/
      readme.md
      build.gradle.kts
      src/
  vscode/
    <extension-name>/
      readme.md
      package.json
      src/
```

## License

[MIT](license) — free to use, modify, and distribute, at your own risk (JetBrains Marketplace, VS Code Marketplace / Open VSX).

## Author

[Rufat](https://rufat.top/en/)

**Cursor IDE:** [Sign up with referral link](https://cursor.com/referral?code=GCE2SLLVIM87) — supports the author when you subscribe.
