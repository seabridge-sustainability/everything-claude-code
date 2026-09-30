# Coding-agent system improvement loop

Use this as a local operating loop, not a new always-on instruction bundle.
`AGENTS.md` remains the canonical policy, and live outcome evidence outranks
activity, green tests, and generated graphs. The same proof gate applies to
Codex, Claude, Gemini, OpenCode, and the other runtime adapters.

## Each task and release milestone

1. Name the user-visible result, acceptance proof, owner, risk, and local test
   budget. Admit controlled long goals through `ecc goal-runtime`; refresh the
   receipt when an owner correction or handoff changes the target.
2. Work and verify locally. Use focused tests and a real UI/API/CLI check when
   behavior is observable. Record skipped checks and real blockers. An agent
   must not use a passing CI run or an unchanged graph as product proof.
3. Before a planned release batch, one integration owner collects task-owned
   commits, checks remote divergence and queued Actions, and runs the local
   checks once. Use one push per completed milestone where practical. At the
   Actions tripwire, do not push without the named cost-scoped approval.
4. If an instruction, adapter, protocol, hook, or CI control changed, run
   `node scripts/check-instruction-stack.js`, relevant tests, then
   `node scripts/agent-system-map.js build` and `check`. The map is a source
   navigation aid, not live behavioral proof. Do not trigger CI to refresh it.

## Weekly local review (no hosted workflow)

- Run `node scripts/agent-system-map.js check`. If stale, inspect the changed
  sources and rebuild once at the next coherent milestone. A missing graph in
  another worktree means use source search; do not copy an unverified graph.
- Review failed and duplicate Actions runs, cancelled/queued minutes, and
  releases that required corrective pushes. Investigate the largest repeated
  cost driver before adding more CI jobs. Record Actions minutes and dollars per
  **successful release batch**, not raw push count alone. Unknown billing data
  stays unknown; no zero-cost assumption.
- Review local goal receipts for proof delays, retry loops, and unsupported
  on-track claims. Retire instructions or skills only when a measured replay
  shows equivalent outcomes with lower context or tool cost.

## Monthly controlled evaluation

- Select a small set of repository-realistic backend, frontend, and cross-repo
  tasks. Run the existing offline scenarios first. A live replay is manual,
  separately approved, capped at nine calls and its approved USD ceiling, and
  never scheduled in CI.
- Use `npm run agent-behavior:report` on the resulting local receipts. Compare
  success rate, time, tool calls, retries, tokens, and cost per successful task.
  Report missing provider cost telemetry as unknown. Change routing or prompt
  policy only after quality remains acceptable on the same scenarios.
- Sample Linux/macOS compatibility only for platform-sensitive changes. Do not
  add a standing broad matrix to every push.

## Graph boundaries and acceptance

The large Graphify code graph is ignored local cache and its historic July
report is not current evidence. It is intentionally separate from the small
tracked agent-system map. Neither graph may ingest tenant/customer data,
private memory, credentials, or live provider output. A map is accepted when
its source hashes and exact adapter links check fresh, the recorded source
commit/build time/scope are visible, negative tests reject
changed sources/broken imports, and claims are checked in current source.
Behavioral success still requires the normal goal proof and runtime checks.
