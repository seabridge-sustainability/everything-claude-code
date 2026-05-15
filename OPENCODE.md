# SeaBridgeAI OpenCode Entry Point

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

OpenCode/OpenCode-style agents must load the canonical SeaBridgeAI system from:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\SEABRIDGE_CODING_AGENT_SYSTEM.md`

Also load:

1. `AGENTS_SYSTEM.md`
2. `AGENTS.md`
3. `AGENT_SKILLS.md`
4. `docs\harness\HARNESS_ENGINEERING.md`
5. `docs\agent-compatibility\opencode.md`

Shared skills are centralized through `AGENT_SKILLS.md`, including
`grill-me`, `ubiquitous-language`, `improve-codebase-architecture`, the
SeaBridgeAI `sea-*` skills, and Harness Engineering reviewer skills.

Harness checks use `scripts\check-harness.ps1`, baseline findings live in
`manifests\harness\harness-baseline.json`, and backend public route exemptions
live in `manifests\harness\backend-public-routes.json`.

Agent Shield and Strix are governed by `SEABRIDGE_CODING_AGENT_SYSTEM.md`.
Agent Shield is advisory by default. When the user explicitly asks for a full
vulnerability scan, run the approved combined wrapper only against approved
local/staging scope.

No commit, push, global install, destructive action, paid/live provider call,
unsafe autonomous mode, yolo mode, or CI enforcement is authorized by this file.
