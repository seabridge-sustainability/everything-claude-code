#!/bin/bash
# graphify-hook-start
# SeaBridgeAI code-graph hook (template: everything-claude-code scripts/git-hooks/graphify-rebuild.sh).
# Install as .git/hooks/post-commit and .git/hooks/post-checkout; the hook name selects the mode.
#
# Rebuilds this repository's Graphify code graph in the background (local
# tree-sitter AST, no LLM). After a commit only the changed files are
# re-extracted (graphify.watch._rebuild_code with changed_paths, the call
# Graphify's own hook uses; measured 2-3x faster than `graphify update`);
# a branch switch rebuilds everything. It then writes graphify-out/BUILD_INFO.json.
# It never runs in a linked worktree: worktrees are short-lived, and a hook
# there must not rebuild the main checkout. It fails closed unless the repo's
# .graphifyignore carries the SeaBridgeAI knowledge boundary (no reports,
# artifacts, logs, or vendored code in graphs). Set GRAPHIFY_SKIP_HOOK=1 to skip.

[ -n "$GRAPHIFY_SKIP_HOOK" ] && exit 0
[ "$(git rev-parse --git-dir)" = "$(git rev-parse --git-common-dir)" ] || exit 0

TOP=$(git rev-parse --show-toplevel) || exit 0
IGNORE="$TOP/.graphifyignore"
grep -q "SeaBridgeAI knowledge boundary" "$IGNORE" 2>/dev/null || exit 0
for pattern in \
  'docs/reports/' 'reports/' 'artifacts/' 'logs/' '/data/' \
  '**/site-packages/' 'references/' 'vendor/' 'third_party/' '*.env' '.env.*'; do
  grep -Fqx "$pattern" "$IGNORE" 2>/dev/null || exit 0
done
command -v graphify >/dev/null 2>&1 || exit 0

CODE_RE='\.(py|pyi|ts|tsx|js|jsx|mjs|cjs|go|rs|java|kt|kts|cs|cpp|cc|c|h|hpp|rb|php|swift|scala|lua|sh|ps1)$'
CHANGED=""
case "$(basename "$0")" in
  post-checkout)
    # Branch switches only, and only when HEAD actually moved: full rebuild.
    [ "$3" = "1" ] || exit 0
    [ "$1" != "$2" ] || exit 0
    ;;
  *)
    CHANGED=$(git diff --name-only HEAD~1 HEAD 2>/dev/null | grep -E "$CODE_RE")
    [ -n "$CHANGED" ] || exit 0
    ;;
esac

# The interpreter of the pipx/uv install, needed for the changed-paths call.
PY="${GRAPHIFY_PYTHON:-}"
if [ -z "$PY" ]; then
  for candidate in "$HOME/pipx/venvs/graphifyy/Scripts/python.exe" \
                   "$HOME/.local/pipx/venvs/graphifyy/bin/python" \
                   "$HOME/.local/share/pipx/venvs/graphifyy/bin/python"; do
    [ -x "$candidate" ] && PY="$candidate" && break
  done
fi

REBUILD='
import datetime, json, sys
from importlib.metadata import version
from pathlib import Path
from graphify.watch import _rebuild_code
root = Path(sys.argv[1])
changed = [root / p for p in sys.argv[2:]] or None
if not _rebuild_code(root, changed_paths=changed, block_on_lock=True):
    sys.exit(1)
tail = (root / "graphify-out" / "graph.json").read_bytes()[-4096:].decode("utf-8", "ignore")
commit = tail.split("\"built_at_commit\": \"")[-1].split("\"")[0] if "built_at_commit" in tail else ""
info = {"schema": "seabridge.graph-build.v1", "sourceCommit": commit, "sourceDirty": False,
        "builtAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "graphifyVersion": version("graphifyy"),
        "mode": "code-ast incremental" if changed else "code-ast full"}
(root / "graphify-out" / "BUILD_INFO.json").write_text(json.dumps(info, indent=2) + "\n")
'

mkdir -p "$TOP/graphify-out"
LOG="$TOP/graphify-out/.last-hook-build.log"
if [ -n "$PY" ] && "$PY" -c "import graphify.watch" >/dev/null 2>&1; then
  # shellcheck disable=SC2086
  ( GRAPHIFY_NO_TIPS=1 "$PY" -c "$REBUILD" "$TOP" $CHANGED > "$LOG" 2>&1 ) &
else
  ( GRAPHIFY_NO_TIPS=1 graphify update "$TOP" > "$LOG" 2>&1 ) &
fi
disown 2>/dev/null
exit 0
# graphify-hook-end
