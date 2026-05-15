# SeaBridgeAI Agent Entry Point

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
