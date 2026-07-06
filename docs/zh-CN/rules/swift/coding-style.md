---
paths:
  - "**/*.swift"
  - "**/Package.swift"
---

# Swift Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Å“Â¨ [common/coding-style.md](../common/coding-style.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  Swift Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

* **SwiftFormat** Ã§â€Â¨Ã¤ÂºÅ½Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã¯Â¼Å’**SwiftLint** Ã§â€Â¨Ã¤ÂºÅ½Ã©Â£Å½Ã¦Â Â¼Ã¦Â£â‚¬Ã¦Å¸Â¥
* `swift-format` Ã¥Â·Â²Ã¤Â½Å“Ã¤Â¸ÂºÃ¦â€ºÂ¿Ã¤Â»Â£Ã¦â€“Â¹Ã¦Â¡Ë†Ã¦Ââ€ Ã§Â»â€˜Ã¥Å“Â¨ Xcode 16+ Ã¤Â¸Â­

## Ã¤Â¸ÂÃ¥ÂËœÃ¦â‚¬Â§

* Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `let` Ã¨â‚¬Å’Ã©ÂÅ¾ `var` Ã¢â‚¬â€ Ã¥Â°â€ Ã¦â€°â‚¬Ã¦Å“â€°Ã¥â€ â€¦Ã¥Â®Â¹Ã¥Â®Å¡Ã¤Â¹â€°Ã¤Â¸Âº `let`Ã¯Â¼Å’Ã¤Â»â€¦Ã¥Å“Â¨Ã§Â¼â€“Ã¨Â¯â€˜Ã¥â„¢Â¨Ã¨Â¦ÂÃ¦Â±â€šÃ¦â€”Â¶Ã¦â€°ÂÃ¦â€Â¹Ã¤Â¸Âº `var`
* Ã©Â»ËœÃ¨Â®Â¤Ã¤Â½Â¿Ã§â€Â¨Ã¥â€¦Â·Ã¦Å“â€°Ã¥â‚¬Â¼Ã¨Â¯Â­Ã¤Â¹â€°Ã§Å¡â€ž `struct`Ã¯Â¼â€ºÃ¤Â»â€¦Ã¥Å“Â¨Ã©Å“â‚¬Ã¨Â¦ÂÃ¦Â â€¡Ã¨Â¯â€ Ã¦Ë†â€“Ã¥Â¼â€¢Ã§â€Â¨Ã¨Â¯Â­Ã¤Â¹â€°Ã¦â€”Â¶Ã¦â€°ÂÃ¤Â½Â¿Ã§â€Â¨ `class`

## Ã¥â€˜Â½Ã¥ÂÂ

Ã©ÂÂµÃ¥Â¾Âª [Apple API Ã¨Â®Â¾Ã¨Â®Â¡Ã¦Å’â€¡Ã¥Ââ€”](https://www.swift.org/documentation/api-design-guidelines/)Ã¯Â¼Å¡

* Ã¥Å“Â¨Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¶Ã¤Â¿ÂÃ¦Å’ÂÃ¦Â¸â€¦Ã¦â„¢Â° Ã¢â‚¬â€ Ã§Å“ÂÃ§â€¢Â¥Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€žÃ¨Â¯ÂÃ¨Â¯Â­
* Ã¦Â Â¹Ã¦ÂÂ®Ã¦â€“Â¹Ã¦Â³â€¢Ã¥â€™Å’Ã¥Â±Å¾Ã¦â‚¬Â§Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨Ã¨â‚¬Å’Ã©ÂÅ¾Ã§Â±Â»Ã¥Å¾â€¹Ã¦ÂÂ¥Ã¥â€˜Â½Ã¥ÂÂ
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥Â¸Â¸Ã©â€¡ÂÃ¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `static let` Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥Â¸Â¸Ã©â€¡Â

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

Ã¤Â½Â¿Ã§â€Â¨Ã§Â±Â»Ã¥Å¾â€¹Ã¥Å’â€“ throws (Swift 6+) Ã¥â€™Å’Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥Å’Â¹Ã©â€¦ÂÃ¯Â¼Å¡

```swift
func load(id: String) throws(LoadError) -> Item {
    guard let data = try? read(from: path) else {
        throw .fileNotFound(id)
    }
    return try decode(data)
}
```

## Ã¥Â¹Â¶Ã¥Ââ€˜

Ã¥ÂÂ¯Ã§â€Â¨ Swift 6 Ã¤Â¸Â¥Ã¦Â Â¼Ã¥Â¹Â¶Ã¥Ââ€˜Ã¦Â£â‚¬Ã¦Å¸Â¥Ã£â‚¬â€šÃ¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Å¡

* `Sendable` Ã¥â‚¬Â¼Ã§Â±Â»Ã¥Å¾â€¹Ã§â€Â¨Ã¤ÂºÅ½Ã¨Â·Â¨Ã¨Â¶Å Ã©Å¡â€Ã§Â¦Â»Ã¨Â¾Â¹Ã§â€¢Å’Ã§Å¡â€žÃ¦â€¢Â°Ã¦ÂÂ®
* Actors Ã§â€Â¨Ã¤ÂºÅ½Ã¥â€¦Â±Ã¤ÂºÂ«Ã¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬Â
* Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¥Â¹Â¶Ã¥Ââ€˜ (`async let`, `TaskGroup`) Ã¨â‚¬Å’Ã©ÂÅ¾Ã©ÂÅ¾Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã§Å¡â€ž `Task {}`
