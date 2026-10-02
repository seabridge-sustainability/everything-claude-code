# Coding-agent and knowledge-system efficiency execution

Date: 2026-10-01. Owner: ECC integration sessions `cas-20261001-04` and `cas-ecc-final-20261001`.

## Outcome and boundaries

Make the coding-agent control plane cheaper to operate and harder to mistake activity for a delivered result. Work in isolated checkouts; preserve concurrent edits. One integration owner releases a completed batch per repository. A local test, a pushed SHA, green CI, deployment, and user-visible acceptance are distinct claims. Live model calls and Actions jobs are not validation shortcuts.

## Progress checklist

- [x] Phase 0: inspect current remote tips and establish an isolated ECC worktree with a scoped session and admitted outcome goal.
- [x] Phase 1: verify the backend and frontend CI cost controls already present on their remote development branches; do not duplicate another session's work.
- [x] Phase 1: read the live organization Actions hard budget. The final pre-release check on 2026-10-01 showed $32.77 of $150 (22%), with stop-usage enabled.
- [x] Phase 1: keep the backend's existing single test gate and serialized exact-SHA deployment; add ECC report-only CI routing. The dependency-free IOC scan still runs on reports; dependency installation and npm audit run on source/manifest changes or an unknown comparison. Local workflow contract tests pass. Frontend already cancels superseded CI. No backend or frontend workflow change was needed.
- [x] Phase 1: stop a separate known-failing ECC schedule. Monthly Metrics Snapshot failed in August, September and October because this repository has Issues disabled (`has_issues=false`; October run `36913642092` returned HTTP 410). The scheduled trigger is removed; manual dispatch remains available after a durable metrics destination is restored. The workflow cost contract checks this state.
- [x] Phase 2: reconcile the 18 instruction adapters with enforcement/adoption status; add a local adoption doctor and negative controls. File readiness is not live activation.
- [x] Phase 3: add offline outcome/cost adversarial evaluations and a comparable cost-per-success report. The five synthetic SeaBridge tasks now cover backend tenant isolation, frontend browser QA, cross-repo contracts, security review with an embedded hostile comment, and stale handoff evidence. Each has an offline scoring control. The 15-call all-harness plan exceeds the nine-call hard batch limit, so later live comparisons must select bounded subsets. No paid model trials were run. CI minutes and deployments remain unknown unless telemetry is supplied.
- [x] Phase 4: validate source-bound long-goal handoffs and test retrieval, scope, unknown-result, and poisoning cases. Retrieval output remains untrusted context, not instructions.
- [ ] Phase 4 activation: the isolated ECC project vault is valid but contains zero memories; shared graph hooks are disabled in ECC/frontend and drifted in backend, and `ECC_MEMORY_PROJECT_ROOT` is not configured for cross-repo adoption. Do not claim operational memory continuity from a template or fixture. Installing shared hooks or memory roots requires coordinated ownership across active sessions.
- [x] Phase 5: refresh the deterministic ECC map from a clean source commit; reject dirty provenance. Build a privacy-scoped local code graph and record its integrity limits honestly.
- [x] Phase 6: produce a local release/cost report separating verification, publication, CI, deployment, and acceptance.
- [x] Run focused and broad local checks, review the task-owned diff, and prepare one release candidate per changed repository. ECC: 4,795/4,795 local tests; frontend: 18/18 file-readiness checks. The frontend branch integrated a disjoint remote climate change once before release.
- [x] Recheck the hard budget, current remote tip, and running workflows before the first release. ECC `main` was published at `c6b29cf793e6c23d62f1ad0ea5c58a1a2d26d396` with CI run `36912539841` successful; frontend `development` was published at `0b025b01bf77f09ef53383f662ec8248f70ee837` with CI run `36912644802` successful. Both isolated release worktrees were clean.
- [ ] Publish this small five-task evaluation, failed-schedule fix, map, and report follow-up as one ECC batch only after local checks and a fresh budget/remote inspection; bind its CI to the new SHA.

## Current limitations

The backend's `AGENTS.md` and Copilot file remain under another session's unresolved release lease. Its isolated owner worktree also contains uncommitted changes. This session must not publish overlapping backend policy edits. The current backend remote-tip Copilot, Antigravity and Cline adapters are not yet file-ready; no backend adoption claim is made here. The frontend's 18-runtime file-readiness check passes, but no vendor runtime has been invoked as an activation smoke test. The 18-runtime offline goal bridge does admit and reject synthetic cases without provider calls; this is not proof that each installed vendor invokes it. The deterministic map is fresh from a clean source commit. The local Graphify graph does not index private memory or claim semantic coverage; its integrity warnings are recorded below. The disabled-hooks test separately proves the mandatory controlled-goal gate still fails closed with optional hooks disabled. The first release's complete ECC suite passed; this follow-up has focused checks and still needs its bound CI.

The Actions tripwire is a mandatory human/agent pre-release check in the canonical policy, not a machine-read billing lock inside `release-acquire`; the CLI cannot independently verify an organization billing page. A lease is therefore not proof that a budget check happened. Skill retirement likewise waits for measured usage and outcome data; deleting skills merely because the current vault or telemetry is empty would hide capability without proving savings.

## Release and cost receipt

| Gate | Observed result | What it does not prove |
| --- | --- | --- |
| Local ECC verification | 4,795 passed, 0 failed in `node tests/run-all.js`; existing local TypeScript from the frontend checkout was on `NODE_PATH`; no dependency installation or paid model call. | Hosted CI or live vendor-agent behavior. |
| Local frontend verification | `agent-adoption-doctor` reports 18/18 runtime files ready after integration with `origin/development`; task-owned diff has no whitespace error. | Native activation, browser behavior, or CI. |
| Backend | No backend change from this session; remote-tip workflow contract test passed. | Completion of another session's three adapter gaps. |
| Publication | ECC `main` `c6b29cf793e6c23d62f1ad0ea5c58a1a2d26d396`; frontend `development` `0b025b01bf77f09ef53383f662ec8248f70ee837`. Both matched `git ls-remote`. The five-task fixture follow-up is local at this report cut. | A subsequent local commit is not published until its own SHA is checked. |
| Hosted CI | ECC run `36912539841` and frontend run `36912644802` both succeeded on the exact published SHAs. | These runs precede the five-task fixture follow-up; its CI must be checked separately. |
| Deployment and user acceptance | Not requested or performed by this agent-system release. | File readiness is not runtime adoption or product acceptance. |
| Actions spending | Live organization page: $32.77 of $150 before the first pushes, $32.84 after both CI runs, and $33.46 before this follow-up, still 22% utilization with stop-usage enabled. | The organization-wide movement is not a per-run cost attribution; billing may lag or include other sessions. |

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

The deterministic control-plane map at `docs/tools/agent-system-map.json` has 66 nodes and 175 evidence-labelled edges. It was rebuilt at `2026-10-01T19:51:30.572Z` from clean source commit `cd9e81f457ed6ec3563df2b0b8e8b2dc34257484`, with `sourceDirty=false`, generator version 2, no semantic indexing, and zero model calls. `node scripts/agent-system-map.js check` passed. Its SHA-256 is `AF457090854D15B9314476EE633CF13F9DB916A9C133086F719419AA19DD6DBA`. This is the authoritative agent-control map; its freshness is content-bound, not proof of live vendor enforcement.

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

## 2026-10-01 clean-runtime and graph follow-up

ECC `main` was subsequently published at `4450bd7d5cd6247eb3b774a9cf65b7523ce9068b`; its bound CI run `36939151827` succeeded. A clean linked worktree at `C:\Users\adelm\SeaBridgeAI\everything-claude-code-runtime` is pinned to that SHA. User-level Codex, Claude, Gemini, and OpenCode pointers now direct SeaBridgeAI tasks to that checkout. OpenCode's formerly nonexistent shared-checkout plugin path resolves to the local build, and `opencode debug config` exits successfully. These are local configuration checks, not a paid/live agent activation test; already-running sessions may need restart.

The deterministic `docs/tools/agent-system-map.json` remains authoritative and passes `node scripts/agent-system-map.js check` from the clean runtime at this SHA. It now covers 76 nodes and 194 evidence-labelled edges, including the memory CLI/MCP and vault. The supplemental code-only Graphify corpus was rebuilt locally at `E:\cas-agent-graph-20261001-v2` from the same clean source SHA using the 16-file allowlist above. Its `source-manifest.json` records source fingerprint `A0ED038647BA07C7F44D6174F4FC0331A79C3ADC77CF1FFB55FB52A02CEB9997`; copied-file hashes matched source. Graph SHA-256 is `260506F4158282ED6574E18BD439EA3196ED3E962EBF0EB7BBD151B9A6CEA5D1` (311 raw nodes, 877 edges). No documents, private memory, semantic extraction, or model calls were used. Read-only diagnostics still flag 49 dangling-endpoint edges, 6 self-loops, and 133 same-endpoint collapsed edges, so the supplemental graph must not be treated as authoritative proof.

The backend remains a real adoption gap: `agent-adoption-doctor` reports its Codex, Claude, Gemini, and OpenCode project entries as not ready (the three controlled-goal commands are missing; `GEMINI.md` is absent). Another session owns the backend `AGENTS.md` and Copilot changes; this follow-up did not modify its files. The backend Cline/Antigravity adapter commit `78aec6526` is local in `E:\cas-be-20261001` and remains unpublished for the next coordinated backend batch. The clean runtime improves path reliability but does not substitute for project-file readiness or a live vendor activation smoke test.

## 2026-10-02 graph freshness follow-up

The legacy broad `graphify-out/graph.json` in the dirty shared ECC checkout was last modified on 2026-07-07. It remains historical and must not be used to assert the current agent-system architecture. The authoritative deterministic control-plane map in the clean ECC runtime was rebuilt on 2026-10-02 at 01:48:46Z from a clean source tree, now covers 77 nodes and 201 evidence-labelled edges, and passes `node scripts/agent-system-map.js check` at published ECC `90b0d0d91eda43611224f81e0d343594391b6a30`. The map's own source commit is `5846b3d6d7681e08b468a21a4cd9faaf283291c0`, the preceding code commit; the later map-only commit does not change its mapped source content. This is source-bound control-plane evidence, not a claim of live vendor behavior.

The separate local, code-only Graphify corpus was refreshed at `E:\cas-agent-graph-20261002-v3` from the same published ECC SHA. Its 16 allowlisted source files matched the clean runtime byte-for-byte; the path-and-hash fingerprint is `DFA88F2367A976268B814A5FB394049EF440EA3B4D5B8B8DF291B39E4DAAC0B8`, and `graphify-out/graph.json` SHA-256 is `8B2F482F59A2FC8385EC8B19F9EEC3845288F2E906242126F17BCC2BBD376D2A`. The build found 16 code files and zero documents, produced 319 raw nodes and 895 edges, and made zero semantic/model calls. Read-only diagnostics flag 49 external-reference/dangling edges, 6 self-loops, and 134 same-endpoint collapsed edges. Its manifest and those limits must accompany any query; it is not the authoritative control-plane map. Agents should therefore report the current map and legacy July artifact separately, not repeat the blanket sentence that the ECC agent-system graph is stale.
