# Changelog

## 0.6.6

- Fixed Marketplace readme links: corrected `vsce.baseContentUrl` (`vscode/…` instead of `plugins/vscode/…`); LICENSE, changelog, and EN/RU readme use absolute GitHub URLs.

## 0.6.5

- Documentation: when redirect runs (new tab vs file already open vs tab-bar click); updated readme EN/RU and monorepo `plugins/README.md` / `README_RU.md`.

## 0.6.4

- Settings UI: `redirectFileExtensions` listed first via `order` (VS Code sorts keys alphabetically by default).

## 0.6.3

- `logPath` default is empty; logging runs only when `cursorAiChatClickRedirect.logPath` is set.

## 0.6.2

- Redirect only after a **new tab** opens (`tabGroups.onDidChangeTabs` → `opened`), not when switching existing tabs.
- Pending tab opens expire after 10s if the editor never becomes active.

## 0.6.1

- English UI, settings descriptions, and primary `readme.md`; Russian in `readme_ru.md`.
- Disclaimer (as-is, no warranty, limited liability) in extension description and readme.

## 0.6.0

- Replaced `redirectPyToOs` with `redirectFileExtensions` — comma-separated list (`py,js,md`). Empty string disables redirect.
- Renamed settings: `keepTabInCursorAfterRedirect`, `externalIdePath`, `externalIdeArgs`.
- Removed boolean redirect `globalState` and toggle command; status bar and **Set extensions** command instead.
- Module `externalRedirect.js` replaces `pyOsRedirect.js`.

## 0.5.1

- Added `fileFlowLog.js`: `file.openedInCursor`, `file.closedInCursor`, `file.openedInExternalApp`.
- Simplified `config.js`; removed legacy keys and old extension names.
- Defaults: `redirectPyToOs: false`, `keepPyTabInCursorAfterRedirect: false`.

## 0.5.0

- Explicit log events: `file.openedInCursor`, `file.closedInCursor`, `file.openedInExternalApp`.
- Removed unused `pendingLinkIntercept`; fewer noisy log events.

## 0.4.0

- Removed `executeCommand` / `openExternal` patches (Cursor: `Cannot redefine property` — broke activation).
- Redirect only via `onDidChangeActiveTextEditor` (stable path from logs).
- Redirect state: `globalState` + memory — status bar button works immediately.

## 0.3.6

- Removed `redirectPyOnEditorActivate` — redirect always runs when a `.py` tab opens.
- Two settings left: `redirectPyToOs` and `keepPyTabInCursorAfterRedirect`.

## 0.3.5

- Status bar: «$(file-code) .py → PyCharm» / «.py → Cursor» — one click toggles redirect without editing settings.json.
- Command **AI Chat Click Redirect: Toggle .py → PyCharm / Cursor**.
- Log includes `redirectPyToOs` on extension startup.

## 0.3.4

- Reworked `config.js`: inspect for explicit user values (no confusion with package.json defaults).
- Fixed typo LOCALAPDATA → LOCALAPPDATA in PyCharm search.
- Fixed double PyCharm launch when `keepPyTabInCursorAfterRedirect=true`.
- Unified dedup (`markPyHandled` / `isRecentlyHandled`) for patched execute and `activeTextEditorChanged`.

## 0.3.3

- Fixed settings read: default `redirectPyToOs` no longer overrides explicit `settings.json` value.
- Fixed recursive `openExternal` fallback when opening PyCharm.

## 0.3.2

- Setting `keepPyTabInCursorAfterRedirect`: after redirect to PyCharm, `.py` tab stays open in Cursor.

## 0.3.1

- Settings and commands: `cursorAiChatClickRedirect.*`.

## 0.3.0

- By default `.py` stays in Cursor; redirect to PyCharm with tab close only when `redirectPyToOs: true`.

## 0.2.2

- Windows: PyCharm first (`pycharm64.exe --line N file.py`), JetBrains/Toolbox autodetect, then `Invoke-Item`, `explorer`, `cmd start`.
- Settings `pythonIdePath` and `pythonIdeArgs` for explicit IDE path.

## 0.2.1

- Open `.py` in OS via `cmd /c start` (Windows), `open` / `xdg-open` — `env.openExternal` for `file://` often fails in Cursor.
- Redirect on `activeTextEditorChanged` without waiting for `pending` (`redirectPyOnEditorActivate`, default `true`).

## 0.2.0

- Redirect `.py` to OS: intercept `vscode.open` / `openExternal`, fallback on `activeTextEditorChanged` after chat link click.
- Setting `cursorAiChatClickRedirect.redirectPyToOs`.

## 0.1.0

- Initial release: `registerExternalUriOpener` (http/https), patches for `commands.executeCommand` and `env.openExternal`, log at `c:\tmp\ai_chat_click.log`.
