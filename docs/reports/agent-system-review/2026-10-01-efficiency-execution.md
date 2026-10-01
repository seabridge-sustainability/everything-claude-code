# Coding-agent and knowledge-system efficiency execution

Date: 2026-10-01. Owner: ECC integration sessions `cas-20261001-04` and `cas-ecc-final-20261001`.

## Outcome and boundaries

Make the coding-agent control plane cheaper to operate and harder to mistake activity for a delivered result. Work in isolated checkouts; preserve concurrent edits. One integration owner releases a completed batch per repository. A local test, a pushed SHA, green CI, deployment, and user-visible acceptance are distinct claims. Live model calls and Actions jobs are not validation shortcuts.

## Progress checklist

- [x] Phase 0: inspect current remote tips and establish an isolated ECC worktree with a scoped session and admitted outcome goal.
- [x] Phase 1: verify the backend and frontend CI cost controls already present on their remote development branches; do not duplicate another session's work.
- [x] Phase 1: read the live organization Actions hard budget. The final pre-release check on 2026-10-01 showed $32.77 of $150 (22%), with stop-usage enabled.
- [x] Phase 1: keep the backend's existing single test gate and serialized exact-SHA deployment; add ECC report-only CI routing. The dependency-free IOC scan still runs on reports; dependency installation and npm audit run on source/manifest changes or an unknown comparison. Local workflow contract tests pass. Frontend already cancels superseded CI. No backend or frontend workflow change was needed.
- [x] Phase 2: reconcile the 18 instruction adapters with enforcement/adoption status; add a local adoption doctor and negative controls. File readiness is not live activation.
- [x] Phase 3: add offline outcome/cost adversarial evaluations and a comparable cost-per-success report. No paid model trials were run. CI minutes and deployments remain unknown unless telemetry is supplied.
- [x] Phase 4: validate source-bound long-goal handoffs and test retrieval, scope, unknown-result, and poisoning cases. Retrieval output remains untrusted context, not instructions.
- [x] Phase 5: refresh the deterministic ECC map from a clean source commit; reject dirty provenance. Build a privacy-scoped local code graph and record its integrity limits honestly.
- [x] Phase 6: produce a local release/cost report separating verification, publication, CI, deployment, and acceptance.
- [x] Run focused and broad local checks, review the task-owned diff, and prepare one release candidate per changed repository. ECC: 4,795/4,795 local tests; frontend: 18/18 file-readiness checks. The frontend branch integrated a disjoint remote climate change once before release.
- [ ] Recheck the hard budget, current remote tip, and running workflows before any push; verify published SHA and CI independently.

## Current limitations

The backend's `AGENTS.md` and Copilot file are leased by another active policy session. This session must not publish overlapping backend policy edits. Its current remote-tip Copilot, Antigravity and Cline adapters are not yet file-ready; no backend adoption claim is made here. The frontend's 18-runtime file-readiness check passes in its isolated checkout, but no vendor runtime has been invoked as an activation smoke test. The deterministic map is now fresh from a clean source commit. The local Graphify graph does not index private memory or claim semantic coverage; its integrity warnings are recorded below. The disabled-hooks test now separately proves the mandatory controlled-goal gate still fails closed with optional hooks disabled, and the complete ECC suite passes.

## Release and cost receipt

| Gate | Observed result | What it does not prove |
| --- | --- | --- |
| Local ECC verification | 4,795 passed, 0 failed in `node tests/run-all.js`; existing local TypeScript from the frontend checkout was on `NODE_PATH`; no dependency installation or paid model call. | Hosted CI or live vendor-agent behavior. |
| Local frontend verification | `agent-adoption-doctor` reports 18/18 runtime files ready after integration with `origin/development`; task-owned diff has no whitespace error. | Native activation, browser behavior, or CI. |
| Backend | No backend change from this session; remote-tip workflow contract test passed. | Completion of another session's three adapter gaps. |
| Publication | Pending one ECC and one frontend push, each after fresh remote/lease checks. | A local commit alone is not a remote release. |
| Hosted CI | Pending publication; no extra run was started to obtain this receipt. | Green local tests do not imply green CI. |
| Deployment and user acceptance | Not requested or performed by this agent-system release. | File readiness is not runtime adoption or product acceptance. |
| Actions spending | Live organization page: $32.77 spent of $150, 22%, stop-usage enabled at final pre-release check. | No per-workflow charge attribution; post-push spending must be re-read to estimate marginal cost. |

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

## Graph build receipt

The deterministic control-plane map at `docs/tools/agent-system-map.json` has 66 nodes and 175 evidence-labelled edges. It was built at `2026-10-01T18:29:13.075Z` from source commit `dc186edb98fc3d380dfe31f652927738d9d09b7d`, with `sourceDirty=false`, generator version 2, no semantic indexing, and zero model calls. `node scripts/agent-system-map.js check` passed. Its SHA-256 is `5BF2B4AC3BF8608BBF3129DFB0F610241E638069610694FF43E45328BB7884EF`. This is the authoritative agent-control map; its freshness is content-bound, not proof of live vendor enforcement.

The separate local Graphify 0.3.17 corpus is `E:\cas-agent-graph-20261001`, sourced from ECC commit `858ebabb606b3490a933238e488fdf3cabdff24f`. Its explicit 16-file allowlist is:

```text
scripts/agent-adoption-doctor.js
scripts/agent-system-map.js
scripts/check-instruction-stack.js
scripts/goal-control.js
scripts/goal-runtime-bridge.js
scripts/eval-goal-runtime-offline.js
scripts/eval-agent-behavior.js
scripts/agent-behavior-report.js
scripts/knowledge-adoption.js
scripts/knowledge-retrieval-eval.js
scripts/knowledge-freshness.js
scripts/knowledge-query.js
scripts/ci/detect-ci-scope.js
scripts/lib/memory-vault.js
scripts/lib/harness-adapter-compliance.js
scripts/lib/goal-control.js
```

Every copied file's SHA-256 matched its source. The sorted path-and-hash manifest fingerprint is `C6CFCE31296FE8B899FDB683AE94AFDC94B3C5DE4A019B4B58B1CCF84448F4F0`; the local `graphify-out/graph.json` SHA-256 is `AE22D01604B587D4F18BB985BD1E8CBC4103B2B036FB4151A103556663C4B2F6`. Extraction found 16 code files, zero documents/papers/images, and produced 310 raw nodes and 875 edges with `--code-only --no-cluster`. No semantic model call or private memory indexing occurred. The graph is deliberately local and not a replacement for the deterministic map: its read-only diagnostic reported 49 dangling-endpoint edges, 6 self-loops, and 133 same-endpoint collapsed edges. Those limitations must be carried with any query or future rebuild.

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
