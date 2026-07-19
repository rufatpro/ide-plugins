# AI Chat File Links

[Русский](readme_ru.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Repository](https://github.com/rufatpro/plugins)

**JetBrains plugin** for PyCharm, IntelliJ IDEA, WebStorm, and other JetBrains IDEs.

Fixes a common problem: when an AI agent (Cursor via ACP, or other ACP agents) responds in **AI Chat** with a project file path, **clicking the link in PyCharm often did nothing** — the IDE showed «Cannot open a URL» or «File does not exist» instead of opening the file in the editor. This plugin opens those project-relative paths correctly.

> **JetBrains only** — does not install in VS Code or the Cursor desktop app, where chat links are handled by the editor itself.  
> Developed with AI assistance (Cursor / LLM). Part of the [plugins](https://github.com/rufatpro/plugins) monorepo.

## Requirements

- JetBrains IDE **2024.3+** (PyCharm, IntelliJ IDEA, WebStorm, …)
- **AI Assistant** plugin enabled
- **Cursor** agent from the ACP Registry (or any ACP-compatible agent)
- Project opened at the **repository root** (not a subfolder)

## Installation

1. Download `ai-chat-file-links-*.zip` from [GitHub Releases](https://github.com/rufatpro/plugins/releases).
2. **Settings → Plugins → ⚙ → Install Plugin from Disk…**
3. Select the zip file and **restart** the IDE.

## Usage

1. Open your project at the repository root.
2. Send a prompt in **AI Chat** using the **Cursor** agent (ACP).
3. Click a file path in the agent's response — it opens in the editor.

If the IDE shows an error balloon after clicking, the plugin still captures the path, copies it to the clipboard, and opens the file automatically.

**Manual fallback** (**Tools → AI Chat File Links** or `Shift`+`Shift` → Find Action):

| Action | Description |
|--------|-------------|
| **Open Last Failed Path** | Opens the last path that triggered an error balloon |
| **Open Path from Clipboard** | Opens a project-relative path currently in the clipboard |

## Settings

**Settings → Tools → AI Chat File Links**

| Option | Default | Description |
|--------|---------|-------------|
| **Dismiss error notification when the file opens successfully** | On | Closes the «Cannot open a URL» / «File does not exist» error balloon after the file is opened. |

## How it works

The plugin hooks into two IDE layers:

1. **UrlOpener (priority)** — intercepts link clicks in AI Chat and tries `project.basePath + relative path` before the default URL handler.
2. **Notification / balloon hook** — if step 1 fails and the IDE shows an error balloon, the plugin extracts the path from the notification text, copies it to the clipboard, and opens the file via `OpenFileDescriptor`.

```
Click in AI Chat
    → UrlOpener  →  file opens  ✓
         ↓ (fails)
    IDE shows "Cannot open a URL" balloon
    → BalloonListener / Notifications.TOPIC
    → path → clipboard + OpenFileDescriptor  ✓
```

> AI Chat uses **Jewel / Compose** for rendering, not the standard editor hyperlink API — which is why custom hooking is needed.

## Limitations

- **Windows-focused** — developed and tested primarily on Windows path separators.
- **JetBrains only** — does not fix link handling in the **Cursor** or **VS Code** desktop apps.
- **Project root matters** — paths are resolved relative to the opened project root.
- **Workaround** — JetBrains and Cursor may eventually resolve links natively. Report upstream issues to [JetBrains YouTrack LLM](https://youtrack.jetbrains.com/newIssue?project=LLM).

## Building from source

### Prerequisites

- JDK 21+
- Internet connection (Gradle downloads dependencies on first run)

### Build

Linux / macOS (from the git repo root):

```bash
cd jetbrains/ai-chat-file-links
chmod +x gradlew build.sh clean.sh   # once
./build.sh
```

Windows:

```powershell
cd jetbrains\ai-chat-file-links
build.bat
```

Artifact: `build/distributions/ai-chat-file-links-*.zip` — install it as described above.

### Run in a sandbox IDE

```bash
./gradlew runIde     # Linux/macOS
gradlew.bat runIde   # Windows
```

Open any project at its repository root to test link clicks in AI Chat.

### Clean

```bash
./clean.sh    # Linux/macOS
clean.bat     # Windows
```

Removes `build/`, `.gradle/`, `.intellijPlatform/`, `.kotlin/`, and log files.

### Build logs

- `log.1main.log` — Gradle output; success ends with `BUILD SUCCESSFUL`.
- `log.1err.log` — stderr from headless IDE. **WARN** lines there are usually IntelliJ platform noise, not plugin errors. (`buildSearchableOptions` is disabled in `build.gradle.kts` so this file is usually empty.)

## Debug logging (optional)

File logging to `C:\tmp\` is **disabled** in release builds. To enable it, set `ENABLED = true` in `DebugLog.kt`, uncomment the write block, register debug listeners in `plugin.xml`, and uncomment `NotificationDebugPoller.start()` in `SubscribeFailedPathNotificationsActivity.kt`.

Full log file reference: [readme_ru.md](readme_ru.md) → section «Отладка».

## Related

- [Cursor — JetBrains integration](https://cursor.com/docs/integrations/jetbrains)
- [Agent Client Protocol (ACP)](https://agentclientprotocol.com/)
- [JetBrains AI Assistant — ACP](https://www.jetbrains.com/help/ai-assistant/acp.html)

## License

[MIT](../../license) — free to use, modify, and distribute, at your own risk.  
[plugins monorepo](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Author

[Rufat](https://rufat.top/en/)
