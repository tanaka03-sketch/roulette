---
name: AI development task
about: AI 開発運用で扱う実装・設計・検証タスク
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
- [ ] `docs/ai-development/work-log.md`
- [ ] 関連 Issue / PR:

## 作業種別

- [ ] 文書体系レビュー
- [ ] Issue 分解・作業管理レビュー
- [ ] 設計・実装方針レビュー
- [ ] テスト観点レビュー
- [ ] セキュリティ・権限レビュー
- [ ] CAB / 変更審査レビュー
- [ ] 本番運用 readiness レビュー
- [ ] 統合レビュー
- [ ] Issue / Finding Triage
- [ ] 要件・設計修正
- [ ] 実装
- [ ] 検証

## GitHub Development Loop

### Loop Type

- [ ] Issue Intake
- [ ] Spec Gate
- [ ] Storage Conflict Guard
- [ ] Implementation PR
- [ ] Review Triage
- [ ] CI Failure
- [ ] Scheduled Maintenance

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

## 着手条件

- [ ] 設計確定済み
- [ ] 未確定事項なし
- [ ] Open ブロッカーなし
- [ ] 小さく分解済み
- [ ] 検証方法明確
- [ ] セキュリティ、権限、個人情報、入力検証の判断が未確定ではない
- [ ] レビュー指摘が triage 済み

## 停止条件確認

該当する場合は実装せず、停止理由を記録してください。

- [ ] Open ブロッカーあり
- [ ] Issue が大きすぎる
- [ ] 設計未確定
- [ ] Slack / 人間回答待ちあり
- [ ] 検証方法不明
- [ ] 高リスク判断未承認
- [ ] レビュー指摘未 triage
- [ ] stale snapshot または重複 write リスクあり

## Spec Gate

### 判定

- [ ] 通過
- [ ] needs-research
- [ ] needs-design-review
- [ ] needs-storage-conflict-check
- [ ] needs-test
- [ ] blocked
- [ ] human-approval-required

### 確認表

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
