# AI 開発運用 共通指示

## 参照元

親リポジトリ `tanaka03-sketch/ai-development-operations` の README と playbook 方針を参照します。親リポジトリは読み取り専用で扱い、Issue 作成、PR 作成、ブランチ作成、ファイル更新は行いません。

優先して参照する親リポジトリ資料:

- `README.md`
- `playbooks/automated-development-flow.md`
- `playbooks/github-development-loop.md`
- `playbooks/review-finding-triage.md`
- `playbooks/github-automation-setup.md`
- `operations/scheduled-run-lock.md`
- `templates/github-issue/ai-development-task.md`
- `templates/github-issue/review-finding.md`
- `templates/github-pr/pull-request-template.md`

指定された古い adoption / template パスが見つからない場合は、不足として `work-log` に記録し、見つかった親資料と `roulette` の既存正本を優先します。親リポジトリにない運用仕様は、`roulette` 側の独自ルールとして追加しません。

## 作業対象

開発対象は `tanaka03-sketch/roulette` です。ユーザーが明示的に別リポジトリを指定しない限り、このリポジトリを対象にします。

## 必読順序

通常作業では次の順で読みます。

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/requirements.md`
4. `docs/ai-development/requirements.md`
5. `docs/ai-development/work-log.md`
6. `docs/ai-development/job-instructions/{job}.md`
7. 関連 Issue / PR / handover

運用レビューや将来のスケジュール準備では、作業選択の前に次も読みます。

- `docs/ai-development/goal.md`
- `docs/ai-development/progress.md`
- `docs/ai-development/automation-lock.md`

## 仕様判断の扱い

- 仕様判断の正本は `docs/requirements.md` です。
- AI 開発運用の目的は `docs/ai-development/goal.md` に置きます。
- 作業進捗、現在地、次アクションは `docs/ai-development/progress.md` に置きます。
- AI ジョブ運用上の確認、未確定事項、Slack 確認ログは `docs/ai-development/requirements.md` と `docs/ai-development/work-log.md` に集約します。
- 既存の文書カタログ、README、CONTRIBUTING と矛盾する変更は行いません。
- 大量の文書移動や削除が必要な場合は、その場で実施せず Issue 候補にします。

## 親方針に合わせた運用範囲

親 README の方針に従い、現時点では 12 本のスケジュールを有効運用しません。実スケジュール登録、再有効化、PR 作成、プロダクトコード変更は、人間承認または追加方針が出てから行います。

初期段階で許可する更新は次に限定します。

- Issue triage
- Issue コメント
- ラベル確認または必要最小限のラベル更新
- README / `docs/ai-development/` の手順ドキュメント更新
- handover / work-log / progress の更新

## ロック運用

親リポジトリの `operations/scheduled-run-lock.md` に合わせ、ロック本体は ChatGPT 側メモリーに置く方針とします。GitHub 側の `docs/ai-development/automation-lock.json` は、現時点ではロック判定元として使いません。

将来スケジュールを有効化する場合は、作業前に ChatGPT 側メモリーのロックを確認し、ロック取得、進捗更新、ロック解放のいずれかに失敗した場合は追加変更を行いません。

## ジョブ共通停止条件

次の条件では変更を進めず、停止理由と次アクションを `docs/ai-development/work-log.md` に記録します。

- Open ブロッカーがある。
- Issue が大きすぎる、または小さく分解されていない。
- 設計が未確定。
- Slack または人間回答待ちが残っている。
- 検証方法が不明確。
- セキュリティ、権限、個人情報、入力検証の判断が未確定。
- レビュー指摘が triage されていない。
- 未承認のスケジュール登録、PR 作成、プロダクトコード変更、本番操作、破壊的変更、権限変更、データ移行が必要。

## Slack 不明点確認ループ

不明点が実装判断、設計判断、検証判断に影響する場合は推測しません。

- Slack 投稿環境がある場合は、1 回につき 1 問だけ投稿します。
- Slack 投稿環境がない場合は、質問文案を `docs/ai-development/work-log.md`、関連 Issue、必要に応じて `docs/ai-development/requirements.md` に `回答待ち` として記録します。
- 回答後は、実装より先に該当する requirements / design / instruction / handover / work-log を更新します。

## 外部情報収集

対象リポジトリと親リポジトリで確認できる内容の代用として外部検索を使いません。公開仕様の確認が必要な場合だけ利用し、採用する場合は根拠と採用判断を記録します。

## 検証

基本検証コマンド:

```bash
npm run typecheck
npm test
npm run build
```

モバイル UI 変更時は README の `Mobile verification` 観点も確認します。

## スケジュール運用

12 本のスケジュールは親リポジトリでは将来導入候補です。`roulette` でも現時点では候補として扱い、有効化しません。

候補一覧:

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
3. 導入、無効化、または候補扱いにしたスケジュール
4. 未対応事項
5. 人間確認事項
6. 次アクション
7. 実行した検証コマンドと結果
