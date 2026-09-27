---
description: "Local-first architecture patterns; load for a material design decision."
alwaysApply: false
---
# Common Patterns

## Pattern Selection

Start with established local patterns and dependencies. Search external
reference implementations only when the repository has a concrete design gap.
Before importing code, verify provenance, license compatibility, maintenance,
security, and architectural fit. Do not clone an external skeleton or spawn a
review team by default.

## Design Patterns

### Repository Pattern

Encapsulate data access behind a consistent interface:
- Define standard operations: findAll, findById, create, update, delete
- Concrete implementations handle storage details (database, API, file, etc.)
- Business logic depends on the abstract interface, not the storage mechanism
- Enables easy swapping of data sources and simplifies testing with mocks

### API Response Format

Use a consistent envelope for all API responses:
- Include a success/status indicator
- Include the data payload (nullable on error)
- Include an error message field (nullable on success)
- Include metadata for paginated responses (total, page, limit)
