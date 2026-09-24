# Ã¥Â¾ÂªÃ§Å½Â¯Ã§Å Â¶Ã¦â‚¬ÂÃ¥â€˜Â½Ã¤Â»Â¤

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


Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â´Â»Ã¥Å Â¨Ã¥Â¾ÂªÃ§Å½Â¯Ã§Å Â¶Ã¦â‚¬ÂÃ£â‚¬ÂÃ¨Â¿â€ºÃ¥ÂºÂ¦Ã¥â€™Å’Ã¦â€¢â€¦Ã©Å¡Å“Ã¤Â¿Â¡Ã¥ÂÂ·Ã£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

`/loop-status [--watch]`

## Ã¦Å Â¥Ã¥â€˜Å Ã¥â€ â€¦Ã¥Â®Â¹

* Ã¦Â´Â»Ã¥Å Â¨Ã¥Â¾ÂªÃ§Å½Â¯Ã¦Â¨Â¡Ã¥Â¼Â
* Ã¥Â½â€œÃ¥â€°ÂÃ©ËœÂ¶Ã¦Â®ÂµÃ¥â€™Å’Ã¦Å“â‚¬Ã¥ÂÅ½Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Ë†ÂÃ¥Å Å¸Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹
* Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å“â€°Ã¯Â¼â€°
* Ã©Â¢â€žÃ¨Â®Â¡Ã§Å¡â€žÃ¦â€”Â¶Ã©â€”Â´/Ã¦Ë†ÂÃ¦Å“Â¬Ã¥ÂÂÃ¥Â·Â®
* Ã¥Â»ÂºÃ¨Â®Â®Ã§Å¡â€žÃ¥Â¹Â²Ã©Â¢â€žÃ¦Å½ÂªÃ¦â€“Â½Ã¯Â¼Ë†Ã§Â»Â§Ã§Â»Â­/Ã¦Å¡â€šÃ¥ÂÅ“/Ã¥ÂÅ“Ã¦Â­Â¢Ã¯Â¼â€°

## Ã§â€ºâ€˜Ã¨Â§â€ Ã¦Â¨Â¡Ã¥Â¼Â

Ã¥Â½â€œ `--watch` Ã¥Â­ËœÃ¥Å“Â¨Ã¦â€”Â¶Ã¯Â¼Å’Ã¥Â®Å¡Ã¦Å“Å¸Ã¥Ë†Â·Ã¦â€“Â°Ã§Å Â¶Ã¦â‚¬ÂÃ¥Â¹Â¶Ã¦ËœÂ¾Ã§Â¤ÂºÃ§Å Â¶Ã¦â‚¬ÂÃ¥ÂËœÃ¥Å’â€“Ã£â‚¬â€š

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS:

* `--watch` Ã¥ÂÂ¯Ã©â‚¬â€°
