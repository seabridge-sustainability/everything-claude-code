# Requirements

| ID | Requirement | Status | Required evidence |
|---|---|---|---|
| R1 | One canonical goal engine for every runtime and model | In progress | Adapter registry plus identical claim decisions |
| R2 | Automatic controlled-goal admission and resume | Pending | Fresh-session runtime smoke tests |
| R3 | Atomic writable goal commands | In progress | Real CLI journey in a temporary Git repository |
| R4 | Evidence contents and hashes are verified | Verified locally | Mutation tests for missing, changed, empty, and URI-only artifacts |
| R5 | Proof binds to exact multi-repository state | Pending | Dirty-diff and cross-repo mismatch tests |
| R6 | Owner corrections invalidate obsolete execution | Pending | Correction adversarial test |
| R7 | Parallel work counts only after integration | Pending | Assignment and fan-in receipt tests |
| R8 | Progress watchdog detects activity plateaus | Pending | Simulated plateau and tactic-change tests |
| R9 | Task profiles require appropriate evidence | Pending | Profile coverage and negative controls |
| R10 | Unsupported complete, on-track, and blocked claims fail | Verified foundation | 21 focused tests at `3c4ce1278` |
| R11 | Small tasks retain a low-overhead path | Pending | Mode classification tests |
| R12 | CI and provider use remain budget bounded | Pending | Budget-policy tests; no live calls without USD ceiling |
| R13 | All 18 instruction adapters receive the same contract | Verified foundation | Adapter sync and instruction-stack checks |
| R14 | Product repositories receive synchronized rules | Pending | Branch-specific commits and `ls-remote` evidence |
| R15 | Source-native, provisional, and independently validated results remain distinct | Verified locally | Schema and claim-semantic tests |
| R16 | Real-property acceptance rejects mock and fixture receipts | Verified locally | Claim-semantic negative controls |

## Scope Guard

No requirement may be converted to documentation-only, mock-only, or
instruction-only behavior. Static adapter presence is not runtime enforcement.
