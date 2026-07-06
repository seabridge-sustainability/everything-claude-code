---
name: postgres-patterns
description: PostgreSQL database patterns for query optimization, schema design, indexing, and security. Based on Supabase best practices.
---

# PostgreSQL Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

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


PostgreSQLÃ£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã£ÂÂ®Ã£â€šÂ¯Ã£â€šÂ¤Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£Æ’Â¬Ã£Æ’Â³Ã£â€šÂ¹Ã£â‚¬â€šÃ¨Â©Â³Ã§Â´Â°Ã£ÂÂªÃ£â€šÂ¬Ã£â€šÂ¤Ã£Æ’â‚¬Ã£Æ’Â³Ã£â€šÂ¹Ã£ÂÂ«Ã£ÂÂ¤Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂ¯Ã£â‚¬Â`database-reviewer` Ã£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š

## Ã¨ÂµÂ·Ã¥â€¹â€¢Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Å¸Ã£Æ’Â³Ã£â€šÂ°

- SQLÃ£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£Æ’Å¾Ã£â€šÂ¤Ã£â€šÂ°Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã¤Â½Å“Ã¦Ë†ÂÃ¦â„¢â€š
- Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â¼Ã£Æ’Å¾Ã£ÂÂ®Ã¨Â¨Â­Ã¨Â¨Ë†Ã¦â„¢â€š
- Ã¤Â½Å½Ã©â‚¬Å¸Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£ÂÂ®Ã£Æ’Ë†Ã£Æ’Â©Ã£Æ’â€“Ã£Æ’Â«Ã£â€šÂ·Ã£Æ’Â¥Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ°Ã¦â„¢â€š
- Row Level SecurityÃ£ÂÂ®Ã¥Â®Å¸Ã¨Â£â€¦Ã¦â„¢â€š
- Ã£â€šÂ³Ã£Æ’ÂÃ£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â¼Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£ÂÂ®Ã¨Â¨Â­Ã¥Â®Å¡Ã¦â„¢â€š

## Ã£â€šÂ¯Ã£â€šÂ¤Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£Æ’Â¬Ã£Æ’Â³Ã£â€šÂ¹

### Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šÂ·Ã£Æ’Â¼Ã£Æ’Ë†

| Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³ | Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€” | Ã¤Â¾â€¹ |
|--------------|------------|---------|
| `WHERE col = value` | B-treeÃ¯Â¼Ë†Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã¯Â¼â€° | `CREATE INDEX idx ON t (col)` |
| `WHERE col > value` | B-tree | `CREATE INDEX idx ON t (col)` |
| `WHERE a = x AND b > y` | Ã¨Â¤â€¡Ã¥ÂË† | `CREATE INDEX idx ON t (a, b)` |
| `WHERE jsonb @> '{}'` | GIN | `CREATE INDEX idx ON t USING gin (col)` |
| `WHERE tsv @@ query` | GIN | `CREATE INDEX idx ON t USING gin (col)` |
| Ã¦â„¢â€šÃ§Â³Â»Ã¥Ë†â€”Ã§Â¯â€žÃ¥â€ºÂ² | BRIN | `CREATE INDEX idx ON t USING brin (col)` |

### Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”Ã£â€šÂ¯Ã£â€šÂ¤Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£Æ’Â¬Ã£Æ’Â³Ã£â€šÂ¹

| Ã§â€Â¨Ã©â‚¬â€ | Ã¦Â­Â£Ã£Ââ€”Ã£Ââ€žÃ£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€” | Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹Ã£ÂÂ¹Ã£ÂÂ |
|----------|-------------|-------|
| ID | `bigint` | `int`Ã£â‚¬ÂÃ£Æ’Â©Ã£Æ’Â³Ã£Æ’â‚¬Ã£Æ’Â UUID |
| Ã¦â€“â€¡Ã¥Â­â€”Ã¥Ë†â€” | `text` | `varchar(255)` |
| Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â³Ã£Æ’â€” | `timestamptz` | `timestamp` |
| Ã©â€¡â€˜Ã©Â¡Â | `numeric(10,2)` | `float` |
| Ã£Æ’â€¢Ã£Æ’Â©Ã£â€šÂ° | `boolean` | `varchar`Ã£â‚¬Â`int` |

### Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

**Ã¨Â¤â€¡Ã¥ÂË†Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã£ÂÂ®Ã©Â â€ Ã¥ÂºÂ:**
```sql
-- Ã§Â­â€°Ã¤Â¾Â¡Ã¥Ë†â€”Ã£â€šâ€™Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã£â‚¬ÂÃ¦Â¬Â¡Ã£ÂÂ«Ã§Â¯â€žÃ¥â€ºÂ²Ã¥Ë†â€”
CREATE INDEX idx ON orders (status, created_at);
-- Ã¦Â¬Â¡Ã£ÂÂ®Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ«Ã¦Â©Å¸Ã¨Æ’Â½: WHERE status = 'pending' AND created_at > '2024-01-01'
```

**Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹:**
```sql
CREATE INDEX idx ON users (email) INCLUDE (name, created_at);
-- SELECT email, name, created_at Ã£ÂÂ®Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã¦Â¤Å“Ã§Â´Â¢Ã£â€šâ€™Ã¥â€ºÅ¾Ã©ÂÂ¿
```

**Ã©Æ’Â¨Ã¥Ë†â€ Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹:**
```sql
CREATE INDEX idx ON users (email) WHERE deleted_at IS NULL;
-- Ã£â€šË†Ã£â€šÅ Ã¥Â°ÂÃ£Ââ€¢Ã£ÂÂªÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã£â‚¬ÂÃ£â€šÂ¢Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€“Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šâ‚¬
```

**RLSÃ£Æ’ÂÃ£Æ’ÂªÃ£â€šÂ·Ã£Æ’Â¼Ã¯Â¼Ë†Ã¦Å“â‚¬Ã©ÂÂ©Ã¥Å’â€“Ã¯Â¼â€°:**
```sql
CREATE POLICY policy ON orders
  USING ((SELECT auth.uid()) = user_id);  -- SELECTÃ£ÂÂ§Ã£Æ’Â©Ã£Æ’Æ’Ã£Æ’â€”Ã¯Â¼Â
```

**UPSERT:**
```sql
INSERT INTO settings (user_id, key, value)
VALUES (123, 'theme', 'dark')
ON CONFLICT (user_id, key)
DO UPDATE SET value = EXCLUDED.value;
```

**Ã£â€šÂ«Ã£Æ’Â¼Ã£â€šÂ½Ã£Æ’Â«Ã£Æ’Å¡Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³:**
```sql
SELECT * FROM products WHERE id > $last_id ORDER BY id LIMIT 20;
-- O(1) vs OFFSET Ã£ÂÂ¯ O(n)
```

**Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¼Ã¥â€¡Â¦Ã§Ââ€ :**
```sql
UPDATE jobs SET status = 'processing'
WHERE id = (
  SELECT id FROM jobs WHERE status = 'pending'
  ORDER BY created_at LIMIT 1
  FOR UPDATE SKIP LOCKED
) RETURNING *;
```

### Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã¦Â¤Å“Ã¥â€¡Âº

```sql
-- Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã£ÂÂ®Ã£ÂÂªÃ£Ââ€žÃ¥Â¤â€“Ã©Æ’Â¨Ã£â€šÂ­Ã£Æ’Â¼Ã£â€šâ€™Ã¦Â¤Å“Ã§Â´Â¢
SELECT conrelid::regclass, a.attname
FROM pg_constraint c
JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
WHERE c.contype = 'f'
  AND NOT EXISTS (
    SELECT 1 FROM pg_index i
    WHERE i.indrelid = c.conrelid AND a.attnum = ANY(i.indkey)
  );

-- Ã¤Â½Å½Ã©â‚¬Å¸Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£â€šâ€™Ã¦Â¤Å“Ã§Â´Â¢
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
WHERE mean_exec_time > 100
ORDER BY mean_exec_time DESC;

-- Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã¨â€šÂ¥Ã¥Â¤Â§Ã¥Å’â€“Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
SELECT relname, n_dead_tup, last_vacuum
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC;
```

### Ã¨Â¨Â­Ã¥Â®Å¡Ã£Æ’â€ Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†

```sql
-- Ã¦Å½Â¥Ã§Â¶Å¡Ã¥Ë†Â¶Ã©â„¢ÂÃ¯Â¼Ë†RAMÃ£ÂÂ«Ã¥Â¿Å“Ã£ÂËœÃ£ÂÂ¦Ã¨ÂªÂ¿Ã¦â€¢Â´Ã¯Â¼â€°
ALTER SYSTEM SET max_connections = 100;
ALTER SYSTEM SET work_mem = '8MB';

-- Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã£â€šÂ¢Ã£â€šÂ¦Ã£Æ’Ë†
ALTER SYSTEM SET idle_in_transaction_session_timeout = '30s';
ALTER SYSTEM SET statement_timeout = '30s';

-- Ã£Æ’Â¢Ã£Æ’â€¹Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†
REVOKE ALL ON SCHEMA public FROM public;

SELECT pg_reload_conf();
```

## Ã©â€“Â¢Ã©â‚¬Â£

- Agent: `database-reviewer` - Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
- Skill: `clickhouse-io` - ClickHouseÃ¥Ë†â€ Ã¦Å¾ÂÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³
- Skill: `backend-patterns` - APIÃ£ÂÂ¨Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

---

*[Supabase Agent Skills](Supabase Agent Skills (credit: Supabase team))Ã¯Â¼Ë†MITÃ£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ»Ã£Æ’Â³Ã£â€šÂ¹Ã¯Â¼â€°Ã£ÂÂ«Ã¥Å¸ÂºÃ£ÂÂ¥Ã£ÂÂ*
