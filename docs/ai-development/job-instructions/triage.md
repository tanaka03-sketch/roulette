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
- 人間判断が必要な Issue は、判断待ちとして GitHub Issue コメントに記録し、番号付き選択肢で回答できる形にする。
- 人間回答が得られたら、回答内容を関連 Issue にコメントし、必要に応じて `docs/ai-development/requirements.md`、`docs/ai-development/work-log.md`、要件正本、設計文書、handover の順で反映先を判定する。

## 人間判断質問プロトコル

人間の判断が Issue クローズ、実装可否、設計、検証、管理画面操作に影響する場合は、次の形式で 1 問ずつ確認します。

1. 1 回の質問で扱う判断は 1 つだけにする。
2. 質問には対象 Issue、判断理由、未回答時に止まる作業を明記する。
3. 選択肢には `1.` `2.` `3.` の番号を振り、利用者が番号だけで回答できるようにする。
4. 各選択肢には、採用時の影響とおすすめ度を 1 文で添える。
5. 推奨案には `おすすめ` と明記する。
6. 回答後に GitHub へ反映する内容を、質問文の末尾に明記する。
7. Slack 投稿環境がない場合は、同じ質問文を関連 Issue コメントと `docs/ai-development/work-log.md` に `回答待ち` として残す。

### 質問テンプレート

```md
## 人間判断待ち

対象: Issue #<number> <title>

判断が必要な理由:
- <なぜ人の判断が必要か>

番号で選んでください。

1. <選択肢A>（おすすめ）
   - 理由: <なぜ推奨するか>
   - 反映: <回答後に GitHub / docs へ反映する内容>
2. <選択肢B>
   - 理由: <採用時のメリット・注意点>
   - 反映: <回答後に GitHub / docs へ反映する内容>
3. <選択肢C>
   - 理由: <採用時のメリット・注意点>
   - 反映: <回答後に GitHub / docs へ反映する内容>

回答があるまでの扱い:
- <実装停止 / 管理画面待ち / クローズ待ち / 分割待ち など>
```

## Issue クローズ前の人間確認対象

次の条件に該当する Issue は、AI が勝手に completed / not planned にせず、人間確認または管理画面操作完了コメントを待ちます。

- GitHub 管理画面でしか確認できない設定が完了条件に含まれる。
- branch protection、Actions permissions、merge policy、repository settings、secret、権限、ラベル実作成の確認を含む。
- Release 作成、公開判断、CAB、本番 readiness の最終判断を含む。
- 要件正本に未確定事項が残っている。
- Issue 本文と現在の実装・正本のどちらを優先して閉じるか、人間判断が必要。

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
- `needs-human-decision`
- `manual-github-admin`
- `ready-to-close`

## 停止条件

- 既存 Issue の重複確認ができない。
- 要件正本にない仕様判断が必要。
- Issue が大きすぎ、実装単位に分解できていない。
- 人間判断が必要な高リスク変更を含む。
- 人間判断待ちの質問が関連 Issue または `docs/ai-development/work-log.md` に残っている。

## 出力

- 作成 Issue、更新 Issue、参照 Issue
- 未作成理由
- 優先順位
- 変更したラベル
- 分割候補
- 人間判断待ちの質問と選択肢
- 停止理由
- 次アクション
