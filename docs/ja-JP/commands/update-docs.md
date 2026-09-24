# Update Documentation

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


Ã¤Â¿Â¡Ã©Â Â¼Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã¦Æ’â€¦Ã¥Â Â±Ã¦ÂºÂÃ£Ââ€¹Ã£â€šâ€°Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¥ÂÅ’Ã¦Å“Å¸:

1. package.jsonÃ£ÂÂ®scriptsÃ£â€šÂ»Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¥Ââ€“Ã£â€šâ€¹
   - Ã£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†Ã¥Ââ€šÃ§â€¦Â§Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â
   - Ã£â€šÂ³Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£Ââ€¹Ã£â€šâ€°Ã£ÂÂ®Ã¨ÂªÂ¬Ã¦ËœÅ½Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£â€šâ€¹

2. .env.exampleÃ£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¥Ââ€“Ã£â€šâ€¹
   - Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°Ã£â€šâ€™Ã¦Å Â½Ã¥â€¡Âº
   - Ã§â€ºÂ®Ã§Å¡â€žÃ£ÂÂ¨Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€“â€¡Ã¦â€ºÂ¸Ã¥Å’â€“

3. docs/CONTRIB.mdÃ£â€šâ€™Ã§â€Å¸Ã¦Ë†Â:
   - Ã©â€“â€¹Ã§â„¢ÂºÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
   - Ã¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†
   - Ã§â€™Â°Ã¥Â¢Æ’Ã£â€šÂ»Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”
   - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦â€°â€¹Ã©Â â€ 

4. docs/RUNBOOK.mdÃ£â€šâ€™Ã§â€Å¸Ã¦Ë†Â:
   - Ã£Æ’â€¡Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¤Ã¦â€°â€¹Ã©Â â€ 
   - Ã§â€ºÂ£Ã¨Â¦â€“Ã£ÂÂ¨Ã£â€šÂ¢Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’Ë†
   - Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Å¡â€žÃ£ÂÂªÃ¥â€¢ÂÃ©Â¡Å’Ã£ÂÂ¨Ã¤Â¿Â®Ã¦Â­Â£
   - Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã¦â€°â€¹Ã©Â â€ 

5. Ã¥ÂÂ¤Ã£Ââ€žÃ£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã§â€°Â¹Ã¥Â®Å¡:
   - 90Ã¦â€”Â¥Ã¤Â»Â¥Ã¤Â¸Å Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂªÃ£Ââ€žÃ£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¦Â¤Å“Ã¥â€¡Âº
   - Ã¦â€°â€¹Ã¥â€¹â€¢Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã§â€Â¨Ã£ÂÂ«Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¥Å’â€“

6. Ã¥Â·Â®Ã¥Ë†â€ Ã£â€šÂµÃ£Æ’Å¾Ã£Æ’ÂªÃ£Æ’Â¼Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº

Ã¤Â¿Â¡Ã©Â Â¼Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã¥â€Â¯Ã¤Â¸â‚¬Ã£ÂÂ®Ã¦Æ’â€¦Ã¥Â Â±Ã¦ÂºÂ: package.jsonÃ£ÂÂ¨.env.example
