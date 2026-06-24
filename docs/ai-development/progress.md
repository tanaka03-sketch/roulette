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
| 既存要件正本 | `docs/requirements.md` が正本 |
| AI 運用入口 | `docs/ai-development/requirements.md` |
| 親フロー導入 | 完了。Issue -> Orchestrator -> Research -> Design Review -> Implementation -> Code Review -> Review Triage -> Fix Implementation -> Test & Quality -> Handover |
| GitHub Development Loop 導入 | 完了。Issue Intake / Implementation PR / Review Triage / CI Failure / Scheduled Maintenance |
| Gate 導入 | 完了。Spec Gate / Storage Conflict Guard |
| 目的ファイル | `docs/ai-development/goal.md` |
| 進捗ファイル | この文書 |
| メモリーロック手順 | 完了。ロック本体は ChatGPT 側メモリー `/workspace/memory/locks/roulette-schedule-lock.json` を使う |
| GitHub ファイルロック JSON | 廃止。`docs/ai-development/automation-lock.json` は削除済み |
| ChatGPT スケジュール | 旧 12 本は disabled / prompt なし。実装短周期 15 分、レビュー 1 時間、人間確認 / Slack 1 時間の 3 本を有効化済み |
| Slack 確認先 | `https://app.slack.com/client/T0B0KABNVNX/C0BCAL9FFSP` / `channel_id: C0BCAL9FFSP` |
| Slack 投稿方針 | 新しい判断材料があり人間回答が必要な時だけ投稿。通常報告、既知事項の再通知、問題なし報告は投稿しない |
| Slack 返信権限 | チャンネル内で回答できる人全員に方向性回答権限がある前提。権限境界は Slack チャンネル側で担保 |
| PR #52 Review Triage | 完了。merge as-is blocked と分類済み |
| PR #52 Slack 確認 | 完了。Slack 返信 `1` を close 方針として反映済み |
| PR #52 処理 | 完了。2026-06-24 12:42 JST に superseded として closed |

## 直近の実施内容

### 2026-06-24 12:37 JST 実装短周期サイクル

- ChatGPT 側メモリーロックを取得して作業した。
- 必読ファイルと親リポジトリの `README.md`、`playbooks/automated-development-flow.md`、`playbooks/github-development-loop.md`、`playbooks/spec-gate.md`、`playbooks/storage-conflict-guard.md` の必要箇所を確認した。
- Slack 投稿 `https://x-8oh3631.slack.com/archives/C0BCAL9FFSP/p1782258456427199` のスレッドで、2026-06-24 12:36 JST の返信 `1` を確認した。
- 返信 `1` を選択肢 1 の `close` として扱い、PR #52 は古い内容として閉じ、current `main` を正とする方針を確定した。
- `docs/ai-development/requirements.md` の回答待ちを解消し、回答済み確認ログへ移した。
- 専用ログ `docs/ai-development/logs/2026-06-24-1237-implementation-cycle.md` を追加した。
- PR #52 に close 判断コメントを追加し、PR #52 を closed にした。
- Slack 追加投稿は行っていない。既存質問への回答反映のみで、新しい判断材料や追加質問がなかったため。
- プロダクトコード、親リポジトリ、スケジュールは変更していない。

## 次にやる作業

1. 次回の実装短周期サイクルで、Implementation PR / CI Failure 候補を 1 件だけ選ぶ。
2. 選んだ候補について、Spec Gate と Storage Conflict Guard を確認する。
3. 設計確定済み、未確定事項なし、Open ブロッカーなし、小さく分解済み、検証方法明確、セキュリティ・権限・個人情報・入力検証の判断確定済み、レビュー指摘 triage 済みを満たす場合だけ実装へ進む。
4. 条件未達の場合は実装せず、停止理由と次に必要な判断を `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に残す。
5. 親リポジトリに adoption / templates パスが追加または移動された場合、`roulette` 側の文書とテンプレートを再確認する。
6. 旧 12 ジョブ名が active schedule や開発サイクルとして復活していないか、定期的に検索して確認する。

## Open Blockers

現時点ではありません。

## 回答待ち

現時点ではありません。

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
