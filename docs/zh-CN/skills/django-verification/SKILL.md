---
name: django-verification
description: "DjangoÃ©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€žÃ©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯Ã¯Â¼Å¡Ã¨Â¿ÂÃ§Â§Â»Ã£â‚¬ÂÃ¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã£â‚¬ÂÃ¥Â¸Â¦Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂÃ¯Â¼Å’Ã¤Â»Â¥Ã¥ÂÅ Ã¥Å“Â¨Ã¥Ââ€˜Ã¥Â¸Æ’Ã¦Ë†â€“PRÃ¥â€°ÂÃ§Å¡â€žÃ©Æ’Â¨Ã§Â½Â²Ã¥Â°Â±Ã§Â»ÂªÃ¦Â£â‚¬Ã¦Å¸Â¥Ã£â‚¬â€š"
origin: ECC
---

# Django Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯

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


Ã¥Å“Â¨Ã¥Ââ€˜Ã¨ÂµÂ· PR Ã¤Â¹â€¹Ã¥â€°ÂÃ£â‚¬ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã©â€¡ÂÃ¥Â¤Â§Ã¦â€ºÂ´Ã¦â€Â¹Ã¤Â¹â€¹Ã¥ÂÅ½Ã¤Â»Â¥Ã¥ÂÅ Ã©Æ’Â¨Ã§Â½Â²Ã¤Â¹â€¹Ã¥â€°ÂÃ¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å’Ã¤Â»Â¥Ã§Â¡Â®Ã¤Â¿Â Django Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ§Å¡â€žÃ¨Â´Â¨Ã©â€¡ÂÃ¥â€™Å’Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¦Â¿â‚¬Ã¦Â´Â»

* Ã¥Å“Â¨Ã¤Â¸ÂºÃ¤Â¸â‚¬Ã¤Â¸Âª Django Ã©Â¡Â¹Ã§â€ºÂ®Ã¥Â¼â‚¬Ã¥ÂÂ¯Ã¦â€¹â€°Ã¥Ââ€“Ã¨Â¯Â·Ã¦Â±â€šÃ¤Â¹â€¹Ã¥â€°Â
* Ã¥Å“Â¨Ã©â€¡ÂÃ¥Â¤Â§Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥ÂËœÃ¦â€ºÂ´Ã£â‚¬ÂÃ¨Â¿ÂÃ§Â§Â»Ã¦â€ºÂ´Ã¦â€“Â°Ã¦Ë†â€“Ã¤Â¾ÂÃ¨Âµâ€“Ã¥Ââ€¡Ã§ÂºÂ§Ã¤Â¹â€¹Ã¥ÂÅ½
* Ã§â€Â¨Ã¤ÂºÅ½Ã¦Å¡â€šÃ¥Â­ËœÃ¦Ë†â€“Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã§Å¡â€žÃ©Â¢â€žÃ©Æ’Â¨Ã§Â½Â²Ã©ÂªÅ’Ã¨Â¯Â
* Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ§Å½Â¯Ã¥Â¢Æ’ Ã¢â€ â€™ Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥ Ã¢â€ â€™ Ã¦Âµâ€¹Ã¨Â¯â€¢ Ã¢â€ â€™ Ã¥Â®â€°Ã¥â€¦Â¨ Ã¢â€ â€™ Ã©Æ’Â¨Ã§Â½Â²Ã¥Â°Â±Ã§Â»ÂªÃ¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿Ã¦â€”Â¶
* Ã©ÂªÅ’Ã¨Â¯ÂÃ¨Â¿ÂÃ§Â§Â»Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€™Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¦â€”Â¶

## Ã©ËœÂ¶Ã¦Â®Âµ 1: Ã§Å½Â¯Ã¥Â¢Æ’Ã¦Â£â‚¬Ã¦Å¸Â¥

```bash
# Verify Python version
python --version  # Should match project requirements

# Check virtual environment
which python
pip list --outdated

# Verify environment variables
python -c "import os; import environ; print('DJANGO_SECRET_KEY set' if os.environ.get('DJANGO_SECRET_KEY') else 'MISSING: DJANGO_SECRET_KEY')"
```

Ã¥Â¦â€šÃ¦Å¾Å“Ã§Å½Â¯Ã¥Â¢Æ’Ã©â€¦ÂÃ§Â½Â®Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å’Ã¨Â¯Â·Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Â¹Â¶Ã¤Â¿Â®Ã¥Â¤ÂÃ£â‚¬â€š

## Ã©ËœÂ¶Ã¦Â®Âµ 2: Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡ÂÃ¤Â¸Å½Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

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

Ã¥Â¸Â¸Ã¨Â§ÂÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å¡

* Ã¥â€¦Â¬Ã¥â€¦Â±Ã¥â€¡Â½Ã¦â€¢Â°Ã§Â¼ÂºÃ¥Â°â€˜Ã§Â±Â»Ã¥Å¾â€¹Ã¦ÂÂÃ§Â¤Âº
* Ã¨Â¿ÂÃ¥ÂÂ PEP 8 Ã¦Â Â¼Ã¥Â¼ÂÃ¨Â§â€žÃ¨Å’Æ’
* Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¦Å“ÂªÃ¦Å½â€™Ã¥ÂºÂ
* Ã§â€Å¸Ã¤ÂºÂ§Ã©â€¦ÂÃ§Â½Â®Ã¤Â¸Â­Ã©Ââ€”Ã§â€¢â„¢Ã¨Â°Æ’Ã¨Â¯â€¢Ã¨Â®Â¾Ã§Â½Â®

## Ã©ËœÂ¶Ã¦Â®Âµ 3: Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¨Â¿ÂÃ§Â§Â»

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

Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

* Ã¥Â¾â€¦Ã¥Âºâ€Ã§â€Â¨Ã§Å¡â€žÃ¨Â¿ÂÃ§Â§Â»Ã¦â€¢Â°Ã©â€¡Â
* Ã¤Â»Â»Ã¤Â½â€¢Ã¨Â¿ÂÃ§Â§Â»Ã¥â€ Â²Ã§ÂªÂ
* Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¦â€ºÂ´Ã¦â€Â¹Ã¦Å“ÂªÃ§â€Å¸Ã¦Ë†ÂÃ¨Â¿ÂÃ§Â§Â»

## Ã©ËœÂ¶Ã¦Â®Âµ 4: Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Å½Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

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

Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

* Ã¦â‚¬Â»Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€¢Â°Ã¯Â¼Å¡X Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼Å’Y Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’Z Ã¨Â·Â³Ã¨Â¿â€¡
* Ã¦â‚¬Â»Ã¤Â½â€œÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Å¡XX%
* Ã¦Å’â€°Ã¥Âºâ€Ã§â€Â¨Ã¥Ë†â€™Ã¥Ë†â€ Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¦ËœÅ½Ã§Â»â€ 

Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã§â€ºÂ®Ã¦Â â€¡Ã¯Â¼Å¡

| Ã§Â»â€žÃ¤Â»Â¶ | Ã§â€ºÂ®Ã¦Â â€¡ |
|-----------|--------|
| Ã¦Â¨Â¡Ã¥Å¾â€¹ | 90%+ |
| Ã¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“Ã¥â„¢Â¨ | 85%+ |
| Ã¨Â§â€ Ã¥â€ºÂ¾ | 80%+ |
| Ã¦Å“ÂÃ¥Å Â¡ | 90%+ |
| Ã¦â‚¬Â»Ã¤Â½â€œ | 80%+ |

## Ã©ËœÂ¶Ã¦Â®Âµ 5: Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂ

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

Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

* Ã¥Ââ€˜Ã§Å½Â°Ã¦Ëœâ€œÃ¥Ââ€”Ã¦â€Â»Ã¥â€¡Â»Ã§Å¡â€žÃ¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹
* Ã¥Â®â€°Ã¥â€¦Â¨Ã©â€¦ÂÃ§Â½Â®Ã©â€”Â®Ã©Â¢Ëœ
* Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¥Ë†Â°Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ§Å¡â€žÃ¥Â¯â€ Ã©â€™Â¥
* DEBUG Ã¦Â¨Â¡Ã¥Â¼ÂÃ§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Ë†Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­Ã¥Âºâ€Ã¤Â¸Âº FalseÃ¯Â¼â€°

## Ã©ËœÂ¶Ã¦Â®Âµ 6: Django Ã§Â®Â¡Ã§Ââ€ Ã¥â€˜Â½Ã¤Â»Â¤

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

## Ã©ËœÂ¶Ã¦Â®Âµ 7: Ã¦â‚¬Â§Ã¨Æ’Â½Ã¦Â£â‚¬Ã¦Å¸Â¥

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

Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

* Ã¦Â¯ÂÃ©Â¡ÂµÃ¦Å¸Â¥Ã¨Â¯Â¢Ã¦Â¬Â¡Ã¦â€¢Â°Ã¯Â¼Ë†Ã¥â€¦Â¸Ã¥Å¾â€¹Ã©Â¡ÂµÃ©ÂÂ¢Ã¥Âºâ€ < 50Ã¯Â¼â€°
* Ã§Â¼ÂºÃ¥Â°â€˜Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ§Â´Â¢Ã¥Â¼â€¢
* Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¥Ë†Â°Ã©â€¡ÂÃ¥Â¤ÂÃ¦Å¸Â¥Ã¨Â¯Â¢

## Ã©ËœÂ¶Ã¦Â®Âµ 8: Ã©Ââ„¢Ã¦â‚¬ÂÃ¨Âµâ€žÃ¦ÂºÂ

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

## Ã©ËœÂ¶Ã¦Â®Âµ 9: Ã©â€¦ÂÃ§Â½Â®Ã¥Â®Â¡Ã¦Å¸Â¥

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

## Ã©ËœÂ¶Ã¦Â®Âµ 10: Ã¦â€”Â¥Ã¥Â¿â€”Ã©â€¦ÂÃ§Â½Â®

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

## Ã©ËœÂ¶Ã¦Â®Âµ 11: API Ã¦â€“â€¡Ã¦Â¡Â£Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã¤Â½Â¿Ã§â€Â¨ DRFÃ¯Â¼â€°

```bash
# Generate schema
python manage.py generateschema --format openapi-json > schema.json

# Validate schema
# Check if schema.json is valid JSON
python -c "import json; json.load(open('schema.json'))"

# Access Swagger UI (if using drf-yasg)
# Visit http://localhost:8000/swagger/ in browser
```

## Ã©ËœÂ¶Ã¦Â®Âµ 12: Ã¥Â·Â®Ã¥Â¼â€šÃ¥Â®Â¡Ã¦Å¸Â¥

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

Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢Ã¯Â¼Å¡

* Ã¦â€”Â Ã¨Â°Æ’Ã¨Â¯â€¢Ã¨Â¯Â­Ã¥ÂÂ¥Ã¯Â¼Ë†print, pdb, breakpoint()Ã¯Â¼â€°
* Ã¥â€¦Â³Ã©â€Â®Ã¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¦â€”Â  TODO/FIXME Ã¦Â³Â¨Ã©â€¡Å 
* Ã¦â€”Â Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ§Å¡â€žÃ¥Â¯â€ Ã©â€™Â¥Ã¦Ë†â€“Ã¥â€¡Â­Ã¨Â¯Â
* Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¦â€ºÂ´Ã¦â€Â¹Ã¥Å’â€¦Ã¥ÂÂ«Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¨Â¿ÂÃ§Â§Â»
* Ã©â€¦ÂÃ§Â½Â®Ã¦â€ºÂ´Ã¦â€Â¹Ã¥Â·Â²Ã¨Â®Â°Ã¥Â½â€¢
* Ã¥Â¤â€“Ã©Æ’Â¨Ã¨Â°Æ’Ã§â€Â¨Ã¥Â­ËœÃ¥Å“Â¨Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 
* Ã©Å“â‚¬Ã¨Â¦ÂÃ¦â€”Â¶Ã¥Â·Â²Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Âºâ€¹Ã¥Å Â¡Ã§Â®Â¡Ã§Ââ€ 

## Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â¨Â¡Ã¦ÂÂ¿

```
DJANGO Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Å Â¥Ã¥â€˜Å 
==========================

Ã©ËœÂ¶Ã¦Â®Âµ 1Ã¯Â¼Å¡Ã§Å½Â¯Ã¥Â¢Æ’Ã¦Â£â‚¬Ã¦Å¸Â¥
  Ã¢Å“â€œ Python 3.11.5
  Ã¢Å“â€œ Ã¨â„¢Å¡Ã¦â€¹Å¸Ã§Å½Â¯Ã¥Â¢Æ’Ã¥Â·Â²Ã¦Â¿â‚¬Ã¦Â´Â»
  Ã¢Å“â€œ Ã¦â€°â‚¬Ã¦Å“â€°Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¥Â·Â²Ã¨Â®Â¾Ã§Â½Â®

Ã©ËœÂ¶Ã¦Â®Âµ 2Ã¯Â¼Å¡Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡Â
  Ã¢Å“â€œ mypy: Ã¦â€”Â Ã§Â±Â»Ã¥Å¾â€¹Ã©â€â„¢Ã¨Â¯Â¯
  Ã¢Å“â€” ruff: Ã¥Ââ€˜Ã§Å½Â° 3 Ã¤Â¸ÂªÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†Ã¥Â·Â²Ã¨â€¡ÂªÃ¥Å Â¨Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼â€°
  Ã¢Å“â€œ black: Ã¦â€”Â Ã¦Â Â¼Ã¥Â¼ÂÃ©â€”Â®Ã©Â¢Ëœ
  Ã¢Å“â€œ isort: Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¥Â·Â²Ã¦Â­Â£Ã§Â¡Â®Ã¦Å½â€™Ã¥ÂºÂ
  Ã¢Å“â€œ manage.py check: Ã¦â€”Â Ã©â€”Â®Ã©Â¢Ëœ

Ã©ËœÂ¶Ã¦Â®Âµ 3Ã¯Â¼Å¡Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¨Â¿ÂÃ§Â§Â»
  Ã¢Å“â€œ Ã¦â€”Â Ã¦Å“ÂªÃ¥Âºâ€Ã§â€Â¨Ã§Å¡â€žÃ¨Â¿ÂÃ§Â§Â»
  Ã¢Å“â€œ Ã¦â€”Â Ã¨Â¿ÂÃ§Â§Â»Ã¥â€ Â²Ã§ÂªÂ
  Ã¢Å“â€œ Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥Ââ€¡Ã¦Å“â€°Ã¥Â¯Â¹Ã¥Âºâ€Ã§Å¡â€žÃ¨Â¿ÂÃ§Â§Â»Ã¦â€“â€¡Ã¤Â»Â¶

Ã©ËœÂ¶Ã¦Â®Âµ 4Ã¯Â¼Å¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Å½Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡
  Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å¡247 Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼Å’0 Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’5 Ã¨Â·Â³Ã¨Â¿â€¡
  Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Å¡
    Ã¦â‚¬Â»Ã¨Â®Â¡Ã¯Â¼Å¡87%
    users: 92%
    products: 89%
    orders: 85%
    payments: 91%

Ã©ËœÂ¶Ã¦Â®Âµ 5Ã¯Â¼Å¡Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂ
  Ã¢Å“â€” pip-audit: Ã¥Ââ€˜Ã§Å½Â° 2 Ã¤Â¸ÂªÃ¦Â¼ÂÃ¦Â´Å¾Ã¯Â¼Ë†Ã©Å“â‚¬Ã¨Â¦ÂÃ¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼â€°
  Ã¢Å“â€œ safety check: Ã¦â€”Â Ã©â€”Â®Ã©Â¢Ëœ
  Ã¢Å“â€œ bandit: Ã¦â€”Â Ã¥Â®â€°Ã¥â€¦Â¨Ã©â€”Â®Ã©Â¢Ëœ
  Ã¢Å“â€œ Ã¦Å“ÂªÃ¦Â£â‚¬Ã¦Âµâ€¹Ã¥Ë†Â°Ã¥Â¯â€ Ã©â€™Â¥Ã¦Â³â€žÃ©Å“Â²
  Ã¢Å“â€œ DEBUG = False

Ã©ËœÂ¶Ã¦Â®Âµ 6Ã¯Â¼Å¡Django Ã¥â€˜Â½Ã¤Â»Â¤
  Ã¢Å“â€œ collectstatic Ã¥Â®Å’Ã¦Ë†Â
  Ã¢Å“â€œ Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¥Â®Å’Ã¦â€¢Â´Ã¦â‚¬Â§Ã¦Â­Â£Ã¥Â¸Â¸
  Ã¢Å“â€œ Ã§Â¼â€œÃ¥Â­ËœÃ¥ÂÅ½Ã§Â«Â¯Ã¥ÂÂ¯Ã¨Â®Â¿Ã©â€”Â®

Ã©ËœÂ¶Ã¦Â®Âµ 7Ã¯Â¼Å¡Ã¦â‚¬Â§Ã¨Æ’Â½
  Ã¢Å“â€œ Ã¦Å“ÂªÃ¦Â£â‚¬Ã¦Âµâ€¹Ã¥Ë†Â° N+1 Ã¦Å¸Â¥Ã¨Â¯Â¢
  Ã¢Å“â€œ Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ§Â´Â¢Ã¥Â¼â€¢Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®
  Ã¢Å“â€œ Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¦â€¢Â°Ã©â€¡ÂÃ¥ÂÂ¯Ã¦Å½Â¥Ã¥Ââ€”

Ã©ËœÂ¶Ã¦Â®Âµ 8Ã¯Â¼Å¡Ã©Ââ„¢Ã¦â‚¬ÂÃ¨Âµâ€žÃ¦ÂºÂ
  Ã¢Å“â€œ npm audit: Ã¦â€”Â Ã¦Â¼ÂÃ¦Â´Å¾
  Ã¢Å“â€œ Ã¨Âµâ€žÃ¦ÂºÂÃ¦Å¾â€žÃ¥Â»ÂºÃ¦Ë†ÂÃ¥Å Å¸
  Ã¢Å“â€œ Ã©Ââ„¢Ã¦â‚¬ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¥Â·Â²Ã¦â€Â¶Ã©â€ºâ€ 

Ã©ËœÂ¶Ã¦Â®Âµ 9Ã¯Â¼Å¡Ã©â€¦ÂÃ§Â½Â®
  Ã¢Å“â€œ DEBUG = False
  Ã¢Å“â€œ SECRET_KEY Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®
  Ã¢Å“â€œ ALLOWED_HOSTS Ã¥Â·Â²Ã¨Â®Â¾Ã§Â½Â®
  Ã¢Å“â€œ HTTPS Ã¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨
  Ã¢Å“â€œ HSTS Ã¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨
  Ã¢Å“â€œ Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¥Â·Â²Ã©â€¦ÂÃ§Â½Â®

Ã©ËœÂ¶Ã¦Â®Âµ 10Ã¯Â¼Å¡Ã¦â€”Â¥Ã¥Â¿â€”
  Ã¢Å“â€œ Ã¦â€”Â¥Ã¥Â¿â€”Ã©â€¦ÂÃ§Â½Â®Ã¥Â®Å’Ã¦Ë†Â
  Ã¢Å“â€œ Ã¦â€”Â¥Ã¥Â¿â€”Ã¦â€“â€¡Ã¤Â»Â¶Ã¥ÂÂ¯Ã¥â€ â„¢Ã¥â€¦Â¥

Ã©ËœÂ¶Ã¦Â®Âµ 11Ã¯Â¼Å¡API Ã¦â€“â€¡Ã¦Â¡Â£
  Ã¢Å“â€œ Ã¦Å¾Â¶Ã¦Å¾â€žÃ¥Â·Â²Ã§â€Å¸Ã¦Ë†Â
  Ã¢Å“â€œ Swagger UI Ã¥ÂÂ¯Ã¨Â®Â¿Ã©â€”Â®

Ã©ËœÂ¶Ã¦Â®Âµ 12Ã¯Â¼Å¡Ã¥Â·Â®Ã¥Â¼â€šÃ¥Â®Â¡Ã¦Å¸Â¥
  Ã¦â€“â€¡Ã¤Â»Â¶Ã¥ÂËœÃ¦â€ºÂ´Ã¯Â¼Å¡12
  Ã¨Â¡Å’Ã¦â€¢Â°Ã¥ÂËœÃ¥Å’â€“Ã¯Â¼Å¡+450, -120
  Ã¢Å“â€œ Ã¦â€”Â Ã¨Â°Æ’Ã¨Â¯â€¢Ã¨Â¯Â­Ã¥ÂÂ¥
  Ã¢Å“â€œ Ã¦â€”Â Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ¥Â¯â€ Ã©â€™Â¥
  Ã¢Å“â€œ Ã¥Å’â€¦Ã¥ÂÂ«Ã¨Â¿ÂÃ§Â§Â»Ã¦â€“â€¡Ã¤Â»Â¶

Ã¥Â»ÂºÃ¨Â®Â®Ã¯Â¼Å¡WARNING: Ã©Æ’Â¨Ã§Â½Â²Ã¥â€°ÂÃ¤Â¿Â®Ã¥Â¤Â pip-audit Ã¥Ââ€˜Ã§Å½Â°Ã§Å¡â€žÃ¦Â¼ÂÃ¦Â´Å¾

Ã¥ÂÅ½Ã§Â»Â­Ã¦Â­Â¥Ã©ÂªÂ¤Ã¯Â¼Å¡
1. Ã¦â€ºÂ´Ã¦â€“Â°Ã¥Â­ËœÃ¥Å“Â¨Ã¦Â¼ÂÃ¦Â´Å¾Ã§Å¡â€žÃ¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹
2. Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂ
3. Ã©Æ’Â¨Ã§Â½Â²Ã¥Ë†Â°Ã©Â¢â€žÃ¥Ââ€˜Ã¥Â¸Æ’Ã§Å½Â¯Ã¥Â¢Æ’Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Å“â‚¬Ã§Â»Ë†Ã¦Âµâ€¹Ã¨Â¯â€¢
```

## Ã©Â¢â€žÃ©Æ’Â¨Ã§Â½Â²Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢

* \[ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
* \[ ] Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡ Ã¢â€°Â¥ 80%
* \[ ] Ã¦â€”Â Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¼ÂÃ¦Â´Å¾
* \[ ] Ã¦â€”Â Ã¦Å“ÂªÃ¥Âºâ€Ã§â€Â¨Ã§Å¡â€žÃ¨Â¿ÂÃ§Â§Â»
* \[ ] Ã§â€Å¸Ã¤ÂºÂ§Ã¨Â®Â¾Ã§Â½Â®Ã¤Â¸Â­ DEBUG = False
* \[ ] SECRET\_KEY Ã¥Â·Â²Ã¦Â­Â£Ã§Â¡Â®Ã©â€¦ÂÃ§Â½Â®
* \[ ] ALLOWED\_HOSTS Ã¨Â®Â¾Ã§Â½Â®Ã¦Â­Â£Ã§Â¡Â®
* \[ ] Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¥Â¤â€¡Ã¤Â»Â½Ã¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨
* \[ ] Ã©Ââ„¢Ã¦â‚¬ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¥Â·Â²Ã¦â€Â¶Ã©â€ºâ€ Ã¥Â¹Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¦Å“ÂÃ¥Å Â¡
* \[ ] Ã¦â€”Â¥Ã¥Â¿â€”Ã©â€¦ÂÃ§Â½Â®Ã¦Â­Â£Ã¥Â¸Â¸Ã¤Â¸â€Ã¦Å“â€°Ã¦â€¢Ë†
* \[ ] Ã©â€â„¢Ã¨Â¯Â¯Ã§â€ºâ€˜Ã¦Å½Â§Ã¯Â¼Ë†Sentry Ã§Â­â€°Ã¯Â¼â€°Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®
* \[ ] CDN Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã©â‚¬â€šÃ§â€Â¨Ã¯Â¼â€°
* \[ ] Redis/Ã§Â¼â€œÃ¥Â­ËœÃ¥ÂÅ½Ã§Â«Â¯Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®
* \[ ] Celery Ã¥Â·Â¥Ã¤Â½Å“Ã¨Â¿â€ºÃ§Â¨â€¹Ã¦Â­Â£Ã¥Å“Â¨Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã©â‚¬â€šÃ§â€Â¨Ã¯Â¼â€°
* \[ ] HTTPS/SSL Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®
* \[ ] Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¥Â·Â²Ã¨Â®Â°Ã¥Â½â€¢

## Ã¦Å’ÂÃ§Â»Â­Ã©â€ºâ€ Ã¦Ë†Â

### GitHub Actions Ã§Â¤ÂºÃ¤Â¾â€¹

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

## Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥Ââ€šÃ¨â‚¬Æ’

| Ã¦Â£â‚¬Ã¦Å¸Â¥Ã©Â¡Â¹ | Ã¥â€˜Â½Ã¤Â»Â¤ |
|-------|---------|
| Ã§Å½Â¯Ã¥Â¢Æ’ | `python --version` |
| Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥ | `mypy .` |
| Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥ | `ruff check .` |
| Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“ | `black . --check` |
| Ã¨Â¿ÂÃ§Â§Â» | `python manage.py makemigrations --check` |
| Ã¦Âµâ€¹Ã¨Â¯â€¢ | `pytest --cov=apps` |
| Ã¥Â®â€°Ã¥â€¦Â¨ | `pip-audit && bandit -r .` |
| Django Ã¦Â£â‚¬Ã¦Å¸Â¥ | `python manage.py check --deploy` |
| Ã¦â€Â¶Ã©â€ºâ€ Ã©Ââ„¢Ã¦â‚¬ÂÃ¦â€“â€¡Ã¤Â»Â¶ | `python manage.py collectstatic --noinput` |
| Ã¥Â·Â®Ã¥Â¼â€šÃ§Â»Å¸Ã¨Â®Â¡ | `git diff --stat` |

Ã¨Â¯Â·Ã¨Â®Â°Ã¤Â½ÂÃ¯Â¼Å¡Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã©ÂªÅ’Ã¨Â¯ÂÃ¥ÂÂ¯Ã¤Â»Â¥Ã¥Ââ€˜Ã§Å½Â°Ã¥Â¸Â¸Ã¨Â§ÂÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¤Â½â€ Ã¤Â¸ÂÃ¨Æ’Â½Ã¦â€ºÂ¿Ã¤Â»Â£Ã¥Å“Â¨Ã©Â¢â€žÃ¥Ââ€˜Ã¥Â¸Æ’Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­Ã§Å¡â€žÃ¦â€°â€¹Ã¥Å Â¨Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¥â€™Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€š
