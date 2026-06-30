# AI 開発運用の目的

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-22
- 最終更新日: 2026-06-30
- ステータス: Active

## 目的

この文書は、`roulette` に AI 開発運用を導入・維持するときに確認する目的の入口です。

親リポジトリ `tanaka03-sketch/ai-development-operations` の README と playbook を読み取り専用で参照し、`roulette` の既存正本と矛盾しない範囲で、Issue triage、手順整備、レビュー指摘の分類、minimal implementation review、service publication review、human decision queue、handover、completion scoring を小さく進めます。

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

公開可否を確認するときは、README の「公開利用時の注意」とこの固定前提に照らして、目的に対して公開して大丈夫かを判定します。最終公開、本番運用 readiness、CAB 判断は人間承認に戻します。

## AI 開発運用上のゴール

親リポジトリの現行方針に合わせ、旧 12 本の個別定期実行ではなく、次の 3 本の ChatGPT scheduled run で運用します。

- 実装短周期サイクル
- レビュー 1 時間サイクル
- 人間確認 / Slack 1 時間サイクル

目指す状態:

- `docs/ai-development/progress.md` の「次にやる作業」から、毎回 1 件だけ選んで進める。
- 選んだ作業は、親 playbook の Issue Intake、Implementation PR、Review Triage、CI Failure、Scheduled Maintenance、Spec Gate、Storage Conflict Guard、Minimal Implementation Review、Completion Scorecard、Service Publication Review、Repository Decision Queue のいずれかに分類する。
- Completion Scorecard を報告 gate として使い、作業中のものを目的に対して 100 点満点で記録する。
- レビューサイクルでは、目的に対して公開して大丈夫か、現在の AI 開発運用に適しているかを確認する。
- レビュー指摘と Minimalism Findings はそのまま実装へ流さず、Review Triage または Issue Triage で分類する。
- 実装は、設計確定済み、未確定事項なし、Open ブロッカーなし、小さく分解済み、検証方法明確な Issue だけを扱う。
- 人間判断が必要な論点は、Slack 確認だけで終わらせず、必要に応じて `.github/agent-decisions.yml` と `needs-human-decision` Issue に耐久的に残す。
- スケジュール登録、PR 作成、プロダクトコード変更、本番操作、公開可否の最終判断、破壊的変更、権限変更は、人間承認または明確な依頼がある場合だけ行う。
- `docs/requirements.md` と AI 運用文書の役割分担を崩さない。

## 参照する親資料

- `README.md`
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

## Completion Score の使い方

- 採点基準は `docs/ai-development/completion-scorecard.md` を使います。
- 親 `playbooks/completion-scorecard.md` の 100 点配分を標準にします。
- 各 Issue / PR / scheduled run は、完了候補になる前に completion score または scoring blocker を残します。
- 90 点未満は親 scorecard 上の publish-ready / operation-ready として扱いません。
- 95 点未満は `roulette` の自律運用上の完全完了とは扱いません。
- 80 点未満は公開・merge readiness として扱いません。
- 採点できない場合は、目的、受入条件、対象出力、検証方法のどれが不足しているかを記録し、実装へ進みません。

## 成功条件

- 親リポジトリに存在しない運用仕様を `roulette` 側で独自ループとして増やさない。
- 旧 12 ジョブ別スケジュールへ戻さない。
- GitHub ファイルをロック本体として扱わない。
- Open ブロッカー、回答待ち、高リスク判断がある場合に実装が止まる。
- 改善提案が Issue / PR / 文書更新に変換される前に triage される。
- 作業中のものが、目的に対して 100 点満点で記録される。
- レビューで、公開可否と運用適性が明示される。
- Minimal Implementation Review により、不要な抽象化、不要依存、過剰実装を増やさない。
- Service Publication Review により、公開前の目的適合、安全性、ユーザー導線、運用可能性を確認できる。
- Repository Decision Queue により、人間判断が必要な論点を GitHub 上に追跡可能にできる。
- 不要な Issue 量産、要件の二重管理、対象外機能への拡張を避けられる。
