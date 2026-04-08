# Agent Ã¥Ââ€Ã¨ÂªÂ¿

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Ã¥ÂÂ¯Ã§â€Â¨ Agents

Ã¤Â½ÂÃ¦â€“Â¼ `~/.claude/agents/`Ã¯Â¼Å¡

| Agent | Ã§â€Â¨Ã©â‚¬â€ | Ã¤Â½â€¢Ã¦â„¢â€šÃ¤Â½Â¿Ã§â€Â¨ |
|-------|------|----------|
| planner | Ã¥Â¯Â¦Ã¤Â½Å“Ã¨Â¦ÂÃ¥Å Æ’ | Ã¨Â¤â€¡Ã©â€ºÅ“Ã¥Å Å¸Ã¨Æ’Â½Ã£â‚¬ÂÃ©â€¡ÂÃ¦Â§â€¹ |
| architect | Ã§Â³Â»Ã§ÂµÂ±Ã¨Â¨Â­Ã¨Â¨Ë† | Ã¦Å¾Â¶Ã¦Â§â€¹Ã¦Â±ÂºÃ§Â­â€“ |
| tdd-guide | Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Â©â€¦Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Â¼ | Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã£â‚¬ÂBug Ã¤Â¿Â®Ã¥Â¾Â© |
| code-reviewer | Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¯Â©Ã¦Å¸Â¥ | Ã¦â€™Â°Ã¥Â¯Â«Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¾Å’ |
| security-reviewer | Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥Ë†â€ Ã¦Å¾Â | Ã¦ÂÂÃ¤ÂºÂ¤Ã¥â€°Â |
| build-error-resolver | Ã¤Â¿Â®Ã¥Â¾Â©Ã¥Â»ÂºÃ§Â½Â®Ã©Å’Â¯Ã¨ÂªÂ¤ | Ã¥Â»ÂºÃ§Â½Â®Ã¥Â¤Â±Ã¦â€¢â€”Ã¦â„¢â€š |
| e2e-runner | E2E Ã¦Â¸Â¬Ã¨Â©Â¦ | Ã©â€”Å“Ã©ÂÂµÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦ÂµÂÃ§Â¨â€¹ |
| refactor-cleaner | Ã§â€žÂ¡Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¦Â¸â€¦Ã§Ââ€  | Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã§Â¶Â­Ã¨Â­Â· |
| doc-updater | Ã¦â€“â€¡Ã¤Â»Â¶ | Ã¦â€ºÂ´Ã¦â€“Â°Ã¦â€“â€¡Ã¤Â»Â¶ |

## Ã§Â«â€¹Ã¥ÂÂ³Ã¤Â½Â¿Ã§â€Â¨ Agent

Ã¤Â¸ÂÃ©Å“â‚¬Ã¨Â¦ÂÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦ÂÂÃ§Â¤ÂºÃ¯Â¼Å¡
1. Ã¨Â¤â€¡Ã©â€ºÅ“Ã¥Å Å¸Ã¨Æ’Â½Ã¨Â«â€¹Ã¦Â±â€š - Ã¤Â½Â¿Ã§â€Â¨ **planner** Agent
2. Ã¥â€°â€ºÃ¦â€™Â°Ã¥Â¯Â«/Ã¤Â¿Â®Ã¦â€Â¹Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼ - Ã¤Â½Â¿Ã§â€Â¨ **code-reviewer** Agent
3. Bug Ã¤Â¿Â®Ã¥Â¾Â©Ã¦Ë†â€“Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½ - Ã¤Â½Â¿Ã§â€Â¨ **tdd-guide** Agent
4. Ã¦Å¾Â¶Ã¦Â§â€¹Ã¦Â±ÂºÃ§Â­â€“ - Ã¤Â½Â¿Ã§â€Â¨ **architect** Agent

## Ã¥Â¹Â³Ã¨Â¡Å’Ã¤Â»Â»Ã¥â€¹â„¢Ã¥Å¸Â·Ã¨Â¡Å’

Ã¥Â°ÂÃ§ÂÂ¨Ã§Â«â€¹Ã¦â€œÂÃ¤Â½Å“Ã§Â¸Â½Ã¦ËœÂ¯Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¹Â³Ã¨Â¡Å’ Task Ã¥Å¸Â·Ã¨Â¡Å’Ã¯Â¼Å¡

```markdown
# Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥Â¹Â³Ã¨Â¡Å’Ã¥Å¸Â·Ã¨Â¡Å’
Ã¥Â¹Â³Ã¨Â¡Å’Ã¥â€¢Å¸Ã¥â€¹â€¢ 3 Ã¥â‚¬â€¹ agentsÃ¯Â¼Å¡
1. Agent 1Ã¯Â¼Å¡auth.ts Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥Ë†â€ Ã¦Å¾Â
2. Agent 2Ã¯Â¼Å¡Ã¥Â¿Â«Ã¥Ââ€“Ã§Â³Â»Ã§ÂµÂ±Ã§Å¡â€žÃ¦â€¢Ë†Ã¨Æ’Â½Ã¥Â¯Â©Ã¦Å¸Â¥
3. Agent 3Ã¯Â¼Å¡utils.ts Ã§Å¡â€žÃ¥Å¾â€¹Ã¥Ë†Â¥Ã¦ÂªÂ¢Ã¦Å¸Â¥

# Ã¤Â¸ÂÃ¥Â¥Â½Ã¯Â¼Å¡Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€žÃ¥Â¾ÂªÃ¥ÂºÂ
Ã¥â€¦Ë† agent 1Ã¯Â¼Å’Ã§â€žÂ¶Ã¥Â¾Å’ agent 2Ã¯Â¼Å’Ã§â€žÂ¶Ã¥Â¾Å’ agent 3
```

## Ã¥Â¤Å¡Ã¨Â§â‚¬Ã©Â»Å¾Ã¥Ë†â€ Ã¦Å¾Â

Ã¥Â°ÂÃ¦â€“Â¼Ã¨Â¤â€¡Ã©â€ºÅ“Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¥Ë†â€ Ã¨Â§â€™Ã¨â€°Â²Ã¥Â­Â agentsÃ¯Â¼Å¡
- Ã¤Âºâ€¹Ã¥Â¯Â¦Ã¥Â¯Â©Ã¦Å¸Â¥Ã¨â‚¬â€¦
- Ã¨Â³â€¡Ã¦Â·Â±Ã¥Â·Â¥Ã§Â¨â€¹Ã¥Â¸Â«
- Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Â°Ë†Ã¥Â®Â¶
- Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§Ã¥Â¯Â©Ã¦Å¸Â¥Ã¨â‚¬â€¦
- Ã¥â€ â€”Ã©Â¤ËœÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã¨â‚¬â€¦
