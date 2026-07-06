# Coding-Agent System QA Review And Fix Wave — 2026-07-06

Reviewer/implementer: Claude Code (Fable 5), per QA handoff prompt
`docs/reports/agent-system-review/2026-07-06-coding-agent-system-qa-handoff-prompt.md`,
extended by explicit user request to also FIX the findings (instructions and
scripts only, no product code) and to include autoresearch.

## 1. Executive Summary

The system was verified and then repaired in the same pass. The operating model
(/goal, Ponytail minimalism, TDD-where-practical, bounded autonomy, review
routing, deep-audit routing) was already coherent; the failures were drift:
one direct safety contradiction (authorization password) stamped into ~1,500
files, four disagreeing precedence lists, three per-agent adapters inverting
the canonical load order, a stale 31-of-39 skill catalog, a missing
verification script referenced from canon, mojibake in four first-party
instruction files, and two heavy always-loaded adapters. All of these were
fixed. All guardrail scripts pass after the changes. Verdict: **unified and
effective** (post-fix); before the fixes it was **partially effective**.

## 2. Current System Map

- Canonical authority: ECC `AGENTS_SYSTEM.md` — now contains the single
  "Instruction Precedence And Load Order" section, the Tier-1 branch-protection
  table, the concrete skill-selection rule, and the safety canon.
- Supporting canon: `SEABRIDGE_CODING_AGENT_SYSTEM.md` (execution sequence,
  triggers with tie-break), `AGENT_SKILLS.md` (shared skills contract),
  `docs/SKILL_ROUTING_REFERENCE.md` (routing table, now complete).
- Thin adapters: ECC `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `GEMINI.md`,
  `OPENCODE.md`, `.codex/AGENTS.md` — all now point to canon instead of
  restating or contradicting it; heavy tool/agent catalogs moved to
  `docs/tools/ECC_TOOLING_REFERENCE.md` and `docs/tools/ECC_AGENT_ROSTER.md`.
- Product repos (backend, frontend, openseabri, autoresearch): repo-local
  `AGENTS_SYSTEM.md` mirrors + adapters; authority pointers now name ECC, not
  `manageesg-backend`.
- Guardrails: `scripts/check-coding-agent-system.ps1`,
  `check-agent-runtime-guardrails.ps1`, `check-canonical-skills.ps1`,
  `check-goal-protocol.ps1`, `check-harness.ps1`, and the newly created
  `check-cross-agent-skills.ps1`.

## 3. Repositories Reviewed

| Repo | Branch | State |
|---|---|---|
| everything-claude-code | `main` (ahead 1) | dirty; preserved, extended with fixes |
| manageesg-backend | `seabridge_development` | 1 untracked report; preserved |
| manageesg-frontend | `development` | clean at start; instruction files edited |
| openseabri | `main` | clean at start; instruction files edited |
| autoresearch | `security-strix-denylist-2026-06-07` | dirty submodule `graphify`; preserved. NOTE: repo sits on a security side branch, not `master` — flagged for user decision, not changed. |

No worktree was reverted, stashed, or overwritten. No commits or pushes made.

## 4. Files Reviewed

ECC: `AGENTS_SYSTEM.md`, `SEABRIDGE_CODING_AGENT_SYSTEM.md`, `AGENTS.md`,
`CLAUDE.md`, `CODEX.md`, `GEMINI.md`, `OPENCODE.md`, `AGENT_SKILLS.md`,
`.codex/AGENTS.md`, `.codex/config.toml`, `protocols/GOAL_PROTOCOL.md`,
`docs/SKILL_ROUTING_REFERENCE.md`, `skills-lock.json`,
`scripts/check-canonical-skills.ps1`, repo-integrations (all four), prior
review `2026-07-06-unified-agent-system-review.md`.
Product repos: `AGENTS.md`, `CLAUDE.md`, `AGENTS_SYSTEM.md` in backend,
frontend, openseabri, autoresearch. No `.env`, key files, auth stores, or DB
state read.

## 5. Skills/Workflows/Loops Reviewed

All 19 canonical skills (goal-default + 18 sea-*) verified present in both
`skills/` (bodies) and `.agents/skills/` (pointer wrappers); wrapper-vs-body
split is intentional design, not drift. 39 `sea-*` bodies on disk. The four
newest skills (sea-error-recovery-loop, sea-skill-map,
sea-task-queue-execution, sea-teach-loop) are untracked in git in both trees —
expected pending commit. Loops verified composing cleanly: /goal frames,
Ponytail constrains, TDD verifies, reviewer skills challenge, deep-audit
routing escalates, verification-before-completion gates the finish.

## 6. What Is Operating Correctly

- All guardrail scripts passed before and after the fix wave.
- Goal-protocol embed blocks were byte-identical across adapters (sync script
  works).
- Repo-integrations docs are thin and accurate; all 25+ sampled paths resolve.
- Skill wrapper architecture (body + pointer wrapper) is consistent for all 19
  canonical skills.
- `manifests/agent-skills/matt-pocock-skills.json` fully resolves.
- Backend/frontend branch rules were mutually consistent (though redundant).

## 7. Efficiency Strengths (post-fix)

- ECC `AGENTS.md` thinned 671 → ~290 raw lines; `CLAUDE.md` 492 → ~230. The
  moved content is loadable on demand from `docs/tools/ECC_AGENT_ROSTER.md`
  and `docs/tools/ECC_TOOLING_REFERENCE.md`.
- One skill-selection rule with a concrete, small-model-safe threshold
  (≤2 files, no new dependency, no risk keyword → no skill; otherwise at most
  one skill; unsure → `sea-skill-map` only).
- Static catalogs removed from `SEABRIDGE_CODING_AGENT_SYSTEM.md` and
  `.codex/AGENTS.md` in favor of directory listing + `sea-skill-map` +
  `SKILL_ROUTING_REFERENCE.md`.
- Hardcoded file counts removed from canon (they were already wrong).
- Stale 2026-06-08 session anchors removed from git-discipline sections.

## 8. Safety Strengths (post-fix)

- The authorization-password contradiction is resolved everywhere: the rule is
  now uniformly "do not request, invent, store, or rely on a separate
  authorization password unless Alejandro explicitly establishes one." The
  undefined "team-approved secure channel" is replaced by a concrete
  definition: explicit approval = the user's direct instruction in the current
  session.
- Branch protection now has a canonical Tier-1 home: per-repo table in ECC
  `AGENTS_SYSTEM.md`, including the openseabri nuance (its `main` IS the
  working branch) and the autoresearch experiment-branch convention.
- `.codex/config.toml` `profiles.yolo` renamed to `profiles.full-auto-approved`
  with an explicit approval-gated comment.
- Autoresearch's "never stop the loop" and `git reset --hard` instructions are
  now explicitly scoped to the user-started `experiments/train.py` loop on
  `autoresearch/<tag>` branches only.

## 9. Conflicts, Drift, Or Duplicated Guidance (found → fixed)

1. **CRITICAL — password contradiction.** `CLAUDE.md`-lineage rule 7 ("use the
   team-shared authorization password") vs `AGENTS.md:133` ("do not request,
   invent…"). The stale form was stamped into **1,390 ECC files + 106 backend
   + 26 frontend + 12 autoresearch files**. Fixed by bulk exact-line
   replacement (script preserved BOM/encoding; vendor/external/upstream
   references excluded), plus a targeted pass for 7 skill-local `references/`
   files the bulk exclusion initially skipped. Post-fix sweep: zero stale
   occurrences remain outside the two review reports that quote the phrase as
   evidence.
2. **HIGH — four disagreeing precedence lists** (`AGENTS_SYSTEM.md` load order,
   `AGENTS.md` conflict priority, `AGENT_SKILLS.md` precedence,
   `SEABRIDGE_CODING_AGENT_SYSTEM.md` mandatory load order) and **frontend
   CLAUDE.md vs AGENTS.md** giving different hierarchies for the same repo.
   Fixed: one canonical section in ECC `AGENTS_SYSTEM.md`; every other list is
   now a pointer or a consistent restatement.
3. **HIGH — adapter load-order inversion.** `CODEX.md`/`GEMINI.md`/`OPENCODE.md`
   loaded `SEABRIDGE_CODING_AGENT_SYSTEM.md` first, contradicting canon; GEMINI
   never loaded `AGENTS_SYSTEM.md` at all. Fixed in all three.
4. **HIGH — circular authority.** ECC `AGENTS.md:176` and autoresearch +
   frontend files named `manageesg-backend/AGENTS_SYSTEM.md` as system-wide
   authority while backend points at ECC. Fixed: all authority pointers now
   name `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally).
5. **MEDIUM — Karpathy "cannot be overridden by session instructions"**
   contradicted every precedence list; softened to "only the user may
   explicitly relax them."
6. **MEDIUM — duplicated tool blurbs** (Vibium, Google skills, designlang,
   memory, token-retry) across `AGENTS.md`+`CLAUDE.md`; consolidated into
   `docs/tools/ECC_TOOLING_REFERENCE.md`.

## 10. Broken Or Stale References (found → fixed)

- `scripts/check-cross-agent-skills.ps1` referenced from backend
  `AGENTS.md:233` and backend `AGENTS_SYSTEM.md:347` but absent → **created**
  (validates body/wrapper parity for all sea-* skills + the 19 canonical
  skills; PASS). Canon's "periodic sync validation" pointer to nonexistent
  `docs/CROSS_AGENT_SYSTEM_SYNC_VALIDATION_*.md` repointed to the two scripts.
- ECC `AGENTS.md:75-101` called legacy `docs/GOAL_PROTOCOL_DEFAULT.md`
  "canonical" → repointed to `protocols/GOAL_PROTOCOL.md`; same fix applied in
  openseabri and autoresearch adapters (4 files).
- `SEABRIDGE_CODING_AGENT_SYSTEM.md` "Full Callable Skill Catalog" listed 31 of
  39 skills (missing sea-platform-diagnostics among others) → replaced by
  dynamic discovery + parity-script pointer.
- `skills-lock.json` vibe-check entry: dead path `skills/vibe-check/SKILL.md`
  and malformed 66-char hash → corrected to `.agents/skills/vibe-check/SKILL.md`
  with the real SHA256.
- `docs/SKILL_ROUTING_REFERENCE.md` missing 5 skills → rows added.
- Checklist count "11 files" (actual 12) and other hardcoded counts → removed.

## 11. Missing Or Weak Coverage (fixed where safe)

- Mojibake: ECC `AGENTS.md` (36 lines, triple-encoded), ECC `CLAUDE.md`
  (21 lines), autoresearch `AGENTS.md` (11 lines incl. U+FFFD title),
  autoresearch `CLAUDE.md` (13 lines incl. lost arrows rendered as `?`) →
  all repaired via iterative cp1252→UTF-8 reversal plus manual fixes for
  unrecoverable U+FFFD.
- Small-model hazards: undefined approval channel, vague "simple task" gate,
  overlapping skill triggers with no tie-break → all given concrete
  definitions (see §7/§8) plus a tie-break rule in the Mandatory Skill
  Triggers section.
- Remaining weak spot (not fixed, needs decision): heavy product-repo adapters
  (frontend `AGENTS.md` ~594 lines with product-doc content; openseabri
  `AGENTS.md` ~230 lines of end-user agent docs) — see §16.

## 12. Runtime/Plugin/GitHub Connector Findings

- `.codex/config.toml`: `profiles.yolo` → `profiles.full-auto-approved`,
  approval-gated by comment. No other profile weakens gates (strict/local/
  reason/llama all `on-request` or `read-only`).
- No plugin installs, marketplace commands, or connector changes made.
- OpenCode env-placeholder vs file-based key pattern noted by the prior review
  was not altered (needs signoff; not a QA-fixable item).

## 13. Backend/Frontend/OpenSeaBri/Autoresearch Integration Findings

- Backend: dead script refs now resolve; stale password boilerplate fixed in
  106 files; branch rule unchanged locally but now also canonical in ECC.
- Frontend: both conflicting priority lists aligned to canon; governance
  pointer repointed from backend to ECC; 26 files' password boilerplate fixed.
- OpenSeaBri: goal-protocol legacy pointer fixed in both adapters; branch
  semantics (its `main` = working branch) now explicit in the canonical table
  so agents no longer have to infer it from another repo's rule.
- Autoresearch (added scope per user): mojibake repaired in both adapters;
  "never stop the loop" and `git reset --hard` scoped to the experiment loop;
  authority pointer fixed (was backend, now ECC + local mirror); priority list
  aligned to canon; 12 files' password boilerplate fixed. Repo remains on
  `security-strix-denylist-2026-06-07` — user decision required to merge/switch.

## 14. Guardrail And Validation Command Results

- `check-coding-agent-system.ps1` — PASS (before and after).
- `check-agent-runtime-guardrails.ps1` — PASS (before and after).
- `check-canonical-skills.ps1` — PASS (before and after).
- `check-cross-agent-skills.ps1` (new) — PASS.
- `check-goal-protocol.ps1` — PASS ("validation passed for 23 files") after
  the adapter rewrites (goal-protocol embed blocks preserved verbatim).
- `check-harness.ps1 -Advisory` — PASS at start (advisory counts: 487
  button-accessibility, 14 raw-fetch-boundary, 9 retry-bounds, 7
  icon-button-missing-label, 6 route-auth-boundary; all product-repo backlog,
  baseline-tracked).
- `git diff --check` — exit 0 in all five repos after fixing one introduced
  trailing-whitespace/line-ending artifact in `skills/repo-scan/SKILL.md`.

## 15. Skipped Checks And Why

- `check-harness.ps1` not re-run after fixes: changes are instruction/docs and
  two PowerShell scripts; the harness scans product code surfaces that were
  not touched.
- No backend/frontend test suites run: no runtime code changed.
- No live/paid provider calls, installs, commits, pushes, or migrations.
- `.env` and ignored key files not read.

## 16. Findings Grouped By Approval Need

Auto-approve candidates (done in this pass — instructions/scripts only):
- Everything in §9–§11 above.

Needs explicit signoff (NOT done):
- Committing/pushing this fix wave (ECC is `main`; product repos have their
  branch rules). All changes are uncommitted working-tree edits.
- Thinning frontend `AGENTS.md` (594 lines) and openseabri `AGENTS.md`
  (product docs → README/TOOLS.md) — same pattern as the ECC adapter thinning.
- De-duplicating the safety/goal boilerplate architecture itself (the block is
  still stamped into ~1,400 files; now consistent, but a future edit would
  need the same bulk pass — consider replacing the stamp with a one-line
  pointer in a follow-up wave, or add a sync script like
  sync-goal-protocol-all.ps1 for the safety block).
- Autoresearch branch situation (`security-strix-denylist-2026-06-07`).
- OpenCode file-based API-key pattern → env placeholders.

More context needed:
- Whether `docs/GOAL_PROTOCOL_DEFAULT.md` can be deleted outright (all
  first-party pointers now bypass it).
- Whether the `.qa-snapshots` stale `AGENTS_SYSTEM.md` copy in frontend should
  be purged.

## 17. Recommended First Wargame Candidate

Read-only `/goal` wargame against `backend.retry-bounds` (9 advisory
findings): pick one retry path, prove bounded/observable or propose the
smallest fix. Unchanged from the prior review — still the best evidence-backed
target.

## 18. Recommended First Improve-System Candidate

Convert the stamped safety-rule block into a synced or pointered block
(mirroring the goal-protocol START/END marker pattern) so the next policy edit
is one file + one sync script instead of a 1,500-file bulk replace. Add the
sync check to `check-coding-agent-system.ps1`.

## 19. Remaining Risks

- The safety block is consistent today but still physically duplicated (§16).
- Product-repo heavy adapters still cost context in frontend/openseabri.
- Untracked new skills and this fix wave are uncommitted; a crash or careless
  cleanup could lose them — commit (with approval) soon.
- `git diff --check` LF/CRLF warnings are benign but the repo mixes line
  endings; a `.gitattributes` policy would stop the churn.

## 20. Final Verdict

**Unified and effective.** The instruction hierarchy now has exactly one
precedence statement, one skill-selection rule with concrete thresholds, one
branch-protection table, zero known stale script references, zero mojibake in
first-party instruction files, and passing guardrails — including a new
cross-agent parity check. A simpler model following only `AGENTS_SYSTEM.md`
plus its repo-local adapter now gets deterministic answers to "what do I load,
when do I use a skill, what needs approval, when do I stop."
