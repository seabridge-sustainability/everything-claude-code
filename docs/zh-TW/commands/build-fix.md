# Ã¥Â»ÂºÃ§Â½Â®Ã¨Ë†â€¡Ã¤Â¿Â®Ã¥Â¾Â©

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


Ã¥Â¢Å¾Ã©â€¡ÂÃ¤Â¿Â®Ã¥Â¾Â© TypeScript Ã¥â€™Å’Ã¥Â»ÂºÃ§Â½Â®Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡

1. Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â»ÂºÃ§Â½Â®Ã¯Â¼Å¡npm run build Ã¦Ë†â€“ pnpm build

2. Ã¨Â§Â£Ã¦Å¾ÂÃ©Å’Â¯Ã¨ÂªÂ¤Ã¨Â¼Â¸Ã¥â€¡ÂºÃ¯Â¼Å¡
   - Ã¤Â¾ÂÃ¦Âªâ€Ã¦Â¡Ë†Ã¥Ë†â€ Ã§Âµâ€ž
   - Ã¤Â¾ÂÃ¥Å¡Â´Ã©â€¡ÂÃ¦â‚¬Â§Ã¦Å½â€™Ã¥ÂºÂ

3. Ã¥Â°ÂÃ¦Â¯ÂÃ¥â‚¬â€¹Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡
   - Ã©Â¡Â¯Ã§Â¤ÂºÃ©Å’Â¯Ã¨ÂªÂ¤Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¯Â¼Ë†Ã¥â€°ÂÃ¥Â¾Å’ 5 Ã¨Â¡Å’Ã¯Â¼â€°
   - Ã¨Â§Â£Ã©â€¡â€¹Ã¥â€¢ÂÃ©Â¡Å’
   - Ã¦ÂÂÃ¥â€¡ÂºÃ¤Â¿Â®Ã¥Â¾Â©Ã¦â€“Â¹Ã¦Â¡Ë†
   - Ã¥Â¥â€”Ã§â€Â¨Ã¤Â¿Â®Ã¥Â¾Â©
   - Ã©â€¡ÂÃ¦â€“Â°Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â»ÂºÃ§Â½Â®
   - Ã©Â©â€”Ã¨Â­â€°Ã©Å’Â¯Ã¨ÂªÂ¤Ã¥Â·Â²Ã¨Â§Â£Ã¦Â±Âº

4. Ã¥ÂÅ“Ã¦Â­Â¢Ã¦Â¢ÂÃ¤Â»Â¶Ã¯Â¼Å¡
   - Ã¤Â¿Â®Ã¥Â¾Â©Ã¥Â¼â€¢Ã¥â€¦Â¥Ã¦â€“Â°Ã©Å’Â¯Ã¨ÂªÂ¤
   - 3 Ã¦Â¬Â¡Ã¥Ëœâ€”Ã¨Â©Â¦Ã¥Â¾Å’Ã¥ÂÅ’Ã¦Â¨Â£Ã©Å’Â¯Ã¨ÂªÂ¤Ã¤Â»ÂÃ¥Â­ËœÃ¥Å“Â¨
   - Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¨Â¦ÂÃ¦Â±â€šÃ¦Å¡Â«Ã¥ÂÅ“

5. Ã©Â¡Â¯Ã§Â¤ÂºÃ¦â€˜ËœÃ¨Â¦ÂÃ¯Â¼Å¡
   - Ã¥Â·Â²Ã¤Â¿Â®Ã¥Â¾Â©Ã§Å¡â€žÃ©Å’Â¯Ã¨ÂªÂ¤
   - Ã¥â€°Â©Ã©Â¤ËœÃ§Å¡â€žÃ©Å’Â¯Ã¨ÂªÂ¤
   - Ã¦â€“Â°Ã¥Â¼â€¢Ã¥â€¦Â¥Ã§Å¡â€žÃ©Å’Â¯Ã¨ÂªÂ¤

Ã§â€šÂºÃ¤Âºâ€ Ã¥Â®â€°Ã¥â€¦Â¨Ã¯Â¼Å’Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¾Â©Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Â
