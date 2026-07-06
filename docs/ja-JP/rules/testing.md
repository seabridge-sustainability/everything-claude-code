# Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¨Â¦ÂÃ¤Â»Â¶

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


## Ã¦Å“â‚¬Ã¤Â½Å½Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸: 80%

Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”Ã¯Â¼Ë†Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã¥Â¿â€¦Ã©Â Ë†Ã¯Â¼â€°:
1. **Ã£Æ’Â¦Ã£Æ’â€¹Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†** - Ã¥â‚¬â€¹Ã£â‚¬â€¦Ã£ÂÂ®Ã©â€“Â¢Ã¦â€¢Â°Ã£â‚¬ÂÃ£Æ’Â¦Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â‚¬ÂÃ£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’Ë†
2. **Ã§ÂµÂ±Ã¥ÂË†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†** - API Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â‚¬ÂÃ£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã¦â€œÂÃ¤Â½Å“
3. **E2E Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†** - Ã©â€¡ÂÃ¨Â¦ÂÃ£ÂÂªÃ£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã¯Â¼Ë†Ã£Æ’â€¢Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Â Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£ÂÂ¯Ã¨Â¨â‚¬Ã¨ÂªÅ¾Ã£Ââ€Ã£ÂÂ¨Ã£ÂÂ«Ã©ÂÂ¸Ã¦Å Å¾Ã¯Â¼â€°

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Âº

Ã¥Â¿â€¦Ã©Â Ë†Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼:
1. Ã£ÂÂ¾Ã£ÂÅ¡Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂÃ¯Â¼Ë†REDÃ¯Â¼â€°
2. Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’ - Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¯Ã£ÂÅ¡
3. Ã¦Å“â‚¬Ã¥Â°ÂÃ©â„¢ÂÃ£ÂÂ®Ã¥Â®Å¸Ã¨Â£â€¦Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂÃ¯Â¼Ë†GREENÃ¯Â¼â€°
4. Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’ - Ã£Æ’â€˜Ã£â€šÂ¹Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¯Ã£ÂÅ¡
5. Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã¯Â¼Ë†IMPROVEÃ¯Â¼â€°
6. Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂÃ¯Â¼Ë†80%+Ã¯Â¼â€°

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¥Â¤Â±Ã¦â€¢â€”Ã£ÂÂ®Ã£Æ’Ë†Ã£Æ’Â©Ã£Æ’â€“Ã£Æ’Â«Ã£â€šÂ·Ã£Æ’Â¥Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ°

1. **tdd-guide** agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
2. Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¥Ë†â€ Ã©â€ºÂ¢Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
3. Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÅ’Ã¦Â­Â£Ã£Ââ€”Ã£Ââ€žÃ£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼
4. Ã¥Â®Å¸Ã¨Â£â€¦Ã£â€šâ€™Ã¤Â¿Â®Ã¦Â­Â£Ã£â‚¬ÂÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯Ã¤Â¿Â®Ã¦Â­Â£Ã£Ââ€”Ã£ÂÂªÃ£Ââ€žÃ¯Â¼Ë†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã©â€“â€œÃ©Ââ€¢Ã£ÂÂ£Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£â€šâ€™Ã©â„¢Â¤Ã£ÂÂÃ¯Â¼â€°

## Agent Ã£â€šÂµÃ£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†

- **tdd-guide** - Ã¦â€“Â°Ã¦Â©Å¸Ã¨Æ’Â½Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦Ã§Â©ÂÃ¦Â¥ÂµÃ§Å¡â€žÃ£ÂÂ«Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬ÂÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ¡Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â¼Â·Ã¥Ë†Â¶
