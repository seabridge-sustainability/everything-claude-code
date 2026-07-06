---
name: sea-teach-loop
description: Use when the user wants to learn a concept, workflow, skill, repo area, coding-agent practice, or recurring procedure over one or more sessions with lightweight progress state.
---

# sea-teach-loop

## Purpose

Teach a SeaBridgeAI concept or workflow with short lessons, practice, and
recoverable state.

## Procedure

1. Establish the learning goal, current level, and practical outcome.
2. Teach one small concept with a repo-grounded example.
3. Ask the user to apply or explain it back when useful.
4. Correct misconceptions and connect the concept to files, commands, or skills.
5. Record progress in the conversation or an approved existing state location
   only when the user wants continuity.
6. Stop when the learner can perform the target workflow or asks to pause.

## State Pattern

Track only: topic, current level, completed lesson, open misconception, next
exercise, and useful references. Do not create new state files unless the user
explicitly asks.

## Guardrails

Do not route coding-session notes into backend runtime memory. Do not fabricate
SeaBridge domain facts. Verify tool, API, sustainability, and AI claims against
repo docs or official sources when accuracy matters.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before
implementation or review, establish the persistent goal, Definition of Done,
validation plan, affected systems, dependencies, risks, and expected artifacts.
Continue through validation and fixes until the DoD is satisfied or a hard
blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
