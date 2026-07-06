param(
  [string]$RepoPath = "C:\Users\adelm\SeaBridgeAI\manageesg-frontend",
  [ValidateSet("production-ui","all")]
  [string]$Scope = "production-ui",
  [string[]]$Files,
  [string[]]$BlockingRules,
  [switch]$FailOnFinding
)

$ErrorActionPreference = "Stop"
$findings = New-Object System.Collections.Generic.List[object]
$normalizedBlockingRules = @()
if ($BlockingRules -and $BlockingRules.Count -gt 0) {
  $normalizedBlockingRules = @($BlockingRules | ForEach-Object { ([string]$_).Split(",") } | ForEach-Object { $_.Trim() } | Where-Object { $_ })
}

function Add-Finding($Rule, $Severity, $File, $Line, $Message) {
  $findings.Add([pscustomobject]@{
    rule = $Rule
    severity = $Severity
    file = $File
    line = $Line
    message = $Message
  })
}

function Test-ButtonHasAccessibleName($Block) {
  $hasLabel = $Block -match '(aria-label|aria-labelledby|title=)'
  $hasVisibleText = $Block -match '>\s*[A-Za-z0-9][^<]{1,120}\s*<'
  $hasSrOnly = $Block -match 'sr-only'
  return ($hasLabel -or $hasVisibleText -or $hasSrOnly)
}

function Test-IconOnlyButton($Block) {
  $iconNamePattern = '<(Icon|[A-Z][A-Za-z0-9]*(Icon|Chevron|Arrow|Search|X|Plus|Minus|Trash|Edit|Menu|More|Download|Upload|Copy|Save|Refresh|Filter|Settings|Bell|Eye|EyeOff|Info|Help|Calendar|Clock|Map|Mail|Phone|User|Users|Check|Close|Play|Pause|Stop|Star|Heart|Share|ExternalLink|File|Folder|Home|Loader|Spinner))\b'
  $hasSvgOrIcon = $Block -match '(<svg\b|lucide|heroicon|phosphor|tabler|react-icons)' -or $Block -match $iconNamePattern
  $hasReadableLiteral = $Block -match '>\s*[A-Za-z][A-Za-z0-9 ,._:/#-]{2,120}\s*<'
  return ($hasSvgOrIcon -and -not $hasReadableLiteral)
}

if (-not (Test-Path $RepoPath)) {
  throw "Repo path not found: $RepoPath"
}

$frontFiles = if ($Files -and $Files.Count -gt 0) {
  $Files | ForEach-Object {
    $candidate = if ([System.IO.Path]::IsPathRooted($_)) { $_ } else { Join-Path $RepoPath $_ }
    if (Test-Path -LiteralPath $candidate) { Get-Item -LiteralPath $candidate }
  } | Where-Object { $_.Extension -in @(".ts",".tsx",".js",".jsx") }
} else {
  Get-ChildItem -Path $RepoPath -Recurse -Include *.ts,*.tsx,*.js,*.jsx -File -ErrorAction SilentlyContinue
}

$frontFiles = $frontFiles | Where-Object {
    $_.FullName -notmatch '\\(node_modules|dist|build|\.next|coverage|test-results|playwright-report|\.qa-snapshots)\\' -and
    $_.FullName -notmatch '\\(design_handoff|design-references|storybook-static)\\' -and
    $_.FullName -notmatch '\.(test|spec)\.(ts|tsx|js|jsx)$' -and
    (
      $Scope -eq "all" -or
      $_.FullName -match '\\src\\(app|components|pages|views)\\'
    )
}

foreach ($file in $frontFiles) {
  $lines = Get-Content -LiteralPath $file.FullName
  for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    $lineNo = $i + 1
    if ($line -match '\bconsole\.(log|debug|trace)\s*\(') {
      Add-Finding "frontend.production-console" "medium" $file.FullName $lineNo "Production path contains console log/debug/trace; remove or guard behind dev-only logger."
    }
    if ($line -match '\bfetch\s*\(' -and $file.FullName -match '\\src\\(components|app|pages|views)\\') {
      Add-Finding "frontend.raw-fetch-boundary" "low" $file.FullName $lineNo "Raw fetch in UI tree; prefer typed API client with timeout/error normalization."
    }
    if ($line -match '\baxios\.(get|post|put|patch|delete|request)\s*\(' -and $file.FullName -match '\\src\\(components|app|pages|views)\\') {
      Add-Finding "frontend.raw-axios-boundary" "low" $file.FullName $lineNo "Raw axios call in UI tree; prefer typed API client with timeout/error normalization."
    }
    if ($line -match '<button\b') {
      $end = [Math]::Min($i + 8, $lines.Count - 1)
      $block = ($lines[$i..$end] -join " ")
      if (-not (Test-ButtonHasAccessibleName $block)) {
        if (Test-IconOnlyButton $block) {
          Add-Finding "frontend.icon-button-missing-label" "medium" $file.FullName $lineNo "Icon-only button appears to lack accessible name; add aria-label, aria-labelledby, title, or sr-only text."
        } else {
          Add-Finding "frontend.button-accessibility-review" "low" $file.FullName $lineNo "Button may lack accessible text/label; lower-confidence review finding."
        }
      }
    }
  }
}

$findings | ConvertTo-Json -Depth 4

$blockingFindings = if ($normalizedBlockingRules.Count -gt 0) {
  @($findings | Where-Object { $_.rule -in $normalizedBlockingRules })
} else {
  @($findings.ToArray())
}

if ($blockingFindings.Count -gt 0 -and $FailOnFinding) {
  exit 1
}
