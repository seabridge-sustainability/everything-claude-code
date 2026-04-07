#!/usr/bin/env node
/**
 * PreCompact Hook - Save state before context compaction
 *
 * Cross-platform (Windows, macOS, Linux)
 *
 * Runs before Claude compacts context, giving you a chance to
 * preserve important state that might get lost in summarization.
 */

const path = require('path');
const {
  getSessionsDir,
  getDateTimeString,
  getTimeString,
  findFiles,
  ensureDir,
  appendFile,
  log
} = require('../lib/utils');

function run(rawInput) {
  try {
    const sessionsDir = getSessionsDir();
    const compactionLog = path.join(sessionsDir, 'compaction-log.txt');

    ensureDir(sessionsDir);

    // Log compaction event with timestamp
    const timestamp = getDateTimeString();
    appendFile(compactionLog, `[${timestamp}] Context compaction triggered\n`);

    // If there's an active session file, note the compaction
    const sessions = findFiles(sessionsDir, '*-session.tmp');

    if (sessions.length > 0) {
      const activeSession = sessions[0].path;
      const timeStr = getTimeString();
      appendFile(activeSession, `\n---\n**[Compaction occurred at ${timeStr}]** - Context was summarized\n`);
    }

    log('[PreCompact] State saved before compaction');
  } catch (err) {
    console.error('[PreCompact] Error:', err.message);
  }
  return rawInput;
}

module.exports = { run };

if (require.main === module) {
  let data = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => { data += chunk; });
  process.stdin.on('end', () => {
    run(data);
    process.exit(0);
  });
}
