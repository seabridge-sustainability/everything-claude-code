# Everything Claude Code (ECC) — Agent Instructions

This is a **production-ready AI coding plugin** providing 75 specialized agents, 384 skills, 96 commands, and automated hook workflows for software development.

**Version:** 2.2.2

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1 · SeaBridgeAI fork; canonical path `C:\Users\adelm\SeaBridgeAI\everything-claude-code`. This file is the single instruction source for agents working in ECC; `CLAUDE.md` imports it.

## Project Structure

```
agents/          — 75 specialized subagents
skills/          — 384 workflow skills and domain knowledge
commands/        — 96 slash commands
hooks/           — Trigger-based automations
rules/           — Always-follow guidelines (common + per-language)
scripts/         — cross-platform utilities, guardrail checks, SeaBridge sync/check scripts
protocols/       — SeaBridge canonical safety block and goal protocol
mcp-configs/     — MCP server configurations
context-hub/     — Context Hub content generated from the English docs
tests/           — test suite (node tests/run-all.js)
```

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->

<!-- SEABRIDGE_GOAL_PROTOCOL_START -->
## Goal Protocol Default

For non-trivial work, settle what done means and how you will prove it before editing, then keep going until it is proven or you reach a real blocker. `/goal` in a prompt asks for exactly this.

- **Scope from evidence.** Build what the request needs, grounded in the current code, git history, tests, and the current plan. Do not invent product functionality or sustainability, emissions, climate, or financial data; preserve source, provenance, and units. Treat memory, handoffs, and old summaries as leads to verify, not facts.
- **Done means** the requested behavior works, tests that would catch its failure pass, there are no unexplained regressions, and you know the state of the tree. Scale checks to risk: tenant isolation, auth, persistence, AI grounding, and cross-repo contracts warrant broader tests. Do not re-run checks nothing has changed since.
- **When stuck,** change strategy after two failures of the same approach. Keep working on independent parts; stop only at an approval boundary or an external dependency, and name it.
- **Report** what changed, how it was verified, what remains or is risky, and any check you skipped and why. Never call unverified work done.

Full protocol, for long multi-phase work: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md
<!-- SEABRIDGE_GOAL_PROTOCOL_END -->

## SeaBridgeAI Layer

- ECC is the shared coding-agent system for the SeaBridgeAI repos. Product repos carry only a short `AGENTS.md` (the safety block, goal block, repo facts) and point here for skills. The design record is `docs/reports/agent-system-review/2026-09-24-agent-system-modernization.md`, and `AGENTS_SYSTEM.md` is a reference map, not a startup read.
- **The canonical blocks are generated, not hand-edited.** The safety block lives in `protocols/SAFETY_AUTHORIZATION_RULE.md` and is propagated by `scripts/sync-safety-rule.ps1` (`-Check` detects drift). The goal block's text lives in `scripts/sync-goal-protocol.ps1` and is applied with `scripts/sync-goal-protocol-all.ps1 -Apply`. After changing either, run `node scripts/check-instruction-stack.js` and `node scripts/eval-instruction-scenarios.js`.
- SeaBridge skills are `skills/sea-*` and `seabridge-esg`, with thin wrappers in `.agents/skills/`. Read one only when the task matches (`sea-skill-map` routes when unsure); small or single-file work needs none.
- **Superpowers** is an uninitialised submodule at `vendor/superpowers`, exposed through 14 local wrapper skills. It is not installed as a Claude Code plugin; do not install it or any marketplace plugin without explicit approval.
- **GSD** is a reference clone at `external/get-shit-done`, used through `sea-gsd-controlled-execution`. Never run its installer, or yolo/auto-commit/auto-push/auto-PR modes, without explicit approval.
- **Upstream sync:** remote `affaan-upstream` (affaan-m/everything-claude-code). Merge in a short-lived worktree with SeaBridge configuration as the authority: keep protocols/, the sync/check scripts, sea-* skills, the marker blocks, the `.gitignore` secret rules and the SeaBridge `package.json` entries. Then re-run both sync scripts and `npm run catalog:sync`.

## Running Tests

```bash
node tests/run-all.js                 # everything
node tests/ci/instruction-stack.test.js
npm run catalog:check                 # documented agent/skill/command counts
```

## Core Principles

1. **Agent-First** — Delegate to specialized agents for domain tasks
2. **Test-Driven** — Write tests before implementation, 80%+ coverage required
3. **Security-First** — Never compromise on security; validate all inputs
4. **Immutability** — Always create new objects, never mutate existing ones
5. **Plan Before Execute** — Plan complex features before writing code

## Documentation Retrieval Order

1. Local repo file if the answer is already in the checked-out workspace.
2. ECC's local Context Hub bundle via `chub` for ECC-specific guides, commands, playbooks, and policies (`npm run context-hub:sync | context-hub:validate | context-hub:build`; context-hub/ is generated from the English docs, so edit the source docs first).
3. Public Context Hub entries for non-ECC skills or shared playbooks.
4. Context7 only for third-party libraries, frameworks, SDKs, and APIs.
5. `llms.txt` or web browsing only as fallback paths.

## Specialized Agents And Tooling

- The full roster of ECC subagents, GSD lifecycle agents and commands, and gstack skills is in `docs/tools/ECC_AGENT_ROSTER.md`. Load it only when delegating or when a `/gsd-*` or gstack command is requested.
- rtk, caveman, codeburn, designlang, Open Design, Vibium, Google Agent Skills, token-retry loops, memory routing, graphify and paper2agent are documented in `docs/tools/ECC_TOOLING_REFERENCE.md`. Load it only when the specific tool is needed. Token-retry loops are opt-in only. Playwright is canonical for SeaBridge browser QA; Vibium is secondary inspection.
- For architecture questions start at `graphify-out/GRAPH_REPORT.md`.

## Security Guidelines

**Before ANY commit:**
- No hardcoded secrets (API keys, passwords, tokens)
- All user inputs validated
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitized HTML)
- CSRF protection enabled
- Authentication/authorization verified
- Rate limiting on all endpoints
- Error messages don't leak sensitive data

**Secret management:** NEVER hardcode secrets. Use environment variables or a secret manager. Validate required secrets at startup. Rotate any exposed secrets immediately.

**If security issue found:** STOP → use security-reviewer agent → fix CRITICAL issues → rotate exposed secrets → review codebase for similar issues.

## Coding Style

**Immutability (CRITICAL):** Always create new objects, never mutate. Return new copies with changes applied.

**File organization:** Many small files over few large ones. 200-400 lines typical, 800 max. Organize by feature/domain, not by type. High cohesion, low coupling.

**Error handling:** Handle errors at every level. Provide user-friendly messages in UI code. Log detailed context server-side. Never silently swallow errors.

**Input validation:** Validate all user input at system boundaries. Use schema-based validation. Fail fast with clear messages. Never trust external data.

**Code quality checklist:** functions small (<50 lines), files focused (<800 lines), no deep nesting (>4 levels), proper error handling, no hardcoded values, readable well-named identifiers.

## Testing Requirements

**Minimum coverage: 80%.** Test types: unit (functions, utilities, components), integration (API endpoints, database operations), E2E (critical user flows).

**TDD workflow:** write failing test first (RED) → minimal implementation (GREEN) → refactor (IMPROVE, keep coverage 80%+). Troubleshoot failures: check test isolation → verify mocks → fix implementation (not tests, unless tests are wrong).

## Development Workflow

1. **Plan** — Use planner agent, identify dependencies and risks, break into phases
2. **TDD** — Use tdd-guide agent, write tests first, implement, refactor
3. **Review** — Use code-reviewer agent immediately, address CRITICAL/HIGH issues
4. **Capture knowledge in the right place** — personal notes → auto memory; team/project knowledge → the project's existing docs structure; do not duplicate; if no obvious location, ask before creating a new top-level file
5. **Commit when explicitly approved** — Conventional commits format (`<type>: <description>`; feat, fix, refactor, docs, test, chore, perf, ci), comprehensive PR summaries; push only after the separate push approval gate is satisfied

## Contributing Formats

Agents are Markdown with YAML frontmatter (name, description, tools, model). Skills use When to Use / How It Works / Examples sections; curated skills go in `skills/`, generated or imported ones under `~/.claude/skills/` (`docs/SKILL-PLACEMENT-POLICY.md`). Commands are Markdown with description frontmatter. Hooks are JSON with a matcher and a hooks array. File names are lowercase with hyphens. Package manager detection covers npm, pnpm, yarn and bun (`CLAUDE_PACKAGE_MANAGER`). Prefer `npx -y @aisuite/chub`; global installs require explicit approval.

## Architecture Patterns

**API response format:** Consistent envelope with success indicator, data payload, error message, and pagination metadata.

**Repository pattern:** Encapsulate data access behind standard interface (findAll, findById, create, update, delete). Business logic depends on abstract interface, not storage mechanism.
