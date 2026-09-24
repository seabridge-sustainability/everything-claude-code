---
description: Orchestrate multiple agents for complex tasks
agent: planner
subtask: true
---

# Orchestrate Command

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


Orchestrate multiple specialized agents for this complex task: $ARGUMENTS

## Your Task

1. **Analyze task complexity** and break into subtasks
2. **Identify optimal agents** for each subtask
3. **Create execution plan** with dependencies
4. **Coordinate execution** - parallel where possible
5. **Synthesize results** into unified output

## Available Agents

| Agent | Specialty | Use For |
|-------|-----------|---------|
| planner | Implementation planning | Complex feature design |
| architect | System design | Architectural decisions |
| code-reviewer | Code quality | Review changes |
| security-reviewer | Security analysis | Vulnerability detection |
| tdd-guide | Test-driven dev | Feature implementation |
| build-error-resolver | Build fixes | TypeScript/build errors |
| e2e-runner | E2E testing | User flow testing |
| doc-updater | Documentation | Updating docs |
| refactor-cleaner | Code cleanup | Dead code removal |
| go-reviewer | Go code | Go-specific review |
| go-build-resolver | Go builds | Go build errors |
| database-reviewer | Database | Query optimization |

## Orchestration Patterns

### Sequential Execution
```
planner Ã¢â€ â€™ tdd-guide Ã¢â€ â€™ code-reviewer Ã¢â€ â€™ security-reviewer
```
Use when: Later tasks depend on earlier results

### Parallel Execution
```
Ã¢â€Å’Ã¢â€ â€™ security-reviewer
planner Ã¢â€ â€™Ã¢â€Å“Ã¢â€ â€™ code-reviewer
Ã¢â€â€Ã¢â€ â€™ architect
```
Use when: Tasks are independent

### Fan-Out/Fan-In
```
         Ã¢â€Å’Ã¢â€ â€™ agent-1 Ã¢â€â‚¬Ã¢â€Â
planner Ã¢â€ â€™Ã¢â€Å“Ã¢â€ â€™ agent-2 Ã¢â€â‚¬Ã¢â€Â¼Ã¢â€ â€™ synthesizer
         Ã¢â€â€Ã¢â€ â€™ agent-3 Ã¢â€â‚¬Ã¢â€Ëœ
```
Use when: Multiple perspectives needed

## Execution Plan Format

### Phase 1: [Name]
- Agent: [agent-name]
- Task: [specific task]
- Depends on: [none or previous phase]

### Phase 2: [Name] (parallel)
- Agent A: [agent-name]
  - Task: [specific task]
- Agent B: [agent-name]
  - Task: [specific task]
- Depends on: Phase 1

### Phase 3: Synthesis
- Combine results from Phase 2
- Generate unified output

## Coordination Rules

1. **Plan before execute** - Create full execution plan first
2. **Minimize handoffs** - Reduce context switching
3. **Parallelize when possible** - Independent tasks in parallel
4. **Clear boundaries** - Each agent has specific scope
5. **Single source of truth** - One agent owns each artifact

---

**NOTE**: Complex tasks benefit from multi-agent orchestration. Simple tasks should use single agents directly.
