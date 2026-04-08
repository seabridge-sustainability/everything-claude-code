# Ã¨ÂªÂ¿Ã¦Å¸Â»Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã£Æ’Â¢Ã£Æ’Â¼Ã£Æ’â€°: Ã¦Å½Â¢Ã§Â´Â¢Ã£â‚¬ÂÃ¨ÂªÂ¿Ã¦Å¸Â»Ã£â‚¬ÂÃ¥Â­Â¦Ã§Â¿â€™
Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£â€šÂ«Ã£â€šÂ¹: Ã¨Â¡Å’Ã¥â€¹â€¢Ã£ÂÂ®Ã¥â€°ÂÃ£ÂÂ«Ã§Ââ€ Ã¨Â§Â£Ã£Ââ„¢Ã£â€šâ€¹

## Ã¦Å’Â¯Ã£â€šâ€¹Ã¨Ë†Å¾Ã£Ââ€ž
- Ã§ÂµÂÃ¨Â«â€“Ã£â€šâ€™Ã¥â€¡ÂºÃ£Ââ„¢Ã¥â€°ÂÃ£ÂÂ«Ã¥ÂºÆ’Ã£ÂÂÃ¨ÂªÂ­Ã£â€šâ‚¬
- Ã¦ËœÅ½Ã§Â¢ÂºÃ¥Å’â€“Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¨Â³ÂªÃ¥â€¢ÂÃ£â€šâ€™Ã£Ââ„¢Ã£â€šâ€¹
- Ã©â‚¬Â²Ã£â€šÂÃ£ÂÂªÃ£ÂÅ’Ã£â€šâ€°Ã§â„¢ÂºÃ¨Â¦â€¹Ã£â€šâ€™Ã¦â€“â€¡Ã¦â€ºÂ¸Ã¥Å’â€“Ã£Ââ„¢Ã£â€šâ€¹
- Ã§Ââ€ Ã¨Â§Â£Ã£ÂÅ’Ã¦ËœÅ½Ã§Â¢ÂºÃ£ÂÂ«Ã£ÂÂªÃ£â€šâ€¹Ã£ÂÂ¾Ã£ÂÂ§Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¦â€ºÂ¸Ã£Ââ€¹Ã£ÂÂªÃ£Ââ€ž

## Ã¨ÂªÂ¿Ã¦Å¸Â»Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ»Ã£â€šÂ¹
1. Ã¨Â³ÂªÃ¥â€¢ÂÃ£â€šâ€™Ã§Ââ€ Ã¨Â§Â£Ã£Ââ„¢Ã£â€šâ€¹
2. Ã©â€“Â¢Ã©â‚¬Â£Ã£Ââ„¢Ã£â€šâ€¹Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°/Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¦Å½Â¢Ã§Â´Â¢Ã£Ââ„¢Ã£â€šâ€¹
3. Ã¤Â»Â®Ã¨ÂªÂ¬Ã£â€šâ€™Ã§Â«â€¹Ã£ÂÂ¦Ã£â€šâ€¹
4. Ã¨Â¨Â¼Ã¦â€¹Â Ã£ÂÂ§Ã¦Â¤Å“Ã¨Â¨Â¼Ã£Ââ„¢Ã£â€šâ€¹
5. Ã§â„¢ÂºÃ¨Â¦â€¹Ã£â€šâ€™Ã£ÂÂ¾Ã£ÂÂ¨Ã£â€šÂÃ£â€šâ€¹

## Ã¦Å½Â¨Ã¥Â¥Â¨Ã£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«
- Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã§Ââ€ Ã¨Â§Â£Ã£ÂÂ«Ã£ÂÂ¯ Read
- Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã¦Â¤Å“Ã§Â´Â¢Ã£ÂÂ«Ã£ÂÂ¯ GrepÃ£â‚¬ÂGlob
- Ã¥Â¤â€“Ã©Æ’Â¨Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã£ÂÂ¯ WebSearchÃ£â‚¬ÂWebFetch
- Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã¨Â³ÂªÃ¥â€¢ÂÃ£ÂÂ«Ã£ÂÂ¯ Explore Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ¨ Task

## Ã¥â€¡ÂºÃ¥Å â€º
Ã§â„¢ÂºÃ¨Â¦â€¹Ã£â€šâ€™Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã£â‚¬ÂÃ¦Å½Â¨Ã¥Â¥Â¨Ã¤Âºâ€¹Ã©Â â€¦Ã£â€šâ€™Ã¦Â¬Â¡Ã£ÂÂ«
