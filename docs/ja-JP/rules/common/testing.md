# Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¨Â¦ÂÃ¤Â»Â¶

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


## Ã¦Å“â‚¬Ã¤Â½Å½Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸: 80%

Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”Ã¯Â¼Ë†Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã¥Â¿â€¦Ã©Â Ë†Ã¯Â¼â€°:
1. **Ã£Æ’Â¦Ã£Æ’â€¹Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†** - Ã¥â‚¬â€¹Ã£â‚¬â€¦Ã£ÂÂ®Ã©â€“Â¢Ã¦â€¢Â°Ã£â‚¬ÂÃ£Æ’Â¦Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â‚¬ÂÃ£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’Ë†
2. **Ã§ÂµÂ±Ã¥ÂË†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†** - API Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â‚¬ÂÃ£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã¦â€œÂÃ¤Â½Å“
3. **E2E Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†** - Ã©â€¡ÂÃ¨Â¦ÂÃ£ÂÂªÃ£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã¯Â¼Ë†Ã£Æ’â€¢Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Â Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£ÂÂ¯Ã¨Â¨â‚¬Ã¨ÂªÅ¾Ã£Ââ€Ã£ÂÂ¨Ã£ÂÂ«Ã©ÂÂ¸Ã¦Å Å¾Ã¯Â¼â€°

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Âº

Ã¥Â¿â€¦Ã©Â Ë†Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼:
1. Ã£ÂÂ¾Ã£ÂÅ¡Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂÃ¯Â¼Ë†REDÃ¯Â¼â€°
2. Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’ - Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¯Ã£ÂÅ¡
3. Ã¦Å“â‚¬Ã¥Â°ÂÃ©â„¢ÂÃ£ÂÂ®Ã¥Â®Å¸Ã¨Â£â€¦Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂÃ¯Â¼Ë†GREENÃ¯Â¼â€°
4. Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’ - Ã£Æ’â€˜Ã£â€šÂ¹Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¯Ã£ÂÅ¡
5. Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã¯Â¼Ë†IMPROVEÃ¯Â¼â€°
6. Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂÃ¯Â¼Ë†80%+Ã¯Â¼â€°

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¥Â¤Â±Ã¦â€¢â€”Ã£ÂÂ®Ã£Æ’Ë†Ã£Æ’Â©Ã£Æ’â€“Ã£Æ’Â«Ã£â€šÂ·Ã£Æ’Â¥Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ°

1. **tdd-guide** agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
2. Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¥Ë†â€ Ã©â€ºÂ¢Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
3. Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÅ’Ã¦Â­Â£Ã£Ââ€”Ã£Ââ€žÃ£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼
4. Ã¥Â®Å¸Ã¨Â£â€¦Ã£â€šâ€™Ã¤Â¿Â®Ã¦Â­Â£Ã£â‚¬ÂÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯Ã¤Â¿Â®Ã¦Â­Â£Ã£Ââ€”Ã£ÂÂªÃ£Ââ€žÃ¯Â¼Ë†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã©â€“â€œÃ©Ââ€¢Ã£ÂÂ£Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£â€šâ€™Ã©â„¢Â¤Ã£ÂÂÃ¯Â¼â€°

## Agent Ã£â€šÂµÃ£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†

- **tdd-guide** - Ã¦â€“Â°Ã¦Â©Å¸Ã¨Æ’Â½Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦Ã§Â©ÂÃ¦Â¥ÂµÃ§Å¡â€žÃ£ÂÂ«Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬ÂÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ¡Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â¼Â·Ã¥Ë†Â¶
