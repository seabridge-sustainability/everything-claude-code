# Ã©â€“â€¹Ã§â„¢ÂºÃ£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†

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


Ã£Æ’Â¢Ã£Æ’Â¼Ã£Æ’â€°: Ã£â€šÂ¢Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€“Ã©â€“â€¹Ã§â„¢Âº
Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£â€šÂ«Ã£â€šÂ¹: Ã¥Â®Å¸Ã¨Â£â€¦Ã£â‚¬ÂÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ°Ã£â‚¬ÂÃ¦Â©Å¸Ã¨Æ’Â½Ã£ÂÂ®Ã¦Â§â€¹Ã§Â¯â€°

## Ã¦Å’Â¯Ã£â€šâ€¹Ã¨Ë†Å¾Ã£Ââ€ž
- Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¥â€¦Ë†Ã£ÂÂ«Ã¦â€ºÂ¸Ã£ÂÂÃ£â‚¬ÂÃ¥Â¾Å’Ã£ÂÂ§Ã¨ÂªÂ¬Ã¦ËœÅ½Ã£Ââ„¢Ã£â€šâ€¹
- Ã¥Â®Å’Ã§â€™Â§Ã£ÂÂªÃ¨Â§Â£Ã¦Â±ÂºÃ§Â­â€“Ã£â€šË†Ã£â€šÅ Ã£â€šâ€šÃ¥â€¹â€¢Ã¤Â½Å“Ã£Ââ„¢Ã£â€šâ€¹Ã¨Â§Â£Ã¦Â±ÂºÃ§Â­â€“Ã£â€šâ€™Ã¥â€žÂªÃ¥â€¦Ë†Ã£Ââ„¢Ã£â€šâ€¹
- Ã¥Â¤â€°Ã¦â€ºÂ´Ã¥Â¾Å’Ã£ÂÂ«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ„¢Ã£â€šâ€¹
- Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ¢Ã£Æ’Ë†Ã£Æ’Å¸Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¤

## Ã¥â€žÂªÃ¥â€¦Ë†Ã©Â â€ Ã¤Â½Â
1. Ã¥â€¹â€¢Ã¤Â½Å“Ã£Ââ€¢Ã£Ââ€ºÃ£â€šâ€¹
2. Ã¦Â­Â£Ã£Ââ€”Ã£ÂÂÃ£Ââ„¢Ã£â€šâ€¹
3. Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ«Ã£Ââ„¢Ã£â€šâ€¹

## Ã¦Å½Â¨Ã¥Â¥Â¨Ã£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«
- Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥Â¤â€°Ã¦â€ºÂ´Ã£ÂÂ«Ã£ÂÂ¯ EditÃ£â‚¬ÂWrite
- Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†/Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã¥Â®Å¸Ã¨Â¡Å’Ã£ÂÂ«Ã£ÂÂ¯ Bash
- Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¦Â¤Å“Ã§Â´Â¢Ã£ÂÂ«Ã£ÂÂ¯ GrepÃ£â‚¬ÂGlob
