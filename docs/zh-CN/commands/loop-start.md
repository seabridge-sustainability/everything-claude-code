# Ã¥Â¾ÂªÃ§Å½Â¯Ã¥ÂÂ¯Ã¥Å Â¨Ã¥â€˜Â½Ã¤Â»Â¤

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


Ã¤Â½Â¿Ã§â€Â¨Ã¥Â®â€°Ã¥â€¦Â¨Ã©Â»ËœÃ¨Â®Â¤Ã¨Â®Â¾Ã§Â½Â®Ã¥ÂÂ¯Ã¥Å Â¨Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Ââ€”Ã§Â®Â¡Ã§Ââ€ Ã§Å¡â€žÃ¨â€¡ÂªÃ¤Â¸Â»Ã¥Â¾ÂªÃ§Å½Â¯Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

`/loop-start [pattern] [--mode safe|fast]`

* `pattern`: `sequential`, `continuous-pr`, `rfc-dag`, `infinite`
* `--mode`:
  * `safe` (Ã©Â»ËœÃ¨Â®Â¤): Ã¤Â¸Â¥Ã¦Â Â¼Ã§Å¡â€žÃ¨Â´Â¨Ã©â€¡ÂÃ©â€”Â¨Ã§Â¦ÂÃ¥â€™Å’Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹
  * `fast`: Ã¤Â¸ÂºÃ©â‚¬Å¸Ã¥ÂºÂ¦Ã¨â‚¬Å’Ã¥â€¡ÂÃ¥Â°â€˜Ã©â€”Â¨Ã§Â¦Â

## Ã¦ÂµÂÃ§Â¨â€¹

1. Ã§Â¡Â®Ã¨Â®Â¤Ã¤Â»â€œÃ¥Âºâ€œÃ§Å Â¶Ã¦â‚¬ÂÃ¥â€™Å’Ã¥Ë†â€ Ã¦â€Â¯Ã§Â­â€“Ã§â€¢Â¥Ã£â‚¬â€š
2. Ã©â‚¬â€°Ã¦â€¹Â©Ã¥Â¾ÂªÃ§Å½Â¯Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥â€™Å’Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥Â±â€šÃ§ÂºÂ§Ã§Â­â€“Ã§â€¢Â¥Ã£â‚¬â€š
3. Ã¤Â¸ÂºÃ¦â€°â‚¬Ã©â‚¬â€°Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥ÂÂ¯Ã§â€Â¨Ã¦â€°â‚¬Ã©Å“â‚¬Ã§Å¡â€žÃ©â€™Â©Ã¥Â­Â/Ã©â€¦ÂÃ§Â½Â®Ã¦â€“â€¡Ã¤Â»Â¶Ã£â‚¬â€š
4. Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Â¾ÂªÃ§Å½Â¯Ã¨Â®Â¡Ã¥Ë†â€™Ã¥Â¹Â¶Ã¥Å“Â¨ `.claude/plans/` Ã¤Â¸â€¹Ã§Â¼â€“Ã¥â€ â„¢Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€°â€¹Ã¥â€ Å’Ã£â‚¬â€š
5. Ã¦â€°â€œÃ¥ÂÂ°Ã§â€Â¨Ã¤ÂºÅ½Ã¥ÂÂ¯Ã¥Å Â¨Ã¥â€™Å’Ã§â€ºâ€˜Ã¦Å½Â§Ã¥Â¾ÂªÃ§Å½Â¯Ã§Å¡â€žÃ¥â€˜Â½Ã¤Â»Â¤Ã£â‚¬â€š

## Ã¥Â¿â€¦Ã©Å“â‚¬Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥

* Ã¥Å“Â¨Ã©Â¦â€“Ã¦Â¬Â¡Ã¥Â¾ÂªÃ§Å½Â¯Ã¨Â¿Â­Ã¤Â»Â£Ã¥â€°ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã£â‚¬â€š
* Ã§Â¡Â®Ã¤Â¿Â `ECC_HOOK_PROFILE` Ã¦Å“ÂªÃ¥Å“Â¨Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¨Å’Æ’Ã¥â€ºÂ´Ã¥â€ â€¦Ã¨Â¢Â«Ã§Â¦ÂÃ§â€Â¨Ã£â‚¬â€š
* Ã§Â¡Â®Ã¤Â¿ÂÃ¥Â¾ÂªÃ§Å½Â¯Ã¦Å“â€°Ã¦ËœÅ½Ã§Â¡Â®Ã§Å¡â€žÃ¥ÂÅ“Ã¦Â­Â¢Ã¦ÂÂ¡Ã¤Â»Â¶Ã£â‚¬â€š

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS:

* `<pattern>` Ã¥ÂÂ¯Ã©â‚¬â€° (`sequential|continuous-pr|rfc-dag|infinite`)
* `--mode safe|fast` Ã¥ÂÂ¯Ã©â‚¬â€°
