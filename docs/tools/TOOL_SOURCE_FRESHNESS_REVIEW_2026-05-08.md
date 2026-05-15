# Tool & Source Freshness Review

Date: 2026-05-08
SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

---

## External Tools (ECC `external/`)

| Tool | Commit | Commit Date | Status |
|------|--------|-------------|--------|
| get-shit-done (GSD) | `265e85ce` | 2026-05-06 | Current |
| unsloth | `fac2dc09` | 2026-05-06 | Current |
| local-deep-research | `56290b15` | 2026-05-06 | Current |
| mcp-toolbox | `8d2d521a` | 2026-05-08 | Current |

### Notes

- **superpowers** — Not present in `external/`. Superpowers v5.1.0 is embedded
  as an adapted local methodology through SeaBridgeAI `sea-*` skills. It is not
  installed globally or through a marketplace. No action needed.

---

## Standalone Tools

| Tool | Version | Location | Status |
|------|---------|----------|--------|
| RTK (Rust Token Killer) | 0.35.0 | `C:\Users\adelm\.local\bin\rtk.exe` | Current |
| Berry MCP (hallucination detection) | 1.0.1 | `C:\Users\adelm\AppData\Roaming\Python\Python314\Scripts\berry.exe` | Current |

---

## Agent Instruction Files (per-repo)

All 4 core repos have been verified to contain aligned instruction files:

| Repo | CLAUDE.md | AGENTS.md | AGENTS_SYSTEM.md | SYSTEM_ID |
|------|-----------|-----------|-------------------|-----------|
| manageesg-backend | Present | Present | Present | Verified |
| manageesg-frontend | Present | Present | Present | Verified |
| everything-claude-code | Present | Present | Present | Verified |
| openseabri | Present | Present | Present | Verified |

---

## MCP Configuration Files

| Agent | Config File | Repos Present |
|-------|-------------|---------------|
| Claude Code | `.mcp.json` | backend, frontend, ECC, openseabri |
| Codex | `.codex/config.toml` | backend, frontend, ECC, openseabri |
| Gemini | `.gemini/settings.json` | backend, frontend, ECC, openseabri |
| OpenCode | `.opencode/opencode.json` | backend, frontend |

---

## Skills (sea-*)

20 canonical skills verified at `skills/sea-*/SKILL.md`.
20 wrapper skills verified at `.agents/skills/sea-*/SKILL.md`.

Full skill list:
1. sea-senior-dev-workflow
2. sea-brainstorming-and-spec-refinement
3. sea-task-orchestration
4. sea-test-driven-development
5. sea-systematic-debugging
6. sea-verification-before-completion
7. sea-code-review-response
8. sea-git-worktree-isolation
9. sea-parallel-agent-dispatch
10. sea-finishing-development-branch
11. sea-backend-api-verification
12. sea-frontend-design
13. sea-ai-data-integrity
14. sea-sustainability-domain-review
15. sea-context-hygiene
16. sea-cross-repo-handoff
17. sea-skill-creator-protocol
18. sea-knowledge-vault
19. sea-gsd-controlled-execution
20. sea-local-llm-training

---

## Refresh Commands

To update any external tool:

```powershell
git -C "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\<tool>" pull --depth=1
```

To check freshness at any time:

```powershell
$tools = @("get-shit-done","unsloth","local-deep-research","mcp-toolbox")
foreach ($t in $tools) {
    $p = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\$t"
    if (Test-Path $p) { Write-Output "${t}: $(git -C $p log -1 --format='%h %ci')" }
}
```

---

## Recommendations

1. **No stale tools detected.** All external tools have commits within the last 48 hours.
2. **superpowers** is correctly absent from `external/` — it is embedded, not cloned.
3. **Periodic refresh cadence:** Run `git pull --depth=1` on external tools weekly or before major feature work.
4. **Berry** and **RTK** are standalone binaries — check for updates via `pip install --upgrade berry-mcp` and the RTK release page respectively.
