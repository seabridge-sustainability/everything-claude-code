---
name: hermes-google-email
description: Connect Gmail to an existing Hermes profile using a Google Desktop OAuth client and email-only consent, without granting other Workspace services.
---

# Hermes Gmail connection

Use this helper when the installed `google-workspace` setup cannot request narrow
scopes. It does not replace that skill or change its CLI. The resulting
`google_token.json` uses the native `authorized_user` format; Hermes's existing
`google_api.py` reads its stored scopes.

Have the owner configure a Desktop OAuth client in their existing Google Cloud
project, enable Gmail API, and add the intended Gmail account as a test user if
the consent app is in Testing. This creates no application hosting resources.
Use the owner's private JSON path, never another application's credentials.

Resolve the actual Hermes profile directory and installation's Python environment.
Where supported, `hermes --print-runtime-command` identifies the installation-bound
interpreter. Its source helper `hermes_cli._launchers.runtime_command` accepts
`args=[SCRIPT, ...]` and
`code="sys.argv = sys.argv[1:]; runpy.run_path(sys.argv[0], run_name='__main__')"`
to run a script after native dependency activation. Resolve that helper from the
reviewed installation source, then execute its returned argument array directly;
do not evaluate it as shell text or use an unrelated Python for OAuth.
Missing `google-auth-oauthlib` is a dependency hold, not permission to install it.

Run the helper's `authorize` command with `--home PROFILE`, `--client-secret FILE`,
`--project PROJECT_ID` and `--account EMAIL`. It requests only Gmail read, send and
modify scopes. This connection does not authorize sending or modifying messages;
each subsequent task still needs its applicable permission.

The helper reports a private authorization URL file, not the URL or credentials.
The owner opens that file's URL in a supported browser, selects the intended
account and reviews the requested access. After consent, the failed localhost:1
redirect is expected: save its **entire URL** in a private callback file. Run
`exchange --home PROFILE --callback-file FILE`. Do not paste codes into chat or
command-line arguments. The helper validates state, expiry, scopes and the actual
Gmail profile account before saving the native token.

An existing token is never overwritten. Repeated authorization preparation reuses
the same unexpired pending flow. SQLite with `synchronous=EXTRA` commits exchange
intent before the one-use request; an interrupted exchange stays uncertain and
is never replayed automatically. Reconcile it with the owner. Private state and
the URL live under the profile's `.google-email-oauth` directory; save the callback
there too. Keep these files outside source/evidence commits. New private paths
use Python's native mode-0700 directory creation and verify owner/current-user,
SYSTEM/Administrators ACLs on Windows, or owner-only POSIX permissions. Token
bytes are written inside that private directory before atomic publication at the
native token path. Existing paths with wider access are refused. This does not
protect against processes running as the same user. Do not run broad-scope setup to
"repair" this connection. Calendar and other services need separate authorization.

After connection, verify a bounded Gmail operation through the installed native
`google-workspace` skill. Report consent, token persistence and actual native API
use separately; helper tests and skill installation prove neither authentication
nor live email access.
