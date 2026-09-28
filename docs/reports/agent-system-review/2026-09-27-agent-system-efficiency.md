# Coding-agent system efficiency review - 2026-09-27

## Outcome

This iteration reduced default context, made every advertised instruction adapter
testable, bounded GitHub Actions fan-out, and repaired the remaining skill-catalog
integrity issues without weakening the canonical safety contract.

## Instruction and context changes

- `AGENTS.md` remains the canonical policy. Claude, Codex, Gemini, Copilot,
  Cursor, OpenCode, Kiro, Qwen, and the other advertised runtimes use thin,
  validated adapters instead of carrying divergent copies.
- The Karpathy skill and Cursor rule are explicitly opt-in. Their useful
  simplicity and verification principles remain available, but they no longer
  load for every non-trivial task or override security and error handling.
- Prompt-defense language is part of the generated goal protocol and adapters.
- Default ECC MCPs remain limited to the explicitly retained browser and GitHub
  integrations. Optional connectors stay out of the startup context.
- The duplicated Anthropic `frontend-design` skill copies were retired; the
  provider-native skill remains the authoritative source.

## Verification and evaluation changes

- Added a three-scenario behavioral-eval matrix for Codex, Claude, and Gemini.
  Planning is offline and free. Live replay requires both an explicit approval
  environment variable and a positive USD budget. A code-level ceiling caps
  every batch at nine sequential runs and cannot be raised by config. Codex or
  Gemini execution additionally requires `--allow-soft-budget`, because neither
  harness exposes a hard CLI dollar cap.
- Claude probes are isolated with a hard per-run budget, plan mode, no permission
  prompts, no session persistence, strict MCP configuration, and only the
  `Read` tool.
- Replaced phrase-only scoring with structured JSON answers and field-level
  semantic assertions, while retaining negation-aware prohibited-text checks.
  Infrastructure failures are tracked separately and excluded from behavioral
  pass-rate denominators.
- Added partial result checkpoints after every live attempt, including an abort
  reason before stopping on a reported budget breach.
- Added negative controls for the live-call approval gate and adapter drift.
- Added Windows-safe shell path normalization for hook runners and fixed Plan
  Canvas process spawning.
- Fixed instruction-stack discovery from linked worktrees so validation targets
  the real workspace rather than similarly named stale directories.
- Fixed Claude scope migration, legacy/minimal installer ownership guards, large
  selective-install test buffers, and stale harness assertions.
- Updated the Pi adapter test from the retired fixed-coverage marker to the
  canonical risk-scaled testing marker.

## Skill-catalog hygiene

- Reduced `agent-eval`, `security-review`, and `btw` to small routing skills that
  progressively disclose detailed workflow only when relevant.
- Added automated routing-hygiene tests for opt-in behavior, duplicate canonical
  skills, and compact skill metadata.
- Added a conservative localized-skill encoding repair/check tool. It repaired
  181 previously garbled localized skill files, including malformed frontmatter.
- All 901 skill directories now validate with zero warnings. All 518 localized
  skill documents pass the encoding test.
- Catalog documentation and plugin metadata are synchronized at 75 agents,
  383 skills, and 96 commands.

## GitHub Actions cost policy

- One full Node test lane replaces the former broad full-suite matrix.
- Compatibility lanes run bounded smoke or platform-specific checks rather than
  repeating the complete suite.
- Workflows use path filters, concurrency cancellation, timeouts, least
  privilege, and pinned third-party actions.
- Pull requests now run the full suite and coverage in one job with one install,
  removing the duplicate full-suite execution and dependency setup.
- CI scope detection covers npm, Yarn, pnpm, and Bun lockfiles plus the direct
  installer and packed-lifecycle dependency surface.
- Agents must verify locally and batch related changes into one push. Never use
  `[skip actions]` for workflow, lockfile, dependency, test, installer,
  packaging, or runtime changes. Pushes are not speculative test runs.

## Final hardening fixes

- Resynchronized `package-lock.json` and the Yarn 4 lock with declared runtime
  and development dependencies, declared the required `zod` peer, and added a
  package-lock parity regression test.
- Made the safety-rule synchronizer resolve its canonical source from the active
  checkout and fail closed before writing when a configured root, `AGENTS.md`,
  or marker block is missing.
- Extended instruction validation so product repositories fail when their
  canonical safety or goal block drifts from ECC.
- Kept paid evaluation local and manually approved; no paid provider call was
  made during this hardening work.

## Verification evidence

- Instruction registry: 19/19 checks, including adapter and product-drift
  negative controls.
- Agent-system efficiency: 8/8.
- Behavioral-eval contract: 39/39; dry planning is free, the hard nine-run
  ceiling is config-independent, and uncapped harnesses require explicit
  soft-budget acknowledgement.
- Behavioral ROI report: 14/14; CI scope classifier: 40/40.
- Skill routing: 26/26.
- Package-lock parity: 3/3 dependency sections; safety-sync coverage: 9/9.
- Localized encoding: 518/518; strict validator: 901 skill directories, zero
  warnings.
- Installer apply: 45/45; Claude scope migration: 16/16; OpenCode migration:
  9/9; selective install: 46/46.
- Windows hook/bootstrap/path checks, Plan Canvas end to end, OpenCode build and
  package, Copilot support, and catalog/manifest validators all pass.

## Remaining evidence boundary

Static and local behavioral tests prove instruction delivery and enforcement,
not perfect compliance by every future vendor model. The nine-run live replay is
therefore the final empirical layer. It should run periodically, with an approved
budget, rather than on every commit. No paid model call was made in this change.

## Proof and ROI follow-up

The follow-up iteration added the remaining evidence and cost-control surfaces:

- a separate nine-run SeaBridgeAI scenario pack for backend tenant isolation,
  frontend browser QA, and backend/frontend API contracts;
- realistic read-only fixtures so the replay measures repository reasoning rather
  than only instruction recall;
- a local ROI report for pass rate, time per successful task, tool calls, retries,
  tokens, provider cost coverage, and cost per successful task;
- fail-honest cost reporting: failed-attempt spend is included, while any missing
  provider telemetry makes cost per success `unknown`, never zero;
- changed-path classification that keeps the full Ubuntu suite as the default but
  provisions package-manager, Windows/macOS, and packed-installer lanes only when
  the affected compatibility, platform, or package surfaces change;
- a fail-safe rule that enables every expensive lane when the commit range cannot
  be classified;
- conversion of the 832-line `python-testing` entrypoint into a compact router,
  with detailed pytest examples retained as an on-demand reference.

The live replay remains local, manual, and capped by an unraiseable nine-call
ceiling. It requires current-session approval plus a positive budget. Claude
enforces a hard per-run dollar cap; Codex and Gemini require the separate
`--allow-soft-budget` acknowledgement because their dollar budgets are not hard
CLI ceilings. It is not scheduled in GitHub Actions.

Final focused verification for this follow-up: behavior 39/39, ROI 14/14, CI
scope 40/40, instruction stack 19/19, skill routing 26/26, package-lock parity
3/3 sections, and safety-sync coverage 9/9. The strict validator accepted all
901 skill directories, 70 generated wrappers were current, and all 37 install
modules, 84 install components, and seven profiles validated. No paid provider
call was made.
