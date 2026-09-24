---
paths:
  - "**/*.pl"
  - "**/*.pm"
  - "**/*.t"
  - "**/*.psgi"
  - "**/*.cgi"
---

# Perl Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/coding-style.md](../common/coding-style.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¯Â¼Å’Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  Perl Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â â€¡Ã¥â€¡â€ 

* Ã¥Â§â€¹Ã§Â»Ë† `use v5.36`Ã¯Â¼Ë†Ã¥ÂÂ¯Ã§â€Â¨ `strict`Ã£â‚¬Â`warnings`Ã£â‚¬Â`say` Ã¥â€™Å’Ã¥Â­ÂÃ§Â¨â€¹Ã¥ÂºÂÃ§Â­Â¾Ã¥ÂÂÃ¯Â¼â€°
* Ã¤Â½Â¿Ã§â€Â¨Ã¥Â­ÂÃ§Â¨â€¹Ã¥ÂºÂÃ§Â­Â¾Ã¥ÂÂ Ã¢â‚¬â€ Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¦â€°â€¹Ã¥Å Â¨Ã¨Â§Â£Ã¥Å’â€¦ `@_`
* Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `say` Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦ËœÂ¾Ã¥Â¼ÂÃ¦ÂÂ¢Ã¨Â¡Å’Ã§Å¡â€ž `print`

## Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§

* Ã¥Â¯Â¹Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â±Å¾Ã¦â‚¬Â§Ã¤Â½Â¿Ã§â€Â¨ **Moo**Ã¯Â¼Å’Ã¥Â¹Â¶Ã©â€¦ÂÃ¥ÂË† `is => 'ro'` Ã¥â€™Å’ `Types::Standard`
* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã§â€ºÂ´Ã¦Å½Â¥Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¢Â«Ã§Â¥ÂÃ§Â¦ÂÃ§Å¡â€žÃ¥â€œË†Ã¥Â¸Å’Ã¥Â¼â€¢Ã§â€Â¨ Ã¢â‚¬â€ Ã¥Â§â€¹Ã§Â»Ë†Ã©â‚¬Å¡Ã¨Â¿â€¡ Moo/Moose Ã¨Â®Â¿Ã©â€”Â®Ã¥â„¢Â¨
* **Ã©ÂÂ¢Ã¥Ââ€˜Ã¥Â¯Â¹Ã¨Â±Â¡Ã¨Â¦â€ Ã§â€ºâ€“Ã¨Â¯Â´Ã¦ËœÅ½**Ã¯Â¼Å¡Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¨Â®Â¡Ã§Â®â€”Ã¥Â¾â€”Ã¥â€¡ÂºÃ§Å¡â€žÃ¥ÂÂªÃ¨Â¯Â»Ã¥â‚¬Â¼Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ Moo `has` Ã¥Â±Å¾Ã¦â‚¬Â§Ã¥Â¹Â¶Ã©â€¦ÂÃ¥ÂË† `builder` Ã¦Ë†â€“ `default` Ã¦ËœÂ¯Ã¥ÂÂ¯Ã¤Â»Â¥Ã¦Å½Â¥Ã¥Ââ€”Ã§Å¡â€ž

## Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

Ã¤Â½Â¿Ã§â€Â¨ **perltidy** Ã¥Â¹Â¶Ã©â€¡â€¡Ã§â€Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¨Â®Â¾Ã§Â½Â®Ã¯Â¼Å¡

```
-i=4    # 4 Ã§Â©ÂºÃ¦Â Â¼Ã§Â¼Â©Ã¨Â¿â€º
-l=100  # 100 Ã¥Â­â€”Ã§Â¬Â¦Ã¨Â¡Å’Ã¥Â®Â½
-ce     # else Ã§Â´Â§Ã¨Â´Â´Ã¥â€°ÂÃ¦â€¹Â¬Ã¥ÂÂ·
-bar    # Ã¥Â·Â¦Ã¨Å Â±Ã¦â€¹Â¬Ã¥ÂÂ·Ã¥Â§â€¹Ã§Â»Ë†Ã¥Å“Â¨Ã¥ÂÂ³Ã¤Â¾Â§
```

## Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥

Ã¤Â½Â¿Ã§â€Â¨ **perlcritic**Ã¯Â¼Å’Ã¤Â¸Â¥Ã©â€¡ÂÃ§ÂºÂ§Ã¥Ë†Â«Ã¨Â®Â¾Ã¤Â¸Âº 3Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥ÂÂ¯Ã§â€Â¨Ã¤Â¸Â»Ã©Â¢ËœÃ¯Â¼Å¡`core`Ã£â‚¬Â`pbp`Ã£â‚¬Â`security`Ã£â‚¬â€š

```bash
perlcritic --severity 3 --theme 'core || pbp || security' lib/
```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`perl-patterns`Ã¯Â¼Å’Ã¤Âºâ€ Ã¨Â§Â£Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ§Å½Â°Ã¤Â»Â£ Perl Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢Ã¥â€™Å’Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·ÂµÃ£â‚¬â€š
