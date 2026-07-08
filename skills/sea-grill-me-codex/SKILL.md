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
2. Send the plan draft to Codex as a **read-only critique** request: ask it
   to identify weaknesses, propose alternatives, and flag anything it would
   implement differently, without writing code. Prefer a read-only sandbox
   mode for this stage if the CLI supports it (mirrors `sea-security-reviewer`
   read-only critique posture).
3. Integrate Codex's feedback into the plan. If Codex's critique changes the
   approach, note why.
4. Repeat steps 2-3 until Codex has no further objections, or **5 rounds**
   have run, whichever comes first.
5. If round 5 ends without consensus: document the specific disagreement,
   apply Claude's best judgment as tie-break (Claude owns the plan), and
   state the residual disagreement to the user before proceeding. Do not
   silently pick a side.

### Stage 3 — Execution (Codex implements)

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

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
