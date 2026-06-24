# AI 開発運用 要件入口

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 親リポジトリ: `tanaka03-sketch/ai-development-operations`
- 作成日: 2026-06-19
- 最終更新日: 2026-06-24
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
| ジョブ別の停止理由、検証結果 | `docs/ai-development/work-log.md` / `docs/ai-development/logs/` |

## roulette 固有の固定前提

- 初期版は単一ユーザー向けのクライアント完結型アプリ。
- 認証、認可、サーバー保存、外部 API 連携は対象外。
- 候補リスト、抽選済み状態、除外設定は `localStorage` に保存する。
- 個人情報、社内情報、未公開情報など端末内に残したくない情報の入力には向かない。
- 抽選は初期版では `Math.random()` ベースでよく、厳密な公平性や監査性は対象外。
- 推奨 Node.js は README と `.nvmrc` に従い Node.js 22 前提。

## Completion Scorecard 運用要件

2026-06-24 のユーザー依頼により、開発中のものを目的に対して 100 点満点で記録することを必須運用にします。

- 採点基準は `docs/ai-development/completion-scorecard.md` を使う。
- 実装 PR、依存関係更新 PR、レビュー指摘 triage、CI failure 対応、文書体系や運用手順の更新、スケジュール運用変更は、完了候補になる前に completion score または scoring blocker を残す。
- レビューでは、目的に対して公開して大丈夫か、現在の AI 開発運用に適しているかを確認する。
- 95 点未満は自律運用上の完全完了として扱わない。
- 80 点未満は公開・merge readiness として扱わない。
- 採点できない場合は、目的、受入条件、対象出力、検証方法のどれが不足しているかを記録し、実装へ進まない。
- 公開、本番運用 readiness、CAB の最終判断は人間承認に戻す。

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
- blocker のうち、ユーザー回答が得られれば前進できるものは、止めっぱなしにせず複数の選択肢へ整理して確認する。
- 回答待ち blocker の選択肢は、原則として `推奨案`、`保守案`、`保留案`、`その他 / 自由記述` のように、判断後の次アクションが分かる形にする。
- ユーザー回答が得られたら、その回答を運用判断として記録し、必要な文書、Issue、PR へ反映したうえで、次のサイクルが進められる状態に戻す。
- 回答後も別の承認条件、CI 失敗、高リスク変更、権限変更、secret、認証・認可、production readiness 最終判断などが残る場合は、その残 blocker を分けて記録する。
- 回答が得られたら、関連 Issue に判断ログをコメントし、必要に応じてこの文書、`docs/ai-development/work-log.md`、要件正本、設計文書へ反映する。
- 回答待ちが残っている Issue は実装ジョブへ渡さない。

## Slack 投稿と回答権限

Slack 投稿は、新しい判断材料があり、設計・実装・検証・公開可否・運用判断を進めるために人間回答が必要な時だけ行います。

- 毎時サイクルの通常報告、進捗確認、既知事項の再通知、単なる問題なし報告は Slack に投稿しない。
- 通常の毎時サイクル結果は ChatGPT 内報告と `docs/ai-development/progress.md` / `docs/ai-development/work-log.md` / `docs/ai-development/logs/` への記録を中心にする。
- Slack へ投稿する場合は、日本語で 1 投稿 1 問、番号付きまたはラベル付き選択肢を添える。
- Slack で方向性を決める返信権限は、チャンネル側の参加・投稿権限で担保されるものとして扱う。
- チャンネル内で回答できる人全員に方向性回答の権限がある前提とし、特定個人だけの回答を必須にしない。
- 投稿不可、投稿失敗、または投稿条件未達の場合は、`回答待ち` または `ChatGPT 内確認事項` として記録する。

## Open Blockers

現時点ではありません。

実装ジョブは、ここまたは `docs/requirements.md` に Open ブロッカーが追加された場合、実装せず停止理由を `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に記録してください。

## 回答待ち

現時点ではありません。

## 回答済みの確認ログ

- 2026-06-24 19:51 JST: ユーザー依頼により、目的に対して公開して大丈夫か、運用に適しているかをレビュー観点へ追加し、開発中のものを `completion-scorecard.md` で 100 点満点記録する方針を採用。
- 2026-06-24 13:20 JST: ユーザー依頼「妨げを解消して、サイクルに回せるように妨げになってるものの解決方法をアナウンス」により、GitHub Actions major update 方針の回答待ちを解消。選択肢 1 の `まとめて方針化して進める` を採用し、Dependabot major update PR はまとめて triage しつつ、merge / close / recreate は PR ごとの互換性と CI 結果を確認して判断する。
- 2026-06-24 12:36 JST: Slack 投稿 `https://x-8oh3631.slack.com/archives/C0BCAL9FFSP/p1782258456427199` への返信 `1` を確認。選択肢 1 の `close` として、PR #52 `docs: switch schedule lock to ChatGPT memory` は古い内容として閉じ、current `main` を正とする方針で処理する。

不明点が実装判断、設計判断、検証判断、公開可否、運用適性に影響する場合は推測で進めず、Slack 投稿または質問文案の記録を行ってください。

## 変更時のルール

- 仕様を変える場合は、まず `docs/requirements.md` を更新対象にするか判断する。
- AI ジョブ運用上の補足、確認ログ、未確定事項はこの文書に集約する。
- 要件の二重管理を避けるため、正本の内容をこの文書へ丸ごと複製しない。
