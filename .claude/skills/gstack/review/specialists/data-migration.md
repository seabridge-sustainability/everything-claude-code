# Data Migration Specialist Review Checklist

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


Scope: When SCOPE_MIGRATIONS=true
Output: JSON objects, one finding per line. Schema:
{"severity":"CRITICAL|INFORMATIONAL","confidence":N,"path":"file","line":N,"category":"data-migration","summary":"...","fix":"...","fingerprint":"path:line:data-migration","specialist":"data-migration"}
If no findings: output `NO FINDINGS` and nothing else.

---

## Categories

### Reversibility
- Can this migration be rolled back without data loss?
- Is there a corresponding down/rollback migration?
- Does the rollback actually undo the change or just no-op?
- Would rolling back break the current application code?

### Data Loss Risk
- Dropping columns that still contain data (add deprecation period first)
- Changing column types that truncate data (varchar(255) Ã¢â€ â€™ varchar(50))
- Removing tables without verifying no code references them
- Renaming columns without updating all references (ORM, raw SQL, views)
- NOT NULL constraints added to columns with existing NULL values (needs backfill first)

### Lock Duration
- ALTER TABLE on large tables without CONCURRENTLY (PostgreSQL)
- Adding indexes without CONCURRENTLY on tables with >100K rows
- Multiple ALTER TABLE statements that could be combined into one lock acquisition
- Schema changes that acquire exclusive locks during peak traffic hours

### Backfill Strategy
- New NOT NULL columns without DEFAULT value (requires backfill before constraint)
- New columns with computed defaults that need batch population
- Missing backfill script or rake task for existing records
- Backfill that updates all rows at once instead of batching (locks table)

### Index Creation
- CREATE INDEX without CONCURRENTLY on production tables
- Duplicate indexes (new index covers same columns as existing one)
- Missing indexes on new foreign key columns
- Partial indexes where a full index would be more useful (or vice versa)

### Multi-Phase Safety
- Migrations that must be deployed in a specific order with application code
- Schema changes that break the current running code (deploy code first, then migrate)
- Migrations that assume a deploy boundary (old code + new schema = crash)
- Missing feature flag to handle mixed old/new code during rolling deploy
