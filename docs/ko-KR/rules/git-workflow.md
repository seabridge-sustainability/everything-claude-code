# Git Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Ã¬Â»Â¤Ã«Â°â€¹ Ã«Â©â€Ã¬â€¹Å“Ã¬Â§â‚¬ Ã­Ëœâ€¢Ã¬â€¹Â
```
<type>: <description>

<Ã¬â€žÂ Ã­Æ’ÂÃ¬Â Â Ã«Â³Â¸Ã«Â¬Â¸>
```

Ã­Æ’â‚¬Ã¬Å¾â€¦: feat, fix, refactor, docs, test, chore, perf, ci

Ã¬Â°Â¸ÃªÂ³Â : Ã¬â€“Â´Ã­Å Â¸Ã«Â¦Â¬Ã«Â·Â°Ã¬â€¦Ëœ Ã«Â¹â€žÃ­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€ Ã¬â€”Â¬Ã«Â¶â‚¬Ã«Å â€ ÃªÂ°ÂÃ¬Å¾ÂÃ¬ÂËœ `~/.claude/settings.json` Ã«Â¡Å“Ã¬Â»Â¬ Ã¬â€žÂ¤Ã¬Â â€¢Ã¬â€”Â Ã«â€Â°Ã«ÂÂ¼ Ã«â€¹Â¬Ã«ÂÂ¼Ã¬Â§Ë† Ã¬Ë†Ëœ Ã¬Å¾Ë†Ã¬Å ÂµÃ«â€¹Ë†Ã«â€¹Â¤.

## Pull Request Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

PRÃ¬Ââ€ž Ã«Â§Å’Ã«â€œÂ¤ Ã«â€¢Å’:
1. Ã¬Â â€žÃ¬Â²Â´ Ã¬Â»Â¤Ã«Â°â€¹ Ã­Å¾Ë†Ã¬Å Â¤Ã­â€ Â Ã«Â¦Â¬Ã«Â¥Â¼ Ã«Â¶â€žÃ¬â€žÂ (Ã¬ÂµÅ“Ã¬â€¹Â  Ã¬Â»Â¤Ã«Â°â€¹Ã«Â§Å’Ã¬ÂÂ´ Ã¬â€¢â€žÃ«â€¹Å’)
2. `git diff [base-branch]...HEAD`Ã«Â¡Å“ Ã«ÂªÂ¨Ã«â€œÂ  Ã«Â³â‚¬ÃªÂ²Â½Ã¬â€šÂ¬Ã­â€¢Â­ Ã­â„¢â€¢Ã¬ÂÂ¸
3. Ã­ÂÂ¬ÃªÂ´â€žÃ¬Â ÂÃ¬ÂÂ¸ PR Ã¬Å¡â€Ã¬â€¢Â½ Ã¬Å¾â€˜Ã¬â€žÂ±
4. TODOÃªÂ°â‚¬ Ã­ÂÂ¬Ã­â€¢Â¨Ã«ÂÅ“ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ ÃªÂ³â€žÃ­Å¡Â Ã­ÂÂ¬Ã­â€¢Â¨
5. Ã¬Æ’Ë† Ã«Â¸Å’Ã«Å¾Å“Ã¬Â¹ËœÃ¬ÂÂ¸ ÃªÂ²Â½Ã¬Å¡Â° `-u` Ã­â€Å’Ã«Å¾ËœÃªÂ·Â¸Ã¬â„¢â‚¬ Ã­â€¢Â¨ÃªÂ»Ëœ push

> git Ã¬Å¾â€˜Ã¬â€”â€¦ Ã¬Â â€ž Ã¬Â â€žÃ¬Â²Â´ ÃªÂ°Å“Ã«Â°Å“ Ã­â€â€žÃ«Â¡Å“Ã¬â€žÂ¸Ã¬Å Â¤(ÃªÂ³â€žÃ­Å¡Â, TDD, Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â°)Ã«Å â€
> [development-workflow.md](./development-workflow.md)Ã«Â¥Â¼ Ã¬Â°Â¸ÃªÂ³Â Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€.
