---
name: sea-cross-repo-contract-map
description: Map one API route, schema, or shared type across manageesg-backend, manageesg-frontend, and openseabri to catch contract drift before or after a change.
---

# sea-cross-repo-contract-map

## Purpose

Prove a specific contract (route path, request/response schema, shared
type) is consistent across every repo that consumes it, rather than
assuming consistency from a doc description.

## When To Call

Before or after changing a shared endpoint/schema/model shape; when a
frontend build or type error suggests backend/frontend drift; during a
cross-repo audit; when `sea-cross-repo-handoff` flags an unverified
contract.

## Required Inputs

The contract identifier (route path, model/schema name) and the list of
repos that consume it (default: `manageesg-backend`, `manageesg-frontend`;
add `openseabri` if it shares the contract).

## Expected Outputs

A table of `{repo, file:line, current shape}` plus an explicit drift
finding list (fields present in one repo and missing/renamed in another).

## Mandatory Verification

Read the actual current source in every listed repo in this session --
grep/read the real endpoint definition, the real Pydantic/TypeScript
shape, and the real caller. Do not infer a repo's contract shape from
another repo's usage or from a prior doc.

## Failure Conditions

Fail if a repo in scope is assumed unchecked, if the map is written from
memory/training data rather than files read in this session, or if a
found drift is left unreported because "it's probably fine."

## SeaBridgeAI Sustainability And Data-Integrity Requirements

If the contract carries sustainability data (units, source, confidence,
period), confirm those fields survive unchanged across every hop in the
map, not just the payload's primary value fields.

## Cross-Agent Compatibility Notes

Output is a portable markdown table any coding agent can act on.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
