---
description: Ã¥Ë†â€ Ã¦Å¾ÂÃ¨Â·Â¨Ã¤Â»Â£Ã§Ââ€ Ã£â‚¬ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã£â‚¬ÂMCPÃ¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã¥â€™Å’Ã¨Â§â€žÃ¥Ë†â„¢Ã§Å¡â€žÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Âªâ€”Ã¥ÂÂ£Ã¤Â½Â¿Ã§â€Â¨Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Å’Ã¤Â»Â¥Ã¥Â¯Â»Ã¦â€°Â¾Ã¤Â¼ËœÃ¥Å’â€“Ã¦Å“ÂºÃ¤Â¼Å¡Ã£â‚¬â€šÃ¦Å“â€°Ã¥Å Â©Ã¤ÂºÅ½Ã¥â€¡ÂÃ¥Â°â€˜Ã¤Â»Â¤Ã§â€°Å’Ã¥Â¼â‚¬Ã©â€â‚¬Ã¥Â¹Â¶Ã©ÂÂ¿Ã¥â€¦ÂÃ¦â‚¬Â§Ã¨Æ’Â½Ã¨Â­Â¦Ã¥â€˜Å Ã£â‚¬â€š
---

# Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã©Â¢â€žÃ§Â®â€”Ã¤Â¼ËœÃ¥Å’â€“Ã¥â„¢Â¨

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¥Ë†â€ Ã¦Å¾ÂÃ¦â€šÂ¨Ã§Å¡â€ž Claude Code Ã¨Â®Â¾Ã§Â½Â®Ã¤Â¸Â­Ã§Å¡â€žÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Âªâ€”Ã¥ÂÂ£Ã¦Â¶Ë†Ã¨â‚¬â€”Ã¯Â¼Å’Ã¥Â¹Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¥ÂÂ¯Ã¦â€œÂÃ¤Â½Å“Ã§Å¡â€žÃ¥Â»ÂºÃ¨Â®Â®Ã¤Â»Â¥Ã¥â€¡ÂÃ¥Â°â€˜Ã¤Â»Â¤Ã§â€°Å’Ã¥Â¼â‚¬Ã©â€â‚¬Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢

```
/context-budget [--verbose]
```

* Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼Å¡Ã¦ÂÂÃ¤Â¾â€ºÃ¦â€˜ËœÃ¨Â¦ÂÃ¥ÂÅ Ã¤Â¸Â»Ã¨Â¦ÂÃ¥Â»ÂºÃ¨Â®Â®
* `--verbose`Ã¯Â¼Å¡Ã¦Å’â€°Ã§Â»â€žÃ¤Â»Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¥Â®Å’Ã¦â€¢Â´Ã§Â»â€ Ã¥Ë†â€ 

$ARGUMENTS

## Ã¦â€œÂÃ¤Â½Å“Ã¦Â­Â¥Ã©ÂªÂ¤

Ã¨Â¿ÂÃ¨Â¡Å’ **context-budget** Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Ë†`skills/context-budget/SKILL.md`Ã¯Â¼â€°Ã¯Â¼Å’Ã¥Â¹Â¶Ã¨Â¾â€œÃ¥â€¦Â¥Ã¤Â»Â¥Ã¤Â¸â€¹Ã¥â€ â€¦Ã¥Â®Â¹Ã¯Â¼Å¡

1. Ã¥Â¦â€šÃ¦Å¾Å“ `$ARGUMENTS` Ã¤Â¸Â­Ã¥Â­ËœÃ¥Å“Â¨ `--verbose` Ã¦Â â€¡Ã¥Â¿â€”Ã¯Â¼Å’Ã¥Ë†â„¢Ã¤Â¼Â Ã©â‚¬â€™Ã¨Â¯Â¥Ã¦Â â€¡Ã¥Â¿â€”
2. Ã©â„¢Â¤Ã©ÂÅ¾Ã§â€Â¨Ã¦Ë†Â·Ã¥ÂÂ¦Ã¨Â¡Å’Ã¦Å’â€¡Ã¥Â®Å¡Ã¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã¥Ââ€¡Ã¨Â®Â¾Ã¤Â¸Âº 200K Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Âªâ€”Ã¥ÂÂ£Ã¯Â¼Ë†Claude Sonnet Ã©Â»ËœÃ¨Â®Â¤Ã¥â‚¬Â¼Ã¯Â¼â€°
3. Ã©ÂÂµÃ¥Â¾ÂªÃ¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ¥â€ºâ€ºÃ¤Â¸ÂªÃ©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼Å¡Ã¦Â¸â€¦Ã¥Ââ€¢ Ã¢â€ â€™ Ã¥Ë†â€ Ã§Â±Â» Ã¢â€ â€™ Ã¦Â£â‚¬Ã¦Âµâ€¹Ã©â€”Â®Ã©Â¢Ëœ Ã¢â€ â€™ Ã¦Å Â¥Ã¥â€˜Å 
4. Ã¥Ââ€˜Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã§Å¡â€žÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã©Â¢â€žÃ§Â®â€”Ã¦Å Â¥Ã¥â€˜Å 

Ã¨Â¯Â¥Ã¦Å â‚¬Ã¨Æ’Â½Ã¨Â´Å¸Ã¨Â´Â£Ã¦â€°â‚¬Ã¦Å“â€°Ã¦â€°Â«Ã¦ÂÂÃ©â‚¬Â»Ã¨Â¾â€˜Ã£â‚¬ÂÃ¤Â»Â¤Ã§â€°Å’Ã¤Â¼Â°Ã§Â®â€”Ã£â‚¬ÂÃ©â€”Â®Ã©Â¢ËœÃ¦Â£â‚¬Ã¦Âµâ€¹Ã¥â€™Å’Ã¦Å Â¥Ã¥â€˜Å Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã£â‚¬â€š
