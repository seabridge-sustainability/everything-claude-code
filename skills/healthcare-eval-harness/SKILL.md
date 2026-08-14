---
name: healthcare-eval-harness
description: Patient safety evaluation harness for healthcare application deployments. Automated test suites for CDSS accuracy, PHI exposure, clinical workflow integrity, and integration compliance. Blocks deployments on safety failures. Use when a healthcare deployment must be gated on patient-safety tests for CDSS accuracy, PHI exposure, and workflow integrity.
metadata:
  version: "1.0.0"
  origin: Health1 Super Speciality Hospitals — contributed by Dr. Keyur Patel
---

# Healthcare Eval Harness — Patient Safety Verification

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

Automated verification system for healthcare application deployments. A single CRITICAL failure blocks deployment. Patient safety is non-negotiable.

> **Note:** Examples use Jest as the reference test runner. Adapt commands for your framework (Vitest, pytest, PHPUnit, etc.) — the test categories and pass thresholds are framework-agnostic.

## When to Use

- Before any deployment of EMR/EHR applications
- After modifying CDSS logic (drug interactions, dose validation, scoring)
- After changing database schemas that touch patient data
- After modifying authentication or access control
- During CI/CD pipeline configuration for healthcare apps
- After resolving merge conflicts in clinical modules

## How It Works

The eval harness runs five test categories in order. The first three (CDSS Accuracy, PHI Exposure, Data Integrity) are CRITICAL gates requiring 100% pass rate — a single failure blocks deployment. The remaining two (Clinical Workflow, Integration) are HIGH gates requiring 95%+ pass rate.

Each category maps to a Jest test path pattern. The CI pipeline runs CRITICAL gates with `--bail` (stop on first failure) and enforces coverage thresholds with `--coverage --coverageThreshold`.

### Eval Categories

**1. CDSS Accuracy (CRITICAL — 100% required)**

Tests all clinical decision support logic: drug interaction pairs (both directions), dose validation rules, clinical scoring vs published specs, no false negatives, no silent failures.

```bash
npx jest --testPathPattern='tests/cdss' --bail --ci --coverage
```

**2. PHI Exposure (CRITICAL — 100% required)**

Tests for protected health information leaks: API error responses, console output, URL parameters, browser storage, cross-facility isolation, unauthenticated access, service role key absence.

```bash
npx jest --testPathPattern='tests/security/phi' --bail --ci
```

**3. Data Integrity (CRITICAL — 100% required)**

Tests clinical data safety: locked encounters, audit trail entries, cascade delete protection, concurrent edit handling, no orphaned records.

```bash
npx jest --testPathPattern='tests/data-integrity' --bail --ci
```

**4. Clinical Workflow (HIGH — 95%+ required)**

Tests end-to-end flows: encounter lifecycle, template rendering, medication sets, drug/diagnosis search, prescription PDF, red flag alerts.

```bash
tmp_json=$(mktemp)
npx jest --testPathPattern='tests/clinical' --ci --json --outputFile="$tmp_json" || true
total=$(jq '.numTotalTests // 0' "$tmp_json")
passed=$(jq '.numPassedTests // 0' "$tmp_json")
if [ "$total" -eq 0 ]; then
  echo "No clinical tests found" >&2
  exit 1
fi
rate=$(echo "scale=2; $passed * 100 / $total" | bc)
echo "Clinical pass rate: ${rate}% ($passed/$total)"
```

**5. Integration Compliance (HIGH — 95%+ required)**

Tests external systems: HL7 message parsing (v2.x), FHIR validation, lab result mapping, malformed message handling.

```bash
tmp_json=$(mktemp)
npx jest --testPathPattern='tests/integration' --ci --json --outputFile="$tmp_json" || true
total=$(jq '.numTotalTests // 0' "$tmp_json")
passed=$(jq '.numPassedTests // 0' "$tmp_json")
if [ "$total" -eq 0 ]; then
  echo "No integration tests found" >&2
  exit 1
fi
rate=$(echo "scale=2; $passed * 100 / $total" | bc)
echo "Integration pass rate: ${rate}% ($passed/$total)"
```

### Pass/Fail Matrix

| Category | Threshold | On Failure |
|----------|-----------|------------|
| CDSS Accuracy | 100% | **BLOCK deployment** |
| PHI Exposure | 100% | **BLOCK deployment** |
| Data Integrity | 100% | **BLOCK deployment** |
| Clinical Workflow | 95%+ | WARN, allow with review |
| Integration | 95%+ | WARN, allow with review |

### CI/CD Integration

```yaml
name: Healthcare Safety Gate
on: [push, pull_request]

jobs:
  safety-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci

      # CRITICAL gates — 100% required, bail on first failure
      - name: CDSS Accuracy
        run: npx jest --testPathPattern='tests/cdss' --bail --ci --coverage --coverageThreshold='{"global":{"branches":80,"functions":80,"lines":80}}'

      - name: PHI Exposure Check
        run: npx jest --testPathPattern='tests/security/phi' --bail --ci

      - name: Data Integrity
        run: npx jest --testPathPattern='tests/data-integrity' --bail --ci

      # HIGH gates — 95%+ required, custom threshold check
      # HIGH gates — 95%+ required
      - name: Clinical Workflows
        run: |
          TMP_JSON=$(mktemp)
          npx jest --testPathPattern='tests/clinical' --ci --json --outputFile="$TMP_JSON" || true
          TOTAL=$(jq '.numTotalTests // 0' "$TMP_JSON")
          PASSED=$(jq '.numPassedTests // 0' "$TMP_JSON")
          if [ "$TOTAL" -eq 0 ]; then
            echo "::error::No clinical tests found"; exit 1
          fi
          RATE=$(echo "scale=2; $PASSED * 100 / $TOTAL" | bc)
          echo "Pass rate: ${RATE}% ($PASSED/$TOTAL)"
          if (( $(echo "$RATE < 95" | bc -l) )); then
            echo "::warning::Clinical pass rate ${RATE}% below 95%"
          fi

      - name: Integration Compliance
        run: |
          TMP_JSON=$(mktemp)
          npx jest --testPathPattern='tests/integration' --ci --json --outputFile="$TMP_JSON" || true
          TOTAL=$(jq '.numTotalTests // 0' "$TMP_JSON")
          PASSED=$(jq '.numPassedTests // 0' "$TMP_JSON")
          if [ "$TOTAL" -eq 0 ]; then
            echo "::error::No integration tests found"; exit 1
          fi
          RATE=$(echo "scale=2; $PASSED * 100 / $TOTAL" | bc)
          echo "Pass rate: ${RATE}% ($PASSED/$TOTAL)"
          if (( $(echo "$RATE < 95" | bc -l) )); then
            echo "::warning::Integration pass rate ${RATE}% below 95%"
          fi
```

### Anti-Patterns

- Skipping CDSS tests "because they passed last time"
- Setting CRITICAL thresholds below 100%
- Using `--no-bail` on CRITICAL test suites
- Mocking the CDSS engine in integration tests (must test real logic)
- Allowing deployments when safety gate is red
- Running tests without `--coverage` on CDSS suites

## Examples

### Example 1: Run All Critical Gates Locally

```bash
npx jest --testPathPattern='tests/cdss' --bail --ci --coverage && \
npx jest --testPathPattern='tests/security/phi' --bail --ci && \
npx jest --testPathPattern='tests/data-integrity' --bail --ci
```

### Example 2: Check HIGH Gate Pass Rate

```bash
tmp_json=$(mktemp)
npx jest --testPathPattern='tests/clinical' --ci --json --outputFile="$tmp_json" || true
jq '{
  passed: (.numPassedTests // 0),
  total: (.numTotalTests // 0),
  rate: (if (.numTotalTests // 0) == 0 then 0 else ((.numPassedTests // 0) / (.numTotalTests // 1) * 100) end)
}' "$tmp_json"
# Expected: { "passed": 21, "total": 22, "rate": 95.45 }
```

### Example 3: Eval Report

```
## Healthcare Eval: 2026-03-27 [commit abc1234]

### Patient Safety: PASS

| Category | Tests | Pass | Fail | Status |
|----------|-------|------|------|--------|
| CDSS Accuracy | 39 | 39 | 0 | PASS |
| PHI Exposure | 8 | 8 | 0 | PASS |
| Data Integrity | 12 | 12 | 0 | PASS |
| Clinical Workflow | 22 | 21 | 1 | 95.5% PASS |
| Integration | 6 | 6 | 0 | PASS |

### Coverage: 84% (target: 80%+)
### Verdict: SAFE TO DEPLOY
```
