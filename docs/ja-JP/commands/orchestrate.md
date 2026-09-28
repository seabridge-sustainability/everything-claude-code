# OrchestrateÃ£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

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


Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£ÂÂªÃ£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ¯Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã©â‚¬Â£Ã§Â¶Å¡Ã§Å¡â€žÃ£ÂÂªÃ£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢

`/orchestrate [Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”] [Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ¯Ã¨ÂªÂ¬Ã¦ËœÅ½]`

## Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”

### feature
Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ¦Â©Å¸Ã¨Æ’Â½Ã¥Â®Å¸Ã¨Â£â€¦Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼:
```
planner -> tdd-guide -> code-reviewer -> security-reviewer
```

### bugfix
Ã£Æ’ÂÃ£â€šÂ°Ã¨ÂªÂ¿Ã¦Å¸Â»Ã£ÂÂ¨Ã¤Â¿Â®Ã¦Â­Â£Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼:
```
explorer -> tdd-guide -> code-reviewer
```

### refactor
Ã¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂªÃ£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼:
```
architect -> code-reviewer -> tdd-guide
```

### security
Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã©â€¡ÂÃ¨Â¦â€“Ã£ÂÂ®Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼:
```
security-reviewer -> code-reviewer -> architect
```

## Ã¥Â®Å¸Ã¨Â¡Å’Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã¥â€ â€¦Ã£ÂÂ®Ã¥Ââ€žÃ£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦:

1. Ã¥â€°ÂÃ£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£Ââ€¹Ã£â€šâ€°Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ§**Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¥â€˜Â¼Ã£ÂÂ³Ã¥â€¡ÂºÃ£Ââ„¢**
2. Ã¥â€¡ÂºÃ¥Å â€ºÃ£â€šâ€™Ã¦Â§â€¹Ã©â‚¬Â Ã¥Å’â€“Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£â€šÂªÃ£Æ’â€¢Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ¨Ã£Ââ€”Ã£ÂÂ¦**Ã¥ÂÅ½Ã©â€ºâ€ **
3. Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Â¼Ã£Æ’Â³Ã¥â€ â€¦Ã£ÂÂ®**Ã¦Â¬Â¡Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã¦Â¸Â¡Ã£Ââ„¢**
4. Ã§ÂµÂÃ¦Å¾Å“Ã£â€šâ€™Ã¦Å“â‚¬Ã§Âµâ€šÃ£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£ÂÂ«**Ã©â€ºâ€ Ã§Â´â€ž**

## Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£â€šÂªÃ£Æ’â€¢Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã¥Â½Â¢Ã¥Â¼Â

Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã©â€“â€œÃ£ÂÂ§Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£â€šÂªÃ£Æ’â€¢Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:

```markdown
## HANDOFF: [Ã¥â€°ÂÃ£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†] -> [Ã¦Â¬Â¡Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†]

### Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†
[Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã¥â€ â€¦Ã¥Â®Â¹Ã£ÂÂ®Ã¨Â¦ÂÃ§Â´â€ž]

### Ã§â„¢ÂºÃ¨Â¦â€¹Ã¤Âºâ€¹Ã©Â â€¦
[Ã©â€¡ÂÃ¨Â¦ÂÃ£ÂÂªÃ§â„¢ÂºÃ¨Â¦â€¹Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã¦Â±ÂºÃ¥Â®Å¡]

### Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«
[Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ®Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†]

### Ã¦Å“ÂªÃ¨Â§Â£Ã¦Â±ÂºÃ£ÂÂ®Ã¨Â³ÂªÃ¥â€¢Â
[Ã¦Â¬Â¡Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¦Å“ÂªÃ¨Â§Â£Ã¦Â±ÂºÃ©Â â€¦Ã§â€ºÂ®]

### Ã¦Å½Â¨Ã¥Â¥Â¨Ã¤Âºâ€¹Ã©Â â€¦
[Ã¦Å½Â¨Ã¥Â¥Â¨Ã£Ââ€¢Ã£â€šÅ’Ã£â€šâ€¹Ã¦Â¬Â¡Ã£ÂÂ®Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”]
```

## Ã¤Â¾â€¹: Ã¦Â©Å¸Ã¨Æ’Â½Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

```
/orchestrate feature "Add user authentication"
```

Ã¤Â»Â¥Ã¤Â¸â€¹Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:

1. **PlannerÃ£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†**
   - Ã¨Â¦ÂÃ¤Â»Â¶Ã£â€šâ€™Ã¥Ë†â€ Ã¦Å¾Â
   - Ã¥Â®Å¸Ã¨Â£â€¦Ã¨Â¨Ë†Ã§â€Â»Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
   - Ã¤Â¾ÂÃ¥Â­ËœÃ©â€“Â¢Ã¤Â¿â€šÃ£â€šâ€™Ã§â€°Â¹Ã¥Â®Å¡
   - Ã¥â€¡ÂºÃ¥Å â€º: `HANDOFF: planner -> tdd-guide`

2. **TDD GuideÃ£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†**
   - Ã£Æ’â€”Ã£Æ’Â©Ã£Æ’Â³Ã£Æ’Å Ã£Æ’Â¼Ã£ÂÂ®Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£â€šÂªÃ£Æ’â€¢Ã£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£â€šâ‚¬
   - Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¨ËœÃ¨Â¿Â°
   - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ«Ã¥ÂË†Ã¦Â Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã£â€šË†Ã£Ââ€ Ã£ÂÂ«Ã¥Â®Å¸Ã¨Â£â€¦
   - Ã¥â€¡ÂºÃ¥Å â€º: `HANDOFF: tdd-guide -> code-reviewer`

3. **Code ReviewerÃ£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†**
   - Ã¥Â®Å¸Ã¨Â£â€¦Ã£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼
   - Ã¥â€¢ÂÃ©Â¡Å’Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
   - Ã¦â€Â¹Ã¥â€“â€žÃ£â€šâ€™Ã¦ÂÂÃ¦Â¡Ë†
   - Ã¥â€¡ÂºÃ¥Å â€º: `HANDOFF: code-reviewer -> security-reviewer`

4. **Security ReviewerÃ£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†**
   - Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã§â€ºÂ£Ã¦Å¸Â»
   - Ã¨â€žâ€ Ã¥Â¼Â±Ã¦â‚¬Â§Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
   - Ã¦Å“â‚¬Ã§Âµâ€šÃ¦â€°Â¿Ã¨ÂªÂ
   - Ã¥â€¡ÂºÃ¥Å â€º: Ã¦Å“â‚¬Ã§Âµâ€šÃ£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†

## Ã¦Å“â‚¬Ã§Âµâ€šÃ£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã¥Â½Â¢Ã¥Â¼Â

```
Ã£â€šÂªÃ£Æ’Â¼Ã£â€šÂ±Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†
====================
Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼: feature
Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ¯: Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¨ÂªÂÃ¨Â¨Â¼Ã£ÂÂ®Ã¨Â¿Â½Ã¥Å Â 
Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†: planner -> tdd-guide -> code-reviewer -> security-reviewer

Ã£â€šÂµÃ£Æ’Å¾Ã£Æ’ÂªÃ£Æ’Â¼
-------
[1Ã¦Â®ÂµÃ¨ÂÂ½Ã£ÂÂ®Ã¨Â¦ÂÃ§Â´â€ž]

Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã¥â€¡ÂºÃ¥Å â€º
-------------
Planner: [Ã¨Â¦ÂÃ§Â´â€ž]
TDD Guide: [Ã¨Â¦ÂÃ§Â´â€ž]
Code Reviewer: [Ã¨Â¦ÂÃ§Â´â€ž]
Security Reviewer: [Ã¨Â¦ÂÃ§Â´â€ž]

Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«
-------------
[Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†]

Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã§ÂµÂÃ¦Å¾Å“
------------
[Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¥ÂË†Ã¦Â Â¼/Ã¤Â¸ÂÃ¥ÂË†Ã¦Â Â¼Ã£ÂÂ®Ã¨Â¦ÂÃ§Â´â€ž]

Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹
---------------
[Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£ÂÂ®Ã§â„¢ÂºÃ¨Â¦â€¹Ã¤Âºâ€¹Ã©Â â€¦]

Ã¦Å½Â¨Ã¥Â¥Â¨Ã¤Âºâ€¹Ã©Â â€¦
--------------
[Ã£Æ’ÂªÃ£Æ’ÂªÃ£Æ’Â¼Ã£â€šÂ¹Ã¥ÂÂ¯ / Ã¨Â¦ÂÃ¤Â¿Â®Ã¦Â­Â£ / Ã£Æ’â€“Ã£Æ’Â­Ã£Æ’Æ’Ã£â€šÂ¯Ã¤Â¸Â­]
```

## Ã¤Â¸Â¦Ã¨Â¡Å’Ã¥Â®Å¸Ã¨Â¡Å’

Ã§â€¹Â¬Ã§Â«â€¹Ã£Ââ€”Ã£ÂÅ¸Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ®Ã¥Â Â´Ã¥ÂË†Ã£â‚¬ÂÃ£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â¸Â¦Ã¨Â¡Å’Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:

```markdown
### Ã¤Â¸Â¦Ã¨Â¡Å’Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂº
Ã¥ÂÅ’Ã¦â„¢â€šÃ£ÂÂ«Ã¥Â®Å¸Ã¨Â¡Å’:
- code-reviewer (Ã¥â€œÂÃ¨Â³Âª)
- security-reviewer (Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£)
- architect (Ã¨Â¨Â­Ã¨Â¨Ë†)

### Ã§ÂµÂÃ¦Å¾Å“Ã£ÂÂ®Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¸
Ã¥â€¡ÂºÃ¥Å â€ºÃ£â€šâ€™Ã¥ÂËœÃ¤Â¸â‚¬Ã£ÂÂ®Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£ÂÂ«Ã§ÂµÂÃ¥ÂË†
```

## Ã¥Â¼â€¢Ã¦â€¢Â°

$ARGUMENTS:
- `feature <Ã¨ÂªÂ¬Ã¦ËœÅ½>` - Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ¦Â©Å¸Ã¨Æ’Â½Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
- `bugfix <Ã¨ÂªÂ¬Ã¦ËœÅ½>` - Ã£Æ’ÂÃ£â€šÂ°Ã¤Â¿Â®Ã¦Â­Â£Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
- `refactor <Ã¨ÂªÂ¬Ã¦ËœÅ½>` - Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
- `security <Ã¨ÂªÂ¬Ã¦ËœÅ½>` - Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
- `custom <Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†> <Ã¨ÂªÂ¬Ã¦ËœÅ½>` - Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Â³Ã£â€šÂ¹

## Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£ÂÂ®Ã¤Â¾â€¹

```
/orchestrate custom "architect,tdd-guide,code-reviewer" "Redesign caching layer"
```

## Ã£Æ’â€™Ã£Æ’Â³Ã£Æ’Ë†

1. Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£ÂÂªÃ¦Â©Å¸Ã¨Æ’Â½Ã£ÂÂ«Ã£ÂÂ¯**plannerÃ£Ââ€¹Ã£â€šâ€°Ã¥Â§â€¹Ã£â€šÂÃ£â€šâ€¹**
2. Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¸Ã¥â€°ÂÃ£ÂÂ«**Ã¥Â¸Â¸Ã£ÂÂ«code-reviewerÃ£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£â€šâ€¹**
3. Ã¨ÂªÂÃ¨Â¨Â¼/Ã¦Â±ÂºÃ¦Â¸Ë†/Ã¥â‚¬â€¹Ã¤ÂºÂºÃ¦Æ’â€¦Ã¥Â Â±Ã£ÂÂ«Ã£ÂÂ¯**security-reviewerÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨**
4. **Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£â€šÂªÃ£Æ’â€¢Ã£â€šâ€™Ã§Â°Â¡Ã¦Â½â€Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¤** - Ã¦Â¬Â¡Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÅ’Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂ¨Ã£Ââ„¢Ã£â€šâ€¹Ã£â€šâ€šÃ£ÂÂ®Ã£ÂÂ«Ã§â€žÂ¦Ã§â€šÂ¹Ã£â€šâ€™Ã¥Â½â€œÃ£ÂÂ¦Ã£â€šâ€¹
5. Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂ«Ã¥Â¿Å“Ã£ÂËœÃ£ÂÂ¦**Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã©â€“â€œÃ£ÂÂ§Ã¦Â¤Å“Ã¨Â¨Â¼Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’**
