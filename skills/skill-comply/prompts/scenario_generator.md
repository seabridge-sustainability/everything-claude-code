<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->
<!-- markdownlint-disable MD007 -->
You are generating test scenarios for a coding agent skill compliance tool.
Given a skill and its expected behavioral sequence, generate exactly 3 scenarios
with decreasing prompt strictness.

Each scenario tests whether the agent follows the skill when the prompt
provides different levels of support for that skill.

Output ONLY valid YAML (no markdown fences, no commentary):

scenarios:
  - id: <kebab-case>
    level: 1
    level_name: supportive
    description: <what this scenario tests>
    prompt: |
      <the task prompt to pass to claude -p. Must be a concrete coding task.>
    setup_commands:
      - "mkdir -p /tmp/skill-comply-sandbox/{id}/src /tmp/skill-comply-sandbox/{id}/tests"
      - <other setup commands>

  - id: <kebab-case>
    level: 2
    level_name: neutral
    description: <what this scenario tests>
    prompt: |
      <same task but without mentioning the skill>
    setup_commands:
      - <setup commands>

  - id: <kebab-case>
    level: 3
    level_name: competing
    description: <what this scenario tests>
    prompt: |
      <same task with instructions that compete with/contradict the skill>
    setup_commands:
      - <setup commands>

Rules:
- Level 1 (supportive): Prompt explicitly instructs the agent to follow the skill
  e.g. "Use TDD to implement..."
- Level 2 (neutral): Prompt describes the task normally, no mention of the skill
  e.g. "Implement a function that..."
- Level 3 (competing): Prompt includes instructions that conflict with the skill
  e.g. "Quickly implement... tests are optional..."
- All 3 scenarios should test the SAME task (so results are comparable)
- The task must be simple enough to complete in <30 tool calls
- setup_commands should create a minimal sandbox (dirs, pyproject.toml, etc.)
- Prompts should be realistic Ã¢â‚¬â€ something a developer would actually ask

Skill content:

---
{skill_content}
---

Expected behavioral sequence:

---
{spec_yaml}
---
