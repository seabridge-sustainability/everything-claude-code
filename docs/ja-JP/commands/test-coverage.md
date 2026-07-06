# Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸

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


Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã¥Ë†â€ Ã¦Å¾ÂÃ£Ââ€”Ã£â‚¬ÂÃ¤Â¸ÂÃ¨Â¶Â³Ã£Ââ€”Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†ÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

1. Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã¤Â»ËœÃ£ÂÂÃ£ÂÂ§Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’: npm test --coverage Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯ pnpm test --coverage

2. Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã¥Ë†â€ Ã¦Å¾Â (coverage/coverage-summary.json)

3. Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£ÂÅ’80%Ã£ÂÂ®Ã©â€“Â¾Ã¥â‚¬Â¤Ã£â€šâ€™Ã¤Â¸â€¹Ã¥â€ºÅ¾Ã£â€šâ€¹Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã§â€°Â¹Ã¥Â®Å¡

4. Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã¤Â¸ÂÃ¨Â¶Â³Ã£ÂÂ®Ã¥Ââ€žÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦:
   - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂªÃ£Ââ€žÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’â€˜Ã£â€šÂ¹Ã£â€šâ€™Ã¥Ë†â€ Ã¦Å¾Â
   - Ã©â€“Â¢Ã¦â€¢Â°Ã£ÂÂ®Ã¥ÂËœÃ¤Â½â€œÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â
   - APIÃ£ÂÂ®Ã§ÂµÂ±Ã¥ÂË†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â
   - Ã©â€¡ÂÃ¨Â¦ÂÃ£ÂÂªÃ£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£ÂÂ®E2EÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â

5. Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã¥ÂË†Ã¦Â Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼

6. Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£Æ’Â¡Ã£Æ’Ë†Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¹Ã£ÂÂ®Ã¥â€°ÂÃ¥Â¾Å’Ã¦Â¯â€Ã¨Â¼Æ’Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº

7. Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã¥â€¦Â¨Ã¤Â½â€œÃ£ÂÂ§80%Ã¤Â»Â¥Ã¤Â¸Å Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã§Â¢ÂºÃ¤Â¿Â

Ã©â€¡ÂÃ§â€šÂ¹Ã©Â â€¦Ã§â€ºÂ®:
- Ã£Æ’ÂÃ£Æ’Æ’Ã£Æ’â€Ã£Æ’Â¼Ã£Æ’â€˜Ã£â€šÂ¹Ã£â€šÂ·Ã£Æ’Å Ã£Æ’ÂªÃ£â€šÂª
- Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°
- Ã£â€šÂ¨Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¹Ã¯Â¼Ë†nullÃ£â‚¬ÂundefinedÃ£â‚¬ÂÃ§Â©ÂºÃ¯Â¼â€°
- Ã¥Â¢Æ’Ã§â€¢Å’Ã¦ÂÂ¡Ã¤Â»Â¶
