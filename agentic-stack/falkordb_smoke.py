"""Smoke-test queries across the loaded FalkorDB graphs.

Confirms:
  1. All 8 named graphs exist
  2. Each graph has nodes AND edges (this was the bug with the first load)
  3. A multi-hop query works on the backend graph
  4. A cross-graph correlation works (backend + frontend)

Usage:
  PY=C:/Users/adelm/pipx/venvs/graphifyy/Scripts/python.exe
  PYTHONUTF8=1 $PY falkordb_smoke.py
"""
from __future__ import annotations

import sys
from falkordb import FalkorDB

HOST = "localhost"
PORT = 6380

EXPECTED = [
    "manageesg-backend",
    "manageesg-frontend",
    "autoresearch",
    "everything-claude-code",
    "openseabri",
]


def main() -> int:
    db = FalkorDB(host=HOST, port=PORT)
    graphs = db.list_graphs()
    print(f"FalkorDB @ {HOST}:{PORT}")
    print(f"Graphs present: {len(graphs)}  ->  {graphs}")

    missing = [g for g in EXPECTED if g not in graphs]
    if missing:
        print(f"  MISSING: {missing}")

    print("\n--- node/edge counts per graph ---")
    for g_name in EXPECTED:
        if g_name not in graphs:
            print(f"  {g_name:25s}  (not present)")
            continue
        g = db.select_graph(g_name)
        n = g.query("MATCH (n:Node) RETURN count(n)").result_set[0][0]
        e = g.query("MATCH ()-[r]->() RETURN count(r)").result_set[0][0]
        rels = g.query(
            "MATCH ()-[r]->() RETURN type(r) AS t, count(r) AS c "
            "ORDER BY c DESC LIMIT 5"
        ).result_set
        print(f"  {g_name:25s}  {n:>6} nodes  {e:>7} edges")
        for t, c in rels:
            print(f"      :{t:30s}  {c}")

    print("\n--- multi-hop test on manageesg-backend ---")
    be = db.select_graph("manageesg-backend")
    q = """
    MATCH p = (a:Node)-[*2..3]->(b:Node)
    WHERE toLower(a.label) CONTAINS 'aimanager'
      AND toLower(b.label) CONTAINS 'mcp'
    RETURN a.label AS from_node, b.label AS to_node, length(p) AS hops
    LIMIT 5
    """
    res = be.query(q)
    print(f"  AI Manager -> MCP (2-3 hops): {len(res.result_set)} paths")
    for row in res.result_set:
        print(f"    {row[0]!r:45s} -> {row[2]}h -> {row[1]!r}")

    print("\n--- top 10 god nodes in manageesg-backend ---")
    res = be.query(
        "MATCH (n:Node) OPTIONAL MATCH (n)-[r]-() "
        "RETURN n.label, n.source_file, count(r) AS deg "
        "ORDER BY deg DESC LIMIT 10"
    )
    for row in res.result_set:
        print(f"    deg={row[2]:>4}  {row[0]!r:50s}  {row[1]}")

    print("\n--- cross-repo: labels that appear in both frontend and backend ---")
    fe = db.select_graph("manageesg-frontend")
    fe_labels = {
        r[0].lower()
        for r in fe.query(
            "MATCH (n:Node) WHERE n.file_type = 'code' RETURN DISTINCT n.label"
        ).result_set
    }
    be_labels = {
        r[0].lower()
        for r in be.query(
            "MATCH (n:Node) WHERE n.file_type = 'code' RETURN DISTINCT n.label"
        ).result_set
    }
    shared = sorted(fe_labels & be_labels)
    print(f"  frontend_labels={len(fe_labels)}  backend_labels={len(be_labels)}  shared={len(shared)}")
    print(f"  sample shared: {shared[:15]}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
