# plugins

[English](README.md) · [Releases](https://github.com/rufatpro/plugins/releases)

Монорепозиторий плагинов и расширений для IDE — **JetBrains**, **VS Code** и другие.  
Каждый плагин живёт в своём каталоге со своим `readme.md`.

**Cursor IDE:** [Регистрация по реферальной ссылке](https://cursor.com/referral?code=GCE2SLLVIM87) — при подписке поддерживаете автора.

## Каталог плагинов

| Плагин | Платформа | Версия | Описание | Документация |
|--------|-----------|--------|----------|--------------|
| [AI Chat File Links](jetbrains/ai-chat-file-links/) | JetBrains | 0.3.3 | Исправляет проблему: ссылки на файлы из **AI Chat** не открывались в редакторе (PyCharm, IntelliJ, WebStorm, …) | [EN](jetbrains/ai-chat-file-links/readme.md) · [RU](jetbrains/ai-chat-file-links/readme_ru.md) |
| [Python Doc Links](jetbrains/py-doc-links/) | JetBrains | 0.2.8 | Ctrl+Click в Python **docstring** / **комментариях** (`filename.py`, `:py:func:`, `:py:class:`, `:py:data:`, `:py:mod:`, короткие формы) | [EN](jetbrains/py-doc-links/readme.md) · [RU](jetbrains/py-doc-links/readme_ru.md) |
| [Python Doc Links](vscode/py-doc-links/) | VS Code-compatible | 0.2.12 | Ctrl+Click по ссылкам в Python docstring/комментариях (`filename.py`, `:py:func:`, `:py:class:`, `:py:data:`, `:py:mod:`, короткие формы) | [EN](vscode/py-doc-links/readme.md) · [RU](vscode/py-doc-links/readme_ru.md) |
| [Multiline Find](vscode/multiline-find/) | VS Code-compatible | 0.1.8 | **Ctrl+F** в стиле PyCharm для многострочного выделения; **F3** ищет по всему файлу | [EN](vscode/multiline-find/readme.md) · [RU](vscode/multiline-find/readme_ru.md) |
| [Python Quick Intent](vscode/python-quick-intent/) | VS Code-compatible | 0.4.6 | **Alt+Enter** в стиле PyCharm: импорт, Fix with AI, Quick Edit для Python в Cursor | [EN](vscode/python-quick-intent/readme.md) · [RU](vscode/python-quick-intent/readme_ru.md) |
| [TypeScript Doc Links](vscode/ts-doc-links/) | VS Code-compatible | 0.1.9 | Ctrl+Click в TS/JS **комментариях** / **JSDoc** (`@see`, `{@link ./file.ts}`, `File:`, `// See`, алиасы `@/`) | [EN](vscode/ts-doc-links/readme.md) · [RU](vscode/ts-doc-links/readme_ru.md) |
| [Cursor Chat Prompt Library](vscode/cursor-chat-prompt-library/) | VS Code-compatible | 0.8.11 | **Ctrl+Alt+T** (основной), **Ctrl+Alt+Shift+P** → **AI-чат**; **1300** шаблонов, **53** категории | [EN](vscode/cursor-chat-prompt-library/readme.md) · [RU](vscode/cursor-chat-prompt-library/readme_ru.md) |
| [Cursor Chat Prompt Library RU](vscode/cursor-chat-prompt-library-ru/) | VS Code-compatible | 0.6.8 | **1300** русских шаблонов, **53** категории; **Ctrl+Alt+Shift+P**; параллельно с EN | [RU](vscode/cursor-chat-prompt-library-ru/readme.md) · [EN](vscode/cursor-chat-prompt-library-ru/readme_en.md) |
| [Cursor AI Chat Click Redirect](vscode/cursor-ai-chat-click-redirect/) | VS Code-compatible | 0.6.8 | **AI-чат** → внешняя IDE по расширению; редирект только при **новой вкладке** (не если файл уже открыт / клик по табу); опциональный лог | [EN](vscode/cursor-ai-chat-click-redirect/readme.md) · [RU](vscode/cursor-ai-chat-click-redirect/readme_ru.md) |

> Расширения для сред, совместимых с VS Code, живут в `vscode/<имя>/`. Работают в **VS Code**, **Cursor**, **Google Antigravity IDE** и других форках (Open VSX или VSIX).

## Структура репозитория

```
plugins/            ← корень git (плагины)
  README.md             # индекс (EN)
  README_RU.md          # индекс (RU)
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

## Лицензия

[MIT](license) — свободное использование, изменение и распространение, на свой страх и риск (JetBrains Marketplace, VS Code Marketplace / Open VSX).

## Автор

[Руфат](https://rufat.top/)

**Cursor IDE:** [Регистрация по реферальной ссылке](https://cursor.com/referral?code=GCE2SLLVIM87) — при подписке поддерживаете автора.
