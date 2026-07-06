---
name: sea-skill-map
description: Use when choosing, auditing, or explaining which SeaBridgeAI procedural skills, workflows, checklists, or reviewer lenses should apply to a task without loading the full skill catalog.
---

# sea-skill-map

## Purpose

Select the smallest useful procedural skill set for a task.

## Procedure

1. Read the user request and repo-local instructions.
2. Inspect ECC skill metadata dynamically with `rg` or available skill search.
3. Classify the task: queue/task, design/spec, implementation, debugging,
   verification, review, security, AI/data, sustainability, docs, handoff, or
   teaching.
4. Pick the smallest skill/workflow/checklist set that changes behavior.
5. Name the chosen skills and why. If none materially help, say no skill was
   needed.

## Default Routing

| Situation | Skill |
|---|---|
| Scoped task or issue | `sea-task-queue-execution` |
| Ambiguous design | `grill-me` or `sea-brainstorming-and-spec-refinement` |
| Behavior change | `sea-test-driven-development` |
| Failure or regression | `sea-systematic-debugging`, then `sea-error-recovery-loop` |
| Completion claim | `sea-verification-before-completion` |
| Architecture/refactor | `improve-codebase-architecture`, `sea-architecture-reviewer` |
| Review or PR feedback | `sea-code-review-response`, reviewer skills |
| Docs drift | docs workflow plus `sea-verification-before-completion` |
| Teaching or learning state | `sea-teach-loop` |
| Long context/handoff | `sea-context-hygiene` |

## Guardrails

Do not load every skill. Do not copy skill bodies into product repos. Do not
install upstream skills or plugins unless explicitly approved.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before
implementation or review, establish the persistent goal, Definition of Done,
validation plan, affected systems, dependencies, risks, and expected artifacts.
Continue through validation and fixes until the DoD is satisfied or a hard
blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
