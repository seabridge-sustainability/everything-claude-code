#!/usr/bin/env python3
"""Task-local Unix socket to Docker Desktop's stdio transport. No TCP listener."""
import os, pathlib, signal, socket, subprocess, threading
ROOT = pathlib.Path.home() / '.local/share/ecc-dev-suite/openshell'
PATH = ROOT / 'docker.sock'
DOCKER = '/mnt/c/Program Files/Docker/Docker/resources/bin/docker.exe'
os.umask(0o077)
ROOT.mkdir(parents=True, exist_ok=True)
if PATH.exists():
    raise SystemExit('Socket already exists; verify its owner before replacing it.')
server = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
server.bind(str(PATH))
PATH.chmod(0o600)
server.listen(8)
def relay(conn):
    process = subprocess.Popen([DOCKER, 'system', 'dial-stdio'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    def upstream():
        try:
            while chunk := conn.recv(65536):
                process.stdin.write(chunk)
                process.stdin.flush()
        except (OSError, BrokenPipeError):
            pass
        finally:
            process.stdin.close()
    threading.Thread(target=upstream, daemon=True).start()
    try:
        while chunk := os.read(process.stdout.fileno(), 65536):
            conn.sendall(chunk)
    except OSError:
        pass
    finally:
        conn.close()
        process.terminate()
        process.wait(timeout=10)
def stop(*_):
    server.close()
    if PATH.is_socket():
        PATH.unlink()
    raise SystemExit(0)
signal.signal(signal.SIGTERM, stop)
signal.signal(signal.SIGINT, stop)
try:
    while True:
        conn, _ = server.accept()
        threading.Thread(target=relay, args=(conn,), daemon=True).start()
finally:
    stop()
