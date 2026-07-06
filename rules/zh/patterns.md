# Ã¥Â¸Â¸Ã§â€Â¨Ã¦Â¨Â¡Ã¥Â¼Â

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


## Ã©ÂªÂ¨Ã¦Å¾Â¶Ã©Â¡Â¹Ã§â€ºÂ®

Ã¥Â®Å¾Ã§Å½Â°Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¦â€”Â¶Ã¯Â¼Å¡
1. Ã¦ÂÅ“Ã§Â´Â¢Ã¤Â¹â€¦Ã§Â»ÂÃ¨â‚¬Æ’Ã©ÂªÅ’Ã§Å¡â€žÃ©ÂªÂ¨Ã¦Å¾Â¶Ã©Â¡Â¹Ã§â€ºÂ®
2. Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¹Â¶Ã¨Â¡Å’Ã¤Â»Â£Ã§Ââ€ Ã¨Â¯â€žÃ¤Â¼Â°Ã©â‚¬â€°Ã©Â¡Â¹Ã¯Â¼Å¡
   - Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¨Â¯â€žÃ¤Â¼Â°
   - Ã¥ÂÂ¯Ã¦â€°Â©Ã¥Â±â€¢Ã¦â‚¬Â§Ã¥Ë†â€ Ã¦Å¾Â
   - Ã§â€ºÂ¸Ã¥â€¦Â³Ã¦â‚¬Â§Ã¨Â¯â€žÃ¥Ë†â€ 
   - Ã¥Â®Å¾Ã§Å½Â°Ã¨Â§â€žÃ¥Ë†â€™
3. Ã¥â€¦â€¹Ã©Å¡â€ Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Å’Â¹Ã©â€¦ÂÃ¤Â½Å“Ã¤Â¸ÂºÃ¥Å¸ÂºÃ§Â¡â‚¬
4. Ã¥Å“Â¨Ã§Â»ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ§Å¡â€žÃ§Â»â€œÃ¦Å¾â€žÃ¥â€ â€¦Ã¨Â¿Â­Ã¤Â»Â£

## Ã¨Â®Â¾Ã¨Â®Â¡Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¤Â»â€œÃ¥â€šÂ¨Ã¦Â¨Â¡Ã¥Â¼Â

Ã¥Â°â€ Ã¦â€¢Â°Ã¦ÂÂ®Ã¨Â®Â¿Ã©â€”Â®Ã¥Â°ÂÃ¨Â£â€¦Ã¥Å“Â¨Ã¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€žÃ¦Å½Â¥Ã¥ÂÂ£Ã¥ÂÅ½Ã©ÂÂ¢Ã¯Â¼Å¡
- Ã¥Â®Å¡Ã¤Â¹â€°Ã¦Â â€¡Ã¥â€¡â€ Ã¦â€œÂÃ¤Â½Å“Ã¯Â¼Å¡findAllÃ£â‚¬ÂfindByIdÃ£â‚¬ÂcreateÃ£â‚¬ÂupdateÃ£â‚¬Âdelete
- Ã¥â€¦Â·Ã¤Â½â€œÃ¥Â®Å¾Ã§Å½Â°Ã¥Â¤â€žÃ§Ââ€ Ã¥Â­ËœÃ¥â€šÂ¨Ã§Â»â€ Ã¨Å â€šÃ¯Â¼Ë†Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ£â‚¬ÂAPIÃ£â‚¬ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã§Â­â€°Ã¯Â¼â€°
- Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Å Â½Ã¨Â±Â¡Ã¦Å½Â¥Ã¥ÂÂ£Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â­ËœÃ¥â€šÂ¨Ã¦Å“ÂºÃ¥Ë†Â¶
- Ã¤Â¾Â¿Ã¤ÂºÅ½Ã¨Â½Â»Ã¦ÂÂ¾Ã¥Ë†â€¡Ã¦ÂÂ¢Ã¦â€¢Â°Ã¦ÂÂ®Ã¦ÂºÂÃ¯Â¼Å’Ã¥Â¹Â¶Ã§Â®â‚¬Ã¥Å’â€“Ã¤Â½Â¿Ã§â€Â¨Ã¦Â¨Â¡Ã¦â€¹Å¸Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢

### API Ã¥â€œÂÃ¥Âºâ€Ã¦Â Â¼Ã¥Â¼Â

Ã¥Â¯Â¹Ã¦â€°â‚¬Ã¦Å“â€° API Ã¥â€œÂÃ¥Âºâ€Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€žÃ¤Â¿Â¡Ã¥Â°ÂÃ¯Â¼Å¡
- Ã¥Å’â€¦Ã¥ÂÂ«Ã¦Ë†ÂÃ¥Å Å¸/Ã§Å Â¶Ã¦â‚¬ÂÃ¦Å’â€¡Ã§Â¤ÂºÃ¥â„¢Â¨
- Ã¥Å’â€¦Ã¥ÂÂ«Ã¦â€¢Â°Ã¦ÂÂ®Ã¨Â´Å¸Ã¨Â½Â½Ã¯Â¼Ë†Ã©â€â„¢Ã¨Â¯Â¯Ã¦â€”Â¶Ã¥ÂÂ¯Ã¤Â¸ÂºÃ§Â©ÂºÃ¯Â¼â€°
- Ã¥Å’â€¦Ã¥ÂÂ«Ã©â€â„¢Ã¨Â¯Â¯Ã¦Â¶Ë†Ã¦ÂÂ¯Ã¥Â­â€”Ã¦Â®ÂµÃ¯Â¼Ë†Ã¦Ë†ÂÃ¥Å Å¸Ã¦â€”Â¶Ã¥ÂÂ¯Ã¤Â¸ÂºÃ§Â©ÂºÃ¯Â¼â€°
- Ã¥Å’â€¦Ã¥ÂÂ«Ã¥Ë†â€ Ã©Â¡ÂµÃ¥â€œÂÃ¥Âºâ€Ã§Å¡â€žÃ¥â€¦Æ’Ã¦â€¢Â°Ã¦ÂÂ®Ã¯Â¼Ë†totalÃ£â‚¬ÂpageÃ£â‚¬ÂlimitÃ¯Â¼â€°
