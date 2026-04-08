# Ã­â€¦Å’Ã¬Å Â¤Ã­Å’â€¦ Ã¬Å¡â€ÃªÂµÂ¬Ã¬â€šÂ¬Ã­â€¢Â­

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Ã¬ÂµÅ“Ã¬â€ Å’ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬: 80%

Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Å“Â Ã­Ëœâ€¢ (Ã«ÂªÂ¨Ã«â€˜Â Ã­â€¢â€žÃ¬Ë†Ëœ):
1. **Ã«â€¹Â¨Ã¬Å“â€ž Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸** - ÃªÂ°Å“Ã«Â³â€ž Ã­â€¢Â¨Ã¬Ë†Ëœ, Ã¬Å“Â Ã­â€¹Â¸Ã«Â¦Â¬Ã­â€¹Â°, Ã¬Â»Â´Ã­ÂÂ¬Ã«â€žÅ’Ã­Å Â¸
2. **Ã­â€ ÂµÃ­â€¢Â© Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸** - API Ã¬â€”â€Ã«â€œÅ“Ã­ÂÂ¬Ã¬ÂÂ¸Ã­Å Â¸, Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Å¾â€˜Ã¬â€”â€¦
3. **E2E Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸** - Ã­â€¢ÂµÃ¬â€¹Â¬ Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã­ÂÂÃ«Â¦â€ž (Ã¬â€“Â¸Ã¬â€“Â´Ã«Â³â€ž Ã­â€â€žÃ«Â Ë†Ã¬Å¾â€žÃ¬â€ºÅ’Ã­ÂÂ¬ Ã¬â€žÂ Ã­Æ’Â)

## Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â£Â¼Ã«Ââ€ž ÃªÂ°Å“Ã«Â°Å“

Ã­â€¢â€žÃ¬Ë†Ëœ Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°:
1. Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬Å¾â€˜Ã¬â€žÂ± (RED)
2. Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€° - Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢Â´Ã¬â€¢Â¼ Ã­â€¢Â¨
3. Ã¬ÂµÅ“Ã¬â€ Å’Ã­â€¢Å“Ã¬ÂËœ ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬Å¾â€˜Ã¬â€žÂ± (GREEN)
4. Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€° - Ã­â€ ÂµÃªÂ³Â¼Ã­â€¢Â´Ã¬â€¢Â¼ Ã­â€¢Â¨
5. Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â (IMPROVE)
6. Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ Ã­â„¢â€¢Ã¬ÂÂ¸ (80% Ã¬ÂÂ´Ã¬Æ’Â)

## Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­Å’Â¨ Ã«Â¬Â¸Ã¬Â Å“ Ã­â€¢Â´ÃªÂ²Â°

1. **tdd-guide** Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬â€šÂ¬Ã¬Å¡Â©
2. Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ ÃªÂ²Â©Ã«Â¦Â¬ Ã­â„¢â€¢Ã¬ÂÂ¸
3. Ã«ÂªÂ¨Ã­â€šÂ¹Ã¬ÂÂ´ Ã¬ËœÂ¬Ã«Â°â€Ã«Â¥Â¸Ã¬Â§â‚¬ ÃªÂ²â‚¬Ã¬Â¦Â
4. Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ÃªÂ°â‚¬ Ã¬â€¢â€žÃ«â€¹Å’ ÃªÂµÂ¬Ã­Ëœâ€žÃ¬Ââ€ž Ã¬Ë†ËœÃ¬Â â€¢ (Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ÃªÂ°â‚¬ Ã¬Å¾ËœÃ«ÂªÂ»Ã«ÂÅ“ ÃªÂ²Â½Ã¬Å¡Â° Ã¬Â Å“Ã¬â„¢Â¸)

## Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬Â§â‚¬Ã¬â€ºÂ

- **tdd-guide** - Ã¬Æ’Ë† ÃªÂ¸Â°Ã«Å Â¥Ã¬â€”Â Ã¬Â ÂÃªÂ·Â¹Ã¬Â ÂÃ¬Å“Â¼Ã«Â¡Å“ Ã¬â€šÂ¬Ã¬Å¡Â©, Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬Å¾â€˜Ã¬â€žÂ±Ã¬Ââ€ž ÃªÂ°â€¢Ã¬Â Å“
