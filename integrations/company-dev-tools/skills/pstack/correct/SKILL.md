---
name: correct
description: "Prevent repeated defects with contracts, assertions and bounded regression checks."
metadata:
  origin: Pstack adapted for SeaBridge ECC
---

# correct

Start with a demonstrated recurring failure. Prefer an existing type, boundary validation, lint rule or behavioral regression test over another prose rule. Preserve acceptance and protected behavior. If a check cannot observe the defect, report the gap instead of asserting enforcement.

Use the current project instructions and active ECC goal. Upstream is pinned at 7845807642f9ef234a0ec5b4067fa3f11fd92a85; its defaults do not grant scope, tool access or approval.

Read [PSTACK_ECC_GUIDE.md](../../../../../docs/tools/PSTACK_ECC_GUIDE.md) for invocation and proof boundaries.
