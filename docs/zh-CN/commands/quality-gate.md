# Ã¨Â´Â¨Ã©â€¡ÂÃ©â€”Â¨Ã¥â€˜Â½Ã¤Â»Â¤

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦Å’â€°Ã©Å“â‚¬Ã¥Â¯Â¹Ã¦â€“â€¡Ã¤Â»Â¶Ã¦Ë†â€“Ã©Â¡Â¹Ã§â€ºÂ®Ã¨Å’Æ’Ã¥â€ºÂ´Ã¨Â¿ÂÃ¨Â¡Å’ ECC Ã¨Â´Â¨Ã©â€¡ÂÃ§Â®Â¡Ã©Ââ€œÃ£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

`/quality-gate [path|.] [--fix] [--strict]`

* Ã©Â»ËœÃ¨Â®Â¤Ã§â€ºÂ®Ã¦Â â€¡Ã¯Â¼Å¡Ã¥Â½â€œÃ¥â€°ÂÃ§â€ºÂ®Ã¥Â½â€¢ (`.`)
* `--fix`Ã¯Â¼Å¡Ã¥Å“Â¨Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®Ã§Å¡â€žÃ¥Å“Â°Ã¦â€“Â¹Ã¥â€¦ÂÃ¨Â®Â¸Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“/Ã¤Â¿Â®Ã¥Â¤Â
* `--strict`Ã¯Â¼Å¡Ã¥Å“Â¨Ã¦â€Â¯Ã¦Å’ÂÃ§Å¡â€žÃ¥Å“Â°Ã¦â€“Â¹Ã¨Â­Â¦Ã¥â€˜Å Ã¥ÂÂ³Ã¥Â¤Â±Ã¨Â´Â¥

## Ã§Â®Â¡Ã©Ââ€œ

1. Ã¦Â£â‚¬Ã¦Âµâ€¹Ã§â€ºÂ®Ã¦Â â€¡Ã§Å¡â€žÃ¨Â¯Â­Ã¨Â¨â‚¬/Ã¥Â·Â¥Ã¥â€¦Â·Ã£â‚¬â€š
2. Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã¦Â£â‚¬Ã¦Å¸Â¥Ã£â‚¬â€š
3. Ã¥Å“Â¨Ã¥ÂÂ¯Ã§â€Â¨Ã¦â€”Â¶Ã¨Â¿ÂÃ¨Â¡Å’Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥/Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥Ã£â‚¬â€š
4. Ã§â€Å¸Ã¦Ë†ÂÃ§Â®â‚¬Ã¦Â´ÂÃ§Å¡â€žÃ¤Â¿Â®Ã¥Â¤ÂÃ¥Ë†â€”Ã¨Â¡Â¨Ã£â‚¬â€š

## Ã¥Â¤â€¡Ã¦Â³Â¨

Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã©â€¢Å“Ã¥Æ’ÂÃ¤Âºâ€ Ã©â€™Â©Ã¥Â­ÂÃ¨Â¡Å’Ã¤Â¸ÂºÃ¯Â¼Å’Ã¤Â½â€ Ã§â€Â±Ã¦â€œÂÃ¤Â½Å“Ã¥â€˜ËœÃ¨Â°Æ’Ã§â€Â¨Ã£â‚¬â€š

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS:

* `[path|.]` Ã¥ÂÂ¯Ã©â‚¬â€°Ã§Å¡â€žÃ§â€ºÂ®Ã¦Â â€¡Ã¨Â·Â¯Ã¥Â¾â€ž
* `--fix` Ã¥ÂÂ¯Ã©â‚¬â€°
* `--strict` Ã¥ÂÂ¯Ã©â‚¬â€°
