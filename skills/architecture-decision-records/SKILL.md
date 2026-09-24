---
name: architecture-decision-records
description: Capture architectural decisions made during Claude Code sessions as structured ADRs. Auto-detects decision moments, records context, alternatives considered, and rationale. Maintains an ADR log so future developers understand why the codebase is shaped the way it is.
metadata:
  origin: ECC
---

# Architecture Decision Records

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


Capture architectural decisions as they happen during coding sessions. Instead of decisions living only in Slack threads, PR comments, or someone's memory, this skill produces structured ADR documents that live alongside the code.

## When to Activate

- User explicitly says "let's record this decision" or "ADR this"
- User chooses between significant alternatives (framework, library, pattern, database, API design)
- User says "we decided to..." or "the reason we're doing X instead of Y is..."
- User asks "why did we choose X?" (read existing ADRs)
- During planning phases when architectural trade-offs are discussed

## ADR Format

Use the lightweight ADR format proposed by Michael Nygard, adapted for AI-assisted development:

```markdown
# ADR-NNNN: [Decision Title]

**Date**: YYYY-MM-DD
**Status**: proposed | accepted | deprecated | superseded by ADR-NNNN
**Deciders**: [who was involved]

## Context

What is the issue that we're seeing that is motivating this decision or change?

[2-5 sentences describing the situation, constraints, and forces at play]

## Decision

What is the change that we're proposing and/or doing?

[1-3 sentences stating the decision clearly]

## Alternatives Considered

### Alternative 1: [Name]
- **Pros**: [benefits]
- **Cons**: [drawbacks]
- **Why not**: [specific reason this was rejected]

### Alternative 2: [Name]
- **Pros**: [benefits]
- **Cons**: [drawbacks]
- **Why not**: [specific reason this was rejected]

## Consequences

What becomes easier or more difficult to do because of this change?

### Positive
- [benefit 1]
- [benefit 2]

### Negative
- [trade-off 1]
- [trade-off 2]

### Risks
- [risk and mitigation]
```

## Workflow

### Capturing a New ADR

When a decision moment is detected:

1. **Initialize (first time only)** Ã¢â‚¬â€ if `docs/adr/` does not exist, ask the user for confirmation before creating the directory, a `README.md` seeded with the index table header (see ADR Index Format below), and a blank `template.md` for manual use. Do not create files without explicit consent.
2. **Identify the decision** Ã¢â‚¬â€ extract the core architectural choice being made
3. **Gather context** Ã¢â‚¬â€ what problem prompted this? What constraints exist?
4. **Document alternatives** Ã¢â‚¬â€ what other options were considered? Why were they rejected?
5. **State consequences** Ã¢â‚¬â€ what are the trade-offs? What becomes easier/harder?
6. **Assign a number** Ã¢â‚¬â€ scan existing ADRs in `docs/adr/` and increment
7. **Confirm and write** Ã¢â‚¬â€ present the draft ADR to the user for review. Only write to `docs/adr/NNNN-decision-title.md` after explicit approval. If the user declines, discard the draft without writing any files.
8. **Update the index** Ã¢â‚¬â€ append to `docs/adr/README.md`

### Reading Existing ADRs

When a user asks "why did we choose X?":

1. Check if `docs/adr/` exists Ã¢â‚¬â€ if not, respond: "No ADRs found in this project. Would you like to start recording architectural decisions?"
2. If it exists, scan `docs/adr/README.md` index for relevant entries
3. Read matching ADR files and present the Context and Decision sections
4. If no match is found, respond: "No ADR found for that decision. Would you like to record one now?"

### ADR Directory Structure

```
docs/
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ adr/
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ README.md              Ã¢â€ Â index of all ADRs
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ 0001-use-nextjs.md
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ 0002-postgres-over-mongo.md
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ 0003-rest-over-graphql.md
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ template.md            Ã¢â€ Â blank template for manual use
```

### ADR Index Format

```markdown
# Architecture Decision Records

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [0001](0001-use-nextjs.md) | Use Next.js as frontend framework | accepted | 2026-01-15 |
| [0002](0002-postgres-over-mongo.md) | PostgreSQL over MongoDB for primary datastore | accepted | 2026-01-20 |
| [0003](0003-rest-over-graphql.md) | REST API over GraphQL | accepted | 2026-02-01 |
```

## Decision Detection Signals

Watch for these patterns in conversation that indicate an architectural decision:

**Explicit signals**
- "Let's go with X"
- "We should use X instead of Y"
- "The trade-off is worth it because..."
- "Record this as an ADR"

**Implicit signals** (suggest recording an ADR Ã¢â‚¬â€ do not auto-create without user confirmation)
- Comparing two frameworks or libraries and reaching a conclusion
- Making a database schema design choice with stated rationale
- Choosing between architectural patterns (monolith vs microservices, REST vs GraphQL)
- Deciding on authentication/authorization strategy
- Selecting deployment infrastructure after evaluating alternatives

## What Makes a Good ADR

### Do
- **Be specific** Ã¢â‚¬â€ "Use Prisma ORM" not "use an ORM"
- **Record the why** Ã¢â‚¬â€ the rationale matters more than the what
- **Include rejected alternatives** Ã¢â‚¬â€ future developers need to know what was considered
- **State consequences honestly** Ã¢â‚¬â€ every decision has trade-offs
- **Keep it short** Ã¢â‚¬â€ an ADR should be readable in 2 minutes
- **Use present tense** Ã¢â‚¬â€ "We use X" not "We will use X"

### Don't
- Record trivial decisions Ã¢â‚¬â€ variable naming or formatting choices don't need ADRs
- Write essays Ã¢â‚¬â€ if the context section exceeds 10 lines, it's too long
- Omit alternatives Ã¢â‚¬â€ "we just picked it" is not a valid rationale
- Backfill without marking it Ã¢â‚¬â€ if recording a past decision, note the original date
- Let ADRs go stale Ã¢â‚¬â€ superseded decisions should reference their replacement

## ADR Lifecycle

```
proposed Ã¢â€ â€™ accepted Ã¢â€ â€™ [deprecated | superseded by ADR-NNNN]
```

- **proposed**: decision is under discussion, not yet committed
- **accepted**: decision is in effect and being followed
- **deprecated**: decision is no longer relevant (e.g., feature removed)
- **superseded**: a newer ADR replaces this one (always link the replacement)

## Categories of Decisions Worth Recording

| Category | Examples |
|----------|---------|
| **Technology choices** | Framework, language, database, cloud provider |
| **Architecture patterns** | Monolith vs microservices, event-driven, CQRS |
| **API design** | REST vs GraphQL, versioning strategy, auth mechanism |
| **Data modeling** | Schema design, normalization decisions, caching strategy |
| **Infrastructure** | Deployment model, CI/CD pipeline, monitoring stack |
| **Security** | Auth strategy, encryption approach, secret management |
| **Testing** | Test framework, coverage targets, E2E vs integration balance |
| **Process** | Branching strategy, review process, release cadence |

## Integration with Other Skills

- **Planner agent**: when the planner proposes architecture changes, suggest creating an ADR
- **Code reviewer agent**: flag PRs that introduce architectural changes without a corresponding ADR
