# AI 開発運用 Progress

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-22
- 最終更新日: 2026-07-01
- ステータス: Active / human-decision waiting

## 目的

この文書は、AI 開発運用で現在地、停止条件、次にやる作業を短く確認するための進捗入口です。詳細な履歴は `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に残します。

## 現在地

| 項目 | 状態 |
| --- | --- |
| AI 開発運用の基本導入 | 完了 |
| 既存要件正本 | `docs/requirements.md` が正本 |
| AI 運用入口 | `docs/ai-development/requirements.md` |
| AI 運用目的 | `docs/ai-development/goal.md` |
| Completion Scorecard | `docs/ai-development/completion-scorecard.md`。親 `playbooks/completion-scorecard.md` の 30 / 20 / 20 / 15 / 15 配点へ再整合済み |
| 親フロー導入 | 完了。Issue Intake -> Orchestrator -> Research -> Design Review -> Human Decision -> Implementation -> Code Review -> Review Triage -> Fix Implementation -> Test & Quality -> Completion Review -> Handover |
| GitHub Development Loop 導入 | 完了。Issue Intake / Implementation PR / Review Triage / CI Failure / Scheduled Maintenance |
| Gate / Review 導入 | 完了。Spec Gate / Storage Conflict Guard / Minimal Implementation Review / Completion Scorecard / Service Publication Review / Repository Decision Queue |
| 人間判断キュー | `.github/agent-decisions.yml` と `.github/ISSUE_TEMPLATE/human-decision.md` を追加済み。PR #18 は Issue #54、PR #27 は Issue #55 で判断待ち |
| メモリーロック手順 | 完了。ロック本体は ChatGPT 側メモリー `/workspace/memory/locks/roulette-schedule-lock.json` を使う |
| ChatGPT スケジュール | 旧 12 本は開発サイクルとして使わない。文書上は実装短周期、レビュー 1 時間、人間確認 / Slack 1 時間の 3 本運用を維持 |
| Slack 確認先 | `https://app.slack.com/client/T0B0KABNVNX/C0BCAL9FFSP` / `channel_id: C0BCAL9FFSP` |
| Slack 投稿方針 | 新しい判断材料があり人間回答が必要な時だけ投稿。通常報告、既知事項の再通知、問題なし報告は投稿しない |

## PR / Issue 現在地

| 対象 | 状態 |
| --- | --- |
| Issue #54 `Decision: HD-20260630-001 PR #18 vitest major update の扱い` | open / `needs-human-decision`。コメント 0 件。PR #18 の `recreate` / `close` / `keep` / `その他` 判断待ち |
| Issue #55 `Decision: HD-20260630-002 PR #27 plugin-react major update の扱い` | open / `needs-human-decision`。コメント 0 件。PR #27 を Vite 8 とセットで recreate / close / keep on hold / その他の判断待ち |
| PR #18 `vitest` major update | open / `needs-human-decision` / mergeable false。Decision Issue #54 に移管済み。head `97477654d373090a9494d699d6d1a27aa47754b6` の CI run `25979489135` は failure。fresh CI success なし。人間判断待ちのため merge / close / recreate / dependency update はしない |
| PR #27 `@vitejs/plugin-react` major update | open / `needs-human-decision` / mergeable false。Decision Issue #55 に移管済み。head `d9978573927fb7389cbe2d677216f7d1c5514d5d` の CI run `25996706622` は failure。`@vitejs/plugin-react` 6.0.2 と current Vite 7 系の peer dependency mismatch。merge as-is blocked |
| PR #52 `docs: switch schedule lock to ChatGPT memory` | 完了。Slack 返信 `1` を close 方針として反映し、2026-06-24 12:42 JST に superseded として closed |
| GitHub Actions major update 方針 | 完了。ユーザー依頼により `まとめて方針化して進める` を採用し、回答待ちを解除済み |
| PR #51 `actions/checkout` major update | completion score 92 / 100。publish candidate だが requested reviewer が残るため最終 merge / publish readiness は人間判断へ委譲 |
| PR #14 `actions/setup-node` major update | completion score 92 / 100。publish candidate だが requested reviewer が残るため人間レビュー / merge 判断待ち |
| PR #26 `actions/github-script` major update | completion score 88 / 100。publish candidate だが requested reviewer が残るため最終 merge / publish readiness は人間判断へ委譲 |
| PR #45 `fix: resolve CI typecheck errors` | 主要修正は current `main` に反映済みで stale / superseded / close 候補。completion score 62 / 100。not publish ready |
| PR #46 `fix: stabilize public readiness CI and tests` | open / draft、mergeable false。stale / superseded / close 候補。completion score 64 / 100。not publish ready |

## 直近の実施内容

### 2026-07-01 08:30 JST Human-check / Slack Cycle

- Issue #54 / #55 を確認し、どちらもコメント 0 件で人間判断未回答であることを確認した。
- `needs-human-decision` の open Issue は #54 / #55 の 2 件であることを確認した。
- PR #18 / #27 を確認し、どちらも open / mergeable false であることを確認した。
- `.github/agent-decisions.yml` を更新し、両 decision の現在値を 2026-07-01 08:35 JST 時点の `mergeable false`、CI failure、人間判断未回答として記録した。
- 依存更新、PR close、recreate、merge、Slack 再投稿は行っていない。
- 詳細ログ: `docs/ai-development/logs/2026-07-01-0830-human-slack-cycle-decision-queue.md`

### 2026-07-01 07:30 JST Human-check / Slack Cycle

- Issue #54 / #55 を確認し、どちらもコメント 0 件で人間判断未回答であることを確認した。
- PR #18 / #27 は open / mergeable false として確認した。
- 既存 Slack スレッドにも返信がなく、Slack 検索で `HD-20260630-001` / `HD-20260630-002` の回答候補は見つからなかった。
- 通常報告や既知事項の再通知に当たるため、Slack 再投稿は行っていない。
- 詳細ログ: `docs/ai-development/logs/2026-07-01-0730-human-slack-cycle-decision-queue.md`

### 2026-07-01 Decision Queue Refresh

- Issue #54 / #55 を確認し、どちらもコメント 0 件で人間判断未回答であることを確認した。
- PR #18 / #27 を確認し、どちらも open であることを確認した。
- CI は PR #18 が run `25979489135` failure、PR #27 が run `25996706622` failure のままで、fresh CI success は確認できなかった。
- `.github/agent-decisions.yml` を更新し、当時の確認値を記録した。
- 依存更新、PR close、recreate、merge、Slack 再投稿は行っていない。
- 詳細ログ: `docs/ai-development/logs/2026-07-01-decision-queue-refresh.md`

### 2026-06-30 Decision Queue 整備

- PR #18 と PR #27 の現状を再確認した。
- Issue #54 `Decision: HD-20260630-001 PR #18 vitest major update の扱い` を作成した。
- Issue #55 `Decision: HD-20260630-002 PR #27 plugin-react major update の扱い` を作成した。
- `.github/agent-decisions.yml` に `HD-20260630-001` と `HD-20260630-002` を `waiting-human` として登録した。
- PR #18 と PR #27 に `needs-human-decision` ラベルを付け、各 PR に Decision Issue への案内コメントを追加した。
- 実装、依存更新、PR close / recreate / merge は行っていない。

### 2026-06-30 親リポジトリ更新反映

- 親リポジトリは read-only として、現在の README、playbooks、operations、templates を確認した。
- `AGENTS.md`、`docs/ai-development/agent-instructions.md`、`docs/ai-development/goal.md`、`docs/ai-development/completion-scorecard.md`、`docs/ai-development/requirements.md`、`.github/PULL_REQUEST_TEMPLATE.md`、`.github/ISSUE_TEMPLATE/ai-development-task.md`、`.github/ISSUE_TEMPLATE/review-finding.md` を更新した。
- `.github/ISSUE_TEMPLATE/human-decision.md` と `.github/agent-decisions.yml` を追加した。
- `docs/requirements.md` はプロダクト要件の正本として変更しなかった。
- 詳細ログ: `docs/ai-development/logs/2026-06-30-parent-update-adoption.md`

## 最近の詳細ログ

- 2026-07-01 JST: `docs/ai-development/logs/2026-07-01-0830-human-slack-cycle-decision-queue.md`
- 2026-07-01 JST: `docs/ai-development/logs/2026-07-01-0730-human-slack-cycle-decision-queue.md`
- 2026-07-01 JST: `docs/ai-development/logs/2026-07-01-decision-queue-refresh.md`
- 2026-06-30 JST: `docs/ai-development/logs/2026-06-30-decision-queue-setup.md`
- 2026-06-30 JST: `docs/ai-development/logs/2026-06-30-parent-update-adoption.md`
- 2026-06-25 20:30 JST: `docs/ai-development/logs/2026-06-25-2030-review-cycle-pr18-blocked.md`

## 次にやる作業

1. 人間確認 / Slack サイクルで Issue #54 を確認し、`HD-20260630-001` の判断コメントがあるか確認する。
2. #54 に判断があれば、実装より先に `.github/agent-decisions.yml`、`docs/ai-development/requirements.md`、`docs/ai-development/progress.md`、関連 PR / log へ反映する。
3. #54 が未回答なら、Issue #55 を同時に進めず、回答待ちとして維持する。新しい判断材料がない限り Slack へ再通知しない。
4. #54 解消後に Issue #55 を確認し、`HD-20260630-002` の判断を同じ手順で反映する。
5. PR #18 / #27 の merge / close / recreate / dependency update は、人間判断が反映され、Spec Gate と Storage Conflict Guard を通過するまで進めない。
6. 設計確定済み、未確定事項なし、Open ブロッカーなし、小さく分解済み、検証方法明確、セキュリティ・権限・個人情報・入力検証・公開可否・運用適性の判断確定済み、レビュー指摘 triage 済み、Minimalism Findings triage 済み、Spec Gate 通過済み、保存や更新を伴う場合は Storage Conflict Guard 通過済みを満たす場合だけ実装へ進む。
7. 条件未達の場合は実装せず、停止理由と次に必要な判断を `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に残す。

## Open Blockers

- Issue #54 / PR #18: `HD-20260630-001` の人間判断待ち。PR は mergeable false、CI failure と fresh CI success なしは残っている。回答が得られるまで、PR #18 の merge / close / recreate / dependency update は進めない。
- Issue #55 / PR #27: `HD-20260630-002` の人間判断待ち。PR は mergeable false、CI failure と Vite 7 / plugin-react 6 peer dependency mismatch は残っている。回答が得られるまで、PR #27 の merge / close / recreate / dependency update は進めない。

## 回答待ち

- `HD-20260630-001`: Issue #54 で PR #18 を `recreate` / `close` / `keep` / `その他` のどれで扱うか。
- `HD-20260630-002`: Issue #55 で PR #27 を Vite 8 とセットで recreate / close / keep on hold / その他のどれで扱うか。

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
