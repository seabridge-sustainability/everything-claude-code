---
paths:
  - "**/*.php"
  - "**/composer.json"
---

# PHP Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

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


> Ã¦Â­Â¤Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Å“Â¨ [common/coding-style.md](../common/coding-style.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  PHP Ã§â€ºÂ¸Ã¥â€¦Â³Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â â€¡Ã¥â€¡â€ 

* Ã©ÂÂµÃ¥Â¾Âª **PSR-12** Ã§Å¡â€žÃ¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã¥â€™Å’Ã¥â€˜Â½Ã¥ÂÂÃ§ÂºÂ¦Ã¥Â®Å¡Ã£â‚¬â€š
* Ã¥Å“Â¨Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `declare(strict_types=1);`Ã£â‚¬â€š
* Ã¥Å“Â¨Ã¦â€°â‚¬Ã¦Å“â€°Ã¦â€“Â°Ã¤Â»Â£Ã§Â ÂÃ¥â€¦ÂÃ¨Â®Â¸Ã§Å¡â€žÃ¥Å“Â°Ã¦â€“Â¹Ã¤Â½Â¿Ã§â€Â¨Ã¦Â â€¡Ã©â€¡ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¦ÂÂÃ§Â¤ÂºÃ£â‚¬ÂÃ¨Â¿â€Ã¥â€ºÅ¾Ã§Â±Â»Ã¥Å¾â€¹Ã¥â€™Å’Ã§Â±Â»Ã¥Å¾â€¹Ã¥Å’â€“Ã¥Â±Å¾Ã¦â‚¬Â§Ã£â‚¬â€š

## Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§

* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¨Â·Â¨Ã¨Â¶Å Ã¦Å“ÂÃ¥Å Â¡Ã¨Â¾Â¹Ã§â€¢Å’Ã§Å¡â€žÃ¦â€¢Â°Ã¦ÂÂ®Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ§Å¡â€ž DTO Ã¥â€™Å’Ã¥â‚¬Â¼Ã¥Â¯Â¹Ã¨Â±Â¡Ã£â‚¬â€š
* Ã¥Å“Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã§Å¡â€žÃ¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¯Â¼Å’Ã¥Â¯Â¹Ã¨Â¯Â·Ã¦Â±â€š/Ã¥â€œÂÃ¥Âºâ€Ã¨Â´Å¸Ã¨Â½Â½Ã¤Â½Â¿Ã§â€Â¨ `readonly` Ã¥Â±Å¾Ã¦â‚¬Â§Ã¦Ë†â€“Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã£â‚¬â€š
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã§Â®â‚¬Ã¥Ââ€¢Ã§Å¡â€žÃ¦ËœÂ Ã¥Â°â€žÃ¤Â½Â¿Ã§â€Â¨Ã¦â€¢Â°Ã§Â»â€žÃ¯Â¼â€ºÃ¥Â°â€ Ã¤Â¸Å¡Ã¥Å Â¡Ã¥â€¦Â³Ã©â€Â®Ã§Å¡â€žÃ§Â»â€œÃ¦Å¾â€žÃ¦ÂÂÃ¥Ââ€¡Ã¤Â¸ÂºÃ¦ËœÂ¾Ã¥Â¼ÂÃ§Â±Â»Ã£â‚¬â€š

## Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

* Ã¤Â½Â¿Ã§â€Â¨ **PHP-CS-Fixer** Ã¦Ë†â€“ **Laravel Pint** Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã£â‚¬â€š
* Ã¤Â½Â¿Ã§â€Â¨ **PHPStan** Ã¦Ë†â€“ **Psalm** Ã¨Â¿â€ºÃ¨Â¡Å’Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾ÂÃ£â‚¬â€š
* Ã¥Â°â€  Composer Ã¨â€žÅ¡Ã¦Å“Â¬Ã§ÂºÂ³Ã¥â€¦Â¥Ã§â€°Ë†Ã¦Å“Â¬Ã¦Å½Â§Ã¥Ë†Â¶Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¾Â¿Ã¥Å“Â¨Ã¦Å“Â¬Ã¥Å“Â°Ã¥â€™Å’ CI Ã¤Â¸Â­Ã¨Â¿ÂÃ¨Â¡Å’Ã§â€ºÂ¸Ã¥ÂÅ’Ã§Å¡â€žÃ¥â€˜Â½Ã¤Â»Â¤Ã£â‚¬â€š

## Ã¥Â¯Â¼Ã¥â€¦Â¥

* Ã¤Â¸ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¥Â¼â€¢Ã§â€Â¨Ã§Å¡â€žÃ§Â±Â»Ã£â‚¬ÂÃ¦Å½Â¥Ã¥ÂÂ£Ã¥â€™Å’Ã§â€°Â¹Ã¥Â¾ÂÃ¦Â·Â»Ã¥Å Â  `use` Ã¨Â¯Â­Ã¥ÂÂ¥Ã£â‚¬â€š
* Ã©ÂÂ¿Ã¥â€¦ÂÃ¤Â¾ÂÃ¨Âµâ€“Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥â€˜Â½Ã¥ÂÂÃ§Â©ÂºÃ©â€”Â´Ã¯Â¼Å’Ã©â„¢Â¤Ã©ÂÅ¾Ã©Â¡Â¹Ã§â€ºÂ®Ã¦ËœÅ½Ã§Â¡Â®Ã¥ÂÂÃ¥Â¥Â½Ã¤Â½Â¿Ã§â€Â¨Ã¥Â®Å’Ã¥â€¦Â¨Ã©â„¢ÂÃ¥Â®Å¡Ã¥ÂÂÃ§Â§Â°Ã£â‚¬â€š

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥Â¼â€šÃ¥Â¸Â¸Ã§Å Â¶Ã¦â‚¬ÂÃ¦Å â€ºÃ¥â€¡ÂºÃ¥Â¼â€šÃ¥Â¸Â¸Ã¯Â¼â€ºÃ©ÂÂ¿Ã¥â€¦ÂÃ¥Å“Â¨Ã¦â€“Â°Ã¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¨Â¿â€Ã¥â€ºÅ¾ `false`/`null` Ã¤Â½Å“Ã¤Â¸ÂºÃ©Å¡ÂÃ¨â€”ÂÃ§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã©â‚¬Å¡Ã©Ââ€œÃ£â‚¬â€š
* Ã¥Å“Â¨Ã¦Â¡â€ Ã¦Å¾Â¶/Ã¨Â¯Â·Ã¦Â±â€šÃ¨Â¾â€œÃ¥â€¦Â¥Ã¥Ë†Â°Ã¨Â¾Â¾Ã©Â¢â€ Ã¥Å¸Å¸Ã©â‚¬Â»Ã¨Â¾â€˜Ã¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å’Ã¥Â°â€ Ã¥â€¦Â¶Ã¨Â½Â¬Ã¦ÂÂ¢Ã¤Â¸ÂºÃ§Â»ÂÃ¨Â¿â€¡Ã©ÂªÅ’Ã¨Â¯ÂÃ§Å¡â€ž DTOÃ£â‚¬â€š

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å“â€°Ã¥â€¦Â³Ã¦â€ºÂ´Ã¥Â¹Â¿Ã¦Â³â€ºÃ§Å¡â€žÃ¦Å“ÂÃ¥Å Â¡/Ã¤Â»â€œÃ¥Âºâ€œÃ¥Ë†â€ Ã¥Â±â€šÃ¦Å’â€¡Ã¥Â¯Â¼Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`backend-patterns`Ã£â‚¬â€š
