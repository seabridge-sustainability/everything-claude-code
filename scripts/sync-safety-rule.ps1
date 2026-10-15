param([string[]]$Roots = @(), [string]$CanonicalFile = "", [switch]$Check)
$ErrorActionPreference = "Stop"
# Compatibility validation only: never stamp, copy or rewrite policy files.
$eccRoot = Split-Path -Parent $PSScriptRoot
$workspaceRoot = Split-Path -Parent $eccRoot
if ([string]::IsNullOrWhiteSpace($CanonicalFile)) {
    $CanonicalFile = Join-Path $workspaceRoot "manageesg-backend\AGENTS_SYSTEM.md"
}
if (-not (Test-Path -LiteralPath $CanonicalFile -PathType Leaf)) { throw "PREFLIGHT FAIL: missing central policy: $CanonicalFile" }
$checker = Join-Path $eccRoot "scripts\check-instruction-stack.js"
if (-not (Test-Path -LiteralPath $checker -PathType Leaf)) { throw "PREFLIGHT FAIL: missing instruction checker: $checker" }
if ($Roots.Count -eq 0) { $Roots = @($eccRoot) }
$validate = @'
const fs = require('fs');
const [checker, entry, canonical] = process.argv.slice(1);
const { expandImports, markerBlock } = require(checker);
const start = '<!-- SEABRIDGE_SAFETY_RULE_START -->', end = '<!-- SEABRIDGE_SAFETY_RULE_END -->';
const expected = markerBlock(fs.readFileSync(canonical, 'utf8').replace(/\r\n/g, '\n'), start, end);
if (!expected) throw Error('PREFLIGHT FAIL: missing central safety markers');
const loaded = expandImports(entry);
if (loaded.missing.length) throw Error('PREFLIGHT FAIL: missing policy import: ' + loaded.missing.join(', '));
const actual = markerBlock(loaded.text, start, end);
if (!actual || actual !== expected) throw Error('PREFLIGHT FAIL: missing or drifted effective safety policy');
if ((loaded.text.match(/<!-- SEABRIDGE_SAFETY_RULE_START -->/g) || []).length !== 1) throw Error('PREFLIGHT FAIL: duplicated effective safety policy');
'@
foreach ($root in $Roots) {
    if (-not (Test-Path -LiteralPath $root -PathType Container)) { throw "PREFLIGHT FAIL: missing root: $root" }
    $entry = Join-Path $root "AGENTS.md"
    if (-not (Test-Path -LiteralPath $entry -PathType Leaf)) { throw "PREFLIGHT FAIL: missing AGENTS.md: $entry" }
    & node -e $validate $checker $entry $CanonicalFile
    if ($LASTEXITCODE -ne 0) { throw "PREFLIGHT FAIL: effective safety validation failed: $entry" }
    Write-Host "Safety policy verified: $entry"
}
Write-Host "Safety policy: central imports verified; no instruction copies written"
