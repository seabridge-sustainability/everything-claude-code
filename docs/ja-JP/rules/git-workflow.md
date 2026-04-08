# Git Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’Â¡Ã£Æ’Æ’Ã£â€šÂ»Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Ë†

```
<type>: <description>

<optional body>
```

Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”: feat, fix, refactor, docs, test, chore, perf, ci

Ã¦Â³Â¨Ã¨Â¨Ëœ: Attribution Ã£ÂÂ¯ ~/.claude/settings.json Ã£ÂÂ§Ã£â€šÂ°Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â«Ã£ÂÂ«Ã§â€žÂ¡Ã¥Å Â¹Ã¥Å’â€“Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Pull Request Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

PR Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£Ââ„¢Ã£â€šâ€¹Ã©Å¡â€º:
1. Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã¥Â±Â¥Ã¦Â­Â´Ã£â€šâ€™Ã¥Ë†â€ Ã¦Å¾ÂÃ¯Â¼Ë†Ã¦Å“â‚¬Ã¦â€“Â°Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£ÂÂ Ã£Ââ€˜Ã£ÂÂ§Ã£ÂÂªÃ£ÂÂÃ¯Â¼â€°
2. `git diff [base-branch]...HEAD` Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã¥Â¤â€°Ã¦â€ºÂ´Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
3. Ã¥Å’â€¦Ã¦â€¹Â¬Ã§Å¡â€žÃ£ÂÂª PR Ã£â€šÂµÃ£Æ’Å¾Ã£Æ’ÂªÃ£Æ’Â¼Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
4. TODO Ã¤Â»ËœÃ£ÂÂÃ£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¨Â¨Ë†Ã§â€Â»Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£â€šâ€¹
5. Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ£Æ’â€“Ã£Æ’Â©Ã£Æ’Â³Ã£Æ’ÂÃ£ÂÂ®Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯ `-u` Ã£Æ’â€¢Ã£Æ’Â©Ã£â€šÂ°Ã£ÂÂ§ push

## Ã¦Â©Å¸Ã¨Æ’Â½Ã¥Â®Å¸Ã¨Â£â€¦Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

1. **Ã£ÂÂ¾Ã£ÂÅ¡Ã¨Â¨Ë†Ã§â€Â»**
   - **planner** agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã¥Â®Å¸Ã¨Â£â€¦Ã¨Â¨Ë†Ã§â€Â»Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
   - Ã¤Â¾ÂÃ¥Â­ËœÃ©â€“Â¢Ã¤Â¿â€šÃ£ÂÂ¨Ã£Æ’ÂªÃ£â€šÂ¹Ã£â€šÂ¯Ã£â€šâ€™Ã§â€°Â¹Ã¥Â®Å¡
   - Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂºÃ£ÂÂ«Ã¥Ë†â€ Ã¥â€°Â²

2. **TDD Ã£â€šÂ¢Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â**
   - **tdd-guide** agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
   - Ã£ÂÂ¾Ã£ÂÅ¡Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂÃ¯Â¼Ë†REDÃ¯Â¼â€°
   - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’â€˜Ã£â€šÂ¹Ã£Ââ„¢Ã£â€šâ€¹Ã£â€šË†Ã£Ââ€ Ã£ÂÂ«Ã¥Â®Å¸Ã¨Â£â€¦Ã¯Â¼Ë†GREENÃ¯Â¼â€°
   - Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã¯Â¼Ë†IMPROVEÃ¯Â¼â€°
   - 80%+ Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ

3. **Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼**
   - Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¨Â¨ËœÃ¨Â¿Â°Ã§â€ºÂ´Ã¥Â¾Å’Ã£ÂÂ« **code-reviewer** agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
   - CRITICAL Ã£ÂÂ¨ HIGH Ã£ÂÂ®Ã¥â€¢ÂÃ©Â¡Å’Ã£ÂÂ«Ã¥Â¯Â¾Ã¥â€¡Â¦
   - Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ©â„¢ÂÃ£â€šÅ  MEDIUM Ã£ÂÂ®Ã¥â€¢ÂÃ©Â¡Å’Ã£â€šâ€™Ã¤Â¿Â®Ã¦Â­Â£

4. **Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë† & Ã£Æ’â€”Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥**
   - Ã¨Â©Â³Ã§Â´Â°Ã£ÂÂªÃ£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’Â¡Ã£Æ’Æ’Ã£â€šÂ»Ã£Æ’Â¼Ã£â€šÂ¸
   - Conventional Commits Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Ë†Ã£ÂÂ«Ã¥Â¾â€œÃ£Ââ€ 
