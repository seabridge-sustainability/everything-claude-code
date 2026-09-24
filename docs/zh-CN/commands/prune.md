---
name: prune
description: Ã¥Ë†Â Ã©â„¢Â¤Ã¨Â¶â€¦Ã¨Â¿â€¡ 30 Ã¥Â¤Â©Ã¤Â¸â€Ã¤Â»Å½Ã¦Å“ÂªÃ¨Â¢Â«Ã¦ÂÂÃ¥Ââ€¡Ã§Å¡â€žÃ¥Â¾â€¦Ã¥Â¤â€žÃ§Ââ€ Ã¦Å“Â¬Ã¨Æ’Â½
command: true
---

# Ã¦Â¸â€¦Ã§Ââ€ Ã¥Â¾â€¦Ã¥Â¤â€žÃ§Ââ€ Ã¦Å“Â¬Ã¨Æ’Â½

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


Ã¥Ë†Â Ã©â„¢Â¤Ã©â€šÂ£Ã¤Âºâ€ºÃ§â€Â±Ã§Â³Â»Ã§Â»Å¸Ã¨â€¡ÂªÃ¥Å Â¨Ã§â€Å¸Ã¦Ë†ÂÃ£â‚¬ÂÃ¤Â½â€ Ã¤Â»Å½Ã¦Å“ÂªÃ§Â»ÂÃ¨Â¿â€¡Ã¥Â®Â¡Ã¦Å¸Â¥Ã¦Ë†â€“Ã¦ÂÂÃ¥Ââ€¡Ã§Å¡â€žÃ¨Â¿â€¡Ã¦Å“Å¸Ã¥Â¾â€¦Ã¥Â¤â€žÃ§Ââ€ Ã¦Å“Â¬Ã¨Æ’Â½Ã£â‚¬â€š

## Ã¥Â®Å¾Ã§Å½Â°

Ã¤Â½Â¿Ã§â€Â¨Ã¦Ââ€™Ã¤Â»Â¶Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã¨Â·Â¯Ã¥Â¾â€žÃ¨Â¿ÂÃ¨Â¡Å’Ã¦Å“Â¬Ã¨Æ’Â½ CLIÃ¯Â¼Å¡

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/scripts/instinct-cli.py" prune
```

Ã¦Ë†â€“Ã¨â‚¬â€¦Ã¥Â¦â€šÃ¦Å¾Å“ `CLAUDE_PLUGIN_ROOT` Ã¦Å“ÂªÃ¨Â®Â¾Ã§Â½Â®Ã¯Â¼Ë†Ã¦â€°â€¹Ã¥Å Â¨Ã¥Â®â€°Ã¨Â£â€¦Ã¯Â¼â€°Ã¯Â¼Å¡

```bash
python3 ~/.claude/skills/continuous-learning-v2/scripts/instinct-cli.py prune
```

## Ã§â€Â¨Ã¦Â³â€¢

```
/prune                    # Ã¥Ë†Â Ã©â„¢Â¤Ã¨Â¶â€¦Ã¨Â¿â€¡ 30 Ã¥Â¤Â©Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½
/prune --max-age 60       # Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥Â¹Â´Ã©Â¾â€žÃ©ËœË†Ã¥â‚¬Â¼Ã¯Â¼Ë†Ã¥Â¤Â©Ã¯Â¼â€°
/prune --dry-run          # Ã¤Â»â€¦Ã©Â¢â€žÃ¨Â§Ë†Ã¯Â¼Å’Ã¤Â¸ÂÃ¥Â®Å¾Ã©â„¢â€¦Ã¥Ë†Â Ã©â„¢Â¤
```
