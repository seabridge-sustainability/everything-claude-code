# Checkpoint Ã¦Å’â€¡Ã¤Â»Â¤

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¥Å“Â¨Ã¦â€šÂ¨Ã§Å¡â€žÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¤Â¸Â­Ã¥Â»ÂºÃ§Â«â€¹Ã¦Ë†â€“Ã©Â©â€”Ã¨Â­â€°Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â

`/checkpoint [create|verify|list] [name]`

## Ã¥Â»ÂºÃ§Â«â€¹Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾

Ã¥Â»ÂºÃ§Â«â€¹Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¦â„¢â€šÃ¯Â¼Å¡

1. Ã¥Å¸Â·Ã¨Â¡Å’ `/verify quick` Ã§Â¢ÂºÃ¤Â¿ÂÃ§â€ºÂ®Ã¥â€°ÂÃ§â€¹â‚¬Ã¦â€¦â€¹Ã¦ËœÂ¯Ã¤Â¹Â¾Ã¦Â·Â¨Ã§Å¡â€ž
2. Ã¤Â½Â¿Ã§â€Â¨Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¥ÂÂÃ§Â¨Â±Ã¥Â»ÂºÃ§Â«â€¹ git stash Ã¦Ë†â€“ commit
3. Ã¥Â°â€¡Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¨Â¨ËœÃ©Å’â€žÃ¥Ë†Â° `.claude/checkpoints.log`Ã¯Â¼Å¡

```bash
echo "$(date +%Y-%m-%d-%H:%M) | $CHECKPOINT_NAME | $(git rev-parse --short HEAD)" >> .claude/checkpoints.log
```

4. Ã¥Â Â±Ã¥â€˜Å Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¥Â·Â²Ã¥Â»ÂºÃ§Â«â€¹

## Ã©Â©â€”Ã¨Â­â€°Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾

Ã©â€¡ÂÃ¥Â°ÂÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã©â‚¬Â²Ã¨Â¡Å’Ã©Â©â€”Ã¨Â­â€°Ã¦â„¢â€šÃ¯Â¼Å¡

1. Ã¥Â¾Å¾Ã¦â€”Â¥Ã¨ÂªÅ’Ã¨Â®â‚¬Ã¥Ââ€“Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾
2. Ã¦Â¯â€Ã¨Â¼Æ’Ã§â€ºÂ®Ã¥â€°ÂÃ§â€¹â‚¬Ã¦â€¦â€¹Ã¨Ë†â€¡Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¯Â¼Å¡
   - Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¥Â¾Å’Ã¦â€“Â°Ã¥Â¢Å¾Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†
   - Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¥Â¾Å’Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†
   - Ã§ÂÂ¾Ã¥Å“Â¨ vs Ã§â€¢Â¶Ã¦â„¢â€šÃ§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½Ã§Å½â€¡
   - Ã§ÂÂ¾Ã¥Å“Â¨ vs Ã§â€¢Â¶Ã¦â„¢â€šÃ§Å¡â€žÃ¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡

3. Ã¥Â Â±Ã¥â€˜Å Ã¯Â¼Å¡
```
Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¦Â¯â€Ã¨Â¼Æ’Ã¯Â¼Å¡$NAME
============================
Ã¨Â®Å Ã¦â€ºÂ´Ã¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å¡X
Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Å¡+Y Ã©â‚¬Å¡Ã©ÂÅ½ / -Z Ã¥Â¤Â±Ã¦â€¢â€”
Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¯Â¼Å¡+X% / -Y%
Ã¥Â»ÂºÃ§Â½Â®Ã¯Â¼Å¡[Ã©â‚¬Å¡Ã©ÂÅ½/Ã¥Â¤Â±Ã¦â€¢â€”]
```

## Ã¥Ë†â€”Ã¥â€¡ÂºÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾

Ã©Â¡Â¯Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡
- Ã¥ÂÂÃ§Â¨Â±
- Ã¦â„¢â€šÃ©â€“â€œÃ¦Ë†Â³
- Git SHA
- Ã§â€¹â‚¬Ã¦â€¦â€¹Ã¯Â¼Ë†Ã§â€ºÂ®Ã¥â€°ÂÃ£â‚¬ÂÃ¨ÂÂ½Ã¥Â¾Å’Ã£â‚¬ÂÃ©Â ËœÃ¥â€¦Ë†Ã¯Â¼â€°

## Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

Ã¥â€¦Â¸Ã¥Å¾â€¹Ã§Å¡â€žÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å¡

```
[Ã©â€“â€¹Ã¥Â§â€¹] --> /checkpoint create "feature-start"
   |
[Ã¥Â¯Â¦Ã¤Â½Å“] --> /checkpoint create "core-done"
   |
[Ã¦Â¸Â¬Ã¨Â©Â¦] --> /checkpoint verify "core-done"
   |
[Ã©â€¡ÂÃ¦Â§â€¹] --> /checkpoint create "refactor-done"
   |
[PR] --> /checkpoint verify "feature-start"
```

## Ã¥ÂÆ’Ã¦â€¢Â¸

$ARGUMENTS:
- `create <name>` - Ã¥Â»ÂºÃ§Â«â€¹Ã¥â€˜Â½Ã¥ÂÂÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾
- `verify <name>` - Ã©â€¡ÂÃ¥Â°ÂÃ¥â€˜Â½Ã¥ÂÂÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã©Â©â€”Ã¨Â­â€°
- `list` - Ã©Â¡Â¯Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾
- `clear` - Ã§Â§Â»Ã©â„¢Â¤Ã¨Ë†Å Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¯Â¼Ë†Ã¤Â¿ÂÃ§â€¢â„¢Ã¦Å“â‚¬Ã¥Â¾Å’ 5 Ã¥â‚¬â€¹Ã¯Â¼â€°
