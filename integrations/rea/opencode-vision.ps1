# Launch a REA session with image metadata and its MCP tools, preserving the
# caller's existing configuration, provider whitelist and persistent model picker.
$ErrorActionPreference = 'Stop'
$reaOriginalContent = $env:OPENCODE_CONFIG_CONTENT
try {
    $reaMergedContent = & node (Join-Path $PSScriptRoot 'opencode-config.mjs')
    if ($LASTEXITCODE -ne 0) { throw 'Cannot configure the REA vision session' }
    $env:OPENCODE_CONFIG_CONTENT = $reaMergedContent
    & opencode @args
    $reaExitCode = $LASTEXITCODE
} finally {
    $env:OPENCODE_CONFIG_CONTENT = $reaOriginalContent
}
exit $reaExitCode
