# Eval Ã¦Å’â€¡Ã¤Â»Â¤

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


Ã§Â®Â¡Ã§Ââ€ Ã¨Â©â€¢Ã¤Â¼Â°Ã©Â©â€¦Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Â¼Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â

`/eval [define|check|report|list] [feature-name]`

## Ã¥Â®Å¡Ã§Â¾Â© Evals

`/eval define feature-name`

Ã¥Â»ÂºÃ§Â«â€¹Ã¦â€“Â°Ã§Å¡â€ž eval Ã¥Â®Å¡Ã§Â¾Â©Ã¯Â¼Å¡

1. Ã¤Â½Â¿Ã§â€Â¨Ã§Â¯â€žÃ¦Å“Â¬Ã¥Â»ÂºÃ§Â«â€¹ `.claude/evals/feature-name.md`Ã¯Â¼Å¡

```markdown
## EVAL: feature-name
Ã¥Â»ÂºÃ§Â«â€¹Ã¦â€”Â¥Ã¦Å“Å¸Ã¯Â¼Å¡$(date)

### Ã¨Æ’Â½Ã¥Å â€º Evals
- [ ] [Ã¨Æ’Â½Ã¥Å â€º 1 Ã§Å¡â€žÃ¦ÂÂÃ¨Â¿Â°]
- [ ] [Ã¨Æ’Â½Ã¥Å â€º 2 Ã§Å¡â€žÃ¦ÂÂÃ¨Â¿Â°]

### Ã¥â€ºÅ¾Ã¦Â­Â¸ Evals
- [ ] [Ã§ÂÂ¾Ã¦Å“â€°Ã¨Â¡Å’Ã§â€šÂº 1 Ã¤Â»ÂÃ§â€žÂ¶Ã¦Å“â€°Ã¦â€¢Ë†]
- [ ] [Ã§ÂÂ¾Ã¦Å“â€°Ã¨Â¡Å’Ã§â€šÂº 2 Ã¤Â»ÂÃ§â€žÂ¶Ã¦Å“â€°Ã¦â€¢Ë†]

### Ã¦Ë†ÂÃ¥Å Å¸Ã¦Â¨â„¢Ã¦Âºâ€“
- Ã¨Æ’Â½Ã¥Å â€º evals Ã§Å¡â€ž pass@3 > 90%
- Ã¥â€ºÅ¾Ã¦Â­Â¸ evals Ã§Å¡â€ž pass^3 = 100%
```

2. Ã¦ÂÂÃ§Â¤ÂºÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¥Â¡Â«Ã¥â€¦Â¥Ã¥â€¦Â·Ã©Â«â€Ã¦Â¨â„¢Ã¦Âºâ€“

## Ã¦ÂªÂ¢Ã¦Å¸Â¥ Evals

`/eval check feature-name`

Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Å Å¸Ã¨Æ’Â½Ã§Å¡â€ž evalsÃ¯Â¼Å¡

1. Ã¥Â¾Å¾ `.claude/evals/feature-name.md` Ã¨Â®â‚¬Ã¥Ââ€“ eval Ã¥Â®Å¡Ã§Â¾Â©
2. Ã¥Â°ÂÃ¦Â¯ÂÃ¥â‚¬â€¹Ã¨Æ’Â½Ã¥Å â€º evalÃ¯Â¼Å¡
   - Ã¥Ëœâ€”Ã¨Â©Â¦Ã©Â©â€”Ã¨Â­â€°Ã¦Â¨â„¢Ã¦Âºâ€“
   - Ã¨Â¨ËœÃ©Å’â€žÃ©â‚¬Å¡Ã©ÂÅ½/Ã¥Â¤Â±Ã¦â€¢â€”
   - Ã¨Â¨ËœÃ©Å’â€žÃ¥Ëœâ€”Ã¨Â©Â¦Ã¥Ë†Â° `.claude/evals/feature-name.log`
3. Ã¥Â°ÂÃ¦Â¯ÂÃ¥â‚¬â€¹Ã¥â€ºÅ¾Ã¦Â­Â¸ evalÃ¯Â¼Å¡
   - Ã¥Å¸Â·Ã¨Â¡Å’Ã§â€ºÂ¸Ã©â€”Å“Ã¦Â¸Â¬Ã¨Â©Â¦
   - Ã¨Ë†â€¡Ã¥Å¸ÂºÃ¦Âºâ€“Ã¦Â¯â€Ã¨Â¼Æ’
   - Ã¨Â¨ËœÃ©Å’â€žÃ©â‚¬Å¡Ã©ÂÅ½/Ã¥Â¤Â±Ã¦â€¢â€”
4. Ã¥Â Â±Ã¥â€˜Å Ã§â€ºÂ®Ã¥â€°ÂÃ§â€¹â‚¬Ã¦â€¦â€¹Ã¯Â¼Å¡

```
EVAL Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¯Â¼Å¡feature-name
========================
Ã¨Æ’Â½Ã¥Å â€ºÃ¯Â¼Å¡X/Y Ã©â‚¬Å¡Ã©ÂÅ½
Ã¥â€ºÅ¾Ã¦Â­Â¸Ã¯Â¼Å¡X/Y Ã©â‚¬Å¡Ã©ÂÅ½
Ã§â€¹â‚¬Ã¦â€¦â€¹Ã¯Â¼Å¡Ã©â‚¬Â²Ã¨Â¡Å’Ã¤Â¸Â­ / Ã¥Â°Â±Ã§Â·â€™
```

## Ã¥Â Â±Ã¥â€˜Å  Evals

`/eval report feature-name`

Ã§â€Â¢Ã§â€Å¸Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž eval Ã¥Â Â±Ã¥â€˜Å Ã¯Â¼Å¡

```
EVAL Ã¥Â Â±Ã¥â€˜Å Ã¯Â¼Å¡feature-name
=========================
Ã§â€Â¢Ã§â€Å¸Ã¦â€”Â¥Ã¦Å“Å¸Ã¯Â¼Å¡$(date)

Ã¨Æ’Â½Ã¥Å â€º EVALS
----------------
[eval-1]Ã¯Â¼Å¡Ã©â‚¬Å¡Ã©ÂÅ½Ã¯Â¼Ë†pass@1Ã¯Â¼â€°
[eval-2]Ã¯Â¼Å¡Ã©â‚¬Å¡Ã©ÂÅ½Ã¯Â¼Ë†pass@2Ã¯Â¼â€°- Ã©Å“â‚¬Ã¨Â¦ÂÃ©â€¡ÂÃ¨Â©Â¦
[eval-3]Ã¯Â¼Å¡Ã¥Â¤Â±Ã¦â€¢â€” - Ã¥ÂÆ’Ã¨Â¦â€¹Ã¥â€šâ„¢Ã¨Â¨Â»

Ã¥â€ºÅ¾Ã¦Â­Â¸ EVALS
----------------
[test-1]Ã¯Â¼Å¡Ã©â‚¬Å¡Ã©ÂÅ½
[test-2]Ã¯Â¼Å¡Ã©â‚¬Å¡Ã©ÂÅ½
[test-3]Ã¯Â¼Å¡Ã©â‚¬Å¡Ã©ÂÅ½

Ã¦Å’â€¡Ã¦Â¨â„¢
-------
Ã¨Æ’Â½Ã¥Å â€º pass@1Ã¯Â¼Å¡67%
Ã¨Æ’Â½Ã¥Å â€º pass@3Ã¯Â¼Å¡100%
Ã¥â€ºÅ¾Ã¦Â­Â¸ pass^3Ã¯Â¼Å¡100%

Ã¥â€šâ„¢Ã¨Â¨Â»
-----
[Ã¤Â»Â»Ã¤Â½â€¢Ã¥â€¢ÂÃ©Â¡Å’Ã£â‚¬ÂÃ©â€šÅ Ã§â€¢Å’Ã¦Æ’â€¦Ã¦Â³ÂÃ¦Ë†â€“Ã¨Â§â‚¬Ã¥Â¯Å¸]

Ã¥Â»ÂºÃ¨Â­Â°
--------------
[Ã§â„¢Â¼Ã¥Â¸Æ’ / Ã©Å“â‚¬Ã¨Â¦ÂÃ¦â€Â¹Ã©â‚¬Â² / Ã©ËœÂ»Ã¦â€œâ€¹]
```

## Ã¥Ë†â€”Ã¥â€¡Âº Evals

`/eval list`

Ã©Â¡Â¯Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€° eval Ã¥Â®Å¡Ã§Â¾Â©Ã¯Â¼Å¡

```
EVAL Ã¥Â®Å¡Ã§Â¾Â©
================
feature-auth      [3/5 Ã©â‚¬Å¡Ã©ÂÅ½] Ã©â‚¬Â²Ã¨Â¡Å’Ã¤Â¸Â­
feature-search    [5/5 Ã©â‚¬Å¡Ã©ÂÅ½] Ã¥Â°Â±Ã§Â·â€™
feature-export    [0/4 Ã©â‚¬Å¡Ã©ÂÅ½] Ã¦Å“ÂªÃ©â€“â€¹Ã¥Â§â€¹
```

## Ã¥ÂÆ’Ã¦â€¢Â¸

$ARGUMENTS:
- `define <name>` - Ã¥Â»ÂºÃ§Â«â€¹Ã¦â€“Â°Ã§Å¡â€ž eval Ã¥Â®Å¡Ã§Â¾Â©
- `check <name>` - Ã¥Å¸Â·Ã¨Â¡Å’Ã¤Â¸Â¦Ã¦ÂªÂ¢Ã¦Å¸Â¥ evals
- `report <name>` - Ã§â€Â¢Ã§â€Å¸Ã¥Â®Å’Ã¦â€¢Â´Ã¥Â Â±Ã¥â€˜Å 
- `list` - Ã©Â¡Â¯Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€° evals
- `clean` - Ã§Â§Â»Ã©â„¢Â¤Ã¨Ë†Å Ã§Å¡â€ž eval Ã¦â€”Â¥Ã¨ÂªÅ’Ã¯Â¼Ë†Ã¤Â¿ÂÃ§â€¢â„¢Ã¦Å“â‚¬Ã¥Â¾Å’ 10 Ã¦Â¬Â¡Ã¥Å¸Â·Ã¨Â¡Å’Ã¯Â¼â€°
