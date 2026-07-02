# AI 開発運用 Progress

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-22
- 最終更新日: 2026-07-02
- ステータス: Active / publication-review findings queued

## 目的

この文書は、AI 開発運用で現在地、停止条件、次にやる作業を短く確認するための進捗入口です。詳細な履歴は `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に残します。

## 現在地

| 項目 | 状態 |
| --- | --- |
| 既存要件正本 | `docs/requirements.md` が正本 |
| AI 運用入口 | `docs/ai-development/requirements.md` |
| 人間判断キュー | `.github/agent-decisions.yml`。Issue #54 / #55 / #56 / #58 が waiting-human |
| Ready for automation | Issue #57 / #59 |
| ChatGPT スケジュール | 旧 12 本は開発サイクルとして使わない。実装短周期、レビュー 1 時間、人間確認 / Slack 1 時間の 3 本運用を維持 |
| Slack 投稿方針 | 新しい判断材料があり人間回答が必要な時だけ投稿。通常報告、既知事項の再通知、問題なし報告は投稿しない |

## PR / Issue 現在地

| 優先 | 対象 | 状態 | 次アクション |
| ---: | --- | --- | --- |
| P0 | Issue #56 `公開前: Slack内部URL/IDを公開リポジトリから除去または匿名化する` | open / `needs-human-decision` / `HD-20260702-001` | Human Decision Lane で選択肢を確認し、判断後に現在ファイルの置換または別 Issue 化へ進める |
| P1 | Issue #58 `Decision: 最後の1件を抽選できない挙動を維持するか変更するか決める` | open / `needs-human-decision` / `HD-20260702-002` | 人間判断後に要件・UI・テスト変更、または現状維持の文言改善へ進める |
| P2 | Issue #57 `Docs: 候補名120文字制限の文字数基準を明文化する` | open / `ready-for-automation` | P0 / P1 の判断を妨げない範囲で Docs / Development Lane が処理する |
| P2 | Issue #59 `Cleanup: handleClearCandidates の到達不能なタイマークリア処理を整理する` | open / `ready-for-automation` | P0 / P1 の判断を妨げない範囲で Development Lane が処理する |
| P3 | Issue #54 `Decision: HD-20260630-001 PR #18 vitest major update の扱い` | open / `needs-human-decision` | #56 の公開前ブロッカー確認後、既存の判断待ちとして確認する |
| P3 | Issue #55 `Decision: HD-20260630-002 PR #27 plugin-react major update の扱い` | open / `needs-human-decision` | #56 / #54 の後に確認する |
| P3 | PR #18 `vitest` major update | open / mergeable false / CI failure | Issue #54 の判断が反映されるまで merge / close / recreate / dependency update はしない |
| P3 | PR #27 `@vitejs/plugin-react` major update | open / mergeable false / CI failure / peer dependency mismatch | Issue #55 の判断が反映されるまで merge / close / recreate / dependency update はしない |

## 直近の実施内容

### 2026-07-02 18:16 JST Publication Review Finding Intake

- 公開前レビュー指摘を確認し、妥当性を triage した。
- Issue #56, #57, #58, #59 を作成した。
- #56 と #58 を `.github/agent-decisions.yml` に `HD-20260702-001` / `HD-20260702-002` として登録した。
- #56 を P0 公開前ブロッカー、#58 を P1 UX / 仕様判断、#57 / #59 を P2 ready-for-automation としてこの進捗入口に載せた。
- 実装、Slack 投稿、大量削除、履歴書き換え、PR 作成、merge は行っていない。
- 詳細ログ: `docs/ai-development/logs/2026-07-02-1816-publication-review-finding-intake.md`

## 最近の詳細ログ

- 2026-07-02 JST: `docs/ai-development/logs/2026-07-02-1816-publication-review-finding-intake.md`
- 2026-07-01 JST: `docs/ai-development/logs/2026-07-01-1830-human-slack-cycle-decision-queue.md`
- 2026-07-01 JST: `docs/ai-development/logs/2026-07-01-0830-human-slack-cycle-decision-queue.md`
- 2026-07-01 JST: `docs/ai-development/logs/2026-07-01-0730-human-slack-cycle-decision-queue.md`
- 2026-07-01 JST: `docs/ai-development/logs/2026-07-01-decision-queue-refresh.md`
- 2026-06-30 JST: `docs/ai-development/logs/2026-06-30-decision-queue-setup.md`
- 2026-06-30 JST: `docs/ai-development/logs/2026-06-30-parent-update-adoption.md`

## 次にやる作業

1. Human Decision Lane で Issue #56 / `HD-20260702-001` を確認し、現在ファイルのプレースホルダー化、ログ保持方針見直し、履歴書き換え検討、その他のどれを採用するか確認する。
2. #56 に判断があれば、実装より先に `.github/agent-decisions.yml`、`docs/ai-development/requirements.md`、`docs/ai-development/progress.md`、関連 Issue / log へ反映する。
3. #56 が未回答なら、Slack 再投稿は新しい判断材料がある場合だけ行い、通常報告や既知 blocker 再通知はしない。
4. #56 解消後、Issue #58 / `HD-20260702-002` を確認する。
5. #57 / #59 は `ready-for-automation` だが、P0 / P1 の判断を妨げない小さな単位としてのみ扱う。
6. #54 / #55 / PR #18 / PR #27 は既存の依存更新判断待ちとして維持し、#56 の公開前ブロッカー確認後に順次扱う。
7. 条件未達の場合は実装せず、停止理由と次に必要な判断を `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に残す。

## Open Blockers

- Issue #56: `HD-20260702-001` の人間判断待ち。Slack 内部URL/IDの現在ファイル置換、ログ保持方針見直し、履歴書き換え検討のどこまで扱うかが未決。回答が得られるまで、大量削除、履歴書き換え、公開可否最終判断は進めない。
- Issue #54 / PR #18: `HD-20260630-001` の人間判断待ち。PR は mergeable false、CI failure と fresh CI success なしが残っている。
- Issue #55 / PR #27: `HD-20260630-002` の人間判断待ち。PR は mergeable false、CI failure と Vite 7 / plugin-react 6 peer dependency mismatch が残っている。

## 回答待ち

- `HD-20260702-001`: Issue #56 で Slack 内部情報の除去 / 匿名化範囲を決める。
- `HD-20260702-002`: Issue #58 で最後の1件を現状維持 / 確定表示 / 1件抽選許可 / その他のどれで扱うか決める。
- `HD-20260630-001`: Issue #54 で PR #18 を `recreate` / `close` / `keep` / `その他` のどれで扱うか決める。
- `HD-20260630-002`: Issue #55 で PR #27 を Vite 8 とセットで recreate / close / keep on hold / その他のどれで扱うか決める。

## 読み込み順

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/requirements.md`
4. `docs/ai-development/requirements.md`
5. `docs/ai-development/goal.md`
6. `docs/ai-development/completion-scorecard.md`
7. `docs/ai-development/progress.md`
8. `docs/ai-development/work-log.md` または関連 `docs/ai-development/logs/`
9. `.github/agent-decisions.yml`
10. 関連 Issue / PR / handover
11. 選んだ作業に対応する親 playbook

運用レビューやスケジュール準備では、必要に応じて次も読む。

- `docs/ai-development/automation-lock.md`

## 更新ルール

- 各サイクルは、作業終了時にこの文書の「現在地」「次にやる作業」を必要に応じて更新する。
- 詳細な作業履歴、停止理由、検証結果は `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に記録する。
- 仕様判断はこの文書に確定事項として書かず、`docs/requirements.md` または `docs/ai-development/requirements.md` のどちらが適切か判断する。
