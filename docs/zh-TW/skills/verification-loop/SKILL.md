# Ã©Â©â€”Ã¨Â­â€°Ã¥Â¾ÂªÃ§â€™Â°Ã¦Å â‚¬Ã¨Æ’Â½

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Claude Code Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ§Å¡â€žÃ¥Â®Å’Ã¦â€¢Â´Ã©Â©â€”Ã¨Â­â€°Ã§Â³Â»Ã§ÂµÂ±Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â„¢â€šÃ¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¦Â³ÂÃ¥â€˜Â¼Ã¥ÂÂ«Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡
- Ã¥Â®Å’Ã¦Ë†ÂÃ¥Å Å¸Ã¨Æ’Â½Ã¦Ë†â€“Ã©â€¡ÂÃ¥Â¤Â§Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¨Â®Å Ã¦â€ºÂ´Ã¥Â¾Å’
- Ã¥Â»ÂºÃ§Â«â€¹ PR Ã¥â€°Â
- Ã¦Æ’Â³Ã§Â¢ÂºÃ¤Â¿ÂÃ¥â€œÂÃ¨Â³ÂªÃ©â€“â‚¬Ã¦ÂªÂ»Ã©â‚¬Å¡Ã©ÂÅ½Ã¦â„¢â€š
- Ã©â€¡ÂÃ¦Â§â€¹Ã¥Â¾Å’

## Ã©Â©â€”Ã¨Â­â€°Ã©Å¡Å½Ã¦Â®Âµ

### Ã©Å¡Å½Ã¦Â®Âµ 1Ã¯Â¼Å¡Ã¥Â»ÂºÃ§Â½Â®Ã©Â©â€”Ã¨Â­â€°
```bash
# Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¥Â°Ë†Ã¦Â¡Ë†Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¥Â»ÂºÃ§Â½Â®
npm run build 2>&1 | tail -20
# Ã¦Ë†â€“
pnpm build 2>&1 | tail -20
```

Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â»ÂºÃ§Â½Â®Ã¥Â¤Â±Ã¦â€¢â€”Ã¯Â¼Å’Ã¥ÂÅ“Ã¦Â­Â¢Ã¤Â¸Â¦Ã¥Å“Â¨Ã§Â¹Â¼Ã§ÂºÅ’Ã¥â€°ÂÃ¤Â¿Â®Ã¥Â¾Â©Ã£â‚¬â€š

### Ã©Å¡Å½Ã¦Â®Âµ 2Ã¯Â¼Å¡Ã¥Å¾â€¹Ã¥Ë†Â¥Ã¦ÂªÂ¢Ã¦Å¸Â¥
```bash
# TypeScript Ã¥Â°Ë†Ã¦Â¡Ë†
npx tsc --noEmit 2>&1 | head -30

# Python Ã¥Â°Ë†Ã¦Â¡Ë†
pyright . 2>&1 | head -30
```

Ã¥Â Â±Ã¥â€˜Å Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Å¾â€¹Ã¥Ë†Â¥Ã©Å’Â¯Ã¨ÂªÂ¤Ã£â‚¬â€šÃ§Â¹Â¼Ã§ÂºÅ’Ã¥â€°ÂÃ¤Â¿Â®Ã¥Â¾Â©Ã©â€”Å“Ã©ÂÂµÃ©Å’Â¯Ã¨ÂªÂ¤Ã£â‚¬â€š

### Ã©Å¡Å½Ã¦Â®Âµ 3Ã¯Â¼Å¡Lint Ã¦ÂªÂ¢Ã¦Å¸Â¥
```bash
# JavaScript/TypeScript
npm run lint 2>&1 | head -30

# Python
ruff check . 2>&1 | head -30
```

### Ã©Å¡Å½Ã¦Â®Âµ 4Ã¯Â¼Å¡Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¥â€”Ã¤Â»Â¶
```bash
# Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â¸Â¶Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦
npm run test -- --coverage 2>&1 | tail -50

# Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã©â€“â‚¬Ã¦ÂªÂ»
# Ã§â€ºÂ®Ã¦Â¨â„¢Ã¯Â¼Å¡Ã¦Å“â‚¬Ã¤Â½Å½ 80%
```

Ã¥Â Â±Ã¥â€˜Å Ã¯Â¼Å¡
- Ã§Â¸Â½Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦â€¢Â¸Ã¯Â¼Å¡X
- Ã©â‚¬Å¡Ã©ÂÅ½Ã¯Â¼Å¡X
- Ã¥Â¤Â±Ã¦â€¢â€”Ã¯Â¼Å¡X
- Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¯Â¼Å¡X%

### Ã©Å¡Å½Ã¦Â®Âµ 5Ã¯Â¼Å¡Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å½Æ’Ã¦ÂÂ
```bash
# Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¥Â¯â€ Ã©â€˜Â°
grep -rn "sk-" --include="*.ts" --include="*.js" . 2>/dev/null | head -10
grep -rn "api_key" --include="*.ts" --include="*.js" . 2>/dev/null | head -10

# Ã¦ÂªÂ¢Ã¦Å¸Â¥ console.log
grep -rn "console.log" --include="*.ts" --include="*.tsx" src/ 2>/dev/null | head -10
```

### Ã©Å¡Å½Ã¦Â®Âµ 6Ã¯Â¼Å¡Ã¥Â·Â®Ã§â€¢Â°Ã¥Â¯Â©Ã¦Å¸Â¥
```bash
# Ã©Â¡Â¯Ã§Â¤ÂºÃ¨Â®Å Ã¦â€ºÂ´Ã¥â€¦Â§Ã¥Â®Â¹
git diff --stat
git diff HEAD~1 --name-only
```

Ã¥Â¯Â©Ã¦Å¸Â¥Ã¦Â¯ÂÃ¥â‚¬â€¹Ã¨Â®Å Ã¦â€ºÂ´Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å¡
- Ã©ÂÅ¾Ã©Â ÂÃ¦Å“Å¸Ã¨Â®Å Ã¦â€ºÂ´
- Ã§Â¼ÂºÃ¥Â°â€˜Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ 
- Ã¦Â½â€ºÃ¥Å“Â¨Ã©â€šÅ Ã§â€¢Å’Ã¦Â¡Ë†Ã¤Â¾â€¹

## Ã¨Â¼Â¸Ã¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼Â

Ã¥Å¸Â·Ã¨Â¡Å’Ã¦â€°â‚¬Ã¦Å“â€°Ã©Å¡Å½Ã¦Â®ÂµÃ¥Â¾Å’Ã¯Â¼Å’Ã§â€Â¢Ã§â€Å¸Ã©Â©â€”Ã¨Â­â€°Ã¥Â Â±Ã¥â€˜Å Ã¯Â¼Å¡

```
Ã©Â©â€”Ã¨Â­â€°Ã¥Â Â±Ã¥â€˜Å 
==================

Ã¥Â»ÂºÃ§Â½Â®Ã¯Â¼Å¡     [PASS/FAIL]
Ã¥Å¾â€¹Ã¥Ë†Â¥Ã¯Â¼Å¡     [PASS/FAIL]Ã¯Â¼Ë†X Ã¥â‚¬â€¹Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼â€°
LintÃ¯Â¼Å¡     [PASS/FAIL]Ã¯Â¼Ë†X Ã¥â‚¬â€¹Ã¨Â­Â¦Ã¥â€˜Å Ã¯Â¼â€°
Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Å¡     [PASS/FAIL]Ã¯Â¼Ë†X/Y Ã©â‚¬Å¡Ã©ÂÅ½Ã¯Â¼Å’Z% Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¯Â¼â€°
Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¯Â¼Å¡   [PASS/FAIL]Ã¯Â¼Ë†X Ã¥â‚¬â€¹Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼â€°
Ã¥Â·Â®Ã§â€¢Â°Ã¯Â¼Å¡     [X Ã¥â‚¬â€¹Ã¦Âªâ€Ã¦Â¡Ë†Ã¨Â®Å Ã¦â€ºÂ´]

Ã¦â€¢Â´Ã©Â«â€Ã¯Â¼Å¡     [READY/NOT READY] for PR

Ã¥Â¾â€¦Ã¤Â¿Â®Ã¥Â¾Â©Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Å¡
1. ...
2. ...
```

## Ã¦Å’ÂÃ§ÂºÅ’Ã¦Â¨Â¡Ã¥Â¼Â

Ã¥Â°ÂÃ¦â€“Â¼Ã©â€¢Â·Ã¦â„¢â€šÃ©â€“â€œÃ¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ¯Â¼Å’Ã¦Â¯Â 15 Ã¥Ë†â€ Ã©ÂËœÃ¦Ë†â€“Ã©â€¡ÂÃ¥Â¤Â§Ã¨Â®Å Ã¦â€ºÂ´Ã¥Â¾Å’Ã¥Å¸Â·Ã¨Â¡Å’Ã©Â©â€”Ã¨Â­â€°Ã¯Â¼Å¡

```markdown
Ã¨Â¨Â­Ã¥Â®Å¡Ã¥Â¿Æ’Ã§Ââ€ Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¯Â¼Å¡
- Ã¥Â®Å’Ã¦Ë†ÂÃ¦Â¯ÂÃ¥â‚¬â€¹Ã¥â€¡Â½Ã¥Â¼ÂÃ¥Â¾Å’
- Ã¥Â®Å’Ã¦Ë†ÂÃ¥â€¦Æ’Ã¤Â»Â¶Ã¥Â¾Å’
- Ã§Â§Â»Ã¨â€¡Â³Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã¤Â»Â»Ã¥â€¹â„¢Ã¥â€°Â

Ã¥Å¸Â·Ã¨Â¡Å’Ã¯Â¼Å¡/verify
```

## Ã¨Ë†â€¡ Hooks Ã¦â€¢Â´Ã¥ÂË†

Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã¨Â£Å“Ã¥â€¦â€¦ PostToolUse hooks Ã¤Â½â€ Ã¦ÂÂÃ¤Â¾â€ºÃ¦â€ºÂ´Ã¦Â·Â±Ã¥â€¦Â¥Ã§Å¡â€žÃ©Â©â€”Ã¨Â­â€°Ã£â‚¬â€š
Hooks Ã§Â«â€¹Ã¥ÂÂ³Ã¦Ââ€¢Ã¦Ââ€°Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼â€ºÃ¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã¦ÂÂÃ¤Â¾â€ºÃ¥â€¦Â¨Ã©ÂÂ¢Ã¥Â¯Â©Ã¦Å¸Â¥Ã£â‚¬â€š
