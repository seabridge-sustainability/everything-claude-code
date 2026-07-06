---
name: clickhouse-io
description: ClickHouse database patterns, query optimization, analytics, and data engineering best practices for high-performance analytical workloads.
---

# ClickHouse Ã¥Ë†â€ Ã¦Å¾ÂÃ¦Â¨Â¡Ã¥Â¼Â

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


Ã§â€Â¨Ã¦â€“Â¼Ã©Â«ËœÃ¦â€¢Ë†Ã¨Æ’Â½Ã¥Ë†â€ Ã¦Å¾ÂÃ¥â€™Å’Ã¨Â³â€¡Ã¦â€“â„¢Ã¥Â·Â¥Ã§Â¨â€¹Ã§Å¡â€ž ClickHouse Ã§â€°Â¹Ã¥Â®Å¡Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š

## Ã¦Â¦â€šÃ¨Â¿Â°

ClickHouse Ã¦ËœÂ¯Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã¥Ë†â€”Ã¥Â¼ÂÃ¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã§Â®Â¡Ã§Ââ€ Ã§Â³Â»Ã§ÂµÂ±Ã¯Â¼Ë†DBMSÃ¯Â¼â€°Ã¯Â¼Å’Ã§â€Â¨Ã¦â€“Â¼Ã§Â·Å¡Ã¤Â¸Å Ã¥Ë†â€ Ã¦Å¾ÂÃ¨â„¢â€¢Ã§Ââ€ Ã¯Â¼Ë†OLAPÃ¯Â¼â€°Ã£â‚¬â€šÃ¥Â®Æ’Ã©â€¡ÂÃ¥Â°ÂÃ¥Â¤Â§Ã¥Å¾â€¹Ã¨Â³â€¡Ã¦â€“â„¢Ã©â€ºâ€ Ã§Å¡â€žÃ¥Â¿Â«Ã©â‚¬Å¸Ã¥Ë†â€ Ã¦Å¾ÂÃ¦Å¸Â¥Ã¨Â©Â¢Ã©â‚¬Â²Ã¨Â¡Å’Ã¤Âºâ€ Ã¥â€žÂªÃ¥Å’â€“Ã£â‚¬â€š

**Ã©â€”Å“Ã©ÂÂµÃ§â€°Â¹Ã¦â‚¬Â§Ã¯Â¼Å¡**
- Ã¥Ë†â€”Ã¥Â¼ÂÃ¥â€žÂ²Ã¥Â­Ëœ
- Ã¨Â³â€¡Ã¦â€“â„¢Ã¥Â£â€œÃ§Â¸Â®
- Ã¥Â¹Â³Ã¨Â¡Å’Ã¦Å¸Â¥Ã¨Â©Â¢Ã¥Å¸Â·Ã¨Â¡Å’
- Ã¥Ë†â€ Ã¦â€¢Â£Ã¥Â¼ÂÃ¦Å¸Â¥Ã¨Â©Â¢
- Ã¥ÂÂ³Ã¦â„¢â€šÃ¥Ë†â€ Ã¦Å¾Â

## Ã¨Â¡Â¨Ã¦Â Â¼Ã¨Â¨Â­Ã¨Â¨Ë†Ã¦Â¨Â¡Ã¥Â¼Â

### MergeTree Ã¥Â¼â€¢Ã¦â€œÅ½Ã¯Â¼Ë†Ã¦Å“â‚¬Ã¥Â¸Â¸Ã¨Â¦â€¹Ã¯Â¼â€°

```sql
CREATE TABLE markets_analytics (
    date Date,
    market_id String,
    market_name String,
    volume UInt64,
    trades UInt32,
    unique_traders UInt32,
    avg_trade_size Float64,
    created_at DateTime
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (date, market_id)
SETTINGS index_granularity = 8192;
```

### ReplacingMergeTreeÃ¯Â¼Ë†Ã¥Å½Â»Ã©â€¡ÂÃ¯Â¼â€°

```sql
-- Ã§â€Â¨Ã¦â€“Â¼Ã¥ÂÂ¯Ã¨Æ’Â½Ã¦Å“â€°Ã©â€¡ÂÃ¨Â¤â€¡Ã§Å¡â€žÃ¨Â³â€¡Ã¦â€“â„¢Ã¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€šÃ¤Â¾â€ Ã¨â€¡ÂªÃ¥Â¤Å¡Ã¥â‚¬â€¹Ã¤Â¾â€ Ã¦ÂºÂÃ¯Â¼â€°
CREATE TABLE user_events (
    event_id String,
    user_id String,
    event_type String,
    timestamp DateTime,
    properties String
) ENGINE = ReplacingMergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (user_id, event_id, timestamp)
PRIMARY KEY (user_id, event_id);
```

### AggregatingMergeTreeÃ¯Â¼Ë†Ã©Â ÂÃ¨ÂÅ¡Ã¥ÂË†Ã¯Â¼â€°

```sql
-- Ã§â€Â¨Ã¦â€“Â¼Ã§Â¶Â­Ã¨Â­Â·Ã¨ÂÅ¡Ã¥ÂË†Ã¦Å’â€¡Ã¦Â¨â„¢
CREATE TABLE market_stats_hourly (
    hour DateTime,
    market_id String,
    total_volume AggregateFunction(sum, UInt64),
    total_trades AggregateFunction(count, UInt32),
    unique_users AggregateFunction(uniq, String)
) ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(hour)
ORDER BY (hour, market_id);

-- Ã¦Å¸Â¥Ã¨Â©Â¢Ã¨ÂÅ¡Ã¥ÂË†Ã¨Â³â€¡Ã¦â€“â„¢
SELECT
    hour,
    market_id,
    sumMerge(total_volume) AS volume,
    countMerge(total_trades) AS trades,
    uniqMerge(unique_users) AS users
FROM market_stats_hourly
WHERE hour >= toStartOfHour(now() - INTERVAL 24 HOUR)
GROUP BY hour, market_id
ORDER BY hour DESC;
```

## Ã¦Å¸Â¥Ã¨Â©Â¢Ã¥â€žÂªÃ¥Å’â€“Ã¦Â¨Â¡Ã¥Â¼Â

### Ã©Â«ËœÃ¦â€¢Ë†Ã©ÂÅ½Ã¦Â¿Â¾

```sql
-- PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã§Â´Â¢Ã¥Â¼â€¢Ã¦Â¬â€žÃ¤Â½Â
SELECT *
FROM markets_analytics
WHERE date >= '2025-01-01'
  AND market_id = 'market-123'
  AND volume > 1000
ORDER BY date DESC
LIMIT 100;

-- FAIL: Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã¥â€¦Ë†Ã©ÂÅ½Ã¦Â¿Â¾Ã©ÂÅ¾Ã§Â´Â¢Ã¥Â¼â€¢Ã¦Â¬â€žÃ¤Â½Â
SELECT *
FROM markets_analytics
WHERE volume > 1000
  AND market_name LIKE '%election%'
  AND date >= '2025-01-01';
```

### Ã¨ÂÅ¡Ã¥ÂË†

```sql
-- PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ ClickHouse Ã§â€°Â¹Ã¥Â®Å¡Ã¨ÂÅ¡Ã¥ÂË†Ã¥â€¡Â½Ã¥Â¼Â
SELECT
    toStartOfDay(created_at) AS day,
    market_id,
    sum(volume) AS total_volume,
    count() AS total_trades,
    uniq(trader_id) AS unique_traders,
    avg(trade_size) AS avg_size
FROM trades
WHERE created_at >= today() - INTERVAL 7 DAY
GROUP BY day, market_id
ORDER BY day DESC, total_volume DESC;

-- PASS: Ã¤Â½Â¿Ã§â€Â¨ quantile Ã¨Â¨Ë†Ã§Â®â€”Ã§â„¢Â¾Ã¥Ë†â€ Ã¤Â½ÂÃ¦â€¢Â¸Ã¯Â¼Ë†Ã¦Â¯â€ percentile Ã¦â€ºÂ´Ã©Â«ËœÃ¦â€¢Ë†Ã¯Â¼â€°
SELECT
    quantile(0.50)(trade_size) AS median,
    quantile(0.95)(trade_size) AS p95,
    quantile(0.99)(trade_size) AS p99
FROM trades
WHERE created_at >= now() - INTERVAL 1 HOUR;
```

### Ã¨Â¦â€“Ã§Âªâ€”Ã¥â€¡Â½Ã¥Â¼Â

```sql
-- Ã¨Â¨Ë†Ã§Â®â€”Ã§Â´Â¯Ã¨Â¨Ë†Ã§Â¸Â½Ã¥â€™Å’
SELECT
    date,
    market_id,
    volume,
    sum(volume) OVER (
        PARTITION BY market_id
        ORDER BY date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_volume
FROM markets_analytics
WHERE date >= today() - INTERVAL 30 DAY
ORDER BY market_id, date;
```

## Ã¨Â³â€¡Ã¦â€“â„¢Ã¦Ââ€™Ã¥â€¦Â¥Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¦â€°Â¹Ã©â€¡ÂÃ¦Ââ€™Ã¥â€¦Â¥Ã¯Â¼Ë†Ã¦Å½Â¨Ã¨â€“Â¦Ã¯Â¼â€°

```typescript
import { ClickHouse } from 'clickhouse'

const clickhouse = new ClickHouse({
  url: process.env.CLICKHOUSE_URL,
  port: 8123,
  basicAuth: {
    username: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD
  }
})

// PASS: Ã¦â€°Â¹Ã©â€¡ÂÃ¦Ââ€™Ã¥â€¦Â¥Ã¯Â¼Ë†Ã©Â«ËœÃ¦â€¢Ë†Ã¯Â¼â€°
async function bulkInsertTrades(trades: Trade[]) {
  const values = trades.map(trade => `(
    '${trade.id}',
    '${trade.market_id}',
    '${trade.user_id}',
    ${trade.amount},
    '${trade.timestamp.toISOString()}'
  )`).join(',')

  await clickhouse.query(`
    INSERT INTO trades (id, market_id, user_id, amount, timestamp)
    VALUES ${values}
  `).toPromise()
}

// FAIL: Ã¥â‚¬â€¹Ã¥Ë†Â¥Ã¦Ââ€™Ã¥â€¦Â¥Ã¯Â¼Ë†Ã¦â€¦Â¢Ã¯Â¼â€°
async function insertTrade(trade: Trade) {
  // Ã¤Â¸ÂÃ¨Â¦ÂÃ¥Å“Â¨Ã¨Â¿Â´Ã¥Å“Ë†Ã¤Â¸Â­Ã©â‚¬â„¢Ã¦Â¨Â£Ã¥ÂÅ¡Ã¯Â¼Â
  await clickhouse.query(`
    INSERT INTO trades VALUES ('${trade.id}', ...)
  `).toPromise()
}
```

### Ã¤Â¸Â²Ã¦ÂµÂÃ¦Ââ€™Ã¥â€¦Â¥

```typescript
// Ã§â€Â¨Ã¦â€“Â¼Ã¦Å’ÂÃ§ÂºÅ’Ã¨Â³â€¡Ã¦â€“â„¢Ã¦â€ÂÃ¥Ââ€“
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'

async function streamInserts() {
  const stream = clickhouse.insert('trades').stream()

  for await (const batch of dataSource) {
    stream.write(batch)
  }

  await stream.end()
}
```

## Ã§â€°Â©Ã¥Å’â€“Ã¨Â¦â€“Ã¥Å“â€“

### Ã¥ÂÂ³Ã¦â„¢â€šÃ¨ÂÅ¡Ã¥ÂË†

```sql
-- Ã¥Â»ÂºÃ§Â«â€¹Ã¦Â¯ÂÃ¥Â°ÂÃ¦â„¢â€šÃ§ÂµÂ±Ã¨Â¨Ë†Ã§Å¡â€žÃ§â€°Â©Ã¥Å’â€“Ã¨Â¦â€“Ã¥Å“â€“
CREATE MATERIALIZED VIEW market_stats_hourly_mv
TO market_stats_hourly
AS SELECT
    toStartOfHour(timestamp) AS hour,
    market_id,
    sumState(amount) AS total_volume,
    countState() AS total_trades,
    uniqState(user_id) AS unique_users
FROM trades
GROUP BY hour, market_id;

-- Ã¦Å¸Â¥Ã¨Â©Â¢Ã§â€°Â©Ã¥Å’â€“Ã¨Â¦â€“Ã¥Å“â€“
SELECT
    hour,
    market_id,
    sumMerge(total_volume) AS volume,
    countMerge(total_trades) AS trades,
    uniqMerge(unique_users) AS users
FROM market_stats_hourly
WHERE hour >= now() - INTERVAL 24 HOUR
GROUP BY hour, market_id;
```

## Ã¦â€¢Ë†Ã¨Æ’Â½Ã§â€ºÂ£Ã¦Å½Â§

### Ã¦Å¸Â¥Ã¨Â©Â¢Ã¦â€¢Ë†Ã¨Æ’Â½

```sql
-- Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¦â€¦Â¢Ã¦Å¸Â¥Ã¨Â©Â¢
SELECT
    query_id,
    user,
    query,
    query_duration_ms,
    read_rows,
    read_bytes,
    memory_usage
FROM system.query_log
WHERE type = 'QueryFinish'
  AND query_duration_ms > 1000
  AND event_time >= now() - INTERVAL 1 HOUR
ORDER BY query_duration_ms DESC
LIMIT 10;
```

### Ã¨Â¡Â¨Ã¦Â Â¼Ã§ÂµÂ±Ã¨Â¨Ë†

```sql
-- Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¨Â¡Â¨Ã¦Â Â¼Ã¥Â¤Â§Ã¥Â°Â
SELECT
    database,
    table,
    formatReadableSize(sum(bytes)) AS size,
    sum(rows) AS rows,
    max(modification_time) AS latest_modification
FROM system.parts
WHERE active
GROUP BY database, table
ORDER BY sum(bytes) DESC;
```

## Ã¥Â¸Â¸Ã¨Â¦â€¹Ã¥Ë†â€ Ã¦Å¾ÂÃ¦Å¸Â¥Ã¨Â©Â¢

### Ã¦â„¢â€šÃ©â€“â€œÃ¥ÂºÂÃ¥Ë†â€”Ã¥Ë†â€ Ã¦Å¾Â

```sql
-- Ã¦Â¯ÂÃ¦â€”Â¥Ã¦Â´Â»Ã¨ÂºÂÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦
SELECT
    toDate(timestamp) AS date,
    uniq(user_id) AS daily_active_users
FROM events
WHERE timestamp >= today() - INTERVAL 30 DAY
GROUP BY date
ORDER BY date;

-- Ã§â€¢â„¢Ã¥Â­ËœÃ¥Ë†â€ Ã¦Å¾Â
SELECT
    signup_date,
    countIf(days_since_signup = 0) AS day_0,
    countIf(days_since_signup = 1) AS day_1,
    countIf(days_since_signup = 7) AS day_7,
    countIf(days_since_signup = 30) AS day_30
FROM (
    SELECT
        user_id,
        min(toDate(timestamp)) AS signup_date,
        toDate(timestamp) AS activity_date,
        dateDiff('day', signup_date, activity_date) AS days_since_signup
    FROM events
    GROUP BY user_id, activity_date
)
GROUP BY signup_date
ORDER BY signup_date DESC;
```

### Ã¦Â¼ÂÃ¦â€“â€”Ã¥Ë†â€ Ã¦Å¾Â

```sql
-- Ã¨Â½â€°Ã¦Ââ€ºÃ¦Â¼ÂÃ¦â€“â€”
SELECT
    countIf(step = 'viewed_market') AS viewed,
    countIf(step = 'clicked_trade') AS clicked,
    countIf(step = 'completed_trade') AS completed,
    round(clicked / viewed * 100, 2) AS view_to_click_rate,
    round(completed / clicked * 100, 2) AS click_to_completion_rate
FROM (
    SELECT
        user_id,
        session_id,
        event_type AS step
    FROM events
    WHERE event_date = today()
)
GROUP BY session_id;
```

### Ã¤Â¸â€“Ã¤Â»Â£Ã¥Ë†â€ Ã¦Å¾Â

```sql
-- Ã¦Å’â€°Ã¨Â¨Â»Ã¥â€ Å Ã¦Å“Ë†Ã¤Â»Â½Ã§Å¡â€žÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¤Â¸â€“Ã¤Â»Â£
SELECT
    toStartOfMonth(signup_date) AS cohort,
    toStartOfMonth(activity_date) AS month,
    dateDiff('month', cohort, month) AS months_since_signup,
    count(DISTINCT user_id) AS active_users
FROM (
    SELECT
        user_id,
        min(toDate(timestamp)) OVER (PARTITION BY user_id) AS signup_date,
        toDate(timestamp) AS activity_date
    FROM events
)
GROUP BY cohort, month, months_since_signup
ORDER BY cohort, months_since_signup;
```

## Ã¨Â³â€¡Ã¦â€“â„¢Ã§Â®Â¡Ã§Â·Å¡Ã¦Â¨Â¡Ã¥Â¼Â

### ETL Ã¦Â¨Â¡Ã¥Â¼Â

```typescript
// Ã¦ÂÂÃ¥Ââ€“Ã£â‚¬ÂÃ¨Â½â€°Ã¦Ââ€ºÃ£â‚¬ÂÃ¨Â¼â€°Ã¥â€¦Â¥
async function etlPipeline() {
  // 1. Ã¥Â¾Å¾Ã¤Â¾â€ Ã¦ÂºÂÃ¦ÂÂÃ¥Ââ€“
  const rawData = await extractFromPostgres()

  // 2. Ã¨Â½â€°Ã¦Ââ€º
  const transformed = rawData.map(row => ({
    date: new Date(row.created_at).toISOString().split('T')[0],
    market_id: row.market_slug,
    volume: parseFloat(row.total_volume),
    trades: parseInt(row.trade_count)
  }))

  // 3. Ã¨Â¼â€°Ã¥â€¦Â¥Ã¥Ë†Â° ClickHouse
  await bulkInsertToClickHouse(transformed)
}

// Ã¥Â®Å¡Ã¦Å“Å¸Ã¥Å¸Â·Ã¨Â¡Å’
setInterval(etlPipeline, 60 * 60 * 1000)  // Ã¦Â¯ÂÃ¥Â°ÂÃ¦â„¢â€š
```

### Ã¨Â®Å Ã¦â€ºÂ´Ã¨Â³â€¡Ã¦â€“â„¢Ã¦Ââ€¢Ã§ÂÂ²Ã¯Â¼Ë†CDCÃ¯Â¼â€°

```typescript
// Ã§â€ºÂ£Ã¨ÂÂ½ PostgreSQL Ã¨Â®Å Ã¦â€ºÂ´Ã¤Â¸Â¦Ã¥ÂÅ’Ã¦Â­Â¥Ã¥Ë†Â° ClickHouse
import { Client } from 'pg'

const pgClient = new Client({ connectionString: process.env.DATABASE_URL })

pgClient.query('LISTEN market_updates')

pgClient.on('notification', async (msg) => {
  const update = JSON.parse(msg.payload)

  await clickhouse.insert('market_updates', [
    {
      market_id: update.id,
      event_type: update.operation,  // INSERT, UPDATE, DELETE
      timestamp: new Date(),
      data: JSON.stringify(update.new_data)
    }
  ])
})
```

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢

### 1. Ã¥Ë†â€ Ã¥Ââ‚¬Ã§Â­â€“Ã§â€¢Â¥
- Ã¦Å’â€°Ã¦â„¢â€šÃ©â€“â€œÃ¥Ë†â€ Ã¥Ââ‚¬Ã¯Â¼Ë†Ã©â‚¬Å¡Ã¥Â¸Â¸Ã¦Å’â€°Ã¦Å“Ë†Ã¦Ë†â€“Ã¦â€”Â¥Ã¯Â¼â€°
- Ã©ÂÂ¿Ã¥â€¦ÂÃ¥Â¤ÂªÃ¥Â¤Å¡Ã¥Ë†â€ Ã¥Ââ‚¬Ã¯Â¼Ë†Ã¦â€¢Ë†Ã¨Æ’Â½Ã¥Â½Â±Ã©Å¸Â¿Ã¯Â¼â€°
- Ã¥Ë†â€ Ã¥Ââ‚¬Ã©ÂÂµÃ¤Â½Â¿Ã§â€Â¨ DATE Ã©Â¡Å¾Ã¥Å¾â€¹

### 2. Ã¦Å½â€™Ã¥ÂºÂÃ©ÂÂµ
- Ã¦Å“â‚¬Ã¥Â¸Â¸Ã©ÂÅ½Ã¦Â¿Â¾Ã§Å¡â€žÃ¦Â¬â€žÃ¤Â½ÂÃ¦â€Â¾Ã¥Å“Â¨Ã¦Å“â‚¬Ã¥â€°ÂÃ©ÂÂ¢
- Ã¨â‚¬Æ’Ã¦â€¦Â®Ã¥Å¸ÂºÃ¦â€¢Â¸Ã¯Â¼Ë†Ã©Â«ËœÃ¥Å¸ÂºÃ¦â€¢Â¸Ã¥â€žÂªÃ¥â€¦Ë†Ã¯Â¼â€°
- Ã¦Å½â€™Ã¥ÂºÂÃ¥Â½Â±Ã©Å¸Â¿Ã¥Â£â€œÃ§Â¸Â®

### 3. Ã¨Â³â€¡Ã¦â€“â„¢Ã©Â¡Å¾Ã¥Å¾â€¹
- Ã¤Â½Â¿Ã§â€Â¨Ã¦Å“â‚¬Ã¥Â°ÂÃ§Å¡â€žÃ©ÂÂ©Ã§â€¢Â¶Ã©Â¡Å¾Ã¥Å¾â€¹Ã¯Â¼Ë†UInt32 vs UInt64Ã¯Â¼â€°
- Ã©â€¡ÂÃ¨Â¤â€¡Ã¥Â­â€”Ã¤Â¸Â²Ã¤Â½Â¿Ã§â€Â¨ LowCardinality
- Ã¥Ë†â€ Ã©Â¡Å¾Ã¨Â³â€¡Ã¦â€“â„¢Ã¤Â½Â¿Ã§â€Â¨ Enum

### 4. Ã©ÂÂ¿Ã¥â€¦Â
- SELECT *Ã¯Â¼Ë†Ã¦Å’â€¡Ã¥Â®Å¡Ã¦Â¬â€žÃ¤Â½ÂÃ¯Â¼â€°
- FINALÃ¯Â¼Ë†Ã¦â€Â¹Ã§â€šÂºÃ¥Å“Â¨Ã¦Å¸Â¥Ã¨Â©Â¢Ã¥â€°ÂÃ¥ÂË†Ã¤Â½ÂµÃ¨Â³â€¡Ã¦â€“â„¢Ã¯Â¼â€°
- Ã¥Â¤ÂªÃ¥Â¤Å¡ JOINsÃ¯Â¼Ë†Ã§â€šÂºÃ¥Ë†â€ Ã¦Å¾ÂÃ¥ÂÂÃ¦Â­Â£Ã¨Â¦ÂÃ¥Å’â€“Ã¯Â¼â€°
- Ã¥Â°ÂÃ©â€¡ÂÃ©Â Â»Ã§Â¹ÂÃ¦Ââ€™Ã¥â€¦Â¥Ã¯Â¼Ë†Ã¦â€Â¹Ã§â€Â¨Ã¦â€°Â¹Ã©â€¡ÂÃ¯Â¼â€°

### 5. Ã§â€ºÂ£Ã¦Å½Â§
- Ã¨Â¿Â½Ã¨Â¹Â¤Ã¦Å¸Â¥Ã¨Â©Â¢Ã¦â€¢Ë†Ã¨Æ’Â½
- Ã§â€ºÂ£Ã¦Å½Â§Ã§Â£ÂÃ§Â¢Å¸Ã¤Â½Â¿Ã§â€Â¨
- Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¥ÂË†Ã¤Â½ÂµÃ¦â€œÂÃ¤Â½Å“
- Ã¥Â¯Â©Ã¦Å¸Â¥Ã¦â€¦Â¢Ã¦Å¸Â¥Ã¨Â©Â¢Ã¦â€”Â¥Ã¨ÂªÅ’

**Ã¨Â¨ËœÃ¤Â½Â**Ã¯Â¼Å¡ClickHouse Ã¦â€œâ€¦Ã©â€¢Â·Ã¥Ë†â€ Ã¦Å¾ÂÃ¥Â·Â¥Ã¤Â½Å“Ã¨Â²Â Ã¨Â¼â€°Ã£â‚¬â€šÃ§â€šÂºÃ¤Â½Â Ã§Å¡â€žÃ¦Å¸Â¥Ã¨Â©Â¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ¨Â¨Â­Ã¨Â¨Ë†Ã¨Â¡Â¨Ã¦Â Â¼Ã¯Â¼Å’Ã¦â€°Â¹Ã©â€¡ÂÃ¦Ââ€™Ã¥â€¦Â¥Ã¯Â¼Å’Ã¤Â¸Â¦Ã¥Ë†Â©Ã§â€Â¨Ã§â€°Â©Ã¥Å’â€“Ã¨Â¦â€“Ã¥Å“â€“Ã©â‚¬Â²Ã¨Â¡Å’Ã¥ÂÂ³Ã¦â„¢â€šÃ¨ÂÅ¡Ã¥ÂË†Ã£â‚¬â€š
