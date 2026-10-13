---
name: sea-frontend-design
description: SeaBridgeAI frontend design skill for enterprise sustainability dashboards, data-dense workflows, AI panels, route visibility, responsive UX, accessibility, and endpoint-backed claims.
---

# sea-frontend-design

## Purpose

Build credible, usable, accessible frontend workflows rather than decorative shells.

## When To Call

Use for manageesg-frontend, OpenSeaBri UI, dashboards, reports, charts, forms, filters, AI assistant panels, and frontend reviews.

## Required Inputs

Route; exact component paths; backend caller; available data shape; design conventions; target user workflow; requested delta and protected behavior; before/after acceptance scenarios; desktop/mobile viewports; required UI states. Resolve material ambiguity with `sea-requirements-discovery`, using current source first. A sufficient existing ticket needs no repeated interview or timed ceremony.

## Expected Outputs

Reachable UI; honest loading/empty/error states; responsive behavior; API/state verification notes.

## Mandatory Verification

Every changed UI component/layout requires the [existing browser workflow](../../agent-tooling/skills/seabridge-browser-autonomy/SKILL.md): source-bound specification before editing, before/after desktop/mobile screenshots and successful video/trace playback on D: only. Missing prerequisites block the affected proof; never substitute a fixture, 401 or screenshot for signed-in behavior/persistence. Check route/menu visibility, API contracts, filter propagation, buttons, text overlap and keyboard flow. Compare approved layout/copy/tokens and call out missing baseline approval; do not redesign adjacent surfaces.

## Failure Conditions

Fail if UI displays fake data as real, buttons are dead, route is hidden unintentionally, charts ignore filters, or claims are not endpoint-backed.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Sustainability metrics must show provenance or missing status. Demo/mock data must be visibly demo-only.

## Cross-Agent Compatibility Notes

Claude/Codex/Gemini/OpenCode/Cursor/Copilot CLI should follow the same UI gates; use Playwright where available for repeatable proof.

## Superpowers Adaptation

Partially adapts Superpowers brainstorming, writing-plans, TDD, and verification-before-completion into frontend workflow gates.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
