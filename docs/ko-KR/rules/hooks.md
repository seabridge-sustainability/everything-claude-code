# Ã­â€ºâ€¦ Ã¬â€¹Å“Ã¬Å Â¤Ã­â€¦Å“

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Ã­â€ºâ€¦ Ã¬Å“Â Ã­Ëœâ€¢

- **PreToolUse**: Ã«Ââ€žÃªÂµÂ¬ Ã¬â€¹Â¤Ã­â€“â€° Ã¬Â â€ž (Ã¬Å“Â Ã­Å¡Â¨Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬Â¦Â, Ã«Â§Â¤ÃªÂ°Å“Ã«Â³â‚¬Ã¬Ë†Ëœ Ã¬Ë†ËœÃ¬Â â€¢)
- **PostToolUse**: Ã«Ââ€žÃªÂµÂ¬ Ã¬â€¹Â¤Ã­â€“â€° Ã­â€ºâ€ž (Ã¬Å¾ÂÃ«Ââ„¢ Ã­ÂÂ¬Ã«Â§Â·, ÃªÂ²â‚¬Ã¬â€šÂ¬)
- **Stop**: Ã¬â€žÂ¸Ã¬â€¦Ëœ Ã¬Â¢â€¦Ã«Â£Å’ Ã¬â€¹Å“ (Ã¬ÂµÅ“Ã¬Â¢â€¦ ÃªÂ²â‚¬Ã¬Â¦Â)

## Ã¬Å¾ÂÃ«Ââ„¢ Ã¬Ë†ËœÃ«ÂÂ½ ÃªÂ¶Å’Ã­â€¢Å“

Ã¬Â£Â¼Ã¬ÂËœÃ­â€¢ËœÃ¬â€”Â¬ Ã¬â€šÂ¬Ã¬Å¡Â©:
- Ã¬â€¹Â Ã«Â¢Â°Ã­â€¢Â  Ã¬Ë†Ëœ Ã¬Å¾Ë†Ã«Å â€, Ã¬Å¾Ëœ Ã¬Â â€¢Ã¬ÂËœÃ«ÂÅ“ ÃªÂ³â€žÃ­Å¡ÂÃ¬â€”ÂÃ¬â€žÅ“Ã«Â§Å’ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€
- Ã­Æ’ÂÃ¬Æ’â€°Ã¬Â Â Ã¬Å¾â€˜Ã¬â€”â€¦Ã¬â€”ÂÃ¬â€žÅ“Ã«Å â€ Ã«Â¹â€žÃ­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€
- dangerously-skip-permissions Ã­â€Å’Ã«Å¾ËœÃªÂ·Â¸Ã«Â¥Â¼ Ã¬Â Ë†Ã«Å’â‚¬ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â°
- Ã«Å’â‚¬Ã¬â€¹Â  `~/.claude.json`Ã¬â€”ÂÃ¬â€žÅ“ `allowedTools`Ã«Â¥Â¼ Ã¬â€žÂ¤Ã¬Â â€¢

## TodoWrite Ã«ÂªÂ¨Ã«Â²â€ Ã¬â€šÂ¬Ã«Â¡â‚¬

TodoWrite Ã«Ââ€žÃªÂµÂ¬ Ã­â„¢Å“Ã¬Å¡Â©:
- Ã«â€¹Â¤Ã«â€¹Â¨ÃªÂ³â€ž Ã¬Å¾â€˜Ã¬â€”â€¦Ã¬ÂËœ Ã¬Â§â€žÃ­â€“â€° Ã¬Æ’ÂÃ­â„¢Â© Ã¬Â¶â€Ã¬Â Â
- Ã¬Â§â‚¬Ã¬â€¹Å“Ã¬â€šÂ¬Ã­â€¢Â­ Ã¬ÂÂ´Ã­â€¢Â´Ã«Ââ€ž ÃªÂ²â‚¬Ã¬Â¦Â
- Ã¬â€¹Â¤Ã¬â€¹Å“ÃªÂ°â€ž Ã«Â°Â©Ã­â€“Â¥ Ã¬Â¡Â°Ã¬Â â€¢ ÃªÂ°â‚¬Ã«Å Â¥
- Ã¬â€žÂ¸Ã«Â¶â‚¬ ÃªÂµÂ¬Ã­Ëœâ€ž Ã«â€¹Â¨ÃªÂ³â€ž Ã­â€˜Å“Ã¬â€¹Å“

Todo Ã«ÂªÂ©Ã«Â¡ÂÃ¬Å“Â¼Ã«Â¡Å“ Ã­â„¢â€¢Ã¬ÂÂ¸ ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ ÃªÂ²Æ’:
- Ã¬Ë†Å“Ã¬â€žÅ“ÃªÂ°â‚¬ Ã«Â§Å¾Ã¬Â§â‚¬ Ã¬â€¢Å Ã«Å â€ Ã«â€¹Â¨ÃªÂ³â€ž
- Ã«Ë†â€žÃ«ÂÂ½Ã«ÂÅ“ Ã­â€¢Â­Ã«ÂªÂ©
- Ã«Â¶Ë†Ã­â€¢â€žÃ¬Å¡â€Ã­â€¢Å“ Ã¬Â¶â€ÃªÂ°â‚¬ Ã­â€¢Â­Ã«ÂªÂ©
- Ã¬Å¾ËœÃ«ÂªÂ»Ã«ÂÅ“ Ã¬â€žÂ¸Ã«Â¶â€žÃ­â„¢â€ Ã¬Ë†ËœÃ¬Â¤â‚¬
- Ã¬Å¾ËœÃ«ÂªÂ» Ã­â€¢Â´Ã¬â€žÂÃ«ÂÅ“ Ã¬Å¡â€ÃªÂµÂ¬Ã¬â€šÂ¬Ã­â€¢Â­
