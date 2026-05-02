---
name: gsd-lifecycle
description: GSD (Get Shit Done) — structured planning, execution, verification, and session management for Claude Code
triggers:
  - /gsd-map-codebase
  - /gsd-discuss-phase
  - /gsd-plan-phase
  - /gsd-execute-phase
  - /gsd-verify-work
  - /gsd-progress
  - /gsd-quick
  - /gsd-ui-phase
  - /gsd-ui-review
  - /gsd-review
  - /gsd-code-review
  - /gsd-secure-phase
  - /gsd-health
  - /gsd-forensics
  - /gsd-docs-update
  - /gsd-pause-work
  - /gsd-resume-work
  - /gsd-stats
---

# GSD Lifecycle Skill

GSD (Get Shit Done) is a meta-prompting system that provides structured planning,
execution, verification, and session management for Claude Code via `.planning/`
state and specialized agents.

## Quick Start

```
/gsd-map-codebase       → Analyze codebase (produces 7 structured docs)
/gsd-discuss-phase      → Gather decisions through adaptive questioning
/gsd-plan-phase         → Create executable phase plans
/gsd-execute-phase      → Wave-based parallel execution with subagents
/gsd-verify-work        → Conversational UAT validation
```

## All Commands

| Command | Purpose |
|---------|---------|
| `/gsd-map-codebase` | Parallel codebase analysis producing STACK, ARCHITECTURE, etc. |
| `/gsd-discuss-phase` | Gather decisions through adaptive questioning before planning |
| `/gsd-plan-phase` | Create executable phase plans with verification loop |
| `/gsd-execute-phase` | Wave-based parallel execution with subagents |
| `/gsd-verify-work` | Conversational UAT validation |
| `/gsd-progress` | Check status and route to next action (`--next`, `--do`) |
| `/gsd-quick` | Ad-hoc tasks with GSD guarantees, skip optional agents |
| `/gsd-ui-phase` | Generate UI design contract (UI-SPEC.md) |
| `/gsd-ui-review` | 6-pillar visual audit of implemented frontend |
| `/gsd-review` | Cross-AI peer review of phase plans |
| `/gsd-code-review` | Code review workflow |
| `/gsd-secure-phase` | Verify threat mitigations for completed phase |
| `/gsd-health` | Diagnose `.planning/` directory integrity |
| `/gsd-forensics` | Post-mortem investigation of failed workflows |
| `/gsd-docs-update` | Generate/update project documentation |
| `/gsd-pause-work` | Create context handoff (`.continue-here.md`) |
| `/gsd-resume-work` | Resume with full context restoration |
| `/gsd-stats` | Session statistics and summary |

## Architecture

Commands (thin dispatchers) → Workflows (orchestration) → Agents (heavy workers)

- **State**: `.planning/` directory in project root
- **SDK**: `@gsd-build/sdk` provides `gsd-sdk query` for state management
- **Agents**: 13 specialized agents prefixed `gsd-` in `~/.claude/agents/`

## Relationship to Existing ECC Skills

| Existing | GSD Equivalent | Notes |
|----------|---------------|-------|
| spec-driven-development | discuss + plan phase | SDD is lighter, self-contained. GSD is full-lifecycle. |
| incremental-implementation | execute-phase | II is a principle. Execute-phase is an orchestrator. |
| verification-loop | verify-work | VL is general. GSD verify-work is `.planning/`-aware UAT. |

Both systems coexist — use GSD for multi-phase projects, existing skills for simpler tasks.

## Setup

Run `scripts/setup-gsd.ps1` to create the `~/.claude/get-shit-done` junction
and verify the SDK is available.
