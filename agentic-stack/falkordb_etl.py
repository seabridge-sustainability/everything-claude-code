"""Retired FalkorDB loader. Refuses to run.

FalkorDB code graphs have one loader: manageesg-backend
scripts/graph/load_all_repos_to_falkordb.py, which writes the graph names the
live index and falkordb_smoke.py use (manageesg, frontend, autoresearch, ecc,
openseabri).

This script wrote repo-directory graph names that were dropped as stale on
2026-07-07, and it deleted each graph before reloading although it claimed to
merge. It was retired on 2026-09-28; see
docs/design/seabridge-knowledge-architecture.md and the falkordb-code-graph
entry in config/knowledge-sources.json. The previous implementation is in git
history.
"""
from __future__ import annotations

import sys

MESSAGE = (
    "falkordb_etl.py is retired and loads nothing.\n"
    "Use the single FalkorDB loader in manageesg-backend:\n"
    "  python scripts/graph/load_all_repos_to_falkordb.py\n"
    "See docs/design/seabridge-knowledge-architecture.md.\n"
)


def main() -> int:
    sys.stderr.write(MESSAGE)
    return 2


if __name__ == "__main__":
    sys.exit(main())
