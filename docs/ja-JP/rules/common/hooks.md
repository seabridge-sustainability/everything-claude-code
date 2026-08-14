# Hooks Ã£â€šÂ·Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â 

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


## Hook Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”

- **PreToolUse**: Ã£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«Ã¥Â®Å¸Ã¨Â¡Å’Ã¥â€°ÂÃ¯Â¼Ë†Ã¦Â¤Å“Ã¨Â¨Â¼Ã£â‚¬ÂÃ£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥Â¤â€°Ã¦â€ºÂ´Ã¯Â¼â€°
- **PostToolUse**: Ã£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«Ã¥Â®Å¸Ã¨Â¡Å’Ã¥Â¾Å’Ã¯Â¼Ë†Ã¨â€¡ÂªÃ¥â€¹â€¢Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Ë†Ã£â‚¬ÂÃ£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã¯Â¼â€°
- **Stop**: Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã§Âµâ€šÃ¤Âºâ€ Ã¦â„¢â€šÃ¯Â¼Ë†Ã¦Å“â‚¬Ã§Âµâ€šÃ¦Â¤Å“Ã¨Â¨Â¼Ã¯Â¼â€°

## Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¦â€°Â¿Ã¨ÂªÂÃ£Æ’â€˜Ã£Æ’Â¼Ã£Æ’Å¸Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

Ã¦Â³Â¨Ã¦â€žÂÃ£Ââ€”Ã£ÂÂ¦Ã¤Â½Â¿Ã§â€Â¨:
- Ã¤Â¿Â¡Ã©Â Â¼Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã£â‚¬ÂÃ¦ËœÅ½Ã§Â¢ÂºÃ£ÂÂ«Ã¥Â®Å¡Ã§Â¾Â©Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã¨Â¨Ë†Ã§â€Â»Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“
- Ã¦Å½Â¢Ã§Â´Â¢Ã§Å¡â€žÃ£ÂÂªÃ¤Â½Å“Ã¦Â¥Â­Ã£ÂÂ§Ã£ÂÂ¯Ã§â€žÂ¡Ã¥Å Â¹Ã¥Å’â€“
- dangerously-skip-permissions Ã£Æ’â€¢Ã£Æ’Â©Ã£â€šÂ°Ã£â€šâ€™Ã¦Â±ÂºÃ£Ââ€”Ã£ÂÂ¦Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- Ã¤Â»Â£Ã£â€šÂÃ£â€šÅ Ã£ÂÂ« `~/.claude.json` Ã£ÂÂ§ `allowedTools` Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡

## TodoWrite Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

TodoWrite Ã£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦:
- Ã¨Â¤â€¡Ã¦â€¢Â°Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”Ã£ÂÂ®Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ¯Ã£ÂÂ®Ã©â‚¬Â²Ã¦Ââ€”Ã£â€šâ€™Ã¨Â¿Â½Ã¨Â·Â¡
- Ã¦Å’â€¡Ã§Â¤ÂºÃ£ÂÂ®Ã§Ââ€ Ã¨Â§Â£Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼
- Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â«Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã£ÂÂ®Ã¨ÂªÂ¿Ã¦â€¢Â´Ã£â€šâ€™Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂ«
- Ã§Â´Â°Ã£Ââ€¹Ã£Ââ€žÃ¥Â®Å¸Ã¨Â£â€¦Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº

Todo Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã¦ËœÅ½Ã£â€šâ€°Ã£Ââ€¹Ã£ÂÂ«Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨:
- Ã©Â â€ Ã¥ÂºÂÃ£ÂÅ’Ã©â€“â€œÃ©Ââ€¢Ã£ÂÂ£Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”
- Ã¦Â¬Â Ã£Ââ€˜Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã©Â â€¦Ã§â€ºÂ®
- Ã¤Â¸ÂÃ¨Â¦ÂÃ£ÂÂªÃ¤Â½â„¢Ã¥Ë†â€ Ã£ÂÂªÃ©Â â€¦Ã§â€ºÂ®
- Ã§Â²â€™Ã¥ÂºÂ¦Ã£ÂÂ®Ã¨ÂªÂ¤Ã£â€šÅ 
- Ã¨ÂªÂ¤Ã¨Â§Â£Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã¨Â¦ÂÃ¤Â»Â¶
