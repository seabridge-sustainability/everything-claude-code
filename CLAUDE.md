# CLAUDE.md

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

All shared rules, structure, tests and conventions live in `AGENTS.md`, imported here so Claude Code and Codex read the same text:

@AGENTS.md

## Claude Code specifics

- `/goal` is a Claude Code UI command, not a skill; never invoke `Skill(goal)`. The Goal Protocol Default above is what it asks for.
- Key slash commands: `/tdd`, `/plan`, `/e2e`, `/code-review`, `/build-fix`, `/learn`, `/skill-create`, and `/docs` (routes ECC docs to Context Hub and external API docs to Context7).
- Skills for editing ECC files: `README.md` → `/readme`; `.github/workflows/*.yml` → `/ci-workflow`; `agents/docs-lookup.md` and `skills/documentation-lookup/SKILL.md` → `documentation-lookup`; memory and session continuity → `agent-memory`; secondary browser inspection alongside Playwright → `vibe-check`; Google Cloud, Firebase or Gemini API work → the matching `google/skills` skill; design artifacts → `open-design`. When a subagent works on such files, pass the skill's conventions in its prompt.
- Subagents load this file, and `AGENTS.md` through the import, on their own. The built-in Explore and Plan agents do not, so they must stay read-only.
