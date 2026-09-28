# /learn - Ã¦ÂÂÃ¥Ââ€“Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã¦Â¨Â¡Ã¥Â¼Â

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


Ã¥Ë†â€ Ã¦Å¾ÂÃ¥Â½â€œÃ¥â€°ÂÃ¤Â¼Å¡Ã¨Â¯ÂÃ¯Â¼Å’Ã¦ÂÂÃ¥Ââ€“Ã¥â‚¬Â¼Ã¥Â¾â€”Ã¤Â¿ÂÃ¥Â­ËœÃ¤Â¸ÂºÃ¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ¤Â»Â»Ã¤Â½â€¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š

## Ã¨Â§Â¦Ã¥Ââ€˜Ã¦â€”Â¶Ã¦Å“Âº

Ã¥Å“Â¨Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦Å“Å¸Ã©â€”Â´Ã§Å¡â€žÃ¤Â»Â»Ã¤Â½â€¢Ã¦â€”Â¶Ã¥Ë†Â»Ã¯Â¼Å’Ã¥Â½â€œÃ¤Â½Â Ã¨Â§Â£Ã¥â€ Â³Ã¤Âºâ€ Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ©ÂÅ¾Ã¥Â¹Â³Ã¥â€¡Â¡Ã©â€”Â®Ã©Â¢ËœÃ¦â€”Â¶Ã¯Â¼Å’Ã¨Â¿ÂÃ¨Â¡Å’ `/learn`Ã£â‚¬â€š

## Ã¦ÂÂÃ¥Ââ€“Ã¥â€ â€¦Ã¥Â®Â¹

Ã¥Â¯Â»Ã¦â€°Â¾Ã¯Â¼Å¡

1. **Ã©â€â„¢Ã¨Â¯Â¯Ã¨Â§Â£Ã¥â€ Â³Ã¦Â¨Â¡Ã¥Â¼Â**
   * Ã¥â€¡ÂºÃ§Å½Â°Ã¤Âºâ€ Ã¤Â»â‚¬Ã¤Â¹Ë†Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¸
   * Ã¦Â Â¹Ã¦Å“Â¬Ã¥Å½Å¸Ã¥â€ºÂ Ã¦ËœÂ¯Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¯Â¼Å¸
   * Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¦â€“Â¹Ã¦Â³â€¢Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Âºâ€ Ã¥Â®Æ’Ã¯Â¼Å¸
   * Ã¨Â¿â„¢Ã¥Â¯Â¹Ã¨Â§Â£Ã¥â€ Â³Ã§Â±Â»Ã¤Â¼Â¼Ã©â€â„¢Ã¨Â¯Â¯Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã¯Â¼Å¸

2. **Ã¨Â°Æ’Ã¨Â¯â€¢Ã¦Å â‚¬Ã¦Å“Â¯**
   * Ã¤Â¸ÂÃ¦ËœÅ½Ã¦ËœÂ¾Ã§Å¡â€žÃ¨Â°Æ’Ã¨Â¯â€¢Ã¦Â­Â¥Ã©ÂªÂ¤
   * Ã¦Å“â€°Ã¦â€¢Ë†Ã§Å¡â€žÃ¥Â·Â¥Ã¥â€¦Â·Ã§Â»â€žÃ¥ÂË†
   * Ã¨Â¯Å Ã¦â€“Â­Ã¦Â¨Â¡Ã¥Â¼Â

3. **Ã¥ÂËœÃ©â‚¬Å¡Ã¦â€“Â¹Ã¦Â³â€¢**
   * Ã¥Âºâ€œÃ§Å¡â€žÃ¦â‚¬ÂªÃ§â„¢â€“
   * API Ã©â„¢ÂÃ¥Ë†Â¶
   * Ã§â€°Â¹Ã¥Â®Å¡Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¤Â

4. **Ã©Â¡Â¹Ã§â€ºÂ®Ã§â€°Â¹Ã¥Â®Å¡Ã¦Â¨Â¡Ã¥Â¼Â**
   * Ã¥Ââ€˜Ã§Å½Â°Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ§ÂºÂ¦Ã¥Â®Å¡
   * Ã¥ÂÅ¡Ã¥â€¡ÂºÃ§Å¡â€žÃ¦Å¾Â¶Ã¦Å¾â€žÃ¥â€ Â³Ã§Â­â€“
   * Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Â¨Â¡Ã¥Â¼Â

## Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼Â

Ã¥Å“Â¨ `~/.claude/skills/learned/[pattern-name].md` Ã¥Ë†â€ºÃ¥Â»ÂºÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Å â‚¬Ã¨Æ’Â½Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡

```markdown
# [Descriptive Pattern Name]

**Extracted:** [Date]
**Context:** [Brief description of when this applies]

## Problem
[What problem this solves - be specific]

## Solution
[The pattern/technique/workaround]

## Example
[Code example if applicable]

## When to Use
[Trigger conditions - what should activate this skill]
```

## Ã¦ÂµÂÃ§Â¨â€¹

1. Ã¥â€ºÅ¾Ã©Â¡Â¾Ã¤Â¼Å¡Ã¨Â¯ÂÃ¯Â¼Å’Ã¥Â¯Â»Ã¦â€°Â¾Ã¥ÂÂ¯Ã¦ÂÂÃ¥Ââ€“Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
2. Ã¨Â¯â€ Ã¥Ë†Â«Ã¦Å“â‚¬Ã¦Å“â€°Ã¤Â»Â·Ã¥â‚¬Â¼/Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã§Å¡â€žÃ¨Â§ÂÃ¨Â§Â£
3. Ã¨ÂµÂ·Ã¨Ââ€°Ã¦Å â‚¬Ã¨Æ’Â½Ã¦â€“â€¡Ã¤Â»Â¶
4. Ã¥Å“Â¨Ã¤Â¿ÂÃ¥Â­ËœÃ¥â€°ÂÃ¨Â¯Â·Ã§â€Â¨Ã¦Ë†Â·Ã§Â¡Â®Ã¨Â®Â¤
5. Ã¤Â¿ÂÃ¥Â­ËœÃ¥Ë†Â° `~/.claude/skills/learned/`

## Ã¦Â³Â¨Ã¦â€žÂÃ¤Âºâ€¹Ã©Â¡Â¹

* Ã¤Â¸ÂÃ¨Â¦ÂÃ¦ÂÂÃ¥Ââ€“Ã§ÂÂÃ§Â¢Å½Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Ë†Ã¦â€¹Â¼Ã¥â€ â„¢Ã©â€â„¢Ã¨Â¯Â¯Ã£â‚¬ÂÃ§Â®â‚¬Ã¥Ââ€¢Ã§Å¡â€žÃ¨Â¯Â­Ã¦Â³â€¢Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼â€°
* Ã¤Â¸ÂÃ¨Â¦ÂÃ¦ÂÂÃ¥Ââ€“Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¦â‚¬Â§Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€ž API Ã¤Â¸Â­Ã¦â€“Â­Ã§Â­â€°Ã¯Â¼â€°
* Ã¤Â¸â€œÃ¦Â³Â¨Ã¤ÂºÅ½Ã©â€šÂ£Ã¤Âºâ€ºÃ¥Â°â€ Ã¥Å“Â¨Ã¦Å“ÂªÃ¦ÂÂ¥Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¸Â­Ã¨Å â€šÃ§Å“ÂÃ¦â€”Â¶Ã©â€”Â´Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
* Ã¤Â¿ÂÃ¦Å’ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ¤Â¸â€œÃ¦Â³Â¨Ã¦â‚¬Â§ - Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Å â‚¬Ã¨Æ’Â½Ã¥Â¯Â¹Ã¥Âºâ€Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Â¨Â¡Ã¥Â¼Â
