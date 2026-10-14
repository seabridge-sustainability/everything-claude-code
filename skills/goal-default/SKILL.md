---
name: goal-default
description: Execute or resume an explicit SeaBridgeAI goal using existing goal records, outcome checkpoints and bounded coordination. Small tasks need only a brief acceptance check; do not add a universal planning or review ritual.
---

# Goal Default

Read `C:/Users/adelm/SeaBridgeAI/manageesg-backend/AGENTS.md` and its
`AGENTS_SYSTEM.md` import. Those three central files are the instruction authority;
ECC supplies reusable execution tools, not another policy. This skill grants no
approval and does not replace host instructions or the latest owner correction.

## Invocation and task admission

Use the client's supported goal entrypoint; if unavailable, execute the user's
explicit goal through the same contract in plain language. Do not assume every
client supports `/goal` or `$goal`; do not invoke nonexistent `Skill(goal)`.

Small task: identify the requested delta, preserved behavior and relevant check.
Long/resumed/multi-agent/cross-repo/high-risk task: refresh/validate existing
`.ecc/goal/active-goal.yaml`, create-only `outcomes.jsonl`, and
`resume-receipt.yaml`; run `ecc goal-runtime admit` with the actual runtime,
controlled mode and registered session. No second goal schema or new rulebook.

Managed fresh launches may reference an existing task-owned goal using the
reviewed manifest's `goalFile`; omitted references use the repository default.
Do not copy goals or overwrite another session's shared goal to satisfy startup.
Explicit references are immutable and revalidated; outside-repository goals are
limited to the central approved workspace's artifacts. Version 2 preparation is
required for new launches. This closes a path-binding gap, not native interception
proof or permission to reactivate paused goals.

Managed Codex launches first query the installed client's native hook metadata
without starting a thread/model turn. Both exact guard definitions must be enabled,
synchronous and trusted; missing/untrusted/ambiguous metadata refuses that launch.
Review trust through `/hooks`; never bypass or write a trust record on the owner's
behalf. Ownership, goal and configuration are rechecked after observation. Discovery
is not interception proof, and this guard does not activate direct IDE starts.

## Execution

- Advance a required usable output or an observed blocker; maintain every required
  component. Build frequent functional increments with eligible data/model and
  functionality. Do necessary prerequisite, scientific, tenant/security and
  integration checks; defer unrelated pipeline/governance/cleanup/research work.
- Apply owner corrections to effective goal state, next action and worker
  assignments before more implementation. Preserve approved UI/data/contracts.
- Reuse valid current-session advance authorization for the named sequence and
  budget. Do not re-ask covered implementation, fixes, integrations or releases.
  New scope/cost/risk/shared-data/cloud/auth actions need their actual authority;
  never interpret this skill as blanket approval.
- Delegate independent required outputs with disjoint ownership, bounded costs,
  closure reserve and available configured models; reuse completed workers.
  Use primary checkouts; new branches/worktrees require explicit owner approval.
  More agents are not automatically faster or cheaper. Only root integrates/releases.
- At product checkpoints or suspected drift, use a bounded read-only evaluator;
  retain deterministic ownership/outcome gates. Reject activity-only progress,
  partial-MVP completion, stale instructions and unsupported forecasts.
- Log meaningful evidence/decisions to existing task records, not per-action prose
  or new Markdown logs. While active, summarize hourly and immediately on a missed
  checkpoint: demonstrated outcome, full checklist, drift/budgets, blockers and
  next acceptance attempt. Scheduling or automatic resumes require runtime proof.
- Verify changed behavior and unresolved risk; stop unchanged reruns. After two
  failed approaches, change tactics; never reset the checkpoint clock to hide delay.
  Missing optional inputs block only dependent lanes. Do not stop the whole goal
  while independent authorized work remains.

## Dependency-local continuation and fail-fast gates

- Reconcile resolved approvals, ownership handoffs, commits and current evidence
  before repeating a blocker. A copied historical status is not a current audit.
  For each required lane name the actual dependency, remedy/owner and next safe
  action. Continue ready implementation, bounded review or worker integration;
  missing scientific inputs never justify invented values or waived admission.
- Treat register/admit/check commands as dependencies: require exit 0 AND the
  expected successful structured result before dispatch, writes or claims.
  A failed gate permits only safe independent reads or an owned unapplied patch,
  not a source edit. Never chain a failed gate into implementation or report a
  denied reservation as registered. Refresh legitimate snapshots once after
  changed source; never bypass guards or repeat unchanged checks indefinitely.
- A blocked claim needs a fresh goal/outcome snapshot, a concrete reason for
  every unmet lane, no ready independent work and no unreviewed worker result.
  Pending assignments need integration or explicit non-passing retirement;
  labeling all lanes blocked cannot replace those obligations.
  Reconcile the actual next work items, not only unmet acceptance proofs: active
  next actions in optional, already-proved or unmapped lanes still contradict a
  whole-goal blocked claim. Before yielding after suspected drift, use one bounded
  independent backlog review to look for retained-input calculations, owned patches
  and integration seams. A self-reported empty backlog is not proof of exhaustion;
  ECC cannot discover work omitted from its records. Do not repeat this review on
  unchanged ticks or turn missing scientific/legal admission into fabricated data.
- Worker budgets need execution-time enforcement, not only terminal rejection.
  Bind the exact assignment cap to the actual intercepted tools, count startup
  probes/retries/closure explicitly and never silently substitute the launcher's
  default cap. Record incremental usage before dispatching further work. If a
  running harness exposes no trusted pre-tool counter, hard enforcement is
  UNVERIFIED: use smaller tasks, cooperative checkpoints and a closure reserve;
  reject over-budget passing integrations and never retroactively raise the cap.
  For new repository-local managed workers, first register the exact session and
  implementation/profile scopes; issue `ecc goal assign` with `--managed-session`,
  `--managed-repo` and `--closure-reserve` together. The immutable assignment's
  `managed_execution` binds that repository/session and parent settlement reserve.
  Prepare with `workerAssignment: {id, ownerAgent}` referencing the same goal's
  canonical ledger. Missing/widened/changed/expired/settled or superseded bindings
  are refused. Startup's five matching-identity probe attempts are included in
  `max_tool_calls - closure_reserve`; the reserve grants no extra worker tools.
  Closing a session does not permit rebinding that assignment to reset its count.
  The registered session pins the assignment/goal before dispatch; selecting a
  different goal cannot strip that expectation. In-cap policy-denied attempts
  consume budget; exhausted calls are refused before charge and remain separate
  denial telemetry. This bounds guarded tool execution, not repeated model requests.
  Cross-repository/legacy workers and unmetered earlier work are not retroactively
  admitted; live native interception and provider/token metering remain separate.
- On an explicit owner resumption/correction, refresh the ECC plan and resume
  receipt, then pursue the authorized next action. A stale native UI label is
  not proof of a current blocker. Respect actual owner pauses and host safety,
  permission, resource and budget stops; agents cannot change host-controlled
  goal status or promise automatic vendor continuation without runtime proof.
- For an owner-authorized SeaBridge local backend launch without bootstrap-write
  or provider grants, use `scripts/dev/run_backend.ps1 -ReadOnlyStartup` after
  verifying the integrated mode. Reuse healthy servers; a restart still needs its
  coordinated authorization. Never fall back to normal seeding/provider startup
  to clear a readiness blocker. This mode protects startup only: it grants no
  API write/provider permission and is not proof that the live mode is active.

## Workspace queues and independent continuation

Reuse existing goal/session/release records and `sea-task-queue-execution`; no
second planner, external issue tracker or new rulebook is required. Central policy
controls authority. For every RAM, backend, writer, release or agent dependency,
record resource/repository, owner, reason, enqueue time, next checkpoint and next
independent authorized action. Separate waiting, owner-paused, rate-limited,
approval-required, failed and completed states; never infer them from a spinner.

Use `node scripts/workspace-queue.js status` for current read-only OS/ECC facts.
Admit heavy checks against fresh RAM/disk measurements across current goals;
per-goal capacity accounting alone does not prove machine-wide headroom. Serialize
heavy acceptance while constrained. Reuse verified3000/8000 and coordinate any
authorized restart. Unknown resources, ownership or spending are not permission.

Hold source slots only for bounded ready changes, then close/handoff legitimately.
Do not release a live CI/deploy lease merely to shorten another agent's queue.
Lease expiry is not proof a process stopped. Root consolidates ready owned changes
and checks normal release/budget/remote/CI gates; no worker pushes or CI-to-test.
Review queue aging and cycles hourly or at a missed checkpoint. Reorder ready
tasks/request exact owner handoff; never auto-takeover, kill agents, bypass hooks,
spawn workaround worktrees/servers, or spend repeated turns polling unchanged state.
Queue library claims require reviewed parent capabilities and atomic rechecks;
the status command launches nothing and does not automatically resume IDE chats.
Use supported continuation after dependency resolution; do not claim all vendor
chats automatically resume because the instructions or controller are installed.

Publication checks pin the fetched origin target and single push destination and
review every outgoing commit's touched paths, including reverted changes. Known
inherited owned commits require exact commit inclusion and publication evidence;
registration atop a commit does not approve publishing it. A new target needs
explicit approval of its exact baseline history as well as its name. Local-only
leases cannot execute controller pushes. These checks do not fetch current remote
state, grant owner approval or replace normal hooks, clean-checkout and budget gates.

## Completion

Use `ecc goal-runtime final` for the actual runtime/session and evidence-based claim.
Keep local/API/signed-in UI/Save-reopen/attachments/export/science/publication/deploy
proof distinct. Blocked is not done; missing required outputs remain incomplete.
Report changed/verified/unverified/remaining and measured forecast uncertainty.
No minimum working duration, compulsory TDD/reviewer loop, or claim of native
protection from instructions alone.
