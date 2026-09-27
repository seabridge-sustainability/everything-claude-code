# SeaBridgeAI Codex Entry Point

<!-- SEABRIDGE_GOAL_PROTOCOL_START -->
## Goal Protocol Default

For non-trivial work, settle what done means and how you will prove it before editing, then keep going until it is proven or you reach a real blocker. `/goal` in a prompt asks for exactly this.

- **Scope from evidence.** Build what the request needs, grounded in the current code, git history, tests, and the current plan. Do not invent product functionality or sustainability, emissions, climate, or financial data; preserve source, provenance, and units. Treat memory, handoffs, and old summaries as leads to verify, not facts.
- **Done means** the requested behavior works, tests that would catch its failure pass, there are no unexplained regressions, and you know the state of the tree. Scale checks to risk: tenant isolation, auth, persistence, AI grounding, and cross-repo contracts warrant broader tests. Do not re-run checks nothing has changed since.
- **Verify behavior, not only code.** Static checks may be necessary, but they may not prove the changed workflow. For observable UI, API, mobile, CLI, or integration behavior, use the available browser, terminal, endpoint client, simulator, or equivalent runtime surface and inspect the result. Judge it against existing performance budgets, accessibility rules, and design-system constraints; do not invent a passing threshold. Turn a repeated manual QA sequence into a narrowly triggered skill or script with setup, evidence, and failure handling.
- **When stuck,** change strategy after two failures of the same approach. Keep working on independent parts; stop only at an approval boundary or an external dependency, and name it.
- **Report** what changed, how it was verified, what remains or is risky, and any check you skipped and why. Never call unverified work done.

Full protocol, for long multi-phase work: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md
<!-- SEABRIDGE_GOAL_PROTOCOL_END -->


SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Follow the canonical precedence and load order in `AGENTS_SYSTEM.md`
("Instruction Precedence And Load Order"). For work in this repo, load in this
order, reading only what the task needs:

1. `AGENTS_SYSTEM.md` (canonical precedence, safety canon, branch protection)
2. `AGENTS.md`
3. `SEABRIDGE_CODING_AGENT_SYSTEM.md` (non-trivial work)
4. `AGENT_SKILLS.md`
5. `docs\harness\HARNESS_ENGINEERING.md` and
   `docs\agent-compatibility\codex.md` only when harness or
   compatibility work is in scope

Shared skills are centralized through `AGENT_SKILLS.md`, including
`grill-me`, `ubiquitous-language`, `improve-codebase-architecture`,
`sea-skill-map`, `sea-task-queue-execution`, `sea-teach-loop`,
`sea-error-recovery-loop`, the SeaBridgeAI `sea-*` skills, and Harness
Engineering reviewer skills.

Harness checks use `scripts\check-harness.ps1`, baseline findings live in
`manifests\harness\harness-baseline.json`, and backend public route exemptions
live in `manifests\harness\backend-public-routes.json`.

Agent Shield and Strix are governed by `SEABRIDGE_CODING_AGENT_SYSTEM.md`.
Agent Shield is advisory by default. When the user explicitly asks for a full
vulnerability scan, run the approved combined wrapper only against approved
local/staging scope.

No commit, push, global install, destructive action, paid/live provider call,
unsafe autonomous mode, yolo mode, or CI enforcement is authorized by this file.
