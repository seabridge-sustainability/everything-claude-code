---
name: self-improving-skills
description: Iteratively optimize a SKILL.md prompt file using an Executor→Analyst→Mutator multi-agent loop. Generates test scenarios, scores outputs against binary criteria, diagnoses failures, and applies surgical prompt mutations. Keeps changes only when the pass rate improves. Based on Karpathy's autoresearch methodology.
triggers:
  - "self-improving-skills"
  - "optimize this skill"
  - "improve this skill"
  - "skill optimization"
  - "self-improve"
  - "/self-improving-skills"
license: MIT
metadata:
  author: SeaBridgeAI
  version: "1.0"
---

# Self-Improving Skills

Automatically optimize a SKILL.md file using a three-agent loop: **Executor** → **Analyst** → **Mutator**.

Changes are kept only when the pass rate improves. Max 20 rounds or until the target pass rate is reached.

---

## Step 0 — Locate the Skill

Ask the user: "Which SKILL.md file do you want to optimize? Provide the path, or paste the content directly."

Read the file with the Read tool. Extract:
- `name` from the YAML frontmatter
- `description` from the YAML frontmatter
- The full instruction body (everything after the `---` closing the frontmatter)

Store these as `SKILL_NAME`, `SKILL_DESCRIPTION`, and `SKILL_BODY`.

---

## Step 1 — Generate Test Scenarios and Evaluation Criteria

**You are the Executor agent. Generate configuration for the optimization run.**

Using `SKILL_NAME` and `SKILL_DESCRIPTION`, produce:

### Test Scenarios (3–5 diverse cases)
Each scenario is a realistic user prompt that should trigger this skill. Include:
- A typical/happy-path case
- An edge case (ambiguous input, missing context)
- A stress case (complex, multi-part request)
- Optionally: a failure case (input the skill should handle gracefully but might not)

Format each scenario as:
```
SCENARIO 1: <one-line label>
INPUT: <the user prompt that would invoke this skill>
EXPECTED BEHAVIOR: <what a perfect execution looks like in 1–2 sentences>
```

### Evaluation Criteria (4–6 binary yes/no questions)
Each criterion must be answerable YES or NO from reading the skill's output. Good criteria are specific, not vague.

Format each as:
```
CRITERION 1: Does the output <specific measurable thing>? (yes/no)
```

**Present the scenarios and criteria to the user. Ask:**
> "Review these test scenarios and evaluation criteria. Edit, add, or remove any. Reply 'ready' when you want to start optimization, or give me your changes."

Wait for the user's confirmation before proceeding to Step 2.

---

## Step 2 — Baseline Run (Round 0)

**Executor: Score the current skill against all scenarios.**

For each scenario:
1. Use the skill's instruction body as the system context
2. Apply the scenario INPUT as the user prompt
3. Generate a response following the skill's instructions exactly
4. Score the response against all evaluation criteria (YES=1, NO=0)

Compute:
- `scenario_score[i]` = (criteria passed) / (total criteria), for each scenario
- `pass_rate` = average of all scenario scores
- `baseline_pass_rate` = `pass_rate`

Report:
```
BASELINE RESULTS
================
Scenario 1 (<label>): X/N criteria passed
Scenario 2 (<label>): X/N criteria passed
...
Overall pass rate: X.X% (baseline)
Target pass rate: 80% (default — adjust if user specified otherwise)
```

If `pass_rate >= target_pass_rate`: announce the skill already meets the target and stop.

---

## Step 3 — Optimization Loop

Repeat for up to 20 rounds (or until `pass_rate >= target_pass_rate`):

### 3a — Analyst: Diagnose Failures

**You are the Analyst agent. Examine the failed criteria and identify the root cause.**

For each scenario where criteria failed:
- Identify which specific criteria failed
- Diagnose WHY the skill instruction produces that failure
- Choose ONE mutation strategy from: `add_example`, `add_constraint`, `restructure`, `add_edge_case`

Produce a structured diagnosis:
```
ANALYST REPORT — Round N
========================
Failing criteria: [list]
Root cause: <1–2 sentences — be specific about what in the SKILL.md causes this>
Mutation strategy: <add_example | add_constraint | restructure | add_edge_case>
Rationale: <why this strategy addresses the root cause>
Proposed change location: <quote the exact section/sentence in SKILL.md to modify>
```

### 3b — Mutator: Apply ONE Surgical Change

**You are the Mutator agent. Apply exactly ONE targeted change to the skill prompt.**

Rules:
- Make ONLY the change the Analyst prescribed — nothing else
- Do not restructure unrelated sections
- Do not add features that weren't diagnosed as needed
- Prefer adding 1–3 sentences over rewriting paragraphs
- If `add_example`: add a concrete before/after example to the relevant section
- If `add_constraint`: add an explicit "DO NOT" or "ALWAYS" constraint
- If `restructure`: reorder or rename one section for clarity
- If `add_edge_case`: add a new scenario handling note

Show the diff:
```
MUTATOR CHANGE — Round N
========================
Strategy: <strategy>
--- BEFORE ---
<exact text being replaced>
--- AFTER ---
<new text>
```

Apply the change to `SKILL_BODY` to produce `CANDIDATE_BODY`.

### 3c — Executor: Re-Score

Run all scenarios against `CANDIDATE_BODY` (same process as Step 2).

Compute `candidate_pass_rate`.

### 3d — Keep or Revert

```
Round N result:
  Candidate pass rate: X.X%
  Previous pass rate:  X.X%
  Decision: KEEP / REVERT
```

- **KEEP** if `candidate_pass_rate > pass_rate`: update `SKILL_BODY = CANDIDATE_BODY`, `pass_rate = candidate_pass_rate`
- **REVERT** if `candidate_pass_rate <= pass_rate`: discard `CANDIDATE_BODY`, keep `SKILL_BODY` unchanged

**Plateau detection**: If 3 consecutive rounds are REVERT, announce "Optimization plateaued after N rounds" and stop.

---

## Step 4 — Output

Present the final results:

```
OPTIMIZATION COMPLETE
=====================
Rounds run: N
Baseline pass rate: X.X%
Final pass rate:    X.X%
Improvement: +X.X pp

Changes applied (N total):
  Round 2: add_constraint — Added explicit "DO NOT" for <section>
  Round 5: add_example    — Added before/after example to <section>
  ...
```

Write the improved SKILL.md using the Write tool:
- Keep the original YAML frontmatter exactly as-is (bump `version` by 0.1)
- Replace the instruction body with the final `SKILL_BODY`

Also write a `CHANGELOG.md` alongside the SKILL.md listing each applied change with its round number, strategy, and one-line description.

---

## Configuration

| Parameter | Default | Override |
|-----------|---------|---------|
| `max_rounds` | 20 | "use max 10 rounds" |
| `target_pass_rate` | 80% | "target 90%" |
| `plateau_patience` | 3 consecutive reverts | "stop after 2 reverts" |

---

## Notes

- This skill uses Claude itself as the execution engine — it simulates running the skill by following its instructions
- The loop is fully transparent: every round shows the analyst diagnosis, mutator diff, and score delta
- For skills that call external tools (Bash, Read, etc.), describe expected tool behavior in the test scenario's EXPECTED BEHAVIOR field
- If the skill is already well-optimized (baseline ≥ 80%), the loop exits immediately with a confirmation message
