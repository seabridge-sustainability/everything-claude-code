# Agent Environment — Recommendations (2026-09-24)

Recommendations only: nothing in this document was applied to account or user
settings. Evidence comes from the 2026-09-24 baseline, modernization and
follow-up work (`2026-09-24-agent-system-*.md` in this folder).

## (a) Org-synced claude.ai plugins

Every Claude Code session lists the skills of all enabled plugins. Today the
listing is truncated to names (≈1,500 tokens for 199 plugin skills and
commands); if descriptions are shown, the enabled set costs up to ≈18,300 tokens.
Plugin MCP servers add tools only after authorisation, except two that are live:
small-business (Shopify, 38 deferred tool names plus a long non-deferred
server-instructions block in every session) and pdf-viewer (3 tool names).

Estimated tokens = name + description listing per plugin (o200k_base, Claude
Code's 1,536-character cap per skill), i.e. the cost when descriptions load.

| Plugin | Est. startup tokens | Keep / disable | Reason |
|---|---:|---|---|
| small-business | ≈7,500 + Shopify MCP instructions block | **disable** | SMB payroll, Shopify, invoicing; the only plugin that injects a long always-on MCP instructions block |
| sales | ≈3,000 | **disable** | CRM and pipeline work |
| brand-voice | ≈1,500 | **disable** | marketing voice |
| bio-research | ≈650 | **disable** | life sciences |
| finance | ≈430 | **disable** | accounting close, SOX |
| human-resources | ≈490 | **disable** | HR workflows |
| marketing | ≈490 | **disable** | marketing workflows |
| customer-support | ≈270 | **disable** | support tickets |
| enterprise-search | ≈220 | **disable** | needs connectors that are not authorised |
| productivity | ≈200 | **disable** | duplicates the memory system |
| operations | ≈510 | **disable** | operations/process docs |
| cowork-plugin-management | ≈130 | **disable** | plugin authoring |
| slack-by-salesforce | ≈110 | **disable** | Slack workflows (the Slack MCP connector itself is separate) |
| legal | ≈570 | disable, or keep for vendor/licence checks | occasional licence review |
| engineering | ≈545 | **keep** | review/debug/ADR skills overlap ECC but are useful |
| data | ≈650 | **keep** | SQL and data viz, overlaps ESG analytics |
| design | ≈390 | **keep** | accessibility review for the frontend |
| pdf-viewer | ≈110 + 3 MCP tool names | **keep** | DD and utility-bill PDFs |
| product-management | ≈480 | keep only if used | specs/roadmaps; ECC Spec Kit covers specs |

Disabling the "disable" rows removes ≈15,700 of the ≈18,300 description-level
tokens (≈1,100 of the ≈1,500 name-only tokens) and the Shopify instructions block.

Stale duplicates: `design`, `legal`, `human-resources`, `operations` also exist as
un-suffixed directories under `~/.claude/plugins/synced/<bucket>/` without a
`.meta.json`; only the `~g3` generations are active. They cost nothing but can be
cleaned up with the plugins.

**Applied 2026-09-24:** the 13 "disable" rows were disabled for this user with
`claude plugin disable <name>@synced` (`~/.claude/settings.json` backed up to
`settings.json.bak-2026-09-24-plugins`); `claude plugin list` shows them
`disabled`. Undo any one with `claude plugin enable <name>@synced`. legal and
product-management were left enabled.

**How to disable**

- *Organisation-synced plugins are managed in claude.ai, not in local files.*
  claude.ai → Settings → Capabilities (or the organisation admin console →
  Plugins / Skills) → turn off each plugin for your account or the org. The
  synced copies under `~/.claude/plugins/synced/` are refreshed from there; do
  not delete them by hand.
- *In Claude Code:* `/plugin` → Installed/Manage → select the plugin → Disable
  (per user). Check the result with a new session: the skills list at startup
  should no longer show `sales:*`, `small-business:*`, etc.
- Keep the MCP connectors you actually use (Slack, Gmail, Google Drive) — they
  are separate from the skill plugins.

## (b) Effort defaults

**Claude Code.** `~/.claude/settings.json` has `effortLevel: "high"` at the top
level and `modelSettings.claude-opus-5-5.effortLevel: "medium"`. Per the Claude
Code model-config docs, the top-level `effortLevel` no longer applies to Opus 5.5
(it only affects Opus 5, Fable 5.1 and older); Opus 5.5 therefore runs at
`medium`, which is also its vendor default.

- Keep `medium` as the everyday default.
- Raise per task with `/effort high` (or `xhigh`) for: multi-file changes,
  tenant/auth/persistence work, migrations, AI-grounding or provenance logic,
  cross-repo contract changes, and hard debugging after a failed first attempt.
- Avoid `max` as a default: the docs note diminishing returns and overthinking.
- The top-level `effortLevel: "high"` can stay (it only matters if you switch to
  an older model) or be removed to avoid confusion.

**Codex.** `~/.codex/config.toml`: `model = "gpt-5.6-sol"`,
`model_reasoning_effort = "high"`. The local model cache lists
`default_reasoning_level = "low"` for gpt-5.6-sol; the API docs list `medium` as
default and recommend starting at the default and raising for multi-step work.

- Recommendation: **keep `high`** for SeaBridge backend work (multi-step,
  tenant-sensitive, long test cycles), and drop to `medium` per session for
  quick edits or docs (`codex -c model_reasoning_effort="medium"`). Do not use
  `max`/`ultra` as defaults (`ultra` delegates to subagents automatically).
- GPT-6 models (`gpt-6-sol`, `gpt-6-astra`) are listed in OpenAI's Codex models
  page but not yet in the local model cache (fetched 2026-09-24T20:28Z); switch
  `model` only once they appear there.

## (c) npm `codex` CLI (0.124) hangs; the app CLI (0.150) works

`codex` on PATH is the npm package at `%APPDATA%\npm\codex.ps1` (v0.124). After
the invalid `service_tier = "default"` line was removed it loads the config but
hangs on `exec`; the Codex app ships its own CLI (v0.150) at
`%LOCALAPPDATA%\OpenAI\Codex\bin\<build>\codex.exe`, which runs the same probes
correctly. The npm build predates the config the app writes (e.g. `gpt-5.6-sol`,
`features.hooks`).

Recommended fix without installing anything: put the app's CLI first on PATH for
your user, or alias it in your PowerShell profile:

```powershell
# PowerShell profile ($PROFILE)
Set-Alias codex "$env:LOCALAPPDATA\OpenAI\Codex\bin\d0097be4feba73d0\codex.exe"
```

The `<build>` folder changes when the app updates; a small function that picks
the newest `codex.exe` under `$env:LOCALAPPDATA\OpenAI\Codex\bin\` avoids editing
the alias. Removing the stale npm package (`npm uninstall -g @openai/codex`) is
the clean long-term fix but is an uninstall — do it yourself when convenient.

## (d) Pinned `_upstream` mirrors

Branch mirrors were fast-forwarded on 2026-09-24 (CopilotKit, MiroFish,
bess-performance-engineering, gbrain, hermes-agent, openclaw; space-agent was
current). The detached mirrors below stay at their pins until a deliberate
review; the recorded gitlinks in `_upstream` and `openseabri/imports/manifest.json`
must move together.

| Mirror | Pin | Behind upstream | SeaBridge references | Recommendation |
|---|---|---:|---|---|
| nanobot | 5853d5df | 2,312 | `openseabri/imports/manifest.json:25`, `openseabri/UPSTREAM_SYNC.md` | **keep-pinned** — code is imported into OpenSeaBri; bump only through `IMPORT_POLICY.md` with a diff review |
| awesome-deepseek-agent | 5c11e014 | 92 | `openseabri/imports/manifest.json:34`, `UPSTREAM_SYNC.md`, `LICENSES/awesome-deepseek-agent.txt` | **keep-pinned** — licence file records the pinned revision |
| PageIndex | dcda5656 | 198 | `manageesg-backend/docs/pageindex_evaluation.md:13` | propose-bump — evaluation-only; re-run the evaluation note on the new tip |
| openwork | ebbaa916 (release branch) | 5,471 behind `dev` | `manageesg-backend/docs/cloud_work/UPSTREAM_DECISION_NOTE.md:9` | keep-pinned — pinned to a release tag the Cloud Work decision was based on |
| docuseal | 744d45d2 (tag 2.5.2) | 368 | none | propose-bump — reference only |
| multica | de356561 | 2,635 | none | propose-bump — reference only |
| rowboat | 17afc935 (tag v0.3.5) | 2,631 | none | propose-bump — reference only |
| text-to-cad | 1d2285cd | 1,368 | none (ECC `skills/sustainable-cad` names the mirror, not the commit) | propose-bump — reference only |
| research/kepano-obsidian-skills | fa1e131a | 12 | none | propose-bump — reference only |
| space-agent-customware L1/L2 | d6ac7ff / 1947a96 | no remote | none | keep — local-only repos |

Also: four gitlinks (MiroFish, hermes-agent, openclaw, space-agent) record older
commits than their checkouts and are hidden by `skip-worktree` bits and
`submodule.<name>.ignore=dirty`. Either record the current commits deliberately
or restore the pins; today the recorded pin and the checkout disagree silently.
