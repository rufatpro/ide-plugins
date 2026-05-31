/**
 * One-off: add prompt-engineering, observability, terraform, nestjs, flask (EN + RU).
 * Run from cursor-chat-prompt-library: node scripts/add-five-categories.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const enDir = path.join(__dirname, "..", "prompts");
const ruDir = path.join(__dirname, "..", "..", "cursor-chat-prompt-library-ru", "prompts");

/** @typedef {{ label: string, description: string, detail: string, text: string }} PromptDef */

/**
 * @param {string} category
 * @param {string} categoryLabelEn
 * @param {string} categoryLabelRu
 * @param {PromptDef[]} en
 * @param {PromptDef[]} ru
 */
function writeCategory(category, categoryLabelEn, categoryLabelRu, en, ru) {
  if (en.length !== 20 || ru.length !== 20) {
    throw new Error(`${category}: expected 20 prompts, got en=${en.length} ru=${ru.length}`);
  }
  const toFile = (label, prompts) => ({
    category,
    categoryLabel: label,
    prompts: prompts.map((p, i) => ({
      id: `${category}-${String(i + 1).padStart(2, "0")}`,
      ...p,
    })),
  });
  fs.writeFileSync(
    path.join(enDir, `${category}.json`),
    JSON.stringify(toFile(categoryLabelEn, en), null, 2) + "\n",
    "utf8"
  );
  fs.writeFileSync(
    path.join(ruDir, `${category}.json`),
    JSON.stringify(toFile(categoryLabelRu, ru), null, 2) + "\n",
    "utf8"
  );
  console.log(`wrote ${category}.json (EN + RU)`);
}

writeCategory(
  "prompt-engineering",
  "Prompt Engineering & AI Workflow",
  "Промпт-инжиниринг и AI-воркфлоу",
  [
    ["Split a large task into steps", "planning", "atomic requests", "I have a large feature to implement in this repo.\n\n- Ask clarifying questions first (max 5)\n- Propose 3–5 atomic steps I can run as separate chat messages\n- Each step must have: goal, files likely touched, done criteria\n\nDo not write code until I pick a step."],
    ["Context + constraints + done criteria", "template", "structured prompt", "Rewrite my vague request into a strong Cursor prompt using this skeleton:\n\n- Context (@files I should attach)\n- Constraints (style, libs, no new deps unless asked)\n- Done criteria (tests, lint, behavior)\n\nHere is my request:\n[PASTE HERE]\n\nOutput only the improved prompt."],
    ["Verify AI answer against repo", "review", "hallucination check", "You proposed changes. Before I apply them:\n\n- List assumptions you made about this codebase\n- Point to exact files/symbols you would need to confirm\n- Suggest 3 grep/search queries I should run\n\nDo not invent file paths."],
    ["Plan then code (two-phase)", "workflow", "Composer vs Agent", "Phase 1 — planning only:\n- Summarize current behavior from @codebase\n- Propose approach with trade-offs (2 options max)\n- List risks and test plan\n\nStop. I will reply GO to start Phase 2 implementation."],
    ["Refactor my prompt after bad answer", "meta", "iterate", "The previous answer missed the mark.\n\n- What was wrong (bullets)\n- Rewrite my original prompt to prevent that\n- Add 2 negative constraints (\"do not …\")\n\nOriginal prompt:\n[PASTE]"],
    ["@-mentions checklist", "cursor", "context", "Explain when to use @file, @folder, @codebase, @docs in Cursor for this task:\n\n[PASTE TASK]\n\nReturn a checklist of what to attach and what to paste inline.\nKeep it practical — 8 bullets max."],
    ["Diff review prompt", "review", "PR style", "Review this diff like a senior engineer:\n\n- Correctness bugs\n- Security issues\n- Missing tests\n- Naming/style consistency with repo\n\nAsk before suggesting large rewrites.\nI will paste the diff next message."],
    ["Minimal repro request", "debugging", "isolate", "Help me write a minimal repro prompt for a bug:\n\n- Steps to reproduce\n- Expected vs actual\n- Logs/stack trace placeholders\n- Which @files to include\n\nBug summary:\n[PASTE]"],
    ["Test-first prompt for a fix", "TDD", "regression", "For this bug, draft a test-first Cursor workflow:\n\n1) Write failing test describing bug\n2) Implement fix\n3) Refactor if needed\n\nBug:\n[PASTE]\n\nMatch existing test framework in repo."],
    ["Scope guard: small PR", "constraints", "incremental", "Implement only this slice in one PR-sized change:\n\n[PASTE SCOPE]\n\nRules:\n- No drive-by refactors\n- No new dependencies without asking\n- If blocked, stop and list blockers\n\nStart with a 5-line plan."],
    ["Explain before edit", "learning", "teach", "Before changing code, explain in plain language:\n\n- What the selected code does\n- Why the bug might happen (hypotheses ranked)\n- Smallest safe fix\n\nThen wait for my OK to patch.\n@file selection implied."],
    ["Generate commit message", "git", "conventional", "From the staged diff I will describe, suggest:\n\n- One-line conventional commit subject\n- 3-bullet body (why, not what)\n\nDiff summary:\n[PASTE]"],
    ["Rules / .cursorrules hint", "cursor", "project rules", "Suggest 5–8 project rules for .cursor/rules or AGENTS.md for this stack:\n\nStack: [PASTE]\n\nEach rule: one sentence, enforceable, not generic platitudes."],
    ["Compare two approaches", "architecture", "trade-offs", "Compare approach A vs B for:\n\n[PASTE PROBLEM]\n\nTable: complexity, testability, ops cost, migration risk.\nRecommend one with conditions when the other wins."],
    ["Document the decision (ADR lite)", "docs", "ADR", "Write a lightweight ADR:\n\n- Context\n- Decision\n- Consequences\n- Alternatives considered\n\nTopic:\n[PASTE]"],
    ["Handoff prompt for new chat", "workflow", "context transfer", "Summarize this thread into a handoff prompt for a fresh chat:\n\n- Goal\n- What was tried\n- Current state\n- Next 3 actions\n- Files touched\n\nBe concise — max 250 words."],
    ["Security-sensitive change checklist", "security", "review", "I'm about to change auth/payments/secrets handling.\n\n- Threat model bullets (STRIDE-lite)\n- Must-not-break invariants\n- Tests to add\n\nChange description:\n[PASTE]"],
    ["Performance investigation prompt", "perf", "profile", "Draft a performance investigation plan:\n\n- Metrics to measure first\n- Likely hotspots in this architecture\n- Safe experiments (no premature micro-opts)\n\nSymptom:\n[PASTE]"],
    ["Localization-friendly copy task", "product", "i18n aware", "Rewrite UI strings plan:\n\n- Avoid concatenating translated fragments\n- Note pluralization pitfalls\n- Keep keys stable\n\nStrings/context:\n[PASTE]"],
    ["When to stop and ask human", "meta", "escalation", "Given this task, list signals that the agent should stop and ask me instead of guessing:\n\n[PASTE TASK]\n\nInclude 5 concrete examples of ambiguous decisions in this repo domain."],
  ].map(([label, description, detail, text]) => ({ label, description, detail, text })),
  [
    ["Разбить большую задачу на шаги", "планирование", "атомарные запросы", "Нужно реализовать крупную фичу в этом репозитории.\n\n- Сначала задай уточняющие вопросы (макс. 5)\n- Предложи 3–5 атомарных шагов отдельными сообщениями в чат\n- У каждого шага: цель, вероятные файлы, критерии готовности\n\nКод не пиши, пока я не выберу шаг."],
    ["Контекст + ограничения + критерии готовности", "шаблон", "структурированный промпт", "Перепиши мой размытый запрос в сильный промпт для Cursor:\n\n- Контекст (какие @files прикрепить)\n- Ограничения (стиль, библиотеки, без новых deps без спроса)\n- Критерии готовности (тесты, lint, поведение)\n\nМой запрос:\n[ВСТАВЬТЕ СЮДА]\n\nВыведи только улучшенный промпт."],
    ["Проверить ответ AI по репозиторию", "ревью", "галлюцинации", "Ты предложил изменения. Перед применением:\n\n- Список допущений о кодовой базе\n- Точные файлы/символы для проверки\n- 3 grep/поисковых запроса для меня\n\nНе выдумывай пути к файлам."],
    ["Сначала план — потом код", "воркфлоу", "две фазы", "Фаза 1 — только план:\n- Текущее поведение по @codebase\n- Подход с trade-offs (макс. 2 варианта)\n- Риски и план тестов\n\nСтоп. Я отвечу GO для фазы 2 реализации."],
    ["Улучшить промпт после плохого ответа", "мета", "итерация", "Предыдущий ответ промахнулся.\n\n- Что не так (пункты)\n- Перепиши исходный промпт, чтобы этого избежать\n- 2 негативных ограничения («не …»)\n\nИсходный промпт:\n[ВСТАВЬТЕ]"],
    ["Чеклист @-упоминаний", "cursor", "контекст", "Когда использовать @file, @folder, @codebase, @docs для задачи:\n\n[ВСТАВЬТЕ ЗАДАЧУ]\n\nЧеклист: что прикрепить, что вставить текстом.\nМакс. 8 пунктов, по делу."],
    ["Промпт ревью diff", "ревью", "как в PR", "Ревью diff как senior:\n\n- Баги корректности\n- Безопасность\n- Недостающие тесты\n- Стиль/имена как в репо\n\nСпроси перед крупным переписыванием.\nDiff пришлю следующим сообщением."],
    ["Запрос минимального воспроизведения", "отладка", "изоляция", "Помоги составить промпт minimal repro:\n\n- Шаги воспроизведения\n- Ожидаемое vs фактическое\n- Места для логов/stack trace\n- Какие @files включить\n\nСуть бага:\n[ВСТАВЬТЕ]"],
    ["Test-first промпт для фикса", "TDD", "регрессия", "Workflow test-first для бага:\n\n1) Падающий тест\n2) Фикс\n3) Рефакторинг при необходимости\n\nБаг:\n[ВСТАВЬТЕ]\n\nИспользуй тестовый фреймворк из репозитория."],
    ["Ограничить scope: маленький PR", "ограничения", "инкремент", "Реализуй только этот срез одним PR:\n\n[ВСТАВЬТЕ SCOPE]\n\nПравила:\n- Без побочных рефакторингов\n- Без новых зависимостей без согласования\n- При блокере — стоп и список блокеров\n\nНачни с плана на 5 строк."],
    ["Объясни перед правкой", "обучение", "понимание", "Перед изменением кода объясни простым языком:\n\n- Что делает выделенный код\n- Гипотезы причины бага (по приоритету)\n- Минимальный безопасный фикс\n\nЖди моего OK на патч.\nПодразумевается @file."],
    ["Сообщение коммита", "git", "conventional", "По описанию staged diff предложи:\n\n- Subject в стиле conventional commits\n- Тело из 3 пунктов (зачем, не что)\n\nКратко diff:\n[ВСТАВЬТЕ]"],
    ["Подсказки для .cursor/rules", "cursor", "правила проекта", "Предложи 5–8 правил для .cursor/rules или AGENTS.md:\n\nСтек: [ВСТАВЬТЕ]\n\nКаждое правило — одно предложение, проверяемое, без общих фраз."],
    ["Сравнить два подхода", "архитектура", "trade-offs", "Сравни подход A и B:\n\n[ВСТАВЬТЕ ПРОБЛЕМУ]\n\nТаблица: сложность, тестируемость, ops, риск миграции.\nРекомендация + когда лучше другой вариант."],
    ["ADR в лёгком формате", "документация", "ADR", "Лёгкий ADR:\n\n- Контекст\n- Решение\n- Последствия\n- Отвергнутые альтернативы\n\nТема:\n[ВСТАВЬТЕ]"],
    ["Handoff в новый чат", "воркфлоу", "перенос контекста", "Сожми этот тред в handoff для нового чата:\n\n- Цель\n- Что пробовали\n- Текущее состояние\n- 3 следующих действия\n- Затронутые файлы\n\nМакс. 250 слов."],
    ["Чеклист security-изменения", "безопасность", "ревью", "Меняю auth/платежи/секреты.\n\n- Threat model (STRIDE-lite)\n- Инварианты, которые нельзя ломать\n- Какие тесты добавить\n\nОписание:\n[ВСТАВЬТЕ]"],
    ["План расследования производительности", "perf", "профилирование", "План расследования perf:\n\n- Какие метрики снять первыми\n- Вероятные hotspots\n- Безопасные эксперименты\n\nСимптом:\n[ВСТАВЬТЕ]"],
    ["Промпт для UI-копирайта с i18n", "продукт", "i18n", "План правки UI-строк:\n\n- Не склеивать переводы конкатенацией\n- Ловушки pluralization\n- Стабильные ключи\n\nКонтекст:\n[ВСТАВЬТЕ]"],
    ["Когда остановиться и спросить человека", "мета", "эскалация", "Для задачи перечисли сигналы, когда агент должен остановиться и спросить, а не угадывать:\n\n[ВСТАВЬТЕ ЗАДАЧУ]\n\n5 примеров неоднозначных решений в домене этого репо."],
  ].map(([label, description, detail, text]) => ({ label, description, detail, text }))
);

writeCategory(
  "observability",
  "Observability",
  "Наблюдаемость",
  [
    ["Structured JSON logging", "logging", "fields", "Add structured JSON logs to this service.\n\n- timestamp, level, message, trace_id, user_id (optional)\n- One log line per event\n- Redact secrets\n\nShow example middleware/interceptor pattern for our stack."],
    ["Correlation ID across requests", "tracing", "propagation", "Implement correlation ID:\n\n- Generate on ingress if missing\n- Propagate to downstream HTTP calls\n- Include in all logs\n\nExplain header name choices (X-Request-ID vs traceparent overview)."],
    ["RED metrics for HTTP API", "metrics", "RED method", "Define RED metrics for our HTTP API:\n\n- Rate, Errors, Duration histogram\n- Label cardinality warnings\n- Example PromQL queries\n\nDo not install Prometheus yet — design first."],
    ["Grafana dashboard sketch", "metrics", "dashboard", "Outline a Grafana dashboard for latency and errors:\n\n- 4–6 panels with PromQL placeholders\n- SLO line for p95\n- On-call notes panel\n\nService: [PASTE]"],
    ["OpenTelemetry span basics", "tracing", "OTel", "Explain how to add OpenTelemetry spans around DB and HTTP calls.\n\n- Parent/child spans\n- Attributes to set\n- Sampling mention\n\nConceptual + tiny pseudo-code for our language."],
    ["Alert noise reduction", "ops", "alerting", "My alerts fire too often.\n\n- Classify alert types (symptom vs cause)\n- Suggest 5 fixes: thresholds, grouping, burn rate, runbooks\n- Example alert rule rewrite\n\nPaste one noisy alert definition if I provide it."],
    ["Log levels policy", "logging", "levels", "Draft a team log level policy:\n\n- When DEBUG is allowed\n- What must be INFO vs WARN\n- PII rules\n\nApply to a sample noisy module I describe."],
    ["Health vs readiness probes", "k8s", "probes", "Explain liveness vs readiness for our app:\n\n- What each should check\n- Failure scenarios\n- Example HTTP endpoints\n\nKubernetes context, keep app-agnostic where possible."],
    ["SLO error budget intro", "SLO", "reliability", "Teach SLO/error budget for a web API:\n\n- Pick example SLI (availability, latency)\n- 30-day window math sketch\n- What to do when budget burns\n\nNo vendor pitch."],
    ["Distributed trace reading", "tracing", "debug", "How to read a trace waterfall for slow requests:\n\n- Critical path\n- Common pitfalls (async gaps, missing spans)\n- 5 questions to ask\n\nUse a generic example trace description."],
    ["Log query cheat sheet", "logging", "search", "Give search queries for our log stack (assume JSON logs):\n\n- Find 5xx spike by route\n- Find logs for one user_id\n- Find slow requests > 2s\n\nAdapt placeholders to Elasticsearch/Loki style."],
    ["Metrics cardinality trap", "metrics", "labels", "Explain cardinality explosion with bad labels.\n\n- Bad vs good label examples\n- High-cardinality anti-patterns (user_id label)\n- Mitigations\n\nShort quiz: label 3 metrics I propose."],
    ["On-call runbook template", "ops", "incident", "Create an on-call runbook template:\n\n- Symptoms\n- Immediate checks\n- Mitigations\n- Escalation\n- Post-incident\n\nIncident type: [PASTE]"],
    ["Profiling CPU hot path", "perf", "profile", "Plan CPU profiling for intermittent slowness:\n\n- When to use flamegraphs vs tracing\n- Safe production profiling practices\n- What to capture in ticket\n\nStack: [PASTE]"],
    ["Database slow query observability", "db", "queries", "Add observability for slow SQL:\n\n- Log queries > N ms with parameterized text\n- Metrics: query duration histogram\n- Avoid logging secrets\n\nORM-agnostic guidance."],
    ["Frontend RUM basics", "frontend", "RUM", "Outline Real User Monitoring for a SPA:\n\n- Core Web Vitals\n- JS error tracking\n- API correlation to backend trace_id\n\nPrivacy/consent note in 2 sentences."],
    ["Synthetic checks", "testing", "probes", "Design 3 synthetic monitors for production:\n\n- Login flow\n- Critical API smoke\n- Cron heartbeat\n\nInclude alert thresholds and locations (multi-region idea)."],
    ["Log sampling under load", "logging", "cost", "When log volume is too high:\n\n- Sampling strategies\n- Always-log errors pattern\n- Cost vs debuggability trade-off\n\nRecommend approach for high-traffic API."],
    ["Security audit logging", "security", "audit", "List audit events we should log for admin actions:\n\n- Fields per event\n- Tamper considerations (append-only store idea)\n- Retention guidance\n\nDomain: [PASTE]"],
    ["Observability migration plan", "roadmap", "adoption", "We have only printf logs. Plan migration to metrics+tracing in 4 phases:\n\n- Quick wins week 1\n- Instrumentation standards\n- Dashboards/alerts\n- Team training\n\nConstraints: small team, no big bang."],
  ].map(([label, description, detail, text]) => ({ label, description, detail, text })),
  [
    ["Структурированные JSON-логи", "логирование", "поля", "Добавь structured JSON logs в сервис.\n\n- timestamp, level, message, trace_id, user_id (опционально)\n- Одна строка — одно событие\n- Редактировать секреты\n\nПример middleware/interceptor под наш стек."],
    ["Correlation ID между запросами", "трейсинг", "пропагация", "Реализуй correlation ID:\n\n- Генерация на входе, если нет\n- Проброс в исходящий HTTP\n- Во всех логах\n\nКратко про X-Request-ID vs traceparent."],
    ["RED-метрики для HTTP API", "метрики", "RED", "Спроектируй RED для HTTP API:\n\n- Rate, Errors, Duration histogram\n- Предупреждения про cardinality labels\n- Примеры PromQL\n\nБез установки Prometheus — сначала дизайн."],
    ["Эскиз дашборда Grafana", "метрики", "dashboard", "Набросок Grafana: latency и errors:\n\n- 4–6 панелей с PromQL-заглушками\n- Линия SLO для p95\n- Панель заметок для on-call\n\nСервис: [ВСТАВЬТЕ]"],
    ["Основы span OpenTelemetry", "трейсинг", "OTel", "Как обернуть DB и HTTP в OpenTelemetry spans:\n\n- Parent/child\n- Какие attributes\n- Sampling — кратко\n\nКонцепт + псевдокод под наш язык."],
    ["Снизить шум алертов", "ops", "alerting", "Алерты срабатывают слишком часто.\n\n- Симптом vs причина\n- 5 правок: пороги, группировка, burn rate, runbook\n- Пример переписывания правила\n\nОпишу шумное правило отдельно."],
    ["Политика уровней логов", "логирование", "levels", "Политика log levels для команды:\n\n- Когда DEBUG\n- INFO vs WARN\n- PII\n\nПримени к примеру шумного модуля, который опишу."],
    ["Health vs readiness", "k8s", "probes", "Liveness vs readiness для нашего приложения:\n\n- Что проверять\n- Сценарии падения\n- Пример HTTP endpoints\n\nКонтекст Kubernetes."],
    ["SLO и error budget", "SLO", "надёжность", "SLO/error budget для web API:\n\n- Пример SLI (availability, latency)\n- Черновик математики на 30 дней\n- Что делать при сгорании бюджета\n\nБез рекламы вендоров."],
    ["Читать distributed trace", "трейсинг", "отладка", "Как читать waterfall медленного запроса:\n\n- Critical path\n- async gaps, missing spans\n- 5 вопросов к трейсу\n\nНа абстрактном примере."],
    ["Шпаргалка поиска по логам", "логирование", "поиск", "Запросы к JSON-логам (Elasticsearch/Loki стиль):\n\n- Всплеск 5xx по route\n- Логи одного user_id\n- Запросы > 2s\n\nС плейсхолдерами под наш стек."],
    ["Ловушка cardinality метрик", "метрики", "labels", "Взрыв cardinality из-за плохих labels.\n\n- Плохие vs хорошие примеры\n- Антипаттерн user_id в label\n- Mitigations\n\nМини-квиз по 3 метрикам, которые предложу."],
    ["Шаблон on-call runbook", "ops", "инцидент", "Шаблон runbook:\n\n- Симптомы\n- Быстрые проверки\n- Mitigations\n- Эскалация\n- Post-incident\n\nТип инцидента: [ВСТАВЬТЕ]"],
    ["Профилирование CPU hot path", "perf", "profile", "План CPU profiling при редких лагах:\n\n- Flamegraph vs tracing\n- Безопасный prod profiling\n- Что приложить к тикету\n\nСтек: [ВСТАВЬТЕ]"],
    ["Медленные SQL-запросы", "БД", "queries", "Observability для slow SQL:\n\n- Лог > N ms с parameterized text\n- Histogram длительности\n- Без секретов в логах\n\nБез привязки к конкретному ORM."],
    ["RUM для SPA", "frontend", "RUM", "Real User Monitoring для SPA:\n\n- Core Web Vitals\n- JS errors\n- Связь с backend trace_id\n\n2 предложения про privacy/consent."],
    ["Synthetic checks", "тестирование", "probes", "3 synthetic monitor для prod:\n\n- Login flow\n- Smoke критичного API\n- Heartbeat cron\n\nПороги алертов и идея multi-region."],
    ["Сэмплирование логов под нагрузкой", "логирование", "cost", "Слишком большой объём логов:\n\n- Стратегии sampling\n- Ошибки логировать всегда\n- Cost vs debuggability\n\nДля high-traffic API."],
    ["Audit logging безопасности", "безопасность", "audit", "Какие audit events логировать для admin-действий:\n\n- Поля события\n- Append-only идея\n- Retention\n\nДомен: [ВСТАВЬТЕ]"],
    ["План миграции observability", "roadmap", "внедрение", "Сейчас только printf. План перехода на metrics+tracing в 4 фазы:\n\n- Quick wins неделя 1\n- Стандарты instrumentation\n- Dashboards/alerts\n- Обучение команды\n\nМаленькая команда, без big bang."],
  ].map(([label, description, detail, text]) => ({ label, description, detail, text }))
);

writeCategory(
  "terraform",
  "Terraform & IaC",
  "Terraform и IaC",
  [
    ["First Terraform AWS VPC", "aws", "vpc module", "Create a beginner Terraform layout for AWS VPC.\n\n- versions.tf, providers.tf, vpc.tf\n- public/private subnets sketch\n- terraform init/plan/apply commands\n\nExplain state file cautions."],
    ["Remote state S3 backend", "state", "locking", "Configure S3 + DynamoDB remote backend.\n\n- backend block example\n- Why locking matters\n- Migration from local state steps\n\nSecurity: no secrets in repo."],
    ["Variables and outputs", "hcl", "interface", "Refactor hardcoded IDs into variables.tf and outputs.tf.\n\n- typed variables with validation\n- sensitive outputs pattern\n- Example tfvars for dev\n\nOne small resource group demo."],
    ["Terraform modules split", "modules", "reuse", "Split monolith main.tf into modules:\n\n- modules/network, modules/app\n- Root calls modules with clear inputs\n- When NOT to modularize yet\n\nKeep tree shallow for learning."],
    ["Plan review checklist", "workflow", "plan", "Before apply, review terraform plan output:\n\n- Destroy/replace risks\n- Unexpected resource count changes\n- IAM diffs to double-check\n\nI'll paste plan summary next."],
    ["Import existing resource", "import", "adoption", "Explain terraform import workflow for an existing S3 bucket.\n\n- import block vs CLI import\n- Refresh drift afterward\n- Common mistakes\n\nConceptual steps, not real account IDs."],
    ["Workspace per environment", "env", "workspaces", "Compare workspaces vs separate directories for dev/stage/prod.\n\n- Pros/cons table\n- Backend key naming\n- Recommendation for small team\n\nNo dogma."],
    ["IAM least privilege task role", "security", "iam", "Design IAM role for app reading one S3 prefix.\n\n- Policy JSON sketch\n- Avoid * actions\n- Attach via instance profile / IRSA mention\n\nExplain blast radius."],
    ["Count vs for_each", "hcl", "loops", "Teach when to use count vs for_each with examples.\n\n- Stable keys requirement\n- Removing one instance safely\n- Anti-pattern: count.index dependencies\n\nTiny map(string) example."],
    ["Data sources vs resources", "hcl", "data", "Explain data sources fetching existing VPC/subnet.\n\n- When data source beats resource\n- depends_on nuances\n- Debugging data source failures\n\nShort examples."],
    ["Terraform test (conceptual)", "testing", "policy", "Overview testing options:\n\n- terraform test blocks (high level)\n- tflint/checkov mention\n- What to assert in CI\n\nNo full enterprise suite."],
    ["Drift detection routine", "ops", "drift", "Ops routine for drift:\n\n- Scheduled plan in CI\n- When manual console edits are allowed\n- Import vs revert decision tree\n\nTeam policy bullets."],
    ["Secrets with env/SSM", "secrets", "ssm", "Never commit secrets:\n\n- SSM Parameter Store pattern\n- sensitive variables\n- Rotation note\n\nExample wiring DB password to ECS task."],
    ["EKS cluster minimal", "kubernetes", "eks", "High-level Terraform for minimal EKS:\n\n- VPC prerequisites pointer\n- Node group basics\n- What to outsource to official module\n\nRoadmap only if full code too long."],
    ["CloudFront + S3 static site", "aws", "cdn", "Terraform sketch: private S3 + CloudFront OAC.\n\n- Bucket policy idea\n- Cache behaviors basics\n- Common HTTPS cert pitfall mention\n\nLearning-oriented."],
    ["State lock failure debug", "state", "debug", "terraform apply fails: Error acquiring state lock.\n\n- Safe troubleshooting steps\n- When force-unlock is justified\n- Prevention\n\nEmphasize caution."],
    ["Tagging strategy", "governance", "tags", "Define mandatory tags (Environment, Owner, CostCenter).\n\n- default_tags in provider\n- locals for merge\n- Why finance cares\n\nExample aws provider block."],
    ["Multi-region provider alias", "aws", "alias", "Show provider alias for second region copy of resources.\n\n- provider meta\n- When duplication is OK vs global services\n\nSmall S3 replica example concept."],
    ["Terraform + GitHub Actions", "cicd", "pipeline", "GitHub Actions job: fmt, validate, plan on PR.\n\n- OIDC to AWS instead of long-lived keys\n- Plan artifact comment idea\n- Apply only on main with approval\n\nYAML sketch."],
    ["Refactor without downtime", "migration", "lifecycle", "Plan safe rename/move of resource addressing:\n\n- moved block / state mv\n- create_before_destroy lifecycle\n- Blue/green for LB mention\n\nChecklist before risky apply."],
  ].map(([label, description, detail, text]) => ({ label, description, detail, text })),
  [
    ["Первый Terraform AWS VPC", "aws", "vpc module", "Terraform для начинающих: AWS VPC.\n\n- versions.tf, providers.tf, vpc.tf\n- Эскиз public/private subnets\n- init/plan/apply\n\nПредупреждения про state file."],
    ["Remote state S3 backend", "state", "locking", "S3 + DynamoDB remote backend:\n\n- Пример backend block\n- Зачем locking\n- Миграция с local state\n\nСекреты не в репозитории."],
    ["Variables и outputs", "hcl", "интерфейс", "Вынеси хардкод в variables.tf и outputs.tf.\n\n- variables с validation\n- sensitive outputs\n- tfvars для dev\n\nМаленькая demo resource group."],
    ["Разделение на modules", "modules", "reuse", "Разбей main.tf на modules:\n\n- modules/network, modules/app\n- Root вызывает с ясными inputs\n- Когда рано модуляризировать\n\nПлоское дерево для обучения."],
    ["Чеклист ревью plan", "workflow", "plan", "Перед apply разбери terraform plan:\n\n- Риски destroy/replace\n- Неожиданное число ресурсов\n- IAM diff — внимательно\n\nСводку plan пришлю отдельно."],
    ["Import существующего ресурса", "import", "adoption", "Workflow terraform import для существующего S3 bucket.\n\n- import block vs CLI\n- Refresh после drift\n- Типичные ошибки\n\nБез реальных account ID."],
    ["Workspace на окружение", "env", "workspaces", "Workspaces vs отдельные каталоги dev/stage/prod.\n\n- Таблица плюсов/минусов\n- Имена ключей в backend\n- Рекомендация для малой команды"],
    ["IAM least privilege task role", "безопасность", "iam", "IAM role для чтения одного префикса S3.\n\n- Черновик policy JSON\n- Без * actions\n- instance profile / IRSA — кратко\n\nBlast radius."],
    ["count vs for_each", "hcl", "циклы", "Когда count vs for_each:\n\n- Стабильные ключи\n- Безопасное удаление одного instance\n- Антипаттерн count.index\n\nПример map(string)."],
    ["Data sources vs resources", "hcl", "data", "Data sources для существующего VPC/subnet.\n\n- Когда data лучше resource\n- depends_on\n- Отладка failures\n\nКороткие примеры."],
    ["Тестирование Terraform", "testing", "policy", "Обзор тестов:\n\n- terraform test (высокоуровнево)\n- tflint/checkov\n- Что проверять в CI\n\nБез enterprise-нагромождения."],
    ["Рутина drift detection", "ops", "drift", "Drift в ops:\n\n- План по расписанию в CI\n- Когда правки в консоли допустимы\n- import vs revert\n\nПункты политики команды."],
    ["Секреты через SSM", "secrets", "ssm", "Секреты не в git:\n\n- SSM Parameter Store\n- sensitive variables\n- Ротация — заметка\n\nПример DB password для ECS task."],
    ["Минимальный EKS", "kubernetes", "eks", "Высокоуровневый Terraform для EKS:\n\n- VPC prerequisites\n- Node group basics\n- Когда official module\n\nRoadmap, если полный код длинный."],
    ["CloudFront + S3 static", "aws", "cdn", "Эскиз: private S3 + CloudFront OAC.\n\n- Идея bucket policy\n- Cache behaviors\n- Подводный камень HTTPS cert\n\nДля обучения."],
    ["Ошибка state lock", "state", "debug", "Error acquiring state lock:\n\n- Безопасная диагностика\n- Когда force-unlock\n- Профилактика\n\nОсторожность с force-unlock."],
    ["Стратегия тегов", "governance", "tags", "Обязательные теги (Environment, Owner, CostCenter).\n\n- default_tags в provider\n- merge через locals\n- Зачем finance\n\nПример aws provider."],
    ["Provider alias второго региона", "aws", "alias", "Provider alias для копии ресурсов в другом регионе.\n\n- provider meta\n- Дублирование vs global services\n\nКонцепт S3 replica."],
    ["Terraform в GitHub Actions", "cicd", "pipeline", "Job: fmt, validate, plan на PR.\n\n- OIDC в AWS\n- Комментарий с plan artifact\n- apply на main с approval\n\nЭскиз YAML."],
    ["Рефакторинг без downtime", "migration", "lifecycle", "Безопасный rename/move адресации:\n\n- moved / state mv\n- create_before_destroy\n- Blue/green для LB — упомянуть\n\nЧеклист перед рискованным apply."],
  ].map(([label, description, detail, text]) => ({ label, description, detail, text }))
);

writeCategory(
  "nestjs",
  "NestJS",
  "NestJS",
  [
    ["Bootstrap first NestJS app", "setup", "main.ts", "Create minimal NestJS app.\n\n- nest new or manual main.ts + AppModule\n- GET / hello\n- npm run start:dev\n\nExplain module decorator role."],
    ["DTO validation with class-validator", "validation", "pipes", "Add POST /users with CreateUserDto.\n\n- class-validator decorators\n- ValidationPipe global\n- 400 error shape\n\nKeep one controller file."],
    ["CRUD module pattern", "structure", "feature module", "Generate UsersModule with controller, service, in-memory repo.\n\n- providers array\n- Export service for other modules\n- Route prefix /users\n\nNest CLI commands if helpful."],
    ["Custom provider token", "di", "injection", "Demonstrate custom provider with useValue and injection token.\n\n- Why interfaces need tokens in TS\n- Testing override with useClass\n\nShort example."],
    ["Guard JWT stub", "auth", "guard", "Sketch JwtAuthGuard (conceptual, no full auth server).\n\n- @UseGuards on route\n- Request user typing\n- 401 vs 403 explanation\n\nMention @nestjs/passport lightly."],
    ["Role-based guard", "auth", "roles", "RolesGuard reading roles from JWT payload stub.\n\n- Reflector + @Roles decorator\n- Forbidden when missing role\n\nKeep fake user for demo."],
    ["Exception filter uniform JSON", "errors", "filter", "Global exception filter returning { statusCode, message, path }.\n\n- Catch HttpException and unknown\n- Log stack internally only\n\nRegister in main.ts."],
    ["Interceptor logging timing", "cross-cutting", "interceptor", "LoggingInterceptor measuring request duration.\n\n- tap on Observable\n- Exclude health route idea\n\nShow registration scope options."],
    ["Prisma module wiring", "database", "prisma", "Wire PrismaService as global provider.\n\n- prisma generate step\n- Example findMany in service\n- Graceful shutdown onModuleDestroy note\n\nSQLite or Postgres — pick one."],
    ["ConfigModule env", "config", "@nestjs/config", "Use ConfigModule.forRoot with validation schema (Joi or class).\n\n- DATABASE_URL required\n- forbidUnknownValues idea\n\n.env.example snippet."],
    ["Swagger OpenAPI", "docs", "swagger", "Add Swagger at /api with DocumentBuilder.\n\n- Tags per module\n- Bearer auth scheme placeholder\n\nExplain dev-only exposure caution."],
    ["Testing service with jest", "testing", "unit", "Unit test UsersService with mocked repository.\n\n- TestingModule.createTestingModule\n- expect create to call repo.save\n\nOne spec file."],
    ["E2E supertest", "testing", "e2e", "e2e test bootstrapping AppModule in-memory.\n\n- supertest request GET /users\n- Close app afterAll\n\nMinimal example."],
    ["WebSocket gateway echo", "realtime", "gateway", "WebSocketGateway echo server.\n\n- @SubscribeMessage\n- CORS/origin note brief\n\nContrast with Socket.io package optional."],
    ["Microservice TCP pattern", "microservices", "transport", "High-level second app listening TCP with message pattern.\n\n- ClientProxy send\n- When to choose Kafka instead\n\nConceptual code blocks."],
    ["Cache interceptor", "perf", "cache", "CacheModule + CacheInterceptor on GET route.\n\n- TTL config\n- Cache key pitfalls\n\nWarn stale data scenarios."],
    ["File upload multer", "files", "multipart", "FileInterceptor uploading to disk with size limit.\n\n- Validation pipe for mime\n- Virus scan hook mention\n\nSingle endpoint."],
    ["Schedule cron job", "jobs", "cron", "@nestjs/schedule cron example.\n\n- Injectable task\n- Idempotency warning for multi-instance\n\nMention external queue for prod."],
    ["Health check Terminus", "ops", "health", "Terminus health checks: DB ping + disk.\n\n- /health route\n- Kubernetes probe mapping\n\nDependencies list."],
    ["Split monolith modules", "architecture", "boundaries", "Refactor growing AppModule into domain modules.\n\n- Shared module for cross-cutting\n- Avoid circular imports checklist\n\nBefore/after tree diagram in text."],
  ].map(([label, description, detail, text]) => ({ label, description, detail, text })),
  [
    ["Первое NestJS-приложение", "настройка", "main.ts", "Минимальное NestJS-приложение.\n\n- nest new или main.ts + AppModule\n- GET / hello\n- npm run start:dev\n\nРоль декоратора @Module."],
    ["Валидация DTO class-validator", "валидация", "pipes", "POST /users с CreateUserDto.\n\n- декораторы class-validator\n- глобальный ValidationPipe\n- форма ошибки 400\n\nОдин controller file."],
    ["Паттерн CRUD module", "структура", "feature module", "UsersModule: controller, service, in-memory repo.\n\n- providers\n- export service\n- префикс /users\n\nКоманды Nest CLI по желанию."],
    ["Custom provider token", "di", "injection", "Custom provider: useValue и injection token.\n\n- Интерфейсы и токены в TS\n- override useClass в тестах\n\nКороткий пример."],
    ["Заглушка JwtAuthGuard", "auth", "guard", "Эскиз JwtAuthGuard (без полного auth server).\n\n- @UseGuards\n- типизация user в request\n- 401 vs 403\n\nКратко @nestjs/passport."],
    ["Guard по ролям", "auth", "roles", "RolesGuard по roles из JWT stub.\n\n- Reflector + @Roles\n- 403 без роли\n\nFake user для демо."],
    ["Exception filter JSON", "ошибки", "filter", "Глобальный filter: { statusCode, message, path }.\n\n- HttpException и unknown\n- stack только внутри логов\n\nРегистрация в main.ts."],
    ["Interceptor времени запроса", "cross-cutting", "interceptor", "LoggingInterceptor длительности запроса.\n\n- tap на Observable\n- Исключить /health\n\nОбласти регистрации."],
    ["Подключение Prisma", "БД", "prisma", "PrismaService как provider.\n\n- prisma generate\n- findMany в service\n- onModuleDestroy shutdown\n\nSQLite или Postgres — один."],
    ["ConfigModule и env", "config", "@nestjs/config", "ConfigModule.forRoot + validation (Joi или class).\n\n- DATABASE_URL обязателен\n- forbidUnknownValues\n\nФрагмент .env.example."],
    ["Swagger OpenAPI", "docs", "swagger", "Swagger на /api через DocumentBuilder.\n\n- Tags по модулям\n- Placeholder Bearer auth\n\nПредупреждение: только dev."],
    ["Unit-тест сервиса jest", "тестирование", "unit", "Unit test UsersService с mock repository.\n\n- TestingModule.createTestingModule\n- create вызывает repo.save\n\nОдин spec."],
    ["E2E supertest", "тестирование", "e2e", "e2e с AppModule in-memory.\n\n- supertest GET /users\n- close app afterAll\n\nМинимальный пример."],
    ["WebSocket gateway echo", "realtime", "gateway", "WebSocketGateway echo.\n\n- @SubscribeMessage\n- CORS/origin — кратко\n\nSocket.io — опционально."],
    ["Microservice TCP", "microservices", "transport", "Второе приложение TCP + message pattern.\n\n- ClientProxy send\n- Когда Kafka\n\nКонцептуальные блоки."],
    ["Cache interceptor", "perf", "cache", "CacheModule + CacheInterceptor на GET.\n\n- TTL\n- Подводные камни cache key\n\nРиск устаревших данных."],
    ["Загрузка файлов multer", "files", "multipart", "FileInterceptor на диск с лимитом размера.\n\n- mime validation\n- antivirus hook — идея\n\nОдин endpoint."],
    ["Cron @nestjs/schedule", "jobs", "cron", "Пример cron task.\n\n- Injectable job\n- Идемпотентность при нескольких инстансах\n\nДля prod — внешняя очередь."],
    ["Health Terminus", "ops", "health", "Terminus: DB ping + disk.\n\n- /health\n- mapping на k8s probes\n\nСписок зависимостей."],
    ["Разделить monolith на modules", "архитектура", "границы", "Разбить AppModule на domain modules.\n\n- Shared module\n- Чеклист circular imports\n\nДиаграмма дерева до/после текстом."],
  ].map(([label, description, detail, text]) => ({ label, description, detail, text }))
);

writeCategory(
  "flask",
  "Flask",
  "Flask",
  [
    ["Hello Flask app", "setup", "app.py", "Minimal Flask app for beginners.\n\n- app.py with GET /\n- flask run\n- requirements.txt\n\nExplain debug mode dangers."],
    ["Routes and methods", "routing", "POST", "Add GET /items and POST /items.\n\n- request.json body\n- jsonify responses\n- 405 handling mention\n\nOne file tutorial."],
    ["Jinja template render", "templates", "render_template", "Serve HTML with Jinja2.\n\n- templates/index.html\n- Pass variables from route\n- Static files folder note\n\nSimple blog list mock."],
    ["Blueprint modular apps", "structure", "blueprint", "Split into blueprints auth and api.\n\n- register_blueprint with url_prefix\n- Shared app factory pattern sketch\n\nExplain scaling project layout."],
    ["Flask-SQLAlchemy model", "database", "orm", "Add User model and db.session.\n\n- pip install flask-sqlalchemy\n- create_all in dev\n- One CRUD route\n\nSQLite for demo."],
    ["Migrations with Flask-Migrate", "database", "alembic", "Introduce Flask-Migrate commands.\n\n- flask db init/migrate/upgrade\n- Never edit DB by hand in prod note\n\nAfter SQLAlchemy model exists."],
    ["Login session cookie", "auth", "session", "Basic session login (educational, not production-complete).\n\n- secret_key from env\n- login/logout routes\n- flask-login mention as upgrade\n\nSecurity warnings bullets."],
    ["WTForms validation", "forms", "wtforms", "Server-side form with WTForms.\n\n- Form class + validators\n- flash messages on error\n- CSRF with Flask-WTF mention\n\nContact form example."],
    ["Error handlers 404 500", "errors", "handlers", "Register errorhandler for 404 and 500.\n\n- Custom JSON for API routes optional\n- Log exception in 500\n\nShow registration in app factory."],
    ["Config classes", "config", "environments", "Config pattern: DevelopmentConfig, ProductionConfig.\n\n- load from env FLASK_CONFIG\n- Never commit secrets\n\nExample factory selecting config."],
    ["RESTful API with flask-smorest", "api", "openapi", "High-level OpenAPI with flask-smorest or similar.\n\n- Schema class\n- Documented endpoint\n- Compare to manual jsonify\n\nPick one library and stay brief."],
    ["CORS for React dev", "api", "cors", "Enable flask-cors for localhost:5173.\n\n- Which routes need CORS\n- Credentials caveat\n\nSnippet only."],
    ["pytest flask client", "testing", "client", "Test app with pytest fixture client.\n\n- get_json on response\n- tmp database or in-memory SQLite\n\nOne test file."],
    ["Application factory", "structure", "create_app", "Refactor to create_app() factory.\n\n- Extensions init pattern\n- Testing with different config\n\nBefore/after file list."],
    ["Background task thread", "async", "thread", "Simple background job with thread (limitations explained).\n\n- Prefer Celery/RQ for real prod\n- Do not fork unsafely note\n\nEmail send mock."],
    ["File upload", "files", "upload", "Upload endpoint saving with secure_filename.\n\n- MAX_CONTENT_LENGTH config\n- Validate mime lightly\n\nSecurity checklist."],
    ["Rate limiting extension", "security", "limiter", "Add Flask-Limiter on login route.\n\n- Per-IP limit\n- Storage backend note for multi-instance\n\nConceptual config."],
    ["Gunicorn production serve", "deploy", "wsgi", "Run with gunicorn behind nginx sketch.\n\n- workers formula intro\n- bind 0.0.0.0 caution\n- env vars for DATABASE_URL\n\nNo full k8s."],
    ["Dockerfile Flask", "deploy", "docker", "Dockerfile for Flask + gunicorn.\n\n- Slim Python image\n- Non-root user mention\n- .dockerignore\n\nBuild/run commands."],
    ["Migrate from Flask to FastAPI", "roadmap", "comparison", "Roadmap comparing Flask vs FastAPI for this project.\n\n- What maps 1:1 (routes, pydantic)\n- What needs rewrite (extensions)\n- Incremental strangler pattern\n\nNo big bang."],
  ].map(([label, description, detail, text]) => ({ label, description, detail, text })),
  [
    ["Hello Flask", "настройка", "app.py", "Минимальное Flask-приложение.\n\n- app.py GET /\n- flask run\n- requirements.txt\n\nОпасности debug mode."],
    ["Маршруты и методы", "маршрутизация", "POST", "GET /items и POST /items.\n\n- request.json\n- jsonify\n- 405 — упомянуть\n\nОдин файл."],
    ["Шаблон Jinja", "шаблоны", "render_template", "HTML через Jinja2.\n\n- templates/index.html\n- переменные из route\n- static/\n\nМок списка постов."],
    ["Blueprint модульность", "структура", "blueprint", "blueprints auth и api.\n\n- register_blueprint url_prefix\n- эскиз app factory\n\nРост структуры проекта."],
    ["Модель Flask-SQLAlchemy", "БД", "orm", "User model и db.session.\n\n- flask-sqlalchemy\n- create_all в dev\n- один CRUD route\n\nSQLite для демо."],
    ["Миграции Flask-Migrate", "БД", "alembic", "Flask-Migrate:\n\n- flask db init/migrate/upgrade\n- не править prod БД руками\n\nПосле модели SQLAlchemy."],
    ["Login через session cookie", "auth", "session", "Базовый session login (учебный).\n\n- secret_key из env\n- login/logout\n- flask-login как апгрейд\n\nПредупреждения безопасности."],
    ["WTForms валидация", "формы", "wtforms", "Форма с WTForms.\n\n- validators\n- flash при ошибке\n- CSRF Flask-WTF\n\nContact form."],
    ["Обработчики 404 и 500", "ошибки", "handlers", "errorhandler 404 и 500.\n\n- JSON для API опционально\n- лог исключения в 500\n\nВ app factory."],
    ["Классы Config", "config", "окружения", "DevelopmentConfig, ProductionConfig.\n\n- FLASK_CONFIG из env\n- секреты не в git\n\nfactory выбирает config."],
    ["REST API flask-smorest", "api", "openapi", "OpenAPI через flask-smorest или аналог.\n\n- Schema\n- документированный endpoint\n- сравнение с jsonify\n\nОдна библиотека, кратко."],
    ["CORS для React dev", "api", "cors", "flask-cors для localhost:5173.\n\n- какие routes\n- credentials caveat\n\nТолько snippet."],
    ["pytest flask client", "тестирование", "client", "pytest fixture client.\n\n- get_json\n- in-memory SQLite\n\nОдин test file."],
    ["Application factory", "структура", "create_app", "Рефакторинг в create_app().\n\n- init extensions\n- тесты с другим config\n\nСписок файлов до/после."],
    ["Фоновая задача thread", "async", "thread", "Фоновая job в thread (ограничения).\n\n- для prod Celery/RQ\n- небезопасный fork — заметка\n\nМок отправки email."],
    ["Загрузка файла", "files", "upload", "Upload с secure_filename.\n\n- MAX_CONTENT_LENGTH\n- лёгкая проверка mime\n\nЧеклист безопасности."],
    ["Rate limiting", "безопасность", "limiter", "Flask-Limiter на login.\n\n- лимит per-IP\n- backend при нескольких инстансах\n\nКонцептуальный config."],
    ["Gunicorn в production", "деплой", "wsgi", "gunicorn за nginx (эскиз).\n\n- workers\n- bind 0.0.0.0\n- DATABASE_URL\n\nБез полного k8s."],
    ["Dockerfile для Flask", "деплой", "docker", "Dockerfile Flask + gunicorn.\n\n- slim Python\n- non-root user\n- .dockerignore\n\nbuild/run."],
    ["Миграция Flask → FastAPI", "roadmap", "сравнение", "Roadmap Flask vs FastAPI для проекта.\n\n- что 1:1\n- что переписать (extensions)\n- strangler pattern\n\nБез big bang."],
  ].map(([label, description, detail, text]) => ({ label, description, detail, text }))
);

console.log("done — 5 categories × EN + RU");
