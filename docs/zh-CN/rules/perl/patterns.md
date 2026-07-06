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
