# Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥

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


Ã¥Â¯Â¹Ã¦Å“ÂªÃ¦ÂÂÃ¤ÂºÂ¤Ã§Å¡â€žÃ¦â€ºÂ´Ã¦â€Â¹Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€™Å’Ã¨Â´Â¨Ã©â€¡ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼Å¡

1. Ã¨Å½Â·Ã¥Ââ€“Ã¦â€ºÂ´Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡`git diff --name-only HEAD`

2. Ã¥Â¯Â¹Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦â€ºÂ´Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å’Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Å¡

**Ã¥Â®â€°Ã¥â€¦Â¨Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†Ã¤Â¸Â¥Ã©â€¡ÂÃ¯Â¼â€°Ã¯Â¼Å¡**

* Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ§Å¡â€žÃ¥â€¡Â­Ã¦ÂÂ®Ã£â‚¬ÂAPI Ã¥Â¯â€ Ã©â€™Â¥Ã£â‚¬ÂÃ¤Â»Â¤Ã§â€°Å’
* SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã¦Â¼ÂÃ¦Â´Å¾
* XSS Ã¦Â¼ÂÃ¦Â´Å¾
* Ã§Â¼ÂºÃ¥Â°â€˜Ã¨Â¾â€œÃ¥â€¦Â¥Ã©ÂªÅ’Ã¨Â¯Â
* Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹
* Ã¨Â·Â¯Ã¥Â¾â€žÃ©ÂÂÃ¥Å½â€ Ã©Â£Å½Ã©â„¢Â©

**Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡ÂÃ¯Â¼Ë†Ã©Â«ËœÃ¯Â¼â€°Ã¯Â¼Å¡**

* Ã¥â€¡Â½Ã¦â€¢Â°Ã©â€¢Â¿Ã¥ÂºÂ¦Ã¨Â¶â€¦Ã¨Â¿â€¡ 50 Ã¨Â¡Å’
* Ã¦â€“â€¡Ã¤Â»Â¶Ã©â€¢Â¿Ã¥ÂºÂ¦Ã¨Â¶â€¦Ã¨Â¿â€¡ 800 Ã¨Â¡Å’
* Ã¥ÂµÅ’Ã¥Â¥â€”Ã¦Â·Â±Ã¥ÂºÂ¦Ã¨Â¶â€¦Ã¨Â¿â€¡ 4 Ã¥Â±â€š
* Ã§Â¼ÂºÃ¥Â°â€˜Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 
* `console.log` Ã¨Â¯Â­Ã¥ÂÂ¥
* `TODO`/`FIXME` Ã¦Â³Â¨Ã©â€¡Å 
* Ã¥â€¦Â¬Ã¥â€¦Â± API Ã§Â¼ÂºÃ¥Â°â€˜ JSDoc

**Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·ÂµÃ¯Â¼Ë†Ã¤Â¸Â­Ã¯Â¼â€°Ã¯Â¼Å¡**

* Ã¥ÂÂ¯Ã¥ÂËœÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Ë†Ã¥Âºâ€Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼â€°
* Ã¤Â»Â£Ã§Â Â/Ã¦Â³Â¨Ã©â€¡Å Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Æ’â€¦Ã§Â¬Â¦Ã¥ÂÂ·
* Ã¦â€“Â°Ã¤Â»Â£Ã§Â ÂÃ§Â¼ÂºÃ¥Â°â€˜Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã¦â€”Â Ã©Å¡Å“Ã§Â¢ÂÃ¦â‚¬Â§Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†a11yÃ¯Â¼â€°

3. Ã§â€Å¸Ã¦Ë†ÂÃ¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡
   * Ã¤Â¸Â¥Ã©â€¡ÂÃ¦â‚¬Â§Ã¯Â¼Å¡Ã¤Â¸Â¥Ã©â€¡ÂÃ£â‚¬ÂÃ©Â«ËœÃ£â‚¬ÂÃ¤Â¸Â­Ã£â‚¬ÂÃ¤Â½Å½
   * Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â½ÂÃ§Â½Â®Ã¥â€™Å’Ã¨Â¡Å’Ã¥ÂÂ·
   * Ã©â€”Â®Ã©Â¢ËœÃ¦ÂÂÃ¨Â¿Â°
   * Ã¥Â»ÂºÃ¨Â®Â®Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¤ÂÃ¦â€“Â¹Ã¦Â³â€¢

4. Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Ââ€˜Ã§Å½Â°Ã¤Â¸Â¥Ã©â€¡ÂÃ¦Ë†â€“Ã©Â«ËœÃ¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¥Ë†â„¢Ã©ËœÂ»Ã¦Â­Â¢Ã¦ÂÂÃ¤ÂºÂ¤

Ã§Â»ÂÃ¤Â¸ÂÃ¥â€¦ÂÃ¨Â®Â¸Ã¥Å’â€¦Ã¥ÂÂ«Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¼ÂÃ¦Â´Å¾Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¯Â¼Â
