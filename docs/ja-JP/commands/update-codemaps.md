# Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’â€”Ã£ÂÂ®Ã¦â€ºÂ´Ã¦â€“Â°

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


Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã¦Â§â€¹Ã©â‚¬Â Ã£â€šâ€™Ã¥Ë†â€ Ã¦Å¾ÂÃ£Ââ€”Ã£ÂÂ¦Ã£â€šÂ¢Ã£Æ’Â¼Ã£â€šÂ­Ã£Æ’â€ Ã£â€šÂ¯Ã£Æ’ÂÃ£Æ’Â£Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ´Ã¦â€“Â°Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

1. Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ®Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â‚¬ÂÃ£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â‚¬ÂÃ¤Â¾ÂÃ¥Â­ËœÃ©â€“Â¢Ã¤Â¿â€šÃ£â€šâ€™Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³
2. Ã¤Â»Â¥Ã¤Â¸â€¹Ã£ÂÂ®Ã¥Â½Â¢Ã¥Â¼ÂÃ£ÂÂ§Ã£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³Ã¥Å Â¹Ã§Å½â€¡Ã£ÂÂ®Ã¨â€°Â¯Ã£Ââ€žÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’â€”Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â:
   - codemaps/architecture.md - Ã¥â€¦Â¨Ã¤Â½â€œÃ§Å¡â€žÃ£ÂÂªÃ£â€šÂ¢Ã£Æ’Â¼Ã£â€šÂ­Ã£Æ’â€ Ã£â€šÂ¯Ã£Æ’ÂÃ£Æ’Â£
   - codemaps/backend.md - Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã¦Â§â€¹Ã©â‚¬Â 
   - codemaps/frontend.md - Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã¦Â§â€¹Ã©â‚¬Â 
   - codemaps/data.md - Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£ÂÂ¨Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â¼Ã£Æ’Å¾

3. Ã¥â€°ÂÃ£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ¨Ã£ÂÂ®Ã¥Â·Â®Ã¥Ë†â€ Ã£Æ’â€˜Ã£Æ’Â¼Ã£â€šÂ»Ã£Æ’Â³Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šâ€™Ã¨Â¨Ë†Ã§Â®â€”
4. Ã¥Â¤â€°Ã¦â€ºÂ´Ã£ÂÅ’30%Ã£â€šâ€™Ã¨Â¶â€¦Ã£ÂË†Ã£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£â‚¬ÂÃ¦â€ºÂ´Ã¦â€“Â°Ã¥â€°ÂÃ£ÂÂ«Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÂ®Ã¦â€°Â¿Ã¨ÂªÂÃ£â€šâ€™Ã¨Â¦ÂÃ¦Â±â€š
5. Ã¥Ââ€žÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’â€”Ã£ÂÂ«Ã©Â®Â®Ã¥ÂºÂ¦Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â³Ã£Æ’â€”Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â 
6. Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™ .reports/codemap-diff.txt Ã£ÂÂ«Ã¤Â¿ÂÃ¥Â­Ëœ

TypeScript/Node.jsÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã¥Ë†â€ Ã¦Å¾ÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ¥Â®Å¸Ã¨Â£â€¦Ã£ÂÂ®Ã¨Â©Â³Ã§Â´Â°Ã£ÂÂ§Ã£ÂÂ¯Ã£ÂÂªÃ£ÂÂÃ£â‚¬ÂÃ©Â«ËœÃ£Æ’Â¬Ã£Æ’â„¢Ã£Æ’Â«Ã£ÂÂ®Ã¦Â§â€¹Ã©â‚¬Â Ã£ÂÂ«Ã§â€žÂ¦Ã§â€šÂ¹Ã£â€šâ€™Ã¥Â½â€œÃ£ÂÂ¦Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š
