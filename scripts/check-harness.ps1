param(
  [ValidateSet("all","backend","frontend","openseabri","agents")]
  [string]$Repo = "all",
  [string]$RootPath = "C:\Users\adelm\SeaBridgeAI",
  [string]$EccPath = "C:\Users\adelm\SeaBridgeAI\everything-claude-code",
  [string]$BaselinePath,
  [switch]$Advisory,
  [switch]$FailOnFinding,
  [switch]$UpdateBaseline
)

$ErrorActionPreference = "Stop"
$root = $RootPath
$ecc = $EccPath
$manifestDir = Join-Path $ecc "manifests\harness"
$reportDir = Join-Path $ecc "docs\reports\harness"
New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
New-Item -ItemType Directory -Force -Path $manifestDir | Out-Null
if ([string]::IsNullOrWhiteSpace($BaselinePath)) {
  $BaselinePath = Join-Path $manifestDir "harness-baseline.json"
}

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$resultPath = Join-Path $reportDir "harness_scan_$stamp.json"
$results = New-Object System.Collections.Generic.List[object]

function Get-RelativePathSafe($Path, $BasePath) {
  try {
    return [System.IO.Path]::GetRelativePath($BasePath, $Path).Replace("\", "/")
  } catch {
    return $Path.Replace("\", "/")
  }
}

function Get-Fingerprint($Finding) {
  $file = if ($Finding.file) { Get-RelativePathSafe $Finding.file $root } else { "" }
  $line = if ($Finding.line) { [string]$Finding.line } else { "0" }
  $message = if ($Finding.message) { ([string]$Finding.message).Trim() } else { "" }
  return "$($Finding.rule)|$file|$line|$message"
}

function Run-Check($Name, $Script, $RepoPath = $null) {
  Write-Host "[harness] $Name"
  if ($RepoPath) {
    $output = & $Script -RepoPath $RepoPath
  } else {
    $output = & $Script
  }
  $jsonText = ($output | Where-Object { $_ -match '^\s*(\[|\{)' }) -join "`n"
  if ([string]::IsNullOrWhiteSpace($jsonText)) {
    $items = @()
  } else {
    $items = $jsonText | ConvertFrom-Json
  }
  return @($items)
}

if ($Repo -in @("all","backend")) {
  $items = Run-Check "backend guardrails" "$ecc\scripts\check-backend-guardrails.ps1" "$root\manageesg-backend"
  foreach ($item in $items) { $results.Add($item) }
}

if ($Repo -in @("all","frontend")) {
  $items = Run-Check "frontend guardrails" "$ecc\scripts\check-frontend-guardrails.ps1" "$root\manageesg-frontend"
  foreach ($item in $items) { $results.Add($item) }
}

if ($Repo -in @("all","openseabri")) {
  $items = Run-Check "openseabri frontend/oss guardrails" "$ecc\scripts\check-frontend-guardrails.ps1" "$root\openseabri"
  foreach ($item in $items) { $results.Add($item) }
}

if ($Repo -in @("all","agents")) {
  $items = Run-Check "agent runtime guardrails" "$ecc\scripts\check-agent-runtime-guardrails.ps1"
  foreach ($item in $items) { $results.Add($item) }
}

$results | ConvertTo-Json -Depth 5 | Set-Content -Path $resultPath -Encoding UTF8

$baseline = @()
if (Test-Path -LiteralPath $BaselinePath) {
  $baselineJson = Get-Content -Raw -LiteralPath $BaselinePath
  if (-not [string]::IsNullOrWhiteSpace($baselineJson)) {
    $baselineDoc = $baselineJson | ConvertFrom-Json
    if ($baselineDoc.findings) { $baseline = @($baselineDoc.findings) }
  }
}

$baselineSet = @{}
foreach ($item in $baseline) {
  if ($item.fingerprint) { $baselineSet[[string]$item.fingerprint] = $true }
}

$annotated = foreach ($item in $results) {
  $fingerprint = Get-Fingerprint $item
  [pscustomobject]@{
    rule = $item.rule
    severity = $item.severity
    file = $item.file
    line = $item.line
    route = $item.route
    message = $item.message
    fingerprint = $fingerprint
    baseline = $baselineSet.ContainsKey($fingerprint)
  }
}
$newFindings = @($annotated | Where-Object { -not $_.baseline })
$newPath = Join-Path $reportDir "harness_scan_new_findings_$stamp.json"
if ($newFindings.Count -gt 0) {
  $newFindings | ConvertTo-Json -Depth 5 | Set-Content -Path $newPath -Encoding UTF8
} else {
  "[]" | Set-Content -Path $newPath -Encoding UTF8
}

if ($UpdateBaseline) {
  $baselineDoc = [pscustomobject]@{
    schema = "seabridge.harness.baseline.v1"
    updated_at = (Get-Date).ToString("o")
    root_path = $root
    report_path = $resultPath
    policy = "Known findings are allowed for full scans; new findings fail when -FailOnFinding is used without -Advisory."
    findings = @($annotated | Sort-Object rule,file,line | ForEach-Object {
      [pscustomobject]@{
        fingerprint = $_.fingerprint
        rule = $_.rule
        severity = $_.severity
        file = (Get-RelativePathSafe $_.file $root)
        line = $_.line
        route = $_.route
        message = $_.message
      }
    })
  }
  $baselineDoc | ConvertTo-Json -Depth 8 | Set-Content -Path $BaselinePath -Encoding UTF8
  Write-Host "[harness] Baseline updated: $BaselinePath"
}

$summary = $results | Group-Object rule | Sort-Object Count -Descending | Select-Object Count,Name
Write-Host "[harness] Report: $resultPath"
Write-Host "[harness] New findings report: $newPath"
Write-Host "[harness] Baseline: $BaselinePath"
if ($summary) {
  $summary | Format-Table -AutoSize | Out-String | Write-Host
} else {
  Write-Host "[harness] No findings."
}

if ($newFindings.Count -gt 0 -and $FailOnFinding -and -not $Advisory) {
  exit 1
}
