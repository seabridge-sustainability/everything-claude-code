---
description: Ã¬â€žÂ Ã­ËœÂ¸Ã­â€¢ËœÃ«Å â€ Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬(npm/pnpm/yarn/bun) Ã¬â€žÂ¤Ã¬Â â€¢
disable-model-invocation: true
---

# Ã­Å’Â¨Ã­â€šÂ¤Ã¬Â§â‚¬ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬ Ã¬â€žÂ¤Ã¬Â â€¢

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
