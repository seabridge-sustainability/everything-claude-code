# Orchestrate Ã¦Å’â€¡Ã¤Â»Â¤

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
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
