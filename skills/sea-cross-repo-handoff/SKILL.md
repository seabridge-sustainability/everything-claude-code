---
name: sea-cross-repo-handoff
description: SeaBridgeAI cross-repo handoff for backend, frontend, OpenSeaBri, ECC, upstream mirrors, shared contracts, repo pointers, and continuation by another coding agent.
---

# sea-cross-repo-handoff

## Purpose

Keep multi-repo work coherent, truthfully scoped, and resumable.

## When To Call

Use when work spans backend, frontend, OpenSeaBri, ECC, _upstream, or shared agent systems.

## Required Inputs

Goal; repos touched; files changed; contracts; tests/checks; unverified gaps.

## Expected Outputs

Concise handoff; repo contract status; changed files; manual approvals or next steps.

## Mandatory Verification

Confirm every repo path exists; contract path/payload/response/auth/tenant/UI entry are checked; product repos point to ECC rather than divergent copies.

## GSD Controlled Execution

Call `sea-gsd-controlled-execution` when cross-repo work needs milestones, phases, or structured continuation artifacts. Use GSD artifacts to preserve repo contracts, phase status, files touched, checks run, dropped requirements, and next action.

Do not duplicate full GSD instructions into product repos. Product repos should point to ECC and carry only repo-specific overrides.

## Failure Conditions

Fail if a repo is assumed but not checked, a contract is unverified, a product repo contains divergent copied skill bodies, or a push/commit/install occurred without approval.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Handoffs must preserve source/provenance caveats and never upgrade demo/provisional sustainability data to verified status.

## Cross-Agent Compatibility Notes

All agents should write portable markdown that Claude Code, Codex, Gemini, OpenCode, Cursor, and Copilot CLI can follow.

## Superpowers Adaptation

Partially adapts Superpowers finishing-a-development-branch and requesting-code-review into local-only cross-repo handoffs.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
