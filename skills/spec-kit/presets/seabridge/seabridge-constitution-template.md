# [PROJECT_NAME] Constitution

## Core Principles

### I. Existing Architecture First

All work must reuse established repository conventions before adding new
patterns. Backend work follows FastAPI, Beanie/Mongo, Pydantic v2, service,
schema, and router patterns where applicable. Frontend work follows the existing
Next.js routing, component, state, API-client, and design conventions where
applicable.

### II. Tenant Scope, Privacy, And Auditability

Every product data flow must define tenant, company, property, user, and role
scope where relevant. Mutations must be explicit, authorized, logged, and
auditable. AI output and sustainability data must preserve source traces,
confidence, missing-data behavior, and review/approval history.

### III. Test And Verification Before Completion

Tests are required when practical. Agents must define done criteria, run focused
checks, broaden checks when risk warrants it, document skipped checks, and never
claim completion from code edits alone.

### IV. AI Governance And No Silent Mutations

AI agents must be integrated with existing SeaBridgeAI agent/runtime patterns,
not built as disconnected modules. AI must not silently mutate product data,
invent sources, fabricate sustainability facts, or bypass approval gates.

### V. Simplicity And No Duplicate Systems

Implement the minimum scoped solution that satisfies the approved spec. Do not
create duplicate modules, parallel data models, disconnected services, speculative
abstractions, or broad refactors unless explicitly justified and approved.

## Platform Constraints

- No GitHub push unless explicitly approved.
- No commit unless explicitly requested.
- No dependency install, migration, paid/live provider call, production data
  change, or destructive operation without explicit approval.
- Sustainability, ESG, GHG, LCA, climate/nature risk, due diligence,
  procurement, and reporting work must preserve units, boundaries, geography,
  timeframe, factor/source, and provisional/demo status.
- Security-sensitive work must verify auth, tenant isolation, secrets, uploads,
  webhooks, API keys, rate limits, and privacy implications.

## Development Workflow

1. Specify what and why.
2. Clarify high-impact ambiguity.
3. Plan against existing architecture.
4. Generate dependency-ordered tasks with tests and verification.
5. Analyze consistency and coverage before implementation.
6. Execute with SeaBridgeAI DoD and verification gates.
7. Keep `.specify` and `.planning` aligned when GSD is used.

## Governance

This constitution supersedes feature-local preferences. Amendments require a
documented rationale, version bump, affected-artifact review, and migration path
when prior decisions are changed. Compliance must be checked in plans, analyses,
task lists, implementation reports, and code reviews.

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]

<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_START -->
## /goal Completion Contract

This Spec Kit artifact inherits SeaBridgeAI `/goal`: define the persistent goal, Definition of Done, validation plan, integrations, risks, dependencies, artifacts, and blockers. Implementation must persist until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_END -->
