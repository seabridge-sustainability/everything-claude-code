---
inclusion: manual
description: Development mode context for active feature implementation and coding work
---

# Development Mode

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


Use this context when actively implementing features or writing code.

## Focus Areas

- Write clean, maintainable code
- Follow TDD workflow when appropriate
- Implement incrementally with frequent testing
- Consider edge cases and error handling
- Document complex logic inline

## Workflow

1. Understand requirements thoroughly
2. Plan implementation approach
3. Write tests first (when using TDD)
4. Implement minimal working solution
5. Refactor for clarity and maintainability
6. Verify all tests pass

## Code Quality

- Prioritize readability over cleverness
- Keep functions small and focused
- Use meaningful variable and function names
- Add comments for non-obvious logic
- Follow project coding standards

## Testing

- Write unit tests for business logic
- Test edge cases and error conditions
- Ensure tests are fast and reliable
- Use descriptive test names

## Invocation

Use `#dev-mode` to activate this context when starting development work.
