---
name: verification-loop
description: "Claude Code Ã¤Â¼Å¡Ã¨Â¯ÂÃ§Å¡â€žÃ¥â€¦Â¨Ã©ÂÂ¢Ã©ÂªÅ’Ã¨Â¯ÂÃ§Â³Â»Ã§Â»Å¸Ã£â‚¬â€š"
origin: ECC
---

# Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯Ã¦Å â‚¬Ã¨Æ’Â½

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


Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž Claude Code Ã¤Â¼Å¡Ã¨Â¯ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ§Â³Â»Ã§Â»Å¸Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¨Â°Æ’Ã§â€Â¨Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡

* Ã¥Â®Å’Ã¦Ë†ÂÃ¥Å Å¸Ã¨Æ’Â½Ã¦Ë†â€“Ã©â€¡ÂÃ¥Â¤Â§Ã¤Â»Â£Ã§Â ÂÃ¥ÂËœÃ¦â€ºÂ´Ã¥ÂÅ½
* Ã¥Ë†â€ºÃ¥Â»Âº PR Ã¤Â¹â€¹Ã¥â€°Â
* Ã¥Â½â€œÃ¦â€šÂ¨Ã¥Â¸Å’Ã¦Å“â€ºÃ§Â¡Â®Ã¤Â¿ÂÃ¨Â´Â¨Ã©â€¡ÂÃ©â€”Â¨Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦â€”Â¶
* Ã©â€¡ÂÃ¦Å¾â€žÃ¤Â¹â€¹Ã¥ÂÅ½

## Ã©ÂªÅ’Ã¨Â¯ÂÃ©ËœÂ¶Ã¦Â®Âµ

### Ã©ËœÂ¶Ã¦Â®Âµ 1Ã¯Â¼Å¡Ã¦Å¾â€žÃ¥Â»ÂºÃ©ÂªÅ’Ã¨Â¯Â

```bash
# Check if project builds
npm run build 2>&1 | tail -20
# OR
pnpm build 2>&1 | tail -20
```

Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’Ã¨Â¯Â·Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Â¹Â¶Ã¥Å“Â¨Ã§Â»Â§Ã§Â»Â­Ã¤Â¹â€¹Ã¥â€°ÂÃ¤Â¿Â®Ã¥Â¤ÂÃ£â‚¬â€š

### Ã©ËœÂ¶Ã¦Â®Âµ 2Ã¯Â¼Å¡Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥

```bash
# TypeScript projects
npx tsc --noEmit 2>&1 | head -30

# Python projects
pyright . 2>&1 | head -30
```

Ã¦Å Â¥Ã¥â€˜Å Ã¦â€°â‚¬Ã¦Å“â€°Ã§Â±Â»Ã¥Å¾â€¹Ã©â€â„¢Ã¨Â¯Â¯Ã£â‚¬â€šÃ¥Å“Â¨Ã§Â»Â§Ã§Â»Â­Ã¤Â¹â€¹Ã¥â€°ÂÃ¤Â¿Â®Ã¥Â¤ÂÃ¥â€¦Â³Ã©â€Â®Ã©â€â„¢Ã¨Â¯Â¯Ã£â‚¬â€š

### Ã©ËœÂ¶Ã¦Â®Âµ 3Ã¯Â¼Å¡Ã¤Â»Â£Ã§Â ÂÃ¨Â§â€žÃ¨Å’Æ’Ã¦Â£â‚¬Ã¦Å¸Â¥

```bash
# JavaScript/TypeScript
npm run lint 2>&1 | head -30

# Python
ruff check . 2>&1 | head -30
```

### Ã©ËœÂ¶Ã¦Â®Âµ 4Ã¯Â¼Å¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¥â€”Ã¤Â»Â¶

```bash
# Run tests with coverage
npm run test -- --coverage 2>&1 | tail -50

# Check coverage threshold
# Target: 80% minimum
```

Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

* Ã¦â‚¬Â»Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€¢Â°Ã¯Â¼Å¡X
* Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼Å¡X
* Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å¡X
* Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Å¡X%

### Ã©ËœÂ¶Ã¦Â®Âµ 5Ã¯Â¼Å¡Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂ

```bash
# Check for secrets
grep -rn "sk-" --include="*.ts" --include="*.js" . 2>/dev/null | head -10
grep -rn "api_key" --include="*.ts" --include="*.js" . 2>/dev/null | head -10

# Check for console.log
grep -rn "console.log" --include="*.ts" --include="*.tsx" src/ 2>/dev/null | head -10
```

### Ã©ËœÂ¶Ã¦Â®Âµ 6Ã¯Â¼Å¡Ã¥Â·Â®Ã¥Â¼â€šÃ¥Â®Â¡Ã¦Å¸Â¥

```bash
# Show what changed
git diff --stat
git diff HEAD~1 --name-only
```

Ã¥Â®Â¡Ã¦Å¸Â¥Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦â€ºÂ´Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å’Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Å¡

* Ã¦â€žÂÃ¥Â¤â€“Ã¦â€ºÂ´Ã¦â€Â¹
* Ã§Â¼ÂºÃ¥Â¤Â±Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 
* Ã¦Â½Å“Ã¥Å“Â¨Ã§Å¡â€žÃ¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ Âµ

## Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼Â

Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€°â‚¬Ã¦Å“â€°Ã©ËœÂ¶Ã¦Â®ÂµÃ¥ÂÅ½Ã¯Â¼Å’Ã§â€Å¸Ã¦Ë†ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

```
Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Å Â¥Ã¥â€˜Å 
==================

Ã¦Å¾â€žÃ¥Â»Âº:     [Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥]
Ã§Â±Â»Ã¥Å¾â€¹:     [Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥] (X Ã¥Â¤â€žÃ©â€â„¢Ã¨Â¯Â¯)
Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥:  [Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥] (X Ã¦ÂÂ¡Ã¨Â­Â¦Ã¥â€˜Å )
Ã¦Âµâ€¹Ã¨Â¯â€¢:     [Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥] (X/Y Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼Å’Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡ Z%)
Ã¥Â®â€°Ã¥â€¦Â¨:     [Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥] (X Ã¤Â¸ÂªÃ©â€”Â®Ã©Â¢Ëœ)
Ã¥Â·Â®Ã¥Â¼â€š:      [X Ã¤Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶Ã¨Â¢Â«Ã¤Â¿Â®Ã¦â€Â¹]

Ã¦â‚¬Â»Ã¤Â½â€œ:     [Ã¥Â°Â±Ã§Â»Âª/Ã¦Å“ÂªÃ¥Â°Â±Ã§Â»Âª] Ã¦ÂÂÃ¤ÂºÂ¤ PR

Ã¥Â¾â€¦Ã¤Â¿Â®Ã¥Â¤ÂÃ©â€”Â®Ã©Â¢Ëœ:
1. ...
2. ...
```

## Ã¦Å’ÂÃ§Â»Â­Ã¦Â¨Â¡Ã¥Â¼Â

Ã¥Â¯Â¹Ã¤ÂºÅ½Ã©â€¢Â¿Ã¦â€”Â¶Ã©â€”Â´Ã¤Â¼Å¡Ã¨Â¯ÂÃ¯Â¼Å’Ã¦Â¯Â 15 Ã¥Ë†â€ Ã©â€™Å¸Ã¦Ë†â€“Ã¥Å“Â¨Ã©â€¡ÂÃ¥Â¤Â§Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Å¡

```markdown
Ã¨Â®Â¾Ã§Â½Â®Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Â¿Æ’Ã§Ââ€ Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¯Â¼Å¡
- Ã¥Â®Å’Ã¦Ë†ÂÃ¦Â¯ÂÃ¤Â¸ÂªÃ¥â€¡Â½Ã¦â€¢Â°Ã¥ÂÅ½
- Ã¥Â®Å’Ã¦Ë†ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ§Â»â€žÃ¤Â»Â¶Ã¥ÂÅ½
- Ã¥Å“Â¨Ã§Â§Â»Ã¥Å Â¨Ã¥Ë†Â°Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¤Â»Â»Ã¥Å Â¡Ã¤Â¹â€¹Ã¥â€°Â

Ã¨Â¿ÂÃ¨Â¡Å’: /verify

```

## Ã¤Â¸Å½Ã©â€™Â©Ã¥Â­ÂÃ§Å¡â€žÃ©â€ºâ€ Ã¦Ë†Â

Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã¨Â¡Â¥Ã¥â€¦â€¦ PostToolUse Ã©â€™Â©Ã¥Â­ÂÃ¯Â¼Å’Ã¤Â½â€ Ã¦ÂÂÃ¤Â¾â€ºÃ¦â€ºÂ´Ã¦Â·Â±Ã¥â€¦Â¥Ã§Å¡â€žÃ©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬â€š
Ã©â€™Â©Ã¥Â­ÂÃ¤Â¼Å¡Ã§Â«â€¹Ã¥ÂÂ³Ã¦Ââ€¢Ã¨Å½Â·Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼â€ºÃ¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã¦ÂÂÃ¤Â¾â€ºÃ¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¥Â®Â¡Ã¦Å¸Â¥Ã£â‚¬â€š
