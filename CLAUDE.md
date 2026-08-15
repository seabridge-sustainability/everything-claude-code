# CLAUDE.md

<!-- SEABRIDGE_GOAL_PROTOCOL_START -->
## /goal Default Operating Mode

All SeaBridgeAI coding-agent tasks default to /goal.

Before implementation, establish a persistent execution goal, Definition of Done, validation plan, affected systems, dependencies, risks, expected artifacts, and likely edge cases. Continue the execution loop until the DoD is validated or a hard blocker is documented.

### /goal and Auto-Loop Are the Same Mode

/goal is the user-facing command; auto-loop is the autonomous persistent execution behavior. The agent must not return early after code generation, must not claim completion until validation passes, and must keep working until the Definition of Done is satisfied or a hard blocker is proven. If the task is multi-phase (touches more than 2 files, adds a dependency, requires a schema/migration change, or spans more than one repo), state the expected phases and validation steps before starting. If a non-trivial task finishes unusually quickly, include evidence explaining why it was genuinely small or already validated.

Claude Code boundary: `/goal` is a UI slash command, not a callable skill. Agents
must never invoke `Skill(goal)`. If the user includes `/goal`, treat it as the
goal protocol wrapper and continue. If slash-command execution is unavailable,
apply the protocol manually or use the exact skill name `goal-default`.

Canonical protocol: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md

Compact form: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL_SHORT.md

Do not claim completion from code edits, generated files, or partial tests. Completion requires validated behavior, checked integrations, regression coverage proportional to risk, and documented skipped checks or blockers.

### Completion Evidence Required

Every final report must include files changed, commands run, tests run, validation results, errors encountered, fixes applied, unverified items, remaining risks, and whether the Definition of Done is satisfied. If no tests were run, state why tests were not run, what validation was substituted, and what risk remains. The phrase "complete" is prohibited unless accompanied by validation evidence.

### Anti-Stuck Loop Rule

Timeout/stagnation rule: if a command or approach fails twice, do not repeat it blindly. Inspect logs, change strategy, isolate the problem, reduce scope, use a different validation path, and document the blocker if unresolved. If a process hangs or becomes a hung process, stop it safely, check logs, run a smaller command, verify the environment, and continue with an alternate route.

<!-- SEABRIDGE_GOAL_PROTOCOL_END -->


## SeaBridgeAI Central System With Embedded Superpowers And GSD

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical path: C:\Users\adelm\SeaBridgeAI\everything-claude-code

Superpowers is embedded as an adapted local methodology through the SeaBridgeAI sea-* skills. Claude Code also has user-scope local plugin `superpowers@superpowers-dev` installed from the ECC vendor marketplace. Reference clone: `vendor\superpowers`. Do not add, update, remove, or reinstall Superpowers globally or through a marketplace unless explicitly approved.

GSD / Get Shit Done is embedded as a controlled local reference and adapted workflow layer through `sea-gsd-controlled-execution`. Reference clone: `external\get-shit-done`. Do not run `npx get-shit-done-cc@latest`, install globally, enable yolo/autonomous mode, auto-commit, auto-push, or auto-create PRs unless explicitly approved.

Mandatory gates: local-only development unless approved; no GitHub push unless approved; no commit unless requested; no global install or marketplace install unless approved; no paid/live provider calls unless approved; no fabricated sustainability data; verify endpoint/database/source/auth/tenant behavior before frontend or product claims; verify before completion.

## Instruction Precedence And Load Order

The single canonical precedence and load-order statement lives in
`AGENTS_SYSTEM.md` ("Instruction Precedence And Load Order"). Follow it exactly;
this file adds no competing ordering.

## Skill Selection Default

Discover skills dynamically from `AGENT_SKILLS.md`, `.agents/skills/`,
`skills/`, `.claude/skills/`, `workflows/`, and `checklists/`. Do not maintain
copied catalogs in product repos.

Load at most ONE skill per task by default. A task is simple (no skill needed)
when it touches at most 2 files, adds no dependency, and involves none of:
auth, tenant isolation, billing, migrations, security, production data,
destructive operations, AI grounding, or sustainability-data provenance. When
unsure which skill applies, load only `sea-skill-map` and follow its routing.
State it when no skill was needed.

Procedural defaults: `sea-task-queue-execution` for queued issues or AFK
implementation units, `sea-teach-loop` for stateful teaching,
`sea-error-recovery-loop` after failed tasks or verification. Portable
invocations: `#skill/grill-me`, `#skill/ubiquitous-language`,
`#skill/improve-codebase-architecture`, or `Use skill: <name>`.

## Goal Protocol Default

For non-trivial SeaBridgeAI work, `/goal` is the default operating contract.
Use `goal-default` to frame the user request with Definition of Done, validation
plan, risks, dependencies, scope, blockers, and artifacts, then continue until
validated or blocked. Do not call a skill named `goal`; use `goal-default` or
read the protocol directly. Canonical protocol:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
(compact form: `protocols\GOAL_PROTOCOL_SHORT.md`).

`/goal` sits above Spec Kit and GSD: Spec Kit owns formal specs; GSD owns
long-running execution state and UAT. `/goal` never authorizes commits, pushes,
installs, live/paid calls, destructive actions, migrations, or production data
changes.

## SeaBridgeAI Central Coding-Agent Layer

For SeaBridgeAI work across backend, frontend, OpenSeaBri, autoresearch,
`_upstream`, and future repos, load:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\SEABRIDGE_CODING_AGENT_SYSTEM.md`

Use the matching `repo-integrations/`, `skills/sea-*`, `.agents/skills/sea-*`,
`workflows/`, and `checklists/` files. Do not duplicate long shared guidance
into product repos.

Apply the canonical Ponytail-inspired minimalism guardrail in
`AGENTS_SYSTEM.md`: understand first, reuse before writing, prefer deletion,
standard library, native platform features, and already-installed dependencies,
protect safety and data integrity, and verify non-trivial changes.

Apply the canonical LLM Wiki / Knowledge Vault protocol in `AGENTS_SYSTEM.md`
for durable non-sensitive Markdown knowledge. Route memory questions through
`agent-memory`, ingestion decisions through `knowledge-ops`, note edits through
`sea-knowledge-vault`, and compiled OpenKB/PageIndex work through
`openkb-knowledge-base` only when explicitly requested or already configured.

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Claude Code plugin** - a collection of production-ready agents, skills, hooks, commands, rules, and MCP configurations. The project provides battle-tested workflows for software development using Claude Code.

## Running Tests

```bash
# Run all tests
node tests/run-all.js

# Run individual test files
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js
node tests/scripts/context-hub.test.js
```

## Architecture

- **agents/** - Specialized subagents for delegation (planner, code-reviewer, tdd-guide, etc.)
- **skills/** - Workflow definitions and domain knowledge (coding standards, patterns, testing)
- **commands/** - Slash commands invoked by users (/tdd, /plan, /e2e, etc.)
- **hooks/** - Trigger-based automations (session persistence, pre/post-tool hooks)
- **rules/** - Always-follow guidelines (security, coding style, testing requirements)
- **mcp-configs/** - MCP server configurations for external integrations
- **scripts/** - Cross-platform utilities for hooks, setup, guardrail checks, and Context Hub tasks
- **context-hub/** - Repo-local Context Hub content derived from the canonical English docs
- **tests/** - Test suite for scripts and utilities

## Documentation Retrieval Order

1. Read the local repo file directly if the answer is already in the workspace.
2. Use ECC's local Context Hub bundle for ECC-specific guides, commands, policies, and workflows.
3. Use public Context Hub entries for non-ECC skills or shared playbooks.
4. Use Context7 only for third-party libraries, frameworks, SDKs, and APIs.
5. Use `llms.txt` or general browsing only as fallback paths.

## Context Hub Commands

```bash
npm run context-hub:sync       # refreshes context-hub/ecc/... plus the repo root llms.txt
npm run context-hub:validate   # npx -y @aisuite/chub build context-hub --validate-only
npm run context-hub:build      # builds context-hub/dist for local chub search / chub get
```

## Key Commands

- `/tdd` - Test-driven development workflow
- `/plan` - Implementation planning
- `/e2e` - Generate and run E2E tests
- `/code-review` - Quality review
- `/build-fix` - Fix build errors
- `/learn` - Extract patterns from sessions
- `/skill-create` - Generate skills from git history
- `/docs` - Route ECC internal docs to Context Hub and external API docs to Context7

## Development Notes

- Package manager detection: npm, pnpm, yarn, bun (configurable via `CLAUDE_PACKAGE_MANAGER` env var or project config)
- Cross-platform: Windows, macOS, Linux support via Node.js scripts
- Agent format: Markdown with YAML frontmatter (name, description, tools, model)
- Skill format: Markdown with clear sections for when to use, how it works, examples
- Skill placement: Curated in skills/; generated/imported under ~/.claude/skills/. See docs/SKILL-PLACEMENT-POLICY.md
- Hook format: JSON with matcher conditions and command/notification hooks
- Context Hub content is generated from the canonical English docs; update the source docs first, then run `npm run context-hub:sync`
- Optional convenience use for humans and agents: prefer `npx -y @aisuite/chub`; global installs require explicit approval.

## Contributing

Follow the formats in CONTRIBUTING.md: agents (Markdown + frontmatter), skills
(When to Use / How It Works / Examples), commands (Markdown + description
frontmatter), hooks (JSON with matcher and hooks array). File naming: lowercase
with hyphens (e.g. `python-reviewer.md`, `tdd-workflow.md`).

## Skills For ECC Files

| File(s) | Skill |
|---------|-------|
| `README.md` | `/readme` |
| `.github/workflows/*.yml` | `/ci-workflow` |
| `agents/docs-lookup.md`, `skills/documentation-lookup/SKILL.md` | `documentation-lookup` |
| Memory/session continuity, project recall, backend memory questions | `agent-memory` |
| Secondary browser inspection alongside Playwright | `vibe-check` |
| Google Cloud, Firebase, Gemini API, or Google Cloud WAF work | matching `google/skills` skill |
| Design artifact generation (prototypes, decks, mobile apps, operations docs) | `open-design` |

When spawning subagents, always pass conventions from the respective skill into the agent's prompt.

## Roster And Tooling Pointers

- Specialized subagents, GSD lifecycle commands, and gstack skills:
  `docs/tools/ECC_AGENT_ROSTER.md`. Load only when delegating or when a
  `/gsd-*` or gstack command is requested.
- rtk, caveman, codeburn, designlang, Open Design, Vibium, Google Agent Skills,
  token-availability retry loops, memory routing, graphify, paper2agent:
  `docs/tools/ECC_TOOLING_REFERENCE.md`. Load only when the specific tool is
  needed.

Hard rules that always apply: global/marketplace installs require explicit
approval; token-retry loops are opt-in only; Playwright remains canonical for
repeatable SeaBridgeAI browser QA; `graphify-out/GRAPH_REPORT.md` is the entry
point for architecture questions in this repo, and run `graphify update .`
after modifying code files.
