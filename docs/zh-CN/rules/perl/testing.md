---
paths:
  - "**/*.pl"
  - "**/*.pm"
  - "**/*.t"
  - "**/*.psgi"
  - "**/*.cgi"
---

# Perl Ã¦Âµâ€¹Ã¨Â¯â€¢

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/testing.md](../common/testing.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€ Ã©â€™Ë†Ã¥Â¯Â¹ Perl Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â¡â€ Ã¦Å¾Â¶

Ã¥Å“Â¨Ã¦â€“Â°Ã©Â¡Â¹Ã§â€ºÂ®Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ **Test2::V0**Ã¯Â¼Ë†Ã¨â‚¬Å’Ã©ÂÅ¾ Test::MoreÃ¯Â¼â€°Ã¯Â¼Å¡

```perl
use Test2::V0;

is($result, 42, 'answer is correct');

done_testing;
```

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¿ÂÃ¨Â¡Å’Ã¥â„¢Â¨

```bash
prove -l t/              # adds lib/ to @INC
prove -lr -j8 t/         # recursive, 8 parallel jobs
```

Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨ `-l` Ã¤Â»Â¥Ã§Â¡Â®Ã¤Â¿Â `lib/` Ã¤Â½ÂÃ¤ÂºÅ½ `@INC` Ã¤Â¸Å Ã£â‚¬â€š

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

Ã¤Â½Â¿Ã§â€Â¨ **Devel::Cover** Ã¢â‚¬â€Ã¢â‚¬â€ Ã§â€ºÂ®Ã¦Â â€¡Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡ 80%+Ã¯Â¼Å¡

```bash
cover -test
```

## Ã¦Â¨Â¡Ã¦â€¹Å¸

* **Test::MockModule** Ã¢â‚¬â€Ã¢â‚¬â€ Ã¦Â¨Â¡Ã¦â€¹Å¸Ã§Å½Â°Ã¦Å“â€°Ã¦Â¨Â¡Ã¥Ââ€”Ã¤Â¸Å Ã§Å¡â€žÃ¦â€“Â¹Ã¦Â³â€¢
* **Test::MockObject** Ã¢â‚¬â€Ã¢â‚¬â€ Ã¤Â»Å½Ã¥Â¤Â´Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€ºÂ¿Ã¨ÂºÂ«

## Ã¥Â¸Â¸Ã¨Â§ÂÃ©â„¢Â·Ã©ËœÂ±

* Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€“â€¡Ã¤Â»Â¶Ã¦Å“Â«Ã¥Â°Â¾Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨ `done_testing`
* Ã¤Â½Â¿Ã§â€Â¨ `prove` Ã¦â€”Â¶Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Â¿ËœÃ¨Â®Â° `-l` Ã¦Â â€¡Ã¥Â¿â€”

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å“â€°Ã¥â€¦Â³Ã¤Â½Â¿Ã§â€Â¨ Test2::V0Ã£â‚¬Âprove Ã¥â€™Å’ Devel::Cover Ã§Å¡â€žÃ¨Â¯Â¦Ã§Â»â€  Perl TDD Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`perl-testing`Ã£â‚¬â€š
