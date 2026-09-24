# Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£ÂÂ¯Ã£â€šÂ¹Ã£Æ’Â©Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥Ã¯Â¼Ë†`/command-name`Ã¯Â¼â€°Ã£ÂÂ§Ã¨ÂµÂ·Ã¥â€¹â€¢Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¨ÂµÂ·Ã¥â€¹â€¢Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€šÃ¦Å“â€°Ã§â€Â¨Ã£ÂÂªÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£ÂÂ¨Ã©â€“â€¹Ã§â„¢ÂºÃ£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ¯Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£â€šÂ«Ã£Æ’â€ Ã£â€šÂ´Ã£Æ’Âª

### Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€° & Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã¤Â¿Â®Ã¦Â­Â£
- `/build-fix` - Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â¿Â®Ã¦Â­Â£
- `/go-build` - Go Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¨Â§Â£Ã¦Â±Âº
- `/go-test` - Go Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’

### Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥â€œÂÃ¨Â³Âª
- `/code-review` - Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥Â¤â€°Ã¦â€ºÂ´Ã£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼
- `/python-review` - Python Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼
- `/go-review` - Go Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë† & Ã¦Â¤Å“Ã¨Â¨Â¼
- `/tdd` - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢ÂºÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
- `/e2e` - E2E Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
- `/test-coverage` - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
- `/verify` - Ã¥Â®Å¸Ã¨Â£â€¦Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼

### Ã¨Â¨Ë†Ã§â€Â» & Ã¥Â®Å¸Ã¨Â£â€¦
- `/plan` - Ã¦Â©Å¸Ã¨Æ’Â½Ã¥Â®Å¸Ã¨Â£â€¦Ã¨Â¨Ë†Ã§â€Â»Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
- `/skill-create` - Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
- `/multi-*` - Ã£Æ’Å¾Ã£Æ’Â«Ã£Æ’ÂÃ£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë† Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

### Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†
- `/update-docs` - Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ´Ã¦â€“Â°
- `/update-codemaps` - Codemap Ã£â€šâ€™Ã¦â€ºÂ´Ã¦â€“Â°

### Ã©â€“â€¹Ã§â„¢Âº & Ã£Æ’â€¡Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¤
- `/checkpoint` - Ã¥Â®Å¸Ã¨Â£â€¦Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†
- `/evolve` - Ã¦Â©Å¸Ã¨Æ’Â½Ã£â€šâ€™Ã©â‚¬Â²Ã¥Å’â€“
- `/learn` - Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ«Ã£ÂÂ¤Ã£Ââ€žÃ£ÂÂ¦Ã¥Â­Â¦Ã£ÂÂ¶
- `/orchestrate` - Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã¨ÂªÂ¿Ã¦â€¢Â´
- `/pm2` - PM2 Ã£Æ’â€¡Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¤Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã§Â®Â¡Ã§Ââ€ 
- `/setup-pm` - PM2 Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡
- `/sessions` - Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã§Â®Â¡Ã§Ââ€ 

### Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã¦Â©Å¸Ã¨Æ’Â½
- `/instinct-import` - Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯ Ã£â€šâ€™Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†
- `/instinct-export` - Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯ Ã£â€šâ€™Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†
- `/instinct-status` - Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯ Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹

## Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã¥Â®Å¸Ã¨Â¡Å’

Claude Code Ã£ÂÂ§Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã¯Â¼Å¡

```bash
/plan
/tdd
/code-review
/build-fix
```

Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯ AI Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£Ââ€¹Ã£â€šâ€°Ã¯Â¼Å¡

```
Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¯Â¼Å¡Ã£â‚¬Å’Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ¦Â©Å¸Ã¨Æ’Â½Ã£â€šâ€™Ã¨Â¨Ë†Ã§â€Â»Ã£Ââ€”Ã£ÂÂ¦Ã£â‚¬Â
ClaudeÃ¯Â¼Å¡Ã¥Â®Å¸Ã¨Â¡Å’ Ã¢â€ â€™ `/plan` Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°
```

## Ã£â€šË†Ã£ÂÂÃ¤Â½Â¿Ã£Ââ€ Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

### Ã©â€“â€¹Ã§â„¢ÂºÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
1. `/plan` - Ã¥Â®Å¸Ã¨Â£â€¦Ã¨Â¨Ë†Ã§â€Â»Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
2. `/tdd` - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ¸Ã£Ââ€žÃ£ÂÂ¦Ã¦Â©Å¸Ã¨Æ’Â½Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â£â€¦
3. `/code-review` - Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥â€œÂÃ¨Â³ÂªÃ£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼
4. `/build-fix` - Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â¿Â®Ã¦Â­Â£
5. `/e2e` - E2E Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
6. `/update-docs` - Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ´Ã¦â€“Â°

### Ã£Æ’â€¡Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ°Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
1. `/verify` - Ã¥Â®Å¸Ã¨Â£â€¦Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼
2. `/code-review` - Ã¥â€œÂÃ¨Â³ÂªÃ£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
3. `/build-fix` - Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â¿Â®Ã¦Â­Â£
4. `/test-coverage` - Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ

## Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â 

Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ«Ã£ÂÂ¯Ã¯Â¼Å¡

1. `commands/` Ã£ÂÂ« `.md` Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
2. Frontmatter Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â Ã¯Â¼Å¡

```markdown
---
description: Brief description shown in /help
---

# Command Name

## Purpose

What this command does.

## Usage

\`\`\`
/command-name [args]
\`\`\`

## Workflow

1. Step 1
2. Step 2
3. Step 3
```

---

**Ã¨Â¦Å¡Ã£ÂË†Ã£ÂÂ¦Ã£ÂÅ Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž**Ã¯Â¼Å¡Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£ÂÂ¯Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£â€šâ€™Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¥Å’â€“Ã£Ââ€”Ã£â‚¬ÂÃ§Â¹Â°Ã£â€šÅ Ã¨Â¿â€Ã£Ââ€”Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ¯Ã£â€šâ€™Ã§Â°Â¡Ã§Â´Â Ã¥Å’â€“Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ£Æ’ÂÃ£Æ’Â¼Ã£Æ’Â Ã£ÂÂ®Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ„¢Ã£â€šâ€¹Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã£ÂÅ Ã¥â€¹Â§Ã£â€šÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
