---
description: Interview-driven plan, Claude/Codex adversarial consensus, Codex execution, Claude review — for architecturally significant work.
---

# Grill Me Codex Command

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
