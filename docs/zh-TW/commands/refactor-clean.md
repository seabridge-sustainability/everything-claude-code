# Ã©â€¡ÂÃ¦Â§â€¹Ã¦Â¸â€¦Ã§Ââ€ 

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


Ã©â‚¬ÂÃ©ÂÅ½Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Â©â€”Ã¨Â­â€°Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Å“Â°Ã¨Â­ËœÃ¥Ë†Â¥Ã¥â€™Å’Ã§Â§Â»Ã©â„¢Â¤Ã§â€žÂ¡Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¯Â¼Å¡

1. Ã¥Å¸Â·Ã¨Â¡Å’Ã§â€žÂ¡Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Ë†â€ Ã¦Å¾ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã¯Â¼Å¡
   - knipÃ¯Â¼Å¡Ã¦â€°Â¾Ã¥â€¡ÂºÃ¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã§Å¡â€ž exports Ã¥â€™Å’Ã¦Âªâ€Ã¦Â¡Ë†
   - depcheckÃ¯Â¼Å¡Ã¦â€°Â¾Ã¥â€¡ÂºÃ¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã§Å¡â€žÃ§â€ºÂ¸Ã¤Â¾ÂÃ¦â‚¬Â§
   - ts-pruneÃ¯Â¼Å¡Ã¦â€°Â¾Ã¥â€¡ÂºÃ¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã§Å¡â€ž TypeScript exports

2. Ã¥Å“Â¨ .reports/dead-code-analysis.md Ã§â€Â¢Ã§â€Å¸Ã¥Â®Å’Ã¦â€¢Â´Ã¥Â Â±Ã¥â€˜Å 

3. Ã¤Â¾ÂÃ¥Å¡Â´Ã©â€¡ÂÃ¦â‚¬Â§Ã¥Ë†â€ Ã©Â¡Å¾Ã§â„¢Â¼Ã§ÂÂ¾Ã¯Â¼Å¡
   - Ã¥Â®â€°Ã¥â€¦Â¨Ã¯Â¼Å¡Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Âªâ€Ã¦Â¡Ë†Ã£â‚¬ÂÃ¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã§Å¡â€žÃ¥Â·Â¥Ã¥â€¦Â·
   - Ã¦Â³Â¨Ã¦â€žÂÃ¯Â¼Å¡API Ã¨Â·Â¯Ã§â€Â±Ã£â‚¬ÂÃ¥â€¦Æ’Ã¤Â»Â¶
   - Ã¥ÂÂ±Ã©Å¡ÂªÃ¯Â¼Å¡Ã¨Â¨Â­Ã¥Â®Å¡Ã¦Âªâ€Ã£â‚¬ÂÃ¤Â¸Â»Ã¨Â¦ÂÃ©â‚¬Â²Ã¥â€¦Â¥Ã©Â»Å¾

4. Ã¥ÂÂªÃ¦ÂÂÃ¨Â­Â°Ã¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¥Ë†ÂªÃ©â„¢Â¤

5. Ã¦Â¯ÂÃ¦Â¬Â¡Ã¥Ë†ÂªÃ©â„¢Â¤Ã¥â€°ÂÃ¯Â¼Å¡
   - Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â®Å’Ã¦â€¢Â´Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¥â€”Ã¤Â»Â¶
   - Ã©Â©â€”Ã¨Â­â€°Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½
   - Ã¥Â¥â€”Ã§â€Â¨Ã¨Â®Å Ã¦â€ºÂ´
   - Ã©â€¡ÂÃ¦â€“Â°Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦
   - Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¤Â±Ã¦â€¢â€”Ã¥â€°â€¡Ã¥â€ºÅ¾Ã¦Â»Â¾

6. Ã©Â¡Â¯Ã§Â¤ÂºÃ¥Â·Â²Ã¦Â¸â€¦Ã§Ââ€ Ã©Â â€¦Ã§â€ºÂ®Ã§Å¡â€žÃ¦â€˜ËœÃ¨Â¦Â

Ã¥Å“Â¨Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥â€°ÂÃ§Âµâ€¢Ã¤Â¸ÂÃ¥Ë†ÂªÃ©â„¢Â¤Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¯Â¼Â
