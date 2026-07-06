---
name: sea-gsd-controlled-execution
description: SeaBridgeAI controlled GSD/Get Shit Done skill for complex multi-phase work, context-rot prevention, structured artifacts, phase planning, verification, forensics, and cross-repo coordination without autonomous/yolo execution, auto-commit, auto-push, or global installs.
---

# sea-gsd-controlled-execution

## Purpose

Make GSD callable as "GSD" or "get-shit-done" inside SeaBridgeAI while preserving SeaBridgeAI safety, local-only execution, sustainability data integrity, and verification gates.

## When To Call

Use for complex multi-phase work, large backend/frontend/AI/security/QA/documentation tasks, cross-repo coordination, scope recovery, context rot, planning drift, verification drift, or post-failure forensics.

## Required Inputs

- Goal and acceptance criteria.
- Repos and modules involved.
- Current phase or desired phase.
- Known constraints and approvals.
- Affected task bucket: backend/API, frontend/UI, AI/data integrity, sustainability-domain correctness, security, QA/testing, documentation, or cross-repo coordination.
- Existing artifacts, if any: `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, `CONTEXT.md`, `PHASE_PLAN.md`, `VERIFY_WORK.md`, `FORENSICS.md`.

## Expected Outputs

- Phase decomposition.
- Structured artifacts under a user-approved planning location.
- Scope-control and dropped-requirement checks.
- Verification results for every phase.
- Concise state summary and next action.
- Explicit approval-needed list for any commit, push, PR, install, live call, or cleanup.

## Allowed GSD-Inspired Actions

- Map codebase context into concise artifacts.
- Discuss phase assumptions and options.
- Plan phases with exact files, risks, and verification gates.
- Execute locally scoped phase work only after approval or clear user instruction.
- Verify work with tests, browser checks, route checks, security review, and domain review.
- Run forensics after failed workflows.
- Provide help/routing guidance.
- Track progress and milestones as local markdown state.

## Controlled Auto Mode Pattern

Allowed without repeated prompts:

- Formatting.
- Lint fixes.
- Typecheck fixes.
- Test discovery.
- Import cleanup.
- Small refactors with tests.
- Moving logs/reports into approved folders.
- Docs link/path fixes.
- Safe read-only scans.

Requires explicit approval:

- Commits.
- Pushes.
- Dependency installs.
- Migrations.
- Production data changes.
- Auth/security changes.
- Billing changes.
- Destructive file operations.
- Yolo, autonomous, dangerous, or permission-skipping modes.
- Global installs.
- Long-running training jobs.

## Disallowed Actions

- No `/gsd-autonomous` behavior by default.
- No yolo mode.
- No dangerous permission skipping.
- No automatic commits.
- No automatic pushes.
- No automatic PR creation.
- No merge, branch deletion, worktree removal, or cleanup without explicit approval and proof there is no unique unmerged work.
- No global install or marketplace install.
- No `npx get-shit-done-cc@latest` or `npm install -g get-shit-done-cc` without explicit approval.
- No paid/live provider calls without explicit approval.
- No fabricated sustainability data.

## SeaBridgeAI Safety Constraints

- Keep development local unless explicitly approved.
- Verify endpoint, database, source, auth, tenant isolation, and frontend contract before product claims.
- Security-sensitive work must check secrets, uploads, API keys, webhooks, production data handling, rate limits, and tenant isolation.
- AI outputs must preserve source/provenance/confidence and missing-data behavior.
- Sustainability outputs must preserve units, boundaries, scenario, geography, timeframe, factor source, and provisional/demo status.

## Scope-Reduction Detection

Before each phase and before completion, compare the latest artifacts against the original user request. Flag any requirement that was dropped, deferred, renamed, weakened, or converted to demo/mock behavior.

## Context Rot Prevention

Use structured artifacts instead of long chat memory. Keep `STATE.md` and `CONTEXT.md` concise, current, and evidence-backed. Summarize noisy logs and link artifact paths rather than pasting raw dumps.

## Structured Artifact Requirements

Use the templates under:

`C:\Users\adelm\SeaBridgeAI\everything-claude-code\templates\gsd\`

Minimum artifacts for multi-phase work:

- `PROJECT.md`
- `REQUIREMENTS.md`
- `ROADMAP.md`
- `STATE.md`
- `CONTEXT.md`
- `PHASE_PLAN.md`
- `VERIFY_WORK.md`

Use `FORENSICS.md` after failed or ambiguous workflows.

## Verification Gates

Before any completion claim, also apply `sea-verification-before-completion`;
the gates below scope what to verify, they do not replace that skill.

- Backend/API: route registration, schema, data source, writer, auth, tenant isolation, error states, feature gates.
- Frontend/UI: route visibility, endpoint calls, contract match, state behavior, no dead controls, responsive checks.
- AI/data integrity: source traceability, citations, confidence, missing-data behavior, no fabricated facts.
- Sustainability-domain: factors, units, boundaries, scenario/timeframe/geography, evidence, framework mapping.
- Security: auth, tenant isolation, secrets, uploads, external calls, rate limits, privacy.
- QA/testing: focused tests first, broader tests when risk warrants, browser checks where user-facing.
- Documentation: claims match verified code and artifacts.
- Cross-repo: route/payload/response/auth/UI contract checked across all involved repos.

## Failure Conditions

Stop and report a blocker if autonomous/yolo behavior is requested without approval, a phase lacks verification, artifacts contradict the request, a requirement is silently dropped, data is ungrounded, auth/tenant isolation is unclear, or completion would require an unapproved commit/push/PR/install/live call/cleanup.

## Source Reference

Local GSD reference:

`C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\get-shit-done`

SeaBridgeAI does not run the upstream installer by default.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
