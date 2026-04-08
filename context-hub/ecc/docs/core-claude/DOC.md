---
name: core-claude
description: "Claude Code specific guidance for working in the ECC repository."
metadata:
  languages: "english"
  versions: "1.9.0"
  revision: 1
  updated-on: "2026-04-02"
  source: official
  tags: "ecc,claude-code,instructions"
---
# ECC Claude Guidance

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Generated from ECC canonical English docs. Do not edit directly; run `npm run context-hub:sync`.
> Canonical source: `CLAUDE.md`

---

# CLAUDE.md

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

The project is organized into several core components:

- **agents/** - Specialized subagents for delegation (planner, code-reviewer, tdd-guide, etc.)
- **skills/** - Workflow definitions and domain knowledge (coding standards, patterns, testing)
- **commands/** - Slash commands invoked by users (/tdd, /plan, /e2e, etc.)
- **hooks/** - Trigger-based automations (session persistence, pre/post-tool hooks)
- **rules/** - Always-follow guidelines (security, coding style, testing requirements)
- **mcp-configs/** - MCP server configurations for external integrations
- **scripts/** - Cross-platform Node.js utilities for hooks, setup, and Context Hub sync/build tasks
- **context-hub/** - Repo-local Context Hub content derived from the canonical English docs
- **tests/** - Test suite for scripts and utilities

## Documentation Retrieval Order

When working inside ECC, use this order:

1. Read the local repo file directly if the answer is already in the workspace.
2. Use ECC's local Context Hub bundle for ECC-specific guides, commands, policies, and workflows.
3. Use public Context Hub entries for non-ECC skills or shared playbooks.
4. Use Context7 only for third-party libraries, frameworks, SDKs, and APIs.
5. Use `llms.txt` or general browsing only as fallback paths.

## Context Hub Commands

```bash
npm run context-hub:sync
npm run context-hub:validate
npm run context-hub:build
```

- `context-hub:sync` refreshes `context-hub/ecc/...` plus the repo root `llms.txt`.
- `context-hub:validate` runs `npx -y @aisuite/chub build context-hub --validate-only`.
- `context-hub:build` builds `context-hub/dist` for local `chub search` and `chub get` usage.

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
- Optional convenience install for humans and agents: `npm install -g @aisuite/chub`

## Contributing

Follow the formats in CONTRIBUTING.md:
- Agents: Markdown with frontmatter (name, description, tools, model)
- Skills: Clear sections (When to Use, How It Works, Examples)
- Commands: Markdown with description frontmatter
- Hooks: JSON with matcher and hooks array

File naming: lowercase with hyphens (e.g. `python-reviewer.md`, `tdd-workflow.md`)

## Skills

Use the following skills when working on related files:

| File(s) | Skill |
|---------|-------|
| `README.md` | `/readme` |
| `.github/workflows/*.yml` | `/ci-workflow` |
| `commands/docs.md`, `agents/docs-lookup.md`, `skills/documentation-lookup/SKILL.md` | `documentation-lookup` |

When spawning subagents, always pass conventions from the respective skill into the agent's prompt.
