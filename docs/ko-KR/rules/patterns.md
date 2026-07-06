# ÃªÂ³ÂµÃ­â€ Âµ Ã­Å’Â¨Ã­â€žÂ´

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


## Ã¬Å Â¤Ã¬Â¼Ë†Ã«Â Ë†Ã­â€ Â¤ Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸

Ã¬Æ’Ë† ÃªÂ¸Â°Ã«Å Â¥Ã¬Ââ€ž ÃªÂµÂ¬Ã­Ëœâ€žÃ­â€¢Â  Ã«â€¢Å’:
1. ÃªÂ²â‚¬Ã¬Â¦ÂÃ«ÂÅ“ Ã¬Å Â¤Ã¬Â¼Ë†Ã«Â Ë†Ã­â€ Â¤ Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸Ã«Â¥Â¼ ÃªÂ²â‚¬Ã¬Æ’â€°
2. Ã«Â³â€˜Ã«Â Â¬ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã«Â¡Å“ Ã¬ËœÂµÃ¬â€¦Ëœ Ã­Ââ€°ÃªÂ°â‚¬:
   - Ã«Â³Â´Ã¬â€¢Ë† Ã­Ââ€°ÃªÂ°â‚¬
   - Ã­â„¢â€¢Ã¬Å¾Â¥Ã¬â€žÂ± Ã«Â¶â€žÃ¬â€žÂ
   - ÃªÂ´â‚¬Ã«Â Â¨Ã¬â€žÂ± Ã¬Â ÂÃ¬Ë†Ëœ
   - ÃªÂµÂ¬Ã­Ëœâ€ž ÃªÂ³â€žÃ­Å¡Â
3. ÃªÂ°â‚¬Ã¬Å¾Â¥ Ã¬Â ÂÃ­â€¢Â©Ã­â€¢Å“ ÃªÂ²Æ’Ã¬Ââ€ž ÃªÂ¸Â°Ã«Â°ËœÃ¬Å“Â¼Ã«Â¡Å“ Ã­ÂÂ´Ã«Â¡Â 
4. ÃªÂ²â‚¬Ã¬Â¦ÂÃ«ÂÅ“ ÃªÂµÂ¬Ã¬Â¡Â° Ã«â€šÂ´Ã¬â€”ÂÃ¬â€žÅ“ Ã«Â°ËœÃ«Â³Âµ ÃªÂ°Å“Ã¬â€žÂ 

## Ã«â€â€Ã¬Å¾ÂÃ¬ÂÂ¸ Ã­Å’Â¨Ã­â€žÂ´

### Ã«Â¦Â¬Ã­ÂÂ¬Ã¬Â§â‚¬Ã­â€ Â Ã«Â¦Â¬ Ã­Å’Â¨Ã­â€žÂ´

Ã¬ÂÂ¼ÃªÂ´â‚¬Ã«ÂÅ“ Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤ Ã«â€™Â¤Ã¬â€”Â Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬Â â€˜ÃªÂ·Â¼Ã¬Ââ€ž Ã¬ÂºÂ¡Ã¬Å ÂÃ­â„¢â€:
- Ã­â€˜Å“Ã¬Â¤â‚¬ Ã¬Å¾â€˜Ã¬â€”â€¦ Ã¬Â â€¢Ã¬ÂËœ: findAll, findById, create, update, delete
- ÃªÂµÂ¬Ã¬Â²Â´Ã¬Â Â ÃªÂµÂ¬Ã­Ëœâ€žÃ¬ÂÂ´ Ã¬Â â‚¬Ã¬Å¾Â¥Ã¬â€ Å’ Ã¬â€žÂ¸Ã«Â¶â‚¬Ã¬â€šÂ¬Ã­â€¢Â­ Ã¬Â²ËœÃ«Â¦Â¬ (Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤, API, Ã­Å’Å’Ã¬ÂÂ¼ Ã«â€œÂ±)
- Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Â¡Å“Ã¬Â§ÂÃ¬Ââ‚¬ Ã¬Â â‚¬Ã¬Å¾Â¥Ã¬â€ Å’ Ã«Â©â€Ã¬Â»Â¤Ã«â€¹Ë†Ã¬Â¦ËœÃ¬ÂÂ´ Ã¬â€¢â€žÃ«â€¹Å’ Ã¬Â¶â€Ã¬Æ’Â Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤Ã¬â€”Â Ã¬ÂËœÃ¬Â¡Â´
- Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬â€ Å’Ã¬Å Â¤Ã¬ÂËœ Ã¬â€°Â¬Ã¬Å¡Â´ ÃªÂµÂÃ¬Â²Â´ Ã«Â°Â Ã«ÂªÂ¨Ã­â€šÂ¹Ã¬Ââ€ž Ã­â€ ÂµÃ­â€¢Å“ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã«â€¹Â¨Ã¬Ë†Å“Ã­â„¢â€ ÃªÂ°â‚¬Ã«Å Â¥

### API Ã¬Ââ€˜Ã«â€¹Âµ Ã­Ëœâ€¢Ã¬â€¹Â

Ã«ÂªÂ¨Ã«â€œÂ  API Ã¬Ââ€˜Ã«â€¹ÂµÃ¬â€”Â Ã¬ÂÂ¼ÃªÂ´â‚¬Ã«ÂÅ“ Ã¬â€”â€Ã«Â²Â¨Ã«Â¡Å“Ã­â€â€ž Ã¬â€šÂ¬Ã¬Å¡Â©:
- Ã¬â€žÂ±ÃªÂ³Âµ/Ã¬Æ’ÂÃ­Æ’Å“ Ã­â€˜Å“Ã¬â€¹Å“Ã¬Å¾Â Ã­ÂÂ¬Ã­â€¢Â¨
- Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã­Å½ËœÃ¬ÂÂ´Ã«Â¡Å“Ã«â€œÅ“ Ã­ÂÂ¬Ã­â€¢Â¨ (Ã¬â€”ÂÃ«Å¸Â¬ Ã¬â€¹Å“ null)
- Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â©â€Ã¬â€¹Å“Ã¬Â§â‚¬ Ã­â€¢â€žÃ«â€œÅ“ Ã­ÂÂ¬Ã­â€¢Â¨ (Ã¬â€žÂ±ÃªÂ³Âµ Ã¬â€¹Å“ null)
- Ã­Å½ËœÃ¬ÂÂ´Ã¬Â§â‚¬Ã«â€žÂ¤Ã¬ÂÂ´Ã¬â€¦Ëœ Ã¬Ââ€˜Ã«â€¹ÂµÃ¬â€”Â Ã«Â©â€Ã­Æ’â‚¬Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã­ÂÂ¬Ã­â€¢Â¨ (total, page, limit)
