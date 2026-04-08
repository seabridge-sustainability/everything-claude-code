---
description: Update codemaps for codebase navigation
agent: doc-updater
subtask: true
---

# Update Codemaps Command

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Update codemaps to reflect current codebase structure: $ARGUMENTS

## Your Task

Generate or update codemaps in `docs/CODEMAPS/` directory:

1. **Analyze codebase structure**
2. **Generate component maps**
3. **Document relationships**
4. **Update navigation guides**

## Codemap Types

### Architecture Map
```
docs/CODEMAPS/ARCHITECTURE.md
```
- High-level system overview
- Component relationships
- Data flow diagrams

### Module Map
```
docs/CODEMAPS/MODULES.md
```
- Module descriptions
- Public APIs
- Dependencies

### File Map
```
docs/CODEMAPS/FILES.md
```
- Directory structure
- File purposes
- Key files

## Codemap Format

### [Module Name]

**Purpose**: [Brief description]

**Location**: `src/[path]/`

**Key Files**:
- `file1.ts` - [purpose]
- `file2.ts` - [purpose]

**Dependencies**:
- [Module A]
- [Module B]

**Exports**:
- `functionName()` - [description]
- `ClassName` - [description]

**Usage Example**:
```typescript
import { functionName } from '@/module'
```

## Generation Process

1. Scan directory structure
2. Parse imports/exports
3. Build dependency graph
4. Generate markdown maps
5. Validate links

---

**TIP**: Keep codemaps updated when adding new modules or significant refactoring.
