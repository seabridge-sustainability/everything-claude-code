# Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã¤Â¿Â®Ã¦Â­Â£

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


TypeScript Ã£ÂÅ Ã£â€šË†Ã£ÂÂ³Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¦Â®ÂµÃ©Å¡Å½Ã§Å¡â€žÃ£ÂÂ«Ã¤Â¿Â®Ã¦Â­Â£Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã¯Â¼Å¡

1. Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã¯Â¼Å¡npm run build Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯ pnpm build

2. Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã¥â€¡ÂºÃ¥Å â€ºÃ£â€šâ€™Ã¨Â§Â£Ã¦Å¾ÂÃ¯Â¼Å¡
   * Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¥Ë†Â¥Ã£ÂÂ«Ã£â€šÂ°Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’â€”Ã¥Å’â€“
   * Ã©â€¡ÂÃ¥Â¤Â§Ã¥ÂºÂ¦Ã£ÂÂ§Ã¤Â¸Â¦Ã£ÂÂ³Ã¦â€ºÂ¿Ã£ÂË†

3. Ã¥Ââ€žÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ«Ã£ÂÂ¤Ã£Ââ€žÃ£ÂÂ¦Ã¯Â¼Å¡
   * Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤ÂºÃ¯Â¼Ë†Ã¥â€°ÂÃ¥Â¾Å’ 5 Ã¨Â¡Å’Ã¯Â¼â€°
   * Ã¥â€¢ÂÃ©Â¡Å’Ã£â€šâ€™Ã¨ÂªÂ¬Ã¦ËœÅ½
   * Ã¤Â¿Â®Ã¦Â­Â£Ã¦Â¡Ë†Ã£â€šâ€™Ã¦ÂÂÃ¦Â¡Ë†
   * Ã¤Â¿Â®Ã¦Â­Â£Ã£â€šâ€™Ã©ÂÂ©Ã§â€Â¨
   * Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šâ€™Ã¥â€ ÂÃ¥ÂºÂ¦Ã¥Â®Å¸Ã¨Â¡Å’
   * Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÅ’Ã¨Â§Â£Ã¦Â±ÂºÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Ââ€¹Ã§Â¢ÂºÃ¨ÂªÂ

4. Ã¤Â»Â¥Ã¤Â¸â€¹Ã£ÂÂ®Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ«Ã¥ÂÅ“Ã¦Â­Â¢Ã¯Â¼Å¡
   * Ã¤Â¿Â®Ã¦Â­Â£Ã£ÂÂ§Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÅ’Ã§â„¢ÂºÃ§â€Å¸
   * Ã¥ÂÅ’Ã£ÂËœÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÅ’ 3 Ã¥â€ºÅ¾Ã£ÂÂ®Ã¨Â©Â¦Ã¨Â¡Å’Ã¥Â¾Å’Ã£â€šâ€šÃ§Â¶Å¡Ã£ÂÂ
   * Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÅ’Ã¤Â¸â‚¬Ã¦â„¢â€šÃ¥ÂÅ“Ã¦Â­Â¢Ã£â€šâ€™Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†

5. Ã£â€šÂµÃ£Æ’Å¾Ã£Æ’ÂªÃ£Æ’Â¼Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤ÂºÃ¯Â¼Å¡
   * Ã¤Â¿Â®Ã¦Â­Â£Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼
   * Ã¦Â®â€¹Ã£â€šÅ Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼
   * Ã¦â€“Â°Ã£ÂÅ¸Ã£ÂÂ«Ã¥Â°Å½Ã¥â€¦Â¥Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼

Ã¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£â‚¬ÂÃ¤Â¸â‚¬Ã¥ÂºÂ¦Ã£ÂÂ« 1 Ã£ÂÂ¤Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã¤Â¿Â®Ã¦Â­Â£Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ¯Â¼Â
