# Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â€˜Â½Ã¤Â»Â¤

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¥Â¯Â¹Ã¥Â½â€œÃ¥â€°ÂÃ¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ§Å Â¶Ã¦â‚¬ÂÃ¦â€°Â§Ã¨Â¡Å’Ã¥â€¦Â¨Ã©ÂÂ¢Ã©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬â€š

## Ã¨Â¯Â´Ã¦ËœÅ½

Ã¨Â¯Â·Ã¤Â¸Â¥Ã¦Â Â¼Ã¦Å’â€°Ã§â€¦Â§Ã¤Â»Â¥Ã¤Â¸â€¹Ã©Â¡ÂºÃ¥ÂºÂÃ¦â€°Â§Ã¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Å¡

1. **Ã¦Å¾â€žÃ¥Â»ÂºÃ¦Â£â‚¬Ã¦Å¸Â¥**
   * Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Â­Â¤Ã©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€žÃ¦Å¾â€žÃ¥Â»ÂºÃ¥â€˜Â½Ã¤Â»Â¤
   * Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’Ã¦Å Â¥Ã¥â€˜Å Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¹Â¶**Ã¥ÂÅ“Ã¦Â­Â¢**

2. **Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥**
   * Ã¨Â¿ÂÃ¨Â¡Å’ TypeScript/Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥â„¢Â¨
   * Ã¦Å Â¥Ã¥â€˜Å Ã¦â€°â‚¬Ã¦Å“â€°Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¦â€“â€¡Ã¤Â»Â¶:Ã¨Â¡Å’Ã¥ÂÂ·

3. **Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥**
   * Ã¨Â¿ÂÃ¨Â¡Å’Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¥â„¢Â¨
   * Ã¦Å Â¥Ã¥â€˜Å Ã¨Â­Â¦Ã¥â€˜Å Ã¥â€™Å’Ã©â€â„¢Ã¨Â¯Â¯

4. **Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¥â€”Ã¤Â»Â¶**
   * Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢
   * Ã¦Å Â¥Ã¥â€˜Å Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€¢Â°Ã©â€¡Â
   * Ã¦Å Â¥Ã¥â€˜Å Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã§â„¢Â¾Ã¥Ë†â€ Ã¦Â¯â€

5. **Console.log Ã¥Â®Â¡Ã¨Â®Â¡**
   * Ã¥Å“Â¨Ã¦ÂºÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Â­Ã¦ÂÅ“Ã§Â´Â¢ console.log
   * Ã¦Å Â¥Ã¥â€˜Å Ã¤Â½ÂÃ§Â½Â®

6. **Git Ã§Å Â¶Ã¦â‚¬Â**
   * Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦Å“ÂªÃ¦ÂÂÃ¤ÂºÂ¤Ã§Å¡â€žÃ¦â€ºÂ´Ã¦â€Â¹
   * Ã¦ËœÂ¾Ã§Â¤ÂºÃ¨â€¡ÂªÃ¤Â¸Å Ã¦Â¬Â¡Ã¦ÂÂÃ¤ÂºÂ¤Ã¤Â»Â¥Ã¦ÂÂ¥Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶

## Ã¨Â¾â€œÃ¥â€¡Âº

Ã§â€Å¸Ã¦Ë†ÂÃ¤Â¸â‚¬Ã¤Â»Â½Ã§Â®â‚¬Ã¦Â´ÂÃ§Å¡â€žÃ©ÂªÅ’Ã¨Â¯ÂÃ¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

```
Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Å¡ [Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥]

Ã¦Å¾â€žÃ¥Â»ÂºÃ¯Â¼Å¡    [Ã¦Ë†ÂÃ¥Å Å¸/Ã¥Â¤Â±Ã¨Â´Â¥]
Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Å¡    [Ã¦Ë†ÂÃ¥Å Å¸/X Ã©â€â„¢Ã¨Â¯Â¯]
Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Å¡ [Ã¦Ë†ÂÃ¥Å Å¸/X Ã©â€”Â®Ã©Â¢Ëœ]
Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å¡    [X/Y Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼Å’Z% Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡]
Ã¥Â¯â€ Ã©â€™Â¥Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Å¡ [Ã¦Ë†ÂÃ¥Å Å¸/X Ã¥Ââ€˜Ã§Å½Â°]
Ã¦â€”Â¥Ã¥Â¿â€”Ã¯Â¼Å¡     [Ã¦Ë†ÂÃ¥Å Å¸/X console.logs]

Ã¥â€¡â€ Ã¥Â¤â€¡Ã¦ÂÂÃ¤ÂºÂ¤ PRÃ¯Â¼Å¡ [Ã¦ËœÂ¯/Ã¥ÂÂ¦]
```

Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â­ËœÃ¥Å“Â¨Ã¤Â»Â»Ã¤Â½â€¢Ã¥â€¦Â³Ã©â€Â®Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¥Ë†â€”Ã¥â€¡ÂºÃ¥Â®Æ’Ã¤Â»Â¬Ã¥Â¹Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¤Â¿Â®Ã¥Â¤ÂÃ¥Â»ÂºÃ¨Â®Â®Ã£â‚¬â€š

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS Ã¥ÂÂ¯Ã¤Â»Â¥Ã¦ËœÂ¯Ã¯Â¼Å¡

* `quick` - Ã¤Â»â€¦Ã¦Å¾â€žÃ¥Â»Âº + Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥
* `full` - Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼â€°
* `pre-commit` - Ã¤Â¸Å½Ã¦ÂÂÃ¤ÂºÂ¤Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥
* `pre-pr` - Ã¥Â®Å’Ã¦â€¢Â´Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥Å Â Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂ
