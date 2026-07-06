<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
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
