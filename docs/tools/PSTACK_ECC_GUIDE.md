# Pstack under ECC

Pstack is pinned reference material, not another instruction authority or autonomous shipping system. ECC owns scope, the active goal, budgets, provider permissions and completion claims. VS Code remains the editor. The same workflows are available to Claude, Codex, Gemini, OpenCode, Cursor and VS Code's MCP host through standard stdio tools and native thin skill loaders.

## Entry points

- Ask for `sea-multi-model-planning` when a substantial change needs competing plans and independent judgment. Ordinary small edits use the existing task workflow.
- Ask for `sea-verify-seabridge` to run or maintain a feature journey. It extends `verification-loop`, not a second verification framework.
- Shared catalog: `pstack_find_workflow` with `multi-model planning`, `verification skill` or `maintain verification`, then `pstack_read_skill` with the exact returned `cursor-pstack/ecc/...` ID. These aliases use the existing ECC catalog, so a client does not need a second MCP server to discover the skills. Existing `suite_find_workflow`/`suite_read_skill` remain available where registered.
- Five tools on `seabridge-pstack`: `pstack_find_workflow`, `pstack_read_skill`, `pstack_prepare_plan`, `pstack_validate_review`, `pstack_verify_feature`.
- CLI from `C:/Users/adelm/SeaBridgeAI/everything-claude-code`:

```powershell
node integrations/pstack/cli.mjs status
node integrations/pstack/cli.mjs find query.json
node integrations/pstack/cli.mjs read selection.json
node integrations/pstack/cli.mjs plan spec.json
node integrations/pstack/cli.mjs review review.json
node integrations/pstack/cli.mjs verify pstack-source
node integrations/pstack/cli.mjs verify ecc-workflow-routing
node integrations/pstack/cli.mjs verify backend-readiness
node integrations/pstack/cli.mjs verify frontend-readiness
node --test tests/scripts/pstack-integration.test.mjs
```

The find/read/plan/review commands accept `-` for JSON on stdin. Use `{"query":"multi-model planning"}` for find and `{"id":"cursor-pstack/ecc/arena"}` for read. Verification returns exit 0 for PASS, 1 for FAIL and 2 for BLOCKED. Missing services are not launched automatically. Run configuration once with `node integrations/pstack/configure.mjs`; it appends only a new Pstack MCP entry and adds native skill loaders, preserving existing models and servers. It preflights conflicts and never restarts running sessions. New sessions can discover the additions. Do not reconnect productive sessions automatically.

## Plan contract

Example specification (use real affected paths and acceptance for your task):

```json
{
  "id": "pstack-guide-review",
  "goal": "Improve the agent guidance without changing application behavior",
  "scopes": [{"repository": "ecc", "paths": ["docs/tools/PSTACK_ECC_GUIDE.md"]}],
  "acceptance": [{"id": "clear-entry", "scenario": "An agent can find the appropriate workflow", "proof": "Exact workflow discovery and digest-checked read"}],
  "protectedBehavior": ["Preserve existing services and agent settings"],
  "constraints": ["No product edits, worktrees, provider calls or publication during planning"]
}
```

`plan` returns a packet with current repository heads, affected-file hashes, central policy hashes, adapter hash, packet digest, shared task and judge rubric. Both planners must return `{id, model, provider, packetDigest, text}`. Obtain completed candidates before judging; use native delegation or explicitly approved model CLI calls. This adapter does not invoke providers itself or invent model names. Preserve OpenCode's configured Qwen/NVIDIA choices. An absent reviewer is absent, never silently substituted. Use fresh-session scope controls for actual child agents, and one writer per repository after approval.

The judge returns `{model, provider, candidateDigests, chosen, scores, rationale, blockers}`. `candidateDigests` uses `digest(candidate)` exported by `integrations/pstack/runtime.mjs`; `scores` maps every candidate ID to every returned rubric criterion with integer values 0..3. `chosen` is a candidate ID or null. Include an empty blockers array only when no blocker was found. Submit `{packet, candidates, judgment, authenticity}` to `review`/`pstack_validate_review`. Packet tampering, current-source drift and candidate drift fail. Fixture reviews are explicitly labeled; caller-reported model identities alone are not proof of provider execution.

A valid review is ready for OWNER REVIEW, not implementation. The owner approves the concrete synthesis; then ECC's existing task orchestration executes it. GSD supports this same goal. Do not misuse `council-multi-model` for implementation planning: that existing skill has a separate, narrower purpose.

## Verification and feature ownership

The maintained feature map is `skills/sea-verify-seabridge/features/README.md`; the executable allowlist is in `integrations/pstack/runtime.mjs`. Tooling checks establish source/catalog behavior. HTTP probes establish readiness only. Nature Actions remains configured-unverified until Save, fresh reopen, receipt equality and attachment upload/download are proved through real authenticated UI/API calls against approved test data. Do not treat the existing mocked E2E spec as durable product proof.

For a changed feature, resolve its source entry points and responsible task owner. Update the affected feature recipe and useful regression check in the same change. Capture redacted action/result evidence, source/runtime revisions, auth/tenant context without credentials, prerequisites, verdict and cleanup. Use the existing knowledge-ops workflow for durable documentation; no new shared memory store or automatic private-data ingestion. Do not scan unrelated transcripts or automatically edit personal memory.

Reuse primary frontend :3000 and backend :8000; serialize shared UI and data checks. Readiness, fixture tests, signed-in UI, persistence, scientific validation and deployment are separate proof stages. Missing prerequisites remain BLOCKED; no alternate ports, automatic seeding or provider calls. Provider execution, shared-data writes and external communications require their appropriate existing authorization.

## Upstream boundary and maintenance

Full upstream: `integrations/company-dev-tools/sources/cursor-plugins/pstack`, ignored reference export, 167 files including all 52 skill bodies and references. Pin and all Git blob/SHA-256 identities: `integrations/pstack/source-manifest.json`. MIT license retained in the selected adapter family. `node integrations/pstack/import.mjs` restores that exact download and refuses differing existing files. No upstream code runs during download.

Ten adapted catalog entries cover arena, architect, verification creation/maintenance, interrogate, reflect, correct, how, why and blast-radius. `node integrations/pstack/catalog.mjs` idempotently adds them without changing prior catalog entries; the normal catalog builder retains them on rebuild.

Cursor Task/model rules, native custom modes, automatic dependency bootstrap, autonomous PR shipping, worktree cleanup, `/loop`, Grok Bot and Benny/Slack automations are not activated. Native hooks and model/provider usability require separate per-harness evidence. No 24/7 support monitoring, error auto-merge or new cloud environment is implied by this integration.

Rollback: disable/remove only `seabridge-pstack` in the listed client configs and remove only the new thin loaders after checking their unchanged content. Existing servers/models remain untouched. Preserve the source, license and receipts; no repository or shared-data deletion. No commit, push or deploy is performed by this setup.
