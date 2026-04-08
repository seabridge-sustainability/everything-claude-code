# Ã©â€™Â©Ã¥Â­ÂÃ§Â³Â»Ã§Â»Å¸

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Ã©â€™Â©Ã¥Â­ÂÃ§Â±Â»Ã¥Å¾â€¹

- **PreToolUse**Ã¯Â¼Å¡Ã¥Â·Â¥Ã¥â€¦Â·Ã¦â€°Â§Ã¨Â¡Å’Ã¥â€°ÂÃ¯Â¼Ë†Ã©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬ÂÃ¥Ââ€šÃ¦â€¢Â°Ã¤Â¿Â®Ã¦â€Â¹Ã¯Â¼â€°
- **PostToolUse**Ã¯Â¼Å¡Ã¥Â·Â¥Ã¥â€¦Â·Ã¦â€°Â§Ã¨Â¡Å’Ã¥ÂÅ½Ã¯Â¼Ë†Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã£â‚¬ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼â€°
- **Stop**Ã¯Â¼Å¡Ã¤Â¼Å¡Ã¨Â¯ÂÃ§Â»â€œÃ¦ÂÅ¸Ã¦â€”Â¶Ã¯Â¼Ë†Ã¦Å“â‚¬Ã§Â»Ë†Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼â€°

## Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Å½Â¥Ã¥Ââ€”Ã¦ÂÆ’Ã©â„¢Â

Ã¨Â°Â¨Ã¦â€¦Å½Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Å¡
- Ã¤Â¸ÂºÃ¥ÂÂ¯Ã¤Â¿Â¡Ã£â‚¬ÂÃ¥Â®Å¡Ã¤Â¹â€°Ã¦ËœÅ½Ã§Â¡Â®Ã§Å¡â€žÃ¨Â®Â¡Ã¥Ë†â€™Ã¥ÂÂ¯Ã§â€Â¨
- Ã¦Å½Â¢Ã§Â´Â¢Ã¦â‚¬Â§Ã¥Â·Â¥Ã¤Â½Å“Ã¦â€”Â¶Ã§Â¦ÂÃ§â€Â¨
- Ã¦Â°Â¸Ã¨Â¿Å“Ã¤Â¸ÂÃ¨Â¦ÂÃ¤Â½Â¿Ã§â€Â¨ dangerously-skip-permissions Ã¦Â â€¡Ã¥Â¿â€”
- Ã¦â€Â¹Ã¤Â¸ÂºÃ¥Å“Â¨ `~/.claude.json` Ã¤Â¸Â­Ã©â€¦ÂÃ§Â½Â® `allowedTools`

## TodoWrite Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

Ã¤Â½Â¿Ã§â€Â¨ TodoWrite Ã¥Â·Â¥Ã¥â€¦Â·Ã¯Â¼Å¡
- Ã¨Â·Å¸Ã¨Â¸ÂªÃ¥Â¤Å¡Ã¦Â­Â¥Ã©ÂªÂ¤Ã¤Â»Â»Ã¥Å Â¡Ã§Å¡â€žÃ¨Â¿â€ºÃ¥ÂºÂ¦
- Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¯Â¹Ã¦Å’â€¡Ã¤Â»Â¤Ã§Å¡â€žÃ§Ââ€ Ã¨Â§Â£
- Ã¥ÂÂ¯Ã§â€Â¨Ã¥Â®Å¾Ã¦â€”Â¶Ã¥Â¼â€¢Ã¥Â¯Â¼
- Ã¦ËœÂ¾Ã§Â¤ÂºÃ§Â»â€ Ã§Â²â€™Ã¥ÂºÂ¦Ã§Å¡â€žÃ¥Â®Å¾Ã§Å½Â°Ã¦Â­Â¥Ã©ÂªÂ¤

Ã¥Â¾â€¦Ã¥Å Å¾Ã¥Ë†â€”Ã¨Â¡Â¨Ã¦ÂÂ­Ã§Â¤ÂºÃ¯Â¼Å¡
- Ã©Â¡ÂºÃ¥ÂºÂÃ©â€â„¢Ã¨Â¯Â¯Ã§Å¡â€žÃ¦Â­Â¥Ã©ÂªÂ¤
- Ã§Â¼ÂºÃ¥Â¤Â±Ã§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ®
- Ã¥Â¤Å¡Ã¤Â½â„¢Ã§Å¡â€žÃ¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ©Â¡Â¹Ã§â€ºÂ®
- Ã©â€â„¢Ã¨Â¯Â¯Ã§Å¡â€žÃ§Â²â€™Ã¥ÂºÂ¦
- Ã¨Â¯Â¯Ã¨Â§Â£Ã§Å¡â€žÃ©Å“â‚¬Ã¦Â±â€š
