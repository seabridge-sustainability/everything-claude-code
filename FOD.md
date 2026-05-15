# SeaBridgeAI FOD Compatibility Notes

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Use C:\Users\adelm\SeaBridgeAI\everything-claude-code\SEABRIDGE_CODING_AGENT_SYSTEM.md as the source of truth.

## Embedded Superpowers

Superpowers is a local reference clone at C:\Users\adelm\SeaBridgeAI\everything-claude-code\vendor\superpowers and is adapted into SeaBridgeAI skills. This file does not authorize global installs, marketplace installs, pushes, commits, paid calls, or uncontrolled autonomous execution.

## Embedded Controlled GSD

GSD / Get Shit Done is a local reference clone at C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\get-shit-done and is adapted through sea-gsd-controlled-execution. Autonomous/yolo behavior, dangerous permission skipping, automatic commits, automatic pushes, automatic PRs, and global installs are disabled by default.

## Compatible Agents

Claude Code, Codex, Gemini, OpenCode, Cursor, GitHub Copilot CLI, and future coding agents should load the same SYSTEM_ID, canonical path, skill catalog, workflows, and checklists.

## Full Callable Skill Catalog

- sea-senior-dev-workflow
- sea-brainstorming-and-spec-refinement
- sea-task-orchestration
- sea-test-driven-development
- sea-systematic-debugging
- sea-verification-before-completion
- sea-code-review-response
- sea-git-worktree-isolation
- sea-parallel-agent-dispatch
- sea-finishing-development-branch
- sea-backend-api-verification
- sea-frontend-design
- sea-ai-data-integrity
- sea-sustainability-domain-review
- sea-context-hygiene
- sea-cross-repo-handoff
- sea-skill-creator-protocol
- sea-knowledge-vault
- sea-gsd-controlled-execution

## Mandatory Validation Rules

Frontend work verifies route, visible state, endpoint calls, filters, charts, empty states, responsive behavior, and AI/advisor controls.

Backend work verifies endpoint registration, schemas, database source, auth, tenant isolation, errors, and external-call gates.

AI and sustainability work verifies source data, citations/provenance, confidence, scenario, timeframe, unit, geography, and missing-data behavior. Never fabricate sustainability data.

Security review covers auth, tenant isolation, API keys, uploads, external calls, data privacy, production data, webhooks, and rate limits.

Claude Mem remains excluded; no SQLite/vector memory layer is added by this system.
