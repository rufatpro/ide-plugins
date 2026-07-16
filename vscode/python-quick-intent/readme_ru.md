# Python Quick Intent

[English](readme.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Репозиторий](https://github.com/rufatpro/plugins)

**Намерения в стиле PyCharm** для Python в Cursor, VS Code и других средах, совместимых с VS Code: импорт, исправление через AI и Quick Edit — без перехвата **Alt+Enter** расширениями вроде Roo Code.

> Разработано с помощью AI (Cursor / LLM). Часть монорепозитория [plugins](https://github.com/rufatpro/plugins).

> **Совместимость:** расширение работает не только в VS Code и Cursor — оно совместимо с **любой средой на базе VS Code**, в том числе **Google Antigravity IDE**, VSCodium, Windsurf и другими форками с поддержкой стандартных расширений (Open VSX или установка из VSIX).

## Проблема

В Cursor **Alt+Enter** часто занят Roo Code или другими AI-расширениями, а не встроенным **Quick Fix**. В PyCharm на подчёркнутом коде **Alt+Enter** открывает меню намерений: импорт, исправление через AI, inline-правка.

## Решение

| Команда | Клавиша | Действие |
|---------|---------|----------|
| Quick Intent: Show Menu | `Alt+Enter` | Меню при диагностиках; иначе системный Quick Fix |
| Quick Intent: Add Import | `Alt+I` | Добавить импорт (модуль в workspace или language server) |
| Quick Intent: Fix with AI | `Ctrl+Alt+Enter` | Чат Cursor с @-упоминанием фрагмента и промптом |
| Quick Intent: Quick Edit | `Ctrl+Shift+Space` | Cursor Quick Edit (Ctrl+K) на строке с ошибкой |

### Поведение Alt+Enter

- **Подчёркнутый код** (Pylance/Pyright/Ruff): меню **Add import**, **Fix with AI**, **Quick edit**.
- **Без подчёркивания**: вызывается `editor.action.quickFix` (IntelliJ Keybindings и др.).

## Требования

- Открыт Python-файл
- Поддержка Python в редакторе
- Для AI-команд — Cursor с Composer / Quick Edit

## Установка из VSIX

Сборка:

```powershell
cd vscode/python-quick-intent
build.bat
```

Установка:

```powershell
cursor --install-extension build/python-quick-intent-0.4.4.vsix
```

Или в любой VS Code-совместимой среде (VS Code, Cursor, Antigravity, …): Extensions → `...` → **Install from VSIX...**

Файл после сборки:

`vscode/python-quick-intent/build/python-quick-intent-<version>.vsix`

**Разработка:** Extensions → **Install Extension from Location...** → эта папка → **Reload Window**.

## Ограничения

- У Cursor нет стабильного публичного API чата; **Fix with AI** использует известные команды и запасной вариант через буфер обмена.
- Не заменяет Cursor Tab.
- Импорты зависят от language server и структуры проекта.
- Возможны конфликты горячих клавиш с Roo Code и IntelliJ Keybindings — настройте в Keyboard Shortcuts.

## Лицензия

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — свободное использование на свой страх и риск.  
[plugins](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Автор

[Руфат](https://rufat.top/)

**Cursor IDE:** [Регистрация по реферальной ссылке](https://cursor.com/referral?code=GCE2SLLVIM87) — при подписке поддерживаете автора.
