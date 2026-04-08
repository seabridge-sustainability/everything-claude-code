# Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬ËœÂ¤Ã¬Â¼â‚¬Ã¬Å Â¤Ã­Å Â¸Ã«Â Ë†Ã¬ÂÂ´Ã¬â€¦Ëœ

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸

`~/.claude/agents/`Ã¬â€”Â Ã¬Å“â€žÃ¬Â¹Ëœ:

| Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ | Ã¬Å¡Â©Ã«Ââ€ž | Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬â€¹Å“Ã¬Â Â |
|---------|------|----------|
| planner | ÃªÂµÂ¬Ã­Ëœâ€ž ÃªÂ³â€žÃ­Å¡Â | Ã«Â³ÂµÃ¬Å¾Â¡Ã­â€¢Å“ ÃªÂ¸Â°Ã«Å Â¥, Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â |
| architect | Ã¬â€¹Å“Ã¬Å Â¤Ã­â€¦Å“ Ã¬â€žÂ¤ÃªÂ³â€ž | Ã¬â€¢â€žÃ­â€šÂ¤Ã­â€¦ÂÃ¬Â²Ëœ Ã¬ÂËœÃ¬â€šÂ¬ÃªÂ²Â°Ã¬Â â€¢ |
| tdd-guide | Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â£Â¼Ã«Ââ€ž ÃªÂ°Å“Ã«Â°Å“ | Ã¬Æ’Ë† ÃªÂ¸Â°Ã«Å Â¥, Ã«Â²â€žÃªÂ·Â¸ Ã¬Ë†ËœÃ¬Â â€¢ |
| code-reviewer | Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â° | Ã¬Â½â€Ã«â€œÅ“ Ã¬Å¾â€˜Ã¬â€žÂ± Ã­â€ºâ€ž |
| security-reviewer | Ã«Â³Â´Ã¬â€¢Ë† Ã«Â¶â€žÃ¬â€žÂ | Ã¬Â»Â¤Ã«Â°â€¹ Ã¬Â â€ž |
| build-error-resolver | Ã«Â¹Å’Ã«â€œÅ“ Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Ë†ËœÃ¬Â â€¢ | Ã«Â¹Å’Ã«â€œÅ“ Ã¬â€¹Â¤Ã­Å’Â¨ Ã¬â€¹Å“ |
| e2e-runner | E2E Ã­â€¦Å’Ã¬Å Â¤Ã­Å’â€¦ | Ã­â€¢ÂµÃ¬â€¹Â¬ Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã­ÂÂÃ«Â¦â€ž |
| database-reviewer | Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Å Â¤Ã­â€šÂ¤Ã«Â§Ë†/Ã¬Â¿Â¼Ã«Â¦Â¬ Ã«Â¦Â¬Ã«Â·Â° | Ã¬Å Â¤Ã­â€šÂ¤Ã«Â§Ë† Ã¬â€žÂ¤ÃªÂ³â€ž, Ã¬Â¿Â¼Ã«Â¦Â¬ Ã¬ÂµÅ“Ã¬Â ÂÃ­â„¢â€ |
| go-reviewer | Go Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â° | Go Ã¬Â½â€Ã«â€œÅ“ Ã¬Å¾â€˜Ã¬â€žÂ± Ã«ËœÂÃ«Å â€ Ã¬Ë†ËœÃ¬Â â€¢ Ã­â€ºâ€ž |
| go-build-resolver | Go Ã«Â¹Å’Ã«â€œÅ“ Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Ë†ËœÃ¬Â â€¢ | `go build` Ã«ËœÂÃ«Å â€ `go vet` Ã¬â€¹Â¤Ã­Å’Â¨ Ã¬â€¹Å“ |
| refactor-cleaner | Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã«Å â€ Ã¬Â½â€Ã«â€œÅ“ Ã¬Â â€¢Ã«Â¦Â¬ | Ã¬Â½â€Ã«â€œÅ“ Ã¬Å“Â Ã¬Â§â‚¬Ã«Â³Â´Ã¬Ë†Ëœ |
| doc-updater | Ã«Â¬Â¸Ã¬â€žÅ“ ÃªÂ´â‚¬Ã«Â¦Â¬ | Ã«Â¬Â¸Ã¬â€žÅ“ Ã¬â€”â€¦Ã«ÂÂ°Ã¬ÂÂ´Ã­Å Â¸ |

## Ã¬Â¦â€°Ã¬â€¹Å“ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬â€šÂ¬Ã¬Å¡Â©

Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã­â€â€žÃ«Â¡Â¬Ã­â€â€žÃ­Å Â¸ Ã«Â¶Ë†Ã­â€¢â€žÃ¬Å¡â€:
1. Ã«Â³ÂµÃ¬Å¾Â¡Ã­â€¢Å“ ÃªÂ¸Â°Ã«Å Â¥ Ã¬Å¡â€Ã¬Â²Â­ - **planner** Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬â€šÂ¬Ã¬Å¡Â©
2. Ã¬Â½â€Ã«â€œÅ“ Ã¬Å¾â€˜Ã¬â€žÂ±/Ã¬Ë†ËœÃ¬Â â€¢ Ã¬Â§ÂÃ­â€ºâ€ž - **code-reviewer** Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬â€šÂ¬Ã¬Å¡Â©
3. Ã«Â²â€žÃªÂ·Â¸ Ã¬Ë†ËœÃ¬Â â€¢ Ã«ËœÂÃ«Å â€ Ã¬Æ’Ë† ÃªÂ¸Â°Ã«Å Â¥ - **tdd-guide** Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬â€šÂ¬Ã¬Å¡Â©
4. Ã¬â€¢â€žÃ­â€šÂ¤Ã­â€¦ÂÃ¬Â²Ëœ Ã¬ÂËœÃ¬â€šÂ¬ÃªÂ²Â°Ã¬Â â€¢ - **architect** Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬â€šÂ¬Ã¬Å¡Â©

## Ã«Â³â€˜Ã«Â Â¬ Task Ã¬â€¹Â¤Ã­â€“â€°

Ã«Ââ€¦Ã«Â¦Â½Ã¬Â ÂÃ¬ÂÂ¸ Ã¬Å¾â€˜Ã¬â€”â€¦Ã¬â€”ÂÃ«Å â€ Ã­â€¢Â­Ã¬Æ’Â Ã«Â³â€˜Ã«Â Â¬ Task Ã¬â€¹Â¤Ã­â€“â€° Ã¬â€šÂ¬Ã¬Å¡Â©:

```markdown
# Ã¬Â¢â€¹Ã¬ÂÅ’: Ã«Â³â€˜Ã«Â Â¬ Ã¬â€¹Â¤Ã­â€“â€°
3ÃªÂ°Å“ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã«Â¥Â¼ Ã«Â³â€˜Ã«Â Â¬Ã«Â¡Å“ Ã¬â€¹Â¤Ã­â€“â€°:
1. Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ 1: Ã¬ÂÂ¸Ã¬Â¦Â Ã«ÂªÂ¨Ã«â€œË† Ã«Â³Â´Ã¬â€¢Ë† Ã«Â¶â€žÃ¬â€žÂ
2. Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ 2: Ã¬ÂºÂÃ¬â€¹Å“ Ã¬â€¹Å“Ã¬Å Â¤Ã­â€¦Å“ Ã¬â€žÂ±Ã«Å Â¥ Ã«Â¦Â¬Ã«Â·Â°
3. Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ 3: Ã¬Å“Â Ã­â€¹Â¸Ã«Â¦Â¬Ã­â€¹Â° Ã­Æ’â‚¬Ã¬Å¾â€¦ ÃªÂ²â‚¬Ã¬â€šÂ¬

# Ã«â€šËœÃ¬ÂÂ¨: Ã«Â¶Ë†Ã­â€¢â€žÃ¬Å¡â€Ã­â€¢ËœÃªÂ²Å’ Ã¬Ë†Å“Ã¬Â°Â¨ Ã¬â€¹Â¤Ã­â€“â€°
Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ 1, ÃªÂ·Â¸Ã«â€¹Â¤Ã¬ÂÅ’ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ 2, ÃªÂ·Â¸Ã«â€¹Â¤Ã¬ÂÅ’ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ 3
```

## Ã«â€¹Â¤Ã¬Â¤â€˜ ÃªÂ´â‚¬Ã¬Â Â Ã«Â¶â€žÃ¬â€žÂ

Ã«Â³ÂµÃ¬Å¾Â¡Ã­â€¢Å“ Ã«Â¬Â¸Ã¬Â Å“Ã¬â€”ÂÃ«Å â€ Ã¬â€”Â­Ã­â€¢Â  Ã«Â¶â€žÃ«Â¦Â¬ Ã¬â€žÅ“Ã«Â¸Å’Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬â€šÂ¬Ã¬Å¡Â©:
- Ã¬â€šÂ¬Ã¬â€¹Â¤ ÃªÂ²â‚¬Ã¬Â¦Â Ã«Â¦Â¬Ã«Â·Â°Ã¬â€“Â´
- Ã¬â€¹Å“Ã«â€¹Ë†Ã¬â€“Â´ Ã¬â€”â€Ã¬Â§â‚¬Ã«â€¹Ë†Ã¬â€“Â´
- Ã«Â³Â´Ã¬â€¢Ë† Ã¬Â â€žÃ«Â¬Â¸ÃªÂ°â‚¬
- Ã¬ÂÂ¼ÃªÂ´â‚¬Ã¬â€žÂ± ÃªÂ²â‚¬Ã­â€ Â Ã¬Å¾Â
- Ã¬Â¤â€˜Ã«Â³Âµ ÃªÂ²â‚¬Ã¬â€šÂ¬Ã¬Å¾Â
