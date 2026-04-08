---
description: Ã©â€¦ÂÃ§Â½Â®Ã¦â€šÂ¨Ã©Â¦â€“Ã©â‚¬â€°Ã§Å¡â€žÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¯Â¼Ë†npm/pnpm/yarn/bunÃ¯Â¼â€°
disable-model-invocation: true
---

# Ã¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¨Â®Â¾Ã§Â½Â®

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã©â€¦ÂÃ§Â½Â®Ã¦â€šÂ¨Ã¤Â¸ÂºÃ¦Â­Â¤Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Ë†â€“Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥ÂÂÃ¥Â¥Â½Ã§Å¡â€žÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â

```bash
# Detect current package manager
node scripts/setup-package-manager.js --detect

# Set global preference
node scripts/setup-package-manager.js --global pnpm

# Set project preference
node scripts/setup-package-manager.js --project bun

# List available package managers
node scripts/setup-package-manager.js --list
```

## Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§

Ã¥Å“Â¨Ã§Â¡Â®Ã¥Â®Å¡Ã¤Â½Â¿Ã§â€Â¨Ã¥â€œÂªÃ¤Â¸ÂªÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¦â€”Â¶Ã¯Â¼Å’Ã¤Â¼Å¡Ã¦Å’â€°Ã¤Â»Â¥Ã¤Â¸â€¹Ã©Â¡ÂºÃ¥ÂºÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Å¡

1. **Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡Â**Ã¯Â¼Å¡`CLAUDE_PACKAGE_MANAGER`
2. **Ã©Â¡Â¹Ã§â€ºÂ®Ã©â€¦ÂÃ§Â½Â®**Ã¯Â¼Å¡`.claude/package-manager.json`
3. **package.json**Ã¯Â¼Å¡`packageManager` Ã¥Â­â€”Ã¦Â®Âµ
4. **Ã©â€ÂÃ¦â€“â€¡Ã¤Â»Â¶**Ã¯Â¼Å¡package-lock.jsonÃ£â‚¬Âyarn.lockÃ£â‚¬Âpnpm-lock.yaml Ã¦Ë†â€“ bun.lockb Ã§Å¡â€žÃ¥Â­ËœÃ¥Å“Â¨
5. **Ã¥â€¦Â¨Ã¥Â±â‚¬Ã©â€¦ÂÃ§Â½Â®**Ã¯Â¼Å¡`~/.claude/package-manager.json`
6. **Ã¥â€ºÅ¾Ã©â‚¬â‚¬Ã¦â€“Â¹Ã¦Â¡Ë†**Ã¯Â¼Å¡Ã§Â¬Â¬Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€žÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨ (pnpm > bun > yarn > npm)

## Ã©â€¦ÂÃ§Â½Â®Ã¦â€“â€¡Ã¤Â»Â¶

### Ã¥â€¦Â¨Ã¥Â±â‚¬Ã©â€¦ÂÃ§Â½Â®

```json
// ~/.claude/package-manager.json
{
  "packageManager": "pnpm"
}
```

### Ã©Â¡Â¹Ã§â€ºÂ®Ã©â€¦ÂÃ§Â½Â®

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

## Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡Â

Ã¨Â®Â¾Ã§Â½Â® `CLAUDE_PACKAGE_MANAGER` Ã¤Â»Â¥Ã¨Â¦â€ Ã§â€ºâ€“Ã¦â€°â‚¬Ã¦Å“â€°Ã¥â€¦Â¶Ã¤Â»â€“Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼Å¡

```bash
# Windows (PowerShell)
$env:CLAUDE_PACKAGE_MANAGER = "pnpm"

# macOS/Linux
export CLAUDE_PACKAGE_MANAGER=pnpm
```

## Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Â£â‚¬Ã¦Âµâ€¹

Ã¨Â¦ÂÃ¦Å¸Â¥Ã§Å“â€¹Ã¥Â½â€œÃ¥â€°ÂÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¦Â£â‚¬Ã¦Âµâ€¹Ã§Â»â€œÃ¦Å¾Å“Ã¯Â¼Å’Ã¨Â¯Â·Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å¡

```bash
node scripts/setup-package-manager.js --detect
```
