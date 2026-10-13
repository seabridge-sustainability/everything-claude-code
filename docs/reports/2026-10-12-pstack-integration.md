# Pstack integration into ECC — 2026-10-12

Downloaded and integrated Pstack into the existing ECC checkout, using ECC policy, goal/session controls, the existing shared catalog and standard CLI/MCP entry points. No new worktree, upstream script execution, automatic provider inference, commit, push or deployment was performed. Existing services and agents were not stopped or restarted.

## Installed source and workflows

- Repository: https://github.com/cursor/plugins; pinned revision `7845807642f9ef234a0ec5b4067fa3f11fd92a85`, subtree `pstack`.
- Full local reference export: `integrations/company-dev-tools/sources/cursor-plugins/pstack` — 167 files, 52 skills, 3,476,433 bytes. Every file was verified against GitHub's Git blob identity and retained SHA-256 manifest. The source directory is ignored by Git; `integrations/pstack/import.mjs` restores the exact pin.
- Ten adapted, licensed catalog entries: arena, architect, create-verification-skill, maintain-verification-skill, interrogate, reflect, correct, how, why and blast-radius. Complete raw source remains reference-only.
- Catalog: 384 skills and 65 command templates; all 374 prior skill entries remain. The builder retains Pstack indexing on rebuild.
- Native thin skills: `sea-multi-model-planning`, `sea-verify-seabridge`; one canonical body each in ECC. Existing GSD, review and verification controls remain authoritative.
- Five MCP tools on `seabridge-pstack`: catalog find/read, prepare plan, validate review and verify feature. Both catalog tools reuse the existing shared catalog and enforce exact-ID/digest reads.

## Cross-agent proof

Claude, Codex, Gemini, OpenCode, VS Code and Cursor each have a fresh-session stdio registration. Configuration changes were compared against prior parsed values; existing servers, models and other settings were preserved. A second configuration run left all six config files byte-identical. Fourteen native thin loaders were installed across shared and host-specific skill directories.

Using each client's actual saved launch configuration, an MCP SDK client started the real server, discovered all five tools, called catalog find/read, prepared a packet, validated an offline review and ran source verification. Each rejected a tampered review. This proves protocol operation from the client configuration; it is not a claim that every active editor/model already adopted the tools.

Additional native CLI observations: Codex reports the entry enabled; Claude reports Connected; Gemini and OpenCode native skill listings contain both skills. Installed CLI versions observed: Codex 0.162.1, Claude 2.1.285, Gemini 0.63.0 and OpenCode 1.19.0. Running sessions were left intact; use fresh sessions to discover new metadata. Antigravity's standard MCP config was absent, so no Antigravity connection was invented or installed.

## Local verification

- `node --test tests/scripts/pstack-integration.test.mjs`: 14 passed, 0 failed.
- Existing `node integrations/dev-suite/verify.mjs --routing-only`: 96 checks passed, 0 failed.
- Skill creator validator: both canonical SeaBridge skills and all ten catalog adapters passed.
- Tests cover pinned source integrity; one-primary routing; digest-checked reads; idempotent indexing; all six client launch configurations; offline candidate/judge validation; actual affected-file drift; candidate tampering; missing candidates/judge/rubric; judge rejection; path traversal/Windows aliases; allowlisted features; bounded child timeout; and evidence surviving child exit.
- Planning includes a concrete six-criterion rubric, anchored 0–3 decision scores, context limits, source/policy/adapter hashes and exact candidate digests. A valid review is ready for owner review and never authorizes implementation.
- Receipts: `artifacts/agent-runs/pstack/mcp-proof.json`, `integration-proof.json` and individual verification JSON receipts. They contain no copied user configuration or credential values.

## Explicit proof boundaries

The owner chose provider-free proof and deferred live model calls. The two-planner/judge test uses declared fixtures; it does not prove LLM quality, provider availability or model diversity. A sanitized live-proof spec and freshly grounded packet remain under `artifacts/agent-runs/pstack` for a future authorized batch.

GET probes for primary frontend :3000 and backend :8000 reported BLOCKED because neither listener was reachable. No replacement instances or alternate ports were started. Nature Actions is configured-unverified: durable Save/fresh reopen, receipt/source equality and attachment upload/download require the intended authenticated runtime and approved test data. Source inspection confirmed that the existing Nature workflow E2E uses a mock JWT and fulfilled HTTP routes; its green result would not establish real persistence.

Cursor cloud desktops, native model rules/custom modes, upstream dependency bootstrap, worktree cleanup, autonomous shipping, `/loop`, Grok Bot/Benny automation, support-inbox monitoring and emergency auto-merge were not activated. Feature knowledge maintenance uses existing version-controlled documentation and knowledge-ops boundaries, not a new store or personal-memory edits.

## Agent entry points

Read [PSTACK_ECC_GUIDE.md](../tools/PSTACK_ECC_GUIDE.md). Ask a fresh agent to use `sea-multi-model-planning` or `sea-verify-seabridge`. CLI fallback: `node integrations/pstack/cli.mjs status`, `find`, `read`, `plan`, `review`, or `verify`.

Installation/configuration and provider-free tooling verification are complete locally. Authenticated product journeys, live model judgment, publication and deployment remain separate and are not claimed.
