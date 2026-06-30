---
name: Review finding
about: レビューで見つかった候補 Finding の triage 用
title: "[Finding] "
labels: ["ai-development", "candidate-finding", "needs-triage"]
assignees: []
---

## Finding ID

F-

## レビュー種別

- [ ] 文書体系レビュー
- [ ] Issue 分解・作業管理レビュー
- [ ] 設計・実装方針レビュー
- [ ] Minimal Implementation Review
- [ ] Code Review
- [ ] Review Triage
- [ ] テスト観点レビュー
- [ ] セキュリティ・権限レビュー
- [ ] Service Publication Review
- [ ] CAB / 変更審査レビュー
- [ ] 本番運用 readiness レビュー
- [ ] 統合レビュー

## 根拠資料

-

## 問題

-

## 影響

-

## 公開判断への影響

- [ ] 公開前に必ず対応が必要
- [ ] 条件付き公開可の条件に含める
- [ ] 判断保留の理由に含める
- [ ] 公開判断には影響しないが追跡する

## 再現条件 / 確認方法

-

## 期待される状態

-

## 修正案の方向性

-

## 追加で確認すべきこと

-

## Triage

- [ ] PR 内修正
- [ ] 既存 Issue へ追記
- [ ] 新規 Issue として継続
- [ ] 仕様確認待ち
- [ ] 対応しない
- [ ] テスト追加
- [ ] 設計レビューへ差し戻し
- [ ] Spec Gate へ差し戻し
- [ ] Storage Conflict Guard へ差し戻し
- [ ] 人間承認待ち

## Triage 理由

-

## 優先度

- [ ] P0
- [ ] P1
- [ ] P2
- [ ] P3

## Minimalism Review Finding

過剰実装や不要依存の指摘でない場合は `not applicable` にします。

| Finding ID | 種別 | 場所 | 削るもの | 置き換え | 理由 | 次アクション |
| --- | --- | --- | --- | --- | --- | --- |
| M-001 | delete / stdlib / native / yagni / shrink / not applicable |  |  |  |  | PR内修正 / 別Issue / 対応しない |

## roulette 固有チェック

- [ ] クライアント完結、単一ユーザー、`localStorage` 前提から外れていない
- [ ] 認証、認可、サーバー保存、外部 API 追加を要求していない、または `docs/requirements.md` 更新が必要と明記した
- [ ] 入力検証、XSS、長い候補名、同名候補識別への影響を確認した
- [ ] モバイル UI 影響がある場合 README の Mobile verification を確認対象にした
- [ ] 公開利用時の注意と矛盾していない

## Spec Gate 観点

| 観点 | 判定 | 理由 | 次アクション |
| --- | --- | --- | --- |
| 入力 / 出力 |  |  |  |
| 要件正本との整合 |  |  |  |
| 権限 / secret / 個人情報 |  |  |  |
| safe outputs |  |  |  |
| retry / timeout / duplicate execution |  |  |  |
| rollback / revert |  |  |  |
| 人間承認要否 |  |  |  |

## Storage Conflict Guard 観点

- operation ID:
- finding fingerprint:
- 既存 Issue / コメント重複:
- write 前再読込の要否:
- stale snapshot リスク:

## Completion Scorecard への影響

| 分野 | 影響 | 理由 |
| --- | --- | --- |
| 目的適合 |  |  |
| 公開可否 |  |  |
| 運用適合 |  |  |
| レビュー品質 |  |  |
| 検証と引き継ぎ |  |  |

## 完了条件

-

## 次アクション

-
