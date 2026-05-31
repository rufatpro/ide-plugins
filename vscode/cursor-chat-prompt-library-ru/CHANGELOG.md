# Changelog

## 0.6.0

- Новые категории (по 20 промптов): **Flask**, **NestJS**, **Terraform и IaC**, **Наблюдаемость**, **Промпт-инжиниринг и AI-воркфлоу**.
- Всего шаблонов: **850** (41 категория; Python × 50, остальные × 20).

## 0.5.9

- Marketplace categories: **Programming Languages**, **Machine Learning**, **Other**.

## 0.5.8

- Новые категории **Языки программирования** и **Машинное обучение** (по 20 промптов), переводы на русский.
- Всего шаблонов: **750** (36 категорий; Python × 50, остальные × 20).

## 0.5.7

- Readme: removed release guide link from header.

## 0.5.6

- Repository moved to [github.com/rufatpro/plugins](https://github.com/rufatpro/plugins); updated metadata URLs.

## 0.5.5

- Maintenance release: version bump and release metadata update.

## 0.5.3

- README: **Ctrl+Alt+Shift+P** — основной способ; **F1** / палитра команд — альтернатива.

## 0.5.2

- Горячая клавиша: **Ctrl+Alt+Shift+P** (`Cmd+Alt+Shift+P` на macOS) — без конфликта с IntelliJ *Introduce Parameter* (Ctrl+Alt+P).
- При установке расширение снимает конфликтующие привязки `editor.action.codeAction` на этой клавише.

## 0.5.1

- **Ctrl+Alt+P**: приоритет над IntelliJ *Introduce Parameter* в редакторе (`when` с большей специфичностью).

## 0.5.0

- Новые категории **C** и **C++** (по 20 промптов), переводы на русский.
- Всего шаблонов: **710** (34 категории; Python × 50, остальные × 20).

## 0.4.0

- Категория **Python**: **50** промптов (`py-21` … `py-50`), переводы на русский.
- Новая категория **PHP** (20 промптов); категория **Laravel** (бывш. «PHP / Laravel»).
- Всего шаблонов: **670** (32 категории; Python × 50, остальные × 20).

## 0.2.1

- Расширено описание расширения (`description`): ключевые слова AI, ИИ, Chat, Чат, Cursor, Курсор, Prompt, Промпт.

## 0.2.0

- Все 620 промптов переведены на русский: `categoryLabel`, `label`, `description`, `detail`, `text`.
- Сообщения расширения и QuickPick — на русском.
- Документация: `readme.md` (RU по умолчанию), `readme_en.md` (EN).

## 0.1.0

- Initial release of `cursor-chat-prompt-library-ru` based on `cursor-chat-prompt-library` 0.4.3.
- Separate extension id/commands so RU and original extensions can be installed together.

## 0.4.3

- Upstream history from `cursor-chat-prompt-library`.

## 0.4.2

- Author block aligned with other plugins extensions (`## Author` / `## Автор`, link [Rufat](https://rufat.top/)).

## 0.4.1

- Author line in readme (superseded by 0.4.2 format).

## 0.4.0

- **+10 prompts per category** (batch 2): each of 31 categories now has **20** templates (**620** total).
- Data: `scripts/batch-2-prompts.mjs`, apply with `node scripts/append-batch-2.mjs`.

## 0.3.0

- **23 new categories** (10 prompts each): Next.js, FastAPI, Docker, Testing, Tailwind, Node.js, Vue, PHP/Laravel, C#/.NET, Java/Spring, Linux/Bash, CI/CD, REST/OpenAPI, MongoDB, Mobile, Go, Rust, Kubernetes, AWS, WordPress, Data/Pandas, Security, GraphQL.
- **310** bundled templates (**31** categories total).
- Category list order in QuickPick; generator script `scripts/generate-extra-categories.mjs`.

## 0.2.0

- Five new categories (10 prompts each): **TypeScript**, **React**, **SQL**, **Git**, **Django**.
- **80** bundled templates total (8 categories).

## 0.1.1

- Hotkey **Ctrl+Alt+P** (`Cmd+Alt+P` on macOS): two-step QuickPick — category, then prompt.
- Command **Pick Prompt (Category, then Template)**.

## 0.1.0

- Initial release: QuickPick prompt library for Cursor AI chat.
- 30 bundled templates: 10 Website (HTML/CSS), 10 Python, 10 JavaScript.
- Insert via `workbench.action.chat.open` with clipboard fallback.
