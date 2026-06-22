# AI 開発運用 Progress

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-22
- 最終更新日: 2026-06-22
- ステータス: Active

## 目的

この文書は、定期実行ジョブが「何をやったか」「どこまで進んだか」「次に何をやるか」を短く確認するための進捗ファイルです。詳細な履歴は `docs/ai-development/work-log.md` に残し、この文書は現在地を把握する入口として使います。

## 現在地

| 項目 | 状態 |
| --- | --- |
| AI 開発運用の基本導入 | 完了 |
| 既存要件正本の確認 | 完了。正本は `docs/requirements.md` |
| AI 運用入口 | 完了。`docs/ai-development/requirements.md` |
| ジョブ別指示 | 完了。`docs/ai-development/job-instructions/` |
| 最終目標ファイル | 完了。`docs/ai-development/goal.md` |
| 進捗ファイル | 完了。この文書 |
| 疑似ロック運用 | 完了。`docs/ai-development/automation-lock.md` と `docs/ai-development/automation-lock.json` |
| ChatGPT スケジュール | 未登録から登録作業中。登録結果は作業完了時に報告する |

## 2026-06-22 に実施した作業

- 既存の `README.md`、`CONTRIBUTING.md`、`docs/requirements.md`、`docs/implementation-tasks.md`、文書カタログ、既存 AI 開発運用文書を確認した。
- 親リポジトリ `tanaka03-sketch/ai-development-operations` の README を参照した。
- 親リポジトリの指定テンプレートパスの一部は 404 だったため、README 方針と対象リポジトリ既存文書を優先した。
- インターネット検索で、AI エージェント運用、評価、tracing、GitHub Actions concurrency の公開情報を確認した。
- 自律開発運用の目的を `docs/ai-development/goal.md` に追加した。
- 進捗確認用のこの文書を追加した。
- GitHub ファイルを使った疑似ロック方式を `docs/ai-development/automation-lock.md` に追加し、状態ファイル `docs/ai-development/automation-lock.json` を用意した。

## 次にやる作業

1. `AGENTS.md` と `docs/ai-development/agent-instructions.md` に、`goal.md`、`progress.md`、`automation-lock.md` / `automation-lock.json` を必読として追加する。
2. 12 本のスケジュールを `Asia/Tokyo` で登録し、各プロンプトに疑似ロック取得、目的・進捗読み込み、停止条件、報告形式を含める。
3. 初回の定期実行結果を見て、ロック運用が長すぎる作業を適切にスキップできているか確認する。
4. 外部情報を追加で採用する場合は、根拠 URL と採用判断を `goal.md` または `work-log.md` に残す。

## Open Blockers

現時点で、この運用整備に対する Open ブロッカーはありません。

## 回答待ち

現時点の回答待ちはありません。

## スケジュール実行時の読み込み順

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/ai-development/goal.md`
4. `docs/ai-development/progress.md`
5. `docs/ai-development/automation-lock.md`
6. `docs/ai-development/automation-lock.json`
7. `docs/requirements.md`
8. `docs/ai-development/requirements.md`
9. `docs/ai-development/work-log.md`
10. `docs/ai-development/job-instructions/{job}.md`
11. 関連 Issue / PR / handover

## 更新ルール

- 各ジョブは、作業終了時にこの文書の「現在地」「次にやる作業」を必要に応じて更新する。
- 詳細な作業履歴、停止理由、検証結果は `docs/ai-development/work-log.md` に記録する。
- 仕様判断はこの文書に確定事項として書かず、`docs/requirements.md` または `docs/ai-development/requirements.md` のどちらが適切か判断する。
