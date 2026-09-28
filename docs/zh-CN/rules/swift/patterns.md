---
paths:
  - "**/*.swift"
  - "**/Package.swift"
---

# Swift Ã¦Â¨Â¡Ã¥Â¼Â

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


> Ã¦Â­Â¤Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â½Â¿Ã§â€Â¨ Swift Ã§â€°Â¹Ã¥Â®Å¡Ã¥â€ â€¦Ã¥Â®Â¹Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  [common/patterns.md](../common/patterns.md)Ã£â‚¬â€š

## Ã©ÂÂ¢Ã¥Ââ€˜Ã¥ÂÂÃ¨Â®Â®Ã§Å¡â€žÃ¨Â®Â¾Ã¨Â®Â¡

Ã¥Â®Å¡Ã¤Â¹â€°Ã¥Â°ÂÃ¥Å¾â€¹Ã£â‚¬ÂÃ¤Â¸â€œÃ¦Â³Â¨Ã§Å¡â€žÃ¥ÂÂÃ¨Â®Â®Ã£â‚¬â€šÃ¤Â½Â¿Ã§â€Â¨Ã¥ÂÂÃ¨Â®Â®Ã¦â€°Â©Ã¥Â±â€¢Ã¦ÂÂ¥Ã¦ÂÂÃ¤Â¾â€ºÃ¥â€¦Â±Ã¤ÂºÂ«Ã§Å¡â€žÃ©Â»ËœÃ¨Â®Â¤Ã¥Â®Å¾Ã§Å½Â°Ã¯Â¼Å¡

```swift
protocol Repository: Sendable {
    associatedtype Item: Identifiable & Sendable
    func find(by id: Item.ID) async throws -> Item?
    func save(_ item: Item) async throws
}
```

## Ã¥â‚¬Â¼Ã§Â±Â»Ã¥Å¾â€¹

* Ã¤Â½Â¿Ã§â€Â¨Ã§Â»â€œÃ¦Å¾â€žÃ¤Â½â€œÃ¯Â¼Ë†structÃ¯Â¼â€°Ã¤Â½Å“Ã¤Â¸ÂºÃ¦â€¢Â°Ã¦ÂÂ®Ã¤Â¼Â Ã¨Â¾â€œÃ¥Â¯Â¹Ã¨Â±Â¡Ã¥â€™Å’Ã¦Â¨Â¡Ã¥Å¾â€¹
* Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¸Â¦Ã¦Å“â€°Ã¥â€¦Â³Ã¨Ââ€Ã¥â‚¬Â¼Ã§Å¡â€žÃ¦Å¾Å¡Ã¤Â¸Â¾Ã¯Â¼Ë†enumÃ¯Â¼â€°Ã¦ÂÂ¥Ã¥Â»ÂºÃ¦Â¨Â¡Ã¤Â¸ÂÃ¥ÂÅ’Ã§Å¡â€žÃ§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å¡

```swift
enum LoadState<T: Sendable>: Sendable {
    case idle
    case loading
    case loaded(T)
    case failed(Error)
}
```

## Actor Ã¦Â¨Â¡Ã¥Â¼Â

Ã¤Â½Â¿Ã§â€Â¨ actor Ã¦ÂÂ¥Ã¥Â¤â€žÃ§Ââ€ Ã¥â€¦Â±Ã¤ÂºÂ«Ã¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã©â€ÂÃ¦Ë†â€“Ã¨Â°Æ’Ã¥ÂºÂ¦Ã©ËœÅ¸Ã¥Ë†â€”Ã¯Â¼Å¡

```swift
actor Cache<Key: Hashable & Sendable, Value: Sendable> {
    private var storage: [Key: Value] = [:]

    func get(_ key: Key) -> Value? { storage[key] }
    func set(_ key: Key, value: Value) { storage[key] = value }
}
```

## Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥

Ã¤Â½Â¿Ã§â€Â¨Ã©Â»ËœÃ¨Â®Â¤Ã¥Ââ€šÃ¦â€¢Â°Ã¦Â³Â¨Ã¥â€¦Â¥Ã¥ÂÂÃ¨Â®Â® Ã¢â‚¬â€Ã¢â‚¬â€ Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â½Â¿Ã§â€Â¨Ã©Â»ËœÃ¨Â®Â¤Ã¥â‚¬Â¼Ã¯Â¼Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€”Â¶Ã¦Â³Â¨Ã¥â€¦Â¥Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¥Â¯Â¹Ã¨Â±Â¡Ã¯Â¼Å¡

```swift
struct UserService {
    private let repository: any UserRepository

    init(repository: any UserRepository = DefaultUserRepository()) {
        self.repository = repository
    }
}
```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`swift-actor-persistence` Ã¤Â»Â¥Ã¤Âºâ€ Ã¨Â§Â£Ã¥Å¸ÂºÃ¤ÂºÅ½ actor Ã§Å¡â€žÃ¦Å’ÂÃ¤Â¹â€¦Ã¥Å’â€“Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š
Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`swift-protocol-di-testing` Ã¤Â»Â¥Ã¤Âºâ€ Ã¨Â§Â£Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¥ÂÂÃ¨Â®Â®Ã§Å¡â€žÃ¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥Ã¥â€™Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€š
