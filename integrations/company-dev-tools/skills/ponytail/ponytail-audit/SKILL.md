---
name: ponytail-audit
description: "Bounded read-only Ponytail audit of a requested repository or subsystem."
---

# ponytail-audit

Map entry points and real input/persistence/output paths from current source. Confirm expected deployment/load and inspect only the requested scope. Review bugs, trust boundaries, concurrency, unbounded state, useful regression coverage, material speed and unnecessary code. Confirm callers including dynamic/config references before suggesting removal. Report concrete cases and priority, preserve deliberate limits until their stated trigger is crossed, and disclose missing coverage. Do not scan tenant content, fix findings, start providers or treat an audit as product acceptance.

Current owner/project policy and one ECC goal control scope and permissions. Adapted from 2961b52fc1fe6a5a87c7a959a79512e5c2f3ffe5 (MIT); raw upstream rules are reference-only. Read [PONYTAIL_ECC_GUIDE.md](../../../../../docs/tools/PONYTAIL_ECC_GUIDE.md).
