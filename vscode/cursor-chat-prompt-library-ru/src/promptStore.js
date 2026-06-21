// @ts-check
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");

/** @typedef {{ id: string, label: string, description?: string, detail?: string, text: string }} PromptEntry */

/** @typedef {{ category: string, categoryLabel: string, prompts: PromptEntry[] }} PromptCategoryFile */

/** Display order in QuickPick (step 1). Files not listed are appended alphabetically. */
const CATEGORY_FILE_ORDER = [
  "website.json",
  "python.json",
  "javascript.json",
  "typescript.json",
  "react.json",
  "angular.json",
  "sql.json",
  "postgresql.json",
  "git.json",
  "django.json",
  "flask.json",
  "sqlalchemy.json",
  "nextjs.json",
  "fastapi.json",
  "celery.json",
  "docker.json",
  "testing.json",
  "tailwind.json",
  "nodejs.json",
  "nestjs.json",
  "vue.json",
  "php.json",
  "php-laravel.json",
  "csharp.json",
  "java.json",
  "linux.json",
  "cicd.json",
  "rest-api.json",
  "mongodb.json",
  "kafka.json",
  "rabbitmq.json",
  "mobile.json",
  "kotlin.json",
  "android-java.json",
  "android-kotlin.json",
  "swift.json",
  "c.json",
  "cpp.json",
  "go.json",
  "zig.json",
  "rust.json",
  "kubernetes.json",
  "terraform.json",
  "observability.json",
  "aws.json",
  "wordpress.json",
  "data.json",
  "security.json",
  "graphql.json",
  "regex.json",
  "prompt-engineering.json",
  "programming-languages.json",
  "machine-learning.json",
];

/**
 * @param {string} promptsDir
 * @returns {string[]}
 */
function listCategoryFiles(promptsDir) {
  if (!fs.existsSync(promptsDir)) {
    return [];
  }
  const onDisk = fs
    .readdirSync(promptsDir)
    .filter((f) => f.endsWith(".json"));
  const ordered = [];
  for (const file of CATEGORY_FILE_ORDER) {
    if (onDisk.includes(file)) {
      ordered.push(file);
    }
  }
  for (const file of onDisk.sort()) {
    if (!ordered.includes(file)) {
      ordered.push(file);
    }
  }
  return ordered;
}

/**
 * @param {string} extensionPath
 * @returns {PromptCategoryFile[]}
 */
function loadAllCategories(extensionPath) {
  const promptsDir = path.join(extensionPath, "prompts");
  /** @type {PromptCategoryFile[]} */
  const categories = [];

  for (const file of listCategoryFiles(promptsDir)) {
    const filePath = path.join(promptsDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    /** @type {PromptCategoryFile} */
    const data = JSON.parse(raw);
    categories.push(data);
  }

  return categories;
}

/**
 * @param {PromptCategoryFile[]} categories
 * @param {string | undefined} categoryFilter
 * @returns {(vscode.QuickPickItem & { prompt?: PromptEntry })[]}
 */
function toQuickPickItems(categories, categoryFilter) {
  /** @type {(vscode.QuickPickItem & { prompt?: PromptEntry })[]} */
  const items = [];

  for (const cat of categories) {
    if (categoryFilter && cat.category !== categoryFilter) {
      continue;
    }
    if (!categoryFilter) {
      items.push({
        label: cat.categoryLabel,
        kind: vscode.QuickPickItemKind.Separator,
      });
    }
    for (const p of cat.prompts) {
      items.push({
        label: p.label,
        description: p.description || cat.categoryLabel,
        detail: p.detail,
        prompt: p,
      });
    }
  }

  return items;
}

/**
 * @param {vscode.ExtensionContext} context
 * @param {string | undefined} categoryFilter
 * @returns {Promise<PromptEntry | undefined>}
 */
async function pickPrompt(context, categoryFilter) {
  const categories = loadAllCategories(context.extensionPath);
  const items = toQuickPickItems(categories, categoryFilter);

  const placeHolder = categoryFilter
    ? "Шаг 2 — выберите шаблон промпта"
    : "Выберите шаблон промпта";

  const picked = await vscode.window.showQuickPick(items, {
    title: categoryFilter
      ? "Cursor Chat Prompt Library RU — промпт"
      : "Cursor Chat Prompt Library RU",
    placeHolder,
    matchOnDescription: true,
    matchOnDetail: true,
  });

  if (!picked || !picked.prompt) {
    return undefined;
  }
  return picked.prompt;
}

/**
 * @param {vscode.ExtensionContext} context
 * @returns {Promise<string | undefined>}
 */
async function pickCategory(context) {
  const categories = loadAllCategories(context.extensionPath);
  if (categories.length === 0) {
    return undefined;
  }

  const items = categories.map((cat) => ({
    label: cat.categoryLabel,
    description: `${cat.prompts.length} шаблонов`,
    category: cat.category,
  }));

  const picked = await vscode.window.showQuickPick(items, {
    title: "Cursor Chat Prompt Library RU",
    placeHolder: `Шаг 1 — выберите категорию (${categories.length} типов)`,
    matchOnDescription: true,
  });

  return picked?.category;
}

/**
 * @param {vscode.ExtensionContext} context
 * @returns {Promise<PromptEntry | undefined>}
 */
async function pickPromptTwoStep(context) {
  const category = await pickCategory(context);
  if (!category) {
    return undefined;
  }
  return pickPrompt(context, category);
}

module.exports = {
  loadAllCategories,
  pickPrompt,
  pickCategory,
  pickPromptTwoStep,
  listCategoryFiles,
};
