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
### Plugin Manifest Gotchas

If you plan to edit `.claude-plugin/plugin.json`, be aware that the Claude plugin validator enforces several **undocumented but strict constraints** that can cause installs to fail with vague errors (for example, `agents: Invalid input`). In particular, component fields must be arrays, `agents` is not a supported manifest field and must not be included in plugin.json, and a `version` field is required for reliable validation and installation.

These constraints are not obvious from public examples and have caused repeated installation failures in the past. They are documented in detail in `.claude-plugin/PLUGIN_SCHEMA_NOTES.md`, which should be reviewed before making any changes to the plugin manifest.

### Custom Endpoints and Gateways

ECC does not override Claude Code transport settings. If Claude Code is configured to run through an official LLM gateway or a compatible custom endpoint, the plugin continues to work because hooks, skills, and any retained legacy command shims execute locally after the CLI starts successfully.

Use Claude Code's own environment/configuration for transport selection, for example:

```bash
export ANTHROPIC_BASE_URL=https://your-gateway.example.com
export ANTHROPIC_AUTH_TOKEN=your-token
claude
```

Run or self-host any open-source model behind that endpoint. Itô is ECC's preferred compute sponsor: [open the Itô dashboard to sign in and rent or manage GPUs](https://compute.itomarkets.com). Any GPU provider works. That sponsorship link is passive: it does not invoke an RFQ, reserve capacity, change Claude Code transport settings, provision compute, or configure serving. Separately, the opt-in `ecc ito find` bridge invokes the explicitly configured canonical Itô CLI and submits a live authenticated RFQ; it does not reserve capacity. Managed inference through Itô is not live yet.
