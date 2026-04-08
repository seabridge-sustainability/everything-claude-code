# SessionsÃ£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Claude CodeÃ£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¥Â±Â¥Ã¦Â­Â´Ã£â€šâ€™Ã§Â®Â¡Ã§Ââ€  - `~/.claude/sessions/` Ã£ÂÂ«Ã¤Â¿ÂÃ¥Â­ËœÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¨Â¡Â¨Ã§Â¤ÂºÃ£â‚¬ÂÃ¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£ÂÂ¿Ã£â‚¬ÂÃ£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã¨Â¨Â­Ã¥Â®Å¡Ã£â‚¬ÂÃ§Â·Â¨Ã©â€ºâ€ Ã£â€šâ€™Ã¨Â¡Å’Ã£Ââ€žÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢

`/sessions [list|load|alias|info|help] [Ã£â€šÂªÃ£Æ’â€”Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³]`

## Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

### Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¨Â¡Â¨Ã§Â¤Âº

Ã£Æ’Â¡Ã£â€šÂ¿Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â‚¬ÂÃ£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£â‚¬ÂÃ£Æ’Å¡Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¤Â»ËœÃ£ÂÂÃ£ÂÂ§Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤ÂºÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

```bash
/sessions                              # Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¨Â¡Â¨Ã§Â¤ÂºÃ¯Â¼Ë†Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã¯Â¼â€°
/sessions list                         # Ã¤Â¸Å Ã¨Â¨ËœÃ£ÂÂ¨Ã¥ÂÅ’Ã£ÂËœ
/sessions list --limit 10              # 10Ã¤Â»Â¶Ã£ÂÂ®Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
/sessions list --date 2026-02-01       # Ã¦â€”Â¥Ã¤Â»ËœÃ£ÂÂ§Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°
/sessions list --search abc            # Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³IDÃ£ÂÂ§Ã¦Â¤Å“Ã§Â´Â¢
```

**Ã£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†:**
```bash
node -e "
const sm = require('./scripts/lib/session-manager');
const aa = require('./scripts/lib/session-aliases');

const result = sm.getAllSessions({ limit: 20 });
const aliases = aa.listAliases();
const aliasMap = {};
for (const a of aliases) aliasMap[a.sessionPath] = a.name;

console.log('Sessions (showing ' + result.sessions.length + ' of ' + result.total + '):');
console.log('');
console.log('ID        Date        Time     Size     Lines  Alias');
console.log('Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬');

for (const s of result.sessions) {
  const alias = aliasMap[s.filename] || '';
  const size = sm.getSessionSize(s.sessionPath);
  const stats = sm.getSessionStats(s.sessionPath);
  const id = s.shortId === 'no-id' ? '(none)' : s.shortId.slice(0, 8);
  const time = s.modifiedTime.toTimeString().slice(0, 5);

  console.log(id.padEnd(8) + ' ' + s.date + '  ' + time + '   ' + size.padEnd(7) + '  ' + String(stats.lineCount).padEnd(5) + '  ' + alias);
}
"
```

### Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£ÂÂ¿

Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã¥â€ â€¦Ã¥Â®Â¹Ã£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£â€šâ€œÃ£ÂÂ§Ã¨Â¡Â¨Ã§Â¤ÂºÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã¯Â¼Ë†IDÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£ÂÂ§Ã¦Å’â€¡Ã¥Â®Å¡Ã¯Â¼â€°Ã£â‚¬â€š

```bash
/sessions load <id|alias>             # Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£â€šâ‚¬
/sessions load 2026-02-01             # Ã¦â€”Â¥Ã¤Â»ËœÃ£ÂÂ§Ã¦Å’â€¡Ã¥Â®Å¡Ã¯Â¼Ë†IDÃ£ÂÂªÃ£Ââ€”Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã¥Â Â´Ã¥ÂË†Ã¯Â¼â€°
/sessions load a1b2c3d4               # Ã§Å¸Â­Ã§Â¸Â®IDÃ£ÂÂ§Ã¦Å’â€¡Ã¥Â®Å¡
/sessions load my-alias               # Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã¥ÂÂÃ£ÂÂ§Ã¦Å’â€¡Ã¥Â®Å¡
```

**Ã£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†:**
```bash
node -e "
const sm = require('./scripts/lib/session-manager');
const aa = require('./scripts/lib/session-aliases');
const id = process.argv[1];

// First try to resolve as alias
const resolved = aa.resolveAlias(id);
const sessionId = resolved ? resolved.sessionPath : id;

const session = sm.getSessionById(sessionId, true);
if (!session) {
  console.log('Session not found: ' + id);
  process.exit(1);
}

const stats = sm.getSessionStats(session.sessionPath);
const size = sm.getSessionSize(session.sessionPath);
const aliases = aa.getAliasesForSession(session.filename);

console.log('Session: ' + session.filename);
console.log('Path: ~/.claude/sessions/' + session.filename);
console.log('');
console.log('Statistics:');
console.log('  Lines: ' + stats.lineCount);
console.log('  Total items: ' + stats.totalItems);
console.log('  Completed: ' + stats.completedItems);
console.log('  In progress: ' + stats.inProgressItems);
console.log('  Size: ' + size);
console.log('');

if (aliases.length > 0) {
  console.log('Aliases: ' + aliases.map(a => a.name).join(', '));
  console.log('');
}

if (session.metadata.title) {
  console.log('Title: ' + session.metadata.title);
  console.log('');
}

if (session.metadata.started) {
  console.log('Started: ' + session.metadata.started);
}

if (session.metadata.lastUpdated) {
  console.log('Last Updated: ' + session.metadata.lastUpdated);
}
" "$ARGUMENTS"
```

### Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£ÂÂ®Ã¤Â½Å“Ã¦Ë†Â

Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ«Ã¨Â¦Å¡Ã£ÂË†Ã£â€šâ€žÃ£Ââ„¢Ã£Ââ€žÃ£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

```bash
/sessions alias <id> <name>           # Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
/sessions alias 2026-02-01 today-work # "today-work"Ã£ÂÂ¨Ã£Ââ€žÃ£Ââ€ Ã¥ÂÂÃ¥â€°ÂÃ£ÂÂ®Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
```

**Ã£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†:**
```bash
node -e "
const sm = require('./scripts/lib/session-manager');
const aa = require('./scripts/lib/session-aliases');

const sessionId = process.argv[1];
const aliasName = process.argv[2];

if (!sessionId || !aliasName) {
  console.log('Usage: /sessions alias <id> <name>');
  process.exit(1);
}

// Get session filename
const session = sm.getSessionById(sessionId);
if (!session) {
  console.log('Session not found: ' + sessionId);
  process.exit(1);
}

const result = aa.setAlias(aliasName, session.filename);
if (result.success) {
  console.log('Ã¢Å“â€œ Alias created: ' + aliasName + ' Ã¢â€ â€™ ' + session.filename);
} else {
  console.log('Ã¢Å“â€” Error: ' + result.error);
  process.exit(1);
}
" "$ARGUMENTS"
```

### Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£ÂÂ®Ã¥â€°Å Ã©â„¢Â¤

Ã¦â€”Â¢Ã¥Â­ËœÃ£ÂÂ®Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

```bash
/sessions alias --remove <name>        # Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤
/sessions unalias <name>               # Ã¤Â¸Å Ã¨Â¨ËœÃ£ÂÂ¨Ã¥ÂÅ’Ã£ÂËœ
```

**Ã£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†:**
```bash
node -e "
const aa = require('./scripts/lib/session-aliases');

const aliasName = process.argv[1];
if (!aliasName) {
  console.log('Usage: /sessions alias --remove <name>');
  process.exit(1);
}

const result = aa.deleteAlias(aliasName);
if (result.success) {
  console.log('Ã¢Å“â€œ Alias removed: ' + aliasName);
} else {
  console.log('Ã¢Å“â€” Error: ' + result.error);
  process.exit(1);
}
" "$ARGUMENTS"
```

### Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¦Æ’â€¦Ã¥Â Â±

Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã¨Â©Â³Ã§Â´Â°Ã¦Æ’â€¦Ã¥Â Â±Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤ÂºÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

```bash
/sessions info <id|alias>              # Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¨Â©Â³Ã§Â´Â°Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
```

**Ã£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†:**
```bash
node -e "
const sm = require('./scripts/lib/session-manager');
const aa = require('./scripts/lib/session-aliases');

const id = process.argv[1];
const resolved = aa.resolveAlias(id);
const sessionId = resolved ? resolved.sessionPath : id;

const session = sm.getSessionById(sessionId, true);
if (!session) {
  console.log('Session not found: ' + id);
  process.exit(1);
}

const stats = sm.getSessionStats(session.sessionPath);
const size = sm.getSessionSize(session.sessionPath);
const aliases = aa.getAliasesForSession(session.filename);

console.log('Session Information');
console.log('Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â');
console.log('ID:          ' + (session.shortId === 'no-id' ? '(none)' : session.shortId));
console.log('Filename:    ' + session.filename);
console.log('Date:        ' + session.date);
console.log('Modified:    ' + session.modifiedTime.toISOString().slice(0, 19).replace('T', ' '));
console.log('');
console.log('Content:');
console.log('  Lines:         ' + stats.lineCount);
console.log('  Total items:   ' + stats.totalItems);
console.log('  Completed:     ' + stats.completedItems);
console.log('  In progress:   ' + stats.inProgressItems);
console.log('  Size:          ' + size);
if (aliases.length > 0) {
  console.log('Aliases:     ' + aliases.map(a => a.name).join(', '));
}
" "$ARGUMENTS"
```

### Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£ÂÂ®Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¨Â¡Â¨Ã§Â¤Âº

Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤ÂºÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

```bash
/sessions aliases                      # Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¨Â¡Â¨Ã§Â¤Âº
```

**Ã£â€šÂ¹Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Ë†:**
```bash
node -e "
const aa = require('./scripts/lib/session-aliases');

const aliases = aa.listAliases();
console.log('Session Aliases (' + aliases.length + '):');
console.log('');

if (aliases.length === 0) {
  console.log('No aliases found.');
} else {
  console.log('Name          Session File                    Title');
  console.log('Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬');
  for (const a of aliases) {
    const name = a.name.padEnd(12);
    const file = (a.sessionPath.length > 30 ? a.sessionPath.slice(0, 27) + '...' : a.sessionPath).padEnd(30);
    const title = a.title || '';
    console.log(name + ' ' + file + ' ' + title);
  }
}
"
```

## Ã¥Â¼â€¢Ã¦â€¢Â°

$ARGUMENTS:
- `list [Ã£â€šÂªÃ£Æ’â€”Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³]` - Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¨Â¡Â¨Ã§Â¤Âº
  - `--limit <n>` - Ã¨Â¡Â¨Ã§Â¤ÂºÃ£Ââ„¢Ã£â€šâ€¹Ã¦Å“â‚¬Ã¥Â¤Â§Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¦â€¢Â°Ã¯Â¼Ë†Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†: 50Ã¯Â¼â€°
  - `--date <YYYY-MM-DD>` - Ã¦â€”Â¥Ã¤Â»ËœÃ£ÂÂ§Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°
  - `--search <Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³>` - Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³IDÃ£ÂÂ§Ã¦Â¤Å“Ã§Â´Â¢
- `load <id|alias>` - Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¥â€ â€¦Ã¥Â®Â¹Ã£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£â€šâ‚¬
- `alias <id> <name>` - Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
- `alias --remove <name>` - Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤
- `unalias <name>` - `--remove`Ã£ÂÂ¨Ã¥ÂÅ’Ã£ÂËœ
- `info <id|alias>` - Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã§ÂµÂ±Ã¨Â¨Ë†Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
- `aliases` - Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¨Â¡Â¨Ã§Â¤Âº
- `help` - Ã£Ââ€œÃ£ÂÂ®Ã£Æ’ËœÃ£Æ’Â«Ã£Æ’â€”Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº

## Ã¤Â¾â€¹

```bash
# Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¨Â¡Â¨Ã§Â¤Âº
/sessions list

# Ã¤Â»Å Ã¦â€”Â¥Ã£ÂÂ®Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ«Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
/sessions alias 2026-02-01 today

# Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£ÂÂ§Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£â€šâ‚¬
/sessions load today

# Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¦Æ’â€¦Ã¥Â Â±Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
/sessions info today

# Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤
/sessions alias --remove today

# Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¨Â¡Â¨Ã§Â¤Âº
/sessions aliases
```

## Ã¥â€šâ„¢Ã¨â‚¬Æ’

- Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ¯ `~/.claude/sessions/` Ã£ÂÂ«MarkdownÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ¨Ã£Ââ€”Ã£ÂÂ¦Ã¤Â¿ÂÃ¥Â­ËœÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¾Ã£Ââ„¢
- Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£ÂÂ¯ `~/.claude/session-aliases.json` Ã£ÂÂ«Ã¤Â¿ÂÃ¥Â­ËœÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¾Ã£Ââ„¢
- Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³IDÃ£ÂÂ¯Ã§Å¸Â­Ã§Â¸Â®Ã£ÂÂ§Ã£ÂÂÃ£ÂÂ¾Ã£Ââ„¢Ã¯Â¼Ë†Ã©â‚¬Å¡Ã¥Â¸Â¸Ã£â‚¬ÂÃ¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ®4Ã£â‚¬Å“8Ã¦â€“â€¡Ã¥Â­â€”Ã£ÂÂ§Ã¤Â¸â‚¬Ã¦â€žÂÃ£ÂÂ«Ã£ÂÂªÃ£â€šÅ Ã£ÂÂ¾Ã£Ââ„¢Ã¯Â¼â€°
- Ã©Â Â»Ã§Â¹ÂÃ£ÂÂ«Ã¥Ââ€šÃ§â€¦Â§Ã£Ââ„¢Ã£â€šâ€¹Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ«Ã£ÂÂ¯Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž
