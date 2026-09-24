---
description: Ã¥Ë†â€ Ã¦Å¾ÂÃ¨Â·Â¨Ã¤Â»Â£Ã§Ââ€ Ã£â‚¬ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã£â‚¬ÂMCPÃ¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã¥â€™Å’Ã¨Â§â€žÃ¥Ë†â„¢Ã§Å¡â€žÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Âªâ€”Ã¥ÂÂ£Ã¤Â½Â¿Ã§â€Â¨Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Å’Ã¤Â»Â¥Ã¥Â¯Â»Ã¦â€°Â¾Ã¤Â¼ËœÃ¥Å’â€“Ã¦Å“ÂºÃ¤Â¼Å¡Ã£â‚¬â€šÃ¦Å“â€°Ã¥Å Â©Ã¤ÂºÅ½Ã¥â€¡ÂÃ¥Â°â€˜Ã¤Â»Â¤Ã§â€°Å’Ã¥Â¼â‚¬Ã©â€â‚¬Ã¥Â¹Â¶Ã©ÂÂ¿Ã¥â€¦ÂÃ¦â‚¬Â§Ã¨Æ’Â½Ã¨Â­Â¦Ã¥â€˜Å Ã£â‚¬â€š
---

# Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã©Â¢â€žÃ§Â®â€”Ã¤Â¼ËœÃ¥Å’â€“Ã¥â„¢Â¨

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


Ã¥Ë†â€ Ã¦Å¾ÂÃ¦â€šÂ¨Ã§Å¡â€ž Claude Code Ã¨Â®Â¾Ã§Â½Â®Ã¤Â¸Â­Ã§Å¡â€žÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Âªâ€”Ã¥ÂÂ£Ã¦Â¶Ë†Ã¨â‚¬â€”Ã¯Â¼Å’Ã¥Â¹Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¥ÂÂ¯Ã¦â€œÂÃ¤Â½Å“Ã§Å¡â€žÃ¥Â»ÂºÃ¨Â®Â®Ã¤Â»Â¥Ã¥â€¡ÂÃ¥Â°â€˜Ã¤Â»Â¤Ã§â€°Å’Ã¥Â¼â‚¬Ã©â€â‚¬Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢

```
/context-budget [--verbose]
```

* Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼Å¡Ã¦ÂÂÃ¤Â¾â€ºÃ¦â€˜ËœÃ¨Â¦ÂÃ¥ÂÅ Ã¤Â¸Â»Ã¨Â¦ÂÃ¥Â»ÂºÃ¨Â®Â®
* `--verbose`Ã¯Â¼Å¡Ã¦Å’â€°Ã§Â»â€žÃ¤Â»Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¥Â®Å’Ã¦â€¢Â´Ã§Â»â€ Ã¥Ë†â€ 

$ARGUMENTS

## Ã¦â€œÂÃ¤Â½Å“Ã¦Â­Â¥Ã©ÂªÂ¤

Ã¨Â¿ÂÃ¨Â¡Å’ **context-budget** Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Ë†`skills/context-budget/SKILL.md`Ã¯Â¼â€°Ã¯Â¼Å’Ã¥Â¹Â¶Ã¨Â¾â€œÃ¥â€¦Â¥Ã¤Â»Â¥Ã¤Â¸â€¹Ã¥â€ â€¦Ã¥Â®Â¹Ã¯Â¼Å¡

1. Ã¥Â¦â€šÃ¦Å¾Å“ `$ARGUMENTS` Ã¤Â¸Â­Ã¥Â­ËœÃ¥Å“Â¨ `--verbose` Ã¦Â â€¡Ã¥Â¿â€”Ã¯Â¼Å’Ã¥Ë†â„¢Ã¤Â¼Â Ã©â‚¬â€™Ã¨Â¯Â¥Ã¦Â â€¡Ã¥Â¿â€”
2. Ã©â„¢Â¤Ã©ÂÅ¾Ã§â€Â¨Ã¦Ë†Â·Ã¥ÂÂ¦Ã¨Â¡Å’Ã¦Å’â€¡Ã¥Â®Å¡Ã¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã¥Ââ€¡Ã¨Â®Â¾Ã¤Â¸Âº 200K Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Âªâ€”Ã¥ÂÂ£Ã¯Â¼Ë†Claude Sonnet Ã©Â»ËœÃ¨Â®Â¤Ã¥â‚¬Â¼Ã¯Â¼â€°
3. Ã©ÂÂµÃ¥Â¾ÂªÃ¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ¥â€ºâ€ºÃ¤Â¸ÂªÃ©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼Å¡Ã¦Â¸â€¦Ã¥Ââ€¢ Ã¢â€ â€™ Ã¥Ë†â€ Ã§Â±Â» Ã¢â€ â€™ Ã¦Â£â‚¬Ã¦Âµâ€¹Ã©â€”Â®Ã©Â¢Ëœ Ã¢â€ â€™ Ã¦Å Â¥Ã¥â€˜Å 
4. Ã¥Ââ€˜Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã§Å¡â€žÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã©Â¢â€žÃ§Â®â€”Ã¦Å Â¥Ã¥â€˜Å 

Ã¨Â¯Â¥Ã¦Å â‚¬Ã¨Æ’Â½Ã¨Â´Å¸Ã¨Â´Â£Ã¦â€°â‚¬Ã¦Å“â€°Ã¦â€°Â«Ã¦ÂÂÃ©â‚¬Â»Ã¨Â¾â€˜Ã£â‚¬ÂÃ¤Â»Â¤Ã§â€°Å’Ã¤Â¼Â°Ã§Â®â€”Ã£â‚¬ÂÃ©â€”Â®Ã©Â¢ËœÃ¦Â£â‚¬Ã¦Âµâ€¹Ã¥â€™Å’Ã¦Å Â¥Ã¥â€˜Å Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã£â‚¬â€š
