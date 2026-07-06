# Ã«Â³Â´Ã¬â€¢Ë† ÃªÂ°â‚¬Ã¬ÂÂ´Ã«â€œÅ“Ã«ÂÂ¼Ã¬ÂÂ¸

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


## Ã­â€¢â€žÃ¬Ë†Ëœ Ã«Â³Â´Ã¬â€¢Ë† Ã¬Â ÂÃªÂ²â‚¬

Ã«ÂªÂ¨Ã«â€œÂ  Ã¬Â»Â¤Ã«Â°â€¹ Ã¬Â â€ž:
- [ ] Ã­â€¢ËœÃ«â€œÅ“Ã¬Â½â€Ã«â€Â©Ã«ÂÅ“ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿Ã¬ÂÂ´ Ã¬â€”â€ Ã«Å â€ÃªÂ°â‚¬ (API Ã­â€šÂ¤, Ã«Â¹â€žÃ«Â°â‚¬Ã«Â²Ë†Ã­ËœÂ¸, Ã­â€ Â Ã­ÂÂ°)
- [ ] Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã¬Å¾â€¦Ã«Â Â¥Ã¬ÂÂ´ ÃªÂ²â‚¬Ã¬Â¦ÂÃ«ÂËœÃ¬â€”Ë†Ã«Å â€ÃªÂ°â‚¬
- [ ] SQL Ã¬ÂÂ¸Ã¬Â ÂÃ¬â€¦Ëœ Ã«Â°Â©Ã¬Â§â‚¬ÃªÂ°â‚¬ Ã«ÂËœÃ¬â€”Ë†Ã«Å â€ÃªÂ°â‚¬ (Ã«Â§Â¤ÃªÂ°Å“Ã«Â³â‚¬Ã¬Ë†ËœÃ­â„¢â€Ã«ÂÅ“ Ã¬Â¿Â¼Ã«Â¦Â¬)
- [ ] XSS Ã«Â°Â©Ã¬Â§â‚¬ÃªÂ°â‚¬ Ã«ÂËœÃ¬â€”Ë†Ã«Å â€ÃªÂ°â‚¬ (HTML Ã¬Æ’Ë†Ã«â€¹Ë†Ã­Æ’â‚¬Ã¬ÂÂ´Ã¬Â§â€¢)
- [ ] CSRF Ã«Â³Â´Ã­ËœÂ¸ÃªÂ°â‚¬ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂËœÃ¬â€”Ë†Ã«Å â€ÃªÂ°â‚¬
- [ ] Ã¬ÂÂ¸Ã¬Â¦Â/Ã¬ÂÂ¸ÃªÂ°â‚¬ÃªÂ°â‚¬ ÃªÂ²â‚¬Ã¬Â¦ÂÃ«ÂËœÃ¬â€”Ë†Ã«Å â€ÃªÂ°â‚¬
- [ ] Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€”â€Ã«â€œÅ“Ã­ÂÂ¬Ã¬ÂÂ¸Ã­Å Â¸Ã¬â€”Â Ã¬â€ ÂÃ«Ââ€ž Ã¬Â Å“Ã­â€¢Å“Ã¬ÂÂ´ Ã¬Å¾Ë†Ã«Å â€ÃªÂ°â‚¬
- [ ] Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â©â€Ã¬â€¹Å“Ã¬Â§â‚¬ÃªÂ°â‚¬ Ã«Â¯Â¼ÃªÂ°ÂÃ­â€¢Å“ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â¥Â¼ Ã«â€¦Â¸Ã¬Â¶Å“Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã«Å â€ÃªÂ°â‚¬

## Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ ÃªÂ´â‚¬Ã«Â¦Â¬

- Ã¬â€ Å’Ã¬Å Â¤ Ã¬Â½â€Ã«â€œÅ“Ã¬â€”Â Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿Ã¬Ââ€ž Ã¬Â Ë†Ã«Å’â‚¬ Ã­â€¢ËœÃ«â€œÅ“Ã¬Â½â€Ã«â€Â©Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â°
- Ã­â€¢Â­Ã¬Æ’Â Ã­â„¢ËœÃªÂ²Â½ Ã«Â³â‚¬Ã¬Ë†ËœÃ«â€šËœ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬ Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã¬â€¹Å“Ã¬Å¾â€˜ Ã¬â€¹Å“ Ã­â€¢â€žÃ¬Å¡â€Ã­â€¢Å“ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿Ã¬ÂÂ´ Ã¬Â¡Â´Ã¬Å¾Â¬Ã­â€¢ËœÃ«Å â€Ã¬Â§â‚¬ ÃªÂ²â‚¬Ã¬Â¦Â
- Ã«â€¦Â¸Ã¬Â¶Å“Ã«ÂËœÃ¬â€”Ë†Ã¬Ââ€ž Ã¬Ë†Ëœ Ã¬Å¾Ë†Ã«Å â€ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿Ã¬Ââ‚¬ ÃªÂµÂÃ¬Â²Â´

## Ã«Â³Â´Ã¬â€¢Ë† Ã«Å’â‚¬Ã¬Ââ€˜ Ã­â€â€žÃ«Â¡Å“Ã­â€ Â Ã¬Â½Å“

Ã«Â³Â´Ã¬â€¢Ë† Ã¬ÂÂ´Ã¬Å Ë† Ã«Â°Å“ÃªÂ²Â¬ Ã¬â€¹Å“:
1. Ã¬Â¦â€°Ã¬â€¹Å“ Ã¬Â¤â€˜Ã«â€¹Â¨
2. **security-reviewer** Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬â€šÂ¬Ã¬Å¡Â©
3. ÃªÂ³â€žÃ¬â€ Â Ã¬Â§â€žÃ­â€“â€°Ã­â€¢ËœÃªÂ¸Â° Ã¬Â â€žÃ¬â€”Â Ã¬Â¹ËœÃ«Âªâ€¦Ã¬Â Â Ã¬ÂÂ´Ã¬Å Ë† Ã¬Ë†ËœÃ¬Â â€¢
4. Ã«â€¦Â¸Ã¬Â¶Å“Ã«ÂÅ“ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ ÃªÂµÂÃ¬Â²Â´
5. Ã¬Å“Â Ã¬â€šÂ¬Ã­â€¢Å“ Ã¬ÂÂ´Ã¬Å Ë†ÃªÂ°â‚¬ Ã¬Å¾Ë†Ã«Å â€Ã¬Â§â‚¬ Ã¬Â â€žÃ¬Â²Â´ Ã¬Â½â€Ã«â€œÅ“Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ ÃªÂ²â‚¬Ã­â€ Â 
