# Cursor Chat Prompt Library RU

[English](readme_en.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Репозиторий](https://github.com/rufatpro/plugins)

Библиотека **850 русскоязычных** шаблонов Промптов (Prompts) для AI-Chat в **Cursor**: Быстрый выбор → вставка в ИИ Чат Курсора.

**41 категория** (**Python × 50**, остальные × 20) **= 850 шаблонов:**

| Уровень | Категории |
|---------|-----------|
| Базовые | Сайт, Python, JavaScript, TypeScript, React, SQL, Git, Django, Flask |
| Высокий спрос | Next.js, FastAPI, Docker, Testing, Tailwind CSS |
| Сильный спрос | Node.js, NestJS, Vue, PHP, Laravel, C#/.NET, Java/Spring, Linux/Bash, CI/CD, REST/OpenAPI, MongoDB, Mobile |
| Нишевые / растущие | C, C++, Go, Rust, Kubernetes, Terraform, Observability, AWS, WordPress, Data/Pandas, Security, GraphQL |
| Сквозные | Промпт-инжиниринг, Языки программирования, Машинное обучение |

> Часть monorepo [plugins](https://github.com/rufatpro/plugins).

## Горячая клавиша (основной способ)

| Клавиша | Действие |
|---------|----------|
| **Ctrl+Alt+Shift+P** | **Шаг 1:** категория (41 тип) → **шаг 2:** промпт → вставка в чат |
| **Cmd+Alt+Shift+P** (macOS) | То же |

## Команды

| Команда | Действие |
|---------|----------|
| **Выбрать промпт (категория → шаблон)** | Как горячая клавиша |
| **Вставить промпт в чат (все категории)** | Один список из 850 промптов |
| **Вставить промпт Website / Python / JavaScript** | Быстрый вход в одну категорию |

### Через палитру команд

> **F1** или `Ctrl+Shift+P` → **Выбрать промпт** (или фильтр `Cursor Chat Prompt Library RU`).  
> Удобно, если горячую клавишу не помните или она занята другим расширением.

## Требования

- Рекомендуется **Cursor** (`workbench.action.chat.open` и команды Composer).
- В обычном VS Code: если чат не открывается, промпт копируется в буфер обмена.

## Установка

```bat
cd plugins\vscode\cursor-chat-prompt-library-ru
build.bat
cursor --install-extension build\cursor-chat-prompt-library-ru-0.5.9.vsix
```

Перезагрузите окно. Основной способ — **Ctrl+Alt+Shift+P** (см. раздел «Через палитру команд» для **F1**).

## Поддержка каталога

- Файлы: `prompts/*.json`
- Batch 1 (23 категории): `node scripts/generate-extra-categories.mjs`
- Batch 2 (+10 в каждый файл): `node scripts/append-batch-2.mjs`
- Порядок в списке: `CATEGORY_FILE_ORDER` в `src/promptStore.js`

## Лицензия

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — свободное использование, изменение и распространение на ваш риск.  
[monorepo plugins](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Автор

[Руфат](https://rufat.top/)

**Cursor IDE:** [Регистрация по реферальной ссылке](https://cursor.com/referral?code=GCE2SLLVIM87) — при подписке поддерживаете автора.
