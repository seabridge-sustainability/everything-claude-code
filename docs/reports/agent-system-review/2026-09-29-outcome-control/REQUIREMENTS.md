# Requirements

| ID | Requirement | Status | Required evidence |
|---|---|---|---|
| R1 | One canonical goal engine for every runtime and model | Verified | 18-runtime bridge replay plus identical model-family decisions |
| R2 | Automatic controlled-goal admission and resume | Verified by capability | Native Claude/Cursor hooks; truthful wrapper enforcement where lifecycle events lack content |
| R3 | Atomic writable goal commands | Verified | Real CLI journey in a temporary Git repository |
| R4 | Evidence contents and hashes are verified | Verified | Mutation tests for missing, changed, empty, and URI-only artifacts |
| R5 | Proof binds to exact multi-repository state | Verified | Dirty-diff and cross-repo mismatch tests |
| R6 | Owner corrections invalidate obsolete execution | Verified | Correction journey and stale-plan rejection |
| R7 | Parallel work counts only after integration | Verified | Assignment and fan-in adversarial tests |
| R8 | Progress watchdog detects activity plateaus | Verified | Simulated plateau, budget breach, and tactic-change tests |
| R9 | Task profiles require appropriate evidence | Verified | Nine-profile coverage and negative controls |
| R10 | Unsupported complete, on-track, and blocked claims fail | Verified | Focused semantics and 18-runtime all-null replay |
| R11 | Small tasks retain a low-overhead path | Verified | Runtime classification preserves advisory mode for ordinary work |
| R12 | CI and provider use remain budget bounded | Verified | Assignment/watchdog budgets and provider-free replay; live plan capped at USD 5 |
| R13 | All 18 instruction adapters receive the same contract | Verified | Adapter sync, instruction-stack checks, and runtime registry |
| R14 | Product repositories receive synchronized rules | Verified | Six branch-specific commits confirmed with `ls-remote` |
| R15 | Source-native, provisional, and independently validated results remain distinct | Verified | Schema and claim-semantic tests |
| R16 | Real-property acceptance rejects mock and fixture receipts | Verified | Claim-semantic negative controls |

## Scope Guard

No requirement may be converted to documentation-only, mock-only, or
instruction-only behavior. Static adapter presence is not runtime enforcement.
