---
name: sea-systematic-debugging
description: SeaBridgeAI systematic debugging adapted from Superpowers for root-cause analysis across FastAPI, Next.js, AI agents, databases, integrations, browser QA, and cross-repo contracts.
---

# sea-systematic-debugging

## Purpose

Find root causes with evidence instead of guessing.

## When To Call

Use for failing tests, runtime errors, broken routes, UI bugs, auth failures, agent hallucinations, data mismatches, and flaky browser behavior.

## Required Inputs

Observed symptom; reproduction path; logs; recent changes; affected repo(s); expected behavior.

## Expected Outputs

Evidence trail; narrowed hypothesis; root cause; minimal fix; regression test or verification command.

## Mandatory Verification

Reproduce the symptom, inspect boundaries, add temporary diagnostics only when needed, fix minimally, and verify the original symptom plus regression coverage.

## Failure Conditions

Fail if unable to reproduce, evidence is missing, fix is speculative, logs expose secrets, or root cause crosses unverified repo boundaries.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

For sustainability issues, verify source records and calculation assumptions before changing displayed values.

## Cross-Agent Compatibility Notes

All agents should use local logs/tests/browser checks. Parallel agents may investigate independent symptoms only with explicit authorization.

## Superpowers Adaptation

Fully embeds Superpowers systematic-debugging with SeaBridgeAI backend/frontend/AI data boundaries.
