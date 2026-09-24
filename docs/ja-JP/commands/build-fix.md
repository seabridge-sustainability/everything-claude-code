# Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã¤Â¿Â®Ã¦Â­Â£

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


TypeScript Ã£ÂÅ Ã£â€šË†Ã£ÂÂ³Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¦Â®ÂµÃ©Å¡Å½Ã§Å¡â€žÃ£ÂÂ«Ã¤Â¿Â®Ã¦Â­Â£Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã¯Â¼Å¡

1. Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã¯Â¼Å¡npm run build Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯ pnpm build

2. Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã¥â€¡ÂºÃ¥Å â€ºÃ£â€šâ€™Ã¨Â§Â£Ã¦Å¾ÂÃ¯Â¼Å¡
   * Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¥Ë†Â¥Ã£ÂÂ«Ã£â€šÂ°Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’â€”Ã¥Å’â€“
   * Ã©â€¡ÂÃ¥Â¤Â§Ã¥ÂºÂ¦Ã£ÂÂ§Ã¤Â¸Â¦Ã£ÂÂ³Ã¦â€ºÂ¿Ã£ÂË†

3. Ã¥Ââ€žÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ«Ã£ÂÂ¤Ã£Ââ€žÃ£ÂÂ¦Ã¯Â¼Å¡
   * Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤ÂºÃ¯Â¼Ë†Ã¥â€°ÂÃ¥Â¾Å’ 5 Ã¨Â¡Å’Ã¯Â¼â€°
   * Ã¥â€¢ÂÃ©Â¡Å’Ã£â€šâ€™Ã¨ÂªÂ¬Ã¦ËœÅ½
   * Ã¤Â¿Â®Ã¦Â­Â£Ã¦Â¡Ë†Ã£â€šâ€™Ã¦ÂÂÃ¦Â¡Ë†
   * Ã¤Â¿Â®Ã¦Â­Â£Ã£â€šâ€™Ã©ÂÂ©Ã§â€Â¨
   * Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šâ€™Ã¥â€ ÂÃ¥ÂºÂ¦Ã¥Â®Å¸Ã¨Â¡Å’
   * Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÅ’Ã¨Â§Â£Ã¦Â±ÂºÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Ââ€¹Ã§Â¢ÂºÃ¨ÂªÂ

4. Ã¤Â»Â¥Ã¤Â¸â€¹Ã£ÂÂ®Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ«Ã¥ÂÅ“Ã¦Â­Â¢Ã¯Â¼Å¡
   * Ã¤Â¿Â®Ã¦Â­Â£Ã£ÂÂ§Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÅ’Ã§â„¢ÂºÃ§â€Å¸
   * Ã¥ÂÅ’Ã£ÂËœÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÅ’ 3 Ã¥â€ºÅ¾Ã£ÂÂ®Ã¨Â©Â¦Ã¨Â¡Å’Ã¥Â¾Å’Ã£â€šâ€šÃ§Â¶Å¡Ã£ÂÂ
   * Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÅ’Ã¤Â¸â‚¬Ã¦â„¢â€šÃ¥ÂÅ“Ã¦Â­Â¢Ã£â€šâ€™Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†

5. Ã£â€šÂµÃ£Æ’Å¾Ã£Æ’ÂªÃ£Æ’Â¼Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤ÂºÃ¯Â¼Å¡
   * Ã¤Â¿Â®Ã¦Â­Â£Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼
   * Ã¦Â®â€¹Ã£â€šÅ Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼
   * Ã¦â€“Â°Ã£ÂÅ¸Ã£ÂÂ«Ã¥Â°Å½Ã¥â€¦Â¥Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼

Ã¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£â‚¬ÂÃ¤Â¸â‚¬Ã¥ÂºÂ¦Ã£ÂÂ« 1 Ã£ÂÂ¤Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã¤Â¿Â®Ã¦Â­Â£Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ¯Â¼Â
