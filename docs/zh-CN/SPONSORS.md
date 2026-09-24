# Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦

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


Ã¦â€žÅ¸Ã¨Â°Â¢Ã¦â€°â‚¬Ã¦Å“â€°Ã¨ÂµÅ¾Ã¥Å Â©Ã¦Å“Â¬Ã©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€žÃ¥Ââ€žÃ¤Â½ÂÃ¯Â¼ÂÃ¤Â½Â Ã¤Â»Â¬Ã§Å¡â€žÃ¦â€Â¯Ã¦Å’ÂÃ¨Â®Â© ECC Ã§â€Å¸Ã¦â‚¬ÂÃ§Â³Â»Ã§Â»Å¸Ã¦Å’ÂÃ§Â»Â­Ã¦Ë†ÂÃ©â€¢Â¿Ã£â‚¬â€š

## Ã¤Â¼ÂÃ¤Â¸Å¡Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦

*Ã¦Ë†ÂÃ¤Â¸Âº [Ã¤Â¼ÂÃ¤Â¸Å¡Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦](https://github.com/sponsors/affaan-m)Ã¯Â¼Å’Ã¥Â°â€ Ã¦â€šÂ¨Ã§Å¡â€žÃ¥ÂÂÃ¥Â­â€”Ã¥Â±â€¢Ã§Â¤ÂºÃ¥Å“Â¨Ã¦Â­Â¤Ã¥Â¤â€ž*

## Ã¥â€¢â€ Ã¤Â¸Å¡Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦

*Ã¦Ë†ÂÃ¤Â¸Âº [Ã¥â€¢â€ Ã¤Â¸Å¡Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦](https://github.com/sponsors/affaan-m)Ã¯Â¼Å’Ã¥Â°â€ Ã¦â€šÂ¨Ã§Å¡â€žÃ¥ÂÂÃ¥Â­â€”Ã¥Â±â€¢Ã§Â¤ÂºÃ¥Å“Â¨Ã¦Â­Â¤Ã¥Â¤â€ž*

## Ã¥â€ºÂ¢Ã©ËœÅ¸Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦

*Ã¦Ë†ÂÃ¤Â¸Âº [Ã¥â€ºÂ¢Ã©ËœÅ¸Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦](https://github.com/sponsors/affaan-m)Ã¯Â¼Å’Ã¥Â°â€ Ã¦â€šÂ¨Ã§Å¡â€žÃ¥ÂÂÃ¥Â­â€”Ã¥Â±â€¢Ã§Â¤ÂºÃ¥Å“Â¨Ã¦Â­Â¤Ã¥Â¤â€ž*

## Ã¤Â¸ÂªÃ¤ÂºÂºÃ¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦

*Ã¦Ë†ÂÃ¤Â¸Âº [Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦](https://github.com/sponsors/affaan-m)Ã¯Â¼Å’Ã¥Â°â€ Ã¦â€šÂ¨Ã§Å¡â€žÃ¥ÂÂÃ¥Â­â€”Ã¥Ë†â€”Ã¥Å“Â¨Ã¦Â­Â¤Ã¥Â¤â€ž*

***

## Ã¤Â¸ÂºÃ¤Â»â‚¬Ã¤Â¹Ë†Ã¨Â¦ÂÃ¨ÂµÅ¾Ã¥Å Â©Ã¯Â¼Å¸

Ã¦â€šÂ¨Ã§Å¡â€žÃ¨ÂµÅ¾Ã¥Å Â©Ã¥Â°â€ Ã¥Â¸Â®Ã¥Å Â©Ã¦Ë†â€˜Ã¤Â»Â¬Ã¯Â¼Å¡

* **Ã¦â€ºÂ´Ã¥Â¿Â«Ã¥Å“Â°Ã¤ÂºÂ¤Ã¤Â»Ëœ** Ã¢â‚¬â€ Ã¦â€ºÂ´Ã¥Â¤Å¡Ã¦â€”Â¶Ã©â€”Â´Ã¦Å â€¢Ã¥â€¦Â¥Ã¥Ë†Â°Ã¥Â·Â¥Ã¥â€¦Â·Ã¥â€™Å’Ã¥Å Å¸Ã¨Æ’Â½Ã§Å¡â€žÃ¥Â¼â‚¬Ã¥Ââ€˜Ã¤Â¸Å 
* **Ã¤Â¿ÂÃ¦Å’ÂÃ¥â€¦ÂÃ¨Â´Â¹** Ã¢â‚¬â€ Ã©Â«ËœÃ§ÂºÂ§Ã¥Å Å¸Ã¨Æ’Â½Ã¤Â¸ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¤ÂºÂºÃ§Å¡â€žÃ¥â€¦ÂÃ¨Â´Â¹Ã¥Â±â€šÃ§ÂºÂ§Ã¦ÂÂÃ¤Â¾â€ºÃ¨Âµâ€žÃ©â€¡â€˜Ã¦â€Â¯Ã¦Å’Â
* **Ã¦â€ºÂ´Ã¥Â¥Â½Ã§Å¡â€žÃ¦â€Â¯Ã¦Å’Â** Ã¢â‚¬â€ Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦Ã¨Å½Â·Ã¥Â¾â€”Ã¤Â¼ËœÃ¥â€¦Ë†Ã¥â€œÂÃ¥Âºâ€
* **Ã¥Â½Â±Ã¥â€œÂÃ¨Â·Â¯Ã§ÂºÂ¿Ã¥â€ºÂ¾** Ã¢â‚¬â€ Pro+ Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦Ã¥ÂÂ¯Ã¤Â»Â¥Ã¥Â¯Â¹Ã¥Å Å¸Ã¨Æ’Â½Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Å â€¢Ã§Â¥Â¨

## Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦Ã¥â€¡â€ Ã¥Â¤â€¡Ã¥ÂºÂ¦Ã¤Â¿Â¡Ã¥ÂÂ·

Ã¥Å“Â¨Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦Ã¥Â¯Â¹Ã¨Â¯ÂÃ¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¿â„¢Ã¤Âºâ€ºÃ¨Â¯ÂÃ¦ËœÅ½Ã§â€šÂ¹Ã¯Â¼Å¡

* `ecc-universal` Ã¥â€™Å’ `ecc-agentshield` Ã§Å¡â€žÃ¥Â®Å¾Ã¦â€”Â¶ npm Ã¥Â®â€°Ã¨Â£â€¦/Ã¤Â¸â€¹Ã¨Â½Â½Ã¦Å’â€¡Ã¦Â â€¡
* Ã©â‚¬Å¡Ã¨Â¿â€¡ Marketplace Ã¥Â®â€°Ã¨Â£â€¦Ã§Å¡â€ž GitHub App Ã¥Ë†â€ Ã¥Ââ€˜
* Ã¥â€¦Â¬Ã¥Â¼â‚¬Ã©â€¡â€¡Ã§â€Â¨Ã¤Â¿Â¡Ã¥ÂÂ·Ã¯Â¼Å¡Ã¦ËœÅ¸Ã¦Â â€¡Ã£â‚¬ÂÃ¥Ë†â€ Ã¥Ââ€°Ã£â‚¬ÂÃ¨Â´Â¡Ã§Å’Â®Ã¨â‚¬â€¦Ã£â‚¬ÂÃ¥Ââ€˜Ã¥Â¸Æ’Ã¨Å â€šÃ¥Â¥Â
* Ã¨Â·Â¨Ã¥Â¹Â³Ã¥ÂÂ°Ã¦â€Â¯Ã¦Å’ÂÃ¯Â¼Å¡Claude CodeÃ£â‚¬ÂCursorÃ£â‚¬ÂOpenCodeÃ£â‚¬ÂCodex Ã¥Âºâ€Ã§â€Â¨/CLI

Ã¦Å“â€°Ã¥â€¦Â³Ã¥Â¤ÂÃ¥Ë†Â¶/Ã§Â²ËœÃ¨Â´Â´Ã¦Å’â€¡Ã¦Â â€¡Ã¦â€¹â€°Ã¥Ââ€“Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦ [`docs/business/metrics-and-sponsorship.md`](../business/metrics-and-sponsorship.md)Ã£â‚¬â€š

## Ã¨ÂµÅ¾Ã¥Å Â©Ã§Â­â€°Ã§ÂºÂ§

| Ã¥Â±â€šÃ§ÂºÂ§ | Ã¤Â»Â·Ã¦Â Â¼ | Ã¦ÂÆ’Ã§â€ºÅ  |
|------|-------|----------|
| Ã¦â€Â¯Ã¦Å’ÂÃ¨â‚¬â€¦ | Ã¦Â¯ÂÃ¦Å“Ë† $5 | Ã¥ÂÂÃ¥Â­â€”Ã¥â€¡ÂºÃ§Å½Â°Ã¥Å“Â¨ README Ã¤Â¸Â­Ã¯Â¼Å’Ã¦â€”Â©Ã¦Å“Å¸Ã¨Â®Â¿Ã©â€”Â® |
| Ã¦Å¾â€žÃ¥Â»ÂºÃ¨â‚¬â€¦ | Ã¦Â¯ÂÃ¦Å“Ë† $10 | Ã©Â«ËœÃ§ÂºÂ§Ã¥Â·Â¥Ã¥â€¦Â·Ã¨Â®Â¿Ã©â€”Â®Ã¦ÂÆ’Ã©â„¢Â |
| Ã¤Â¸â€œÃ¤Â¸Å¡Ã§â€°Ë† | Ã¦Â¯ÂÃ¦Å“Ë† $25 | Ã¤Â¼ËœÃ¥â€¦Ë†Ã¦â€Â¯Ã¦Å’ÂÃ¯Â¼Å’Ã¥Å Å¾Ã¥â€¦Â¬Ã¦â€”Â¶Ã©â€”Â´ |
| Ã¥â€ºÂ¢Ã©ËœÅ¸Ã§â€°Ë† | Ã¦Â¯ÂÃ¦Å“Ë† $100 | 5 Ã¤Â¸ÂªÃ¥Â¸Â­Ã¤Â½ÂÃ¯Â¼Å’Ã¥â€ºÂ¢Ã©ËœÅ¸Ã©â€¦ÂÃ§Â½Â® |
| Ã¥Â¹Â³Ã¥ÂÂ°Ã¥ÂË†Ã¤Â½Å“Ã¤Â¼â„¢Ã¤Â¼Â´ | Ã¦Â¯ÂÃ¦Å“Ë† $200 | Ã¦Å“Ë†Ã¥ÂºÂ¦Ã¨Â·Â¯Ã§ÂºÂ¿Ã¥â€ºÂ¾Ã¥ÂÅ’Ã¦Â­Â¥Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã§Â»Â´Ã¦Å Â¤Ã¨â‚¬â€¦Ã¥ÂÂÃ©Â¦Ë†Ã¯Â¼Å’Ã¥Ââ€˜Ã¥Â¸Æ’Ã¨Â¯Â´Ã¦ËœÅ½Ã¦ÂÂÃ¥ÂÅ  |
| Ã¥â€¢â€ Ã¤Â¸Å¡Ã§â€°Ë† | Ã¦Â¯ÂÃ¦Å“Ë† $500 | 25 Ã¤Â¸ÂªÃ¥Â¸Â­Ã¤Â½ÂÃ¯Â¼Å’Ã¥â€™Â¨Ã¨Â¯Â¢Ã§Â§Â¯Ã¥Ë†â€  |
| Ã¤Â¼ÂÃ¤Â¸Å¡Ã§â€°Ë† | Ã¦Â¯ÂÃ¦Å“Ë† $2K | Ã¦â€”Â Ã©â„¢ÂÃ¥Ë†Â¶Ã¥Â¸Â­Ã¤Â½ÂÃ¯Â¼Å’Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥Â·Â¥Ã¥â€¦Â· |

[**Become a Sponsor Ã¢â€ â€™**](https://github.com/sponsors/affaan-m)

***

*Ã¨â€¡ÂªÃ¥Å Â¨Ã¦â€ºÂ´Ã¦â€“Â°Ã£â‚¬â€šÃ¦Å“â‚¬Ã¥ÂÅ½Ã¥ÂÅ’Ã¦Â­Â¥Ã¯Â¼Å¡2026Ã¥Â¹Â´2Ã¦Å“Ë†*
