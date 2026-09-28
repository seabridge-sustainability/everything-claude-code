# Antigravity Setup and Usage Guide

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->

Google Antigravity 2.0 discovers workspace customizations from the project-local
`.agents/` directory. ECC's Antigravity target installs native rules, workflows,
skills, and custom agents into that directory.

Native Antigravity 2.0 installation requires ECC 2.2.0 or newer. ECC 2.1.0 uses
the legacy `.agent/` adapter and does not provide the native layout described
below.

## Quick start

Verify that 2.2.0 is readable from the registry, then run the pinned package
from the project you want to configure:

```bash
npm view ecc-universal version
npx ecc-universal@2.2.0 install --profile minimal --target antigravity
```

### Source checkout alternative

```bash
# Run every command below from the project you want to configure.
# Keep the ECC source checkout separate and use its absolute path.
ECC_ROOT="/absolute/path/to/ECC"

# Install the minimal profile
"$ECC_ROOT/install.sh" --profile minimal --target antigravity

# Compatibility syntax: common rules plus only these language packs
"$ECC_ROOT/install.sh" --target antigravity typescript python go
```

PowerShell uses the same project-root working-directory contract:

```powershell
$EccRoot = "C:\absolute\path\to\ECC"

& "$EccRoot\install.ps1" --profile minimal --target antigravity
& "$EccRoot\install.ps1" --target antigravity typescript python go
```

Start a new Antigravity conversation after installing so the agent receives the
updated skill inventory.

## Native install mapping

| ECC source | Antigravity destination | Purpose |
|---|---|---|
| `rules/` | `.agents/rules/` | Workspace rules, flattened with collision-safe names |
| `commands/` | `.agents/workflows/` | User-invoked slash workflows |
| `skills/<name>/` | `.agents/skills/<name>/` | Agent Skills with a required `SKILL.md` |
| `agents/<name>.md` | `.agents/agents/<name>.md` | Custom main agents and subagents |

ECC does not copy the repository's `.agents/` directory wholesale. That source
tree is Codex packaging and contains Codex-specific marketplace metadata. An
Antigravity plugin instead requires `.agents/plugins/<plugin-name>/plugin.json`.

Installed custom agent definitions are adapted to Antigravity's frontmatter:
Claude model tiers become `flash` or `pro`, and Claude tool names become their
Antigravity equivalents. Unsupported tool identifiers are never emitted because
Antigravity warns that invalid tool names can hang custom-agent execution.

## Expected project tree

```text
your-project/
└── .agents/
    ├── rules/
    │   ├── common-coding-style.md
    │   └── typescript-testing.md
    ├── workflows/
    │   └── plan.md
    ├── skills/
    │   └── coding-standards/
    │       └── SKILL.md
    ├── agents/
    │   └── code-reviewer.md
    └── ecc-install-state.json
```

## Verify the installation

macOS and Linux:

```bash
node "$ECC_ROOT/scripts/list-installed.js" --target antigravity
node "$ECC_ROOT/scripts/doctor.js" --target antigravity
rg --files .agents/skills -g 'SKILL.md'
rg --files .agents/agents -g '*.md'
```

PowerShell:

```powershell
node "$EccRoot\scripts\list-installed.js" --target antigravity
node "$EccRoot\scripts\doctor.js" --target antigravity
Get-ChildItem .agents\skills -Recurse -Filter SKILL.md
Get-ChildItem .agents\agents -Recurse -Filter *.md
```

In Antigravity, open **Settings > Customizations**, confirm that workspace
skills appear, start a new conversation, and request one by its exact name.

## Existing `.agent/` installations

Antigravity still reads legacy `.agent/rules` and `.agent/skills`, but ECC now
uses the canonical `.agents/` layout. Do not rename `.agent` manually because
ECC install-state contains absolute managed paths.

Rerun the same ECC install command after updating. ECC writes and verifies the
new `.agents/ecc-install-state.json` first, then removes only unchanged files
owned by the valid legacy state. Modified and unmanaged files remain in
`.agent/` and remain discoverable by doctor and uninstall until handled.

Preview lifecycle operations before applying them when desired:

macOS and Linux:

```bash
node "$ECC_ROOT/scripts/doctor.js" --target antigravity
node "$ECC_ROOT/scripts/repair.js" --target antigravity --dry-run
node "$ECC_ROOT/scripts/uninstall.js" --target antigravity --dry-run
```

PowerShell:

```powershell
node "$EccRoot\scripts\doctor.js" --target antigravity
node "$EccRoot\scripts\repair.js" --target antigravity --dry-run
node "$EccRoot\scripts\uninstall.js" --target antigravity --dry-run
```

## Troubleshooting

### Skills do not appear

- A valid skill must be `.agents/skills/<name>/SKILL.md`.
- `.agent/.agents/skills` is an obsolete nested layout from older ECC builds.
- Start a new conversation after changing skill files.

### Rules do not apply

- Confirm the files are directly under `.agents/rules/`.
- Run doctor and inspect any missing or drifted managed-file warning.

### Workflows do not appear

- Confirm the files are under `.agents/workflows/`.
- Invoke a workflow with `/<workflow-name>` after restarting Antigravity.

## Official Antigravity references

- [Skills](https://antigravity.google/docs/skills)
- [Rules and workflows](https://antigravity.google/docs/rules-workflows)
- [Custom agents and subagents](https://antigravity.google/docs/subagents)
- [Plugins](https://antigravity.google/docs/plugins)

See [CONTRIBUTING.md](../CONTRIBUTING.md) for ECC contribution guidance and
[SELECTIVE-INSTALL-ARCHITECTURE.md](SELECTIVE-INSTALL-ARCHITECTURE.md) for the
installer lifecycle contract.
