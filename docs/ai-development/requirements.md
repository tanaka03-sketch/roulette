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

## Open Blockers

現時点で、この導入作業に対する Open ブロッカーはありません。

実装ジョブは、ここまたは `docs/requirements.md` に Open ブロッカーが追加された場合、実装せず停止理由を `docs/ai-development/work-log.md` に記録してください。

## 回答待ち

現時点の回答待ちはありません。

不明点が実装判断、設計判断、検証判断に影響する場合は推測で進めず、Slack 投稿または質問文案の記録を行ってください。

## 変更時のルール

- 仕様を変える場合は、まず `docs/requirements.md` を更新対象にするか判断する。
- AI ジョブ運用上の補足、確認ログ、未確定事項はこの文書に集約する。
- 要件の二重管理を避けるため、正本の内容をこの文書へ丸ごと複製しない。
