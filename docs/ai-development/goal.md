# AI 開発運用の目的

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-22
- 最終更新日: 2026-06-23
- ステータス: Active

## 目的

この文書は、`roulette` に AI 開発運用を導入・維持するときに確認する目的の入口です。

親リポジトリ `tanaka03-sketch/ai-development-operations` の README と playbook を読み取り専用で参照し、`roulette` の既存正本と矛盾しない範囲で、Issue triage、手順整備、レビュー指摘の分類、handover を小さく進めます。

## プロダクト上のゴール

プロダクト仕様の正本は `docs/requirements.md` です。この文書では仕様を重複管理しません。

`roulette` は、ブラウザ上で候補を登録し、ルーレット形式でランダムに 1 件を選ぶクライアント完結型アプリとして維持します。

初期版の固定前提:

- 認証なし
- サーバー保存なし
- 外部 API 連携なし
- 単一ユーザー向け
- 状態保存は `localStorage`
- 基本検証は `npm run typecheck`、`npm test`、`npm run build`

## AI 開発運用上のゴール

親リポジトリの現行方針に合わせ、12 本の個別定期実行ではなく、1 本のタスク処理サイクルで運用します。

目指す状態:

- `docs/ai-development/progress.md` の「次にやる作業」から、毎回 1 件だけ選んで進める。
- 選んだ作業は、親 playbook の Issue Intake、Implementation PR、Review Triage、CI Failure、Scheduled Maintenance、Spec Gate、Storage Conflict Guard のいずれかに分類する。
- レビュー指摘はそのまま実装へ流さず、Review Triage または Issue Triage で分類する。
- 実装は、設計確定済み、未確定事項なし、Open ブロッカーなし、小さく分解済み、検証方法明確な Issue だけを扱う。
- スケジュール登録、PR 作成、プロダクトコード変更、本番操作、破壊的変更、権限変更は、人間承認または明確な依頼がある場合だけ行う。
- `docs/requirements.md` と AI 運用文書の役割分担を崩さない。

## 参照する親資料

- `README.md`
- `playbooks/automated-development-flow.md`
- `playbooks/github-development-loop.md`
- `playbooks/review-finding-triage.md`
- `playbooks/spec-gate.md`
- `playbooks/storage-conflict-guard.md`
- `operations/scheduled-run-lock.md`
- `templates/github-issue/ai-development-task.md`
- `templates/github-issue/review-finding.md`
- `templates/github-pr/pull-request-template.md`

## 成功条件

- 親リポジトリに存在しない運用仕様を `roulette` 側で独自に増やさない。
- 旧 12 ジョブ別スケジュールへ戻さない。
- GitHub ファイルをロック本体として扱わない。
- Open ブロッカー、回答待ち、高リスク判断がある場合に実装が止まる。
- 改善提案が Issue / PR / 文書更新に変換される前に triage される。
- 不要な Issue 量産、要件の二重管理、対象外機能への拡張を避けられる。
