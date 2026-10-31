"""Offline trust-boundary checks; no Google requests, credentials or installs."""

import contextlib
import importlib.util
import io
import json
import os
import sqlite3
import subprocess
import sys
import tempfile
import time
import unittest
from pathlib import Path
from unittest.mock import Mock, patch
from urllib.parse import urlencode

SOURCE = Path(__file__).resolve().parents[2] / "skills/hermes-google-email/scripts/oauth.py"
spec = importlib.util.spec_from_file_location("hermes_email_oauth", SOURCE)
oauth = importlib.util.module_from_spec(spec)
spec.loader.exec_module(oauth)


class GmailOAuthTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.home = self.root / "profile"
        self.home.mkdir()
        self.client_file = self.root / "desktop.json"
        self.client = {"installed": {"project_id": "fixture-project",
            "client_id": "fixture.apps.googleusercontent.com", "client_secret": "not-a-credential",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token"}}
        self.client_file.write_text(json.dumps(self.client), encoding="utf-8")
        self.account = "operator@example.com"
        self.callback_file = self.root / "callback.txt"
        self.flow = Mock()
        self.flow.code_verifier = "fixture-verifier"
        self.flow.authorization_url.return_value = ("https://accounts.google.com/o/oauth2/auth?fixture=1", "fixture-state")
        self.flow.fetch_token.return_value = {"scope": " ".join(oauth.SCOPES), "access_token": "fixture-access"}
        self.flow.credentials.to_json.return_value = json.dumps({"token": "fixture-access", "refresh_token": "fixture-refresh",
            "client_id": self.client["installed"]["client_id"], "client_secret": "not-a-credential",
            "token_uri": "https://oauth2.googleapis.com/token", "scopes": ["must-be-replaced-by-confirmed-grants"]})

    def authorize(self):
        with patch.object(oauth, "new_flow", return_value=self.flow):
            return oauth.authorize(self.home, self.client_file, "fixture-project", self.account)

    def callback(self, **changes):
        values = {"code": "fixture-code", "state": "fixture-state", "scope": " ".join(oauth.SCOPES)}
        values.update(changes)
        self.callback_file.write_text(oauth.REDIRECT + "/?" + urlencode(values), encoding="utf-8")

    def exchange(self):
        with patch.object(oauth, "new_flow", return_value=self.flow), patch.object(oauth, "gmail_account", return_value=self.account):
            return oauth.exchange(self.home, self.callback_file)

    def pending(self, replacement=None):
        with contextlib.closing(sqlite3.connect(self.home / oauth.STORAGE / oauth.PENDING)) as connection:
            if replacement is not None:
                connection.execute("UPDATE pending SET payload=? WHERE id=1", (json.dumps(replacement),))
                connection.commit()
            return json.loads(connection.execute("SELECT payload FROM pending WHERE id=1").fetchone()[0])

    def test_authorization_is_gmail_only_and_reuses_pending_without_new_flow(self):
        result = self.authorize()
        self.assertFalse(result["reused_pending"])
        self.assertNotIn("fixture-state", json.dumps(result))
        pending = self.pending()
        self.assertEqual(pending["requested_scopes"], list(oauth.SCOPES))
        self.assertTrue(all("/auth/gmail." in scope for scope in pending["requested_scopes"]))
        self.assertEqual(self.flow.authorization_url.call_args.kwargs["include_granted_scopes"], "false")
        with patch.object(oauth, "new_flow", side_effect=AssertionError("must not create another flow")):
            self.assertTrue(oauth.authorize(self.home, self.client_file, "fixture-project", self.account)["reused_pending"])

    def test_wrong_client_type_project_and_non_google_endpoint_are_rejected(self):
        for config in [{"web": self.client["installed"]},
                       {"installed": {**self.client["installed"], "project_id": "wrong-project"}},
                       {"installed": {**self.client["installed"], "token_uri": "https://example.com/token"}}]:
            self.client_file.write_text(json.dumps(config), encoding="utf-8")
            with self.assertRaises(oauth.OAuthError):
                self.authorize()
        self.flow.authorization_url.assert_not_called()
        self.assertFalse((self.home / oauth.STORAGE / oauth.PENDING).exists())

    def test_callback_requires_exact_redirect_matching_state_and_no_wider_scope(self):
        self.authorize()
        pending = self.pending()
        for callback in ["fixture-code", "http://evil.example/?code=x&state=fixture-state",
                         "http://localhost:1/?code=x", "http://localhost:1/?code=x&state=wrong",
                         "http://localhost:1/?code=x&state=fixture-state&state=fixture-state",
                         "http://localhost:1/?code=x&state=fixture-state&scope=https://www.googleapis.com/auth/drive"]:
            with self.assertRaises(oauth.OAuthError):
                oauth.callback_values(callback, pending)
        self.flow.fetch_token.assert_not_called()

    def test_pending_expiry_scope_and_account_changes_cannot_launch_exchange(self):
        self.authorize()
        original = self.pending()
        for delta in [{"created_at": time.time() - oauth.LIFETIME - 1},
                      {"requested_scopes": [*oauth.SCOPES, "https://www.googleapis.com/auth/calendar"]},
                      {"exchange_started": True}]:
            self.pending({**original, **delta})
            self.callback()
            with self.assertRaises(oauth.OAuthError):
                self.exchange()
        self.flow.fetch_token.assert_not_called()
        self.pending(original)
        with self.assertRaises(oauth.OAuthError):
            oauth.authorize(self.home, self.client_file, "fixture-project", "other@example.com")

    def test_actual_token_grants_must_be_present_complete_and_narrow(self):
        self.authorize()
        original = self.pending()
        self.callback()
        for grant in [None, "", " ".join(oauth.SCOPES[:1]), " ".join([*oauth.SCOPES, "https://www.googleapis.com/auth/drive"])]:
            self.pending(original)
            self.flow.fetch_token.return_value = {"scope": grant, "access_token": "fixture-access"}
            with self.assertRaises(oauth.OAuthError):
                self.exchange()
            self.assertFalse((self.home / "google_token.json").exists())

    def test_wrong_actual_gmail_account_never_saves_token(self):
        self.authorize()
        self.callback()
        with patch.object(oauth, "new_flow", return_value=self.flow), patch.object(oauth, "gmail_account", return_value="wrong@example.com"):
            with self.assertRaisesRegex(oauth.OAuthError, "does not match"):
                oauth.exchange(self.home, self.callback_file)
        self.assertFalse((self.home / "google_token.json").exists())
        self.assertTrue(self.pending()["exchange_started"])

    def test_network_failure_retains_uncertainty_and_never_replays_code(self):
        self.authorize()
        self.callback()
        self.flow.fetch_token.side_effect = RuntimeError("PRIVATE-PROVIDER-DETAIL")
        with self.assertRaisesRegex(oauth.OAuthError, "outcome uncertain") as result:
            self.exchange()
        self.assertNotIn("PRIVATE", str(result.exception))
        with self.assertRaisesRegex(oauth.OAuthError, "do not replay"):
            self.exchange()
        self.assertEqual(self.flow.fetch_token.call_count, 1)

    def test_success_persists_native_format_confirmed_scopes_and_prevents_replay(self):
        self.authorize()
        self.callback()
        self.assertTrue(self.exchange()["connected"])
        token = oauth.read_json(self.home / "google_token.json")
        self.assertEqual(token["type"], "authorized_user")
        self.assertEqual(set(token["scopes"]), set(oauth.SCOPES))
        before = (self.home / "google_token.json").read_bytes()
        for action in (self.authorize, self.exchange):
            with self.assertRaisesRegex(oauth.OAuthError, "already exists"):
                action()
        self.assertEqual((self.home / "google_token.json").read_bytes(), before)
        self.assertEqual(self.flow.fetch_token.call_count, 1)
        self.flow.fetch_token.assert_called_once_with(code="fixture-code", timeout=20)

    def test_sqlite_owner_prevents_concurrent_flow_without_provider_call(self):
        self.authorize()
        self.flow.authorization_url.reset_mock()
        with contextlib.closing(sqlite3.connect(self.home / oauth.STORAGE / oauth.PENDING)) as original:
            original.execute("BEGIN IMMEDIATE")
            with self.assertRaises(sqlite3.OperationalError):
                self.authorize()
        self.flow.authorization_url.assert_not_called()

    def test_client_change_refuses_exchange_before_provider_call(self):
        self.authorize()
        self.callback()
        self.client["installed"]["client_secret"] = "changed-fixture"  # pragma: allowlist secret -- synthetic tamper fixture
        self.client_file.write_text(json.dumps(self.client), encoding="utf-8")
        with self.assertRaisesRegex(oauth.OAuthError, "changed"):
            self.exchange()
        self.flow.fetch_token.assert_not_called()

    def test_missing_refresh_token_refuses_durable_persistence(self):
        self.authorize()
        self.callback()
        self.flow.credentials.to_json.return_value = json.dumps({"token": "fixture-access"})
        with self.assertRaisesRegex(oauth.OAuthError, "Durable Desktop token incomplete"):
            self.exchange()
        self.assertFalse((self.home / "google_token.json").exists())

    def test_real_process_exit_after_committed_intent_never_replays_exchange(self):
        self.authorize()
        self.callback()
        script = """import json,os,sqlite3,sys
c=sqlite3.connect(sys.argv[1]);c.execute('PRAGMA synchronous=EXTRA')
p=json.loads(c.execute('SELECT payload FROM pending WHERE id=1').fetchone()[0]);p['exchange_started']=True
c.execute('UPDATE pending SET payload=? WHERE id=1',(json.dumps(p),));c.commit();os._exit(0)
"""
        child = subprocess.run([sys.executable, "-I", "-c", script, str(self.home / oauth.STORAGE / oauth.PENDING)],
                               timeout=10, capture_output=True)
        self.assertEqual(child.returncode, 0)
        with self.assertRaisesRegex(oauth.OAuthError, "do not replay"):
            self.exchange()
        self.flow.fetch_token.assert_not_called()

    def test_existing_storage_with_wider_permissions_is_refused_without_repair(self):
        storage = self.home / oauth.STORAGE
        storage.mkdir(mode=0o700)
        if os.name == "nt":
            command = [str(Path(os.environ["SystemRoot"]) / "System32/icacls.exe"), str(storage),
                       "/grant", "*S-1-1-0:(OI)(CI)R"]
            result = subprocess.run(command, capture_output=True, timeout=10)
            self.assertEqual(result.returncode, 0)
        else:
            storage.chmod(0o755)
        with self.assertRaises(oauth.OAuthError):
            self.authorize()
        self.flow.authorization_url.assert_not_called()
        self.assertFalse((storage / oauth.PENDING).exists())

    def test_cli_failure_does_not_echo_callback_or_credentials(self):
        self.authorize()
        self.callback(state="PRIVATE-CALLBACK-STATE")
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            code = oauth.main(["exchange", "--home", str(self.home), "--callback-file", str(self.callback_file)])
        self.assertEqual(code, 1)
        self.assertNotIn("PRIVATE-CALLBACK", output.getvalue())
        self.assertNotIn("not-a-credential", output.getvalue())
        self.assertEqual(json.loads(output.getvalue())["error"], "OAuth state mismatch")


if __name__ == "__main__":
    unittest.main()
