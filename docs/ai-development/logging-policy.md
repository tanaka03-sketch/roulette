# AI 開発運用 ログ方針

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-26
- ステータス: Active

## 目的

AI 開発運用、定期実行、レビュー、Slack 確認、completion score の記録を、本番アプリの実行環境に混入させないための方針です。

本番アプリは、候補登録と抽選を行うクライアント完結型アプリです。AI 開発運用ログ、調査ログ、スケジュール実行ログ、Slack 確認ログ、completion score は、アプリ利用者のブラウザ、画面、`localStorage`、production bundle、console に蓄積しません。

## 本番環境へ入れないもの

次の情報は、本番アプリの実行環境へ保存・出力しません。

- AI 開発運用の作業ログ
- ChatGPT scheduled run の通常報告
- Slack 確認の質問文、回答待ち、回答ログ
- Issue / PR triage の内部判断メモ
- completion score の採点メモ
- デバッグ用の `console.log`、`console.info`、`console.debug`、`console.warn`、`console.error`
- `debugger` 文
- プロンプト、内部推論、調査メモ、運用上の一時判断

production build では `console` と `debugger` を成果物から除去します。開発中やテスト中に一時的なデバッグ出力を使う場合も、production build に残らないことを確認します。

## 本番アプリで保存してよいもの

`localStorage` に保存してよいものは、`docs/requirements.md` のデータ要件に定義されたアプリ状態だけです。

- 候補リスト
- 抽選済み状態
- 抽選済み候補を除外するかどうかの設定

運用ログ、監査ログ、抽選履歴の永続保存、分析ログ、外部送信ログは初期版の対象外です。必要になった場合は、`docs/requirements.md` の変更、設計、セキュリティ確認、人間承認を経て別 Issue として扱います。

## AI 開発運用ログの蓄積先

AI 開発運用の記録は、本番アプリの外側に蓄積します。

| 種別 | 蓄積先 |
| --- | --- |
| 現在地、次アクション、Open Blockers | `docs/ai-development/progress.md` |
| 長期の作業履歴 | `docs/ai-development/work-log.md` |
| 定期実行や個別レビューの詳細ログ | `docs/ai-development/logs/YYYY-MM-DD-*.md` |
| 運用上の未確定事項、Slack 確認ログ | `docs/ai-development/requirements.md`、`docs/ai-development/work-log.md`、`docs/ai-development/logs/` |
| completion score | `docs/ai-development/completion-scorecard.md`、関連 Issue / PR、`docs/ai-development/logs/` |
| Issue / PR に紐づく判断 | 関連 Issue / PR のコメントまたは本文 |
| スケジュール排他制御 | ChatGPT 側メモリーのロック。GitHub 側 JSON はロック判定元にしない |

Slack は判断が必要な 1 問 1 投稿の確認先として使います。通常報告、既知 blocker の再通知、問題なし報告、定期実行ログの蓄積先としては使いません。

## 記録時の制約

- 本番アプリの UI、ブラウザ console、`localStorage`、production bundle に運用ログを残さない。
- AI 運用ログに secret、token、個人情報、未公開の機密情報を記録しない。
- ユーザー入力例を記録する必要がある場合は、最小限にし、個人情報や社内情報を含めない。
- 大量の古いログ削除や移動は、この場でまとめて実施せず、別 Issue 候補として扱う。
- ログ保存先を外部サービスやサーバーへ拡張する場合は、要件更新、設計、人間承認を必須とする。

## 作業終了時チェック

作業終了時は次を確認します。

1. production build にデバッグ出力や `debugger` が残らない方針に反していない。
2. 運用ログを本番アプリの `localStorage` や画面へ保存していない。
3. 必要な作業ログは `docs/ai-development/progress.md`、`work-log.md`、または `logs/` に残した。
4. Slack へ投稿した場合は、1 投稿 1 問で、通常報告や既知 blocker の再通知になっていない。
5. 仕様変更が必要な内容は `docs/requirements.md` の更新対象かどうかを確認した。

## 変更履歴

| 日付 | 内容 |
| --- | --- |
| 2026-06-26 | 本番環境に AI 開発運用ログを入れず、運用ログを `docs/ai-development/` 配下へ蓄積する方針を追加 |
