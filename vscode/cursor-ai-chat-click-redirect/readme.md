# Cursor AI Chat Click Redirect

[Русский](https://github.com/rufatpro/plugins/blob/main/vscode/cursor-ai-chat-click-redirect/readme_ru.md) · [Repository](https://github.com/rufatpro/plugins) · [Changelog](https://github.com/rufatpro/plugins/blob/main/vscode/cursor-ai-chat-click-redirect/CHANGELOG.md)

**Version 0.6.6** — VS Code-compatible extension: optional logging of AI chat file-link opens, and optional redirect of selected file types to an external IDE (PyCharm, IntelliJ, WebStorm, etc.).

> Built with AI assistance (Cursor). Part of the [plugins](https://github.com/rufatpro/plugins) monorepo.

> **Compatibility:** Not limited to VS Code or Cursor — runs in any **VS Code-compatible editor**, including **Google Antigravity IDE**, VSCodium, Windsurf, and other forks that support standard VS Code extensions (Open VSX or VSIX).

## Disclaimer

This extension is provided **as is**, without warranty of any kind, express or implied, including but not limited to fitness for a particular purpose, merchantability, or non-infringement. The authors, contributors, and publishers **are not liable** for any direct, indirect, incidental, special, or consequential damages, loss of data, misdirected file opens, security issues, or other problems arising from use of this software—including interaction with Cursor AI chat, external IDEs, shell commands, or log files written to disk. **You use this extension at your own risk** and are responsible for reviewing settings, paths, and third-party tools you configure.

## Use case

The extension fits a **Cursor + external IDE** workflow: you use Cursor mainly for **AI chat** (Composer, Agent, file links in replies) while **editing and debugging** happen in another tool.

Typical goals:

- navigate and debug the project in your main IDE with familiar tooling;
- keep PyCharm (or another IDE) as the editor while the Cursor agent suggests changes and links to files;
- optionally log chat link opens to a file for debugging (“what did the agent point at?”).

The extension does **not** replace Cursor or **sync** edits between editors.

## Example workflow

**Main editor: PyCharm.** **AI chat: Cursor.**

1. In `settings.json`, set `redirectFileExtensions` (e.g. `py`) and optionally `externalIdePath` to `pycharm64.exe`.
2. In Cursor chat, the agent replies with a link to `src/service.py:42` — you click it.
3. Cursor briefly opens a new tab; the extension launches PyCharm at that line and (by default) closes the tab in Cursor.
4. If `logPath` is set, events are written to the log file.

## When redirect runs

Redirect is tied to a **new editor tab** in Cursor (`onDidChangeTabs` → `opened`), not to simply making a file active.

| Situation | Redirect to external IDE? |
|-----------|----------------------------|
| Chat link opens a file that has **no tab yet** in Cursor | **Yes** — new tab appears, then PyCharm (etc.) opens the file |
| Chat link points to a file that is **already open** in a tab (Cursor only focuses that tab) | **No** — no new tab, extension does not treat it as a chat open |
| You click an **existing tab** in the tab bar (same or another file) | **No** — only the active tab changes |
| You open a file from Explorer / Command Palette (new tab) | **Yes** — technically a new tab; same mechanism as a chat link |

Implications:

- First click on a path from chat usually redirects; repeated clicks on the same link while the tab stays open may **not** redirect again.
- To force redirect again, close the file tab in Cursor and click the chat link once more (or open the link when the file is not already tabbed).

Logging (`logPath` set) for `file.openedInCursor` / `file.closedInCursor` follows the same extension list; events are still only written when logging is enabled.

## Installation

```bat
cd plugins\vscode\cursor-ai-chat-click-redirect
build.bat
```

In any VS Code-compatible editor (VS Code, Cursor, Antigravity, …): **F1** → `Extensions: Install from VSIX` → `build\cursor-ai-chat-click-redirect-0.6.6.vsix`.

Reload the window (**Developer: Reload Window**).

## Quick configuration

```json
{
  "cursorAiChatClickRedirect.redirectFileExtensions": "py,js,md",
  "cursorAiChatClickRedirect.externalIdePath": "C:\\Program Files\\JetBrains\\PyCharm 2025.1.2\\bin\\pycharm64.exe",
  "cursorAiChatClickRedirect.keepTabInCursorAfterRedirect": false,
  "cursorAiChatClickRedirect.logPath": "c:\\tmp\\ai_chat_click.log"
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `redirectFileExtensions` | `""` | Comma-separated extensions without a dot (`py,js,md`). Empty = redirect **off**. |
| `keepTabInCursorAfterRedirect` | `false` | Keep the file tab in Cursor after opening in the external IDE. |
| `logPath` | `""` | Log file path. Empty = **no logging**. |
| `externalIdePath` | `""` | Path to IDE executable. Empty = JetBrains autodetect on Windows. |
| `externalIdeArgs` | `["--line","{line}","{file}"]` | Launch arguments; `{file}`, `{line}` (1-based). |

Settings appear in order with `redirectFileExtensions` first in the UI.

## Status bar

- `py,js → OS` — redirect enabled for those extensions (click to edit the list).
- `redirect off` — redirect disabled (click to set extensions).

## Commands

| Command | Action |
|---------|--------|
| **Set OS Redirect File Extensions** | Edit comma-separated list, or empty to disable redirect |
| **Open AI Chat Click Log** | Open log file (requires `logPath`) |
| **Clear AI Chat Click Log** | Clear log file (requires `logPath`) |
| **Write Test Log Entry** | Test logging (requires `logPath`) |

## Log events

Written only when `logPath` is non-empty:

| Event | When |
|-------|------|
| `file.openedInCursor` | Matching file opened in a Cursor tab |
| `file.closedInCursor` | Tab closed (manually or after redirect) |
| `file.openedInExternalApp` | File opened in external IDE |

## License

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — free to use, modify, and distribute, at your own risk.  
[plugins monorepo](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Author

[Rufat](https://rufat.top/)

**Cursor IDE:** [Sign up with referral link](https://cursor.com/referral?code=GCE2SLLVIM87) — supports the author when you subscribe.
