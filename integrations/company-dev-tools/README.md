# Shared company and development tools

Installed for this Windows workstation on 2026-10-11. Sources, localized Anthropic plugins and the active cross-agent bridge now live together in the primary ECC checkout:

`C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/dev-suite`

User-level MCP registrations and the `sea-dev-suite` skill expose the tools across projects to Claude, Codex, Gemini and OpenCode. VS Code's MCP host also has registrations. These clients have different plugin formats; the shared MCP library supplies the same pinned workflow text through standard tool calls. A new/reconnected client session is required to load registrations. No running editor session was forcibly restarted.

## Installed assets and proof

| Tool | Installed configuration | Verified locally |
| --- | --- | --- |
| Anthropic knowledge-work-plugins and financial-services | Pinned source clones, 41 localized plugins plus `sea-engineering`; 42 Claude plugins enabled | Claude marketplace validation/install/list; shared workflow search and digest-checked read |
| Matt Pocock / Addy Osmani | 10 selected engineering skills; references and upstream licenses retained | Source pins and catalog hashes; shared MCP read |
| context-mode 1.0.169 | Isolated npm package; shared stdio MCP launcher | JavaScript execution, SQLite indexed source retrieval |
| Alibaba open-code-review 1.12.13 | Native Windows binary through isolated npm package; CLI and MCP review preparation | Real ECC commit file scope; no inference |
| WeKnora 0.8.2 | Dedicated bounded ParadeDB stack; loopback UI/API; five read-only native MCP tools | Authenticated semantic/keyword retrieval, exact source text, denied delete |
| Paperclip 2026.1005.0 | Isolated Windows dashboard/database; backend/frontend projects, four paused agents | Health, dashboard, durable records after restart, approval-preserving configuration |
| OpenShell 0.1.3 | Pinned WSL CLI/gateway/images; strict Landlock and denied-by-default policies | Actual permitted/denied filesystem and HTTP operations, explicit policy logs |
| God's Eye View | Pinned selected source/docs and implementation investigation | 22 source digests, existing SeaBridge GIS interfaces, licensing exclusions and gaps |

Catalog: `catalog.json` contains 374 skills, 65 command templates, source commits and 189 optional connector entries. The count includes business/finance assets and the selected engineering skills, not every skill in Matt/ Addy's repositories. Sources are pinned rather than auto-updated. External partner entries that require a separate Git repository are inventoried in their upstream marketplace and are not silently fetched.

Selected Matt skills: diagnosing-bugs, research, codebase-design, domain-modeling. Selected Addy skills: api-and-interface-design, frontend-ui-engineering, performance-optimization, code-review-and-quality, security-and-hardening, browser-testing-with-devtools. Existing ECC grill/review workflows remain intact. Source instructions are guidance under current project policy; mandatory upstream testing, publication or deployment language grants no permission.

Localized Anthropic plugins retain content, licenses and attribution. Their connector manifests are intentionally disconnected; original connector metadata is cataloged. One upstream manifest is malformed and marked `invalid-upstream-manifest`. Provider access needs the relevant account and a concrete authorized connection. Installation does not prove Bloomberg/LSEG/S&P/Microsoft/Slack or other external integrations work. Do not paste credentials into the catalog. The current finance skills are useful for drafts/model review/company operations; they do not supply validated climate or nature risk calculations.

## Any coding agent

Ask: “Use sea-dev-suite to find the API/interface design workflow for this backend/frontend change.” The agent calls `suite_find_workflow`, then `suite_read_skill` for an exact ID. The returned absolute file/reference directory supports supplementary local reads. `suite_read_command` reads a command template without executing its external actions.

Review an explicitly selected commit with `suite_review_prepare` using `repository` and `commit`. This produces file scope only. Full model-backed OCR review is a separate execution using approved providers; it was not run during installation.

CLI fallback, from any project:

```powershell
node C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/dev-suite/cli.mjs status
node C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/dev-suite/cli.mjs review --help
```

For other MCP clients, use `command: "C:/Program Files/nodejs/node.exe"`, `args: ["C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/dev-suite/cli.mjs", "mcp"]`. Register a second server with the final argument `context` for context-mode. Run from the intended project; the bridge inherits that working directory. Do not set a universal backend cwd for unrelated projects.

Context-mode supports explicit indexing/search/execution across these clients. Automatic routing enforcement, session capture and compaction hooks were not added: they differ by client and can override existing workflows. Its executor is a local tool, not the OpenShell isolation boundary. Do not invoke `ctx_upgrade` or `ctx_purge` without an explicit request; upgrading can alter plugin configuration. Its self-healing postinstall was skipped. Preserve cited source text when using compressed retrieval.

Context-mode startup includes stale-session database cleanup; it is not a read-only readiness probe. Preserve existing session storage and use isolated task-owned storage for acceptance probes. Installed registrations and a stdio handshake do not prove live agent guard activation.

## On-demand services

Heavy services are stopped with data retained because host memory is constrained. Check available host memory, start only the service needed, then connect its tools. WeKnora is registered disabled in Codex/Gemini/OpenCode until started; enable its existing registration afterward (Codex/OpenCode: set enabled=true; Gemini: remove only weknora from mcp.excluded in user settings). Claude and VS Code can start their WeKnora MCP entry after service start. No private project documents are automatically ingested.

```powershell
node C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/company-dev-tools/weknora/service.mjs start
node C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/company-dev-tools/weknora/service.mjs status
node C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/company-dev-tools/weknora/service.mjs stop
```

WeKnora UI: http://127.0.0.1:3182 . API: http://127.0.0.1:8182 . Credentials remain in ignored owner-only files inside `weknora/state` and `.env.local`; native MCP bridge loads them internally. Combined container cap832 MiB; observed sample288.81 MiB. Local Ollama embedding model `nomic-embed-text` is installed. Only that task-created model was unloaded after verification; it loads on demand.

```powershell
powershell.exe -NoProfile -File C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/company-dev-tools/paperclip/start.ps1
node C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/company-dev-tools/paperclip/stop.mjs
```

Paperclip UI: http://127.0.0.1:3183 . Claude, Codex, Gemini and OpenCode agent records are paused; scheduler/telemetry disabled. Actual provider authentication and agent dispatch are unverified because installation used no inference calls. Gemini uses an approval-preserving generic process wrapper and requires an explicit approved prompt; automatic assigned-task prompt injection is not implemented. A metadata budget of0 is upstream “unlimited,” not an enforced spend cap. See `paperclip/README.md` before manual dispatch.

OpenShell: see `openshell/README.md` for gateway start/stop, the WSL wrapper and strict policies. Windows/WSL support is experimental. The gateway is loopback only and trusted with Docker access. Existing coding-agent sessions are not automatically sandboxed; approved reference snapshots/agent images must be selected for each task. No providers were registered. Never delete retained volumes or use `down -v`.

## Climate and nature investigation

Read `gods-eye-investigation/investigation.md`. Reuse environmental feed/provenance patterns within existing GIS/Mapbox components, starting with existing FIRMS and land-cover interfaces. Operational weather/fire/seismic observations are context, not annual loss or biodiversity scoring. Exclude commercial-incompatible submarine-cable and Bhote Koshi imagery/derived coordinates. No Climate/Nature implementation, provider acquisition or calculations were changed.

## Provenance and limitations

Each service has its own README, pinned source/runtime lock, readiness receipt and actual verification artifacts. The bridge's `verification.json` proves catalog/context/review behavior; `registrations.json` records client configuration. Provider-backed code review, company agent dispatch and external business connectors are separate acceptance steps. Model selection, existing REA/AWS/memory registrations and project code were preserved.

Licenses: Anthropic/Matt/Addy/Paperclip/WeKnora source assets retain their upstream notices; inspect source LICENSE files for specific terms. Alibaba/OpenShell are Apache-2.0; context-mode is Elastic License2.0, not a permissive MIT dependency. ParadeDB includes AGPL components. God's Eye View code licensing excludes separately licensed datasets/assets. This is local developer tooling, not a bundled commercial product dependency.
