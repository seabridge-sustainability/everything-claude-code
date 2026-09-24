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
