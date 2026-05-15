# Backend API Standard

## Rule: API Contracts Must Be Typed

Required behavior: FastAPI routes should use Pydantic request/response models,
documented status codes, and stable error shapes.

Prohibited behavior: untyped dictionaries for public contracts, ad hoc error
strings, or endpoint behavior only documented in UI code.

Automated enforcement: structural scans for route decorators without
`response_model` where practical.

Fallback reviewer: `sea-backend-api-reviewer`.

## Rule: Database Access Must Stay In The Correct Layer

Required behavior: route handlers call services/repositories; persistence logic
stays in data/service layers.

Prohibited behavior: direct query construction in UI-facing route handlers unless
documented as a small, local exception.

Automated enforcement: advisory route scan for direct DB/query calls.
