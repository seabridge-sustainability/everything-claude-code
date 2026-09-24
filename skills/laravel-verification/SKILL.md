---
name: laravel-verification
description: "Verification loop for Laravel projects: env checks, linting, static analysis, tests with coverage, security scans, and deployment readiness. Use when verifying a Laravel project before merge or deploy — lint, static analysis, tests, coverage, security."
metadata:
  origin: ECC
---

# Laravel Verification Loop

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


Run before PRs, after major changes, and pre-deploy.

## When to Use

- Before opening a pull request for a Laravel project
- After major refactors or dependency upgrades
- Pre-deployment verification for staging or production
- Running full lint -> test -> security -> deploy readiness pipeline

## How It Works

- Run phases sequentially from environment checks through deployment readiness so each layer builds on the last.
- Environment and Composer checks gate everything else; stop immediately if they fail.
- Linting/static analysis should be clean before running full tests and coverage.
- Security and migration reviews happen after tests so you verify behavior before data or release steps.
- Build/deploy readiness and queue/scheduler checks are final gates; any failure blocks release.

## Phase 1: Environment Checks

```bash
php -v
composer --version
php artisan --version
```

- Verify `.env` is present and required keys exist
- Confirm `APP_DEBUG=false` for production environments
- Confirm `APP_ENV` matches the target deployment (`production`, `staging`)

If using Laravel Sail locally:

```bash
./vendor/bin/sail php -v
./vendor/bin/sail artisan --version
```

## Phase 1.5: Composer and Autoload

```bash
composer validate
composer dump-autoload -o
```

## Phase 2: Linting and Static Analysis

```bash
vendor/bin/pint --test
vendor/bin/phpstan analyse
```

If your project uses Psalm instead of PHPStan:

```bash
vendor/bin/psalm
```

## Phase 3: Tests and Coverage

```bash
php artisan test
```

Coverage (CI):

```bash
XDEBUG_MODE=coverage php artisan test --coverage
```

CI example (format -> static analysis -> tests):

```bash
vendor/bin/pint --test
vendor/bin/phpstan analyse
XDEBUG_MODE=coverage php artisan test --coverage
```

## Phase 4: Security and Dependency Checks

```bash
composer audit
```

## Phase 5: Database and Migrations

```bash
php artisan migrate --pretend
php artisan migrate:status
```

- Review destructive migrations carefully
- Ensure migration filenames follow `Y_m_d_His_*` (e.g., `2025_03_14_154210_create_orders_table.php`) and describe the change clearly
- Ensure rollbacks are possible
- Verify `down()` methods and avoid irreversible data loss without explicit backups

## Phase 6: Build and Deployment Readiness

```bash
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

- Ensure cache warmups succeed in production configuration
- Verify queue workers and scheduler are configured
- Confirm `storage/` and `bootstrap/cache/` are writable in the target environment

## Phase 7: Queue and Scheduler Checks

```bash
php artisan schedule:list
php artisan queue:failed
```

If Horizon is used:

```bash
php artisan horizon:status
```

If `queue:monitor` is available, use it to check backlog without processing jobs:

```bash
php artisan queue:monitor default --max=100
```

Active verification (staging only): dispatch a no-op job to a dedicated queue and run a single worker to process it (ensure a non-`sync` queue connection is configured).

```bash
php artisan tinker --execute="dispatch((new App\\Jobs\\QueueHealthcheck())->onQueue('healthcheck'))"
php artisan queue:work --once --queue=healthcheck
```

Verify the job produced the expected side effect (log entry, healthcheck table row, or metric).

Only run this on non-production environments where processing a test job is safe.

## Examples

Minimal flow:

```bash
php -v
composer --version
php artisan --version
composer validate
vendor/bin/pint --test
vendor/bin/phpstan analyse
php artisan test
composer audit
php artisan migrate --pretend
php artisan config:cache
php artisan queue:failed
```

CI-style pipeline:

```bash
composer validate
composer dump-autoload -o
vendor/bin/pint --test
vendor/bin/phpstan analyse
XDEBUG_MODE=coverage php artisan test --coverage
composer audit
php artisan migrate --pretend
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan schedule:list
```
