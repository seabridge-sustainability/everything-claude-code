# Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Å“â‚¬Ã¦Â±â€š

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


## Ã¦Å“â‚¬Ã¤Â½Å½Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¯Â¼Å¡80%

Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Â¡Å¾Ã¥Å¾â€¹Ã¯Â¼Ë†Ã¥â€¦Â¨Ã©Æ’Â¨Ã¥Â¿â€¦Ã¨Â¦ÂÃ¯Â¼â€°Ã¯Â¼Å¡
1. **Ã¥â€“Â®Ã¥â€¦Æ’Ã¦Â¸Â¬Ã¨Â©Â¦** - Ã¥â‚¬â€¹Ã¥Ë†Â¥Ã¥â€¡Â½Ã¥Â¼ÂÃ£â‚¬ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã£â‚¬ÂÃ¥â€¦Æ’Ã¤Â»Â¶
2. **Ã¦â€¢Â´Ã¥ÂË†Ã¦Â¸Â¬Ã¨Â©Â¦** - API Ã§Â«Â¯Ã©Â»Å¾Ã£â‚¬ÂÃ¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¦â€œÂÃ¤Â½Å“
3. **E2E Ã¦Â¸Â¬Ã¨Â©Â¦** - Ã©â€”Å“Ã©ÂÂµÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Ë†PlaywrightÃ¯Â¼â€°

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Â©â€¦Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Â¼

Ã¥Â¼Â·Ã¥Ë†Â¶Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å¡
1. Ã¥â€¦Ë†Ã¦â€™Â°Ã¥Â¯Â«Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Ë†REDÃ¯Â¼â€°
2. Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦ - Ã¦â€¡â€°Ã¨Â©Â²Ã¥Â¤Â±Ã¦â€¢â€”
3. Ã¦â€™Â°Ã¥Â¯Â«Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Â¯Â¦Ã¤Â½Å“Ã¯Â¼Ë†GREENÃ¯Â¼â€°
4. Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦ - Ã¦â€¡â€°Ã¨Â©Â²Ã©â‚¬Å¡Ã©ÂÅ½
5. Ã©â€¡ÂÃ¦Â§â€¹Ã¯Â¼Ë†IMPROVEÃ¯Â¼â€°
6. Ã©Â©â€”Ã¨Â­â€°Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¯Â¼Ë†80%+Ã¯Â¼â€°

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¤Â±Ã¦â€¢â€”Ã§â€“â€˜Ã©â€ºÂ£Ã¦Å½â€™Ã¨Â§Â£

1. Ã¤Â½Â¿Ã§â€Â¨ **tdd-guide** Agent
2. Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Å¡â€Ã©â€ºÂ¢
3. Ã©Â©â€”Ã¨Â­â€° mock Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¦Â­Â£Ã§Â¢Âº
4. Ã¤Â¿Â®Ã¥Â¾Â©Ã¥Â¯Â¦Ã¤Â½Å“Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Ë†Ã©â„¢Â¤Ã©ÂÅ¾Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦ËœÂ¯Ã©Å’Â¯Ã§Å¡â€žÃ¯Â¼â€°

## Agent Ã¦â€Â¯Ã¦ÂÂ´

- **tdd-guide** - Ã¤Â¸Â»Ã¥â€¹â€¢Ã§â€Â¨Ã¦â€“Â¼Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¯Â¼Å’Ã¥Â¼Â·Ã¥Ë†Â¶Ã¥â€¦Ë†Ã¦â€™Â°Ã¥Â¯Â«Ã¦Â¸Â¬Ã¨Â©Â¦
- **e2e-runner** - Playwright E2E Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â°Ë†Ã¥Â®Â¶
