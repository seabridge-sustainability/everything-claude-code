#!/usr/bin/env python3
"""SeaBridgeAI MCP Sentinel gate.

This wrapper lets operators pause Sentinel temporarily without editing every
agent hook again. If the workspace marker has a future disabled_until timestamp,
the hook allows the tool call. Otherwise it delegates to the pinned Sentinel
preflight hook.
"""

from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path


WORKSPACE_ROOT = Path("C:/Users/adelm/SeaBridgeAI")
DISABLE_MARKER = WORKSPACE_ROOT / ".sentinel-disabled-until.json"
SENTINEL_HOOK = (
    WORKSPACE_ROOT
    / "everything-claude-code"
    / "vendor"
    / "claude-mcp-sentinel"
    / "hooks"
    / "sentinel_preflight.py"
)


def _parse_datetime(value: str) -> datetime | None:
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def _disabled_until() -> datetime | None:
    if not DISABLE_MARKER.exists():
        return None

    try:
        marker = json.loads(DISABLE_MARKER.read_text(encoding="utf-8"))
    except Exception:
        return None

    disabled_until = marker.get("disabled_until")
    if not isinstance(disabled_until, str):
        return None

    return _parse_datetime(disabled_until)


def _is_disabled() -> bool:
    disabled_until = _disabled_until()
    if disabled_until is None:
        return False

    now = datetime.now(disabled_until.tzinfo)
    return now < disabled_until


def main() -> None:
    payload = sys.stdin.read()

    if _is_disabled():
        print(json.dumps({"decision": "allow"}))
        return

    result = subprocess.run(
        [sys.executable, str(SENTINEL_HOOK)],
        input=payload,
        text=True,
        capture_output=True,
        timeout=15,
        check=False,
    )

    if result.stdout.strip():
        print(result.stdout.strip())
    else:
        print(json.dumps({"decision": "allow"}))


if __name__ == "__main__":
    main()
