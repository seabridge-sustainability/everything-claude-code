# Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦ÂÃ¦Â±â€š

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Ã¦Å“â‚¬Ã¤Â½Å½Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Å¡80%

Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Ë†Ã¥â€¦Â¨Ã©Æ’Â¨Ã¥Â¿â€¦Ã©Å“â‚¬Ã¯Â¼â€°Ã¯Â¼Å¡
1. **Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢** - Ã¥Ââ€¢Ã¤Â¸ÂªÃ¥â€¡Â½Ã¦â€¢Â°Ã£â‚¬ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã£â‚¬ÂÃ§Â»â€žÃ¤Â»Â¶
2. **Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢** - API Ã§Â«Â¯Ã§â€šÂ¹Ã£â‚¬ÂÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¦â€œÂÃ¤Â½Å“
3. **E2E Ã¦Âµâ€¹Ã¨Â¯â€¢** - Ã¥â€¦Â³Ã©â€Â®Ã§â€Â¨Ã¦Ë†Â·Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Ë†Ã¦Â¡â€ Ã¦Å¾Â¶Ã¦Â Â¹Ã¦ÂÂ®Ã¨Â¯Â­Ã¨Â¨â‚¬Ã©â‚¬â€°Ã¦â€¹Â©Ã¯Â¼â€°

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Â©Â±Ã¥Å Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜

Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ¯Â¼Å¡
1. Ã¥â€¦Ë†Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†REDÃ¯Â¼â€°
2. Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢ - Ã¥Âºâ€Ã¨Â¯Â¥Ã¥Â¤Â±Ã¨Â´Â¥
3. Ã§Â¼â€“Ã¥â€ â„¢Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Â®Å¾Ã§Å½Â°Ã¯Â¼Ë†GREENÃ¯Â¼â€°
4. Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢ - Ã¥Âºâ€Ã¨Â¯Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡
5. Ã©â€¡ÂÃ¦Å¾â€žÃ¯Â¼Ë†IMPROVEÃ¯Â¼â€°
6. Ã©ÂªÅ’Ã¨Â¯ÂÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Ë†80%+Ã¯Â¼â€°

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¤Â±Ã¨Â´Â¥Ã¦Å½â€™Ã¦Å¸Â¥

1. Ã¤Â½Â¿Ã§â€Â¨ **tdd-guide** Ã¤Â»Â£Ã§Ââ€ 
2. Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Å¡â€Ã§Â¦Â»
3. Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â¨Â¡Ã¦â€¹Å¸Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¦Â­Â£Ã§Â¡Â®
4. Ã¤Â¿Â®Ã¥Â¤ÂÃ¥Â®Å¾Ã§Å½Â°Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†Ã©â„¢Â¤Ã©ÂÅ¾Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Å“â€°Ã¨Â¯Â¯Ã¯Â¼â€°

## Ã¤Â»Â£Ã§Ââ€ Ã¦â€Â¯Ã¦Å’Â

- **tdd-guide** - Ã¤Â¸Â»Ã¥Å Â¨Ã§â€Â¨Ã¤ÂºÅ½Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¯Â¼Å’Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¥â€¦Ë†Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢
