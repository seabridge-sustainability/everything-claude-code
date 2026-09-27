# CLAUDE.md

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

All shared rules, structure, tests and conventions live in `AGENTS.md`, imported here so Claude Code and Codex read the same text:

@AGENTS.md

## Claude Code specifics

- `/goal` is a Claude Code UI command, not a skill; never invoke `Skill(goal)`. The Goal Protocol Default above is what it asks for.
- Key slash commands: `/tdd`, `/plan`, `/e2e`, `/code-review`, `/build-fix`, `/learn`, `/skill-create`, and `/docs` (routes ECC docs to Context Hub and external API docs to Context7).
- Use a skill only when its actual trigger fits. Documentation lookup uses `documentation-lookup`; memory and session continuity use `agent-memory`; secondary browser inspection alongside Playwright uses `vibe-check`; Google Cloud, Firebase or Gemini API work uses the matching `google/skills` skill; design artifacts use `open-design`. README and workflow edits follow their repository conventions and focused validators; no special skill is assumed. When a subagent works on specialized files, pass the applicable conventions in its prompt.
- Subagents load this file, and `AGENTS.md` through the import, on their own. The built-in Explore and Plan agents do not, so they must stay read-only.
