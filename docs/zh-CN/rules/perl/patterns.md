---
paths:
  - "**/*.pl"
  - "**/*.pm"
  - "**/*.t"
  - "**/*.psgi"
  - "**/*.cgi"
---

# Perl Ã¦Â¨Â¡Ã¥Â¼Â

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/patterns.md](../common/patterns.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  Perl Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¤Â»â€œÃ¥â€šÂ¨Ã¦Â¨Â¡Ã¥Â¼Â

Ã¥Å“Â¨Ã¦Å½Â¥Ã¥ÂÂ£Ã¨Æ’Å’Ã¥ÂÅ½Ã¤Â½Â¿Ã§â€Â¨ **DBI** Ã¦Ë†â€“ **DBIx::Class**Ã¯Â¼Å¡

```perl
package MyApp::Repo::User;
use Moo;

has dbh => (is => 'ro', required => 1);

sub find_by_id ($self, $id) {
    my $sth = $self->dbh->prepare('SELECT * FROM users WHERE id = ?');
    $sth->execute($id);
    return $sth->fetchrow_hashref;
}
```

## DTOs / Ã¥â‚¬Â¼Ã¥Â¯Â¹Ã¨Â±Â¡

Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¸Â¦Ã¦Å“â€° **Types::Standard** Ã§Å¡â€ž **Moo** Ã§Â±Â»Ã¯Â¼Ë†Ã§â€ºÂ¸Ã¥Â½â€œÃ¤ÂºÅ½ Python Ã§Å¡â€ž dataclassesÃ¯Â¼â€°Ã¯Â¼Å¡

```perl
package MyApp::DTO::User;
use Moo;
use Types::Standard qw(Str Int);

has name  => (is => 'ro', isa => Str, required => 1);
has email => (is => 'ro', isa => Str, required => 1);
has age   => (is => 'ro', isa => Int);
```

## Ã¨Âµâ€žÃ¦ÂºÂÃ§Â®Â¡Ã§Ââ€ 

* Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨ **Ã¤Â¸â€°Ã¥Ââ€šÃ¦â€¢Â° open** Ã©â€¦ÂÃ¥ÂË† `autodie`
* Ã¤Â½Â¿Ã§â€Â¨ **Path::Tiny** Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦â€“â€¡Ã¤Â»Â¶Ã¦â€œÂÃ¤Â½Å“

```perl
use autodie;
use Path::Tiny;

my $content = path('config.json')->slurp_utf8;
```

## Ã¦Â¨Â¡Ã¥Ââ€”Ã¦Å½Â¥Ã¥ÂÂ£

Ã¤Â½Â¿Ã§â€Â¨ `Exporter 'import'` Ã©â€¦ÂÃ¥ÂË† `@EXPORT_OK` Ã¢â‚¬â€ Ã§Â»ÂÃ¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ `@EXPORT`Ã¯Â¼Å¡

```perl
use Exporter 'import';
our @EXPORT_OK = qw(parse_config validate_input);
```

## Ã¤Â¾ÂÃ¨Âµâ€“Ã§Â®Â¡Ã§Ââ€ 

Ã¤Â½Â¿Ã§â€Â¨ **cpanfile** + **carton** Ã¤Â»Â¥Ã¥Â®Å¾Ã§Å½Â°Ã¥ÂÂ¯Ã¥Â¤ÂÃ§Å½Â°Ã§Å¡â€žÃ¥Â®â€°Ã¨Â£â€¦Ã¯Â¼Å¡

```bash
carton install
carton exec prove -lr t/
```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`perl-patterns` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ§Å½Â°Ã¤Â»Â£ Perl Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥â€™Å’Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢Ã£â‚¬â€š
