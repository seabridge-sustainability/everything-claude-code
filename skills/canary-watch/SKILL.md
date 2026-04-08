---
name: canary-watch
description: Use this skill to monitor a deployed URL for regressions after deploys, merges, or dependency upgrades.
origin: ECC
---

# Canary Watch Ã¢â‚¬â€ Post-Deploy Monitoring

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

- After deploying to production or staging
- After merging a risky PR
- When you want to verify a fix actually fixed it
- Continuous monitoring during a launch window
- After dependency upgrades

## How It Works

Monitors a deployed URL for regressions. Runs in a loop until stopped or until the watch window expires.

### What It Watches

```
1. HTTP Status Ã¢â‚¬â€ is the page returning 200?
2. Console Errors Ã¢â‚¬â€ new errors that weren't there before?
3. Network Failures Ã¢â‚¬â€ failed API calls, 5xx responses?
4. Performance Ã¢â‚¬â€ LCP/CLS/INP regression vs baseline?
5. Content Ã¢â‚¬â€ did key elements disappear? (h1, nav, footer, CTA)
6. API Health Ã¢â‚¬â€ are critical endpoints responding within SLA?
```

### Watch Modes

**Quick check** (default): single pass, report results
```
/canary-watch https://myapp.com
```

**Sustained watch**: check every N minutes for M hours
```
/canary-watch https://myapp.com --interval 5m --duration 2h
```

**Diff mode**: compare staging vs production
```
/canary-watch --compare https://staging.myapp.com https://myapp.com
```

### Alert Thresholds

```yaml
critical:  # immediate alert
  - HTTP status != 200
  - Console error count > 5 (new errors only)
  - LCP > 4s
  - API endpoint returns 5xx

warning:   # flag in report
  - LCP increased > 500ms from baseline
  - CLS > 0.1
  - New console warnings
  - Response time > 2x baseline

info:      # log only
  - Minor performance variance
  - New network requests (third-party scripts added?)
```

### Notifications

When a critical threshold is crossed:
- Desktop notification (macOS/Linux)
- Optional: Slack/Discord webhook
- Log to `~/.claude/canary-watch.log`

## Output

```markdown
## Canary Report Ã¢â‚¬â€ myapp.com Ã¢â‚¬â€ 2026-03-23 03:15 PST

### Status: HEALTHY Ã¢Å“â€œ

| Check | Result | Baseline | Delta |
|-------|--------|----------|-------|
| HTTP | 200 Ã¢Å“â€œ | 200 | Ã¢â‚¬â€ |
| Console errors | 0 Ã¢Å“â€œ | 0 | Ã¢â‚¬â€ |
| LCP | 1.8s Ã¢Å“â€œ | 1.6s | +200ms |
| CLS | 0.01 Ã¢Å“â€œ | 0.01 | Ã¢â‚¬â€ |
| API /health | 145ms Ã¢Å“â€œ | 120ms | +25ms |

### No regressions detected. Deploy is clean.
```

## Integration

Pair with:
- `/browser-qa` for pre-deploy verification
- Hooks: add as a PostToolUse hook on `git push` to auto-check after deploys
- CI: run in GitHub Actions after deploy step
