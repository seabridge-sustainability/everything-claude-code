## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.
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
