# Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡

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


Ã¥Ë†â€ Ã¦Å¾ÂÃ¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¤Â¸Â¦Ã§â€Â¢Ã§â€Å¸Ã§Â¼ÂºÃ¥Â°â€˜Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Å¡

1. Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â¸Â¶Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Å¡npm test --coverage Ã¦Ë†â€“ pnpm test --coverage

2. Ã¥Ë†â€ Ã¦Å¾ÂÃ¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¥Â Â±Ã¥â€˜Å Ã¯Â¼Ë†coverage/coverage-summary.jsonÃ¯Â¼â€°

3. Ã¨Â­ËœÃ¥Ë†Â¥Ã¤Â½Å½Ã¦â€“Â¼ 80% Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã©â€“Â¾Ã¥â‚¬Â¼Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†

4. Ã¥Â°ÂÃ¦Â¯ÂÃ¥â‚¬â€¹Ã¨Â¦â€ Ã¨â€œâ€¹Ã¤Â¸ÂÃ¨Â¶Â³Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å¡
   - Ã¥Ë†â€ Ã¦Å¾ÂÃ¦Å“ÂªÃ¦Â¸Â¬Ã¨Â©Â¦Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¨Â·Â¯Ã¥Â¾â€˜
   - Ã§â€šÂºÃ¥â€¡Â½Ã¥Â¼ÂÃ§â€Â¢Ã§â€Å¸Ã¥â€“Â®Ã¥â€¦Æ’Ã¦Â¸Â¬Ã¨Â©Â¦
   - Ã§â€šÂº API Ã§â€Â¢Ã§â€Å¸Ã¦â€¢Â´Ã¥ÂË†Ã¦Â¸Â¬Ã¨Â©Â¦
   - Ã§â€šÂºÃ©â€”Å“Ã©ÂÂµÃ¦ÂµÂÃ§Â¨â€¹Ã§â€Â¢Ã§â€Å¸ E2E Ã¦Â¸Â¬Ã¨Â©Â¦

5. Ã©Â©â€”Ã¨Â­â€°Ã¦â€“Â°Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½

6. Ã©Â¡Â¯Ã§Â¤ÂºÃ¥â€°ÂÃ¥Â¾Å’Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¦Å’â€¡Ã¦Â¨â„¢

7. Ã§Â¢ÂºÃ¤Â¿ÂÃ¥Â°Ë†Ã¦Â¡Ë†Ã©Ââ€Ã¥Ë†Â° 80% Ã¤Â»Â¥Ã¤Â¸Å Ã¦â€¢Â´Ã©Â«â€Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡

Ã¥Â°Ë†Ã¦Â³Â¨Ã¦â€“Â¼Ã¯Â¼Å¡
- Ã¦Â­Â£Ã¥Â¸Â¸Ã¦ÂµÂÃ§Â¨â€¹Ã¦Æ’â€¦Ã¥Â¢Æ’
- Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ 
- Ã©â€šÅ Ã§â€¢Å’Ã¦Æ’â€¦Ã¦Â³ÂÃ¯Â¼Ë†nullÃ£â‚¬ÂundefinedÃ£â‚¬ÂÃ§Â©ÂºÃ¥â‚¬Â¼Ã¯Â¼â€°
- Ã©â€šÅ Ã§â€¢Å’Ã¦Â¢ÂÃ¤Â»Â¶
