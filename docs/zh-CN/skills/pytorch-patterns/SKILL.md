---
name: pytorch-patterns
description: PyTorchÃ¦Â·Â±Ã¥ÂºÂ¦Ã¥Â­Â¦Ã¤Â¹Â Ã¦Â¨Â¡Ã¥Â¼ÂÃ¤Â¸Å½Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·ÂµÃ¯Â¼Å’Ã§â€Â¨Ã¤ÂºÅ½Ã¦Å¾â€žÃ¥Â»ÂºÃ§Â¨Â³Ã¥ÂÂ¥Ã£â‚¬ÂÃ©Â«ËœÃ¦â€¢Ë†Ã¤Â¸â€Ã¥ÂÂ¯Ã¥Â¤ÂÃ§Å½Â°Ã§Å¡â€žÃ¨Â®Â­Ã§Â»Æ’Ã¦ÂµÂÃ§Â¨â€¹Ã£â‚¬ÂÃ¦Â¨Â¡Ã¥Å¾â€¹Ã¦Å¾Â¶Ã¦Å¾â€žÃ¥â€™Å’Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Å Â Ã¨Â½Â½Ã£â‚¬â€š
origin: ECC
---

# PyTorch Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¦Â¨Â¡Ã¥Â¼Â

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


Ã¦Å¾â€žÃ¥Â»ÂºÃ§Â¨Â³Ã¥ÂÂ¥Ã£â‚¬ÂÃ©Â«ËœÃ¦â€¢Ë†Ã¥â€™Å’Ã¥ÂÂ¯Ã¥Â¤ÂÃ§Å½Â°Ã¦Â·Â±Ã¥ÂºÂ¦Ã¥Â­Â¦Ã¤Â¹Â Ã¥Âºâ€Ã§â€Â¨Ã§Å¡â€ž PyTorch Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â¨Â¡Ã¥Â¼ÂÃ¤Â¸Å½Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·ÂµÃ£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

* Ã§Â¼â€“Ã¥â€ â„¢Ã¦â€“Â°Ã§Å¡â€ž PyTorch Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¦Ë†â€“Ã¨Â®Â­Ã§Â»Æ’Ã¨â€žÅ¡Ã¦Å“Â¬Ã¦â€”Â¶
* Ã¨Â¯â€žÃ¥Â®Â¡Ã¦Â·Â±Ã¥ÂºÂ¦Ã¥Â­Â¦Ã¤Â¹Â Ã¤Â»Â£Ã§Â ÂÃ¦â€”Â¶
* Ã¨Â°Æ’Ã¨Â¯â€¢Ã¨Â®Â­Ã§Â»Æ’Ã¥Â¾ÂªÃ§Å½Â¯Ã¦Ë†â€“Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â®Â¡Ã©Ââ€œÃ¦â€”Â¶
* Ã¤Â¼ËœÃ¥Å’â€“ GPU Ã¥â€ â€¦Ã¥Â­ËœÃ¤Â½Â¿Ã§â€Â¨Ã¦Ë†â€“Ã¨Â®Â­Ã§Â»Æ’Ã©â‚¬Å¸Ã¥ÂºÂ¦Ã¦â€”Â¶
* Ã¨Â®Â¾Ã§Â½Â®Ã¥ÂÂ¯Ã¥Â¤ÂÃ§Å½Â°Ã¥Â®Å¾Ã©ÂªÅ’Ã¦â€”Â¶

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¥Å½Å¸Ã¥Ë†â„¢

### 1. Ã¨Â®Â¾Ã¥Â¤â€¡Ã¦â€”Â Ã¥â€¦Â³Ã¤Â»Â£Ã§Â Â

Ã¥Â§â€¹Ã§Â»Ë†Ã§Â¼â€“Ã¥â€ â„¢Ã¨Æ’Â½Ã¥Å“Â¨ CPU Ã¥â€™Å’ GPU Ã¤Â¸Å Ã¨Â¿ÂÃ¨Â¡Å’Ã¤Â¸â€Ã¤Â¸ÂÃ§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ¨Â®Â¾Ã¥Â¤â€¡Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ£â‚¬â€š

```python
# Good: Device-agnostic
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = MyModel().to(device)
data = data.to(device)

# Bad: Hardcoded device
model = MyModel().cuda()  # Crashes if no GPU
data = data.cuda()
```

### 2. Ã¥ÂÂ¯Ã¥Â¤ÂÃ§Å½Â°Ã¦â‚¬Â§Ã¤Â¼ËœÃ¥â€¦Ë†

Ã¨Â®Â¾Ã§Â½Â®Ã¦â€°â‚¬Ã¦Å“â€°Ã©Å¡ÂÃ¦Å“ÂºÃ§Â§ÂÃ¥Â­ÂÃ¤Â»Â¥Ã¨Å½Â·Ã¥Â¾â€”Ã¥ÂÂ¯Ã¥Â¤ÂÃ§Å½Â°Ã§Å¡â€žÃ§Â»â€œÃ¦Å¾Å“Ã£â‚¬â€š

```python
# Good: Full reproducibility setup
def set_seed(seed: int = 42) -> None:
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    np.random.seed(seed)
    random.seed(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False

# Bad: No seed control
model = MyModel()  # Different weights every run
```

### 3. Ã¦ËœÂ¾Ã¥Â¼ÂÃ¥Â½Â¢Ã§Å Â¶Ã§Â®Â¡Ã§Ââ€ 

Ã¥Â§â€¹Ã§Â»Ë†Ã¨Â®Â°Ã¥Â½â€¢Ã¥Â¹Â¶Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¼Â Ã©â€¡ÂÃ¥Â½Â¢Ã§Å Â¶Ã£â‚¬â€š

```python
# Good: Shape-annotated forward pass
def forward(self, x: torch.Tensor) -> torch.Tensor:
    # x: (batch_size, channels, height, width)
    x = self.conv1(x)    # -> (batch_size, 32, H, W)
    x = self.pool(x)     # -> (batch_size, 32, H//2, W//2)
    x = x.view(x.size(0), -1)  # -> (batch_size, 32*H//2*W//2)
    return self.fc(x)    # -> (batch_size, num_classes)

# Bad: No shape tracking
def forward(self, x):
    x = self.conv1(x)
    x = self.pool(x)
    x = x.view(x.size(0), -1)  # What size is this?
    return self.fc(x)           # Will this even work?
```

## Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¦Å¾Â¶Ã¦Å¾â€žÃ¦Â¨Â¡Ã¥Â¼Â

### Ã¦Â¸â€¦Ã¦â„¢Â°Ã§Å¡â€ž nn.Module Ã§Â»â€œÃ¦Å¾â€ž

```python
# Good: Well-organized module
class ImageClassifier(nn.Module):
    def __init__(self, num_classes: int, dropout: float = 0.5) -> None:
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.Dropout(dropout),
            nn.Linear(64 * 16 * 16, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.features(x)
        x = x.view(x.size(0), -1)
        return self.classifier(x)

# Bad: Everything in forward
class ImageClassifier(nn.Module):
    def __init__(self):
        super().__init__()

    def forward(self, x):
        x = F.conv2d(x, weight=self.make_weight())  # Creates weight each call!
        return x
```

### Ã¦Â­Â£Ã§Â¡Â®Ã§Å¡â€žÃ¦ÂÆ’Ã©â€¡ÂÃ¥Ë†ÂÃ¥Â§â€¹Ã¥Å’â€“

```python
# Good: Explicit initialization
def _init_weights(self, module: nn.Module) -> None:
    if isinstance(module, nn.Linear):
        nn.init.kaiming_normal_(module.weight, mode="fan_out", nonlinearity="relu")
        if module.bias is not None:
            nn.init.zeros_(module.bias)
    elif isinstance(module, nn.Conv2d):
        nn.init.kaiming_normal_(module.weight, mode="fan_out", nonlinearity="relu")
    elif isinstance(module, nn.BatchNorm2d):
        nn.init.ones_(module.weight)
        nn.init.zeros_(module.bias)

model = MyModel()
model.apply(model._init_weights)
```

## Ã¨Â®Â­Ã§Â»Æ’Ã¥Â¾ÂªÃ§Å½Â¯Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¦Â â€¡Ã¥â€¡â€ Ã¨Â®Â­Ã§Â»Æ’Ã¥Â¾ÂªÃ§Å½Â¯

```python
# Good: Complete training loop with best practices
def train_one_epoch(
    model: nn.Module,
    dataloader: DataLoader,
    optimizer: torch.optim.Optimizer,
    criterion: nn.Module,
    device: torch.device,
    scaler: torch.amp.GradScaler | None = None,
) -> float:
    model.train()  # Always set train mode
    total_loss = 0.0

    for batch_idx, (data, target) in enumerate(dataloader):
        data, target = data.to(device), target.to(device)

        optimizer.zero_grad(set_to_none=True)  # More efficient than zero_grad()

        # Mixed precision training
        with torch.amp.autocast("cuda", enabled=scaler is not None):
            output = model(data)
            loss = criterion(output, target)

        if scaler is not None:
            scaler.scale(loss).backward()
            scaler.unscale_(optimizer)
            torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
            scaler.step(optimizer)
            scaler.update()
        else:
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
            optimizer.step()

        total_loss += loss.item()

    return total_loss / len(dataloader)
```

### Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯

```python
# Good: Proper evaluation
@torch.no_grad()  # More efficient than wrapping in torch.no_grad() block
def evaluate(
    model: nn.Module,
    dataloader: DataLoader,
    criterion: nn.Module,
    device: torch.device,
) -> tuple[float, float]:
    model.eval()  # Always set eval mode Ã¢â‚¬â€ disables dropout, uses running BN stats
    total_loss = 0.0
    correct = 0
    total = 0

    for data, target in dataloader:
        data, target = data.to(device), target.to(device)
        output = model(data)
        total_loss += criterion(output, target).item()
        correct += (output.argmax(1) == target).sum().item()
        total += target.size(0)

    return total_loss / len(dataloader), correct / total
```

## Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â®Â¡Ã©Ââ€œÃ¦Â¨Â¡Ã¥Â¼Â

### Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¦â€¢Â°Ã¦ÂÂ®Ã©â€ºâ€ 

```python
# Good: Clean Dataset with type hints
class ImageDataset(Dataset):
    def __init__(
        self,
        image_dir: str,
        labels: dict[str, int],
        transform: transforms.Compose | None = None,
    ) -> None:
        self.image_paths = list(Path(image_dir).glob("*.jpg"))
        self.labels = labels
        self.transform = transform

    def __len__(self) -> int:
        return len(self.image_paths)

    def __getitem__(self, idx: int) -> tuple[torch.Tensor, int]:
        img = Image.open(self.image_paths[idx]).convert("RGB")
        label = self.labels[self.image_paths[idx].stem]

        if self.transform:
            img = self.transform(img)

        return img, label
```

### Ã©Â«ËœÃ¦â€¢Ë†Ã§Å¡â€žÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Å Â Ã¨Â½Â½Ã¥â„¢Â¨Ã©â€¦ÂÃ§Â½Â®

```python
# Good: Optimized DataLoader
dataloader = DataLoader(
    dataset,
    batch_size=32,
    shuffle=True,            # Shuffle for training
    num_workers=4,           # Parallel data loading
    pin_memory=True,         # Faster CPU->GPU transfer
    persistent_workers=True, # Keep workers alive between epochs
    drop_last=True,          # Consistent batch sizes for BatchNorm
)

# Bad: Slow defaults
dataloader = DataLoader(dataset, batch_size=32)  # num_workers=0, no pin_memory
```

### Ã©â€™Ë†Ã¥Â¯Â¹Ã¥ÂËœÃ©â€¢Â¿Ã¦â€¢Â°Ã¦ÂÂ®Ã§Å¡â€žÃ¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¦â€¢Â´Ã§Ââ€ Ã¥â€¡Â½Ã¦â€¢Â°

```python
# Good: Pad sequences in collate_fn
def collate_fn(batch: list[tuple[torch.Tensor, int]]) -> tuple[torch.Tensor, torch.Tensor]:
    sequences, labels = zip(*batch)
    # Pad to max length in batch
    padded = nn.utils.rnn.pad_sequence(sequences, batch_first=True, padding_value=0)
    return padded, torch.tensor(labels)

dataloader = DataLoader(dataset, batch_size=32, collate_fn=collate_fn)
```

## Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¤Â¿ÂÃ¥Â­ËœÃ¥â€™Å’Ã¥Å Â Ã¨Â½Â½Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹

```python
# Good: Complete checkpoint with all training state
def save_checkpoint(
    model: nn.Module,
    optimizer: torch.optim.Optimizer,
    epoch: int,
    loss: float,
    path: str,
) -> None:
    torch.save({
        "epoch": epoch,
        "model_state_dict": model.state_dict(),
        "optimizer_state_dict": optimizer.state_dict(),
        "loss": loss,
    }, path)

def load_checkpoint(
    path: str,
    model: nn.Module,
    optimizer: torch.optim.Optimizer | None = None,
) -> dict:
    checkpoint = torch.load(path, map_location="cpu", weights_only=True)
    model.load_state_dict(checkpoint["model_state_dict"])
    if optimizer:
        optimizer.load_state_dict(checkpoint["optimizer_state_dict"])
    return checkpoint

# Bad: Only saving model weights (can't resume training)
torch.save(model.state_dict(), "model.pt")
```

## Ã¦â‚¬Â§Ã¨Æ’Â½Ã¤Â¼ËœÃ¥Å’â€“

### Ã¦Â·Â·Ã¥ÂË†Ã§Â²Â¾Ã¥ÂºÂ¦Ã¨Â®Â­Ã§Â»Æ’

```python
# Good: AMP with GradScaler
scaler = torch.amp.GradScaler("cuda")
for data, target in dataloader:
    with torch.amp.autocast("cuda"):
        output = model(data)
        loss = criterion(output, target)
    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()
    optimizer.zero_grad(set_to_none=True)
```

### Ã¥Â¤Â§Ã¦Â¨Â¡Ã¥Å¾â€¹Ã§Å¡â€žÃ¦Â¢Â¯Ã¥ÂºÂ¦Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹

```python
# Good: Trade compute for memory
from torch.utils.checkpoint import checkpoint

class LargeModel(nn.Module):
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # Recompute activations during backward to save memory
        x = checkpoint(self.block1, x, use_reentrant=False)
        x = checkpoint(self.block2, x, use_reentrant=False)
        return self.head(x)
```

### Ã¤Â½Â¿Ã§â€Â¨ torch.compile Ã¥Å Â Ã©â‚¬Å¸

```python
# Good: Compile the model for faster execution (PyTorch 2.0+)
model = MyModel().to(device)
model = torch.compile(model, mode="reduce-overhead")

# Modes: "default" (safe), "reduce-overhead" (faster), "max-autotune" (fastest)
```

## Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥Ââ€šÃ¨â‚¬Æ’Ã¯Â¼Å¡PyTorch Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢

| Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢ | Ã¦ÂÂÃ¨Â¿Â° |
|-------|-------------|
| `model.train()` / `model.eval()` | Ã¨Â®Â­Ã§Â»Æ’/Ã¨Â¯â€žÃ¤Â¼Â°Ã¥â€°ÂÃ¥Â§â€¹Ã§Â»Ë†Ã¨Â®Â¾Ã§Â½Â®Ã¦Â¨Â¡Ã¥Â¼Â |
| `torch.no_grad()` | Ã¦Å½Â¨Ã§Ââ€ Ã¦â€”Â¶Ã§Â¦ÂÃ§â€Â¨Ã¦Â¢Â¯Ã¥ÂºÂ¦ |
| `optimizer.zero_grad(set_to_none=True)` | Ã¦â€ºÂ´Ã©Â«ËœÃ¦â€¢Ë†Ã§Å¡â€žÃ¦Â¢Â¯Ã¥ÂºÂ¦Ã¦Â¸â€¦Ã©â€ºÂ¶ |
| `.to(device)` | Ã¨Â®Â¾Ã¥Â¤â€¡Ã¦â€”Â Ã¥â€¦Â³Ã§Å¡â€žÃ¥Â¼Â Ã©â€¡Â/Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¦â€Â¾Ã§Â½Â® |
| `torch.amp.autocast` | Ã¦Â·Â·Ã¥ÂË†Ã§Â²Â¾Ã¥ÂºÂ¦Ã¤Â»Â¥Ã¨Å½Â·Ã¥Â¾â€” 2 Ã¥â‚¬ÂÃ©â‚¬Å¸Ã¥ÂºÂ¦ |
| `pin_memory=True` | Ã¦â€ºÂ´Ã¥Â¿Â«Ã§Å¡â€ž CPUÃ¢â€ â€™GPU Ã¦â€¢Â°Ã¦ÂÂ®Ã¤Â¼Â Ã¨Â¾â€œ |
| `torch.compile` | JIT Ã§Â¼â€“Ã¨Â¯â€˜Ã¥Å Â Ã©â‚¬Å¸ (2.0+) |
| `weights_only=True` | Ã¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Å¾â€¹Ã¥Å Â Ã¨Â½Â½ |
| `torch.manual_seed` | Ã¥ÂÂ¯Ã¥Â¤ÂÃ§Å½Â°Ã§Å¡â€žÃ¥Â®Å¾Ã©ÂªÅ’ |
| `gradient_checkpointing` | Ã¤Â»Â¥Ã¨Â®Â¡Ã§Â®â€”Ã¦ÂÂ¢Ã¥Ââ€“Ã¥â€ â€¦Ã¥Â­Ëœ |

## Ã¥Âºâ€Ã©ÂÂ¿Ã¥â€¦ÂÃ§Å¡â€žÃ¥ÂÂÃ¦Â¨Â¡Ã¥Â¼Â

```python
# Bad: Forgetting model.eval() during validation
model.train()
with torch.no_grad():
    output = model(val_data)  # Dropout still active! BatchNorm uses batch stats!

# Good: Always set eval mode
model.eval()
with torch.no_grad():
    output = model(val_data)

# Bad: In-place operations breaking autograd
x = F.relu(x, inplace=True)  # Can break gradient computation
x += residual                  # In-place add breaks autograd graph

# Good: Out-of-place operations
x = F.relu(x)
x = x + residual

# Bad: Moving data to GPU inside the training loop repeatedly
for data, target in dataloader:
    model = model.cuda()  # Moves model EVERY iteration!

# Good: Move model once before the loop
model = model.to(device)
for data, target in dataloader:
    data, target = data.to(device), target.to(device)

# Bad: Using .item() before backward
loss = criterion(output, target).item()  # Detaches from graph!
loss.backward()  # Error: can't backprop through .item()

# Good: Call .item() only for logging
loss = criterion(output, target)
loss.backward()
print(f"Loss: {loss.item():.4f}")  # .item() after backward is fine

# Bad: Not using torch.save properly
torch.save(model, "model.pt")  # Saves entire model (fragile, not portable)

# Good: Save state_dict
torch.save(model.state_dict(), "model.pt")
```

**Ã¨Â¯Â·Ã¨Â®Â°Ã¤Â½Â**Ã¯Â¼Å¡PyTorch Ã¤Â»Â£Ã§Â ÂÃ¥Âºâ€Ã¥ÂÅ¡Ã¥Ë†Â°Ã¨Â®Â¾Ã¥Â¤â€¡Ã¦â€”Â Ã¥â€¦Â³Ã£â‚¬ÂÃ¥ÂÂ¯Ã¥Â¤ÂÃ§Å½Â°Ã¤Â¸â€Ã¥â€ â€¦Ã¥Â­ËœÃ¦â€žÂÃ¨Â¯â€ Ã¥Â¼ÂºÃ£â‚¬â€šÃ¥Â¦â€šÃ¦Å“â€°Ã§â€“â€˜Ã©â€”Â®Ã¯Â¼Å’Ã¨Â¯Â·Ã¤Â½Â¿Ã§â€Â¨ `torch.profiler` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Ë†â€ Ã¦Å¾ÂÃ¯Â¼Å’Ã¥Â¹Â¶Ã¤Â½Â¿Ã§â€Â¨ `torch.cuda.memory_summary()` Ã¦Â£â‚¬Ã¦Å¸Â¥ GPU Ã¥â€ â€¦Ã¥Â­ËœÃ£â‚¬â€š
