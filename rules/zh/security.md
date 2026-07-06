# Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å’â€¡Ã¥Ââ€”

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


## Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥

Ã¥Å“Â¨Ã¤Â»Â»Ã¤Â½â€¢Ã¦ÂÂÃ¤ÂºÂ¤Ã¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å¡
- [ ] Ã¦â€”Â Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ¥Â¯â€ Ã©â€™Â¥Ã¯Â¼Ë†API Ã¥Â¯â€ Ã©â€™Â¥Ã£â‚¬ÂÃ¥Â¯â€ Ã§Â ÂÃ£â‚¬ÂÃ¤Â»Â¤Ã§â€°Å’Ã¯Â¼â€°
- [ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã¥Â·Â²Ã©ÂªÅ’Ã¨Â¯Â
- [ ] SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã©ËœÂ²Ã¦Å Â¤Ã¯Â¼Ë†Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¯Â¼â€°
- [ ] XSS Ã©ËœÂ²Ã¦Å Â¤Ã¯Â¼Ë†Ã¥â€¡â‚¬Ã¥Å’â€“ HTMLÃ¯Â¼â€°
- [ ] CSRF Ã¤Â¿ÂÃ¦Å Â¤Ã¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨
- [ ] Ã¨Â®Â¤Ã¨Â¯Â/Ã¦Å½Ë†Ã¦ÂÆ’Ã¥Â·Â²Ã©ÂªÅ’Ã¨Â¯Â
- [ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã§Â«Â¯Ã§â€šÂ¹Ã¥ÂÂ¯Ã§â€Â¨Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶
- [ ] Ã©â€â„¢Ã¨Â¯Â¯Ã¦Â¶Ë†Ã¦ÂÂ¯Ã¤Â¸ÂÃ¦Â³â€žÃ©Å“Â²Ã¦â€¢ÂÃ¦â€žÅ¸Ã¦â€¢Â°Ã¦ÂÂ®

## Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ 

- Ã¦Â°Â¸Ã¨Â¿Å“Ã¤Â¸ÂÃ¨Â¦ÂÃ¥Å“Â¨Ã¦ÂºÂÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ¥Â¯â€ Ã©â€™Â¥
- Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¦Ë†â€“Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨
- Ã¥ÂÂ¯Ã¥Å Â¨Ã¦â€”Â¶Ã©ÂªÅ’Ã¨Â¯ÂÃ¦â€°â‚¬Ã©Å“â‚¬Ã§Å¡â€žÃ¥Â¯â€ Ã©â€™Â¥Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¥Â­ËœÃ¥Å“Â¨
- Ã¨Â½Â®Ã¦ÂÂ¢Ã¤Â»Â»Ã¤Â½â€¢Ã¥ÂÂ¯Ã¨Æ’Â½Ã¥Â·Â²Ã¦Å¡Â´Ã©Å“Â²Ã§Å¡â€žÃ¥Â¯â€ Ã©â€™Â¥

## Ã¥Â®â€°Ã¥â€¦Â¨Ã¥â€œÂÃ¥Âºâ€Ã¥ÂÂÃ¨Â®Â®

Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Ââ€˜Ã§Å½Â°Ã¥Â®â€°Ã¥â€¦Â¨Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å¡
1. Ã§Â«â€¹Ã¥ÂÂ³Ã¥ÂÅ“Ã¦Â­Â¢
2. Ã¤Â½Â¿Ã§â€Â¨ **security-reviewer** Ã¤Â»Â£Ã§Ââ€ 
3. Ã¥Å“Â¨Ã§Â»Â§Ã§Â»Â­Ã¤Â¹â€¹Ã¥â€°ÂÃ¤Â¿Â®Ã¥Â¤ÂÃ¥â€¦Â³Ã©â€Â®Ã©â€”Â®Ã©Â¢Ëœ
4. Ã¨Â½Â®Ã¦ÂÂ¢Ã¤Â»Â»Ã¤Â½â€¢Ã¥Â·Â²Ã¦Å¡Â´Ã©Å“Â²Ã§Å¡â€žÃ¥Â¯â€ Ã©â€™Â¥
5. Ã¥Â®Â¡Ã¦Å¸Â¥Ã¦â€¢Â´Ã¤Â¸ÂªÃ¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ¤Â¸Â­Ã§Å¡â€žÃ§Â±Â»Ã¤Â¼Â¼Ã©â€”Â®Ã©Â¢Ëœ
