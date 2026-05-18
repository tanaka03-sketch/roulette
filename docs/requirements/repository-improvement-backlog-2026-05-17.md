# リポジトリ改善バックログ

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-05-17
- 最終更新日: 2026-05-18
- 元資料: `docs/requirements/repository-audit-2026-05-17.md`
- 方針: すぐ着手できる単位に分解し、Issue 化しやすい粒度で整理する

## 優先順位サマリー

| Priority | テーマ | 目的 | 状態 |
| --- | --- | --- | --- |
| P0 | GitHub 運用の基盤整備 | レビュー漏れと事故防止 | 一部完了 |
| P0 | Secret / env 事故予防 | 誤コミット防止 | 完了 |
| P1 | CI の安全性と見通し改善 | 品質ゲート強化 | 一部完了 |
| P1 | 文書とテンプレート整備 | onboarding 改善 | 一部完了 |
| P2 | Release / versioning 整備 | 変更履歴の明確化 | 一部完了 |
| P2 | テスト拡張 | 回帰検知強化 | 一部完了 |
| P3 | アーキテクチャ整理 | 将来拡張のしやすさ向上 | 一部完了 |

## 推奨 Issue 一覧

### 1. `main` 保護と PR 必須ルールを整備する

- 優先度: P0
- 種別: Git運用
- 状態: 未着手
- 目的: 直接 push を減らし、レビュー前提の開発に切り替える
- 完了条件:
  - `main` が保護されている
  - pull request 経由でのみ変更可能
  - CI success が merge 条件になっている
  - 最低 1 review approval を要求する
- 補足:
  - 実装変更ではなく GitHub 設定変更が中心

### 2. `.env` と Secret 誤コミット防止ルールを追加する

- 優先度: P0
- 種別: Security
- 状態: 完了
- 目的: 将来の資格情報漏洩事故を予防する
- 完了条件:
  - `.gitignore` に `.env` ` .env.* ` が追加されている
  - `!.env.example` の扱いが定義されている
  - README に env ファイル運用の注意が追記されている

### 3. CODEOWNERS を追加してレビュー責任を明確化する

- 優先度: P0
- 種別: GitHub運用
- 状態: 完了
- 目的: 変更領域ごとのレビュー責任を明確にする
- 完了条件:
  - `.github/CODEOWNERS` が追加されている
  - `src/domain` `src/ui` `.github` `docs` の担当範囲が定義されている

### 4. PR テンプレートと Issue テンプレートを追加する

- 優先度: P1
- 種別: Documentation
- 状態: 完了
- 目的: 変更の説明品質と問い合わせ品質を揃える
- 完了条件:
  - PR テンプレートが追加されている
  - Bug / Feature / Tech Debt / Docs の Issue テンプレートが追加されている

### 5. GitHub Actions に最小権限設定を追加する

- 優先度: P1
- 種別: Security
- 状態: 完了
- 目的: `GITHUB_TOKEN` の権限を必要最小限にする
- 完了条件:
  - workflow に `permissions` が明示されている
  - 原則 `contents: read` のみになっている
- 修正候補:
  - `.github/workflows/ci.yml`

### 6. CI を見通しの良い構成に整理する

- 優先度: P1
- 種別: CI/CD
- 状態: 完了
- 目的: 失敗箇所の把握と再実行効率を上げる
- 完了条件:
  - `typecheck` `test` `build` の責務が整理されている
  - `concurrency` が追加されている
  - 将来の拡張を前提に job 名が整理されている

### 7. Dependabot を導入する

- 優先度: P1
- 種別: Dependency
- 状態: 完了
- 目的: 依存更新の停滞を防ぐ
- 完了条件:
  - `.github/dependabot.yml` が追加されている
  - npm と GitHub Actions の更新監視が設定されている

### 8. 文書の正本と旧版を整理する

- 優先度: P1
- 種別: Documentation
- 状態: 方針整理完了
- 対応 Issue: `#39`
- 目的: 誤参照を防ぐ
- 完了条件:
  - 旧ドラフト文書の保管先ルールが決まっている
  - README または docs index から正本への導線が明確になっている
- 完了内容:
  - `docs/requirements/document-catalog-2026-05-18.md` を追加した
  - 正本、運用手順、改善計画、作業ドラフトの分類を整理した
  - README から文書カタログへ到達できるようにする準備を進めた
- 未完了:
  - 必要なら README の Documents 節を分類表示へ再編する
  - 実ファイル移動が必要かどうかの再判断

### 9. Release / versioning 運用を開始する

- 優先度: P2
- 種別: Release
- 状態: 方針整理完了
- 対応 Issue: `#38`
- 目的: 変更履歴と配布単位を明確にする
- 完了条件:
  - SemVer ルールが決まっている
  - GitHub Releases の作成ルールが決まっている
  - changelog 生成または運用方法が決まっている
- 完了内容:
  - `docs/release-policy.md` で `0.y.z` ベースの運用ルールを整理済み
  - `CHANGELOG.md` を正本の変更履歴として位置づけ済み
  - `docs/requirements/release-handoff-2026-05-18.md` で手動 Release 手順を整理した
- 未完了:
  - 実際の初回 Release 作成
  - 必要に応じた自動化検討

### 10. Node バージョン固定ファイルを追加する

- 優先度: P2
- 種別: DevEx
- 状態: 完了
- 目的: ローカルと CI の差異を減らす
- 完了条件:
  - `.nvmrc` などのバージョン固定ファイルが追加されている
  - README に利用方法が追記されている

### 11. coverage gate と E2E テストを追加する

- 優先度: P2
- 種別: Testing
- 状態: 一部完了
- 目的: 回帰検知を強化する
- 完了条件:
  - 単体テストの coverage 基準が定義されている
  - 最低限の E2E シナリオが追加されている
- 補足:
  - モバイル E2E は `#32` が環境制約で停止中

### 12. `useRouletteApp.ts` の責務分割方針を決める

- 優先度: P3
- 種別: Architecture
- 状態: 方針整理完了
- 対応 Issue: `#37`
- 目的: 将来の機能追加に備える
- 完了条件:
  - UI 制御、状態更新、文言定義、永続化連携の分割方針が決まっている
  - 必要なら application 層の新設方針が整理されている
- 完了内容:
  - `docs/requirements/use-roulette-app-refactor-plan-2026-05-18.md` を追加した
  - 文言定数、候補操作更新、抽選進行制御、永続化連携の分割候補を整理した
  - すぐやる分割と後回しにする分割を分けた

## 先行着手のおすすめ順

1. `main` 保護と PR 必須ルール
2. `useRouletteApp.ts` の責務分割を Step 1 から実装する
3. 初回 Release を手動で実施する
4. 文書カタログを前提に README の Documents 節を分類表示へ並べ替える

## 備考

- `#32` は Playwright 用ブラウザ取得が `403 Forbidden` で止まるため、環境制約のある停止中タスクとして管理する
- 残件は GitHub 管理画面での設定、または中長期の設計整理と段階的実装が中心になっている
