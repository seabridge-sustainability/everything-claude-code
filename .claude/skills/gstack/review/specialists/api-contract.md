# API Contract Specialist Review Checklist

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


Scope: When SCOPE_API=true
Output: JSON objects, one finding per line. Schema:
{"severity":"CRITICAL|INFORMATIONAL","confidence":N,"path":"file","line":N,"category":"api-contract","summary":"...","fix":"...","fingerprint":"path:line:api-contract","specialist":"api-contract"}
If no findings: output `NO FINDINGS` and nothing else.

---

## Categories

### Breaking Changes
- Removed fields from response bodies (clients may depend on them)
- Changed field types (string Ã¢â€ â€™ number, object Ã¢â€ â€™ array)
- New required parameters added to existing endpoints
- Changed HTTP methods (GET Ã¢â€ â€™ POST) or status codes (200 Ã¢â€ â€™ 201)
- Renamed endpoints without maintaining the old path as a redirect/alias
- Changed authentication requirements (public Ã¢â€ â€™ authenticated)

### Versioning Strategy
- Breaking changes made without a version bump (v1 Ã¢â€ â€™ v2)
- Multiple versioning strategies mixed in the same API (URL vs header vs query param)
- Deprecated endpoints without a sunset timeline or migration guide
- Version-specific logic scattered across controllers instead of centralized

### Error Response Consistency
- New endpoints returning different error formats than existing ones
- Error responses missing standard fields (error code, message, details)
- HTTP status codes that don't match the error type (200 for errors, 500 for validation)
- Error messages that leak internal implementation details (stack traces, SQL)

### Rate Limiting & Pagination
- New endpoints missing rate limiting when similar endpoints have it
- Pagination changes (offset Ã¢â€ â€™ cursor) without backwards compatibility
- Changed page sizes or default limits without documentation
- Missing total count or next-page indicators in paginated responses

### Documentation Drift
- OpenAPI/Swagger spec not updated to match new endpoints or changed params
- README or API docs describing old behavior after changes
- Example requests/responses that no longer work
- Missing documentation for new endpoints or changed parameters

### Backwards Compatibility
- Clients on older versions: will they break?
- Mobile apps that can't force-update: does the API still work for them?
- Webhook payloads changed without notifying subscribers
- SDK or client library changes needed to use new features
