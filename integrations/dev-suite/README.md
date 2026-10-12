# Shared developer suite bridge

For a fresh checkout, install the pinned tool dependencies with `npm ci --prefix integrations/company-dev-tools/runtime --ignore-scripts --no-audit --no-fund` from the repository root. The bridge uses the bundled catalog when present, supports an explicit `SEABRIDGE_DEV_SUITE_ROOT`, and falls back to the sibling installed ECC asset directory for split-runtime installations. Installed packages, models, credentials and databases are excluded from Git.

Source installation and full lifecycle guide: [company-dev-tools](../../../everything-claude-code/integrations/company-dev-tools/README.md). Absolute path: `C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/company-dev-tools/README.md`.

Standard stdio MCP launcher: `node cli.mjs mcp`. Five tools find/read pinned workflows, inspect installation receipts and prepare Alibaba review scope for a selected commit. `node cli.mjs context` launches pinned context-mode directly, preserving the calling project's cwd and avoiding its global setup script. User-level configuration is installed for Claude/Codex/Gemini/OpenCode and VS Code's MCP host; reconnect client sessions to discover changes.

`node cli.mjs status` reports installed assets, not live service health. `find`, `read`, and `review-prepare` take a JSON request-file path or `-` for stdin. `node cli.mjs review --help` exposes upstream OCR. No shell interpolation is used by this bridge for review inputs. The shared `sea-dev-suite` skill supplies the agent workflow.

Run `node integrations/dev-suite/verify.mjs` from the canonical runtime root for catalog read/traversal rejection, explicit-commit review preparation, context execution and indexed source retrieval. It uses an isolated synthetic fixture directory, no provider inference. `verification.json` is the receipt.

`configure-agents.mjs` adds user registrations without replacing existing servers/models and checks preservation. Configuration backups containing prior credential-bearing configuration are owner-ACL protected under `~/.codex/state/dev-suite-config-backups`; never publish them. Registration setup is machine-specific and must run from this canonical runtime root. Existing different entries fail rather than get overwritten.

WeKnora needs its on-demand service started before MCP connection. Its registration is initially disabled in Codex/Gemini/OpenCode. Paperclip and OpenShell are standard local-execution tools with their own verified launchers and state. They do not silently start on reconnect. Provider execution, editor-panel tool discovery after reconnect and external account connections remain separate from installation/configuration proof.
