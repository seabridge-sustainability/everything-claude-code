#!/usr/bin/env python3
"""Install verified release binaries in a task-owned WSL directory; no services."""
import hashlib, io, json, pathlib, tarfile, urllib.request
ROOT = pathlib.Path.home() / '.local/share/ecc-dev-suite/openshell'
VERSION = '0.1.3'
SOURCE_SHA = 'e1f3c82caa3ed3b65de22889ae7ef32a774878ef'
BASE = f'https://github.com/NVIDIA/OpenShell/releases/download/v{VERSION}/'
ROOT.mkdir(parents=True, exist_ok=True)
(ROOT / 'bin').mkdir(exist_ok=True)
(ROOT / 'downloads').mkdir(exist_ok=True)
receipts = []
for component, target in [('openshell', 'x86_64-unknown-linux-musl'), ('openshell-gateway', 'x86_64-unknown-linux-gnu')]:
    archive = f'{component}-{target}.tar.gz'
    checksums = urllib.request.urlopen(BASE + component + '-checksums-sha256.txt').read().decode()
    expected = next(line.split()[0] for line in checksums.splitlines() if line.split()[-1].lstrip('*') == archive)
    dest = ROOT / 'downloads' / archive
    data = dest.read_bytes() if dest.exists() else urllib.request.urlopen(BASE + archive).read()
    actual = hashlib.sha256(data).hexdigest()
    if actual != expected:
        raise ValueError('Release checksum mismatch: ' + archive)
    dest.write_bytes(data)
    with tarfile.open(fileobj=io.BytesIO(data), mode='r:gz') as tf:
        member = next(m for m in tf.getmembers() if pathlib.PurePosixPath(m.name).name == component and m.isfile())
        binary = ROOT / 'bin' / component
        binary.write_bytes(tf.extractfile(member).read())
        binary.chmod(0o755)
    receipts.append({'asset': archive, 'sha256': actual, 'binary': str(binary)})
receipt = {'version': VERSION, 'source_sha': SOURCE_SHA, 'release': BASE, 'runtime_root': str(ROOT), 'assets': receipts, 'gateway_started': False}
(ROOT / 'installation.json').write_text(json.dumps(receipt, indent=2) + '\n')
print(json.dumps(receipt, indent=2))
