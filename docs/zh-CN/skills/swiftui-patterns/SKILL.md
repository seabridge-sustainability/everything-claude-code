---
name: swiftui-patterns
description: SwiftUI Ã¦Å¾Â¶Ã¦Å¾â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ @Observable Ã¨Â¿â€ºÃ¨Â¡Å’Ã§Å Â¶Ã¦â‚¬ÂÃ§Â®Â¡Ã§Ââ€ Ã¯Â¼Å’Ã¨Â§â€ Ã¥â€ºÂ¾Ã§Â»â€žÃ¥ÂË†Ã¯Â¼Å’Ã¥Â¯Â¼Ã¨Ë†ÂªÃ¯Â¼Å’Ã¦â‚¬Â§Ã¨Æ’Â½Ã¤Â¼ËœÃ¥Å’â€“Ã¯Â¼Å’Ã¤Â»Â¥Ã¥ÂÅ Ã§Å½Â°Ã¤Â»Â£ iOS/macOS UI Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·ÂµÃ£â‚¬â€š
---

# SwiftUI Ã¦Â¨Â¡Ã¥Â¼Â

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


Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½ Apple Ã¥Â¹Â³Ã¥ÂÂ°Ã§Å¡â€žÃ§Å½Â°Ã¤Â»Â£ SwiftUI Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã§â€Â¨Ã¤ÂºÅ½Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â£Â°Ã¦ËœÅ½Ã¥Â¼ÂÃ£â‚¬ÂÃ©Â«ËœÃ¦â‚¬Â§Ã¨Æ’Â½Ã§Å¡â€žÃ§â€Â¨Ã¦Ë†Â·Ã§â€¢Å’Ã©ÂÂ¢Ã£â‚¬â€šÃ¦Â¶ÂµÃ§â€ºâ€“ Observation Ã¦Â¡â€ Ã¦Å¾Â¶Ã£â‚¬ÂÃ¨Â§â€ Ã¥â€ºÂ¾Ã§Â»â€žÃ¥ÂË†Ã£â‚¬ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Â¯Â¼Ã¨Ë†ÂªÃ¥â€™Å’Ã¦â‚¬Â§Ã¨Æ’Â½Ã¤Â¼ËœÃ¥Å’â€“Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¦Â¿â‚¬Ã¦Â´Â»

* Ã¦Å¾â€žÃ¥Â»Âº SwiftUI Ã¨Â§â€ Ã¥â€ºÂ¾Ã¥â€™Å’Ã§Â®Â¡Ã§Ââ€ Ã§Å Â¶Ã¦â‚¬ÂÃ¦â€”Â¶Ã¯Â¼Ë†`@State`Ã£â‚¬Â`@Observable`Ã£â‚¬Â`@Binding`Ã¯Â¼â€°
* Ã¤Â½Â¿Ã§â€Â¨ `NavigationStack` Ã¨Â®Â¾Ã¨Â®Â¡Ã¥Â¯Â¼Ã¨Ë†ÂªÃ¦ÂµÂÃ§Â¨â€¹Ã¦â€”Â¶
* Ã¦Å¾â€žÃ¥Â»ÂºÃ¨Â§â€ Ã¥â€ºÂ¾Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥â€™Å’Ã¦â€¢Â°Ã¦ÂÂ®Ã¦ÂµÂÃ¦â€”Â¶
* Ã¤Â¼ËœÃ¥Å’â€“Ã¥Ë†â€”Ã¨Â¡Â¨Ã¥â€™Å’Ã¥Â¤ÂÃ¦Ââ€šÃ¥Â¸Æ’Ã¥Â±â‚¬Ã§Å¡â€žÃ¦Â¸Â²Ã¦Å¸â€œÃ¦â‚¬Â§Ã¨Æ’Â½Ã¦â€”Â¶
* Ã¥Å“Â¨ SwiftUI Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã§Å½Â¯Ã¥Â¢Æ’Ã¥â‚¬Â¼Ã¥â€™Å’Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥Ã¦â€”Â¶

## Ã§Å Â¶Ã¦â‚¬ÂÃ§Â®Â¡Ã§Ââ€ 

### Ã¥Â±Å¾Ã¦â‚¬Â§Ã¥Å’â€¦Ã¨Â£â€¦Ã¥â„¢Â¨Ã©â‚¬â€°Ã¦â€¹Â©

Ã©â‚¬â€°Ã¦â€¹Â©Ã¦Å“â‚¬Ã©â‚¬â€šÃ¥ÂË†Ã§Å¡â€žÃ¦Å“â‚¬Ã§Â®â‚¬Ã¥Ââ€¢Ã¥Å’â€¦Ã¨Â£â€¦Ã¥â„¢Â¨Ã¯Â¼Å¡

| Ã¥Å’â€¦Ã¨Â£â€¦Ã¥â„¢Â¨ | Ã¤Â½Â¿Ã§â€Â¨Ã¥Å“ÂºÃ¦â„¢Â¯ |
|---------|----------|
| `@State` | Ã¨Â§â€ Ã¥â€ºÂ¾Ã¦Å“Â¬Ã¥Å“Â°Ã§Å¡â€žÃ¥â‚¬Â¼Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Ë†Ã¥Â¼â‚¬Ã¥â€¦Â³Ã£â‚¬ÂÃ¨Â¡Â¨Ã¥Ââ€¢Ã¥Â­â€”Ã¦Â®ÂµÃ£â‚¬ÂSheet Ã¥Â±â€¢Ã§Â¤ÂºÃ¯Â¼â€° |
| `@Binding` | Ã¦Å’â€¡Ã¥Ââ€˜Ã§Ë†Â¶Ã¨Â§â€ Ã¥â€ºÂ¾ `@State` Ã§Å¡â€žÃ¥ÂÅ’Ã¥Ââ€˜Ã¥Â¼â€¢Ã§â€Â¨ |
| `@Observable` Ã§Â±Â» + `@State` | Ã¦â€¹Â¥Ã¦Å“â€°Ã¥Â¤Å¡Ã¤Â¸ÂªÃ¥Â±Å¾Ã¦â‚¬Â§Ã§Å¡â€žÃ¨â€¡ÂªÃ¦Å“â€°Ã¦Â¨Â¡Ã¥Å¾â€¹ |
| `@Observable` Ã§Â±Â»Ã¯Â¼Ë†Ã¦â€”Â Ã¥Å’â€¦Ã¨Â£â€¦Ã¥â„¢Â¨Ã¯Â¼â€° | Ã¤Â»Å½Ã§Ë†Â¶Ã¨Â§â€ Ã¥â€ºÂ¾Ã¤Â¼Â Ã©â‚¬â€™Ã§Å¡â€žÃ¥ÂÂªÃ¨Â¯Â»Ã¥Â¼â€¢Ã§â€Â¨ |
| `@Bindable` | Ã¦Å’â€¡Ã¥Ââ€˜ `@Observable` Ã¥Â±Å¾Ã¦â‚¬Â§Ã§Å¡â€žÃ¥ÂÅ’Ã¥Ââ€˜Ã§Â»â€˜Ã¥Â®Å¡ |
| `@Environment` | Ã©â‚¬Å¡Ã¨Â¿â€¡ `.environment()` Ã¦Â³Â¨Ã¥â€¦Â¥Ã§Å¡â€žÃ¥â€¦Â±Ã¤ÂºÂ«Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹ |

### @Observable ViewModel

Ã¤Â½Â¿Ã§â€Â¨ `@Observable`Ã¯Â¼Ë†Ã¨â‚¬Å’Ã©ÂÅ¾ `ObservableObject`Ã¯Â¼â€°Ã¢â‚¬â€Ã¢â‚¬â€ Ã¥Â®Æ’Ã¨Â·Å¸Ã¨Â¸ÂªÃ¥Â±Å¾Ã¦â‚¬Â§Ã§ÂºÂ§Ã¥Ë†Â«Ã§Å¡â€žÃ¥ÂËœÃ¦â€ºÂ´Ã¯Â¼Å’Ã¥â€ºÂ Ã¦Â­Â¤ SwiftUI Ã¥ÂÂªÃ¤Â¼Å¡Ã©â€¡ÂÃ¦â€“Â°Ã¦Â¸Â²Ã¦Å¸â€œÃ¨Â¯Â»Ã¥Ââ€“Ã¤Âºâ€ Ã¥Â·Â²Ã¥ÂËœÃ¦â€ºÂ´Ã¥Â±Å¾Ã¦â‚¬Â§Ã§Å¡â€žÃ¨Â§â€ Ã¥â€ºÂ¾Ã¯Â¼Å¡

```swift
@Observable
final class ItemListViewModel {
    private(set) var items: [Item] = []
    private(set) var isLoading = false
    var searchText = ""

    private let repository: any ItemRepository

    init(repository: any ItemRepository = DefaultItemRepository()) {
        self.repository = repository
    }

    func load() async {
        isLoading = true
        defer { isLoading = false }
        items = (try? await repository.fetchAll()) ?? []
    }
}
```

### Ã¦Â¶Ë†Ã¨Â´Â¹ ViewModel Ã§Å¡â€žÃ¨Â§â€ Ã¥â€ºÂ¾

```swift
struct ItemListView: View {
    @State private var viewModel: ItemListViewModel

    init(viewModel: ItemListViewModel = ItemListViewModel()) {
        _viewModel = State(initialValue: viewModel)
    }

    var body: some View {
        List(viewModel.items) { item in
            ItemRow(item: item)
        }
        .searchable(text: $viewModel.searchText)
        .overlay { if viewModel.isLoading { ProgressView() } }
        .task { await viewModel.load() }
    }
}
```

### Ã§Å½Â¯Ã¥Â¢Æ’Ã¦Â³Â¨Ã¥â€¦Â¥

Ã§â€Â¨ `@Environment` Ã¦â€ºÂ¿Ã¦ÂÂ¢ `@EnvironmentObject`Ã¯Â¼Å¡

```swift
// Inject
ContentView()
    .environment(authManager)

// Consume
struct ProfileView: View {
    @Environment(AuthManager.self) private var auth

    var body: some View {
        Text(auth.currentUser?.name ?? "Guest")
    }
}
```

## Ã¨Â§â€ Ã¥â€ºÂ¾Ã§Â»â€žÃ¥ÂË†

### Ã¦ÂÂÃ¥Ââ€“Ã¥Â­ÂÃ¨Â§â€ Ã¥â€ºÂ¾Ã¤Â»Â¥Ã©â„¢ÂÃ¥Ë†Â¶Ã¥Â¤Â±Ã¦â€¢Ë†

Ã¥Â°â€ Ã¨Â§â€ Ã¥â€ºÂ¾Ã¦â€¹â€ Ã¥Ë†â€ Ã¤Â¸ÂºÃ¥Â°ÂÃ¥Å¾â€¹Ã£â‚¬ÂÃ¤Â¸â€œÃ¦Â³Â¨Ã§Å¡â€žÃ§Â»â€œÃ¦Å¾â€žÃ¤Â½â€œÃ£â‚¬â€šÃ¥Â½â€œÃ§Å Â¶Ã¦â‚¬ÂÃ¥ÂËœÃ¦â€ºÂ´Ã¦â€”Â¶Ã¯Â¼Å’Ã¥ÂÂªÃ¦Å“â€°Ã¨Â¯Â»Ã¥Ââ€“Ã¨Â¯Â¥Ã§Å Â¶Ã¦â‚¬ÂÃ§Å¡â€žÃ¥Â­ÂÃ¨Â§â€ Ã¥â€ºÂ¾Ã¤Â¼Å¡Ã©â€¡ÂÃ¦â€“Â°Ã¦Â¸Â²Ã¦Å¸â€œÃ¯Â¼Å¡

```swift
struct OrderView: View {
    @State private var viewModel = OrderViewModel()

    var body: some View {
        VStack {
            OrderHeader(title: viewModel.title)
            OrderItemList(items: viewModel.items)
            OrderTotal(total: viewModel.total)
        }
    }
}
```

### Ã§â€Â¨Ã¤ÂºÅ½Ã¥ÂÂ¯Ã¥Â¤ÂÃ§â€Â¨Ã¦Â Â·Ã¥Â¼ÂÃ§Å¡â€ž ViewModifier

```swift
struct CardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding()
            .background(.regularMaterial)
            .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

extension View {
    func cardStyle() -> some View {
        modifier(CardModifier())
    }
}
```

## Ã¥Â¯Â¼Ã¨Ë†Âª

### Ã§Â±Â»Ã¥Å¾â€¹Ã¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€ž NavigationStack

Ã¤Â½Â¿Ã§â€Â¨ `NavigationStack` Ã¤Â¸Å½ `NavigationPath` Ã¦ÂÂ¥Ã¥Â®Å¾Ã§Å½Â°Ã§Â¨â€¹Ã¥ÂºÂÃ¥Å’â€“Ã£â‚¬ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¨Â·Â¯Ã§â€Â±Ã¯Â¼Å¡

```swift
@Observable
final class Router {
    var path = NavigationPath()

    func navigate(to destination: Destination) {
        path.append(destination)
    }

    func popToRoot() {
        path = NavigationPath()
    }
}

enum Destination: Hashable {
    case detail(Item.ID)
    case settings
    case profile(User.ID)
}

struct RootView: View {
    @State private var router = Router()

    var body: some View {
        NavigationStack(path: $router.path) {
            HomeView()
                .navigationDestination(for: Destination.self) { dest in
                    switch dest {
                    case .detail(let id): ItemDetailView(itemID: id)
                    case .settings: SettingsView()
                    case .profile(let id): ProfileView(userID: id)
                    }
                }
        }
        .environment(router)
    }
}
```

## Ã¦â‚¬Â§Ã¨Æ’Â½

### Ã¤Â¸ÂºÃ¥Â¤Â§Ã¥Å¾â€¹Ã©â€ºâ€ Ã¥ÂË†Ã¤Â½Â¿Ã§â€Â¨Ã¦Æ’Â°Ã¦â‚¬Â§Ã¥Â®Â¹Ã¥â„¢Â¨

`LazyVStack` Ã¥â€™Å’ `LazyHStack` Ã¤Â»â€¦Ã¥Å“Â¨Ã¨Â§â€ Ã¥â€ºÂ¾Ã¥ÂÂ¯Ã¨Â§ÂÃ¦â€”Â¶Ã¦â€°ÂÃ¥Ë†â€ºÃ¥Â»ÂºÃ¥Â®Æ’Ã¤Â»Â¬Ã¯Â¼Å¡

```swift
ScrollView {
    LazyVStack(spacing: 8) {
        ForEach(items) { item in
            ItemRow(item: item)
        }
    }
}
```

### Ã§Â¨Â³Ã¥Â®Å¡Ã§Å¡â€žÃ¦Â â€¡Ã¨Â¯â€ Ã§Â¬Â¦

Ã¥Å“Â¨ `ForEach` Ã¤Â¸Â­Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨Ã§Â¨Â³Ã¥Â®Å¡Ã£â‚¬ÂÃ¥â€Â¯Ã¤Â¸â‚¬Ã§Å¡â€ž ID Ã¢â‚¬â€Ã¢â‚¬â€ Ã©ÂÂ¿Ã¥â€¦ÂÃ¤Â½Â¿Ã§â€Â¨Ã¦â€¢Â°Ã§Â»â€žÃ§Â´Â¢Ã¥Â¼â€¢Ã¯Â¼Å¡

```swift
// Use Identifiable conformance or explicit id
ForEach(items, id: \.stableID) { item in
    ItemRow(item: item)
}
```

### Ã©ÂÂ¿Ã¥â€¦ÂÃ¥Å“Â¨ body Ã¤Â¸Â­Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Ëœâ€šÃ¨Â´ÂµÃ¦â€œÂÃ¤Â½Å“

* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Å“Â¨ `body` Ã¥â€ â€¦Ã¦â€°Â§Ã¨Â¡Å’ I/OÃ£â‚¬ÂÃ§Â½â€˜Ã§Â»Å“Ã¨Â°Æ’Ã§â€Â¨Ã¦Ë†â€“Ã§Â¹ÂÃ©â€¡ÂÃ¨Â®Â¡Ã§Â®â€”
* Ã¤Â½Â¿Ã§â€Â¨ `.task {}` Ã¥Â¤â€žÃ§Ââ€ Ã¥Â¼â€šÃ¦Â­Â¥Ã¥Â·Â¥Ã¤Â½Å“ Ã¢â‚¬â€Ã¢â‚¬â€ Ã¥Â½â€œÃ¨Â§â€ Ã¥â€ºÂ¾Ã¦Â¶Ë†Ã¥Â¤Â±Ã¦â€”Â¶Ã¥Â®Æ’Ã¤Â¼Å¡Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Ââ€“Ã¦Â¶Ë†
* Ã¥Å“Â¨Ã¦Â»Å¡Ã¥Å Â¨Ã¨Â§â€ Ã¥â€ºÂ¾Ã¤Â¸Â­Ã¨Â°Â¨Ã¦â€¦Å½Ã¤Â½Â¿Ã§â€Â¨ `.sensoryFeedback()` Ã¥â€™Å’ `.geometryGroup()`
* Ã¥Å“Â¨Ã¥Ë†â€”Ã¨Â¡Â¨Ã¤Â¸Â­Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¤Â½Â¿Ã§â€Â¨ `.shadow()`Ã£â‚¬Â`.blur()` Ã¥â€™Å’ `.mask()` Ã¢â‚¬â€Ã¢â‚¬â€ Ã¥Â®Æ’Ã¤Â»Â¬Ã¤Â¼Å¡Ã¨Â§Â¦Ã¥Ââ€˜Ã¥Â±ÂÃ¥Â¹â€¢Ã¥Â¤â€“Ã¦Â¸Â²Ã¦Å¸â€œ

### Ã©ÂÂµÃ¥Â¾Âª Equatable

Ã¥Â¯Â¹Ã¤ÂºÅ½ body Ã¨Â®Â¡Ã§Â®â€”Ã¦Ëœâ€šÃ¨Â´ÂµÃ§Å¡â€žÃ¨Â§â€ Ã¥â€ºÂ¾Ã¯Â¼Å’Ã©ÂÂµÃ¥Â¾Âª `Equatable` Ã¤Â»Â¥Ã¨Â·Â³Ã¨Â¿â€¡Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€žÃ©â€¡ÂÃ¦â€“Â°Ã¦Â¸Â²Ã¦Å¸â€œÃ¯Â¼Å¡

```swift
struct ExpensiveChartView: View, Equatable {
    let dataPoints: [DataPoint] // DataPoint must conform to Equatable

    static func == (lhs: Self, rhs: Self) -> Bool {
        lhs.dataPoints == rhs.dataPoints
    }

    var body: some View {
        // Complex chart rendering
    }
}
```

## Ã©Â¢â€žÃ¨Â§Ë†

Ã¤Â½Â¿Ã§â€Â¨ `#Preview` Ã¥Â®ÂÃ©â€¦ÂÃ¥ÂË†Ã¥â€ â€¦Ã¨Ââ€Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¦â€¢Â°Ã¦ÂÂ®Ã¤Â»Â¥Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Â¿Â«Ã©â‚¬Å¸Ã¨Â¿Â­Ã¤Â»Â£Ã¯Â¼Å¡

```swift
#Preview("Empty state") {
    ItemListView(viewModel: ItemListViewModel(repository: EmptyMockRepository()))
}

#Preview("Loaded") {
    ItemListView(viewModel: ItemListViewModel(repository: PopulatedMockRepository()))
}
```

## Ã¥Âºâ€Ã©ÂÂ¿Ã¥â€¦ÂÃ§Å¡â€žÃ¥ÂÂÃ¦Â¨Â¡Ã¥Â¼Â

* Ã¥Å“Â¨Ã¦â€“Â°Ã¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `ObservableObject` / `@Published` / `@StateObject` / `@EnvironmentObject` Ã¢â‚¬â€Ã¢â‚¬â€ Ã¨Â¿ÂÃ§Â§Â»Ã¥Ë†Â° `@Observable`
* Ã¥Â°â€ Ã¥Â¼â€šÃ¦Â­Â¥Ã¥Â·Â¥Ã¤Â½Å“Ã§â€ºÂ´Ã¦Å½Â¥Ã¦â€Â¾Ã¥Å“Â¨ `body` Ã¦Ë†â€“ `init` Ã¤Â¸Â­ Ã¢â‚¬â€Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨ `.task {}` Ã¦Ë†â€“Ã¦ËœÂ¾Ã¥Â¼ÂÃ§Å¡â€žÃ¥Å Â Ã¨Â½Â½Ã¦â€“Â¹Ã¦Â³â€¢
* Ã¥Å“Â¨Ã¤Â¸ÂÃ¦â€¹Â¥Ã¦Å“â€°Ã¦â€¢Â°Ã¦ÂÂ®Ã§Å¡â€žÃ¥Â­ÂÃ¨Â§â€ Ã¥â€ºÂ¾Ã¤Â¸Â­Ã¥Â°â€ Ã¨Â§â€ Ã¥â€ºÂ¾Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥Ë†â€ºÃ¥Â»ÂºÃ¤Â¸Âº `@State` Ã¢â‚¬â€Ã¢â‚¬â€ Ã¦â€Â¹Ã¤Â¸ÂºÃ¤Â»Å½Ã§Ë†Â¶Ã¨Â§â€ Ã¥â€ºÂ¾Ã¤Â¼Â Ã©â‚¬â€™
* Ã¤Â½Â¿Ã§â€Â¨ `AnyView` Ã§Â±Â»Ã¥Å¾â€¹Ã¦â€œÂ¦Ã©â„¢Â¤ Ã¢â‚¬â€Ã¢â‚¬â€ Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦ÂÂ¡Ã¤Â»Â¶Ã¨Â§â€ Ã¥â€ºÂ¾Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã©â‚¬â€°Ã¦â€¹Â© `@ViewBuilder` Ã¦Ë†â€“ `Group`
* Ã¥Å“Â¨Ã¥Ââ€˜ Actor Ã¤Â¼Â Ã©â‚¬â€™Ã¦â€¢Â°Ã¦ÂÂ®Ã¦Ë†â€“Ã¤Â»Å½ Actor Ã¦Å½Â¥Ã¦â€Â¶Ã¦â€¢Â°Ã¦ÂÂ®Ã¦â€”Â¶Ã¥Â¿Â½Ã§â€¢Â¥ `Sendable` Ã¨Â¦ÂÃ¦Â±â€š

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`swift-actor-persistence` Ã¤Â»Â¥Ã¤Âºâ€ Ã¨Â§Â£Ã¥Å¸ÂºÃ¤ÂºÅ½ Actor Ã§Å¡â€žÃ¦Å’ÂÃ¤Â¹â€¦Ã¥Å’â€“Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š
Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`swift-protocol-di-testing` Ã¤Â»Â¥Ã¤Âºâ€ Ã¨Â§Â£Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¥ÂÂÃ¨Â®Â®Ã§Å¡â€ž DI Ã¥â€™Å’Ã¤Â½Â¿Ã§â€Â¨ Swift Testing Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€š
