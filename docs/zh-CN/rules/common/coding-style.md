# Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§Ã¯Â¼Ë†Ã¥â€¦Â³Ã©â€Â®Ã¯Â¼â€°

Ã¥Â§â€¹Ã§Â»Ë†Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦â€“Â°Ã¥Â¯Â¹Ã¨Â±Â¡Ã¯Â¼Å’Ã§Â»ÂÃ¤Â¸ÂÃ¦â€Â¹Ã¥ÂËœÃ§Å½Â°Ã¦Å“â€°Ã¥Â¯Â¹Ã¨Â±Â¡Ã¯Â¼Å¡

```
// Ã¤Â¼ÂªÃ¤Â»Â£Ã§Â Â
WRONG:  modify(original, field, value) Ã¢â€ â€™ Ã¥Å½Å¸Ã¥Å“Â°Ã¤Â¿Â®Ã¦â€Â¹ original
CORRECT: update(original, field, value) Ã¢â€ â€™ Ã¨Â¿â€Ã¥â€ºÅ¾Ã¥Å’â€¦Ã¥ÂÂ«Ã¦â€ºÂ´Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“Â°Ã¥â€°Â¯Ã¦Å“Â¬
```

Ã§Ââ€ Ã§â€Â±Ã¯Â¼Å¡Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â€¢Â°Ã¦ÂÂ®Ã¥ÂÂ¯Ã¤Â»Â¥Ã©ËœÂ²Ã¦Â­Â¢Ã©Å¡ÂÃ¨â€”ÂÃ§Å¡â€žÃ¥â€°Â¯Ã¤Â½Å“Ã§â€Â¨Ã¯Â¼Å’Ã¤Â½Â¿Ã¨Â°Æ’Ã¨Â¯â€¢Ã¦â€ºÂ´Ã¥Â®Â¹Ã¦Ëœâ€œÃ¯Â¼Å’Ã¥Â¹Â¶Ã¦â€Â¯Ã¦Å’ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¥Â¹Â¶Ã¥Ââ€˜Ã£â‚¬â€š

## Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â»â€žÃ§Â»â€¡

Ã¥Â¤Å¡Ã¤Â¸ÂªÃ¥Â°ÂÃ¦â€“â€¡Ã¤Â»Â¶ > Ã¥Â°â€˜Ã¦â€¢Â°Ã¥Â¤Â§Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡

* Ã©Â«ËœÃ¥â€ â€¦Ã¨ÂÅ¡Ã¯Â¼Å’Ã¤Â½Å½Ã¨â‚¬Â¦Ã¥ÂË†
* Ã©â‚¬Å¡Ã¥Â¸Â¸ 200-400 Ã¨Â¡Å’Ã¯Â¼Å’Ã¦Å“â‚¬Ã¥Â¤Å¡ 800 Ã¨Â¡Å’
* Ã¤Â»Å½Ã¥Â¤Â§Ã¥Å¾â€¹Ã¦Â¨Â¡Ã¥Ââ€”Ã¤Â¸Â­Ã¦ÂÂÃ¥Ââ€“Ã¥Â®Å¾Ã§â€Â¨Ã¥Â·Â¥Ã¥â€¦Â·
* Ã¦Å’â€°Ã¥Å Å¸Ã¨Æ’Â½/Ã©Â¢â€ Ã¥Å¸Å¸Ã§Â»â€žÃ§Â»â€¡Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¦Å’â€°Ã§Â±Â»Ã¥Å¾â€¹Ã§Â»â€žÃ§Â»â€¡

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

Ã¥Â§â€¹Ã§Â»Ë†Ã¥â€¦Â¨Ã©ÂÂ¢Ã¥Â¤â€žÃ§Ââ€ Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡

* Ã¥Å“Â¨Ã¦Â¯ÂÃ¤Â¸ÂªÃ¥Â±â€šÃ§ÂºÂ§Ã¦ËœÅ½Ã§Â¡Â®Ã¥Â¤â€žÃ§Ââ€ Ã©â€â„¢Ã¨Â¯Â¯
* Ã¥Å“Â¨Ã©ÂÂ¢Ã¥Ââ€˜Ã§â€Â¨Ã¦Ë†Â·Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¦ÂÂÃ¤Â¾â€ºÃ§â€Â¨Ã¦Ë†Â·Ã¥Ââ€¹Ã¥Â¥Â½Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¦Â¶Ë†Ã¦ÂÂ¯
* Ã¥Å“Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã§Â«Â¯Ã¨Â®Â°Ã¥Â½â€¢Ã¨Â¯Â¦Ã§Â»â€ Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡
* Ã§Â»ÂÃ¤Â¸ÂÃ©Â»ËœÃ©Â»ËœÃ¥Å“Â°Ã¥Â¿Â½Ã§â€¢Â¥Ã©â€â„¢Ã¨Â¯Â¯

## Ã¨Â¾â€œÃ¥â€¦Â¥Ã©ÂªÅ’Ã¨Â¯Â

Ã¥Â§â€¹Ã§Â»Ë†Ã¥Å“Â¨Ã§Â³Â»Ã§Â»Å¸Ã¨Â¾Â¹Ã§â€¢Å’Ã¥Â¤â€žÃ¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Å¡

* Ã¥Å“Â¨Ã¥Â¤â€žÃ§Ââ€ Ã¥â€°ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥
* Ã¥Å“Â¨Ã¥ÂÂ¯Ã§â€Â¨Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¦Â¨Â¡Ã¥Â¼ÂÃ§Å¡â€žÃ©ÂªÅ’Ã¨Â¯Â
* Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥Â¤Â±Ã¨Â´Â¥Ã¥Â¹Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¦Â¸â€¦Ã¦â„¢Â°Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¦Â¶Ë†Ã¦ÂÂ¯
* Ã§Â»ÂÃ¤Â¸ÂÃ¤Â¿Â¡Ã¤Â»Â»Ã¥Â¤â€“Ã©Æ’Â¨Ã¦â€¢Â°Ã¦ÂÂ®Ã¯Â¼Ë†API Ã¥â€œÂÃ¥Âºâ€Ã£â‚¬ÂÃ§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã£â‚¬ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¥â€ â€¦Ã¥Â®Â¹Ã¯Â¼â€°

## Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢

Ã¥Å“Â¨Ã¦Â â€¡Ã¨Â®Â°Ã¥Â·Â¥Ã¤Â½Å“Ã¥Â®Å’Ã¦Ë†ÂÃ¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å¡

* \[ ] Ã¤Â»Â£Ã§Â ÂÃ¥ÂÂ¯Ã¨Â¯Â»Ã¤Â¸â€Ã¥â€˜Â½Ã¥ÂÂÃ¨â€°Â¯Ã¥Â¥Â½
* \[ ] Ã¥â€¡Â½Ã¦â€¢Â°Ã§Å¸Â­Ã¥Â°ÂÃ¯Â¼Ë†<50 Ã¨Â¡Å’Ã¯Â¼â€°
* \[ ] Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸â€œÃ¦Â³Â¨Ã¯Â¼Ë†<800 Ã¨Â¡Å’Ã¯Â¼â€°
* \[ ] Ã¦Â²Â¡Ã¦Å“â€°Ã¦Â·Â±Ã¥ÂºÂ¦Ã¥ÂµÅ’Ã¥Â¥â€”Ã¯Â¼Ë†>4 Ã¥Â±â€šÃ¯Â¼â€°
* \[ ] Ã¦Â­Â£Ã§Â¡Â®Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 
* \[ ] Ã¦Â²Â¡Ã¦Å“â€°Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ§Å¡â€žÃ¥â‚¬Â¼Ã¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¸Â¸Ã©â€¡ÂÃ¦Ë†â€“Ã©â€¦ÂÃ§Â½Â®Ã¯Â¼â€°
* \[ ] Ã¦Â²Â¡Ã¦Å“â€°Ã§ÂªÂÃ¥ÂËœÃ¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼â€°
