"""Reusable AST-only graphify build script.

Usage: run from the repo root whose graph you want to build.
  PY=C:/Users/adelm/pipx/venvs/graphifyy/Scripts/python.exe
  PYTHONUTF8=1 $PY <path_to_this_script>

Produces:
  graphify-out/graph.json
  graphify-out/GRAPH_REPORT.md
  graphify-out/graph.html  (if <=5000 nodes)
  .graphify-obsidian/*     (Obsidian vault + graph.canvas)

Skips Part B (semantic extraction on docs/images). Run `graphify <path> --update`
later, or run a one-shot semantic pass manually, to enrich with doc/image nodes.
"""
from __future__ import annotations

import json
import os
import sys
from collections import Counter
from pathlib import Path

# Ensure graphify is importable (pipx-installed)
try:
    import graphify  # noqa: F401
except ImportError:
    sys.stderr.write("graphify not importable. Run with the pipx-managed Python:\n"
                     "  C:/Users/adelm/pipx/venvs/graphifyy/Scripts/python.exe\n")
    sys.exit(1)

from graphify.detect import detect
from graphify.extract import collect_files, extract
from graphify.build import build_from_json
from graphify.cluster import cluster, score_all
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate
from graphify.export import to_json, to_obsidian, to_canvas, to_html


def auto_label(communities: dict, graph_json_path: str) -> dict:
    """Name each community after its dominant top-level (or 2-level) source dir."""
    graph = json.loads(Path(graph_json_path).read_text(encoding='utf-8'))
    by_id = {n['id']: n for n in graph['nodes']}
    labels = {}
    for cid, nodes in communities.items():
        dirs = Counter()
        for nid in nodes:
            n = by_id.get(nid, {})
            sf = n.get('source_file', '')
            if not sf:
                continue
            norm = sf.replace('\\', '/')
            parts = norm.split('/')
            top = parts[0] if parts else ''
            # 2-level label when top dir is a big grouping like app/, src/, docs/
            two_level_roots = {'app', 'src', 'docs', 'scripts', 'seabridge_ai',
                               'packages', 'apps', 'services', 'lib', 'pages',
                               'components', 'agentic-stack'}
            if top in two_level_roots and len(parts) > 1:
                key = f"{top}/{parts[1]}"
            else:
                key = top
            dirs[key] += 1
        top_dir = dirs.most_common(1)
        labels[cid] = top_dir[0][0][:40] if top_dir else f'Community {cid}'
    return labels


def run(repo_root: Path, obsidian_dir_name: str = '.graphify-obsidian') -> None:
    os.chdir(repo_root)
    out = Path('graphify-out')
    out.mkdir(exist_ok=True)

    # Pin python path (skill convention)
    (out / '.graphify_python').write_text(sys.executable, encoding='utf-8')

    # 1. Detect
    print(f'[{repo_root.name}] detecting...')
    det = detect(Path('.'))
    (out / '.graphify_detect.json').write_text(json.dumps(det, indent=2), encoding='utf-8')
    files = det.get('files', {})
    print(f'  total: {det.get("total_files")} files / {det.get("total_words")} words')
    for k, v in files.items():
        if v:
            print(f'    {k}: {len(v)}')
    if det.get('total_files', 0) == 0:
        print('  no supported files — skipping')
        return

    # 2. AST extraction (free, deterministic)
    code_files = []
    for f in files.get('code', []):
        p = Path(f)
        code_files.extend(collect_files(p) if p.is_dir() else [p])
    if code_files:
        print(f'[{repo_root.name}] AST extraction on {len(code_files)} files...')
        ast_result = extract(code_files, cache_root=Path('.'))
        (out / '.graphify_ast.json').write_text(json.dumps(ast_result), encoding='utf-8')
        print(f'  AST: {len(ast_result["nodes"])} nodes, {len(ast_result["edges"])} edges')
    else:
        ast_result = {'nodes': [], 'edges': [], 'input_tokens': 0, 'output_tokens': 0}
        (out / '.graphify_ast.json').write_text(json.dumps(ast_result), encoding='utf-8')
        print('  no code files — skipping AST')

    # 3. Empty semantic + merge
    sem = {'nodes': [], 'edges': [], 'hyperedges': [], 'input_tokens': 0, 'output_tokens': 0}
    (out / '.graphify_semantic.json').write_text(json.dumps(sem), encoding='utf-8')
    seen = {n['id'] for n in ast_result['nodes']}
    merged_nodes = list(ast_result['nodes'])
    merged = {
        'nodes': merged_nodes,
        'edges': ast_result['edges'],
        'hyperedges': [],
        'input_tokens': 0,
        'output_tokens': 0,
    }
    (out / '.graphify_extract.json').write_text(json.dumps(merged), encoding='utf-8')

    if len(merged_nodes) == 0:
        print('  merge empty — no graph to build')
        return

    # 4. Build + cluster + analyze
    print(f'[{repo_root.name}] building graph + clustering...')
    G = build_from_json(merged)
    communities = cluster(G)
    cohesion = score_all(G, communities)
    gods = god_nodes(G)
    surprises = surprising_connections(G, communities)
    placeholder_labels = {cid: f'Community {cid}' for cid in communities}
    questions = suggest_questions(G, communities, placeholder_labels)

    analysis = {
        'communities': {str(k): v for k, v in communities.items()},
        'cohesion': {str(k): v for k, v in cohesion.items()},
        'gods': gods,
        'surprises': surprises,
        'questions': questions,
    }
    (out / '.graphify_analysis.json').write_text(json.dumps(analysis, indent=2), encoding='utf-8')

    # Initial graph.json for auto_label
    to_json(G, communities, str(out / 'graph.json'))

    labels = auto_label(communities, str(out / 'graph.json'))
    (out / '.graphify_labels.json').write_text(json.dumps({str(k): v for k, v in labels.items()}),
                                                encoding='utf-8')

    # 5. Finalize with labels
    questions = suggest_questions(G, communities, labels)
    rep = generate(G, communities, cohesion, labels, gods, surprises, det,
                   {'input': 0, 'output': 0}, str(repo_root), suggested_questions=questions)
    (out / 'GRAPH_REPORT.md').write_text(rep, encoding='utf-8')
    to_json(G, communities, str(out / 'graph.json'))

    # 6. Obsidian vault — sanitize labels first to avoid Windows invalid-filename crashes
    import re as _re, hashlib as _h
    def _safe_label(lbl: str) -> str:
        # replace anything not safe for a Windows filename; collapse whitespace; truncate
        s = _re.sub(r'[<>:"/\\|?*\x00-\x1f\n\r\t]', '_', str(lbl))
        s = _re.sub(r'\s+', ' ', s).strip(' ._')
        if len(s) > 80:
            digest = _h.md5(s.encode('utf-8')).hexdigest()[:8]
            s = s[:72] + '_' + digest
        return s or 'unnamed'

    for nid, data in G.nodes(data=True):
        lbl = data.get('label', nid)
        data['label'] = _safe_label(lbl)

    obs_dir = str(repo_root / obsidian_dir_name)
    try:
        n = to_obsidian(G, communities, obs_dir, community_labels=labels, cohesion=cohesion)
        print(f'  Obsidian: {n} notes -> {obs_dir}')
        try:
            to_canvas(G, communities, f'{obs_dir}/graph.canvas', community_labels=labels)
        except OSError as e:
            print(f'  Obsidian canvas skipped: {e}')
    except OSError as e:
        print(f'  Obsidian vault FAILED: {e}')
        print(f'  graph.json and GRAPH_REPORT.md are still good.')

    # 7. HTML (only if not huge)
    if G.number_of_nodes() > 5000:
        print(f'  HTML: skipped ({G.number_of_nodes()} nodes > 5000). Use Obsidian.')
    else:
        to_html(G, communities, str(out / 'graph.html'), community_labels=labels)
        print(f'  HTML: graphify-out/graph.html')

    print(f'[{repo_root.name}] DONE: {G.number_of_nodes()} nodes, '
          f'{G.number_of_edges()} edges, {len(communities)} communities')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('usage: graphify_build_all.py <repo_root>', file=sys.stderr)
        sys.exit(1)
    run(Path(sys.argv[1]).resolve())
