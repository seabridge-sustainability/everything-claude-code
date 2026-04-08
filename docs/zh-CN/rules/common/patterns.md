# Ã¥Â¸Â¸Ã¨Â§ÂÃ¦Â¨Â¡Ã¥Â¼Â

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Ã©ÂªÂ¨Ã¦Å¾Â¶Ã©Â¡Â¹Ã§â€ºÂ®

Ã¥Â½â€œÃ¥Â®Å¾Ã§Å½Â°Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¦â€”Â¶Ã¯Â¼Å¡

1. Ã¦ÂÅ“Ã§Â´Â¢Ã§Â»ÂÃ¨Â¿â€¡Ã¥Â®Å¾Ã¦Ë†ËœÃ¦Â£â‚¬Ã©ÂªÅ’Ã§Å¡â€žÃ©ÂªÂ¨Ã¦Å¾Â¶Ã©Â¡Â¹Ã§â€ºÂ®
2. Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¹Â¶Ã¨Â¡Å’Ã¤Â»Â£Ã§Ââ€ Ã¨Â¯â€žÃ¤Â¼Â°Ã©â‚¬â€°Ã©Â¡Â¹Ã¯Â¼Å¡
   * Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¨Â¯â€žÃ¤Â¼Â°
   * Ã¥ÂÂ¯Ã¦â€°Â©Ã¥Â±â€¢Ã¦â‚¬Â§Ã¥Ë†â€ Ã¦Å¾Â
   * Ã§â€ºÂ¸Ã¥â€¦Â³Ã¦â‚¬Â§Ã¨Â¯â€žÃ¥Ë†â€ 
   * Ã¥Â®Å¾Ã¦â€“Â½Ã¨Â§â€žÃ¥Ë†â€™
3. Ã¥â€¦â€¹Ã©Å¡â€ Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Å’Â¹Ã©â€¦ÂÃ¤Â½Å“Ã¤Â¸ÂºÃ¥Å¸ÂºÃ§Â¡â‚¬
4. Ã¥Å“Â¨Ã¥Â·Â²Ã©ÂªÅ’Ã¨Â¯ÂÃ§Å¡â€žÃ§Â»â€œÃ¦Å¾â€žÃ¥â€ â€¦Ã¨Â¿Â­Ã¤Â»Â£

## Ã¨Â®Â¾Ã¨Â®Â¡Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¤Â»â€œÃ¥Âºâ€œÃ¦Â¨Â¡Ã¥Â¼Â

Ã¥Â°â€ Ã¦â€¢Â°Ã¦ÂÂ®Ã¨Â®Â¿Ã©â€”Â®Ã¥Â°ÂÃ¨Â£â€¦Ã¥Å“Â¨Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€žÃ¦Å½Â¥Ã¥ÂÂ£Ã¤Â¹â€¹Ã¥ÂÅ½Ã¯Â¼Å¡

* Ã¥Â®Å¡Ã¤Â¹â€°Ã¦Â â€¡Ã¥â€¡â€ Ã¦â€œÂÃ¤Â½Å“Ã¯Â¼Å¡findAll, findById, create, update, delete
* Ã¥â€¦Â·Ã¤Â½â€œÃ¥Â®Å¾Ã§Å½Â°Ã¥Â¤â€žÃ§Ââ€ Ã¥Â­ËœÃ¥â€šÂ¨Ã§Â»â€ Ã¨Å â€šÃ¯Â¼Ë†Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ£â‚¬ÂAPIÃ£â‚¬ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã§Â­â€°Ã¯Â¼â€°
* Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¤Â¾ÂÃ¨Âµâ€“Ã¤ÂºÅ½Ã¦Å Â½Ã¨Â±Â¡Ã¦Å½Â¥Ã¥ÂÂ£Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â­ËœÃ¥â€šÂ¨Ã¦Å“ÂºÃ¥Ë†Â¶
* Ã¤Â¾Â¿Ã¤ÂºÅ½Ã¨Â½Â»Ã¦ÂÂ¾Ã¥Ë†â€¡Ã¦ÂÂ¢Ã¦â€¢Â°Ã¦ÂÂ®Ã¦ÂºÂÃ¯Â¼Å’Ã¥Â¹Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¥Â¯Â¹Ã¨Â±Â¡Ã§Â®â‚¬Ã¥Å’â€“Ã¦Âµâ€¹Ã¨Â¯â€¢

### API Ã¥â€œÂÃ¥Âºâ€Ã¦Â Â¼Ã¥Â¼Â

Ã¥Â¯Â¹Ã¦â€°â‚¬Ã¦Å“â€° API Ã¥â€œÂÃ¥Âºâ€Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€žÃ¤Â¿Â¡Ã¥Â°ÂÃ¦Â Â¼Ã¥Â¼ÂÃ¯Â¼Å¡

* Ã¥Å’â€¦Ã¥ÂÂ«Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Ë†ÂÃ¥Å Å¸/Ã§Å Â¶Ã¦â‚¬ÂÃ¦Å’â€¡Ã§Â¤ÂºÃ¥â„¢Â¨
* Ã¥Å’â€¦Ã¥ÂÂ«Ã¦â€¢Â°Ã¦ÂÂ®Ã¨Â½Â½Ã¨ÂÂ·Ã¯Â¼Ë†Ã¥â€¡ÂºÃ©â€â„¢Ã¦â€”Â¶Ã¥ÂÂ¯Ã¤Â¸ÂºÃ§Â©ÂºÃ¯Â¼â€°
* Ã¥Å’â€¦Ã¥ÂÂ«Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ©â€â„¢Ã¨Â¯Â¯Ã¦Â¶Ë†Ã¦ÂÂ¯Ã¥Â­â€”Ã¦Â®ÂµÃ¯Â¼Ë†Ã¦Ë†ÂÃ¥Å Å¸Ã¦â€”Â¶Ã¥ÂÂ¯Ã¤Â¸ÂºÃ§Â©ÂºÃ¯Â¼â€°
* Ã¤Â¸ÂºÃ¥Ë†â€ Ã©Â¡ÂµÃ¥â€œÂÃ¥Âºâ€Ã¥Å’â€¦Ã¥ÂÂ«Ã¥â€¦Æ’Ã¦â€¢Â°Ã¦ÂÂ®Ã¯Â¼Ë†Ã¦â‚¬Â»Ã¦â€¢Â°Ã£â‚¬ÂÃ©Â¡ÂµÃ§Â ÂÃ£â‚¬ÂÃ©â„¢ÂÃ¥Ë†Â¶Ã¯Â¼â€°
