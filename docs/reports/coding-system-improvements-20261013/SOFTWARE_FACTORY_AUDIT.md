# Software Factory / Michelin Kitchen audit and improvement plan

Assessment date: 2026-10-13. Input: the supplied Matt Pocock / Lauren Tan transcript
for [the video](https://www.youtube.com/watch?v=MN9dGgmLyso&t=1847s). The transcript's
reported PR volume and other companies' practices are context, not SeaBridge
benchmarks or permission to copy their release/autopilot settings.

Recommendation: build a trustworthy verification-and-feedback loop using the ECC
components already installed. The largest opportunity is making an agent prove a
real feature outcome consistently. Additional skill packs, more parallel agents
and unattended merging should follow measured reliability.

## Scope and evidence

Reviewed the complete supplied transcript, current central policies, ECC routing,
managed-session guards, Pstack verification, frontend test/compiler/lint/browser
configuration, backend pytest/manifests/schema/audit infrastructure, GitHub
coordination and feedback code, Paperclip configuration source and knowledge
freshness. A lexical census covered 2,116 backend app Python files and 2,525
frontend src TypeScript/TSX files. This is framework-wide source/environment
assessment, not a line-by-line security audit or proof of every business feature.
No authenticated tenant journey, destructive fuzzing, provider evaluation,
service restart or feedback-channel subscription was run.

Source implementation and clean map are locally committed at `cbbc969ea` and
`d5c8e11eb`. At this assessment checkpoint, remote publication of this batch is
not yet verified. [Implementation evidence](README.md) separates actual local
tests, MCP SDK registration proof and native harness limitations. Private census
and readiness receipts are under `artifacts/agent-runs/pstack/engineering-skills`.

## 1. Verification capability

| Capability | What exists / observed | Gap to independent reliable operation |
|---|---|---|
| Focused local tests | Existing pytest manifests, Vitest, Playwright, and ECC's bounded CLI/MCP recipes. Backend auth/OpenSeaBri contracts and frontend return-path tests passed. | Many feature commands and prerequisites still require agent interpretation. Wrong test selection or an empty suite can look successful. |
| Application access | GET :8000/health and :3000/login returned 200 during this audit; approved launchers and browser tools exist. | Readiness does not prove database readiness, a signed-in property, persistence or export. Current audit did not launch another application. |
| Real authenticated UI/API | Existing storage-state capture and live-local browser specs validate sessions and inspect browser errors. | Capture explicitly asks the user to log in and press Enter; live Climate test is opt-in and skips without its prerequisite. Sessions expire. Climate remains paused. |
| UI regression tests | Nature workflow Playwright spec and other domain tests exercise interactions. | Nature spec creates a mock JWT and fulfills API routes. This is useful regression evidence but cannot establish real Save/reopen/attachment behavior. |
| Generative regression testing | Parameterized adversarial Carbon prompts and many negative contract cases exist. | No general Hypothesis/Schemathesis/fast-check property-test runner was found in the inspected dependencies/tests. Existing fuzz-labelled prompt examples are fixed cases, not a certified exploratory browser-fuzz loop. |
| Independent evaluation | Pstack exact candidate/judge protocol, revision binding, review rubrics and authorized parallel-dispatch guidance exist. | Provider-free fixtures prove the protocol. Live multi-model execution remains deferred; native enforcement and model consumption need evidence per harness. |
| Protected test execution | Managed guards bind goal/ownership/policy/workflow and reject unsafe paths and opaque execution. | General shell, interpreter and MCP execution is intentionally opaque to this guard. A verified restricted executor is needed before claiming a protected agent can autonomously run arbitrary tests. An allowlist alone is not containment. |
| Knowledge for debugging | Governed engineering memory and freshness-aware graph tools exist. | Backend graph is UNKNOWN and frontend STALE in the audit check. Use current source until their legitimate owner rebuilds/verifies them. |

Concrete configuration findings:

- `vitest.config.ts` has `passWithNoTests: true`. Required verification should
  validate the selected test exists and record the number actually executed;
  zero tests should not satisfy a task's acceptance.
- Default `playwright.config.ts` can start its configured webServer if no usable
  listener exists. The built-app path does not reuse the existing server. An
  autonomous acceptance recipe should explicitly require the intended already
  owned runtime and fail closed rather than invoking a fallback server.
- The risk-snapshot configuration requires a separate loopback runtime and
  deliberately excludes :3000. Snapshot evidence and primary signed-in :3000
  acceptance must remain distinct.
- Backend `scripts/browser/local-qa-loop.mjs` defaults `START_FRONTEND` to true,
  accepts routes and spawns shell commands. Review and constrain that execution
  path before adopting it as a trusted unattended verifier. Do not run
  `browser:close` against shared sessions; it maps to `close-all`.
- Backend pytest defaults exclude integration tests and configure a 13% app-wide
  coverage floor. That floor is a configuration value, not current measured
  coverage or proof of any particular feature. Preserve existing thresholds and
  require affected acceptance scenarios instead of inventing a new global target.

First verification increment: certify one existing unpaused feature journey on the
intended runtime. Prove its signed-in page, actual API, meaningful negative case,
durable effect/export if required and source revision. For pure helpers, add bounded
generated cases with fixed seeds and useful invariants. Potential targets are safe
return URLs, omitted/null/zero serialization, duplicate source IDs, malformed
identifiers and coverage partitions. Use existing tests first; evaluate
[Hypothesis](https://hypothesis.readthedocs.io/en/latest/) and
[fast-check](https://fast-check.dev/docs/introduction/why-property-based/) only if
the smaller approach is insufficient. Preserve failing seeds/counterexamples.

Exploratory browser testing is a separate layer: approved routes/actions and
test data, bounded steps, console/network evidence and replayable failure traces.
It must exclude payments, provider requests, migrations and unapproved mutations.
Synthetic test input must never become scientific/product results. A test should
detect a meaningful defect, not repeat the implementation's formula as its oracle.

## 2. Three agent tasks to make deterministic

| Current mechanical task | Existing foothold | Planned extraction and acceptance |
|---|---|---|
| Choose verification commands, check prerequisites and classify evidence | Pstack allowlisted feature map, pytest manifests and goal receipts | A typed verification admission/execution contract resolves recipe, existing runtime, test existence/count, auth/test-data prerequisites and evidence class. Negative tests prove missing auth, zero tests, stale source and missing listener cannot produce product PASS. Agents decide what behavior matters; scripts execute/classify the agreed checks. |
| Reconcile frontend request/response shapes against backend schemas | Pydantic models, handwritten frontend API types and current contract tests | A scoped schema/DTO conformance command compares reviewed backend serialization with affected TS clients. Where suitable, generate checked DTOs from a versioned schema; retain handwritten business semantics and explicit omitted/null distinctions. Prove that an intentional field/type drift is caught. No wholesale client rewrite or backend imports into frontend. |
| Copy, normalize, deduplicate and assign feedback/handoffs | ECC GitHub coordination CLI/store, goal/session ownership and knowledge-source registry | A read-only intake adapter stores source ID/version, repo, reproduction and dedup key in a bounded private queue. Add an atomic local claim/single-consumer rule before dispatch. Replay duplicates, stale issue revisions and malicious issue text; prove no duplicate assignment, implicit tool permission or automatic external message. Agents judge priority/root cause; the queue handles delivery/claims. |

Task-to-skill selection has already moved into the shared routing manifest/CLI.
Policy context budgets, file ownership and source hashes already have executable
checks. Keep these deterministic mechanisms rather than teaching each model to
recreate them in prose.

## 3. Make common mistakes harder to express

The frontend already enables strict TypeScript; the backend has good examples of
constrained Pydantic contracts. OpenAccess physical quantities use strict/frozen
models, forbidden extra fields, finite bounded values and coverage/layer validators.
Nature evidence constrains statuses, revisions, document size and association.
Frontend Energy findings use explicit lifecycle unions and nullable quantities.
Reuse these patterns; scientific meaning still requires eligible inputs/methods.

Improvements, scoped to changed boundaries:

1. Parse external JSON as `unknown`, narrow it once, and expose a typed API result.
   Use discriminated states for available/unavailable/error where the existing
   contract supports them; retain null, omission, units and provenance. Do not
   replace missing numbers with zero or make an unavailable state a successful
   calculation.
2. Pilot `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` on a small
   owned contract surface before any global rollout. The former includes
   undefined for unchecked indexed fields; the latter distinguishes omitted
   optional properties from explicit undefined. Neither additional flag appears
   in the inspected root tsconfig. Their effects are documented in
   [TypeScript's indexed-access option](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html)
   and [optional-property option](https://www.typescriptlang.org/tsconfig/exactOptionalPropertyTypes.html).
3. Restore relevant React hook checks incrementally on touched components after a
   baseline. `eslint.config.mjs` currently disables exhaustive-deps, immutability,
   purity and several related checks globally. Preserve the local Next ESLint
   package/parity work; do not flip every rule and trigger unrelated cleanup.
4. Add narrow import/boundary checks for client/server secrets, HTTP-only product
   consumers and existing API/service/model responsibilities. Tenant AST checks
   already exist in `scripts/agent/security_audit/checks_auth_tenant.py`; their
   heuristic warning is not proof of access control. Pair affected routes with
   real token/tenant negative tests.
5. Extract cohesive code within current domain/API/service/hook folders when an
   authorized feature needs it. Observed backend files include OpenAccess native
   routes at 6,182 lines and risk-management routes at 4,998; frontend PhysicalRisk
   is 3,483 lines and AddSites 2,825. Size alone is not a defect. Do not refactor
   paused Climate or active owners' work. Large generated geography/questionnaire
   data is a different category and should not drive a component-size rule.
6. Start new-violation baselines for unsafe casts and exceptional suppressions,
   with scoped review and evidence. The lexical src scan found 3,088 explicit-any
   patterns across 562 files, including tests/comments/data; this is screening
   evidence, not 3,088 confirmed bugs. Broad cleanup would distract from outcomes.

Environment admission also needs listener ownership, available memory, approved
storage and one writer per checkout. Current resource pressure makes extra local
models/services and parallel browser sessions a poor default. OpenShell exists
as an opt-in boundary; ordinary coding sessions are not automatically inside it.
Colibri remains an optional later provider pilot, not a verification substitute.

## 4. Connect the outer and inner loops

Manual bridging is evidenced by the supplied/pasted bug context, auth capture's
manual login step and this task's central-policy owner handoff. Existing tooling
does not yet establish an end-to-end unattended SeaBridge feedback loop:

- `scripts/github-coordination.js` supports claim/sync/validate/review/publish and
  dependency handling. Its policy requires validation/review and disables project
  synchronization by default. Read and adapt it rather than creating another
  orchestration framework.
- `scripts/lib/github-coordination/actions.js` explicitly documents a non-atomic
  read/check/write claim race. Solve serialization/claim ownership before feeding
  a burst of issues into it. Branch metadata in that upstream workflow must obey
  SeaBridge's existing primary-branch/no-new-worktree policy.
- `scripts/lib/feedback-links.js` points installer feedback to the public upstream
  `affaan-m/ECC` issue forms. That is not a private SeaBridge product bug intake;
  do not send company/customer context there.
- Paperclip is installed as an optional management interface, with scheduler and
  demand wakeups disabled and agents paused in the retained setup. Its generic
  Gemini adapter does not automatically inject assigned-task prompts. A budget
  value of zero means unlimited upstream. Source configuration is not proof of
  current process state or completed work.
- Slack tools being exposed does not prove a selected company channel is
  authorized/subscribed. No Linear subscription or external-feedback-to-ECC
  dispatch was verified in this audit. Channel/account and data ownership need a
  specific inventory before connecting them.

Proposed coordinator flow:

`Approved private source -> deterministic intake/dedup queue -> coordinator
triage -> reproducible acceptance packet -> ECC goal/ownership admission ->
single writer -> independent checks -> owner release gate -> outcome feedback`

Begin with one chosen private GitHub issue repository and read-only intake. Add
selected Slack/Linear sources only after that pilot works. Intake records retain
source/version, observed versus expected behavior, sanitized reproduction,
affected project, impact, acceptance, owner and status. Customer evidence stays in
its governed platform; the queue stores permitted references and redacted metadata.
Untrusted issue/message text cannot expand scope, choose credentials or grant
permission. Rate limits, deduplication, finite retry/TTL and a dead-letter queue
prevent a bug burst from spawning an uncontrolled agent swarm.

The coordinator manages priority, dependencies and evidence rather than editing
every project. It reuses existing goals/session reservations, assigns only ready
owned scopes and requests missing material facts through bounded Grill Me. Start
with one writer per checkout; independent authorized reviewers can work read-only.
Existing release gates, spend stops and one-batch-push discipline remain intact.
Drafting or posting replies, activating subscriptions/schedules, assigning live
model work and granting auto-merge each require their actual authorization.
None is activated by this planning audit.

## Incorporation into existing instructions and skills

Keep the three central policy files authoritative and small. Complete the already
prepared central compaction through its legitimate owner; replace redundant text
with the existing ECC reference rather than add another policy block. The actual
stack check still has six over-budget frontend stacks until that checkpoint.

Keep Karpathy, scope/ownership, provenance and observable acceptance applicable
to every task. Material-ambiguity assessment is always relevant; a Grill Me
interview is conditional. Preserve one primary route and one ECC goal. Reuse
`sea-requirements-discovery` for domain agreement, `sea-quality-contract` for the
verification contract, `sea-verify-seabridge` for tools/evidence, Pstack for a
needed planning/review lens and authorized dispatch for independent evaluators.
Large uncertain work can compare grounded plans; routine reversible edits use
focused existing checks. No mandatory ten-agent review or repeated interview.

Put repeatable mechanics in existing ECC CLI/MCP components and substantial
recipes in the existing verification map. Build small skill instructions around
those tools. Use the current knowledge-ops/accepted-learning boundaries to turn
recurring corrections into proposed tests/lints/skills; preserve evidence and
approval for promotion. Do not automatically mine private chats or modify personal
memory. One-off incidents do not justify universal instructions.

## Prioritized implementation sequence

| Phase | Deliverable | Acceptance / boundary |
|---|---|---|
| 0: close current integration | Owner applies compact central patch, actual stack check, fresh source map, separated ECC/backend publication | All actual stacks within unchanged caps; native-provider proof still reported per harness. Existing agents/services preserved. |
| 1: certify verification | Typed restricted test execution, fail-closed prerequisites/test counts and one real unpaused product journey | Authenticated intended API/UI and required durable/export evidence; missing infrastructure remains blocked. No arbitrary shell permission. |
| 2: prevent repeat defects | Scoped DTO conformance, narrowed contracts/hook rules and bounded generated cases | Intentional field drift/known negative cases are caught; retained failing seeds reproduce; existing behavior/citations unchanged. |
| 3: feedback shadow pilot | One authorized read-only source, private dedup queue and serialized claims | Duplicate/stale/malicious inputs do not create duplicate or unauthorized work. Coordinator proposals only; no external messages/dispatch. |
| 4: bounded execution pilot | Owner-approved task class/model/budget, admitted scopes and independent receipts | Repeated real acceptance, bounded cost/latency/interventions, clean handoff. Missing native proof or safe executor blocks only that lane. |
| 5: evidence-based scaling | Expand sources/task classes and sample proven low-impact work | Review outcome quality and escaped regressions; consequential auth/tenant/scientific/data changes retain stronger review and release gates. |

Measure first-pass acceptance, escaped regressions, reproduction-to-fix time,
human interventions, stale/blocked tasks and actual model/Actions costs. PR count
and skill count are inventory/activity metrics, not success. Do not introduce
24/7 dispatch or unattended merge before the earlier acceptance gates pass.

## Source anchors

ECC: `manifests/task-skill-routing.json`, `integrations/pstack/runtime.mjs`,
`scripts/lib/session-coordination.js`, `scripts/lib/github-coordination/actions.js`,
`config/github-native-coordination.json`, `scripts/lib/feedback-links.js`,
`integrations/company-dev-tools/paperclip/README.md`, `skills/knowledge-ops/SKILL.md`.

Frontend: `tsconfig.json`, `eslint.config.mjs`, `vitest.config.ts`,
`playwright.config.ts`, `playwright.risk-snapshot.config.ts`,
`scripts/capture-climate-risk-auth.mjs`, `e2e/climate-risk-live-local.spec.ts`,
`e2e/nature-risk-workflow.spec.ts`, `src/lib/api/energy-findings-api.ts`.

Backend: `pytest.ini`, `tests/manifests/`, `scripts/dev/run_backend.ps1`,
`scripts/browser/local-qa-loop.mjs`, `agent-tooling/skills/seabridge-browser-autonomy/SKILL.md`,
`app/schemas/openaccess_physical_contract.py`, `app/schemas/nature_indicator_evidence.py`,
`scripts/agent/security_audit/checks_auth_tenant.py`, `tests/test_carbon_agent_golden_prompts.py`.
