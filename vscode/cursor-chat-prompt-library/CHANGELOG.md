# Changelog

## 0.8.5

- New category **SQLAlchemy** (20 prompts): Engine, ORM 2.0, relationships, Alembic, async, FastAPI integration, testing.
- Total bundled templates: **1080** (42 categories).

## 0.8.4

- **NestJS** category expanded to **50** prompts (batch 3, prompts 21–50).
- Total bundled templates: **1060** (41 categories; Python × 50, JS stack + NestJS × 50, others × 20).

## 0.8.3

- Expanded to **50 prompts** each in **JavaScript**, **TypeScript**, **React**, **Next.js**, **Tailwind CSS**, and **Node.js Backend** (batch 3, prompts 21–50).
- Total bundled templates: **1030** (41 categories; Python × 50, JS stack × 50, others × 20).

## 0.8.2

- New categories (20 prompts each): **Flask**, **NestJS**, **Terraform & IaC**, **Observability**, **Prompt Engineering & AI Workflow**.
- Total bundled templates: **850** (41 categories; Python × 50, others × 20).

## 0.8.1

- Marketplace categories: **Programming Languages**, **Machine Learning**, **Other**.

## 0.8.0

- New **Programming Languages** and **Machine Learning** categories (20 prompts each).
- Total bundled templates: **750** (36 categories; Python × 50, others × 20).

## 0.7.9

- Readme: removed release guide link from header.

## 0.7.8

- Repository moved to [github.com/rufatpro/plugins](https://github.com/rufatpro/plugins); updated `repository`, `homepage`, and `vsce.baseContentUrl` in metadata.

## 0.7.7

- Release: primary **Ctrl+Alt+T** (`Cmd+Alt+T` on macOS), alternative **Ctrl+Alt+Shift+P**.

## 0.7.6

- **Primary hotkey:** **Ctrl+Alt+T** (`Cmd+Alt+T` on macOS) — single simultaneous press (**T** = Template).
- Replaces chord **Ctrl+K Alt+P** from 0.7.5.
- **Alternative hotkey:** **Ctrl+Alt+Shift+P** — unchanged.

## 0.7.5

- **Primary hotkey:** **Ctrl+K Alt+P** (`Cmd+K Alt+P` on macOS) — chord, fewer keymap conflicts.
- **Alternative hotkey:** **Ctrl+Alt+Shift+P** (`Cmd+Alt+Shift+P`) — unchanged.
- README and Marketplace description: primary vs alternative hotkeys documented.

## 0.7.4

- Maintenance release: version bump and release metadata update.

## 0.7.3

- README: **Ctrl+Alt+Shift+P** as the primary way to open prompts; **F1** / Command Palette documented as an alternative.

## 0.7.2

- Hotkey changed to **Ctrl+Alt+Shift+P** (`Cmd+Alt+Shift+P` on macOS) to avoid keymap conflicts (e.g. IntelliJ *Introduce Parameter* on Ctrl+Alt+P).
- Extension unbinds conflicting `editor.action.codeAction` rules on the new key at install time.

## 0.7.1

- **Ctrl+Alt+P**: takes precedence over IntelliJ *Introduce Parameter* in the editor (more specific `when` clause).

## 0.7.0

- New **C** and **C++** categories (20 prompts each).
- Total bundled templates: **710** (34 categories; Python × 50, others × 20).

## 0.6.0

- **Python** category expanded from 20 to **50** prompts (`py-21` … `py-50`).
- New **PHP** category (20 plain PHP prompts); **Laravel** category renamed from «PHP / Laravel».
- Total bundled templates: **670** (32 categories; Python × 50, others × 20).

## 0.4.3

- Cursor referral link in readme **Author** / **Автор** section.

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
