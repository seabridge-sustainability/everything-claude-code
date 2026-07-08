---
name: sea-grill-me-codex
description: SeaBridgeAI adaptation of the "Grill-Me-Codex" workflow — Claude interviews and adversarially plans with Codex CLI, then hands execution to Codex and reviews the result. Use for architecturally significant or ambiguous feature work when Codex CLI is available, to cut token cost versus single-model execution.
---

# sea-grill-me-codex

## Purpose

Combine Claude's planning/review strength with Codex's lower-cost execution
for work that is architecturally significant enough to justify a second
model in the loop. This is a cost-and-quality optimization for a specific
complexity tier, not a replacement for `sea-senior-dev-workflow` on ordinary
tasks.

## Complexity Gate — When To Use This Instead Of The Default Workflow

Apply the ECC skill-selection default first (`AGENTS_SYSTEM.md`): simple
tasks (≤2 files, no new dependency, no auth/tenant/billing/migration/
security/production-data/destructive/AI-grounding/provenance concern) need
no skill at all. Do not use this skill for simple tasks.

For non-trivial work, choose by tier:

1. **Ordinary multi-phase work** (the canonical trigger: touches more than 2
   files, adds a dependency, requires a schema/migration change, or spans
   more than one repo) — default to `sea-senior-dev-workflow` alone. This
   skill is optional here: use it only if the user asks for it or explicitly
   wants Codex-cost-efficient execution.
2. **Architecturally significant or ambiguous work** — a new feature area or
   module, a design with genuinely competing implementation approaches, or
   cross-repo architecture decisions where a second model's disagreement
   would change the plan — this skill is the **recommended default** when
   Codex CLI is installed, authenticated, and the user has authorized
   multi-agent dispatch for the session (per `sea-parallel-agent-dispatch`).
   Propose it explicitly before starting; do not invoke Codex silently.
3. **Codex CLI unavailable, unauthenticated, or the user declines** — fall
   back to `sea-senior-dev-workflow` (optionally paired with `grill-me` for
   the interview stage alone). Never block the task on Codex being present.

This skill requires a harness that can shell out to a separate `codex`
process (Claude Code, or another harness with equivalent subprocess access).
If the active harness IS Codex itself, this workflow does not apply — use
`sea-senior-dev-workflow` directly.

## Required Inputs

User's feature/change request; repo(s) in scope; whether Codex CLI is
installed and authenticated (`codex --version`); explicit user authorization
to dispatch a second model for this task.

## Procedure

### Stage 1 — Interview (Claude, Grill-Me)

Run the `grill-me` skill against the request: interrogate ambiguous
requirements, hidden assumptions, missing acceptance criteria, and risk
surfaces one question at a time, preferring codebase inspection over asking
when the answer is discoverable locally. Exit this stage with a written
plan draft: goal, Definition of Done, affected files/systems, risks,
approach.

### Stage 2 — Adversarial Planning (Claude ⇄ Codex, consensus loop)

1. Check the installed Codex CLI's non-interactive invocation syntax first —
   do not assume flags; run `codex --help` / `codex exec --help` (exact name
   varies by version) and use what is actually supported.
2. Create the round-by-round consensus log as you go (see Consensus Log
   Artifact below) — do not reconstruct it after the fact.
3. Send the plan draft to Codex as a **read-only critique** request: ask it
   to identify weaknesses, propose alternatives, and flag anything it would
   implement differently, without writing code. Prefer a read-only sandbox
   mode for this stage if the CLI supports it (mirrors `sea-security-reviewer`
   read-only critique posture).
4. Integrate Codex's feedback into the plan. If Codex's critique changes the
   approach, note why. Append the round to the consensus log.
5. Repeat steps 3-4 until Codex has no further objections, or **5 rounds**
   have run, whichever comes first.
6. If round 5 ends without consensus: document the specific disagreement in
   the log, apply Claude's best judgment as tie-break (Claude owns the plan),
   and state the residual disagreement to the user before proceeding. Do not
   silently pick a side.

### Consensus Log Artifact

Write each round's exchange (Claude's proposal, Codex's response, what
changed and why) to a single markdown file as the rounds happen, per the
Repository Root Organization Policy's "Conflict logs" bucket:
`docs/reports/conflicts/<task-slug>-grill-me-codex-log.md`. This is the
durable record of how the two models reached (or failed to reach) consensus
— do not skip it to save a round.

### Stage 2.5 — Build Checkpoint (explicit user choice, always)

Once Stage 2 ends (consensus or documented disagreement), **stop and present
the consensus plan plus three options** — do not default to any of them
without the user picking:

1. **Codex builds** — hand the plan to Codex CLI (the token-efficient path
   this skill exists for).
2. **Claude builds** — proceed with the normal `sea-senior-dev-workflow`
   implementation loop instead, using the same consensus plan.
3. **Stop here** — the plan is the deliverable; do not implement yet.

If the user's original request already named the execution path (e.g. "use
Codex to build this"), that counts as the answer — do not re-ask, but still
state which path you're taking before proceeding.

### Stage 3 — Execution (Codex implements, if chosen)

Hand the consensus plan to Codex CLI in the repo's normal workspace-write
mode. Scope Codex to the agreed plan only — no unrelated refactors, no scope
expansion beyond what stage 1-2 agreed. This stage does not grant any
approval beyond what `.codex/config.toml` and `AGENTS_SYSTEM.md` already
allow: if Codex's non-interactive execution would require bypassing its own
approval gate (e.g. an unattended-approval profile) to run headlessly, stop
and get the user's explicit approval for that specific run, or have the user
run Codex interactively instead. Never invoke an unattended/full-auto Codex
profile without that explicit approval.

### Stage 4 — Review And Refinement (Claude)

Review Codex's diff against the consensus plan and the repo's normal
verification loop (focused tests/checks, `git diff` inspection,
endpoint/auth/tenant checks where relevant — same bar as
`sea-senior-dev-workflow`'s verification step).

- If issues are found: send specific, concrete feedback to Codex for a fix
  pass. Cap at **2 feedback iterations**.
- If issues remain after 2 iterations: Claude takes over and finishes the
  implementation directly rather than continuing the loop.
- Before any done/fixed/production-ready claim, apply
  `sea-verification-before-completion` — mandatory, not waived by this
  skill.
- **Stop and ask before committing.** Present the review summary (what
  Codex built, what deviated from plan and why, verification results) and
  let the user choose to commit or inspect further first — never commit
  automatically, even after a clean review.

## Guardrails

- Never authorize commits, pushes, dependency installs, migrations,
  production data changes, or global installs through this skill beyond
  what the user has already approved for the session.
- Never use an unattended-approval Codex profile to avoid interactive
  prompts; stop and ask instead.
- Do not let Codex's execution stage silently expand scope beyond the
  stage 1-2 consensus plan.
- If Codex CLI is not installed, not authenticated, or the user declines
  multi-agent dispatch, fall back cleanly — do not present this as a failed
  task.

## Related Skills

`grill-me` for the interview stage; `sea-parallel-agent-dispatch` for the
authorization model this skill's Codex dispatch follows; `sea-senior-dev-workflow`
as the default single-model path; `sea-verification-before-completion` as
the mandatory close-out gate.

A lighter-weight variant exists conceptually — Claude plans, Codex builds
directly, with no adversarial-planning stage — for when the plan is already
clear and a second model's critique wouldn't change it. This skill does not
implement that variant; if it's wanted, request it as a separate skill
rather than skipping Stage 2 of this one.

## Invocation

Primary entry point: `/grill-me-codex <what to build>` (see
`commands/grill-me-codex.md`). Agents without slash-command support can
invoke this skill directly by name when the complexity gate above applies.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
