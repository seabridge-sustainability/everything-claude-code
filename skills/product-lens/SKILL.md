---
name: product-lens
description: Use this skill to validate the "why" before building, run product diagnostics, and convert vague ideas into specs.
origin: ECC
---

# Product Lens Ã¢â‚¬â€ Think Before You Build

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## When to Use

- Before starting any feature Ã¢â‚¬â€ validate the "why"
- Weekly product review Ã¢â‚¬â€ are we building the right thing?
- When stuck choosing between features
- Before a launch Ã¢â‚¬â€ sanity check the user journey
- When converting a vague idea into a spec

## How It Works

### Mode 1: Product Diagnostic

Like YC office hours but automated. Asks the hard questions:

```
1. Who is this for? (specific person, not "developers")
2. What's the pain? (quantify: how often, how bad, what do they do today?)
3. Why now? (what changed that makes this possible/necessary?)
4. What's the 10-star version? (if money/time were unlimited)
5. What's the MVP? (smallest thing that proves the thesis)
6. What's the anti-goal? (what are you explicitly NOT building?)
7. How do you know it's working? (metric, not vibes)
```

Output: a `PRODUCT-BRIEF.md` with answers, risks, and a go/no-go recommendation.

### Mode 2: Founder Review

Reviews your current project through a founder lens:

```
1. Read README, CLAUDE.md, package.json, recent commits
2. Infer: what is this trying to be?
3. Score: product-market fit signals (0-10)
   - Usage growth trajectory
   - Retention indicators (repeat contributors, return users)
   - Revenue signals (pricing page, billing code, Stripe integration)
   - Competitive moat (what's hard to copy?)
4. Identify: the one thing that would 10x this
5. Flag: things you're building that don't matter
```

### Mode 3: User Journey Audit

Maps the actual user experience:

```
1. Clone/install the product as a new user
2. Document every friction point (confusing steps, errors, missing docs)
3. Time each step
4. Compare to competitor onboarding
5. Score: time-to-value (how long until the user gets their first win?)
6. Recommend: top 3 fixes for onboarding
```

### Mode 4: Feature Prioritization

When you have 10 ideas and need to pick 2:

```
1. List all candidate features
2. Score each on: impact (1-5) Ãƒâ€” confidence (1-5) ÃƒÂ· effort (1-5)
3. Rank by ICE score
4. Apply constraints: runway, team size, dependencies
5. Output: prioritized roadmap with rationale
```

## Output

All modes output actionable docs, not essays. Every recommendation has a specific next step.

## Integration

Pair with:
- `/browser-qa` to verify the user journey audit findings
- `/design-system audit` for visual polish assessment
- `/canary-watch` for post-launch monitoring
