## 目的

-

## 変更内容

-

## 対象正本・参照資料

- [ ] `docs/requirements.md`
- [ ] `docs/implementation-tasks.md`
- [ ] `docs/requirements/document-catalog-2026-05-18.md`
- [ ] `docs/ai-development/requirements.md`
- [ ] `docs/ai-development/progress.md`
- [ ] `docs/ai-development/work-log.md`
- [ ] 関連 Issue / PR:

## AI 開発運用チェック

- [ ] 仕様判断は `docs/requirements.md` と矛盾していない
- [ ] AI 運用上の未確定事項は `docs/ai-development/requirements.md` または work-log に記録した
- [ ] Open ブロッカーはない、または停止理由を記録した
- [ ] レビュー指摘は triage 済み
- [ ] 人間承認が必要な操作を含まない、または承認待ちとして明記した
- [ ] 初期版のクライアント完結、単一ユーザー、`localStorage` 前提から外れていない
- [ ] 親リポジトリに存在しない開発サイクルを追加していない

## Spec Gate Result

### 判定

- [ ] 通過
- [ ] needs-research
- [ ] needs-design-review
- [ ] needs-storage-conflict-check
- [ ] needs-test
- [ ] blocked
- [ ] human-approval-required

### 確認済み

- [ ] 入力と出力が明確
- [ ] 正本と更新先を確認した
- [ ] 権限、secret、個人情報、破壊的変更の影響を確認した
- [ ] `localStorage`、入力検証、XSS、モバイル影響を必要に応じて確認した
- [ ] rollback または revert 方針を確認した
- [ ] 検証 gate が明確

## Storage Conflict Guard Result

- [ ] GitHub write の競合確認は不要
- [ ] file / Issue / PR / comment / label / branch の snapshot を write 前に再確認した
- [ ] stale snapshot を使っていない
- [ ] duplicate operation / duplicate finding を必要に応じて確認した
- [ ] path 単位で file update を直列化した

## Development Loop Result

親リポジトリに存在する loop だけを選択します。

### Loop Type

- [ ] Implementation PR
- [ ] Review Triage
- [ ] CI Failure
- [ ] Scheduled Maintenance

### Iterations

| Iteration | 対象 | 変更内容 | Verify 結果 | 次アクション |
| --- | --- | --- | --- | --- |
| 1 |  |  |  |  |

## 確認手順

- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] README の Mobile verification（モバイル変更時）
- [ ] 必要に応じて画面確認
- [ ] 未実行理由:

## 影響範囲

- [ ] UI のみ
- [ ] ドメインロジック
- [ ] 保存処理
- [ ] CI / ツール
- [ ] ドキュメントのみ

## Review Finding Triage

| Finding ID | 分類 | 対応状況 | 分割判断 | 次ラベル |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 未確認事項・残リスク

-

## Handover

### 完了したこと

-

### 未完了 / 停止理由

-

### 次アクション

-
