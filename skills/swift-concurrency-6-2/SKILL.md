---
name: swift-concurrency-6-2
description: Swift 6.2 Approachable Concurrency — single-threaded by default, @concurrent for explicit background offloading, isolated conformances for main actor types. Use when adopting Swift 6.2 concurrency — offloading with @concurrent or resolving main-actor isolation.
---

# Swift 6.2 Approachable Concurrency

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

Patterns for adopting Swift 6.2's concurrency model where code runs single-threaded by default and concurrency is introduced explicitly. Eliminates common data-race errors without sacrificing performance.

## When to Activate

- Migrating Swift 5.x or 6.0/6.1 projects to Swift 6.2
- Resolving data-race safety compiler errors
- Designing MainActor-based app architecture
- Offloading CPU-intensive work to background threads
- Implementing protocol conformances on MainActor-isolated types
- Enabling Approachable Concurrency build settings in Xcode 26

## Core Problem: Implicit Background Offloading

In Swift 6.1 and earlier, async functions could be implicitly offloaded to background threads, causing data-race errors even in seemingly safe code:

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

Swift 6.2 fixes this: async functions stay on the calling actor by default.

```swift
// Swift 6.2: OK — async stays on MainActor, no data race
@MainActor
final class StickerModel {
    let photoProcessor = PhotoProcessor()

    func extractSticker(_ item: PhotosPickerItem) async throws -> Sticker? {
        guard let data = try await item.loadTransferable(type: Data.self) else { return nil }
        return await photoProcessor.extractSticker(data: data, with: item.itemIdentifier)
    }
}
```

## Core Pattern — Isolated Conformances

MainActor types can now conform to non-isolated protocols safely:

```swift
protocol Exportable {
    func export()
}

// Swift 6.1: ERROR — crosses into main actor-isolated code
// Swift 6.2: OK with isolated conformance
extension StickerModel: @MainActor Exportable {
    func export() {
        photoProcessor.exportAsPNG()
    }
}
```

The compiler ensures the conformance is only used on the main actor:

```swift
// OK — ImageExporter is also @MainActor
@MainActor
struct ImageExporter {
    var items: [any Exportable]

    mutating func add(_ item: StickerModel) {
        items.append(item)  // Safe: same actor isolation
    }
}

// ERROR — nonisolated context can't use MainActor conformance
nonisolated struct ImageExporter {
    var items: [any Exportable]

    mutating func add(_ item: StickerModel) {
        items.append(item)  // Error: Main actor-isolated conformance cannot be used here
    }
}
```

## Core Pattern — Global and Static Variables

Protect global/static state with MainActor:

```swift
// Swift 6.1: ERROR — non-Sendable type may have shared mutable state
final class StickerLibrary {
    static let shared: StickerLibrary = .init()  // Error
}

// Fix: Annotate with @MainActor
@MainActor
final class StickerLibrary {
    static let shared: StickerLibrary = .init()  // OK
}
```

### MainActor Default Inference Mode

Swift 6.2 introduces a mode where MainActor is inferred by default — no manual annotations needed:

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

This mode is opt-in and recommended for apps, scripts, and other executable targets.

## Core Pattern — @concurrent for Background Work

When you need actual parallelism, explicitly offload with `@concurrent`:

> **Important:** This example requires Approachable Concurrency build settings — SE-0466 (MainActor default isolation) and SE-0461 (NonisolatedNonsendingByDefault). With these enabled, `extractSticker` stays on the caller's actor, making mutable state access safe. **Without these settings, this code has a data race** — the compiler will flag it.

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

To use `@concurrent`:
1. Mark the containing type as `nonisolated`
2. Add `@concurrent` to the function
3. Add `async` if not already asynchronous
4. Add `await` at call sites

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Single-threaded by default | Most natural code is data-race free; concurrency is opt-in |
| Async stays on calling actor | Eliminates implicit offloading that caused data-race errors |
| Isolated conformances | MainActor types can conform to protocols without unsafe workarounds |
| `@concurrent` explicit opt-in | Background execution is a deliberate performance choice, not accidental |
| MainActor default inference | Reduces boilerplate `@MainActor` annotations for app targets |
| Opt-in adoption | Non-breaking migration path — enable features incrementally |

## Migration Steps

1. **Enable in Xcode**: Swift Compiler > Concurrency section in Build Settings
2. **Enable in SPM**: Use `SwiftSettings` API in package manifest
3. **Use migration tooling**: Automatic code changes via swift.org/migration
4. **Start with MainActor defaults**: Enable inference mode for app targets
5. **Add `@concurrent` where needed**: Profile first, then offload hot paths
6. **Test thoroughly**: Data-race issues become compile-time errors

## Best Practices

- **Start on MainActor** — write single-threaded code first, optimize later
- **Use `@concurrent` only for CPU-intensive work** — image processing, compression, complex computation
- **Enable MainActor inference mode** for app targets that are mostly single-threaded
- **Profile before offloading** — use Instruments to find actual bottlenecks
- **Protect globals with MainActor** — global/static mutable state needs actor isolation
- **Use isolated conformances** instead of `nonisolated` workarounds or `@Sendable` wrappers
- **Migrate incrementally** — enable features one at a time in build settings

## Anti-Patterns to Avoid

- Applying `@concurrent` to every async function (most don't need background execution)
- Using `nonisolated` to suppress compiler errors without understanding isolation
- Keeping legacy `DispatchQueue` patterns when actors provide the same safety
- Skipping `model.availability` checks in concurrency-related Foundation Models code
- Fighting the compiler — if it reports a data race, the code has a real concurrency issue
- Assuming all async code runs in the background (Swift 6.2 default: stays on calling actor)

## When to Use

- All new Swift 6.2+ projects (Approachable Concurrency is the recommended default)
- Migrating existing apps from Swift 5.x or 6.0/6.1 concurrency
- Resolving data-race safety compiler errors during Xcode 26 adoption
- Building MainActor-centric app architectures (most UI apps)
- Performance optimization — offloading specific heavy computations to background
