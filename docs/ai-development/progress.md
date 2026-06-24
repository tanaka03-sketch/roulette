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
| PR #52 Review Triage / Slack 確認 / 処理 | 完了。Slack 返信 `1` を close 方針として反映し、2026-06-24 12:42 JST に superseded として closed |
| GitHub Actions major update 方針 | 完了。ユーザー依頼により `まとめて方針化して進める` を採用し、回答待ちを解除済み |
| PR #51 `actions/checkout` major update | CI 成功、レビューサイクルで must fix なし / should fix は人間レビュー待ちと分類済み。merge は人間判断へ委譲 |
| PR #14 `actions/setup-node` major update | Dependabot rebase 完了。fresh CI run `28076205733` が success。`typecheck` / `test` / `build` すべて success。requested reviewer が残っているため人間レビュー / merge 判断待ち |
| PR #26 `actions/github-script` major update | Dependabot rebase 完了。fresh CI run `28076738214` が success。`typecheck` / `test` / `build` すべて success。requested reviewer が残っているため人間レビュー / merge 判断待ち |
| PR #45 `fix: resolve CI typecheck errors` | レビューサイクルで分類済み。`out of scope / no PR-internal fix`、`test only / already evidenced`、`question / human review queue`。stale / superseded / close 候補として人間レビューまたは dedicated triage-owner cycle へ委譲 |
| PR #46 `fix: stabilize public readiness CI and tests` | 実装短周期で current `main` と照合済み。CI run `26484432550` は success。主要修正は `main` へ反映済みで、一部差分は `main` より古いため stale / superseded / close 候補として人間レビューまたは dedicated triage-owner cycle へ委譲 |

## 直近の実施内容

### 2026-06-24 14:37 JST PR #46 Implementation Cycle Superseded Check

- ChatGPT 側メモリーロックを取得して作業した。
- `AGENTS.md`、`docs/ai-development/agent-instructions.md`、`docs/ai-development/goal.md`、`docs/ai-development/progress.md`、`docs/ai-development/work-log.md`、`docs/requirements.md`、`docs/ai-development/requirements.md` を確認した。
- 親リポジトリは read-only として、`README.md`、`playbooks/automated-development-flow.md`、`playbooks/github-development-loop.md`、`playbooks/spec-gate.md`、`playbooks/storage-conflict-guard.md` を必要範囲で確認した。
- 実装短周期サイクルの対象として、最優先タスクを 1 件だけ選び、PR #46 `fix: stabilize public readiness CI and tests` を扱った。
- PR #46 は draft / open、head `a98757d3720b04fd7b44511d45167740987131ca`、CI run `26484432550` は success。
- current `main` には PR #46 の主要修正である `pickRandomCandidate` の indexed access 補強、`vitest/config` 化、storage test cleanup 順序が反映済みであることを確認した。
- current `main` の `src/ui/useRouletteApp.ts` は PR #46 より進んだ実装になっており、この PR をそのまま進めると stale snapshot を戻すリスクがある。
- 判定: `superseded-by-main / no product-code change`。今回の実装短周期ではコード修正、rerun、merge、close は行わない。
- Storage Conflict Guard として PR #46 とコメントを re-read し、同じ operation ID がないことを確認して PR コメントを 1 件追加した。コメント ID: `4786249292`。
- 詳細ログ: `docs/ai-development/logs/2026-06-24-1437-implementation-cycle-pr46-superseded.md`
- Slack 投稿は行っていない。理由: 既知の古い draft PR を current `main` と照合した結果の記録であり、新しい設計・実装・検証・運用判断を人間に求める内容ではないため。

### 最近の詳細ログ

- 2026-06-24 14:37 JST: `docs/ai-development/logs/2026-06-24-1437-implementation-cycle-pr46-superseded.md`
- 2026-06-24 14:30 JST: `docs/ai-development/logs/2026-06-24-1430-review-cycle-pr45-triage.md`
- 2026-06-24 14:22 JST: `docs/ai-development/logs/2026-06-24-1422-pr45-ci-failure-superseded.md`
- 2026-06-24 14:12 JST: `docs/ai-development/logs/2026-06-24-1412-pr26-ci-success.md`
- 2026-06-24 14:02 JST: `docs/ai-development/logs/2026-06-24-1402-pr14-ci-success.md`
- 2026-06-24 13:52 JST: `docs/ai-development/logs/2026-06-24-1352-implementation-cycle.md`
- 2026-06-24 13:37 JST: `docs/ai-development/logs/2026-06-24-1337-implementation-cycle.md`
- 2026-06-24 13:30 JST: `docs/ai-development/logs/2026-06-24-1330-review-cycle.md`
- 2026-06-24 13:22 JST: `docs/ai-development/logs/2026-06-24-1322-implementation-cycle.md`
- 2026-06-24 13:20 JST: `docs/ai-development/logs/2026-06-24-1320-blocker-resolution.md`

## 次にやる作業

1. PR #46 `fix: stabilize public readiness CI and tests` は stale / superseded / close 候補として確認済み。close はこの実装短周期では実施せず、人間レビューまたは dedicated triage-owner cycle に委譲する。
2. PR #45 `fix: resolve CI typecheck errors` は review triage 済み。close はこのレビューサイクルでは実施せず、人間レビューまたは dedicated triage-owner cycle に委譲する。
3. PR #26 `actions/github-script` major update は fresh CI 成功済みのため、人間レビュー / merge 判断へ渡す。
4. PR #14 `actions/setup-node` major update は fresh CI 成功済みのため、人間レビュー / merge 判断へ渡す。
5. PR #51 `actions/checkout` major update は CI 成功済み、レビューサイクルでは must fix なし / should fix は人間レビュー待ちとして分類済み。merge は人間判断へ委譲する。
6. merge / close / recreate は一括で機械的に行わず、PR ごとの確認結果に基づいて判断する。
7. 次回の実装短周期サイクルでは、`progress.md` と open PR / Issue を再確認し、Implementation PR / CI Failure / Spec Gate / Storage Conflict Guard の範囲で実装可能な最優先タスクを 1 件だけ選ぶ。
8. 設計確定済み、未確定事項なし、Open ブロッカーなし、小さく分解済み、検証方法明確、セキュリティ・権限・個人情報・入力検証の判断確定済み、レビュー指摘 triage 済みを満たす場合だけ実装へ進む。
9. 条件未達の場合は実装せず、停止理由と次に必要な判断を `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に残す。
10. 親リポジトリに adoption / templates パスが追加または移動された場合、`roulette` 側の文書とテンプレートを再確認する。
11. 旧 12 ジョブ名が active schedule や開発サイクルとして復活していないか、定期的に検索して確認する。

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
