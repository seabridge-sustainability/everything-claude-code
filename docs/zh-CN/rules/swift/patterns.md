---
paths:
  - "**/*.swift"
  - "**/Package.swift"
---

# Swift Ã¦Â¨Â¡Ã¥Â¼Â

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
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
