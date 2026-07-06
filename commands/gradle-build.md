---
description: Fix Gradle build errors for Android and KMP projects
---

# Gradle Build Fix

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
