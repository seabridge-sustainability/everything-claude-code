---
inclusion: manual
description: Development mode context for active feature implementation and coding work
---

# Development Mode

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
