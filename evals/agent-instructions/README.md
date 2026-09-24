# Agent Instruction Evals

Small, zero-cost evaluation for the SeaBridgeAI coding-agent instruction system.
Run it whenever an instruction file, the safety block, the goal block, or a
harness changes, and before/after adopting a new model.

## 1. Static checks (no model calls)

```powershell
node scripts\check-instruction-stack.js              # budgets, invariants, stale phrases, broken paths, duplication
node scripts\eval-instruction-scenarios.js           # scenario coverage, working tree
node scripts\eval-instruction-scenarios.js --ref HEAD  # same, as committed (use for before/after)
node tests\ci\instruction-stack.test.js              # the checker's own tests
```

`scenarios.json` holds ten representative SeaBridgeAI tasks (single-file bug,
cross-file feature, backend+frontend contract change, tenant bug, Mongo-sensitive
change, concurrent worktree, plan-only request, handoff continuation, external
provider blocker, ambiguous failing test). Each lists the guidance an agent's
startup instructions must deliver and the scaffolding that would push the wrong
behaviour. Patterns are concept-level on purpose, so the old and new wording can
both satisfy them; a pattern that only matches new phrasing makes the eval circular.

The eval scores the **effective** stack: Codex = `AGENTS.md`; Claude Code =
`CLAUDE.md` with `@` imports expanded plus `.claude/rules` without `paths:`.
Files that instructions merely *tell* the agent to read are not counted, because
session logs showed agents rarely read them (1 of 21 backend sessions).

## 2. Fresh-session probes (tiny, in-harness)

Editing an instruction file does not change a running session. To confirm what
a new session receives:

- Claude Code: start a new session (or a general-purpose subagent, which loads
  CLAUDE.md fresh) in the repo and ask, without tool use, for the backend work
  branch, who approves paid calls, and what the deletion rule is. Explore/Plan
  subagents do not load CLAUDE.md and are not valid probes.
- Codex: `codex exec` with the smallest effort in the repo root, same questions.

Record the answers in the modernization report; a wrong answer is an instruction
defect, not a model defect, until shown otherwise.

## 3. Behavioural replay (optional, needs approval for spend)

Replay 2–3 historical tasks from `docs/handoffs/` with the old and new stacks and
compare tool calls, turns, and outcome using the session-log miner
(`scripts/measure-instruction-stack.py` for static cost; Claude Code JSONL logs in
`~/.claude/projects/<repo>/` for behaviour). Not run by default: it costs model time.

## Future model upgrade checklist

1. Read the vendor's migration / prompting guide for the new model and harness version.
2. Re-verify loading semantics (Claude: memory + imports + rules; Codex: AGENTS.md walk, byte cap).
3. Run section 1 and record the numbers; run section 2 probes on the new model.
4. For each always-loaded line, ask: does the new model still need it? Delete what it does unprompted.
5. Check model/effort defaults in harness config only (`~/.claude/settings.json`, `~/.codex/config.toml`); never restate them in prose.
6. Add a model-specific delta to a repo `AGENTS.md`/`CLAUDE.md` only after a probe or replay shows a real behavioural difference.
