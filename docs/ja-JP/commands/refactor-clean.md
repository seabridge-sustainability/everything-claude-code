# Refactor Clean

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Â¤Å“Ã¨Â¨Â¼Ã£ÂÂ§Ã£Æ’â€¡Ã£Æ’Æ’Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂ«Ã§â€°Â¹Ã¥Â®Å¡Ã£Ââ€”Ã£ÂÂ¦Ã¥â€°Å Ã©â„¢Â¤Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:

1. Ã£Æ’â€¡Ã£Æ’Æ’Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥Ë†â€ Ã¦Å¾ÂÃ£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’:
   - knip: Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã£ÂÂ®Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£ÂÂ¨Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã¦Â¤Å“Ã¥â€¡Âº
   - depcheck: Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã£ÂÂ®Ã¤Â¾ÂÃ¥Â­ËœÃ©â€“Â¢Ã¤Â¿â€šÃ£â€šâ€™Ã¦Â¤Å“Ã¥â€¡Âº
   - ts-prune: Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã£ÂÂ®TypeScriptÃ£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã¦Â¤Å“Ã¥â€¡Âº

2. .reports/dead-code-analysis.mdÃ£ÂÂ«Ã¥Å’â€¦Ã¦â€¹Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â

3. Ã§â„¢ÂºÃ¨Â¦â€¹Ã£â€šâ€™Ã©â€¡ÂÃ¨Â¦ÂÃ¥ÂºÂ¦Ã¥Ë†Â¥Ã£ÂÂ«Ã¥Ë†â€ Ã©Â¡Å¾:
   - SAFE: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â‚¬ÂÃ¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã£ÂÂ®Ã£Æ’Â¦Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£
   - CAUTION: APIÃ£Æ’Â«Ã£Æ’Â¼Ã£Æ’Ë†Ã£â‚¬ÂÃ£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’Ë†
   - DANGER: Ã¨Â¨Â­Ã¥Â®Å¡Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â‚¬ÂÃ£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†

4. Ã¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂªÃ¥â€°Å Ã©â„¢Â¤Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã¦ÂÂÃ¦Â¡Ë†

5. Ã¥Ââ€žÃ¥â€°Å Ã©â„¢Â¤Ã£ÂÂ®Ã¥â€°ÂÃ£ÂÂ«:
   - Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¹Ã£â€šÂ¤Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
   - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã¥ÂË†Ã¦Â Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
   - Ã¥Â¤â€°Ã¦â€ºÂ´Ã£â€šâ€™Ã©ÂÂ©Ã§â€Â¨
   - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥â€ ÂÃ¥Â®Å¸Ã¨Â¡Å’
   - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ€”Ã£ÂÅ¸Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯

6. Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£â€šÂ¢Ã£â€šÂ¤Ã£Æ’â€ Ã£Æ’Â Ã£ÂÂ®Ã£â€šÂµÃ£Æ’Å¾Ã£Æ’ÂªÃ£Æ’Â¼Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº

Ã£ÂÂ¾Ã£ÂÅ¡Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€ºÃ£ÂÅ¡Ã£ÂÂ«Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤Ã£Ââ€”Ã£ÂÂªÃ£Ââ€žÃ£ÂÂ§Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž!
