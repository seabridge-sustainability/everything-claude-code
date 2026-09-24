# Antigravity Setup and Usage Guide

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
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
