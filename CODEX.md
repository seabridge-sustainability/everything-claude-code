# SeaBridgeAI Codex Entry Point

<!-- SEABRIDGE_GOAL_PROTOCOL_START -->
## /goal Default Operating Mode

All SeaBridgeAI coding-agent tasks default to /goal.

Before implementation, establish a persistent execution goal, Definition of Done, validation plan, affected systems, dependencies, risks, expected artifacts, and likely edge cases. Continue the execution loop until the DoD is validated or a hard blocker is documented.

### /goal and Auto-Loop Are the Same Mode

/goal is the user-facing command; auto-loop is the autonomous persistent execution behavior. The agent must not return early after code generation, must not claim completion until validation passes, and must keep working until the Definition of Done is satisfied or a hard blocker is proven. If the task is likely to require more than 15 minutes, state the expected phases and validation steps before starting. If a non-trivial task finishes unusually quickly, include evidence explaining why it was genuinely small or already validated.

Canonical protocol: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md

Compact form: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL_SHORT.md

Do not claim completion from code edits, generated files, or partial tests. Completion requires validated behavior, checked integrations, regression coverage proportional to risk, and documented skipped checks or blockers.

### Completion Evidence Required

Every final report must include files changed, commands run, tests run, validation results, errors encountered, fixes applied, unverified items, remaining risks, and whether the Definition of Done is satisfied. If no tests were run, state why tests were not run, what validation was substituted, and what risk remains. The phrase "complete" is prohibited unless accompanied by validation evidence.

### Anti-Stuck Loop Rule

Timeout/stagnation rule: if a command or approach fails twice, do not repeat it blindly. Inspect logs, change strategy, isolate the problem, reduce scope, use a different validation path, and document the blocker if unresolved. If a process hangs or becomes a hung process, stop it safely, check logs, run a smaller command, verify the environment, and continue with an alternate route.

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
