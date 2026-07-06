#!/usr/bin/env python3
"""SeaBridge MCP Sentinel preflight gate.

Reads a tool-call payload as JSON from stdin and decides whether the call may
proceed. Referenced by:
  - manageesg-frontend/.gemini/settings.json   (BeforeTool hook)
  - manageesg-frontend/.codex/hooks.json       (PreToolUse hook)
  - manageesg-frontend/.claude/settings.json   (PreToolUse hook)
  - manageesg-frontend/.opencode/plugins/seabridge-sentinel.js

Contract: prints {"decision": "allow"} or {"decision": "block", "reason": ...}
to stdout. Exit 0 = allow, exit 2 = block (Claude Code hook convention; the
Gemini/OpenCode callers parse the JSON instead of the exit code).

Design: conservative deny-list. Only clearly catastrophic operations are
blocked; everything else is allowed so normal work is never impeded.
Instruction-level approval gates still apply on top of this.
"""

import json
import re
import sys

DENY_PATTERNS = [
    # Catastrophic filesystem deletion (root/home/drive scope)
    (r"rm\s+(-[a-zA-Z]*r[a-zA-Z]*f|-[a-zA-Z]*f[a-zA-Z]*r)[a-zA-Z]*\s+([\"']?)(/|~|[A-Za-z]:[\\/])\2(\s|$)",
     "recursive force delete of a root/home/drive path"),
    (r"Remove-Item\s+.*-Recurse.*\s([\"']?)[A-Za-z]:[\\/]\1(\s|$)",
     "recursive Remove-Item on a drive root"),
    (r"\bmkfs(\.| )", "filesystem format command"),
    (r"\bformat\s+[A-Za-z]:", "drive format command"),
    # Git history/branch destruction
    (r"git\s+push\s+.*(--force(?!-with-lease)|\s-f\s)", "git force push"),
    (r"git\s+branch\s+-D\s+(main|master|seabridge_development|development)\b",
     "force-deleting a protected branch"),
    # Database destruction
    (r"\bdrop\s+(database|table|collection)\b", "database drop statement"),
    (r"\btruncate\s+table\b", "table truncate statement"),
    (r"deleteMany\s*\(\s*\{\s*\}\s*\)", "unfiltered deleteMany"),
    # Secret exfiltration primitives
    (r"(cat|type|Get-Content)\s+[^|;&]*\.env\b[^|;&]*\|\s*(curl|wget|Invoke-WebRequest|nc\b)",
     "piping .env contents to a network tool"),
]


def gather_text(payload):
    parts = []
    for key in ("tool_name", "tool", "command"):
        value = payload.get(key)
        if isinstance(value, str):
            parts.append(value)
    tool_input = payload.get("tool_input") or payload.get("arguments") or {}
    if isinstance(tool_input, dict):
        for value in tool_input.values():
            if isinstance(value, str):
                parts.append(value)
    elif isinstance(tool_input, str):
        parts.append(tool_input)
    return "\n".join(parts)


def main():
    try:
        raw = sys.stdin.read()
        payload = json.loads(raw) if raw.strip() else {}
    except (json.JSONDecodeError, UnicodeDecodeError):
        # Unreadable payload: allow (this gate only blocks known-bad patterns).
        print(json.dumps({"decision": "allow"}))
        return 0

    text = gather_text(payload)
    for pattern, reason in DENY_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            message = f"MCP Sentinel blocked: {reason}. Requires explicit user approval outside this gate."
            print(json.dumps({"decision": "block", "reason": message}))
            print(message, file=sys.stderr)
            return 2

    print(json.dumps({"decision": "allow"}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
