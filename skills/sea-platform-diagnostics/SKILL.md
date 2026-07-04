---
name: sea-platform-diagnostics
description: SeaBridgeAI platform-wide module status diagnostics for manageesg-backend and manageesg-frontend -- what's implemented, partial, missing, or risky before scoping new work.
---

# sea-platform-diagnostics

## Purpose

Produce a truthful, evidence-based read of current platform module status
before proposing, planning, or claiming new work. Prevents restating stale
prior-report claims as current fact.

## When To Call

Before writing a new platform recommendation/improvement doc, before
scoping a new feature that touches more than one module, when asked
"what's missing" or "what's the current state of X", or when resuming
work from a `docs/reports/platform-diagnostics/*.md` report older than the
current session.

## Required Inputs

Target module(s) or "full platform"; the most recent
`docs/reports/platform-diagnostics/*.md` report if one exists; current
`git log`/`git status` on `manageesg-backend` and `manageesg-frontend`.

## Expected Outputs

A dated report under `manageesg-backend/docs/reports/platform-diagnostics/`
with a per-module status table using exactly these categories:
implemented-and-verified, implemented-but-unverified, partial, missing,
risky/regressed -- each row backed by a `file:line` citation.

## Mandatory Verification

Run `git fetch --prune` and `git status --short --branch` on both repos
before starting. Re-verify every claim from a prior report against the
current file state in this session -- do not repeat a prior report's
status without re-reading the cited file. Re-run any test referenced as
"passing" before citing it; do not cite stale test results.

## Failure Conditions

Fail if a status claim has no `file:line` citation, if a prior report's
claim is copied forward without re-verification, or if uncommitted work
discovered during the check is reset/stashed/discarded to produce a
"clean" baseline instead of being reported and preserved.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Never mark an AI/sustainability data path "verified" without a fresh
passing test run in this session; never invent a completeness percentage
or coverage number not backed by an actual query result.

## Cross-Agent Compatibility Notes

Output is a portable markdown report; no tool-specific syntax.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
