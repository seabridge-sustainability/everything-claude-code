---
name: checkpoint
description: Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°Ã¬â€”ÂÃ¬â€žÅ“ checkpointÃ«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±, ÃªÂ²â‚¬Ã¬Â¦Â, Ã¬Â¡Â°Ã­Å¡Å’ Ã«ËœÂÃ«Å â€ Ã¬Â â€¢Ã«Â¦Â¬Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.
---

# Checkpoint Ã«Âªâ€¦Ã«Â Â¹Ã¬â€“Â´

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°Ã¬â€”ÂÃ¬â€žÅ“ checkpointÃ«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢ËœÃªÂ±Â°Ã«â€šËœ ÃªÂ²â‚¬Ã¬Â¦ÂÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬â€šÂ¬Ã¬Å¡Â©Ã«Â²â€¢

`/checkpoint [create|verify|list|clear] [name]`

## Checkpoint Ã¬Æ’ÂÃ¬â€žÂ±

CheckpointÃ«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â  Ã«â€¢Å’:

1. `/verify quick`Ã«Â¥Â¼ Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢ËœÃ¬â€”Â¬ Ã­Ëœâ€žÃ¬Å¾Â¬ Ã¬Æ’ÂÃ­Æ’Å“ÃªÂ°â‚¬ ÃªÂ¹Â¨Ã«Ââ€”Ã­â€¢Å“Ã¬Â§â‚¬ Ã­â„¢â€¢Ã¬ÂÂ¸Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤
2. Checkpoint Ã¬ÂÂ´Ã«Â¦â€žÃ¬Å“Â¼Ã«Â¡Å“ git stash Ã«ËœÂÃ«Å â€ commitÃ¬Ââ€ž Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤
3. `.claude/checkpoints.log`Ã¬â€”Â checkpointÃ«Â¥Â¼ ÃªÂ¸Â°Ã«Â¡ÂÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```bash
echo "$(date +%Y-%m-%d-%H:%M) | $CHECKPOINT_NAME | $(git rev-parse --short HEAD)" >> .claude/checkpoints.log
```

4. Checkpoint Ã¬Æ’ÂÃ¬â€žÂ± Ã¬â„¢â€žÃ«Â£Å’Ã«Â¥Â¼ Ã«Â³Â´ÃªÂ³Â Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤

## Checkpoint ÃªÂ²â‚¬Ã¬Â¦Â

CheckpointÃ¬â„¢â‚¬ Ã«Å’â‚¬Ã¬Â¡Â°Ã­â€¢ËœÃ¬â€”Â¬ ÃªÂ²â‚¬Ã¬Â¦ÂÃ­â€¢Â  Ã«â€¢Å’:

1. Ã«Â¡Å“ÃªÂ·Â¸Ã¬â€”ÂÃ¬â€žÅ“ checkpointÃ«Â¥Â¼ Ã¬ÂÂ½Ã¬Å ÂµÃ«â€¹Ë†Ã«â€¹Â¤
2. Ã­Ëœâ€žÃ¬Å¾Â¬ Ã¬Æ’ÂÃ­Æ’Å“Ã«Â¥Â¼ checkpointÃ¬â„¢â‚¬ Ã«Â¹â€žÃªÂµÂÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:
   - Checkpoint Ã¬ÂÂ´Ã­â€ºâ€ž Ã¬Â¶â€ÃªÂ°â‚¬Ã«ÂÅ“ Ã­Å’Å’Ã¬ÂÂ¼
   - Checkpoint Ã¬ÂÂ´Ã­â€ºâ€ž Ã¬Ë†ËœÃ¬Â â€¢Ã«ÂÅ“ Ã­Å’Å’Ã¬ÂÂ¼
   - Ã­Ëœâ€žÃ¬Å¾Â¬Ã¬â„¢â‚¬ Ã«â€¹Â¹Ã¬â€¹Å“Ã¬ÂËœ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã­â€ ÂµÃªÂ³Â¼Ã¬Å“Â¨
   - Ã­Ëœâ€žÃ¬Å¾Â¬Ã¬â„¢â‚¬ Ã«â€¹Â¹Ã¬â€¹Å“Ã¬ÂËœ Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬

3. Ã«Â³Â´ÃªÂ³Â :
```
CHECKPOINT COMPARISON: $NAME
============================
Files changed: X
Tests: +Y passed / -Z failed
Coverage: +X% / -Y%
Build: [PASS/FAIL]
```

## Checkpoint Ã«ÂªÂ©Ã«Â¡Â

Ã«ÂªÂ¨Ã«â€œÂ  checkpointÃ«Â¥Â¼ Ã«â€¹Â¤Ã¬ÂÅ’ Ã¬Â â€¢Ã«Â³Â´Ã¬â„¢â‚¬ Ã­â€¢Â¨ÃªÂ»Ëœ Ã­â€˜Å“Ã¬â€¹Å“Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:
- Ã¬ÂÂ´Ã«Â¦â€ž
- Ã­Æ’â‚¬Ã¬Å¾â€žÃ¬Å Â¤Ã­Æ’Â¬Ã­â€â€ž
- Git SHA
- Ã¬Æ’ÂÃ­Æ’Å“ (current, behind, ahead)

## Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

Ã¬ÂÂ¼Ã«Â°ËœÃ¬Â ÂÃ¬ÂÂ¸ checkpoint Ã­ÂÂÃ«Â¦â€ž:

```
[Ã¬â€¹Å“Ã¬Å¾â€˜] --> /checkpoint create "feature-start"
   |
[ÃªÂµÂ¬Ã­Ëœâ€ž] --> /checkpoint create "core-done"
   |
[Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸] --> /checkpoint verify "core-done"
   |
[Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â] --> /checkpoint create "refactor-done"
   |
[PR] --> /checkpoint verify "feature-start"
```

## Ã¬ÂÂ¸Ã¬Å¾Â

$ARGUMENTS:
- `create <name>` - Ã¬ÂÂ´Ã«Â¦â€žÃ¬ÂÂ´ Ã¬Â§â‚¬Ã¬Â â€¢Ã«ÂÅ“ checkpointÃ«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤
- `verify <name>` - Ã¬ÂÂ´Ã«Â¦â€žÃ¬ÂÂ´ Ã¬Â§â‚¬Ã¬Â â€¢Ã«ÂÅ“ checkpointÃ¬â„¢â‚¬ ÃªÂ²â‚¬Ã¬Â¦ÂÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤
- `list` - Ã«ÂªÂ¨Ã«â€œÂ  checkpointÃ«Â¥Â¼ Ã­â€˜Å“Ã¬â€¹Å“Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤
- `clear` - Ã¬ÂÂ´Ã¬Â â€ž checkpointÃ«Â¥Â¼ Ã¬Â Å“ÃªÂ±Â°Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤ (Ã¬ÂµÅ“ÃªÂ·Â¼ 5ÃªÂ°Å“Ã«Â§Å’ Ã¬Å“Â Ã¬Â§â‚¬)
