# Deployment Readiness Standard

## Rule: Deployable Services Need Health And Rollback Signals

Required behavior: staging/prod-capable services must document health checks,
required environment variables, migration path, smoke tests, logs, and rollback.

Prohibited behavior: deploying with unknown env requirements, live provider
modes enabled accidentally, or untested migrations.

Automated enforcement: env/document checks, smoke-test scripts, CI gates.

Fallback reviewer: `sea-production-readiness-reviewer`.

## Rule: OSS Packages Must Be Publication-Safe

Required behavior: package privacy, exported files, license, docs, and test
smokes must be validated before publish.

Prohibited behavior: publishing secrets, internal-only docs, broken bins, or
private package flags inconsistent with release intent.
