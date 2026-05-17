# SeaBridgeAI Cross-Agent Compatibility Guide

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical source of truth:
C:\Users\adelm\SeaBridgeAI\everything-claude-code

This file applies to Claude Code, Codex, Gemini, OpenCode, Cursor, GitHub Copilot CLI, and future coding agents.

## Embedded Superpowers

Superpowers is vendored locally as a reference at vendor\superpowers, adapted into the canonical SeaBridgeAI sea-* skills, and installed for Claude Code as the user-scope local plugin `superpowers@superpowers-dev` from the ECC vendor marketplace. Do not add, update, remove, or reinstall Superpowers globally or through any marketplace unless the user explicitly approves that separate action.

## Embedded Controlled GSD

GSD / Get Shit Done is cloned locally at external\get-shit-done and adapted through sea-gsd-controlled-execution, GSD workflows, GSD checklists, and GSD templates. Do not run npx, install globally, switch on yolo/autonomous mode, auto-commit, auto-push, or auto-create PRs unless the user explicitly approves that separate action.

## Load Order

1. Local repo AGENTS_SYSTEM.md, when present.
2. Local repo AGENTS.md or CLAUDE.md.
3. ECC SEABRIDGE_CODING_AGENT_SYSTEM.md.
4. ECC repo-integrations/<repo>.md.
5. The smallest relevant skills/sea-* canonical skill or .agents/skills/sea-* wrapper.
6. `AGENT_SKILLS.md` and the smallest relevant engineering-skill wrapper when invoked or clearly applicable.
7. Matching workflows/ and checklists/.

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
- sea-local-llm-training
- sea-ai-grounding-reviewer
- sea-architecture-reviewer
- sea-backend-api-reviewer
- sea-frontend-ux-reviewer
- sea-production-readiness-reviewer
- sea-reliability-reviewer
- sea-security-reviewer
- grill-me
- ubiquitous-language
- improve-codebase-architecture

## Mandatory Use Summary

Use senior workflow by default; brainstorming for broad specs; orchestration for multi-lane work; GSD-controlled execution for complex phases and context rot; TDD for behavior changes; systematic debugging for failures; verification before any completion claim; code-review response for reviews; worktree isolation for risky local isolation; parallel dispatch only when authorized; finishing branch before publish/merge/cleanup decisions; backend, frontend, AI data, sustainability, context, cross-repo, skill-creator, knowledge-vault, local LLM, and reviewer skills for their named domains.

Use `grill-me` for adversarial clarification, `ubiquitous-language` for domain terminology alignment, and `improve-codebase-architecture` for architecture refactor candidate discovery. These are Matt Pocock engineering skills adapted through ECC wrappers and governed by the same SeaBridgeAI approval gates.

## Approval Boundaries

No global installs, marketplace installs, GitHub pushes, commits, live paid calls, destructive actions, or uncontrolled autonomous execution without explicit approval.

## Self-Verification Loop

Every agent must plan before edits, update relevant tests when practical, prove the test fails on old behavior when practical, implement the scoped fix, prove focused tests pass, run targeted checks before completion, broaden tests when risk warrants it, document skipped tests with reasons, and never claim completion based only on code changes.

## Controlled Auto Mode Policy

Allowed without repeated prompts: formatting, lint fixes, typecheck fixes, test discovery, import cleanup, small refactors with tests, moving logs/reports into approved folders, docs link/path fixes, and safe read-only scans.

Requires explicit approval: commits, pushes, dependency installs, migrations, production data changes, auth/security changes, billing changes, destructive file operations, yolo/autonomous/dangerous permission modes, global installs, and long-running training jobs.

## Automated Review Collaboration

Primary coding agents own logic, architecture, tests, integration fixes, and final verification. Secondary review agents handle style, edge cases, consistency, security smells, and regression risks. Run Claude Code `/review` after meaningful changes where supported, or an equivalent local diff review elsewhere. Recommend `/ultra-review` for auth, tenant isolation, database migrations, AI output, LCA/emissions/risk scoring, uploads, billing, shared utilities, and production-readiness changes. CodeRabbit or similar tools are secondary only and never replace local tests.

## Source Normalization

Use only C:\Users\adelm\SeaBridgeAI\everything-claude-code. Do not reference alternate repo aliases.

## Claude Mem Exclusion

Claude Mem was evaluated and intentionally excluded. Do not clone, install, activate, or add a SQLite/vector memory layer for Claude Mem.

## Karpathy Coding Principles (Always Applied)

All agents must follow these four principles as default coding behavior:

1. Think before coding: state assumptions, clarify ambiguity, push back when simpler.
2. Simplicity first: minimum code that solves the stated problem.
3. Surgical changes: touch only what the request requires.
4. Goal-driven execution: define done with observable verification.

## Tool Compatibility Matrix

| Capability | Claude Code | Codex | Gemini | OpenCode | Cursor | Copilot CLI |
|-----------|------------|-------|--------|----------|--------|-------------|
| Instruction file | CLAUDE.md | AGENTS.md | AGENTS.md | AGENTS.md | .cursor/rules/ | AGENTS.md |
| Auto-loaded | Yes | Yes | Yes | Via opencode.json | Via rules/ | Via AGENTS.md |
| Skill invocation | /skill-name or read SKILL.md | Read SKILL.md | Read SKILL.md | Read SKILL.md | Read SKILL.md | Read SKILL.md |
| Subagent spawning | Agent tool | Codex subagent | Gemini extensions | n/a | n/a | n/a |
| MCP support | .mcp.json | .codex/config.toml | .gemini/settings.json | Varies | n/a | n/a |
| Worktree support | Native | Via git | Via git | Via git | Via git | Via git |
| Berry MCP | .mcp.json | .codex/config.toml | .gemini/settings.json | Manual | n/a | n/a |

## Per-Agent Loading Instructions

### Claude Code
1. CLAUDE.md is auto-loaded. It contains SYSTEM_ID pointer and skill catalog.
2. Skills can be invoked with /skill-name or by reading skills/sea-*/SKILL.md.
3. .claude/settings.json and .claude/settings.local.json configure hooks and permissions.
4. .mcp.json configures MCP servers (Berry, FalkorDB, etc.).

### Codex
1. AGENTS.md is auto-loaded. It contains the same SYSTEM_ID pointer and skill catalog.
2. Skills are invoked by reading SKILL.md content and following instructions.
3. .codex/config.toml configures MCP servers and model providers.
4. Subagents can be spawned for parallel work.

### Gemini
1. AGENTS.md is auto-loaded. Same SYSTEM_ID and catalog.
2. Skills are invoked by reading SKILL.md content.
3. .gemini/settings.json configures MCP servers.
4. Use AGENTS.md instructions for all safety and approval gates.

### OpenCode
1. .opencode/opencode.json specifies model and instruction files to load.
2. Instructions field should reference AGENTS.md and CLAUDE.md.
3. Skills are invoked by reading SKILL.md content.

### Cursor
1. .cursor/rules/ contains rule files (*.mdc format).
2. AGENTS.md or CLAUDE.md should be referenced in rules.
3. Skills are invoked by reading SKILL.md content.

### Copilot CLI
1. Reads AGENTS.md when present in repo root.
2. Skills are invoked by reading SKILL.md content.
3. No native MCP or subagent support.

## Skill Resolution Rules

1. Canonical skill bodies live at: `skills/sea-*/SKILL.md`
2. Callable wrappers live at: `.agents/skills/sea-*/SKILL.md`
3. Shared engineering skill wrappers live at `.agents/skills/grill-me`, `.agents/skills/ubiquitous-language`, and `.agents/skills/improve-codebase-architecture`.
4. Matt Pocock upstream source lives at `C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\matt-pocock-skills`; use it only through ECC wrappers unless directly auditing upstream.
5. Agents that support .agents/ directory (Codex) use wrappers directly.
6. Agents without .agents/ support read canonical skills from skills/ directory.
7. Both canonical and wrapper SKILL.md files describe the same behavior.
8. Never copy skill bodies into product repos. Reference the ECC path.
9. If a skill name appears in the catalog, it must have both a canonical file and a wrapper.

## Workflow and Checklist Resolution

Workflows: `workflows/*.md` (10 files covering bugfix, full-feature, cross-repo, GSD, module review, etc.)
Checklists: `checklists/*.md` (11 files covering security, backend-api, frontend-uiux, pre-edit, pre-merge, pre-completion, sustainability-data, GSD, AI hallucination prevention)
Templates: `templates/gsd/*.md` (8 GSD artifact templates)

Agents should load the matching workflow/checklist when the task type aligns.

## Avoiding Agent-Specific Drift

1. All agent instruction files (CLAUDE.md, AGENTS.md) in each repo must list the same SYSTEM_ID, canonical path, and skill catalog.
2. Repo-specific rules may extend but never contradict the central system.
3. When updating a skill, update the canonical file first, then verify the wrapper matches.
4. Cross-repo changes require sea-cross-repo-handoff skill.
5. New skills require sea-skill-creator-protocol skill.
6. Periodic sync validation should be run (see docs/CROSS_AGENT_SYSTEM_SYNC_VALIDATION_*.md).

## Repository Root Organization Policy

Do not place logs, smoke-test reports, QA reports, readiness reports, deployment
reports, benchmark reports, audit reports, or agent handoffs in the repository
root. Use the following standard locations:

| Content type | Target directory |
|---|---|
| Audit reports | `docs/reports/audits/` |
| Readiness reports | `docs/reports/readiness/` |
| QA reports and results | `docs/reports/qa/` |
| Smoke-test reports | `docs/reports/smoke-tests/` |
| Deployment reports | `docs/reports/deployments/` |
| Benchmark reports | `docs/reports/benchmarks/` |
| Fix/issue reports | `docs/reports/fixes/` |
| Handoff documents | `docs/reports/handoffs/` |
| Conflict logs | `docs/reports/conflicts/` |
| Onboarding guides | `docs/reports/onboarding/` |
| Review reports | `docs/reports/reviews/` |
| Build logs | `logs/build/` |
| Integration logs | `logs/integration/` |
| Playwright logs | `logs/playwright/` |
| Agent logs | `logs/agent/` |
| Runtime logs | `logs/runtime/` |
| Agent run artifacts | `artifacts/agent-runs/` |
