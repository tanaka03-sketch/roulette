---
name: AI development task
about: AI 開発運用で扱うタスク
title: "[AI Dev] "
labels: ["ai-development", "needs-triage"]
assignees: []
---

## 目的

-

## 背景

-

## 対象範囲

### 含む

-

### 含まない

- 認証、認可、サーバー保存、外部 API、複数ユーザー同時編集は、`docs/requirements.md` が更新されない限り対象外です。

## 対象正本

- [ ] `docs/requirements.md`
- [ ] `docs/implementation-tasks.md`
- [ ] `docs/requirements/document-catalog-2026-05-18.md`
- [ ] `docs/ai-development/requirements.md`
- [ ] `docs/ai-development/progress.md`
- [ ] `docs/ai-development/work-log.md`
- [ ] 関連 Issue / PR:

## GitHub Development Loop

親リポジトリに存在する loop / gate だけを使います。

### Loop Type

- [ ] Issue Intake
- [ ] Implementation PR
- [ ] Review Triage
- [ ] CI Failure
- [ ] Scheduled Maintenance

### Gate

- [ ] Spec Gate
- [ ] Storage Conflict Guard
- [ ] Not applicable

### Success Criteria

- [ ] 

### Verify Gate

- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] README の Mobile verification（モバイル変更時）
- [ ] Review triage
- [ ] Spec Gate
- [ ] Storage Conflict Guard
- [ ] Manual verification
- [ ] Not applicable

### Iteration Budget

- max iterations:
- current iteration:

## Stop Condition

- [ ] iteration 上限に達したら停止する
- [ ] 同じ失敗が3回続いたら停止する
- [ ] 仕様判断が必要になったら停止する
- [ ] 権限、データ移行、破壊的変更が必要になったら停止する
- [ ] rollback 方針が説明できなければ停止する
- [ ] 検証 gate が確認不能になったら停止する
- [ ] Issue / PR の目的を超える修正が必要になったら停止する
- [ ] ロック取得できなければ write しない
- [ ] stale snapshot の場合は write しない
- [ ] human approval が必要な場合は実装しない

## Loop State

- tried:
- passed:
- failed:
- next:
- stopped because:

## Spec Gate

実装または write operation に進む前に確認します。

### 判定

- [ ] 通過
- [ ] needs-research
- [ ] needs-design-review
- [ ] needs-storage-conflict-check
- [ ] needs-test
- [ ] blocked
- [ ] human-approval-required

### 仕様化状況

| 観点 | 判定 | 理由 | 次アクション |
| --- | --- | --- | --- |
| 入力 |  |  |  |
| 出力 |  |  |  |
| `docs/requirements.md` との整合 |  |  |  |
| クライアント完結 / 単一ユーザー |  |  |  |
| `localStorage` 影響 |  |  |  |
| 入力検証 / XSS |  |  |  |
| モバイル影響 |  |  |  |
| rollback / revert |  |  |  |
| 人間承認条件 |  |  |  |

## Storage Conflict Guard

Issue / PR / comment / label / branch / file を保存・更新する場合に確認します。

### 保存対象

- [ ] Issue
- [ ] PR
- [ ] comment
- [ ] label
- [ ] branch
- [ ] file
- [ ] 保存・更新なし

### Snapshot

- operation ID:
- finding fingerprint:
- read at:
- file SHA:
- Issue / PR updated_at:
- labels:
- latest comment ID:
- branch head SHA:
- re-read before write:
- changed fields:

### 判定

- [ ] 通過
- [ ] duplicate operation なし
- [ ] duplicate finding なし
- [ ] stale snapshot なし
- [ ] path-level write conflict なし
- [ ] human approval が必要な write なし

## AI 作業単位チェック

- [ ] 1つの PR で完了できる
- [ ] 変更対象の主要領域が1つに絞られている
- [ ] 完了条件がテストまたは確認手順で判定できる
- [ ] 未確定仕様を実装者が判断しなくてよい
- [ ] ロールバックまたは取り消し方針がある
- [ ] Spec Gate を通過している
- [ ] 保存・更新を伴う場合は Storage Conflict Guard を通過している

## 完了条件

-

## 検証

- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] README の Mobile verification（モバイル変更時）
- [ ] 未実行理由:

## 参照

-

## Handover

- [ ] 変更内容
- [ ] Spec Gate の結果
- [ ] Storage Conflict Guard の結果
- [ ] 確認済み事項
- [ ] 未確認事項
- [ ] 残 Issue
- [ ] 次アクション
