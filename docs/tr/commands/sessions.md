---
description: Claude Code session geÃƒÂ§miÃ…Å¸ini, aliaslarÃ„Â± ve session metadata'sÃ„Â±nÃ„Â± yÃƒÂ¶net.
---

# Sessions Komutu

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


Claude Code session geÃƒÂ§miÃ…Å¸ini yÃƒÂ¶net - `~/.claude/sessions/` dizininde saklanan session'larÃ„Â± listele, yÃƒÂ¼kle, alias ata ve dÃƒÂ¼zenle.

## KullanÃ„Â±m

`/sessions [list|load|alias|info|help] [options]`

## Aksiyonlar

### List Sessions

TÃƒÂ¼m session'larÃ„Â± metadata, filtreleme ve sayfalama ile gÃƒÂ¶ster.

Bir swarm iÃƒÂ§in operatÃƒÂ¶r-yÃƒÂ¼zey context'e ihtiyacÃ„Â±nÃ„Â±z olduÃ„Å¸unda `/sessions info` kullanÃ„Â±n: branch, worktree yolu ve session gÃƒÂ¼ncelliÃ„Å¸i.

```bash
/sessions                              # TÃƒÂ¼m session'larÃ„Â± listele (varsayÃ„Â±lan)
/sessions list                         # YukarÃ„Â±dakiyle aynÃ„Â±
/sessions list --limit 10              # 10 session gÃƒÂ¶ster
/sessions list --date 2026-02-01       # Tarihe gÃƒÂ¶re filtrele
/sessions list --search abc            # Session ID'ye gÃƒÂ¶re ara
```

**Script:**
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

### Load Session

Session iÃƒÂ§eriÃ„Å¸ini yÃƒÂ¼kle ve gÃƒÂ¶ster (ID veya alias ile).

```bash
/sessions load <id|alias>             # Session yÃƒÂ¼kle
/sessions load 2026-02-01             # Tarihe gÃƒÂ¶re (no-id session'lar iÃƒÂ§in)
/sessions load a1b2c3d4               # Short ID ile
/sessions load my-alias               # Alias adÃ„Â±yla
```

**Script:**
```bash
node -e "
const sm = require((()=>{var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(f.existsSync(p.join(d,q)))return d;try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q)))return c}}catch(x){}return d})()+'/scripts/lib/session-manager');
const aa = require((()=>{var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(f.existsSync(p.join(d,q)))return d;try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q)))return c}}catch(x){}return d})()+'/scripts/lib/session-aliases');
const id = process.argv[1];

// Ãƒâ€“nce alias olarak ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mlemeyi dene
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

### Create Alias

Session iÃƒÂ§in akÃ„Â±lda kalÃ„Â±cÃ„Â± bir alias oluÃ…Å¸tur.

```bash
/sessions alias <id> <name>           # Alias oluÃ…Å¸tur
/sessions alias 2026-02-01 today-work # "today-work" adlÃ„Â± alias oluÃ…Å¸tur
```

**Script:**
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

// Session dosya adÃ„Â±nÃ„Â± al
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

### Remove Alias

Mevcut bir alias'Ã„Â± sil.

```bash
/sessions alias --remove <name>        # Alias'Ã„Â± kaldÃ„Â±r
/sessions unalias <name>               # YukarÃ„Â±dakiyle aynÃ„Â±
```

**Script:**
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

### Session Info

Session hakkÃ„Â±nda detaylÃ„Â± bilgi gÃƒÂ¶ster.

```bash
/sessions info <id|alias>              # Session detaylarÃ„Â±nÃ„Â± gÃƒÂ¶ster
```

**Script:** (yukarÃ„Â±daki Load Session script'i ile aynÃ„Â± yapÃ„Â±)

### List Aliases

TÃƒÂ¼m session aliaslarÃ„Â±nÃ„Â± gÃƒÂ¶ster.

```bash
/sessions aliases                      # TÃƒÂ¼m aliaslarÃ„Â± listele
```

**Script:**
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

## OperatÃƒÂ¶r NotlarÃ„Â±

- Session dosyalarÃ„Â± header'da `Project`, `Branch` ve `Worktree`'yi sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼r, bÃƒÂ¶ylece `/sessions info` parallel tmux/worktree ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmalarÃ„Â±nÃ„Â± ayÃ„Â±rt edebilir.
- Command-center tarzÃ„Â± izleme iÃƒÂ§in, `/sessions info`, `git diff --stat` ve `scripts/hooks/cost-tracker.js` tarafÃ„Â±ndan yayÃ„Â±lan cost metriklerini birleÃ…Å¸tirin.

## ArgÃƒÂ¼manlar

$ARGUMENTS:
- `list [options]` - Session'larÃ„Â± listele
  - `--limit <n>` - GÃƒÂ¶sterilecek max session (varsayÃ„Â±lan: 50)
  - `--date <YYYY-MM-DD>` - Tarihe gÃƒÂ¶re filtrele
  - `--search <pattern>` - Session ID'de ara
- `load <id|alias>` - Session iÃƒÂ§eriÃ„Å¸ini yÃƒÂ¼kle
- `alias <id> <name>` - Session iÃƒÂ§in alias oluÃ…Å¸tur
- `alias --remove <name>` - Alias'Ã„Â± kaldÃ„Â±r
- `unalias <name>` - `--remove` ile aynÃ„Â±
- `info <id|alias>` - Session istatistiklerini gÃƒÂ¶ster
- `aliases` - TÃƒÂ¼m aliaslarÃ„Â± listele
- `help` - Bu yardÃ„Â±mÃ„Â± gÃƒÂ¶ster

## Ãƒâ€“rnekler

```bash
# TÃƒÂ¼m session'larÃ„Â± listele
/sessions list

# BugÃƒÂ¼nkÃƒÂ¼ session iÃƒÂ§in alias oluÃ…Å¸tur
/sessions alias 2026-02-01 today

# Session'Ã„Â± alias ile yÃƒÂ¼kle
/sessions load today

# Session bilgisini gÃƒÂ¶ster
/sessions info today

# Alias'Ã„Â± kaldÃ„Â±r
/sessions alias --remove today

# TÃƒÂ¼m aliaslarÃ„Â± listele
/sessions aliases
```

## Notlar

- Session'lar `~/.claude/sessions/` dizininde markdown dosyalarÃ„Â± olarak saklanÃ„Â±r
- Aliaslar `~/.claude/session-aliases.json` dosyasÃ„Â±nda saklanÃ„Â±r
- Session ID'leri kÃ„Â±saltÃ„Â±labilir (ilk 4-8 karakter genellikle yeterince benzersizdir)
- SÃ„Â±k referans verilen session'lar iÃƒÂ§in aliaslarÃ„Â± kullanÃ„Â±n
