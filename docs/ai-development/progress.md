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
| PR #51 `actions/checkout` major update | CI 成功済み、レビューサイクルでは must fix なし / should fix は人間レビュー待ちとして分類済み。merge は人間判断へ委譲 |
| PR #14 `actions/setup-node` major update | fresh CI run `28076205733` が success。requested reviewer が残っているため人間レビュー / merge 判断待ち |
| PR #26 `actions/github-script` major update | fresh CI run `28076738214` が success。requested reviewer が残っているため人間レビュー / merge 判断待ち |
| PR #45 `fix: resolve CI typecheck errors` | review triage 済み。stale / superseded / close 候補として人間レビューまたは dedicated triage-owner cycle へ委譲 |
| PR #46 `fix: stabilize public readiness CI and tests` | 2026-06-24 14:52 JST 実装短周期で再確認。open / draft / mergeable false、既存の stale / superseded 判定を覆す新規返信・状態変化なし。実装サイクルではコード変更しない |
| PR #27 `@vitejs/plugin-react` major update | 2026-06-24 15:07 JST Spec Gate 実施。`@vitejs/plugin-react` 6 は `vite` `^8.0.0` を peer dependency に要求するが current `main` は `vite` `^7.1.2`。head CI status なし、mergeable false、requested reviewer あり。実装短周期では blocked / needs-design-review-or-recreate |

## 直近の実施内容

### 2026-06-24 15:07 JST PR #27 Spec Gate

- ChatGPT 側メモリーロックを取得して作業した。
- `AGENTS.md`、`docs/ai-development/agent-instructions.md`、`docs/ai-development/goal.md`、`docs/ai-development/progress.md`、`docs/ai-development/work-log.md`、`docs/requirements.md`、`docs/ai-development/requirements.md` を確認した。
- 親リポジトリは read-only として、`README.md`、`playbooks/automated-development-flow.md`、`playbooks/github-development-loop.md`、`playbooks/spec-gate.md`、`playbooks/storage-conflict-guard.md` を必要範囲で確認した。
- 実装短周期サイクルの対象として PR #27 `chore(deps-dev): bump @vitejs/plugin-react from 5.2.0 to 6.0.2` を 1 件だけ選び、Spec Gate を実施した。
- PR #27 は `package.json` と `package-lock.json` のみを変更する Dependabot PR。
- PR #27 head `d9978573927fb7389cbe2d677216f7d1c5514d5d` には commit status が返らず、PR は `mergeable: false`、レビュー未提出、requested reviewer あり。
- 差分上、`@vitejs/plugin-react` 6.0.2 は `vite` `^8.0.0` を peer dependency に要求するが、current `main` は `vite` `^7.1.2` のまま。
- 判定: `blocked / needs-design-review-or-recreate`。この実装短周期ではコード修正、rerun、merge、close、PR コメント追加を行わない。
- 詳細ログ: `docs/ai-development/logs/2026-06-24-1507-implementation-cycle-pr27-spec-gate.md`
- Slack 投稿は行っていない。理由: 客観的な依存 mismatch と検証未成立を確認しただけで、直ちに Slack で新しい人間判断を求める条件には該当しないため。

### 最近の詳細ログ

- 2026-06-24 15:07 JST: `docs/ai-development/logs/2026-06-24-1507-implementation-cycle-pr27-spec-gate.md`
- 2026-06-24 14:52 JST: `docs/ai-development/logs/2026-06-24-1452-implementation-cycle-pr46-nochange.md`
- 2026-06-24 14:45 JST: `docs/ai-development/logs/2026-06-24-1445-human-slack-cycle-pr46.md`
- 2026-06-24 14:37 JST: `docs/ai-development/logs/2026-06-24-1437-implementation-cycle-pr46-superseded.md`
- 2026-06-24 14:30 JST: `docs/ai-development/logs/2026-06-24-1430-review-cycle-pr45-triage.md`
- 2026-06-24 14:22 JST: `docs/ai-development/logs/2026-06-24-1422-pr45-ci-failure-superseded.md`
- 2026-06-24 14:12 JST: `docs/ai-development/logs/2026-06-24-1412-pr26-ci-success.md`
- 2026-06-24 14:02 JST: `docs/ai-development/logs/2026-06-24-1402-pr14-ci-success.md`

## 次にやる作業

1. 次回の実装短周期サイクルでは、`progress.md` と open PR / Issue を再確認し、Implementation PR / CI Failure / Spec Gate / Storage Conflict Guard の範囲で実装可能な最優先タスクを 1 件だけ選ぶ。
2. PR #27 `@vitejs/plugin-react` major update は Spec Gate で blocked。`@vitejs/plugin-react` 6 と current `vite` 7 の peer dependency mismatch、head CI status なし、mergeable false、requested reviewer あり。実装短周期では merge / rerun / close / recreate せず、review / human-decision / design-review cycle で `Vite 8 とセットで再作成するか` または `close / superseded とするか` を扱う。
3. PR #46 `fix: stabilize public readiness CI and tests` は stale / superseded / close 候補として確認済み。Slack 追加投稿条件は未達。close はこの実装短周期サイクルでは実施せず、人間レビューまたは dedicated triage-owner cycle に委譲する。
4. PR #45 `fix: resolve CI typecheck errors` は review triage 済み。close はこの実装短周期サイクルでは実施せず、人間レビューまたは dedicated triage-owner cycle に委譲する。
5. PR #26 `actions/github-script` major update は fresh CI 成功済みのため、人間レビュー / merge 判断へ渡す。
6. PR #14 `actions/setup-node` major update は fresh CI 成功済みのため、人間レビュー / merge 判断へ渡す。
7. PR #51 `actions/checkout` major update は CI 成功済み、レビューサイクルでは must fix なし / should fix は人間レビュー待ちとして分類済み。merge は人間判断へ委譲する。
8. PR #18 `vitest` major update は、実装へ流す前に review / spec gate / CI 状態の確認対象として扱う。未 triage のまま実装しない。
9. merge / close / recreate は一括で機械的に行わず、PR ごとの確認結果に基づいて判断する。
10. 設計確定済み、未確定事項なし、Open ブロッカーなし、小さく分解済み、検証方法明確、セキュリティ・権限・個人情報・入力検証の判断確定済み、レビュー指摘 triage 済みを満たす場合だけ実装へ進む。
11. 条件未達の場合は実装せず、停止理由と次に必要な判断を `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に残す。
12. Slack 投稿は、新しい判断材料があり、人間回答なしでは設計・実装・検証・運用判断を進められない場合だけ行う。
13. 親リポジトリに adoption / templates パスが追加または移動された場合、`roulette` 側の文書とテンプレートを再確認する。
14. 旧 12 ジョブ名が active schedule や開発サイクルとして復活していないか、定期的に検索して確認する。

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
