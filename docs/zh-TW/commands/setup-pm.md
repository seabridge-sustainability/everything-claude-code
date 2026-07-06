---
description: Configure your preferred package manager (npm/pnpm/yarn/bun)
disable-model-invocation: true
---

# Ã¥Â¥â€”Ã¤Â»Â¶Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¨Â¨Â­Ã¥Â®Å¡

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Ã§â€šÂºÃ¦Â­Â¤Ã¥Â°Ë†Ã¦Â¡Ë†Ã¦Ë†â€“Ã¥â€¦Â¨Ã¥Å¸Å¸Ã¨Â¨Â­Ã¥Â®Å¡Ã¦â€šÂ¨Ã¥ÂÂÃ¥Â¥Â½Ã§Å¡â€žÃ¥Â¥â€”Ã¤Â»Â¶Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â

```bash
# Ã¥ÂÂµÃ¦Â¸Â¬Ã§â€ºÂ®Ã¥â€°ÂÃ§Å¡â€žÃ¥Â¥â€”Ã¤Â»Â¶Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨
node scripts/setup-package-manager.js --detect

# Ã¨Â¨Â­Ã¥Â®Å¡Ã¥â€¦Â¨Ã¥Å¸Å¸Ã¥ÂÂÃ¥Â¥Â½
node scripts/setup-package-manager.js --global pnpm

# Ã¨Â¨Â­Ã¥Â®Å¡Ã¥Â°Ë†Ã¦Â¡Ë†Ã¥ÂÂÃ¥Â¥Â½
node scripts/setup-package-manager.js --project bun

# Ã¥Ë†â€”Ã¥â€¡ÂºÃ¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€žÃ¥Â¥â€”Ã¤Â»Â¶Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨
node scripts/setup-package-manager.js --list
```

## Ã¥ÂÂµÃ¦Â¸Â¬Ã¥â€žÂªÃ¥â€¦Ë†Ã©Â â€ Ã¥ÂºÂ

Ã¦Â±ÂºÃ¥Â®Å¡Ã¤Â½Â¿Ã§â€Â¨Ã¥â€œÂªÃ¥â‚¬â€¹Ã¥Â¥â€”Ã¤Â»Â¶Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¦â„¢â€šÃ¯Â¼Å’Ã¦Å’â€°Ã¤Â»Â¥Ã¤Â¸â€¹Ã©Â â€ Ã¥ÂºÂÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã¯Â¼Å¡

1. **Ã§â€™Â°Ã¥Â¢Æ’Ã¨Â®Å Ã¦â€¢Â¸**Ã¯Â¼Å¡`CLAUDE_PACKAGE_MANAGER`
2. **Ã¥Â°Ë†Ã¦Â¡Ë†Ã¨Â¨Â­Ã¥Â®Å¡**Ã¯Â¼Å¡`.claude/package-manager.json`
3. **package.json**Ã¯Â¼Å¡`packageManager` Ã¦Â¬â€žÃ¤Â½Â
4. **Lock Ã¦Âªâ€Ã¦Â¡Ë†**Ã¯Â¼Å¡Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¥Â­ËœÃ¥Å“Â¨ package-lock.jsonÃ£â‚¬Âyarn.lockÃ£â‚¬Âpnpm-lock.yaml Ã¦Ë†â€“ bun.lockb
5. **Ã¥â€¦Â¨Ã¥Å¸Å¸Ã¨Â¨Â­Ã¥Â®Å¡**Ã¯Â¼Å¡`~/.claude/package-manager.json`
6. **Ã¥â€šâ„¢Ã¦ÂÂ´**Ã¯Â¼Å¡Ã§Â¬Â¬Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€žÃ¥Â¥â€”Ã¤Â»Â¶Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¯Â¼Ë†pnpm > bun > yarn > npmÃ¯Â¼â€°

## Ã¨Â¨Â­Ã¥Â®Å¡Ã¦Âªâ€

### Ã¥â€¦Â¨Ã¥Å¸Å¸Ã¨Â¨Â­Ã¥Â®Å¡
```json
// ~/.claude/package-manager.json
{
  "packageManager": "pnpm"
}
```

### Ã¥Â°Ë†Ã¦Â¡Ë†Ã¨Â¨Â­Ã¥Â®Å¡
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

## Ã§â€™Â°Ã¥Â¢Æ’Ã¨Â®Å Ã¦â€¢Â¸

Ã¨Â¨Â­Ã¥Â®Å¡ `CLAUDE_PACKAGE_MANAGER` Ã¤Â»Â¥Ã¨Â¦â€ Ã¨â€œâ€¹Ã¦â€°â‚¬Ã¦Å“â€°Ã¥â€¦Â¶Ã¤Â»â€“Ã¥ÂÂµÃ¦Â¸Â¬Ã¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼Å¡

```bash
# Windows (PowerShell)
$env:CLAUDE_PACKAGE_MANAGER = "pnpm"

# macOS/Linux
export CLAUDE_PACKAGE_MANAGER=pnpm
```

## Ã¥Å¸Â·Ã¨Â¡Å’Ã¥ÂÂµÃ¦Â¸Â¬

Ã¨Â¦ÂÃ¦Å¸Â¥Ã§Å“â€¹Ã§â€ºÂ®Ã¥â€°ÂÃ¥Â¥â€”Ã¤Â»Â¶Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¥ÂÂµÃ¦Â¸Â¬Ã§ÂµÂÃ¦Å¾Å“Ã¯Â¼Å’Ã¥Å¸Â·Ã¨Â¡Å’Ã¯Â¼Å¡

```bash
node scripts/setup-package-manager.js --detect
```
