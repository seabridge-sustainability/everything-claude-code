# Verification Loop And Model Prompting Audit

Date: 2026-09-27

## Result

The system had useful verification components, but the default instruction
contract did not explicitly require agents to observe changed behavior through
the real runtime surface. Manual QA promotion to a reusable skill was absent,
and measurable criteria were scattered across optional browser, benchmark,
accessibility, and design-system skills. The generic verification skill also
required broad checks, a universal 80% coverage target, and 15-minute reruns,
which could waste time and conflict with current GPT-6, Opus 5.5, and Fable 5.1
guidance.

## Before/After Matrix

| Requirement | Before | Change |
|---|---|---|
| Browser, terminal, endpoint, or simulator verification beyond tests | Partial: the long Goal Protocol listed runtime/UI/API verification and optional browser QA existed, but the short default did not require observing the changed workflow | Added a compact default rule plus surface-specific runtime proof in the Goal Protocol and `verification-loop` skill |
| Codify repeatable manual QA into reusable skills | Missing from the default loop | Added a promotion rule with one job/trigger, safe setup, proof, failure handling, and artifact requirements |
| Performance, accessibility, and design-system criteria | Partial: present in separate skills, not joined to the default completion contract | Added explicit use of existing budgets/rules/baselines and an `INCONCLUSIVE` result when no valid baseline exists |
| Cost-efficient testing | Conflicted: risk-scaled language coexisted with universal 80% coverage, full phases, and periodic reruns | Added SeaBridge precedence, repository-owned thresholds, focused-first validation, and no timer-based or unchanged reruns |
| Modern model prompting | Partial and spread across historical reports | Added one on-demand policy for lean prompts, effort calibration, context hygiene, bounded parallelism, completion semantics, and model-specific deltas |
| Skill quality lifecycle | Partial | Added reverse-engineer, one job/trigger, freedom level, verification, walk-down, and evidence-driven improvement standards |

## Files Changed

- `AGENTS.md`: the short always-loaded runtime-verification rule, prompt-policy
  routing, and precedence over generic blanket testing guidance.
- `scripts/sync-goal-protocol.ps1`: canonical short block for product repos.
- `protocols/GOAL_PROTOCOL.md`: runtime surfaces, measurable criteria, reusable
  QA, proportional stopping, concise progress, and selective verifier use.
- `skills/verification-loop/SKILL.md`: rewritten as one focused, risk-scaled
  observable-behavior skill.
- `skills/verification-loop/references/runtime-verification.md`: web, API,
  simulator, CLI/integration, and agent/artifact checklists.
- `rules/common/agents.md`, `rules/common/development-workflow.md`, and
  `rules/common/testing.md`: removed blanket delegation, parallelism, research,
  TDD, suite, and coverage mandates in favor of risk-scaled triggers.
- `agents/tdd-guide.md` and `skills/tdd-workflow/SKILL.md`: narrowed TDD
  activation, use repository thresholds, and preserve RED/GREEN evidence
  without forcing stage-by-stage commits.
- `docs/tools/MODEL_PROMPTING_AND_SKILL_POLICY.md`: on-demand GPT-6/GPT-5.6,
  Opus 5.5, Fable 5.1, and skill-design guidance.
- `tests/ci/instruction-stack.test.js`: guards the compact default contract and
  rejects restoration of a universal 80% requirement; generated adapters and
  Context Hub entries are synchronized from the canonical sources.

## Scope Notes

- Product repository `AGENTS.md` files were synchronized in isolated worktrees
  and pushed with Actions-skipping documentation commits: backend
  `seabridge_development` at `ad9a16fff` and frontend `development` at
  `69668029`. The frontend copy also received the canonical bounded-approval
  and GitHub Actions cost-discipline safety block.
- No model, dependency, user-level configuration, live API, deployment, or paid
  evaluation change is part of this update.
- The policy intentionally does not add every vendor recommendation to startup
  context. It uses progressive disclosure so current high-capability models get
  a lean default and model-specific detail only for prompt/harness work.

## Source Mapping

- The runtime observation and manual-QA promotion rules follow
  [Building verification loops in Claude Code](https://www.youtube.com/watch?v=mQZB0l-rhxE).
- Skill construction follows the six-step framework in
  [How to Build Codex Skills Better than 99% of People](https://www.youtube.com/watch?v=9KOtMsZ9I28).
- Lean descriptions, progressive disclosure, reduced instruction scaffolding,
  and testing calibration follow
  [OpenAI's GPT-6 Astra guidance](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra)
  and the [GPT-5.6 guide](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6).
- Effort calibration, completion checking, progress cadence, tool waiting,
  untrusted-text boundaries, and visual inspection follow
  [Anthropic's Opus 5.5 guide](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5).
- Batched tools, scope discipline, targeted edits, completion persistence, and
  compaction checkpoints follow
  [Anthropic's Fable 5.1 guide](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1).
