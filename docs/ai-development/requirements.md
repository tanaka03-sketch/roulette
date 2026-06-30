# AI 開発運用 要件入口

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 親リポジトリ: `tanaka03-sketch/ai-development-operations`
- 作成日: 2026-06-19
- 最終更新日: 2026-06-30
- ステータス: AI 開発運用入口 / Active

## 位置づけ

この文書は AI 開発ジョブが参照する運用入口です。プロダクト仕様の正本は `docs/requirements.md` であり、この文書は正本を置き換えません。

## 正本との分担

| 種別 | 正本または集約先 |
| --- | --- |
| プロダクト要件、受入条件、仕様判断 | `docs/requirements.md` |
| 実装タスクの全体像 | `docs/implementation-tasks.md` |
| 文書分類 | `docs/requirements/document-catalog-2026-05-18.md` |
| AI 開発運用の目的 | `docs/ai-development/goal.md` |
| 目的に対する completion score、公開可否、運用適性 | `docs/ai-development/completion-scorecard.md`、関連 Issue / PR、`docs/ai-development/logs/` |
| AI ジョブ運用の未確定事項 | この文書 |
| Slack または人間確認ログ | この文書と `docs/ai-development/work-log.md` / `docs/ai-development/logs/` |
| GitHub 上の人間判断キュー | `.github/agent-decisions.yml` と `needs-human-decision` Issue |
| ジョブ別の停止理由、検証結果 | `docs/ai-development/work-log.md` / `docs/ai-development/logs/` |

## roulette 固有の固定前提

- 初期版は単一ユーザー向けのクライアント完結型アプリ。
- 認証、認可、サーバー保存、外部 API 連携は対象外。
- 候補リスト、抽選済み状態、除外設定は `localStorage` に保存する。
- 個人情報、社内情報、未公開情報など端末内に残したくない情報の入力には向かない。
- 抽選は初期版では `Math.random()` ベースでよく、厳密な公平性や監査性は対象外。
- 推奨 Node.js は README と `.nvmrc` に従い Node.js 22 前提。

## 親リポジトリ更新後の運用要件

2026-06-30 の親リポジトリ更新確認により、AI 開発運用では次を現行の参照先として扱います。

- `playbooks/automated-development-flow.md`
- `playbooks/github-development-loop.md`
- `playbooks/minimal-implementation-review.md`
- `playbooks/review-finding-triage.md`
- `playbooks/spec-gate.md`
- `playbooks/storage-conflict-guard.md`
- `playbooks/completion-scorecard.md`
- `playbooks/service-publication-review.md`
- `operations/scheduled-run-lock.md`
- `operations/repository-decision-queue.md`
- `templates/github-issue/ai-development-task.md`
- `templates/github-issue/human-decision.md`
- `templates/github-issue/review-finding.md`
- `templates/github-pr/pull-request-template.md`
- `templates/repository-decision-queue/agent-decisions.yml`

旧指定の `adoption/` や `templates/ai-development/` 配下が見つからない場合は、不足として記録し、現在の親 README / playbook / template と `roulette` の既存正本を優先します。

## Completion Scorecard 運用要件

開発中のものを目的に対して 100 点満点で記録することを必須運用にします。

- 採点基準は `docs/ai-development/completion-scorecard.md` を使う。
- 親 `playbooks/completion-scorecard.md` の配点を標準とする。
- 実装 PR、依存関係更新 PR、レビュー指摘 triage、CI failure 対応、文書体系や運用手順の更新、スケジュール運用変更は、完了候補になる前に completion score または scoring blocker を残す。
- レビューでは、目的に対して公開して大丈夫か、現在の AI 開発運用に適しているかを確認する。
- 90 点未満は親 scorecard 上の publish-ready / operation-ready として扱わない。
- 95 点未満は `roulette` の自律運用上の完全完了として扱わない。
- 80 点未満は公開・merge readiness として扱わない。
- 採点できない場合は、目的、受入条件、対象出力、検証方法のどれが不足しているかを記録し、実装へ進まない。
- 公開、本番運用 readiness、CAB の最終判断は人間承認に戻す。

## Minimal Implementation Review 運用要件

実装、依存追加、抽象化、設定追加、workflow 変更、文書体系変更では、必要に応じて親 `playbooks/minimal-implementation-review.md` を使います。

- まず作らない選択肢を確認する。
- 既存コード、既存文書、標準機能、ネイティブ機能で足りるか確認する。
- 新規依存を追加する場合は、理由、代替案、見送った案を記録する。
- セキュリティ、入力検証、データ損失防止、権限、rollback、アクセシビリティは削らない。
- Minimalism Findings は通常のレビュー指摘と同じく triage してから実装へ戻す。

## Service Publication Review 運用要件

公開可否を詳しく判断する必要がある場合は、親 `playbooks/service-publication-review.md` を使います。

`roulette` では、README の公開利用時の注意、単一ユーザー、認証なし、サーバー保存なし、外部 API なし、`localStorage` 保存、個人情報入力非推奨、モバイル表示、入力検証、XSS、同名候補識別を確認対象にします。

## GitHub Actions major update 運用方針

2026-06-24 13:20 JST のユーザー依頼により、GitHub Actions major update 方針の回答待ちは解消済みとして扱います。

- Dependabot の GitHub Actions major update PR は、まとめて方針化したうえで triage する。
- ただし merge / close / recreate は一括で機械的に行わず、PR ごとに互換性、CI 結果、README / 要件 / GitHub 運用文書との整合を確認してから扱う。
- `actions/checkout`、`actions/setup-node`、`actions/github-script` などの major update は、Node.js 22、`npm ci`、`cache: npm`、`typecheck` / `test` / `build` の成功を確認できる状態にしてから次へ進める。
- 高リスク変更、権限変更、secret、認証・認可、production readiness の最終判断が絡む場合は、人間承認へ戻す。
- この方針は AI 開発運用上の blocker 解消であり、プロダクト仕様の正本 `docs/requirements.md` を置き換えない。

## 人間判断の扱い

人間判断が Issue クローズ、実装可否、設計、検証、公開可否、運用適性、管理画面操作に影響する場合、AI ジョブは推測で進めません。

- 判断が必要な論点は、1 回につき 1 問だけ確認する。
- 質問は番号付き選択肢にし、利用者が番号だけで回答できるようにする。
- 選択肢にはおすすめ案と理由、回答後に GitHub へ反映する内容を明記する。
- 回答待ち blocker の選択肢は、原則として `推奨案`、`保守案`、`保留案`、`その他 / 自由記述` のように、判断後の次アクションが分かる形にする。
- 回答が得られたら、その回答を運用判断として記録し、必要な文書、Issue、PR へ反映したうえで、次のサイクルが進められる状態に戻す。
- 回答後も別の承認条件、CI 失敗、高リスク変更、権限変更、secret、認証・認可、production readiness 最終判断などが残る場合は、その残 blocker を分けて記録する。
- 回答待ちが残っている Issue は実装ジョブへ渡さない。

## Repository Decision Queue

GitHub に耐久的な人間判断を残す必要がある場合は、親 `operations/repository-decision-queue.md` に従います。

- 固定ファイル: `.github/agent-decisions.yml`
- 必須ラベル: `needs-human-decision`
- 判断後ラベル: `ready-for-automation`
- Issue タイトル: `Decision: <Decision ID> <短い件名>`
- Issue テンプレート: `.github/ISSUE_TEMPLATE/human-decision.md`

Slack は確認補助として使えますが、公開可否、権限、破壊的変更、長期運用、automation 復帰に関わる判断は、必要に応じて GitHub Issue / `.github/agent-decisions.yml` / PR / log へ反映してから実装へ進みます。

## Slack 投稿と回答権限

Slack 投稿は、新しい判断材料があり、設計・実装・検証・公開可否・運用判断を進めるために人間回答が必要な時だけ行います。

- 毎時サイクルの通常報告、進捗確認、既知事項の再通知、単なる問題なし報告は Slack に投稿しない。
- 通常の毎時サイクル結果は ChatGPT 内報告と `docs/ai-development/progress.md` / `docs/ai-development/work-log.md` / `docs/ai-development/logs/` への記録を中心にする。
- Slack へ投稿する場合は、日本語で 1 投稿 1 問、番号付きまたはラベル付き選択肢を添える。
- Slack で方向性を決める返信権限は、チャンネル側の参加・投稿権限で担保されるものとして扱う。
- チャンネル内で回答できる人全員に方向性回答の権限がある前提とし、特定個人だけの回答を必須にしない。
- 投稿不可、投稿失敗、または投稿条件未達の場合は、`回答待ち` または `ChatGPT 内確認事項` として記録する。

## Open Blockers

- PR #18 `chore(deps-dev): bump vitest from 3.2.4 to 4.1.6`: Slack 回答待ち。既存 CI run `25979489135` は古い failure のままで、GitHub 側から rerun が拒否された。Slack 投稿 `https://x-8oh3631.slack.com/archives/C0BCAL9FFSP/p1782283714065949` への返信がなく、`recreate` / `close` / `keep` / `その他` の人間回答が得られるまで、merge / close / recreate / dependency update は進めない。
- PR #27 `@vitejs/plugin-react` major update: `@vitejs/plugin-react` 6.0.2 と current Vite 7 系の peer dependency mismatch があり、Vite 8 とセットで再作成するか、close / superseded / 保留にするかの人間確認待ち。merge as-is blocked。

実装ジョブは、ここまたは `docs/requirements.md` に Open ブロッカーが追加された場合、実装せず停止理由を `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に記録してください。

## 回答待ち

- PR #18 を `recreate` / `close` / `keep` / `その他` のどれで扱うか。Slack 投稿 `https://x-8oh3631.slack.com/archives/C0BCAL9FFSP/p1782283714065949` への返信を待つ。新しい判断材料、追加質問、追加承認事項がない限り、Slack への再投稿は行わない。
- PR #27 を Vite 8 とセットで再作成するか、close / superseded とするか、保留するか。PR #18 の回答待ちが最優先で残る間は複数質問を同時に扱わない。

## 回答済みの確認ログ

- 2026-06-30: 親リポジトリ更新により、現行参照先を `playbooks/completion-scorecard.md`、`playbooks/minimal-implementation-review.md`、`playbooks/service-publication-review.md`、`operations/repository-decision-queue.md`、`templates/repository-decision-queue/agent-decisions.yml` へ拡張。
- 2026-06-24 19:51 JST: ユーザー依頼により、目的に対して公開して大丈夫か、運用に適しているかをレビュー観点へ追加し、開発中のものを `completion-scorecard.md` で 100 点満点記録する方針を採用。
- 2026-06-24 13:20 JST: ユーザー依頼により、GitHub Actions major update 方針の回答待ちを解消。選択肢 1 の `まとめて方針化して進める` を採用し、Dependabot major update PR はまとめて triage しつつ、merge / close / recreate は PR ごとの互換性と CI 結果を確認して判断する。
- 2026-06-24 12:36 JST: Slack 投稿 `https://x-8oh3631.slack.com/archives/C0BCAL9FFSP/p1782258456427199` への返信 `1` を確認。選択肢 1 の `close` として、PR #52 `docs: switch schedule lock to ChatGPT memory` は古い内容として閉じ、current `main` を正とする方針で処理する。

不明点が実装判断、設計判断、検証判断、公開可否、運用適性に影響する場合は推測で進めず、Slack 投稿、Repository Decision Queue、または質問文案の記録を行ってください。

## 変更時のルール

- 仕様を変える場合は、まず `docs/requirements.md` を更新対象にするか判断する。
- AI ジョブ運用上の補足、確認ログ、未確定事項はこの文書に集約する。
- 要件の二重管理を避けるため、正本の内容をこの文書へ丸ごと複製しない。
