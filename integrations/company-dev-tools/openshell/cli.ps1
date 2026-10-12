param([Parameter(ValueFromRemainingArguments=$true)][string[]]$CommandArgs)
$ErrorActionPreference = 'Stop'
# No global PATH/config changes. Each invocation selects the isolated runtime.
& wsl.exe -d Ubuntu --exec sh -c 'export XDG_CONFIG_HOME="$HOME/.local/share/ecc-dev-suite/openshell/config"; export XDG_STATE_HOME="$HOME/.local/share/ecc-dev-suite/openshell/state"; export OPENSHELL_TELEMETRY_ENABLED=false; exec "$HOME/.local/share/ecc-dev-suite/openshell/bin/openshell" "$@"' sh @CommandArgs
exit $LASTEXITCODE
