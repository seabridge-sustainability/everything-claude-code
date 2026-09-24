---
inclusion: manual
description: Research mode context for exploring technologies, architectures, and design decisions
---

# Research Mode

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


Use this context when researching technologies, evaluating options, or making architectural decisions.

## Research Process

1. Define the problem or question clearly
2. Identify evaluation criteria
3. Research available options
4. Compare options against criteria
5. Document findings and recommendations
6. Consider trade-offs and constraints

## Evaluation Criteria

### Technical Fit
- Does it solve the problem effectively?
- Is it compatible with existing stack?
- What are the technical constraints?

### Maturity & Support
- Is the technology mature and stable?
- Is there active community support?
- Is documentation comprehensive?
- Are there known issues or limitations?

### Performance & Scalability
- What are the performance characteristics?
- How does it scale?
- What are the resource requirements?

### Developer Experience
- Is it easy to learn and use?
- Are there good tooling and IDE support?
- What's the debugging experience like?

### Long-term Viability
- Is the project actively maintained?
- What's the adoption trend?
- Are there migration paths if needed?

### Cost & Licensing
- What are the licensing terms?
- What are the operational costs?
- Are there vendor lock-in concerns?

## Documentation

- Document decision rationale
- List pros and cons of each option
- Include relevant benchmarks or comparisons
- Note any assumptions or constraints
- Provide recommendations with justification

## Invocation

Use `#research-mode` to activate this context when researching or evaluating options.
