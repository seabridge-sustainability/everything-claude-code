---
name: sea-context-hygiene
description: SeaBridgeAI context hygiene for long sessions, large logs, Playwright artifacts, multi-agent handoffs, markdown state, compaction, and source-preserving summaries.
---

# sea-context-hygiene

## Purpose

Keep long SeaBridgeAI sessions concise, recoverable, and source-attributed.

## When To Call

Use for long-running tasks, large logs, Playwright output, multi-agent work, handoffs, compaction, or validation reports.

## Required Inputs

Current goal; files changed; commands run; decisions; blockers; next step.

## Expected Outputs

Compact state summary; artifact paths; next action; unverified items.

## Mandatory Verification

Confirm summary lists files, tests, decisions, blockers, and next step. Preserve citations/provenance for sustainability findings.

## GSD Controlled Execution

Call `sea-gsd-controlled-execution` when context rot is likely: long sessions, many phases, broad planning, repeated verification failures, or multi-agent handoffs. Store durable state in GSD-style artifacts instead of relying on chat history.

Every artifact must preserve scope, assumptions, user-approved decisions, files touched, tests run, unresolved risks, and next action.

## Failure Conditions

Fail if raw logs overwhelm context, evidence is omitted, data caveats are compressed away, or next action is vague.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Do not compress away source, scenario, timeframe, unit, confidence, provisional/demo status, or missing-data caveats.

## Cross-Agent Compatibility Notes

All agents should use markdown handoffs. Claude hooks or slash commands are optional and never required.

## Local LLM Notes

When summarising sessions that involved local LLM inference or training, preserve: model name, Studio port, LOCAL_LLM_ENABLED state, and whether outputs were verified or provisional. Do not compress away VRAM or performance findings — they inform future model selection.

## Superpowers Adaptation

Partially adapts Superpowers writing-plans and finishing-development-branch summaries for SeaBridgeAI handoffs.
