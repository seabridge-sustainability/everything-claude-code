---
name: caveman-cloud-connect
description: >
  Connect coding agents to one Caveman Cloud project with one command, check or
  repair a connection, or remove it. The remote MCP covers agents without a
  shell.
---

# Connect your coding agent

Use when `cvm` is missing, the user asks to connect an agent (this one or
another), sign-in or MCP looks broken, or they want it removed. The connection
lets an agent operate Cloud; it does not route the agent's own model traffic.

## 1. Check first

```sh
cvm context show    # project_id and credential_configured
cvm auth status     # exit 3: signed out
```

A signed-in `cvm` on the task's project is a working connection: reuse it.
Never pick the first project or switch identity silently.

## 2. Connect: one line

The project id comes from the console's **Connect your coding agent** dialog.

```sh
npx -y @caveman-ai/cloud@rc setup --project PROJECT_ID
```

A private install sets its API first: `CAVE_API_URL=https://api.example.com`
before the same line. It runs these steps, each shown as a row in the user's
terminal and in the console dialog:

1. **install**: puts `cvm` on the PATH (`npm i -g`); when that fails, the MCP
   entries run it through `npx` instead.
2. **sign in**: prints a code and opens the browser; the user approves.
3. **project**: `--project`, else the saved one, else the only one.
4. **agents**: finds Claude Code, Codex, Cursor, VS Code, Windsurf, Gemini CLI
   and OpenCode. `--agent claude,codex` picks; `--yes` takes all it found.
5. **skills**: installs this skill (`caveman-cloud`) where each agent reads
   skills.
6. **mcp**: registers the stdio server `caveman-cloud` (`cvm mcp`) in each
   agent, and leaves every other server entry alone.
7. **ready**: reads each config back and reports it Changed, Unchanged or
   Failed, then offers to start the agent with the task "Set up Caveman Cloud
   for this repository."

Good output in a terminal ends with
`✓ Caveman Cloud is connected to Claude Code, Codex and Cursor.` Run by an
agent (no terminal), it prints one JSON object with `agents: [{id, skill, mcp}]`;
a `Failed` row names the file it could not write. With several projects and no
`--project` it exits with `cave_project_required` and the list: ask the user
which, then run it again.

Sign-in is the person's. You may start the command and wait (up to 10 minutes,
so a long timeout); never approve it yourself, ask for a token in chat, read
the credential store, or write a credential into the repository.

Running it again repairs a broken install. `cvm setup --remove` takes out the
skills and MCP entries it wrote and nothing else. A new MCP server shows up
after the agent restarts.

## 3. Verify

`cvm auth status` and `cvm context show` again. On a project mismatch, exit 3
or a contract error (`cvm doctor` says which), stop project reads and writes;
repository inspection may continue. A copied command is not a connection.

## Agents without a shell

Claude desktop or web and other chat clients use the remote MCP at the
installation's `/mcp` endpoint. The dialog's "No terminal?" section and the
console's `/mcp/connect` page give each client's snippet. The person approves
the project and access in the browser: metadata reads by default; captured
content, authoring and paid runs are separate choices. Then call
`caveman_context` and confirm the project.

## CI

CI holds no sign-in: `CAVE_TOKEN` is a project key and `CAVE_PROJECT_ID` its
project. See **caveman-cloud-evals**, section 4.

## Next

Report the project, endpoint and each agent's result. To set the repository up,
read **caveman-onboard**. Public page:
`https://docs.caveman.so/guides/connect-coding-agent.md`.
