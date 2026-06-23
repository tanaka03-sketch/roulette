# AI 開発運用 Progress

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-22
- 最終更新日: 2026-06-24
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
| GitHub ファイルロック JSON | 廃止。`docs/ai-development/automation-lock.json` は削除済み |
| ChatGPT スケジュール | 旧 12 本は disabled / prompt なし。実装短周期 15 分、レビュー 1 時間、人間確認 / Slack 1 時間の 3 本を有効化済み |
| Slack 確認先 | `https://app.slack.com/client/T0B0KABNVNX/C0BCAL9FFSP` / `channel_id: C0BCAL9FFSP` |
| Slack 投稿方針 | 新しい判断材料があり人間回答が必要な時だけ投稿。毎時サイクルは通常 ChatGPT 内報告と記録中心 |
| Slack 返信権限 | チャンネル内で回答できる人全員に方向性回答権限がある前提。権限境界は Slack チャンネル側で担保 |
| レビュー 1 時間サイクル初回確認 | 完了。PR #52 を Review Triage / Spec Gate / Storage Conflict Guard で分類し、merge as-is blocked として記録済み |

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
- `/workspace/memory/locks/roulette-schedule-lock.json` を unlocked 状態へ更新した。
- `docs/ai-development/automation-lock.json` を削除した。
- 単一タスク処理スケジュールを `Asia/Tokyo`、毎時 00 分で登録し、有効化した。
- スケジュール一覧で旧 12 本が disabled / prompt なし、新しい 1 本だけが enabled であることを確認した。
- ユーザー指示により、単一タスク処理スケジュールを 2 本へ分離した。
- 実装を進めるサイクルは、ChatGPT スケジュールの最短許容間隔である 15 分ごとに有効化した。
- レビューと人間確認のサイクルは、1 時間ごとに有効化した。
- ユーザー指示により、レビューと人間確認 / Slack をさらに分離し、active schedule を 3 本にした。
- レビューサイクルは 1 時間ごとに有効化し、レビュー分類と記録に集中する運用へ変更した。
- 人間確認 / Slack サイクルは 1 時間ごとに有効化し、人間承認事項、Slack 確認、回答待ち、回答反映を扱う運用へ追加した。
- 3 本の active schedule は同じメモリーロック `/workspace/memory/locks/roulette-schedule-lock.json` を共有する運用へ整理した。
- Slack 不明点確認は `AGENTS.md` と `docs/ai-development/agent-instructions.md` のルールを使い、Slack 投稿可能時は 1 投稿 1 質問、不可または送信先不明の場合は `回答待ち` として記録する方針を明記した。
- Slack 確認先を `https://app.slack.com/client/T0B0KABNVNX/C0BCAL9FFSP` / `channel_id: C0BCAL9FFSP` に固定し、3 本の active schedule と運用指示へ反映した。

## 2026-06-24 に実施した作業

- レビュー 1 時間サイクルで、メモリーロック取得、1 タスク選択、Review Triage / Spec Gate / Storage Conflict Guard 分類、記録、ロック解放の流れを確認した。
- 選択対象は PR #52 `docs: switch schedule lock to ChatGPT memory` のみ。複数タスクは扱っていない。
- PR #52 は current `main` より古い運用記述を含み、merge as-is は `blocked` と分類した。
- PR #52 に append-only コメントで operation ID と finding fingerprint 付きのレビュー分類を記録した。
- 人間確認 / Slack サイクルへ、PR #52 を close / rebase / other のどれで扱うかという質問案を渡した。レビューサイクルでは Slack 送信していない。
- ユーザー指示により、Slack 投稿を「新しい判断材料があり、人間回答なしでは設計・実装・検証・運用判断を進められない時だけ」に限定した。
- 毎時サイクルの通常報告、進捗確認、既知事項の再通知、単なる問題なし報告は Slack ではなく ChatGPT 内報告と `progress` / `work-log` 記録中心にする方針へ変更した。
- Slack で方向性を決める返信権限は、チャンネル側の参加・投稿権限で担保されるものとして扱い、チャンネル内で回答できる人全員にある前提へ変更した。
- 実装短周期、レビュー、人間確認 / Slack の 3 本の active schedule prompt をこの方針へ更新した。
- `AGENTS.md`、`docs/ai-development/agent-instructions.md`、`docs/ai-development/requirements.md` に同じ方針を反映した。

## 次にやる作業

1. 人間確認 / Slack 1 時間サイクルで、PR #52 を `close` / `rebase` / `other` のどれで扱うか確認する。これは新しい判断材料が必要なため Slack 投稿対象になり得る。
2. 初回の実装短周期サイクルで、メモリーロック取得、1 タスク選択、progress / work-log 更新、ロック解放が通るか確認する。
3. 初回の人間確認 / Slack 1 時間サイクルで、Slack 投稿条件を満たす新しい判断材料がある場合だけ `C0BCAL9FFSP` へ投稿し、それ以外は ChatGPT 内報告と記録に留められるか確認する。
4. 親リポジトリに adoption / templates パスが追加または移動された場合、`roulette` 側の文書とテンプレートを再確認する。
5. 旧 12 ジョブ名が active schedule や開発サイクルとして復活していないか、定期的に検索して確認する。
6. 実装ジョブが対象 Issue を見つけた場合でも、Spec Gate と Storage Conflict Guard を満たさない限り実装しない運用が守られているか確認する。

## Open Blockers

PR #52 は current `main` と差分がずれており、このまま merge すると古いスケジュール記述や旧ロックファイル扱いが戻る可能性があるため、merge as-is は blocked とする。

## 回答待ち

- PR #52 を close / rebase / other のどれで扱うか。人間確認 / Slack サイクルで確認する。Slack で回答する場合、チャンネル内で回答できる人全員に方向性回答権限がある前提で扱う。

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
