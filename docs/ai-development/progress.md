# AI 開発運用 Progress

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-22
- 最終更新日: 2026-06-23
- ステータス: Active

## 目的

この文書は、AI 開発運用で「何をやったか」「どこまで進んだか」「次に何をやるか」を短く確認するための進捗ファイルです。詳細な履歴は `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に残し、この文書は現在地を把握する入口として使います。

## 現在地

| 項目 | 状態 |
| --- | --- |
| AI 開発運用の基本導入 | 完了 |
| 既存要件正本の確認 | 完了。正本は `docs/requirements.md` |
| AI 運用入口 | 完了。`docs/ai-development/requirements.md` |
| 親フロー導入 | 完了。Issue -> Orchestrator -> Research -> Design Review -> Implementation -> Code Review -> Review Triage -> Fix Implementation -> Test & Quality -> Handover |
| GitHub Development Loop 導入 | 完了。Issue Intake / Implementation PR / Review Triage / CI Failure / Scheduled Maintenance |
| Gate 導入 | 完了。Spec Gate / Storage Conflict Guard |
| 目的ファイル | 完了。`docs/ai-development/goal.md` |
| 進捗ファイル | 完了。この文書 |
| メモリーロック手順 | 完了。ロック本体は ChatGPT 側メモリーを使う |
| GitHub ファイルロック JSON | 廃止。`docs/ai-development/automation-lock.json` は削除対象 |
| ChatGPT スケジュール | 旧 12 本は無効化済み。親方針上、使う場合は単一タスク処理スケジュールのみ |

## 2026-06-22 に実施した作業

- 既存の `README.md`、`CONTRIBUTING.md`、`docs/requirements.md`、`docs/implementation-tasks.md`、文書カタログ、既存 AI 開発運用文書を確認した。
- 親リポジトリ `tanaka03-sketch/ai-development-operations` の README を参照した。
- 自律開発運用の目的を `docs/ai-development/goal.md` に追加した。
- 進捗確認用のこの文書を追加した。
- 疑似ロック手順を `docs/ai-development/automation-lock.md` に追加した。
- `AGENTS.md` と `docs/ai-development/agent-instructions.md` に、目的、進捗、疑似ロックの読み込み順と運用ルールを反映した。

## 2026-06-23 に実施した作業

- 更新後の親 README、`playbooks/automated-development-flow.md`、`playbooks/github-development-loop.md`、`playbooks/review-finding-triage.md`、`playbooks/spec-gate.md`、`playbooks/storage-conflict-guard.md`、`operations/scheduled-run-lock.md`、GitHub Issue / PR テンプレートを確認した。
- 指定されていた adoption / `templates/ai-development/` / `templates/requirements/` 配下は 404 のため、現行の親 README / playbooks / operations / GitHub templates を優先した。
- `AGENTS.md`、`docs/ai-development/agent-instructions.md`、`docs/ai-development/goal.md`、`docs/ai-development/automation-lock.md` を親方針に合わせた。
- 旧 12 本の ChatGPT スケジュールは無効化し、プロンプトを削除済み。
- GitHub ファイルロックをロック本体とする記述を撤廃し、ChatGPT 側メモリーロックを使う親方針へ合わせた。
- 開発サイクルに親リポジトリにない要素が混じらないかを再チェックし、開発サイクルとして残すものを親フロー、5 つの GitHub Development Loop、Spec Gate、Storage Conflict Guard に限定した。

## 次にやる作業

1. 親リポジトリに adoption / templates パスが追加または移動された場合、`roulette` 側の文書とテンプレートを再確認する。
2. 旧 12 ジョブ名が運用文書に残っていないか、定期的に検索して確認する。
3. スケジュールを登録する場合は、旧 12 本ではなく単一タスク処理スケジュールだけを登録する。
4. 実装ジョブが対象 Issue を見つけた場合でも、Spec Gate と Storage Conflict Guard を満たさない限り実装しない運用が守られているか確認する。

## Open Blockers

現時点で、この運用整備に対する Open ブロッカーはありません。

## 回答待ち

現時点の回答待ちはありません。

## 読み込み順

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/requirements.md`
4. `docs/ai-development/requirements.md`
5. `docs/ai-development/progress.md`
6. `docs/ai-development/work-log.md`
7. 関連 Issue / PR / handover
8. 選んだ作業に対応する親 playbook

運用レビューやスケジュール準備では、必要に応じて次も読む。

- `docs/ai-development/goal.md`
- `docs/ai-development/automation-lock.md`

## 更新ルール

- 各サイクルは、作業終了時にこの文書の「現在地」「次にやる作業」を必要に応じて更新する。
- 詳細な作業履歴、停止理由、検証結果は `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に記録する。
- 仕様判断はこの文書に確定事項として書かず、`docs/requirements.md` または `docs/ai-development/requirements.md` のどちらが適切か判断する。
