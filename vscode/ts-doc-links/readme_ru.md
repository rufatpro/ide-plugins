# TypeScript Doc Links

Идентификатор пакета: `ts-doc-links`.

[English](https://github.com/rufatpro/plugins/blob/main/vscode/ts-doc-links/readme.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Репозиторий](https://github.com/rufatpro/plugins)

**Расширение для сред, совместимых с VS Code** — переход к определению из **комментариев** и **JSDoc** в TypeScript/JavaScript для форматов, которые **не** обрабатывает TypeScript (Native Preview).

Делает кликабельными `@see ./emailValidator.ts`, `File: utils.ts`, `// See utils.ts:3` через Ctrl+Click (или F12).

> Разработано с помощью AI (Cursor / LLM). Часть монорепозитория [plugins](https://github.com/rufatpro/plugins).

> **Совместимость:** расширение работает не только в VS Code и Cursor — оно совместимо с **любой средой на базе VS Code**, в том числе **Google Antigravity IDE**, VSCodium, Windsurf и другими форками с поддержкой стандартных расширений (Open VSX или установка из VSIX).  

## Поддерживаемые паттерны

| Паттерн | Переход к |
|--------|-----------|
| `@see ./file.ts` | Файл (относительно текущего) |
| `{@link ./userService.ts}` | Файл |
| `{@link formatDate}` | Экспорт/символ в текущем файле |
| `{@link utils.formatDate}` | `utils.ts` + экспорт |
| `{@link UserService#getById}` | Метод класса (через import → `userService.ts`) |
| `{@link UserService.getById}` | То же, что форма с `#` |
| `{@link userService.ts.getById}` | Файл + символ (толерантная форма) |
| `File: utils.ts` | Файл (приоритет same-folder, не `docs/`) |
| `// See utils.ts:3` | Файл + строка (1-based) |
| `` `src/foo.ts` `` | Файл |
| `client.ts:42`, `client.ts#L42` | Файл + строка |
| `@/lib/formatDate` | Путь из `paths` ближайшего `tsconfig.json` |

## Пример

```typescript
/**
 * @see ./emailValidator.ts
 * File: utils.ts
 * {@link formatDate}
 */
export function login() {
  // See utils.ts:3
}
```

## Установка (через VSIX)

Сборка:

```bash
npm install -g @vscode/vsce
cd vscode/ts-doc-links
build.bat
```

Установка (любая VS Code-совместимая среда):

1. **F1** / **Ctrl+Shift+P** → `Install from VSIX`
2. **Extensions: Install from VSIX...**
3. Указать `vscode/ts-doc-links/build/ts-doc-links-0.1.7.vsix`

## Ограничения

- Эвристический поиск символов (`export function`, `export class`, …).
- При дубликатах имён — файл рядом с исходником; штраф для `docs/`, `dist/`, `node_modules/` и т.д.
- Методы класса: сначала `import { Class } from '...'` в текущем файле.
- Нет rename/find-usages для текстовых ссылок.

## Лицензия

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — использование на свой риск.  
[plugins](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Автор

[Rufat](https://rufat.top/)

**Cursor IDE:** [Регистрация по реферальной ссылке](https://cursor.com/referral?code=GCE2SLLVIM87) — при подписке поддерживаете автора.
