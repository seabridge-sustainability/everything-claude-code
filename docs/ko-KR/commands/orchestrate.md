# Orchestrate Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã«Â³ÂµÃ¬Å¾Â¡Ã­â€¢Å“ Ã¬Å¾â€˜Ã¬â€”â€¦Ã¬Ââ€ž Ã¬Å“â€žÃ­â€¢Å“ Ã¬Ë†Å“Ã¬Â°Â¨Ã¬Â Â Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°Ã¬Å¾â€¦Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬â€šÂ¬Ã¬Å¡Â©Ã«Â²â€¢

`/orchestrate [workflow-type] [task-description]`

## Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â° Ã¬Å“Â Ã­Ëœâ€¢

### feature
Ã¬Â â€žÃ¬Â²Â´ ÃªÂ¸Â°Ã«Å Â¥ ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°:
```
planner -> tdd-guide -> code-reviewer -> security-reviewer
```

### bugfix
Ã«Â²â€žÃªÂ·Â¸ Ã¬Â¡Â°Ã¬â€šÂ¬ Ã«Â°Â Ã¬Ë†ËœÃ¬Â â€¢ Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°:
```
planner -> tdd-guide -> code-reviewer
```

### refactor
Ã¬â€¢Ë†Ã¬Â â€žÃ­â€¢Å“ Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°:
```
architect -> code-reviewer -> tdd-guide
```

### security
Ã«Â³Â´Ã¬â€¢Ë† Ã¬Â¤â€˜Ã¬â€¹Â¬ Ã«Â¦Â¬Ã«Â·Â°:
```
security-reviewer -> code-reviewer -> architect
```

## Ã¬â€¹Â¤Ã­â€“â€° Ã­Å’Â¨Ã­â€žÂ´

Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°Ã¬ÂËœ ÃªÂ°Â Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Â´:

1. Ã¬ÂÂ´Ã¬Â â€ž Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã¬ÂËœ Ã¬Â»Â¨Ã­â€¦ÂÃ¬Å Â¤Ã­Å Â¸Ã«Â¡Å“ **Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã­ËœÂ¸Ã¬Â¶Å“**
2. ÃªÂµÂ¬Ã¬Â¡Â°Ã­â„¢â€Ã«ÂÅ“ Ã­â€¢Â¸Ã«â€œÅ“Ã¬ËœÂ¤Ã­â€â€ž Ã«Â¬Â¸Ã¬â€žÅ“Ã«Â¡Å“ **Ã¬Â¶Å“Ã«Â Â¥ Ã¬Ë†ËœÃ¬Â§â€˜**
3. Ã¬Â²Â´Ã¬ÂÂ¸Ã¬ÂËœ **Ã«â€¹Â¤Ã¬ÂÅ’ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã¬â€”Â Ã¬Â â€žÃ«â€¹Â¬**
4. **ÃªÂ²Â°ÃªÂ³Â¼Ã«Â¥Â¼ Ã¬Â¢â€¦Ã­â€¢Â©**Ã­â€¢ËœÃ¬â€”Â¬ Ã¬ÂµÅ“Ã¬Â¢â€¦ Ã«Â³Â´ÃªÂ³Â Ã¬â€žÅ“ Ã¬Å¾â€˜Ã¬â€žÂ±

## Ã­â€¢Â¸Ã«â€œÅ“Ã¬ËœÂ¤Ã­â€â€ž Ã«Â¬Â¸Ã¬â€žÅ“ Ã­Ëœâ€¢Ã¬â€¹Â

Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ ÃªÂ°â€žÃ¬â€”Â Ã­â€¢Â¸Ã«â€œÅ“Ã¬ËœÂ¤Ã­â€â€ž Ã«Â¬Â¸Ã¬â€žÅ“Ã«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```markdown
## HANDOFF: [Ã¬ÂÂ´Ã¬Â â€ž-Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸] -> [Ã«â€¹Â¤Ã¬ÂÅ’-Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸]

### Context
[Ã¬Ë†ËœÃ­â€“â€°Ã«ÂÅ“ Ã¬Å¾â€˜Ã¬â€”â€¦ Ã¬Å¡â€Ã¬â€¢Â½]

### Findings
[Ã¬Â£Â¼Ã¬Å¡â€ Ã«Â°Å“ÃªÂ²Â¬ Ã¬â€šÂ¬Ã­â€¢Â­ Ã«ËœÂÃ«Å â€ ÃªÂ²Â°Ã¬Â â€¢ Ã¬â€šÂ¬Ã­â€¢Â­]

### Files Modified
[Ã¬Ë†ËœÃ¬Â â€¢Ã«ÂÅ“ Ã­Å’Å’Ã¬ÂÂ¼ Ã«ÂªÂ©Ã«Â¡Â]

### Open Questions
[Ã«â€¹Â¤Ã¬ÂÅ’ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã«Â¥Â¼ Ã¬Å“â€žÃ­â€¢Å“ Ã«Â¯Â¸Ã­â€¢Â´ÃªÂ²Â° Ã­â€¢Â­Ã«ÂªÂ©]

### Recommendations
[Ã¬Â Å“Ã¬â€¢Ë†Ã­â€¢ËœÃ«Å â€ Ã«â€¹Â¤Ã¬ÂÅ’ Ã«â€¹Â¨ÃªÂ³â€ž]
```

## Ã¬ËœË†Ã¬â€¹Å“: Feature Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

```
/orchestrate feature "Add user authentication"
```

Ã¬â€¹Â¤Ã­â€“â€° Ã¬Ë†Å“Ã¬â€žÅ“:

1. **Planner Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸**
   - Ã¬Å¡â€ÃªÂµÂ¬Ã¬â€šÂ¬Ã­â€¢Â­ Ã«Â¶â€žÃ¬â€žÂ
   - ÃªÂµÂ¬Ã­Ëœâ€ž ÃªÂ³â€žÃ­Å¡Â Ã¬Å¾â€˜Ã¬â€žÂ±
   - Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ± Ã¬â€¹ÂÃ«Â³â€ž
   - Ã¬Â¶Å“Ã«Â Â¥: `HANDOFF: planner -> tdd-guide`

2. **TDD Guide Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸**
   - planner Ã­â€¢Â¸Ã«â€œÅ“Ã¬ËœÂ¤Ã­â€â€ž Ã¬ÂÂ½ÃªÂ¸Â°
   - Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬Å¾â€˜Ã¬â€žÂ±
   - Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã­â€ ÂµÃªÂ³Â¼Ã­â€¢ËœÃ«Ââ€žÃ«Â¡Â ÃªÂµÂ¬Ã­Ëœâ€ž
   - Ã¬Â¶Å“Ã«Â Â¥: `HANDOFF: tdd-guide -> code-reviewer`

3. **Code Reviewer Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸**
   - ÃªÂµÂ¬Ã­Ëœâ€ž Ã«Â¦Â¬Ã«Â·Â°
   - Ã¬ÂÂ´Ã¬Å Ë† Ã­â„¢â€¢Ã¬ÂÂ¸
   - ÃªÂ°Å“Ã¬â€žÂ Ã¬â€šÂ¬Ã­â€¢Â­ Ã¬Â Å“Ã¬â€¢Ë†
   - Ã¬Â¶Å“Ã«Â Â¥: `HANDOFF: code-reviewer -> security-reviewer`

4. **Security Reviewer Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸**
   - Ã«Â³Â´Ã¬â€¢Ë† ÃªÂ°ÂÃ¬â€šÂ¬
   - Ã¬Â·Â¨Ã¬â€¢Â½Ã¬Â Â Ã¬Â ÂÃªÂ²â‚¬
   - Ã¬ÂµÅ“Ã¬Â¢â€¦ Ã¬Å Â¹Ã¬ÂÂ¸
   - Ã¬Â¶Å“Ã«Â Â¥: Ã¬ÂµÅ“Ã¬Â¢â€¦ Ã«Â³Â´ÃªÂ³Â Ã¬â€žÅ“

## Ã¬ÂµÅ“Ã¬Â¢â€¦ Ã«Â³Â´ÃªÂ³Â Ã¬â€žÅ“ Ã­Ëœâ€¢Ã¬â€¹Â

```
ORCHESTRATION REPORT
====================
Workflow: feature
Task: Add user authentication
Agents: planner -> tdd-guide -> code-reviewer -> security-reviewer

SUMMARY
-------
[Ã­â€¢Å“ Ã«â€¹Â¨Ã«ÂÂ½ Ã¬Å¡â€Ã¬â€¢Â½]

AGENT OUTPUTS
-------------
Planner: [Ã¬Å¡â€Ã¬â€¢Â½]
TDD Guide: [Ã¬Å¡â€Ã¬â€¢Â½]
Code Reviewer: [Ã¬Å¡â€Ã¬â€¢Â½]
Security Reviewer: [Ã¬Å¡â€Ã¬â€¢Â½]

FILES CHANGED
-------------
[Ã¬Ë†ËœÃ¬Â â€¢Ã«ÂÅ“ Ã«ÂªÂ¨Ã«â€œÂ  Ã­Å’Å’Ã¬ÂÂ¼ Ã«ÂªÂ©Ã«Â¡Â]

TEST RESULTS
------------
[Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã­â€ ÂµÃªÂ³Â¼/Ã¬â€¹Â¤Ã­Å’Â¨ Ã¬Å¡â€Ã¬â€¢Â½]

SECURITY STATUS
---------------
[Ã«Â³Â´Ã¬â€¢Ë† Ã«Â°Å“ÃªÂ²Â¬ Ã¬â€šÂ¬Ã­â€¢Â­]

RECOMMENDATION
--------------
[SHIP / NEEDS WORK / BLOCKED]
```

## Ã«Â³â€˜Ã«Â Â¬ Ã¬â€¹Â¤Ã­â€“â€°

Ã«Ââ€¦Ã«Â¦Â½Ã¬Â ÂÃ¬ÂÂ¸ ÃªÂ²â‚¬Ã¬â€šÂ¬Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Â´Ã¬â€žÅ“Ã«Å â€ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã«Â¥Â¼ Ã«Â³â€˜Ã«Â Â¬Ã«Â¡Å“ Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```markdown
### Parallel Phase
Ã«Ââ„¢Ã¬â€¹Å“Ã¬â€”Â Ã¬â€¹Â¤Ã­â€“â€°:
- code-reviewer (Ã­â€™Ë†Ã¬Â§Ë†)
- security-reviewer (Ã«Â³Â´Ã¬â€¢Ë†)
- architect (Ã¬â€žÂ¤ÃªÂ³â€ž)

### Merge Results
Ã¬Â¶Å“Ã«Â Â¥Ã¬Ââ€ž Ã«â€¹Â¨Ã¬ÂÂ¼ Ã«Â³Â´ÃªÂ³Â Ã¬â€žÅ“Ã«Â¡Å“ Ã­â€ ÂµÃ­â€¢Â©
```

## Ã¬ÂÂ¸Ã¬Å¾Â

$ARGUMENTS:
- `feature <description>` - Ã¬Â â€žÃ¬Â²Â´ ÃªÂ¸Â°Ã«Å Â¥ Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°
- `bugfix <description>` - Ã«Â²â€žÃªÂ·Â¸ Ã¬Ë†ËœÃ¬Â â€¢ Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°
- `refactor <description>` - Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°
- `security <description>` - Ã«Â³Â´Ã¬â€¢Ë† Ã«Â¦Â¬Ã«Â·Â° Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°
- `custom <agents> <description>` - Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã¬Â â€¢Ã¬ÂËœ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬Ë†Å“Ã¬â€žÅ“

## Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã¬Â â€¢Ã¬ÂËœ Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â° Ã¬ËœË†Ã¬â€¹Å“

```
/orchestrate custom "architect,tdd-guide,code-reviewer" "Redesign caching layer"
```

## Ã­Å’Â

1. Ã«Â³ÂµÃ¬Å¾Â¡Ã­â€¢Å“ ÃªÂ¸Â°Ã«Å Â¥Ã¬â€”ÂÃ«Å â€ **plannerÃ«Â¶â‚¬Ã­â€žÂ° Ã¬â€¹Å“Ã¬Å¾â€˜**Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€
2. merge Ã¬Â â€žÃ¬â€”ÂÃ«Å â€ **Ã­â€¢Â­Ã¬Æ’Â code-reviewerÃ«Â¥Â¼ Ã­ÂÂ¬Ã­â€¢Â¨**Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€
3. Ã¬ÂÂ¸Ã¬Â¦Â/ÃªÂ²Â°Ã¬Â Å“/ÃªÂ°Å“Ã¬ÂÂ¸Ã¬Â â€¢Ã«Â³Â´ Ã¬Â²ËœÃ«Â¦Â¬Ã¬â€”ÂÃ«Å â€ **security-reviewerÃ«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©**Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€
4. **Ã­â€¢Â¸Ã«â€œÅ“Ã¬ËœÂ¤Ã­â€â€žÃ«Å â€ ÃªÂ°â€žÃªÂ²Â°Ã­â€¢ËœÃªÂ²Å’** Ã¬Å“Â Ã¬Â§â‚¬Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€ - Ã«â€¹Â¤Ã¬ÂÅ’ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã¬â€”Â Ã­â€¢â€žÃ¬Å¡â€Ã­â€¢Å“ ÃªÂ²Æ’Ã¬â€”Â Ã¬Â§â€˜Ã¬Â¤â€˜
5. Ã­â€¢â€žÃ¬Å¡â€Ã­â€¢Å“ ÃªÂ²Â½Ã¬Å¡Â° Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬â€šÂ¬Ã¬ÂÂ´Ã¬â€”Â **ÃªÂ²â‚¬Ã¬Â¦ÂÃ¬Ââ€ž Ã¬â€¹Â¤Ã­â€“â€°**Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€
