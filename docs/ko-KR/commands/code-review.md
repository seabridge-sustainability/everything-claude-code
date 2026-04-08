# Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â°

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¬Â»Â¤Ã«Â°â€¹Ã«ÂËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬Ââ‚¬ Ã«Â³â‚¬ÃªÂ²Â½Ã¬â€šÂ¬Ã­â€¢Â­Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã­ÂÂ¬ÃªÂ´â€žÃ¬Â ÂÃ¬ÂÂ¸ Ã«Â³Â´Ã¬â€¢Ë† Ã«Â°Â Ã­â€™Ë†Ã¬Â§Ë† Ã«Â¦Â¬Ã«Â·Â°Ã«Â¥Â¼ Ã¬Ë†ËœÃ­â€“â€°Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

1. Ã«Â³â‚¬ÃªÂ²Â½Ã«ÂÅ“ Ã­Å’Å’Ã¬ÂÂ¼ Ã«ÂªÂ©Ã«Â¡Â Ã¬Â¡Â°Ã­Å¡Å’: git diff --name-only HEAD

2. ÃªÂ°Â Ã«Â³â‚¬ÃªÂ²Â½Ã«ÂÅ“ Ã­Å’Å’Ã¬ÂÂ¼Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Â´ Ã«â€¹Â¤Ã¬ÂÅ’Ã¬Ââ€ž ÃªÂ²â‚¬Ã¬â€šÂ¬Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

**Ã«Â³Â´Ã¬â€¢Ë† Ã¬ÂÂ´Ã¬Å Ë† (CRITICAL):**
- Ã­â€¢ËœÃ«â€œÅ“Ã¬Â½â€Ã«â€Â©Ã«ÂÅ“ Ã¬ÂÂ¸Ã¬Â¦Â Ã¬Â â€¢Ã«Â³Â´, API Ã­â€šÂ¤, Ã­â€ Â Ã­ÂÂ°
- SQL Ã¬ÂÂ¸Ã¬Â ÂÃ¬â€¦Ëœ Ã¬Â·Â¨Ã¬â€¢Â½Ã¬Â Â
- XSS Ã¬Â·Â¨Ã¬â€¢Â½Ã¬Â Â
- Ã«Ë†â€žÃ«ÂÂ½Ã«ÂÅ“ Ã¬Å¾â€¦Ã«Â Â¥ Ã¬Å“Â Ã­Å¡Â¨Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬â€šÂ¬
- Ã¬â€¢Ë†Ã¬Â â€žÃ­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬Ââ‚¬ Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ±
- ÃªÂ²Â½Ã«Â¡Å“ Ã­Æ’ÂÃ¬Æ’â€°(Path Traversal) Ã¬Å“â€žÃ­â€”Ëœ

**Ã¬Â½â€Ã«â€œÅ“ Ã­â€™Ë†Ã¬Â§Ë† (HIGH):**
- 50Ã¬Â¤â€ž Ã¬Â´Ë†ÃªÂ³Â¼ Ã­â€¢Â¨Ã¬Ë†Ëœ
- 800Ã¬Â¤â€ž Ã¬Â´Ë†ÃªÂ³Â¼ Ã­Å’Å’Ã¬ÂÂ¼
- 4Ã«â€¹Â¨ÃªÂ³â€ž Ã¬Â´Ë†ÃªÂ³Â¼ Ã¬Â¤â€˜Ã¬Â²Â© ÃªÂ¹Å Ã¬ÂÂ´
- Ã«Ë†â€žÃ«ÂÂ½Ã«ÂÅ“ Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Â²ËœÃ«Â¦Â¬
- Ã«â€â€Ã«Â²â€žÃªÂ·Â¸ Ã«Â¡Å“ÃªÂ¹â€¦ Ã«Â¬Â¸ÃªÂµÂ¬(Ã¬ËœË†: ÃªÂ°Å“Ã«Â°Å“Ã¬Å¡Â© Ã«Â¡Å“ÃªÂ·Â¸/print Ã«â€œÂ±)
- TODO/FIXME Ã¬Â£Â¼Ã¬â€žÂ
- Ã­â„¢Å“Ã¬â€žÂ± Ã¬â€“Â¸Ã¬â€“Â´Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ ÃªÂ³ÂµÃªÂ°Å“ API Ã«Â¬Â¸Ã¬â€žÅ“ Ã«Ë†â€žÃ«ÂÂ½(Ã¬ËœË†: JSDoc/Go doc/Docstring Ã«â€œÂ±)

**Ã«ÂªÂ¨Ã«Â²â€ Ã¬â€šÂ¬Ã«Â¡â‚¬ (MEDIUM):**
- Ã«Â³â‚¬Ã¬ÂÂ´(Mutation) Ã­Å’Â¨Ã­â€žÂ´ (Ã«Â¶Ë†Ã«Â³â‚¬ Ã­Å’Â¨Ã­â€žÂ´Ã¬Ââ€ž Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€)
- Ã¬Â½â€Ã«â€œÅ“/Ã¬Â£Â¼Ã¬â€žÂÃ¬ÂËœ Ã¬ÂÂ´Ã«ÂªÂ¨Ã¬Â§â‚¬ Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã¬Æ’Ë† Ã¬Â½â€Ã«â€œÅ“Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã«Ë†â€žÃ«ÂÂ½
- Ã¬Â â€˜ÃªÂ·Â¼Ã¬â€žÂ±(a11y) Ã«Â¬Â¸Ã¬Â Å“

3. Ã«â€¹Â¤Ã¬ÂÅ’Ã¬Ââ€ž Ã­ÂÂ¬Ã­â€¢Â¨Ã­â€¢Å“ Ã«Â³Â´ÃªÂ³Â Ã¬â€žÅ“Ã«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:
   - Ã¬â€¹Â¬ÃªÂ°ÂÃ«Ââ€ž: CRITICAL, HIGH, MEDIUM, LOW
   - Ã­Å’Å’Ã¬ÂÂ¼ Ã¬Å“â€žÃ¬Â¹Ëœ Ã«Â°Â Ã¬Â¤â€ž Ã«Â²Ë†Ã­ËœÂ¸
   - Ã¬ÂÂ´Ã¬Å Ë† Ã¬â€žÂ¤Ã«Âªâ€¦
   - Ã¬Ë†ËœÃ¬Â â€¢ Ã¬Â Å“Ã¬â€¢Ë†

4. CRITICAL Ã«ËœÂÃ«Å â€ HIGH Ã¬ÂÂ´Ã¬Å Ë†ÃªÂ°â‚¬ Ã«Â°Å“ÃªÂ²Â¬Ã«ÂËœÃ«Â©Â´ commitÃ¬Ââ€ž Ã¬Â°Â¨Ã«â€¹Â¨Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤

Ã«Â³Â´Ã¬â€¢Ë† Ã¬Â·Â¨Ã¬â€¢Â½Ã¬Â ÂÃ¬ÂÂ´ Ã¬Å¾Ë†Ã«Å â€ Ã¬Â½â€Ã«â€œÅ“Ã«Å â€ Ã¬Â Ë†Ã«Å’â‚¬ Ã¬Å Â¹Ã¬ÂÂ¸Ã­â€¢ËœÃ¬Â§â‚¬ Ã«Â§Ë†Ã¬â€žÂ¸Ã¬Å¡â€!
