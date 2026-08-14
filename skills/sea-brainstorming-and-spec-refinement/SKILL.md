---
name: sea-brainstorming-and-spec-refinement
description: SeaBridgeAI brainstorming and spec refinement adapted from Superpowers for clarifying intent, alternatives, acceptance criteria, and sustainability data constraints before broad implementation.
---

# sea-brainstorming-and-spec-refinement

## Purpose

Turn rough ideas into scoped, testable specs before broad implementation.

## When To Call

Use before creating major features, changing behavior, building new workflows, or when requirements are ambiguous.

## Required Inputs

Initial idea; target repo; users; constraints; known data sources; approval boundaries.

## Expected Outputs

Refined spec; alternatives/tradeoffs; acceptance criteria; verification plan; out-of-scope list.

## Mandatory Verification

Check spec against local code, endpoints, database/source availability, auth/tenant rules, sustainability data integrity, and user approval when scope is broad.

## Failure Conditions

Stop if the design requires unapproved live costs, pushes, global installs, fabricated data, or unresolved product-contract ambiguity.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Spec must identify source data, missing-data behavior, units/scenarios/timeframes, and whether values are verified, provisional, or demo.

## Cross-Agent Compatibility Notes

Use conversational questions in every agent. Claude/Codex subagents are optional and not required for spec refinement.

## Superpowers Adaptation

Fully embeds Superpowers brainstorming, adapted so small fixes can proceed directly but broad work must define done and verification.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
