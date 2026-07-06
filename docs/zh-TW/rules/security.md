# Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¦Å’â€¡Ã¥Ââ€”

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


## Ã¥Â¼Â·Ã¥Ë†Â¶Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¦ÂªÂ¢Ã¦Å¸Â¥

Ã¤Â»Â»Ã¤Â½â€¢Ã¦ÂÂÃ¤ÂºÂ¤Ã¥â€°ÂÃ¯Â¼Å¡
- [ ] Ã¦Â²â€™Ã¦Å“â€°Ã¥Â¯Â«Ã¦Â­Â»Ã§Å¡â€žÃ¥Â¯â€ Ã©â€˜Â°Ã¯Â¼Ë†API Ã©â€¡â€˜Ã©â€˜Â°Ã£â‚¬ÂÃ¥Â¯â€ Ã§Â¢Â¼Ã£â‚¬ÂTokenÃ¯Â¼â€°
- [ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¨Â¼Â¸Ã¥â€¦Â¥Ã¥Â·Â²Ã©Â©â€”Ã¨Â­â€°
- [ ] SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã©ËœÂ²Ã¨Â­Â·Ã¯Â¼Ë†Ã¥ÂÆ’Ã¦â€¢Â¸Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â©Â¢Ã¯Â¼â€°
- [ ] XSS Ã©ËœÂ²Ã¨Â­Â·Ã¯Â¼Ë†Ã¦Â¸â€¦Ã§Ââ€ Ã©ÂÅ½Ã§Å¡â€ž HTMLÃ¯Â¼â€°
- [ ] Ã¥Â·Â²Ã¥â€¢Å¸Ã§â€Â¨ CSRF Ã¤Â¿ÂÃ¨Â­Â·
- [ ] Ã¥Â·Â²Ã©Â©â€”Ã¨Â­â€°Ã©Â©â€”Ã¨Â­â€°/Ã¦Å½Ë†Ã¦Â¬Å 
- [ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã§Â«Â¯Ã©Â»Å¾Ã©Æ’Â½Ã¦Å“â€°Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶
- [ ] Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨Â¨Å Ã¦ÂÂ¯Ã¤Â¸ÂÃ¦Å“Æ’Ã¦Â´Â©Ã¦Â¼ÂÃ¦â€¢ÂÃ¦â€žÅ¸Ã¨Â³â€¡Ã¦â€“â„¢

## Ã¥Â¯â€ Ã©â€˜Â°Ã§Â®Â¡Ã§Ââ€ 

```typescript
// Ã§Âµâ€¢Ã¤Â¸ÂÃ¯Â¼Å¡Ã¥Â¯Â«Ã¦Â­Â»Ã§Å¡â€žÃ¥Â¯â€ Ã©â€˜Â°
const apiKey = "sk-proj-xxxxx"

// Ã§Â¸Â½Ã¦ËœÂ¯Ã¯Â¼Å¡Ã§â€™Â°Ã¥Â¢Æ’Ã¨Â®Å Ã¦â€¢Â¸
const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

## Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€ºÅ¾Ã¦â€¡â€°Ã¥Ââ€Ã¥Â®Å¡

Ã¥Â¦â€šÃ¦Å¾Å“Ã§â„¢Â¼Ã§ÂÂ¾Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Å¡
1. Ã§Â«â€¹Ã¥ÂÂ³Ã¥ÂÅ“Ã¦Â­Â¢
2. Ã¤Â½Â¿Ã§â€Â¨ **security-reviewer** Agent
3. Ã¥Å“Â¨Ã§Â¹Â¼Ã§ÂºÅ’Ã¥â€°ÂÃ¤Â¿Â®Ã¥Â¾Â©Ã©â€”Å“Ã©ÂÂµÃ¥â€¢ÂÃ©Â¡Å’
4. Ã¨Â¼ÂªÃ¦Ââ€ºÃ¤Â»Â»Ã¤Â½â€¢Ã¦Å¡Â´Ã©Å“Â²Ã§Å¡â€žÃ¥Â¯â€ Ã©â€˜Â°
5. Ã¥Â¯Â©Ã¦Å¸Â¥Ã¦â€¢Â´Ã¥â‚¬â€¹Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥ÂºÂ«Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¦Å“â€°Ã©Â¡Å¾Ã¤Â¼Â¼Ã¥â€¢ÂÃ©Â¡Å’
