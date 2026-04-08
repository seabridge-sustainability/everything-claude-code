---
inclusion: manual
description: Code review mode context for thorough quality and security assessment
---

# Review Mode

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
