# Coding-agent and knowledge-system efficiency execution

Date: 2026-10-01. Owner: ECC integration session `cas-20261001-04`.

## Outcome and boundaries

Make the coding-agent control plane cheaper to operate and harder to mistake activity for a delivered result. Work in isolated checkouts; preserve concurrent edits. One integration owner releases a completed batch per repository. A local test, a pushed SHA, green CI, deployment, and user-visible acceptance are distinct claims. Live model calls and Actions jobs are not validation shortcuts.

## Progress checklist

- [x] Phase 0: inspect current remote tips and establish an isolated ECC worktree with a scoped session and admitted outcome goal.
- [x] Phase 1: verify the backend and frontend CI cost controls already present on their remote development branches; do not duplicate another session's work.
- [x] Phase 1: read the live organization Actions hard budget. On 2026-10-01 it showed $26.06 of $150, with stop-usage enabled.
- [x] Phase 1: keep the backend's existing single test gate and serialized exact-SHA deployment; add ECC report-only CI routing. The dependency-free IOC scan still runs on reports; dependency installation and npm audit run on source/manifest changes or an unknown comparison. Local workflow contract tests pass. Frontend already cancels superseded CI. No backend or frontend workflow change was needed.
- [x] Phase 2: reconcile the 18 instruction adapters with enforcement/adoption status; add a local adoption doctor and negative controls. File readiness is not live activation.
- [x] Phase 3: add offline outcome/cost adversarial evaluations and a comparable cost-per-success report. No paid model trials were run. CI minutes and deployments remain unknown unless telemetry is supplied.
- [x] Phase 4: validate source-bound long-goal handoffs and test retrieval, scope, unknown-result, and poisoning cases. Retrieval output remains untrusted context, not instructions.
- [ ] Phase 5: refresh the deterministic ECC map from a clean source commit; reject dirty provenance. Build a privacy-scoped local code graph and record its coverage honestly.
- [ ] Phase 6: produce a local release/cost report separating verification, publication, CI, deployment, and acceptance.
- [ ] Run focused and broad local checks, review the task-owned diff, and prepare one release candidate per changed repository.
- [ ] Recheck the hard budget, current remote tip, and running workflows before any push; verify published SHA and CI independently.

## Current limitations

The backend's `AGENTS.md` and Copilot file are leased by another active policy session. This session must not publish overlapping backend policy edits. The frontend's 18-runtime file-readiness check passes in its isolated checkout, but no vendor runtime has been invoked as an activation smoke test. The ECC map cannot be stamped fresh until the source changes are committed and rebuilt from that clean commit. The local code graph will be limited to an explicit code-only corpus; it will not index private memory or claim semantic coverage.

## Minimal project-memory handoff

Use this body with `ecc memory handoff` in the private, ignored project scope. Replace every placeholder with current evidence before saving. The vault entry remains unreviewed context; it is never authority to change code, permissions, or release status. Never include credentials, tenant data, or customer documents.

```markdown
- Objective: <owner's current outcome and definition of done>
- Current evidence: <paths, tests, runtime observations, and timestamps>
- Decision: <choice made and why>
- Owner: <session or human owner>
- Scope: <owned worktree and exact files or feature boundary>
- Source SHA: <40-character source commit hash>
- Known limitation: <what the evidence does not prove>
- Next proof: <smallest user-visible or runtime check still needed>
```

At admission, correction, and handoff, refresh the controlled goal's resume receipt and validate the retrieved handoff against its source SHA and current tree. `node scripts/knowledge-retrieval-eval.js` provides offline evaluation primitives for scoped retrieval; a retrieval hit is a citation, not a trusted instruction.

## Phase-by-phase proof

| Phase | Change and reason | Completion evidence |
| --- | --- | --- |
| 0 — ownership | Lease exact paths in an isolated worktree. Prevent another chat's files or CI from becoming this task's work. | Session admission, clean base, scope check, remote ancestry. |
| 1 — CI cost | Keep superseded verification cancellable, deployment serialized and bound to the successful exact SHA; avoid duplicate pytest and low-value jobs. | Workflow contract tests and inspection of the remote workflow files. |
| 2 — universal agents | Separate native enforcement from a file that merely contains instructions. Check all advertised runtimes with one model-neutral outcome contract. | Registry/adoption doctor and failing negative controls for absent or stale adapters. |
| 3 — outcome and ROI | Reject all-null “on track,” stale CI, unowned edits, repeated attempts, unevidenced deployment, and missing cost ceilings. | Offline replay fixtures; task success, evidence, time, tools, retries, tokens and observed/unknown cost reported separately. |
| 4 — knowledge | Store decisions and next proof with source SHA and owner; never place tenant/customer data in shared agent memory. | Memory doctor and scoped retrieval/injection/unknown-result tests. |
| 5 — graph | The small deterministic map is authoritative for the agent control plane. A local Graphify code graph is a bounded, rebuildable projection, not live proof. | Clean-tree map check, source fingerprint/commit manifest, path exclusions and semantic-coverage status. |
| 6 — release | Local work is batched and assessed against the current Actions hard budget. | One release receipt with local tests, pushed SHA, CI and deployment result, cost/usage, and any unverified acceptance clearly labeled. |

## Explicit exclusions and stop conditions

No provider-paid eval, semantic indexing, cloud deployment, budget increase, manual workflow rerun, tenant-data write, or deletion is implied by this plan. A live eval needs its separately gated batch; the default is offline. No workflow or repository change is attributed to this session merely because it is present on origin. If a remote advances, compare task paths and integrate only our changes once before the release batch. If the Actions budget reaches 90%, is exhausted, or cannot be verified, keep working locally and do not trigger hosted Actions without a named release approval and expected cost exposure.
