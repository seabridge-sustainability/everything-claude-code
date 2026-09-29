# Phase Plan

| Task | Owned files | Verification | Status |
|---|---|---|---|
| Add atomic write/lock helpers | `scripts/lib/goal-control.js` or focused helper | Concurrent and idempotency tests | Complete |
| Add writable CLI routes | `scripts/goal-control.js`, `scripts/ecc.js` | Real CLI lifecycle | Complete |
| Add repository fingerprint capture | Goal-control library and schema | Dirty-state mutation test | Complete |
| Add evidence verifier registry | `scripts/lib/goal-evidence.js` | Fake and changed artifact tests | Complete |
| Add assignments and corrections | Schema and semantics | Adversarial tests | Complete |
| Add runtime bridge registry | Manifests and hook/wrapper integration | All-adapter checks | Complete |
| Add watchdog and proof profiles | Focused libraries and docs | Simulated scenario tests | Complete |
| Roll out generated contract | Product repository adapters | Branch-specific validation | Complete |
| Harden knowledge boundaries | Freshness command, graph hook, CLIMADA policy | Privacy negative controls | Complete |

All implementation is serial until the core schema and write protocol settle;
parallel edits would overlap the same files and cost more to reconcile.
