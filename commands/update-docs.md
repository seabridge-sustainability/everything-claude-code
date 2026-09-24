---
description: Sync documentation from source-of-truth files such as scripts, schemas, routes, and exports.
---

# Update Documentation

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


Sync documentation with the codebase, generating from source-of-truth files.

## Step 1: Identify Sources of Truth

| Source | Generates |
|--------|-----------|
| `package.json` scripts | Available commands reference |
| `.env.example` | Environment variable documentation |
| `openapi.yaml` / route files | API endpoint reference |
| Source code exports | Public API documentation |
| `Dockerfile` / `docker-compose.yml` | Infrastructure setup docs |

## Step 2: Generate Script Reference

1. Read `package.json` (or `Makefile`, `Cargo.toml`, `pyproject.toml`)
2. Extract all scripts/commands with their descriptions
3. Generate a reference table:

```markdown
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Production build with type checking |
| `npm test` | Run test suite with coverage |
```

## Step 3: Generate Environment Documentation

1. Read `.env.example` (or `.env.template`, `.env.sample`)
2. Extract all variables with their purposes
3. Categorize as required vs optional
4. Document expected format and valid values

```markdown
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgres://user:pass@host:5432/db` |
| `LOG_LEVEL` | No | Logging verbosity (default: info) | `debug`, `info`, `warn`, `error` |
```

## Step 4: Update Contributing Guide

Generate or update `docs/CONTRIBUTING.md` with:
- Development environment setup (prerequisites, install steps)
- Available scripts and their purposes
- Testing procedures (how to run, how to write new tests)
- Code style enforcement (linter, formatter, pre-commit hooks)
- PR submission checklist

## Step 5: Update Runbook

Generate or update `docs/RUNBOOK.md` with:
- Deployment procedures (step-by-step)
- Health check endpoints and monitoring
- Common issues and their fixes
- Rollback procedures
- Alerting and escalation paths

## Step 6: Staleness Check

1. Find documentation files not modified in 90+ days
2. Cross-reference with recent source code changes
3. Flag potentially outdated docs for manual review

## Step 7: Show Summary

```
Documentation Update
──────────────────────────────
Updated:  docs/CONTRIBUTING.md (scripts table)
Updated:  docs/ENV.md (3 new variables)
Flagged:  docs/DEPLOY.md (142 days stale)
Skipped:  docs/API.md (no changes detected)
──────────────────────────────
```

## Rules

- **Single source of truth**: Always generate from code, never manually edit generated sections
- **Preserve manual sections**: Only update generated sections; leave hand-written prose intact
- **Mark generated content**: Use `<!-- AUTO-GENERATED -->` markers around generated sections
- **Don't create docs unprompted**: Only create new doc files if the command explicitly requests it

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
