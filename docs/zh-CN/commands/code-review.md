# Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¥Â¯Â¹Ã¦Å“ÂªÃ¦ÂÂÃ¤ÂºÂ¤Ã§Å¡â€žÃ¦â€ºÂ´Ã¦â€Â¹Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€™Å’Ã¨Â´Â¨Ã©â€¡ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼Å¡

1. Ã¨Å½Â·Ã¥Ââ€“Ã¦â€ºÂ´Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡`git diff --name-only HEAD`

2. Ã¥Â¯Â¹Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦â€ºÂ´Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å’Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Å¡

**Ã¥Â®â€°Ã¥â€¦Â¨Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†Ã¤Â¸Â¥Ã©â€¡ÂÃ¯Â¼â€°Ã¯Â¼Å¡**

* Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ§Å¡â€žÃ¥â€¡Â­Ã¦ÂÂ®Ã£â‚¬ÂAPI Ã¥Â¯â€ Ã©â€™Â¥Ã£â‚¬ÂÃ¤Â»Â¤Ã§â€°Å’
* SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã¦Â¼ÂÃ¦Â´Å¾
* XSS Ã¦Â¼ÂÃ¦Â´Å¾
* Ã§Â¼ÂºÃ¥Â°â€˜Ã¨Â¾â€œÃ¥â€¦Â¥Ã©ÂªÅ’Ã¨Â¯Â
* Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹
* Ã¨Â·Â¯Ã¥Â¾â€žÃ©ÂÂÃ¥Å½â€ Ã©Â£Å½Ã©â„¢Â©

**Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡ÂÃ¯Â¼Ë†Ã©Â«ËœÃ¯Â¼â€°Ã¯Â¼Å¡**

* Ã¥â€¡Â½Ã¦â€¢Â°Ã©â€¢Â¿Ã¥ÂºÂ¦Ã¨Â¶â€¦Ã¨Â¿â€¡ 50 Ã¨Â¡Å’
* Ã¦â€“â€¡Ã¤Â»Â¶Ã©â€¢Â¿Ã¥ÂºÂ¦Ã¨Â¶â€¦Ã¨Â¿â€¡ 800 Ã¨Â¡Å’
* Ã¥ÂµÅ’Ã¥Â¥â€”Ã¦Â·Â±Ã¥ÂºÂ¦Ã¨Â¶â€¦Ã¨Â¿â€¡ 4 Ã¥Â±â€š
* Ã§Â¼ÂºÃ¥Â°â€˜Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 
* `console.log` Ã¨Â¯Â­Ã¥ÂÂ¥
* `TODO`/`FIXME` Ã¦Â³Â¨Ã©â€¡Å 
* Ã¥â€¦Â¬Ã¥â€¦Â± API Ã§Â¼ÂºÃ¥Â°â€˜ JSDoc

**Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·ÂµÃ¯Â¼Ë†Ã¤Â¸Â­Ã¯Â¼â€°Ã¯Â¼Å¡**

* Ã¥ÂÂ¯Ã¥ÂËœÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Ë†Ã¥Âºâ€Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼â€°
* Ã¤Â»Â£Ã§Â Â/Ã¦Â³Â¨Ã©â€¡Å Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Æ’â€¦Ã§Â¬Â¦Ã¥ÂÂ·
* Ã¦â€“Â°Ã¤Â»Â£Ã§Â ÂÃ§Â¼ÂºÃ¥Â°â€˜Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã¦â€”Â Ã©Å¡Å“Ã§Â¢ÂÃ¦â‚¬Â§Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†a11yÃ¯Â¼â€°

3. Ã§â€Å¸Ã¦Ë†ÂÃ¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡
   * Ã¤Â¸Â¥Ã©â€¡ÂÃ¦â‚¬Â§Ã¯Â¼Å¡Ã¤Â¸Â¥Ã©â€¡ÂÃ£â‚¬ÂÃ©Â«ËœÃ£â‚¬ÂÃ¤Â¸Â­Ã£â‚¬ÂÃ¤Â½Å½
   * Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â½ÂÃ§Â½Â®Ã¥â€™Å’Ã¨Â¡Å’Ã¥ÂÂ·
   * Ã©â€”Â®Ã©Â¢ËœÃ¦ÂÂÃ¨Â¿Â°
   * Ã¥Â»ÂºÃ¨Â®Â®Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¤ÂÃ¦â€“Â¹Ã¦Â³â€¢

4. Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Ââ€˜Ã§Å½Â°Ã¤Â¸Â¥Ã©â€¡ÂÃ¦Ë†â€“Ã©Â«ËœÃ¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¥Ë†â„¢Ã©ËœÂ»Ã¦Â­Â¢Ã¦ÂÂÃ¤ÂºÂ¤

Ã§Â»ÂÃ¤Â¸ÂÃ¥â€¦ÂÃ¨Â®Â¸Ã¥Å’â€¦Ã¥ÂÂ«Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¼ÂÃ¦Â´Å¾Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¯Â¼Â
