---
paths:
  - "**/*.php"
  - "**/phpunit.xml"
  - "**/phpunit.xml.dist"
  - "**/composer.json"
---

# PHP Ã¦Âµâ€¹Ã¨Â¯â€¢

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/testing.md](../common/testing.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¯Â¼Å’Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  PHP Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¡â€ Ã¦Å¾Â¶

Ã¤Â½Â¿Ã§â€Â¨ **PHPUnit** Ã¤Â½Å“Ã¤Â¸ÂºÃ©Â»ËœÃ¨Â®Â¤Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¡â€ Ã¦Å¾Â¶Ã£â‚¬â€šÃ¥Â¦â€šÃ¦Å¾Å“Ã©Â¡Â¹Ã§â€ºÂ®Ã¤Â¸Â­Ã©â€¦ÂÃ§Â½Â®Ã¤Âºâ€  **Pest**Ã¯Â¼Å’Ã¥Ë†â„¢Ã¦â€“Â°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ PestÃ¯Â¼Å’Ã¥Â¹Â¶Ã©ÂÂ¿Ã¥â€¦ÂÃ¦Â·Â·Ã¥ÂË†Ã¤Â½Â¿Ã§â€Â¨Ã¦Â¡â€ Ã¦Å¾Â¶Ã£â‚¬â€š

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

```bash
vendor/bin/phpunit --coverage-text
# or
vendor/bin/pest --coverage
```

Ã¥Å“Â¨ CI Ã¤Â¸Â­Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ **pcov** Ã¦Ë†â€“ **Xdebug**Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Â°â€ Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã©ËœË†Ã¥â‚¬Â¼Ã¨Â®Â¾Ã§Â½Â®Ã¥Å“Â¨ CI Ã¤Â¸Â­Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¤Â½Å“Ã¤Â¸ÂºÃ¥â€ºÂ¢Ã©ËœÅ¸Ã¥â€ â€¦Ã©Æ’Â¨Ã§Å¡â€žÃ©Å¡ÂÃ¦â‚¬Â§Ã§Å¸Â¥Ã¨Â¯â€ Ã£â‚¬â€š

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â»â€žÃ§Â»â€¡

* Ã¥Â°â€ Ã¥Â¿Â«Ã©â‚¬Å¸Ã§Å¡â€žÃ¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Å½Ã¦Â¶â€°Ã¥ÂÅ Ã¦Â¡â€ Ã¦Å¾Â¶/Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ§Å¡â€žÃ©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¥Ë†â€ Ã¥Â¼â‚¬Ã£â‚¬â€š
* Ã¤Â½Â¿Ã§â€Â¨Ã¥Â·Â¥Ã¥Å½â€š/Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â„¢Â¨Ã¦ÂÂ¥Ã§â€Å¸Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€¢Â°Ã¦ÂÂ®Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¦â€°â€¹Ã¥Å Â¨Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â¤Â§Ã©â€¡ÂÃ§Å¡â€žÃ¦â€¢Â°Ã§Â»â€žÃ£â‚¬â€š
* Ã¤Â¿ÂÃ¦Å’Â HTTP/Ã¦Å½Â§Ã¥Ë†Â¶Ã¥â„¢Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸â€œÃ¦Â³Â¨Ã¤ÂºÅ½Ã¤Â¼Â Ã¨Â¾â€œÃ¥â€™Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼â€ºÃ¥Â°â€ Ã¤Â¸Å¡Ã¥Å Â¡Ã¨Â§â€žÃ¥Ë†â„¢Ã§Â§Â»Ã¥Ë†Â°Ã¦Å“ÂÃ¥Å Â¡Ã¥Â±â€šÃ§ÂºÂ§Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Â­Ã£â‚¬â€š

## Inertia

Ã¥Â¦â€šÃ¦Å¾Å“Ã©Â¡Â¹Ã§â€ºÂ®Ã¤Â½Â¿Ã§â€Â¨Ã¤Âºâ€  Inertia.jsÃ¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `assertInertia` Ã¦ÂÂ­Ã©â€¦Â `AssertableInertia` Ã¦ÂÂ¥Ã©ÂªÅ’Ã¨Â¯ÂÃ§Â»â€žÃ¤Â»Â¶Ã¥ÂÂÃ§Â§Â°Ã¥â€™Å’Ã¥Â±Å¾Ã¦â‚¬Â§Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¥Å½Å¸Ã¥Â§â€¹Ã§Å¡â€ž JSON Ã¦â€“Â­Ã¨Â¨â‚¬Ã£â‚¬â€š

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`tdd-workflow` Ã¤Â»Â¥Ã¤Âºâ€ Ã¨Â§Â£Ã©Â¡Â¹Ã§â€ºÂ®Ã¨Å’Æ’Ã¥â€ºÂ´Ã¥â€ â€¦Ã§Å¡â€ž RED -> GREEN -> REFACTOR Ã¥Â¾ÂªÃ§Å½Â¯Ã£â‚¬â€š
Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`laravel-tdd` Ã¤Â»Â¥Ã¤Âºâ€ Ã¨Â§Â£ Laravel Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Ë†PHPUnit Ã¥â€™Å’ PestÃ¯Â¼â€°Ã£â‚¬â€š
