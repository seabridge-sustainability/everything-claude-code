# Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã¥â€ â€¦Ã£ÂÂ§Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã¦Â¤Å“Ã¨Â¨Â¼Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã¦â€“Â¹Ã¦Â³â€¢

`/checkpoint [create|verify|list] [name]`

## Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â½Å“Ã¦Ë†Â

Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£Ââ„¢Ã£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã¯Â¼Å¡

1. `/verify quick` Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¦Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã§Å Â¶Ã¦â€¦â€¹Ã£ÂÅ’ clean Ã£ÂÂ§Ã£Ââ€šÃ£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
2. Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¥ÂÂÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦ git stash Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
3. Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™ `.claude/checkpoints.log` Ã£ÂÂ«Ã¨Â¨ËœÃ©Å’Â²Ã¯Â¼Å¡

```bash
echo "$(date +%Y-%m-%d-%H:%M) | $CHECKPOINT_NAME | $(git rev-parse --short HEAD)" >> .claude/checkpoints.log
```

4. Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â½Å“Ã¦Ë†ÂÃ£â€šâ€™Ã¥Â Â±Ã¥â€˜Å 

## Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¦Â¤Å“Ã¨Â¨Â¼

Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦Ã¦Â¤Å“Ã¨Â¨Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã¯Â¼Å¡

1. Ã£Æ’Â­Ã£â€šÂ°Ã£Ââ€¹Ã£â€šâ€°Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¨ÂªÂ­Ã£â€šâ‚¬

2. Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã§Å Â¶Ã¦â€¦â€¹Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ¨Ã¦Â¯â€Ã¨Â¼Æ’Ã¯Â¼Å¡
   * Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â»Â¥Ã©â„¢ÂÃ£ÂÂ«Ã¨Â¿Â½Ã¥Å Â Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«
   * Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â»Â¥Ã©â„¢ÂÃ£ÂÂ«Ã¤Â¿Â®Ã¦Â­Â£Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«
   * Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Ë†ÂÃ¥Å Å¸Ã§Å½â€¡Ã£ÂÂ¨Ã¦â„¢â€šÃ¦â„¢â€šÃ£ÂÂ®Ã¦Â¯â€Ã¨Â¼Æ’
   * Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£ÂÂ¨Ã¦â„¢â€šÃ¦â„¢â€šÃ£ÂÂ®Ã¦Â¯â€Ã¨Â¼Æ’

3. Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã¯Â¼Å¡

```
Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¦Â¯â€Ã¨Â¼Æ’: $NAME
============================
Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«: X
Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†: +Y Ã¥ÂË†Ã¦Â Â¼ / -Z Ã¥Â¤Â±Ã¦â€¢â€”
Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸: +X% / -Y%
Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°: [PASS/FAIL]
```

## Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â¸â‚¬Ã¨Â¦Â§Ã¨Â¡Â¨Ã§Â¤Âº

Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â»Â¥Ã¤Â¸â€¹Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£ÂÂ¦Ã¨Â¡Â¨Ã§Â¤ÂºÃ¯Â¼Å¡

* Ã¥ÂÂÃ¥â€°Â
* Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â³Ã£Æ’â€”
* Git SHA
* Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹Ã¯Â¼Ë†currentÃ£â‚¬ÂbehindÃ£â‚¬ÂaheadÃ¯Â¼â€°

## Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¦ÂµÂÃ¯Â¼Å¡

```
[Ã©â€“â€¹Ã¥Â§â€¹] --> /checkpoint create "feature-start"
   |
[Ã¥Â®Å¸Ã¨Â£â€¦] --> /checkpoint create "core-done"
   |
[Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†] --> /checkpoint verify "core-done"
   |
[Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°] --> /checkpoint create "refactor-done"
   |
[PR] --> /checkpoint verify "feature-start"
```

## Ã¥Â¼â€¢Ã¦â€¢Â°

$ARGUMENTS:

* `create <name>` - Ã¦Å’â€¡Ã¥Â®Å¡Ã£ÂÂ®Ã¥ÂÂÃ¥â€°ÂÃ£ÂÂ§Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â½Å“Ã¦Ë†Â
* `verify <name>` - Ã¦Å’â€¡Ã¥Â®Å¡Ã£ÂÂ®Ã¥ÂÂÃ¥â€°ÂÃ£ÂÂ®Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦Ã¦Â¤Å“Ã¨Â¨Â¼
* `list` - Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
* `clear` - Ã¥ÂÂ¤Ã£Ââ€žÃ£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¥â€°Å Ã©â„¢Â¤Ã¯Â¼Ë†Ã¦Å“â‚¬Ã¦â€“Â° 5 Ã¥â‚¬â€¹Ã£â€šâ€™Ã¤Â¿ÂÃ¦Å’ÂÃ¯Â¼â€°
