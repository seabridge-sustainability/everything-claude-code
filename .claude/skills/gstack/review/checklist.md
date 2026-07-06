# Pre-Landing Review Checklist

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


## Instructions

Review the `git diff origin/main` output for the issues listed below. Be specific Ã¢â‚¬â€ cite `file:line` and suggest fixes. Skip anything that's fine. Only flag real problems.

**Two-pass review:**
- **Pass 1 (CRITICAL):** Run SQL & Data Safety, Race Conditions, LLM Output Trust Boundary, Shell Injection, and Enum Completeness first. Highest severity.
- **Pass 2 (INFORMATIONAL):** Run remaining categories below. Lower severity but still actioned.
- **Specialist categories (handled by parallel subagents, NOT this checklist):** Test Gaps, Dead Code, Magic Numbers, Conditional Side Effects, Performance & Bundle Impact, Crypto & Entropy. See `review/specialists/` for these.

All findings get action via Fix-First Review: obvious mechanical fixes are applied automatically,
genuinely ambiguous issues are batched into a single user question.

**Output format:**

```
Pre-Landing Review: N issues (X critical, Y informational)

**AUTO-FIXED:**
- [file:line] Problem Ã¢â€ â€™ fix applied

**NEEDS INPUT:**
- [file:line] Problem description
  Recommended fix: suggested fix
```

If no issues found: `Pre-Landing Review: No issues found.`

Be terse. For each issue: one line describing the problem, one line with the fix. No preamble, no summaries, no "looks good overall."

---

## Review Categories

### Pass 1 Ã¢â‚¬â€ CRITICAL

#### SQL & Data Safety
- String interpolation in SQL (even if values are `.to_i`/`.to_f` Ã¢â‚¬â€ use parameterized queries (Rails: sanitize_sql_array/Arel; Node: prepared statements; Python: parameterized queries))
- TOCTOU races: check-then-set patterns that should be atomic `WHERE` + `update_all`
- Bypassing model validations for direct DB writes (Rails: update_column; Django: QuerySet.update(); Prisma: raw queries)
- N+1 queries: Missing eager loading (Rails: .includes(); SQLAlchemy: joinedload(); Prisma: include) for associations used in loops/views

#### Race Conditions & Concurrency
- Read-check-write without uniqueness constraint or catch duplicate key error and retry (e.g., `where(hash:).first` then `save!` without handling concurrent insert)
- find-or-create without unique DB index Ã¢â‚¬â€ concurrent calls can create duplicates
- Status transitions that don't use atomic `WHERE old_status = ? UPDATE SET new_status` Ã¢â‚¬â€ concurrent updates can skip or double-apply transitions
- Unsafe HTML rendering (Rails: .html_safe/raw(); React: dangerouslySetInnerHTML; Vue: v-html; Django: |safe/mark_safe) on user-controlled data (XSS)

#### LLM Output Trust Boundary
- LLM-generated values (emails, URLs, names) written to DB or passed to mailers without format validation. Add lightweight guards (`EMAIL_REGEXP`, `URI.parse`, `.strip`) before persisting.
- Structured tool output (arrays, hashes) accepted without type/shape checks before database writes.
- LLM-generated URLs fetched without allowlist Ã¢â‚¬â€ SSRF risk if URL points to internal network (Python: `urllib.parse.urlparse` Ã¢â€ â€™ check hostname against blocklist before `requests.get`/`httpx.get`)
- LLM output stored in knowledge bases or vector DBs without sanitization Ã¢â‚¬â€ stored prompt injection risk

#### Shell Injection (Python-specific)
- `subprocess.run()` / `subprocess.call()` / `subprocess.Popen()` with `shell=True` AND f-string/`.format()` interpolation in the command string Ã¢â‚¬â€ use argument arrays instead
- `os.system()` with variable interpolation Ã¢â‚¬â€ replace with `subprocess.run()` using argument arrays
- `eval()` / `exec()` on LLM-generated code without sandboxing

#### Enum & Value Completeness
When the diff introduces a new enum value, status string, tier name, or type constant:
- **Trace it through every consumer.** Read (don't just grep Ã¢â‚¬â€ READ) each file that switches on, filters by, or displays that value. If any consumer doesn't handle the new value, flag it. Common miss: adding a value to the frontend dropdown but the backend model/compute method doesn't persist it.
- **Check allowlists/filter arrays.** Search for arrays or `%w[]` lists containing sibling values (e.g., if adding "revise" to tiers, find every `%w[quick lfg mega]` and verify "revise" is included where needed).
- **Check `case`/`if-elsif` chains.** If existing code branches on the enum, does the new value fall through to a wrong default?
To do this: use Grep to find all references to the sibling values (e.g., grep for "lfg" or "mega" to find all tier consumers). Read each match. This step requires reading code OUTSIDE the diff.

### Pass 2 Ã¢â‚¬â€ INFORMATIONAL

#### Async/Sync Mixing (Python-specific)
- Synchronous `subprocess.run()`, `open()`, `requests.get()` inside `async def` endpoints Ã¢â‚¬â€ blocks the event loop. Use `asyncio.to_thread()`, `aiofiles`, or `httpx.AsyncClient` instead.
- `time.sleep()` inside async functions Ã¢â‚¬â€ use `asyncio.sleep()`
- Sync DB calls in async context without `run_in_executor()` wrapping

#### Column/Field Name Safety
- Verify column names in ORM queries (`.select()`, `.eq()`, `.gte()`, `.order()`) against actual DB schema Ã¢â‚¬â€ wrong column names silently return empty results or throw swallowed errors
- Check `.get()` calls on query results use the column name that was actually selected
- Cross-reference with schema documentation when available

#### Dead Code & Consistency (version/changelog only Ã¢â‚¬â€ other items handled by maintainability specialist)
- Version mismatch between PR title and VERSION/CHANGELOG files
- CHANGELOG entries that describe changes inaccurately (e.g., "changed from X to Y" when X never existed)

#### LLM Prompt Issues
- 0-indexed lists in prompts (LLMs reliably return 1-indexed)
- Prompt text listing available tools/capabilities that don't match what's actually wired up in the `tool_classes`/`tools` array
- Word/token limits stated in multiple places that could drift

#### Completeness Gaps
- Shortcut implementations where the complete version would cost <30 minutes CC time (e.g., partial enum handling, incomplete error paths, missing edge cases that are straightforward to add)
- Options presented with only human-team effort estimates Ã¢â‚¬â€ should show both human and CC+gstack time
- Test coverage gaps where adding the missing tests is a "lake" not an "ocean" (e.g., missing negative-path tests, missing edge case tests that mirror happy-path structure)
- Features implemented at 80-90% when 100% is achievable with modest additional code

#### Time Window Safety
- Date-key lookups that assume "today" covers 24h Ã¢â‚¬â€ report at 8am PT only sees midnightÃ¢â€ â€™8am under today's key
- Mismatched time windows between related features Ã¢â‚¬â€ one uses hourly buckets, another uses daily keys for the same data

#### Type Coercion at Boundaries
- Values crossing RubyÃ¢â€ â€™JSONÃ¢â€ â€™JS boundaries where type could change (numeric vs string) Ã¢â‚¬â€ hash/digest inputs must normalize types
- Hash/digest inputs that don't call `.to_s` or equivalent before serialization Ã¢â‚¬â€ `{ cores: 8 }` vs `{ cores: "8" }` produce different hashes

#### View/Frontend
- Inline `<style>` blocks in partials (re-parsed every render)
- O(n*m) lookups in views (`Array#find` in a loop instead of `index_by` hash)
- Ruby-side `.select{}` filtering on DB results that could be a `WHERE` clause (unless intentionally avoiding leading-wildcard `LIKE`)

#### Distribution & CI/CD Pipeline
- CI/CD workflow changes (`.github/workflows/`): verify build tool versions match project requirements, artifact names/paths are correct, secrets use `${{ secrets.X }}` not hardcoded values
- New artifact types (CLI binary, library, package): verify a publish/release workflow exists and targets correct platforms
- Cross-platform builds: verify CI matrix covers all target OS/arch combinations, or documents which are untested
- Version tag format consistency: `v1.2.3` vs `1.2.3` Ã¢â‚¬â€ must match across VERSION file, git tags, and publish scripts
- Publish step idempotency: re-running the publish workflow should not fail (e.g., `gh release delete` before `gh release create`)

**DO NOT flag:**
- Web services with existing auto-deploy pipelines (Docker build + K8s deploy)
- Internal tools not distributed outside the team
- Test-only CI changes (adding test steps, not publish steps)

---

## Severity Classification

```
CRITICAL (highest severity):      INFORMATIONAL (main agent):      SPECIALIST (parallel subagents):
Ã¢â€Å“Ã¢â€â‚¬ SQL & Data Safety              Ã¢â€Å“Ã¢â€â‚¬ Async/Sync Mixing             Ã¢â€Å“Ã¢â€â‚¬ Testing specialist
Ã¢â€Å“Ã¢â€â‚¬ Race Conditions & Concurrency  Ã¢â€Å“Ã¢â€â‚¬ Column/Field Name Safety      Ã¢â€Å“Ã¢â€â‚¬ Maintainability specialist
Ã¢â€Å“Ã¢â€â‚¬ LLM Output Trust Boundary      Ã¢â€Å“Ã¢â€â‚¬ Dead Code (version only)      Ã¢â€Å“Ã¢â€â‚¬ Security specialist
Ã¢â€Å“Ã¢â€â‚¬ Shell Injection                Ã¢â€Å“Ã¢â€â‚¬ LLM Prompt Issues             Ã¢â€Å“Ã¢â€â‚¬ Performance specialist
Ã¢â€â€Ã¢â€â‚¬ Enum & Value Completeness      Ã¢â€Å“Ã¢â€â‚¬ Completeness Gaps             Ã¢â€Å“Ã¢â€â‚¬ Data Migration specialist
                                   Ã¢â€Å“Ã¢â€â‚¬ Time Window Safety            Ã¢â€Å“Ã¢â€â‚¬ API Contract specialist
                                   Ã¢â€Å“Ã¢â€â‚¬ Type Coercion at Boundaries   Ã¢â€â€Ã¢â€â‚¬ Red Team (conditional)
                                   Ã¢â€Å“Ã¢â€â‚¬ View/Frontend
                                   Ã¢â€â€Ã¢â€â‚¬ Distribution & CI/CD Pipeline

All findings are actioned via Fix-First Review. Severity determines
presentation order and classification of AUTO-FIX vs ASK Ã¢â‚¬â€ critical
findings lean toward ASK (they're riskier), informational findings
lean toward AUTO-FIX (they're more mechanical).
```

---

## Fix-First Heuristic

This heuristic is referenced by both `/review` and `/ship`. It determines whether
the agent auto-fixes a finding or asks the user.

```
AUTO-FIX (agent fixes without asking):     ASK (needs human judgment):
Ã¢â€Å“Ã¢â€â‚¬ Dead code / unused variables            Ã¢â€Å“Ã¢â€â‚¬ Security (auth, XSS, injection)
Ã¢â€Å“Ã¢â€â‚¬ N+1 queries (missing eager loading)      Ã¢â€Å“Ã¢â€â‚¬ Race conditions
Ã¢â€Å“Ã¢â€â‚¬ Stale comments contradicting code       Ã¢â€Å“Ã¢â€â‚¬ Design decisions
Ã¢â€Å“Ã¢â€â‚¬ Magic numbers Ã¢â€ â€™ named constants         Ã¢â€Å“Ã¢â€â‚¬ Large fixes (>20 lines)
Ã¢â€Å“Ã¢â€â‚¬ Missing LLM output validation           Ã¢â€Å“Ã¢â€â‚¬ Enum completeness
Ã¢â€Å“Ã¢â€â‚¬ Version/path mismatches                 Ã¢â€Å“Ã¢â€â‚¬ Removing functionality
Ã¢â€Å“Ã¢â€â‚¬ Variables assigned but never read       Ã¢â€â€Ã¢â€â‚¬ Anything changing user-visible
Ã¢â€â€Ã¢â€â‚¬ Inline styles, O(n*m) view lookups        behavior
```

**Rule of thumb:** If the fix is mechanical and a senior engineer would apply it
without discussion, it's AUTO-FIX. If reasonable engineers could disagree about
the fix, it's ASK.

**Critical findings default toward ASK** (they're inherently riskier).
**Informational findings default toward AUTO-FIX** (they're more mechanical).

---

## Suppressions Ã¢â‚¬â€ DO NOT flag these

- "X is redundant with Y" when the redundancy is harmless and aids readability (e.g., `present?` redundant with `length > 20`)
- "Add a comment explaining why this threshold/constant was chosen" Ã¢â‚¬â€ thresholds change during tuning, comments rot
- "This assertion could be tighter" when the assertion already covers the behavior
- Suggesting consistency-only changes (wrapping a value in a conditional to match how another constant is guarded)
- "Regex doesn't handle edge case X" when the input is constrained and X never occurs in practice
- "Test exercises multiple guards simultaneously" Ã¢â‚¬â€ that's fine, tests don't need to isolate every guard
- Eval threshold changes (max_actionable, min scores) Ã¢â‚¬â€ these are tuned empirically and change constantly
- Harmless no-ops (e.g., `.reject` on an element that's never in the array)
- ANYTHING already addressed in the diff you're reviewing Ã¢â‚¬â€ read the FULL diff before commenting
