# Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡

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


Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å¡PR Ã¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼Å’Ã¤Â»Â£Ã§Â ÂÃ¥Ë†â€ Ã¦Å¾Â
Ã©â€¡ÂÃ§â€šÂ¹Ã¯Â¼Å¡Ã¨Â´Â¨Ã©â€¡ÂÃ£â‚¬ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã£â‚¬ÂÃ¥ÂÂ¯Ã§Â»Â´Ã¦Å Â¤Ã¦â‚¬Â§

## Ã¨Â¡Å’Ã¤Â¸ÂºÃ¥â€¡â€ Ã¥Ë†â„¢

* Ã¨Â¯â€žÃ¨Â®ÂºÃ¥â€°ÂÃ¤Â»â€Ã§Â»â€ Ã©Ëœâ€¦Ã¨Â¯Â»
* Ã¦Å’â€°Ã¤Â¸Â¥Ã©â€¡ÂÃ¦â‚¬Â§Ã¥Â¯Â¹Ã©â€”Â®Ã©Â¢ËœÃ¦Å½â€™Ã¥ÂºÂÃ¯Â¼Ë†Ã¥â€¦Â³Ã©â€Â® > Ã©Â«Ëœ > Ã¤Â¸Â­ > Ã¤Â½Å½Ã¯Â¼â€°
* Ã¥Â»ÂºÃ¨Â®Â®Ã¤Â¿Â®Ã¥Â¤ÂÃ¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¤Â»â€¦Ã¤Â»â€¦Ã¦ËœÂ¯Ã¦Å’â€¡Ã¥â€¡ÂºÃ©â€”Â®Ã©Â¢Ëœ
* Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¼ÂÃ¦Â´Å¾

## Ã¥Â®Â¡Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢

* \[ ] Ã©â‚¬Â»Ã¨Â¾â€˜Ã©â€â„¢Ã¨Â¯Â¯
* \[ ] Ã¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ Âµ
* \[ ] Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 
* \[ ] Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¯Â¼Ë†Ã¦Â³Â¨Ã¥â€¦Â¥Ã£â‚¬ÂÃ¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬ÂÃ¥Â¯â€ Ã©â€™Â¥Ã¯Â¼â€°
* \[ ] Ã¦â‚¬Â§Ã¨Æ’Â½
* \[ ] Ã¥ÂÂ¯Ã¨Â¯Â»Ã¦â‚¬Â§
* \[ ] Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

## Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼Â

Ã¦Å’â€°Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Ë†â€ Ã§Â»â€žÃ¥Ââ€˜Ã§Å½Â°Ã§Å¡â€žÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¤Â¸Â¥Ã©â€¡ÂÃ¦â‚¬Â§Ã¤Â¼ËœÃ¥â€¦Ë†
