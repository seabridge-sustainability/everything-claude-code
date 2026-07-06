# Data Migration Specialist Review Checklist

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
