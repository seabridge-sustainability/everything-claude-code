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
You are classifying tool calls from a coding agent session against expected behavioral steps.

For each tool call, determine which step (if any) it belongs to. A tool call can match at most one step.

Steps:
{steps_description}

Tool calls (numbered):
{tool_calls}

Respond with ONLY a JSON object mapping step_id to a list of matching tool call numbers.
Include only steps that have at least one match. If no tool calls match a step, omit it.

Example response:
{"write_test": [0, 1], "run_test_red": [2], "write_impl": [3, 4]}

Rules:
- Match based on the MEANING of the tool call, not just keywords
- A Write to "test_calculator.py" is a test file write, even if the content is implementation-like
- A Write to "calculator.py" is an implementation write, even if it contains test helpers
- A Bash running "pytest" that outputs "FAILED" is a RED phase test run
- A Bash running "pytest" that outputs "passed" is a GREEN phase test run
- Each tool call should match at most one step (pick the best match)
- If a tool call doesn't match any step, don't include it
