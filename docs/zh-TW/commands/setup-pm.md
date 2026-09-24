---
description: Configure your preferred package manager (npm/pnpm/yarn/bun)
disable-model-invocation: true
---

# Ã¥Â¥â€”Ã¤Â»Â¶Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¨Â¨Â­Ã¥Â®Å¡

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
