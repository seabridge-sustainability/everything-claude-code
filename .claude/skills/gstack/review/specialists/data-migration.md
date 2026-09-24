# Data Migration Specialist Review Checklist

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
