---
name: benchmark
description: Use this skill to measure performance baselines, detect regressions before/after PRs, and compare stack alternatives.
license: MIT
metadata:
  origin: ECC
---

# Benchmark Ã¢â‚¬â€ Performance Baseline & Regression Detection

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


## When to Use

- Before and after a PR to measure performance impact
- Setting up performance baselines for a project
- When users report "it feels slow"
- Before a launch Ã¢â‚¬â€ ensure you meet performance targets
- Comparing your stack against alternatives

## How It Works

### Mode 1: Page Performance

Measures real browser metrics via browser MCP:

```
1. Navigate to each target URL
2. Measure Core Web Vitals:
   - LCP (Largest Contentful Paint) Ã¢â‚¬â€ target < 2.5s
   - CLS (Cumulative Layout Shift) Ã¢â‚¬â€ target < 0.1
   - INP (Interaction to Next Paint) Ã¢â‚¬â€ target < 200ms
   - FCP (First Contentful Paint) Ã¢â‚¬â€ target < 1.8s
   - TTFB (Time to First Byte) Ã¢â‚¬â€ target < 800ms
3. Measure resource sizes:
   - Total page weight (target < 1MB)
   - JS bundle size (target < 200KB gzipped)
   - CSS size
   - Image weight
   - Third-party script weight
4. Count network requests
5. Check for render-blocking resources
```

### Mode 2: API Performance

Benchmarks API endpoints:

```
1. Hit each endpoint 100 times
2. Measure: p50, p95, p99 latency
3. Track: response size, status codes
4. Test under load: 10 concurrent requests
5. Compare against SLA targets
```

### Mode 3: Build Performance

Measures development feedback loop:

```
1. Cold build time
2. Hot reload time (HMR)
3. Test suite duration
4. TypeScript check time
5. Lint time
6. Docker build time
```

### Mode 4: Before/After Comparison

Run before and after a change to measure impact:

```
/benchmark baseline    # saves current metrics
# ... make changes ...
/benchmark compare     # compares against baseline
```

Output:
```
| Metric | Before | After | Delta | Verdict |
|--------|--------|-------|-------|---------|
| LCP | 1.2s | 1.4s | +200ms | WARNING: WARN |
| Bundle | 180KB | 175KB | -5KB | Ã¢Å“â€œ BETTER |
| Build | 12s | 14s | +2s | WARNING: WARN |
```

## Output

Stores baselines in `.ecc/benchmarks/` as JSON. Git-tracked so the team shares baselines.

## Integration

- CI: run `/benchmark compare` on every PR
- Pair with `/canary-watch` for post-deploy monitoring
- Pair with `/browser-qa` for full pre-ship checklist
