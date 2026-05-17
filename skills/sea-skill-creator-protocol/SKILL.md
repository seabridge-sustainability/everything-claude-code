---
name: sea-skill-creator-protocol
description: SeaBridgeAI skill creation protocol adapted from Superpowers writing-skills and Codex skill-creator for canonical skills, wrappers, validation, and cross-agent compatibility.
---

# sea-skill-creator-protocol

## Purpose

Create or update reusable SeaBridgeAI skills without duplication, drift, or bloated repo instructions.

## When To Call

Use when creating, editing, validating, or wrapping skills, workflows, checklists, prompts, or coding-agent methodology.

## Required Inputs

Skill gap; target agents; existing related skills; canonical path; verification plan.

## Expected Outputs

Canonical skills/sea-*/SKILL.md; .agents wrapper; validation report entry; conflicts resolved.

## Mandatory Verification

Check YAML frontmatter, required sections, wrapper existence, duplicate names, stale copied bodies, clear triggers, and cross-agent notes.

## Failure Conditions

Fail if canonical and wrapper diverge, skill name conflicts with different behavior, missing verification section, or instructions permit pushes/commits/global installs without approval.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Any skill touching sustainability or AI must include no-fabrication, endpoint/database/source verification, auth/tenant gates, missing-data behavior, and concise handoff rules.

## Cross-Agent Compatibility Notes

Claude Code, Codex, Gemini, OpenCode, Cursor, and Copilot CLI should discover the same skill name and reach the canonical ECC body.

## Superpowers Adaptation

Fully embeds Superpowers writing-skills, adapted to SeaBridgeAI canonical/wrapper structure.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
