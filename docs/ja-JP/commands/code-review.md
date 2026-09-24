# Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼

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


Ã¦Å“ÂªÃ£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£ÂÂ®Ã¥Â¤â€°Ã¦â€ºÂ´Ã£â€šâ€™Ã¥Å’â€¦Ã¦â€¹Â¬Ã§Å¡â€žÃ£ÂÂ«Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£ÂÂ¨Ã¥â€œÂÃ¨Â³ÂªÃ£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã¯Â¼Å¡

1. Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã¥Ââ€“Ã¥Â¾â€”Ã¯Â¼Å¡`git diff --name-only HEAD`

2. Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã¥Ââ€žÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ«Ã£ÂÂ¤Ã£Ââ€žÃ£ÂÂ¦Ã£â‚¬ÂÃ£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã¯Â¼Å¡

**Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Ë†Ã©â€¡ÂÃ¥Â¤Â§Ã¯Â¼â€°Ã¯Â¼Å¡**

* Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã¨ÂªÂÃ¨Â¨Â¼Ã¦Æ’â€¦Ã¥Â Â±Ã£â‚¬ÂAPI Ã£â€šÂ­Ã£Æ’Â¼Ã£â‚¬ÂÃ£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³
* SQL Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¨â€žâ€ Ã¥Â¼Â±Ã¦â‚¬Â§
* XSS Ã¨â€žâ€ Ã¥Â¼Â±Ã¦â‚¬Â§
* Ã¥â€¦Â¥Ã¥Å â€ºÃ¦Â¤Å“Ã¨Â¨Â¼Ã£ÂÂ®Ã¤Â¸ÂÃ¨Â¶Â³
* Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂªÃ¤Â¾ÂÃ¥Â­ËœÃ©â€“Â¢Ã¤Â¿â€š
* Ã£Æ’â€˜Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â©Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂµÃ£Æ’Â«Ã£Æ’ÂªÃ£â€šÂ¹Ã£â€šÂ¯

**Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥â€œÂÃ¨Â³ÂªÃ¯Â¼Ë†Ã©Â«ËœÃ¯Â¼â€°Ã¯Â¼Å¡**

* Ã©â€“Â¢Ã¦â€¢Â°Ã£ÂÂ®Ã©â€¢Â·Ã£Ââ€¢Ã£ÂÅ’ 50 Ã¨Â¡Å’Ã¤Â»Â¥Ã¤Â¸Å 
* Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ®Ã©â€¢Â·Ã£Ââ€¢Ã£ÂÅ’ 800 Ã¨Â¡Å’Ã¤Â»Â¥Ã¤Â¸Å 
* Ã£Æ’ÂÃ£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¦Â·Â±Ã£Ââ€¢Ã£ÂÅ’ 4 Ã¥Â±Â¤Ã¤Â»Â¥Ã¤Â¸Å 
* Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£ÂÂ®Ã¤Â¸ÂÃ¨Â¶Â³
* `console.log` Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’Ë†Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†
* `TODO`/`FIXME` Ã£â€šÂ³Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†
* Ã¥â€¦Â¬Ã©â€“â€¹ API Ã£ÂÂ« JSDoc Ã£ÂÅ’Ã£ÂÂªÃ£Ââ€ž

**Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã¯Â¼Ë†Ã¤Â¸Â­Ã¯Â¼â€°Ã¯Â¼Å¡**

* Ã¥ÂÂ¯Ã¥Â¤â€°Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã¯Â¼Ë†Ã£â€šÂ¤Ã£Æ’Å¸Ã£Æ’Â¥Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â€“Ã£Æ’Â«Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂÃ¯Â¼â€°
* Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°/Ã£â€šÂ³Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã¥â€ â€¦Ã£ÂÂ®Ã§ÂµÂµÃ¦â€“â€¡Ã¥Â­â€”Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢
* Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¤Â¸ÂÃ¨Â¶Â³
* Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ»Ã£â€šÂ·Ã£Æ’â€œÃ£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Ë†a11yÃ¯Â¼â€°

3. Ã¤Â»Â¥Ã¤Â¸â€¹Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šâ‚¬Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†ÂÃ¯Â¼Å¡
   * Ã©â€¡ÂÃ¥Â¤Â§Ã¥ÂºÂ¦Ã¯Â¼Å¡Ã©â€¡ÂÃ¥Â¤Â§Ã£â‚¬ÂÃ©Â«ËœÃ£â‚¬ÂÃ¤Â¸Â­Ã£â‚¬ÂÃ¤Â½Å½
   * Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¤Â½ÂÃ§Â½Â®Ã£ÂÂ¨Ã¨Â¡Å’Ã§â€¢ÂªÃ¥ÂÂ·
   * Ã¥â€¢ÂÃ©Â¡Å’Ã£ÂÂ®Ã¨ÂªÂ¬Ã¦ËœÅ½
   * Ã¦Å½Â¨Ã¥Â¥Â¨Ã£Ââ€¢Ã£â€šÅ’Ã£â€šâ€¹Ã¤Â¿Â®Ã¦Â­Â£Ã¦â€“Â¹Ã¦Â³â€¢

4. Ã©â€¡ÂÃ¥Â¤Â§Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã©Â«ËœÃ¥â€žÂªÃ¥â€¦Ë†Ã¥ÂºÂ¦Ã£ÂÂ®Ã¥â€¢ÂÃ©Â¡Å’Ã£ÂÅ’Ã¨Â¦â€¹Ã£ÂÂ¤Ã£Ââ€¹Ã£ÂÂ£Ã£ÂÅ¸Ã¥Â Â´Ã¥ÂË†Ã£â‚¬ÂÃ£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’â€“Ã£Æ’Â­Ã£Æ’Æ’Ã£â€šÂ¯

Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¨â€žâ€ Ã¥Â¼Â±Ã¦â‚¬Â§Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šâ‚¬Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ¯Ã§ÂµÂ¶Ã¥Â¯Â¾Ã£ÂÂ«Ã¨Â¨Â±Ã¥ÂÂ¯Ã£Ââ€”Ã£ÂÂªÃ£Ââ€žÃ£Ââ€œÃ£ÂÂ¨Ã¯Â¼Â
