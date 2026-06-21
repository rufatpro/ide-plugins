# Cursor Chat Prompt Library RU

[English](readme_en.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Репозиторий](https://github.com/rufatpro/plugins)

Библиотека **1300 русскоязычных** шаблонов Промптов (Prompts) для AI-Chat в **Cursor**: Быстрый выбор → вставка в ИИ Чат Курсора.

**53 категории** (**Python × 50**, **JavaScript / TypeScript / React / Next.js / Tailwind / Node.js / NestJS × 50**, остальные × 20) **= 1300 шаблонов:**

| Уровень | Категории |
|---------|-----------|
| Базовые | Сайт, Python, JavaScript, TypeScript, React, Angular, SQL, PostgreSQL, Git, Django, Flask, SQLAlchemy |
| Высокий спрос | Next.js, FastAPI, Celery, Docker, Testing, Tailwind CSS |
| Сильный спрос | Node.js, NestJS, Vue, PHP, Laravel, C#/.NET, Java/Spring, Linux/Bash, CI/CD, REST/OpenAPI, MongoDB, Kafka, RabbitMQ, Mobile, Kotlin, Android (Java), Android (Kotlin), Swift |
| Нишевые / растущие | C, C++, Go, Zig, Rust, Kubernetes, Terraform, Observability, AWS, WordPress, Data/Pandas, Security, GraphQL |
| Сквозные | Regex, Промпт-инжиниринг, Языки программирования, Машинное обучение |

> Часть monorepo [plugins](https://github.com/rufatpro/plugins).

## Горячая клавиша (основной способ)

| Клавиша | Действие |
|---------|----------|
| **Ctrl+Alt+Shift+P** | **Шаг 1:** категория (53 типа) → **шаг 2:** промпт → вставка в чат |
| **Cmd+Alt+Shift+P** (macOS) | То же |

## Команды

| Команда | Действие |
|---------|----------|
| **Выбрать промпт (категория → шаблон)** | Как горячая клавиша |
| **Вставить промпт в чат (все категории)** | Один список из 1300 промптов |
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
cursor --install-extension build\cursor-chat-prompt-library-ru-0.6.6.vsix
```

Перезагрузите окно. Основной способ — **Ctrl+Alt+Shift+P** (см. раздел «Через палитру команд» для **F1**).

## Поддержка каталога

- Файлы: `prompts/*.json`
- Batch 1 (23 категории): `node scripts/generate-extra-categories.mjs`
- Batch 2 (+10 в каждый файл): `node scripts/append-batch-2.mjs`
- Batch 3 (+30 JS-стек): `node scripts/append-batch-3-js-stack.mjs`
- Batch 3 NestJS (+30): `node scripts/append-batch-3-nestjs.mjs`
- Batch 8 (8 категорий): `node scripts/generate-batch-8-categories.mjs`
- Порядок в списке: `CATEGORY_FILE_ORDER` в `src/promptStore.js`

## Лицензия

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — свободное использование, изменение и распространение на ваш риск.  
[monorepo plugins](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Автор

[Руфат](https://rufat.top/)

**Cursor IDE:** [Регистрация по реферальной ссылке](https://cursor.com/referral?code=GCE2SLLVIM87) — при подписке поддерживаете автора.
