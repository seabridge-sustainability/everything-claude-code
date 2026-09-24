# Ã¦â€ºÂ´Ã¦â€“Â°Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Å“Â°Ã¥Å“â€“

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


Ã¥Ë†â€ Ã¦Å¾ÂÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥ÂºÂ«Ã§ÂµÂÃ¦Â§â€¹Ã¤Â¸Â¦Ã¦â€ºÂ´Ã¦â€“Â°Ã¦Å¾Â¶Ã¦Â§â€¹Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡

1. Ã¦Å½Æ’Ã¦ÂÂÃ¦â€°â‚¬Ã¦Å“â€°Ã¥Å½Å¸Ã¥Â§â€¹Ã¦Âªâ€Ã¦Â¡Ë†Ã§Å¡â€ž importsÃ£â‚¬Âexports Ã¥â€™Å’Ã§â€ºÂ¸Ã¤Â¾ÂÃ¦â‚¬Â§
2. Ã¤Â»Â¥Ã¤Â¸â€¹Ã¥Ë†â€”Ã¦Â Â¼Ã¥Â¼ÂÃ§â€Â¢Ã§â€Å¸Ã§Â²Â¾Ã§Â°Â¡Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Å“Â°Ã¥Å“â€“Ã¯Â¼Å¡
   - codemaps/architecture.md - Ã¦â€¢Â´Ã©Â«â€Ã¦Å¾Â¶Ã¦Â§â€¹
   - codemaps/backend.md - Ã¥Â¾Å’Ã§Â«Â¯Ã§ÂµÂÃ¦Â§â€¹
   - codemaps/frontend.md - Ã¥â€°ÂÃ§Â«Â¯Ã§ÂµÂÃ¦Â§â€¹
   - codemaps/data.md - Ã¨Â³â€¡Ã¦â€“â„¢Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥â€™Å’Ã§ÂµÂÃ¦Â§â€¹Ã¦ÂÂÃ¨Â¿Â°

3. Ã¨Â¨Ë†Ã§Â®â€”Ã¨Ë†â€¡Ã¥â€°ÂÃ¤Â¸â‚¬Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€žÃ¥Â·Â®Ã§â€¢Â°Ã§â„¢Â¾Ã¥Ë†â€ Ã¦Â¯â€
4. Ã¥Â¦â€šÃ¦Å¾Å“Ã¨Â®Å Ã¦â€ºÂ´ > 30%Ã¯Â¼Å’Ã¥Å“Â¨Ã¦â€ºÂ´Ã¦â€“Â°Ã¥â€°ÂÃ¨Â«â€¹Ã¦Â±â€šÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦â€°Â¹Ã¥â€¡â€ 
5. Ã§â€šÂºÃ¦Â¯ÂÃ¥â‚¬â€¹Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Å“Â°Ã¥Å“â€“Ã¦â€“Â°Ã¥Â¢Å¾Ã¦â€“Â°Ã©Â®Â®Ã¥ÂºÂ¦Ã¦â„¢â€šÃ©â€“â€œÃ¦Ë†Â³
6. Ã¥Â°â€¡Ã¥Â Â±Ã¥â€˜Å Ã¥â€žÂ²Ã¥Â­ËœÃ¥Ë†Â° .reports/codemap-diff.txt

Ã¤Â½Â¿Ã§â€Â¨ TypeScript/Node.js Ã©â‚¬Â²Ã¨Â¡Å’Ã¥Ë†â€ Ã¦Å¾ÂÃ£â‚¬â€šÃ¥Â°Ë†Ã¦Â³Â¨Ã¦â€“Â¼Ã©Â«ËœÃ©Å¡Å½Ã§ÂµÂÃ¦Â§â€¹Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â¯Â¦Ã¤Â½Å“Ã§Â´Â°Ã§Â¯â‚¬Ã£â‚¬â€š
