# Eval Ã¥â€˜Â½Ã¤Â»Â¤

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


Ã§Â®Â¡Ã§Ââ€ Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¨Â¯â€žÃ¤Â¼Â°Ã§Å¡â€žÃ¥Â¼â‚¬Ã¥Ââ€˜Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

`/eval [define|check|report|list] [feature-name]`

## Ã¥Â®Å¡Ã¤Â¹â€°Ã¨Â¯â€žÃ¤Â¼Â°

`/eval define feature-name`

Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦â€“Â°Ã§Å¡â€žÃ¨Â¯â€žÃ¤Â¼Â°Ã¥Â®Å¡Ã¤Â¹â€°Ã¯Â¼Å¡

1. Ã¤Â½Â¿Ã§â€Â¨Ã¦Â¨Â¡Ã¦ÂÂ¿Ã¥Ë†â€ºÃ¥Â»Âº `.claude/evals/feature-name.md`Ã¯Â¼Å¡

```markdown
## EVAL: Ã¥Å Å¸Ã¨Æ’Â½Ã¥ÂÂÃ§Â§Â°
Ã¥Ë†â€ºÃ¥Â»ÂºÃ¤ÂºÅ½: $(date)

### Ã¨Æ’Â½Ã¥Å â€ºÃ¨Â¯â€žÃ¤Â¼Â°
- [ ] [Ã¨Æ’Â½Ã¥Å â€º 1 Ã§Å¡â€žÃ¦ÂÂÃ¨Â¿Â°]
- [ ] [Ã¨Æ’Â½Ã¥Å â€º 2 Ã§Å¡â€žÃ¦ÂÂÃ¨Â¿Â°]

### Ã¥â€ºÅ¾Ã¥Â½â€™Ã¨Â¯â€žÃ¤Â¼Â°
- [ ] [Ã§Å½Â°Ã¦Å“â€°Ã¨Â¡Å’Ã¤Â¸Âº 1 Ã¤Â»ÂÃ§â€žÂ¶Ã¦Å“â€°Ã¦â€¢Ë†]
- [ ] [Ã§Å½Â°Ã¦Å“â€°Ã¨Â¡Å’Ã¤Â¸Âº 2 Ã¤Â»ÂÃ§â€žÂ¶Ã¦Å“â€°Ã¦â€¢Ë†]

### Ã¦Ë†ÂÃ¥Å Å¸Ã¦Â â€¡Ã¥â€¡â€ 
- Ã¨Æ’Â½Ã¥Å â€ºÃ¨Â¯â€žÃ¤Â¼Â°Ã§Å¡â€ž pass@3 > 90%
- Ã¥â€ºÅ¾Ã¥Â½â€™Ã¨Â¯â€žÃ¤Â¼Â°Ã§Å¡â€ž pass^3 = 100%

```

2. Ã¦ÂÂÃ§Â¤ÂºÃ§â€Â¨Ã¦Ë†Â·Ã¥Â¡Â«Ã¥â€ â„¢Ã¥â€¦Â·Ã¤Â½â€œÃ¦Â â€¡Ã¥â€¡â€ 

## Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¯â€žÃ¤Â¼Â°

`/eval check feature-name`

Ã¤Â¸ÂºÃ¥Å Å¸Ã¨Æ’Â½Ã¨Â¿ÂÃ¨Â¡Å’Ã¨Â¯â€žÃ¤Â¼Â°Ã¯Â¼Å¡

1. Ã¤Â»Å½ `.claude/evals/feature-name.md` Ã¨Â¯Â»Ã¥Ââ€“Ã¨Â¯â€žÃ¤Â¼Â°Ã¥Â®Å¡Ã¤Â¹â€°
2. Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦Â¯ÂÃ¤Â¸ÂªÃ¨Æ’Â½Ã¥Å â€ºÃ¨Â¯â€žÃ¤Â¼Â°Ã¯Â¼Å¡
   * Ã¥Â°ÂÃ¨Â¯â€¢Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â â€¡Ã¥â€¡â€ 
   * Ã¨Â®Â°Ã¥Â½â€¢ Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥
   * Ã¥Å“Â¨ `.claude/evals/feature-name.log` Ã¤Â¸Â­Ã¨Â®Â°Ã¥Â½â€¢Ã¥Â°ÂÃ¨Â¯â€¢
3. Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦Â¯ÂÃ¤Â¸ÂªÃ¥â€ºÅ¾Ã¥Â½â€™Ã¨Â¯â€žÃ¤Â¼Â°Ã¯Â¼Å¡
   * Ã¨Â¿ÂÃ¨Â¡Å’Ã§â€ºÂ¸Ã¥â€¦Â³Ã¦Âµâ€¹Ã¨Â¯â€¢
   * Ã¤Â¸Å½Ã¥Å¸ÂºÃ§ÂºÂ¿Ã¦Â¯â€Ã¨Â¾Æ’
   * Ã¨Â®Â°Ã¥Â½â€¢ Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥
4. Ã¦Å Â¥Ã¥â€˜Å Ã¥Â½â€œÃ¥â€°ÂÃ§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å¡

```
EVAL CHECK: feature-name
========================
Ã¥Å Å¸Ã¨Æ’Â½Ã¯Â¼Å¡X/Y Ã©â‚¬Å¡Ã¨Â¿â€¡
Ã¥â€ºÅ¾Ã¥Â½â€™Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å¡X/Y Ã©â‚¬Å¡Ã¨Â¿â€¡
Ã§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å¡Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â¸Â­ / Ã¥Â°Â±Ã§Â»Âª
```

## Ã¦Å Â¥Ã¥â€˜Å Ã¨Â¯â€žÃ¤Â¼Â°

`/eval report feature-name`

Ã§â€Å¸Ã¦Ë†ÂÃ¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¨Â¯â€žÃ¤Â¼Â°Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

```
EVAL REPORT: feature-name
=========================
Ã§â€Å¸Ã¦Ë†ÂÃ¦â€”Â¶Ã©â€”Â´: $(date)

Ã¨Æ’Â½Ã¥Å â€ºÃ¨Â¯â€žÃ¤Â¼Â°
----------------
[eval-1]: Ã©â‚¬Å¡Ã¨Â¿â€¡ (pass@1)
[eval-2]: Ã©â‚¬Å¡Ã¨Â¿â€¡ (pass@2) - Ã©Å“â‚¬Ã¨Â¦ÂÃ©â€¡ÂÃ¨Â¯â€¢
[eval-3]: Ã¥Â¤Â±Ã¨Â´Â¥ - Ã¥Ââ€šÃ¨Â§ÂÃ¥Â¤â€¡Ã¦Â³Â¨

Ã¥â€ºÅ¾Ã¥Â½â€™Ã¦Âµâ€¹Ã¨Â¯â€¢
----------------
[test-1]: Ã©â‚¬Å¡Ã¨Â¿â€¡
[test-2]: Ã©â‚¬Å¡Ã¨Â¿â€¡
[test-3]: Ã©â‚¬Å¡Ã¨Â¿â€¡

Ã¦Å’â€¡Ã¦Â â€¡
-------
Ã¨Æ’Â½Ã¥Å â€º pass@1: 67%
Ã¨Æ’Â½Ã¥Å â€º pass@3: 100%
Ã¥â€ºÅ¾Ã¥Â½â€™ pass^3: 100%

Ã¥Â¤â€¡Ã¦Â³Â¨
-----
[Ã¤Â»Â»Ã¤Â½â€¢Ã©â€”Â®Ã©Â¢ËœÃ£â‚¬ÂÃ¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ ÂµÃ¦Ë†â€“Ã¨Â§â€šÃ¥Â¯Å¸Ã§Â»â€œÃ¦Å¾Å“]

Ã¥Â»ÂºÃ¨Â®Â®
--------------
[SHIP / NEEDS WORK / BLOCKED]
```

## Ã¥Ë†â€”Ã¥â€¡ÂºÃ¨Â¯â€žÃ¤Â¼Â°

`/eval list`

Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¨Â¯â€žÃ¤Â¼Â°Ã¥Â®Å¡Ã¤Â¹â€°Ã¯Â¼Å¡

```
Ã¥Å Å¸Ã¨Æ’Â½Ã¦Â¨Â¡Ã¥Ââ€”Ã¥Â®Å¡Ã¤Â¹â€°
================
feature-auth      [3/5 Ã©â‚¬Å¡Ã¨Â¿â€¡] Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â¸Â­
feature-search    [5/5 Ã©â‚¬Å¡Ã¨Â¿â€¡] Ã¥Â°Â±Ã§Â»Âª
feature-export    [0/4 Ã©â‚¬Å¡Ã¨Â¿â€¡] Ã¦Å“ÂªÃ¥Â¼â‚¬Ã¥Â§â€¹
```

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS:

* `define <name>` - Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦â€“Â°Ã§Å¡â€žÃ¨Â¯â€žÃ¤Â¼Â°Ã¥Â®Å¡Ã¤Â¹â€°
* `check <name>` - Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â¹Â¶Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¯â€žÃ¤Â¼Â°
* `report <name>` - Ã§â€Å¸Ã¦Ë†ÂÃ¥Â®Å’Ã¦â€¢Â´Ã¦Å Â¥Ã¥â€˜Å 
* `list` - Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¨Â¯â€žÃ¤Â¼Â°
* `clean` - Ã¥Ë†Â Ã©â„¢Â¤Ã¦â€”Â§Ã§Å¡â€žÃ¨Â¯â€žÃ¤Â¼Â°Ã¦â€”Â¥Ã¥Â¿â€”Ã¯Â¼Ë†Ã¤Â¿ÂÃ§â€¢â„¢Ã¦Å“â‚¬Ã¨Â¿â€˜ 10 Ã¦Â¬Â¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼â€°
