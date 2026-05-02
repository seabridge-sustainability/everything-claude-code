# GSD Provenance

**Source:** https://github.com/gsd-build/get-shit-done
**License:** MIT (see LICENSE in this directory)
**Version:** v1.39+ (cloned 2026-05-01)
**Author:** Lex Christopherson

## What Was Included

- **18 commands** — map-codebase, discuss-phase, plan-phase, execute-phase, verify-work, progress, quick, ui-phase, ui-review, review, code-review, secure-phase, health, forensics, docs-update, pause-work, resume-work, stats
- **13 agents** — gsd-codebase-mapper, gsd-planner, gsd-plan-checker, gsd-executor, gsd-verifier, gsd-phase-researcher, gsd-code-reviewer, gsd-doc-writer, gsd-doc-verifier, gsd-security-auditor, gsd-ui-researcher, gsd-ui-checker, gsd-ui-auditor
- **24 workflows** (+ 14 sub-workflow files in discuss-phase/modes, discuss-phase/templates, execute-phase/steps)
- **36 reference files** (including 2 few-shot examples)
- **25 template files** (including 7 codebase templates)
- **SDK:** `@gsd-build/sdk` v0.1.0 installed via npm as devDependency

## What Was Excluded

- 47 commands not relevant to core planning/execution lifecycle
- 21 agents not required by the 18 target commands
- All 11 hooks (JS/shell — not needed)
- SDK source code (npm package used instead)
- Installer scripts, marketing, translations, community docs
- Templates: AI-SPEC, DEBUG, README, VALIDATION, config.json, copilot-instructions, debug-subagent-prompt, dev-preferences, discussion-log, milestone-archive, milestone, research-project/*, retrospective, spec, user-profile, user-setup
- References: ai-evals, ai-frameworks, autonomous-smart-discuss, debugger-philosophy, decimal-phase-calculation, doc-conflict-engine, ios-scaffold, questioning, sketch-*, thinking-partner, user-profiling, workstream-flag, artifact-types
