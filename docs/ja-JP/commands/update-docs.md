# Update Documentation

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¤Â¿Â¡Ã©Â Â¼Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã¦Æ’â€¦Ã¥Â Â±Ã¦ÂºÂÃ£Ââ€¹Ã£â€šâ€°Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¥ÂÅ’Ã¦Å“Å¸:

1. package.jsonÃ£ÂÂ®scriptsÃ£â€šÂ»Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¥Ââ€“Ã£â€šâ€¹
   - Ã£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†Ã¥Ââ€šÃ§â€¦Â§Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â
   - Ã£â€šÂ³Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£Ââ€¹Ã£â€šâ€°Ã£ÂÂ®Ã¨ÂªÂ¬Ã¦ËœÅ½Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£â€šâ€¹

2. .env.exampleÃ£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¥Ââ€“Ã£â€šâ€¹
   - Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°Ã£â€šâ€™Ã¦Å Â½Ã¥â€¡Âº
   - Ã§â€ºÂ®Ã§Å¡â€žÃ£ÂÂ¨Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€“â€¡Ã¦â€ºÂ¸Ã¥Å’â€“

3. docs/CONTRIB.mdÃ£â€šâ€™Ã§â€Å¸Ã¦Ë†Â:
   - Ã©â€“â€¹Ã§â„¢ÂºÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
   - Ã¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†
   - Ã§â€™Â°Ã¥Â¢Æ’Ã£â€šÂ»Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”
   - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦â€°â€¹Ã©Â â€ 

4. docs/RUNBOOK.mdÃ£â€šâ€™Ã§â€Å¸Ã¦Ë†Â:
   - Ã£Æ’â€¡Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¤Ã¦â€°â€¹Ã©Â â€ 
   - Ã§â€ºÂ£Ã¨Â¦â€“Ã£ÂÂ¨Ã£â€šÂ¢Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’Ë†
   - Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Å¡â€žÃ£ÂÂªÃ¥â€¢ÂÃ©Â¡Å’Ã£ÂÂ¨Ã¤Â¿Â®Ã¦Â­Â£
   - Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã¦â€°â€¹Ã©Â â€ 

5. Ã¥ÂÂ¤Ã£Ââ€žÃ£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã§â€°Â¹Ã¥Â®Å¡:
   - 90Ã¦â€”Â¥Ã¤Â»Â¥Ã¤Â¸Å Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂªÃ£Ââ€žÃ£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¦Â¤Å“Ã¥â€¡Âº
   - Ã¦â€°â€¹Ã¥â€¹â€¢Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã§â€Â¨Ã£ÂÂ«Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¥Å’â€“

6. Ã¥Â·Â®Ã¥Ë†â€ Ã£â€šÂµÃ£Æ’Å¾Ã£Æ’ÂªÃ£Æ’Â¼Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº

Ã¤Â¿Â¡Ã©Â Â¼Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã¥â€Â¯Ã¤Â¸â‚¬Ã£ÂÂ®Ã¦Æ’â€¦Ã¥Â Â±Ã¦ÂºÂ: package.jsonÃ£ÂÂ¨.env.example
