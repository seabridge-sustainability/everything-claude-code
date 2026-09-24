# Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å’â€¡Ã¥Ââ€”

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


## Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â‚¬Â§Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥

Ã¥Å“Â¨**Ã¤Â»Â»Ã¤Â½â€¢**Ã¦ÂÂÃ¤ÂºÂ¤Ã¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å¡

* \[ ] Ã¦Â²Â¡Ã¦Å“â€°Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ§Å¡â€žÃ¥Â¯â€ Ã©â€™Â¥Ã¯Â¼Ë†API Ã¥Â¯â€ Ã©â€™Â¥Ã£â‚¬ÂÃ¥Â¯â€ Ã§Â ÂÃ£â‚¬ÂÃ¤Â»Â¤Ã§â€°Å’Ã¯Â¼â€°
* \[ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã©Æ’Â½Ã§Â»ÂÃ¨Â¿â€¡Ã©ÂªÅ’Ã¨Â¯Â
* \[ ] Ã©ËœÂ²Ã¦Â­Â¢ SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¯Â¼â€°
* \[ ] Ã©ËœÂ²Ã¦Â­Â¢ XSSÃ¯Â¼Ë†Ã¥â€¡â‚¬Ã¥Å’â€“ HTMLÃ¯Â¼â€°
* \[ ] Ã¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨ CSRF Ã¤Â¿ÂÃ¦Å Â¤
* \[ ] Ã¥Â·Â²Ã©ÂªÅ’Ã¨Â¯ÂÃ¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯Â/Ã¦Å½Ë†Ã¦ÂÆ’
* \[ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã§Â«Â¯Ã§â€šÂ¹Ã©Æ’Â½Ã¥Â®Å¾Ã¦â€“Â½Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶
* \[ ] Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â¡Ã¦ÂÂ¯Ã¤Â¸ÂÃ¦Â³â€žÃ©Å“Â²Ã¦â€¢ÂÃ¦â€žÅ¸Ã¦â€¢Â°Ã¦ÂÂ®

## Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ 

* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Å“Â¨Ã¦ÂºÂÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ¥Â¯â€ Ã©â€™Â¥
* Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¦Ë†â€“Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨
* Ã¥Å“Â¨Ã¥ÂÂ¯Ã¥Å Â¨Ã¦â€”Â¶Ã©ÂªÅ’Ã¨Â¯ÂÃ¦â€°â‚¬Ã©Å“â‚¬Ã§Å¡â€žÃ¥Â¯â€ Ã©â€™Â¥Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¥Â­ËœÃ¥Å“Â¨
* Ã¨Â½Â®Ã¦ÂÂ¢Ã¤Â»Â»Ã¤Â½â€¢Ã¥ÂÂ¯Ã¨Æ’Â½Ã¥Â·Â²Ã¦Â³â€žÃ©Å“Â²Ã§Å¡â€žÃ¥Â¯â€ Ã©â€™Â¥

## Ã¥Â®â€°Ã¥â€¦Â¨Ã¥â€œÂÃ¥Âºâ€Ã¥ÂÂÃ¨Â®Â®

Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Ââ€˜Ã§Å½Â°Ã¥Â®â€°Ã¥â€¦Â¨Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å¡

1. Ã§Â«â€¹Ã¥ÂÂ³**Ã¥ÂÅ“Ã¦Â­Â¢**
2. Ã¤Â½Â¿Ã§â€Â¨ **security-reviewer** Ã¤Â»Â£Ã§Ââ€ 
3. Ã¥Å“Â¨Ã§Â»Â§Ã§Â»Â­Ã¤Â¹â€¹Ã¥â€°ÂÃ¤Â¿Â®Ã¥Â¤Â**Ã¥â€¦Â³Ã©â€Â®**Ã©â€”Â®Ã©Â¢Ëœ
4. Ã¨Â½Â®Ã¦ÂÂ¢Ã¤Â»Â»Ã¤Â½â€¢Ã¥Â·Â²Ã¦Å¡Â´Ã©Å“Â²Ã§Å¡â€žÃ¥Â¯â€ Ã©â€™Â¥
5. Ã¥Â®Â¡Ã¦Å¸Â¥Ã¦â€¢Â´Ã¤Â¸ÂªÃ¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ¦ËœÂ¯Ã¥ÂÂ¦Ã¥Â­ËœÃ¥Å“Â¨Ã§Â±Â»Ã¤Â¼Â¼Ã©â€”Â®Ã©Â¢Ëœ
