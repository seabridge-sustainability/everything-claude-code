---
name: python-testing
description: Design or repair Python tests with pytest, fixtures, parametrization, mocking, async tests, and risk-scaled coverage. Use for concrete Python testing work, not every Python edit.
metadata:
  origin: ECC
---

# Python Testing

Start from the behavior and repository test conventions. Add the smallest test
that would fail for the defect or missing requirement, then run the narrowest
useful command. Expand to integration or full-suite coverage when the changed
risk boundary warrants it.

## Choose the test boundary

- Pure transformation or validation: focused unit test.
- Persistence, framework wiring, or external adapter: integration test with an
  isolated fixture or fake.
- Auth, tenancy, money, migrations, concurrency, or destructive behavior:
  positive and negative tests at the real boundary.
- UI or process behavior: runtime evidence in addition to pytest when pytest
  cannot observe the user-visible result.

Follow repository-owned fixtures, markers, manifests, async conventions, and
coverage thresholds. TDD is useful when requested or when it clarifies a defect;
it is not a mandatory ceremony for every change. Never replace a meaningful
assertion with a coverage-only test.

## Load details only when needed

Read [references/pytest-patterns.md](references/pytest-patterns.md) for concrete
pytest examples involving fixtures, parametrization, mocks, async code, exception
checks, filesystem tests, suite layout, markers, or configuration. Do not load the
reference for a simple existing-test invocation.

## Verification

Report the exact command, result, and any skipped dependency or environment.
Missing services, unavailable databases, and skipped tests are evidence gaps, not
passes. Do not broaden to the full suite when no relevant code changed since the
focused check.
