# Cursor Chat Prompt Library

[Русский](readme_ru.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Repository](https://github.com/rufatpro/plugins)

**QuickPick** templates for **Cursor AI chat** — pick a prompt and insert into chat (Composer & Agent).

**1080 templates** — 42 categories (**Python × 50**, **JavaScript / TypeScript / React / Next.js / Tailwind / Node.js / NestJS × 50**, others × 20):

| Tier | Categories |
|------|------------|
| Core | Website, Python, JavaScript, TypeScript, React, SQL, Git, Django, Flask, SQLAlchemy |
| High demand | Next.js, FastAPI, Docker, Testing, Tailwind CSS |
| Strong demand | Node.js, NestJS, Vue, PHP, Laravel, C#/.NET, Java/Spring, Linux/Bash, CI/CD, REST/OpenAPI, MongoDB, Mobile |
| Growing / niche | C, C++, Go, Rust, Kubernetes, Terraform, Observability, AWS/Cloud, WordPress, Data/Pandas, Security, GraphQL |
| Cross-cutting | Prompt Engineering, Programming Languages, Machine Learning |

> Part of the [plugins](https://github.com/rufatpro/plugins) monorepo.

## Hotkey (primary)

| Key | Action |
|-----|--------|
| **Ctrl+Alt+T** (Windows/Linux) | **Step 1:** category (42 types) → **Step 2:** prompt → insert into chat |
| **Cmd+Alt+T** (macOS) | Same |

Press **Ctrl**, **Alt**, and **T** together (**T** = **T**emplate).

## Hotkey (alternative)

| Key | Action |
|-----|--------|
| **Ctrl+Alt+Shift+P** (Windows/Linux) | Same two-step QuickPick |
| **Cmd+Alt+Shift+P** (macOS) | Same |

## Commands

| Command | Action |
|---------|--------|
| **Pick Prompt (Category, then Template)** | Same as hotkey (two steps) |
| **Insert Prompt into Chat (All Categories)** | Single list, all 1080 prompts |
| **Insert Website / Python / JavaScript Prompt** | One category only (legacy shortcuts) |

### Via Command Palette

> **F1** or `Ctrl+Shift+P` → **Pick Prompt** (or filter `Cursor Chat Prompt Library`).  
> Use when you do not remember the hotkey or it conflicts with another extension.

## Requirements

- **Cursor** recommended (`workbench.action.chat.open` and Composer commands).
- Plain VS Code: prompts copy to clipboard if chat cannot open.

## Install (development)

```bat
cd plugins\vscode\cursor-chat-prompt-library
build.bat
cursor --install-extension build\cursor-chat-prompt-library-0.8.5.vsix
```

Reload the window. Primary: **Ctrl+Alt+T**; alternative: **Ctrl+Alt+Shift+P** (see **Via Command Palette** for **F1**).

## Maintaining prompts

- Bundled data: `prompts/*.json` (one file per category).
- Regenerate extended categories (batch 1): `node scripts/generate-extra-categories.mjs`
- Append batch 2 (+10 per file): `node scripts/append-batch-2.mjs` (uses `scripts/batch-2-prompts.mjs`)
- Append batch 3 (+30 for JS stack): `node scripts/append-batch-3-js-stack.mjs` (uses `scripts/batch-3-js-stack-prompts.mjs`)
- Append batch 3 NestJS (+30): `node scripts/append-batch-3-nestjs.mjs` (uses `scripts/batch-3-nestjs-prompts.mjs`)
- Display order: `CATEGORY_FILE_ORDER` in `src/promptStore.js`.

## License

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — free to use, modify, and distribute, at your own risk.  
[plugins monorepo](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Author

[Rufat](https://rufat.top/)

**Cursor IDE:** [Sign up with referral link](https://cursor.com/referral?code=GCE2SLLVIM87) — supports the author when you subscribe.
