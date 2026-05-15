# Local Deep Research

Local Deep Research is centrally managed from:

`C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\local-deep-research`

Use it as an optional local/private research assistant and MCP-accessible agent tool. Do not clone it into `manageesg-backend`, `manageesg-frontend`, `openseabri`, `_upstream`, or `autoresearch`, and do not add it as a production runtime dependency without an explicit architecture decision.

## Current Integration Shape

- Source: central upstream clone under ECC.
- License: MIT.
- Runtime preference: Docker Compose for the web app, SearXNG, and packaged services when Docker Desktop is running.
- MCP preference: central Python venv only, via `ldr-mcp` over local STDIO.
- Local LLM preference: Ollama at `http://localhost:11434`, model `gemma4:latest` when available.
- Search preference: local/self-hosted SearXNG at `http://localhost:8080`, plus explicit academic engines such as arXiv, PubMed, and Semantic Scholar.
- Local UI account credentials, when created for this workstation, live outside repos at `C:\Users\adelm\.local-deep-research\seabridge-local-ui-credentials.txt`.

## Shared Commands

Check readiness:

```powershell
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-local-deep-research.ps1
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-local-deep-research.ps1 -Json
```

Web/API health once running:

```powershell
Invoke-WebRequest http://localhost:5000/api/v1/health -UseBasicParsing
```

Start locally:

```powershell
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\start-local-deep-research.ps1 -Mode auto
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\start-local-deep-research.ps1 -Mode docker
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\start-local-deep-research.ps1 -Mode pip
```

Check or configure Claude Code MCP:

```powershell
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\use-local-deep-research-mcp.ps1
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\use-local-deep-research-mcp.ps1 -Configure
```

The MCP script writes no secrets and uses STDIO, not HTTP.

Note: on the tested PyPI package `1.6.9`, `ldr-web.exe` and `ldr-mcp.exe` are present, but `ldr.exe --help` fails because the package points the generic CLI entrypoint at a missing `local_deep_research.main` module. Use `ldr-web.exe` for the web app and `ldr-mcp.exe` for MCP until upstream fixes the generic `ldr` command.

## Docker Mode

From the central clone:

```powershell
cd C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\local-deep-research
docker compose up -d
```

Expected local URLs:

- Local Deep Research: `http://localhost:5000`
- SearXNG: `http://localhost:8080` when exposed or run separately
- Ollama: `http://localhost:11434`

Docker mode is preferred for SQLCipher support and operational isolation. Do not publish these ports to a public network.

Standalone SearXNG container used for local smoke testing:

```powershell
docker run -d --name seabridge-ldr-searxng -p 127.0.0.1:8080:8080 searxng/searxng
```

## pip/MCP Mode

Use the central venv only:

```powershell
py -3.13 -m venv C:\Users\adelm\SeaBridgeAI\everything-claude-code\.venvs\local-deep-research
C:\Users\adelm\SeaBridgeAI\everything-claude-code\.venvs\local-deep-research\Scripts\python.exe -m pip install --upgrade pip
C:\Users\adelm\SeaBridgeAI\everything-claude-code\.venvs\local-deep-research\Scripts\python.exe -m pip install "local-deep-research[mcp]"
```

Do not use global installs unless the central venv approach is explicitly abandoned.

## MCP Tools

Local Deep Research documents these MCP tools:

- `search`
- `quick_research`
- `detailed_research`
- `generate_report`
- `analyze_documents`
- `list_search_engines`
- `list_strategies`
- `get_configuration`

Recommended agent sequence:

1. Call `get_configuration`.
2. Call `list_search_engines` and `list_strategies`.
3. Use `quick_research` for setup validation.
4. Use `detailed_research` or `generate_report` only after confirming source scope, privacy expectations, and time budget.
5. Use `analyze_documents` only for explicitly approved local collections.

## SeaBridgeAI Uses

- Sustainability standards research: GRESB, ISSB, CSRD, SEC climate, GRI, SASB, TCFD/TNFD.
- LCA methodology research and academic literature review.
- Carbon market methodology, registry, and project due diligence.
- GIS, physical climate risk, and local hazard research.
- Due diligence research briefs with cited evidence trails.
- Competitor and product research for internal strategy.

## OpenSeaBri Uses

- FEMA and local authority guidance summaries.
- Homeowner disaster recovery and insurance documentation research.
- Contractor/vendor research and verification notes.
- Emergency preparedness and resilience brief generation.
- Human-facing cited summaries, not automated legal advice.

## Autoresearch Uses

- Local cited report generation.
- Academic source collection and strategy benchmarking.
- Reproducible research trails before promoting findings into backend workflows.
- Private/local LLM execution where web search scope is explicit.

## Private Documents

Private document indexing is disabled by policy until explicitly approved for a named collection. Do not bulk-index local folders. For a future approved collection, record:

- collection owner
- allowed folder path
- document sensitivity
- retention plan
- export rules
- whether derived reports can be committed

## Security Notes

- Do not expose the web app, SearXNG, Ollama, or MCP publicly.
- Do not disable SQLCipher or set `LDR_BOOTSTRAP_ALLOW_UNENCRYPTED=true` without explicit approval.
- Do not commit `.env`, SQLCipher databases, local SQLite files, caches, downloaded papers, private reports, or credentials.
- LDR upstream states it has no telemetry, analytics SDKs, tracking, crash reporting, or phone-home calls. Network calls are still made to explicitly configured search engines, LLM providers, and notification services.
- Notification webhooks have SSRF-style residual risk; leave them off unless reviewed.
- Prefer local Ollama for private work.

## Troubleshooting

- Docker unavailable: start Docker Desktop and rerun the check script.
- `ldr-mcp` missing: install into the central venv and rerun `use-local-deep-research-mcp.ps1`.
- Ollama down: run `ollama serve`, then verify `http://localhost:11434`.
- No model configured: pick an existing local model such as `gemma4:latest`; do not auto-pull multi-GB models.
- SearXNG down: use Docker Compose or run a local SearXNG container, then verify `http://localhost:8080`.
- SQLCipher install failure on Windows: prefer Docker mode; do not approve unencrypted fallback silently.
