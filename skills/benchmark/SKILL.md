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

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
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
