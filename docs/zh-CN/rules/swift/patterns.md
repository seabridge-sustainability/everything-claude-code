---
paths:
  - "**/*.swift"
  - "**/Package.swift"
---

# Swift Ã¦Â¨Â¡Ã¥Â¼Â

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
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
