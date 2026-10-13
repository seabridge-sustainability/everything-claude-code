---
name: sea-parallel-agent-dispatch
description: SeaBridgeAI parallel agent dispatch adapted from Superpowers for independent bounded subtasks, disjoint write scopes, review integration, and cross-agent compatibility.
---

# sea-parallel-agent-dispatch

## Purpose

Use parallelism only where it materially helps and tasks are independent.

## When To Call

Use when there are two or more independent investigations, tests, audits, or disjoint implementation slices and the user has authorized subagents or parallel agent work.

## Required Inputs

Independent domains; ownership boundaries; expected outputs; shared constraints; verification commands.

## Expected Outputs

Agent task prompts; returned findings; integration decisions; conflict notes; verification evidence.

## Mandatory Verification

Confirm disjoint write scopes, no duplicated work, no blocked critical path, and independent review of returned changes.

For authorized independent evaluators, give each the same completed source
revision and acceptance criteria. One checks functionality and integration;
another checks the affected security, tenant or scientific invariants. Ask for
evidence, concrete failures and limits, not agreement or a generic score. Keep
evaluators read-only; the lead remains the single writer and reconciles conflicts
against actual source and receipts. Changed source invalidates the review.
Do not manufacture a second evaluator, provider identity or successful judgment
from a fixture. Missing capacity means sequential review with an explicit limit.

## Failure Conditions

Fail if subagents are not authorized, tasks share state, immediate work is blocked on a delegated result, or agents would touch the same files unsafely.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Every delegated task inherits local-only, no-push, no-global-install, no-fabrication, auth/tenant, source-verification, and handoff rules.

## Cross-Agent Compatibility Notes

Codex spawn_agent only when the user explicitly asks for subagents. Other runtimes use their native agents or sequential local execution.

Task authorization must cover delegation; a risk classification is no permission
to spawn agents or make provider calls. Existing live-call deferrals and budgets
remain in force. No extra worktree, running-session restart or parallel shared
browser/Mongo write is implied. Use one active ECC goal and its proof record.

## Superpowers Adaptation

Partially adapts Superpowers dispatching-parallel-agents and subagent-driven-development within Codex delegation rules.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
