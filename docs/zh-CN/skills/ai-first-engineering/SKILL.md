---
name: ai-first-engineering
description: Ã¥â€ºÂ¢Ã©ËœÅ¸Ã¤Â¸Â­Ã¤ÂºÂºÃ¥Â·Â¥Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â»Â£Ã§Ââ€ Ã§â€Å¸Ã¦Ë†ÂÃ¥Â¤Â§Ã©Æ’Â¨Ã¥Ë†â€ Ã¥Â®Å¾Ã¦â€“Â½Ã¨Â¾â€œÃ¥â€¡ÂºÃ§Å¡â€žÃ¥Â·Â¥Ã§Â¨â€¹Ã¨Â¿ÂÃ¨ÂÂ¥Ã¦Â¨Â¡Ã¥Å¾â€¹Ã£â‚¬â€š
origin: ECC
---

# Ã¤ÂºÂºÃ¥Â·Â¥Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â¼ËœÃ¥â€¦Ë†Ã¥Â·Â¥Ã§Â¨â€¹

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


Ã¥Å“Â¨Ã¤Â¸ÂºÃ§â€Â±Ã¤ÂºÂºÃ¥Â·Â¥Ã¦â„¢ÂºÃ¨Æ’Â½Ã¨Â¾â€¦Ã¥Å Â©Ã¤Â»Â£Ã§Â ÂÃ§â€Å¸Ã¦Ë†ÂÃ§Å¡â€žÃ¥â€ºÂ¢Ã©ËœÅ¸Ã¨Â®Â¾Ã¨Â®Â¡Ã¦ÂµÂÃ§Â¨â€¹Ã£â‚¬ÂÃ¨Â¯â€žÃ¥Â®Â¡Ã¥â€™Å’Ã¦Å¾Â¶Ã¦Å¾â€žÃ¦â€”Â¶Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã£â‚¬â€š

## Ã¦ÂµÂÃ§Â¨â€¹Ã¨Â½Â¬Ã¥ÂËœ

1. Ã¨Â§â€žÃ¥Ë†â€™Ã¨Â´Â¨Ã©â€¡ÂÃ¦Â¯â€Ã¦â€°â€œÃ¥Â­â€”Ã©â‚¬Å¸Ã¥ÂºÂ¦Ã¦â€ºÂ´Ã©â€¡ÂÃ¨Â¦ÂÃ£â‚¬â€š
2. Ã¨Â¯â€žÃ¤Â¼Â°Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¦Â¯â€Ã¤Â¸Â»Ã¨Â§â€šÃ¤Â¿Â¡Ã¥Â¿Æ’Ã¦â€ºÂ´Ã©â€¡ÂÃ¨Â¦ÂÃ£â‚¬â€š
3. Ã¨Â¯â€žÃ¥Â®Â¡Ã©â€¡ÂÃ§â€šÂ¹Ã¤Â»Å½Ã¨Â¯Â­Ã¦Â³â€¢Ã¨Â½Â¬Ã¥Ââ€˜Ã§Â³Â»Ã§Â»Å¸Ã¨Â¡Å’Ã¤Â¸ÂºÃ£â‚¬â€š

## Ã¦Å¾Â¶Ã¦Å¾â€žÃ¨Â¦ÂÃ¦Â±â€š

Ã¤Â¼ËœÃ¥â€¦Ë†Ã©â‚¬â€°Ã¦â€¹Â©Ã¥Â¯Â¹Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¥Ââ€¹Ã¥Â¥Â½Ã§Å¡â€žÃ¦Å¾Â¶Ã¦Å¾â€žÃ¯Â¼Å¡

* Ã¦ËœÅ½Ã§Â¡Â®Ã§Å¡â€žÃ¨Â¾Â¹Ã§â€¢Å’
* Ã§Â¨Â³Ã¥Â®Å¡Ã§Å¡â€žÃ¥Â¥â€˜Ã§ÂºÂ¦
* Ã§Â±Â»Ã¥Å¾â€¹Ã¥Å’â€“Ã§Å¡â€žÃ¦Å½Â¥Ã¥ÂÂ£
* Ã§Â¡Â®Ã¥Â®Å¡Ã¦â‚¬Â§Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢

Ã©ÂÂ¿Ã¥â€¦ÂÃ©Å¡ÂÃ¥ÂÂ«Ã§Å¡â€žÃ¨Â¡Å’Ã¤Â¸ÂºÃ¥Ë†â€ Ã¦â€¢Â£Ã¥Å“Â¨Ã©Å¡ÂÃ¨â€”ÂÃ§Å¡â€žÃ¦Æ’Â¯Ã¤Â¾â€¹Ã¤Â¸Â­Ã£â‚¬â€š

## Ã¤ÂºÂºÃ¥Â·Â¥Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â¼ËœÃ¥â€¦Ë†Ã¥â€ºÂ¢Ã©ËœÅ¸Ã¤Â¸Â­Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¨Â¯â€žÃ¥Â®Â¡

Ã¨Â¯â€žÃ¥Â®Â¡Ã¥â€¦Â³Ã¦Â³Â¨Ã¯Â¼Å¡

* Ã¨Â¡Å’Ã¤Â¸ÂºÃ¥â€ºÅ¾Ã¥Â½â€™
* Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Ââ€¡Ã¨Â®Â¾
* Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Â®Å’Ã¦â€¢Â´Ã¦â‚¬Â§
* Ã¦â€¢â€¦Ã©Å¡Å“Ã¥Â¤â€žÃ§Ââ€ 
* Ã¥Ââ€˜Ã¥Â¸Æ’Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§

Ã¥Â°Â½Ã©â€¡ÂÃ¥â€¡ÂÃ¥Â°â€˜Ã¨Å Â±Ã¥Å“Â¨Ã¥Â·Â²Ã§â€Â±Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å¡â€žÃ©Â£Å½Ã¦Â Â¼Ã©â€”Â®Ã©Â¢ËœÃ¤Â¸Å Ã§Å¡â€žÃ¦â€”Â¶Ã©â€”Â´Ã£â‚¬â€š

## Ã¦â€¹â€ºÃ¨ÂËœÃ¥â€™Å’Ã¨Â¯â€žÃ¤Â¼Â°Ã¤Â¿Â¡Ã¥ÂÂ·

Ã¥Â¼ÂºÃ¥Â¤Â§Ã§Å¡â€žÃ¤ÂºÂºÃ¥Â·Â¥Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â¼ËœÃ¥â€¦Ë†Ã¥Â·Â¥Ã§Â¨â€¹Ã¥Â¸Ë†Ã¯Â¼Å¡

* Ã¨Æ’Â½Ã¦Â¸â€¦Ã¦â„¢Â°Ã¥Å“Â°Ã¥Ë†â€ Ã¨Â§Â£Ã¦Â¨Â¡Ã§Â³Å Ã§Å¡â€žÃ¥Â·Â¥Ã¤Â½Å“
* Ã¥Â®Å¡Ã¤Â¹â€°Ã¥ÂÂ¯Ã¨Â¡Â¡Ã©â€¡ÂÃ§Å¡â€žÃ©ÂªÅ’Ã¦â€Â¶Ã¦Â â€¡Ã¥â€¡â€ 
* Ã§â€Å¸Ã¦Ë†ÂÃ©Â«ËœÃ¤Â»Â·Ã¥â‚¬Â¼Ã§Å¡â€žÃ¦ÂÂÃ§Â¤ÂºÃ¥â€™Å’Ã¨Â¯â€žÃ¤Â¼Â°
* Ã¥Å“Â¨Ã¤ÂºÂ¤Ã¤Â»ËœÃ¥Å½â€¹Ã¥Å â€ºÃ¤Â¸â€¹Ã¦â€°Â§Ã¨Â¡Å’Ã©Â£Å½Ã©â„¢Â©Ã¦Å½Â§Ã¥Ë†Â¶

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â â€¡Ã¥â€¡â€ 

Ã¦ÂÂÃ©Â«ËœÃ§â€Å¸Ã¦Ë†ÂÃ¤Â»Â£Ã§Â ÂÃ§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â â€¡Ã¥â€¡â€ Ã¯Â¼Å¡

* Ã¥Â¯Â¹Ã¦Â¶â€°Ã¥ÂÅ Ã§Å¡â€žÃ©Â¢â€ Ã¥Å¸Å¸Ã¨Â¦ÂÃ¦Â±â€šÃ¥â€ºÅ¾Ã¥Â½â€™Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡
* Ã¦ËœÅ½Ã§Â¡Â®Ã§Å¡â€žÃ¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ ÂµÃ¦â€“Â­Ã¨Â¨â‚¬
* Ã¦Å½Â¥Ã¥ÂÂ£Ã¨Â¾Â¹Ã§â€¢Å’Ã§Å¡â€žÃ©â€ºâ€ Ã¦Ë†ÂÃ¦Â£â‚¬Ã¦Å¸Â¥
