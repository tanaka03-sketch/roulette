# AI 開発運用 要件入口

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 親リポジトリ: `tanaka03-sketch/ai-development-operations`
- 作成日: 2026-06-19
- ステータス: AI 開発運用入口 / Active

## 位置づけ

この文書は AI 開発ジョブが参照する運用入口です。プロダクト仕様の正本は `docs/requirements.md` であり、この文書は正本を置き換えません。

## 正本との分担

| 種別 | 正本または集約先 |
| --- | --- |
| プロダクト要件、受入条件、仕様判断 | `docs/requirements.md` |
| 実装タスクの全体像 | `docs/implementation-tasks.md` |
| 文書分類 | `docs/requirements/document-catalog-2026-05-18.md` |
| AI ジョブ運用の未確定事項 | この文書 |
| Slack または人間確認ログ | この文書と `docs/ai-development/work-log.md` |
| ジョブ別の停止理由、検証結果 | `docs/ai-development/work-log.md` |

## roulette 固有の固定前提

- 初期版は単一ユーザー向けのクライアント完結型アプリ。
- 認証、認可、サーバー保存、外部 API 連携は対象外。
- 候補リスト、抽選済み状態、除外設定は `localStorage` に保存する。
- 個人情報、社内情報、未公開情報など端末内に残したくない情報の入力には向かない。
- 抽選は初期版では `Math.random()` ベースでよく、厳密な公平性や監査性は対象外。
- 推奨 Node.js は README と `.nvmrc` に従い Node.js 22 前提。

## GitHub Actions major update 運用方針

2026-06-24 13:20 JST のユーザー依頼により、GitHub Actions major update 方針の回答待ちは解消済みとして扱います。

- Dependabot の GitHub Actions major update PR は、まとめて方針化したうえで triage する。
- ただし merge / close / recreate は一括で機械的に行わず、PR ごとに互換性、CI 結果、README / 要件 / GitHub 運用文書との整合を確認してから扱う。
- `actions/checkout`、`actions/setup-node`、`actions/github-script` などの major update は、Node.js 22、`npm ci`、`cache: npm`、`typecheck` / `test` / `build` の成功を確認できる状態にしてから次へ進める。
- 高リスク変更、権限変更、secret、認証・認可、production readiness の最終判断が絡む場合は、人間承認へ戻す。
- この方針は AI 開発運用上の blocker 解消であり、プロダクト仕様の正本 `docs/requirements.md` を置き換えない。

## 人間判断の扱い

人間判断が Issue クローズ、実装可否、設計、検証、管理画面操作に影響する場合、AI ジョブは推測で進めません。

- 判断が必要な論点は、1 回につき 1 問だけ確認する。
- 質問は番号付き選択肢にし、利用者が番号だけで回答できるようにする。
- 選択肢にはおすすめ案と理由、回答後に GitHub へ反映する内容を明記する。
- 回答が得られたら、関連 Issue に判断ログをコメントし、必要に応じてこの文書、`docs/ai-development/work-log.md`、要件正本、設計文書へ反映する。
- 回答待ちが残っている Issue は実装ジョブへ渡さない。

## Slack 投稿と回答権限

Slack 投稿は、新しい判断材料があり、設計・実装・検証・運用判断を進めるために人間回答が必要な時だけ行います。

- 毎時サイクルの通常報告、進捗確認、既知事項の再通知、単なる問題なし報告は Slack に投稿しない。
- 通常の毎時サイクル結果は ChatGPT 内報告と `docs/ai-development/progress.md` / `docs/ai-development/work-log.md` への記録を中心にする。
- Slack へ投稿する場合は、日本語で 1 投稿 1 問、番号付きまたはラベル付き選択肢を添える。
- Slack で方向性を決める返信権限は、チャンネル側の参加・投稿権限で担保されるものとして扱う。
- チャンネル内で回答できる人全員に方向性回答の権限がある前提とし、特定個人だけの回答を必須にしない。
- 投稿不可、投稿失敗、または投稿条件未達の場合は、`回答待ち` または `ChatGPT 内確認事項` として記録する。

## Open Blockers

現時点ではありません。

実装ジョブは、ここまたは `docs/requirements.md` に Open ブロッカーが追加された場合、実装せず停止理由を `docs/ai-development/work-log.md` に記録してください。

## 回答待ち

現時点ではありません。

## 回答済みの確認ログ

- 2026-06-24 13:20 JST: ユーザー依頼「妨げを解消して、サイクルに回せるように妨げになってるものの解決方法をアナウンス」により、GitHub Actions major update 方針の回答待ちを解消。選択肢 1 の `まとめて方針化して進める` を採用し、Dependabot major update PR はまとめて triage しつつ、merge / close / recreate は PR ごとの互換性と CI 結果を確認して判断する。
- 2026-06-24 12:36 JST: Slack 投稿 `https://x-8oh3631.slack.com/archives/C0BCAL9FFSP/p1782258456427199` への返信 `1` を確認。選択肢 1 の `close` として、PR #52 `docs: switch schedule lock to ChatGPT memory` は古い内容として閉じ、current `main` を正とする方針で処理する。

不明点が実装判断、設計判断、検証判断に影響する場合は推測で進めず、Slack 投稿または質問文案の記録を行ってください。

## 変更時のルール

- 仕様を変える場合は、まず `docs/requirements.md` を更新対象にするか判断する。
- AI ジョブ運用上の補足、確認ログ、未確定事項はこの文書に集約する。
- 要件の二重管理を避けるため、正本の内容をこの文書へ丸ごと複製しない。
