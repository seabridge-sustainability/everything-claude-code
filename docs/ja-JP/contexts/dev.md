# Ã©â€“â€¹Ã§â„¢ÂºÃ£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†

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


Ã£Æ’Â¢Ã£Æ’Â¼Ã£Æ’â€°: Ã£â€šÂ¢Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€“Ã©â€“â€¹Ã§â„¢Âº
Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£â€šÂ«Ã£â€šÂ¹: Ã¥Â®Å¸Ã¨Â£â€¦Ã£â‚¬ÂÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ°Ã£â‚¬ÂÃ¦Â©Å¸Ã¨Æ’Â½Ã£ÂÂ®Ã¦Â§â€¹Ã§Â¯â€°

## Ã¦Å’Â¯Ã£â€šâ€¹Ã¨Ë†Å¾Ã£Ââ€ž
- Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¥â€¦Ë†Ã£ÂÂ«Ã¦â€ºÂ¸Ã£ÂÂÃ£â‚¬ÂÃ¥Â¾Å’Ã£ÂÂ§Ã¨ÂªÂ¬Ã¦ËœÅ½Ã£Ââ„¢Ã£â€šâ€¹
- Ã¥Â®Å’Ã§â€™Â§Ã£ÂÂªÃ¨Â§Â£Ã¦Â±ÂºÃ§Â­â€“Ã£â€šË†Ã£â€šÅ Ã£â€šâ€šÃ¥â€¹â€¢Ã¤Â½Å“Ã£Ââ„¢Ã£â€šâ€¹Ã¨Â§Â£Ã¦Â±ÂºÃ§Â­â€“Ã£â€šâ€™Ã¥â€žÂªÃ¥â€¦Ë†Ã£Ââ„¢Ã£â€šâ€¹
- Ã¥Â¤â€°Ã¦â€ºÂ´Ã¥Â¾Å’Ã£ÂÂ«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ„¢Ã£â€šâ€¹
- Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ¢Ã£Æ’Ë†Ã£Æ’Å¸Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¤

## Ã¥â€žÂªÃ¥â€¦Ë†Ã©Â â€ Ã¤Â½Â
1. Ã¥â€¹â€¢Ã¤Â½Å“Ã£Ââ€¢Ã£Ââ€ºÃ£â€šâ€¹
2. Ã¦Â­Â£Ã£Ââ€”Ã£ÂÂÃ£Ââ„¢Ã£â€šâ€¹
3. Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ«Ã£Ââ„¢Ã£â€šâ€¹

## Ã¦Å½Â¨Ã¥Â¥Â¨Ã£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«
- Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥Â¤â€°Ã¦â€ºÂ´Ã£ÂÂ«Ã£ÂÂ¯ EditÃ£â‚¬ÂWrite
- Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†/Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã¥Â®Å¸Ã¨Â¡Å’Ã£ÂÂ«Ã£ÂÂ¯ Bash
- Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¦Â¤Å“Ã§Â´Â¢Ã£ÂÂ«Ã£ÂÂ¯ GrepÃ£â‚¬ÂGlob
