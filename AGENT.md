# SeaBridgeAI Agent Entry Point

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

Load order:

1. Repo-local `AGENTS_SYSTEM.md`, `AGENTS.md`, or `CLAUDE.md`.
2. `C:\Users\adelm\SeaBridgeAI\everything-claude-code\SEABRIDGE_CODING_AGENT_SYSTEM.md`.
3. `C:\Users\adelm\SeaBridgeAI\everything-claude-code\AGENT_SKILLS.md`.
4. The smallest matching skill wrapper under
   `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\`.

This file is a portable fallback for coding agents that look for singular
`AGENT.md`. It does not override `AGENTS.md`, `CLAUDE.md`, or
`AGENTS_SYSTEM.md`.

No commit, push, global install, unsafe autonomous mode, destructive action,
live paid provider call, or production scan is authorized by this file.
