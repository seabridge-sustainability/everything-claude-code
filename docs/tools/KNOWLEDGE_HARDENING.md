# Knowledge pipeline hardening

## Read and verify

Search source before traversing a graph. A graph is a projection, never the
authority for a code contract. Use `node scripts/knowledge-query.js <repo> <symbol>`
for bounded call-context lookup: at most 8,000 output characters, a 15-second
subprocess timeout, no shell or model calls. Exit 3 denotes incomplete/truncated
output, not successful coverage. The character cap is not an exact token cap.

`knowledge-freshness.js boundary <repo>` validates the exclusion configuration;
`artifact-boundary <repo>` also validates graph source paths. Both return nonzero
on failure. Exclusions are monotonic: all negations are rejected, including ones
that would be benign, rather than trying to emulate every Graphify glob rule.
Missing/absolute/escaping or excluded graph source paths require review before
ingestion. This is a path boundary, not semantic data-loss prevention.

Manual `build` receipts include a conservative source/config fingerprint and a
graph digest. Changes during a build prevent a verified receipt. Legacy graphs
without verified v3 receipts report unknown and require rebuilding. The hook and
manual builder share snapshot/stamp commands. Fingerprints cover a conservative
superset of git-visible, nonexcluded inputs so new extractor formats cannot evade
the gate. Source symlinks require scoped verification and are rejected. The
fingerprint may invalidate a graph for files excluded by custom Graphify rules.
Do not equate a clean git commit with scientific or business correctness.
For the large backend graph, `build <repo> --no-viz` invokes that repository's
no-HTML AST rebuild helper and still verifies the same before/after fingerprint
and v3 receipt. It requires a compatible Graphify interpreter distinct from
the backend venv, but performs no installation or LLM call. The helper sets
Graphify's documented `GRAPHIFY_VIZ_NODE_LIMIT=0`; this removes only the
generated `graph.html` visualization when present. Hyperedges and simultaneous nonempty `links`/`edges`
representations are rejected until their provenance and completeness are reviewed.

When Graphify reports no extraction changes, a verified no-op preserves the
original extraction `sourceCommit` and records the checked `verifiedSourceCommit`
separately. This requires an unchanged graph digest across the build and stable
source fingerprints; it does not invent a new extraction result.
AST-only stamping rejects semantic or unknown-origin nodes and edges. Graphify
may preserve those during a local update; they need separately scoped extraction
verification, not a new whole-graph freshness claim or an automatic paid rebuild.

Current wiki pages bind every cited source with `source_hashes:` entries in the
form `sha256:<64 lowercase hex> <source>` matching `sources:`. Missing hashes
report `unknown`; changed/missing/dirty sources report `stale`. Dated records
and superseded pages report `historical`, never `fresh` current guidance.
`wiki-hashes <workspace>` prints
read-only hash proposals marked `reviewed: false`; review each page against its
sources before adopting a proposal. A digest shows content identity, not that
the page's interpretation is correct.

## Hooks and loaders

The hook template resolves the shared validator from the repository, a sibling
ECC checkout, or explicit `GRAPHIFY_BOUNDARY_CHECK`. Missing Node or validator
fails closed; nothing is installed automatically. Test copied hooks in a
throwaway repository before replacing any installed hook, and preserve custom
hook content. Code changes are computed against the last graph commit, with
NUL-safe path handling. The Graphify Python path does not queue on its internal
build lock; skipped work is recovered by a later hook or manual freshness check.
This is not a background retry service. The CLI fallback has weaker concurrency
guarantees and should not be used for unattended high-volume commits.

Snapshot loaders must validate the same artifact boundary before database writes,
reject conflicting metadata and missing/duplicate endpoints, refuse to merge into
an existing graph, and publish verified metadata only after count checks. Stage a
new explicitly named generation; do not delete or clear an old index. Any live
load, client-name cutover, rollback, and eventual cleanup need the owner's scoped
approval. Offline fake-DB tests are not proof of real database transaction or
reader behavior. Existing clients do not automatically follow new generation names.
The backend `graphify_and_load.ps1 -Generation <id>` is the safe no-viz entrypoint:
it refuses an older shared ECC validator and needs an explicit new generation.
`-EccRoot` can select a reviewed ECC worktree when the shared checkout has not
been aligned. `-GraphifyPython` selects the installed extractor, preflighted
before the build; the backend venv remains the loader interpreter. The local
pipx Graphify passed a real tiny no-viz AST fixture. `load_all_repos_to_falkordb.py`
requires `--generation`, and `--repo-path` requires a single `--only` target
from the same Git repository. Neither command cuts consumers
over to the new name.

`agentic-stack/falkordb_smoke.py` uses read-only, bounded queries. Default success
is availability/provenance only. `--expected-snapshots <private-json>` additionally
requires exact source commits, graph SHA-256 digests, verified status, and counts.
The JSON maps selected base or generation graph names to `source_commit` and `graph_sha256`.
Generate it from a separately verified intended snapshot, never from whichever
metadata happens to be live. Staged generations are recognized but not automatically
accepted. A subset manifest checks only those selected graphs; cross-graph probes
require both backend and frontend. Configure client graph names during an approved
generation cutover. Common labels do not prove API compatibility. Metadata/count
verification does not re-hash stored node properties or edge contents; tamper
detection needs a separate content audit.

## Phased adoption

1. Run the registry, freshness, hook, query, and smoke-contract tests locally.
2. Validate the loader against synthetic snapshots, then obtain approval for a
   non-production real-database generation/cutover test before production use.
3. Align shared checkouts and installed hook identities without overwriting
   concurrent work. Keep public schemas generic and private inventories private.
4. Configure the private memory-root override and a read-only freshness report.
   Project scope is isolated by repository Git common directory; team scope is
   shared across repositories. Keep the root out of public Git history. Do not
   schedule rebuilds or new CI matrices.
5. Benchmark at least ten real code questions against the same snapshot before
   adding an orientation index or retiring a graph store. Measure correctness,
   false positives, elapsed time and output size, not only query speed.

The first ten-question local location benchmark is recorded in
`docs/reports/knowledge/2026-09-30-local-retrieval-benchmark.md`. Both methods
found the expected file ten times; search was smaller and faster. Keep graph
lookup optional for relationships. This does not evaluate final answer quality,
tenant retrieval, or FalkorDB at the same snapshot.

Only local source and fixture validation are implicit in implementation work.
Publication, installations, global settings, live index writes, and migrations
retain their repository approval gates.
