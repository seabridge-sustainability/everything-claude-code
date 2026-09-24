# Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¯Â©Ã¦Å¸Â¥

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


Ã¥Â°ÂÃ¦Å“ÂªÃ¦ÂÂÃ¤ÂºÂ¤Ã¨Â®Å Ã¦â€ºÂ´Ã©â‚¬Â²Ã¨Â¡Å’Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€™Å’Ã¥â€œÂÃ¨Â³ÂªÃ¥Â¯Â©Ã¦Å¸Â¥Ã¯Â¼Å¡

1. Ã¥Ââ€“Ã¥Â¾â€”Ã¨Â®Å Ã¦â€ºÂ´Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å¡git diff --name-only HEAD

2. Ã¥Â°ÂÃ¦Â¯ÂÃ¥â‚¬â€¹Ã¨Â®Å Ã¦â€ºÂ´Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å’Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¯Â¼Å¡

**Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Ë†Ã©â€”Å“Ã©ÂÂµÃ¯Â¼â€°Ã¯Â¼Å¡**
- Ã¥Â¯Â«Ã¦Â­Â»Ã§Å¡â€žÃ¦â€ â€˜Ã¨Â­â€°Ã£â‚¬ÂAPI Ã©â€¡â€˜Ã©â€˜Â°Ã£â‚¬ÂToken
- SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã¥Â¼Â±Ã©Â»Å¾
- XSS Ã¥Â¼Â±Ã©Â»Å¾
- Ã§Â¼ÂºÃ¥Â°â€˜Ã¨Â¼Â¸Ã¥â€¦Â¥Ã©Â©â€”Ã¨Â­â€°
- Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ§â€ºÂ¸Ã¤Â¾ÂÃ¦â‚¬Â§
- Ã¨Â·Â¯Ã¥Â¾â€˜Ã©ÂÂÃ¦Â­Â·Ã©Â¢Â¨Ã©Å¡Âª

**Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥â€œÂÃ¨Â³ÂªÃ¯Â¼Ë†Ã©Â«ËœÃ¯Â¼â€°Ã¯Â¼Å¡**
- Ã¥â€¡Â½Ã¥Â¼Â > 50 Ã¨Â¡Å’
- Ã¦Âªâ€Ã¦Â¡Ë† > 800 Ã¨Â¡Å’
- Ã¥Â·Â¢Ã§â€¹â‚¬Ã¦Â·Â±Ã¥ÂºÂ¦ > 4 Ã¥Â±Â¤
- Ã§Â¼ÂºÃ¥Â°â€˜Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ 
- console.log Ã©â„¢Â³Ã¨Â¿Â°Ã¥Â¼Â
- TODO/FIXME Ã¨Â¨Â»Ã¨Â§Â£
- Ã¥â€¦Â¬Ã©â€“â€¹ API Ã§Â¼ÂºÃ¥Â°â€˜ JSDoc

**Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢Ã¯Â¼Ë†Ã¤Â¸Â­Ã¯Â¼â€°Ã¯Â¼Å¡**
- Ã¨Â®Å Ã§â€¢Â°Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Ë†Ã¦â€¡â€°Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¨Â®Å Ã¯Â¼â€°
- Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼/Ã¨Â¨Â»Ã¨Â§Â£Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Æ’â€¦Ã§Â¬Â¦Ã¨â„¢Å¸
- Ã¦â€“Â°Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã§Â¼ÂºÃ¥Â°â€˜Ã¦Â¸Â¬Ã¨Â©Â¦
- Ã§â€žÂ¡Ã©Å¡Å“Ã§Â¤â„¢Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Ë†a11yÃ¯Â¼â€°

3. Ã§â€Â¢Ã§â€Å¸Ã¥Â Â±Ã¥â€˜Å Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡
   - Ã¥Å¡Â´Ã©â€¡ÂÃ¦â‚¬Â§Ã¯Â¼Å¡Ã©â€”Å“Ã©ÂÂµÃ£â‚¬ÂÃ©Â«ËœÃ£â‚¬ÂÃ¤Â¸Â­Ã£â‚¬ÂÃ¤Â½Å½
   - Ã¦Âªâ€Ã¦Â¡Ë†Ã¤Â½ÂÃ§Â½Â®Ã¥â€™Å’Ã¨Â¡Å’Ã¨â„¢Å¸
   - Ã¥â€¢ÂÃ©Â¡Å’Ã¦ÂÂÃ¨Â¿Â°
   - Ã¥Â»ÂºÃ¨Â­Â°Ã¤Â¿Â®Ã¥Â¾Â©

4. Ã¥Â¦â€šÃ¦Å¾Å“Ã§â„¢Â¼Ã§ÂÂ¾Ã©â€”Å“Ã©ÂÂµÃ¦Ë†â€“Ã©Â«ËœÃ¥â€žÂªÃ¥â€¦Ë†Ã¥â€¢ÂÃ©Â¡Å’Ã¥â€°â€¡Ã©ËœÂ»Ã¦â€œâ€¹Ã¦ÂÂÃ¤ÂºÂ¤

Ã§Âµâ€¢Ã¤Â¸ÂÃ¦â€°Â¹Ã¥â€¡â€ Ã¦Å“â€°Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Â¼Â±Ã©Â»Å¾Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¯Â¼Â
