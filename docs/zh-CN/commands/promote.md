---
name: promote
description: Ã¥Â°â€ Ã©Â¡Â¹Ã§â€ºÂ®Ã¨Å’Æ’Ã¥â€ºÂ´Ã¥â€ â€¦Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½Ã¦Å½Â¨Ã¥Â¹Â¿Ã¥Ë†Â°Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¨Å’Æ’Ã¥â€ºÂ´
command: true
---

# Ã¦ÂÂÃ¥Ââ€¡Ã¥â€˜Â½Ã¤Â»Â¤

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


Ã¥Å“Â¨ continuous-learning-v2 Ã¤Â¸Â­Ã¥Â°â€ Ã¦Å“Â¬Ã¨Æ’Â½Ã¤Â»Å½Ã©Â¡Â¹Ã§â€ºÂ®Ã¨Å’Æ’Ã¥â€ºÂ´Ã¦ÂÂÃ¥Ââ€¡Ã¥Ë†Â°Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¨Å’Æ’Ã¥â€ºÂ´Ã£â‚¬â€š

## Ã¥Â®Å¾Ã§Å½Â°

Ã¤Â½Â¿Ã§â€Â¨Ã¦Ââ€™Ã¤Â»Â¶Ã¦Â Â¹Ã¨Â·Â¯Ã¥Â¾â€žÃ¨Â¿ÂÃ¨Â¡Å’Ã¦Å“Â¬Ã¨Æ’Â½ CLIÃ¯Â¼Å¡

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/scripts/instinct-cli.py" promote [instinct-id] [--force] [--dry-run]
```

Ã¦Ë†â€“Ã¨â‚¬â€¦Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å“ÂªÃ¨Â®Â¾Ã§Â½Â® `CLAUDE_PLUGIN_ROOT`Ã¯Â¼Ë†Ã¦â€°â€¹Ã¥Å Â¨Ã¥Â®â€°Ã¨Â£â€¦Ã¯Â¼â€°Ã¯Â¼Å¡

```bash
python3 ~/.claude/skills/continuous-learning-v2/scripts/instinct-cli.py promote [instinct-id] [--force] [--dry-run]
```

## Ã§â€Â¨Ã¦Â³â€¢

```bash
/promote                      # Auto-detect promotion candidates
/promote --dry-run            # Preview auto-promotion candidates
/promote --force              # Promote all qualified candidates without prompt
/promote grep-before-edit     # Promote one specific instinct from current project
```

## Ã¦â€œÂÃ¤Â½Å“Ã¦Â­Â¥Ã©ÂªÂ¤

1. Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¥Â½â€œÃ¥â€°ÂÃ©Â¡Â¹Ã§â€ºÂ®
2. Ã¥Â¦â€šÃ¦Å¾Å“Ã¦ÂÂÃ¤Â¾â€ºÃ¤Âºâ€  `instinct-id`Ã¯Â¼Å’Ã¥Ë†â„¢Ã¤Â»â€¦Ã¦ÂÂÃ¥Ââ€¡Ã¨Â¯Â¥Ã¦Å“Â¬Ã¨Æ’Â½Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â­ËœÃ¥Å“Â¨Ã¤ÂºÅ½Ã¥Â½â€œÃ¥â€°ÂÃ©Â¡Â¹Ã§â€ºÂ®Ã¤Â¸Â­Ã¯Â¼â€°
3. Ã¥ÂÂ¦Ã¥Ë†â„¢Ã¯Â¼Å’Ã¦Å¸Â¥Ã¦â€°Â¾Ã¨Â·Â¨Ã©Â¡Â¹Ã§â€ºÂ®Ã¥â‚¬â„¢Ã©â‚¬â€°Ã¦Å“Â¬Ã¨Æ’Â½Ã¯Â¼Å’Ã¨Â¿â„¢Ã¤Âºâ€ºÃ¦Å“Â¬Ã¨Æ’Â½Ã¯Â¼Å¡
   * Ã¥â€¡ÂºÃ§Å½Â°Ã¥Å“Â¨Ã¨â€¡Â³Ã¥Â°â€˜ 2 Ã¤Â¸ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¤Â¸Â­
   * Ã¦Â»Â¡Ã¨Â¶Â³Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã©ËœË†Ã¥â‚¬Â¼
4. Ã¥Â°â€ Ã¦ÂÂÃ¥Ââ€¡Ã¥ÂÅ½Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½Ã¥â€ â„¢Ã¥â€¦Â¥ `~/.claude/homunculus/instincts/personal/`Ã¯Â¼Å’Ã¥Â¹Â¶Ã¨Â®Â¾Ã§Â½Â® `scope: global`
