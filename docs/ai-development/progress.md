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
| ジョブ別指示 | 完了。`docs/ai-development/job-instructions/` |
| 目的ファイル | 完了。`docs/ai-development/goal.md` |
| 進捗ファイル | 完了。この文書 |
| 疑似ロック手順 | 親方針へ修正済み。ロック本体は ChatGPT 側メモリーを使う想定 |
| ChatGPT スケジュール | 12 本は将来候補。2026-06-23 に親方針へ合わせて無効化済み |

## 2026-06-22 に実施した作業

- 既存の `README.md`、`CONTRIBUTING.md`、`docs/requirements.md`、`docs/implementation-tasks.md`、文書カタログ、既存 AI 開発運用文書を確認した。
- 親リポジトリ `tanaka03-sketch/ai-development-operations` の README を参照した。
- 自律開発運用の目的を `docs/ai-development/goal.md` に追加した。
- 進捗確認用のこの文書を追加した。
- 疑似ロック手順を `docs/ai-development/automation-lock.md` に追加した。
- `AGENTS.md` と `docs/ai-development/agent-instructions.md` に、目的、進捗、疑似ロックの読み込み順と運用ルールを反映した。

## 2026-06-23 に実施した作業

- 更新後の親 README を確認し、親方針にない `roulette` 側の独自運用を撤廃した。
- 12 本の ChatGPT スケジュールを無効化した。
- `AGENTS.md`、`docs/ai-development/agent-instructions.md`、`docs/ai-development/goal.md`、この文書、`docs/ai-development/automation-lock.md` を親方針に合わせた。
- 外部情報を採用済み前提とする記述を撤廃した。
- GitHub ファイルロックをロック本体とする記述を撤廃し、ChatGPT 側メモリーロックを使う親方針へ合わせた。

## 次にやる作業

1. 親リポジトリの adoption / templates パスが追加または移動された場合、`roulette` 側の文書とテンプレートを再確認する。
2. 手順整備または Issue triage を小さく進める。
3. スケジュールを再有効化する場合は、人間承認または追加方針を得てから行う。
4. 実装ジョブが対象 Issue を見つけた場合でも、停止条件を満たさない限り実装しない運用が守られているか確認する。

## Open Blockers

現時点で、この運用整備に対する Open ブロッカーはありません。

## 回答待ち

現時点の回答待ちはありません。

## 読み込み順

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/requirements.md`
4. `docs/ai-development/requirements.md`
5. `docs/ai-development/work-log.md`
6. `docs/ai-development/job-instructions/{job}.md`
7. 関連 Issue / PR / handover

運用レビューや将来のスケジュール準備では、必要に応じて次も読む。

- `docs/ai-development/goal.md`
- `docs/ai-development/progress.md`
- `docs/ai-development/automation-lock.md`

## 更新ルール

- 各ジョブは、作業終了時にこの文書の「現在地」「次にやる作業」を必要に応じて更新する。
- 詳細な作業履歴、停止理由、検証結果は `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に記録する。
- 仕様判断はこの文書に確定事項として書かず、`docs/requirements.md` または `docs/ai-development/requirements.md` のどちらが適切か判断する。
