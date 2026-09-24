# Pruned file walk shared by the SeaBridge validators (dot-source this file).
#
# Get-ChildItem -Recurse enumerates every file under a root (millions in these
# repos: node_modules, venvs, 100k-directory QA snapshots, 150+ run checkouts)
# before any filter runs, which made full scans take tens of minutes or never
# finish. This walker never enters a pruned directory.
#
#   -EquivalentPrune  regexes the caller ALREADY applies to file paths as
#                     exclusions; a directory whose "path\" matches one can only
#                     contain excluded files, so skipping it cannot change results.
#   -ExtraPrune       additional trees that belong to other sessions or are
#                     generated copies (worktrees, run checkouts, snapshots). These
#                     DO change the input set; callers expose -FullScan to disable
#                     them so the difference can be measured.
#   -Include          file-name wildcards with PowerShell -like semantics (same as
#                     Get-ChildItem -Include).
#   -IncludeHidden    mirrors Get-ChildItem -Force; without it Hidden items are
#                     skipped, as Get-ChildItem does.
#   Reparse points (symlinks/junctions) are skipped unless -FollowReparse.

$script:SeaBridgeExtraPrune = '\\(\.git|\.claude\\worktrees|\.wt[^\\]*|\.worktrees|artifacts\\agent-runs|\.qa-snapshots|\.playwright-agent|\.mypy_cache|_qa-[^\\]*)\\'

function Get-SeaBridgePrunedFiles {
  param(
    [Parameter(Mandatory = $true)][string]$Root,
    [string[]]$Include = @('*'),
    [string[]]$EquivalentPrune = @(),
    [string[]]$ExtraPrune = @(),
    [switch]$IncludeHidden,
    [switch]$FollowReparse
  )
  if (-not (Test-Path -LiteralPath $Root -PathType Container)) { return }
  $prune = @($EquivalentPrune + $ExtraPrune | Where-Object { $_ })
  $hidden = [System.IO.FileAttributes]::Hidden
  $reparse = [System.IO.FileAttributes]::ReparsePoint
  $stack = New-Object System.Collections.Stack
  $stack.Push((Resolve-Path -LiteralPath $Root).ProviderPath)
  while ($stack.Count -gt 0) {
    $dir = $stack.Pop()
    try { $info = [System.IO.DirectoryInfo]::new($dir); $entries = $info.EnumerateFileSystemInfos() } catch { continue }
    try {
      foreach ($e in $entries) {
        if (-not $IncludeHidden -and ($e.Attributes -band $hidden)) { continue }
        if ($e -is [System.IO.DirectoryInfo]) {
          if (-not $FollowReparse -and ($e.Attributes -band $reparse)) { continue }
          $probe = $e.FullName + '\'
          $skip = $false
          foreach ($rx in $prune) { if ($probe -match $rx) { $skip = $true; break } }
          if (-not $skip) { $stack.Push($e.FullName) }
        } else {
          foreach ($pattern in $Include) { if ($e.Name -like $pattern) { $e; break } }
        }
      }
    } catch { }
  }
}
