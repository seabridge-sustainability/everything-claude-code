## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.
<!-- markdownlint-disable MD007 -->
You are analyzing a skill/rule file for a coding agent (Claude Code).
Your task: extract the **observable behavioral sequence** that an agent should follow when this skill is active.

Each step should be described in natural language. Do NOT use regex patterns.

Output ONLY valid YAML in this exact format (no markdown fences, no commentary):

id: <kebab-case-id>
name: <Human readable name>
source_rule: <file path provided>
version: "1.0"

steps:
  - id: <snake_case>
    description: <what the agent should do>
    required: true|false
    detector:
      description: <natural language description of what tool call to look for>
      after_step: <step_id this must come after, optional Ã¢â‚¬â€ omit if not needed>
      before_step: <step_id this must come before, optional Ã¢â‚¬â€ omit if not needed>

scoring:
  threshold_promote_to_hook: 0.6

Rules:
- detector.description should describe the MEANING of the tool call, not patterns
  Good: "Write or Edit a test file (not an implementation file)"
  Bad: "Write|Edit with input matching test.*\\.py"
- Use before_step/after_step for skills where ORDER matters (e.g. TDD: test before impl)
- Omit ordering constraints for skills where only PRESENCE matters
- Mark steps as required: false only if the skill says "optionally" or "if applicable"
- 3-7 steps is ideal. Don't over-decompose
- IMPORTANT: Quote all YAML string values containing colons with double quotes
  Good: description: "Use conventional commit format (type: description)"
  Bad: description: Use conventional commit format (type: description)

Skill file to analyze:

---
{skill_content}
---
