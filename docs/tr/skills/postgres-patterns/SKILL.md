---
name: postgres-patterns
description: Sorgu optimizasyonu, Ã…Å¸ema tasarÃ„Â±mÃ„Â±, indeksleme ve gÃƒÂ¼venlik iÃƒÂ§in PostgreSQL veritabanÃ„Â± kalÃ„Â±plarÃ„Â±. Supabase en iyi uygulamalarÃ„Â±na dayanÃ„Â±r.
origin: ECC
---

# PostgreSQL KalÃ„Â±plarÃ„Â±

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


PostgreSQL en iyi uygulamalarÃ„Â± iÃƒÂ§in hÃ„Â±zlÃ„Â± referans. DetaylÃ„Â± kÃ„Â±lavuz iÃƒÂ§in `database-reviewer` agent'Ã„Â±nÃ„Â± kullanÃ„Â±n.

## Ne Zaman AktifleÃ…Å¸tirmeli

- SQL sorgularÃ„Â± veya migration'lar yazarken
- VeritabanÃ„Â± Ã…Å¸emalarÃ„Â± tasarlarken
- YavaÃ…Å¸ sorgularÃ„Â± troubleshoot ederken
- Row Level Security uygularken
- Connection pooling kurarken

## HÃ„Â±zlÃ„Â± Referans

### Ã„Â°ndeks Hile SayfasÃ„Â±

| Sorgu KalÃ„Â±bÃ„Â± | Ã„Â°ndeks Tipi | Ãƒâ€“rnek |
|--------------|------------|---------|
| `WHERE col = value` | B-tree (varsayÃ„Â±lan) | `CREATE INDEX idx ON t (col)` |
| `WHERE col > value` | B-tree | `CREATE INDEX idx ON t (col)` |
| `WHERE a = x AND b > y` | Composite | `CREATE INDEX idx ON t (a, b)` |
| `WHERE jsonb @> '{}'` | GIN | `CREATE INDEX idx ON t USING gin (col)` |
| `WHERE tsv @@ query` | GIN | `CREATE INDEX idx ON t USING gin (col)` |
| Zaman serisi aralÃ„Â±klarÃ„Â± | BRIN | `CREATE INDEX idx ON t USING brin (col)` |

### Veri Tipi HÃ„Â±zlÃ„Â± Referans

| KullanÃ„Â±m Senaryosu | DoÃ„Å¸ru Tip | KaÃƒÂ§Ã„Â±n |
|----------|-------------|-------|
| ID'ler | `bigint` | `int`, rastgele UUID |
| String'ler | `text` | `varchar(255)` |
| Timestamp'ler | `timestamptz` | `timestamp` |
| Para | `numeric(10,2)` | `float` |
| Flag'ler | `boolean` | `varchar`, `int` |

### YaygÃ„Â±n KalÃ„Â±plar

**Composite Ã„Â°ndeks SÃ„Â±rasÃ„Â±:**
```sql
-- Ãƒâ€“nce eÃ…Å¸itlik sÃƒÂ¼tunlarÃ„Â±, sonra aralÃ„Â±k sÃƒÂ¼tunlarÃ„Â±
CREATE INDEX idx ON orders (status, created_at);
-- Ã…Å¾unlar iÃƒÂ§in ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r: WHERE status = 'pending' AND created_at > '2024-01-01'
```

**Covering Ã„Â°ndeks:**
```sql
CREATE INDEX idx ON users (email) INCLUDE (name, created_at);
-- SELECT email, name, created_at iÃƒÂ§in tablo aramasÃ„Â±nÃ„Â± ÃƒÂ¶nler
```

**Partial Ã„Â°ndeks:**
```sql
CREATE INDEX idx ON users (email) WHERE deleted_at IS NULL;
-- Daha kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k indeks, sadece aktif kullanÃ„Â±cÃ„Â±larÃ„Â± iÃƒÂ§erir
```

**RLS Policy (Optimize EdilmiÃ…Å¸):**
```sql
CREATE POLICY policy ON orders
  USING ((SELECT auth.uid()) = user_id);  -- SELECT'e sar!
```

**UPSERT:**
```sql
INSERT INTO settings (user_id, key, value)
VALUES (123, 'theme', 'dark')
ON CONFLICT (user_id, key)
DO UPDATE SET value = EXCLUDED.value;
```

**Cursor Sayfalama:**
```sql
SELECT * FROM products WHERE id > $last_id ORDER BY id LIMIT 20;
-- O(1) vs O(n) olan OFFSET
```

**Kuyruk Ã„Â°Ã…Å¸leme:**
```sql
UPDATE jobs SET status = 'processing'
WHERE id = (
  SELECT id FROM jobs WHERE status = 'pending'
  ORDER BY created_at LIMIT 1
  FOR UPDATE SKIP LOCKED
) RETURNING *;
```

### Anti-KalÃ„Â±p Tespiti

```sql
-- Ã„Â°ndekslenmemiÃ…Å¸ foreign key'leri bul
SELECT conrelid::regclass, a.attname
FROM pg_constraint c
JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
WHERE c.contype = 'f'
  AND NOT EXISTS (
    SELECT 1 FROM pg_index i
    WHERE i.indrelid = c.conrelid AND a.attnum = ANY(i.indkey)
  );

-- YavaÃ…Å¸ sorgularÃ„Â± bul
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
WHERE mean_exec_time > 100
ORDER BY mean_exec_time DESC;

-- Tablo bloat'Ã„Â±nÃ„Â± kontrol et
SELECT relname, n_dead_tup, last_vacuum
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC;
```

### YapÃ„Â±landÃ„Â±rma Ã…Å¾ablonu

```sql
-- BaÃ„Å¸lantÃ„Â± limitleri (RAM iÃƒÂ§in ayarla)
ALTER SYSTEM SET max_connections = 100;
ALTER SYSTEM SET work_mem = '8MB';

-- Timeout'lar
ALTER SYSTEM SET idle_in_transaction_session_timeout = '30s';
ALTER SYSTEM SET statement_timeout = '30s';

-- Ã„Â°zleme
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- GÃƒÂ¼venlik varsayÃ„Â±lanlarÃ„Â±
REVOKE ALL ON SCHEMA public FROM public;

SELECT pg_reload_conf();
```

## Ã„Â°lgili

- Agent: `database-reviewer` - Tam veritabanÃ„Â± inceleme iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±
- Skill: `clickhouse-io` - ClickHouse analytics kalÃ„Â±plarÃ„Â±
- Skill: `backend-patterns` - API ve backend kalÃ„Â±plarÃ„Â±

---

*Supabase Agent Skills'e dayanÃ„Â±r (kredi: Supabase ekibi) (MIT License)*
