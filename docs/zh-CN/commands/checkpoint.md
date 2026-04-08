# Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¥â€˜Â½Ã¤Â»Â¤

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¥Å“Â¨Ã¤Â½Â Ã§Å¡â€žÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ¤Â¸Â­Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦Ë†â€“Ã©ÂªÅ’Ã¨Â¯ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

`/checkpoint [create|verify|list] [name]`

## Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹

Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¦â€”Â¶Ã¯Â¼Å¡

1. Ã¨Â¿ÂÃ¨Â¡Å’ `/verify quick` Ã¤Â»Â¥Ã§Â¡Â®Ã¤Â¿ÂÃ¥Â½â€œÃ¥â€°ÂÃ§Å Â¶Ã¦â‚¬ÂÃ¦ËœÂ¯Ã¥Â¹Â²Ã¥â€¡â‚¬Ã§Å¡â€ž
2. Ã¤Â½Â¿Ã§â€Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¥ÂÂÃ§Â§Â°Ã¥Ë†â€ºÃ¥Â»ÂºÃ¤Â¸â‚¬Ã¤Â¸Âª git stash Ã¦Ë†â€“Ã¦ÂÂÃ¤ÂºÂ¤
3. Ã¥Â°â€ Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¨Â®Â°Ã¥Â½â€¢Ã¥Ë†Â° `.claude/checkpoints.log`Ã¯Â¼Å¡

```bash
echo "$(date +%Y-%m-%d-%H:%M) | $CHECKPOINT_NAME | $(git rev-parse --short HEAD)" >> .claude/checkpoints.log
```

4. Ã¦Å Â¥Ã¥â€˜Å Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¥Â·Â²Ã¥Ë†â€ºÃ¥Â»Âº

## Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹

Ã¦Â Â¹Ã¦ÂÂ®Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¦â€”Â¶Ã¯Â¼Å¡

1. Ã¤Â»Å½Ã¦â€”Â¥Ã¥Â¿â€”Ã¤Â¸Â­Ã¨Â¯Â»Ã¥Ââ€“Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹

2. Ã¥Â°â€ Ã¥Â½â€œÃ¥â€°ÂÃ§Å Â¶Ã¦â‚¬ÂÃ¤Â¸Å½Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Â¯â€Ã¨Â¾Æ’Ã¯Â¼Å¡
   * Ã¨â€¡ÂªÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¤Â»Â¥Ã¦ÂÂ¥Ã¦â€“Â°Ã¥Â¢Å¾Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶
   * Ã¨â€¡ÂªÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¤Â»Â¥Ã¦ÂÂ¥Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶
   * Ã§Å½Â°Ã¥Å“Â¨Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã§Å½â€¡Ã¤Â¸Å½Ã¥Â½â€œÃ¦â€”Â¶Ã¥Â¯Â¹Ã¦Â¯â€
   * Ã§Å½Â°Ã¥Å“Â¨Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¤Â¸Å½Ã¥Â½â€œÃ¦â€”Â¶Ã¥Â¯Â¹Ã¦Â¯â€

3. Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

```
Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¥Â¯Â¹Ã¦Â¯â€Ã¯Â¼Å¡$NAME
============================
Ã¦â€“â€¡Ã¤Â»Â¶Ã¦â€ºÂ´Ã¦â€Â¹Ã¦â€¢Â°Ã¯Â¼Å¡X
Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â»â€œÃ¦Å¾Å“Ã¯Â¼Å¡Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦â€¢Â° +Y / Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€¢Â° -Z
Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Å¡+X% / -Y%
Ã¦Å¾â€žÃ¥Â»ÂºÃ§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å¡[Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥]
```

## Ã¥Ë†â€”Ã¥â€¡ÂºÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹

Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡

* Ã¥ÂÂÃ§Â§Â°
* Ã¦â€”Â¶Ã©â€”Â´Ã¦Ë†Â³
* Git SHA
* Ã§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Ë†Ã¥Â½â€œÃ¥â€°ÂÃ£â‚¬ÂÃ¨ÂÂ½Ã¥ÂÅ½Ã£â‚¬ÂÃ¨Â¶â€¦Ã¥â€°ÂÃ¯Â¼â€°

## Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

Ã¥â€¦Â¸Ã¥Å¾â€¹Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å¡

```
[Start] --> /checkpoint create "feature-start"
   |
[Implement] --> /checkpoint create "core-done"
   |
[Test] --> /checkpoint verify "core-done"
   |
[Refactor] --> /checkpoint create "refactor-done"
   |
[PR] --> /checkpoint verify "feature-start"
```

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS:

* `create <name>` - Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦Å’â€¡Ã¥Â®Å¡Ã¥ÂÂÃ§Â§Â°Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹
* `verify <name>` - Ã¦Â Â¹Ã¦ÂÂ®Ã¦Å’â€¡Ã¥Â®Å¡Ã¥ÂÂÃ§Â§Â°Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯Â
* `list` - Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹
* `clear` - Ã¥Ë†Â Ã©â„¢Â¤Ã¦â€”Â§Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¯Â¼Ë†Ã¤Â¿ÂÃ§â€¢â„¢Ã¦Å“â‚¬Ã¥ÂÅ½5Ã¤Â¸ÂªÃ¯Â¼â€°
