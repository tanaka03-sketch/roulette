# AI 開発運用 Progress

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-22
- 最終更新日: 2026-06-30
- ステータス: Active

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
| 人間判断キュー | `.github/agent-decisions.yml` と `.github/ISSUE_TEMPLATE/human-decision.md` を追加済み |
| メモリーロック手順 | 完了。ロック本体は ChatGPT 側メモリー `/workspace/memory/locks/roulette-schedule-lock.json` を使う |
| ChatGPT スケジュール | 旧 12 本は開発サイクルとして使わない。文書上は実装短周期、レビュー 1 時間、人間確認 / Slack 1 時間の 3 本運用を維持 |
| Slack 確認先 | `https://app.slack.com/client/T0B0KABNVNX/C0BCAL9FFSP` / `channel_id: C0BCAL9FFSP` |
| Slack 投稿方針 | 新しい判断材料があり人間回答が必要な時だけ投稿。通常報告、既知事項の再通知、問題なし報告は投稿しない |
| Slack 返信権限 | チャンネル内で回答できる人全員に方向性回答権限がある前提。権限境界は Slack チャンネル側で担保 |

## PR / Issue 現在地

| 対象 | 状態 |
| --- | --- |
| PR #52 `docs: switch schedule lock to ChatGPT memory` | 完了。Slack 返信 `1` を close 方針として反映し、2026-06-24 12:42 JST に superseded として closed |
| GitHub Actions major update 方針 | 完了。ユーザー依頼により `まとめて方針化して進める` を採用し、回答待ちを解除済み |
| PR #51 `actions/checkout` major update | 2026-06-24 23:30 JST レビューサイクルで再確認。head `60002e5b17ac4523f958a0ab421ad293673e6e05`、mergeable true、CI run `27910840532` success。completion score 92 / 100。publish candidate だが requested reviewer が残るため最終 merge / publish readiness は人間判断へ委譲 |
| PR #14 `actions/setup-node` major update | 2026-06-25 00:30 JST レビューサイクルで再確認。fresh CI run `28076205733` success。completion score 92 / 100。publish candidate だが requested reviewer が残るため人間レビュー / merge 判断待ち |
| PR #26 `actions/github-script` major update | 2026-06-25 01:30 JST レビューサイクルで再確認。head `242be62c84d9df2f6aaefcdf6583f858a792ac68`、mergeable true、fresh CI run `28076738214` success。completion score 88 / 100。publish candidate だが requested reviewer が残るため最終 merge / publish readiness は人間判断へ委譲 |
| PR #45 `fix: resolve CI typecheck errors` | 主要修正は current `main` に反映済みで stale / superseded / close 候補。completion score 62 / 100。not publish ready |
| PR #46 `fix: stabilize public readiness CI and tests` | open / draft、mergeable false。stale / superseded / close 候補。completion score 64 / 100。not publish ready |
| PR #27 `@vitejs/plugin-react` major update | `@vitejs/plugin-react` 6.0.2 と current Vite 7 系の peer dependency mismatch があり、Vite 8 とセットで再作成するか、close / superseded / 保留にするかの人間確認待ち。merge as-is blocked |
| PR #18 `vitest` major update | Slack 回答待ち、fresh CI success なし、workflow run `25979489135` failure。completion score 43 / 100、blocked / unsafe、publish / merge readiness なし。詳細ログ: `docs/ai-development/logs/2026-06-25-2030-review-cycle-pr18-blocked.md` |

## 直近の実施内容

### 2026-06-30 親リポジトリ更新反映

- 親リポジトリは read-only として、現在の README、playbooks、operations、templates を確認した。
- 旧指定の `adoption/` と `templates/ai-development/` 系パスは 404 のため、現行の親 README / playbook / template を優先した。
- `AGENTS.md`、`docs/ai-development/agent-instructions.md`、`docs/ai-development/goal.md`、`docs/ai-development/completion-scorecard.md`、`docs/ai-development/requirements.md`、`.github/PULL_REQUEST_TEMPLATE.md`、`.github/ISSUE_TEMPLATE/ai-development-task.md`、`.github/ISSUE_TEMPLATE/review-finding.md` を更新した。
- `.github/ISSUE_TEMPLATE/human-decision.md` と `.github/agent-decisions.yml` を追加した。
- `docs/requirements.md` はプロダクト要件の正本として変更しなかった。
- 詳細ログ: `docs/ai-development/logs/2026-06-30-parent-update-adoption.md`

## 最近の詳細ログ

- 2026-06-30 JST: `docs/ai-development/logs/2026-06-30-parent-update-adoption.md`
- 2026-06-25 20:30 JST: `docs/ai-development/logs/2026-06-25-2030-review-cycle-pr18-blocked.md`
- 2026-06-25 20:22 JST: `docs/ai-development/logs/2026-06-25-2022-implementation-cycle-pr18-blocked.md`
- 2026-06-25 19:37 JST: `docs/ai-development/logs/2026-06-25-1937-implementation-cycle-blocked.md`
- 2026-06-25 19:30 JST: `docs/ai-development/logs/2026-06-25-1930-review-cycle-pr18-blocked.md`

## 次にやる作業

1. 人間確認 / Slack サイクルで、PR #18 の Slack 投稿 `https://x-8oh3631.slack.com/archives/C0BCAL9FFSP/p1782283714065949` への返信を確認する。
2. PR #18 の回答が得られたら、実装より先に `docs/ai-development/requirements.md`、`docs/ai-development/progress.md`、`docs/ai-development/work-log.md` または `docs/ai-development/logs/`、必要に応じて PR #18 へ反映する。
3. PR #18 の回答がまだ無い場合は、再投稿条件を満たす新しい判断材料がない限り Slack へ再通知しない。
4. 人間確認 / Slack サイクルで、PR #18 または PR #27 の回答待ちを GitHub の Decision record へ移す必要があるかを 1 件だけ判定する。
5. PR #27 を Vite 8 とセットで再作成するか、close / superseded とするか、保留するかを扱う。ただし PR #18 の回答待ちが最優先で残る間は複数質問を同時に扱わない。
6. PR #46 と PR #45 は通常の人間 reviewer または triage-owner cycle で close as superseded / keep / rebase or recreate を判断する。レビューサイクルでは merge / close / label update を実施しない。
7. PR #51、PR #14、PR #26 は人間 reviewer が merge / hold / close を判断する。Slack への通常報告は不要。
8. merge / close / recreate は一括で機械的に行わず、PR ごとの確認結果に基づいて判断する。
9. 設計確定済み、未確定事項なし、Open ブロッカーなし、小さく分解済み、検証方法明確、セキュリティ・権限・個人情報・入力検証・公開可否・運用適性の判断確定済み、レビュー指摘 triage 済み、Minimalism Findings triage 済み、Spec Gate 通過済み、保存や更新を伴う場合は Storage Conflict Guard 通過済みを満たす場合だけ実装へ進む。
10. 条件未達の場合は実装せず、停止理由と次に必要な判断を `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に残す。

## Open Blockers

- PR #18: Slack 回答待ち。既存 Slack 投稿 `https://x-8oh3631.slack.com/archives/C0BCAL9FFSP/p1782283714065949` への返信待ち。`recreate` / `close` / `keep` / `その他` の人間回答が得られるまで、merge / close / recreate / dependency update は進めない。
- PR #27: `@vitejs/plugin-react` 6.0.2 と current Vite 7 系の peer dependency mismatch。Vite 8 とセットで再作成するか、close / superseded / 保留にするかが未確定。fresh CI もないため merge as-is blocked。

## 回答待ち

- PR #18 を `recreate` / `close` / `keep` / `その他` のどれで扱うか。Slack 投稿 `https://x-8oh3631.slack.com/archives/C0BCAL9FFSP/p1782283714065949` への返信を待つ。既知の回答待ちで新しい判断材料がない限り Slack 再投稿なし。
- PR #27 を Vite 8 とセットで再作成するか、close / superseded とするか、保留するか。人間確認 / Slack サイクルで扱う。ただし PR #18 の回答待ちが最優先で残る間は複数質問を同時に扱わない。
- PR #45 と PR #46 を close as superseded / keep / rebase or recreate のどれで扱うか。通常の人間 reviewer または triage-owner cycle で扱い、Slack への通常報告は行わない。
- PR #51、PR #14、PR #26 を merge / hold / close のどれで扱うか。通常の人間 reviewer / merge 判断として扱い、Slack への通常報告は行わない。

## 読み込み順

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/requirements.md`
4. `docs/ai-development/requirements.md`
5. `docs/ai-development/goal.md`
6. `docs/ai-development/completion-scorecard.md`
7. `docs/ai-development/progress.md`
8. `docs/ai-development/work-log.md` または関連 `docs/ai-development/logs/`
9. 関連 Issue / PR / handover
10. 選んだ作業に対応する親 playbook

運用レビューやスケジュール準備では、必要に応じて次も読む。

- `docs/ai-development/automation-lock.md`

## 更新ルール

- 各サイクルは、作業終了時にこの文書の「現在地」「次にやる作業」を必要に応じて更新する。
- 詳細な作業履歴、停止理由、検証結果は `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に記録する。
- 仕様判断はこの文書に確定事項として書かず、`docs/requirements.md` または `docs/ai-development/requirements.md` のどちらが適切か判断する。
