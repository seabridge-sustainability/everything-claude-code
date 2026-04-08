---
paths:
  - "**/*.php"
  - "**/composer.json"
---

# PHP Ã¨Â®Â¾Ã¨Â®Â¡Ã¦Â¨Â¡Ã¥Â¼Â

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/patterns.md](../common/patterns.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¯Â¼Å’Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  PHP Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã§Â²Â¾Ã§â€šÂ¼Ã¦Å½Â§Ã¥Ë†Â¶Ã¥â„¢Â¨Ã¯Â¼Å’Ã¦ËœÅ½Ã§Â¡Â®Ã¦Å“ÂÃ¥Å Â¡

* Ã¤Â¿ÂÃ¦Å’ÂÃ¦Å½Â§Ã¥Ë†Â¶Ã¥â„¢Â¨Ã¤Â¸â€œÃ¦Â³Â¨Ã¤ÂºÅ½Ã¤Â¼Â Ã¨Â¾â€œÃ¥Â±â€šÃ¯Â¼Å¡Ã¨Â®Â¤Ã¨Â¯ÂÃ£â‚¬ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬ÂÃ¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“Ã£â‚¬ÂÃ§Å Â¶Ã¦â‚¬ÂÃ§Â ÂÃ£â‚¬â€š
* Ã¥Â°â€ Ã¤Â¸Å¡Ã¥Å Â¡Ã¨Â§â€žÃ¥Ë†â„¢Ã§Â§Â»Ã¨â€¡Â³Ã¥Âºâ€Ã§â€Â¨/Ã©Â¢â€ Ã¥Å¸Å¸Ã¦Å“ÂÃ¥Å Â¡Ã¤Â¸Â­Ã¯Â¼Å’Ã¨Â¿â„¢Ã¤Âºâ€ºÃ¦Å“ÂÃ¥Å Â¡Ã¦â€”Â Ã©Å“â‚¬ HTTP Ã¥Â¼â€¢Ã¥Â¯Â¼Ã¥ÂÂ³Ã¥ÂÂ¯Ã¨Â½Â»Ã¦ÂÂ¾Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€š

## DTO Ã¤Â¸Å½Ã¥â‚¬Â¼Ã¥Â¯Â¹Ã¨Â±Â¡

* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¨Â¯Â·Ã¦Â±â€šÃ£â‚¬ÂÃ¥â€˜Â½Ã¤Â»Â¤Ã¥â€™Å’Ã¥Â¤â€“Ã©Æ’Â¨ API Ã¨Â´Å¸Ã¨Â½Â½Ã¯Â¼Å’Ã§â€Â¨ DTO Ã¦â€ºÂ¿Ã¤Â»Â£Ã§Â»â€œÃ¦Å¾â€žÃ¥Â¤ÂÃ¦Ââ€šÃ§Å¡â€žÃ¥â€¦Â³Ã¨Ââ€Ã¦â€¢Â°Ã§Â»â€žÃ£â‚¬â€š
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¨Â´Â§Ã¥Â¸ÂÃ£â‚¬ÂÃ¦Â â€¡Ã¨Â¯â€ Ã§Â¬Â¦Ã£â‚¬ÂÃ¦â€”Â¥Ã¦Å“Å¸Ã¨Å’Æ’Ã¥â€ºÂ´Ã¥â€™Å’Ã¥â€¦Â¶Ã¤Â»â€“Ã¥Ââ€”Ã§ÂºÂ¦Ã¦ÂÅ¸Ã§Å¡â€žÃ¦Â¦â€šÃ¥Â¿ÂµÃ¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¥â‚¬Â¼Ã¥Â¯Â¹Ã¨Â±Â¡Ã£â‚¬â€š

## Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥

* Ã¤Â¾ÂÃ¨Âµâ€“Ã¤ÂºÅ½Ã¦Å½Â¥Ã¥ÂÂ£Ã¦Ë†â€“Ã§Â²Â¾Ã§Â®â‚¬Ã§Å¡â€žÃ¦Å“ÂÃ¥Å Â¡Ã¥Â¥â€˜Ã§ÂºÂ¦Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦Â¡â€ Ã¦Å¾Â¶Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥ÂËœÃ©â€¡ÂÃ£â‚¬â€š
* Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã¤Â¼Â Ã©â‚¬â€™Ã¥ÂÂÃ¤Â½Å“Ã¨â‚¬â€¦Ã¯Â¼Å’Ã¨Â¿â„¢Ã¦Â Â·Ã¦Å“ÂÃ¥Å Â¡Ã¥Â°Â±Ã¦â€”Â Ã©Å“â‚¬Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Å“ÂÃ¥Å Â¡Ã¥Â®Å¡Ã¤Â½ÂÃ¥â„¢Â¨Ã¦Å¸Â¥Ã¦â€°Â¾Ã¯Â¼Å’Ã¦Ëœâ€œÃ¤ÂºÅ½Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€š

## Ã¨Â¾Â¹Ã§â€¢Å’

* Ã¥Â½â€œÃ¦Â¨Â¡Ã¥Å¾â€¹Ã¥Â±â€šÃ¨ÂÅ’Ã¨Â´Â£Ã¨Â¶â€¦Ã¥â€¡ÂºÃ¦Å’ÂÃ¤Â¹â€¦Ã¥Å’â€“Ã¦â€”Â¶Ã¯Â¼Å’Ã¥Âºâ€Ã¥Â°â€  ORM Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¤Â¸Å½Ã©Â¢â€ Ã¥Å¸Å¸Ã¥â€ Â³Ã§Â­â€“Ã©Å¡â€Ã§Â¦Â»Ã£â‚¬â€š
* Ã¥Â°â€ Ã§Â¬Â¬Ã¤Â¸â€°Ã¦â€“Â¹ SDK Ã¥Â°ÂÃ¨Â£â€¦Ã¥Å“Â¨Ã¥Â°ÂÃ¥Å¾â€¹Ã§Å¡â€žÃ©â‚¬â€šÃ©â€¦ÂÃ¥â„¢Â¨Ã¤Â¹â€¹Ã¥ÂÅ½Ã¯Â¼Å’Ã¤Â½Â¿Ã¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ§Å¡â€žÃ¥â€¦Â¶Ã¤Â½â„¢Ã©Æ’Â¨Ã¥Ë†â€ Ã¤Â¾ÂÃ¨Âµâ€“Ã¤ÂºÅ½Ã¤Â½Â Ã§Å¡â€žÃ¥Â¥â€˜Ã§ÂºÂ¦Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â®Æ’Ã¤Â»Â¬Ã§Å¡â€žÃ£â‚¬â€š

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¥Ââ€šÃ¨Â§ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`api-design` Ã¤Âºâ€ Ã¨Â§Â£Ã§Â«Â¯Ã§â€šÂ¹Ã§ÂºÂ¦Ã¥Â®Å¡Ã¥â€™Å’Ã¥â€œÂÃ¥Âºâ€Ã¦Â Â¼Ã¥Â¼ÂÃ¦Å’â€¡Ã¥Â¯Â¼Ã£â‚¬â€š
Ã¥Ââ€šÃ¨Â§ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`laravel-patterns` Ã¤Âºâ€ Ã¨Â§Â£ Laravel Ã§â€°Â¹Ã¥Â®Å¡Ã¦Å¾Â¶Ã¦Å¾â€žÃ¦Å’â€¡Ã¥Â¯Â¼Ã£â‚¬â€š
