---
name: ponytail-review
description: "Read-only scoped Ponytail review for correctness, safety, real load, useful tests, speed and unnecessary complexity."
---

# ponytail-review

Require the exact requested commit/diff/files; never default to all foreign dirty changes in a shared checkout. Read affected source and real callers, inputs, data writes, outputs and relevant tests. Rank concrete triggering defects by correctness/security/data loss/load, test gaps, performance, then unnecessary complexity. Each finding needs source location, input or situation, actual consequence and the smallest sufficient fix. State assumptions and unchecked areas. Report only; do not fix, delete code or call a ship verdict publication authorization. Use one review workflow.

Current owner/project policy and one ECC goal control scope and permissions. Adapted from 2961b52fc1fe6a5a87c7a959a79512e5c2f3ffe5 (MIT); raw upstream rules are reference-only. Read [PONYTAIL_ECC_GUIDE.md](../../../../../docs/tools/PONYTAIL_ECC_GUIDE.md).
