# SeaBridgeAI OpenCode Compatibility Note

OpenCode loads the canonical repository contract from `AGENTS.md`; the managed
`.opencode/opencode.json` names that file explicitly. This file is a navigation
aid only and must not duplicate the contract.

Use optional OpenCode agents and commands only when their trigger fits. Their
testing and review guidance is subordinate to repository-owned thresholds and
the risk-scaled verification rules in `AGENTS.md`.
