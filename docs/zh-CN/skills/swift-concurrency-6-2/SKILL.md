---
name: swift-concurrency-6-2
description: Swift 6.2 Ã¥ÂÂ¯Ã¦Å½Â¥Ã¨Â¿â€˜Ã§Å¡â€žÃ¥Â¹Â¶Ã¥Ââ€˜Ã¦â‚¬Â§ Ã¢â‚¬â€ Ã©Â»ËœÃ¨Â®Â¤Ã¥Ââ€¢Ã§ÂºÂ¿Ã§Â¨â€¹Ã¯Â¼Å’@concurrent Ã§â€Â¨Ã¤ÂºÅ½Ã¦ËœÂ¾Ã¥Â¼ÂÃ¥ÂÅ½Ã¥ÂÂ°Ã¥ÂÂ¸Ã¨Â½Â½Ã¯Â¼Å’Ã©Å¡â€Ã§Â¦Â»Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§Ã§â€Â¨Ã¤ÂºÅ½Ã¤Â¸Â» actor Ã§Â±Â»Ã¥Å¾â€¹Ã£â‚¬â€š
---

# Swift 6.2 Ã¥ÂÂ¯Ã¦Å½Â¥Ã¨Â¿â€˜Ã§Å¡â€žÃ¥Â¹Â¶Ã¥Ââ€˜

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


Ã©â€¡â€¡Ã§â€Â¨ Swift 6.2 Ã¥Â¹Â¶Ã¥Ââ€˜Ã¦Â¨Â¡Ã¥Å¾â€¹Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¥â€¦Â¶Ã¤Â¸Â­Ã¤Â»Â£Ã§Â ÂÃ©Â»ËœÃ¨Â®Â¤Ã¥Å“Â¨Ã¥Ââ€¢Ã§ÂºÂ¿Ã§Â¨â€¹Ã¤Â¸Å Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Ââ€˜Ã¦ËœÂ¯Ã¦ËœÂ¾Ã¥Â¼ÂÃ¥Â¼â€¢Ã¥â€¦Â¥Ã§Å¡â€žÃ£â‚¬â€šÃ¥Å“Â¨Ã¦â€”Â Ã©Å“â‚¬Ã§â€°ÂºÃ§â€°Â²Ã¦â‚¬Â§Ã¨Æ’Â½Ã§Å¡â€žÃ¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¦Â¶Ë†Ã©â„¢Â¤Ã¥Â¸Â¸Ã¨Â§ÂÃ§Å¡â€žÃ¦â€¢Â°Ã¦ÂÂ®Ã§Â«Å¾Ã¤Âºâ€°Ã©â€â„¢Ã¨Â¯Â¯Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¥ÂÂ¯Ã§â€Â¨

* Ã¥Â°â€  Swift 5.x Ã¦Ë†â€“ 6.0/6.1 Ã©Â¡Â¹Ã§â€ºÂ®Ã¨Â¿ÂÃ§Â§Â»Ã¥Ë†Â° Swift 6.2
* Ã¨Â§Â£Ã¥â€ Â³Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â«Å¾Ã¤Âºâ€°Ã¥Â®â€°Ã¥â€¦Â¨Ã§Â¼â€“Ã¨Â¯â€˜Ã¥â„¢Â¨Ã©â€â„¢Ã¨Â¯Â¯
* Ã¨Â®Â¾Ã¨Â®Â¡Ã¥Å¸ÂºÃ¤ÂºÅ½ MainActor Ã§Å¡â€žÃ¥Âºâ€Ã§â€Â¨Ã¦Å¾Â¶Ã¦Å¾â€ž
* Ã¥Â°â€  CPU Ã¥Â¯â€ Ã©â€ºâ€ Ã¥Å¾â€¹Ã¥Â·Â¥Ã¤Â½Å“Ã¥ÂÂ¸Ã¨Â½Â½Ã¥Ë†Â°Ã¥ÂÅ½Ã¥ÂÂ°Ã§ÂºÂ¿Ã§Â¨â€¹
* Ã¥Å“Â¨ MainActor Ã©Å¡â€Ã§Â¦Â»Ã§Å¡â€žÃ§Â±Â»Ã¥Å¾â€¹Ã¤Â¸Å Ã¥Â®Å¾Ã§Å½Â°Ã¥ÂÂÃ¨Â®Â®Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§
* Ã¥Å“Â¨ Xcode 26 Ã¤Â¸Â­Ã¥ÂÂ¯Ã§â€Â¨Ã¢â‚¬Å“Ã¥ÂÂ¯Ã¦Å½Â¥Ã¨Â¿â€˜Ã§Å¡â€žÃ¥Â¹Â¶Ã¥Ââ€˜Ã¢â‚¬ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ¨Â®Â¾Ã§Â½Â®

## Ã¦Â Â¸Ã¥Â¿Æ’Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å¡Ã©Å¡ÂÃ¥Â¼ÂÃ§Å¡â€žÃ¥ÂÅ½Ã¥ÂÂ°Ã¥ÂÂ¸Ã¨Â½Â½

Ã¥Å“Â¨ Swift 6.1 Ã¥ÂÅ Ã¦â€ºÂ´Ã¦â€”Â©Ã§â€°Ë†Ã¦Å“Â¬Ã¤Â¸Â­Ã¯Â¼Å’Ã¥Â¼â€šÃ¦Â­Â¥Ã¥â€¡Â½Ã¦â€¢Â°Ã¥ÂÂ¯Ã¨Æ’Â½Ã¤Â¼Å¡Ã¨Â¢Â«Ã©Å¡ÂÃ¥Â¼ÂÃ¥ÂÂ¸Ã¨Â½Â½Ã¥Ë†Â°Ã¥ÂÅ½Ã¥ÂÂ°Ã§ÂºÂ¿Ã§Â¨â€¹Ã¯Â¼Å’Ã¥ÂÂ³Ã¤Â½Â¿Ã¥Å“Â¨Ã§Å“â€¹Ã¤Â¼Â¼Ã¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¤Â¹Å¸Ã¤Â¼Å¡Ã¥Â¯Â¼Ã¨â€¡Â´Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â«Å¾Ã¤Âºâ€°Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡

```swift
// Swift 6.1: ERROR
@MainActor
final class StickerModel {
    let photoProcessor = PhotoProcessor()

    func extractSticker(_ item: PhotosPickerItem) async throws -> Sticker? {
        guard let data = try await item.loadTransferable(type: Data.self) else { return nil }

        // Error: Sending 'self.photoProcessor' risks causing data races
        return await photoProcessor.extractSticker(data: data, with: item.itemIdentifier)
    }
}
```

Swift 6.2 Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Âºâ€ Ã¨Â¿â„¢Ã¤Â¸ÂªÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å¡Ã¥Â¼â€šÃ¦Â­Â¥Ã¥â€¡Â½Ã¦â€¢Â°Ã©Â»ËœÃ¨Â®Â¤Ã¤Â¿ÂÃ¦Å’ÂÃ¥Å“Â¨Ã¨Â°Æ’Ã§â€Â¨Ã¨â‚¬â€¦Ã¦â€°â‚¬Ã¥Å“Â¨Ã§Å¡â€ž actor Ã¤Â¸Å Ã£â‚¬â€š

```swift
// Swift 6.2: OK Ã¢â‚¬â€ async stays on MainActor, no data race
@MainActor
final class StickerModel {
    let photoProcessor = PhotoProcessor()

    func extractSticker(_ item: PhotosPickerItem) async throws -> Sticker? {
        guard let data = try await item.loadTransferable(type: Data.self) else { return nil }
        return await photoProcessor.extractSticker(data: data, with: item.itemIdentifier)
    }
}
```

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¨Â¡Ã¥Â¼Â Ã¢â‚¬â€ Ã©Å¡â€Ã§Â¦Â»Ã§Å¡â€žÃ¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§

MainActor Ã§Â±Â»Ã¥Å¾â€¹Ã§Å½Â°Ã¥Å“Â¨Ã¥ÂÂ¯Ã¤Â»Â¥Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Å“Â°Ã§Â¬Â¦Ã¥ÂË†Ã©ÂÅ¾Ã©Å¡â€Ã§Â¦Â»Ã¥ÂÂÃ¨Â®Â®Ã¯Â¼Å¡

```swift
protocol Exportable {
    func export()
}

// Swift 6.1: ERROR Ã¢â‚¬â€ crosses into main actor-isolated code
// Swift 6.2: OK with isolated conformance
extension StickerModel: @MainActor Exportable {
    func export() {
        photoProcessor.exportAsPNG()
    }
}
```

Ã§Â¼â€“Ã¨Â¯â€˜Ã¥â„¢Â¨Ã§Â¡Â®Ã¤Â¿ÂÃ¨Â¯Â¥Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§Ã¤Â»â€¦Ã¥Å“Â¨Ã¤Â¸Â» actor Ã¤Â¸Å Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Å¡

```swift
// OK Ã¢â‚¬â€ ImageExporter is also @MainActor
@MainActor
struct ImageExporter {
    var items: [any Exportable]

    mutating func add(_ item: StickerModel) {
        items.append(item)  // Safe: same actor isolation
    }
}

// ERROR Ã¢â‚¬â€ nonisolated context can't use MainActor conformance
nonisolated struct ImageExporter {
    var items: [any Exportable]

    mutating func add(_ item: StickerModel) {
        items.append(item)  // Error: Main actor-isolated conformance cannot be used here
    }
}
```

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¨Â¡Ã¥Â¼Â Ã¢â‚¬â€ Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥â€™Å’Ã©Ââ„¢Ã¦â‚¬ÂÃ¥ÂËœÃ©â€¡Â

Ã¤Â½Â¿Ã§â€Â¨ MainActor Ã¤Â¿ÂÃ¦Å Â¤Ã¥â€¦Â¨Ã¥Â±â‚¬/Ã©Ââ„¢Ã¦â‚¬ÂÃ§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å¡

```swift
// Swift 6.1: ERROR Ã¢â‚¬â€ non-Sendable type may have shared mutable state
final class StickerLibrary {
    static let shared: StickerLibrary = .init()  // Error
}

// Fix: Annotate with @MainActor
@MainActor
final class StickerLibrary {
    static let shared: StickerLibrary = .init()  // OK
}
```

### MainActor Ã©Â»ËœÃ¨Â®Â¤Ã¦Å½Â¨Ã¦â€“Â­Ã¦Â¨Â¡Ã¥Â¼Â

Swift 6.2 Ã¥Â¼â€¢Ã¥â€¦Â¥Ã¤Âºâ€ Ã¤Â¸â‚¬Ã§Â§ÂÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã©Â»ËœÃ¨Â®Â¤Ã¦Å½Â¨Ã¦â€“Â­ MainActor Ã¢â‚¬â€ Ã¦â€”Â Ã©Å“â‚¬Ã¦â€°â€¹Ã¥Å Â¨Ã¦Â â€¡Ã¦Â³Â¨Ã¯Â¼Å¡

```swift
// With MainActor default inference enabled:
final class StickerLibrary {
    static let shared: StickerLibrary = .init()  // Implicitly @MainActor
}

final class StickerModel {
    let photoProcessor: PhotoProcessor
    var selection: [PhotosPickerItem]  // Implicitly @MainActor
}

extension StickerModel: Exportable {  // Implicitly @MainActor conformance
    func export() {
        photoProcessor.exportAsPNG()
    }
}
```

Ã¦Â­Â¤Ã¦Â¨Â¡Ã¥Â¼ÂÃ¦ËœÂ¯Ã©â‚¬â€°Ã¦â€¹Â©Ã¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€žÃ¯Â¼Å’Ã¦Å½Â¨Ã¨ÂÂÃ§â€Â¨Ã¤ÂºÅ½Ã¥Âºâ€Ã§â€Â¨Ã£â‚¬ÂÃ¨â€žÅ¡Ã¦Å“Â¬Ã¥â€™Å’Ã¥â€¦Â¶Ã¤Â»â€“Ã¥ÂÂ¯Ã¦â€°Â§Ã¨Â¡Å’Ã§â€ºÂ®Ã¦Â â€¡Ã£â‚¬â€š

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¨Â¡Ã¥Â¼Â Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨ @concurrent Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥ÂÅ½Ã¥ÂÂ°Ã¥Â·Â¥Ã¤Â½Å“

Ã¥Â½â€œÃ©Å“â‚¬Ã¨Â¦ÂÃ§Å“Å¸Ã¦Â­Â£Ã§Å¡â€žÃ¥Â¹Â¶Ã¨Â¡Å’Ã¦â‚¬Â§Ã¦â€”Â¶Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `@concurrent` Ã¦ËœÂ¾Ã¥Â¼ÂÃ¥ÂÂ¸Ã¨Â½Â½Ã¯Â¼Å¡

> **Ã©â€¡ÂÃ¨Â¦ÂÃ¯Â¼Å¡** Ã¦Â­Â¤Ã§Â¤ÂºÃ¤Â¾â€¹Ã©Å“â‚¬Ã¨Â¦ÂÃ¥ÂÂ¯Ã§â€Â¨Ã¢â‚¬Å“Ã¥ÂÂ¯Ã¦Å½Â¥Ã¨Â¿â€˜Ã§Å¡â€žÃ¥Â¹Â¶Ã¥Ââ€˜Ã¢â‚¬ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ¨Â®Â¾Ã§Â½Â® Ã¢â‚¬â€ SE-0466 (MainActor Ã©Â»ËœÃ¨Â®Â¤Ã©Å¡â€Ã§Â¦Â») Ã¥â€™Å’ SE-0461 (Ã©Â»ËœÃ¨Â®Â¤Ã©ÂÅ¾Ã©Å¡â€Ã§Â¦Â»Ã©ÂÅ¾Ã¥Ââ€˜Ã©â‚¬Â)Ã£â‚¬â€šÃ¥ÂÂ¯Ã§â€Â¨Ã¨Â¿â„¢Ã¤Âºâ€ºÃ¨Â®Â¾Ã§Â½Â®Ã¥ÂÅ½Ã¯Â¼Å’`extractSticker` Ã¤Â¼Å¡Ã¤Â¿ÂÃ¦Å’ÂÃ¥Å“Â¨Ã¨Â°Æ’Ã§â€Â¨Ã¨â‚¬â€¦Ã¦â€°â‚¬Ã¥Å“Â¨Ã§Å¡â€ž actor Ã¤Â¸Å Ã¯Â¼Å’Ã¤Â½Â¿Ã¥Â¾â€”Ã¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬ÂÃ§Å¡â€žÃ¨Â®Â¿Ã©â€”Â®Ã¥ÂËœÃ¥Â¾â€”Ã¥Â®â€°Ã¥â€¦Â¨Ã£â‚¬â€š**Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Â²Â¡Ã¦Å“â€°Ã¨Â¿â„¢Ã¤Âºâ€ºÃ¨Â®Â¾Ã§Â½Â®Ã¯Â¼Å’Ã¦Â­Â¤Ã¤Â»Â£Ã§Â ÂÃ¥Â­ËœÃ¥Å“Â¨Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â«Å¾Ã¤Âºâ€°** Ã¢â‚¬â€ Ã§Â¼â€“Ã¨Â¯â€˜Ã¥â„¢Â¨Ã¤Â¼Å¡Ã¦Â â€¡Ã¨Â®Â°Ã¥Â®Æ’Ã£â‚¬â€š

```swift
nonisolated final class PhotoProcessor {
    private var cachedStickers: [String: Sticker] = [:]

    func extractSticker(data: Data, with id: String) async -> Sticker {
        if let sticker = cachedStickers[id] {
            return sticker
        }

        let sticker = await Self.extractSubject(from: data)
        cachedStickers[id] = sticker
        return sticker
    }

    // Offload expensive work to concurrent thread pool
    @concurrent
    static func extractSubject(from data: Data) async -> Sticker { /* ... */ }
}

// Callers must await
let processor = PhotoProcessor()
processedPhotos[item.id] = await processor.extractSticker(data: data, with: item.id)
```

Ã¨Â¦ÂÃ¤Â½Â¿Ã§â€Â¨ `@concurrent`Ã¯Â¼Å¡

1. Ã¥Â°â€ Ã¥Å’â€¦Ã¥ÂÂ«Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â â€¡Ã¨Â®Â°Ã¤Â¸Âº `nonisolated`
2. Ã¥Ââ€˜Ã¥â€¡Â½Ã¦â€¢Â°Ã¦Â·Â»Ã¥Å Â  `@concurrent`
3. Ã¥Â¦â€šÃ¦Å¾Å“Ã¥â€¡Â½Ã¦â€¢Â°Ã¨Â¿ËœÃ¤Â¸ÂÃ¦ËœÂ¯Ã¥Â¼â€šÃ¦Â­Â¥Ã§Å¡â€žÃ¯Â¼Å’Ã¥Ë†â„¢Ã¦Â·Â»Ã¥Å Â  `async`
4. Ã¥Å“Â¨Ã¨Â°Æ’Ã§â€Â¨Ã§â€šÂ¹Ã¦Â·Â»Ã¥Å Â  `await`

## Ã¥â€¦Â³Ã©â€Â®Ã¨Â®Â¾Ã¨Â®Â¡Ã¥â€ Â³Ã§Â­â€“

| Ã¥â€ Â³Ã§Â­â€“ | Ã¥Å½Å¸Ã§Ââ€  |
|----------|-----------|
| Ã©Â»ËœÃ¨Â®Â¤Ã¥Ââ€¢Ã§ÂºÂ¿Ã§Â¨â€¹ | Ã¦Å“â‚¬Ã¨â€¡ÂªÃ§â€žÂ¶Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¦ËœÂ¯Ã¦â€”Â Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â«Å¾Ã¤Âºâ€°Ã§Å¡â€žÃ¯Â¼â€ºÃ¥Â¹Â¶Ã¥Ââ€˜Ã¦ËœÂ¯Ã©â‚¬â€°Ã¦â€¹Â©Ã¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€ž |
| Ã¥Â¼â€šÃ¦Â­Â¥Ã¥â€¡Â½Ã¦â€¢Â°Ã¤Â¿ÂÃ¦Å’ÂÃ¥Å“Â¨Ã¨Â°Æ’Ã§â€Â¨Ã¨â‚¬â€¦Ã¦â€°â‚¬Ã¥Å“Â¨Ã§Å¡â€ž actor Ã¤Â¸Å  | Ã¦Â¶Ë†Ã©â„¢Â¤Ã¤Âºâ€ Ã¥Â¯Â¼Ã¨â€¡Â´Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â«Å¾Ã¤Âºâ€°Ã©â€â„¢Ã¨Â¯Â¯Ã§Å¡â€žÃ©Å¡ÂÃ¥Â¼ÂÃ¥ÂÂ¸Ã¨Â½Â½ |
| Ã©Å¡â€Ã§Â¦Â»Ã§Å¡â€žÃ¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§ | MainActor Ã§Â±Â»Ã¥Å¾â€¹Ã¥ÂÂ¯Ã¤Â»Â¥Ã§Â¬Â¦Ã¥ÂË†Ã¥ÂÂÃ¨Â®Â®Ã¯Â¼Å’Ã¨â‚¬Å’Ã¦â€”Â Ã©Å“â‚¬Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¥ÂËœÃ©â‚¬Å¡Ã¦â€“Â¹Ã¦Â³â€¢ |
| `@concurrent` Ã¦ËœÂ¾Ã¥Â¼ÂÃ©â‚¬â€°Ã¦â€¹Â©Ã¥ÂÂ¯Ã§â€Â¨ | Ã¥ÂÅ½Ã¥ÂÂ°Ã¦â€°Â§Ã¨Â¡Å’Ã¦ËœÂ¯Ã¤Â¸â‚¬Ã§Â§ÂÃ¦Å“â€°Ã¦â€žÂÃ§Å¡â€žÃ¦â‚¬Â§Ã¨Æ’Â½Ã©â‚¬â€°Ã¦â€¹Â©Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥ÂÂ¶Ã§â€žÂ¶ |
| MainActor Ã©Â»ËœÃ¨Â®Â¤Ã¦Å½Â¨Ã¦â€“Â­ | Ã¥â€¡ÂÃ¥Â°â€˜Ã¤Âºâ€ Ã¥Âºâ€Ã§â€Â¨Ã§â€ºÂ®Ã¦Â â€¡Ã¤Â¸Â­Ã¦Â Â·Ã¦ÂÂ¿Ã¥Å’â€“Ã§Å¡â€ž `@MainActor` Ã¦Â â€¡Ã¦Â³Â¨ |
| Ã©â‚¬â€°Ã¦â€¹Â©Ã¥ÂÂ¯Ã§â€Â¨Ã©â€¡â€¡Ã§â€Â¨ | Ã©ÂÅ¾Ã§Â Â´Ã¥ÂÂÃ¦â‚¬Â§Ã§Å¡â€žÃ¨Â¿ÂÃ§Â§Â»Ã¨Â·Â¯Ã¥Â¾â€ž Ã¢â‚¬â€ Ã©â‚¬ÂÃ¦Â­Â¥Ã¥ÂÂ¯Ã§â€Â¨Ã¥Å Å¸Ã¨Æ’Â½ |

## Ã¨Â¿ÂÃ§Â§Â»Ã¦Â­Â¥Ã©ÂªÂ¤

1. **Ã¥Å“Â¨ Xcode Ã¤Â¸Â­Ã¥ÂÂ¯Ã§â€Â¨**Ã¯Â¼Å¡Ã¦Å¾â€žÃ¥Â»ÂºÃ¨Â®Â¾Ã§Â½Â®Ã¤Â¸Â­Ã§Å¡â€ž Swift Compiler > Concurrency Ã©Æ’Â¨Ã¥Ë†â€ 
2. **Ã¥Å“Â¨ SPM Ã¤Â¸Â­Ã¥ÂÂ¯Ã§â€Â¨**Ã¯Â¼Å¡Ã¥Å“Â¨Ã¥Å’â€¦Ã¦Â¸â€¦Ã¥Ââ€¢Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `SwiftSettings` API
3. **Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¿ÂÃ§Â§Â»Ã¥Â·Â¥Ã¥â€¦Â·**Ã¯Â¼Å¡Ã©â‚¬Å¡Ã¨Â¿â€¡ swift.org/migration Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨â€¡ÂªÃ¥Å Â¨Ã¤Â»Â£Ã§Â ÂÃ¦â€ºÂ´Ã¦â€Â¹
4. **Ã¤Â»Å½ MainActor Ã©Â»ËœÃ¨Â®Â¤Ã¥â‚¬Â¼Ã¥Â¼â‚¬Ã¥Â§â€¹**Ã¯Â¼Å¡Ã¤Â¸ÂºÃ¥Âºâ€Ã§â€Â¨Ã§â€ºÂ®Ã¦Â â€¡Ã¥ÂÂ¯Ã§â€Â¨Ã¦Å½Â¨Ã¦â€“Â­Ã¦Â¨Â¡Ã¥Â¼Â
5. **Ã¥Å“Â¨Ã©Å“â‚¬Ã¨Â¦ÂÃ§Å¡â€žÃ¥Å“Â°Ã¦â€“Â¹Ã¦Â·Â»Ã¥Å Â  `@concurrent`**Ã¯Â¼Å¡Ã¥â€¦Ë†Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦â‚¬Â§Ã¨Æ’Â½Ã¥Ë†â€ Ã¦Å¾ÂÃ¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¥ÂÂ¸Ã¨Â½Â½Ã§Æ’Â­Ã§â€šÂ¹Ã¨Â·Â¯Ã¥Â¾â€ž
6. **Ã¥Â½Â»Ã¥Âºâ€¢Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Å¡Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â«Å¾Ã¤Âºâ€°Ã©â€”Â®Ã©Â¢ËœÃ¤Â¼Å¡Ã¥ÂËœÃ¦Ë†ÂÃ§Â¼â€“Ã¨Â¯â€˜Ã¦â€”Â¶Ã©â€â„¢Ã¨Â¯Â¯

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

* **Ã¤Â»Å½ MainActor Ã¥Â¼â‚¬Ã¥Â§â€¹** Ã¢â‚¬â€ Ã¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢Ã¥Ââ€¢Ã§ÂºÂ¿Ã§Â¨â€¹Ã¤Â»Â£Ã§Â ÂÃ¯Â¼Å’Ã§Â¨ÂÃ¥ÂÅ½Ã¥â€ ÂÃ¤Â¼ËœÃ¥Å’â€“
* **Ã¤Â»â€¦Ã¥Â¯Â¹ CPU Ã¥Â¯â€ Ã©â€ºâ€ Ã¥Å¾â€¹Ã¥Â·Â¥Ã¤Â½Å“Ã¤Â½Â¿Ã§â€Â¨ `@concurrent`** Ã¢â‚¬â€ Ã¥â€ºÂ¾Ã¥Æ’ÂÃ¥Â¤â€žÃ§Ââ€ Ã£â‚¬ÂÃ¥Å½â€¹Ã§Â¼Â©Ã£â‚¬ÂÃ¥Â¤ÂÃ¦Ââ€šÃ¨Â®Â¡Ã§Â®â€”
* **Ã¤Â¸ÂºÃ¤Â¸Â»Ã¨Â¦ÂÃ¦ËœÂ¯Ã¥Ââ€¢Ã§ÂºÂ¿Ã§Â¨â€¹Ã§Å¡â€žÃ¥Âºâ€Ã§â€Â¨Ã§â€ºÂ®Ã¦Â â€¡Ã¥ÂÂ¯Ã§â€Â¨ MainActor Ã¦Å½Â¨Ã¦â€“Â­Ã¦Â¨Â¡Ã¥Â¼Â**
* **Ã¥Å“Â¨Ã¥ÂÂ¸Ã¨Â½Â½Ã¥â€°ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã¦â‚¬Â§Ã¨Æ’Â½Ã¥Ë†â€ Ã¦Å¾Â** Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨ Instruments Ã¦Å¸Â¥Ã¦â€°Â¾Ã¥Â®Å¾Ã©â„¢â€¦Ã§Å¡â€žÃ§â€œÂ¶Ã©Â¢Ë†
* **Ã¤Â½Â¿Ã§â€Â¨ MainActor Ã¤Â¿ÂÃ¦Å Â¤Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥ÂËœÃ©â€¡Â** Ã¢â‚¬â€ Ã¥â€¦Â¨Ã¥Â±â‚¬/Ã©Ââ„¢Ã¦â‚¬ÂÃ¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬ÂÃ©Å“â‚¬Ã¨Â¦Â actor Ã©Å¡â€Ã§Â¦Â»
* **Ã¤Â½Â¿Ã§â€Â¨Ã©Å¡â€Ã§Â¦Â»Ã§Å¡â€žÃ¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§**Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯ `nonisolated` Ã¥ÂËœÃ©â‚¬Å¡Ã¦â€“Â¹Ã¦Â³â€¢Ã¦Ë†â€“ `@Sendable` Ã¥Å’â€¦Ã¨Â£â€¦Ã¥â„¢Â¨
* **Ã¥Â¢Å¾Ã©â€¡ÂÃ¨Â¿ÂÃ§Â§Â»** Ã¢â‚¬â€ Ã¥Å“Â¨Ã¦Å¾â€žÃ¥Â»ÂºÃ¨Â®Â¾Ã§Â½Â®Ã¤Â¸Â­Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¥ÂÂ¯Ã§â€Â¨Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Å Å¸Ã¨Æ’Â½

## Ã¥Âºâ€Ã©ÂÂ¿Ã¥â€¦ÂÃ§Å¡â€žÃ¥ÂÂÃ¦Â¨Â¡Ã¥Â¼Â

* Ã¥Â¯Â¹Ã¦Â¯ÂÃ¤Â¸ÂªÃ¥Â¼â€šÃ¦Â­Â¥Ã¥â€¡Â½Ã¦â€¢Â°Ã©Æ’Â½Ã¥Âºâ€Ã§â€Â¨ `@concurrent`Ã¯Â¼Ë†Ã¥Â¤Â§Ã¥Â¤Å¡Ã¦â€¢Â°Ã¤Â¸ÂÃ©Å“â‚¬Ã¨Â¦ÂÃ¥ÂÅ½Ã¥ÂÂ°Ã¦â€°Â§Ã¨Â¡Å’Ã¯Â¼â€°
* Ã¥Å“Â¨Ã¤Â¸ÂÃ§Ââ€ Ã¨Â§Â£Ã©Å¡â€Ã§Â¦Â»Ã§Å¡â€žÃ¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¤Â½Â¿Ã§â€Â¨ `nonisolated` Ã¦ÂÂ¥Ã¦Å â€˜Ã¥Ë†Â¶Ã§Â¼â€“Ã¨Â¯â€˜Ã¥â„¢Â¨Ã©â€â„¢Ã¨Â¯Â¯
* Ã¥Â½â€œ actor Ã¦ÂÂÃ¤Â¾â€ºÃ§â€ºÂ¸Ã¥ÂÅ’Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¦â€”Â¶Ã¯Â¼Å’Ã¤Â»ÂÃ¤Â¿ÂÃ§â€¢â„¢Ã©Ââ€”Ã§â€¢â„¢Ã§Å¡â€ž `DispatchQueue` Ã¦Â¨Â¡Ã¥Â¼Â
* Ã¥Å“Â¨Ã¥Â¹Â¶Ã¥Ââ€˜Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€ž Foundation Models Ã¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¨Â·Â³Ã¨Â¿â€¡ `model.availability` Ã¦Â£â‚¬Ã¦Å¸Â¥
* Ã¤Â¸Å½Ã§Â¼â€“Ã¨Â¯â€˜Ã¥â„¢Â¨Ã¥Â¯Â¹Ã¦Å â€” Ã¢â‚¬â€ Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â®Æ’Ã¦Å Â¥Ã¥â€˜Å Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â«Å¾Ã¤Âºâ€°Ã¯Â¼Å’Ã¤Â»Â£Ã§Â ÂÃ¥Â°Â±Ã¥Â­ËœÃ¥Å“Â¨Ã§Å“Å¸Ã¦Â­Â£Ã§Å¡â€žÃ¥Â¹Â¶Ã¥Ââ€˜Ã©â€”Â®Ã©Â¢Ëœ
* Ã¥Ââ€¡Ã¨Â®Â¾Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â¼â€šÃ¦Â­Â¥Ã¤Â»Â£Ã§Â ÂÃ©Æ’Â½Ã¥Å“Â¨Ã¥ÂÅ½Ã¥ÂÂ°Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Ë†Swift 6.2 Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼Å¡Ã¤Â¿ÂÃ¦Å’ÂÃ¥Å“Â¨Ã¨Â°Æ’Ã§â€Â¨Ã¨â‚¬â€¦Ã¦â€°â‚¬Ã¥Å“Â¨Ã§Å¡â€ž actor Ã¤Â¸Å Ã¯Â¼â€°

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

* Ã¦â€°â‚¬Ã¦Å“â€°Ã¦â€“Â°Ã§Å¡â€ž Swift 6.2+ Ã©Â¡Â¹Ã§â€ºÂ®Ã¯Â¼Ë†Ã¢â‚¬Å“Ã¥ÂÂ¯Ã¦Å½Â¥Ã¨Â¿â€˜Ã§Å¡â€žÃ¥Â¹Â¶Ã¥Ââ€˜Ã¢â‚¬ÂÃ¦ËœÂ¯Ã¦Å½Â¨Ã¨ÂÂÃ§Å¡â€žÃ©Â»ËœÃ¨Â®Â¤Ã¨Â®Â¾Ã§Â½Â®Ã¯Â¼â€°
* Ã¥Â°â€ Ã§Å½Â°Ã¦Å“â€°Ã¥Âºâ€Ã§â€Â¨Ã¤Â»Å½ Swift 5.x Ã¦Ë†â€“ 6.0/6.1 Ã¥Â¹Â¶Ã¥Ââ€˜Ã¨Â¿ÂÃ§Â§Â»Ã¨Â¿â€¡Ã¦ÂÂ¥
* Ã¥Å“Â¨Ã©â€¡â€¡Ã§â€Â¨ Xcode 26 Ã¦Å“Å¸Ã©â€”Â´Ã¨Â§Â£Ã¥â€ Â³Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â«Å¾Ã¤Âºâ€°Ã¥Â®â€°Ã¥â€¦Â¨Ã§Â¼â€“Ã¨Â¯â€˜Ã¥â„¢Â¨Ã©â€â„¢Ã¨Â¯Â¯
* Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â»Â¥ MainActor Ã¤Â¸ÂºÃ¤Â¸Â­Ã¥Â¿Æ’Ã§Å¡â€žÃ¥Âºâ€Ã§â€Â¨Ã¦Å¾Â¶Ã¦Å¾â€žÃ¯Â¼Ë†Ã¥Â¤Â§Ã¥Â¤Å¡Ã¦â€¢Â° UI Ã¥Âºâ€Ã§â€Â¨Ã¯Â¼â€°
* Ã¦â‚¬Â§Ã¨Æ’Â½Ã¤Â¼ËœÃ¥Å’â€“ Ã¢â‚¬â€ Ã¥Â°â€ Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ§Â¹ÂÃ©â€¡ÂÃ¨Â®Â¡Ã§Â®â€”Ã¥ÂÂ¸Ã¨Â½Â½Ã¥Ë†Â°Ã¥ÂÅ½Ã¥ÂÂ°
