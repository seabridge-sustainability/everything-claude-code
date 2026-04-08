# Ã¥Â¾ÂªÃ§Å½Â¯Ã¥ÂÂ¯Ã¥Å Â¨Ã¥â€˜Â½Ã¤Â»Â¤

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¤Â½Â¿Ã§â€Â¨Ã¥Â®â€°Ã¥â€¦Â¨Ã©Â»ËœÃ¨Â®Â¤Ã¨Â®Â¾Ã§Â½Â®Ã¥ÂÂ¯Ã¥Å Â¨Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Ââ€”Ã§Â®Â¡Ã§Ââ€ Ã§Å¡â€žÃ¨â€¡ÂªÃ¤Â¸Â»Ã¥Â¾ÂªÃ§Å½Â¯Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

`/loop-start [pattern] [--mode safe|fast]`

* `pattern`: `sequential`, `continuous-pr`, `rfc-dag`, `infinite`
* `--mode`:
  * `safe` (Ã©Â»ËœÃ¨Â®Â¤): Ã¤Â¸Â¥Ã¦Â Â¼Ã§Å¡â€žÃ¨Â´Â¨Ã©â€¡ÂÃ©â€”Â¨Ã§Â¦ÂÃ¥â€™Å’Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹
  * `fast`: Ã¤Â¸ÂºÃ©â‚¬Å¸Ã¥ÂºÂ¦Ã¨â‚¬Å’Ã¥â€¡ÂÃ¥Â°â€˜Ã©â€”Â¨Ã§Â¦Â

## Ã¦ÂµÂÃ§Â¨â€¹

1. Ã§Â¡Â®Ã¨Â®Â¤Ã¤Â»â€œÃ¥Âºâ€œÃ§Å Â¶Ã¦â‚¬ÂÃ¥â€™Å’Ã¥Ë†â€ Ã¦â€Â¯Ã§Â­â€“Ã§â€¢Â¥Ã£â‚¬â€š
2. Ã©â‚¬â€°Ã¦â€¹Â©Ã¥Â¾ÂªÃ§Å½Â¯Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥â€™Å’Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥Â±â€šÃ§ÂºÂ§Ã§Â­â€“Ã§â€¢Â¥Ã£â‚¬â€š
3. Ã¤Â¸ÂºÃ¦â€°â‚¬Ã©â‚¬â€°Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥ÂÂ¯Ã§â€Â¨Ã¦â€°â‚¬Ã©Å“â‚¬Ã§Å¡â€žÃ©â€™Â©Ã¥Â­Â/Ã©â€¦ÂÃ§Â½Â®Ã¦â€“â€¡Ã¤Â»Â¶Ã£â‚¬â€š
4. Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Â¾ÂªÃ§Å½Â¯Ã¨Â®Â¡Ã¥Ë†â€™Ã¥Â¹Â¶Ã¥Å“Â¨ `.claude/plans/` Ã¤Â¸â€¹Ã§Â¼â€“Ã¥â€ â„¢Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€°â€¹Ã¥â€ Å’Ã£â‚¬â€š
5. Ã¦â€°â€œÃ¥ÂÂ°Ã§â€Â¨Ã¤ÂºÅ½Ã¥ÂÂ¯Ã¥Å Â¨Ã¥â€™Å’Ã§â€ºâ€˜Ã¦Å½Â§Ã¥Â¾ÂªÃ§Å½Â¯Ã§Å¡â€žÃ¥â€˜Â½Ã¤Â»Â¤Ã£â‚¬â€š

## Ã¥Â¿â€¦Ã©Å“â‚¬Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥

* Ã¥Å“Â¨Ã©Â¦â€“Ã¦Â¬Â¡Ã¥Â¾ÂªÃ§Å½Â¯Ã¨Â¿Â­Ã¤Â»Â£Ã¥â€°ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã£â‚¬â€š
* Ã§Â¡Â®Ã¤Â¿Â `ECC_HOOK_PROFILE` Ã¦Å“ÂªÃ¥Å“Â¨Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¨Å’Æ’Ã¥â€ºÂ´Ã¥â€ â€¦Ã¨Â¢Â«Ã§Â¦ÂÃ§â€Â¨Ã£â‚¬â€š
* Ã§Â¡Â®Ã¤Â¿ÂÃ¥Â¾ÂªÃ§Å½Â¯Ã¦Å“â€°Ã¦ËœÅ½Ã§Â¡Â®Ã§Å¡â€žÃ¥ÂÅ“Ã¦Â­Â¢Ã¦ÂÂ¡Ã¤Â»Â¶Ã£â‚¬â€š

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS:

* `<pattern>` Ã¥ÂÂ¯Ã©â‚¬â€° (`sequential|continuous-pr|rfc-dag|infinite`)
* `--mode safe|fast` Ã¥ÂÂ¯Ã©â‚¬â€°
