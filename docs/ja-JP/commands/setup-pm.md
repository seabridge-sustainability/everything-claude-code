---
description: Ã¥â€žÂªÃ¥â€¦Ë†Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡Ã¯Â¼Ë†npm/pnpm/yarn/bunÃ¯Â¼â€°
disable-model-invocation: true
---

# Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£ÂÂ®Ã¨Â¨Â­Ã¥Â®Å¡

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã£Ââ€œÃ£ÂÂ®Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£â€šÂ°Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â«Ã£ÂÂ§Ã¥â€žÂªÃ¥â€¦Ë†Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢

```bash
# Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£â€šâ€™Ã¦Â¤Å“Ã¥â€¡Âº
node scripts/setup-package-manager.js --detect

# Ã£â€šÂ°Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â«Ã¨Â¨Â­Ã¥Â®Å¡Ã£â€šâ€™Ã¦Å’â€¡Ã¥Â®Å¡
node scripts/setup-package-manager.js --global pnpm

# Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã¨Â¨Â­Ã¥Â®Å¡Ã£â€šâ€™Ã¦Å’â€¡Ã¥Â®Å¡
node scripts/setup-package-manager.js --project bun

# Ã¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¨Â¡Â¨Ã§Â¤Âº
node scripts/setup-package-manager.js --list
```

## Ã¦Â¤Å“Ã¥â€¡ÂºÃ£ÂÂ®Ã¥â€žÂªÃ¥â€¦Ë†Ã©Â â€ Ã¤Â½Â

Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£â€šâ€™Ã¦Â±ÂºÃ¥Â®Å¡Ã£Ââ„¢Ã£â€šâ€¹Ã©Å¡â€ºÃ£â‚¬ÂÃ¤Â»Â¥Ã¤Â¸â€¹Ã£ÂÂ®Ã©Â â€ Ã¥ÂºÂÃ£ÂÂ§Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¾Ã£Ââ„¢:

1. **Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°**: `CLAUDE_PACKAGE_MANAGER`
2. **Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã¨Â¨Â­Ã¥Â®Å¡**: `.claude/package-manager.json`
3. **package.json**: `packageManager` Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â€°
4. **Ã£Æ’Â­Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«**: package-lock.jsonÃ£â‚¬Âyarn.lockÃ£â‚¬Âpnpm-lock.yamlÃ£â‚¬Âbun.lockbÃ£ÂÂ®Ã¥Â­ËœÃ¥Å“Â¨
5. **Ã£â€šÂ°Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â«Ã¨Â¨Â­Ã¥Â®Å¡**: `~/.claude/package-manager.json`
6. **Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯**: Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã¯Â¼Ë†pnpm > bun > yarn > npmÃ¯Â¼â€°

## Ã¨Â¨Â­Ã¥Â®Å¡Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«

### Ã£â€šÂ°Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â«Ã¨Â¨Â­Ã¥Â®Å¡
```json
// ~/.claude/package-manager.json
{
  "packageManager": "pnpm"
}
```

### Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã¨Â¨Â­Ã¥Â®Å¡
```json
// .claude/package-manager.json
{
  "packageManager": "bun"
}
```

### package.json
```json
{
  "packageManager": "pnpm@8.6.0"
}
```

## Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°

`CLAUDE_PACKAGE_MANAGER` Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£â‚¬ÂÃ¤Â»â€“Ã£ÂÂ®Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã¦Â¤Å“Ã¥â€¡ÂºÃ¦â€“Â¹Ã¦Â³â€¢Ã£â€šâ€™Ã¤Â¸Å Ã¦â€ºÂ¸Ã£ÂÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:

```bash
# Windows (PowerShell)
$env:CLAUDE_PACKAGE_MANAGER = "pnpm"

# macOS/Linux
export CLAUDE_PACKAGE_MANAGER=pnpm
```

## Ã¦Â¤Å“Ã¥â€¡ÂºÃ£ÂÂ®Ã¥Â®Å¸Ã¨Â¡Å’

Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã£Æ’â€˜Ã£Æ’Æ’Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã¦Â¤Å“Ã¥â€¡ÂºÃ§ÂµÂÃ¦Å¾Å“Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂÃ£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ«Ã£ÂÂ¯Ã£â‚¬ÂÃ¦Â¬Â¡Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:

```bash
node scripts/setup-package-manager.js --detect
```
