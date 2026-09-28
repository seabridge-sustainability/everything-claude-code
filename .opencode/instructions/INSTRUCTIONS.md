# ECC OpenCode Compatibility

The primary OpenCode configuration loads `AGENTS.md`, which is the canonical
SeaBridgeAI safety, goal, verification, and cost contract. Do not duplicate it
here.

Optional commands and subagents apply only when selected or when their narrow
trigger fits. Use risk-scaled tests and repository-owned coverage thresholds;
TDD, E2E, full-suite runs, and review agents are not mandatory for every change.
