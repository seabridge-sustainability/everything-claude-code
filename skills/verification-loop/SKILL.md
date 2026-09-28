---
name: verification-loop
description: Verify observable behavior through the real UI, API, CLI, simulator, or agent fixture when tests and linters cannot prove the requested workflow. Use after such a change or before claiming it complete.
license: MIT
metadata:
  origin: ECC
---

# Verification Loop

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

## Outcome

Produce evidence that the changed behavior works in its real execution surface,
not merely that its source compiles. Use the smallest verification ladder that
can disprove the change and broaden only when risk or a failure warrants it.

## 1. Define Proof Before Running Tools

Write a short verification contract:

- changed behavior and affected boundary;
- representative happy path and material failure or empty state;
- existing measurable criteria that apply;
- safest runtime surface and test data;
- evidence to retain;
- constraints that make a check unavailable or unsafe.

Do not invent a performance, accessibility, visual, security, or domain
threshold. Use the repository's established budget or baseline. If none exists,
record a baseline or report that criterion as `INCONCLUSIVE`.

## 2. Run The Minimum Sufficient Ladder

1. Run the focused unit, type, lint, contract, or build check that best detects
   the changed behavior.
2. Exercise the actual runtime surface when the outcome is observable.
3. Inspect relevant secondary evidence such as console errors, network failures,
   response schema, logs, accessibility output, screenshots, or generated files.
4. Fix failures and rerun only the affected checks.
5. Broaden to integration, E2E, security, or full-suite validation only for the
   changed boundary, unexplained regression, or material blast radius.

Do not run verification on a timer. Do not rerun an unchanged green check, and
do not invoke every available reviewer or skill. Wait for running tools to
finish before deciding that work is incomplete.

Load [runtime-verification.md](references/runtime-verification.md) for the
surface-specific checklist and evidence rules.

## 3. Convert Repeated Manual QA Into A Reusable Check

Codify a manual sequence when it is non-trivial and either recurs or catches a
real defect. Prefer extending an existing test, script, or narrowly triggered
skill. Record:

- one specific job and trigger;
- safe setup, fixtures, credential requirements (never values), and cleanup;
- exact actions or bounded judgment;
- objective pass/fail evidence plus a rubric for subjective checks;
- what to do after failure;
- artifact and baseline locations;
- approval, data, and cost boundaries.

Keep a one-off observation in the task report. Do not create a broad skill for
every manual click path.

## 4. Report Evidence

```markdown
## Verification
- Contract: [behavior and criteria]
- Static/focused checks: [command -> result]
- Runtime surface: [browser/API/CLI/simulator/fixture -> observation]
- Measured criteria: [budget/baseline -> value and verdict]
- Artifacts: [paths to screenshots, logs, traces, or reports]
- Fix-and-rerun: [failure -> fix -> affected check]
- Unverified/inconclusive: [reason and residual risk]
- Verdict: READY | NOT READY | INCONCLUSIVE
```

`READY` requires fresh evidence for every material acceptance criterion.
Never convert a skipped or unavailable runtime check into a pass.
