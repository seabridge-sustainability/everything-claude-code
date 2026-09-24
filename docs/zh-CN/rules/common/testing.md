# Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦ÂÃ¦Â±â€š

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


## Ã¦Å“â‚¬Ã¤Â½Å½Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Å¡80%

Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Ë†Ã¥â€¦Â¨Ã©Æ’Â¨Ã©Å“â‚¬Ã¨Â¦ÂÃ¯Â¼â€°Ã¯Â¼Å¡

1. **Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢** - Ã¥Ââ€¢Ã¤Â¸ÂªÃ¥â€¡Â½Ã¦â€¢Â°Ã£â‚¬ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã£â‚¬ÂÃ§Â»â€žÃ¤Â»Â¶
2. **Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢** - API Ã§Â«Â¯Ã§â€šÂ¹Ã£â‚¬ÂÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¦â€œÂÃ¤Â½Å“
3. **Ã§Â«Â¯Ã¥Ë†Â°Ã§Â«Â¯Ã¦Âµâ€¹Ã¨Â¯â€¢** - Ã¥â€¦Â³Ã©â€Â®Ã§â€Â¨Ã¦Ë†Â·Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Ë†Ã¦Â Â¹Ã¦ÂÂ®Ã¨Â¯Â­Ã¨Â¨â‚¬Ã©â‚¬â€°Ã¦â€¹Â©Ã¦Â¡â€ Ã¦Å¾Â¶Ã¯Â¼â€°

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Â©Â±Ã¥Å Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜

Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å¡

1. Ã¥â€¦Ë†Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢ (Ã¥Â¤Â±Ã¨Â´Â¥)
2. Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢ - Ã¥Â®Æ’Ã¥Âºâ€Ã¨Â¯Â¥Ã¥Â¤Â±Ã¨Â´Â¥
3. Ã§Â¼â€“Ã¥â€ â„¢Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Â®Å¾Ã§Å½Â° (Ã¦Ë†ÂÃ¥Å Å¸)
4. Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢ - Ã¥Â®Æ’Ã¥Âºâ€Ã¨Â¯Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡
5. Ã©â€¡ÂÃ¦Å¾â€ž (Ã¦â€Â¹Ã¨Â¿â€º)
6. Ã©ÂªÅ’Ã¨Â¯ÂÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡ (80%+)

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¤Â±Ã¨Â´Â¥Ã¦Å½â€™Ã¦Å¸Â¥

1. Ã¤Â½Â¿Ã§â€Â¨ **tdd-guide** Ã¤Â»Â£Ã§Ââ€ 
2. Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Å¡â€Ã§Â¦Â»Ã¦â‚¬Â§
3. Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â¨Â¡Ã¦â€¹Å¸Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¦Â­Â£Ã§Â¡Â®
4. Ã¤Â¿Â®Ã¥Â¤ÂÃ¥Â®Å¾Ã§Å½Â°Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†Ã©â„¢Â¤Ã©ÂÅ¾Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Å“â€°Ã¨Â¯Â¯Ã¯Â¼â€°

## Ã¤Â»Â£Ã§Ââ€ Ã¦â€Â¯Ã¦Å’Â

* **tdd-guide** - Ã¤Â¸Â»Ã¥Å Â¨Ã§â€Â¨Ã¤ÂºÅ½Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¯Â¼Å’Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¼ËœÃ¥â€¦Ë†
