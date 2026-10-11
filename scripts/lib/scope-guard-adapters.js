'use strict';

// Runtime names and argument shapes are adapter contracts, never shell allowlists.
function normalizePayload(runtime, payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('invalid event');
  const result = { ...payload };
  const name = payload.tool_name || payload.toolName;
  const args = payload.tool_input ?? payload.toolInput;
  if (runtime === 'gemini') {
    const reads = ['read_file', 'read_many_files', 'list_directory', 'search_file_content', 'glob'];
    if (reads.includes(name)) result.tool_name = 'Read';
    if (name === 'replace') result.tool_name = 'Edit';
  }
  if (runtime === 'opencode') {
    if (['read', 'glob', 'grep', 'list'].includes(name)) result.tool_name = 'Read';
    if (name === 'write' || name === 'edit') {
      result.tool_name = name === 'write' ? 'Write' : 'Edit';
      // OpenCode's actual callback supplies output.args, not input.args.
      result.tool_input = { ...args, file_path: args?.filePath };
    }
    if (name === 'apply_patch') result.tool_input = { input: args?.patchText };
  }
  return result;
}

function denialOutput(runtime, event, reason) {
  if (runtime === 'gemini') return { decision: 'deny', reason };
  if (runtime === 'copilot-cli' && event === 'pre') return { permissionDecision: 'deny', permissionDecisionReason: reason };
  if (['claude', 'codex'].includes(runtime)) {
    return event === 'pre'
      ? { hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason } }
      : { decision: 'block', reason };
  }
  return null; // Unsupported native JSON controls retain the exit-2 wrapper contract.
}

module.exports = { normalizePayload, denialOutput };
