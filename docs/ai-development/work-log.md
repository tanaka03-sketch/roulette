# AI 開発運用 Work Log

## 2026-06-19 AI 開発運用導入

- ジョブ種別: 導入 / 文書体系整備 / スケジュール準備
- 対象リポジトリ: `tanaka03-sketch/roulette`
- 親リポジトリ: `tanaka03-sketch/ai-development-operations`

### 参照した既存正本

- `README.md`
- `CONTRIBUTING.md`
- `docs/requirements.md`
- `docs/implementation-tasks.md`
- `docs/requirements/document-catalog-2026-05-18.md`
- `.github/PULL_REQUEST_TEMPLATE.md`

### 参照した親リポジトリ資料

- `README.md`

次の指定パスは取得できませんでした。見つかった README 方針と対象リポジトリの既存正本を優先して導入しました。

- `adoption/child-repository-contract.md`
- `adoption/agent-development-procedure-setup.md`
- `templates/requirements/requirements-definition.md`
- `templates/ai-development/agent-instructions.md`
- `templates/ai-development/work-log.md`
- `templates/ai-development/job-instructions/*.md`

### 実施内容

- `AGENTS.md` を追加し、必読順序、正本、停止条件、人間承認、禁止操作、検証コマンドを明文化。
- `docs/ai-development/` 配下に AI 開発運用入口、共通指示、作業ログ、ジョブ別指示を追加。
- PR テンプレートと Issue テンプレートを AI 開発運用に合わせて更新・追加。
- 定期実行 12 本を `Asia/Tokyo` で登録する前提を文書化。

### Open Blockers

現時点ではありません。

### 回答待ち

現時点ではありません。

### 検証

文書・テンプレート導入のみのため、コード検証は未実行です。

- `npm run typecheck`: 未実行（コード変更なし）
- `npm test`: 未実行（コード変更なし）
- `npm run build`: 未実行（コード変更なし）

### 次アクション

- 導入 PR を確認し、問題なければ merge する。
- 定期実行結果を見ながら、必要ならジョブ別指示を roulette の実運用に合わせて調整する。

## 2026-06-19 導入後 CI ブロッカー対応

- ジョブ種別: 検証 / 実装フォローアップ
- 対象 PR: `#50`
- 対象ブランチ: `codex/fix-ai-operation-ci`

### 背景

AI 開発運用導入 PR `#49` の merge 後、GitHub Actions の `typecheck`、`test`、`build` が失敗していることを確認しました。導入した文書・テンプレート自体はコード変更を含みませんが、定期検証ジョブを運用するには CI の既存失敗が Open blocker になるため、フォローアップ修正を作成しました。

### 確認した失敗

- `npm run typecheck`: `src/domain/roulette.ts`、`src/domain/roulette.test.ts`、`src/ui/useRouletteApp.ts`、`vite.config.ts` の型エラー。
- `npm test`: `localStorage` ブロック系 mock の後片付け順序、fake timer 利用テストの timeout、UI 文言期待のずれ。
- `npm run build`: typecheck と同じ型エラー。

### 実施内容

- `pickRandomCandidate` の空配列チェック後の index 参照を型安全に補強。
- `roulette.test.ts` の配列 index 参照を型安全に補強。
- `useRouletteApp.ts` の抽選完了処理を React state updater の副作用に依存しない形へ修正。
- `vite.config.ts` を Vitest の `defineConfig` に変更。
- `rouletteStorage.test.ts` の mock 後片付け順序を修正。
- `RouletteApp.test.tsx` の storage error 期待、抽選完了待ち、候補状態の検証範囲を安定化。

### 検証

GitHub connector 経由で修正したため、ローカル clone はネットワーク制限で実行できませんでした。GitHub Actions run `159` で次を確認しました。

- `npm run typecheck`: 成功
- `npm test`: 成功
- `npm run build`: 成功

### Open Blockers

現時点ではありません。

### 次アクション

- PR `#50` を merge する。
- 定期実行結果を見ながら、新しい Open blocker が出た場合は triage ジョブで記録・分類する。

## 2026-06-22 自律開発の目的・進捗・疑似ロック導入

- ジョブ種別: 導入 / スケジュール運用整備 / 外部情報確認
- 対象リポジトリ: `tanaka03-sketch/roulette`
- 親リポジトリ: `tanaka03-sketch/ai-development-operations`

### 参照した既存正本

- `README.md`
- `CONTRIBUTING.md`
- `docs/requirements.md`
- `docs/implementation-tasks.md`
- `docs/requirements/document-catalog-2026-05-18.md`
- `AGENTS.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `docs/ai-development/agent-instructions.md`
- `docs/ai-development/requirements.md`
- `docs/ai-development/work-log.md`
- `docs/ai-development/job-instructions/implementation.md`
- `docs/ai-development/job-instructions/verification.md`

### 参照した親リポジトリ資料

- `README.md`

次の指定パスは今回も取得できませんでした。見つかった README 方針と対象リポジトリの既存正本を優先しました。

- `adoption/child-repository-contract.md`
- `adoption/agent-development-procedure-setup.md`
- `templates/requirements/requirements-definition.md`
- `templates/ai-development/agent-instructions.md`
- `templates/ai-development/work-log.md`
- `templates/ai-development/job-instructions/implementation.md`

### 外部情報確認

- OpenAI Agents SDK tracing: https://openai.github.io/openai-agents-python/tracing/
- OpenAI Agents orchestration: https://developers.openai.com/api/docs/guides/agents/orchestration
- Anthropic Building Effective Agents: https://www.anthropic.com/research/building-effective-agents
- Anthropic agent evals: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- GitHub Actions concurrency: https://docs.github.com/en/actions/concepts/workflows-and-actions/concurrency

採用判断: 複雑な自動化を増やすより、目的、進捗、停止条件、疑似ロック、評価・検証結果を明文化して、定期実行が小さく安全に進む運用へ反映しました。

### 実施内容

- `docs/ai-development/goal.md` を追加し、自律開発の最終目標、外部情報収集方針、成功条件を定義。
- `docs/ai-development/progress.md` を追加し、実施済み作業、現在地、次アクションを整理。
- `docs/ai-development/automation-lock.md` を追加し、GitHub ファイルを使った疑似ロック取得・解放・期限切れ処理を定義。
- `docs/ai-development/automation-lock.json` を追加し、初期状態を unlocked として保存。
- `AGENTS.md` と `docs/ai-development/agent-instructions.md` を更新し、目的、進捗、疑似ロックを必読順序とスケジュール運用へ追加。
- ChatGPT スケジュール 12 本を `Asia/Tokyo` で登録。

### 登録したスケジュール

- 毎時 00 分: 文書体系レビュー
- 毎時 05 分: Issue 分解・作業管理レビュー
- 毎時 10 分: 設計・実装方針レビュー
- 毎時 15 分: テスト観点レビュー
- 毎時 20 分: セキュリティ・権限レビュー
- 毎時 25 分: CAB / 変更審査レビュー
- 毎時 30 分: 本番運用 readiness レビュー
- 毎時 35 分: 統合レビュー
- 毎時 40 分: Issue / Finding Triage
- 毎時 45 分: 要件・設計修正
- 毎時 50 分: 実装
- 毎時 55 分: 検証

### Open Blockers

現時点ではありません。

### 回答待ち

現時点ではありません。

### 検証

文書・スケジュール運用整備のみのため、コード検証は未実行です。

- `npm run typecheck`: 未実行（コード変更なし）
- `npm test`: 未実行（コード変更なし）
- `npm run build`: 未実行（コード変更なし）

### 次アクション

- 初回の定期実行結果を確認し、疑似ロックが後続ジョブを安全に停止または通過させるか確認する。
- スケジュール出力が過剰な場合は、各プロンプトを短く調整する。
- ロック期限 45 分が長すぎる、または短すぎる場合は `docs/ai-development/automation-lock.md` を更新する。

## 2026-06-22 人間判断による GitHub 管理 Issue クローズ

- ジョブ種別: Issue / Finding Triage / 人間判断反映
- 対象 Issue: `#20`, `#22`, `#25`
- ユーザー回答: `1. 管理画面対応は完了済みとして、#20・#22・#25 をクローズ候補に進める`

### 背景

Open Issue のうち、GitHub 管理画面でしか完了確認できない `main` ブランチ保護、PR 必須ルール、ラベル体系、管理画面最終反映について、人間判断が必要でした。

### 実施内容

- `#20` に判断ログをコメントし、completed としてクローズ。
- `#22` に判断ログをコメントし、completed としてクローズ。
- `#25` に判断ログをコメントし、completed としてクローズ。
- `docs/ai-development/job-instructions/triage.md` に、人間判断を 1 問ずつ番号付き選択肢で確認し、回答後に GitHub へ反映するプロトコルを追加。
- `docs/ai-development/requirements.md` に、人間判断の扱いを追加。

### Open Blockers

現時点ではありません。

### 回答待ち

現時点ではありません。

### 検証

文書更新と Issue 操作のみのため、コード検証は未実行です。

- `npm run typecheck`: 未実行（コード変更なし）
- `npm test`: 未実行（コード変更なし）
- `npm run build`: 未実行（コード変更なし）

### 次アクション

- 残り Open Issue を、実装済みクローズ候補、追加実装候補、人間判断待ちに再分類する。
- 次の人間判断が必要な論点は、1 問ずつ番号付きで確認する。

## 2026-06-23 実装短周期 / レビュー・人間確認 1 時間サイクル化

- ジョブ種別: スケジュール運用変更 / 文書更新
- 対象リポジトリ: `tanaka03-sketch/roulette`
- 親リポジトリ: `tanaka03-sketch/ai-development-operations`

### 実施内容

- 実装を進めるサイクルを、ChatGPT スケジュールで利用できる最短間隔の 15 分ごとに有効化。
- レビューと人間確認のサイクルを、1 時間ごとに有効化。
- 旧 12 本のスケジュールは disabled / prompt なしのまま維持。
- 2 本の active schedule が同じ ChatGPT 側メモリーロック `/workspace/memory/locks/roulette-schedule-lock.json` を共有するように文書化。
- Slack 不明点確認は `AGENTS.md` と `docs/ai-development/agent-instructions.md` のルールを使い、Slack 投稿環境がある場合は 1 投稿 1 質問、ない場合は `回答待ち` として記録する方針を明記。
- `AGENTS.md`、`docs/ai-development/agent-instructions.md`、`docs/ai-development/progress.md`、`docs/ai-development/automation-lock.md`、`docs/ai-development/logs/2026-06.md` を更新。

### 登録状態

- 有効: 実装短周期サイクル、15 分ごと、`Asia/Tokyo`。
- 有効: レビュー・人間確認サイクル、1 時間ごと、`Asia/Tokyo`。
- 無効: 旧 12 本スケジュール、すべて disabled / prompt なし。

### Open Blockers

現時点ではありません。

### 回答待ち

現時点ではありません。

### 検証

文書・スケジュール運用変更のみのため、コード検証は未実行です。

- `npm run typecheck`: 未実行（コード変更なし）
- `npm test`: 未実行（コード変更なし）
- `npm run build`: 未実行（コード変更なし）

### 次アクション

- 初回の実装短周期サイクルで、ロック取得、1 タスク選択、停止条件、progress / work-log 更新、ロック解放が通るか確認する。
- 初回のレビュー・人間確認サイクルで、Slack / 人間確認事項が実装へ流れず記録されるか確認する。
