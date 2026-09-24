"""Measure the static instruction cost each harness loads (bytes, lines, tokens).

Tokens use tiktoken o200k_base: exact for OpenAI models, an estimate for Claude.
MEMORY.md is truncated the way Claude Code loads it (first 200 lines / 25 KB).
Usage: python scripts/measure-instruction-stack.py <stacks.json> [totals-out.json]
  stacks.json maps a stack name to [[path, "auto"|"mandated"], ...]; paths may use
  {BE} {FE} {ECC} {MEM}. "mandated" = files the loaded text tells agents to read first.
Requires tiktoken (present in the manageesg-backend venv).
"""
import json, sys, os
import tiktoken

ENC = tiktoken.get_encoding("o200k_base")
R = "C:/Users/adelm/SeaBridgeAI"
BE, FE, ECC = R + "/manageesg-backend", R + "/manageesg-frontend", R + "/everything-claude-code"
MEM = "C:/Users/adelm/.claude/projects"


def read(p, memory=False):
    if not os.path.exists(p):
        return None
    t = open(p, encoding="utf-8-sig", errors="replace").read()
    if memory:  # Claude Code loads first 200 lines or 25KB of MEMORY.md
        lines = t.splitlines(keepends=True)[:200]
        t = "".join(lines).encode("utf-8")[:25 * 1024].decode("utf-8", "ignore")
    return t


def stat(p, memory=False):
    t = read(p, memory)
    if t is None:
        return None
    return {"bytes": len(t.encode("utf-8")), "lines": t.count("\n") + 1, "tokens": len(ENC.encode(t))}


def run(stacks):
    out = {}
    for name, items in stacks.items():
        rows, tot = [], {"auto": 0, "mandated": 0}
        for path, kind in items:
            s = stat(path, memory=path.endswith("MEMORY.md"))
            rows.append((path.replace(R + "/", ""), kind, s))
            if s:
                tot[kind] = tot.get(kind, 0) + s["tokens"]
        out[name] = {"rows": rows, "totals": tot}
    return out


if __name__ == "__main__":
    cfg = json.load(open(sys.argv[1]))
    res = run({k: [(p.format(BE=BE, FE=FE, ECC=ECC, MEM=MEM), kind) for p, kind in v] for k, v in cfg.items()})
    for name, r in res.items():
        print(f"\n## {name}")
        for path, kind, s in r["rows"]:
            print(f"  {kind:9} {path:95} " + (f"{s['bytes']:>7}B {s['lines']:>5}L {s['tokens']:>6}t" if s else "MISSING"))
        t = r["totals"]
        print(f"  TOTAL auto={t['auto']}t  mandated-by-prose={t['mandated']}t  combined={t['auto'] + t['mandated']}t")
    if len(sys.argv) > 2:
        json.dump({k: v["totals"] for k, v in res.items()}, open(sys.argv[2], "w"), indent=1)
