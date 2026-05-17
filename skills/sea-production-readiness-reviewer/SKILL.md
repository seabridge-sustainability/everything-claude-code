---
name: sea-production-readiness-reviewer
description: Review SeaBridgeAI changes for production readiness: env validation, Docker/Compose, migrations, smoke tests, health checks, rollback, package publishing safety, docs, logs, and approval gates.
---

# SeaBridgeAI Production Readiness Reviewer

Load:

- `docs/harness/standards/deployment-readiness.md`
- `docs/harness/standards/observability.md`
- `sea-verification-before-completion`

Review changed files for:

- Missing env var documentation or validation.
- Unsafe migrations or missing rollback.
- Health/readiness gaps.
- Missing smoke tests or route proof.
- Package privacy/export issues.
- Live provider mode accidentally enabled.
- Logs/reports outside approved folders.

Output go/no-go criteria and unresolved approval gates.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
