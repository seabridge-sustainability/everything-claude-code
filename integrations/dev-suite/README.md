# Shared developer suite bridge

For a fresh checkout, install the pinned tool dependencies with `npm ci --prefix integrations/company-dev-tools/runtime --ignore-scripts --no-audit --no-fund` from the repository root. The bridge uses the bundled catalog when present, supports an explicit `SEABRIDGE_DEV_SUITE_ROOT`, and falls back to the sibling installed ECC asset directory for split-runtime installations. Installed packages, models, credentials and databases are excluded from Git.

Source installation and full lifecycle guide: [company-dev-tools](../../../everything-claude-code/integrations/company-dev-tools/README.md). Absolute path: `C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/company-dev-tools/README.md`.

Standard stdio MCP launcher: `node cli.mjs mcp`. Five tools find/read pinned workflows, inspect installation receipts and prepare Alibaba review scope for a selected commit. `node cli.mjs context` launches pinned context-mode directly, preserving the calling project's cwd and avoiding its global setup script. User-level configuration is installed for Claude/Codex/Gemini/OpenCode and VS Code's MCP host; preserve productive sessions and let fresh sessions discover additions.

`node cli.mjs status` reports installed assets, not live service health. `find`, `read`, and `review-prepare` take a JSON request-file path or `-` for stdin. `node cli.mjs review --help` exposes upstream OCR. No shell interpolation is used by this bridge for review inputs. The shared `sea-dev-suite` skill supplies the agent workflow.

Run `node integrations/dev-suite/verify.mjs` from the canonical runtime root for catalog read/traversal rejection, explicit-commit review preparation, context execution and indexed source retrieval. It uses an isolated synthetic fixture directory, no provider inference. `verification.json` is the receipt.

`configure-agents.mjs` adds user registrations without replacing existing servers/models and checks preservation. Configuration backups containing prior credential-bearing configuration are owner-ACL protected under `~/.codex/state/dev-suite-config-backups`; never publish them. Registration setup is machine-specific and must run from this canonical runtime root. Existing different entries fail rather than get overwritten.

WeKnora needs its on-demand service started before MCP connection. Its registration is initially disabled in Codex/Gemini/OpenCode. Paperclip and OpenShell are standard local-execution tools with their own verified launchers and state. They do not silently start on reconnect. Provider execution, editor-panel tool discovery after reconnect and external account connections remain separate from installation/configuration proof.

## Selective Matt/Addy/Pstack integration

Retained upstream repositories stay under `integrations/company-dev-tools/sources`;
their pins and licenses are preserved. Four selected Matt and six selected Addy
disciplines remain available. Three additional ECC-adapted workflows fill specific
gaps without importing the upstream lifecycle or hooks:

| Request | Exact shared catalog ID |
|---|---|
| Clarify material requirements / requested Grill Me | `ecc-engineering/ecc/sea-requirements-discovery` |
| Define/review scoped quality constraints | `ecc-engineering/ecc/sea-quality-contract` |
| Doubt-driven review of a consequential claim | `ecc-engineering/ecc/sea-adversarial-review` |

Call `suite_find_workflow` with the task or exact ID, then `suite_read_skill` with
the returned ID. Clients with only the existing Pstack bridge (including this
Cursor configuration) use `pstack_find_workflow`/`pstack_read_skill` with those same
IDs; both bridges read the same catalog. The existing CLI accepts the same JSON on stdin:

```powershell
'{"query":"define constraints"}' | node integrations/dev-suite/cli.mjs find -
'{"id":"ecc-engineering/ecc/sea-quality-contract"}' | node integrations/dev-suite/cli.mjs read -
```

Canonical bodies live in ECC `integrations/company-dev-tools/skills/ecc-engineering`;
root and user-native skill files are thin loaders. No backend/frontend rule files
are added. Existing central instruction files already route through ECC's
`sea-skill-map` and model/skill policy. Other projects retain their own authority.

Small edits need minimal checks; behavior changes need affected contract/journey
evidence; auth/tenant, irreversible and scientific changes need stronger evidence.
Pstack's existing planning and verification entry points remain primary for their
tasks. Keep constraints and discovery notes in the existing ECC task record;
upstream CONSTRAINTS.md is not an automatic product file requirement. Quality
guidance does not claim enforcement without an actual running checker.

Performance work reuses the installed performance/browser workflows and genuine
traces/Lighthouse artifacts. Missing measurement infrastructure stays unverified;
source guesses are labelled potential impact. No new server, dependency, model
call, automatic commit, full-suite loop or shipping hook is enabled.

`node integrations/engineering-skills/catalog.mjs` validates retained source bytes
and installs only these three entries. The normal catalog builder retains them.
`node integrations/engineering-skills/configure.mjs` adds only matching thin skill
loaders for fresh sessions; existing differing files fail preflight. It changes
no client settings, servers, models or running agents.
`node integrations/engineering-skills/verify-clients.mjs` invokes the six saved
stdio registrations through the MCP SDK; it does not establish native agent/UI
adoption. Tests: `node --test tests/scripts/selective-engineering-skills.test.mjs`.
Private receipts live in `artifacts/agent-runs/pstack/engineering-skills`.

Task routing now comes from `manifests/task-skill-routing.json`; there is no second
Markdown priority table. Find requests accept `profile: "coding"`, `"company"`,
`"all"` or `"auto"` and return the policy digest plus canonical local skill entry.
Use `node scripts/skill-route.js -` with a bounded task query and explicit impact
flags for risk-scaled guidance. Managed future sessions bind the selected body and
policy/catalog identities; this does not change running clients. Both existing
MCP bridges share the resolver and keep their five-tool surface.

Existing Pstack verification adds bounded backend auth/OpenSeaBri fixture tests
and frontend return-path Vitest checks. Signed-in property and Open Access recipes
retain unmet prerequisites until genuine intended-runtime receipts are supplied.
No unit test or successful routing invocation establishes live multi-model proof.

Rollback: stop selecting these adapters or restore their task-owned source/catalog
changes through normal Git review. Remove only unchanged loaders created by this
batch if requested; preserve upstream sources, existing configs and receipts.
