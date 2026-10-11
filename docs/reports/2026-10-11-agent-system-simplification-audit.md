# SeaBridgeAI instruction audit and simplification — 2026-10-11

## Outcome and release state

Local correction is **partial, verified, and unpublished**. This is not a claim that every live agent now complies or that the full rollout is complete. Application code, approved UI, scoring, datasets, databases, Docker services, credentials and other sessions' product changes were not changed. No installs, model/provider calls, GitHub Actions dispatches/reruns, commits, pushes or deployments were made for this audit.

Three authoritative shared policy sources remain:

1. `C:/Users/adelm/SeaBridgeAI/manageesg-backend/AGENTS_SYSTEM.md`: authorization, sessions, resources, goal controls, releases and knowledge boundaries.
2. `C:/Users/adelm/SeaBridgeAI/manageesg-backend/AGENTS.md`: development standards, applicable MVP constraints and repository-specific requirements.
3. `C:/Users/adelm/SeaBridgeAI/manageesg-backend/CLAUDE.md`: Claude import and client-specific notes.

ECC's operational path is `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime`. It supplies existing tools and reusable skills, not a competing policy. The dirty shared `everything-claude-code` checkout was not overwritten. Existing native entry files are compatibility loaders: three policy **sources** does not mean only three Markdown files on disk. Deleting all native entry points would prevent some clients from discovering instructions.

## Inventory and method

Enumerated source Markdown, SKILL.md files, root/client entry files, rules, hooks, configs and Git state across the following 18 SeaBridge Git roots. Explicitly inspected ignored/local core files and relevant home configurations. Counts are an inventory of searchable non-vendor files, **not** a count of instructions actually injected into a model. Vendored/archived translations and reference docs are not presumed active.

Search excludes .git, node_modules, venv/.venv, vendor, generated graph output, .next, data, artifacts, logs and Python caches, and observes Git ignore rules. This is not a forensic inventory of every ignored byte or every archived worktree. Sensitive configuration values were not printed.

| Git root | Markdown files | SKILL.md |
| --- | ---: | ---: |
| .falkordb-data | 2 | 0 |
| autoresearch | 308 | 39 |
| climada-stack | 53 | 0 |
| everything-claude-code | 5,696 | 1,417 |
| everything-claude-code-runtime | 3,704 | 1,269 |
| manageesg-backend | 2,647 | 59 |
| manageesg-backend-historical-incidents | 581 | 26 |
| manageesg-backend-nature-risk-qa-20260720 | 527 | 27 |
| manageesg-backend-openaccess | 581 | 26 |
| manageesg-frontend | 599 | 11 |
| manageesg-frontend-initiatives-hardening | 46 | 1 |
| mindsdb | 205 | 0 |
| openseabri | 135 | 31 |
| publish-oss-console | 413 | 6 |
| seabri-tidekeepers | 15 | 0 |
| seabridge-ai-oss | 181 | 0 |
| SeaBridgeAI nested repo | 19 | 0 |
| _upstream | 4,382 | 421 |

Home inventories: ~/.agents/skills has 27 definitions; ~/.claude has 381 definitions within the inspected non-cache scope; ~/.codex/skills has five system skills; ~/.config/opencode has no skills. Installed definitions are not proof of loading. Active skill metadata, plugin caches and client behavior require separate measurement before attributing token cost.

Clients: Claude Code 2.1.285, codex-cli 0.124.0, OpenCode 1.18.35. Inspected project/home loading settings, global Claude hook declarations, Codex configuration, OpenCode inline override keys, packaged hook/adapter manifests and the installed plugin dependency paths.

## Root-cause assessment

There is no evidence sufficient to blame /doctor-skills or Docker for the historical delivery failures. The audit establishes current failure mechanisms, not a complete causal reconstruction of past agent actions.

| Finding | Evidence and likely effect | Correction/adoption state |
| --- | --- | --- |
| Multiple competing rulebooks | Older AGENTS/SYSTEM/client files name different canonical sources and repeat old approval/goal policies. | Three-source policy and existing loader adapters; protected dirty AGENTS migrations still pending. |
| Strong stale overrides | Backend, autoresearch, CLIMADA and _upstream Cursor rules were alwaysApply and said they could not be overridden by session instructions. | Converted all four rules to opt-in references; owner corrections stay authoritative. |
| Mandatory optional tools | Backend Windsurf required every command through RTK and Caveman output. Frontend Berry rule required Berry as the only factual source and could demand repeated approvals. | Windsurf references central policy; tools optional. Berry narrowly path-scoped and optional, with real grant requirements retained. |
| Duplicated/stale skills | Backend SpecKit wrappers repeated goal policy and pointed to the dirty shared ECC checkout. | Nine backend .agents wrappers, nine backend .claude wrappers and nine runtime .agents wrappers now point to clean runtime. Duplicated backend goal blocks removed. |
| Local skill-body copies | Five compression/commit/review skills copied bodies already present in ECC's caveman reference package. | Five local wrappers retain definitions/discovery but load the existing ECC source only on explicit request. Cavecrew and caveman-stats remain local because matching canonical sources were not found; no new folders created. |
| OpenCode does not recursively load prose references | Project configs supplied AGENTS only, which imports SYSTEM in prose; OpenCode documents explicit configured instruction paths. Global ./AGENTS.md was ambiguous. | Backend and frontend existing project configs explicitly list both central files; global config points to its existing conditional home loader. Providers, model IDs and secrets unchanged. |
| Adoption checker rejected central imports | agent-adoption-doctor rejected ../manageesg-backend/CLAUDE.md as an escape. | Dedicated bounded resolver allows exactly the three central files, resolves recursively, rejects arbitrary parent imports and unsafe links. Negative controls pass. |
| Plugin config overstated readiness | OpenCode dist/tools/changed-files.js imports @opencode-ai/plugin/tool, but no resolvable peer package exists along that runtime module path. The home SDK is elsewhere and not automatically an ESM dependency. | Doctor reports plugin-dependency-missing and gateConfigured=false. Plugin repair not performed; no silent disabling, dependency install or permission bypass. |
| Packaged hooks are not active enforcement | Global Claude settings have PreToolUse git guard but no goal UserPromptSubmit/Stop events. Project settings inspected were empty. Codex/Gemini require wrappers in inspected configuration. | Report distinguishes packaged/static checks from installed/observed interception. Native activation remains pending a safe, session-specific smoke check. |
| Global git guard over-classifies main | ~/.claude/hooks/git-guard.js treats every repo main as live, rather than backend/frontend main only. | Left unchanged: changing the permission guard requires a separately explicit bounded authorization; never bypass it to publish. |
| Shared snapshot capture blocks on unrelated nested directory | Backend resume capture failed on untracked .wt-nature-mvp-20261011 because hashing expects a file. | Preserved directory and reported limitation. Did not clean it, suppress evidence or change other sessions' dirty goal-control code. ECC-only resume succeeded; no claim of full backend snapshot coverage. |

### Doctor-skills investigation

No installed doctor-skills command/skill was found in inspected active ECC/home command/skill locations. The only matching implementation found was OpenClaw's upstream reference code; its presence is not evidence Claude executed it.

A streaming search of 12 recently modified top-level SeaBridge Claude JSONL files (mtime at/after October 4) found no doctor-skills invocation. This is a limited sample: it does not exclude an invocation in another session, retained subagent log, plugin cache or deleted history. Global skillOverrides exist, but their origin and effective support were not established. They were preserved.

### Docker, resource and spending investigation

Docker Desktop's Linux engine pipe was unavailable at inspection; no service was started. Recent inspected backend Docker history includes a seven-line Dockerfile SDK/delivery-gating change at 1a3542ac5, not evidence of instruction-loading changes. A stopped daemon can block container-dependent work but does not establish why agents ignored priorities.

One current hardware snapshot showed approximately 31.7 GiB RAM total and 7.7 GiB free; C: approximately 168.9 GiB free and E: approximately 204.7 GiB free. These are current headroom observations, not historical peaks. Historical RAM/disk exhaustion, exact avoidable Actions cost and individual-agent responsibility remain unproven.

The USD 400-or-lower hard stop, 90%/unknown tripwire, root-only completed release batches, targeted local checks and separate model/API ledger remain in central policy. No account budget was raised or billing setting changed. No numerical savings claim is justified by this audit.

## Completed simplification checklist

- [x] Inventory active roots and distinguish reference docs from instructions.
- [x] Verify current loading/configuration failure mechanisms.
- [x] Preserve security, scientific integrity, licensing, tenant boundaries, approvals, hooks and concurrent work.
- [x] Centralize shared policy in the three backend core files; preserve repository constraints.
- [x] Keep ECC's prior duplicate policy documents as thin compatibility references where callers still need them.
- [x] Remove the separate MVP_EXECUTION_FOCUS policy file after consolidation (prior local phase).
- [x] Reduce 17 clean satellite SYSTEM/client entry files to central loaders.
- [x] Remove four mandatory Cursor playbooks and mandatory backend RTK/Caveman usage.
- [x] Scope frontend/autoresearch Berry guidance and remove sole-source/external-tool prerequisites.
- [x] Repair 27 SpecKit wrappers and centralize five existing skill bodies through loaders.
- [x] Configure explicit OpenCode policy paths without changing models/providers.
- [x] Fix adoption checking and Windows forward-slash reference validation.
- [x] Run focused offline failure-catching checks; no app-wide suites or live model evals.
- [x] Verify the four frontend-owner reviews against current source and preserve their missing requirements centrally, without editing the reserved frontend AGENTS.md or product files.

### Frontend preservation follow-up

The Climate, Nature, Predictive Analytics and Claude reviewers correctly refused a replacement that would discard frontend requirements. Those requirements are now in central backend AGENTS.md: Tailwind restrictions, immutable Redux, component-size guidance, no committed console.log, semantic-token preference and missing-token reporting, .env.example, router-context traps, remote-file freshness, actual npm scripts/direct Node entrypoints, stack/path details, UX and tooling pointers. Central AGENTS_SYSTEM.md also retains early real-result checkpoints and the legacy ECC-to-runtime path mapping.

Legacy design values are explicitly historical references, not instructions to restyle approved UI. Current frontend source uses Plex Sans for body text and Recoleta for display, and package.json declares Next 16.2.6 rather than the old Next 14 description. Version discovery remains source-based. The tooling reference's old mandatory TDD/coverage language cannot override central policy. The owner must still review and apply the thin frontend loader; these edits do not transfer ownership or establish live-model compliance.

## Verification

Final focused results:

- Instruction-stack test suite: **27 passed**, including negative controls for missing policy, broken imports, stale mandates and forward-slash Windows references.
- Adoption doctor fixture checks: passed. Missing central source/untrusted parent import/missing plugin dependency are rejected or reported accurately.
- Instruction scenario suite: four scenario groups passed, including all **18 ECC adapters** and a missing-guidance negative control across all 18.
- Source-bound map test suite: **12 passed**. An edited/dirty source cannot certify a current map.
- Backend effective stacks: **9/9 passed**, maximum 16,282 bytes after frontend-preservation migration.
- ECC effective stacks: **19/19 passed** (18 adapters plus installer checks), maximum 16,367 bytes.
- Frontend effective stacks: **0/7 passed**, maximum 16,361 bytes, because its protected AGENTS still carries the old goal block. Its size passes the existing 16 KiB budget; the sole failure category is policy drift, not a product-test failure.
- Installation doctor: **incomplete, activation not observed, provider calls 0**. Codex/Gemini need wrappers, Claude goal hooks unconfigured, OpenCode plugin dependency missing.

These checks prove modeled instruction delivery and failure detection, not that all vendor clients automatically expand our verification markers or that every model follows policy. Native imports/configuration and an observed controlled-session check remain distinct acceptance steps.

## Remaining work and ownership

1. **Frontend AGENTS.md**: owned by zproperty-wholebuilding-release-fe-1645. The four reviewers' missing requirements are now preserved centrally and reconciled with current source. Owner should verify that preservation once, then apply the supplied loader locally. Do not close its running release just to hand off one file. Recheck frontend stacks afterward.
2. **Four satellite AGENTS.md files**: autoresearch, openseabri, climada-stack and _upstream already contain others' local edits. Preserve them. Their owners must migrate any missing constraints and replace only the duplicated policy with the central loader. Other existing client loaders are already compact.
3. **Remaining local skill sources**: Cavecrew/caveman-stats need a verified existing ECC source or an explicitly approved promotion into existing infrastructure, not invented paths. Four Karpathy rules and both inspected Berry rules have been corrected.
4. **Claude native enforcement**: use existing advisory prepare + final hooks only after an offline session-scoping check and owner-authorized project settings edit. Do not deploy a first-prompt blocking admission hook or let another session's .ecc/goal state gate this session.
5. **OpenCode plugin**: repair the resolvable peer dependency in its actual module context under explicit install/setup authorization; verify import offline before any client/model call. Retain wrappers meanwhile. Presence in the model picker is not enforcement proof.
6. **Global git guard**: obtain narrow authorization to scope main protection to actual backend/frontend repositories while retaining force-push/no-verify/shared-work protections and existing permission settings.
7. **Resume capture**: reproduce the nested-untracked-repository case in a small isolated fixture and fix snapshot handling without omitting other work or traversing user data indiscriminately. Goal-control files already edited by another session must be handed off first if touched. A final ECC-only handoff refresh also failed with `evidence reference is not a file` for runtime/integrations/rea/vendor/rea/. The earlier receipt remains; this updated report supplies the current handoff. Neither directory was removed or silently excluded.
8. **Publication and graph**: changes are uncommitted/unpushed. Use one owner and one budget-approved batch per repo, never stage other work. Refresh the source-bound agent-system map only from clean authorized sources. The freshness-gated knowledge query returned unavailable/missing; no Graphify/FalkorDB rebuild or current-graph claim was made.
9. **Clean-install and runtime proof**: materialize the three central files in standalone ECC validation/install contexts; missing sibling sources must fail, not borrow unrelated live files. Run one bounded observed smoke check per actually used client after restart, not repeated paid scenarios or new CI matrices.

Aggregate RAM/disk headroom is currently a required preflight rule, not an
OS-enforced quota or a proven cross-client scheduler. The host thread ceiling
and permission system remain authoritative. Instructions and cooperating CLI
wrappers cannot intercept every external chat or process. That enforcement gap
must not be described as solved by this Markdown consolidation.

Do not mark the overall unified rollout complete while these adoption/ownership items remain. No forecast for third-party ownership or live client adoption is asserted.

### Prompt for the frontend file owner

The system-manager has incorporated the four reviewers' missing frontend requirements
into central backend AGENTS.md and AGENTS_SYSTEM.md, preserving current UI/source facts.
Handle only the frontend AGENTS.md file your session owns. Verify that preservation
once; report any remaining omission without discarding it.
If none are missing, replace only frontend AGENTS.md with the following loader
and report the local diff to Alejandro. Do not push separately, alter application
code, terminate workers or close a running release lease for this edit.

```markdown
# SeaBridgeAI instruction loader

<!-- SEABRIDGE_CORE_ENTRY: ../manageesg-backend/AGENTS.md -->
Read `../manageesg-backend/AGENTS.md` and its `AGENTS_SYSTEM.md` import.
Those central files define shared policy; this file is a compatibility loader.
```

## Exact files edited in this audit continuation

Earlier local consolidation edits remain separate in the working tree; do not treat all dirty paths as task-owned. This continuation changed the following existing source/config files (plus this report and ignored task state):

- `C:/Users/adelm/SeaBridgeAI/autoresearch/.cursor/rules/karpathy-guidelines.mdc`
- `C:/Users/adelm/SeaBridgeAI/_upstream/.cursor/rules/karpathy-guidelines.mdc`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/speckit-analyze/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/speckit-checklist/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/speckit-clarify/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/speckit-constitution/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/speckit-implement/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/speckit-plan/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/speckit-specify/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/speckit-tasks/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/speckit-taskstoissues/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/.agents/skills/speckit-analyze/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/.agents/skills/speckit-checklist/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/.agents/skills/speckit-clarify/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/.agents/skills/speckit-constitution/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/.agents/skills/speckit-implement/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/.agents/skills/speckit-plan/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/.agents/skills/speckit-specify/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/.agents/skills/speckit-tasks/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/.agents/skills/speckit-taskstoissues/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.cursor/rules/karpathy-guidelines.mdc`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.windsurfrules`
- `C:/Users/adelm/SeaBridgeAI/manageesg-frontend/.claude/rules/berry.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-frontend/AGENTS_SYSTEM.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.claude/skills/speckit-analyze/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.claude/skills/speckit-checklist/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.claude/skills/speckit-clarify/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.claude/skills/speckit-constitution/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.claude/skills/speckit-implement/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.claude/skills/speckit-plan/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.claude/skills/speckit-specify/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.claude/skills/speckit-tasks/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.claude/skills/speckit-taskstoissues/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/autoresearch/AGENTS_SYSTEM.md`
- `C:/Users/adelm/SeaBridgeAI/autoresearch/CLAUDE.md`
- `C:/Users/adelm/SeaBridgeAI/autoresearch/GEMINI.md`
- `C:/Users/adelm/SeaBridgeAI/autoresearch/CODEX.md`
- `C:/Users/adelm/SeaBridgeAI/autoresearch/OPENCODE.md`
- `C:/Users/adelm/SeaBridgeAI/openseabri/AGENTS_SYSTEM.md`
- `C:/Users/adelm/SeaBridgeAI/openseabri/CLAUDE.md`
- `C:/Users/adelm/SeaBridgeAI/openseabri/GEMINI.md`
- `C:/Users/adelm/SeaBridgeAI/climada-stack/CLAUDE.md`
- `C:/Users/adelm/SeaBridgeAI/climada-stack/GEMINI.md`
- `C:/Users/adelm/SeaBridgeAI/climada-stack/CODEX.md`
- `C:/Users/adelm/SeaBridgeAI/climada-stack/OPENCODE.md`
- `C:/Users/adelm/SeaBridgeAI/_upstream/AGENTS_SYSTEM.md`
- `C:/Users/adelm/SeaBridgeAI/_upstream/CLAUDE.md`
- `C:/Users/adelm/SeaBridgeAI/_upstream/GEMINI.md`
- `C:/Users/adelm/SeaBridgeAI/_upstream/CODEX.md`
- `C:/Users/adelm/SeaBridgeAI/_upstream/OPENCODE.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/caveman-compress/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/caveman-commit/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/caveman-review/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/caveman-help/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.agents/skills/caveman/SKILL.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/AGENTS.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/AGENTS_SYSTEM.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/CLAUDE.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/opencode.jsonc`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/.opencode/opencode.json`
- `C:/Users/adelm/SeaBridgeAI/manageesg-frontend/.opencode/opencode.json`
- `C:/Users/adelm/.config/opencode/opencode.jsonc`
- `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/scripts/agent-adoption-doctor.js`
- `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/tests/ci/agent-adoption-doctor.test.js`
- `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/scripts/check-instruction-stack.js`
- `C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/tests/ci/instruction-stack.test.js`

Earlier consolidation also changed the three backend core files, ECC root/client/protocol loaders, adapter registry, existing sync/validation/evaluation/map tooling, frontend CLAUDE/root OpenCode loaders and conditional home instruction entries. Existing control state is under runtime/.ecc/goal, not a new instruction system.

## Client-loading references

### Authorized release continuation

The preceding sections record the earlier local audit, not the later release.
Backend task-owned policy, loaders and skill wrappers were committed as
`b5098421aa393e62b8ba5faeb056cd75a77fb034` in an isolated checkout on the normal
development branch. Normal hooks passed. A legacy hook checked literal Claude
safety phrases rather than imports; a compact import-contract comment preserves
that check without changing the guard or creating another policy.

The frontend owning session verified preservation and replaced only its reserved
AGENTS.md with the central loader. Its handed-off diff has SHA-256
`C126D464BC2BECF2A945630E19ED1448B2B697EBB5C241BF4C9C1C02C9056679` in
`.worktrees/zproperty-acceptance-luna-20261011`. Product changes, registration and
release lease remain untouched. Local handoff is not remote publication.

ECC release checks use a clean sibling checkout, not unrelated pending runtime
goal-control edits. Passed: 27 instruction-stack tests, the 18-adapter scenario
and negative-control groups, adoption-doctor fixtures, 14 source-map tests and
workflow-cost contracts. No broad application suite or live vendor/model eval.
Karpathy's four core principles remain shared; the full playbook is opt-in.

The existing source-bound map now carries a generated verification snapshot of
the three central files. Standalone ECC CI materializes missing files create-only,
checking clean commit provenance and digests and refusing to replace an existing
policy. No private-backend token, fourth authoritative rulebook or new job is
needed. This is not live-backend freshness or installation proof. Rebuild only
after clean source commits. The large Graphify/FalkorDB graph is separate and
remains freshness-gated.

The existing OpenCode plugin dependency was repaired locally with its declared
`@opencode-ai/plugin@1.4.9` package, no-save, no lockfile change, install scripts
disabled. Actual plugin import succeeds. Providers, models, keys and permissions
were unchanged. No client restart or live-model obedience is claimed.

Read-only billing showed Actions usage USD 305.868 against the USD 400 hard stop
at release preparation. This does not quantify historical avoidable spending or
savings. Publish each ready batch once; no manual CI dispatches/reruns. Shared
checkouts and running clients still require coordinated adoption; remaining
satellite edits are local, not published.

Additional continuation edits: `C:/Users/adelm/SeaBridgeAI/climada-stack/.cursor/rules/karpathy-guidelines.mdc` and `C:/Users/adelm/SeaBridgeAI/autoresearch/.claude/rules/berry.md`.

Loading conclusions were checked against [Codex AGENTS.md discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md), [Claude memory/imports](https://code.claude.com/docs/en/memory), [Claude skills](https://code.claude.com/docs/en/skills), and [OpenCode rules](https://docs.opencode.ai/docs/rules/). Documentation describes supported loading, not observed obedience in this machine's clients.
