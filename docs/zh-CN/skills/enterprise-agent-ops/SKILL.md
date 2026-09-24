---
name: enterprise-agent-ops
description: Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥ÂÂ¯Ã¨Â§â€šÃ¦Âµâ€¹Ã¦â‚¬Â§Ã£â‚¬ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¨Â¾Â¹Ã§â€¢Å’Ã¥â€™Å’Ã§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã§Â®Â¡Ã§Ââ€ Ã¦ÂÂ¥Ã¦â€œÂÃ¤Â½Å“Ã©â€¢Â¿Ã¦Å“Å¸Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¤Â»Â£Ã§Ââ€ Ã¥Â·Â¥Ã¤Â½Å“Ã¨Â´Å¸Ã¨Â½Â½Ã£â‚¬â€š
origin: ECC
---

# Ã¤Â¼ÂÃ¤Â¸Å¡Ã§ÂºÂ§Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¨Â¿ÂÃ§Â»Â´

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


Ã¤Â½Â¿Ã§â€Â¨Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã§â€Â¨Ã¤ÂºÅ½Ã©Å“â‚¬Ã¨Â¦ÂÃ¨Â¶â€¦Ã¨Â¶Å Ã¥Ââ€¢Ã¦Â¬Â¡ CLI Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦â€œÂÃ¤Â½Å“Ã¦Å½Â§Ã¥Ë†Â¶Ã§Å¡â€žÃ¤Âºâ€˜Ã¦â€°ËœÃ§Â®Â¡Ã¦Ë†â€“Ã¦Å’ÂÃ§Â»Â­Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ§Â³Â»Ã§Â»Å¸Ã£â‚¬â€š

## Ã¨Â¿ÂÃ§Â»Â´Ã©Â¢â€ Ã¥Å¸Å¸

1. Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã¯Â¼Ë†Ã¥ÂÂ¯Ã¥Å Â¨Ã£â‚¬ÂÃ¦Å¡â€šÃ¥ÂÅ“Ã£â‚¬ÂÃ¥ÂÅ“Ã¦Â­Â¢Ã£â‚¬ÂÃ©â€¡ÂÃ¥ÂÂ¯Ã¯Â¼â€°
2. Ã¥ÂÂ¯Ã¨Â§â€šÃ¦Âµâ€¹Ã¦â‚¬Â§Ã¯Â¼Ë†Ã¦â€”Â¥Ã¥Â¿â€”Ã£â‚¬ÂÃ¦Å’â€¡Ã¦Â â€¡Ã£â‚¬ÂÃ¨Â¿Â½Ã¨Â¸ÂªÃ¯Â¼â€°
3. Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å½Â§Ã¥Ë†Â¶Ã¯Â¼Ë†Ã¤Â½Å“Ã§â€Â¨Ã¥Å¸Å¸Ã£â‚¬ÂÃ¦ÂÆ’Ã©â„¢ÂÃ£â‚¬ÂÃ§Â´Â§Ã¦â‚¬Â¥Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Â¼â‚¬Ã¥â€¦Â³Ã¯Â¼â€°
4. Ã¥ÂËœÃ¦â€ºÂ´Ã§Â®Â¡Ã§Ââ€ Ã¯Â¼Ë†Ã¥Ââ€˜Ã¥Â¸Æ’Ã£â‚¬ÂÃ¥â€ºÅ¾Ã¦Â»Å¡Ã£â‚¬ÂÃ¥Â®Â¡Ã¨Â®Â¡Ã¯Â¼â€°

## Ã¥Å¸ÂºÃ§ÂºÂ¿Ã¦Å½Â§Ã¥Ë†Â¶

* Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ§Å¡â€žÃ©Æ’Â¨Ã§Â½Â²Ã¥Â·Â¥Ã¤Â»Â¶
* Ã¦Å“â‚¬Ã¥Â°ÂÃ¦ÂÆ’Ã©â„¢ÂÃ¥â€¡Â­Ã¨Â¯Â
* Ã§Å½Â¯Ã¥Â¢Æ’Ã§ÂºÂ§Ã¥Ë†Â«Ã§Å¡â€žÃ¥Â¯â€ Ã©â€™Â¥Ã¦Â³Â¨Ã¥â€¦Â¥
* Ã§Â¡Â¬Ã¦â‚¬Â§Ã¨Â¶â€¦Ã¦â€”Â¶Ã¥â€™Å’Ã©â€¡ÂÃ¨Â¯â€¢Ã©Â¢â€žÃ§Â®â€”
* Ã©Â«ËœÃ©Â£Å½Ã©â„¢Â©Ã¦â€œÂÃ¤Â½Å“Ã§Å¡â€žÃ¥Â®Â¡Ã¨Â®Â¡Ã¦â€”Â¥Ã¥Â¿â€”

## Ã©Å“â‚¬Ã¨Â·Å¸Ã¨Â¸ÂªÃ§Å¡â€žÃ¦Å’â€¡Ã¦Â â€¡

* Ã¦Ë†ÂÃ¥Å Å¸Ã§Å½â€¡
* Ã¦Â¯ÂÃ©Â¡Â¹Ã¤Â»Â»Ã¥Å Â¡Ã§Å¡â€žÃ¥Â¹Â³Ã¥Ââ€¡Ã©â€¡ÂÃ¨Â¯â€¢Ã¦Â¬Â¡Ã¦â€¢Â°
* Ã¦ÂÂ¢Ã¥Â¤ÂÃ¦â€”Â¶Ã©â€”Â´
* Ã¦Â¯ÂÃ©Â¡Â¹Ã¦Ë†ÂÃ¥Å Å¸Ã¤Â»Â»Ã¥Å Â¡Ã§Å¡â€žÃ¦Ë†ÂÃ¦Å“Â¬
* Ã¦â€¢â€¦Ã©Å¡Å“Ã§Â±Â»Ã¥Ë†Â«Ã¥Ë†â€ Ã¥Â¸Æ’

## Ã¤Âºâ€¹Ã¦â€¢â€¦Ã¥Â¤â€žÃ§Ââ€ Ã¦Â¨Â¡Ã¥Â¼Â

Ã¥Â½â€œÃ¦â€¢â€¦Ã©Å¡Å“Ã¦Â¿â‚¬Ã¥Â¢Å¾Ã¦â€”Â¶Ã¯Â¼Å¡

1. Ã¥â€ Â»Ã§Â»â€œÃ¦â€“Â°Ã¥Ââ€˜Ã¥Â¸Æ’
2. Ã¦Ââ€¢Ã¨Å½Â·Ã¤Â»Â£Ã¨Â¡Â¨Ã¦â‚¬Â§Ã¨Â¿Â½Ã¨Â¸ÂªÃ¦â€¢Â°Ã¦ÂÂ®
3. Ã©Å¡â€Ã§Â¦Â»Ã¦â€¢â€¦Ã©Å¡Å“Ã¨Â·Â¯Ã¥Â¾â€ž
4. Ã¥Âºâ€Ã§â€Â¨Ã¦Å“â‚¬Ã¥Â°ÂÃ§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã¥ÂËœÃ¦â€ºÂ´Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â¿Â®Ã¨Â¡Â¥
5. Ã¨Â¿ÂÃ¨Â¡Å’Ã¥â€ºÅ¾Ã¥Â½â€™Ã¦Âµâ€¹Ã¨Â¯â€¢ + Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥
6. Ã©â‚¬ÂÃ¦Â­Â¥Ã¦ÂÂ¢Ã¥Â¤Â

## Ã©Æ’Â¨Ã§Â½Â²Ã©â€ºâ€ Ã¦Ë†Â

Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã¥ÂÂ¯Ã¤Â¸Å½Ã¤Â»Â¥Ã¤Â¸â€¹Ã¥Â·Â¥Ã¥â€¦Â·Ã©â€¦ÂÃ¥ÂË†Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Å¡

* PM2 Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ
* systemd Ã¦Å“ÂÃ¥Å Â¡
* Ã¥Â®Â¹Ã¥â„¢Â¨Ã§Â¼â€“Ã¦Å½â€™Ã¥â„¢Â¨
* CI/CD Ã©â€”Â¨Ã¦Å½Â§
