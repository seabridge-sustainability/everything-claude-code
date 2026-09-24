---
paths:
  - "**/*.pl"
  - "**/*.pm"
  - "**/*.t"
  - "**/*.psgi"
  - "**/*.cgi"
---
# Perl Security

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


> This file extends [common/security.md](../common/security.md) with Perl-specific content.

## Taint Mode

- Use `-T` flag on all CGI/web-facing scripts
- Sanitize `%ENV` (`$ENV{PATH}`, `$ENV{CDPATH}`, etc.) before any external command

## Input Validation

- Use allowlist regex for untainting Ã¢â‚¬â€ never `/(.*)/s`
- Validate all user input with explicit patterns:

```perl
if ($input =~ /\A([a-zA-Z0-9_-]+)\z/) {
    my $clean = $1;
}
```

## File I/O

- **Three-arg open only** Ã¢â‚¬â€ never two-arg open
- Prevent path traversal with `Cwd::realpath`:

```perl
use Cwd 'realpath';
my $safe_path = realpath($user_path);
die "Path traversal" unless $safe_path =~ m{\A/allowed/directory/};
```

## Process Execution

- Use **list-form `system()`** Ã¢â‚¬â€ never single-string form
- Use **IPC::Run3** for capturing output
- Never use backticks with variable interpolation

```perl
system('grep', '-r', $pattern, $directory);  # safe
```

## SQL Injection Prevention

Always use DBI placeholders Ã¢â‚¬â€ never interpolate into SQL:

```perl
my $sth = $dbh->prepare('SELECT * FROM users WHERE email = ?');
$sth->execute($email);
```

## Security Scanning

Run **perlcritic** with the security theme at severity 4+:

```bash
perlcritic --severity 4 --theme security lib/
```

## Reference

See skill: `perl-security` for comprehensive Perl security patterns, taint mode, and safe I/O.
