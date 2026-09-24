---
description: Ã©â€¦ÂÃ§Â½Â®Ã¦â€šÂ¨Ã©Â¦â€“Ã©â‚¬â€°Ã§Å¡â€žÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¯Â¼Ë†npm/pnpm/yarn/bunÃ¯Â¼â€°
disable-model-invocation: true
---

# Ã¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¨Â®Â¾Ã§Â½Â®

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
