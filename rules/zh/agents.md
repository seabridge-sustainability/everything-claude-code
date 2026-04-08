# Ã¤Â»Â£Ã§Ââ€ Ã§Â¼â€“Ã¦Å½â€™

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Ã¥ÂÂ¯Ã§â€Â¨Ã¤Â»Â£Ã§Ââ€ 

Ã¤Â½ÂÃ¤ÂºÅ½ `~/.claude/agents/`Ã¯Â¼Å¡

| Ã¤Â»Â£Ã§Ââ€  | Ã§â€Â¨Ã©â‚¬â€ | Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ |
|-------|---------|------------|
| planner | Ã¥Â®Å¾Ã§Å½Â°Ã¨Â§â€žÃ¥Ë†â€™ | Ã¥Â¤ÂÃ¦Ââ€šÃ¥Å Å¸Ã¨Æ’Â½Ã£â‚¬ÂÃ©â€¡ÂÃ¦Å¾â€ž |
| architect | Ã§Â³Â»Ã§Â»Å¸Ã¨Â®Â¾Ã¨Â®Â¡ | Ã¦Å¾Â¶Ã¦Å¾â€žÃ¥â€ Â³Ã§Â­â€“ |
| tdd-guide | Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Â©Â±Ã¥Å Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜ | Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã£â‚¬Âbug Ã¤Â¿Â®Ã¥Â¤Â |
| code-reviewer | Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥ | Ã§Â¼â€“Ã¥â€ â„¢Ã¤Â»Â£Ã§Â ÂÃ¥ÂÅ½ |
| security-reviewer | Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Ë†â€ Ã¦Å¾Â | Ã¦ÂÂÃ¤ÂºÂ¤Ã¥â€°Â |
| build-error-resolver | Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯ | Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â¤Â±Ã¨Â´Â¥Ã¦â€”Â¶ |
| e2e-runner | E2E Ã¦Âµâ€¹Ã¨Â¯â€¢ | Ã¥â€¦Â³Ã©â€Â®Ã§â€Â¨Ã¦Ë†Â·Ã¦ÂµÂÃ§Â¨â€¹ |
| refactor-cleaner | Ã¦Â­Â»Ã¤Â»Â£Ã§Â ÂÃ¦Â¸â€¦Ã§Ââ€  | Ã¤Â»Â£Ã§Â ÂÃ§Â»Â´Ã¦Å Â¤ |
| doc-updater | Ã¦â€“â€¡Ã¦Â¡Â£ | Ã¦â€ºÂ´Ã¦â€“Â°Ã¦â€“â€¡Ã¦Â¡Â£ |
| rust-reviewer | Rust Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥ | Rust Ã©Â¡Â¹Ã§â€ºÂ® |

## Ã§Â«â€¹Ã¥ÂÂ³Ã¤Â½Â¿Ã§â€Â¨Ã¤Â»Â£Ã§Ââ€ 

Ã¦â€”Â Ã©Å“â‚¬Ã§â€Â¨Ã¦Ë†Â·Ã¦ÂÂÃ§Â¤ÂºÃ¯Â¼Å¡
1. Ã¥Â¤ÂÃ¦Ââ€šÃ¥Å Å¸Ã¨Æ’Â½Ã¨Â¯Â·Ã¦Â±â€š - Ã¤Â½Â¿Ã§â€Â¨ **planner** Ã¤Â»Â£Ã§Ââ€ 
2. Ã¥Ë†Å¡Ã§Â¼â€“Ã¥â€ â„¢/Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¤Â»Â£Ã§Â Â - Ã¤Â½Â¿Ã§â€Â¨ **code-reviewer** Ã¤Â»Â£Ã§Ââ€ 
3. Bug Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Ë†â€“Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½ - Ã¤Â½Â¿Ã§â€Â¨ **tdd-guide** Ã¤Â»Â£Ã§Ââ€ 
4. Ã¦Å¾Â¶Ã¦Å¾â€žÃ¥â€ Â³Ã§Â­â€“ - Ã¤Â½Â¿Ã§â€Â¨ **architect** Ã¤Â»Â£Ã§Ââ€ 

## Ã¥Â¹Â¶Ã¨Â¡Å’Ã¤Â»Â»Ã¥Å Â¡Ã¦â€°Â§Ã¨Â¡Å’

Ã¥Â¯Â¹Ã§â€¹Â¬Ã§Â«â€¹Ã¦â€œÂÃ¤Â½Å“Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¹Â¶Ã¨Â¡Å’ Task Ã¦â€°Â§Ã¨Â¡Å’Ã¯Â¼Å¡

```markdown
# Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥Â¹Â¶Ã¨Â¡Å’Ã¦â€°Â§Ã¨Â¡Å’
Ã¥ÂÅ’Ã¦â€”Â¶Ã¥ÂÂ¯Ã¥Å Â¨ 3 Ã¤Â¸ÂªÃ¤Â»Â£Ã§Ââ€ Ã¯Â¼Å¡
1. Ã¤Â»Â£Ã§Ââ€  1Ã¯Â¼Å¡Ã¨Â®Â¤Ã¨Â¯ÂÃ¦Â¨Â¡Ã¥Ââ€”Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Ë†â€ Ã¦Å¾Â
2. Ã¤Â»Â£Ã§Ââ€  2Ã¯Â¼Å¡Ã§Â¼â€œÃ¥Â­ËœÃ§Â³Â»Ã§Â»Å¸Ã¦â‚¬Â§Ã¨Æ’Â½Ã¥Â®Â¡Ã¦Å¸Â¥
3. Ã¤Â»Â£Ã§Ââ€  3Ã¯Â¼Å¡Ã¥Â·Â¥Ã¥â€¦Â·Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥

# Ã¥ÂÂÃ¯Â¼Å¡Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€žÃ©Â¡ÂºÃ¥ÂºÂ
Ã¥â€¦Ë†Ã¤Â»Â£Ã§Ââ€  1Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¤Â»Â£Ã§Ââ€  2Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¤Â»Â£Ã§Ââ€  3
```

## Ã¥Â¤Å¡Ã¨Â§â€ Ã¨Â§â€™Ã¥Ë†â€ Ã¦Å¾Â

Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥Â¤ÂÃ¦Ââ€šÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¥Ë†â€ Ã¨Â§â€™Ã¨â€°Â²Ã¥Â­ÂÃ¤Â»Â£Ã§Ââ€ Ã¯Â¼Å¡
- Ã¤Âºâ€¹Ã¥Â®Å¾Ã¥Â®Â¡Ã¦Å¸Â¥Ã¨â‚¬â€¦
- Ã©Â«ËœÃ§ÂºÂ§Ã¥Â·Â¥Ã§Â¨â€¹Ã¥Â¸Ë†
- Ã¥Â®â€°Ã¥â€¦Â¨Ã¤Â¸â€œÃ¥Â®Â¶
- Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§Ã¥Â®Â¡Ã¦Å¸Â¥Ã¨â‚¬â€¦
- Ã¥â€ â€”Ã¤Â½â„¢Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨â‚¬â€¦
