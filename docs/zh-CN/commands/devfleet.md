---
description: Ã©â‚¬Å¡Ã¨Â¿â€¡Claude DevFleetÃ¥ÂÂÃ¨Â°Æ’Ã¥Â¹Â¶Ã¨Â¡Å’Claude CodeÃ¤Â»Â£Ã§Ââ€ Ã¢â‚¬â€Ã¢â‚¬â€Ã¤Â»Å½Ã¨â€¡ÂªÃ§â€žÂ¶Ã¨Â¯Â­Ã¨Â¨â‚¬Ã¨Â§â€žÃ¥Ë†â€™Ã©Â¡Â¹Ã§â€ºÂ®Ã¯Â¼Å’Ã¥Å“Â¨Ã©Å¡â€Ã§Â¦Â»Ã§Å¡â€žÃ¥Â·Â¥Ã¤Â½Å“Ã¦Â â€˜Ã¤Â¸Â­Ã¨Â°Æ’Ã¥ÂºÂ¦Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å’Ã§â€ºâ€˜Ã¦Å½Â§Ã¨Â¿â€ºÃ¥ÂºÂ¦Ã¯Â¼Å’Ã¥Â¹Â¶Ã¨Â¯Â»Ã¥Ââ€“Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¦Å Â¥Ã¥â€˜Å Ã£â‚¬â€š
---

# DevFleet Ã¢â‚¬â€ Ã¥Â¤Å¡Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ§Â¼â€“Ã¦Å½â€™

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


Ã©â‚¬Å¡Ã¨Â¿â€¡ Claude DevFleet Ã§Â¼â€“Ã¦Å½â€™Ã¥Â¹Â¶Ã¨Â¡Å’Ã§Å¡â€ž Claude Code Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ£â‚¬â€šÃ¦Â¯ÂÃ¤Â¸ÂªÃ¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¥Å“Â¨Ã©Å¡â€Ã§Â¦Â»Ã§Å¡â€ž git worktree Ã¤Â¸Â­Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å’Ã¥Â¹Â¶Ã©â€¦ÂÃ¥Â¤â€¡Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ¥Â·Â¥Ã¥â€¦Â·Ã©â€œÂ¾Ã£â‚¬â€š

Ã©Å“â‚¬Ã¨Â¦Â DevFleet MCP Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã¯Â¼Å¡`claude mcp add devfleet --transport http http://localhost:18801/mcp`

## Ã¦ÂµÂÃ§Â¨â€¹

```
Ã§â€Â¨Ã¦Ë†Â·Ã¦ÂÂÃ¨Â¿Â°Ã©Â¡Â¹Ã§â€ºÂ®
  Ã¢â€ â€™ plan_project(prompt) Ã¢â€ â€™ Ã¤Â»Â»Ã¥Å Â¡DAGÃ¤Â¸Å½Ã¤Â¾ÂÃ¨Âµâ€“Ã¥â€¦Â³Ã§Â³Â»
  Ã¢â€ â€™ Ã¥Â±â€¢Ã§Â¤ÂºÃ¨Â®Â¡Ã¥Ë†â€™Ã¯Â¼Å’Ã¨Å½Â·Ã¥Ââ€“Ã¦â€°Â¹Ã¥â€¡â€ 
  Ã¢â€ â€™ dispatch_mission(M1) Ã¢â€ â€™ Ã¤Â»Â£Ã§Ââ€ Ã¥Å“Â¨Ã¥Â·Â¥Ã¤Â½Å“Ã¥Å’ÂºÃ¤Â¸Â­Ã§â€Å¸Ã¦Ë†Â
  Ã¢â€ â€™ M1Ã¥Â®Å’Ã¦Ë†Â Ã¢â€ â€™ Ã¨â€¡ÂªÃ¥Å Â¨Ã¥ÂË†Ã¥Â¹Â¶ Ã¢â€ â€™ M2Ã¨â€¡ÂªÃ¥Å Â¨Ã¨Â°Æ’Ã¥ÂºÂ¦Ã¯Â¼Ë†Ã¤Â¾ÂÃ¨Âµâ€“Ã¤ÂºÅ½M1Ã¯Â¼â€°
  Ã¢â€ â€™ M2Ã¥Â®Å’Ã¦Ë†Â Ã¢â€ â€™ Ã¨â€¡ÂªÃ¥Å Â¨Ã¥ÂË†Ã¥Â¹Â¶
  Ã¢â€ â€™ get_report(M2) Ã¢â€ â€™ Ã¦â€“â€¡Ã¤Â»Â¶Ã¥ÂËœÃ¦â€ºÂ´Ã£â‚¬ÂÃ¥Â®Å’Ã¦Ë†ÂÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬ÂÃ©â€â„¢Ã¨Â¯Â¯Ã£â‚¬ÂÃ¥ÂÅ½Ã§Â»Â­Ã¦Â­Â¥Ã©ÂªÂ¤
  Ã¢â€ â€™ Ã¥Ââ€˜Ã§â€Â¨Ã¦Ë†Â·Ã¦Å Â¥Ã¥â€˜Å Ã¦â‚¬Â»Ã§Â»â€œ
```

## Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

1. **Ã¦Â Â¹Ã¦ÂÂ®Ã§â€Â¨Ã¦Ë†Â·Ã¦ÂÂÃ¨Â¿Â°Ã¨Â§â€žÃ¥Ë†â€™Ã©Â¡Â¹Ã§â€ºÂ®**Ã¯Â¼Å¡

```
mcp__devfleet__plan_project(prompt="<Ã§â€Â¨Ã¦Ë†Â·Ã¦ÂÂÃ¨Â¿Â°>")
```

Ã¨Â¿â„¢Ã¥Â°â€ Ã¨Â¿â€Ã¥â€ºÅ¾Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Å’â€¦Ã¥ÂÂ«Ã©â€œÂ¾Ã¥Â¼ÂÃ¤Â»Â»Ã¥Å Â¡Ã§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ®Ã£â‚¬â€šÃ¥Ââ€˜Ã§â€Â¨Ã¦Ë†Â·Ã¥Â±â€¢Ã§Â¤ÂºÃ¯Â¼Å¡

* Ã©Â¡Â¹Ã§â€ºÂ®Ã¥ÂÂÃ§Â§Â°Ã¥â€™Å’ ID
* Ã¦Â¯ÂÃ¤Â¸ÂªÃ¤Â»Â»Ã¥Å Â¡Ã¯Â¼Å¡Ã¦Â â€¡Ã©Â¢ËœÃ£â‚¬ÂÃ§Â±Â»Ã¥Å¾â€¹Ã£â‚¬ÂÃ¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹
* Ã¤Â¾ÂÃ¨Âµâ€“Ã¥â€¦Â³Ã§Â³Â» DAGÃ¯Â¼Ë†Ã¥â€œÂªÃ¤Âºâ€ºÃ¤Â»Â»Ã¥Å Â¡Ã©ËœÂ»Ã¥Â¡Å¾Ã¤Âºâ€ Ã¥â€œÂªÃ¤Âºâ€ºÃ¤Â»Â»Ã¥Å Â¡Ã¯Â¼â€°

2. **Ã¥Å“Â¨Ã¦Â´Â¾Ã¥Ââ€˜Ã¥â€°ÂÃ§Â­â€°Ã¥Â¾â€¦Ã§â€Â¨Ã¦Ë†Â·Ã¦â€°Â¹Ã¥â€¡â€ **Ã£â‚¬â€šÃ¦Â¸â€¦Ã¦â„¢Â°Ã¥Â±â€¢Ã§Â¤ÂºÃ¨Â®Â¡Ã¥Ë†â€™Ã£â‚¬â€š

3. **Ã¦Â´Â¾Ã¥Ââ€˜Ã§Â¬Â¬Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¤Â»Â»Ã¥Å Â¡**Ã¯Â¼Ë†`depends_on` Ã¤Â¸ÂºÃ§Â©ÂºÃ§Å¡â€žÃ¤Â»Â»Ã¥Å Â¡Ã¯Â¼â€°Ã¯Â¼Å¡

```
mcp__devfleet__dispatch_mission(mission_id="<first_mission_id>")
```

Ã¥â€°Â©Ã¤Â½â„¢Ã§Å¡â€žÃ¤Â»Â»Ã¥Å Â¡Ã¤Â¼Å¡Ã¥Å“Â¨Ã¥â€¦Â¶Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¥Â®Å’Ã¦Ë†ÂÃ¦â€”Â¶Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â´Â¾Ã¥Ââ€˜Ã¯Â¼Ë†Ã¥â€ºÂ Ã¤Â¸Âº `plan_project` Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Â®Æ’Ã¤Â»Â¬Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¤Âºâ€  `auto_dispatch=true`Ã¯Â¼â€°Ã£â‚¬â€šÃ¥Â½â€œÃ¤Â½Â¿Ã§â€Â¨ `create_mission` Ã¦â€°â€¹Ã¥Å Â¨Ã¥Ë†â€ºÃ¥Â»ÂºÃ¤Â»Â»Ã¥Å Â¡Ã¦â€”Â¶Ã¯Â¼Å’Ã¦â€šÂ¨Ã¥Â¿â€¦Ã©Â¡Â»Ã¦ËœÂ¾Ã¥Â¼ÂÃ¨Â®Â¾Ã§Â½Â® `auto_dispatch=true` Ã¦â€°ÂÃ¨Æ’Â½Ã¥ÂÂ¯Ã§â€Â¨Ã¦Â­Â¤Ã¨Â¡Å’Ã¤Â¸ÂºÃ£â‚¬â€š

4. **Ã§â€ºâ€˜Ã¦Å½Â§Ã¨Â¿â€ºÃ¥ÂºÂ¦** Ã¢â‚¬â€ Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â­Â£Ã¥Å“Â¨Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã¯Â¼Å¡

```
mcp__devfleet__get_dashboard()
```

Ã¦Ë†â€“Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€°Â¹Ã¥Â®Å¡Ã¤Â»Â»Ã¥Å Â¡Ã¯Â¼Å¡

```
mcp__devfleet__get_mission_status(mission_id="<id>")
```

Ã¥Â¯Â¹Ã¤ÂºÅ½Ã©â€¢Â¿Ã¦â€”Â¶Ã©â€”Â´Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¤Â»Â»Ã¥Å Â¡Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `get_mission_status` Ã¨Â½Â®Ã¨Â¯Â¢Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯ `wait_for_mission`Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¾Â¿Ã§â€Â¨Ã¦Ë†Â·Ã¨Æ’Â½Ã§Å“â€¹Ã¥Ë†Â°Ã¨Â¿â€ºÃ¥ÂºÂ¦Ã¦â€ºÂ´Ã¦â€“Â°Ã£â‚¬â€š

5. **Ã¨Â¯Â»Ã¥Ââ€“Ã¦Â¯ÂÃ¤Â¸ÂªÃ¥Â·Â²Ã¥Â®Å’Ã¦Ë†ÂÃ¤Â»Â»Ã¥Å Â¡Ã§Å¡â€žÃ¦Å Â¥Ã¥â€˜Å **Ã¯Â¼Å¡

```
mcp__devfleet__get_report(mission_id="<mission_id>")
```

Ã¥Â¯Â¹Ã¦Â¯ÂÃ¤Â¸ÂªÃ¨Â¾Â¾Ã¥Ë†Â°Ã§Â»Ë†Ã¦Â­Â¢Ã§Å Â¶Ã¦â‚¬ÂÃ§Å¡â€žÃ¤Â»Â»Ã¥Å Â¡Ã¨Â°Æ’Ã§â€Â¨Ã¦Â­Â¤Ã¥Â·Â¥Ã¥â€¦Â·Ã£â‚¬â€šÃ¦Å Â¥Ã¥â€˜Å Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡files\_changed, what\_done, what\_open, what\_tested, what\_untested, next\_steps, errors\_encounteredÃ£â‚¬â€š

## Ã¦â€°â‚¬Ã¦Å“â€°Ã¥ÂÂ¯Ã§â€Â¨Ã¥Â·Â¥Ã¥â€¦Â·

| Ã¥Â·Â¥Ã¥â€¦Â· | Ã§â€Â¨Ã©â‚¬â€ |
|------|---------|
| `plan_project(prompt)` | AI Ã¥Â°â€ Ã¦ÂÂÃ¨Â¿Â°Ã¥Ë†â€ Ã¨Â§Â£Ã¤Â¸ÂºÃ¥â€¦Â·Ã¦Å“â€° `auto_dispatch=true` Ã§Å¡â€žÃ©â€œÂ¾Ã¥Â¼ÂÃ¤Â»Â»Ã¥Å Â¡ |
| `create_project(name, path?, description?)` | Ã¦â€°â€¹Ã¥Å Â¨Ã¥Ë†â€ºÃ¥Â»ÂºÃ©Â¡Â¹Ã§â€ºÂ®Ã¯Â¼Å’Ã¨Â¿â€Ã¥â€ºÅ¾ `project_id` |
| `create_mission(project_id, title, prompt, depends_on?, auto_dispatch?)` | Ã¦Â·Â»Ã¥Å Â Ã¤Â»Â»Ã¥Å Â¡Ã£â‚¬â€š`depends_on` Ã¦ËœÂ¯Ã¤Â»Â»Ã¥Å Â¡ ID Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¥Ë†â€”Ã¨Â¡Â¨Ã£â‚¬â€š |
| `dispatch_mission(mission_id, model?, max_turns?)` | Ã¥ÂÂ¯Ã¥Å Â¨Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œ |
| `cancel_mission(mission_id)` | Ã¥ÂÅ“Ã¦Â­Â¢Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Â­Â£Ã¥Å“Â¨Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œ |
| `wait_for_mission(mission_id, timeout_seconds?)` | Ã©ËœÂ»Ã¥Â¡Å¾Ã§â€ºÂ´Ã¥Ë†Â°Ã¥Â®Å’Ã¦Ë†ÂÃ¯Â¼Ë†Ã¥Â¯Â¹Ã¤ÂºÅ½Ã©â€¢Â¿Ã¤Â»Â»Ã¥Å Â¡Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¨Â½Â®Ã¨Â¯Â¢Ã¯Â¼â€° |
| `get_mission_status(mission_id)` | Ã©ÂÅ¾Ã©ËœÂ»Ã¥Â¡Å¾Ã¥Å“Â°Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¿â€ºÃ¥ÂºÂ¦ |
| `get_report(mission_id)` | Ã¨Â¯Â»Ã¥Ââ€“Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¦Å Â¥Ã¥â€˜Å  |
| `get_dashboard()` | Ã§Â³Â»Ã§Â»Å¸Ã¦Â¦â€šÃ¨Â§Ë† |
| `list_projects()` | Ã¦ÂµÂÃ¨Â§Ë†Ã©Â¡Â¹Ã§â€ºÂ® |
| `list_missions(project_id, status?)` | Ã¥Ë†â€”Ã¥â€¡ÂºÃ¤Â»Â»Ã¥Å Â¡ |

## Ã¦Å’â€¡Ã¥Ââ€”

* Ã©â„¢Â¤Ã©ÂÅ¾Ã§â€Â¨Ã¦Ë†Â·Ã¦ËœÅ½Ã§Â¡Â®Ã¨Â¯Â´"Ã¥Â¼â‚¬Ã¥Â§â€¹Ã¥ÂÂ§"Ã¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã¦Â´Â¾Ã¥Ââ€˜Ã¥â€°ÂÃ¥Â§â€¹Ã§Â»Ë†Ã§Â¡Â®Ã¨Â®Â¤Ã¨Â®Â¡Ã¥Ë†â€™
* Ã¦Å Â¥Ã¥â€˜Å Ã§Å Â¶Ã¦â‚¬ÂÃ¦â€”Â¶Ã¥Å’â€¦Ã¥ÂÂ«Ã¤Â»Â»Ã¥Å Â¡Ã¦Â â€¡Ã©Â¢ËœÃ¥â€™Å’ ID
* Ã¥Â¦â€šÃ¦Å¾Å“Ã¤Â»Â»Ã¥Å Â¡Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’Ã¥Å“Â¨Ã©â€¡ÂÃ¨Â¯â€¢Ã¥â€°ÂÃ¥â€¦Ë†Ã¨Â¯Â»Ã¥Ââ€“Ã¥â€¦Â¶Ã¦Å Â¥Ã¥â€˜Å Ã¤Â»Â¥Ã¤Âºâ€ Ã¨Â§Â£Ã©â€â„¢Ã¨Â¯Â¯
* Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¥Â¹Â¶Ã¥Ââ€˜Ã¦â€¢Â°Ã¦ËœÂ¯Ã¥ÂÂ¯Ã©â€¦ÂÃ§Â½Â®Ã§Å¡â€žÃ¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼Å¡3Ã¯Â¼â€°Ã£â‚¬â€šÃ¨Â¶â€¦Ã©Â¢ÂÃ§Å¡â€žÃ¤Â»Â»Ã¥Å Â¡Ã¤Â¼Å¡Ã¦Å½â€™Ã©ËœÅ¸Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Å“Â¨Ã¦Å“â€°Ã§Â©ÂºÃ©â€”Â²Ã¦Â§Â½Ã¤Â½ÂÃ¦â€”Â¶Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â´Â¾Ã¥Ââ€˜Ã£â‚¬â€šÃ¦Â£â‚¬Ã¦Å¸Â¥ `get_dashboard()` Ã¤Â»Â¥Ã¤Âºâ€ Ã¨Â§Â£Ã¦Â§Â½Ã¤Â½ÂÃ¥ÂÂ¯Ã§â€Â¨Ã¦â‚¬Â§Ã£â‚¬â€š
* Ã¤Â¾ÂÃ¨Âµâ€“Ã¥â€¦Â³Ã§Â³Â»Ã¥Â½Â¢Ã¦Ë†ÂÃ¤Â¸â‚¬Ã¤Â¸Âª DAG Ã¢â‚¬â€ Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Â¾ÂªÃ§Å½Â¯Ã¤Â¾ÂÃ¨Âµâ€“
* Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¥Å“Â¨Ã¥Â®Å’Ã¦Ë†ÂÃ¦â€”Â¶Ã¨â€¡ÂªÃ¥Å Â¨Ã¥ÂË†Ã¥Â¹Â¶Ã¥â€¦Â¶ worktreeÃ£â‚¬â€šÃ¥Â¦â€šÃ¦Å¾Å“Ã¥Ââ€˜Ã§â€Å¸Ã¥ÂË†Ã¥Â¹Â¶Ã¥â€ Â²Ã§ÂªÂÃ¯Â¼Å’Ã¦â€ºÂ´Ã¦â€Â¹Ã¥Â°â€ Ã¤Â¿ÂÃ§â€¢â„¢Ã¥Å“Â¨ worktree Ã¥Ë†â€ Ã¦â€Â¯Ã¤Â¸Å Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¾â€ºÃ¦â€°â€¹Ã¥Å Â¨Ã¨Â§Â£Ã¥â€ Â³Ã£â‚¬â€š
