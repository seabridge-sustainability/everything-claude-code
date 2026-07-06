---
name: liquid-glass-design
description: iOS 26 Ã¦Â¶Â²Ã¦â‚¬ÂÃ§Å½Â»Ã§â€™Æ’Ã¨Â®Â¾Ã¨Â®Â¡Ã§Â³Â»Ã§Â»Å¸ Ã¢â‚¬â€ Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½ SwiftUIÃ£â‚¬ÂUIKit Ã¥â€™Å’ WidgetKit Ã§Å¡â€žÃ¥Å Â¨Ã¦â‚¬ÂÃ§Å½Â»Ã§â€™Æ’Ã¦ÂÂÃ¨Â´Â¨Ã¯Â¼Å’Ã¥â€¦Â·Ã¦Å“â€°Ã¦Â¨Â¡Ã§Â³Å Ã£â‚¬ÂÃ¥ÂÂÃ¥Â°â€žÃ¥â€™Å’Ã¤ÂºÂ¤Ã¤Âºâ€™Ã¥Â¼ÂÃ¥ÂËœÃ¥Â½Â¢Ã¦â€¢Ë†Ã¦Å¾Å“Ã£â‚¬â€š
---

# Liquid Glass Ã¨Â®Â¾Ã¨Â®Â¡Ã§Â³Â»Ã§Â»Å¸ (iOS 26)

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


Ã¥Â®Å¾Ã§Å½Â°Ã¨â€¹Â¹Ã¦Å¾Å“ Liquid Glass Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ¦Å’â€¡Ã¥Ââ€”Ã¢â‚¬â€Ã¢â‚¬â€Ã¨Â¿â„¢Ã¦ËœÂ¯Ã¤Â¸â‚¬Ã§Â§ÂÃ¥Å Â¨Ã¦â‚¬ÂÃ¦ÂÂÃ¨Â´Â¨Ã¯Â¼Å’Ã¤Â¼Å¡Ã¦Â¨Â¡Ã§Â³Å Ã¥â€¦Â¶Ã¥ÂÅ½Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã¯Â¼Å’Ã¥ÂÂÃ¥Â°â€žÃ¥â€˜Â¨Ã¥â€ºÂ´Ã¥â€ â€¦Ã¥Â®Â¹Ã§Å¡â€žÃ©Â¢Å“Ã¨â€°Â²Ã¥â€™Å’Ã¥â€¦â€°Ã§ÂºÂ¿Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Â¯Â¹Ã¨Â§Â¦Ã¦â€˜Â¸Ã¥â€™Å’Ã¦Å’â€¡Ã©â€™Ë†Ã¤ÂºÂ¤Ã¤Âºâ€™Ã¥ÂÅ¡Ã¥â€¡ÂºÃ¥ÂÂÃ¥Âºâ€Ã£â‚¬â€šÃ¦Â¶ÂµÃ§â€ºâ€“ SwiftUIÃ£â‚¬ÂUIKit Ã¥â€™Å’ WidgetKit Ã©â€ºâ€ Ã¦Ë†ÂÃ£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¥ÂÂ¯Ã§â€Â¨

* Ã¤Â¸Âº iOS 26+ Ã¦Å¾â€žÃ¥Â»ÂºÃ¦Ë†â€“Ã¦â€ºÂ´Ã¦â€“Â°Ã©â€¡â€¡Ã§â€Â¨Ã¦â€“Â°Ã¨Â®Â¾Ã¨Â®Â¡Ã¨Â¯Â­Ã¨Â¨â‚¬Ã§Å¡â€žÃ¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ¦â€”Â¶
* Ã¥Â®Å¾Ã§Å½Â°Ã§Å½Â»Ã§â€™Æ’Ã©Â£Å½Ã¦Â Â¼Ã§Å¡â€žÃ¦Å’â€°Ã©â€™Â®Ã£â‚¬ÂÃ¥ÂÂ¡Ã§â€°â€¡Ã£â‚¬ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã¦Â ÂÃ¦Ë†â€“Ã¥Â®Â¹Ã¥â„¢Â¨Ã¦â€”Â¶
* Ã¥Å“Â¨Ã§Å½Â»Ã§â€™Æ’Ã¥â€¦Æ’Ã§Â´Â Ã¤Â¹â€¹Ã©â€”Â´Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥ÂËœÃ¥Â½Â¢Ã¨Â¿â€¡Ã¦Â¸Â¡Ã¦â€”Â¶
* Ã¥Â°â€  Liquid Glass Ã¦â€¢Ë†Ã¦Å¾Å“Ã¥Âºâ€Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â°ÂÃ§Â»â€žÃ¤Â»Â¶Ã¦â€”Â¶
* Ã¥Â°â€ Ã§Å½Â°Ã¦Å“â€°Ã§Å¡â€žÃ¦Â¨Â¡Ã§Â³Å /Ã¦ÂÂÃ¨Â´Â¨Ã¦â€¢Ë†Ã¦Å¾Å“Ã¨Â¿ÂÃ§Â§Â»Ã¥Ë†Â°Ã¦â€“Â°Ã§Å¡â€ž Liquid Glass API Ã¦â€”Â¶

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¨Â¡Ã¥Â¼Â Ã¢â‚¬â€ SwiftUI

### Ã¥Å¸ÂºÃ¦Å“Â¬Ã§Å½Â»Ã§â€™Æ’Ã¦â€¢Ë†Ã¦Å¾Å“

Ã¤Â¸ÂºÃ¤Â»Â»Ã¤Â½â€¢Ã¨Â§â€ Ã¥â€ºÂ¾Ã¦Â·Â»Ã¥Å Â  Liquid Glass Ã§Å¡â€žÃ¦Å“â‚¬Ã§Â®â‚¬Ã¥Ââ€¢Ã¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼Å¡

```swift
Text("Hello, World!")
    .font(.title)
    .padding()
    .glassEffect()  // Default: regular variant, capsule shape
```

### Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥Â½Â¢Ã§Å Â¶Ã¥â€™Å’Ã¨â€°Â²Ã¨Â°Æ’

```swift
Text("Hello, World!")
    .font(.title)
    .padding()
    .glassEffect(.regular.tint(.orange).interactive(), in: .rect(cornerRadius: 16.0))
```

Ã¥â€¦Â³Ã©â€Â®Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã©â‚¬â€°Ã©Â¡Â¹Ã¯Â¼Å¡

* `.regular` Ã¢â‚¬â€ Ã¦Â â€¡Ã¥â€¡â€ Ã§Å½Â»Ã§â€™Æ’Ã¦â€¢Ë†Ã¦Å¾Å“
* `.tint(Color)` Ã¢â‚¬â€ Ã¦Â·Â»Ã¥Å Â Ã©Â¢Å“Ã¨â€°Â²Ã¨â€°Â²Ã¨Â°Æ’Ã¤Â»Â¥Ã¥Â¢Å¾Ã¥Â¼ÂºÃ§ÂªÂÃ¥â€¡ÂºÃ¥ÂºÂ¦
* `.interactive()` Ã¢â‚¬â€ Ã¥Â¯Â¹Ã¨Â§Â¦Ã¦â€˜Â¸Ã¥â€™Å’Ã¦Å’â€¡Ã©â€™Ë†Ã¤ÂºÂ¤Ã¤Âºâ€™Ã¥ÂÅ¡Ã¥â€¡ÂºÃ¥ÂÂÃ¥Âºâ€
* Ã¥Â½Â¢Ã§Å Â¶Ã¯Â¼Å¡`.capsule`Ã¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼â€°Ã£â‚¬Â`.rect(cornerRadius:)`Ã£â‚¬Â`.circle`

### Ã§Å½Â»Ã§â€™Æ’Ã¦Å’â€°Ã©â€™Â®Ã¦Â Â·Ã¥Â¼Â

```swift
Button("Click Me") { /* action */ }
    .buttonStyle(.glass)

Button("Important") { /* action */ }
    .buttonStyle(.glassProminent)
```

### Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â¤Å¡Ã¤Â¸ÂªÃ¥â€¦Æ’Ã§Â´Â Ã§Å¡â€ž GlassEffectContainer

Ã¥â€¡ÂºÃ¤ÂºÅ½Ã¦â‚¬Â§Ã¨Æ’Â½Ã¥â€™Å’Ã¥ÂËœÃ¥Â½Â¢Ã¨â‚¬Æ’Ã¨â„¢â€˜Ã¯Â¼Å’Ã¥Â§â€¹Ã§Â»Ë†Ã¥Â°â€ Ã¥Â¤Å¡Ã¤Â¸ÂªÃ§Å½Â»Ã§â€™Æ’Ã¨Â§â€ Ã¥â€ºÂ¾Ã¥Å’â€¦Ã¨Â£â€¦Ã¥Å“Â¨Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Â®Â¹Ã¥â„¢Â¨Ã¤Â¸Â­Ã¯Â¼Å¡

```swift
GlassEffectContainer(spacing: 40.0) {
    HStack(spacing: 40.0) {
        Image(systemName: "scribble.variable")
            .frame(width: 80.0, height: 80.0)
            .font(.system(size: 36))
            .glassEffect()

        Image(systemName: "eraser.fill")
            .frame(width: 80.0, height: 80.0)
            .font(.system(size: 36))
            .glassEffect()
    }
}
```

`spacing` Ã¥Ââ€šÃ¦â€¢Â°Ã¦Å½Â§Ã¥Ë†Â¶Ã¥ÂË†Ã¥Â¹Â¶Ã¨Â·ÂÃ§Â¦Â»Ã¢â‚¬â€Ã¢â‚¬â€Ã¨Â·ÂÃ§Â¦Â»Ã¦â€ºÂ´Ã¨Â¿â€˜Ã§Å¡â€žÃ¥â€¦Æ’Ã§Â´Â Ã¤Â¼Å¡Ã¥Â°â€ Ã¥â€¦Â¶Ã§Å½Â»Ã§â€™Æ’Ã¥Â½Â¢Ã§Å Â¶Ã¨Å¾ÂÃ¥ÂË†Ã¥Å“Â¨Ã¤Â¸â‚¬Ã¨ÂµÂ·Ã£â‚¬â€š

### Ã§Â»Å¸Ã¤Â¸â‚¬Ã§Å½Â»Ã§â€™Æ’Ã¦â€¢Ë†Ã¦Å¾Å“

Ã¤Â½Â¿Ã§â€Â¨ `glassEffectUnion` Ã¥Â°â€ Ã¥Â¤Å¡Ã¤Â¸ÂªÃ¨Â§â€ Ã¥â€ºÂ¾Ã§Â»â€žÃ¥ÂË†Ã¦Ë†ÂÃ¥Ââ€¢Ã¤Â¸ÂªÃ§Å½Â»Ã§â€™Æ’Ã¥Â½Â¢Ã§Å Â¶Ã¯Â¼Å¡

```swift
@Namespace private var namespace

GlassEffectContainer(spacing: 20.0) {
    HStack(spacing: 20.0) {
        ForEach(symbolSet.indices, id: \.self) { item in
            Image(systemName: symbolSet[item])
                .frame(width: 80.0, height: 80.0)
                .glassEffect()
                .glassEffectUnion(id: item < 2 ? "group1" : "group2", namespace: namespace)
        }
    }
}
```

### Ã¥ÂËœÃ¥Â½Â¢Ã¨Â¿â€¡Ã¦Â¸Â¡

Ã¥Å“Â¨Ã§Å½Â»Ã§â€™Æ’Ã¥â€¦Æ’Ã§Â´Â Ã¥â€¡ÂºÃ§Å½Â°/Ã¦Â¶Ë†Ã¥Â¤Â±Ã¦â€”Â¶Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Â¹Â³Ã¦Â»â€˜Ã§Å¡â€žÃ¥ÂËœÃ¥Â½Â¢Ã¦â€¢Ë†Ã¦Å¾Å“Ã¯Â¼Å¡

```swift
@State private var isExpanded = false
@Namespace private var namespace

GlassEffectContainer(spacing: 40.0) {
    HStack(spacing: 40.0) {
        Image(systemName: "scribble.variable")
            .frame(width: 80.0, height: 80.0)
            .glassEffect()
            .glassEffectID("pencil", in: namespace)

        if isExpanded {
            Image(systemName: "eraser.fill")
                .frame(width: 80.0, height: 80.0)
                .glassEffect()
                .glassEffectID("eraser", in: namespace)
        }
    }
}

Button("Toggle") {
    withAnimation { isExpanded.toggle() }
}
.buttonStyle(.glass)
```

### Ã¥Â°â€ Ã¦Â°Â´Ã¥Â¹Â³Ã¦Â»Å¡Ã¥Å Â¨Ã¥Â»Â¶Ã¤Â¼Â¸Ã¥Ë†Â°Ã¤Â¾Â§Ã¨Â¾Â¹Ã¦Â ÂÃ¤Â¸â€¹Ã¦â€“Â¹

Ã¨Â¦ÂÃ¥â€¦ÂÃ¨Â®Â¸Ã¦Â°Â´Ã¥Â¹Â³Ã¦Â»Å¡Ã¥Å Â¨Ã¥â€ â€¦Ã¥Â®Â¹Ã¥Â»Â¶Ã¤Â¼Â¸Ã¥Ë†Â°Ã¤Â¾Â§Ã¨Â¾Â¹Ã¦Â ÂÃ¦Ë†â€“Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥â„¢Â¨Ã¤Â¸â€¹Ã¦â€“Â¹Ã¯Â¼Å’Ã¨Â¯Â·Ã§Â¡Â®Ã¤Â¿Â `ScrollView` Ã¥â€ â€¦Ã¥Â®Â¹Ã¥Ë†Â°Ã¨Â¾Â¾Ã¥Â®Â¹Ã¥â„¢Â¨Ã§Å¡â€ž leading/trailing Ã¨Â¾Â¹Ã§Â¼ËœÃ£â‚¬â€šÃ¥Â½â€œÃ¥Â¸Æ’Ã¥Â±â‚¬Ã¥Â»Â¶Ã¤Â¼Â¸Ã¥Ë†Â°Ã¨Â¾Â¹Ã§Â¼ËœÃ¦â€”Â¶Ã¯Â¼Å’Ã§Â³Â»Ã§Â»Å¸Ã¤Â¼Å¡Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Â¤â€žÃ§Ââ€ Ã¤Â¾Â§Ã¨Â¾Â¹Ã¦Â ÂÃ¤Â¸â€¹Ã¦â€“Â¹Ã§Å¡â€žÃ¦Â»Å¡Ã¥Å Â¨Ã¨Â¡Å’Ã¤Â¸ÂºÃ¢â‚¬â€Ã¢â‚¬â€Ã¦â€”Â Ã©Å“â‚¬Ã©Â¢ÂÃ¥Â¤â€“Ã§Å¡â€žÃ¤Â¿Â®Ã©Â¥Â°Ã§Â¬Â¦Ã£â‚¬â€š

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¨Â¡Ã¥Â¼Â Ã¢â‚¬â€ UIKit

### Ã¥Å¸ÂºÃ¦Å“Â¬ UIGlassEffect

```swift
let glassEffect = UIGlassEffect()
glassEffect.tintColor = UIColor.systemBlue.withAlphaComponent(0.3)
glassEffect.isInteractive = true

let visualEffectView = UIVisualEffectView(effect: glassEffect)
visualEffectView.translatesAutoresizingMaskIntoConstraints = false
visualEffectView.layer.cornerRadius = 20
visualEffectView.clipsToBounds = true

view.addSubview(visualEffectView)
NSLayoutConstraint.activate([
    visualEffectView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
    visualEffectView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
    visualEffectView.widthAnchor.constraint(equalToConstant: 200),
    visualEffectView.heightAnchor.constraint(equalToConstant: 120)
])

// Add content to contentView
let label = UILabel()
label.text = "Liquid Glass"
label.translatesAutoresizingMaskIntoConstraints = false
visualEffectView.contentView.addSubview(label)
NSLayoutConstraint.activate([
    label.centerXAnchor.constraint(equalTo: visualEffectView.contentView.centerXAnchor),
    label.centerYAnchor.constraint(equalTo: visualEffectView.contentView.centerYAnchor)
])
```

### Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â¤Å¡Ã¤Â¸ÂªÃ¥â€¦Æ’Ã§Â´Â Ã§Å¡â€ž UIGlassContainerEffect

```swift
let containerEffect = UIGlassContainerEffect()
containerEffect.spacing = 40.0

let containerView = UIVisualEffectView(effect: containerEffect)

let firstGlass = UIVisualEffectView(effect: UIGlassEffect())
let secondGlass = UIVisualEffectView(effect: UIGlassEffect())

containerView.contentView.addSubview(firstGlass)
containerView.contentView.addSubview(secondGlass)
```

### Ã¦Â»Å¡Ã¥Å Â¨Ã¨Â¾Â¹Ã§Â¼ËœÃ¦â€¢Ë†Ã¦Å¾Å“

```swift
scrollView.topEdgeEffect.style = .automatic
scrollView.bottomEdgeEffect.style = .hard
scrollView.leftEdgeEffect.isHidden = true
```

### Ã¥Â·Â¥Ã¥â€¦Â·Ã¦Â ÂÃ§Å½Â»Ã§â€™Æ’Ã©â€ºâ€ Ã¦Ë†Â

```swift
let favoriteButton = UIBarButtonItem(image: UIImage(systemName: "heart"), style: .plain, target: self, action: #selector(favoriteAction))
favoriteButton.hidesSharedBackground = true  // Opt out of shared glass background
```

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¨Â¡Ã¥Â¼Â Ã¢â‚¬â€ WidgetKit

### Ã¦Â¸Â²Ã¦Å¸â€œÃ¦Â¨Â¡Ã¥Â¼ÂÃ¦Â£â‚¬Ã¦Âµâ€¹

```swift
struct MyWidgetView: View {
    @Environment(\.widgetRenderingMode) var renderingMode

    var body: some View {
        if renderingMode == .accented {
            // Tinted mode: white-tinted, themed glass background
        } else {
            // Full color mode: standard appearance
        }
    }
}
```

### Ã§â€Â¨Ã¤ÂºÅ½Ã¨Â§â€ Ã¨Â§â€°Ã¥Â±â€šÃ¦Â¬Â¡Ã§Â»â€œÃ¦Å¾â€žÃ§Å¡â€žÃ¥Â¼ÂºÃ¨Â°Æ’Ã¨â€°Â²Ã§Â»â€ž

```swift
HStack {
    VStack(alignment: .leading) {
        Text("Title")
            .widgetAccentable()  // Accent group
        Text("Subtitle")
            // Primary group (default)
    }
    Image(systemName: "star.fill")
        .widgetAccentable()  // Accent group
}
```

### Ã¥Â¼ÂºÃ¨Â°Æ’Ã¦Â¨Â¡Ã¥Â¼ÂÃ¤Â¸â€¹Ã§Å¡â€žÃ¥â€ºÂ¾Ã¥Æ’ÂÃ¦Â¸Â²Ã¦Å¸â€œ

```swift
Image("myImage")
    .widgetAccentedRenderingMode(.monochrome)
```

### Ã¥Â®Â¹Ã¥â„¢Â¨Ã¨Æ’Å’Ã¦â„¢Â¯

```swift
VStack { /* content */ }
    .containerBackground(for: .widget) {
        Color.blue.opacity(0.2)
    }
```

## Ã¥â€¦Â³Ã©â€Â®Ã¨Â®Â¾Ã¨Â®Â¡Ã¥â€ Â³Ã§Â­â€“

| Ã¥â€ Â³Ã§Â­â€“ | Ã§Ââ€ Ã§â€Â± |
|----------|-----------|
| Ã¤Â½Â¿Ã§â€Â¨ GlassEffectContainer Ã¥Å’â€¦Ã¨Â£â€¦ | Ã¦â‚¬Â§Ã¨Æ’Â½Ã¤Â¼ËœÃ¥Å’â€“Ã¯Â¼Å’Ã¥Â®Å¾Ã§Å½Â°Ã§Å½Â»Ã§â€™Æ’Ã¥â€¦Æ’Ã§Â´Â Ã¤Â¹â€¹Ã©â€”Â´Ã§Å¡â€žÃ¥ÂËœÃ¥Â½Â¢ |
| `spacing` Ã¥Ââ€šÃ¦â€¢Â° | Ã¦Å½Â§Ã¥Ë†Â¶Ã¥ÂË†Ã¥Â¹Â¶Ã¨Â·ÂÃ§Â¦Â»Ã¢â‚¬â€Ã¢â‚¬â€Ã¥Â¾Â®Ã¨Â°Æ’Ã¥â€¦Æ’Ã§Â´Â Ã©Å“â‚¬Ã¨Â¦ÂÃ¥Â¤Å¡Ã¨Â¿â€˜Ã¦â€°ÂÃ¨Æ’Â½Ã¨Å¾ÂÃ¥ÂË† |
| `@Namespace` + `glassEffectID` | Ã¥Å“Â¨Ã¨Â§â€ Ã¥â€ºÂ¾Ã¥Â±â€šÃ¦Â¬Â¡Ã§Â»â€œÃ¦Å¾â€žÃ¥ÂËœÃ¥Å’â€“Ã¦â€”Â¶Ã¥Â®Å¾Ã§Å½Â°Ã¥Â¹Â³Ã¦Â»â€˜Ã§Å¡â€žÃ¥ÂËœÃ¥Â½Â¢Ã¨Â¿â€¡Ã¦Â¸Â¡ |
| `interactive()` Ã¤Â¿Â®Ã©Â¥Â°Ã§Â¬Â¦ | Ã¦ËœÅ½Ã§Â¡Â®Ã©â‚¬â€°Ã¦â€¹Â©Ã¥Å Â Ã¥â€¦Â¥Ã¨Â§Â¦Ã¦â€˜Â¸/Ã¦Å’â€¡Ã©â€™Ë†Ã¥ÂÂÃ¥Âºâ€Ã¢â‚¬â€Ã¢â‚¬â€Ã¥Â¹Â¶Ã©ÂÅ¾Ã¦â€°â‚¬Ã¦Å“â€°Ã§Å½Â»Ã§â€™Æ’Ã©Æ’Â½Ã¥Âºâ€Ã¥â€œÂÃ¥Âºâ€ |
| UIKit Ã¤Â¸Â­Ã§Å¡â€ž UIGlassContainerEffect | Ã¤Â¸Å½ SwiftUI Ã¤Â¿ÂÃ¦Å’ÂÃ¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€žÃ¥Â®Â¹Ã¥â„¢Â¨Ã¦Â¨Â¡Ã¥Â¼Â |
| Ã¥Â°ÂÃ§Â»â€žÃ¤Â»Â¶Ã¤Â¸Â­Ã§Å¡â€žÃ¥Â¼ÂºÃ¨Â°Æ’Ã¨â€°Â²Ã¦Â¸Â²Ã¦Å¸â€œÃ¦Â¨Â¡Ã¥Â¼Â | Ã¥Â½â€œÃ§â€Â¨Ã¦Ë†Â·Ã©â‚¬â€°Ã¦â€¹Â©Ã¥Â¸Â¦Ã¨â€°Â²Ã¨Â°Æ’Ã§Å¡â€žÃ¤Â¸Â»Ã¥Â±ÂÃ¥Â¹â€¢Ã¦â€”Â¶Ã¯Â¼Å’Ã§Â³Â»Ã§Â»Å¸Ã¤Â¼Å¡Ã¥Âºâ€Ã§â€Â¨Ã¥Â¸Â¦Ã¨â€°Â²Ã¨Â°Æ’Ã§Å¡â€žÃ§Å½Â»Ã§â€™Æ’Ã¦â€¢Ë†Ã¦Å¾Å“ |

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

* **Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨ GlassEffectContainer** Ã¦ÂÂ¥Ã¤Â¸ÂºÃ¥Â¤Å¡Ã¤Â¸ÂªÃ¥â€¦â€žÃ¥Â¼Å¸Ã¨Â§â€ Ã¥â€ºÂ¾Ã¥Âºâ€Ã§â€Â¨Ã§Å½Â»Ã§â€™Æ’Ã¦â€¢Ë†Ã¦Å¾Å“Ã¢â‚¬â€Ã¢â‚¬â€Ã¥Â®Æ’Ã¦â€Â¯Ã¦Å’ÂÃ¥ÂËœÃ¥Â½Â¢Ã¥Â¹Â¶Ã¦ÂÂÃ©Â«ËœÃ¦Â¸Â²Ã¦Å¸â€œÃ¦â‚¬Â§Ã¨Æ’Â½
* **Ã¥Å“Â¨Ã¥â€¦Â¶Ã¤Â»â€“Ã¥Â¤â€“Ã¨Â§â€šÃ¤Â¿Â®Ã©Â¥Â°Ã§Â¬Â¦**Ã¯Â¼Ë†frameÃ£â‚¬ÂfontÃ£â‚¬ÂpaddingÃ¯Â¼â€°**Ã¤Â¹â€¹Ã¥ÂÅ½Ã¥Âºâ€Ã§â€Â¨** `.glassEffect()`
* **Ã¤Â»â€¦Ã¥Å“Â¨Ã¥â€œÂÃ¥Âºâ€Ã§â€Â¨Ã¦Ë†Â·Ã¤ÂºÂ¤Ã¤Âºâ€™Ã§Å¡â€žÃ¥â€¦Æ’Ã§Â´Â **Ã¯Â¼Ë†Ã¦Å’â€°Ã©â€™Â®Ã£â‚¬ÂÃ¥ÂÂ¯Ã¥Ë†â€¡Ã¦ÂÂ¢Ã©Â¡Â¹Ã§â€ºÂ®Ã¯Â¼â€°**Ã¤Â¸Å Ã¤Â½Â¿Ã§â€Â¨** `.interactive()`
* **Ã¤Â»â€Ã§Â»â€ Ã©â‚¬â€°Ã¦â€¹Â©Ã¥Â®Â¹Ã¥â„¢Â¨Ã¤Â¸Â­Ã§Å¡â€žÃ©â€”Â´Ã¨Â·Â**Ã¯Â¼Å’Ã¤Â»Â¥Ã¦Å½Â§Ã¥Ë†Â¶Ã§Å½Â»Ã§â€™Æ’Ã¦â€¢Ë†Ã¦Å¾Å“Ã¤Â½â€¢Ã¦â€”Â¶Ã¥ÂË†Ã¥Â¹Â¶
* Ã¥Å“Â¨Ã¦â€ºÂ´Ã¦â€Â¹Ã¨Â§â€ Ã¥â€ºÂ¾Ã¥Â±â€šÃ¦Â¬Â¡Ã§Â»â€œÃ¦Å¾â€žÃ¦â€”Â¶**Ã¤Â½Â¿Ã§â€Â¨** `withAnimation`Ã¯Â¼Å’Ã¤Â»Â¥Ã¥ÂÂ¯Ã§â€Â¨Ã¥Â¹Â³Ã¦Â»â€˜Ã§Å¡â€žÃ¥ÂËœÃ¥Â½Â¢Ã¨Â¿â€¡Ã¦Â¸Â¡
* **Ã¥Å“Â¨Ã¥Ââ€žÃ§Â§ÂÃ¥Â¤â€“Ã¨Â§â€šÃ¦Â¨Â¡Ã¥Â¼ÂÃ¤Â¸â€¹Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¢â‚¬â€Ã¢â‚¬â€Ã¦Âµâ€¦Ã¨â€°Â²Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬ÂÃ¦Â·Â±Ã¨â€°Â²Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥â€™Å’Ã¥Â¼ÂºÃ¨Â°Æ’Ã¨â€°Â²/Ã¨â€°Â²Ã¨Â°Æ’Ã¦Â¨Â¡Ã¥Â¼Â
* **Ã§Â¡Â®Ã¤Â¿ÂÃ¥ÂÂ¯Ã¨Â®Â¿Ã©â€”Â®Ã¦â‚¬Â§Ã¥Â¯Â¹Ã¦Â¯â€Ã¥ÂºÂ¦**Ã¢â‚¬â€Ã¢â‚¬â€Ã§Å½Â»Ã§â€™Æ’Ã¤Â¸Å Ã§Å¡â€žÃ¦â€“â€¡Ã¦Å“Â¬Ã¥Â¿â€¦Ã©Â¡Â»Ã¤Â¿ÂÃ¦Å’ÂÃ¥ÂÂ¯Ã¨Â¯Â»Ã¦â‚¬Â§

## Ã¥Âºâ€Ã©ÂÂ¿Ã¥â€¦ÂÃ§Å¡â€žÃ¥ÂÂÃ¦Â¨Â¡Ã¥Â¼Â

* Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¤Å¡Ã¤Â¸ÂªÃ§â€¹Â¬Ã§Â«â€¹Ã§Å¡â€ž `.glassEffect()` Ã¨Â§â€ Ã¥â€ºÂ¾Ã¨â‚¬Å’Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ GlassEffectContainer
* Ã¥ÂµÅ’Ã¥Â¥â€”Ã¨Â¿â€¡Ã¥Â¤Å¡Ã§Å½Â»Ã§â€™Æ’Ã¦â€¢Ë†Ã¦Å¾Å“Ã¢â‚¬â€Ã¢â‚¬â€Ã¤Â¼Å¡Ã©â„¢ÂÃ¤Â½Å½Ã¦â‚¬Â§Ã¨Æ’Â½Ã¥â€™Å’Ã¨Â§â€ Ã¨Â§â€°Ã¦Â¸â€¦Ã¦â„¢Â°Ã¥ÂºÂ¦
* Ã¥Â¯Â¹Ã¦Â¯ÂÃ¤Â¸ÂªÃ¨Â§â€ Ã¥â€ºÂ¾Ã©Æ’Â½Ã¥Âºâ€Ã§â€Â¨Ã§Å½Â»Ã§â€™Æ’Ã¦â€¢Ë†Ã¦Å¾Å“Ã¢â‚¬â€Ã¢â‚¬â€Ã¤Â¿ÂÃ§â€¢â„¢Ã§Â»â„¢Ã¤ÂºÂ¤Ã¤Âºâ€™Ã¥â€¦Æ’Ã§Â´Â Ã£â‚¬ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã¦Â ÂÃ¥â€™Å’Ã¥ÂÂ¡Ã§â€°â€¡
* Ã¥Å“Â¨ UIKit Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¥Å“â€ Ã¨Â§â€™Ã¦â€”Â¶Ã¥Â¿ËœÃ¨Â®Â° `clipsToBounds = true`
* Ã¥Â¿Â½Ã§â€¢Â¥Ã¥Â°ÂÃ§Â»â€žÃ¤Â»Â¶Ã¤Â¸Â­Ã§Å¡â€žÃ¥Â¼ÂºÃ¨Â°Æ’Ã¨â€°Â²Ã¦Â¸Â²Ã¦Å¸â€œÃ¦Â¨Â¡Ã¥Â¼ÂÃ¢â‚¬â€Ã¢â‚¬â€Ã§Â Â´Ã¥ÂÂÃ¥Â¸Â¦Ã¨â€°Â²Ã¨Â°Æ’Ã§Å¡â€žÃ¤Â¸Â»Ã¥Â±ÂÃ¥Â¹â€¢Ã¥Â¤â€“Ã¨Â§â€š
* Ã¥Å“Â¨Ã§Å½Â»Ã§â€™Æ’Ã¦â€¢Ë†Ã¦Å¾Å“Ã¥ÂÅ½Ã©ÂÂ¢Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ©â‚¬ÂÃ¦ËœÅ½Ã¨Æ’Å’Ã¦â„¢Â¯Ã¢â‚¬â€Ã¢â‚¬â€Ã§Â Â´Ã¥ÂÂÃ¤Âºâ€ Ã¥ÂÅ Ã©â‚¬ÂÃ¦ËœÅ½Ã¦â€¢Ë†Ã¦Å¾Å“

## Ã¤Â½Â¿Ã§â€Â¨Ã¥Å“ÂºÃ¦â„¢Â¯

* Ã©â€¡â€¡Ã§â€Â¨ iOS 26 Ã¦â€“Â°Ã¨Â®Â¾Ã¨Â®Â¡Ã§Å¡â€žÃ¥Â¯Â¼Ã¨Ë†ÂªÃ¦Â ÂÃ£â‚¬ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã¦Â ÂÃ¥â€™Å’Ã¦Â â€¡Ã§Â­Â¾Ã¦Â Â
* Ã¦ÂµÂ®Ã¥Å Â¨Ã¦â€œÂÃ¤Â½Å“Ã¦Å’â€°Ã©â€™Â®Ã¥â€™Å’Ã¥ÂÂ¡Ã§â€°â€¡Ã¥Â¼ÂÃ¥Â®Â¹Ã¥â„¢Â¨
* Ã©Å“â‚¬Ã¨Â¦ÂÃ¨Â§â€ Ã¨Â§â€°Ã¦Â·Â±Ã¥ÂºÂ¦Ã¥â€™Å’Ã¨Â§Â¦Ã¦â€˜Â¸Ã¥ÂÂÃ©Â¦Ë†Ã§Å¡â€žÃ¤ÂºÂ¤Ã¤Âºâ€™Ã¦Å½Â§Ã¤Â»Â¶
* Ã¥Âºâ€Ã¤Â¸Å½Ã§Â³Â»Ã§Â»Å¸ Liquid Glass Ã¥Â¤â€“Ã¨Â§â€šÃ©â€ºâ€ Ã¦Ë†ÂÃ§Å¡â€žÃ¥Â°ÂÃ§Â»â€žÃ¤Â»Â¶
* Ã§â€ºÂ¸Ã¥â€¦Â³ UI Ã§Å Â¶Ã¦â‚¬ÂÃ¤Â¹â€¹Ã©â€”Â´Ã§Å¡â€žÃ¥ÂËœÃ¥Â½Â¢Ã¨Â¿â€¡Ã¦Â¸Â¡
