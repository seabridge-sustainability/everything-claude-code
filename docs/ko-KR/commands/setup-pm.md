---
description: Ã¬â€žÂ Ã­ËœÂ¸Ã­â€¢ËœÃ«Å â€ Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬(npm/pnpm/yarn/bun) Ã¬â€žÂ¤Ã¬Â â€¢
disable-model-invocation: true
---

# Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬ Ã¬â€žÂ¤Ã¬Â â€¢

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


Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã«ËœÂÃ«Å â€ Ã¬Â â€žÃ¬â€”Â­Ã¬Å“Â¼Ã«Â¡Å“ Ã¬â€žÂ Ã­ËœÂ¸Ã­â€¢ËœÃ«Å â€ Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬Ã«Â¥Â¼ Ã¬â€žÂ¤Ã¬Â â€¢Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬â€šÂ¬Ã¬Å¡Â©Ã«Â²â€¢

```bash
# Ã­Ëœâ€žÃ¬Å¾Â¬ Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬ ÃªÂ°ÂÃ¬Â§â‚¬
node scripts/setup-package-manager.js --detect

# Ã¬Â â€žÃ¬â€”Â­ Ã¬â€žÂ¤Ã¬Â â€¢
node scripts/setup-package-manager.js --global pnpm

# Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã¬â€žÂ¤Ã¬Â â€¢
node scripts/setup-package-manager.js --project bun

# Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬ Ã«ÂªÂ©Ã«Â¡Â
node scripts/setup-package-manager.js --list
```

## ÃªÂ°ÂÃ¬Â§â‚¬ Ã¬Å¡Â°Ã¬â€žÂ Ã¬Ë†Å“Ã¬Å“â€ž

Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬Ã«Â¥Â¼ ÃªÂ²Â°Ã¬Â â€¢Ã­â€¢Â  Ã«â€¢Å’ Ã«â€¹Â¤Ã¬ÂÅ’ Ã¬Ë†Å“Ã¬â€žÅ“Ã«Â¡Å“ Ã­â„¢â€¢Ã¬ÂÂ¸Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

1. **Ã­â„¢ËœÃªÂ²Â½ Ã«Â³â‚¬Ã¬Ë†Ëœ**: `CLAUDE_PACKAGE_MANAGER`
2. **Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã¬â€žÂ¤Ã¬Â â€¢**: `.claude/package-manager.json`
3. **package.json**: `packageManager` Ã­â€¢â€žÃ«â€œÅ“
4. **Ã«ÂÂ½ Ã­Å’Å’Ã¬ÂÂ¼**: package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockbÃ¬ÂËœ Ã¬Â¡Â´Ã¬Å¾Â¬ Ã¬â€”Â¬Ã«Â¶â‚¬
5. **Ã¬Â â€žÃ¬â€”Â­ Ã¬â€žÂ¤Ã¬Â â€¢**: `~/.claude/package-manager.json`
6. **Ã­ÂÂ´Ã«Â°Â±**: `npm`

## Ã¬â€žÂ¤Ã¬Â â€¢ Ã­Å’Å’Ã¬ÂÂ¼

### Ã¬Â â€žÃ¬â€”Â­ Ã¬â€žÂ¤Ã¬Â â€¢
```json
// ~/.claude/package-manager.json
{
  "packageManager": "pnpm"
}
```

### Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã¬â€žÂ¤Ã¬Â â€¢
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

## Ã­â„¢ËœÃªÂ²Â½ Ã«Â³â‚¬Ã¬Ë†Ëœ

`CLAUDE_PACKAGE_MANAGER`Ã«Â¥Â¼ Ã¬â€žÂ¤Ã¬Â â€¢Ã­â€¢ËœÃ«Â©Â´ Ã«â€¹Â¤Ã«Â¥Â¸ Ã«ÂªÂ¨Ã«â€œÂ  ÃªÂ°ÂÃ¬Â§â‚¬ Ã«Â°Â©Ã«Â²â€¢Ã¬Ââ€ž Ã«Â¬Â´Ã¬â€¹Å“Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```bash
# Windows (PowerShell)
$env:CLAUDE_PACKAGE_MANAGER = "pnpm"

# macOS/Linux
export CLAUDE_PACKAGE_MANAGER=pnpm
```

## ÃªÂ°ÂÃ¬Â§â‚¬ Ã¬â€¹Â¤Ã­â€“â€°

Ã­Ëœâ€žÃ¬Å¾Â¬ Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬ ÃªÂ°ÂÃ¬Â§â‚¬ ÃªÂ²Â°ÃªÂ³Â¼Ã«Â¥Â¼ Ã­â„¢â€¢Ã¬ÂÂ¸Ã­â€¢ËœÃ«Â Â¤Ã«Â©Â´ Ã«â€¹Â¤Ã¬ÂÅ’Ã¬Ââ€ž Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€:

```bash
node scripts/setup-package-manager.js --detect
```
