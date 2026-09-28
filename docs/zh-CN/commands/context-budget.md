---
description: Ã¥Ë†â€ Ã¦Å¾ÂÃ¨Â·Â¨Ã¤Â»Â£Ã§Ââ€ Ã£â‚¬ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã£â‚¬ÂMCPÃ¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã¥â€™Å’Ã¨Â§â€žÃ¥Ë†â„¢Ã§Å¡â€žÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Âªâ€”Ã¥ÂÂ£Ã¤Â½Â¿Ã§â€Â¨Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Å’Ã¤Â»Â¥Ã¥Â¯Â»Ã¦â€°Â¾Ã¤Â¼ËœÃ¥Å’â€“Ã¦Å“ÂºÃ¤Â¼Å¡Ã£â‚¬â€šÃ¦Å“â€°Ã¥Å Â©Ã¤ÂºÅ½Ã¥â€¡ÂÃ¥Â°â€˜Ã¤Â»Â¤Ã§â€°Å’Ã¥Â¼â‚¬Ã©â€â‚¬Ã¥Â¹Â¶Ã©ÂÂ¿Ã¥â€¦ÂÃ¦â‚¬Â§Ã¨Æ’Â½Ã¨Â­Â¦Ã¥â€˜Å Ã£â‚¬â€š
---

# Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã©Â¢â€žÃ§Â®â€”Ã¤Â¼ËœÃ¥Å’â€“Ã¥â„¢Â¨

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


Ã¥Ë†â€ Ã¦Å¾ÂÃ¦â€šÂ¨Ã§Å¡â€ž Claude Code Ã¨Â®Â¾Ã§Â½Â®Ã¤Â¸Â­Ã§Å¡â€žÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Âªâ€”Ã¥ÂÂ£Ã¦Â¶Ë†Ã¨â‚¬â€”Ã¯Â¼Å’Ã¥Â¹Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¥ÂÂ¯Ã¦â€œÂÃ¤Â½Å“Ã§Å¡â€žÃ¥Â»ÂºÃ¨Â®Â®Ã¤Â»Â¥Ã¥â€¡ÂÃ¥Â°â€˜Ã¤Â»Â¤Ã§â€°Å’Ã¥Â¼â‚¬Ã©â€â‚¬Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢

```
/context-budget [--verbose]
```

* Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼Å¡Ã¦ÂÂÃ¤Â¾â€ºÃ¦â€˜ËœÃ¨Â¦ÂÃ¥ÂÅ Ã¤Â¸Â»Ã¨Â¦ÂÃ¥Â»ÂºÃ¨Â®Â®
* `--verbose`Ã¯Â¼Å¡Ã¦Å’â€°Ã§Â»â€žÃ¤Â»Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¥Â®Å’Ã¦â€¢Â´Ã§Â»â€ Ã¥Ë†â€ 

$ARGUMENTS

## Ã¦â€œÂÃ¤Â½Å“Ã¦Â­Â¥Ã©ÂªÂ¤

Ã¨Â¿ÂÃ¨Â¡Å’ **context-budget** Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Ë†`skills/context-budget/SKILL.md`Ã¯Â¼â€°Ã¯Â¼Å’Ã¥Â¹Â¶Ã¨Â¾â€œÃ¥â€¦Â¥Ã¤Â»Â¥Ã¤Â¸â€¹Ã¥â€ â€¦Ã¥Â®Â¹Ã¯Â¼Å¡

1. Ã¥Â¦â€šÃ¦Å¾Å“ `$ARGUMENTS` Ã¤Â¸Â­Ã¥Â­ËœÃ¥Å“Â¨ `--verbose` Ã¦Â â€¡Ã¥Â¿â€”Ã¯Â¼Å’Ã¥Ë†â„¢Ã¤Â¼Â Ã©â‚¬â€™Ã¨Â¯Â¥Ã¦Â â€¡Ã¥Â¿â€”
2. Ã©â„¢Â¤Ã©ÂÅ¾Ã§â€Â¨Ã¦Ë†Â·Ã¥ÂÂ¦Ã¨Â¡Å’Ã¦Å’â€¡Ã¥Â®Å¡Ã¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã¥Ââ€¡Ã¨Â®Â¾Ã¤Â¸Âº 200K Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Âªâ€”Ã¥ÂÂ£Ã¯Â¼Ë†Claude Sonnet Ã©Â»ËœÃ¨Â®Â¤Ã¥â‚¬Â¼Ã¯Â¼â€°
3. Ã©ÂÂµÃ¥Â¾ÂªÃ¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ¥â€ºâ€ºÃ¤Â¸ÂªÃ©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼Å¡Ã¦Â¸â€¦Ã¥Ââ€¢ Ã¢â€ â€™ Ã¥Ë†â€ Ã§Â±Â» Ã¢â€ â€™ Ã¦Â£â‚¬Ã¦Âµâ€¹Ã©â€”Â®Ã©Â¢Ëœ Ã¢â€ â€™ Ã¦Å Â¥Ã¥â€˜Å 
4. Ã¥Ââ€˜Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã§Å¡â€žÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã©Â¢â€žÃ§Â®â€”Ã¦Å Â¥Ã¥â€˜Å 

Ã¨Â¯Â¥Ã¦Å â‚¬Ã¨Æ’Â½Ã¨Â´Å¸Ã¨Â´Â£Ã¦â€°â‚¬Ã¦Å“â€°Ã¦â€°Â«Ã¦ÂÂÃ©â‚¬Â»Ã¨Â¾â€˜Ã£â‚¬ÂÃ¤Â»Â¤Ã§â€°Å’Ã¤Â¼Â°Ã§Â®â€”Ã£â‚¬ÂÃ©â€”Â®Ã©Â¢ËœÃ¦Â£â‚¬Ã¦Âµâ€¹Ã¥â€™Å’Ã¦Å Â¥Ã¥â€˜Å Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã£â‚¬â€š
