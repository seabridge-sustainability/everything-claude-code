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
# One validator for manual builds and installed hooks. Explicit override supports
# nonstandard layouts; missing validator fails closed, without downloading tools.
CHECK="${GRAPHIFY_BOUNDARY_CHECK:-$TOP/scripts/knowledge-freshness.js}"
if [ -z "$GRAPHIFY_BOUNDARY_CHECK" ] && [ ! -f "$CHECK" ]; then
  CHECK="$TOP/../everything-claude-code/scripts/knowledge-freshness.js"
fi
[ -f "$CHECK" ] || exit 0
command -v node >/dev/null 2>&1 || exit 0
node "$CHECK" boundary "$TOP" >/dev/null 2>&1 || exit 0
command -v graphify >/dev/null 2>&1 || exit 0

CHANGED=()
case "$(basename "$0")" in
  post-checkout)
    # Branch switches only, and only when HEAD actually moved: full rebuild.
    [ "$3" = "1" ] || exit 0
    [ "$1" != "$2" ] || exit 0
    ;;
  *)
    # Use the last graph snapshot, not just the last commit. NUL-separated arrays
    # preserve spaces and wildcard characters in paths.
    BASE=$(node "$CHECK" built-commit "$TOP" 2>/dev/null)
    if [ -n "$BASE" ] && git cat-file -e "$BASE^{commit}" 2>/dev/null; then
      while IFS= read -r -d '' file; do
        CHANGED+=("$file")
      done < <(node "$CHECK" changed-inputs "$TOP" "$BASE")
      [ "${#CHANGED[@]}" -gt 0 ] || exit 0
      for file in "${CHANGED[@]}"; do
        if [ "$file" = ".graphifyignore" ] || [ "$file" = ".gitignore" ]; then
          CHANGED=()
          break
        fi
      done
    fi
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
import sys
from pathlib import Path
from graphify.watch import _rebuild_code
root = Path(sys.argv[1])
changed = [root / p for p in sys.argv[2:]] or None
# No queued rebuilds: a later hook or explicit freshness check handles missed work.
if not _rebuild_code(root, changed_paths=changed, block_on_lock=False):
    sys.exit(1)
'

mkdir -p "$TOP/graphify-out"
LOG="$TOP/graphify-out/.last-hook-build.log"
BEFORE=$(node "$CHECK" snapshot "$TOP") || exit 0
if [ -n "$PY" ] && "$PY" -c "import graphify.watch" >/dev/null 2>&1; then
  ( GRAPHIFY_OUT="$TOP/graphify-out" GRAPHIFY_NO_TIPS=1 "$PY" -c "$REBUILD" "$TOP" "${CHANGED[@]}" && node "$CHECK" stamp "$TOP" "$BEFORE" ) > "$LOG" 2>&1 &
else
  ( GRAPHIFY_OUT="$TOP/graphify-out" GRAPHIFY_NO_TIPS=1 graphify update "$TOP" && node "$CHECK" stamp "$TOP" "$BEFORE" ) > "$LOG" 2>&1 &
fi
disown 2>/dev/null
exit 0
# graphify-hook-end
