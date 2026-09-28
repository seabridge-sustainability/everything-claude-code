---
name: santa-method
description: "Multi-agent adversarial verification with convergence loop. Two independent review agents must both pass before output ships. Use when output must clear two independent adversarial reviewers before it ships."
metadata:
  origin: "Ronald Skelton - Founder, RapportScore.ai"
---

# Santa Method

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Multi-agent adversarial verification framework. Make a list, check it twice. If it's naughty, fix it until it's nice.

The core insight: a single agent reviewing its own output shares the same biases, knowledge gaps, and systematic errors that produced the output. Two independent reviewers with no shared context break this failure mode.

## When to Activate

Invoke this skill when:
- Output will be published, deployed, or consumed by end users
- Compliance, regulatory, or brand constraints must be enforced
- Code ships to production without human review
- Content accuracy matters (technical docs, educational material, customer-facing copy)
- Batch generation at scale where spot-checking misses systemic patterns
- Hallucination risk is elevated (claims, statistics, API references, legal language)

Do NOT use for internal drafts, exploratory research, or tasks with deterministic verification (use build/test/lint pipelines for those).

## Architecture

```
Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â
Ã¢â€â€š  GENERATOR   Ã¢â€â€š  Phase 1: Make a List
Ã¢â€â€š  (Agent A)   Ã¢â€â€š  Produce the deliverable
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ
       Ã¢â€â€š output
       Ã¢â€“Â¼
Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â
Ã¢â€â€š     DUAL INDEPENDENT REVIEW   Ã¢â€â€š  Phase 2: Check It Twice
Ã¢â€â€š                                Ã¢â€â€š
Ã¢â€â€š  Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â  Ã¢â€â€š  Two agents, same rubric,
Ã¢â€â€š  Ã¢â€â€š Reviewer B Ã¢â€â€š Ã¢â€â€š Reviewer C Ã¢â€â€š  Ã¢â€â€š  no shared context
Ã¢â€â€š  Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ  Ã¢â€â€š
Ã¢â€â€š        Ã¢â€â€š              Ã¢â€â€š        Ã¢â€â€š
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â¼Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â¼Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ
         Ã¢â€â€š              Ã¢â€â€š
         Ã¢â€“Â¼              Ã¢â€“Â¼
Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â
Ã¢â€â€š        VERDICT GATE           Ã¢â€â€š  Phase 3: Naughty or Nice
Ã¢â€â€š                                Ã¢â€â€š
Ã¢â€â€š  B passes AND C passes Ã¢â€ â€™ NICE  Ã¢â€â€š  Both must pass.
Ã¢â€â€š  Otherwise Ã¢â€ â€™ NAUGHTY           Ã¢â€â€š  No exceptions.
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ
       Ã¢â€â€š              Ã¢â€â€š
    NICE           NAUGHTY
       Ã¢â€â€š              Ã¢â€â€š
       Ã¢â€“Â¼              Ã¢â€“Â¼
   [ SHIP ]    Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â
               Ã¢â€â€š  FIX CYCLE   Ã¢â€â€š  Phase 4: Fix Until Nice
               Ã¢â€â€š              Ã¢â€â€š
               Ã¢â€â€š iteration++  Ã¢â€â€š  Collect all flags.
               Ã¢â€â€š if i > MAX:  Ã¢â€â€š  Fix all issues.
               Ã¢â€â€š   escalate   Ã¢â€â€š  Re-run both reviewers.
               Ã¢â€â€š else:        Ã¢â€â€š  Loop until convergence.
               Ã¢â€â€š   goto Ph.2  Ã¢â€â€š
               Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ
```

## Phase Details

### Phase 1: Make a List (Generate)

Execute the primary task. No changes to your normal generation workflow. Santa Method is a post-generation verification layer, not a generation strategy.

```python
# The generator runs as normal
output = generate(task_spec)
```

### Phase 2: Check It Twice (Independent Dual Review)

Spawn two review agents in parallel. Critical invariants:

1. **Context isolation** Ã¢â‚¬â€ neither reviewer sees the other's assessment
2. **Identical rubric** Ã¢â‚¬â€ both receive the same evaluation criteria
3. **Same inputs** Ã¢â‚¬â€ both receive the original spec AND the generated output
4. **Structured output** Ã¢â‚¬â€ each returns a typed verdict, not prose

```python
REVIEWER_PROMPT = """
You are an independent quality reviewer. You have NOT seen any other review of this output.

## Task Specification
{task_spec}

## Output Under Review
{output}

## Evaluation Rubric
{rubric}

## Instructions
Evaluate the output against EACH rubric criterion. For each:
- PASS: criterion fully met, no issues
- FAIL: specific issue found (cite the exact problem)

Return your assessment as structured JSON:
{
  "verdict": "PASS" | "FAIL",
  "checks": [
    {"criterion": "...", "result": "PASS|FAIL", "detail": "..."}
  ],
  "critical_issues": ["..."],   // blockers that must be fixed
  "suggestions": ["..."]         // non-blocking improvements
}

Be rigorous. Your job is to find problems, not to approve.
"""
```

```python
# Spawn reviewers in parallel (Claude Code subagents)
review_b = Agent(prompt=REVIEWER_PROMPT.format(...), description="Santa Reviewer B")
review_c = Agent(prompt=REVIEWER_PROMPT.format(...), description="Santa Reviewer C")

# Both run concurrently Ã¢â‚¬â€ neither sees the other
```

### Rubric Design

The rubric is the most important input. Vague rubrics produce vague reviews. Every criterion must have an objective pass/fail condition.

| Criterion | Pass Condition | Failure Signal |
|-----------|---------------|----------------|
| Factual accuracy | All claims verifiable against source material or common knowledge | Invented statistics, wrong version numbers, nonexistent APIs |
| Hallucination-free | No fabricated entities, quotes, URLs, or references | Links to pages that don't exist, attributed quotes with no source |
| Completeness | Every requirement in the spec is addressed | Missing sections, skipped edge cases, incomplete coverage |
| Compliance | Passes all project-specific constraints | Banned terms used, tone violations, regulatory non-compliance |
| Internal consistency | No contradictions within the output | Section A says X, section B says not-X |
| Technical correctness | Code compiles/runs, algorithms are sound | Syntax errors, logic bugs, wrong complexity claims |

#### Domain-Specific Rubric Extensions

**Content/Marketing:**
- Brand voice adherence
- SEO requirements met (keyword density, meta tags, structure)
- No competitor trademark misuse
- CTA present and correctly linked

**Code:**
- Type safety (no `any` leaks, proper null handling)
- Error handling coverage
- Security (no secrets in code, input validation, injection prevention)
- Test coverage for new paths

**Compliance-Sensitive (regulated, legal, financial):**
- No outcome guarantees or unsubstantiated claims
- Required disclaimers present
- Approved terminology only
- Jurisdiction-appropriate language

### Phase 3: Naughty or Nice (Verdict Gate)

```python
def santa_verdict(review_b, review_c):
    """Both reviewers must pass. No partial credit."""
    if review_b.verdict == "PASS" and review_c.verdict == "PASS":
        return "NICE"  # Ship it

    # Merge flags from both reviewers, deduplicate
    all_issues = dedupe(review_b.critical_issues + review_c.critical_issues)
    all_suggestions = dedupe(review_b.suggestions + review_c.suggestions)

    return "NAUGHTY", all_issues, all_suggestions
```

Why both must pass: if only one reviewer catches an issue, that issue is real. The other reviewer's blind spot is exactly the failure mode Santa Method exists to eliminate.

### Phase 4: Fix Until Nice (Convergence Loop)

```python
MAX_ITERATIONS = 3

for iteration in range(MAX_ITERATIONS):
    verdict, issues, suggestions = santa_verdict(review_b, review_c)

    if verdict == "NICE":
        log_santa_result(output, iteration, "passed")
        return ship(output)

    # Fix all critical issues (suggestions are optional)
    output = fix_agent.execute(
        output=output,
        issues=issues,
        instruction="Fix ONLY the flagged issues. Do not refactor or add unrequested changes."
    )

    # Re-run BOTH reviewers on fixed output (fresh agents, no memory of previous round)
    review_b = Agent(prompt=REVIEWER_PROMPT.format(output=output, ...))
    review_c = Agent(prompt=REVIEWER_PROMPT.format(output=output, ...))

# Exhausted iterations Ã¢â‚¬â€ escalate
log_santa_result(output, MAX_ITERATIONS, "escalated")
escalate_to_human(output, issues)
```

Critical: each review round uses **fresh agents**. Reviewers must not carry memory from previous rounds, as prior context creates anchoring bias.

## Implementation Patterns

### Pattern A: Claude Code Subagents (Recommended)

Subagents provide true context isolation. Each reviewer is a separate process with no shared state.

```bash
# In a Claude Code session, use the Agent tool to spawn reviewers
# Both agents run in parallel for speed
```

```python
# Pseudocode for Agent tool invocation
reviewer_b = Agent(
    description="Santa Review B",
    prompt=f"Review this output for quality...\n\nRUBRIC:\n{rubric}\n\nOUTPUT:\n{output}"
)
reviewer_c = Agent(
    description="Santa Review C",
    prompt=f"Review this output for quality...\n\nRUBRIC:\n{rubric}\n\nOUTPUT:\n{output}"
)
```

### Pattern B: Sequential Inline (Fallback)

When subagents aren't available, simulate isolation with explicit context resets:

1. Generate output
2. New context: "You are Reviewer 1. Evaluate ONLY against this rubric. Find problems."
3. Record findings verbatim
4. Clear context completely
5. New context: "You are Reviewer 2. Evaluate ONLY against this rubric. Find problems."
6. Compare both reviews, fix, repeat

The subagent pattern is strictly superior Ã¢â‚¬â€ inline simulation risks context bleed between reviewers.

### Pattern C: Batch Sampling

For large batches (100+ items), full Santa on every item is cost-prohibitive. Use stratified sampling:

1. Run Santa on a random sample (10-15% of batch, minimum 5 items)
2. Categorize failures by type (hallucination, compliance, completeness, etc.)
3. If systematic patterns emerge, apply targeted fixes to the entire batch
4. Re-sample and re-verify the fixed batch
5. Continue until a clean sample passes

```python
import random

def santa_batch(items, rubric, sample_rate=0.15):
    sample = random.sample(items, max(5, int(len(items) * sample_rate)))

    for item in sample:
        result = santa_full(item, rubric)
        if result.verdict == "NAUGHTY":
            pattern = classify_failure(result.issues)
            items = batch_fix(items, pattern)  # Fix all items matching pattern
            return santa_batch(items, rubric)   # Re-sample

    return items  # Clean sample Ã¢â€ â€™ ship batch
```

## Failure Modes and Mitigations

| Failure Mode | Symptom | Mitigation |
|-------------|---------|------------|
| Infinite loop | Reviewers keep finding new issues after fixes | Max iteration cap (3). Escalate. |
| Rubber stamping | Both reviewers pass everything | Adversarial prompt: "Your job is to find problems, not approve." |
| Subjective drift | Reviewers flag style preferences, not errors | Tight rubric with objective pass/fail criteria only |
| Fix regression | Fixing issue A introduces issue B | Fresh reviewers each round catch regressions |
| Reviewer agreement bias | Both reviewers miss the same thing | Mitigated by independence, not eliminated. For critical output, add a third reviewer or human spot-check. |
| Cost explosion | Too many iterations on large outputs | Batch sampling pattern. Budget caps per verification cycle. |

## Integration with Other Skills

| Skill | Relationship |
|-------|-------------|
| Verification Loop | Use for deterministic checks (build, lint, test). Santa for semantic checks (accuracy, hallucinations). Run verification-loop first, Santa second. |
| Eval Harness | Santa Method results feed eval metrics. Track pass@k across Santa runs to measure generator quality over time. |
| Continuous Learning v2 | Santa findings become instincts. Repeated failures on the same criterion Ã¢â€ â€™ learned behavior to avoid the pattern. |
| Strategic Compact | Run Santa BEFORE compacting. Don't lose review context mid-verification. |

## Metrics

Track these to measure Santa Method effectiveness:

- **First-pass rate**: % of outputs that pass Santa on round 1 (target: >70%)
- **Mean iterations to convergence**: average rounds to NICE (target: <1.5)
- **Issue taxonomy**: distribution of failure types (hallucination vs. completeness vs. compliance)
- **Reviewer agreement**: % of issues flagged by both reviewers vs. only one (low agreement = rubric needs tightening)
- **Escape rate**: issues found post-ship that Santa should have caught (target: 0)

## Cost Analysis

Santa Method costs approximately 2-3x the token cost of generation alone per verification cycle. For most high-stakes output, this is a bargain:

```
Cost of Santa = (generation tokens) + 2Ãƒâ€”(review tokens per round) Ãƒâ€” (avg rounds)
Cost of NOT Santa = (reputation damage) + (correction effort) + (trust erosion)
```

For batch operations, the sampling pattern reduces cost to ~15-20% of full verification while catching >90% of systematic issues.
