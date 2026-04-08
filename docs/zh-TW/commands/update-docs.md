# Ã¦â€ºÂ´Ã¦â€“Â°Ã¦â€“â€¡Ã¤Â»Â¶

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¥Â¾Å¾Ã¥â€“Â®Ã¤Â¸â‚¬Ã§Å“Å¸Ã§â€ºÂ¸Ã¤Â¾â€ Ã¦ÂºÂÃ¥ÂÅ’Ã¦Â­Â¥Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡

1. Ã¨Â®â‚¬Ã¥Ââ€“ package.json scripts Ã¥Ââ‚¬Ã¦Â®Âµ
   - Ã§â€Â¢Ã§â€Å¸ scripts Ã¥ÂÆ’Ã¨â‚¬Æ’Ã¨Â¡Â¨
   - Ã¥Å’â€¦Ã¥ÂÂ«Ã¨Â¨Â»Ã¨Â§Â£Ã¤Â¸Â­Ã§Å¡â€žÃ¦ÂÂÃ¨Â¿Â°

2. Ã¨Â®â‚¬Ã¥Ââ€“ .env.example
   - Ã¦â€œÂ·Ã¥Ââ€“Ã¦â€°â‚¬Ã¦Å“â€°Ã§â€™Â°Ã¥Â¢Æ’Ã¨Â®Å Ã¦â€¢Â¸
   - Ã¨Â¨ËœÃ©Å’â€žÃ§â€Â¨Ã©â‚¬â€Ã¥â€™Å’Ã¦Â Â¼Ã¥Â¼Â

3. Ã§â€Â¢Ã§â€Å¸ docs/CONTRIB.mdÃ¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡
   - Ã©â€“â€¹Ã§â„¢Â¼Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹
   - Ã¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€ž scripts
   - Ã§â€™Â°Ã¥Â¢Æ’Ã¨Â¨Â­Ã¥Â®Å¡
   - Ã¦Â¸Â¬Ã¨Â©Â¦Ã§Â¨â€¹Ã¥ÂºÂ

4. Ã§â€Â¢Ã§â€Å¸ docs/RUNBOOK.mdÃ¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡
   - Ã©Æ’Â¨Ã§Â½Â²Ã§Â¨â€¹Ã¥ÂºÂ
   - Ã§â€ºÂ£Ã¦Å½Â§Ã¥â€™Å’Ã¨Â­Â¦Ã¥Â Â±
   - Ã¥Â¸Â¸Ã¨Â¦â€¹Ã¥â€¢ÂÃ©Â¡Å’Ã¥â€™Å’Ã¤Â¿Â®Ã¥Â¾Â©
   - Ã¥â€ºÅ¾Ã¦Â»Â¾Ã§Â¨â€¹Ã¥ÂºÂ

5. Ã¨Â­ËœÃ¥Ë†Â¥Ã©ÂÅ½Ã¦â„¢â€šÃ§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡
   - Ã¦â€°Â¾Ã¥â€¡Âº 90 Ã¥Â¤Â©Ã¤Â»Â¥Ã¤Â¸Å Ã¦Å“ÂªÃ¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶
   - Ã¥Ë†â€”Ã¥â€¡ÂºÃ¤Â¾â€ºÃ¦â€°â€¹Ã¥â€¹â€¢Ã¥Â¯Â©Ã¦Å¸Â¥

6. Ã©Â¡Â¯Ã§Â¤ÂºÃ¥Â·Â®Ã§â€¢Â°Ã¦â€˜ËœÃ¨Â¦Â

Ã¥â€“Â®Ã¤Â¸â‚¬Ã§Å“Å¸Ã§â€ºÂ¸Ã¤Â¾â€ Ã¦ÂºÂÃ¯Â¼Å¡package.json Ã¥â€™Å’ .env.example
