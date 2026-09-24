---
name: swift-protocol-di-testing
description: Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¥ÂÂÃ¨Â®Â®Ã§Å¡â€žÃ¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥Ã¯Â¼Å’Ã§â€Â¨Ã¤ÂºÅ½Ã¥ÂÂ¯Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žSwiftÃ¤Â»Â£Ã§Â ÂÃ¢â‚¬â€Ã¢â‚¬â€Ã¤Â½Â¿Ã§â€Â¨Ã¨ÂÅ¡Ã§â€žÂ¦Ã¥ÂÂÃ¨Â®Â®Ã¥â€™Å’Swift TestingÃ¦Â¨Â¡Ã¦â€¹Å¸Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â³Â»Ã§Â»Å¸Ã£â‚¬ÂÃ§Â½â€˜Ã§Â»Å“Ã¥â€™Å’Ã¥Â¤â€“Ã©Æ’Â¨APIÃ£â‚¬â€š
origin: ECC
---

# Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¥ÂÂÃ¨Â®Â®Ã§Å¡â€ž Swift Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢

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


Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥Â°â€ Ã¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¨Âµâ€“Ã¯Â¼Ë†Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â³Â»Ã§Â»Å¸Ã£â‚¬ÂÃ§Â½â€˜Ã§Â»Å“Ã£â‚¬ÂiCloudÃ¯Â¼â€°Ã¦Å Â½Ã¨Â±Â¡Ã¤Â¸ÂºÃ¥Â°ÂÃ¥Å¾â€¹Ã£â‚¬ÂÃ¤Â¸â€œÃ¦Â³Â¨Ã§Å¡â€žÃ¥ÂÂÃ¨Â®Â®Ã¯Â¼Å’Ã¤Â½Â¿ Swift Ã¤Â»Â£Ã§Â ÂÃ¥ÂÂ¯Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€šÃ¦â€Â¯Ã¦Å’ÂÃ¦â€”Â Ã©Å“â‚¬ I/O Ã§Å¡â€žÃ§Â¡Â®Ã¥Â®Å¡Ã¦â‚¬Â§Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¦Â¿â‚¬Ã¦Â´Â»

* Ã§Â¼â€“Ã¥â€ â„¢Ã¨Â®Â¿Ã©â€”Â®Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â³Â»Ã§Â»Å¸Ã£â‚¬ÂÃ§Â½â€˜Ã§Â»Å“Ã¦Ë†â€“Ã¥Â¤â€“Ã©Æ’Â¨ API Ã§Å¡â€ž Swift Ã¤Â»Â£Ã§Â ÂÃ¦â€”Â¶
* Ã©Å“â‚¬Ã¨Â¦ÂÃ¥Å“Â¨Ã¦Å“ÂªÃ¨Â§Â¦Ã¥Ââ€˜Ã§Å“Å¸Ã¥Â®Å¾Ã¦â€¢â€¦Ã©Å¡Å“Ã§Å¡â€žÃ¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ Ã¨Â·Â¯Ã¥Â¾â€žÃ¦â€”Â¶
* Ã¦Å¾â€žÃ¥Â»ÂºÃ©Å“â‚¬Ã¨Â¦ÂÃ¥Å“Â¨Ã¤Â¸ÂÃ¥ÂÅ’Ã§Å½Â¯Ã¥Â¢Æ’Ã¯Â¼Ë†Ã¥Âºâ€Ã§â€Â¨Ã£â‚¬ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬ÂSwiftUI Ã©Â¢â€žÃ¨Â§Ë†Ã¯Â¼â€°Ã¤Â¸Â­Ã¥Â·Â¥Ã¤Â½Å“Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Ââ€”Ã¦â€”Â¶
* Ã¨Â®Â¾Ã¨Â®Â¡Ã¦â€Â¯Ã¦Å’Â Swift Ã¥Â¹Â¶Ã¥Ââ€˜Ã¯Â¼Ë†actorÃ£â‚¬ÂSendableÃ¯Â¼â€°Ã§Å¡â€žÃ¥ÂÂ¯Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Å¾Â¶Ã¦Å¾â€žÃ¦â€”Â¶

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¨Â¡Ã¥Â¼Â

### 1. Ã¥Â®Å¡Ã¤Â¹â€°Ã¥Â°ÂÃ¥Å¾â€¹Ã£â‚¬ÂÃ¤Â¸â€œÃ¦Â³Â¨Ã§Å¡â€žÃ¥ÂÂÃ¨Â®Â®

Ã¦Â¯ÂÃ¤Â¸ÂªÃ¥ÂÂÃ¨Â®Â®Ã¤Â»â€¦Ã¥Â¤â€žÃ§Ââ€ Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Â¤â€“Ã©Æ’Â¨Ã¥â€¦Â³Ã¦Â³Â¨Ã§â€šÂ¹Ã£â‚¬â€š

```swift
// File system access
public protocol FileSystemProviding: Sendable {
    func containerURL(for purpose: Purpose) -> URL?
}

// File read/write operations
public protocol FileAccessorProviding: Sendable {
    func read(from url: URL) throws -> Data
    func write(_ data: Data, to url: URL) throws
    func fileExists(at url: URL) -> Bool
}

// Bookmark storage (e.g., for sandboxed apps)
public protocol BookmarkStorageProviding: Sendable {
    func saveBookmark(_ data: Data, for key: String) throws
    func loadBookmark(for key: String) throws -> Data?
}
```

### 2. Ã¥Ë†â€ºÃ¥Â»ÂºÃ©Â»ËœÃ¨Â®Â¤Ã¯Â¼Ë†Ã§â€Å¸Ã¤ÂºÂ§Ã¯Â¼â€°Ã¥Â®Å¾Ã§Å½Â°

```swift
public struct DefaultFileSystemProvider: FileSystemProviding {
    public init() {}

    public func containerURL(for purpose: Purpose) -> URL? {
        FileManager.default.url(forUbiquityContainerIdentifier: nil)
    }
}

public struct DefaultFileAccessor: FileAccessorProviding {
    public init() {}

    public func read(from url: URL) throws -> Data {
        try Data(contentsOf: url)
    }

    public func write(_ data: Data, to url: URL) throws {
        try data.write(to: url, options: .atomic)
    }

    public func fileExists(at url: URL) -> Bool {
        FileManager.default.fileExists(atPath: url.path)
    }
}
```

### 3. Ã¥Ë†â€ºÃ¥Â»ÂºÃ§â€Â¨Ã¤ÂºÅ½Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¦Â¨Â¡Ã¦â€¹Å¸Ã¥Â®Å¾Ã§Å½Â°

```swift
public final class MockFileAccessor: FileAccessorProviding, @unchecked Sendable {
    public var files: [URL: Data] = [:]
    public var readError: Error?
    public var writeError: Error?

    public init() {}

    public func read(from url: URL) throws -> Data {
        if let error = readError { throw error }
        guard let data = files[url] else {
            throw CocoaError(.fileReadNoSuchFile)
        }
        return data
    }

    public func write(_ data: Data, to url: URL) throws {
        if let error = writeError { throw error }
        files[url] = data
    }

    public func fileExists(at url: URL) -> Bool {
        files[url] != nil
    }
}
```

### 4. Ã¤Â½Â¿Ã§â€Â¨Ã©Â»ËœÃ¨Â®Â¤Ã¥Ââ€šÃ¦â€¢Â°Ã¦Â³Â¨Ã¥â€¦Â¥Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹

Ã§â€Å¸Ã¤ÂºÂ§Ã¤Â»Â£Ã§Â ÂÃ¤Â½Â¿Ã§â€Â¨Ã©Â»ËœÃ¨Â®Â¤Ã¥â‚¬Â¼Ã¯Â¼â€ºÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â³Â¨Ã¥â€¦Â¥Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¥Â¯Â¹Ã¨Â±Â¡Ã£â‚¬â€š

```swift
public actor SyncManager {
    private let fileSystem: FileSystemProviding
    private let fileAccessor: FileAccessorProviding

    public init(
        fileSystem: FileSystemProviding = DefaultFileSystemProvider(),
        fileAccessor: FileAccessorProviding = DefaultFileAccessor()
    ) {
        self.fileSystem = fileSystem
        self.fileAccessor = fileAccessor
    }

    public func sync() async throws {
        guard let containerURL = fileSystem.containerURL(for: .sync) else {
            throw SyncError.containerNotAvailable
        }
        let data = try fileAccessor.read(
            from: containerURL.appendingPathComponent("data.json")
        )
        // Process data...
    }
}
```

### 5. Ã¤Â½Â¿Ã§â€Â¨ Swift Testing Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢

```swift
import Testing

@Test("Sync manager handles missing container")
func testMissingContainer() async {
    let mockFileSystem = MockFileSystemProvider(containerURL: nil)
    let manager = SyncManager(fileSystem: mockFileSystem)

    await #expect(throws: SyncError.containerNotAvailable) {
        try await manager.sync()
    }
}

@Test("Sync manager reads data correctly")
func testReadData() async throws {
    let mockFileAccessor = MockFileAccessor()
    mockFileAccessor.files[testURL] = testData

    let manager = SyncManager(fileAccessor: mockFileAccessor)
    let result = try await manager.loadData()

    #expect(result == expectedData)
}

@Test("Sync manager handles read errors gracefully")
func testReadError() async {
    let mockFileAccessor = MockFileAccessor()
    mockFileAccessor.readError = CocoaError(.fileReadCorruptFile)

    let manager = SyncManager(fileAccessor: mockFileAccessor)

    await #expect(throws: SyncError.self) {
        try await manager.sync()
    }
}
```

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

* **Ã¥Ââ€¢Ã¤Â¸â‚¬Ã¨ÂÅ’Ã¨Â´Â£**Ã¯Â¼Å¡Ã¦Â¯ÂÃ¤Â¸ÂªÃ¥ÂÂÃ¨Â®Â®Ã¥Âºâ€Ã¥Â¤â€žÃ§Ââ€ Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥â€¦Â³Ã¦Â³Â¨Ã§â€šÂ¹Ã¢â‚¬â€Ã¢â‚¬â€Ã¤Â¸ÂÃ¨Â¦ÂÃ¥Ë†â€ºÃ¥Â»ÂºÃ¥Å’â€¦Ã¥ÂÂ«Ã¨Â®Â¸Ã¥Â¤Å¡Ã¦â€“Â¹Ã¦Â³â€¢Ã§Å¡â€žÃ¢â‚¬Å“Ã¤Â¸Å Ã¥Â¸ÂÃ¥ÂÂÃ¨Â®Â®Ã¢â‚¬Â
* **Sendable Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§**Ã¯Â¼Å¡Ã¥Â½â€œÃ¥ÂÂÃ¨Â®Â®Ã¨Â·Â¨ actor Ã¨Â¾Â¹Ã§â€¢Å’Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¶Ã©Å“â‚¬Ã¨Â¦Â
* **Ã©Â»ËœÃ¨Â®Â¤Ã¥Ââ€šÃ¦â€¢Â°**Ã¯Â¼Å¡Ã¨Â®Â©Ã§â€Å¸Ã¤ÂºÂ§Ã¤Â»Â£Ã§Â ÂÃ©Â»ËœÃ¨Â®Â¤Ã¤Â½Â¿Ã§â€Â¨Ã§Å“Å¸Ã¥Â®Å¾Ã¥Â®Å¾Ã§Å½Â°Ã¯Â¼â€ºÃ¥ÂÂªÃ¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Å“â‚¬Ã¨Â¦ÂÃ¦Å’â€¡Ã¥Â®Å¡Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¥Â¯Â¹Ã¨Â±Â¡
* **Ã©â€â„¢Ã¨Â¯Â¯Ã¦Â¨Â¡Ã¦â€¹Å¸**Ã¯Â¼Å¡Ã¨Â®Â¾Ã¨Â®Â¡Ã¥â€¦Â·Ã¦Å“â€°Ã¥ÂÂ¯Ã©â€¦ÂÃ§Â½Â®Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â±Å¾Ã¦â‚¬Â§Ã§Å¡â€žÃ¦Â¨Â¡Ã¦â€¹Å¸Ã¥Â¯Â¹Ã¨Â±Â¡Ã¤Â»Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€¢â€¦Ã©Å¡Å“Ã¨Â·Â¯Ã¥Â¾â€ž
* **Ã¤Â»â€¦Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¨Â¾Â¹Ã§â€¢Å’**Ã¯Â¼Å¡Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¨Âµâ€“Ã¯Â¼Ë†Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â³Â»Ã§Â»Å¸Ã£â‚¬ÂÃ§Â½â€˜Ã§Â»Å“Ã£â‚¬ÂAPIÃ¯Â¼â€°Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥â€ â€¦Ã©Æ’Â¨Ã§Â±Â»Ã¥Å¾â€¹

## Ã©Å“â‚¬Ã¨Â¦ÂÃ©ÂÂ¿Ã¥â€¦ÂÃ§Å¡â€žÃ¥ÂÂÃ¦Â¨Â¡Ã¥Â¼Â

* Ã¥Ë†â€ºÃ¥Â»ÂºÃ¨Â¦â€ Ã§â€ºâ€“Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â¤â€“Ã©Æ’Â¨Ã¨Â®Â¿Ã©â€”Â®Ã§Å¡â€žÃ¥Ââ€¢Ã¤Â¸ÂªÃ¥Â¤Â§Ã¥Å¾â€¹Ã¥ÂÂÃ¨Â®Â®
* Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¦Â²Â¡Ã¦Å“â€°Ã¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¨Âµâ€“Ã§Å¡â€žÃ¥â€ â€¦Ã©Æ’Â¨Ã§Â±Â»Ã¥Å¾â€¹
* Ã¤Â½Â¿Ã§â€Â¨ `#if DEBUG` Ã¦ÂÂ¡Ã¤Â»Â¶Ã¨Â¯Â­Ã¥ÂÂ¥Ã¤Â»Â£Ã¦â€ºÂ¿Ã©â‚¬â€šÃ¥Â½â€œÃ§Å¡â€žÃ¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥
* Ã¤Â¸Å½ actor Ã¤Â¸â‚¬Ã¨ÂµÂ·Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¶Ã¥Â¿ËœÃ¨Â®Â° `Sendable` Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§
* Ã¨Â¿â€¡Ã¥ÂºÂ¦Ã¨Â®Â¾Ã¨Â®Â¡Ã¯Â¼Å¡Ã¥Â¦â€šÃ¦Å¾Å“Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ§Â±Â»Ã¥Å¾â€¹Ã¦Â²Â¡Ã¦Å“â€°Ã¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¨Âµâ€“Ã¯Â¼Å’Ã¥Ë†â„¢Ã¤Â¸ÂÃ©Å“â‚¬Ã¨Â¦ÂÃ¥ÂÂÃ¨Â®Â®

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

* Ã¤Â»Â»Ã¤Â½â€¢Ã¨Â§Â¦Ã¥ÂÅ Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â³Â»Ã§Â»Å¸Ã£â‚¬ÂÃ§Â½â€˜Ã§Â»Å“Ã¦Ë†â€“Ã¥Â¤â€“Ã©Æ’Â¨ API Ã§Å¡â€ž Swift Ã¤Â»Â£Ã§Â Â
* Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Å“Â¨Ã§Å“Å¸Ã¥Â®Å¾Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­Ã©Å¡Â¾Ã¤Â»Â¥Ã¨Â§Â¦Ã¥Ââ€˜Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ Ã¨Â·Â¯Ã¥Â¾â€žÃ¦â€”Â¶
* Ã¦Å¾â€žÃ¥Â»ÂºÃ©Å“â‚¬Ã¨Â¦ÂÃ¥Å“Â¨Ã¥Âºâ€Ã§â€Â¨Ã£â‚¬ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€™Å’ SwiftUI Ã©Â¢â€žÃ¨Â§Ë†Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¤Â¸Â­Ã¥Â·Â¥Ã¤Â½Å“Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Ââ€”Ã¦â€”Â¶
* Ã©Å“â‚¬Ã¨Â¦ÂÃ¤Â½Â¿Ã§â€Â¨Ã¥ÂÂ¯Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Å¾Â¶Ã¦Å¾â€žÃ§Å¡â€žÃ£â‚¬ÂÃ©â€¡â€¡Ã§â€Â¨ Swift Ã¥Â¹Â¶Ã¥Ââ€˜Ã¯Â¼Ë†actorÃ£â‚¬ÂÃ§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¥Â¹Â¶Ã¥Ââ€˜Ã¯Â¼â€°Ã§Å¡â€žÃ¥Âºâ€Ã§â€Â¨
