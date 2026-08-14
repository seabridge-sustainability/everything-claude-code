# SeaBridgeAI Curated Spec Kit

This directory contains the SeaBridgeAI curated integration of GitHub Spec Kit.
It preserves the core spec-driven workflow while avoiding full CLI/vendor bloat,
community extensions, media, newsletters, and unsafe automation.

## Skills

| Skill | Purpose | Primary output |
| --- | --- | --- |
| `speckit-constitution` | Create or update governing principles | `.specify/memory/constitution.md` |
| `speckit-specify` | Define what and why | `.specify/specs/<feature-id>/spec.md` |
| `speckit-clarify` | Resolve ambiguity before planning | Updated `spec.md` |
| `speckit-plan` | Create technical implementation plan | `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md` |
| `speckit-tasks` | Generate ordered executable tasks | `tasks.md` |
| `speckit-analyze` | Read-only consistency analysis | Analysis report |
| `speckit-checklist` | Requirements quality checklist | `checklists/*.md` |
| `speckit-implement` | Execute tasks with SeaBridgeAI DoD | Code, tests, verification report |
| `speckit-taskstoissues` | Optional GitHub issue conversion | Draft or approved GitHub issues |

## SeaBridgeAI Adaptation

- `.specify` owns requirement and planning artifacts.
- `.planning` and GSD own long-running phase state and UAT verification.
- Product repos consume these skills through wrappers or agent adapters.
- Tests are required when practical, even though upstream Spec Kit treats them
  as optional in its generic template.
- GitHub issue creation, branch changes, dependency installs, migrations, paid
  calls, and pushes stay approval-gated.

## Exclusions

Excluded by design:

- upstream `specify_cli` packaging
- community presets and extensions
- media, newsletters, community docs, and unrelated GitHub metadata
- auto-commit extension behavior
- duplicated agent-specific command silos

<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_START -->
## /goal Completion Contract

This Spec Kit artifact inherits SeaBridgeAI `/goal`: define the persistent goal, Definition of Done, validation plan, integrations, risks, dependencies, artifacts, and blockers. Implementation must persist until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_END -->
