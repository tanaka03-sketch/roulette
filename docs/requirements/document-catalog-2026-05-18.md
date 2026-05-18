# 文書カタログ

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-05-18
- 対応 Issue: `#39`

## 目的

README から参照できる主要文書について、どれを最初に見ればよいか、どれが正本か、どれが作業メモかを分かりやすくする。

この文書は、既存ファイルの移動方針ではなく、参照時の迷いを減らすための案内として使う。

## まず見る文書

日常的に最初に見る候補は次の通り。

1. `README.md`
   - リポジトリ全体の入口
2. `docs/requirements.md`
   - 現行要件の正本
3. `docs/implementation-tasks.md`
   - 実装タスクの全体像
4. `docs/phase1-foundation-design.md`
   - 初期設計の土台
5. `CHANGELOG.md`
   - 利用者向け変更履歴の正本

## 分類ルール

### A. 正本

現時点で運用上の基準として参照する資料。

- `docs/requirements.md`
- `docs/implementation-tasks.md`
- `docs/phase1-foundation-design.md`
- `README.md`
- `CHANGELOG.md`
- `docs/release-policy.md`
- `CONTRIBUTING.md`

### B. 運用手順

作業手順や GitHub / Release の運用を進めるときに参照する資料。

- `docs/github-admin-checklist.md`
- `docs/github-settings-playbook.md`
- `docs/github-label-spec.md`
- `docs/requirements/github-admin-handoff-2026-05-18.md`
- `docs/requirements/release-handoff-2026-05-18.md`
- `docs/requirements/mobile-verification-plan-2026-05-18.md`
- `docs/requirements/package-lock-handoff-2026-05-16.md`

### C. 改善計画・設計メモ

改善の優先順位や設計方針を整理した資料。現時点の判断材料として使うが、実装正本そのものではない。

- `docs/requirements/repository-audit-2026-05-17.md`
- `docs/requirements/repository-improvement-backlog-2026-05-17.md`
- `docs/requirements/repository-improvement-roadmap-2026-05-17.md`
- `docs/requirements/code-review-2026-05-18.md`
- `docs/requirements/code-review-followup-backlog-2026-05-18.md`
- `docs/requirements/use-roulette-app-refactor-plan-2026-05-18.md`
- `docs/requirements/ci-remediation-plan-2026-05-16.md`

### D. Issue 起票用・作業ドラフト

その時点の作業を前に進めるためのドラフト類。履歴価値はあるが、最新仕様の正本としては扱わない。

- `docs/issue-drafts-phase1.md`
- `docs/issue-drafts-ci.md`

## 参照の目安

### 要件を確認したいとき

- `docs/requirements.md`
- 必要に応じて `docs/phase1-foundation-design.md`

### 今やる改善を確認したいとき

- `docs/requirements/repository-improvement-backlog-2026-05-17.md`
- `docs/requirements/code-review-followup-backlog-2026-05-18.md`

### GitHub 設定や運用手順を確認したいとき

- `docs/github-admin-checklist.md`
- `docs/requirements/github-admin-handoff-2026-05-18.md`

### Release 作業をしたいとき

- `docs/release-policy.md`
- `docs/requirements/release-handoff-2026-05-18.md`
- `CHANGELOG.md`

## いま決めないこと

この文書では次のことは確定しない。

- 既存ファイルの大量移動
- `docs/archive/` の再編
- 旧文書の削除方針

これらは、実際に参照の迷いが残る場合に別タスクとして切り出す。

## 次の改善候補

1. README の Documents 節を分類ごとに並べ替える
2. 正本以外のファイル名に `draft` `plan` `handoff` などの接尾語ルールをそろえる
3. 旧資料の移動が必要になったら別 Issue で扱う
