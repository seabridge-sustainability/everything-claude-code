---
paths:
  - "**/*.php"
  - "**/composer.lock"
  - "**/composer.json"
---

# PHP Ã¥Â®â€°Ã¥â€¦Â¨

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
