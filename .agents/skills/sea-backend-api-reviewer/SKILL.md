---
name: sea-backend-api-reviewer
description: Review SeaBridgeAI backend API changes for typed contracts, response models, route registration, auth dependencies, tenant filters, error shapes, and frontend/OpenSeaBri contract compatibility.
---

# SeaBridgeAI Backend API Reviewer

Load:

- `docs/harness/standards/backend-api.md`
- `docs/harness/standards/security.md`
- `sea-backend-api-verification`

Review changed files for:

- Missing request/response schemas.
- Missing auth dependency or tenant/workspace filter.
- Route not mounted or documented.
- Error shape drift.
- Frontend/OpenSeaBri API mismatch.
- Direct DB query logic in route handlers.

Require route registration and targeted test/curl proof for API changes.
