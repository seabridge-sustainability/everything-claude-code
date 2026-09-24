---
name: verification-loop
description: "Claude Code Ã¬â€žÂ¸Ã¬â€¦ËœÃ¬Ââ€ž Ã¬Å“â€žÃ­â€¢Å“ Ã­ÂÂ¬ÃªÂ´â€žÃ¬Â ÂÃ¬ÂÂ¸ ÃªÂ²â‚¬Ã¬Â¦Â Ã¬â€¹Å“Ã¬Å Â¤Ã­â€¦Å“."
origin: ECC
---

# ÃªÂ²â‚¬Ã¬Â¦Â Ã«Â£Â¨Ã­â€â€ž Ã¬Å Â¤Ã­â€šÂ¬

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


Claude Code Ã¬â€žÂ¸Ã¬â€¦ËœÃ¬Ââ€ž Ã¬Å“â€žÃ­â€¢Å“ Ã­ÂÂ¬ÃªÂ´â€žÃ¬Â ÂÃ¬ÂÂ¸ ÃªÂ²â‚¬Ã¬Â¦Â Ã¬â€¹Å“Ã¬Å Â¤Ã­â€¦Å“.

## Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬â€¹Å“Ã¬Â Â

Ã«â€¹Â¤Ã¬ÂÅ’ Ã¬Æ’ÂÃ­â„¢Â©Ã¬â€”ÂÃ¬â€žÅ“ Ã¬ÂÂ´ Ã¬Å Â¤Ã­â€šÂ¬Ã¬Ââ€ž Ã­ËœÂ¸Ã¬Â¶Å“Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€:
- ÃªÂ¸Â°Ã«Å Â¥ Ã«ËœÂÃ«Å â€ Ã¬Â£Â¼Ã¬Å¡â€ Ã¬Â½â€Ã«â€œÅ“ Ã«Â³â‚¬ÃªÂ²Â½Ã¬Ââ€ž Ã¬â„¢â€žÃ«Â£Å’Ã­â€¢Å“ Ã­â€ºâ€ž
- PRÃ¬Ââ€ž Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢ËœÃªÂ¸Â° Ã¬Â â€ž
- Ã­â€™Ë†Ã¬Â§Ë† ÃªÂ²Å’Ã¬ÂÂ´Ã­Å Â¸ÃªÂ°â‚¬ Ã­â€ ÂµÃªÂ³Â¼Ã­â€¢ËœÃ«Å â€Ã¬Â§â‚¬ Ã­â„¢â€¢Ã¬ÂÂ¸Ã­â€¢ËœÃªÂ³Â  Ã¬â€¹Â¶Ã¬Ââ€ž Ã«â€¢Å’
- Ã«Â¦Â¬Ã­Å’Â©Ã­â€žÂ°Ã«Â§Â Ã­â€ºâ€ž

## ÃªÂ²â‚¬Ã¬Â¦Â Ã«â€¹Â¨ÃªÂ³â€ž

### Ã«â€¹Â¨ÃªÂ³â€ž 1: Ã«Â¹Å’Ã«â€œÅ“ ÃªÂ²â‚¬Ã¬Â¦Â
```bash
# Check if project builds
npm run build 2>&1 | tail -20
# OR
pnpm build 2>&1 | tail -20
```

Ã«Â¹Å’Ã«â€œÅ“ÃªÂ°â‚¬ Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢ËœÃ«Â©Â´ ÃªÂ³â€žÃ¬â€ ÂÃ­â€¢ËœÃªÂ¸Â° Ã¬Â â€žÃ¬â€”Â Ã¬Â¤â€˜Ã«â€¹Â¨Ã­â€¢ËœÃªÂ³Â  Ã¬Ë†ËœÃ¬Â â€¢Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

### Ã«â€¹Â¨ÃªÂ³â€ž 2: Ã­Æ’â‚¬Ã¬Å¾â€¦ ÃªÂ²â‚¬Ã¬â€šÂ¬
```bash
# TypeScript projects
npx tsc --noEmit 2>&1 | head -30

# Python projects
pyright . 2>&1 | head -30
```

Ã«ÂªÂ¨Ã«â€œÂ  Ã­Æ’â‚¬Ã¬Å¾â€¦ Ã¬â€”ÂÃ«Å¸Â¬Ã«Â¥Â¼ Ã«Â³Â´ÃªÂ³Â Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤. Ã¬Â¤â€˜Ã¬Å¡â€Ã­â€¢Å“ ÃªÂ²Æ’Ã¬Ââ‚¬ ÃªÂ³â€žÃ¬â€ ÂÃ­â€¢ËœÃªÂ¸Â° Ã¬Â â€žÃ¬â€”Â Ã¬Ë†ËœÃ¬Â â€¢Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

### Ã«â€¹Â¨ÃªÂ³â€ž 3: Ã«Â¦Â°Ã­Å Â¸ ÃªÂ²â‚¬Ã¬â€šÂ¬
```bash
# JavaScript/TypeScript
npm run lint 2>&1 | head -30

# Python
ruff check . 2>&1 | head -30
```

### Ã«â€¹Â¨ÃªÂ³â€ž 4: Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Å Â¤Ã¬Å“â€žÃ­Å Â¸
```bash
# Run tests with coverage
npm run test -- --coverage 2>&1 | tail -50

# Check coverage threshold
# Target: 80% minimum
```

Ã«Â³Â´ÃªÂ³Â  Ã­â€¢Â­Ã«ÂªÂ©:
- Ã¬Â â€žÃ¬Â²Â´ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸: X
- Ã­â€ ÂµÃªÂ³Â¼: X
- Ã¬â€¹Â¤Ã­Å’Â¨: X
- Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬: X%

### Ã«â€¹Â¨ÃªÂ³â€ž 5: Ã«Â³Â´Ã¬â€¢Ë† Ã¬Å Â¤Ã¬Âºâ€
```bash
# Check for secrets
grep -rn "sk-" --include="*.ts" --include="*.js" . 2>/dev/null | head -10
grep -rn "api_key" --include="*.ts" --include="*.js" . 2>/dev/null | head -10

# Check for console.log
grep -rn "console.log" --include="*.ts" --include="*.tsx" src/ 2>/dev/null | head -10
```

### Ã«â€¹Â¨ÃªÂ³â€ž 6: Diff Ã«Â¦Â¬Ã«Â·Â°
```bash
# Show what changed
git diff --stat
git diff --name-only
git diff --cached --name-only
```

ÃªÂ°Â Ã«Â³â‚¬ÃªÂ²Â½Ã«ÂÅ“ Ã­Å’Å’Ã¬ÂÂ¼Ã¬â€”ÂÃ¬â€žÅ“ Ã«â€¹Â¤Ã¬ÂÅ’Ã¬Ââ€ž ÃªÂ²â‚¬Ã­â€ Â Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:
- Ã¬ÂËœÃ«Ââ€žÃ­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬Ââ‚¬ Ã«Â³â‚¬ÃªÂ²Â½
- Ã«Ë†â€žÃ«ÂÂ½Ã«ÂÅ“ Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Â²ËœÃ«Â¦Â¬
- Ã¬Å¾Â Ã¬Å¾Â¬Ã¬Â Â Ã¬â€”Â£Ã¬Â§â‚¬ Ã¬Â¼â‚¬Ã¬ÂÂ´Ã¬Å Â¤

## Ã¬Â¶Å“Ã«Â Â¥ Ã­Ëœâ€¢Ã¬â€¹Â

Ã«ÂªÂ¨Ã«â€œÂ  Ã«â€¹Â¨ÃªÂ³â€žÃ«Â¥Â¼ Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢Å“ Ã­â€ºâ€ž ÃªÂ²â‚¬Ã¬Â¦Â Ã«Â³Â´ÃªÂ³Â Ã¬â€žÅ“Ã«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```
VERIFICATION REPORT
==================

Build:     [PASS/FAIL]
Types:     [PASS/FAIL] (X errors)
Lint:      [PASS/FAIL] (X warnings)
Tests:     [PASS/FAIL] (X/Y passed, Z% coverage)
Security:  [PASS/FAIL] (X issues)
Diff:      [X files changed]

Overall:   [READY/NOT READY] for PR

Issues to Fix:
1. ...
2. ...
```

## Ã¬â€”Â°Ã¬â€ Â Ã«ÂªÂ¨Ã«â€œÅ“

ÃªÂ¸Â´ Ã¬â€žÂ¸Ã¬â€¦ËœÃ¬â€”ÂÃ¬â€žÅ“Ã«Å â€ 15Ã«Â¶â€žÃ«Â§Ë†Ã«â€¹Â¤ Ã«ËœÂÃ«Å â€ Ã¬Â£Â¼Ã¬Å¡â€ Ã«Â³â‚¬ÃªÂ²Â½ Ã­â€ºâ€žÃ¬â€”Â ÃªÂ²â‚¬Ã¬Â¦ÂÃ¬Ââ€ž Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```markdown
Set a mental checkpoint:
- After completing each function
- After finishing a component
- Before moving to next task

Run: /verify
```

## HookÃªÂ³Â¼Ã¬ÂËœ Ã­â€ ÂµÃ­â€¢Â©

Ã¬ÂÂ´ Ã¬Å Â¤Ã­â€šÂ¬Ã¬Ââ‚¬ PostToolUse HookÃ¬Ââ€ž Ã«Â³Â´Ã¬â„¢â€žÃ­â€¢ËœÃ¬Â§â‚¬Ã«Â§Å’ Ã«Ââ€ ÃªÂ¹Å Ã¬Ââ‚¬ ÃªÂ²â‚¬Ã¬Â¦ÂÃ¬Ââ€ž Ã¬Â Å“ÃªÂ³ÂµÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.
HookÃ¬Ââ‚¬ Ã¬Â¦â€°Ã¬â€¹Å“ Ã«Â¬Â¸Ã¬Â Å“Ã«Â¥Â¼ Ã­ÂÂ¬Ã¬Â°Â©Ã­â€¢ËœÃªÂ³Â , Ã¬ÂÂ´ Ã¬Å Â¤Ã­â€šÂ¬Ã¬Ââ‚¬ Ã­ÂÂ¬ÃªÂ´â€žÃ¬Â ÂÃ¬ÂÂ¸ ÃªÂ²â‚¬Ã­â€ Â Ã«Â¥Â¼ Ã¬Â Å“ÃªÂ³ÂµÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.
