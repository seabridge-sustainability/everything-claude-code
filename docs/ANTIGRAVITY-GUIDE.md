# Antigravity Setup and Usage Guide

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->

Google Antigravity 2.0 discovers workspace customizations from the project-local
`.agents/` directory. ECC's Antigravity target installs native rules, workflows,
skills, and custom agents into that directory.

## Quick start

```bash
# Install the minimal profile
./install.sh --profile minimal --target antigravity

# Compatibility syntax: common rules plus only these language packs
./install.sh --target antigravity typescript python go
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

```bash
node scripts/list-installed.js --target antigravity
node scripts/doctor.js --target antigravity
rg --files .agents/skills -g 'SKILL.md'
rg --files .agents/agents -g '*.md'
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

```bash
node scripts/doctor.js --target antigravity
node scripts/repair.js --target antigravity --dry-run
node scripts/uninstall.js --target antigravity --dry-run
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
