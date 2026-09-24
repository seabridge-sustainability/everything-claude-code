# Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¬Ã£â€šÂ¤Ã£Æ’â€°Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Â³

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


## Ã¥Â¿â€¦Ã©Â Ë†Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯

Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã¥â€°Â:
- [ ] Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£ÂÂªÃ£Ââ€”Ã¯Â¼Ë†API Ã£â€šÂ­Ã£Æ’Â¼Ã£â‚¬ÂÃ£Æ’â€˜Ã£â€šÂ¹Ã£Æ’Â¯Ã£Æ’Â¼Ã£Æ’â€°Ã£â‚¬ÂÃ£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³Ã¯Â¼â€°
- [ ] Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¥â€¦Â¥Ã¥Å â€ºÃ£ÂÅ’Ã¦Â¤Å“Ã¨Â¨Â¼Ã¦Â¸Ë†Ã£ÂÂ¿
- [ ] SQL Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã©ËœÂ²Ã¦Â­Â¢Ã¯Â¼Ë†Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥Å’â€“Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ¯Â¼â€°
- [ ] XSS Ã©ËœÂ²Ã¦Â­Â¢Ã¯Â¼Ë†Ã£â€šÂµÃ£Æ’â€¹Ã£â€šÂ¿Ã£â€šÂ¤Ã£â€šÂºÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸ HTMLÃ¯Â¼â€°
- [ ] CSRF Ã¤Â¿ÂÃ¨Â­Â·Ã£ÂÅ’Ã¦Å“â€°Ã¥Å Â¹
- [ ] Ã¨ÂªÂÃ¨Â¨Â¼/Ã¨ÂªÂÃ¥ÂÂ¯Ã£ÂÅ’Ã¦Â¤Å“Ã¨Â¨Â¼Ã¦Â¸Ë†Ã£ÂÂ¿
- [ ] Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã¥Ë†Â¶Ã©â„¢Â
- [ ] Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’Â¡Ã£Æ’Æ’Ã£â€šÂ»Ã£Æ’Â¼Ã£â€šÂ¸Ã£ÂÅ’Ã¦Â©Å¸Ã¥Â¯â€ Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™Ã¦Â¼ÂÃ£â€šâ€°Ã£Ââ€¢Ã£ÂÂªÃ£Ââ€ž

## Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã§Â®Â¡Ã§Ââ€ 

- Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ«Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- Ã¥Â¸Â¸Ã£ÂÂ«Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- Ã¨ÂµÂ·Ã¥â€¹â€¢Ã¦â„¢â€šÃ£ÂÂ«Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂªÃ£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£ÂÅ’Ã¥Â­ËœÃ¥Å“Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼
- Ã©Å“Â²Ã¥â€¡ÂºÃ£Ââ€”Ã£ÂÅ¸Ã¥ÂÂ¯Ã¨Æ’Â½Ã¦â‚¬Â§Ã£ÂÂ®Ã£Ââ€šÃ£â€šâ€¹Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

## Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¥Â¯Â¾Ã¥Â¿Å“Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’Ë†Ã£â€šÂ³Ã£Æ’Â«

Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¥â€¢ÂÃ©Â¡Å’Ã£ÂÅ’Ã¨Â¦â€¹Ã£ÂÂ¤Ã£Ââ€¹Ã£ÂÂ£Ã£ÂÅ¸Ã¥Â Â´Ã¥ÂË†:
1. Ã§â€ºÂ´Ã£ÂÂ¡Ã£ÂÂ«Ã¥ÂÅ“Ã¦Â­Â¢
2. **security-reviewer** agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
3. Ã§Â¶â„¢Ã§Â¶Å¡Ã¥â€°ÂÃ£ÂÂ« CRITICAL Ã¥â€¢ÂÃ©Â¡Å’Ã£â€šâ€™Ã¤Â¿Â®Ã¦Â­Â£
4. Ã©Å“Â²Ã¥â€¡ÂºÃ£Ââ€”Ã£ÂÅ¸Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³
5. Ã¥ÂÅ’Ã¦Â§ËœÃ£ÂÂ®Ã¥â€¢ÂÃ©Â¡Å’Ã£ÂÅ’Ã£ÂÂªÃ£Ââ€žÃ£Ââ€¹Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã¥â€¦Â¨Ã¤Â½â€œÃ£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼
