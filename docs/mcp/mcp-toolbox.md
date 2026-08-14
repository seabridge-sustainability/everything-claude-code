# MCP Toolbox for Databases — SeaBridgeAI Integration Guide

**Source:** `everything-claude-code/external/mcp-toolbox/`
**Version:** 1.2.0 (commit `8d2d521`, 2026-05-08)
**License:** Apache 2.0
**Repository:** https://github.com/googleapis/mcp-toolbox

---

## Phase 1 — What Is MCP Toolbox for Databases?

### Core Purpose

MCP Toolbox for Databases is Google's open-source MCP server that exposes database
operations as Model Context Protocol (MCP) tools. It bridges AI agents, IDEs, and
coding assistants directly to enterprise databases — without each agent needing its
own custom DB client code.

### How It Works

```
AI Agent / IDE
(Claude Code, Codex, Gemini CLI)
        │
        │  MCP protocol (stdio or HTTP/SSE)
        ▼
 MCP Toolbox Server (Go binary)
        │
        │  Speaks native DB wire protocols
        ▼
  Database (MongoDB, PostgreSQL, Redis, …)
```

The Toolbox server reads a `tools.yaml` config that defines:
- **Sources** — which databases to connect to
- **Tools** — named operations (SELECT queries, predefined procedures, NL2SQL)
- **Toolsets** — grouped subsets of tools exposed per agent or use case
- **Prompts** — optional LLM prompt templates

### How It Differs From Writing Custom DB Tools

| Custom DB Tool | MCP Toolbox |
|---------------|-------------|
| Each agent writes its own pymongo/psycopg client | One centrally managed server |
| Per-agent connection pool management | Built-in pooling, auth, retries |
| No observability by default | Built-in OpenTelemetry metrics + traces |
| Arbitrary queries per agent | Predefined structured tools only (safe mode) |
| Secrets spread across configs | One secured config, one DB user per toolset |
| Each agent needs DB driver dependencies | Zero DB code in agent layer |

### Why Useful for Agent Workflows

Claude Code, Codex, and Gemini CLI are MCP clients. Adding MCP Toolbox means:
- Agents can query schema, inspect data, validate migrations — in natural language
- No context window wasted on raw DB boilerplate
- Predefined tools = query injection prevention at the server layer
- Toggle a tool on/off without redeploying agents
- One audit log for all agent DB access across all coding tools

### Risks of Agent Database Access

| Risk | Mitigation |
|------|-----------|
| Accidental destructive queries | Block DROP/DELETE/UPDATE/ALTER at toolbox level |
| PII/customer data exposure | Allowlist only non-PII collections/tables |
| Secret leakage | MCP Toolbox reads env vars; never commit credentials |
| Privilege escalation | Use least-privilege read-only DB users |
| Uncontrolled SQL injection | Prefer predefined parameterized tools over raw SQL |
| Production DB mutation | Never point toolbox at production by default |

### Why Start Read-Only and Schema-Limited

Production databases contain customer ESG data, homeowner PII, emissions records,
and insurance workflows. Exposing these to unreviewed agent queries creates GDPR
and customer data risks. The safe pattern:
1. Read-only DB user with SELECT only
2. Allowlisted collection/table names (no system tables, no PII collections)
3. Local or staging DB only — never production
4. Audit log all queries before expanding scope

---

## Phase 2 — Clone Status

**Cloned to:** `C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\mcp-toolbox`
**Version:** 1.2.0
**Commit:** `8d2d521a36d8b2225179846b922856ea1f9994d9` (2026-05-08 15:30 EDT)
**License:** Apache 2.0
**MCP transports:** stdio (default), HTTP/SSE (`--transport sse`)
**Authentication:** IAM integration (Google Cloud), OAuth, env-var credentials
**Observability:** Built-in OpenTelemetry traces + metrics via `--telemetry-otlp=<endpoint>`

### Supported Databases Relevant to SeaBridgeAI

| Database | SeaBridgeAI Use | Toolbox Support |
|----------|----------------|-----------------|
| MongoDB | Backend primary store (Motor/Beanie) | PASS: Built-in prebuilt tools |
| PostgreSQL | OpenSeaBri (Drizzle ORM) | PASS: Built-in prebuilt tools |
| Redis | Backend caching + sessions | PASS: Built-in prebuilt tools |
| Neo4j | Autoresearch graphify | PASS: Built-in prebuilt tools |
| Elasticsearch | ESG data search (if enabled) | PASS: Built-in prebuilt tools |
| MongoDB Atlas | Backend cloud Atlas | PASS: (same driver, SRV URI) |

---

## Phase 3 — Database Inventory by Repo

### manageesg-backend
- **Primary DB:** MongoDB Atlas (Motor async driver + Beanie ODM)
- **Cache:** Redis (`REDIS_URL`)
- **Driver:** `pymongo>=4.12.0`, `redis>=5.2.0`, `motor` (Beanie dependency)
- **Models:** User, Property, Meter, Assessment, EmissionFactor, MaterialityAssessment,
  RiskManagement, GresAssessment, ClimateAnalysis, NatureAnalysis, ChatHistories,
  AIInsightCache, AgentExecutionAudit, and 40+ more Beanie documents
- **No SQL layer** — pure MongoDB document store
- **MCP Toolbox fit:** High. MongoDB prebuilt tools allow schema discovery,
  collection listing, document sampling, and safe aggregate queries.

### openseabri
- **Primary DB:** PostgreSQL (Drizzle ORM, `drizzle.config.ts`)
- **Schema file:** `db/schema.ts` (migrations in `db/migrations/`)
- **Env var:** `SEABRI_DATABASE_URL` or `DATABASE_URL`
- **Data domains:** Claims, contractors, properties, homeowners, incidents,
  insurance documents, local authority workflows
- **MCP Toolbox fit:** High. PostgreSQL prebuilt + custom tools for claim/workflow QA.

### autoresearch
- **Primary stores:** Redis (session/agent state), Neo4j (graphify knowledge graphs)
- **No structured app DB** — research metadata in files/graphify graphs
- **MCP Toolbox fit:** Medium. Neo4j and Redis prebuilt tools useful for graph
  inspection and research state visibility. Not a primary use case.

### manageesg-frontend
- **No direct DB access** — consumes backend REST API only.
- **MCP Toolbox fit:** Not applicable.

### _upstream
- **Reference implementations** — no live DB.
- **MCP Toolbox fit:** Not applicable.

---

## Phase 4 — Usefulness Decision

**Verdict: Recommended for immediate read-only development use.**

### SeaBridgeAI Backend (MongoDB + Redis)

| Use Case | Value |
|----------|-------|
| Schema exploration (list collections, sample docs) | High — 40+ Beanie models; agents often need to verify field names |
| Debugging API/DB mismatch | High — inspect actual doc structure vs schema definition |
| Validating ESG workflow data | High — spot-check emission factors, assessments in dev |
| Agent execution audit inspection | High — query AgentExecutionAudit/AgentTaskAudit |
| LCA / carbon data QA | High — inspect Carbon, LCA, GRESB collections |
| GIS / climate risk data QA | Medium — inspect RiskClimateRisk, ClimateAnalysis docs |
| Generating migrations | Low — MongoDB is schemaless; migrations are application-level |
| Redis cache inspection | Medium — debug stale AI insight caches |

### OpenSeaBri (PostgreSQL)

| Use Case | Value |
|----------|-------|
| Claim workflow state debugging | High — inspect claim status columns |
| Contractor approval status | High — verify FK relationships |
| Incident timeline data | High — query incident event tables |
| Property data integrity | High — check property records |
| Document/signature state | Medium — inspect document_states table |
| Insurance workflow state | High — debug workflow transition bugs |
| Schema discovery | High — Drizzle migrations define tables; agents need real schema |

### Autoresearch (Neo4j/Redis)

| Use Case | Value |
|----------|-------|
| Research graph inspection | Medium — browse Neo4j knowledge graph nodes |
| Research metadata | Low — primarily file-based |
| Citation trail queries | Medium — if graphify Neo4j is populated |

---

## Phase 5 — Integration Architecture

### Stage 1 — Local Read-Only Agent Access (Current Recommendation)

```
Dev machine
  ├── npx @toolbox-sdk/server --config tools.dev.yaml    (local toolbox)
  ├── Local MongoDB (or Atlas dev cluster, READ ONLY user)
  ├── Local PostgreSQL (or dev Supabase instance, READ ONLY user)
  └── MCP config in ~/.claude/settings.json or project .mcp.json
```

Rules:
- Read-only DB user per database
- Collection/table allowlist only
- No DROP/DELETE/UPDATE/INSERT/ALTER
- Local or Atlas dev cluster only
- Config stored outside repo (or in `configs/mcp-toolbox/*.example.yaml`)

### Stage 2 — Staging QA (Next Step, After Stage 1 Validated)

```
Staging environment
  ├── Toolbox binary deployed alongside staging services
  ├── Staging MongoDB Atlas + Staging PostgreSQL
  ├── Predefined safe tools only (no raw SQL/arbitrary queries)
  ├── Query logs to CloudWatch / structured logging
  └── Agent access reviewed per sprint
```

### Stage 3 — Production-Controlled (Future, Requires Explicit Approval)

- IAM / service account / restricted DB role
- Strong audit logs with OpenTelemetry traces
- No arbitrary SQL — predefined structured tools only
- Predefined query templates for all exposed operations
- GDPR review for OpenSeaBri homeowner and insurance data before exposure
- Requires explicit written approval from `adelmar@seabridgesustainability.com`

---

## Phase 6 — Configuration Design

See sibling files in `configs/mcp-toolbox/`:
- [`tools.dev.example.yaml`](../../configs/mcp-toolbox/tools.dev.example.yaml)
- [`tools.staging.example.yaml`](../../configs/mcp-toolbox/tools.staging.example.yaml)

---

## Phase 7 — Claude Code / Codex / Gemini CLI Configuration

### Claude Code (stdio — recommended for local dev)

Add to project `.mcp.json` (use example path, not production DB):

```json
{
  "mcpServers": {
    "toolbox-mongo": {
      "command": "npx",
      "args": [
        "-y",
        "@toolbox-sdk/server",
        "--prebuilt=mongodb",
        "--stdio"
      ],
      "env": {
        "MONGODB_URI": "${MONGODB_DEV_URL}"
      }
    },
    "toolbox-postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@toolbox-sdk/server",
        "--prebuilt=postgres",
        "--stdio"
      ],
      "env": {
        "DATABASE_URL": "${SEABRI_DEV_DATABASE_URL}"
      }
    }
  }
}
```

For a custom `tools.yaml` (recommended for production-safe predefined tools):

```json
{
  "mcpServers": {
    "toolbox": {
      "type": "http",
      "url": "http://127.0.0.1:5000/mcp"
    }
  }
}
```

Start toolbox separately: `npx @toolbox-sdk/server --config tools.dev.yaml`

### Codex

Add to `.codex/config.yaml` or Codex MCP config (same HTTP URL approach):

```yaml
mcp_servers:
  - name: toolbox
    transport: http
    url: http://127.0.0.1:5000/mcp
```

### Gemini CLI

Toolbox ships `gemini-extension.json` — copy to your `~/.gemini/` folder or use
the Gemini CLI `gemini mcp add` command:

```bash
gemini mcp add --name toolbox --url http://127.0.0.1:5000/mcp
```

Or use the npm prebuilt shortcut:
```bash
# In gemini CLI config add server:
npx @toolbox-sdk/server --prebuilt=mongodb --stdio
```

> Do not overwrite existing `.mcp.json` entries without backing up first.
> Add `toolbox-mongo` and `toolbox-postgres` as new entries alongside existing
> `gitnexus` and `gbrain` servers.

---

## Phase 8 — Backend Integration (manageesg-backend)

See `manageesg-backend/docs/mcp/mcp-toolbox-dev-guide.md` for the full backend
guide. Summary:

- No production runtime coupling — toolbox is a dev/QA tool only
- Use read-only MongoDB user: SELECT on dev Atlas cluster
- Safe collections to expose: `assets`, `properties`, `meters`, `assessments`,
  `emission_factors`, `risk_management`, `gresb_assessments`, `climate_analysis`
- Block collections with PII: `users`, `sessions`, `chat_histories`
- Agent QA checklist: verify field names match Beanie model definitions
- No toolbox startup coupling in `main.py` or `database.py`

---

## Phase 9 — OpenSeaBri Integration

See `openseabri/docs/mcp-toolbox-dev-guide.md` for the full guide. Summary:

- PostgreSQL via Drizzle ORM — toolbox complements schema inspection
- Read-only Postgres user: GRANT SELECT on public schema to `toolbox_ro`
- Safe tables: `properties`, `contractors`, `claims`, `incidents`, `documents`
- Block: homeowner PII tables until GDPR review complete
- Use `tools.dev.example.yaml` as starting point for custom predefined queries

---

## Phase 10 — Safety Rules

### Mandatory Guardrails (Non-Negotiable)

1. **Start read-only.** Only SELECT. No INSERT/UPDATE/DELETE/DROP/ALTER/TRUNCATE.
2. **Local or staging DB first.** Never production DB by default.
3. **Never commit DB credentials.** Use env vars; examples use `<PLACEHOLDER>` only.
4. **Never print secrets.** Mask all credential env vars in logs and docs.
5. **Least-privilege DB users.** Create dedicated read-only users.
6. **Predefined tools preferred** over arbitrary SQL or raw Mongo queries.
7. **Block destructive operations** at toolbox config level.
8. **Audit logs required** for all agent DB access before staging promotion.
9. **GDPR review required** before exposing any OpenSeaBri homeowner/PII tables.
10. **Customer data never exposed** through uncontrolled MCP access.

### Sensitive Data Classification

| Data Class | Repo | Protection |
|-----------|------|-----------|
| Homeowner PII (name, address, contact) | openseabri | Block from MCP until GDPR review |
| Insurance policy details | openseabri | Block until review |
| User auth tokens/sessions | manageesg-backend | Block `users`, `sessions` collections |
| Chat histories | manageesg-backend | Block `chat_histories` collection |
| API keys / credentials | All | Never expose via MCP |
| ESG emissions data | manageesg-backend | OK read-only on dev |
| Claim workflow state (non-PII) | openseabri | OK read-only on staging after review |

---

## Phase 11 — Testing Plan

### 1. Installation Tests

```bash
# Check clone exists
Test-Path "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\mcp-toolbox"

# Check npm package available
npx -y @toolbox-sdk/server --version

# Check binary (if downloaded from releases)
# Download: https://github.com/googleapis/mcp-toolbox/releases/latest
.\toolbox.exe --version

# Check config loads without errors
npx @toolbox-sdk/server --config tools.dev.example.yaml --dry-run
```

### 2. MCP Connectivity Tests

```bash
# Start toolbox (HTTP mode)
npx @toolbox-sdk/server --config tools.dev.yaml

# From Claude Code — verify tools appear
# In MCP tool listing, expect: list_collections, find_documents, execute_sql etc.

# From CLI — test tool listing
curl http://127.0.0.1:5000/api/toolset/default
```

### 3. Database Safety Tests

| Test | Expected |
|------|---------|
| Read-only user attempts UPDATE | Rejected by DB (permission denied) |
| Read-only user attempts DROP | Rejected by DB |
| Disallowed collection queried | Toolbox rejects (not in allowlist) |
| Missing credentials | Toolbox fails clearly with auth error |
| Invalid config YAML | Toolbox rejects at startup with clear message |
| Query timeout (slow query) | Toolbox returns timeout error, not hang |

### 4. Query Behavior Tests (Dev DB Only)

```bash
# Schema discovery
curl -X POST http://127.0.0.1:5000/api/tool/list_collections \
  -H "Content-Type: application/json" -d '{}'

# Simple document sample (MongoDB)
curl -X POST http://127.0.0.1:5000/api/tool/find_documents \
  -H "Content-Type: application/json" \
  -d '{"collection": "properties", "limit": 3}'

# PostgreSQL table list
curl -X POST http://127.0.0.1:5000/api/tool/list_tables \
  -H "Content-Type: application/json" -d '{}'
```

### 5. Observability Tests

- Start toolbox with `--telemetry-otlp=http://localhost:4317`
- Verify traces appear in collector (Jaeger, OTEL Collector, etc.)
- Confirm query metadata in traces (collection name, duration)
- Confirm NO credential values in trace attributes

### 6. SeaBridgeAI Scenario Tests (Dev DB Only)

| Scenario | Tool | Expected |
|---------|------|---------|
| Retrieve emission factor by ID | `find_documents` on `emission_factors` | Returns factor doc |
| Inspect due diligence deal status | `find_documents` on `due_diligence` | Returns status fields |
| Inspect LCA project data | `find_documents` on `lca_projects` | Returns project doc |
| Inspect GRESB assessment | `find_documents` on `gresb_assessments` | Returns assessment |
| Count assets per portfolio | predefined `count_assets_by_portfolio` | Returns count |
| Query climate risk by asset | `find_documents` on `risk_climate_risk` | Returns risk doc |

### 7. OpenSeaBri Scenario Tests (Dev/Staging DB Only)

| Scenario | Tool | Expected |
|---------|------|---------|
| Retrieve claim by ID | `get_claim_status` (predefined) | Returns claim row |
| List contractor approvals | `list_approved_contractors` (predefined) | Returns contractors |
| Inspect document state | `get_document_state` (predefined) | Returns doc status |
| Inspect incident timeline | `get_incident_events` (predefined) | Returns events |
| PII table query | any query on blocked table | Toolbox rejects |

---

## Phase 12 — Scripts

- [`check-mcp-toolbox.ps1`](../../scripts/check-mcp-toolbox.ps1) — validates clone, config, and safety
- [`start-mcp-toolbox-dev.ps1`](../../scripts/start-mcp-toolbox-dev.ps1) — starts local dev toolbox

---

## Phase 13 — Deliverables Summary

| Item | Status |
|------|--------|
| What MCP Toolbox is | Documented (Phase 1) |
| Useful for SeaBridgeAI backend? | **Yes** — MongoDB + Redis both supported |
| Useful for OpenSeaBri? | **Yes** — PostgreSQL + Drizzle, high workflow QA value |
| Cloned to ECC external? | **Yes** — `external/mcp-toolbox/` |
| Version/commit | 1.2.0 / `8d2d521` (2026-05-08) |
| Supported DBs relevant to us | MongoDB, PostgreSQL, Redis, Neo4j |
| DB technologies per repo | Documented (Phase 3) |
| Integration architecture | 3-stage plan (Phase 5) |
| Config examples | `configs/mcp-toolbox/` |
| MCP config guidance | Claude Code, Codex, Gemini CLI (Phase 7) |
| Backend dev guide | `manageesg-backend/docs/mcp/mcp-toolbox-dev-guide.md` |
| OpenSeaBri dev guide | `openseabri/docs/mcp-toolbox-dev-guide.md` |
| Scripts | `check-mcp-toolbox.ps1`, `start-mcp-toolbox-dev.ps1` |
| Tests documented | Phases 11 (integration + scenario tests) |
| Tests still needed | Automated pytest harness for Stage 2 staging promotion |
| Security risks | GDPR for OpenSeaBri PII; read-only enforcement; secret management |

### Final Recommendation

**Clone only → dev-only integration now → staging after Stage 1 validated.**

Treat MCP Toolbox as a centrally managed development and staging database-agent
tool for schema exploration, QA, debugging, and database-aware coding. It is a
significant force multiplier for Claude Code, Codex, and Gemini CLI when debugging
MongoDB documents or PostgreSQL Drizzle schema issues.

Do NOT connect it to production or make it a production runtime dependency without
explicit written approval from `adelmar@seabridgesustainability.com`.

MCP Toolbox does not replace the existing Motor/Beanie/Drizzle production client
code — it runs alongside it as a read-only agent visibility layer.
