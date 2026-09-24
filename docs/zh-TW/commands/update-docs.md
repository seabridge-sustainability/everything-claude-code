# Ã¦â€ºÂ´Ã¦â€“Â°Ã¦â€“â€¡Ã¤Â»Â¶

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


Ã¥Â¾Å¾Ã¥â€“Â®Ã¤Â¸â‚¬Ã§Å“Å¸Ã§â€ºÂ¸Ã¤Â¾â€ Ã¦ÂºÂÃ¥ÂÅ’Ã¦Â­Â¥Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡

1. Ã¨Â®â‚¬Ã¥Ââ€“ package.json scripts Ã¥Ââ‚¬Ã¦Â®Âµ
   - Ã§â€Â¢Ã§â€Å¸ scripts Ã¥ÂÆ’Ã¨â‚¬Æ’Ã¨Â¡Â¨
   - Ã¥Å’â€¦Ã¥ÂÂ«Ã¨Â¨Â»Ã¨Â§Â£Ã¤Â¸Â­Ã§Å¡â€žÃ¦ÂÂÃ¨Â¿Â°

2. Ã¨Â®â‚¬Ã¥Ââ€“ .env.example
   - Ã¦â€œÂ·Ã¥Ââ€“Ã¦â€°â‚¬Ã¦Å“â€°Ã§â€™Â°Ã¥Â¢Æ’Ã¨Â®Å Ã¦â€¢Â¸
   - Ã¨Â¨ËœÃ©Å’â€žÃ§â€Â¨Ã©â‚¬â€Ã¥â€™Å’Ã¦Â Â¼Ã¥Â¼Â

3. Ã§â€Â¢Ã§â€Å¸ docs/CONTRIB.mdÃ¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡
   - Ã©â€“â€¹Ã§â„¢Â¼Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹
   - Ã¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€ž scripts
   - Ã§â€™Â°Ã¥Â¢Æ’Ã¨Â¨Â­Ã¥Â®Å¡
   - Ã¦Â¸Â¬Ã¨Â©Â¦Ã§Â¨â€¹Ã¥ÂºÂ

4. Ã§â€Â¢Ã§â€Å¸ docs/RUNBOOK.mdÃ¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡
   - Ã©Æ’Â¨Ã§Â½Â²Ã§Â¨â€¹Ã¥ÂºÂ
   - Ã§â€ºÂ£Ã¦Å½Â§Ã¥â€™Å’Ã¨Â­Â¦Ã¥Â Â±
   - Ã¥Â¸Â¸Ã¨Â¦â€¹Ã¥â€¢ÂÃ©Â¡Å’Ã¥â€™Å’Ã¤Â¿Â®Ã¥Â¾Â©
   - Ã¥â€ºÅ¾Ã¦Â»Â¾Ã§Â¨â€¹Ã¥ÂºÂ

5. Ã¨Â­ËœÃ¥Ë†Â¥Ã©ÂÅ½Ã¦â„¢â€šÃ§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡
   - Ã¦â€°Â¾Ã¥â€¡Âº 90 Ã¥Â¤Â©Ã¤Â»Â¥Ã¤Â¸Å Ã¦Å“ÂªÃ¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶
   - Ã¥Ë†â€”Ã¥â€¡ÂºÃ¤Â¾â€ºÃ¦â€°â€¹Ã¥â€¹â€¢Ã¥Â¯Â©Ã¦Å¸Â¥

6. Ã©Â¡Â¯Ã§Â¤ÂºÃ¥Â·Â®Ã§â€¢Â°Ã¦â€˜ËœÃ¨Â¦Â

Ã¥â€“Â®Ã¤Â¸â‚¬Ã§Å“Å¸Ã§â€ºÂ¸Ã¤Â¾â€ Ã¦ÂºÂÃ¯Â¼Å¡package.json Ã¥â€™Å’ .env.example
