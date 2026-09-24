---
paths:
  - "**/*.php"
  - "**/composer.lock"
  - "**/composer.json"
---

# PHP Ã¥Â®â€°Ã¥â€¦Â¨

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/security.md](../common/security.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¯Â¼Å’Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  PHP Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¨Â¾â€œÃ¥â€¦Â¥Ã¤Â¸Å½Ã¨Â¾â€œÃ¥â€¡Âº

* Ã¥Å“Â¨Ã¦Â¡â€ Ã¦Å¾Â¶Ã¨Â¾Â¹Ã§â€¢Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¨Â¯Â·Ã¦Â±â€šÃ¨Â¾â€œÃ¥â€¦Â¥Ã¯Â¼Ë†`FormRequest`Ã£â‚¬ÂSymfony Validator Ã¦Ë†â€“Ã¦ËœÂ¾Ã¥Â¼Â DTO Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼â€°Ã£â‚¬â€š
* Ã©Â»ËœÃ¨Â®Â¤Ã¥Å“Â¨Ã¦Â¨Â¡Ã¦ÂÂ¿Ã¤Â¸Â­Ã¨Â½Â¬Ã¤Â¹â€°Ã¨Â¾â€œÃ¥â€¡ÂºÃ¯Â¼â€ºÃ¥Â°â€ Ã¥Å½Å¸Ã¥Â§â€¹ HTML Ã¦Â¸Â²Ã¦Å¸â€œÃ¨Â§â€ Ã¤Â¸ÂºÃ©Å“â‚¬Ã¨Â¦ÂÃ¥ÂË†Ã§Ââ€ Ã¨Â§Â£Ã©â€¡Å Ã§Å¡â€žÃ¤Â¾â€¹Ã¥Â¤â€“Ã¦Æ’â€¦Ã¥â€ ÂµÃ£â‚¬â€š
* Ã¦Å“ÂªÃ§Â»ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Å’Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¤Â¿Â¡Ã¤Â»Â»Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¥Ââ€šÃ¦â€¢Â°Ã£â‚¬ÂCookieÃ£â‚¬ÂÃ¨Â¯Â·Ã¦Â±â€šÃ¥Â¤Â´Ã¦Ë†â€“Ã¤Â¸Å Ã¤Â¼Â Ã¦â€“â€¡Ã¤Â»Â¶Ã§Å¡â€žÃ¥â€¦Æ’Ã¦â€¢Â°Ã¦ÂÂ®Ã£â‚¬â€š

## Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¥Â®â€°Ã¥â€¦Â¨

* Ã¥Â¯Â¹Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Å Â¨Ã¦â‚¬ÂÃ¦Å¸Â¥Ã¨Â¯Â¢Ã¤Â½Â¿Ã§â€Â¨Ã©Â¢â€žÃ¥Â¤â€žÃ§Ââ€ Ã¨Â¯Â­Ã¥ÂÂ¥Ã¯Â¼Ë†`PDO`Ã£â‚¬ÂDoctrineÃ£â‚¬ÂEloquent Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â„¢Â¨Ã¯Â¼â€°Ã£â‚¬â€š
* Ã©ÂÂ¿Ã¥â€¦ÂÃ¥Å“Â¨Ã¦Å½Â§Ã¥Ë†Â¶Ã¥â„¢Â¨/Ã¨Â§â€ Ã¥â€ºÂ¾Ã¤Â¸Â­Ã¦â€¹Â¼Ã¦Å½Â¥ SQL Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã£â‚¬â€š
* Ã¨Â°Â¨Ã¦â€¦Å½Ã©â„¢ÂÃ¥Â®Å¡ ORM Ã¦â€°Â¹Ã©â€¡ÂÃ¨Âµâ€¹Ã¥â‚¬Â¼Ã¨Å’Æ’Ã¥â€ºÂ´Ã¯Â¼Å’Ã¥Â¹Â¶Ã¦ËœÅ½Ã§Â¡Â®Ã¥Ë†â€”Ã¥â€¡ÂºÃ¥ÂÂ¯Ã¥â€ â„¢Ã¥â€¦Â¥Ã¥Â­â€”Ã¦Â®ÂµÃ§Å¡â€žÃ§â„¢Â½Ã¥ÂÂÃ¥Ââ€¢Ã£â‚¬â€š

## Ã¥Â¯â€ Ã©â€™Â¥Ã¤Â¸Å½Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹

* Ã¤Â»Å½Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¦Ë†â€“Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¤Â¸Â­Ã¥Å Â Ã¨Â½Â½Ã¥Â¯â€ Ã©â€™Â¥Ã¯Â¼Å’Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¤Â»Å½Ã¥Â·Â²Ã¦ÂÂÃ¤ÂºÂ¤Ã§Å¡â€žÃ©â€¦ÂÃ§Â½Â®Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Â­Ã¨Â¯Â»Ã¥Ââ€“Ã£â‚¬â€š
* Ã¥Å“Â¨ CI Ã¤Â¸Â­Ã¨Â¿ÂÃ¨Â¡Å’ `composer audit`Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Å“Â¨Ã¦Â·Â»Ã¥Å Â Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¥â€°ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¦â€“Â°Ã¥Å’â€¦Ã§Â»Â´Ã¦Å Â¤Ã¨â‚¬â€¦Ã§Å¡â€žÃ¥ÂÂ¯Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã£â‚¬â€š
* Ã¥Â®Â¡Ã¦â€¦Å½Ã©â€ÂÃ¥Â®Å¡Ã¤Â¸Â»Ã§â€°Ë†Ã¦Å“Â¬Ã¥ÂÂ·Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥ÂÅ Ã¦â€”Â¶Ã§Â§Â»Ã©â„¢Â¤Ã¥Â·Â²Ã¥ÂºÅ¸Ã¥Â¼Æ’Ã§Å¡â€žÃ¥Å’â€¦Ã£â‚¬â€š

## Ã¨Â®Â¤Ã¨Â¯ÂÃ¤Â¸Å½Ã¤Â¼Å¡Ã¨Â¯ÂÃ¥Â®â€°Ã¥â€¦Â¨

* Ã¤Â½Â¿Ã§â€Â¨ `password_hash()` / `password_verify()` Ã¥Â­ËœÃ¥â€šÂ¨Ã¥Â¯â€ Ã§Â ÂÃ£â‚¬â€š
* Ã¥Å“Â¨Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â€™Å’Ã¦ÂÆ’Ã©â„¢ÂÃ¥ÂËœÃ¦â€ºÂ´Ã¥ÂÅ½Ã©â€¡ÂÃ¦â€“Â°Ã§â€Å¸Ã¦Ë†ÂÃ¤Â¼Å¡Ã¨Â¯ÂÃ¦Â â€¡Ã¨Â¯â€ Ã§Â¬Â¦Ã£â‚¬â€š
* Ã¥Â¯Â¹Ã§Å Â¶Ã¦â‚¬ÂÃ¥ÂËœÃ¦â€ºÂ´Ã§Å¡â€ž Web Ã¨Â¯Â·Ã¦Â±â€šÃ¥Â¼ÂºÃ¥Ë†Â¶Ã¥Â®Å¾Ã¦â€“Â½ CSRF Ã¤Â¿ÂÃ¦Å Â¤Ã£â‚¬â€š

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å“â€°Ã¥â€¦Â³ Laravel Ã§â€°Â¹Ã¥Â®Å¡Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å’â€¡Ã¥Ââ€”Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`laravel-security`Ã£â‚¬â€š
