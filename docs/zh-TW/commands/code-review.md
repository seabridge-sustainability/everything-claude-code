# Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¯Â©Ã¦Å¸Â¥

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¥Â°ÂÃ¦Å“ÂªÃ¦ÂÂÃ¤ÂºÂ¤Ã¨Â®Å Ã¦â€ºÂ´Ã©â‚¬Â²Ã¨Â¡Å’Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€™Å’Ã¥â€œÂÃ¨Â³ÂªÃ¥Â¯Â©Ã¦Å¸Â¥Ã¯Â¼Å¡

1. Ã¥Ââ€“Ã¥Â¾â€”Ã¨Â®Å Ã¦â€ºÂ´Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å¡git diff --name-only HEAD

2. Ã¥Â°ÂÃ¦Â¯ÂÃ¥â‚¬â€¹Ã¨Â®Å Ã¦â€ºÂ´Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å’Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¯Â¼Å¡

**Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Ë†Ã©â€”Å“Ã©ÂÂµÃ¯Â¼â€°Ã¯Â¼Å¡**
- Ã¥Â¯Â«Ã¦Â­Â»Ã§Å¡â€žÃ¦â€ â€˜Ã¨Â­â€°Ã£â‚¬ÂAPI Ã©â€¡â€˜Ã©â€˜Â°Ã£â‚¬ÂToken
- SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã¥Â¼Â±Ã©Â»Å¾
- XSS Ã¥Â¼Â±Ã©Â»Å¾
- Ã§Â¼ÂºÃ¥Â°â€˜Ã¨Â¼Â¸Ã¥â€¦Â¥Ã©Â©â€”Ã¨Â­â€°
- Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ§â€ºÂ¸Ã¤Â¾ÂÃ¦â‚¬Â§
- Ã¨Â·Â¯Ã¥Â¾â€˜Ã©ÂÂÃ¦Â­Â·Ã©Â¢Â¨Ã©Å¡Âª

**Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥â€œÂÃ¨Â³ÂªÃ¯Â¼Ë†Ã©Â«ËœÃ¯Â¼â€°Ã¯Â¼Å¡**
- Ã¥â€¡Â½Ã¥Â¼Â > 50 Ã¨Â¡Å’
- Ã¦Âªâ€Ã¦Â¡Ë† > 800 Ã¨Â¡Å’
- Ã¥Â·Â¢Ã§â€¹â‚¬Ã¦Â·Â±Ã¥ÂºÂ¦ > 4 Ã¥Â±Â¤
- Ã§Â¼ÂºÃ¥Â°â€˜Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ 
- console.log Ã©â„¢Â³Ã¨Â¿Â°Ã¥Â¼Â
- TODO/FIXME Ã¨Â¨Â»Ã¨Â§Â£
- Ã¥â€¦Â¬Ã©â€“â€¹ API Ã§Â¼ÂºÃ¥Â°â€˜ JSDoc

**Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢Ã¯Â¼Ë†Ã¤Â¸Â­Ã¯Â¼â€°Ã¯Â¼Å¡**
- Ã¨Â®Å Ã§â€¢Â°Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Ë†Ã¦â€¡â€°Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¨Â®Å Ã¯Â¼â€°
- Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼/Ã¨Â¨Â»Ã¨Â§Â£Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Æ’â€¦Ã§Â¬Â¦Ã¨â„¢Å¸
- Ã¦â€“Â°Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã§Â¼ÂºÃ¥Â°â€˜Ã¦Â¸Â¬Ã¨Â©Â¦
- Ã§â€žÂ¡Ã©Å¡Å“Ã§Â¤â„¢Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Ë†a11yÃ¯Â¼â€°

3. Ã§â€Â¢Ã§â€Å¸Ã¥Â Â±Ã¥â€˜Å Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡
   - Ã¥Å¡Â´Ã©â€¡ÂÃ¦â‚¬Â§Ã¯Â¼Å¡Ã©â€”Å“Ã©ÂÂµÃ£â‚¬ÂÃ©Â«ËœÃ£â‚¬ÂÃ¤Â¸Â­Ã£â‚¬ÂÃ¤Â½Å½
   - Ã¦Âªâ€Ã¦Â¡Ë†Ã¤Â½ÂÃ§Â½Â®Ã¥â€™Å’Ã¨Â¡Å’Ã¨â„¢Å¸
   - Ã¥â€¢ÂÃ©Â¡Å’Ã¦ÂÂÃ¨Â¿Â°
   - Ã¥Â»ÂºÃ¨Â­Â°Ã¤Â¿Â®Ã¥Â¾Â©

4. Ã¥Â¦â€šÃ¦Å¾Å“Ã§â„¢Â¼Ã§ÂÂ¾Ã©â€”Å“Ã©ÂÂµÃ¦Ë†â€“Ã©Â«ËœÃ¥â€žÂªÃ¥â€¦Ë†Ã¥â€¢ÂÃ©Â¡Å’Ã¥â€°â€¡Ã©ËœÂ»Ã¦â€œâ€¹Ã¦ÂÂÃ¤ÂºÂ¤

Ã§Âµâ€¢Ã¤Â¸ÂÃ¦â€°Â¹Ã¥â€¡â€ Ã¦Å“â€°Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Â¼Â±Ã©Â»Å¾Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¯Â¼Â
