---
description: Scan project structure and generate token-lean architecture codemaps.
---

# Update Codemaps

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


Analyze the codebase structure and generate token-lean architecture documentation.

## Step 1: Scan Project Structure

1. Identify the project type (monorepo, single app, library, microservice)
2. Find all source directories (src/, lib/, app/, packages/)
3. Map entry points (main.ts, index.ts, app.py, main.go, etc.)

## Step 2: Generate Codemaps

Create or update codemaps in `docs/CODEMAPS/` (or `.reports/codemaps/`):

| File | Contents |
|------|----------|
| `architecture.md` | High-level system diagram, service boundaries, data flow |
| `backend.md` | API routes, middleware chain, service → repository mapping |
| `frontend.md` | Page tree, component hierarchy, state management flow |
| `data.md` | Database tables, relationships, migration history |
| `dependencies.md` | External services, third-party integrations, shared libraries |

### Codemap Format

Each codemap should be token-lean — optimized for AI context consumption:

```markdown
# Backend Architecture

## Routes
POST /api/users → UserController.create → UserService.create → UserRepo.insert
GET  /api/users/:id → UserController.get → UserService.findById → UserRepo.findById

## Key Files
src/services/user.ts (business logic, 120 lines)
src/repos/user.ts (database access, 80 lines)

## Dependencies
- PostgreSQL (primary data store)
- Redis (session cache, rate limiting)
- Stripe (payment processing)
```

## Step 3: Diff Detection

1. If previous codemaps exist, calculate the diff percentage
2. If changes > 30%, show the diff and request user approval before overwriting
3. If changes <= 30%, update in place

## Step 4: Add Metadata

Add a freshness header to each codemap:

```markdown
<!-- Generated: 2026-02-11 | Files scanned: 142 | Token estimate: ~800 -->
```

## Step 5: Save Analysis Report

Write a summary to `.reports/codemap-diff.txt`:
- Files added/removed/modified since last scan
- New dependencies detected
- Architecture changes (new routes, new services, etc.)
- Staleness warnings for docs not updated in 90+ days

## Tips

- Focus on **high-level structure**, not implementation details
- Prefer **file paths and function signatures** over full code blocks
- Keep each codemap under **1000 tokens** for efficient context loading
- Use ASCII diagrams for data flow instead of verbose descriptions
- Run after major feature additions or refactoring sessions

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
