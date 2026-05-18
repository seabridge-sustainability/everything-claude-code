param(
  [string]$UpstreamPath = "C:\Users\adelm\SeaBridgeAI\_upstream",
  [int]$MaxReferenceFindings = 500,
  [switch]$AsJson,
  [switch]$FailOnRootFinding
)

$ErrorActionPreference = "Stop"

function Add-Finding($List, $Rule, $Severity, $Path, $Line, $Message) {
  $List.Add([pscustomobject]@{
    rule = $Rule
    severity = $Severity
    path = $Path
    line = $Line
    message = $Message
  }) | Out-Null
}

$findings = New-Object System.Collections.Generic.List[object]

if (-not (Test-Path -LiteralPath $UpstreamPath)) {
  Add-Finding $findings "upstream.missing" "error" $UpstreamPath 0 "_upstream path is missing."
} else {
  $rootDocs = @("AGENTS.md", "CLAUDE.md", "AGENTS_SYSTEM.md", "CODEX.md", "GEMINI.md", "OPENCODE.md", "AGENT_SKILLS.md") |
    ForEach-Object { Join-Path $UpstreamPath $_ } |
    Where-Object { Test-Path -LiteralPath $_ }

  foreach ($doc in $rootDocs) {
    $content = Get-Content -Raw -LiteralPath $doc
    if ($content -notmatch "SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1") {
      Add-Finding $findings "upstream.root-system-id" "error" $doc 1 "Root upstream adapter is missing SYSTEM_ID."
    }
    if ($content -notmatch "everything-claude-code") {
      Add-Finding $findings "upstream.root-ecc-pointer" "error" $doc 1 "Root upstream adapter is missing ECC pointer."
    }
    if ($content -notmatch "Upstream Safety Override" -and (Split-Path -Leaf $doc) -in @("AGENTS.md", "CLAUDE.md")) {
      Add-Finding $findings "upstream.root-safety-override" "error" $doc 1 "Root upstream adapter is missing explicit upstream safety override."
    }
  }

  foreach ($doc in $rootDocs) {
    $matches = Select-String -LiteralPath $doc -Pattern "npm install -g|global install|dangerously-skip-permissions|permission-skipping|auto-commit|auto-push|git push -u origin|git push --force" -AllMatches -ErrorAction SilentlyContinue
    foreach ($match in $matches) {
      if ($match.Line -notmatch "(?i)explicit approval|do not|no global|not permission|without approval|approval-gated|audit findings|compatibility context|SeaBridgeAI root guidance always wins|document .*blocker|override unsafe|may contain|Treat those as|direct push examples") {
        Add-Finding $findings "upstream.root-unsafe-example" "error" $doc $match.LineNumber "Root upstream adapter has unsafe-looking language without an approval gate."
      }
    }
  }

  $rg = Get-Command rg -ErrorAction SilentlyContinue
  if ($rg) {
    $pattern = "npm install -g|global install|dangerously-skip-permissions|permission-skipping|yolo|autonomous|auto-commit|auto-push|git push -u origin|git push --force"
    $args = @(
      "-n",
      "--hidden",
      "--glob", "!**/.git/**",
      "--glob", "!**/node_modules/**",
      "--glob", "!**/dist/**",
      "--glob", "!**/build/**",
      "--glob", "!**/coverage/**",
      "--glob", "!AGENTS.md",
      "--glob", "!CLAUDE.md",
      "--glob", "!AGENTS_SYSTEM.md",
      "--glob", "!CODEX.md",
      "--glob", "!GEMINI.md",
      "--glob", "!OPENCODE.md",
      $pattern,
      $UpstreamPath
    )
    $lines = @(& rg @args 2>$null | Select-Object -First $MaxReferenceFindings)
    foreach ($line in $lines) {
      $parts = $line -split ":", 3
      $path = if ($parts.Count -ge 1) { $parts[0] } else { $UpstreamPath }
      $lineNumber = 0
      if ($parts.Count -ge 2) { [void][int]::TryParse($parts[1], [ref]$lineNumber) }
      $text = if ($parts.Count -ge 3) { $parts[2] } else { $line }
      $rule = "upstream.reference-unsafe-or-install"
      if ($text -match "npm install -g|global install") { $rule = "upstream.reference-global-install" }
      elseif ($text -match "dangerously-skip-permissions|permission-skipping|yolo|autonomous") { $rule = "upstream.reference-dangerous-mode" }
      elseif ($text -match "auto-commit|auto-push|git push -u origin|git push --force") { $rule = "upstream.reference-auto-publish" }
      Add-Finding $findings $rule "info" $path $lineNumber "Imported upstream content contains unsafe or install/publish language; root SeaBridgeAI guardrails override it."
    }
    if ($lines.Count -ge $MaxReferenceFindings) {
      Add-Finding $findings "upstream.reference-scan-capped" "info" $UpstreamPath 0 "Reference scan capped at $MaxReferenceFindings findings; increase -MaxReferenceFindings for a fuller inventory."
    }
  } else {
    Add-Finding $findings "upstream.rg-missing" "warn" $UpstreamPath 0 "ripgrep was not found; recursive reference-content scan skipped."
  }
}

if ($AsJson) {
  if ($findings.Count -eq 0) {
    "[]"
  } else {
    $findings | ConvertTo-Json -Depth 5
  }
} else {
  $errors = @($findings | Where-Object { $_.severity -eq "error" })
  $infos = @($findings | Where-Object { $_.severity -eq "info" })
  if ($errors.Count -eq 0) {
    Write-Host "[upstream-guardrails] PASS: root adapters are guarded."
  } else {
    $errors | Format-Table -AutoSize
  }
  if ($infos.Count -gt 0) {
    Write-Host "[upstream-guardrails] Reference-content findings by type:"
    $infos | Group-Object rule | Select-Object Name, Count | Format-Table -AutoSize
  }
}

if (@($findings | Where-Object { $_.severity -eq "error" }).Count -gt 0 -and $FailOnRootFinding) {
  exit 1
}
