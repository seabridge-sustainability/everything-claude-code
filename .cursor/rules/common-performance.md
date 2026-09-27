---
description: "Evidence-driven performance and context guidance; load for optimization work."
alwaysApply: false
---
# Performance Optimization

## Evidence-Driven Optimization

- Measure the relevant baseline before optimizing.
- Use repository-owned latency, memory, bundle, token, or cost budgets; do not
  invent a passing threshold.
- Prefer the smallest model and tool surface that meets a measured quality
  target. Keep provider- and model-version routing in harness configuration,
  not cross-harness prose.

## Context And Reasoning

Keep startup instructions compact and load specialized references only when
their trigger fits. Use deeper planning or independent review when complexity
or risk warrants it, not as a universal default.

## Build Troubleshooting

If build fails:
1. Use **build-error-resolver** agent
2. Analyze error messages
3. Fix incrementally
4. Verify after each fix
