"""Smoke-test queries across the loaded FalkorDB graphs.

Confirms, and exits non-zero otherwise:
  1. Expected graphs exist; staged generations are not active by implication
  2. Each graph has nodes AND edges
  3. Each graph has a GraphMeta node with its source commit (provenance only)
  4. A multi-hop query works on the backend graph
  5. A cross-graph correlation works (backend + frontend)

Analytical queries pass their own timeout; the server default is 1 s.

Usage:
  PY=C:/Users/adelm/pipx/venvs/graphifyy/Scripts/python.exe
  PYTHONUTF8=1 $PY falkordb_smoke.py
"""
from __future__ import annotations

import sys
import argparse
import json
import re
from pathlib import Path

HOST = "localhost"
PORT = 6380
HEAVY_QUERY_TIMEOUT_MS = 60_000


def read_query(graph, query):
    return graph.ro_query(query, timeout=HEAVY_QUERY_TIMEOUT_MS)


def verify_snapshot(meta, expected, node_count, edge_count):
    """A commit alone proves provenance, not freshness or load integrity."""
    if not meta or len(meta) != 1 or len(meta[0]) != 7:
        return False
    commit, _version, _at, status, digest, nodes, edges = meta[0]
    return (status == 'verified' and commit == expected.get('source_commit')
            and bool(digest) and digest == expected.get('graph_sha256')
            and nodes == node_count and edges == edge_count)

EXPECTED = [
    "manageesg",
    "frontend",
    "autoresearch",
    "ecc",
    "openseabri",
]


def known_graph(name):
    return name in EXPECTED or any(re.fullmatch(re.escape(base) + r'__[A-Za-z0-9_-]{1,64}', name) for base in EXPECTED)


def finish(problems, checked):
    if problems:
        print('\nFAIL: ' + '; '.join(problems))
        return 1
    print('\nPASS: selected read-only health and provenance probes')
    print('Snapshot metadata/count verification: ' + ('PASS' if checked else 'NOT CHECKED (provide --expected-snapshots)'))
    print('Stored node/edge content was not re-hashed; this is not full content-integrity verification.')
    return 0


def main() -> int:
    from falkordb import FalkorDB
    parser = argparse.ArgumentParser(description='Read-only graph health; freshness requires expected snapshot hashes.')
    parser.add_argument('--expected-snapshots', type=Path)
    args = parser.parse_args()
    expected_snapshots = json.loads(args.expected_snapshots.read_text(encoding='utf-8')) if args.expected_snapshots else None
    if expected_snapshots is not None and (not isinstance(expected_snapshots, dict) or not expected_snapshots
            or any(not known_graph(name) or not isinstance(value, dict) for name, value in expected_snapshots.items())):
        parser.error('snapshot manifest must map selected base/generation names to expected metadata')
    selected = list(expected_snapshots) if expected_snapshots is not None else EXPECTED
    db = FalkorDB(host=HOST, port=PORT)
    graphs = db.list_graphs()
    print(f"FalkorDB @ {HOST}:{PORT}")
    print(f"Graphs present: {len(graphs)}  ->  {graphs}")

    problems = []
    missing = [g for g in selected if g not in graphs]
    unexpected = [g for g in graphs if not known_graph(g)]
    staged = [g for g in graphs if known_graph(g) and g not in selected]
    print(f'Unselected base/staged graphs: {len(staged)} (not accepted by this check)')
    if missing:
        problems.append(f"missing graphs {missing}")
    if unexpected:
        problems.append(f"unexpected graphs {unexpected}")

    print("\n--- node/edge counts per graph ---")
    for g_name in selected:
        if g_name not in graphs:
            print(f"  {g_name:25s}  (not present)")
            continue
        g = db.select_graph(g_name)
        n = read_query(g, "MATCH (n:Node) RETURN count(n)").result_set[0][0]
        e = read_query(g, "MATCH (:Node)-[r]->(:Node) RETURN count(r)").result_set[0][0]
        rels = read_query(g,
            "MATCH ()-[r]->() RETURN type(r) AS t, count(r) AS c "
            "ORDER BY c DESC LIMIT 5"
        ).result_set
        meta = read_query(g,
            "MATCH (m:GraphMeta) RETURN m.source_commit, m.graphify_version, m.built_at, "
            "m.status, m.graph_sha256, m.node_count, m.edge_count"
        ).result_set
        commit, version, built_at = meta[0][:3] if meta else ("", "", "")
        if expected_snapshots is not None and not verify_snapshot(meta, expected_snapshots.get(g_name, {}), n, e):
            problems.append(f'{g_name} does not match its expected verified snapshot')
        print(f"  {g_name:25s}  {n:>6} nodes  {e:>7} edges  built {built_at} "
              f"at {str(commit)[:9]} with graphify {version}")
        print(f"      relationship types sampled: {len(rels)}")
        if not n or not e:
            problems.append(f"{g_name} is empty")
        if not commit:
            problems.append(f"{g_name} has no GraphMeta source commit")

    backend_name = next((name for name in selected if name == 'manageesg' or name.startswith('manageesg__')), None)
    frontend_name = next((name for name in selected if name == 'frontend' or name.startswith('frontend__')), None)
    if not backend_name or not frontend_name or backend_name not in graphs or frontend_name not in graphs:
        print('Cross-graph/multi-hop probes NOT RUN: select populated backend and frontend snapshots for those checks.')
        return finish(problems, expected_snapshots is not None)
    print("\n--- multi-hop test on selected backend ---")
    be = db.select_graph(backend_name)
    q = """
    MATCH p = (a:Node)-[*2..3]->(b:Node)
    WHERE toLower(a.label) CONTAINS 'aimanager'
      AND toLower(b.label) CONTAINS 'mcp'
    RETURN a.label AS from_node, b.label AS to_node, length(p) AS hops
    LIMIT 5
    """
    res = read_query(be, q)
    print(f"  AI Manager -> MCP (2-3 hops): {len(res.result_set)} paths")
    if not res.result_set:
        problems.append('multi-hop probe returned no paths')

    print("\n--- top 10 god nodes in manageesg ---")
    res = read_query(be,
        "MATCH (n:Node) OPTIONAL MATCH (n)-[r]-() "
        "RETURN n.label, n.source_file, count(r) AS deg "
        "ORDER BY deg DESC LIMIT 10",
    )
    print(f"  hub rows returned: {len(res.result_set)} (labels suppressed)")

    print("\n--- cross-repo: labels that appear in both frontend and backend ---")
    fe = db.select_graph(frontend_name)
    fe_labels = {
        r[0].lower()
        for r in read_query(fe,
            "MATCH (n:Node) WHERE n.file_type = 'code' RETURN DISTINCT n.label",
        ).result_set
    }
    be_labels = {
        r[0].lower()
        for r in read_query(be,
            "MATCH (n:Node) WHERE n.file_type = 'code' RETURN DISTINCT n.label",
        ).result_set
    }
    shared = sorted(fe_labels & be_labels)
    if not shared:
        problems.append('cross-graph probe returned no common labels')
    print(f"  frontend_labels={len(fe_labels)}  backend_labels={len(be_labels)}  shared={len(shared)}")
    print('  Common labels are a connectivity probe, not proof of compatible API contracts.')

    return finish(problems, expected_snapshots is not None)


if __name__ == "__main__":
    sys.exit(main())
