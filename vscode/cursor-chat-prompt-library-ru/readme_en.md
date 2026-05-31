# Cursor Chat Prompt Library RU

[Русский](readme.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Repository](https://github.com/rufatpro/plugins)

**850 Russian** prompt templates for **Cursor AI chat** — QuickPick → insert into chat.

**41 categories** (**Python × 50**, others × 20) **= 850 templates:**

| Tier | Categories |
|------|------------|
| Core | Website, Python, JavaScript, TypeScript, React, SQL, Git, Django, Flask |
| High demand | Next.js, FastAPI, Docker, Testing, Tailwind CSS |
| Strong demand | Node.js, NestJS, Vue, PHP, Laravel, C#/.NET, Java/Spring, Linux/Bash, CI/CD, REST/OpenAPI, MongoDB, Mobile |
| Growing / niche | C, C++, Go, Rust, Kubernetes, Terraform, Observability, AWS/Cloud, WordPress, Data/Pandas, Security, GraphQL |
| Cross-cutting | Prompt Engineering, Programming Languages, Machine Learning |

> Part of the [plugins](https://github.com/rufatpro/plugins) monorepo.

## Hotkey (primary)

| Key | Action |
|-----|--------|
| **Ctrl+Alt+Shift+P** (Windows/Linux) | **Step 1:** category (41 types) → **Step 2:** prompt → insert into chat |
| **Cmd+Alt+Shift+P** (macOS) | Same |

## Commands

| Command | Action |
|---------|--------|
| **Pick Prompt (Category, then Template)** | Same as hotkey (two steps) |
| **Insert Prompt into Chat (All Categories)** | Single list, all 850 prompts |
| **Insert Website / Python / JavaScript Prompt** | One category only (legacy shortcuts) |

### Via Command Palette

> **F1** or `Ctrl+Shift+P` → **Pick Prompt** (or filter `Cursor Chat Prompt Library RU`).  
> Use when you do not remember the hotkey or it conflicts with another extension.

## Requirements

- **Cursor** recommended (`workbench.action.chat.open` and Composer commands).
- Plain VS Code: prompts copy to clipboard if chat cannot open.

## Install (development)

```bat
cd plugins\vscode\cursor-chat-prompt-library-ru
build.bat
cursor --install-extension build\cursor-chat-prompt-library-ru-0.5.9.vsix
```

Reload the window. Primary: **Ctrl+Alt+Shift+P** (see **Via Command Palette** for **F1**).

## Maintaining prompts

- Bundled data: `prompts/*.json` (one file per category).
- Regenerate extended categories (batch 1): `node scripts/generate-extra-categories.mjs`
- Append batch 2 (+10 per file): `node scripts/append-batch-2.mjs` (uses `scripts/batch-2-prompts.mjs`)
- Display order: `CATEGORY_FILE_ORDER` in `src/promptStore.js`.

## License

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — free to use, modify, and distribute, at your own risk.  
[plugins monorepo](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Author

[Rufat](https://rufat.top/)

**Cursor IDE:** [Sign up with referral link](https://cursor.com/referral?code=GCE2SLLVIM87) — supports the author when you subscribe.
