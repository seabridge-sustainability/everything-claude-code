---
name: sea-senior-dev-workflow
description: SeaBridgeAI senior engineering workflow adapted from Superpowers for local-only planning, TDD, implementation, review, and verified completion across backend, frontend, AI, QA, security, sustainability, and cross-repo work.
---

# sea-senior-dev-workflow

## Purpose

Run the default SeaBridgeAI engineering loop with Superpowers discipline:
understand intent, scope the smallest change, plan when needed, implement
surgically, review, and verify before completion. This skill is a thin
orchestrator: it sequences its sibling skills instead of restating them, so
each rule has exactly one home.

## When To Call

Use for any non-trivial SeaBridgeAI code, docs, workflow, agent, test, QA, or cross-repo change.

## Required Inputs

User request and acceptance criteria; local repo instructions; dirty-worktree status; relevant endpoint, database, UI, AI, or domain surface; approval constraints.

## Orchestration

Apply the phases in order, loading each sibling skill only when its phase is
actually reached (the one-skill default in `AGENTS_SYSTEM.md` treats this
orchestrator plus the phase skill it loads as one routed unit, not a
violation):

1. Clarify — if the request is broad or ambiguous, Load:
   `skills/sea-brainstorming-and-spec-refinement/SKILL.md`; otherwise state
   assumptions and done criteria directly.
2. Implement with tests — for behavior changes, Load:
   `skills/sea-test-driven-development/SKILL.md` (red/green when practical,
   smallest scoped fix). For docs/config-only work, substitute static checks
   per `AGENTS_SYSTEM.md`.
3. Review — when review feedback exists or risky surfaces are touched, Load:
   `skills/sea-code-review-response/SKILL.md`; route domain/security review
   per the Mandatory Skill Triggers in `SEABRIDGE_CODING_AGENT_SYSTEM.md`.
4. Verify and close — always Load:
   `skills/sea-verification-before-completion/SKILL.md` before any done/fixed
   claim (mandatory trigger; never waived).

The step-level self-verification loop (plan before edits, failing test when
practical, focused pass, risk-based broadening, documented skips, no
completion claims from code changes alone) is canonical in ECC
`AGENTS_SYSTEM.md` ("Self-Verification Loop") — follow it there.

## Expected Outputs

Scoped plan or direct execution note; changed files; tests and checks run; security/data/domain review notes; concise completion or blocker summary.

## Mandatory Verification

Run focused tests or contract checks; inspect git diff; verify endpoint/database/source/auth/tenant behavior when relevant; run domain and security gates for sensitive work.

## Controlled Auto Mode

Follow the canonical Controlled Auto Mode Policy in ECC `AGENTS_SYSTEM.md`:
formatting/lint/typecheck fixes, test discovery, import cleanup, small tested
refactors, approved report/log moves, docs path fixes, and read-only scans are
allowed; commits, pushes, installs, migrations, production data,
auth/security/billing changes, destructive operations, autonomous modes, and
long-running jobs require explicit approval.

## GSD Controlled Execution

For complex multi-phase work, call `sea-gsd-controlled-execution` before implementation. Use it to decompose phases, create structured artifacts, detect dropped requirements, verify each phase, and keep state concise.

GSD does not authorize autonomous/yolo execution, auto-commit, push, PR creation, global installs, live calls, or cleanup without explicit approval.

## Failure Conditions

Stop on unclear acceptance criteria, missing approval for push/commit/global install/live cost, failing verification, fabricated or ungrounded sustainability data, or unresolved auth/tenant risks.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

No fabricated ESG, emissions, LCA, climate-risk, procurement, targets, utility, due-diligence, or financial data. Missing source data stays missing or provisional.

## Cross-Agent Compatibility Notes

Claude Code may use slash commands and subagents. Codex uses local tools and optional spawn_agent only when explicitly authorized. Gemini, OpenCode, Cursor, and Copilot CLI should load the same skill name and execute equivalent local checks.

## Local LLM Notes

When a task involves AI agent routing: verify LOCAL_LLM_ENABLED state in .env before enabling local inference. For fine-tuning tasks, invoke sea-local-llm-training and confirm VRAM budget (16 GB limit). Never route to local endpoint without confirming Studio is healthy (check-unsloth.ps1).

## Superpowers Adaptation

Composes (rather than embedding) the Superpowers-derived siblings:
`sea-brainstorming-and-spec-refinement`, `sea-test-driven-development`,
`sea-code-review-response`, and `sea-verification-before-completion`, plus the
canonical self-verification and controlled-auto policies in `AGENTS_SYSTEM.md`.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
