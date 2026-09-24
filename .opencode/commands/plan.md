---
description: Create implementation plan with risk assessment
agent: planner
subtask: true
---

# Plan Command

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Create a detailed implementation plan for: $ARGUMENTS

## Your Task

1. **Restate Requirements** - Clarify what needs to be built
2. **Identify Risks** - Surface potential issues, blockers, and dependencies
3. **Create Step Plan** - Break down implementation into phases
4. **Wait for Confirmation** - MUST receive user approval before proceeding

## Output Format

### Requirements Restatement
[Clear, concise restatement of what will be built]

### Implementation Phases
[Phase 1: Description]
- Step 1.1
- Step 1.2
...

[Phase 2: Description]
- Step 2.1
- Step 2.2
...

### Dependencies
[List external dependencies, APIs, services needed]

### Risks
- HIGH: [Critical risks that could block implementation]
- MEDIUM: [Moderate risks to address]
- LOW: [Minor concerns]

### Estimated Complexity
[HIGH/MEDIUM/LOW with time estimates]

**WAITING FOR CONFIRMATION**: Proceed with this plan? (yes/no/modify)

---

**CRITICAL**: Do NOT write any code until the user explicitly confirms with "yes", "proceed", or similar affirmative response.
