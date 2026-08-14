# Git 워크플로우

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
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
