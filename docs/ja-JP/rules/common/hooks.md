# Hooks Ã£â€šÂ·Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â 

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


## Hook Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”

- **PreToolUse**: Ã£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«Ã¥Â®Å¸Ã¨Â¡Å’Ã¥â€°ÂÃ¯Â¼Ë†Ã¦Â¤Å“Ã¨Â¨Â¼Ã£â‚¬ÂÃ£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥Â¤â€°Ã¦â€ºÂ´Ã¯Â¼â€°
- **PostToolUse**: Ã£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«Ã¥Â®Å¸Ã¨Â¡Å’Ã¥Â¾Å’Ã¯Â¼Ë†Ã¨â€¡ÂªÃ¥â€¹â€¢Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Ë†Ã£â‚¬ÂÃ£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã¯Â¼â€°
- **Stop**: Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã§Âµâ€šÃ¤Âºâ€ Ã¦â„¢â€šÃ¯Â¼Ë†Ã¦Å“â‚¬Ã§Âµâ€šÃ¦Â¤Å“Ã¨Â¨Â¼Ã¯Â¼â€°

## Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¦â€°Â¿Ã¨ÂªÂÃ£Æ’â€˜Ã£Æ’Â¼Ã£Æ’Å¸Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

Ã¦Â³Â¨Ã¦â€žÂÃ£Ââ€”Ã£ÂÂ¦Ã¤Â½Â¿Ã§â€Â¨:
- Ã¤Â¿Â¡Ã©Â Â¼Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã£â‚¬ÂÃ¦ËœÅ½Ã§Â¢ÂºÃ£ÂÂ«Ã¥Â®Å¡Ã§Â¾Â©Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã¨Â¨Ë†Ã§â€Â»Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“
- Ã¦Å½Â¢Ã§Â´Â¢Ã§Å¡â€žÃ£ÂÂªÃ¤Â½Å“Ã¦Â¥Â­Ã£ÂÂ§Ã£ÂÂ¯Ã§â€žÂ¡Ã¥Å Â¹Ã¥Å’â€“
- dangerously-skip-permissions Ã£Æ’â€¢Ã£Æ’Â©Ã£â€šÂ°Ã£â€šâ€™Ã¦Â±ÂºÃ£Ââ€”Ã£ÂÂ¦Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- Ã¤Â»Â£Ã£â€šÂÃ£â€šÅ Ã£ÂÂ« `~/.claude.json` Ã£ÂÂ§ `allowedTools` Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡

## TodoWrite Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

TodoWrite Ã£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦:
- Ã¨Â¤â€¡Ã¦â€¢Â°Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”Ã£ÂÂ®Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ¯Ã£ÂÂ®Ã©â‚¬Â²Ã¦Ââ€”Ã£â€šâ€™Ã¨Â¿Â½Ã¨Â·Â¡
- Ã¦Å’â€¡Ã§Â¤ÂºÃ£ÂÂ®Ã§Ââ€ Ã¨Â§Â£Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼
- Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â«Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã£ÂÂ®Ã¨ÂªÂ¿Ã¦â€¢Â´Ã£â€šâ€™Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂ«
- Ã§Â´Â°Ã£Ââ€¹Ã£Ââ€žÃ¥Â®Å¸Ã¨Â£â€¦Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº

Todo Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã¦ËœÅ½Ã£â€šâ€°Ã£Ââ€¹Ã£ÂÂ«Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨:
- Ã©Â â€ Ã¥ÂºÂÃ£ÂÅ’Ã©â€“â€œÃ©Ââ€¢Ã£ÂÂ£Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”
- Ã¦Â¬Â Ã£Ââ€˜Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã©Â â€¦Ã§â€ºÂ®
- Ã¤Â¸ÂÃ¨Â¦ÂÃ£ÂÂªÃ¤Â½â„¢Ã¥Ë†â€ Ã£ÂÂªÃ©Â â€¦Ã§â€ºÂ®
- Ã§Â²â€™Ã¥ÂºÂ¦Ã£ÂÂ®Ã¨ÂªÂ¤Ã£â€šÅ 
- Ã¨ÂªÂ¤Ã¨Â§Â£Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã¨Â¦ÂÃ¤Â»Â¶
