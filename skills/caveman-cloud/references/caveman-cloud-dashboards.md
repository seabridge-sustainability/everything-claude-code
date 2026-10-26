---
name: caveman-cloud-dashboards
description: >
  Build Caveman Cloud dashboards and charts from a project's own telemetry:
  read the chart catalog and suggestions, draft a chart, verify it returns
  data, then save it. Use for "make a dashboard", "chart cost by model",
  "add a latency chart", or "alert me when error rate spikes".
---

# Build dashboards from what the data shows

A chart is a JSON spec, not SQL: a `type` (`timeseries`, `toplist` or
`bignumber`), a `source` (`requests`, `spans`, `tools` or `evals`), 1 to 6
`measures` (`{field, agg}` or an `expr` such as `count_if(error) / count()`),
optional `filters.row` / `filters.trace` expressions, and a `group_by` field.
The server compiles it over a fixed field catalog.

## 1. Read what exists

```sh
cvm dashboards list | jq '.data.dashboards[] | {id, name, builtin}'
cvm charts catalog --range 7d | jq '.data.suggestions'
```

`builtin:*` dashboards are read-only: clone one with `dashboards.create` and
`source_dashboard_id` instead of rebuilding it. `charts.catalog` returns every
source's fields (kind, unit, permission), the aggregations, ready presets and
up to eight suggestions read off the project's traffic, each with a reason.
Start from a suggestion or preset when one fits. `cvm charts values` without
`--field` returns ready filter expressions; with `--field model` the top
values.

## 2. Draft and verify each chart

```sh
cvm charts query --file chart.json | jq '.data | {overall, groups_total, warnings, notices}'
```

`chart.json` is `{"chart": {...}, "range": {"preset": "7d"}}` (presets `1h` to
`90d`, or `from`/`to`). A 422 `cave_chart_invalid` names the `target` and
`position` to fix. Keep a chart only when its series hold data. Read
`notices` (unpriced requests are left out of cost, never counted as zero) and
`warnings` (slow shapes). `cvm charts samples --file chart.json` lists the
traces behind a chart or a point.

Fields `member` and `api_key` need billing:read; `tags.*` and `attributes.*`
need payload:read (request tags also billing:read). A 403
`cave_chart_forbidden` means pick another field, not a broader credential.

Filter grammar: `model = 'x'`, `latency > 2`, `status_code in (500, 502)`,
`tags.branch is not null`, `model contains 'claude'`, joined with and, or,
not. Text is single-quoted. Duration is seconds, cost USD, percent 0 to 1.

## 3. Save

```sh
cvm dashboards create --file dashboard.json
cvm dashboards add_chart --file add.json
```

`dashboards.add_chart` takes `{"dashboard_id": ..., "chart": {...}}` and
appends atomically. `dashboards.update` needs the `version` you read; a 409
`cave_dashboard_conflict` means re-read and reapply. Name charts for the
question they answer. Never save a chart you did not run.

## 4. Alerts

`alerts.create` watches one `bignumber` query over `window_minutes` against a
`threshold` with a `comparator`. When it fires or resolves, the
organization's owners and admins get an Inbox item and an email;
`webhook_id` also posts to an existing webhook. Run the same query with
`charts.query` over that window first to pick a threshold that would not fire
today, and tell the user who it notifies. `cvm alerts list` shows what exists.

Good output: the dashboard id and its console link, each chart's title with
the `overall` figure it returned, and any alert with its threshold and recipients.

Next: **caveman-sql** when the catalog cannot express the question.
