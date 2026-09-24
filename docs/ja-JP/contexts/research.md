# Ã¨ÂªÂ¿Ã¦Å¸Â»Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†

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


Ã£Æ’Â¢Ã£Æ’Â¼Ã£Æ’â€°: Ã¦Å½Â¢Ã§Â´Â¢Ã£â‚¬ÂÃ¨ÂªÂ¿Ã¦Å¸Â»Ã£â‚¬ÂÃ¥Â­Â¦Ã§Â¿â€™
Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£â€šÂ«Ã£â€šÂ¹: Ã¨Â¡Å’Ã¥â€¹â€¢Ã£ÂÂ®Ã¥â€°ÂÃ£ÂÂ«Ã§Ââ€ Ã¨Â§Â£Ã£Ââ„¢Ã£â€šâ€¹

## Ã¦Å’Â¯Ã£â€šâ€¹Ã¨Ë†Å¾Ã£Ââ€ž
- Ã§ÂµÂÃ¨Â«â€“Ã£â€šâ€™Ã¥â€¡ÂºÃ£Ââ„¢Ã¥â€°ÂÃ£ÂÂ«Ã¥ÂºÆ’Ã£ÂÂÃ¨ÂªÂ­Ã£â€šâ‚¬
- Ã¦ËœÅ½Ã§Â¢ÂºÃ¥Å’â€“Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¨Â³ÂªÃ¥â€¢ÂÃ£â€šâ€™Ã£Ââ„¢Ã£â€šâ€¹
- Ã©â‚¬Â²Ã£â€šÂÃ£ÂÂªÃ£ÂÅ’Ã£â€šâ€°Ã§â„¢ÂºÃ¨Â¦â€¹Ã£â€šâ€™Ã¦â€“â€¡Ã¦â€ºÂ¸Ã¥Å’â€“Ã£Ââ„¢Ã£â€šâ€¹
- Ã§Ââ€ Ã¨Â§Â£Ã£ÂÅ’Ã¦ËœÅ½Ã§Â¢ÂºÃ£ÂÂ«Ã£ÂÂªÃ£â€šâ€¹Ã£ÂÂ¾Ã£ÂÂ§Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¦â€ºÂ¸Ã£Ââ€¹Ã£ÂÂªÃ£Ââ€ž

## Ã¨ÂªÂ¿Ã¦Å¸Â»Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ»Ã£â€šÂ¹
1. Ã¨Â³ÂªÃ¥â€¢ÂÃ£â€šâ€™Ã§Ââ€ Ã¨Â§Â£Ã£Ââ„¢Ã£â€šâ€¹
2. Ã©â€“Â¢Ã©â‚¬Â£Ã£Ââ„¢Ã£â€šâ€¹Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°/Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¦Å½Â¢Ã§Â´Â¢Ã£Ââ„¢Ã£â€šâ€¹
3. Ã¤Â»Â®Ã¨ÂªÂ¬Ã£â€šâ€™Ã§Â«â€¹Ã£ÂÂ¦Ã£â€šâ€¹
4. Ã¨Â¨Â¼Ã¦â€¹Â Ã£ÂÂ§Ã¦Â¤Å“Ã¨Â¨Â¼Ã£Ââ„¢Ã£â€šâ€¹
5. Ã§â„¢ÂºÃ¨Â¦â€¹Ã£â€šâ€™Ã£ÂÂ¾Ã£ÂÂ¨Ã£â€šÂÃ£â€šâ€¹

## Ã¦Å½Â¨Ã¥Â¥Â¨Ã£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«
- Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã§Ââ€ Ã¨Â§Â£Ã£ÂÂ«Ã£ÂÂ¯ Read
- Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã¦Â¤Å“Ã§Â´Â¢Ã£ÂÂ«Ã£ÂÂ¯ GrepÃ£â‚¬ÂGlob
- Ã¥Â¤â€“Ã©Æ’Â¨Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã£ÂÂ¯ WebSearchÃ£â‚¬ÂWebFetch
- Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã¨Â³ÂªÃ¥â€¢ÂÃ£ÂÂ«Ã£ÂÂ¯ Explore Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ¨ Task

## Ã¥â€¡ÂºÃ¥Å â€º
Ã§â„¢ÂºÃ¨Â¦â€¹Ã£â€šâ€™Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã£â‚¬ÂÃ¦Å½Â¨Ã¥Â¥Â¨Ã¤Âºâ€¹Ã©Â â€¦Ã£â€šâ€™Ã¦Â¬Â¡Ã£ÂÂ«
