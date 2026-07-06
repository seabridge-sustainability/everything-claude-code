---
description: Ã§Â®Â¡Ã§Ââ€ Claude CodeÃ¤Â¼Å¡Ã¨Â¯ÂÃ¥Å½â€ Ã¥ÂÂ²Ã£â‚¬ÂÃ¥Ë†Â«Ã¥ÂÂÃ¥â€™Å’Ã¤Â¼Å¡Ã¨Â¯ÂÃ¥â€¦Æ’Ã¦â€¢Â°Ã¦ÂÂ®Ã£â‚¬â€š
---

# Sessions Ã¥â€˜Â½Ã¤Â»Â¤

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


Ã§Â®Â¡Ã§Ââ€  Claude Code Ã¤Â¼Å¡Ã¨Â¯ÂÃ¥Å½â€ Ã¥ÂÂ² - Ã¥Ë†â€”Ã¥â€¡ÂºÃ£â‚¬ÂÃ¥Å Â Ã¨Â½Â½Ã£â‚¬ÂÃ¨Â®Â¾Ã§Â½Â®Ã¥Ë†Â«Ã¥ÂÂÃ¥â€™Å’Ã§Â¼â€“Ã¨Â¾â€˜Ã¥Â­ËœÃ¥â€šÂ¨Ã¥Å“Â¨ `~/.claude/sessions/` Ã¤Â¸Â­Ã§Å¡â€žÃ¤Â¼Å¡Ã¨Â¯ÂÃ£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

`/sessions [list|load|alias|info|help] [options]`

## Ã¦â€œÂÃ¤Â½Å“

### Ã¥Ë†â€”Ã¥â€¡ÂºÃ¤Â¼Å¡Ã¨Â¯Â

Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¤Â¼Å¡Ã¨Â¯ÂÃ¥ÂÅ Ã¥â€¦Â¶Ã¥â€¦Æ’Ã¦â€¢Â°Ã¦ÂÂ®Ã¯Â¼Å’Ã¦â€Â¯Ã¦Å’ÂÃ§Â­â€ºÃ©â‚¬â€°Ã¥â€™Å’Ã¥Ë†â€ Ã©Â¡ÂµÃ£â‚¬â€š

Ã¥Â½â€œÃ¦â€šÂ¨Ã©Å“â‚¬Ã¨Â¦ÂÃ§Â¾Â¤Ã§Â»â€žÃ§Å¡â€žÃ¦â€œÂÃ¤Â½Å“Ã¥â€˜ËœÃ¨Â¡Â¨Ã¥Â±â€šÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¦â€”Â¶Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `/sessions info`Ã¯Â¼Å¡Ã¥Ë†â€ Ã¦â€Â¯Ã£â‚¬ÂÃ¥Â·Â¥Ã¤Â½Å“Ã¦Â â€˜Ã¨Â·Â¯Ã¥Â¾â€žÃ¥â€™Å’Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦Å“â‚¬Ã¨Â¿â€˜Ã¦â‚¬Â§Ã£â‚¬â€š

```bash
/sessions                              # List all sessions (default)
/sessions list                         # Same as above
/sessions list --limit 10              # Show 10 sessions
/sessions list --date 2026-02-01       # Filter by date
/sessions list --search abc            # Search by session ID
```

**Ã¨â€žÅ¡Ã¦Å“Â¬Ã¯Â¼Å¡**

```bash
node -e "
const sm = require((()=>{var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(f.existsSync(p.join(d,q)))return d;try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q)))return c}}catch(x){}return d})()+'/scripts/lib/session-manager');
const aa = require((()=>{var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(f.existsSync(p.join(d,q)))return d;try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q)))return c}}catch(x){}return d})()+'/scripts/lib/session-aliases');
const path = require('path');

const result = sm.getAllSessions({ limit: 20 });
const aliases = aa.listAliases();
const aliasMap = {};
for (const a of aliases) aliasMap[a.sessionPath] = a.name;

console.log('Sessions (showing ' + result.sessions.length + ' of ' + result.total + '):');
console.log('');
console.log('ID        Date        Time     Branch       Worktree           Alias');
console.log('Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬');

for (const s of result.sessions) {
  const alias = aliasMap[s.filename] || '';
  const metadata = sm.parseSessionMetadata(sm.getSessionContent(s.sessionPath));
  const id = s.shortId === 'no-id' ? '(none)' : s.shortId.slice(0, 8);
  const time = s.modifiedTime.toTimeString().slice(0, 5);
  const branch = (metadata.branch || '-').slice(0, 12);
  const worktree = metadata.worktree ? path.basename(metadata.worktree).slice(0, 18) : '-';

  console.log(id.padEnd(8) + ' ' + s.date + '  ' + time + '   ' + branch.padEnd(12) + ' ' + worktree.padEnd(18) + ' ' + alias);
}
"
```

### Ã¥Å Â Ã¨Â½Â½Ã¤Â¼Å¡Ã¨Â¯Â

Ã¥Å Â Ã¨Â½Â½Ã¥Â¹Â¶Ã¦ËœÂ¾Ã§Â¤ÂºÃ¤Â¼Å¡Ã¨Â¯ÂÃ¥â€ â€¦Ã¥Â®Â¹Ã¯Â¼Ë†Ã©â‚¬Å¡Ã¨Â¿â€¡ ID Ã¦Ë†â€“Ã¥Ë†Â«Ã¥ÂÂÃ¯Â¼â€°Ã£â‚¬â€š

```bash
/sessions load <id|alias>             # Load session
/sessions load 2026-02-01             # By date (for no-id sessions)
/sessions load a1b2c3d4               # By short ID
/sessions load my-alias               # By alias name
```

**Ã¨â€žÅ¡Ã¦Å“Â¬Ã¯Â¼Å¡**

```bash
node -e "
const sm = require((()=>{var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(f.existsSync(p.join(d,q)))return d;try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q)))return c}}catch(x){}return d})()+'/scripts/lib/session-manager');
const aa = require((()=>{var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(f.existsSync(p.join(d,q)))return d;try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q)))return c}}catch(x){}return d})()+'/scripts/lib/session-aliases');
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

if (session.metadata.project) {
  console.log('Project: ' + session.metadata.project);
}

if (session.metadata.branch) {
  console.log('Branch: ' + session.metadata.branch);
}

if (session.metadata.worktree) {
  console.log('Worktree: ' + session.metadata.worktree);
}
" "$ARGUMENTS"
```

### Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Ë†Â«Ã¥ÂÂ

Ã¤Â¸ÂºÃ¤Â¼Å¡Ã¨Â¯ÂÃ¥Ë†â€ºÃ¥Â»ÂºÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Ëœâ€œÃ¨Â®Â°Ã§Å¡â€žÃ¥Ë†Â«Ã¥ÂÂÃ£â‚¬â€š

```bash
/sessions alias <id> <name>           # Create alias
/sessions alias 2026-02-01 today-work # Create alias named "today-work"
```

**Ã¨â€žÅ¡Ã¦Å“Â¬Ã¯Â¼Å¡**

```bash
node -e "
const sm = require((()=>{var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(f.existsSync(p.join(d,q)))return d;try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q)))return c}}catch(x){}return d})()+'/scripts/lib/session-manager');
const aa = require((()=>{var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(f.existsSync(p.join(d,q)))return d;try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q)))return c}}catch(x){}return d})()+'/scripts/lib/session-aliases');

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

### Ã§Â§Â»Ã©â„¢Â¤Ã¥Ë†Â«Ã¥ÂÂ

Ã¥Ë†Â Ã©â„¢Â¤Ã§Å½Â°Ã¦Å“â€°Ã§Å¡â€žÃ¥Ë†Â«Ã¥ÂÂÃ£â‚¬â€š

```bash
/sessions alias --remove <name>        # Remove alias
/sessions unalias <name>               # Same as above
```

**Ã¨â€žÅ¡Ã¦Å“Â¬Ã¯Â¼Å¡**

```bash
node -e "
const aa = require((()=>{var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(f.existsSync(p.join(d,q)))return d;try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q)))return c}}catch(x){}return d})()+'/scripts/lib/session-aliases');

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

### Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¿Â¡Ã¦ÂÂ¯

Ã¦ËœÂ¾Ã§Â¤ÂºÃ¤Â¼Å¡Ã¨Â¯ÂÃ§Å¡â€žÃ¨Â¯Â¦Ã§Â»â€ Ã¤Â¿Â¡Ã¦ÂÂ¯Ã£â‚¬â€š

```bash
/sessions info <id|alias>              # Show session details
```

**Ã¨â€žÅ¡Ã¦Å“Â¬Ã¯Â¼Å¡**

```bash
node -e "
const sm = require((()=>{var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(f.existsSync(p.join(d,q)))return d;try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q)))return c}}catch(x){}return d})()+'/scripts/lib/session-manager');
const aa = require((()=>{var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(f.existsSync(p.join(d,q)))return d;try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q)))return c}}catch(x){}return d})()+'/scripts/lib/session-aliases');

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
console.log('Project:     ' + (session.metadata.project || '-'));
console.log('Branch:      ' + (session.metadata.branch || '-'));
console.log('Worktree:    ' + (session.metadata.worktree || '-'));
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

### Ã¥Ë†â€”Ã¥â€¡ÂºÃ¥Ë†Â«Ã¥ÂÂ

Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¤Â¼Å¡Ã¨Â¯ÂÃ¥Ë†Â«Ã¥ÂÂÃ£â‚¬â€š

```bash
/sessions aliases                      # List all aliases
```

**Ã¨â€žÅ¡Ã¦Å“Â¬Ã¯Â¼Å¡**

```bash
node -e "
const aa = require((()=>{var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(f.existsSync(p.join(d,q)))return d;try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q)))return c}}catch(x){}return d})()+'/scripts/lib/session-aliases');

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

## Ã¦â€œÂÃ¤Â½Å“Ã¥â€˜ËœÃ§Â¬â€Ã¨Â®Â°

* Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¥Å“Â¨Ã¥Â¤Â´Ã©Æ’Â¨Ã¦Å’ÂÃ¤Â¹â€¦Ã¥Å’â€“ `Project`Ã£â‚¬Â`Branch` Ã¥â€™Å’ `Worktree`Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¾Â¿ `/sessions info` Ã¥ÂÂ¯Ã¤Â»Â¥Ã¥Å’ÂºÃ¥Ë†â€ Ã¥Â¹Â¶Ã¨Â¡Å’ tmux/Ã¥Â·Â¥Ã¤Â½Å“Ã¦Â â€˜Ã¨Â¿ÂÃ¨Â¡Å’Ã£â‚¬â€š
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦Å’â€¡Ã¦Å’Â¥Ã¤Â¸Â­Ã¥Â¿Æ’Ã¥Â¼ÂÃ§â€ºâ€˜Ã¦Å½Â§Ã¯Â¼Å’Ã¨Â¯Â·Ã§Â»â€œÃ¥ÂË†Ã¤Â½Â¿Ã§â€Â¨ `/sessions info`Ã£â‚¬Â`git diff --stat` Ã¤Â»Â¥Ã¥ÂÅ Ã§â€Â± `scripts/hooks/cost-tracker.js` Ã¥Ââ€˜Ã¥â€¡ÂºÃ§Å¡â€žÃ¦Ë†ÂÃ¦Å“Â¬Ã¦Å’â€¡Ã¦Â â€¡Ã£â‚¬â€š

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS:

* `list [options]` - Ã¥Ë†â€”Ã¥â€¡ÂºÃ¤Â¼Å¡Ã¨Â¯Â
  * `--limit <n>` - Ã¦Å“â‚¬Ã¥Â¤Â§Ã¦ËœÂ¾Ã§Â¤ÂºÃ¤Â¼Å¡Ã¨Â¯ÂÃ¦â€¢Â°Ã¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼Å¡50Ã¯Â¼â€°
  * `--date <YYYY-MM-DD>` - Ã¦Å’â€°Ã¦â€”Â¥Ã¦Å“Å¸Ã§Â­â€ºÃ©â‚¬â€°
  * `--search <pattern>` - Ã¥Å“Â¨Ã¤Â¼Å¡Ã¨Â¯Â ID Ã¤Â¸Â­Ã¦ÂÅ“Ã§Â´Â¢
* `load <id|alias>` - Ã¥Å Â Ã¨Â½Â½Ã¤Â¼Å¡Ã¨Â¯ÂÃ¥â€ â€¦Ã¥Â®Â¹
* `alias <id> <name>` - Ã¤Â¸ÂºÃ¤Â¼Å¡Ã¨Â¯ÂÃ¥Ë†â€ºÃ¥Â»ÂºÃ¥Ë†Â«Ã¥ÂÂ
* `alias --remove <name>` - Ã§Â§Â»Ã©â„¢Â¤Ã¥Ë†Â«Ã¥ÂÂ
* `unalias <name>` - Ã¤Â¸Å½ `--remove` Ã§â€ºÂ¸Ã¥ÂÅ’
* `info <id|alias>` - Ã¦ËœÂ¾Ã§Â¤ÂºÃ¤Â¼Å¡Ã¨Â¯ÂÃ§Â»Å¸Ã¨Â®Â¡Ã¤Â¿Â¡Ã¦ÂÂ¯
* `aliases` - Ã¥Ë†â€”Ã¥â€¡ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¥Ë†Â«Ã¥ÂÂ
* `help` - Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦Â­Â¤Ã¥Â¸Â®Ã¥Å Â©Ã¤Â¿Â¡Ã¦ÂÂ¯

## Ã§Â¤ÂºÃ¤Â¾â€¹

```bash
# List all sessions
/sessions list

# Create an alias for today's session
/sessions alias 2026-02-01 today

# Load session by alias
/sessions load today

# Show session info
/sessions info today

# Remove alias
/sessions alias --remove today

# List all aliases
/sessions aliases
```

## Ã¥Â¤â€¡Ã¦Â³Â¨

* Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â»Â¥ Markdown Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Â½Â¢Ã¥Â¼ÂÃ¥Â­ËœÃ¥â€šÂ¨Ã¥Å“Â¨ `~/.claude/sessions/`
* Ã¥Ë†Â«Ã¥ÂÂÃ¥Â­ËœÃ¥â€šÂ¨Ã¥Å“Â¨ `~/.claude/session-aliases.json`
* Ã¤Â¼Å¡Ã¨Â¯Â ID Ã¥ÂÂ¯Ã¤Â»Â¥Ã§Â¼Â©Ã§Å¸Â­Ã¯Â¼Ë†Ã©â‚¬Å¡Ã¥Â¸Â¸Ã¥â€°Â 4-8 Ã¤Â¸ÂªÃ¥Â­â€”Ã§Â¬Â¦Ã¥Â°Â±Ã¨Â¶Â³Ã¥Â¤Å¸Ã¥â€Â¯Ã¤Â¸â‚¬Ã¯Â¼â€°
* Ã¤Â¸ÂºÃ§Â»ÂÃ¥Â¸Â¸Ã¥Â¼â€¢Ã§â€Â¨Ã§Å¡â€žÃ¤Â¼Å¡Ã¨Â¯ÂÃ¤Â½Â¿Ã§â€Â¨Ã¥Ë†Â«Ã¥ÂÂ
