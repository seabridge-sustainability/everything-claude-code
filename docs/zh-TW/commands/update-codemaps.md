# Ã¦â€ºÂ´Ã¦â€“Â°Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Å“Â°Ã¥Å“â€“

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¥Ë†â€ Ã¦Å¾ÂÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥ÂºÂ«Ã§ÂµÂÃ¦Â§â€¹Ã¤Â¸Â¦Ã¦â€ºÂ´Ã¦â€“Â°Ã¦Å¾Â¶Ã¦Â§â€¹Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡

1. Ã¦Å½Æ’Ã¦ÂÂÃ¦â€°â‚¬Ã¦Å“â€°Ã¥Å½Å¸Ã¥Â§â€¹Ã¦Âªâ€Ã¦Â¡Ë†Ã§Å¡â€ž importsÃ£â‚¬Âexports Ã¥â€™Å’Ã§â€ºÂ¸Ã¤Â¾ÂÃ¦â‚¬Â§
2. Ã¤Â»Â¥Ã¤Â¸â€¹Ã¥Ë†â€”Ã¦Â Â¼Ã¥Â¼ÂÃ§â€Â¢Ã§â€Å¸Ã§Â²Â¾Ã§Â°Â¡Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Å“Â°Ã¥Å“â€“Ã¯Â¼Å¡
   - codemaps/architecture.md - Ã¦â€¢Â´Ã©Â«â€Ã¦Å¾Â¶Ã¦Â§â€¹
   - codemaps/backend.md - Ã¥Â¾Å’Ã§Â«Â¯Ã§ÂµÂÃ¦Â§â€¹
   - codemaps/frontend.md - Ã¥â€°ÂÃ§Â«Â¯Ã§ÂµÂÃ¦Â§â€¹
   - codemaps/data.md - Ã¨Â³â€¡Ã¦â€“â„¢Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥â€™Å’Ã§ÂµÂÃ¦Â§â€¹Ã¦ÂÂÃ¨Â¿Â°

3. Ã¨Â¨Ë†Ã§Â®â€”Ã¨Ë†â€¡Ã¥â€°ÂÃ¤Â¸â‚¬Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€žÃ¥Â·Â®Ã§â€¢Â°Ã§â„¢Â¾Ã¥Ë†â€ Ã¦Â¯â€
4. Ã¥Â¦â€šÃ¦Å¾Å“Ã¨Â®Å Ã¦â€ºÂ´ > 30%Ã¯Â¼Å’Ã¥Å“Â¨Ã¦â€ºÂ´Ã¦â€“Â°Ã¥â€°ÂÃ¨Â«â€¹Ã¦Â±â€šÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦â€°Â¹Ã¥â€¡â€ 
5. Ã§â€šÂºÃ¦Â¯ÂÃ¥â‚¬â€¹Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Å“Â°Ã¥Å“â€“Ã¦â€“Â°Ã¥Â¢Å¾Ã¦â€“Â°Ã©Â®Â®Ã¥ÂºÂ¦Ã¦â„¢â€šÃ©â€“â€œÃ¦Ë†Â³
6. Ã¥Â°â€¡Ã¥Â Â±Ã¥â€˜Å Ã¥â€žÂ²Ã¥Â­ËœÃ¥Ë†Â° .reports/codemap-diff.txt

Ã¤Â½Â¿Ã§â€Â¨ TypeScript/Node.js Ã©â‚¬Â²Ã¨Â¡Å’Ã¥Ë†â€ Ã¦Å¾ÂÃ£â‚¬â€šÃ¥Â°Ë†Ã¦Â³Â¨Ã¦â€“Â¼Ã©Â«ËœÃ©Å¡Å½Ã§ÂµÂÃ¦Â§â€¹Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â¯Â¦Ã¤Â½Å“Ã§Â´Â°Ã§Â¯â‚¬Ã£â‚¬â€š
