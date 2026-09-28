---
name: django-verification
description: "Verification loop for Django projects: migrations, linting, tests with coverage, security scans, and deployment readiness checks before release or PR."
metadata:
  origin: ECC
---

# Django Verification Loop

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


Run before PRs, after major changes, and pre-deploy to ensure Django application quality and security.

## When to Activate

- Before opening a pull request for a Django project
- After major model changes, migration updates, or dependency upgrades
- Pre-deployment verification for staging or production
- Running full environment Ã¢â€ â€™ lint Ã¢â€ â€™ test Ã¢â€ â€™ security Ã¢â€ â€™ deploy readiness pipeline
- Validating migration safety and test coverage

## Phase 1: Environment Check

```bash
# Verify Python version
python --version  # Should match project requirements

# Check virtual environment
which python
pip list --outdated

# Verify environment variables
python -c "import os; import environ; print('DJANGO_SECRET_KEY set' if os.environ.get('DJANGO_SECRET_KEY') else 'MISSING: DJANGO_SECRET_KEY')"
```

If environment is misconfigured, stop and fix.

## Phase 2: Code Quality & Formatting

```bash
# Type checking
mypy . --config-file pyproject.toml

# Linting with ruff
ruff check . --fix

# Formatting with black
black . --check
black .  # Auto-fix

# Import sorting
isort . --check-only
isort .  # Auto-fix

# Django-specific checks
python manage.py check --deploy
```

Common issues:
- Missing type hints on public functions
- PEP 8 formatting violations
- Unsorted imports
- Debug settings left in production configuration

## Phase 3: Migrations

```bash
# Check for unapplied migrations
python manage.py showmigrations

# Create missing migrations
python manage.py makemigrations --check

# Dry-run migration application
python manage.py migrate --plan

# Apply migrations (test environment)
python manage.py migrate

# Check for migration conflicts
python manage.py makemigrations --merge  # Only if conflicts exist
```

Report:
- Number of pending migrations
- Any migration conflicts
- Model changes without migrations

## Phase 4: Tests + Coverage

```bash
# Run all tests with pytest
pytest --cov=apps --cov-report=html --cov-report=term-missing --reuse-db

# Run specific app tests
pytest apps/users/tests/

# Run with markers
pytest -m "not slow"  # Skip slow tests
pytest -m integration  # Only integration tests

# Coverage report
open htmlcov/index.html
```

Report:
- Total tests: X passed, Y failed, Z skipped
- Overall coverage: XX%
- Per-app coverage breakdown

Coverage targets:

| Component | Target |
|-----------|--------|
| Models | Cover changed invariants and persistence behavior |
| Serializers | Cover changed validation and representation |
| Views | Cover changed request, auth, and response boundaries |
| Services | Cover changed business logic and failure paths |
| Overall | Apply the repository-configured threshold |

## Phase 5: Security Scan

```bash
# Dependency vulnerabilities
pip-audit
safety check --full-report

# Django security checks
python manage.py check --deploy

# Bandit security linter
bandit -r . -f json -o bandit-report.json

# Secret scanning (if gitleaks is installed)
gitleaks detect --source . --verbose

# Environment variable check
python -c "from django.core.exceptions import ImproperlyConfigured; from django.conf import settings; settings.DEBUG"
```

Report:
- Vulnerable dependencies found
- Security configuration issues
- Hardcoded secrets detected
- DEBUG mode status (should be False in production)

## Phase 6: Django Management Commands

```bash
# Check for model issues
python manage.py check

# Collect static files
python manage.py collectstatic --noinput --clear

# Create superuser (if needed for tests)
echo "from apps.users.models import User; User.objects.create_superuser('admin@example.com', 'admin')" | python manage.py shell

# Database integrity
python manage.py check --database default

# Cache verification (if using Redis)
python -c "from django.core.cache import cache; cache.set('test', 'value', 10); print(cache.get('test'))"
```

## Phase 7: Performance Checks

```bash
# Django Debug Toolbar output (check for N+1 queries)
# Run in dev mode with DEBUG=True and access a page
# Look for duplicate queries in SQL panel

# Query count analysis
django-admin debugsqlshell  # If django-debug-sqlshell installed

# Check for missing indexes
python manage.py shell << EOF
from django.db import connection
with connection.cursor() as cursor:
    cursor.execute("SELECT table_name, index_name FROM information_schema.statistics WHERE table_schema = 'public'")
    print(cursor.fetchall())
EOF
```

Report:
- Number of queries per page (should be < 50 for typical pages)
- Missing database indexes
- Duplicate queries detected

## Phase 8: Static Assets

```bash
# Check for npm dependencies (if using npm)
npm audit
npm audit fix

# Build static files (if using webpack/vite)
npm run build

# Verify static files
ls -la staticfiles/
python manage.py findstatic css/style.css
```

## Phase 9: Configuration Review

```python
# Run in Python shell to verify settings
python manage.py shell << EOF
from django.conf import settings
import os

# Critical checks
checks = {
    'DEBUG is False': not settings.DEBUG,
    'SECRET_KEY set': bool(settings.SECRET_KEY and len(settings.SECRET_KEY) > 30),
    'ALLOWED_HOSTS set': len(settings.ALLOWED_HOSTS) > 0,
    'HTTPS enabled': getattr(settings, 'SECURE_SSL_REDIRECT', False),
    'HSTS enabled': getattr(settings, 'SECURE_HSTS_SECONDS', 0) > 0,
    'Database configured': settings.DATABASES['default']['ENGINE'] != 'django.db.backends.sqlite3',
}

for check, result in checks.items():
    status = 'Ã¢Å“â€œ' if result else 'Ã¢Å“â€”'
    print(f"{status} {check}")
EOF
```

## Phase 10: Logging Configuration

```bash
# Test logging output
python manage.py shell << EOF
import logging
logger = logging.getLogger('django')
logger.warning('Test warning message')
logger.error('Test error message')
EOF

# Check log files (if configured)
tail -f /var/log/django/django.log
```

## Phase 11: API Documentation (if DRF)

```bash
# Generate schema
python manage.py generateschema --format openapi-json > schema.json

# Validate schema
# Check if schema.json is valid JSON
python -c "import json; json.load(open('schema.json'))"

# Access Swagger UI (if using drf-yasg)
# Visit http://localhost:8000/swagger/ in browser
```

## Phase 12: Diff Review

```bash
# Show diff statistics
git diff --stat

# Show actual changes
git diff

# Show changed files
git diff --name-only

# Check for common issues
git diff | grep -i "todo\|fixme\|hack\|xxx"
git diff | grep "print("  # Debug statements
git diff | grep "DEBUG = True"  # Debug mode
git diff | grep "import pdb"  # Debugger
```

Checklist:
- No debugging statements (print, pdb, breakpoint())
- No TODO/FIXME comments in critical code
- No hardcoded secrets or credentials
- Database migrations included for model changes
- Configuration changes documented
- Error handling present for external calls
- Transaction management where needed

## Output Template

```
DJANGO VERIFICATION REPORT
==========================

Phase 1: Environment Check
  Ã¢Å“â€œ Python 3.11.5
  Ã¢Å“â€œ Virtual environment active
  Ã¢Å“â€œ All environment variables set

Phase 2: Code Quality
  Ã¢Å“â€œ mypy: No type errors
  Ã¢Å“â€” ruff: 3 issues found (auto-fixed)
  Ã¢Å“â€œ black: No formatting issues
  Ã¢Å“â€œ isort: Imports properly sorted
  Ã¢Å“â€œ manage.py check: No issues

Phase 3: Migrations
  Ã¢Å“â€œ No unapplied migrations
  Ã¢Å“â€œ No migration conflicts
  Ã¢Å“â€œ All models have migrations

Phase 4: Tests + Coverage
  Tests: 247 passed, 0 failed, 5 skipped
  Coverage:
    Overall: 87%
    users: 92%
    products: 89%
    orders: 85%
    payments: 91%

Phase 5: Security Scan
  Ã¢Å“â€” pip-audit: 2 vulnerabilities found (fix required)
  Ã¢Å“â€œ safety check: No issues
  Ã¢Å“â€œ bandit: No security issues
  Ã¢Å“â€œ No secrets detected
  Ã¢Å“â€œ DEBUG = False

Phase 6: Django Commands
  Ã¢Å“â€œ collectstatic completed
  Ã¢Å“â€œ Database integrity OK
  Ã¢Å“â€œ Cache backend reachable

Phase 7: Performance
  Ã¢Å“â€œ No N+1 queries detected
  Ã¢Å“â€œ Database indexes configured
  Ã¢Å“â€œ Query count acceptable

Phase 8: Static Assets
  Ã¢Å“â€œ npm audit: No vulnerabilities
  Ã¢Å“â€œ Assets built successfully
  Ã¢Å“â€œ Static files collected

Phase 9: Configuration
  Ã¢Å“â€œ DEBUG = False
  Ã¢Å“â€œ SECRET_KEY configured
  Ã¢Å“â€œ ALLOWED_HOSTS set
  Ã¢Å“â€œ HTTPS enabled
  Ã¢Å“â€œ HSTS enabled
  Ã¢Å“â€œ Database configured

Phase 10: Logging
  Ã¢Å“â€œ Logging configured
  Ã¢Å“â€œ Log files writable

Phase 11: API Documentation
  Ã¢Å“â€œ Schema generated
  Ã¢Å“â€œ Swagger UI accessible

Phase 12: Diff Review
  Files changed: 12
  +450, -120 lines
  Ã¢Å“â€œ No debug statements
  Ã¢Å“â€œ No hardcoded secrets
  Ã¢Å“â€œ Migrations included

RECOMMENDATION: WARNING: Fix pip-audit vulnerabilities before deploying

NEXT STEPS:
1. Update vulnerable dependencies
2. Re-run security scan
3. Deploy to staging for final testing
```

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Repository-owned coverage requirements are met
- [ ] No security vulnerabilities
- [ ] No unapplied migrations
- [ ] DEBUG = False in production settings
- [ ] SECRET_KEY properly configured
- [ ] ALLOWED_HOSTS set correctly
- [ ] Database backups enabled
- [ ] Static files collected and served
- [ ] Logging configured and working
- [ ] Error monitoring (Sentry, etc.) configured
- [ ] CDN configured (if applicable)
- [ ] Redis/cache backend configured
- [ ] Celery workers running (if applicable)
- [ ] HTTPS/SSL configured
- [ ] Environment variables documented

## Continuous Integration

### GitHub Actions Example

```yaml
# .github/workflows/django-verification.yml
name: Django Verification

on: [push, pull_request]

jobs:
  verify:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Cache pip
        uses: actions/cache@v3
        with:
          path: ~/.cache/pip
          key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}

      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install ruff black mypy pytest pytest-django pytest-cov bandit safety pip-audit

      - name: Code quality checks
        run: |
          ruff check .
          black . --check
          isort . --check-only
          mypy .

      - name: Security scan
        run: |
          bandit -r . -f json -o bandit-report.json
          safety check --full-report
          pip-audit

      - name: Run tests
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test
          DJANGO_SECRET_KEY: test-secret-key
        run: |
          pytest --cov=apps --cov-report=xml --cov-report=term-missing

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## Quick Reference

| Check | Command |
|-------|---------|
| Environment | `python --version` |
| Type checking | `mypy .` |
| Linting | `ruff check .` |
| Formatting | `black . --check` |
| Migrations | `python manage.py makemigrations --check` |
| Tests | `pytest --cov=apps` |
| Security | `pip-audit && bandit -r .` |
| Django check | `python manage.py check --deploy` |
| Collectstatic | `python manage.py collectstatic --noinput` |
| Diff stats | `git diff --stat` |

Remember: Automated verification catches common issues but doesn't replace manual code review and testing in staging environment.
