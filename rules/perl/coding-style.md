---
paths:
  - "**/*.pl"
  - "**/*.pm"
  - "**/*.t"
  - "**/*.psgi"
  - "**/*.cgi"
---
# Perl Coding Style

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


> This file extends [common/coding-style.md](../common/coding-style.md) with Perl-specific content.

## Standards

- Always `use v5.36` (enables `strict`, `warnings`, `say`, subroutine signatures)
- Use subroutine signatures Ã¢â‚¬â€ never unpack `@_` manually
- Prefer `say` over `print` with explicit newlines

## Immutability

- Use **Moo** with `is => 'ro'` and `Types::Standard` for all attributes
- Never use blessed hashrefs directly Ã¢â‚¬â€ always use Moo/Moose accessors
- **OO override note**: Moo `has` attributes with `builder` or `default` are acceptable for computed read-only values

## Formatting

Use **perltidy** with these settings:

```
-i=4    # 4-space indent
-l=100  # 100 char line length
-ce     # cuddled else
-bar    # opening brace always right
```

## Linting

Use **perlcritic** at severity 3 with themes: `core`, `pbp`, `security`.

```bash
perlcritic --severity 3 --theme 'core || pbp || security' lib/
```

## Reference

See skill: `perl-patterns` for comprehensive modern Perl idioms and best practices.
