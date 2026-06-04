# Cursor Chat Prompt Library

[English](readme.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Репозиторий](https://github.com/rufatpro/plugins)

Библиотека шаблонов для **AI-чата Cursor**: QuickPick → вставка в чат.

**1080 шаблонов** — 42 категории (**Python × 50**, **JavaScript / TypeScript / React / Next.js / Tailwind / Node.js / NestJS × 50**, остальные × 20):

| Уровень | Категории |
|---------|-----------|
| Базовые | Сайт, Python, JavaScript, TypeScript, React, SQL, Git, Django, Flask, SQLAlchemy |
| Высокий спрос | Next.js, FastAPI, Docker, Testing, Tailwind CSS |
| Сильный спрос | Node.js, NestJS, Vue, PHP, Laravel, C#/.NET, Java/Spring, Linux/Bash, CI/CD, REST/OpenAPI, MongoDB, Mobile |
| Нишевые / растущие | C, C++, Go, Rust, Kubernetes, Terraform, Observability, AWS, WordPress, Data/Pandas, Security, GraphQL |
| Сквозные | Промпт-инжиниринг, Языки программирования, Машинное обучение |

> Часть monorepo [plugins](https://github.com/rufatpro/plugins).

## Горячая клавиша (основной способ)

| Клавиша | Действие |
|---------|----------|
| **Ctrl+Alt+T** | **Шаг 1:** категория (42 типа) → **шаг 2:** промпт → вставка в чат |
| **Cmd+Alt+T** (macOS) | То же |

Одновременно **Ctrl**, **Alt** и **T** (**T** = **T**emplate, шаблон).

## Горячая клавиша (альтернатива)

| Клавиша | Действие |
|---------|----------|
| **Ctrl+Alt+Shift+P** | Тот же двухшаговый QuickPick |
| **Cmd+Alt+Shift+P** (macOS) | То же |

## Команды

| Команда | Действие |
|---------|----------|
| **Pick Prompt (Category, then Template)** | Как горячая клавиша |
| **Insert Prompt into Chat (All Categories)** | Один список из 1080 промптов |
| **Insert Website / Python / JavaScript** | Быстрый вход в одну категорию |

### Через палитру команд

> **F1** или `Ctrl+Shift+P` → **Pick Prompt** (или `Cursor Chat Prompt Library`).  
> Удобно, если горячую клавишу не помните или она занята другим расширением.

## Установка

```bat
cd plugins\vscode\cursor-chat-prompt-library
build.bat
cursor --install-extension build\cursor-chat-prompt-library-0.8.5.vsix
```

Перезагрузите окно. Основной способ — **Ctrl+Alt+T**; альтернатива — **Ctrl+Alt+Shift+P** (см. раздел «Через палитру команд» для **F1**).

## Поддержка каталога

- Файлы: `prompts/*.json`
- Batch 1 (23 категории): `node scripts/generate-extra-categories.mjs`
- Batch 2 (+10 в каждый файл): `node scripts/append-batch-2.mjs`
- Batch 3 (+30 для JS-стека): `node scripts/append-batch-3-js-stack.mjs`
- Batch 3 NestJS (+30): `node scripts/append-batch-3-nestjs.mjs`
- Порядок в списке: `CATEGORY_FILE_ORDER` в `src/promptStore.js`

## Лицензия

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — свободное использование, изменение и распространение на ваш риск.  
[monorepo plugins](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Автор

[Руфат](https://rufat.top/)

**Cursor IDE:** [Регистрация по реферальной ссылке](https://cursor.com/referral?code=GCE2SLLVIM87) — при подписке поддерживаете автора.
