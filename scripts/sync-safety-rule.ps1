param([string[]]$Roots = @(), [string]$CanonicalFile = "", [switch]$Check)
$ErrorActionPreference = "Stop"
# Compatibility entrypoint: no recursive policy stamping or new instruction files.
if ([string]::IsNullOrWhiteSpace($CanonicalFile)) {
 $CanonicalFile = Join-Path (Split-Path -Parent (Split-Path -Parent $PSScriptRoot)) "manageesg-backend\AGENTS_SYSTEM.md"
}
if (-not (Test-Path -LiteralPath $CanonicalFile -PathType Leaf)) { throw "Missing central policy: $CanonicalFile" }
$text = [System.IO.File]::ReadAllText($CanonicalFile)
if ($text -notmatch '(?s)<!-- SEABRIDGE_SAFETY_RULE_START -->.*<!-- SEABRIDGE_SAFETY_RULE_END -->') { throw "Missing central safety policy" }
Write-Host "Safety policy: central source verified; no instruction copies written"
