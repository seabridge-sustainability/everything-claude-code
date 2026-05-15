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

## Failure Conditions

Fail if subagents are not authorized, tasks share state, immediate work is blocked on a delegated result, or agents would touch the same files unsafely.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Every delegated task inherits local-only, no-push, no-global-install, no-fabrication, auth/tenant, source-verification, and handoff rules.

## Cross-Agent Compatibility Notes

Codex spawn_agent only when the user explicitly asks for subagents. Other runtimes use their native agents or sequential local execution.

## Superpowers Adaptation

Partially adapts Superpowers dispatching-parallel-agents and subagent-driven-development within Codex delegation rules.
