# Ã¥â€¦Â±Ã©â‚¬Å¡Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


## Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â«Ã£Æ’Ë†Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†

Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ¦Â©Å¸Ã¨Æ’Â½Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â£â€¦Ã£Ââ„¢Ã£â€šâ€¹Ã©Å¡â€º:
1. Ã¥Â®Å¸Ã¦Ë†Â¦Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Â¸Ë†Ã£ÂÂ¿Ã£ÂÂ®Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â«Ã£Æ’Ë†Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€™Ã¦Â¤Å“Ã§Â´Â¢
2. Ã¤Â¸Â¦Ã¥Ë†â€” agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£â€šÂªÃ£Æ’â€”Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¨Â©â€¢Ã¤Â¾Â¡:
   - Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¨Â©â€¢Ã¤Â¾Â¡
   - Ã¦â€¹Â¡Ã¥Â¼ÂµÃ¦â‚¬Â§Ã¥Ë†â€ Ã¦Å¾Â
   - Ã©â€“Â¢Ã©â‚¬Â£Ã¦â‚¬Â§Ã£â€šÂ¹Ã£â€šÂ³Ã£â€šÂ¢Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°
   - Ã¥Â®Å¸Ã¨Â£â€¦Ã¨Â¨Ë†Ã§â€Â»
3. Ã¦Å“â‚¬Ã©ÂÂ©Ã£ÂÂªÃ£â€šâ€šÃ£ÂÂ®Ã£â€šâ€™Ã¥Å¸ÂºÃ§â€ºÂ¤Ã£ÂÂ¨Ã£Ââ€”Ã£ÂÂ¦Ã£â€šÂ¯Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â³
4. Ã¥Â®Å¸Ã¨Â¨Â¼Ã¦Â¸Ë†Ã£ÂÂ¿Ã£ÂÂ®Ã¦Â§â€¹Ã©â‚¬Â Ã¥â€ â€¦Ã£ÂÂ§Ã¥ÂÂÃ¥Â¾Â©

## Ã¨Â¨Â­Ã¨Â¨Ë†Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### Repository Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

Ã¤Â¸â‚¬Ã¨Â²Â«Ã£Ââ€”Ã£ÂÅ¸Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã¨Æ’Å’Ã¥Â¾Å’Ã£ÂÂ«Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ»Ã£â€šÂ¹Ã£â€šâ€™Ã£â€šÂ«Ã£Æ’â€”Ã£â€šÂ»Ã£Æ’Â«Ã¥Å’â€“:
- Ã¦Â¨â„¢Ã¦Âºâ€“Ã¦â€œÂÃ¤Â½Å“Ã£â€šâ€™Ã¥Â®Å¡Ã§Â¾Â©: findAll, findById, create, update, delete
- Ã¥â€¦Â·Ã¨Â±Â¡Ã¥Â®Å¸Ã¨Â£â€¦Ã£ÂÅ’Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ¸Ã£ÂÂ®Ã¨Â©Â³Ã§Â´Â°Ã£â€šâ€™Ã¥â€¡Â¦Ã§Ââ€ Ã¯Â¼Ë†Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£â‚¬ÂAPIÃ£â‚¬ÂÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂªÃ£ÂÂ©Ã¯Â¼â€°
- Ã£Æ’â€œÃ£â€šÂ¸Ã£Æ’ÂÃ£â€šÂ¹Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ¯Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â¡Ã£â€šÂ«Ã£Æ’â€¹Ã£â€šÂºÃ£Æ’Â Ã£ÂÂ§Ã£ÂÂ¯Ã£ÂÂªÃ£ÂÂÃ£â‚¬ÂÃ¦Å Â½Ã¨Â±Â¡Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ«Ã¤Â¾ÂÃ¥Â­Ëœ
- Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã§Â°Â¡Ã¥ÂËœÃ£ÂÂªÃ¤ÂºÂ¤Ã¦Ââ€ºÃ£â€šâ€™Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂ«Ã£Ââ€”Ã£â‚¬ÂÃ£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ«Ã£â€šË†Ã£â€šâ€¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã§Â°Â¡Ã§Â´Â Ã¥Å’â€“

### API Ã£Æ’Â¬Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Ë†

Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ® API Ã£Æ’Â¬Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â³Ã£â€šÂ¹Ã£ÂÂ«Ã¤Â¸â‚¬Ã¨Â²Â«Ã£Ââ€”Ã£ÂÅ¸Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â„¢Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€”Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨:
- Ã¦Ë†ÂÃ¥Å Å¸/Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¸Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’Â¼Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£â€šâ€¹
- Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’Å¡Ã£â€šÂ¤Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£â€šâ€¹Ã¯Â¼Ë†Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã¦â„¢â€šÃ£ÂÂ¯ nullÃ¯Â¼â€°
- Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’Â¡Ã£Æ’Æ’Ã£â€šÂ»Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â€°Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£â€šâ€¹Ã¯Â¼Ë†Ã¦Ë†ÂÃ¥Å Å¸Ã¦â„¢â€šÃ£ÂÂ¯ nullÃ¯Â¼â€°
- Ã£Æ’Å¡Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’Â¬Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â³Ã£â€šÂ¹Ã£ÂÂ«Ã£Æ’Â¡Ã£â€šÂ¿Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£â€šâ€¹Ã¯Â¼Ë†total, page, limitÃ¯Â¼â€°
