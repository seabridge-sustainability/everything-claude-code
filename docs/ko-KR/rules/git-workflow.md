# Git 워크플로우

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->

## 커밋 메시지 형식
```
<type>: <description>

<선택적 본문>
```

타입: feat, fix, refactor, docs, test, chore, perf, ci

참고: ECC가 관리하는 설치는 `~/.claude/settings.json`에 `"includeCoAuthoredBy": false`를 설정하므로 커밋에 기본적으로 `Co-Authored-By`가 붙지 않습니다. Claude 표기를 유지하려면 `"includeCoAuthoredBy": true`를 설정하거나 `attribution`을 구성하세요. ECC는 명시적인 선택을 덮어쓰지 않습니다.

## Pull Request 워크플로우

PR을 만들 때:
1. 전체 커밋 히스토리를 분석 (최신 커밋만이 아닌)
2. `git diff [base-branch]...HEAD`로 모든 변경사항 확인
3. 포괄적인 PR 요약 작성
4. TODO가 포함된 테스트 계획 포함
5. 새 브랜치인 경우 `-u` 플래그와 함께 push

> git 작업 전 전체 개발 프로세스(계획, TDD, 코드 리뷰)는
> [development-workflow.md](./development-workflow.md)를 참고하세요.
