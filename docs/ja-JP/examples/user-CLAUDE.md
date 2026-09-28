# Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£Æ’Â¬Ã£Æ’â„¢Ã£Æ’Â« CLAUDE.md Ã£ÂÂ®Ã¤Â¾â€¹

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


Ã£Ââ€œÃ£â€šÅ’Ã£ÂÂ¯Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£Æ’Â¬Ã£Æ’â„¢Ã£Æ’Â« CLAUDE.md Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ®Ã¤Â¾â€¹Ã£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€š`~/.claude/CLAUDE.md` Ã£ÂÂ«Ã©â€¦ÂÃ§Â½Â®Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š

Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£Æ’Â¬Ã£Æ’â„¢Ã£Æ’Â«Ã£ÂÂ®Ã¨Â¨Â­Ã¥Â®Å¡Ã£ÂÂ¯Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ«Ã¥â€¦Â¨Ã¤Â½â€œÃ§Å¡â€žÃ£ÂÂ«Ã©ÂÂ©Ã§â€Â¨Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ¤Â»Â¥Ã¤Â¸â€¹Ã£ÂÂ®Ã§â€Â¨Ã©â‚¬â€Ã£ÂÂ«Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:
- Ã¥â‚¬â€¹Ã¤ÂºÂºÃ£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ°Ã¨Â¨Â­Ã¥Â®Å¡
- Ã¥Â¸Â¸Ã£ÂÂ«Ã©ÂÂ©Ã§â€Â¨Ã£Ââ€”Ã£ÂÅ¸Ã£Ââ€žÃ£Æ’Â¦Ã£Æ’â€¹Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂµÃ£Æ’Â«Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’Â«
- Ã£Æ’Â¢Ã£â€šÂ¸Ã£Æ’Â¥Ã£Æ’Â¼Ã£Æ’Â«Ã¥Å’â€“Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’Â«Ã£ÂÂ¸Ã£ÂÂ®Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ¯

---

## Ã£â€šÂ³Ã£â€šÂ¢Ã¥â€œÂ²Ã¥Â­Â¦

Ã£Ââ€šÃ£ÂÂªÃ£ÂÅ¸Ã£ÂÂ¯Claude CodeÃ£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€šÃ§Â§ÂÃ£ÂÂ¯Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£ÂÂªÃ£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ¯Ã£ÂÂ«Ã§â€°Â¹Ã¥Å’â€“Ã£Ââ€”Ã£ÂÅ¸Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ¨Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â«Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

**Ã¤Â¸Â»Ã¨Â¦ÂÃ¥Å½Å¸Ã¥â€°â€¡:**
1. **Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã¥â€žÂªÃ¥â€¦Ë†**: Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£ÂÂªÃ¤Â½Å“Ã¦Â¥Â­Ã£ÂÂ¯Ã¥Â°â€šÃ©â€“â‚¬Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã¥Â§â€Ã¨Â­Â²Ã£Ââ„¢Ã£â€šâ€¹
2. **Ã¤Â¸Â¦Ã¥Ë†â€”Ã¥Â®Å¸Ã¨Â¡Å’**: Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ©â„¢ÂÃ£â€šÅ Ã¨Â¤â€¡Ã¦â€¢Â°Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ§TaskÃ£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹
3. **Ã¨Â¨Ë†Ã§â€Â»Ã£Ââ€”Ã£ÂÂ¦Ã£Ââ€¹Ã£â€šâ€°Ã¥Â®Å¸Ã¨Â¡Å’**: Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£ÂÂªÃ¦â€œÂÃ¤Â½Å“Ã£ÂÂ«Ã£ÂÂ¯Plan ModeÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹
4. **Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢**: Ã¥Â®Å¸Ã¨Â£â€¦Ã¥â€°ÂÃ£ÂÂ«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂ
5. **Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¥â€žÂªÃ¥â€¦Ë†**: Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£ÂÂ«Ã¥Â¦Â¥Ã¥Ââ€Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž

---

## Ã£Æ’Â¢Ã£â€šÂ¸Ã£Æ’Â¥Ã£Æ’Â¼Ã£Æ’Â«Ã¥Å’â€“Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’Â«

Ã¨Â©Â³Ã§Â´Â°Ã£ÂÂªÃ£â€šÂ¬Ã£â€šÂ¤Ã£Æ’â€°Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Â³Ã£ÂÂ¯ `~/.claude/rules/` Ã£ÂÂ«Ã£Ââ€šÃ£â€šÅ Ã£ÂÂ¾Ã£Ââ„¢:

| Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â« | Ã¥â€ â€¦Ã¥Â®Â¹ |
|-----------|----------|
| security.md | Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£â‚¬ÂÃ¦Â©Å¸Ã¥Â¯â€ Ã¦Æ’â€¦Ã¥Â Â±Ã§Â®Â¡Ã§Ââ€  |
| coding-style.md | Ã¤Â¸ÂÃ¥Â¤â€°Ã¦â‚¬Â§Ã£â‚¬ÂÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¦Â§â€¹Ã¦Ë†ÂÃ£â‚¬ÂÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ° |
| testing.md | TDDÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£â‚¬Â80%Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã¨Â¦ÂÃ¤Â»Â¶ |
| git-workflow.md | Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã¥Â½Â¢Ã¥Â¼ÂÃ£â‚¬ÂPRÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼ |
| agents.md | Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šÂªÃ£Æ’Â¼Ã£â€šÂ±Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â‚¬ÂÃ£ÂÂ©Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã£Ââ€žÃ£ÂÂ¤Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€¹ |
| patterns.md | APIÃ£Æ’Â¬Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â³Ã£â€šÂ¹Ã£â‚¬ÂÃ£Æ’ÂªÃ£Æ’ÂÃ£â€šÂ¸Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³ |
| performance.md | Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã©ÂÂ¸Ã¦Å Å¾Ã£â‚¬ÂÃ£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã§Â®Â¡Ã§Ââ€  |
| hooks.md | Ã£Æ’â€¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ·Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â  |

---

## Ã¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†

`~/.claude/agents/` Ã£ÂÂ«Ã©â€¦ÂÃ§Â½Â®:

| Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë† | Ã§â€ºÂ®Ã§Å¡â€ž |
|-------|---------|
| planner | Ã¦Â©Å¸Ã¨Æ’Â½Ã¥Â®Å¸Ã¨Â£â€¦Ã£ÂÂ®Ã¨Â¨Ë†Ã§â€Â» |
| architect | Ã£â€šÂ·Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â Ã¨Â¨Â­Ã¨Â¨Ë†Ã£ÂÂ¨Ã£â€šÂ¢Ã£Æ’Â¼Ã£â€šÂ­Ã£Æ’â€ Ã£â€šÂ¯Ã£Æ’ÂÃ£Æ’Â£ |
| tdd-guide | Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Âº |
| code-reviewer | Ã¥â€œÂÃ¨Â³Âª/Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼ |
| security-reviewer | Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¨â€žâ€ Ã¥Â¼Â±Ã¦â‚¬Â§Ã¥Ë†â€ Ã¦Å¾Â |
| build-error-resolver | Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ®Ã¨Â§Â£Ã¦Â±Âº |
| e2e-runner | Playwright E2EÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë† |
| refactor-cleaner | Ã£Æ’â€¡Ã£Æ’Æ’Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ®Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€” |
| doc-updater | Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ®Ã¦â€ºÂ´Ã¦â€“Â° |

---

## Ã¥â‚¬â€¹Ã¤ÂºÂºÃ¨Â¨Â­Ã¥Â®Å¡

### Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’ÂÃ£â€šÂ·Ã£Æ’Â¼
- Ã¥Â¸Â¸Ã£ÂÂ«Ã£Æ’Â­Ã£â€šÂ°Ã£â€šâ€™Ã§Â·Â¨Ã©â€ºâ€ Ã£Ââ„¢Ã£â€šâ€¹; Ã¦Â©Å¸Ã¥Â¯â€ Ã¦Æ’â€¦Ã¥Â Â±(APIÃ£â€šÂ­Ã£Æ’Â¼/Ã£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³/Ã£Æ’â€˜Ã£â€šÂ¹Ã£Æ’Â¯Ã£Æ’Â¼Ã£Æ’â€°/JWT)Ã£â€šâ€™Ã¨Â²Â¼Ã£â€šÅ Ã¤Â»ËœÃ£Ââ€˜Ã£ÂÂªÃ£Ââ€ž
- Ã¥â€¦Â±Ã¦Å“â€°Ã¥â€°ÂÃ£ÂÂ«Ã¥â€¡ÂºÃ¥Å â€ºÃ£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£Ââ„¢Ã£â€šâ€¹ - Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã¦Â©Å¸Ã¥Â¯â€ Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤

### Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ¹Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â«
- Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â‚¬ÂÃ£â€šÂ³Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â‚¬ÂÃ£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã§ÂµÂµÃ¦â€“â€¡Ã¥Â­â€”Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- Ã¤Â¸ÂÃ¥Â¤â€°Ã¦â‚¬Â§Ã£â€šâ€™Ã¥â€žÂªÃ¥â€¦Ë† - Ã£â€šÂªÃ£Æ’â€“Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€žÃ©â€¦ÂÃ¥Ë†â€”Ã£â€šâ€™Ã¦Â±ÂºÃ£Ââ€”Ã£ÂÂ¦Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- Ã¥Â°â€˜Ã¦â€¢Â°Ã£ÂÂ®Ã¥Â¤Â§Ã£ÂÂÃ£ÂÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šË†Ã£â€šÅ Ã£â€šâ€šÃ¥Â¤Å¡Ã¦â€¢Â°Ã£ÂÂ®Ã¥Â°ÂÃ£Ââ€¢Ã£ÂÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«
- Ã©â‚¬Å¡Ã¥Â¸Â¸200-400Ã¨Â¡Å’Ã£â‚¬ÂÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£Ââ€Ã£ÂÂ¨Ã£ÂÂ«Ã¦Å“â‚¬Ã¥Â¤Â§800Ã¨Â¡Å’

### Git
- Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`
- Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã¥â€°ÂÃ£ÂÂ«Ã¥Â¸Â¸Ã£ÂÂ«Ã£Æ’Â­Ã£Æ’Â¼Ã£â€šÂ«Ã£Æ’Â«Ã£ÂÂ§Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
- Ã¥Â°ÂÃ£Ââ€¢Ã£ÂÂÃ§â€žÂ¦Ã§â€šÂ¹Ã£â€šâ€™Ã§ÂµÅ¾Ã£ÂÂ£Ã£ÂÅ¸Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
- TDD: Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂ
- Ã¦Å“â‚¬Ã¤Â½Å½80%Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸
- Ã©â€¡ÂÃ¨Â¦ÂÃ£ÂÂªÃ£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£ÂÂ«Ã£ÂÂ¯Ã£Æ’Â¦Ã£Æ’â€¹Ã£Æ’Æ’Ã£Æ’Ë† + Ã§ÂµÂ±Ã¥ÂË† + E2EÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### ナレッジキャプチャ
- 個人的なデバッグノート、設定、一時的なコンテキスト → 自動メモリ
- チーム/プロジェクトのナレッジ（アーキテクチャ決定、API変更、実装ランブック）→ プロジェクトの既存のドキュメント構造に従う
- 現在のタスクがすでに関連するドキュメント、コメント、または例を生成している場合は、同じナレッジを他の場所に重複させない
- 明確なプロジェクトドキュメントの場所がない場合は、新しいトップレベルドキュメントを作成する前に確認する

---

## Ã£â€šÂ¨Ã£Æ’â€¡Ã£â€šÂ£Ã£â€šÂ¿Ã§ÂµÂ±Ã¥ÂË†

Ã¤Â¸Â»Ã¨Â¦ÂÃ£â€šÂ¨Ã£Æ’â€¡Ã£â€šÂ£Ã£â€šÂ¿Ã£ÂÂ¨Ã£Ââ€”Ã£ÂÂ¦ZedÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨:
- Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¨Â¿Â½Ã¨Â·Â¡Ã§â€Â¨Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£Æ’â€˜Ã£Æ’ÂÃ£Æ’Â«
- Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’â€˜Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã§â€Â¨Ã£ÂÂ®CMD+Shift+R
- VimÃ£Æ’Â¢Ã£Æ’Â¼Ã£Æ’â€°Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“

---

## Ã¦Ë†ÂÃ¥Å Å¸Ã¦Å’â€¡Ã¦Â¨â„¢

Ã¤Â»Â¥Ã¤Â¸â€¹Ã£ÂÂ®Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ«Ã¦Ë†ÂÃ¥Å Å¸Ã£ÂÂ§Ã£Ââ„¢:
- Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã¥ÂË†Ã¦Â Â¼ (80%Ã¤Â»Â¥Ã¤Â¸Å Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸)
- Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¨â€žâ€ Ã¥Â¼Â±Ã¦â‚¬Â§Ã£ÂÂªÃ£Ââ€”
- Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÅ’Ã¨ÂªÂ­Ã£ÂÂ¿Ã£â€šâ€žÃ£Ââ„¢Ã£ÂÂÃ¤Â¿ÂÃ¥Â®Ë†Ã¥ÂÂ¯Ã¨Æ’Â½
- Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¨Â¦ÂÃ¤Â»Â¶Ã£â€šâ€™Ã¦Âºâ‚¬Ã£ÂÅ¸Ã£Ââ€”Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹

---

**Ã¥â€œÂ²Ã¥Â­Â¦**: Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã¥â€žÂªÃ¥â€¦Ë†Ã¨Â¨Â­Ã¨Â¨Ë†Ã£â‚¬ÂÃ¤Â¸Â¦Ã¥Ë†â€”Ã¥Â®Å¸Ã¨Â¡Å’Ã£â‚¬ÂÃ¨Â¡Å’Ã¥â€¹â€¢Ã¥â€°ÂÃ£ÂÂ«Ã¨Â¨Ë†Ã§â€Â»Ã£â‚¬ÂÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥â€°ÂÃ£ÂÂ«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬ÂÃ¥Â¸Â¸Ã£ÂÂ«Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â‚¬â€š
