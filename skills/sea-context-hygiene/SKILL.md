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

## Outcome-First Handoffs

For a resumed long goal, lead with what the user can inspect now and what has
not been demonstrated. Then record the active objective, last user-visible
receipt, repository state, inherited claims classified as current/stale/
unverified/contradicted, spend state, blockers, safe independent work, and the
exact next operation. Activity totals come afterward.

For every long or inherited goal, create or refresh
`.ecc/goal/resume-receipt.yaml` and run `ecc goal validate` before continuing.
Do not make this conditional on the predecessor mentioning the control. Never
inherit a percentage, completion claim, or forecast merely because a handoff
states it.

## GSD Controlled Execution

Call `sea-gsd-controlled-execution` when context rot is likely: long sessions, many phases, broad planning, repeated verification failures, or multi-agent handoffs. Store durable state in GSD-style artifacts instead of relying on chat history.

Every artifact must preserve scope, assumptions, user-approved decisions, files touched, tests run, unresolved risks, and next action.

## Failure Conditions

Fail if raw logs overwhelm context, evidence is omitted, data caveats are compressed away, the handoff leads with activity while the outcome is absent, inherited claims are not re-verified, or next action is vague.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Do not compress away source, scenario, timeframe, unit, confidence, provisional/demo status, or missing-data caveats.

## Cross-Agent Compatibility Notes

All agents should use markdown handoffs. Claude hooks or slash commands are optional and never required.

## Local LLM Notes

When summarising sessions that involved local LLM inference or training, preserve: model name, Studio port, LOCAL_LLM_ENABLED state, and whether outputs were verified or provisional. Do not compress away VRAM or performance findings â€” they inform future model selection.

## Superpowers Adaptation

Partially adapts Superpowers writing-plans and finishing-development-branch summaries for SeaBridgeAI handoffs.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
