# AI 開発運用 共通指示

## 参照元

親リポジトリ `tanaka03-sketch/ai-development-operations` の README と playbook 方針を参照します。親リポジトリは読み取り専用で扱い、Issue 作成、PR 作成、ブランチ作成、ファイル更新は行いません。

優先して参照する親リポジトリ資料:

- `README.md`
- `playbooks/automated-development-flow.md`
- `playbooks/github-development-loop.md`
- `playbooks/review-finding-triage.md`
- `playbooks/spec-gate.md`
- `playbooks/storage-conflict-guard.md`
- `operations/scheduled-run-lock.md`
- `templates/github-issue/ai-development-task.md`
- `templates/github-issue/review-finding.md`
- `templates/github-pr/pull-request-template.md`

指定された adoption / template パスが見つからない場合は、不足として `work-log` に記録し、見つかった親資料と `roulette` の既存正本を優先します。親リポジトリにない運用仕様は、`roulette` 側の開発サイクルへ追加しません。

## 作業対象

開発対象は `tanaka03-sketch/roulette` です。ユーザーが明示的に別リポジトリを指定しない限り、このリポジトリを対象にします。

## 必読順序

通常作業では次の順で読みます。

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/requirements.md`
4. `docs/ai-development/requirements.md`
5. `docs/ai-development/progress.md`
6. `docs/ai-development/work-log.md`
7. 関連 Issue / PR / handover / design notes
8. 選んだ作業に対応する親 playbook

スケジュールまたは自動運用では、必要に応じて次も読みます。

- `docs/ai-development/goal.md`
- `docs/ai-development/automation-lock.md`

## 仕様判断の扱い

- 仕様判断の正本は `docs/requirements.md` です。
- AI 開発運用の目的は `docs/ai-development/goal.md` に置きます。
- 作業進捗、現在地、次アクションは `docs/ai-development/progress.md` に置きます。
- AI ジョブ運用上の確認、未確定事項、Slack 確認ログは `docs/ai-development/requirements.md` と `docs/ai-development/work-log.md` に集約します。
- 既存の文書カタログ、README、CONTRIBUTING と矛盾する変更は行いません。
- 大量の文書移動や削除が必要な場合は、その場で実施せず Issue 候補にします。

## 親方針に合わせた開発サイクル

親 README、`playbooks/automated-development-flow.md`、`playbooks/github-development-loop.md`、`operations/scheduled-run-lock.md` に合わせ、開発サイクルは次だけを使います。

親フロー:

1. Issue
2. Orchestrator
3. Research
4. Design Review
5. Implementation
6. Code Review
7. Review Triage
8. Fix Implementation
9. Test & Quality
10. Handover

GitHub Development Loop:

- Issue Intake
- Implementation PR
- Review Triage
- CI Failure
- Scheduled Maintenance

Gate:

- Spec Gate
- Storage Conflict Guard

レビュー、triage、設計修正、実装、検証、人間確認、Slack 対応は、親フロー、GitHub Development Loop、gate の中で扱います。旧 12 本の個別スケジュール名を開発サイクルとして復活させません。

## スケジュール運用

ユーザー承認済みの ChatGPT scheduled run は、実装を進める短周期サイクル、レビューを行う 1 時間サイクル、人間確認と Slack を扱う 1 時間サイクルの 3 本です。どれも親リポジトリに存在する loop / gate だけを使い、旧 12 本の個別スケジュールは開発サイクルとして扱いません。

### 実装短周期サイクル

- 頻度: ChatGPT スケジュールで利用できる最短間隔。現時点では 15 分ごと。
- 対象: Implementation PR / CI Failure / Spec Gate / Storage Conflict Guard。
- 実装は、設計確定済み、未確定事項なし、Open ブロッカーなし、小さく分解済み、検証方法明確、レビュー指摘 triage 済みの場合だけ進める。

### レビュー 1 時間サイクル

- 頻度: 1 時間ごと。
- 対象: Code Review / Review Triage / Spec Gate / Storage Conflict Guard。
- レビュー指摘は must fix / should fix / question / out of scope / test only などへ分類し、そのまま実装へ流さない。
- 人間確認や Slack 確認が必要な事項は、人間確認 / Slack 1 時間サイクルへ渡す事項として記録する。

### 人間確認 / Slack 1 時間サイクル

- 頻度: 1 時間ごと。
- 対象: 人間承認事項、Slack 確認、回答待ち、回答反映、Issue Intake / Scheduled Maintenance / Spec Gate / Storage Conflict Guard の確認作業。
- Slack はこの文書の Slack 不明点確認ループを使う。投稿可能な場合は `C0BCAL9FFSP` に 1 投稿 1 質問で投稿し、投稿不可または投稿失敗の場合は `回答待ち` として記録する。
- CAB / production readiness の最終判断、本番操作、破壊的変更、権限変更、認証・認可・secret・個人情報に関わる変更は勝手に判断しない。

### 共通手順

1. ChatGPT 側メモリーのロックを確認する。
2. ロック取得後、`docs/ai-development/progress.md` の「次にやる作業」から、そのサイクルで扱える最優先タスクを 1 件だけ選ぶ。
3. 親 playbook に沿って、許可された loop / gate のいずれかに分類する。
4. その loop / gate で許可された最小単位だけ実行する。
5. 不明点が設計、実装、検証に影響する場合は、この文書の Slack 不明点確認ループを使う。
6. 結果、停止理由、検証、次アクションを `progress.md` と `work-log.md` に残す。
7. ロックを解放する。

## ロック運用

親リポジトリの `operations/scheduled-run-lock.md` に合わせ、ロック本体は ChatGPT 側メモリーに置きます。GitHub 側ファイルをロック判定元にしません。

推奨ロック: `/workspace/memory/locks/roulette-schedule-lock.json`

3 本の active schedule は同じロックを共有します。ロック取得、進捗更新、ロック解放のいずれかに失敗した場合は追加変更を行いません。

## 停止条件

次の条件では変更を進めず、停止理由と次アクションを `docs/ai-development/work-log.md` に記録します。

- Open ブロッカーがある。
- Issue が大きすぎる、または小さく分解されていない。
- 設計が未確定。
- Slack または人間回答待ちが残っている。
- 検証方法が不明確。
- セキュリティ、権限、個人情報、入力検証の判断が未確定。
- レビュー指摘が triage されていない。
- 未承認のスケジュール登録、PR 作成、プロダクトコード変更、本番操作、破壊的変更、権限変更、データ移行が必要。
- stale snapshot または duplicate operation の疑いがある。

## Slack 不明点確認ループ

不明点が実装判断、設計判断、検証判断に影響する場合は推測しません。

- Slack 確認先は `https://app.slack.com/client/T0B0KABNVNX/C0BCAL9FFSP`（`channel_id: C0BCAL9FFSP`）です。
- Slack 投稿環境がある場合は、`C0BCAL9FFSP` に 1 回につき 1 問だけ投稿します。
- Slack 投稿環境がない場合、または投稿に失敗した場合は、質問文案を `docs/ai-development/work-log.md`、関連 Issue、必要に応じて `docs/ai-development/requirements.md` に `回答待ち` として記録します。
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

## 報告形式

作業後は次を報告します。

1. 作成・更新・削除ファイル
2. 既存ファイルとの関係
3. 導入、無効化、または未登録のスケジュール
4. 未対応事項
5. 人間確認事項
6. 次アクション
7. 実行した検証コマンドと結果
