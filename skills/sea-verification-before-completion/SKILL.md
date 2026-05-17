---
name: sea-verification-before-completion
description: SeaBridgeAI verification-before-completion adapted from Superpowers requiring fresh evidence before claiming work is done, fixed, passing, production-ready, or wired.
---

# sea-verification-before-completion

## Purpose

Prevent completion claims without fresh proof.

## When To Call

Use before saying done, fixed, passing, wired, production-ready, reviewed, safe, or ready to merge.

## Required Inputs

Claim to make; command or observable check proving it; files changed; risks.

## Expected Outputs

Verification evidence; pass/fail status; skipped checks with reason; remaining risks.

## Mandatory Verification

Run fresh focused commands, inspect outputs and exit codes, test original symptom, check diff, and record exact commands.

## Failure Conditions

Fail if verification is stale, partial, assumed, skipped without reason, or contradicted by logs/tests/browser output.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Completion claims for sustainability data require source/provenance and missing-data checks, not only UI rendering.

## Cross-Agent Compatibility Notes

Every agent runtime must provide equivalent proof even when exact commands differ.

## Superpowers Adaptation

Fully embeds Superpowers verification-before-completion as a mandatory SeaBridgeAI gate.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
