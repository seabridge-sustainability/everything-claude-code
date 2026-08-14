# Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¬Ã£â€šÂ¤Ã£Æ’â€°Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Â³

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


## Ã¥Â¿â€¦Ã©Â Ë†Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯

Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã¥â€°Â:
- [ ] Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£ÂÂªÃ£Ââ€”Ã¯Â¼Ë†API Ã£â€šÂ­Ã£Æ’Â¼Ã£â‚¬ÂÃ£Æ’â€˜Ã£â€šÂ¹Ã£Æ’Â¯Ã£Æ’Â¼Ã£Æ’â€°Ã£â‚¬ÂÃ£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³Ã¯Â¼â€°
- [ ] Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¥â€¦Â¥Ã¥Å â€ºÃ£ÂÅ’Ã¦Â¤Å“Ã¨Â¨Â¼Ã¦Â¸Ë†Ã£ÂÂ¿
- [ ] SQL Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã©ËœÂ²Ã¦Â­Â¢Ã¯Â¼Ë†Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥Å’â€“Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ¯Â¼â€°
- [ ] XSS Ã©ËœÂ²Ã¦Â­Â¢Ã¯Â¼Ë†Ã£â€šÂµÃ£Æ’â€¹Ã£â€šÂ¿Ã£â€šÂ¤Ã£â€šÂºÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸ HTMLÃ¯Â¼â€°
- [ ] CSRF Ã¤Â¿ÂÃ¨Â­Â·Ã£ÂÅ’Ã¦Å“â€°Ã¥Å Â¹
- [ ] Ã¨ÂªÂÃ¨Â¨Â¼/Ã¨ÂªÂÃ¥ÂÂ¯Ã£ÂÅ’Ã¦Â¤Å“Ã¨Â¨Â¼Ã¦Â¸Ë†Ã£ÂÂ¿
- [ ] Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã¥Ë†Â¶Ã©â„¢Â
- [ ] Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’Â¡Ã£Æ’Æ’Ã£â€šÂ»Ã£Æ’Â¼Ã£â€šÂ¸Ã£ÂÅ’Ã¦Â©Å¸Ã¥Â¯â€ Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™Ã¦Â¼ÂÃ£â€šâ€°Ã£Ââ€¢Ã£ÂÂªÃ£Ââ€ž

## Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã§Â®Â¡Ã§Ââ€ 

- Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ«Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- Ã¥Â¸Â¸Ã£ÂÂ«Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- Ã¨ÂµÂ·Ã¥â€¹â€¢Ã¦â„¢â€šÃ£ÂÂ«Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂªÃ£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£ÂÅ’Ã¥Â­ËœÃ¥Å“Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼
- Ã©Å“Â²Ã¥â€¡ÂºÃ£Ââ€”Ã£ÂÅ¸Ã¥ÂÂ¯Ã¨Æ’Â½Ã¦â‚¬Â§Ã£ÂÂ®Ã£Ââ€šÃ£â€šâ€¹Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

## Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¥Â¯Â¾Ã¥Â¿Å“Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’Ë†Ã£â€šÂ³Ã£Æ’Â«

Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¥â€¢ÂÃ©Â¡Å’Ã£ÂÅ’Ã¨Â¦â€¹Ã£ÂÂ¤Ã£Ââ€¹Ã£ÂÂ£Ã£ÂÅ¸Ã¥Â Â´Ã¥ÂË†:
1. Ã§â€ºÂ´Ã£ÂÂ¡Ã£ÂÂ«Ã¥ÂÅ“Ã¦Â­Â¢
2. **security-reviewer** agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
3. Ã§Â¶â„¢Ã§Â¶Å¡Ã¥â€°ÂÃ£ÂÂ« CRITICAL Ã¥â€¢ÂÃ©Â¡Å’Ã£â€šâ€™Ã¤Â¿Â®Ã¦Â­Â£
4. Ã©Å“Â²Ã¥â€¡ÂºÃ£Ââ€”Ã£ÂÅ¸Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³
5. Ã¥ÂÅ’Ã¦Â§ËœÃ£ÂÂ®Ã¥â€¢ÂÃ©Â¡Å’Ã£ÂÅ’Ã£ÂÂªÃ£Ââ€žÃ£Ââ€¹Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã¥â€¦Â¨Ã¤Â½â€œÃ£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼
