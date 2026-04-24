"""Load all SeaBridgeAI graphify graph.json files into FalkorDB.

Multi-tenant: one named graph per repo. Run after graphify has produced
graph.json in each repo. Safe to re-run — uses MERGE so it converges.

Usage:
  PY=C:/Users/adelm/pipx/venvs/graphifyy/Scripts/python.exe
  PYTHONUTF8=1 $PY falkordb_etl.py
  PYTHONUTF8=1 $PY falkordb_etl.py --only manageesg-backend
  PYTHONUTF8=1 $PY falkordb_etl.py --host localhost --port 6379

Repos loaded as separate graphs (select_graph name):
  - manageesg-backend
  - manageesg-frontend
  - autoresearch
  - everything-claude-code
  - openseabri
  - hermes-agent   (from _upstream/hermes-agent)
  - MiroFish       (from _upstream/MiroFish)
  - openclaw       (from _upstream/openclaw)
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import time
from pathlib import Path

try:
    from falkordb import FalkorDB
except ImportError:
    sys.stderr.write("falkordb-py not installed. Run:\n"
                     "  pipx inject graphifyy falkordb\n")
    sys.exit(1)

ROOT = Path("C:/Users/adelm/SeaBridgeAI")

REPOS = [
    ("manageesg-backend", ROOT / "manageesg-backend"),
    ("manageesg-frontend", ROOT / "manageesg-frontend"),
    ("autoresearch", ROOT / "autoresearch"),
    ("everything-claude-code", ROOT / "everything-claude-code"),
    ("openseabri", ROOT / "openseabri"),
    # _upstream/* (hermes-agent, MiroFish, openclaw) intentionally excluded —
    # vendored upstream clones are graphified for local browsing but not loaded
    # into FalkorDB (not part of SeaBridgeAI's owned code surface).
]

# Cypher relation-type names must match [A-Za-z_][A-Za-z0-9_]*
_REL_SAFE = re.compile(r"[^A-Za-z0-9_]")


def safe_rel(rel: str) -> str:
    """Make a relation string safe for a Cypher type name."""
    if not rel:
        return "related_to"
    s = _REL_SAFE.sub("_", rel)
    if not re.match(r"^[A-Za-z_]", s):
        s = "rel_" + s
    return s[:60]


def load_repo(db: "FalkorDB", name: str, graph_json: Path) -> dict:
    """Load one repo's graph.json into FalkorDB as a named graph. Returns stats."""
    data = json.loads(graph_json.read_text(encoding="utf-8"))
    nodes = data.get("nodes", [])
    # graphify/NetworkX writes edges under 'links' (node-link JSON); keep 'edges' fallback
    edges = data.get("links") or data.get("edges") or []

    g = db.select_graph(name)

    # Reset — simpler than MERGE-reconciling node property changes
    try:
        g.delete()
    except Exception:
        pass
    g = db.select_graph(name)

    # Batched node creates via UNWIND for speed
    B = 1000
    t0 = time.time()
    for i in range(0, len(nodes), B):
        batch = nodes[i : i + B]
        payload = [
            {
                "id": n.get("id") or f"anon_{i+j}",
                "label": (n.get("label") or n.get("id") or "")[:200],
                "file_type": n.get("file_type") or "code",
                "source_file": (n.get("source_file") or "")[:500],
                "source_location": n.get("source_location") or "",
                "repo": name,
            }
            for j, n in enumerate(batch)
        ]
        g.query(
            "UNWIND $rows AS r "
            "MERGE (n:Node {id: r.id}) "
            "SET n.label = r.label, n.file_type = r.file_type, "
            "    n.source_file = r.source_file, n.source_location = r.source_location, "
            "    n.repo = r.repo",
            {"rows": payload},
        )

    # Group edges by relation type (Cypher can't parameterize relation types)
    edges_by_rel: dict[str, list[dict]] = {}
    for e in edges:
        r = safe_rel(e.get("relation", "related_to"))
        edges_by_rel.setdefault(r, []).append(
            {
                "s": e["source"],
                "t": e["target"],
                "conf": float(e.get("confidence_score", 1.0)),
                "ctype": e.get("confidence", "EXTRACTED"),
                "weight": float(e.get("weight", 1.0)),
                "src_file": (e.get("source_file") or "")[:500],
            }
        )

    for rel_type, rows in edges_by_rel.items():
        for i in range(0, len(rows), B):
            batch = rows[i : i + B]
            g.query(
                f"UNWIND $rows AS r "
                f"MATCH (a:Node {{id: r.s}}), (b:Node {{id: r.t}}) "
                f"MERGE (a)-[e:`{rel_type}`]->(b) "
                f"SET e.confidence_score = r.conf, e.confidence = r.ctype, "
                f"    e.weight = r.weight, e.source_file = r.src_file",
                {"rows": batch},
            )

    elapsed = time.time() - t0
    # Count what landed
    n_res = g.query("MATCH (n:Node) RETURN count(n)")
    e_res = g.query("MATCH ()-[e]->() RETURN count(e)")
    n_count = n_res.result_set[0][0] if n_res.result_set else 0
    e_count = e_res.result_set[0][0] if e_res.result_set else 0

    return {
        "name": name,
        "nodes_in": len(nodes),
        "edges_in": len(edges),
        "nodes_loaded": n_count,
        "edges_loaded": e_count,
        "rel_types": len(edges_by_rel),
        "elapsed_s": round(elapsed, 1),
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--host", default="localhost")
    ap.add_argument("--port", type=int, default=6380)
    ap.add_argument("--only", help="Load only this repo name")
    args = ap.parse_args()

    db = FalkorDB(host=args.host, port=args.port)

    total_n = total_e = 0
    for name, repo_dir in REPOS:
        if args.only and name != args.only:
            continue
        gj = repo_dir / "graphify-out" / "graph.json"
        if not gj.exists():
            print(f"  SKIP  {name:25s}  (no graph.json)")
            continue
        print(f"  LOAD  {name:25s}  {gj}")
        stats = load_repo(db, name, gj)
        print(
            f"  DONE  {stats['name']:25s}  "
            f"{stats['nodes_loaded']:>6} nodes / {stats['edges_loaded']:>7} edges "
            f"({stats['rel_types']} rel types) in {stats['elapsed_s']}s"
        )
        total_n += stats["nodes_loaded"]
        total_e += stats["edges_loaded"]

    print(f"\nTotal across all graphs: {total_n} nodes, {total_e} edges")
    print("List graphs:  GRAPH.LIST  (via redis-cli) or db.list_graphs()")


if __name__ == "__main__":
    main()
