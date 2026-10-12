#!/usr/bin/env python3
"""Run one synthetic policy fixture; preserve sandbox state for inspection."""
import argparse, json, os, pathlib, subprocess, time
ROOT = pathlib.Path.home() / '.local/share/ecc-dev-suite/openshell'
SOURCE = pathlib.Path('/mnt/c/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/company-dev-tools/openshell')
BIN = str(ROOT / 'bin/openshell')
parser = argparse.ArgumentParser()
parser.add_argument('--name', default='ecc-policy-20261011')
NAME = parser.parse_args().name
if len(NAME) > 19 or not all(ch.isalnum() or ch == '-' for ch in NAME):
    raise SystemExit('Fixture name must contain letters/digits/hyphens and be at most19 characters')
ENV = {**os.environ, 'XDG_CONFIG_HOME': str(ROOT / 'config'), 'XDG_STATE_HOME': str(ROOT / 'state'), 'OPENSHELL_TELEMETRY_ENABLED': 'false'}
BASE = [BIN, '--gateway-endpoint', 'http://127.0.0.1:17770', '--color', 'never']
results = []
def run(label, args, timeout=45):
    started = time.monotonic()
    try:
        proc = subprocess.run(BASE + args, capture_output=True, text=True, env=ENV, timeout=timeout)
        result = {'label': label, 'exit_code': proc.returncode, 'stdout': proc.stdout[:12000], 'stderr': proc.stderr[:12000]}
    except subprocess.TimeoutExpired:
        result = {'label': label, 'exit_code': None, 'error': 'bounded deadline exceeded'}
    result['seconds'] = round(time.monotonic() - started, 3)
    results.append(result)
    print(json.dumps(result), flush=True)
    (SOURCE / 'runtime-verification.json').write_text(json.dumps({'fixture': NAME, 'results': results}, indent=2) + '\n')
    return result
if run('gateway_status', ['status'])['exit_code'] != 0:
    raise SystemExit('Gateway unavailable; no sandbox started')
created = run('create_strict_sandbox', ['sandbox', 'create', '--name', NAME, '--from', 'ecc-openshell-fixture:0.1.3', '--policy', str(SOURCE / 'policy-smoke.yaml'), '--no-auto-providers', '--approval-mode', 'manual', '--cpu', '500m', '--memory', '256Mi', '--no-tty', '--detach', '--', 'sleep', 'infinity'], 120)
if created['exit_code'] != 0:
    raise SystemExit('Strict sandbox failed; policy unchanged')
docker = '/mnt/c/Program Files/Docker/Docker/resources/bin/docker.exe'
names = subprocess.check_output([docker, 'ps', '--format', '{{.Names}}'], text=True).splitlines()
supervisors = [name for name in names if '--' + NAME + '-' in name and name.endswith('-supervisor')]
if len(supervisors) != 1:
    raise SystemExit('Cannot uniquely identify task-owned supervisor for resource cap')
subprocess.run([docker, 'update', '--memory', '256m', '--memory-swap', '256m', '--cpus', '0.5', supervisors[0]], check=True, capture_output=True)
def execute(label, cmd):
    return run(label, ['sandbox', 'exec', NAME, '--no-tty', '--no-login-shell', '--timeout', '20', '--', *cmd])
execute('reference_read_allowed', ['cat', '/sandbox/references/allowed.txt'])
execute('private_read_denied', ['cat', '/sandbox/private/denied.txt'])
execute('reference_write_denied', ['sh', '-c', 'echo WRONG > /sandbox/references/allowed.txt'])
execute('output_write_allowed', ['sh', '-c', 'echo OUTPUT_ALLOWED > /sandbox/output/result.txt && cat /sandbox/output/result.txt'])
execute('github_get_allowed', ['/usr/bin/curl', '--silent', '--show-error', '--fail', '--max-time', '10', 'https://api.github.com/zen'])
execute('unlisted_network_denied', ['/usr/bin/curl', '--silent', '--show-error', '--fail', '--max-time', '10', 'https://example.com'])
execute('github_post_denied', ['/usr/bin/curl', '--silent', '--show-error', '--fail', '--max-time', '10', '-X', 'POST', 'https://api.github.com/zen'])
run('policy_decision_logs', ['logs', NAME, '--since', '5m', '--source', 'sandbox', '-n', '200'])
expected = {'reference_read_allowed': 0, 'private_read_denied': 1, 'reference_write_denied': 2, 'output_write_allowed': 0, 'github_get_allowed': 0}
indexed = {r['label']: r for r in results}
passed = all(indexed[k]['exit_code'] == v for k, v in expected.items()) and all(indexed[k]['exit_code'] not in (0, None) for k in ['unlisted_network_denied', 'github_post_denied'])
receipt = {'version': '0.1.3', 'fixture': NAME, 'strict_landlock': True, 'providers': [], 'project_host_mounts': [], 'passed': passed, 'results': results}
(SOURCE / 'runtime-verification.json').write_text(json.dumps(receipt, indent=2) + '\n')
print(json.dumps({'passed': passed, 'receipt': str(SOURCE / 'runtime-verification.json')}))
raise SystemExit(0 if passed else 1)
