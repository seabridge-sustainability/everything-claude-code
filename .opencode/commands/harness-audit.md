---
description: Run a deterministic repository harness audit and return a prioritized scorecard.
---

# Harness Audit Command

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


Run a deterministic repository harness audit and return a prioritized scorecard.

## Usage

`/harness-audit [scope] [--format text|json] [--root path]`

- `scope` (optional): `repo` (default), `hooks`, `skills`, `commands`, `agents`
- `--format`: output style (`text` default, `json` for automation)
- `--root`: audit a specific path instead of the current working directory

## Deterministic Engine

Always run:

```bash
node scripts/harness-audit.js <scope> --format <text|json> [--root <path>]
```

This script is the source of truth for scoring and checks. Do not invent additional dimensions or ad-hoc points.

Rubric version: `2026-05-19`.

The script computes up to 12 fixed categories (`0-10` normalized each). The first seven are always applicable; GitHub Integration is always applicable; deploy-target categories are applicable only when a matching marker is detected.

1. Tool Coverage
2. Context Efficiency
3. Quality Gates
4. Memory Persistence
5. Eval Coverage
6. Security Guardrails
7. Cost Efficiency
8. GitHub Integration
9. Vercel Integration *(when `vercel.json` or `.vercel/` is present)*
10. Netlify Integration *(when `netlify.toml` or `.netlify/` is present)*
11. Cloudflare Integration *(when `wrangler.toml` or `wrangler.jsonc` is present)*
12. Fly Integration *(when `fly.toml` is present)*

Scores are derived from explicit file/rule checks and are reproducible for the same commit.
The script audits the current working directory by default and auto-detects whether the target is the ECC repo itself or a consumer project using ECC.

## Output Contract

Return:

1. `overall_score` out of `max_score`. `max_score` depends on which categories are applicable to the target; never assume a fixed total.
2. `applicable_categories[]` and `category_count` describing which categories contributed.
3. Category scores and concrete findings.
4. Failed checks with exact file paths.
5. Top 3 actions from the deterministic output (`top_actions`).
6. Suggested ECC skills to apply next.

## Checklist

- Use script output directly; do not rescore manually.
- If `--format json` is requested, return the script JSON unchanged.
- If text is requested, summarize failing checks and top actions.
- Include exact file paths from `checks[]` and `top_actions[]`.

## Example Result

```text
Harness Audit (repo, repo): 71/80
- Tool Coverage: 10/10 (10/10 pts)
- Context Efficiency: 9/10 (9/10 pts)
- Quality Gates: 10/10 (10/10 pts)
- GitHub Integration: 2/10 (2/10 pts)

Top 3 Actions:
1) [GitHub Integration] Add at least one workflow under .github/workflows/. (.github/workflows/)
2) [Security Guardrails] Add prompt/tool preflight security guards in hooks/hooks.json. (hooks/hooks.json)
3) [Eval Coverage] Increase automated test coverage across scripts/hooks/lib. (tests/)
```

## Arguments

$ARGUMENTS:
- `repo|hooks|skills|commands|agents` (optional scope)
- `--format text|json` (optional output format)
