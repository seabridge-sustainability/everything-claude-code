"""Gmail-only Desktop OAuth producing Hermes's native authorized_user token."""

from __future__ import annotations

import argparse
from contextlib import contextmanager
import hashlib
import hmac
import json
import os
from pathlib import Path
import sqlite3
import subprocess
import tempfile
import time
from urllib.parse import parse_qs, urlsplit
from urllib.request import Request, urlopen

SCOPES = tuple(f"https://www.googleapis.com/auth/gmail.{name}" for name in ("readonly", "send", "modify"))
REDIRECT = "http://localhost:1"
STORAGE = ".google-email-oauth"
PENDING = "pending.sqlite3"
URL_FILE = "google_email_authorization_url.txt"
LIFETIME = 600


class OAuthError(Exception):
    """Safe, credential-free diagnostics only."""


def windows_acl(file):
    """Verify native mode-0700 privacy, including Windows owner-rights ACEs."""
    if os.name != "nt":
        require(file.stat().st_mode & 0o077 == 0, "Private path permissions required")
        return
    command = r"""$ErrorActionPreference='Stop'
$p=$env:ECC_GOOGLE_PRIVATE_PATH
$me=[System.Security.Principal.WindowsIdentity]::GetCurrent().User
$allowed=@($me.Value,'S-1-3-4','S-1-5-18','S-1-5-32-544')
$acl=Get-Acl -LiteralPath $p
$bad=@($acl.GetAccessRules($true,$true,[System.Security.Principal.SecurityIdentifier]) | Where-Object {
  $_.AccessControlType -eq 'Allow' -and $allowed -notcontains $_.IdentityReference.Value
})
if($bad.Count -ne 0 -or $acl.GetOwner([System.Security.Principal.SecurityIdentifier]).Value -ne $me.Value){exit 1}
"""
    executable = Path(os.environ["SystemRoot"]) / "System32/WindowsPowerShell/v1.0/powershell.exe"
    result = subprocess.run([str(executable), "-NoProfile", "-NonInteractive", "-Command", command],
        env={**os.environ, "ECC_GOOGLE_PRIVATE_PATH": str(file)},
        capture_output=True, timeout=15, creationflags=subprocess.CREATE_NO_WINDOW)
    require(result.returncode == 0, "Private Windows ACL could not be established or verified")


def require(condition, message):
    if not condition:
        raise OAuthError(message)


def read_json(file):
    file = Path(file)
    require(not file.is_symlink() and file.is_file() and file.stat().st_size <= 131072, "Invalid private input file")
    try:
        value = json.loads(file.read_text(encoding="utf-8"))
    except (ValueError, OSError):
        raise OAuthError("Private input is not readable JSON") from None
    require(isinstance(value, dict), "Private input must be a JSON object")
    return value


def write_private(file, value, *, directory=None):
    """Atomic publication; create-only token writes never replace another flow."""
    file = Path(file)
    fd, temporary = tempfile.mkstemp(prefix=".google-email-", dir=directory or file.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            windows_acl(Path(temporary))  # Empty until inherited privacy is verified.
            stream.write(value)
            stream.flush()
            os.fsync(stream.fileno())
        os.link(temporary, file)  # Atomic failure if a token/flow already exists.
        windows_acl(file)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def home_directory(home):
    home = Path(home)
    require(home.is_absolute() and home.is_dir() and not home.is_symlink(), "Existing absolute Hermes profile directory required")
    return home


@contextmanager
def pending_transaction(home):
    storage = home / STORAGE
    try:
        storage.mkdir(mode=0o700)
    except FileExistsError:
        require(storage.is_dir() and not storage.is_symlink(), "Private state directory required")
    windows_acl(storage)
    file = storage / PENDING
    require(not file.is_symlink(), "Linked OAuth database refused")
    try:
        fd = os.open(file, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
        os.close(fd)
    except FileExistsError:
        pass
    windows_acl(file)
    connection = sqlite3.connect(file, timeout=1)
    try:
        # EXTRA synchronizes rollback-journal deletion as well as the commit.
        # SQLite owns process concurrency and crash recovery on both platforms.
        connection.execute("PRAGMA journal_mode=DELETE")
        connection.execute("PRAGMA synchronous=EXTRA")
        connection.execute("CREATE TABLE IF NOT EXISTS pending (id INTEGER PRIMARY KEY CHECK(id=1), payload TEXT NOT NULL)")
        connection.commit()
        connection.execute("BEGIN IMMEDIATE")
        yield connection, storage
        connection.commit()
    except BaseException:
        connection.rollback()
        raise
    finally:
        connection.close()


def load_client(file, project):
    file = Path(file)
    require(file.is_absolute(), "Absolute private Desktop client path required")
    config = read_json(file)
    client = config.get("installed")
    require(isinstance(client, dict) and "web" not in config, "Google Desktop app client required")
    require(client.get("project_id") == project, "Desktop client belongs to a different project")
    require(client.get("auth_uri") in ("https://accounts.google.com/o/oauth2/auth", "https://accounts.google.com/o/oauth2/v2/auth")
            and client.get("token_uri") == "https://oauth2.googleapis.com/token", "Official Google OAuth endpoints required")
    require(isinstance(client.get("client_id"), str) and client["client_id"].endswith(".apps.googleusercontent.com")
            and isinstance(client.get("client_secret"), str) and client["client_secret"], "Desktop client is incomplete")
    return config, hashlib.sha256(file.read_bytes()).hexdigest()


def new_flow(config, **kwargs):
    try:
        from google_auth_oauthlib.flow import Flow
    except ImportError:
        raise OAuthError("Google OAuth dependency missing in selected Hermes environment; no installation attempted") from None
    return Flow.from_client_config(config, scopes=list(SCOPES), redirect_uri=REDIRECT, **kwargs)


def check_pending(pending):
    require(pending.get("version") == 1 and pending.get("requested_scopes") == list(SCOPES), "Pending scope contract changed")
    require(pending.get("redirect_uri") == REDIRECT, "Pending redirect changed")
    require(isinstance(pending.get("created_at"), (int, float))
            and 0 <= time.time() - pending["created_at"] < LIFETIME, "OAuth flow expired or clock changed")
    require(all(isinstance(pending.get(key), str) and pending[key] for key in
                ("state", "code_verifier", "client_file", "client_sha256", "project", "account")), "Pending identity incomplete")
    require(pending.get("exchange_started") is False, "Prior exchange is uncertain; reconcile with owner, do not replay")


def authorize(home, client_file, project, account):
    home = home_directory(home)
    require(not (home / "google_token.json").exists(), "Native Google token already exists; no replacement attempted")
    require(isinstance(account, str) and account.count("@") == 1 and not any(c.isspace() for c in account), "Explicit Gmail account required")
    config, digest = load_client(client_file, project)
    with pending_transaction(home) as (connection, storage):
        row = connection.execute("SELECT payload FROM pending WHERE id=1").fetchone()
        url_file = storage / URL_FILE
        if row:
            pending = json.loads(row[0])
            check_pending(pending)
            require(pending["client_sha256"] == digest and pending["account"] == account and pending["project"] == project,
                    "Another authorization flow owns this profile")
            if not url_file.exists():
                write_private(url_file, pending["authorization_url"] + "\n")
            windows_acl(url_file)
            require(url_file.read_text(encoding="utf-8") == pending["authorization_url"] + "\n", "Pending authorization URL changed")
            return {"authorization_url_file": str(url_file), "reused_pending": True}
        require(not url_file.exists(), "Prior authorization URL exists; reconcile with owner")
        flow = new_flow(config, autogenerate_code_verifier=True)
        url, state = flow.authorization_url(access_type="offline", prompt="consent select_account",
                                            include_granted_scopes="false", login_hint=account)
        pending = {"version": 1, "requested_scopes": list(SCOPES), "redirect_uri": REDIRECT,
                   "state": state, "code_verifier": flow.code_verifier, "client_file": str(Path(client_file)),
                   "client_sha256": digest, "project": project, "account": account,
                   "created_at": time.time(), "exchange_started": False, "authorization_url": url}
        check_pending(pending)
        connection.execute("INSERT INTO pending VALUES (1, ?)", (json.dumps(pending),))
    # Publish the URL only after the durable pending identity is committed.
    write_private(url_file, url + "\n")
    return {"authorization_url_file": str(url_file), "reused_pending": False}


def callback_values(callback, pending):
    parsed = urlsplit(callback.strip())
    require(parsed.scheme == "http" and parsed.netloc == "localhost:1" and parsed.path in ("", "/")
            and not parsed.fragment, "Complete expected localhost callback URL required")
    values = parse_qs(parsed.query)
    require("error" not in values and len(values.get("code", [])) == 1
            and len(values.get("state", [])) == 1, "Callback must contain one code and one state")
    require(values["state"][0].isascii() and pending["state"].isascii()
            and hmac.compare_digest(values["state"][0], pending["state"]), "OAuth state mismatch")
    if "scope" in values:
        require(len(values["scope"]) == 1 and set(values["scope"][0].split()) <= set(SCOPES), "Callback widened requested Gmail scopes")
    return values["code"][0]


def gmail_account(access_token):
    request = Request("https://gmail.googleapis.com/gmail/v1/users/me/profile",
                      headers={"Authorization": "Bearer " + access_token})
    with urlopen(request, timeout=15) as response:
        payload = json.loads(response.read(65537))
    return payload.get("emailAddress")


def exchange(home, callback_file):
    home = home_directory(home)
    require(not (home / "google_token.json").exists(), "Native Google token already exists; no replacement attempted")
    with pending_transaction(home) as (connection, storage):
        row = connection.execute("SELECT payload FROM pending WHERE id=1").fetchone()
        require(row is not None, "No pending Gmail authorization")
        pending = json.loads(row[0])
        check_pending(pending)
        config, digest = load_client(pending["client_file"], pending["project"])
        require(digest == pending["client_sha256"], "Desktop client changed since authorization")
        callback_file = Path(callback_file)
        require(callback_file.is_absolute() and not callback_file.is_symlink()
                and callback_file.is_file() and callback_file.stat().st_size <= 16384, "Private bounded callback file required")
        code = callback_values(callback_file.read_text(encoding="utf-8"), pending)
        flow = new_flow(config, state=pending["state"], code_verifier=pending["code_verifier"])
        # Commit durable intent before the one-use operation; never retry its code.
        pending["exchange_started"] = True
        connection.execute("UPDATE pending SET payload=? WHERE id=1", (json.dumps(pending),))
    try:
        response = flow.fetch_token(code=code, timeout=20)
        raw = response.get("scope")
        granted = raw.split() if isinstance(raw, str) else raw
        require(isinstance(granted, list) and granted and all(isinstance(s, str) for s in granted)
                and set(granted) == set(SCOPES), "Authoritative Gmail grants missing, incomplete or widened")
        require(isinstance(response.get("access_token"), str) and response["access_token"], "Access token missing")
        actual = gmail_account(response["access_token"])
        require(isinstance(actual, str) and actual.casefold() == pending["account"].casefold(), "Authorized Gmail account does not match requested account")
        token = json.loads(flow.credentials.to_json())
        require(token.get("refresh_token") and token.get("client_id") and token.get("client_secret"), "Durable Desktop token incomplete")
        token.update(type="authorized_user", scopes=granted)
        write_private(home / "google_token.json", json.dumps(token, indent=2) + "\n", directory=storage)
    except OAuthError:
        raise
    except Exception:
        raise OAuthError("Token exchange or account verification failed; outcome uncertain, no automatic retry") from None
    # Retain consumed intent for restart audit. Native readers use only google_token.json.
    return {"connected": True, "account_verified": True, "scope": "gmail-only", "native_token_saved": True}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)
    auth = subparsers.add_parser("authorize")
    auth.add_argument("--home", required=True)
    auth.add_argument("--client-secret", required=True)
    auth.add_argument("--project", required=True)
    auth.add_argument("--account", required=True)
    consume = subparsers.add_parser("exchange")
    consume.add_argument("--home", required=True)
    consume.add_argument("--callback-file", required=True)
    args = parser.parse_args(argv)
    try:
        result = authorize(args.home, args.client_secret, args.project, args.account) if args.command == "authorize" else exchange(args.home, args.callback_file)
    except OAuthError as error:
        result = {"connected": False, "error": str(error)}
        print(json.dumps(result))
        return 1
    except (OSError, ValueError, sqlite3.Error, subprocess.SubprocessError):
        # Never expose provider exceptions, callback contents or credential values.
        result = {"connected": False, "error": "OAuth setup refused; check profile, Desktop client, pending state, grants and account; never replay an uncertain exchange"}
        print(json.dumps(result))
        return 1
    print(json.dumps(result))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
