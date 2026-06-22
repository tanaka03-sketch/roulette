# AI 開発運用 共通指示

## 参照元

親リポジトリ `tanaka03-sketch/ai-development-operations` の README と playbook 方針を参照します。親リポジトリは読み取り専用で扱い、Issue 作成、PR 作成、ブランチ作成、ファイル更新は行いません。

## 作業対象

開発対象は `tanaka03-sketch/roulette` です。ユーザーが明示的に別リポジトリを指定しない限り、このリポジトリを対象にします。

## 必読順序

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/ai-development/goal.md`
4. `docs/ai-development/progress.md`
5. `docs/ai-development/automation-lock.md`
6. ChatGPT memory lock: `/workspace/memory/locks/roulette-schedule-lock.json`
7. `docs/requirements.md`
8. `docs/ai-development/requirements.md`
9. `docs/ai-development/work-log.md`
10. `docs/ai-development/job-instructions/{job}.md`
11. 関連 Issue / PR / handover

## 仕様判断の扱い

- 仕様判断の正本は `docs/requirements.md` です。
- AI 自律開発の最終目標は `docs/ai-development/goal.md` に置きます。
- 作業進捗、現在地、次アクションは `docs/ai-development/progress.md` に置きます。
- AI ジョブ運用上の確認、未確定事項、Slack 確認ログは `docs/ai-development/requirements.md` と `docs/ai-development/work-log.md` に集約します。
- 既存の文書カタログ、README、CONTRIBUTING と矛盾する変更は行いません。
- 大量の文書移動や削除が必要な場合は、その場で実施せず Issue 候補にします。

## メモリーロック運用

定期実行ジョブは、作業前に `docs/ai-development/automation-lock.md` の手順に従い、ChatGPT 側メモリー `/workspace/memory/locks/roulette-schedule-lock.json` を確認します。

- 先行ジョブのロックが有効で期限内の場合、後続ジョブは実行せず停止します。
- ロックが空いている、または期限切れの場合だけ、ChatGPT 側メモリーを更新してロック取得を試みます。
- メモリーの読み取り、更新、保存に失敗した場合は、ロック未取得として停止します。
- 作業終了時は `progress.md` と `work-log.md` を必要に応じて更新してからメモリーロックを解放します。
- `docs/ai-development/automation-lock.json` は非推奨マーカーであり、ロック状態の正本として読んだり更新したりしません。

## ジョブ共通停止条件

次の条件では変更を進めず、停止理由と次アクションを `docs/ai-development/work-log.md` に記録します。

- Open ブロッカーがある。
- Issue が大きすぎる、または小さく分解されていない。
- 設計が未確定。
- Slack または人間回答待ちが残っている。
- 検証方法が不明確。
- セキュリティ、権限、個人情報、入力検証の判断が未確定。
- レビュー指摘が triage されていない。

## Slack 不明点確認ループ

不明点が実装判断、設計判断、検証判断に影響する場合は推測しません。

- Slack 投稿環境がある場合は、1 回につき 1 問だけ投稿します。
- Slack 投稿環境がない場合は、質問文案を `docs/ai-development/work-log.md`、関連 Issue、必要に応じて `docs/ai-development/requirements.md` に `回答待ち` として記録します。
- 回答後は、実装より先に該当する requirements / design / instruction / handover / work-log を更新します。

## 外部情報収集

インターネット検索は、AI 自律開発の改善、GitHub の公開仕様、一般的なレビュー・検証観点の確認に使います。対象リポジトリと親リポジトリで確認できる内容の代用にはしません。

外部情報を採用する場合は、根拠 URL と採用判断を `docs/ai-development/goal.md`、`docs/ai-development/progress.md`、または `docs/ai-development/work-log.md` に残します。

## 検証

基本検証コマンド:

```bash
npm run typecheck
npm test
npm run build
```

モバイル UI 変更時は README の `Mobile verification` 観点も確認します。

## スケジュール運用

定期実行は `Asia/Tokyo` で登録します。レビュー系は候補 Finding を出し、Issue の作成や優先順位付けは Issue / Finding Triage が担当します。

各スケジュールは、開始時に目的、進捗、メモリーロック、正本、ジョブ別指示を読み込み、メモリーロック取得に成功した場合だけ作業します。対象がない場合は、対象なしの理由と次に待つ状態を出力して終了します。

| 分 | ジョブ | 指示ファイル |
| --- | --- | --- |
| 00 | 文書体系レビュー | `review.md` |
| 05 | Issue 分解・作業管理レビュー | `triage.md` |
| 10 | 設計・実装方針レビュー | `design-update.md` |
| 15 | テスト観点レビュー | `verification.md` |
| 20 | セキュリティ・権限レビュー | `review.md` |
| 25 | CAB / 変更審査レビュー | `review.md` |
| 30 | 本番運用 readiness レビュー | `review.md` |
| 35 | 統合レビュー | `review.md` |
| 40 | Issue / Finding Triage | `triage.md` |
| 45 | 要件・設計修正 | `design-update.md` |
| 50 | 実装 | `implementation.md` |
| 55 | 検証 | `verification.md` |

## 報告形式

作業後は次を報告します。

1. 作成・更新ファイル
2. 既存ファイルとの関係
3. 導入または確認したスケジュール
4. 未対応事項
5. 人間確認事項
6. 次アクション
7. 実行した検証コマンドと結果
