# Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’â€”Ã£ÂÂ®Ã¦â€ºÂ´Ã¦â€“Â°

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã¦Â§â€¹Ã©â‚¬Â Ã£â€šâ€™Ã¥Ë†â€ Ã¦Å¾ÂÃ£Ââ€”Ã£ÂÂ¦Ã£â€šÂ¢Ã£Æ’Â¼Ã£â€šÂ­Ã£Æ’â€ Ã£â€šÂ¯Ã£Æ’ÂÃ£Æ’Â£Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ´Ã¦â€“Â°Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

1. Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ®Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â‚¬ÂÃ£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â‚¬ÂÃ¤Â¾ÂÃ¥Â­ËœÃ©â€“Â¢Ã¤Â¿â€šÃ£â€šâ€™Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³
2. Ã¤Â»Â¥Ã¤Â¸â€¹Ã£ÂÂ®Ã¥Â½Â¢Ã¥Â¼ÂÃ£ÂÂ§Ã£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³Ã¥Å Â¹Ã§Å½â€¡Ã£ÂÂ®Ã¨â€°Â¯Ã£Ââ€žÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’â€”Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â:
   - codemaps/architecture.md - Ã¥â€¦Â¨Ã¤Â½â€œÃ§Å¡â€žÃ£ÂÂªÃ£â€šÂ¢Ã£Æ’Â¼Ã£â€šÂ­Ã£Æ’â€ Ã£â€šÂ¯Ã£Æ’ÂÃ£Æ’Â£
   - codemaps/backend.md - Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã¦Â§â€¹Ã©â‚¬Â 
   - codemaps/frontend.md - Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã¦Â§â€¹Ã©â‚¬Â 
   - codemaps/data.md - Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£ÂÂ¨Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â¼Ã£Æ’Å¾

3. Ã¥â€°ÂÃ£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ¨Ã£ÂÂ®Ã¥Â·Â®Ã¥Ë†â€ Ã£Æ’â€˜Ã£Æ’Â¼Ã£â€šÂ»Ã£Æ’Â³Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šâ€™Ã¨Â¨Ë†Ã§Â®â€”
4. Ã¥Â¤â€°Ã¦â€ºÂ´Ã£ÂÅ’30%Ã£â€šâ€™Ã¨Â¶â€¦Ã£ÂË†Ã£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£â‚¬ÂÃ¦â€ºÂ´Ã¦â€“Â°Ã¥â€°ÂÃ£ÂÂ«Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÂ®Ã¦â€°Â¿Ã¨ÂªÂÃ£â€šâ€™Ã¨Â¦ÂÃ¦Â±â€š
5. Ã¥Ââ€žÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’â€”Ã£ÂÂ«Ã©Â®Â®Ã¥ÂºÂ¦Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â³Ã£Æ’â€”Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â 
6. Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™ .reports/codemap-diff.txt Ã£ÂÂ«Ã¤Â¿ÂÃ¥Â­Ëœ

TypeScript/Node.jsÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã¥Ë†â€ Ã¦Å¾ÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ¥Â®Å¸Ã¨Â£â€¦Ã£ÂÂ®Ã¨Â©Â³Ã§Â´Â°Ã£ÂÂ§Ã£ÂÂ¯Ã£ÂÂªÃ£ÂÂÃ£â‚¬ÂÃ©Â«ËœÃ£Æ’Â¬Ã£Æ’â„¢Ã£Æ’Â«Ã£ÂÂ®Ã¦Â§â€¹Ã©â‚¬Â Ã£ÂÂ«Ã§â€žÂ¦Ã§â€šÂ¹Ã£â€šâ€™Ã¥Â½â€œÃ£ÂÂ¦Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š
