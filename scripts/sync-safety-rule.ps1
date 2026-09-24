param(
  [string[]]$Roots = @(
    "C:\Users\adelm\SeaBridgeAI\everything-claude-code",
    "C:\Users\adelm\SeaBridgeAI\manageesg-backend",
    "C:\Users\adelm\SeaBridgeAI\manageesg-frontend",
    "C:\Users\adelm\SeaBridgeAI\openseabri",
    "C:\Users\adelm\SeaBridgeAI\autoresearch",
    "C:\Users\adelm\SeaBridgeAI\climada-stack",
    "C:\Users\adelm\SeaBridgeAI\_upstream"
  ),
  [string]$CanonicalFile = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\SAFETY_AUTHORIZATION_RULE.md",
  [switch]$Check
)

$ErrorActionPreference = "Stop"

# Propagates the canonical Safety And Authorization Rule block to every
# markdown file that carries it. Two match modes:
#   1. Marker mode: content between SEABRIDGE_SAFETY_RULE_START/END markers is
#      replaced with the canonical block.
#   2. Adoption mode: a legacy unmarked block (header through rule 7) is
#      wrapped with markers and replaced with the canonical block.
# -Check reports drift/legacy blocks without writing and exits 1 if any found.

$startMarker = "<!-- SEABRIDGE_SAFETY_RULE_START -->"
$endMarker = "<!-- SEABRIDGE_SAFETY_RULE_END -->"

$canonRaw = [System.IO.File]::ReadAllText($CanonicalFile, [System.Text.Encoding]::UTF8)
$canonMatch = [regex]::Match($canonRaw, "(?s)" + [regex]::Escape($startMarker) + "(.*?)" + [regex]::Escape($endMarker))
if (-not $canonMatch.Success) { throw "Canonical file has no marker block: $CanonicalFile" }
$canonBlock = $startMarker + $canonMatch.Groups[1].Value + $endMarker
# Normalize canonical block to LF internally; per-file EOL is restored on write.
$canonBlockLf = $canonBlock -replace "`r`n", "`n"

$markerRegex = [regex]("(?s)" + [regex]::Escape($startMarker) + ".*?" + [regex]::Escape($endMarker))
$legacyRegex = [regex]"(?s)## Safety And Authorization Rule.*?7\. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later\. Never store secrets in code, docs, logs, or commits\."

# Worktrees and run checkouts belong to other (possibly live) sessions: never stamp into them.
$exclude = '\\node_modules\\|\\external\\|\\vendor\\|\\_upstream\\|\\\.git\\|\\graphify\\|\\docs\\reports\\|\\\.venv|\\venv\\|\\\.claude\\worktrees\\|\\\.wt[^\\]*\\|\\artifacts\\agent-runs\\|\\\.worktrees\\|\\\.qa-snapshots\\|\\\.next\\|\\\.playwright-agent\\|\\\.mypy_cache\\|\\__pycache__\\'

$drift = @()
$updated = 0
$adopted = 0

# Walk with pruning: excluded trees (worktrees, run checkouts, node_modules,
# venvs, mirrors) are never entered, so a check takes seconds instead of
# enumerating millions of files first. Symlinked/junction directories are
# skipped (their targets are walked directly). The `_upstream` root holds
# third-party mirrors, so only its own top-level files are scanned; the old
# full-path exclude also matched that root itself, so it was never synced.
function Get-MdFiles([string]$Root) {
  $shallow = $Root -match '\\_upstream\\?$'
  $stack = New-Object System.Collections.Stack
  $stack.Push($Root)
  while ($stack.Count -gt 0) {
    $dir = $stack.Pop()
    try { foreach ($f in [System.IO.Directory]::EnumerateFiles($dir, '*.md')) { $f } } catch { }
    if ($shallow) { continue }
    try {
      foreach ($sub in [System.IO.Directory]::EnumerateDirectories($dir)) {
        if (([System.IO.File]::GetAttributes($sub) -band [System.IO.FileAttributes]::ReparsePoint) -ne 0) { continue }
        if (($sub + '\') -match $exclude) { continue }
        $stack.Push($sub)
      }
    } catch { }
  }
}

foreach ($root in $Roots) {
  Get-MdFiles $root |
    Where-Object { $_ -notmatch $exclude -or $root -match '\\_upstream\\?$' } |
    Where-Object { $_ -ne $CanonicalFile } |
    ForEach-Object {
      $path = $_
      $bytes = [System.IO.File]::ReadAllBytes($path)
      $hasBom = ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF)
      $text = [System.Text.Encoding]::UTF8.GetString($bytes)
      if ($hasBom) { $text = $text.TrimStart([char]0xFEFF) }

      $usesCrlf = $text.Contains("`r`n")
      $canon = if ($usesCrlf) { $canonBlockLf -replace "`n", "`r`n" } else { $canonBlockLf }

      $newText = $text
      $kind = $null
      if ($markerRegex.IsMatch($text)) {
        $current = $markerRegex.Match($text).Value
        if ($current -ne $canon) {
          $newText = $markerRegex.Replace($text, { param($m) $canon }, 1)
          $kind = "drift"
        }
      }
      elseif ($legacyRegex.IsMatch($text)) {
        $newText = $legacyRegex.Replace($text, { param($m) $canon }, 1)
        $kind = "legacy"
      }

      if ($null -eq $kind) { return }
      if ($Check) {
        $script:drift += "$kind : $path"
        return
      }
      $enc = if ($hasBom) { New-Object System.Text.UTF8Encoding($true) } else { New-Object System.Text.UTF8Encoding($false) }
      [System.IO.File]::WriteAllText($path, $newText, $enc)
      if ($kind -eq "legacy") { $script:adopted++ } else { $script:updated++ }
    }
}

if ($Check) {
  if ($drift.Count -gt 0) {
    Write-Host ("[safety-rule] CHECK FAIL - files out of sync:`n" + ($drift -join "`n"))
    exit 1
  }
  Write-Host "[safety-rule] CHECK PASS - all embedded blocks match canonical"
  exit 0
}

Write-Host "[safety-rule] Sync complete: $updated marker blocks updated, $adopted legacy blocks adopted"
