# SeaBridgeAI Shared Agent Skills

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical SeaBridgeAI agent system:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code`

Matt Pocock skills upstream clone:
`C:\Users\adelm\SeaBridgeAI\shared-agent-skills`

This file is the shared skills contract for Claude Code, Codex, Gemini, OpenCode,
Cursor, Copilot CLI, and future MCP-compatible coding agents. It extends the
existing SeaBridgeAI `sea-*` skill system. It does not replace
`SEABRIDGE_CODING_AGENT_SYSTEM.md`, `AGENTS_SYSTEM.md`, or repo-specific
instructions.

## Precedence

Use this deterministic load order:

1. Session and developer instructions.
2. Repo-local `AGENTS_SYSTEM.md`, `AGENTS.md`, `CLAUDE.md`, and repo overrides.
3. ECC `SEABRIDGE_CODING_AGENT_SYSTEM.md`.
4. This `AGENT_SKILLS.md`.
5. Smallest matching `.agents/skills/*/SKILL.md` wrapper.
6. Upstream source skill under `C:\Users\adelm\SeaBridgeAI\shared-agent-skills`
   only when the wrapper asks for it.
7. Task-specific runtime instructions.

Do not recursively load every skill. Load only the named or clearly relevant
skill. Do not copy upstream skill bodies into product repos.

## Invocation

Supported invocation forms:

- `#skill/grill-me`
- `#skill/ubiquitous-language`
- `#skill/improve-codebase-architecture`
- `Use skill: grill-me`
- `Use skill: ubiquitous-language`
- `Use skill: improve-codebase-architecture`

Agents without native skill support should read the matching wrapper under:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\<skill>\SKILL.md`

## Immediate Skills

| Skill | SeaBridge wrapper | Upstream source | Use when |
|---|---|---|---|
| `grill-me` | `.agents/skills/grill-me/SKILL.md` | `shared-agent-skills/skills/productivity/grill-me/SKILL.md` | Requirements are ambiguous, risky, or need adversarial clarification. |
| `ubiquitous-language` | `.agents/skills/ubiquitous-language/SKILL.md` | `shared-agent-skills/skills/deprecated/ubiquitous-language/SKILL.md` | Domain terminology needs canonical glossary alignment across code, APIs, prompts, docs, and reports. |
| `improve-codebase-architecture` | `.agents/skills/improve-codebase-architecture/SKILL.md` | `shared-agent-skills/skills/engineering/improve-codebase-architecture/SKILL.md` | Architecture needs modularity, testability, coupling, observability, or maintainability review. |

## Compatibility Rules

- SeaBridgeAI `sea-*` skills remain canonical for workflow, safety, verification,
  sustainability domain review, backend API verification, and frontend design.
- Matt Pocock skills are engineering lenses used inside the existing SeaBridge
  workflow.
- If an internal skill already covers the same behavior, use the internal skill
  first and load the Matt Pocock wrapper as a focused supplement.
- No auto-refactor, hook installation, global install, commit, push, dependency
  install, migration, or CI enforcement is authorized by invoking a skill.
- For behavior changes, pair these skills with `sea-test-driven-development` and
  `sea-verification-before-completion`.

## Harness Reviewer Skills

Harness Engineering reviewer skills live beside the normal ECC skills and are
used after meaningful changes or during hardening:

- `sea-reliability-reviewer`
- `sea-security-reviewer`
- `sea-architecture-reviewer`
- `sea-frontend-ux-reviewer`
- `sea-backend-api-reviewer`
- `sea-ai-grounding-reviewer`
- `sea-production-readiness-reviewer`

They load `docs/harness/standards/*` and produce concrete findings with
severity, affected files, rationale, remediation, and automation status.

## Cross-Agent Expected Behavior

When a skill is active, the agent should:

- Name the active skill in its plan or status.
- State assumptions and done criteria before edits.
- Use repo-specific instructions and ECC safety gates.
- Keep artifacts in approved report, log, test-results, or agent-run folders.
- Document skipped tests and unverified items.
- Avoid creating a second source of truth for instructions or domain language.

## Registry

Machine-readable metadata lives at:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\manifests\agent-skills\matt-pocock-skills.json`

Operational documentation lives at:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\docs\agent-skills\MATT_POCOCK_SKILLS_INTEGRATION.md`
