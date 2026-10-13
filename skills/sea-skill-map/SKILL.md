---
name: sea-skill-map
description: Select the smallest useful ECC workflow for a task using the canonical routing manifest and current project policy.
---

# Task skill selection

Central project instructions and the current owner request govern scope, permissions and acceptance. Karpathy assumptions, simplest design, surgical edits and observable success apply to every coding task. Small clear presentation changes need a focused check, not another workflow.

Use the single routing source at `manifests/task-skill-routing.json`. Run `node scripts/skill-route.js task.json` from ECC with the request, `profile: coding`, and known boolean impact flags. The result identifies one catalog workflow, its SeaBridge entry, relevant checks and review posture. Impact governs risk, not file count. An unresolved route requires task selection; do not choose the first unrelated search result.

MCP: `suite_find_workflow` or `pstack_find_workflow` uses the same manifest. Check `routingRole=primary`, `routingVersion` and `routingPolicySha256`, then read the exact ID. Prefer the coding profile for engineering; company/all remain available for business work. If an old running bridge lacks routing-version metadata, use the fresh Node CLI or exact known IDs; preserve productive sessions.

Read only the selected workflow. The local SeaBridge entry supplies project-specific safeguards; the catalog body supplies its discipline, not a second goal or investigation. Add security/scientific/domain guidance only for a material affected boundary. GSD supports the existing goal. Grill Me is for material ambiguity or an explicit interview; independent reviewers and Pstack arenas require their appropriate authorization and add value only for consequential tasks.

Detailed overlap and evidence boundaries remain in `docs/tools/MODEL_PROMPTING_AND_SKILL_POLICY.md`. Do not bulk-load the catalog, copy rule bodies into product repositories, auto-install upstream plugins, call models or restart services as a routing side effect.
