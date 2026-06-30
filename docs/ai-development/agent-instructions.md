# AI 開発運用 共通指示

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 親リポジトリ: `tanaka03-sketch/ai-development-operations`
- 最終更新日: 2026-06-30
- ステータス: Active

## 参照元

親リポジトリ `tanaka03-sketch/ai-development-operations` の README と playbook 方針を参照します。親リポジトリは読み取り専用で扱い、Issue 作成、PR 作成、ブランチ作成、ファイル更新は行いません。

優先して参照する親リポジトリ資料:

- `README.md`
- `playbooks/automated-development-flow.md`
- `playbooks/github-development-loop.md`
- `playbooks/minimal-implementation-review.md`
- `playbooks/review-finding-triage.md`
- `playbooks/spec-gate.md`
- `playbooks/storage-conflict-guard.md`
- `playbooks/completion-scorecard.md`
- `playbooks/service-publication-review.md`
- `operations/scheduled-run-lock.md`
- `operations/repository-decision-queue.md`
- `templates/github-issue/ai-development-task.md`
- `templates/github-issue/human-decision.md`
- `templates/github-issue/review-finding.md`
- `templates/github-pr/pull-request-template.md`
- `templates/repository-decision-queue/agent-decisions.yml`

旧指定の `adoption/` や `templates/ai-development/` 配下が見つからない場合は、不足として `work-log` または `logs` に記録し、現在の親 README / playbook / template と `roulette` の既存正本を優先します。親リポジトリにない運用仕様は、`roulette` 側の開発サイクルへ独自ループとして追加しません。

## 必読順序

通常作業では次の順で読みます。

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/requirements.md`
4. `docs/ai-development/requirements.md`
5. `docs/ai-development/goal.md`
6. `docs/ai-development/completion-scorecard.md`
7. `docs/ai-development/progress.md`
8. `docs/ai-development/work-log.md` または関連 `docs/ai-development/logs/`
9. 関連 Issue / PR / handover / design notes
10. 選んだ作業に対応する親 playbook

スケジュールまたは自動運用では、必要に応じて `docs/ai-development/automation-lock.md` も読みます。

## 正本と役割分担

| 種別 | 正本または集約先 |
| --- | --- |
| プロダクト要件、受入条件、仕様判断 | `docs/requirements.md` |
| 実装タスクの全体像 | `docs/implementation-tasks.md` |
| 文書分類 | `docs/requirements/document-catalog-2026-05-18.md` |
| AI 開発運用の目的 | `docs/ai-development/goal.md` |
| AI ジョブ運用の未確定事項、Slack 確認ログ | `docs/ai-development/requirements.md` |
| 進捗、現在地、次アクション | `docs/ai-development/progress.md` |
| 作業ログ、停止理由、検証結果 | `docs/ai-development/work-log.md` または `docs/ai-development/logs/` |
| completion score、公開可否、運用適性 | `docs/ai-development/completion-scorecard.md`、関連 Issue / PR、または `logs` |
| GitHub 上の人間判断キュー | `.github/agent-decisions.yml` と `needs-human-decision` Issue |

既存の文書カタログ、README、CONTRIBUTING と矛盾する変更は行いません。大量の文書移動や削除が必要な場合は、その場で実施せず Issue 候補にします。

## 親方針に合わせた開発サイクル

親 README、`playbooks/automated-development-flow.md`、`playbooks/github-development-loop.md`、`operations/scheduled-run-lock.md` に合わせ、開発サイクルは次だけを使います。

親フロー:

1. Issue Intake
2. Orchestrator
3. Research
4. Design Review
5. Human Decision when needed
6. Implementation
7. Code Review
8. Review Triage
9. Fix Implementation
10. Test & Quality
11. Completion Review
12. Handover

GitHub Development Loop:

- Issue Intake
- Implementation PR
- Review Triage
- CI Failure
- Scheduled Maintenance

Gate / Review:

- Spec Gate
- Storage Conflict Guard
- Minimal Implementation Review
- Completion Scorecard
- Service Publication Review
- Repository Decision Queue

レビュー、triage、設計修正、実装、検証、人間確認、Slack 対応、completion scoring は、親フロー、GitHub Development Loop、gate、review playbook の中で扱います。旧 12 本の個別スケジュール名を開発サイクルとして復活させません。

## Minimal Implementation Review

実装、依存追加、抽象化、設定追加、workflow 変更、文書体系変更の前に、必要に応じて `playbooks/minimal-implementation-review.md` の考え方を使います。

記録する項目:

- 作らない選択肢
- 既存で流用できるもの
- 標準機能 / ネイティブ機能で済むもの
- 新規依存の追加有無と理由
- 最小実装方針
- 削らない品質要件
- 意図的な簡略化がある場合の `minimal-debt:` と見直し条件

Minimalism Review Findings は通常のレビュー指摘と同じく triage してから実装へ戻します。

## Completion Scorecard 運用

開発中のものは、目的に対して何点かを 100 点満点で記録します。親 `playbooks/completion-scorecard.md` の配点を標準とし、`roulette` 側の `docs/ai-development/completion-scorecard.md` でローカル運用に合わせて記録します。

必ず記録する項目:

- 総合点 0-100 または `scoring blocked`
- 公開可否: 目的に対して公開して大丈夫か
- 運用適性: 現在の AI 開発運用で継続運用できるか
- 100 点に足りない理由
- 次に 1 つだけ進める改善
- 人間承認が必要な事項

判定の目安:

| 点数 | 判定 | 扱い |
| --- | --- | --- |
| 90-100 | publish-ready / operation-ready | 親 scorecard 上の公開・運用候補。ただし人間承認条件は別途満たす |
| 80-89 | limited-ready | 限定的に進められるが、不足を Issue / PR / log に残す |
| 60-79 | needs-fix | 公開・merge readiness 扱いにしない。改善または triage が必要 |
| 0-59 | blocked | 実装や公開判断を止め、停止理由と次アクションを記録 |
| scoring blocked | 採点不可 | 目的、受入条件、対象出力、検証方法のどれが不足しているかを記録し、実装へ進まない |

`roulette` では 95 点未満を自律運用上の完全完了として扱いません。

## Service Publication Review

公開可否を詳しく見る必要がある場合は、親 `playbooks/service-publication-review.md` を使います。

`roulette` では特に次を確認します。

- README の公開利用時の注意と矛盾しない
- 単一ユーザー、認証なし、サーバー保存なし、外部 API なし、`localStorage` 保存の前提を崩していない
- 個人情報、社内情報、未公開情報を保存する用途として誤解させない
- 入力検証、XSS、長い候補名、同名候補識別、モバイル表示の確認観点がある
- 公開、本番運用 readiness、CAB の最終判断は人間承認へ戻す

## Repository Decision Queue

GitHub に耐久的な人間判断を残す必要がある場合は、親 `operations/repository-decision-queue.md` に従います。

- 固定ファイル: `.github/agent-decisions.yml`
- 必須ラベル: `needs-human-decision`
- 判断後ラベル: `ready-for-automation`
- Issue タイトル: `Decision: <Decision ID> <短い件名>`
- Issue テンプレート: `.github/ISSUE_TEMPLATE/human-decision.md`

Slack だけを正式判断履歴にしません。Slack で方向性が決まった場合も、必要な文書、Issue、PR、または `.github/agent-decisions.yml` に反映してから実装へ進みます。

## スケジュール運用

ユーザー承認済みの ChatGPT scheduled run は、実装を進める短周期サイクル、レビューを行う 1 時間サイクル、人間確認と Slack を扱う 1 時間サイクルの 3 本です。どれも親リポジトリに存在する loop / gate / review だけを使い、旧 12 本の個別スケジュールは開発サイクルとして扱いません。

共通手順:

1. ChatGPT 側メモリーのロックを確認する。
2. ロック取得後、`docs/ai-development/progress.md` の「次にやる作業」から、そのサイクルで扱える最優先タスクを 1 件だけ選ぶ。
3. 親 playbook に沿って、許可された loop / gate / review のいずれかに分類する。
4. その loop / gate / review で許可された最小単位だけ実行する。
5. 不明点が設計、実装、検証、公開可否、運用適性に影響する場合は Slack 不明点確認ループ、または Repository Decision Queue を使う。
6. 結果、停止理由、検証、completion score または scoring blocker、次アクションを `progress.md` と `work-log.md` / `logs` に残す。
7. ロックを解放する。

## ロック運用

親リポジトリの `operations/scheduled-run-lock.md` に合わせ、ロック本体は ChatGPT 側メモリーに置きます。GitHub 側ファイルをロック判定元にしません。

推奨ロック: `/workspace/memory/locks/roulette-schedule-lock.json`

3 本の active schedule は同じロックを共有します。ロック取得、進捗更新、ロック解放のいずれかに失敗した場合は追加変更を行いません。

## 停止条件

次の条件では変更を進めず、停止理由と次アクションを `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に記録します。

- Open ブロッカーがある。
- Issue が大きすぎる、または小さく分解されていない。
- 設計が未確定。
- Slack または人間回答待ちが残っている。
- 検証方法が不明確。
- セキュリティ、権限、個人情報、入力検証、公開可否、運用適性の判断が未確定。
- レビュー指摘または Minimalism Finding が triage されていない。
- Completion score を採点できる目的、受入条件、対象出力が不明確。
- 未承認のスケジュール登録、PR 作成、プロダクトコード変更、本番操作、公開最終判断、破壊的変更、権限変更、データ移行が必要。
- stale snapshot または duplicate operation の疑いがある。

## Slack 不明点確認ループ

不明点が実装判断、設計判断、検証判断、公開可否、運用適性に影響する場合は推測しません。

- Slack 確認先は `https://app.slack.com/client/T0B0KABNVNX/C0BCAL9FFSP`（`channel_id: C0BCAL9FFSP`）です。
- Slack 投稿は、新しい判断材料があり、設計・実装・検証・公開可否・運用判断を進めるために人間回答が必要な時だけ行います。
- 毎時サイクルの通常報告、進捗確認、既知事項の再通知、単なる問題なし報告は Slack に投稿せず、ChatGPT 内報告と `docs/ai-development/progress.md` / `docs/ai-development/work-log.md` / `docs/ai-development/logs/` の記録を中心にします。
- Slack 投稿環境があり、かつ投稿条件を満たす場合は、`C0BCAL9FFSP` に日本語で 1 回につき 1 問だけ投稿します。
- Slack の質問には、相手が選択肢で回答できるように、簡潔な番号付きまたはラベル付きの選択肢を必ず添えます。選択肢だけで判断を覆いきれない場合は、自由記述 / その他の選択肢も含めます。
- Slack で方向性を決める返信権限はチャンネル側の参加・投稿権限で担保されます。チャンネル内で回答できる人全員にある前提で扱い、特定個人だけの回答を必須にしません。
- Slack 投稿環境がない場合、投稿に失敗した場合、または投稿条件を満たさない場合は、質問文案や判断候補を `docs/ai-development/work-log.md`、関連 Issue、必要に応じて `docs/ai-development/requirements.md` に `回答待ち` または `ChatGPT 内確認事項` として記録します。
- 回答後は、実装より先に該当する requirements / design / instruction / handover / completion-scorecard / progress / work-log を更新します。

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
4. Completion score と公開可否 / 運用適性の判定
5. 未対応事項
6. 人間確認事項
7. 次アクション
8. 実行した検証コマンドと結果
