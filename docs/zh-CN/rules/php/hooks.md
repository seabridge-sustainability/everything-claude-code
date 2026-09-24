---
paths:
  - "**/*.php"
  - "**/composer.json"
  - "**/phpstan.neon"
  - "**/phpstan.neon.dist"
  - "**/psalm.xml"
---

# PHP Ã©â€™Â©Ã¥Â­Â

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


> Ã¦Â­Â¤Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Å“Â¨ [common/hooks.md](../common/hooks.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  PHP Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## PostToolUse Ã©â€™Â©Ã¥Â­Â

Ã¥Å“Â¨ `~/.claude/settings.json` Ã¤Â¸Â­Ã©â€¦ÂÃ§Â½Â®Ã¯Â¼Å¡

* **Pint / PHP-CS-Fixer**Ã¯Â¼Å¡Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã§Â¼â€“Ã¨Â¾â€˜Ã¨Â¿â€¡Ã§Å¡â€ž `.php` Ã¦â€“â€¡Ã¤Â»Â¶Ã£â‚¬â€š
* **PHPStan / Psalm**Ã¯Â¼Å¡Ã¥Å“Â¨Ã§Â±Â»Ã¥Å¾â€¹Ã¥Å’â€“Ã¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ¤Â¸Â­Ã¥Â¯Â¹Ã§Â¼â€“Ã¨Â¾â€˜Ã¨Â¿â€¡Ã§Å¡â€ž PHP Ã¦â€“â€¡Ã¤Â»Â¶Ã¨Â¿ÂÃ¨Â¡Å’Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾ÂÃ£â‚¬â€š
* **PHPUnit / Pest**Ã¯Â¼Å¡Ã¥Â½â€œÃ§Â¼â€“Ã¨Â¾â€˜Ã¥Â½Â±Ã¥â€œÂÃ¥Ë†Â°Ã¨Â¡Å’Ã¤Â¸ÂºÃ¦â€”Â¶Ã¯Â¼Å’Ã¤Â¸ÂºÃ¨Â¢Â«Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¦Ë†â€“Ã¦Â¨Â¡Ã¥Ââ€”Ã¨Â¿ÂÃ¨Â¡Å’Ã©â€™Ë†Ã¥Â¯Â¹Ã¦â‚¬Â§Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€š

## Ã¨Â­Â¦Ã¥â€˜Å 

* Ã¥Â½â€œÃ§Â¼â€“Ã¨Â¾â€˜Ã¨Â¿â€¡Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Â­Ã¥Â­ËœÃ¥Å“Â¨ `var_dump`Ã£â‚¬Â`dd`Ã£â‚¬Â`dump` Ã¦Ë†â€“ `die()` Ã¦â€”Â¶Ã¥Ââ€˜Ã¥â€¡ÂºÃ¨Â­Â¦Ã¥â€˜Å Ã£â‚¬â€š
* Ã¥Â½â€œÃ§Â¼â€“Ã¨Â¾â€˜Ã§Å¡â€ž PHP Ã¦â€“â€¡Ã¤Â»Â¶Ã¦Â·Â»Ã¥Å Â Ã¤Âºâ€ Ã¥Å½Å¸Ã¥Â§â€¹ SQL Ã¦Ë†â€“Ã§Â¦ÂÃ§â€Â¨Ã¤Âºâ€  CSRF/Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¿ÂÃ¦Å Â¤Ã¦â€”Â¶Ã¥Ââ€˜Ã¥â€¡ÂºÃ¨Â­Â¦Ã¥â€˜Å Ã£â‚¬â€š
