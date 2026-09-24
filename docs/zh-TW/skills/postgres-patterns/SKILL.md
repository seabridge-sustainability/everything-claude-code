---
name: postgres-patterns
description: PostgreSQL database patterns for query optimization, schema design, indexing, and security. Based on Supabase best practices.
---

# PostgreSQL Ã¦Â¨Â¡Ã¥Â¼Â

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


PostgreSQL Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥ÂÆ’Ã¨â‚¬Æ’Ã£â‚¬â€šÃ¨Â©Â³Ã§Â´Â°Ã¦Å’â€¡Ã¥Ââ€”Ã¨Â«â€¹Ã¤Â½Â¿Ã§â€Â¨ `database-reviewer` agentÃ£â‚¬â€š

## Ã¤Â½â€¢Ã¦â„¢â€šÃ¥â€¢Å¸Ã§â€Â¨

- Ã¦â€™Â°Ã¥Â¯Â« SQL Ã¦Å¸Â¥Ã¨Â©Â¢Ã¦Ë†â€“ migrations
- Ã¨Â¨Â­Ã¨Â¨Ë†Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ« schema
- Ã§â€“â€˜Ã©â€ºÂ£Ã¦Å½â€™Ã¨Â§Â£Ã¦â€¦Â¢Ã¦Å¸Â¥Ã¨Â©Â¢
- Ã¥Â¯Â¦Ã¤Â½Å“ Row Level Security
- Ã¨Â¨Â­Ã¥Â®Å¡Ã©â‚¬Â£Ã§Â·Å¡Ã¦Â±Â 

## Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥ÂÆ’Ã¨â‚¬Æ’

### Ã§Â´Â¢Ã¥Â¼â€¢Ã©â‚¬Å¸Ã¦Å¸Â¥Ã¨Â¡Â¨

| Ã¦Å¸Â¥Ã¨Â©Â¢Ã¦Â¨Â¡Ã¥Â¼Â | Ã§Â´Â¢Ã¥Â¼â€¢Ã©Â¡Å¾Ã¥Å¾â€¹ | Ã§Â¯â€žÃ¤Â¾â€¹ |
|---------|---------|------|
| `WHERE col = value` | B-treeÃ¯Â¼Ë†Ã©Â ÂÃ¨Â¨Â­Ã¯Â¼â€° | `CREATE INDEX idx ON t (col)` |
| `WHERE col > value` | B-tree | `CREATE INDEX idx ON t (col)` |
| `WHERE a = x AND b > y` | Ã¨Â¤â€¡Ã¥ÂË† | `CREATE INDEX idx ON t (a, b)` |
| `WHERE jsonb @> '{}'` | GIN | `CREATE INDEX idx ON t USING gin (col)` |
| `WHERE tsv @@ query` | GIN | `CREATE INDEX idx ON t USING gin (col)` |
| Ã¦â„¢â€šÃ©â€“â€œÃ¥ÂºÂÃ¥Ë†â€”Ã§Â¯â€žÃ¥Å“Â | BRIN | `CREATE INDEX idx ON t USING brin (col)` |

### Ã¨Â³â€¡Ã¦â€“â„¢Ã©Â¡Å¾Ã¥Å¾â€¹Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥ÂÆ’Ã¨â‚¬Æ’

| Ã¤Â½Â¿Ã§â€Â¨Ã¦Æ’â€¦Ã¦Â³Â | Ã¦Â­Â£Ã§Â¢ÂºÃ©Â¡Å¾Ã¥Å¾â€¹ | Ã©ÂÂ¿Ã¥â€¦Â |
|---------|---------|------|
| IDs | `bigint` | `int`Ã£â‚¬ÂÃ©Å¡Â¨Ã¦Â©Å¸ UUID |
| Ã¥Â­â€”Ã¤Â¸Â² | `text` | `varchar(255)` |
| Ã¦â„¢â€šÃ©â€“â€œÃ¦Ë†Â³ | `timestamptz` | `timestamp` |
| Ã©â€¡â€˜Ã©Â¡Â | `numeric(10,2)` | `float` |
| Ã¦â€”â€”Ã¦Â¨â„¢ | `boolean` | `varchar`Ã£â‚¬Â`int` |

### Ã¥Â¸Â¸Ã¨Â¦â€¹Ã¦Â¨Â¡Ã¥Â¼Â

**Ã¨Â¤â€¡Ã¥ÂË†Ã§Â´Â¢Ã¥Â¼â€¢Ã©Â â€ Ã¥ÂºÂÃ¯Â¼Å¡**
```sql
-- Ã§Â­â€°Ã¥â‚¬Â¼Ã¦Â¬â€žÃ¤Â½ÂÃ¥â€žÂªÃ¥â€¦Ë†Ã¯Â¼Å’Ã§â€žÂ¶Ã¥Â¾Å’Ã¦ËœÂ¯Ã§Â¯â€žÃ¥Å“ÂÃ¦Â¬â€žÃ¤Â½Â
CREATE INDEX idx ON orders (status, created_at);
-- Ã©ÂÂ©Ã§â€Â¨Ã¦â€“Â¼Ã¯Â¼Å¡WHERE status = 'pending' AND created_at > '2024-01-01'
```

**Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Â´Â¢Ã¥Â¼â€¢Ã¯Â¼Å¡**
```sql
CREATE INDEX idx ON users (email) INCLUDE (name, created_at);
-- Ã©ÂÂ¿Ã¥â€¦Â SELECT email, name, created_at Ã¦â„¢â€šÃ§Å¡â€žÃ¨Â¡Â¨Ã¦Â Â¼Ã¦Å¸Â¥Ã¨Â©Â¢
```

**Ã©Æ’Â¨Ã¥Ë†â€ Ã§Â´Â¢Ã¥Â¼â€¢Ã¯Â¼Å¡**
```sql
CREATE INDEX idx ON users (email) WHERE deleted_at IS NULL;
-- Ã¦â€ºÂ´Ã¥Â°ÂÃ§Å¡â€žÃ§Â´Â¢Ã¥Â¼â€¢Ã¯Â¼Å’Ã¥ÂÂªÃ¥Å’â€¦Ã¥ÂÂ«Ã¦Â´Â»Ã¨ÂºÂÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦
```

**RLS Ã¦â€Â¿Ã§Â­â€“Ã¯Â¼Ë†Ã¥â€žÂªÃ¥Å’â€“Ã¯Â¼â€°Ã¯Â¼Å¡**
```sql
CREATE POLICY policy ON orders
  USING ((SELECT auth.uid()) = user_id);  -- Ã§â€Â¨ SELECT Ã¥Å’â€¦Ã¨Â£ÂÃ¯Â¼Â
```

**UPSERTÃ¯Â¼Å¡**
```sql
INSERT INTO settings (user_id, key, value)
VALUES (123, 'theme', 'dark')
ON CONFLICT (user_id, key)
DO UPDATE SET value = EXCLUDED.value;
```

**Ã¦Â¸Â¸Ã¦Â¨â„¢Ã¥Ë†â€ Ã©Â ÂÃ¯Â¼Å¡**
```sql
SELECT * FROM products WHERE id > $last_id ORDER BY id LIMIT 20;
-- O(1) vs OFFSET Ã¦ËœÂ¯ O(n)
```

**Ã¤Â½â€¡Ã¥Ë†â€”Ã¨â„¢â€¢Ã§Ââ€ Ã¯Â¼Å¡**
```sql
UPDATE jobs SET status = 'processing'
WHERE id = (
  SELECT id FROM jobs WHERE status = 'pending'
  ORDER BY created_at LIMIT 1
  FOR UPDATE SKIP LOCKED
) RETURNING *;
```

### Ã¥ÂÂÃ¦Â¨Â¡Ã¥Â¼ÂÃ¥ÂÂµÃ¦Â¸Â¬

```sql
-- Ã¦â€°Â¾Ã¥â€¡ÂºÃ¦Å“ÂªÃ¥Â»ÂºÃ§Â´Â¢Ã¥Â¼â€¢Ã§Å¡â€žÃ¥Â¤â€“Ã©ÂÂµ
SELECT conrelid::regclass, a.attname
FROM pg_constraint c
JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
WHERE c.contype = 'f'
  AND NOT EXISTS (
    SELECT 1 FROM pg_index i
    WHERE i.indrelid = c.conrelid AND a.attnum = ANY(i.indkey)
  );

-- Ã¦â€°Â¾Ã¥â€¡ÂºÃ¦â€¦Â¢Ã¦Å¸Â¥Ã¨Â©Â¢
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
WHERE mean_exec_time > 100
ORDER BY mean_exec_time DESC;

-- Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¨Â¡Â¨Ã¦Â Â¼Ã¨â€ Â¨Ã¨â€žÂ¹
SELECT relname, n_dead_tup, last_vacuum
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC;
```

### Ã¨Â¨Â­Ã¥Â®Å¡Ã§Â¯â€žÃ¦Å“Â¬

```sql
-- Ã©â‚¬Â£Ã§Â·Å¡Ã©â„¢ÂÃ¥Ë†Â¶Ã¯Â¼Ë†Ã¤Â¾Â RAM Ã¨ÂªÂ¿Ã¦â€¢Â´Ã¯Â¼â€°
ALTER SYSTEM SET max_connections = 100;
ALTER SYSTEM SET work_mem = '8MB';

-- Ã©â‚¬Â¾Ã¦â„¢â€š
ALTER SYSTEM SET idle_in_transaction_session_timeout = '30s';
ALTER SYSTEM SET statement_timeout = '30s';

-- Ã§â€ºÂ£Ã¦Å½Â§
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Ã¥Â®â€°Ã¥â€¦Â¨Ã©Â ÂÃ¨Â¨Â­Ã¥â‚¬Â¼
REVOKE ALL ON SCHEMA public FROM public;

SELECT pg_reload_conf();
```

## Ã§â€ºÂ¸Ã©â€”Å“

- AgentÃ¯Â¼Å¡`database-reviewer` - Ã¥Â®Å’Ã¦â€¢Â´Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¥Â¯Â©Ã¦Å¸Â¥Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹
- SkillÃ¯Â¼Å¡`clickhouse-io` - ClickHouse Ã¥Ë†â€ Ã¦Å¾ÂÃ¦Â¨Â¡Ã¥Â¼Â
- SkillÃ¯Â¼Å¡`backend-patterns` - API Ã¥â€™Å’Ã¥Â¾Å’Ã§Â«Â¯Ã¦Â¨Â¡Ã¥Â¼Â

---

*Ã¥Å¸ÂºÃ¦â€“Â¼ [Supabase Agent Skills](Supabase Agent Skills (credit: Supabase team))Ã¯Â¼Ë†MIT Ã¦Å½Ë†Ã¦Â¬Å Ã¯Â¼â€°*
