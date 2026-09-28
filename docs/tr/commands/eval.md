# Eval Komutu

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


Eval-odaklÃ„Â± geliÃ…Å¸tirme iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±nÃ„Â± yÃƒÂ¶net.

## KullanÃ„Â±m

`/eval [define|check|report|list] [feature-name]`

## Eval TanÃ„Â±mla

`/eval define feature-name`

Yeni bir eval tanÃ„Â±mÃ„Â± oluÃ…Å¸tur:

1. Ã…Å¾ablonla `.claude/evals/feature-name.md` oluÃ…Å¸tur:

```markdown
## EVAL: feature-name
Created: $(date)

### Capability Evals
- [ ] [Capability 1 aÃƒÂ§Ã„Â±klamasÃ„Â±]
- [ ] [Capability 2 aÃƒÂ§Ã„Â±klamasÃ„Â±]

### Regression Evals
- [ ] [Mevcut davranÃ„Â±Ã…Å¸ 1 hala ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±yor]
- [ ] [Mevcut davranÃ„Â±Ã…Å¸ 2 hala ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±yor]

### Success Criteria
- pass@3 > 90% for capability evals
- pass^3 = 100% for regression evals
```

2. KullanÃ„Â±cÃ„Â±dan belirli kriterleri doldurmasÃ„Â±nÃ„Â± iste

## Eval Kontrol Et

`/eval check feature-name`

Bir ÃƒÂ¶zellik iÃƒÂ§in eval'larÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r:

1. `.claude/evals/feature-name.md` dosyasÃ„Â±ndan eval tanÃ„Â±mÃ„Â±nÃ„Â± oku
2. Her capability eval iÃƒÂ§in:
   - Kriteri doÃ„Å¸rulamayÃ„Â± dene
   - PASS/FAIL kaydet
   - Denemeyi `.claude/evals/feature-name.log` dosyasÃ„Â±na kaydet
3. Her regression eval iÃƒÂ§in:
   - Ã„Â°lgili test'leri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
   - Baseline ile karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±r
   - PASS/FAIL kaydet
4. Mevcut durumu raporla:

```
EVAL CHECK: feature-name
========================
Capability: X/Y passing
Regression: X/Y passing
Status: IN PROGRESS / READY
```

## Eval Raporu

`/eval report feature-name`

KapsamlÃ„Â± eval raporu oluÃ…Å¸tur:

```
EVAL REPORT: feature-name
=========================
Generated: $(date)

CAPABILITY EVALS
----------------
[eval-1]: PASS (pass@1)
[eval-2]: PASS (pass@2) - required retry
[eval-3]: FAIL - see notes

REGRESSION EVALS
----------------
[test-1]: PASS
[test-2]: PASS
[test-3]: PASS

METRICS
-------
Capability pass@1: 67%
Capability pass@3: 100%
Regression pass^3: 100%

NOTES
-----
[Herhangi bir sorun, edge case veya gÃƒÂ¶zlem]

RECOMMENDATION
--------------
[SHIP / NEEDS WORK / BLOCKED]
```

## Eval'larÃ„Â± Listele

`/eval list`

TÃƒÂ¼m eval tanÃ„Â±mlarÃ„Â±nÃ„Â± gÃƒÂ¶ster:

```
EVAL DEFINITIONS
================
feature-auth      [3/5 passing] IN PROGRESS
feature-search    [5/5 passing] READY
feature-export    [0/4 passing] NOT STARTED
```

## ArgÃƒÂ¼manlar

$ARGUMENTS:
- `define <name>` - Yeni eval tanÃ„Â±mÃ„Â± oluÃ…Å¸tur
- `check <name>` - Eval'larÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r ve kontrol et
- `report <name>` - Tam rapor oluÃ…Å¸tur
- `list` - TÃƒÂ¼m eval'larÃ„Â± gÃƒÂ¶ster
- `clean` - Eski eval loglarÃ„Â±nÃ„Â± kaldÃ„Â±r (son 10 ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmayÃ„Â± tutar)
