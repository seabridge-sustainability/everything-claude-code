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
