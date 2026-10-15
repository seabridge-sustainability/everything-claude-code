---
name: sea-git-worktree-isolation
description: "Coordinate safe work on SeaBridgeAI primary branches; inspect dirty checkouts and file ownership, use standing-approved detached release worktrees under SeaBridgeAI/.worktrees, and handle other worktree exceptions only when Alejandro explicitly approves their path, branch and reason."
---

# sea-git-worktree-isolation

Load and follow the canonical skill body at
[skills/sea-git-worktree-isolation/SKILL.md](../../../skills/sea-git-worktree-isolation/SKILL.md).
Resolve this path relative to this wrapper so worktrees and plugin installs
use their own checked-out version. Do not copy or fork behavior here.
