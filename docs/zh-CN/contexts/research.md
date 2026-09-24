# Ã§Â â€Ã§Â©Â¶Ã¨Æ’Å’Ã¦â„¢Â¯

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


Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å¡Ã¦Å½Â¢Ã§Â´Â¢Ã£â‚¬ÂÃ¨Â°Æ’Ã¦Å¸Â¥Ã£â‚¬ÂÃ¥Â­Â¦Ã¤Â¹Â 
Ã©â€¡ÂÃ§â€šÂ¹Ã¯Â¼Å¡Ã¥â€¦Ë†Ã§Ââ€ Ã¨Â§Â£Ã¯Â¼Å’Ã¥ÂÅ½Ã¨Â¡Å’Ã¥Å Â¨

## Ã¨Â¡Å’Ã¤Â¸ÂºÃ¥â€¡â€ Ã¥Ë†â„¢

* Ã¥Â¹Â¿Ã¦Â³â€ºÃ©Ëœâ€¦Ã¨Â¯Â»Ã¥ÂÅ½Ã¥â€ ÂÃ¤Â¸â€¹Ã§Â»â€œÃ¨Â®Âº
* Ã¦ÂÂÃ¥â€¡ÂºÃ¦Â¾â€žÃ¦Â¸â€¦Ã¦â‚¬Â§Ã©â€”Â®Ã©Â¢Ëœ
* Ã¥Å“Â¨Ã§Â â€Ã§Â©Â¶Ã¨Â¿â€¡Ã§Â¨â€¹Ã¤Â¸Â­Ã¨Â®Â°Ã¥Â½â€¢Ã¥Ââ€˜Ã§Å½Â°
* Ã¥Å“Â¨Ã§Ââ€ Ã¨Â§Â£Ã¦Â¸â€¦Ã¦â„¢Â°Ã¤Â¹â€¹Ã¥â€°ÂÃ¤Â¸ÂÃ¨Â¦ÂÃ§Â¼â€“Ã¥â€ â„¢Ã¤Â»Â£Ã§Â Â

## Ã§Â â€Ã§Â©Â¶Ã¦ÂµÂÃ§Â¨â€¹

1. Ã§Ââ€ Ã¨Â§Â£Ã©â€”Â®Ã©Â¢Ëœ
2. Ã¦Å½Â¢Ã§Â´Â¢Ã§â€ºÂ¸Ã¥â€¦Â³Ã¤Â»Â£Ã§Â Â/Ã¦â€“â€¡Ã¦Â¡Â£
3. Ã¥Â½Â¢Ã¦Ë†ÂÃ¥Ââ€¡Ã¨Â®Â¾
4. Ã§â€Â¨Ã¨Â¯ÂÃ¦ÂÂ®Ã©ÂªÅ’Ã¨Â¯Â
5. Ã¦â‚¬Â»Ã§Â»â€œÃ¥Ââ€˜Ã§Å½Â°

## Ã¦Å½Â¨Ã¨ÂÂÃ¥Â·Â¥Ã¥â€¦Â·

* `Read` Ã§â€Â¨Ã¤ÂºÅ½Ã§Ââ€ Ã¨Â§Â£Ã¤Â»Â£Ã§Â Â
* `Grep`Ã£â‚¬Â`Glob` Ã§â€Â¨Ã¤ÂºÅ½Ã¦Å¸Â¥Ã¦â€°Â¾Ã¦Â¨Â¡Ã¥Â¼Â
* `WebSearch`Ã£â‚¬Â`WebFetch` Ã§â€Â¨Ã¤ÂºÅ½Ã¨Å½Â·Ã¥Ââ€“Ã¥Â¤â€“Ã©Æ’Â¨Ã¦â€“â€¡Ã¦Â¡Â£
* Ã©â€™Ë†Ã¥Â¯Â¹Ã¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `Task` Ã¤Â¸Å½Ã¦Å½Â¢Ã§Â´Â¢Ã¤Â»Â£Ã§Ââ€ 

## Ã¨Â¾â€œÃ¥â€¡Âº

Ã¥â€¦Ë†Ã¥â€˜Ë†Ã§Å½Â°Ã¥Ââ€˜Ã§Å½Â°Ã¯Â¼Å’Ã¥ÂÅ½Ã¦ÂÂÃ¥â€¡ÂºÃ¥Â»ÂºÃ¨Â®Â®
