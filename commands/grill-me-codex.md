---
description: Interview-driven plan, Claude/Codex adversarial consensus, Codex execution, Claude review — for architecturally significant work.
---

# Grill Me Codex Command

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


Runs the `sea-grill-me-codex` skill: deep interview, Claude/Codex adversarial
plan consensus, an explicit build-path checkpoint, Codex execution, and
Claude review. Full procedure lives in
`skills/sea-grill-me-codex/SKILL.md` — this command is the entry point, not
a second copy of the behavior.

## Usage

`/grill-me-codex <what you want to build>`

## Before Running

Confirm the complexity gate in `skills/sea-grill-me-codex/SKILL.md` actually
applies: this is for architecturally significant or ambiguous work, not
routine changes. For a simple task (≤2 files, no new dependency, no
auth/tenant/billing/migration/security/production-data/destructive/
AI-grounding/provenance concern), say so and proceed without this command
instead of running the full workflow.

Confirm Codex CLI is installed and authenticated (`codex --version`). If it
is not, or the user declines dispatching a second model, do not run this
command — fall back to `sea-senior-dev-workflow` directly and say why.

## What Happens

1. **Interview** (`grill-me`) — deep, codebase-inspecting Q&A until the
   request is unambiguous. Produces a plan draft.
2. **Adversarial planning** — Claude and Codex CLI go back and forth for up
   to 5 rounds until they converge on the plan (or Claude documents the
   residual disagreement and tie-breaks). Every round is logged to
   `docs/reports/conflicts/<task-slug>-grill-me-codex-log.md`.
3. **Build checkpoint** — stop and ask: Codex builds it, Claude builds it,
   or stop here with just the plan. Never assume.
4. **Execution** (if Codex was chosen) — Codex CLI implements the consensus
   plan, scoped to what was agreed. No unattended-approval profile without
   explicit user approval for that run.
5. **Review** — Claude checks Codex's diff against the plan and runs the
   normal verification loop, sending back up to 2 rounds of fix feedback
   before taking over itself. Applies `sea-verification-before-completion`
   before any done claim, then stops and asks before committing.

## Arguments

$ARGUMENTS: `<what you want to build>` — a feature/change description, as
specific as you can make it. The interview stage will fill in the rest.

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
