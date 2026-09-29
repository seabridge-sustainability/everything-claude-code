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
| 5 | Parallel adversarial cases | Passed | Missing integration, worker self-integration, expired lease, budget overrun, and stale tree rejected |
| 5 | Real CLI fan-out/fan-in | Passed | `assign` created bounded work; `complete` failed before and passed after parent `integrate` plus fresh resume |
| 5 | Focused outcome suite | 33 passed | `node --test tests/lib/goal-control.test.js` |
| 6 | Owner correction semantics | Passed | Priority, checkpoint, and next action must match the latest executable correction |
| 6 | Stale-plan negative controls | Passed | Old resume receipt, old next action, and post-correction use of an old assignment rejected |
| 6 | Real CLI correction journey | Passed | `correct` invalidated old state; a fresh matching `resume` restored validation |
| 6 | Focused outcome suite | 35 passed | `node --test tests/lib/goal-control.test.js` |
| 7 | Plateau and budget simulation | Passed | Activity, CI, and cost breaches made the watchdog unhealthy |
| 7 | Tactic-change recovery | Passed | Replaying activity under a distinct tactic restored only a fresh bounded window |
| 7 | Claim gate | Passed | Watchdog breach rejects `on-track` while leaving proven completion semantics separate |
| 7 | Real CLI watchdog journey | Passed | `watch` exited 2 before and 0 after an explicit tactic change |
| 7 | Focused outcome suite | 38 passed | `node --test tests/lib/goal-control.test.js` |
| 8 | Profile catalog | 9 profiles | Backend, frontend, cross-repo, security, AI-grounding, sustainability, export, deploy, docs |
| 8 | Cross-repo negative control | Passed | Missing API evidence and second repository rejected |
| 8 | Unknown profile control | Passed | Model-shaped ad hoc profile rejected |
| 8 | Focused outcome suite | 39 passed | `node --test tests/lib/goal-control.test.js` |

Mocked, fixture, static, and source-only checks remain labelled as such. They do
not satisfy authentic user-facing, real-property, deployment, or independent
validation acceptance.
