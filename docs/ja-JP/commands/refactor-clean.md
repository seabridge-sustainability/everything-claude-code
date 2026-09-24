# Refactor Clean

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


Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Â¤Å“Ã¨Â¨Â¼Ã£ÂÂ§Ã£Æ’â€¡Ã£Æ’Æ’Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂ«Ã§â€°Â¹Ã¥Â®Å¡Ã£Ââ€”Ã£ÂÂ¦Ã¥â€°Å Ã©â„¢Â¤Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:

1. Ã£Æ’â€¡Ã£Æ’Æ’Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥Ë†â€ Ã¦Å¾ÂÃ£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’:
   - knip: Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã£ÂÂ®Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£ÂÂ¨Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã¦Â¤Å“Ã¥â€¡Âº
   - depcheck: Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã£ÂÂ®Ã¤Â¾ÂÃ¥Â­ËœÃ©â€“Â¢Ã¤Â¿â€šÃ£â€šâ€™Ã¦Â¤Å“Ã¥â€¡Âº
   - ts-prune: Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã£ÂÂ®TypeScriptÃ£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã¦Â¤Å“Ã¥â€¡Âº

2. .reports/dead-code-analysis.mdÃ£ÂÂ«Ã¥Å’â€¦Ã¦â€¹Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â

3. Ã§â„¢ÂºÃ¨Â¦â€¹Ã£â€šâ€™Ã©â€¡ÂÃ¨Â¦ÂÃ¥ÂºÂ¦Ã¥Ë†Â¥Ã£ÂÂ«Ã¥Ë†â€ Ã©Â¡Å¾:
   - SAFE: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â‚¬ÂÃ¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã£ÂÂ®Ã£Æ’Â¦Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£
   - CAUTION: APIÃ£Æ’Â«Ã£Æ’Â¼Ã£Æ’Ë†Ã£â‚¬ÂÃ£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’Ë†
   - DANGER: Ã¨Â¨Â­Ã¥Â®Å¡Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â‚¬ÂÃ£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†

4. Ã¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂªÃ¥â€°Å Ã©â„¢Â¤Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã¦ÂÂÃ¦Â¡Ë†

5. Ã¥Ââ€žÃ¥â€°Å Ã©â„¢Â¤Ã£ÂÂ®Ã¥â€°ÂÃ£ÂÂ«:
   - Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¹Ã£â€šÂ¤Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
   - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã¥ÂË†Ã¦Â Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
   - Ã¥Â¤â€°Ã¦â€ºÂ´Ã£â€šâ€™Ã©ÂÂ©Ã§â€Â¨
   - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥â€ ÂÃ¥Â®Å¸Ã¨Â¡Å’
   - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ€”Ã£ÂÅ¸Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯

6. Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£â€šÂ¢Ã£â€šÂ¤Ã£Æ’â€ Ã£Æ’Â Ã£ÂÂ®Ã£â€šÂµÃ£Æ’Å¾Ã£Æ’ÂªÃ£Æ’Â¼Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº

Ã£ÂÂ¾Ã£ÂÅ¡Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€ºÃ£ÂÅ¡Ã£ÂÂ«Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤Ã£Ââ€”Ã£ÂÂªÃ£Ââ€žÃ£ÂÂ§Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž!
