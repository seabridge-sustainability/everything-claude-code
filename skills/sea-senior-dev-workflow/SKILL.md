---
name: sea-senior-dev-workflow
description: SeaBridgeAI senior engineering workflow adapted from Superpowers for local-only planning, TDD, implementation, review, and verified completion across backend, frontend, AI, QA, security, sustainability, and cross-repo work.
---

# sea-senior-dev-workflow

## Purpose

Run the default SeaBridgeAI engineering loop with Superpowers discipline: understand intent, scope the smallest change, plan when needed, implement surgically, review, and verify before completion.

## When To Call

Use for any non-trivial SeaBridgeAI code, docs, workflow, agent, test, QA, or cross-repo change.

## Required Inputs

User request and acceptance criteria; local repo instructions; dirty-worktree status; relevant endpoint, database, UI, AI, or domain surface; approval constraints.

## Expected Outputs

Scoped plan or direct execution note; changed files; tests and checks run; security/data/domain review notes; concise completion or blocker summary.

## Mandatory Verification

Run focused tests or contract checks; inspect git diff; verify endpoint/database/source/auth/tenant behavior when relevant; run domain and security gates for sensitive work.

Self-verification loop:

1. Plan before edits with assumptions, target files, and done criteria.
2. Write or update relevant tests when practical.
3. Prove the test fails on old behavior when practical; document why if skipped.
4. Implement the smallest scoped fix.
5. Prove the focused test passes after the fix.
6. Broaden tests when shared behavior, auth, data, AI output, or UI routing risk warrants it.
7. Document skipped tests and never claim completion from code changes alone.

## Controlled Auto Mode

Allowed without repeated prompts: formatting, lint fixes, typecheck fixes, test discovery, import cleanup, small refactors with tests, moving logs/reports into approved folders, docs link/path fixes, and safe read-only scans.

Requires explicit approval: commits, pushes, dependency installs, migrations, production data changes, auth/security changes, billing changes, destructive file operations, yolo/autonomous/dangerous permission modes, global installs, and long-running training jobs.

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

Fully embeds Superpowers using-superpowers, brainstorming, writing-plans, test-driven-development, requesting-code-review, and verification-before-completion as SeaBridgeAI local-only gates.
