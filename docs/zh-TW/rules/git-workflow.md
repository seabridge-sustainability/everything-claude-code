# Git Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Commit Ã¨Â¨Å Ã¦ÂÂ¯Ã¦Â Â¼Ã¥Â¼Â

```
<type>: <description>

<optional body>
```

Ã©Â¡Å¾Ã¥Å¾â€¹Ã¯Â¼Å¡featÃ£â‚¬ÂfixÃ£â‚¬ÂrefactorÃ£â‚¬ÂdocsÃ£â‚¬ÂtestÃ£â‚¬ÂchoreÃ£â‚¬ÂperfÃ£â‚¬Âci

Ã¦Â³Â¨Ã¦â€žÂÃ¯Â¼Å¡Ã¦Â­Â¸Ã¥Â±Â¬Ã©â‚¬ÂÃ©ÂÅ½ ~/.claude/settings.json Ã¥â€¦Â¨Ã¥Å¸Å¸Ã¥ÂÅ“Ã§â€Â¨Ã£â‚¬â€š

## Pull Request Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

Ã¥Â»ÂºÃ§Â«â€¹ PR Ã¦â„¢â€šÃ¯Â¼Å¡
1. Ã¥Ë†â€ Ã¦Å¾ÂÃ¥Â®Å’Ã¦â€¢Â´ commit Ã¦Â­Â·Ã¥ÂÂ²Ã¯Â¼Ë†Ã¤Â¸ÂÃ¥ÂÂªÃ¦ËœÂ¯Ã¦Å“â‚¬Ã¦â€“Â° commitÃ¯Â¼â€°
2. Ã¤Â½Â¿Ã§â€Â¨ `git diff [base-branch]...HEAD` Ã¦Å¸Â¥Ã§Å“â€¹Ã¦â€°â‚¬Ã¦Å“â€°Ã¨Â®Å Ã¦â€ºÂ´
3. Ã¨ÂµÂ·Ã¨Ââ€°Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž PR Ã¦â€˜ËœÃ¨Â¦Â
4. Ã¥Å’â€¦Ã¥ÂÂ«Ã¥Â¸Â¶ TODO Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¨Ë†Ã§â€¢Â«
5. Ã¥Â¦â€šÃ¦Å¾Å“Ã¦ËœÂ¯Ã¦â€“Â°Ã¥Ë†â€ Ã¦â€Â¯Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `-u` flag Ã¦Å½Â¨Ã©â‚¬Â

## Ã¥Å Å¸Ã¨Æ’Â½Ã¥Â¯Â¦Ã¤Â½Å“Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

1. **Ã¥â€¦Ë†Ã¨Â¦ÂÃ¥Å Æ’**
   - Ã¤Â½Â¿Ã§â€Â¨ **planner** Agent Ã¥Â»ÂºÃ§Â«â€¹Ã¥Â¯Â¦Ã¤Â½Å“Ã¨Â¨Ë†Ã§â€¢Â«
   - Ã¨Â­ËœÃ¥Ë†Â¥Ã§â€ºÂ¸Ã¤Â¾ÂÃ¦â‚¬Â§Ã¥â€™Å’Ã©Â¢Â¨Ã©Å¡Âª
   - Ã¦â€¹â€ Ã¨Â§Â£Ã§â€šÂºÃ©Å¡Å½Ã¦Â®Âµ

2. **TDD Ã¦â€“Â¹Ã¦Â³â€¢**
   - Ã¤Â½Â¿Ã§â€Â¨ **tdd-guide** Agent
   - Ã¥â€¦Ë†Ã¦â€™Â°Ã¥Â¯Â«Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Ë†REDÃ¯Â¼â€°
   - Ã¥Â¯Â¦Ã¤Â½Å“Ã¤Â½Â¿Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½Ã¯Â¼Ë†GREENÃ¯Â¼â€°
   - Ã©â€¡ÂÃ¦Â§â€¹Ã¯Â¼Ë†IMPROVEÃ¯Â¼â€°
   - Ã©Â©â€”Ã¨Â­â€° 80%+ Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡

3. **Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¯Â©Ã¦Å¸Â¥**
   - Ã¦â€™Â°Ã¥Â¯Â«Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¾Å’Ã§Â«â€¹Ã¥ÂÂ³Ã¤Â½Â¿Ã§â€Â¨ **code-reviewer** Agent
   - Ã¨â„¢â€¢Ã§Ââ€ Ã©â€”Å“Ã©ÂÂµÃ¥â€™Å’Ã©Â«ËœÃ¥â€žÂªÃ¥â€¦Ë†Ã¥â€¢ÂÃ©Â¡Å’
   - Ã§â€ºÂ¡Ã¥ÂÂ¯Ã¨Æ’Â½Ã¤Â¿Â®Ã¥Â¾Â©Ã¤Â¸Â­Ã¥â€žÂªÃ¥â€¦Ë†Ã¥â€¢ÂÃ©Â¡Å’

4. **Commit Ã¨Ë†â€¡Ã¦Å½Â¨Ã©â‚¬Â**
   - Ã¨Â©Â³Ã§Â´Â°Ã§Å¡â€ž commit Ã¨Â¨Å Ã¦ÂÂ¯
   - Ã©ÂÂµÃ¥Â¾Âª conventional commits Ã¦Â Â¼Ã¥Â¼Â
