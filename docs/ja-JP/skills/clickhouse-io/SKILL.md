---
name: clickhouse-io
description: ClickHouse database patterns, query optimization, analytics, and data engineering best practices for high-performance analytical workloads.
---

# ClickHouse Ã¥Ë†â€ Ã¦Å¾ÂÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã©Â«ËœÃ¦â‚¬Â§Ã¨Æ’Â½Ã¥Ë†â€ Ã¦Å¾ÂÃ£ÂÂ¨Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¨Ã£Æ’Â³Ã£â€šÂ¸Ã£Æ’â€¹Ã£â€šÂ¢Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®ClickHouseÃ¥â€ºÂºÃ¦Å“â€°Ã£ÂÂ®Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£â‚¬â€š

## Ã¦Â¦â€šÃ¨Â¦Â

ClickHouseÃ£ÂÂ¯Ã£â‚¬ÂÃ£â€šÂªÃ£Æ’Â³Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Â³Ã¥Ë†â€ Ã¦Å¾ÂÃ¥â€¡Â¦Ã§Ââ€ Ã¯Â¼Ë†OLAPÃ¯Â¼â€°Ã§â€Â¨Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’Â©Ã£Æ’Â Ã¦Å’â€¡Ã¥Ââ€˜Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã§Â®Â¡Ã§Ââ€ Ã£â€šÂ·Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â Ã¯Â¼Ë†DBMSÃ¯Â¼â€°Ã£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€šÃ¥Â¤Â§Ã¨Â¦ÂÃ¦Â¨Â¡Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ»Ã£Æ’Æ’Ã£Æ’Ë†Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ„¢Ã£â€šâ€¹Ã©Â«ËœÃ©â‚¬Å¸Ã¥Ë†â€ Ã¦Å¾ÂÃ£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£ÂÂ«Ã¦Å“â‚¬Ã©ÂÂ©Ã¥Å’â€“Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

**Ã¤Â¸Â»Ã£ÂÂªÃ¦Â©Å¸Ã¨Æ’Â½:**
- Ã£â€šÂ«Ã£Æ’Â©Ã£Æ’Â Ã¦Å’â€¡Ã¥Ââ€˜Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ¸
- Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥Å“Â§Ã§Â¸Â®
- Ã¤Â¸Â¦Ã¥Ë†â€”Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ¥Â®Å¸Ã¨Â¡Å’
- Ã¥Ë†â€ Ã¦â€¢Â£Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Âª
- Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â«Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã¥Ë†â€ Ã¦Å¾Â

## Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã¨Â¨Â­Ã¨Â¨Ë†Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### MergeTreeÃ£â€šÂ¨Ã£Æ’Â³Ã£â€šÂ¸Ã£Æ’Â³Ã¯Â¼Ë†Ã¦Å“â‚¬Ã£â€šâ€šÃ¤Â¸â‚¬Ã¨Ë†Â¬Ã§Å¡â€žÃ¯Â¼â€°

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

### ReplacingMergeTreeÃ¯Â¼Ë†Ã©â€¡ÂÃ¨Â¤â€¡Ã¦Å½â€™Ã©â„¢Â¤Ã¯Â¼â€°

```sql
-- Ã©â€¡ÂÃ¨Â¤â€¡Ã£ÂÅ’Ã£Ââ€šÃ£â€šâ€¹Ã¥ÂÂ¯Ã¨Æ’Â½Ã¦â‚¬Â§Ã£ÂÂ®Ã£Ââ€šÃ£â€šâ€¹Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¯Â¼Ë†Ã¨Â¤â€¡Ã¦â€¢Â°Ã£ÂÂ®Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£Ââ€¹Ã£â€šâ€°Ã£ÂÂªÃ£ÂÂ©Ã¯Â¼â€°Ã§â€Â¨
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

### AggregatingMergeTreeÃ¯Â¼Ë†Ã¤Âºâ€¹Ã¥â€°ÂÃ©â€ºâ€ Ã¨Â¨Ë†Ã¯Â¼â€°

```sql
-- Ã©â€ºâ€ Ã¨Â¨Ë†Ã£Æ’Â¡Ã£Æ’Ë†Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¹Ã£ÂÂ®Ã§Â¶Â­Ã¦Å’ÂÃ§â€Â¨
CREATE TABLE market_stats_hourly (
    hour DateTime,
    market_id String,
    total_volume AggregateFunction(sum, UInt64),
    total_trades AggregateFunction(count, UInt32),
    unique_users AggregateFunction(uniq, String)
) ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(hour)
ORDER BY (hour, market_id);

-- Ã©â€ºâ€ Ã¨Â¨Ë†Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£ÂÂ®Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Âª
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

## Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ¦Å“â‚¬Ã©ÂÂ©Ã¥Å’â€“Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### Ã¥Å Â¹Ã§Å½â€¡Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°

```sql
-- PASS: Ã¨â€°Â¯Ã£Ââ€ž: Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã¥Ë†â€”Ã£â€šâ€™Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã¤Â½Â¿Ã§â€Â¨
SELECT *
FROM markets_analytics
WHERE date >= '2025-01-01'
  AND market_id = 'market-123'
  AND volume > 1000
ORDER BY date DESC
LIMIT 100;

-- FAIL: Ã¦â€šÂªÃ£Ââ€ž: Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã£ÂÂ®Ã£ÂÂªÃ£Ââ€žÃ¥Ë†â€”Ã£â€šâ€™Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°
SELECT *
FROM markets_analytics
WHERE volume > 1000
  AND market_name LIKE '%election%'
  AND date >= '2025-01-01';
```

### Ã©â€ºâ€ Ã¨Â¨Ë†

```sql
-- PASS: Ã¨â€°Â¯Ã£Ââ€ž: ClickHouseÃ¥â€ºÂºÃ¦Å“â€°Ã£ÂÂ®Ã©â€ºâ€ Ã¨Â¨Ë†Ã©â€“Â¢Ã¦â€¢Â°Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
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

-- PASS: Ã£Æ’â€˜Ã£Æ’Â¼Ã£â€šÂ»Ã£Æ’Â³Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ«Ã£ÂÂ¯quantileÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Ë†percentileÃ£â€šË†Ã£â€šÅ Ã¥Å Â¹Ã§Å½â€¡Ã§Å¡â€žÃ¯Â¼â€°
SELECT
    quantile(0.50)(trade_size) AS median,
    quantile(0.95)(trade_size) AS p95,
    quantile(0.99)(trade_size) AS p99
FROM trades
WHERE created_at >= now() - INTERVAL 1 HOUR;
```

### Ã£â€šÂ¦Ã£â€šÂ£Ã£Æ’Â³Ã£Æ’â€°Ã£â€šÂ¦Ã©â€“Â¢Ã¦â€¢Â°

```sql
-- Ã§Â´Â¯Ã¨Â¨Ë†Ã¨Â¨Ë†Ã§Â®â€”
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

## Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¦Å’Â¿Ã¥â€¦Â¥Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### Ã¤Â¸â‚¬Ã¦â€¹Â¬Ã¦Å’Â¿Ã¥â€¦Â¥Ã¯Â¼Ë†Ã¦Å½Â¨Ã¥Â¥Â¨Ã¯Â¼â€°

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

// PASS: Ã£Æ’ÂÃ£Æ’Æ’Ã£Æ’ÂÃ¦Å’Â¿Ã¥â€¦Â¥Ã¯Â¼Ë†Ã¥Å Â¹Ã§Å½â€¡Ã§Å¡â€žÃ¯Â¼â€°
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

// FAIL: Ã¥â‚¬â€¹Ã¥Ë†Â¥Ã¦Å’Â¿Ã¥â€¦Â¥Ã¯Â¼Ë†Ã¤Â½Å½Ã©â‚¬Å¸Ã¯Â¼â€°
async function insertTrade(trade: Trade) {
  // Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’â€”Ã¥â€ â€¦Ã£ÂÂ§Ã£Ââ€œÃ£â€šÅ’Ã£â€šâ€™Ã£Ââ€”Ã£ÂÂªÃ£Ââ€žÃ£ÂÂ§Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ¯Â¼Â
  await clickhouse.query(`
    INSERT INTO trades VALUES ('${trade.id}', ...)
  `).toPromise()
}
```

### Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Å¸Ã£Æ’Â³Ã£â€šÂ°Ã¦Å’Â¿Ã¥â€¦Â¥

```typescript
// Ã§Â¶â„¢Ã§Â¶Å¡Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥Ââ€“Ã£â€šÅ Ã¨Â¾Â¼Ã£ÂÂ¿Ã§â€Â¨
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

## Ã£Æ’Å¾Ã£Æ’â€ Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂºÃ£Æ’â€°Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼

### Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â«Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã©â€ºâ€ Ã¨Â¨Ë†

```sql
-- Ã¦â„¢â€šÃ©â€“â€œÃ¥Ë†Â¥Ã§ÂµÂ±Ã¨Â¨Ë†Ã£ÂÂ®Ã£Æ’Å¾Ã£Æ’â€ Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂºÃ£Æ’â€°Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
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

-- Ã£Æ’Å¾Ã£Æ’â€ Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂºÃ£Æ’â€°Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£ÂÂ®Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Âª
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

## Ã£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’Â¢Ã£Æ’â€¹Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°

### Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹

```sql
-- Ã¤Â½Å½Ã©â‚¬Å¸Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
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

### Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã§ÂµÂ±Ã¨Â¨Ë†

```sql
-- Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã£â€šÂµÃ£â€šÂ¤Ã£â€šÂºÃ£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
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

## Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Å¡â€žÃ£ÂÂªÃ¥Ë†â€ Ã¦Å¾ÂÃ£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Âª

### Ã¦â„¢â€šÃ§Â³Â»Ã¥Ë†â€”Ã¥Ë†â€ Ã¦Å¾Â

```sql
-- Ã¦â€”Â¥Ã¦Â¬Â¡Ã£â€šÂ¢Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€“Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼
SELECT
    toDate(timestamp) AS date,
    uniq(user_id) AS daily_active_users
FROM events
WHERE timestamp >= today() - INTERVAL 30 DAY
GROUP BY date
ORDER BY date;

-- Ã£Æ’ÂªÃ£Æ’â€ Ã£Æ’Â³Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¥Ë†â€ Ã¦Å¾Â
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

### Ã£Æ’â€¢Ã£â€šÂ¡Ã£Æ’ÂÃ£Æ’Â«Ã¥Ë†â€ Ã¦Å¾Â

```sql
-- Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â§Ã£Æ’Â³Ã£Æ’â€¢Ã£â€šÂ¡Ã£Æ’ÂÃ£Æ’Â«
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

### Ã£â€šÂ³Ã£Æ’â€ºÃ£Æ’Â¼Ã£Æ’Ë†Ã¥Ë†â€ Ã¦Å¾Â

```sql
-- Ã£â€šÂµÃ£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”Ã¦Å“Ë†Ã¥Ë†Â¥Ã£ÂÂ®Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£â€šÂ³Ã£Æ’â€ºÃ£Æ’Â¼Ã£Æ’Ë†
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

## Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â€˜Ã£â€šÂ¤Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### ETLÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```typescript
// Ã¦Å Â½Ã¥â€¡ÂºÃ£â‚¬ÂÃ¥Â¤â€°Ã¦Ââ€ºÃ£â‚¬ÂÃ£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€°
async function etlPipeline() {
  // 1. Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£Ââ€¹Ã£â€šâ€°Ã¦Å Â½Ã¥â€¡Âº
  const rawData = await extractFromPostgres()

  // 2. Ã¥Â¤â€°Ã¦Ââ€º
  const transformed = rawData.map(row => ({
    date: new Date(row.created_at).toISOString().split('T')[0],
    market_id: row.market_slug,
    volume: parseFloat(row.total_volume),
    trades: parseInt(row.trade_count)
  }))

  // 3. ClickHouseÃ£ÂÂ«Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€°
  await bulkInsertToClickHouse(transformed)
}

// Ã¥Â®Å¡Ã¦Å“Å¸Ã§Å¡â€žÃ£ÂÂ«Ã¥Â®Å¸Ã¨Â¡Å’
setInterval(etlPipeline, 60 * 60 * 1000)  // 1Ã¦â„¢â€šÃ©â€“â€œÃ£Ââ€Ã£ÂÂ¨
```

### Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’â€”Ã£Æ’ÂÃ£Æ’Â£Ã¯Â¼Ë†CDCÃ¯Â¼â€°

```typescript
// PostgreSQLÃ£ÂÂ®Ã¥Â¤â€°Ã¦â€ºÂ´Ã£â€šâ€™Ã£Æ’ÂªÃ£Æ’Æ’Ã£â€šÂ¹Ã£Æ’Â³Ã£Ââ€”Ã£ÂÂ¦ClickHouseÃ£ÂÂ«Ã¥ÂÅ’Ã¦Å“Å¸
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

## Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

### 1. Ã£Æ’â€˜Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’â€¹Ã£Æ’Â³Ã£â€šÂ°Ã¦Ë†Â¦Ã§â€¢Â¥
- Ã¦â„¢â€šÃ©â€“â€œÃ£ÂÂ§Ã£Æ’â€˜Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¥Å’â€“Ã¯Â¼Ë†Ã©â‚¬Å¡Ã¥Â¸Â¸Ã£ÂÂ¯Ã¦Å“Ë†Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã¦â€”Â¥Ã¯Â¼â€°
- Ã£Æ’â€˜Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÅ’Ã¥Â¤Å¡Ã£Ââ„¢Ã£ÂÅ½Ã£ÂÂªÃ£Ââ€žÃ£â€šË†Ã£Ââ€ Ã£ÂÂ«Ã£Ââ„¢Ã£â€šâ€¹Ã¯Â¼Ë†Ã£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹Ã£ÂÂ¸Ã£ÂÂ®Ã¥Â½Â±Ã©Å¸Â¿Ã¯Â¼â€°
- Ã£Æ’â€˜Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šÂ­Ã£Æ’Â¼Ã£ÂÂ«Ã£ÂÂ¯DATEÃ£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨

### 2. Ã£â€šÂ½Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šÂ­Ã£Æ’Â¼
- Ã¦Å“â‚¬Ã£â€šâ€šÃ©Â Â»Ã§Â¹ÂÃ£ÂÂ«Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£Ââ€¢Ã£â€šÅ’Ã£â€šâ€¹Ã¥Ë†â€”Ã£â€šâ€™Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã©â€¦ÂÃ§Â½Â®
- Ã£â€šÂ«Ã£Æ’Â¼Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Å Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šâ€™Ã¨â‚¬Æ’Ã¦â€¦Â®Ã¯Â¼Ë†Ã©Â«ËœÃ£â€šÂ«Ã£Æ’Â¼Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Å Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šâ€™Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã¯Â¼â€°
- Ã©Â â€ Ã¥ÂºÂÃ£ÂÂ¯Ã¥Å“Â§Ã§Â¸Â®Ã£ÂÂ«Ã¥Â½Â±Ã©Å¸Â¿

### 3. Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”
- Ã¦Å“â‚¬Ã¥Â°ÂÃ£ÂÂ®Ã©ÂÂ©Ã¥Ë†â€¡Ã£ÂÂªÃ£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Ë†UInt32 vs UInt64Ã¯Â¼â€°
- Ã§Â¹Â°Ã£â€šÅ Ã¨Â¿â€Ã£Ââ€¢Ã£â€šÅ’Ã£â€šâ€¹Ã¦â€“â€¡Ã¥Â­â€”Ã¥Ë†â€”Ã£ÂÂ«Ã£ÂÂ¯LowCardinalityÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- Ã£â€šÂ«Ã£Æ’â€ Ã£â€šÂ´Ã£Æ’ÂªÃ£â€šÂ«Ã£Æ’Â«Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£ÂÂ«Ã£ÂÂ¯EnumÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨

### 4. Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹Ã£ÂÂ¹Ã£ÂÂ
- SELECT *Ã¯Â¼Ë†Ã¥Ë†â€”Ã£â€šâ€™Ã¦Å’â€¡Ã¥Â®Å¡Ã¯Â¼â€°
- FINALÃ¯Â¼Ë†Ã¤Â»Â£Ã£â€šÂÃ£â€šÅ Ã£ÂÂ«Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ¥â€°ÂÃ£ÂÂ«Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¸Ã¯Â¼â€°
- JOINÃ£ÂÅ’Ã¥Â¤Å¡Ã£Ââ„¢Ã£ÂÅ½Ã£â€šâ€¹Ã¯Â¼Ë†Ã¥Ë†â€ Ã¦Å¾ÂÃ§â€Â¨Ã£ÂÂ«Ã©ÂÅ¾Ã¦Â­Â£Ã¨Â¦ÂÃ¥Å’â€“Ã¯Â¼â€°
- Ã¥Â°ÂÃ£Ââ€¢Ã£ÂÂªÃ©Â Â»Ã§Â¹ÂÃ£ÂÂªÃ¦Å’Â¿Ã¥â€¦Â¥Ã¯Â¼Ë†Ã¤Â»Â£Ã£â€šÂÃ£â€šÅ Ã£ÂÂ«Ã£Æ’ÂÃ£Æ’Æ’Ã£Æ’ÂÃ¥â€¡Â¦Ã§Ââ€ Ã¯Â¼â€°

### 5. Ã£Æ’Â¢Ã£Æ’â€¹Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°
- Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹Ã£â€šâ€™Ã¨Â¿Â½Ã¨Â·Â¡
- Ã£Æ’â€¡Ã£â€šÂ£Ã£â€šÂ¹Ã£â€šÂ¯Ã¤Â½Â¿Ã§â€Â¨Ã©â€¡ÂÃ£â€šâ€™Ã§â€ºÂ£Ã¨Â¦â€“
- Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¸Ã¦â€œÂÃ¤Â½Å“Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
- Ã¤Â½Å½Ã©â‚¬Å¸Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£Æ’Â­Ã£â€šÂ°Ã£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼

**Ã¦Â³Â¨Ã¦â€žÂ**: ClickHouseÃ£ÂÂ¯Ã¥Ë†â€ Ã¦Å¾ÂÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ«Ã¥â€žÂªÃ£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ«Ã¥ÂË†Ã£â€šÂÃ£Ââ€ºÃ£ÂÂ¦Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã£â€šâ€™Ã¨Â¨Â­Ã¨Â¨Ë†Ã£Ââ€”Ã£â‚¬ÂÃ¦Å’Â¿Ã¥â€¦Â¥Ã£â€šâ€™Ã£Æ’ÂÃ£Æ’Æ’Ã£Æ’ÂÃ¥Å’â€“Ã£Ââ€”Ã£â‚¬ÂÃ£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â«Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã©â€ºâ€ Ã¨Â¨Ë†Ã£ÂÂ«Ã£ÂÂ¯Ã£Æ’Å¾Ã£Æ’â€ Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂºÃ£Æ’â€°Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£â€šâ€™Ã¦Â´Â»Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
