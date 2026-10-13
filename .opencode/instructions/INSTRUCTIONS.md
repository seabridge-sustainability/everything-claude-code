# ECC OpenCode Compatibility

The primary OpenCode configuration loads ECC `AGENTS.md`, a loader for backend
`AGENTS.md` and `AGENTS_SYSTEM.md`. Those shared files hold the SeaBridgeAI
safety, goal, verification and cost contract; this file adds no policy.

Optional commands and subagents apply only when selected or when their narrow
trigger fits. Use risk-scaled tests and repository-owned coverage thresholds;
TDD, E2E, full-suite runs, and review agents are not mandatory for every change.

Pstack workflow references: [ECC Pstack guide](../../docs/tools/PSTACK_ECC_GUIDE.md),
[planning](../../skills/sea-multi-model-planning/SKILL.md) and
[verification](../../skills/sea-verify-seabridge/SKILL.md).

OpenCode-local Ponytail entry: [sea-ponytail](../../skills/sea-ponytail/SKILL.md); [ECC invocation guide](../../docs/tools/PONYTAIL_ECC_GUIDE.md).
