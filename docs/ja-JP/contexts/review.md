# Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã£Æ’Â¢Ã£Æ’Â¼Ã£Æ’â€°: PRÃ£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£â‚¬ÂÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥Ë†â€ Ã¦Å¾Â
Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£â€šÂ«Ã£â€šÂ¹: Ã¥â€œÂÃ¨Â³ÂªÃ£â‚¬ÂÃ£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â‚¬ÂÃ¤Â¿ÂÃ¥Â®Ë†Ã¦â‚¬Â§

## Ã¦Å’Â¯Ã£â€šâ€¹Ã¨Ë†Å¾Ã£Ââ€ž
- Ã£â€šÂ³Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£Ââ„¢Ã£â€šâ€¹Ã¥â€°ÂÃ£ÂÂ«Ã¥Â¾Â¹Ã¥Âºâ€¢Ã§Å¡â€žÃ£ÂÂ«Ã¨ÂªÂ­Ã£â€šâ‚¬
- Ã¥â€¢ÂÃ©Â¡Å’Ã£â€šâ€™Ã¦Â·Â±Ã¥Ë†Â»Ã¥ÂºÂ¦Ã£ÂÂ§Ã¥â€žÂªÃ¥â€¦Ë†Ã©Â â€ Ã¤Â½ÂÃ¤Â»ËœÃ£Ââ€˜Ã£Ââ„¢Ã£â€šâ€¹ (critical > high > medium > low)
- Ã¥â€¢ÂÃ©Â¡Å’Ã£â€šâ€™Ã¦Å’â€¡Ã¦â€˜ËœÃ£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ Ã£Ââ€˜Ã£ÂÂ§Ã£ÂÂªÃ£ÂÂÃ£â‚¬ÂÃ¤Â¿Â®Ã¦Â­Â£Ã£â€šâ€™Ã¦ÂÂÃ¦Â¡Ë†Ã£Ââ„¢Ã£â€šâ€¹
- Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¨â€žâ€ Ã¥Â¼Â±Ã¦â‚¬Â§Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Ââ„¢Ã£â€šâ€¹

## Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†
- [ ] Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼
- [ ] Ã£â€šÂ¨Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¹
- [ ] Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°
- [ ] Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£ (Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â‚¬ÂÃ¨ÂªÂÃ¨Â¨Â¼Ã£â‚¬ÂÃ¦Â©Å¸Ã¥Â¯â€ Ã¦Æ’â€¦Ã¥Â Â±)
- [ ] Ã£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹
- [ ] Ã¥ÂÂ¯Ã¨ÂªÂ­Ã¦â‚¬Â§
- [ ] Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸

## Ã¥â€¡ÂºÃ¥Å â€ºÃ£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Ë†
Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£Ââ€Ã£ÂÂ¨Ã£ÂÂ«Ã£â€šÂ°Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’â€”Ã¥Å’â€“Ã£Ââ€”Ã£â‚¬ÂÃ¦Â·Â±Ã¥Ë†Â»Ã¥ÂºÂ¦Ã£ÂÂ®Ã©Â«ËœÃ£Ââ€žÃ£â€šâ€šÃ£ÂÂ®Ã£â€šâ€™Ã¥â€žÂªÃ¥â€¦Ë†
