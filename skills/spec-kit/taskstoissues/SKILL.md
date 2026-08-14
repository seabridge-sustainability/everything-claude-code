---
name: speckit-taskstoissues
description: Convert Spec Kit tasks into GitHub issue drafts or approved issues with strict repository and approval gates.
---

# speckit-taskstoissues

## Purpose

Convert `tasks.md` into actionable GitHub issue drafts. Creating real issues is
approval-gated and must target the repository matching the local git remote.

## Inputs

- `.specify/specs/<feature-id>/tasks.md`
- `spec.md` and `plan.md` for context.
- Git remote URL.
- Explicit user approval if creating issues rather than drafts.

## Outputs

Default output:

```text
.specify/specs/<feature-id>/issues-draft.md
```

Optional approved output:

- GitHub issues in the matching remote repository.

## Safety Rules

- Default to draft-only.
- Do not create issues unless the user explicitly approves issue creation in this
  turn.
- Verify `git config --get remote.origin.url`.
- Never create issues in a repository that does not match the local remote.
- Do not push branches, assign paid resources, or trigger CI.
- If GitHub tooling is unavailable, produce drafts only.

## Issue Draft Format

Each issue should include:

- title
- related task ids
- requirement/user-story ids
- scope
- acceptance criteria
- file paths
- dependencies
- verification commands
- SeaBridge-specific gates, if applicable

## Verification

- Every generated issue maps back to one or more task ids.
- Dependency order is preserved.
- Security, tenant, AI, audit, and reporting-sensitive tasks include explicit
  labels or warnings.
- Real issue creation has approval and remote verification evidence.

<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_START -->
## /goal Completion Contract

This Spec Kit artifact inherits SeaBridgeAI `/goal`: define the persistent goal, Definition of Done, validation plan, integrations, risks, dependencies, artifacts, and blockers. Implementation must persist until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_END -->
