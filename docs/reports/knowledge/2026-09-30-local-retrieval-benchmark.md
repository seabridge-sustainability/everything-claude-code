# Ten-question local retrieval check

Snapshot: AutoResearch `9c8ef2ccace80928fc5061bf7627cb49dc0dfaee`,
Graphify 0.9.71, a verified local AST graph (v2 receipt at measurement time).
Date: 2026-09-30. The provenance rule was tightened to v3 afterward.
No model or paid API calls. The raw numeric output is kept in the private
handoff area, outside this public repository.

Ten questions located Python functions and nearby callers across
`scripts/skill_optimizer.py`, `experiments/prepare.py`, and
`experiments/train.py`. A fixed expected definition file was checked against
`rg -n -F` output and `scripts/knowledge-query.js` output on the same source
commit and graph. Each method ran once per question on a warm local filesystem.

| Retrieval method | Expected file found | Median elapsed | Total returned characters |
|---|---:|---:|---:|
| Source search | 10/10 | 33.1 ms | 6,068 |
| Bounded graph call context | 10/10 | 1,585.6 ms | 25,595 |

These are retrieval proxies, not billed tokens or full task-success scores.
The graph supplied explicit call edges in some results, while source search
supplied matching lines. This corpus does not establish which yields a better
final answer for complex impact analysis; it did not load a same-snapshot
FalkorDB index. The observed location tasks do not justify another always-on
orientation index or making graph lookup the default first step.
