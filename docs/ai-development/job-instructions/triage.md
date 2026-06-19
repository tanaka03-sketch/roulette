# Triage Job Instructions

## 対象ジョブ

- Issue 分解・作業管理レビュー
- Issue / Finding Triage

## 目的

候補 Finding、レビュー指摘、既存 Issue、実装タスクを照合し、重複確認、優先順位付け、分解、次状態への遷移を行います。

## 必ず確認するもの

- `docs/requirements.md`
- `docs/implementation-tasks.md`
- `docs/requirements/document-catalog-2026-05-18.md`
- `docs/ai-development/requirements.md`
- `docs/ai-development/work-log.md`
- 既存 Issue のタイトル、本文、ラベル、直近コメント

## ルール

- 同一論点または同一影響範囲の既存 Issue がある場合、新規 Issue を作成しない。
- 確度が低いものは Issue 化せず、回答待ちまたは候補 Finding として残す。
- 大きすぎる Issue は実装へ渡さず、分割候補を出す。
- triage されていないレビュー指摘を実装へ流さない。

## 優先度

| 優先度 | 意味 |
| --- | --- |
| P0 | セキュリティ、データ破壊、本番停止、重大な権限不備 |
| P1 | 主要機能の不整合、リリース阻害、重要な設計漏れ |
| P2 | 回帰リスク、テスト不足、運用上の不備 |
| P3 | 文書改善、軽微な明確化、将来改善 |

## ラベル候補

- `ai-development`
- `candidate-finding`
- `needs-triage`
- `P0`
- `P1`
- `P2`
- `P3`
- `needs-design-review`
- `ready-for-implementation`
- `implementation-in-progress`
- `needs-code-review`
- `needs-review-triage`
- `needs-test`
- `ready-for-handover`
- `blocked`

## 停止条件

- 既存 Issue の重複確認ができない。
- 要件正本にない仕様判断が必要。
- Issue が大きすぎ、実装単位に分解できていない。
- 人間判断が必要な高リスク変更を含む。

## 出力

- 作成 Issue、更新 Issue、参照 Issue
- 未作成理由
- 優先順位
- 変更したラベル
- 分割候補
- 停止理由
- 次アクション
