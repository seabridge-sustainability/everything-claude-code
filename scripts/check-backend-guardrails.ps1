param(
  [string]$RepoPath = "C:\Users\adelm\SeaBridgeAI\manageesg-backend",
  [string[]]$Files,
  [string]$PublicRouteAllowlistPath = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\manifests\harness\backend-public-routes.json",
  [string[]]$BlockingRules,
  [switch]$FailOnFinding
)

$ErrorActionPreference = "Stop"
$findings = New-Object System.Collections.Generic.List[object]
$normalizedBlockingRules = @()
if ($BlockingRules -and $BlockingRules.Count -gt 0) {
  $normalizedBlockingRules = @($BlockingRules | ForEach-Object { ([string]$_).Split(",") } | ForEach-Object { $_.Trim() } | Where-Object { $_ })
}

function Add-Finding($Rule, $Severity, $File, $Line, $Message, $Route = $null) {
  $findings.Add([pscustomobject]@{
    rule = $Rule
    severity = $Severity
    file = $File
    line = $Line
    route = $Route
    message = $Message
  })
}

function Get-RelativePathSafe($Path) {
  try {
    return [System.IO.Path]::GetRelativePath($RepoPath, $Path).Replace("\", "/")
  } catch {
    return $Path.Replace("\", "/")
  }
}

function Get-RoutePath($Line) {
  if ($Line -match '@router\.\w+\(\s*["'']([^"'']+)["'']') {
    return $Matches[1]
  }
  return $null
}

function Test-CommentOrDocstringLine($Line) {
  $trimmed = ([string]$Line).TrimStart()
  return ($trimmed.StartsWith("#") -or $trimmed.StartsWith('"""') -or $trimmed.StartsWith("'''"))
}

function Test-CallWindowHasTimeout($Lines, $Index) {
  $end = [Math]::Min($Index + 16, $Lines.Count - 1)
  $window = ($Lines[$Index..$end] -join "`n")
  return ($window -match 'timeout\s*=')
}

$publicRouteAllowlist = @()
if (Test-Path -LiteralPath $PublicRouteAllowlistPath) {
  $allowlistJson = Get-Content -Raw -LiteralPath $PublicRouteAllowlistPath
  if (-not [string]::IsNullOrWhiteSpace($allowlistJson)) {
    $allowlistDoc = $allowlistJson | ConvertFrom-Json
    if ($allowlistDoc.routes) { $publicRouteAllowlist = @($allowlistDoc.routes) }
  }
}

function Test-PublicRouteAllowed($File, $Route) {
  if ([string]::IsNullOrWhiteSpace($Route)) { return $false }
  $relativeFile = Get-RelativePathSafe $File
  foreach ($entry in $publicRouteAllowlist) {
    $filePattern = if ($entry.file) { [string]$entry.file } else { "" }
    $routePattern = if ($entry.route_pattern) { [string]$entry.route_pattern } else { "" }
    if (-not [string]::IsNullOrWhiteSpace($filePattern) -and -not [string]::IsNullOrWhiteSpace($routePattern)) {
      if ($relativeFile -match $filePattern -and $Route -match $routePattern) {
        return $true
      }
    }
  }
  return $false
}

if (-not (Test-Path $RepoPath)) {
  throw "Repo path not found: $RepoPath"
}

$pythonFiles = if ($Files -and $Files.Count -gt 0) {
  $Files | ForEach-Object {
    $candidate = if ([System.IO.Path]::IsPathRooted($_)) { $_ } else { Join-Path $RepoPath $_ }
    if (Test-Path -LiteralPath $candidate) { Get-Item -LiteralPath $candidate }
  } | Where-Object { $_.Extension -eq ".py" }
} else {
  Get-ChildItem -Path $RepoPath -Recurse -Include *.py -File -ErrorAction SilentlyContinue
}

$pythonFiles = $pythonFiles | Where-Object {
    ($_.FullName -notmatch '\\(\.venv|venv|venv312|site-packages|node_modules|__pycache__|\.ruff_cache|\.mypy_cache)\\') -and
    ($_.FullName -notmatch '\\(\.uv-cache|\.venv-win|build|dist|mindsdb)\\') -and
    ($_.FullName -notmatch '\\(\.agents|\.claude|\.openhands)\\') -and
    ($_.FullName -notmatch '\\data\\skills\\') -and
    ($_.FullName -notmatch '\\tests?\\')
}

foreach ($file in $pythonFiles) {
  $lines = Get-Content -LiteralPath $file.FullName
  $fileText = $lines -join "`n"
  $hasRouterLevelAuth = $fileText -match 'APIRouter\s*\([\s\S]{0,500}dependencies\s*=\s*\[[\s\S]{0,300}Depends\s*\('
  for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    $lineNo = $i + 1
    if (-not (Test-CommentOrDocstringLine $line) -and $line -match '\brequests\.(get|post|put|patch|delete|request)\s*\(' -and -not (Test-CallWindowHasTimeout $lines $i)) {
      Add-Finding "backend.external-call-timeout" "medium" $file.FullName $lineNo "requests call without timeout on same line; verify explicit timeout/cancellation boundary."
    }
    if (-not (Test-CommentOrDocstringLine $line) -and $line -match '\bhttpx\.(get|post|put|patch|delete|request)\s*\(' -and -not (Test-CallWindowHasTimeout $lines $i)) {
      Add-Finding "backend.external-call-timeout" "medium" $file.FullName $lineNo "httpx call without timeout on same line; verify client timeout or call timeout."
    }
    if (-not (Test-CommentOrDocstringLine $line) -and $line -match '\bsubprocess\.(run|Popen|call|check_call|check_output)\s*\(' -and -not (Test-CallWindowHasTimeout $lines $i)) {
      Add-Finding "backend.subprocess-timeout" "low" $file.FullName $lineNo "subprocess call without timeout on same line; verify bounded execution."
    }
    if ($line -match 'while\s+True\s*:' -and ($file.FullName -match '(worker|job|retry|loop|agent|provider|sync|poll)')) {
      Add-Finding "backend.retry-bounds" "medium" $file.FullName $lineNo "Potential long-running loop; verify bounded retry/exit/cancellation behavior."
    }
    if ($line -match '^\s*@router\.(get|post|put|patch|delete)\s*\(') {
      $window = ($lines[$i..([Math]::Min($i + 25, $lines.Count - 1))] -join "`n")
      $routePath = Get-RoutePath $line
      $isPublicByName = $file.FullName -match '\\(auth|health|public|webhook|webhooks|docs|status)\.py$'
      $isPublicRoute = $window -match '(public|health|openapi|docs|login|register|webhook|status|readiness|liveness)'
      $isAllowlistedPublicRoute = Test-PublicRouteAllowed $file.FullName $routePath
      if (-not $hasRouterLevelAuth -and -not $isPublicByName -and $window -notmatch 'Depends\s*\(' -and -not $isPublicRoute -and -not $isAllowlistedPublicRoute) {
        Add-Finding "backend.route-auth-boundary" "low" $file.FullName $lineNo "Route decorator near handler without visible Depends auth or router-level dependency; verify public exemption or auth dependency." $routePath
      }
    }
  }
}

$secretPatterns = '(sk-[A-Za-z0-9]{20,}|hf_[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|AKIA[0-9A-Z]{16}|BEGIN (RSA|OPENSSH|PRIVATE) KEY)'
foreach ($file in $pythonFiles) {
  $matches = Select-String -LiteralPath $file.FullName -Pattern $secretPatterns -AllMatches -ErrorAction SilentlyContinue
  foreach ($match in $matches) {
    Add-Finding "security.secret-pattern" "high" $file.FullName $match.LineNumber "Potential secret pattern in source; inspect without printing value."
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
