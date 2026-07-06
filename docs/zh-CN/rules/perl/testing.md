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

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
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
