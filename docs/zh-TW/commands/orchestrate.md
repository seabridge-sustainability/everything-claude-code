# Orchestrate Ã¦Å’â€¡Ã¤Â»Â¤

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


Ã¨Â¤â€¡Ã©â€ºÅ“Ã¤Â»Â»Ã¥â€¹â„¢Ã§Å¡â€žÃ¥Â¾ÂªÃ¥ÂºÂ Agent Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â

`/orchestrate [workflow-type] [task-description]`

## Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã©Â¡Å¾Ã¥Å¾â€¹

### feature
Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ¥Å Å¸Ã¨Æ’Â½Ã¥Â¯Â¦Ã¤Â½Å“Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å¡
```
planner -> tdd-guide -> code-reviewer -> security-reviewer
```

### bugfix
Bug Ã¨ÂªÂ¿Ã¦Å¸Â¥Ã¥â€™Å’Ã¤Â¿Â®Ã¥Â¾Â©Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å¡
```
planner -> tdd-guide -> code-reviewer
```

### refactor
Ã¥Â®â€°Ã¥â€¦Â¨Ã©â€¡ÂÃ¦Â§â€¹Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å¡
```
architect -> code-reviewer -> tdd-guide
```

### security
Ã¤Â»Â¥Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã§â€šÂºÃ§â€žÂ¦Ã©Â»Å¾Ã§Å¡â€žÃ¥Â¯Â©Ã¦Å¸Â¥Ã¯Â¼Å¡
```
security-reviewer -> code-reviewer -> architect
```

## Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¨Â¡Ã¥Â¼Â

Ã¥Â°ÂÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¤Â¸Â­Ã§Å¡â€žÃ¦Â¯ÂÃ¥â‚¬â€¹ AgentÃ¯Â¼Å¡

1. **Ã¥â€˜Â¼Ã¥ÂÂ« Agent**Ã¯Â¼Å’Ã¥Â¸Â¶Ã¥â€¦Â¥Ã¥â€°ÂÃ¤Â¸â‚¬Ã¥â‚¬â€¹ Agent Ã§Å¡â€žÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡
2. **Ã¦â€Â¶Ã©â€ºâ€ Ã¨Â¼Â¸Ã¥â€¡Âº**Ã¤Â½Å“Ã§â€šÂºÃ§ÂµÂÃ¦Â§â€¹Ã¥Å’â€“Ã¤ÂºÂ¤Ã¦Å½Â¥Ã¦â€“â€¡Ã¤Â»Â¶
3. **Ã¥â€šÂ³Ã©ÂÅ¾Ã§ÂµÂ¦Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¥â‚¬â€¹ Agent**
4. **Ã¥Â½â„¢Ã¦â€¢Â´Ã§ÂµÂÃ¦Å¾Å“**Ã§â€šÂºÃ¦Å“â‚¬Ã§Âµâ€šÃ¥Â Â±Ã¥â€˜Å 

## Ã¤ÂºÂ¤Ã¦Å½Â¥Ã¦â€“â€¡Ã¤Â»Â¶Ã¦Â Â¼Ã¥Â¼Â

Agent Ã¤Â¹â€¹Ã©â€“â€œÃ¯Â¼Å’Ã¥Â»ÂºÃ§Â«â€¹Ã¤ÂºÂ¤Ã¦Å½Â¥Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡

```markdown
## Ã¤ÂºÂ¤Ã¦Å½Â¥Ã¯Â¼Å¡[Ã¥â€°ÂÃ¤Â¸â‚¬Ã¥â‚¬â€¹ Agent] -> [Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¥â‚¬â€¹ Agent]

### Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡
[Ã¥Â®Å’Ã¦Ë†ÂÃ¤Âºâ€¹Ã©Â â€¦Ã§Å¡â€žÃ¦â€˜ËœÃ¨Â¦Â]

### Ã§â„¢Â¼Ã§ÂÂ¾
[Ã©â€”Å“Ã©ÂÂµÃ§â„¢Â¼Ã§ÂÂ¾Ã¦Ë†â€“Ã¦Â±ÂºÃ§Â­â€“]

### Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†
[Ã¨Â§Â¸Ã¥ÂÅ Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†Ã¥Ë†â€”Ã¨Â¡Â¨]

### Ã©â€“â€¹Ã¦â€Â¾Ã¥â€¢ÂÃ©Â¡Å’
[Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¥â‚¬â€¹ Agent Ã§Å¡â€žÃ¦Å“ÂªÃ¨Â§Â£Ã¦Â±ÂºÃ©Â â€¦Ã§â€ºÂ®]

### Ã¥Â»ÂºÃ¨Â­Â°
[Ã¥Â»ÂºÃ¨Â­Â°Ã§Å¡â€žÃ¥Â¾Å’Ã§ÂºÅ’Ã¦Â­Â¥Ã©Â©Å¸]
```

## Ã¦Å“â‚¬Ã§Âµâ€šÃ¥Â Â±Ã¥â€˜Å Ã¦Â Â¼Ã¥Â¼Â

```
Ã¥Ââ€Ã¨ÂªÂ¿Ã¥Â Â±Ã¥â€˜Å 
====================
Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å¡feature
Ã¤Â»Â»Ã¥â€¹â„¢Ã¯Â¼Å¡Ã¦â€“Â°Ã¥Â¢Å¾Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã©Â©â€”Ã¨Â­â€°
AgentsÃ¯Â¼Å¡planner -> tdd-guide -> code-reviewer -> security-reviewer

Ã¦â€˜ËœÃ¨Â¦Â
-------
[Ã¤Â¸â‚¬Ã¦Â®ÂµÃ¦â€˜ËœÃ¨Â¦Â]

AGENT Ã¨Â¼Â¸Ã¥â€¡Âº
-------------
PlannerÃ¯Â¼Å¡[Ã¦â€˜ËœÃ¨Â¦Â]
TDD GuideÃ¯Â¼Å¡[Ã¦â€˜ËœÃ¨Â¦Â]
Code ReviewerÃ¯Â¼Å¡[Ã¦â€˜ËœÃ¨Â¦Â]
Security ReviewerÃ¯Â¼Å¡[Ã¦â€˜ËœÃ¨Â¦Â]

Ã¨Â®Å Ã¦â€ºÂ´Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†
-------------
[Ã¥Ë†â€”Ã¥â€¡ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†]

Ã¦Â¸Â¬Ã¨Â©Â¦Ã§ÂµÂÃ¦Å¾Å“
------------
[Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½/Ã¥Â¤Â±Ã¦â€¢â€”Ã¦â€˜ËœÃ¨Â¦Â]

Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã§â€¹â‚¬Ã¦â€¦â€¹
---------------
[Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã§â„¢Â¼Ã§ÂÂ¾]

Ã¥Â»ÂºÃ¨Â­Â°
--------------
[Ã§â„¢Â¼Ã¥Â¸Æ’ / Ã©Å“â‚¬Ã¨Â¦ÂÃ¦â€Â¹Ã©â‚¬Â² / Ã©ËœÂ»Ã¦â€œâ€¹]
```

## Ã¥Â¹Â³Ã¨Â¡Å’Ã¥Å¸Â·Ã¨Â¡Å’

Ã¥Â°ÂÃ¦â€“Â¼Ã§ÂÂ¨Ã§Â«â€¹Ã§Å¡â€žÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã¯Â¼Å’Ã¥Â¹Â³Ã¨Â¡Å’Ã¥Å¸Â·Ã¨Â¡Å’ AgentsÃ¯Â¼Å¡

```markdown
### Ã¥Â¹Â³Ã¨Â¡Å’Ã©Å¡Å½Ã¦Â®Âµ
Ã¥ÂÅ’Ã¦â„¢â€šÃ¥Å¸Â·Ã¨Â¡Å’Ã¯Â¼Å¡
- code-reviewerÃ¯Â¼Ë†Ã¥â€œÂÃ¨Â³ÂªÃ¯Â¼â€°
- security-reviewerÃ¯Â¼Ë†Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¯Â¼â€°
- architectÃ¯Â¼Ë†Ã¨Â¨Â­Ã¨Â¨Ë†Ã¯Â¼â€°

### Ã¥ÂË†Ã¤Â½ÂµÃ§ÂµÂÃ¦Å¾Å“
Ã¥Â°â€¡Ã¨Â¼Â¸Ã¥â€¡ÂºÃ¥ÂË†Ã¤Â½ÂµÃ§â€šÂºÃ¥â€“Â®Ã¤Â¸â‚¬Ã¥Â Â±Ã¥â€˜Å 
```

## Ã¥ÂÆ’Ã¦â€¢Â¸

$ARGUMENTS:
- `feature <description>` - Ã¥Â®Å’Ã¦â€¢Â´Ã¥Å Å¸Ã¨Æ’Â½Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹
- `bugfix <description>` - Bug Ã¤Â¿Â®Ã¥Â¾Â©Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹
- `refactor <description>` - Ã©â€¡ÂÃ¦Â§â€¹Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹
- `security <description>` - Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥Â¯Â©Ã¦Å¸Â¥Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹
- `custom <agents> <description>` - Ã¨â€¡ÂªÃ¨Â¨â€š Agent Ã¥ÂºÂÃ¥Ë†â€”

## Ã¨â€¡ÂªÃ¨Â¨â€šÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã§Â¯â€žÃ¤Â¾â€¹

```
/orchestrate custom "architect,tdd-guide,code-reviewer" "Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¨Â­Ã¨Â¨Ë†Ã¥Â¿Â«Ã¥Ââ€“Ã¥Â±Â¤"
```

## Ã¦ÂÂÃ§Â¤Âº

1. **Ã¨Â¤â€¡Ã©â€ºÅ“Ã¥Å Å¸Ã¨Æ’Â½Ã¥Â¾Å¾ planner Ã©â€“â€¹Ã¥Â§â€¹**
2. **Ã¥ÂË†Ã¤Â½ÂµÃ¥â€°ÂÃ§Â¸Â½Ã¦ËœÂ¯Ã¥Å’â€¦Ã¥ÂÂ« code-reviewer**
3. **Ã¥Â°ÂÃ©Â©â€”Ã¨Â­â€°/Ã¦â€Â¯Ã¤Â»Ëœ/PII Ã¤Â½Â¿Ã§â€Â¨ security-reviewer**
4. **Ã¤Â¿ÂÃ¦Å’ÂÃ¤ÂºÂ¤Ã¦Å½Â¥Ã§Â°Â¡Ã¦Â½â€** - Ã¥Â°Ë†Ã¦Â³Â¨Ã¦â€“Â¼Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¥â‚¬â€¹ Agent Ã©Å“â‚¬Ã¨Â¦ÂÃ§Å¡â€žÃ¥â€¦Â§Ã¥Â®Â¹
5. **Ã¥Â¦â€šÃ¦Å“â€°Ã©Å“â‚¬Ã¨Â¦ÂÃ¯Â¼Å’Ã¥Å“Â¨ Agents Ã¤Â¹â€¹Ã©â€“â€œÃ¥Å¸Â·Ã¨Â¡Å’ verification**
