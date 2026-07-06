# Ã©â€¡ÂÃ¦Â§â€¹Ã¦Â¸â€¦Ã§Ââ€ 

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


Ã©â‚¬ÂÃ©ÂÅ½Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Â©â€”Ã¨Â­â€°Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Å“Â°Ã¨Â­ËœÃ¥Ë†Â¥Ã¥â€™Å’Ã§Â§Â»Ã©â„¢Â¤Ã§â€žÂ¡Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¯Â¼Å¡

1. Ã¥Å¸Â·Ã¨Â¡Å’Ã§â€žÂ¡Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Ë†â€ Ã¦Å¾ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã¯Â¼Å¡
   - knipÃ¯Â¼Å¡Ã¦â€°Â¾Ã¥â€¡ÂºÃ¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã§Å¡â€ž exports Ã¥â€™Å’Ã¦Âªâ€Ã¦Â¡Ë†
   - depcheckÃ¯Â¼Å¡Ã¦â€°Â¾Ã¥â€¡ÂºÃ¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã§Å¡â€žÃ§â€ºÂ¸Ã¤Â¾ÂÃ¦â‚¬Â§
   - ts-pruneÃ¯Â¼Å¡Ã¦â€°Â¾Ã¥â€¡ÂºÃ¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã§Å¡â€ž TypeScript exports

2. Ã¥Å“Â¨ .reports/dead-code-analysis.md Ã§â€Â¢Ã§â€Å¸Ã¥Â®Å’Ã¦â€¢Â´Ã¥Â Â±Ã¥â€˜Å 

3. Ã¤Â¾ÂÃ¥Å¡Â´Ã©â€¡ÂÃ¦â‚¬Â§Ã¥Ë†â€ Ã©Â¡Å¾Ã§â„¢Â¼Ã§ÂÂ¾Ã¯Â¼Å¡
   - Ã¥Â®â€°Ã¥â€¦Â¨Ã¯Â¼Å¡Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Âªâ€Ã¦Â¡Ë†Ã£â‚¬ÂÃ¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã§Å¡â€žÃ¥Â·Â¥Ã¥â€¦Â·
   - Ã¦Â³Â¨Ã¦â€žÂÃ¯Â¼Å¡API Ã¨Â·Â¯Ã§â€Â±Ã£â‚¬ÂÃ¥â€¦Æ’Ã¤Â»Â¶
   - Ã¥ÂÂ±Ã©Å¡ÂªÃ¯Â¼Å¡Ã¨Â¨Â­Ã¥Â®Å¡Ã¦Âªâ€Ã£â‚¬ÂÃ¤Â¸Â»Ã¨Â¦ÂÃ©â‚¬Â²Ã¥â€¦Â¥Ã©Â»Å¾

4. Ã¥ÂÂªÃ¦ÂÂÃ¨Â­Â°Ã¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¥Ë†ÂªÃ©â„¢Â¤

5. Ã¦Â¯ÂÃ¦Â¬Â¡Ã¥Ë†ÂªÃ©â„¢Â¤Ã¥â€°ÂÃ¯Â¼Å¡
   - Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â®Å’Ã¦â€¢Â´Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¥â€”Ã¤Â»Â¶
   - Ã©Â©â€”Ã¨Â­â€°Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½
   - Ã¥Â¥â€”Ã§â€Â¨Ã¨Â®Å Ã¦â€ºÂ´
   - Ã©â€¡ÂÃ¦â€“Â°Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦
   - Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¤Â±Ã¦â€¢â€”Ã¥â€°â€¡Ã¥â€ºÅ¾Ã¦Â»Â¾

6. Ã©Â¡Â¯Ã§Â¤ÂºÃ¥Â·Â²Ã¦Â¸â€¦Ã§Ââ€ Ã©Â â€¦Ã§â€ºÂ®Ã§Å¡â€žÃ¦â€˜ËœÃ¨Â¦Â

Ã¥Å“Â¨Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥â€°ÂÃ§Âµâ€¢Ã¤Â¸ÂÃ¥Ë†ÂªÃ©â„¢Â¤Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¯Â¼Â
