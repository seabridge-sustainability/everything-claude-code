# Cross-Repo Agent System Recheck

**Date:** 2026-05-09
**SYSTEM_ID:** SEABRIDGE_AGENT_SYSTEM_V1

---

## 1. Sea-* Skills (20/20)

All 20 skills confirmed present with canonical bodies in
`everything-claude-code/skills/sea-*/SKILL.md` and wrapper pointers
in `everything-claude-code/.agents/skills/sea-*/SKILL.md`.

| # | Skill | Canonical | Wrapper |
|---|-------|-----------|---------|
| 1 | sea-ai-data-integrity | OK | OK |
| 2 | sea-backend-api-verification | OK | OK |
| 3 | sea-brainstorming-and-spec-refinement | OK | OK |
| 4 | sea-code-review-response | OK | OK |
| 5 | sea-context-hygiene | OK | OK |
| 6 | sea-cross-repo-handoff | OK | OK |
| 7 | sea-finishing-development-branch | OK | OK |
| 8 | sea-frontend-design | OK | OK |
| 9 | sea-git-worktree-isolation | OK | OK |
| 10 | sea-gsd-controlled-execution | OK | OK |
| 11 | sea-knowledge-vault | OK | OK |
| 12 | sea-local-llm-training | OK | OK |
| 13 | sea-parallel-agent-dispatch | OK | OK |
| 14 | sea-senior-dev-workflow | OK | OK |
| 15 | sea-skill-creator-protocol | OK | OK |
| 16 | sea-sustainability-domain-review | OK | OK |
| 17 | sea-systematic-debugging | OK | OK |
| 18 | sea-task-orchestration | OK | OK |
| 19 | sea-test-driven-development | OK | OK |
| 20 | sea-verification-before-completion | OK | OK |

## 2. SYSTEM_ID Propagation

| Repo | File | Present |
|------|------|---------|
| manageesg-backend | CLAUDE.md | YES |
| manageesg-backend | AGENTS.md | YES |
| manageesg-frontend | CLAUDE.md | YES |
| everything-claude-code | CLAUDE.md | YES (source of truth) |

## 3. MCP Configs

| Repo | File | Servers |
|------|------|---------|
| backend | .mcp.json | gitnexus, gbrain, toolbox (dev-only) |
| frontend | .mcp.json | berry, falkordb, designlang |
| ECC | .mcp.json | berry, github, context7, exa, memory, playwright, sequential-thinking, gitnexus, gbrain, falkordb |

## 4. Secrets Scan

No hardcoded API keys, tokens, or passwords found in any CLAUDE.md,
AGENTS.md, AGENTS_SYSTEM.md, or .mcp.json across all three repos.
All secrets reference environment variables or `~/.env` patterns.

## 5. Cross-Agent Consistency

- All repos reference `SEABRIDGE_AGENT_SYSTEM_V1`
- All repos list the same 20 sea-* skills in their callable catalog
- ECC remains the canonical source; backend/frontend override only
  for repo-specific concerns
- Guidance retrieval order is consistent across repos

## Overall Verdict: PASS
