---
name: btw
description: Answer a short side question without losing or replacing the active task. Use when the user invokes /btw or explicitly labels a question as an aside that should not interrupt current work.
---

# BTW

Answer the side question directly and briefly, then resume the active task from
the exact point where it paused.

## Behavior

1. Preserve the active objective, plan, constraints, and verification state.
2. Answer only the side question; do not silently turn it into new task scope.
3. If the answer changes a material assumption, state that clearly and update
   the active plan only when the user requested the change.
4. Continue the original work immediately after the answer.

Use `/aside` instead when the user explicitly wants to pause the main task for a
larger discussion.
