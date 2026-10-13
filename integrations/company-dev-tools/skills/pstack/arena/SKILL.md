---
name: arena
description: "Compare independent implementation plans with an explicit judge before owner-approved implementation."
metadata:
  origin: Pstack adapted for SeaBridge ECC
---

# arena

Use sea-multi-model-planning. Prepare a packet with pstack_prepare_plan, obtain two completed native-agent plans, then an independent critique. Validate exact candidate digests with pstack_validate_review. Keep planner outputs separate inside artifacts/agent-runs, with no product edits or worktrees. An absent model is absent; do not silently substitute or call persona prompts model diversity.

Use the current project instructions and active ECC goal. Upstream is pinned at 7845807642f9ef234a0ec5b4067fa3f11fd92a85; its defaults do not grant scope, tool access or approval.

Read [PSTACK_ECC_GUIDE.md](../../../../../docs/tools/PSTACK_ECC_GUIDE.md) for invocation and proof boundaries.
