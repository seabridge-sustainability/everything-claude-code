# openseabri Integration

Path: `C:\Users\adelm\SeaBridgeAI\openseabri`

OpenSeaBri is the consumer/community sustainability product and reusable agent-harness infrastructure. It consumes SeaBridgeAI backend capabilities through approved proxy routes (`/api/v1/openseabri/*`) rather than duplicating backend data systems.

## Current State (2026-05-10)

- **15 agents** configured in `gateway/config.ts`, typed as `AgentId` union in `gateway/schemas.ts`.
- **15 skills** in `skills/*/SKILL.md` with YAML frontmatter, auto-loaded for RAG, and MCP-exposed as resources.
- **3 upstream adapters**: HermesAdapter (Python ACP/stdio), MiroFishAdapter (HTTP/REST), OpenClawAdapter (in-process TS).
- **MCP server** at `gateway/mcp/server.ts`: JSON-RPC 2.0 over stdio, agents as tools, skills as resources.
- **WebSocket gateway** on default port `18790`: token auth via `SEABRI_WS_TOKEN`, streaming protocol (`init` -> `ready` -> `chat` -> `token` -> `done`).
- **HTTP API** at `/api/seabri/*`: fail-closed API key auth via `OPENSEABRI_API_KEY` + `x-openseabri-key`; includes registry visibility for capabilities, skills, MCP, tools, and agents.
- **8 communication channels**: WebSocket, Telegram, WhatsApp, SMS, Voice, Discord, Slack, CLI. Live providers are env-gated and should remain approval-gated for outbound actions.
- **Workflow engine** with 5 step types, timeout enforcement, retry with backoff, and parallel branches.
- **Tool use loop** up to 8 rounds per agent invocation with model failover on 429s.
- Latest verified takeover state: typecheck, Vitest, Node tests, Playwright, build, audit, MCP smoke, HTTP smoke, WebSocket/slash smoke, and canvas smoke passing before this continuation pass.

## Integration Surfaces

| Surface | Transport | Use Case |
|---------|-----------|----------|
| MCP server | JSON-RPC 2.0 / stdio | Machine-to-machine, backend integration |
| WebSocket | `ws://localhost:18790?token=...` | Frontend streaming UI |
| HTTP API | `http://localhost:18790/api/seabri/*` | REST queries, feedback, telemetry, registry visibility |
| TypeScript import | `from 'openseabri/gateway/seabri'` | In-process Node.js integration |
| Upstream adapters | Per-adapter (stdio/HTTP/in-process) | Consuming external agent systems |

## Required Repo Baseline

- Structure: `src`, `gateway`, `cli`, `skills`, `tests`, `docs`, `integrations`, `bridge`.
- Dev startup: `npm run dev`; gateway startup: `npm run gateway`.
- Build: `npm run build`.
- Tests: `npm run test`, `npm run test:node`, and `npm run e2e` when UI/gateway risk warrants it.
- Lint/typecheck: `npm run typecheck`; use package scripts for additional checks when added.
- Lessons and recurring issues: local `AGENTS.md`, `CLAUDE.md`, `AGENTS_SYSTEM.md`, `docs/agent-harness`, and ECC agentic-stack memory.
- Reports/logs/artifacts: `docs/reports`, `logs`, `test-results`, or `artifacts/agent-runs`; never repo root.

## Default Skills

- `sea-frontend-design`
- `sea-ai-data-integrity`
- `sea-backend-api-verification` for backend proxy contracts
- `sea-cross-repo-handoff`

## OpenSeaBri-Specific Gates

- Preserve free/community mission and clear language.
- Keep outputs plain-language and actionable.
- Do not invent risk, insurance, emergency, policy, product, certification, or lifecycle-analysis claims.
- Verify backend proxy route, auth header, and failure behavior.
- Keep `OPENSEABRI_API_KEY`, `SEABRI_WS_TOKEN`, canvas token, CORS origin, and rate-limit configuration explicit before production exposure.
- Standalone mode: all SeaBridge bridge functions return null when backend unavailable.

## Key Docs

- `docs/agent-harness/OPENSEABRI_AGENT_HARNESS_GUIDE.md` - full harness architecture
- `docs/integrations/SEABRIDGE_TOOL_LAYER_INTEGRATION.md` - integration surface details
- `docs/reports/audits/OPENSEABRI_PRODUCTION_HARDENING_REVIEW_2026-05-09.md` - security/reliability audit
- `docs/reports/smoke-tests/OPENSEABRI_LIVE_GATEWAY_SMOKE_2026-05-09.md` - gateway test matrix
