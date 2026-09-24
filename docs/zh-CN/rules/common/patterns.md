# Ã¥Â¸Â¸Ã¨Â§ÂÃ¦Â¨Â¡Ã¥Â¼Â

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


## Ã©ÂªÂ¨Ã¦Å¾Â¶Ã©Â¡Â¹Ã§â€ºÂ®

Ã¥Â½â€œÃ¥Â®Å¾Ã§Å½Â°Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¦â€”Â¶Ã¯Â¼Å¡

1. Ã¦ÂÅ“Ã§Â´Â¢Ã§Â»ÂÃ¨Â¿â€¡Ã¥Â®Å¾Ã¦Ë†ËœÃ¦Â£â‚¬Ã©ÂªÅ’Ã§Å¡â€žÃ©ÂªÂ¨Ã¦Å¾Â¶Ã©Â¡Â¹Ã§â€ºÂ®
2. Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¹Â¶Ã¨Â¡Å’Ã¤Â»Â£Ã§Ââ€ Ã¨Â¯â€žÃ¤Â¼Â°Ã©â‚¬â€°Ã©Â¡Â¹Ã¯Â¼Å¡
   * Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¨Â¯â€žÃ¤Â¼Â°
   * Ã¥ÂÂ¯Ã¦â€°Â©Ã¥Â±â€¢Ã¦â‚¬Â§Ã¥Ë†â€ Ã¦Å¾Â
   * Ã§â€ºÂ¸Ã¥â€¦Â³Ã¦â‚¬Â§Ã¨Â¯â€žÃ¥Ë†â€ 
   * Ã¥Â®Å¾Ã¦â€“Â½Ã¨Â§â€žÃ¥Ë†â€™
3. Ã¥â€¦â€¹Ã©Å¡â€ Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Å’Â¹Ã©â€¦ÂÃ¤Â½Å“Ã¤Â¸ÂºÃ¥Å¸ÂºÃ§Â¡â‚¬
4. Ã¥Å“Â¨Ã¥Â·Â²Ã©ÂªÅ’Ã¨Â¯ÂÃ§Å¡â€žÃ§Â»â€œÃ¦Å¾â€žÃ¥â€ â€¦Ã¨Â¿Â­Ã¤Â»Â£

## Ã¨Â®Â¾Ã¨Â®Â¡Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¤Â»â€œÃ¥Âºâ€œÃ¦Â¨Â¡Ã¥Â¼Â

Ã¥Â°â€ Ã¦â€¢Â°Ã¦ÂÂ®Ã¨Â®Â¿Ã©â€”Â®Ã¥Â°ÂÃ¨Â£â€¦Ã¥Å“Â¨Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€žÃ¦Å½Â¥Ã¥ÂÂ£Ã¤Â¹â€¹Ã¥ÂÅ½Ã¯Â¼Å¡

* Ã¥Â®Å¡Ã¤Â¹â€°Ã¦Â â€¡Ã¥â€¡â€ Ã¦â€œÂÃ¤Â½Å“Ã¯Â¼Å¡findAll, findById, create, update, delete
* Ã¥â€¦Â·Ã¤Â½â€œÃ¥Â®Å¾Ã§Å½Â°Ã¥Â¤â€žÃ§Ââ€ Ã¥Â­ËœÃ¥â€šÂ¨Ã§Â»â€ Ã¨Å â€šÃ¯Â¼Ë†Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ£â‚¬ÂAPIÃ£â‚¬ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã§Â­â€°Ã¯Â¼â€°
* Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¤Â¾ÂÃ¨Âµâ€“Ã¤ÂºÅ½Ã¦Å Â½Ã¨Â±Â¡Ã¦Å½Â¥Ã¥ÂÂ£Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â­ËœÃ¥â€šÂ¨Ã¦Å“ÂºÃ¥Ë†Â¶
* Ã¤Â¾Â¿Ã¤ÂºÅ½Ã¨Â½Â»Ã¦ÂÂ¾Ã¥Ë†â€¡Ã¦ÂÂ¢Ã¦â€¢Â°Ã¦ÂÂ®Ã¦ÂºÂÃ¯Â¼Å’Ã¥Â¹Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¥Â¯Â¹Ã¨Â±Â¡Ã§Â®â‚¬Ã¥Å’â€“Ã¦Âµâ€¹Ã¨Â¯â€¢

### API Ã¥â€œÂÃ¥Âºâ€Ã¦Â Â¼Ã¥Â¼Â

Ã¥Â¯Â¹Ã¦â€°â‚¬Ã¦Å“â€° API Ã¥â€œÂÃ¥Âºâ€Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€žÃ¤Â¿Â¡Ã¥Â°ÂÃ¦Â Â¼Ã¥Â¼ÂÃ¯Â¼Å¡

* Ã¥Å’â€¦Ã¥ÂÂ«Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Ë†ÂÃ¥Å Å¸/Ã§Å Â¶Ã¦â‚¬ÂÃ¦Å’â€¡Ã§Â¤ÂºÃ¥â„¢Â¨
* Ã¥Å’â€¦Ã¥ÂÂ«Ã¦â€¢Â°Ã¦ÂÂ®Ã¨Â½Â½Ã¨ÂÂ·Ã¯Â¼Ë†Ã¥â€¡ÂºÃ©â€â„¢Ã¦â€”Â¶Ã¥ÂÂ¯Ã¤Â¸ÂºÃ§Â©ÂºÃ¯Â¼â€°
* Ã¥Å’â€¦Ã¥ÂÂ«Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ©â€â„¢Ã¨Â¯Â¯Ã¦Â¶Ë†Ã¦ÂÂ¯Ã¥Â­â€”Ã¦Â®ÂµÃ¯Â¼Ë†Ã¦Ë†ÂÃ¥Å Å¸Ã¦â€”Â¶Ã¥ÂÂ¯Ã¤Â¸ÂºÃ§Â©ÂºÃ¯Â¼â€°
* Ã¤Â¸ÂºÃ¥Ë†â€ Ã©Â¡ÂµÃ¥â€œÂÃ¥Âºâ€Ã¥Å’â€¦Ã¥ÂÂ«Ã¥â€¦Æ’Ã¦â€¢Â°Ã¦ÂÂ®Ã¯Â¼Ë†Ã¦â‚¬Â»Ã¦â€¢Â°Ã£â‚¬ÂÃ©Â¡ÂµÃ§Â ÂÃ£â‚¬ÂÃ©â„¢ÂÃ¥Ë†Â¶Ã¯Â¼â€°
