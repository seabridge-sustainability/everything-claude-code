# Checkpoint Ã¦Å’â€¡Ã¤Â»Â¤

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


Ã¥Å“Â¨Ã¦â€šÂ¨Ã§Å¡â€žÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¤Â¸Â­Ã¥Â»ÂºÃ§Â«â€¹Ã¦Ë†â€“Ã©Â©â€”Ã¨Â­â€°Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â

`/checkpoint [create|verify|list] [name]`

## Ã¥Â»ÂºÃ§Â«â€¹Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾

Ã¥Â»ÂºÃ§Â«â€¹Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¦â„¢â€šÃ¯Â¼Å¡

1. Ã¥Å¸Â·Ã¨Â¡Å’ `/verify quick` Ã§Â¢ÂºÃ¤Â¿ÂÃ§â€ºÂ®Ã¥â€°ÂÃ§â€¹â‚¬Ã¦â€¦â€¹Ã¦ËœÂ¯Ã¤Â¹Â¾Ã¦Â·Â¨Ã§Å¡â€ž
2. Ã¤Â½Â¿Ã§â€Â¨Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¥ÂÂÃ§Â¨Â±Ã¥Â»ÂºÃ§Â«â€¹ git stash Ã¦Ë†â€“ commit
3. Ã¥Â°â€¡Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¨Â¨ËœÃ©Å’â€žÃ¥Ë†Â° `.claude/checkpoints.log`Ã¯Â¼Å¡

```bash
echo "$(date +%Y-%m-%d-%H:%M) | $CHECKPOINT_NAME | $(git rev-parse --short HEAD)" >> .claude/checkpoints.log
```

4. Ã¥Â Â±Ã¥â€˜Å Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¥Â·Â²Ã¥Â»ÂºÃ§Â«â€¹

## Ã©Â©â€”Ã¨Â­â€°Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾

Ã©â€¡ÂÃ¥Â°ÂÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã©â‚¬Â²Ã¨Â¡Å’Ã©Â©â€”Ã¨Â­â€°Ã¦â„¢â€šÃ¯Â¼Å¡

1. Ã¥Â¾Å¾Ã¦â€”Â¥Ã¨ÂªÅ’Ã¨Â®â‚¬Ã¥Ââ€“Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾
2. Ã¦Â¯â€Ã¨Â¼Æ’Ã§â€ºÂ®Ã¥â€°ÂÃ§â€¹â‚¬Ã¦â€¦â€¹Ã¨Ë†â€¡Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¯Â¼Å¡
   - Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¥Â¾Å’Ã¦â€“Â°Ã¥Â¢Å¾Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†
   - Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¥Â¾Å’Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†
   - Ã§ÂÂ¾Ã¥Å“Â¨ vs Ã§â€¢Â¶Ã¦â„¢â€šÃ§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½Ã§Å½â€¡
   - Ã§ÂÂ¾Ã¥Å“Â¨ vs Ã§â€¢Â¶Ã¦â„¢â€šÃ§Å¡â€žÃ¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡

3. Ã¥Â Â±Ã¥â€˜Å Ã¯Â¼Å¡
```
Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¦Â¯â€Ã¨Â¼Æ’Ã¯Â¼Å¡$NAME
============================
Ã¨Â®Å Ã¦â€ºÂ´Ã¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å¡X
Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Å¡+Y Ã©â‚¬Å¡Ã©ÂÅ½ / -Z Ã¥Â¤Â±Ã¦â€¢â€”
Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¯Â¼Å¡+X% / -Y%
Ã¥Â»ÂºÃ§Â½Â®Ã¯Â¼Å¡[Ã©â‚¬Å¡Ã©ÂÅ½/Ã¥Â¤Â±Ã¦â€¢â€”]
```

## Ã¥Ë†â€”Ã¥â€¡ÂºÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾

Ã©Â¡Â¯Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡
- Ã¥ÂÂÃ§Â¨Â±
- Ã¦â„¢â€šÃ©â€“â€œÃ¦Ë†Â³
- Git SHA
- Ã§â€¹â‚¬Ã¦â€¦â€¹Ã¯Â¼Ë†Ã§â€ºÂ®Ã¥â€°ÂÃ£â‚¬ÂÃ¨ÂÂ½Ã¥Â¾Å’Ã£â‚¬ÂÃ©Â ËœÃ¥â€¦Ë†Ã¯Â¼â€°

## Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

Ã¥â€¦Â¸Ã¥Å¾â€¹Ã§Å¡â€žÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å¡

```
[Ã©â€“â€¹Ã¥Â§â€¹] --> /checkpoint create "feature-start"
   |
[Ã¥Â¯Â¦Ã¤Â½Å“] --> /checkpoint create "core-done"
   |
[Ã¦Â¸Â¬Ã¨Â©Â¦] --> /checkpoint verify "core-done"
   |
[Ã©â€¡ÂÃ¦Â§â€¹] --> /checkpoint create "refactor-done"
   |
[PR] --> /checkpoint verify "feature-start"
```

## Ã¥ÂÆ’Ã¦â€¢Â¸

$ARGUMENTS:
- `create <name>` - Ã¥Â»ÂºÃ§Â«â€¹Ã¥â€˜Â½Ã¥ÂÂÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾
- `verify <name>` - Ã©â€¡ÂÃ¥Â°ÂÃ¥â€˜Â½Ã¥ÂÂÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã©Â©â€”Ã¨Â­â€°
- `list` - Ã©Â¡Â¯Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾
- `clear` - Ã§Â§Â»Ã©â„¢Â¤Ã¨Ë†Å Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã©Â»Å¾Ã¯Â¼Ë†Ã¤Â¿ÂÃ§â€¢â„¢Ã¦Å“â‚¬Ã¥Â¾Å’ 5 Ã¥â‚¬â€¹Ã¯Â¼â€°
