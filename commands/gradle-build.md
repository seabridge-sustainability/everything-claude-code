---
description: Fix Gradle build errors for Android and KMP projects
---

# Gradle Build Fix

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


Incrementally fix Gradle build and compilation errors for Android and Kotlin Multiplatform projects.

## Step 1: Detect Build Configuration

Identify the project type and run the appropriate build:

| Indicator | Build Command |
|-----------|---------------|
| `build.gradle.kts` + `composeApp/` (KMP) | `./gradlew composeApp:compileKotlinMetadata 2>&1` |
| `build.gradle.kts` + `app/` (Android) | `./gradlew app:compileDebugKotlin 2>&1` |
| `settings.gradle.kts` with modules | `./gradlew assemble 2>&1` |
| Detekt configured | `./gradlew detekt 2>&1` |

Also check `gradle.properties` and `local.properties` for configuration.

## Step 2: Parse and Group Errors

1. Run the build command and capture output
2. Separate Kotlin compilation errors from Gradle configuration errors
3. Group by module and file path
4. Sort: configuration errors first, then compilation errors by dependency order

## Step 3: Fix Loop

For each error:

1. **Read the file** — Full context around the error line
2. **Diagnose** — Common categories:
   - Missing import or unresolved reference
   - Type mismatch or incompatible types
   - Missing dependency in `build.gradle.kts`
   - Expect/actual mismatch (KMP)
   - Compose compiler error
3. **Fix minimally** — Smallest change that resolves the error
4. **Re-run build** — Verify fix and check for new errors
5. **Continue** — Move to next error

## Step 4: Guardrails

Stop and ask the user if:
- Fix introduces more errors than it resolves
- Same error persists after 3 attempts
- Error requires adding new dependencies or changing module structure
- Gradle sync itself fails (configuration-phase error)
- Error is in generated code (Room, SQLDelight, KSP)

## Step 5: Summary

Report:
- Errors fixed (module, file, description)
- Errors remaining
- New errors introduced (should be zero)
- Suggested next steps

## Common Gradle/KMP Fixes

| Error | Fix |
|-------|-----|
| Unresolved reference in `commonMain` | Check if the dependency is in `commonMain.dependencies {}` |
| Expect declaration without actual | Add `actual` implementation in each platform source set |
| Compose compiler version mismatch | Align Kotlin and Compose compiler versions in `libs.versions.toml` |
| Duplicate class | Check for conflicting dependencies with `./gradlew dependencies` |
| KSP error | Run `./gradlew kspCommonMainKotlinMetadata` to regenerate |
| Configuration cache issue | Check for non-serializable task inputs |

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
