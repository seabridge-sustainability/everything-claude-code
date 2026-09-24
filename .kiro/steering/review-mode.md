---
inclusion: manual
description: Code review mode context for thorough quality and security assessment
---

# Review Mode

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


Use this context when conducting code reviews or quality assessments.

## Review Process

1. Gather context Ã¢â‚¬â€ Check git diff to see all changes
2. Understand scope Ã¢â‚¬â€ Identify which files changed and why
3. Read surrounding code Ã¢â‚¬â€ Don't review in isolation
4. Apply review checklist Ã¢â‚¬â€ Work through each category
5. Report findings Ã¢â‚¬â€ Use severity levels

## Review Checklist

### Correctness
- Does the code do what it's supposed to do?
- Are edge cases handled properly?
- Is error handling appropriate?

### Security
- Are inputs validated and sanitized?
- Are secrets properly managed?
- Are there any injection vulnerabilities?
- Is authentication/authorization correct?

### Performance
- Are there obvious performance issues?
- Are database queries optimized?
- Is caching used appropriately?

### Maintainability
- Is the code readable and well-organized?
- Are functions and classes appropriately sized?
- Is there adequate documentation?
- Are naming conventions followed?

### Testing
- Are there sufficient tests?
- Do tests cover edge cases?
- Are tests clear and maintainable?

## Severity Levels

- **Critical**: Security vulnerabilities, data loss risks
- **High**: Bugs that break functionality, major performance issues
- **Medium**: Code quality issues, maintainability concerns
- **Low**: Style inconsistencies, minor improvements

## Invocation

Use `#review-mode` to activate this context when reviewing code.
