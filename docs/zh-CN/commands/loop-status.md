# Ã¥Â¾ÂªÃ§Å½Â¯Ã§Å Â¶Ã¦â‚¬ÂÃ¥â€˜Â½Ã¤Â»Â¤

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â´Â»Ã¥Å Â¨Ã¥Â¾ÂªÃ§Å½Â¯Ã§Å Â¶Ã¦â‚¬ÂÃ£â‚¬ÂÃ¨Â¿â€ºÃ¥ÂºÂ¦Ã¥â€™Å’Ã¦â€¢â€¦Ã©Å¡Å“Ã¤Â¿Â¡Ã¥ÂÂ·Ã£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

`/loop-status [--watch]`

## Ã¦Å Â¥Ã¥â€˜Å Ã¥â€ â€¦Ã¥Â®Â¹

* Ã¦Â´Â»Ã¥Å Â¨Ã¥Â¾ÂªÃ§Å½Â¯Ã¦Â¨Â¡Ã¥Â¼Â
* Ã¥Â½â€œÃ¥â€°ÂÃ©ËœÂ¶Ã¦Â®ÂµÃ¥â€™Å’Ã¦Å“â‚¬Ã¥ÂÅ½Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Ë†ÂÃ¥Å Å¸Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹
* Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å“â€°Ã¯Â¼â€°
* Ã©Â¢â€žÃ¨Â®Â¡Ã§Å¡â€žÃ¦â€”Â¶Ã©â€”Â´/Ã¦Ë†ÂÃ¦Å“Â¬Ã¥ÂÂÃ¥Â·Â®
* Ã¥Â»ÂºÃ¨Â®Â®Ã§Å¡â€žÃ¥Â¹Â²Ã©Â¢â€žÃ¦Å½ÂªÃ¦â€“Â½Ã¯Â¼Ë†Ã§Â»Â§Ã§Â»Â­/Ã¦Å¡â€šÃ¥ÂÅ“/Ã¥ÂÅ“Ã¦Â­Â¢Ã¯Â¼â€°

## Ã§â€ºâ€˜Ã¨Â§â€ Ã¦Â¨Â¡Ã¥Â¼Â

Ã¥Â½â€œ `--watch` Ã¥Â­ËœÃ¥Å“Â¨Ã¦â€”Â¶Ã¯Â¼Å’Ã¥Â®Å¡Ã¦Å“Å¸Ã¥Ë†Â·Ã¦â€“Â°Ã§Å Â¶Ã¦â‚¬ÂÃ¥Â¹Â¶Ã¦ËœÂ¾Ã§Â¤ÂºÃ§Å Â¶Ã¦â‚¬ÂÃ¥ÂËœÃ¥Å’â€“Ã£â‚¬â€š

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS:

* `--watch` Ã¥ÂÂ¯Ã©â‚¬â€°
