# Ã§Â â€Ã§Â©Â¶Ã¨Æ’Å’Ã¦â„¢Â¯

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å¡Ã¦Å½Â¢Ã§Â´Â¢Ã£â‚¬ÂÃ¨Â°Æ’Ã¦Å¸Â¥Ã£â‚¬ÂÃ¥Â­Â¦Ã¤Â¹Â 
Ã©â€¡ÂÃ§â€šÂ¹Ã¯Â¼Å¡Ã¥â€¦Ë†Ã§Ââ€ Ã¨Â§Â£Ã¯Â¼Å’Ã¥ÂÅ½Ã¨Â¡Å’Ã¥Å Â¨

## Ã¨Â¡Å’Ã¤Â¸ÂºÃ¥â€¡â€ Ã¥Ë†â„¢

* Ã¥Â¹Â¿Ã¦Â³â€ºÃ©Ëœâ€¦Ã¨Â¯Â»Ã¥ÂÅ½Ã¥â€ ÂÃ¤Â¸â€¹Ã§Â»â€œÃ¨Â®Âº
* Ã¦ÂÂÃ¥â€¡ÂºÃ¦Â¾â€žÃ¦Â¸â€¦Ã¦â‚¬Â§Ã©â€”Â®Ã©Â¢Ëœ
* Ã¥Å“Â¨Ã§Â â€Ã§Â©Â¶Ã¨Â¿â€¡Ã§Â¨â€¹Ã¤Â¸Â­Ã¨Â®Â°Ã¥Â½â€¢Ã¥Ââ€˜Ã§Å½Â°
* Ã¥Å“Â¨Ã§Ââ€ Ã¨Â§Â£Ã¦Â¸â€¦Ã¦â„¢Â°Ã¤Â¹â€¹Ã¥â€°ÂÃ¤Â¸ÂÃ¨Â¦ÂÃ§Â¼â€“Ã¥â€ â„¢Ã¤Â»Â£Ã§Â Â

## Ã§Â â€Ã§Â©Â¶Ã¦ÂµÂÃ§Â¨â€¹

1. Ã§Ââ€ Ã¨Â§Â£Ã©â€”Â®Ã©Â¢Ëœ
2. Ã¦Å½Â¢Ã§Â´Â¢Ã§â€ºÂ¸Ã¥â€¦Â³Ã¤Â»Â£Ã§Â Â/Ã¦â€“â€¡Ã¦Â¡Â£
3. Ã¥Â½Â¢Ã¦Ë†ÂÃ¥Ââ€¡Ã¨Â®Â¾
4. Ã§â€Â¨Ã¨Â¯ÂÃ¦ÂÂ®Ã©ÂªÅ’Ã¨Â¯Â
5. Ã¦â‚¬Â»Ã§Â»â€œÃ¥Ââ€˜Ã§Å½Â°

## Ã¦Å½Â¨Ã¨ÂÂÃ¥Â·Â¥Ã¥â€¦Â·

* `Read` Ã§â€Â¨Ã¤ÂºÅ½Ã§Ââ€ Ã¨Â§Â£Ã¤Â»Â£Ã§Â Â
* `Grep`Ã£â‚¬Â`Glob` Ã§â€Â¨Ã¤ÂºÅ½Ã¦Å¸Â¥Ã¦â€°Â¾Ã¦Â¨Â¡Ã¥Â¼Â
* `WebSearch`Ã£â‚¬Â`WebFetch` Ã§â€Â¨Ã¤ÂºÅ½Ã¨Å½Â·Ã¥Ââ€“Ã¥Â¤â€“Ã©Æ’Â¨Ã¦â€“â€¡Ã¦Â¡Â£
* Ã©â€™Ë†Ã¥Â¯Â¹Ã¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `Task` Ã¤Â¸Å½Ã¦Å½Â¢Ã§Â´Â¢Ã¤Â»Â£Ã§Ââ€ 

## Ã¨Â¾â€œÃ¥â€¡Âº

Ã¥â€¦Ë†Ã¥â€˜Ë†Ã§Å½Â°Ã¥Ââ€˜Ã§Å½Â°Ã¯Â¼Å’Ã¥ÂÅ½Ã¦ÂÂÃ¥â€¡ÂºÃ¥Â»ÂºÃ¨Â®Â®
