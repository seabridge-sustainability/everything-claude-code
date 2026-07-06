# Agent Ã£â€šÂªÃ£Æ’Â¼Ã£â€šÂ±Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


## Ã¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂª Agent

`~/.claude/agents/` Ã£ÂÂ«Ã©â€¦ÂÃ§Â½Â®:

| Agent | Ã§â€ºÂ®Ã§Å¡â€ž | Ã¤Â½Â¿Ã§â€Â¨Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Å¸Ã£Æ’Â³Ã£â€šÂ° |
|-------|---------|-------------|
| planner | Ã¥Â®Å¸Ã¨Â£â€¦Ã¨Â¨Ë†Ã§â€Â» | Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£ÂÂªÃ¦Â©Å¸Ã¨Æ’Â½Ã£â‚¬ÂÃ£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ° |
| architect | Ã£â€šÂ·Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â Ã¨Â¨Â­Ã¨Â¨Ë† | Ã£â€šÂ¢Ã£Æ’Â¼Ã£â€šÂ­Ã£Æ’â€ Ã£â€šÂ¯Ã£Æ’ÂÃ£Æ’Â£Ã£ÂÂ®Ã¦â€žÂÃ¦â‚¬ÂÃ¦Â±ÂºÃ¥Â®Å¡ |
| tdd-guide | Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Âº | Ã¦â€“Â°Ã¦Â©Å¸Ã¨Æ’Â½Ã£â‚¬ÂÃ£Æ’ÂÃ£â€šÂ°Ã¤Â¿Â®Ã¦Â­Â£ |
| code-reviewer | Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼ | Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¨Â¨ËœÃ¨Â¿Â°Ã¥Â¾Å’ |
| security-reviewer | Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¥Ë†â€ Ã¦Å¾Â | Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã¥â€°Â |
| build-error-resolver | Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã¤Â¿Â®Ã¦Â­Â£ | Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã¥Â¤Â±Ã¦â€¢â€”Ã¦â„¢â€š |
| e2e-runner | E2EÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë† | Ã©â€¡ÂÃ¨Â¦ÂÃ£ÂÂªÃ£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼ |
| refactor-cleaner | Ã£Æ’â€¡Ã£Æ’Æ’Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€” | Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’â€ Ã£Æ’Å Ã£Æ’Â³Ã£â€šÂ¹ |
| doc-updater | Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë† | Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã¦â€ºÂ´Ã¦â€“Â° |

## Agent Ã£ÂÂ®Ã¥ÂÂ³Ã¥ÂºÂ§Ã£ÂÂ®Ã¤Â½Â¿Ã§â€Â¨

Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Ë†Ã¤Â¸ÂÃ¨Â¦Â:
1. Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£ÂÂªÃ¦Â©Å¸Ã¨Æ’Â½Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë† - **planner** agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
2. Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¤Â½Å“Ã¦Ë†Â/Ã¥Â¤â€°Ã¦â€ºÂ´Ã§â€ºÂ´Ã¥Â¾Å’ - **code-reviewer** agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
3. Ã£Æ’ÂÃ£â€šÂ°Ã¤Â¿Â®Ã¦Â­Â£Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã¦â€“Â°Ã¦Â©Å¸Ã¨Æ’Â½ - **tdd-guide** agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
4. Ã£â€šÂ¢Ã£Æ’Â¼Ã£â€šÂ­Ã£Æ’â€ Ã£â€šÂ¯Ã£Æ’ÂÃ£Æ’Â£Ã£ÂÂ®Ã¦â€žÂÃ¦â‚¬ÂÃ¦Â±ÂºÃ¥Â®Å¡ - **architect** agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨

## Ã¤Â¸Â¦Ã¥Ë†â€”Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ¯Ã¥Â®Å¸Ã¨Â¡Å’

Ã§â€¹Â¬Ã§Â«â€¹Ã£Ââ€”Ã£ÂÅ¸Ã¦â€œÂÃ¤Â½Å“Ã£ÂÂ«Ã£ÂÂ¯Ã¥Â¸Â¸Ã£ÂÂ«Ã¤Â¸Â¦Ã¥Ë†â€” Task Ã¥Â®Å¸Ã¨Â¡Å’Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž:

```markdown
# Ã¨â€°Â¯Ã£Ââ€žÃ¤Â¾â€¹: Ã¤Â¸Â¦Ã¥Ë†â€”Ã¥Â®Å¸Ã¨Â¡Å’
3Ã£ÂÂ¤Ã£ÂÂ® agent Ã£â€šâ€™Ã¤Â¸Â¦Ã¥Ë†â€”Ã¨ÂµÂ·Ã¥â€¹â€¢:
1. Agent 1: Ã¨ÂªÂÃ¨Â¨Â¼Ã£Æ’Â¢Ã£â€šÂ¸Ã£Æ’Â¥Ã£Æ’Â¼Ã£Æ’Â«Ã£ÂÂ®Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¥Ë†â€ Ã¦Å¾Â
2. Agent 2: Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥Ã£â€šÂ·Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â Ã£ÂÂ®Ã£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼
3. Agent 3: Ã£Æ’Â¦Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£ÂÂ®Ã¥Å¾â€¹Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯

# Ã¦â€šÂªÃ£Ââ€žÃ¤Â¾â€¹: Ã¤Â¸ÂÃ¨Â¦ÂÃ£ÂÂªÃ©â‚¬ÂÃ¦Â¬Â¡Ã¥Â®Å¸Ã¨Â¡Å’
Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ« agent 1Ã£â‚¬ÂÃ¦Â¬Â¡Ã£ÂÂ« agent 2Ã£â‚¬ÂÃ£ÂÂÃ£Ââ€”Ã£ÂÂ¦ agent 3
```

## Ã¥Â¤Å¡Ã¨Â§â€™Ã§Å¡â€žÃ¥Ë†â€ Ã¦Å¾Â

Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£ÂÂªÃ¥â€¢ÂÃ©Â¡Å’Ã£ÂÂ«Ã£ÂÂ¯Ã£â‚¬ÂÃ¥Â½Â¹Ã¥â€°Â²Ã¥Ë†â€ Ã¦â€¹â€¦Ã£Ââ€”Ã£ÂÅ¸Ã£â€šÂµÃ£Æ’â€“ agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨:
- Ã¤Âºâ€¹Ã¥Â®Å¸Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã¦â€¹â€¦Ã¥Â½â€œ
- Ã£â€šÂ·Ã£Æ’â€¹Ã£â€šÂ¢Ã£â€šÂ¨Ã£Æ’Â³Ã£â€šÂ¸Ã£Æ’â€¹Ã£â€šÂ¢
- Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¨Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’â€˜Ã£Æ’Â¼Ã£Æ’Ë†
- Ã¤Â¸â‚¬Ã¨Â²Â«Ã¦â‚¬Â§Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã¦â€¹â€¦Ã¥Â½â€œ
- Ã¥â€ â€”Ã©â€¢Â·Ã¦â‚¬Â§Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã¦â€¹â€¦Ã¥Â½â€œ
