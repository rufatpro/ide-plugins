# Multiline Find

[English](readme.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Репозиторий](https://github.com/rufatpro/plugins)

**Ctrl+F** в стиле PyCharm для многострочного текста: выделите блок, нажмите Ctrl+F, затем **F3** — следующее совпадение по **всему файлу**.

> Разработано с помощью AI (Cursor / LLM). Часть монорепозитория [plugins](https://github.com/rufatpro/plugins).

> **Совместимость:** расширение работает не только в VS Code и Cursor — оно совместимо с **любой средой на базе VS Code**, в том числе **Google Antigravity IDE**, VSCodium, Windsurf и другими форками с поддержкой стандартных расширений (Open VSX или установка из VSIX).

## Проблема

Встроенный `actions.find` не подставляет многострочное выделение в поле поиска. Значение `editor.find.autoFindInSelection: "multiline"` ограничивает поиск выделением и ломает **F3** за его пределами.

## Решение

Расширение:

1. Копирует выделенный текст (с переносами строк) в поле поиска
2. Снимает выделение, чтобы поиск не был ограничен им
3. Переназначает **Ctrl+F** в редакторе на `multilineFind.open`

## Настройки (применяются автоматически)

При **включённом** расширении значения по умолчанию задаются через `configurationDefaults`:

```json
{
  "editor.find.autoFindInSelection": "never",
  "editor.find.seedSearchStringFromSelection": "selection"
}
```

Вручную прописывать их в `settings.json` **не обязательно**. Если эти ключи уже заданы у вас — **ваши значения важнее**, чем defaults расширения.

### Зачем нужны эти опции

| Настройка | Значение | Назначение |
|-----------|----------|------------|
| `editor.find.autoFindInSelection` | `"never"` | **Не** включать автоматически режим «Искать в выделении». При `"multiline"` VS Code/Cursor ограничивает поиск выделенным блоком, если выделено несколько строк — **F3** не находит совпадения дальше границы выделения. `"never"` оставляет поиск по всему файлу. |
| `editor.find.seedSearchStringFromSelection` | `"selection"` | При открытии поиска **без** расширения (или через встроенные команды) подставлять в поле поиска **весь** выделенный текст, а не только слово под курсором. Полезно для однострочного выделения; многострочный случай обрабатывает само расширение. |

Другие значения для справки:

- `autoFindInSelection`: `"always"` — всегда искать только внутри выделения; `"multiline"` — то же, но только при многострочном выделении.
- `seedSearchStringFromSelection`: `"never"` — пустое поле или буфер обмена; `"always"` — подставлять выделение только если это одно слово на одной строке (многострочное встроенный find игнорирует).

Эти настройки **дополняют** расширение, но **не заменяют** его — встроенный find сам по себе многострочный запрос в поле не формирует.

Чтобы переопределить defaults, добавьте ключи в User или Workspace `settings.json`.

## Установка из VSIX

Сборка:

```powershell
cd vscode/multiline-find
build.bat
```

Установка:

```powershell
cursor --install-extension build/multiline-find-0.1.6.vsix
```

Или в любой VS Code-совместимой среде (VS Code, Cursor, Antigravity, …): Extensions → `...` → **Install from VSIX...**

## Ручной многострочный поиск

Можно вставить многострочный текст в поле поиска или нажать **Ctrl+Enter**, чтобы добавить новую строку в запрос.

## Лицензия

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — свободное использование, изменение и распространение, на ваш риск.  
[Монорепозиторий plugins](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Автор

[Руфат](https://rufat.top/)

**Cursor IDE:** [Регистрация по реферальной ссылке](https://cursor.com/referral?code=GCE2SLLVIM87) — при подписке поддерживаете автора.
