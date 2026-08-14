# SeaBridgeAI Gemini Guidance

<!-- SEABRIDGE_GOAL_PROTOCOL_START -->
## /goal Default Operating Mode

All SeaBridgeAI coding-agent tasks default to /goal.

Before implementation, establish a persistent execution goal, Definition of Done, validation plan, affected systems, dependencies, risks, expected artifacts, and likely edge cases. Continue the execution loop until the DoD is validated or a hard blocker is documented.

### /goal and Auto-Loop Are the Same Mode

/goal is the user-facing command; auto-loop is the autonomous persistent execution behavior. The agent must not return early after code generation, must not claim completion until validation passes, and must keep working until the Definition of Done is satisfied or a hard blocker is proven. If the task is multi-phase (touches more than 2 files, adds a dependency, requires a schema/migration change, or spans more than one repo), state the expected phases and validation steps before starting. If a non-trivial task finishes unusually quickly, include evidence explaining why it was genuinely small or already validated.

Canonical protocol: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md

Compact form: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL_SHORT.md

Do not claim completion from code edits, generated files, or partial tests. Completion requires validated behavior, checked integrations, regression coverage proportional to risk, and documented skipped checks or blockers.

### Completion Evidence Required

Every final report must include files changed, commands run, tests run, validation results, errors encountered, fixes applied, unverified items, remaining risks, and whether the Definition of Done is satisfied. If no tests were run, state why tests were not run, what validation was substituted, and what risk remains. The phrase "complete" is prohibited unless accompanied by validation evidence.

### Anti-Stuck Loop Rule

Timeout/stagnation rule: if a command or approach fails twice, do not repeat it blindly. Inspect logs, change strategy, isolate the problem, reduce scope, use a different validation path, and document the blocker if unresolved. If a process hangs or becomes a hung process, stop it safely, check logs, run a smaller command, verify the environment, and continue with an alternate route.

<!-- SEABRIDGE_GOAL_PROTOCOL_END -->


SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical SeaBridgeAI coding-agent system:
C:\Users\adelm\SeaBridgeAI\everything-claude-code

Follow the canonical precedence and load order in `AGENTS_SYSTEM.md`
("Instruction Precedence And Load Order"). Load in this order:

@./AGENTS_SYSTEM.md
@./AGENTS.md
@./SEABRIDGE_CODING_AGENT_SYSTEM.md
@./AGENT_SKILLS.md

Load upstream Superpowers direct skill bootstrap from the local reference clone:
@./vendor/superpowers/GEMINI.md

Load harness guidance only when harness or compatibility work is in scope:
@./docs/harness/HARNESS_ENGINEERING.md
@./docs/agent-compatibility/gemini.md

Procedural queue skills are available through ECC: `sea-skill-map`,
`sea-task-queue-execution`, `sea-teach-loop`, and `sea-error-recovery-loop`.

SeaBridgeAI overrides still apply: no GitHub push, commit, global install, marketplace install, paid/live provider call, destructive cleanup, or Claude Mem/vector-memory activation unless explicitly approved. Do not fabricate sustainability data; verify endpoint, database, source, auth, tenant isolation, provenance, units, scenario, timeframe, and missing-data behavior before claims.

Agent Shield and Strix are governed by `SEABRIDGE_CODING_AGENT_SYSTEM.md`. When the user explicitly asks for a full vulnerability scan, use the approved ECC combined wrapper so both run together only on approved local/staging scope.
