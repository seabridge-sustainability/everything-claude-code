#!/usr/bin/env bash
set -euo pipefail
# Called explicitly from Windows with the integration directory mapped into WSL.
# All Linux prerequisites are isolated; no apt packages or system defaults change.
integration="$1"
tools="$HOME/.local/share/ecc-rea"
mkdir -p "$tools/downloads"
fetch_verified() {
  local url="$1" file="$2" sha="$3"
  if [ ! -f "$file" ]; then curl -fL --retry 2 --silent --show-error -o "$file" "$url"; fi
  printf '%s  %s\n' "$sha" "$file" | sha256sum --check --status
}
fetch_verified 'https://nodejs.org/dist/v24.12.0/node-v24.12.0-linux-x64.tar.xz' "$tools/downloads/node-v24.12.0-linux-x64.tar.xz" 'bdebee276e58d0ef5448f3d5ac12c67daa963dd5e0a9bb621a53d1cefbc852fd'
fetch_verified 'https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.12.1%2B1/OpenJDK21U-jdk_x64_linux_hotspot_21.0.12.1_1.tar.gz' "$tools/downloads/jdk-21.tar.gz" 'ce79869e1307ed8ee1e2baa86a412b1eb5b75d10a01006d788a6f968bcfaee94'
if [ ! -d "$tools/node-v24.12.0-linux-x64" ]; then tar -xJf "$tools/downloads/node-v24.12.0-linux-x64.tar.xz" -C "$tools"; fi
if [ ! -d "$tools/jdk-21.0.12.1+1" ]; then tar -xzf "$tools/downloads/jdk-21.tar.gz" -C "$tools"; fi
archive="$integration/state/tools/downloads/ghidra_12.1.4_PUBLIC_20260921.zip"
printf '%s  %s\n' 'ddac49f903da9d5bac833e5cc79395098b9c33cfd3279be5f31bd00387d2d4db' "$archive" | sha256sum --check --status
if [ ! -d "$tools/ghidra_12.1.4_PUBLIC" ]; then
  python3 - "$archive" "$tools" <<'PY'
import sys, zipfile, pathlib
with zipfile.ZipFile(sys.argv[1]) as archive:
    root = pathlib.Path(sys.argv[2]).resolve()
    for info in archive.infolist():
        target = (root / info.filename).resolve()
        if root not in target.parents:
            raise RuntimeError('Ghidra archive path escapes tools directory')
        archive.extract(info, root)
        if not info.is_dir():
            mode = (info.external_attr >> 16) & 0o777
            if mode:
                target.chmod(mode)
PY
fi
export JAVA_HOME="$tools/jdk-21.0.12.1+1"
export GHIDRA_INSTALL_DIR="$tools/ghidra_12.1.4_PUBLIC"
export REA_ANALYSIS_PROVIDER=ghidra
export PATH="$tools/node-v24.12.0-linux-x64/bin:$JAVA_HOME/bin:$PATH"
node "$integration/vendor/rea/scripts/rea.mjs" doctor --provider ghidra --format json > "$integration/state/wsl-native-doctor.json"
node - "$tools" <<'JS'
const fs = require('node:fs');
const root = process.argv[2];
fs.writeFileSync(root + '/runtime.json', JSON.stringify({ node: root + '/node-v24.12.0-linux-x64/bin/node', javaHome: root + '/jdk-21.0.12.1+1', ghidraInstallDir: root + '/ghidra_12.1.4_PUBLIC' }, null, 2));
console.log('Isolated WSL Ghidra/JDK/Node prerequisites verified');
JS
