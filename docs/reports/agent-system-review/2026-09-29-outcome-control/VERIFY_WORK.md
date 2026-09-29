# Verify Work

| Phase | Check | Result | Evidence |
|---|---|---|---|
| 0 | Goal-control focused suite | 21 passed | `node --test tests/lib/goal-control.test.js` |
| 0 | Instruction scenarios | 76/76 | `node scripts/eval-instruction-scenarios.js --check` |
| 0 | Adapter synchronization | Passed | `node scripts/sync-instruction-adapters.js` |
| 0 | Publish surface | 2 passed | `node --test tests/scripts/npm-publish-surface.test.js` |
| 0 | Diff integrity | Passed | `git diff --check` |
| 0 | Remote delivery | Confirmed | `origin/main` at `3c4ce1278` |
| 1 | Writable CLI focused suite | 23 passed | `node --test tests/lib/goal-control.test.js` |
| 1 | Public CLI delivery checkpoint | Allowed | `ecc goal init`, `record`, `resume`, and `claim complete` |
| 1 | Evidence artifact | SHA-256 recorded | `1a28d2be529431297ebc4efa335c343e274ee14e29b1dfec621bdac594104e5a` |
| 1 | Runtime defect | Fixed | Git porcelain whitespace preserved for dirty paths |
| 2 | Evidence mutation suite | Passed | Changed, missing, and URI-only artifacts rejected |
| 2 | Result-class semantics | Passed | Fixture, activity, provisional, and hidden results rejected where disallowed |
| 3 | Dirty-tree binding | Passed | Uncommitted tracked change invalidated a fresh claim |
| 3 | Cross-repository requirement | Passed | Missing frontend fingerprint rejected |
| 4 | Runtime registry | 18/18 covered | Every instruction adapter has a declared enforcement tier |
| 4 | Model neutrality | Passed | Five runtime/model combinations returned the same controlled-task denial |
| 4 | Native hook negative control | Passed | Removing Claude gate wiring fails capability validation |
| 4 | Native hook behavior | 3 passed | Ordinary prompt allowed; uncontrolled long goal and unsupported completion blocked |
| 4 | Focused outcome suite | 28 passed | `node --test tests/lib/goal-control.test.js` |
| 4 | Instruction scenarios | 76/76 | ECC worktree adapters pass; product drift is deferred to Phase 10 rollout |
| 4 | Publish surface | 2 passed | Runtime bridge and library ship in the npm package |

Mocked, fixture, static, and source-only checks remain labelled as such. They do
not satisfy authentic user-facing, real-property, deployment, or independent
validation acceptance.
