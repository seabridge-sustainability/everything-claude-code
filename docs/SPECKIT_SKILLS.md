# SeaBridgeAI Spec Kit Skills

SeaBridgeAI carries a curated Spec Kit integration as reusable skills, not as a
vendored copy of the full GitHub Spec Kit CLI.

Source reference: GitHub Spec Kit commit
`81e9ecd4d955af21adf97c17646b8d3c9b9b67bb`.

## Skill Catalog

| Skill | Purpose | Inputs | Outputs |
| --- | --- | --- | --- |
| `speckit-constitution` | Establish project principles | Repo docs, ECC guidance, user principles | `.specify/memory/constitution.md` |
| `speckit-specify` | Define what and why | Feature prompt, constitution, repo context | `.specify/specs/<feature-id>/spec.md` |
| `speckit-clarify` | Resolve ambiguity | Active spec | Updated `spec.md` with Clarifications |
| `speckit-plan` | Produce technical plan | Constitution and spec | `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md` |
| `speckit-tasks` | Produce executable tasks | Spec and plan artifacts | `tasks.md` |
| `speckit-analyze` | Analyze consistency | Constitution, spec, plan, tasks | Read-only Markdown report |
| `speckit-checklist` | Validate requirements quality | Spec/plan/tasks and checklist focus | `checklists/*.md` |
| `speckit-implement` | Execute with SeaBridge DoD | Tasks and plan artifacts | Code/tests plus verification evidence |
| `speckit-taskstoissues` | Draft or create GitHub issues | `tasks.md`, remote, approval | `issues-draft.md` or approved issues |

## Invocation By Agent

| Agent | Invocation |
| --- | --- |
| Claude Code | `/speckit.constitution`, `/speckit-constitution`, or skill picker |
| Codex | `$speckit-constitution` through `.agents/skills` |
| Gemini | `/speckit.constitution` command file or `speckit-constitution` workflow section |
| OpenCode | `/speckit.constitution` command file |
| Cursor | `speckit-constitution` skill |
| Copilot | AGENTS.md callable workflow or prompt file |
| Windsurf | `/speckit.constitution` workflow |
| Qwen | `/speckit.constitution` command |
| Hermes Agent | AGENTS.md callable workflow |
| Cline | prompt/workflow reference |

Replace `constitution` with `specify`, `clarify`, `plan`, `tasks`, `analyze`,
`checklist`, `implement`, or `taskstoissues`.

## Install Or Sync

Dry-run into a product repo:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync-speckit-skills.ps1 `
  -TargetRepo "C:\Users\adelm\SeaBridgeAI\manageesg-backend" `
  -Agent codex `
  -DryRun
```

Apply with backups when overwriting is explicitly desired:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync-speckit-skills.ps1 `
  -TargetRepo "C:\Users\adelm\SeaBridgeAI\manageesg-backend" `
  -Agent codex `
  -Backup `
  -Force
```

The script installs thin wrappers and SeaBridge `.specify/templates`. Existing
files are skipped unless `-Force` is set.

Cross-repo dry-run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync-speckit-cross-repo.ps1
```

Cross-repo apply, no overwrite:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync-speckit-cross-repo.ps1 -Apply
```

The cross-repo integrator auto-detects existing agent surfaces per repo, skips
missing repos, and excludes `_upstream` unless `-IncludeUpstream` is passed.

## Commands Included

Included:

- constitution
- specify
- clarify
- plan
- tasks
- analyze
- checklist
- implement
- taskstoissues, guarded and draft-first

Excluded:

- community extensions
- community presets
- newsletters and media
- full CLI packaging
- auto-commit or branch automation
- duplicate agent-specific command bodies

## Safety Rules

- No push, commit, issue creation, dependency install, migration, paid call, or
  production data mutation without explicit approval.
- Tenant isolation, source traceability, auditability, AI governance, and tests
  are mandatory considerations for SeaBridgeAI product work.
- `speckit-implement` must follow SeaBridgeAI DoD and verification before
  completion.
