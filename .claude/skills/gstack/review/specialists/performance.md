# Performance Specialist Review Checklist

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Scope: When SCOPE_BACKEND=true OR SCOPE_FRONTEND=true
Output: JSON objects, one finding per line. Schema:
{"severity":"CRITICAL|INFORMATIONAL","confidence":N,"path":"file","line":N,"category":"performance","summary":"...","fix":"...","fingerprint":"path:line:performance","specialist":"performance"}
If no findings: output `NO FINDINGS` and nothing else.

---

## Categories

### N+1 Queries
- ActiveRecord/ORM associations traversed in loops without eager loading (.includes, joinedload, include)
- Database queries inside iteration blocks (each, map, forEach) that could be batched
- Nested serializers that trigger lazy-loaded associations
- GraphQL resolvers that query per-field instead of batching (check for DataLoader usage)

### Missing Database Indexes
- New WHERE clauses on columns without indexes (check migration files or schema)
- New ORDER BY on non-indexed columns
- Composite queries (WHERE a AND b) without composite indexes
- Foreign key columns added without indexes

### Algorithmic Complexity
- O(n^2) or worse patterns: nested loops over collections, Array.find inside Array.map
- Repeated linear searches that could use a hash/map/set lookup
- String concatenation in loops (use join or StringBuilder)
- Sorting or filtering large collections multiple times when once would suffice

### Bundle Size Impact (Frontend)
- New production dependencies that are known-heavy (moment.js, lodash full, jquery)
- Barrel imports (import from 'library') instead of deep imports (import from 'library/specific')
- Large static assets (images, fonts) committed without optimization
- Missing code splitting for route-level chunks

### Rendering Performance (Frontend)
- Fetch waterfalls: sequential API calls that could be parallel (Promise.all)
- Unnecessary re-renders from unstable references (new objects/arrays in render)
- Missing React.memo, useMemo, or useCallback on expensive computations
- Layout thrashing from reading then writing DOM properties in loops
- Missing loading="lazy" on below-fold images

### Missing Pagination
- List endpoints that return unbounded results (no LIMIT, no pagination params)
- Database queries without LIMIT that grow with data volume
- API responses that embed full nested objects instead of IDs with expansion

### Blocking in Async Contexts
- Synchronous I/O (file reads, subprocess, HTTP requests) inside async functions
- time.sleep() / Thread.sleep() inside event-loop-based handlers
- CPU-intensive computation blocking the main thread without worker offload
