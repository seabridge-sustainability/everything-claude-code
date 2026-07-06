# API Contract Specialist Review Checklist

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
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
