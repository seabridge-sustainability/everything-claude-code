# GSD Safe Execution Checklist

- [ ] Local-only development unless explicitly approved.
- [ ] Controlled auto-mode limited to formatting, lint/typecheck fixes, test discovery, import cleanup, small tested refactors, approved report/log moves, docs link/path fixes, and safe read-only scans.
- [ ] No uncontrolled autonomous mode.
- [ ] No yolo mode.
- [ ] No dangerous permission skipping.
- [ ] No auto-commit.
- [ ] No auto-push.
- [ ] No automatic PR creation.
- [ ] No global install.
- [ ] No marketplace install.
- [ ] No paid/live provider call.
- [ ] No destructive cleanup.
- [ ] No secrets or API keys exposed.
- [ ] No Claude Mem/vector-memory activation.
- [ ] Explicit approval captured before commits, pushes, dependency installs, migrations, production data changes, auth/security changes, billing changes, destructive file operations, global installs, or long-running training jobs.
