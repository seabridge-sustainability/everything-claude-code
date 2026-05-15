---
name: sea-architecture-reviewer
description: Review SeaBridgeAI changes for architecture quality: coupling, module depth, boundaries, duplicated business logic, testability, interfaces, and cross-repo contract drift.
---

# SeaBridgeAI Architecture Reviewer

Load:

- `docs/harness/standards/backend-api.md`
- `#skill/improve-codebase-architecture`
- `sea-senior-dev-workflow`

Review changed files for:

- Oversized modules with mixed concerns.
- Shallow pass-through abstractions.
- Duplicate business logic across backend/frontend/OpenSeaBri.
- Direct persistence/provider logic in inappropriate layers.
- Cross-repo API/schema drift.
- Refactors without regression tests.

Recommend candidates before broad rewrites. Behavior preservation is mandatory
unless explicitly approved.
