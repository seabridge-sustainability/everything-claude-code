# Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Å“â‚¬Ã¦Â±â€š

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


## Ã¦Å“â‚¬Ã¤Â½Å½Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¯Â¼Å¡80%

Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Â¡Å¾Ã¥Å¾â€¹Ã¯Â¼Ë†Ã¥â€¦Â¨Ã©Æ’Â¨Ã¥Â¿â€¦Ã¨Â¦ÂÃ¯Â¼â€°Ã¯Â¼Å¡
1. **Ã¥â€“Â®Ã¥â€¦Æ’Ã¦Â¸Â¬Ã¨Â©Â¦** - Ã¥â‚¬â€¹Ã¥Ë†Â¥Ã¥â€¡Â½Ã¥Â¼ÂÃ£â‚¬ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã£â‚¬ÂÃ¥â€¦Æ’Ã¤Â»Â¶
2. **Ã¦â€¢Â´Ã¥ÂË†Ã¦Â¸Â¬Ã¨Â©Â¦** - API Ã§Â«Â¯Ã©Â»Å¾Ã£â‚¬ÂÃ¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¦â€œÂÃ¤Â½Å“
3. **E2E Ã¦Â¸Â¬Ã¨Â©Â¦** - Ã©â€”Å“Ã©ÂÂµÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Ë†PlaywrightÃ¯Â¼â€°

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Â©â€¦Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Â¼

Ã¥Â¼Â·Ã¥Ë†Â¶Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å¡
1. Ã¥â€¦Ë†Ã¦â€™Â°Ã¥Â¯Â«Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Ë†REDÃ¯Â¼â€°
2. Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦ - Ã¦â€¡â€°Ã¨Â©Â²Ã¥Â¤Â±Ã¦â€¢â€”
3. Ã¦â€™Â°Ã¥Â¯Â«Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Â¯Â¦Ã¤Â½Å“Ã¯Â¼Ë†GREENÃ¯Â¼â€°
4. Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦ - Ã¦â€¡â€°Ã¨Â©Â²Ã©â‚¬Å¡Ã©ÂÅ½
5. Ã©â€¡ÂÃ¦Â§â€¹Ã¯Â¼Ë†IMPROVEÃ¯Â¼â€°
6. Ã©Â©â€”Ã¨Â­â€°Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¯Â¼Ë†80%+Ã¯Â¼â€°

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¤Â±Ã¦â€¢â€”Ã§â€“â€˜Ã©â€ºÂ£Ã¦Å½â€™Ã¨Â§Â£

1. Ã¤Â½Â¿Ã§â€Â¨ **tdd-guide** Agent
2. Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Å¡â€Ã©â€ºÂ¢
3. Ã©Â©â€”Ã¨Â­â€° mock Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¦Â­Â£Ã§Â¢Âº
4. Ã¤Â¿Â®Ã¥Â¾Â©Ã¥Â¯Â¦Ã¤Â½Å“Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Ë†Ã©â„¢Â¤Ã©ÂÅ¾Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦ËœÂ¯Ã©Å’Â¯Ã§Å¡â€žÃ¯Â¼â€°

## Agent Ã¦â€Â¯Ã¦ÂÂ´

- **tdd-guide** - Ã¤Â¸Â»Ã¥â€¹â€¢Ã§â€Â¨Ã¦â€“Â¼Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¯Â¼Å’Ã¥Â¼Â·Ã¥Ë†Â¶Ã¥â€¦Ë†Ã¦â€™Â°Ã¥Â¯Â«Ã¦Â¸Â¬Ã¨Â©Â¦
- **e2e-runner** - Playwright E2E Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â°Ë†Ã¥Â®Â¶
