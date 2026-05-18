# GitHub 管理画面 実施チェックリスト

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-05-18
- 目的: GitHub 管理画面で必要な設定だけを、迷わず上から順に実施できるようにする
- 前提: コード側の準備は完了済み

## 1. いまコード側で完了していること

- `.github/CODEOWNERS` は追加済み
- `.github/PULL_REQUEST_TEMPLATE.md` は整備済み
- `.github/ISSUE_TEMPLATE/` は整備済み
- `.github/dependabot.yml` は整備済み
- `.github/workflows/ci.yml` は `typecheck` `test` `build` の 3 ジョブ構成に更新済み
- `README.md` と `docs/github-admin-checklist.md` は最新構成に合わせて更新済み

## 2. 管理画面で実施する項目

### 2-1. `main` ブランチ保護

場所:
- `Settings` → `Branches` → `Add branch protection rule`

設定値:
- Branch name pattern: `main`
- Require a pull request before merging: ON
- Required approvals: `1`
- Dismiss stale pull request approvals when new commits are pushed: ON
- Require status checks to pass before merging: ON
- Required status checks:
  - `typecheck`
  - `test`
  - `build`
- Require conversation resolution before merging: ON
- Allow force pushes: OFF
- Allow deletions: OFF

確認ポイント:
- `main` に直接 push できない
- PR を作らないと merge できない
- `typecheck` `test` `build` がそろわないと merge できない

### 2-2. Merge 設定

場所:
- `Settings` → `General` → `Pull Requests`

おすすめ設定:
- Allow squash merging: ON
- Allow merge commits: OFF でも可
- Allow rebase merging: OFF でも可
- Automatically delete head branches: ON

### 2-3. Auto-merge

場所:
- `Settings` → `General` → `Pull Requests`

おすすめ設定:
- Allow auto-merge: ON

### 2-4. ラベル確認

場所:
- `Issues` → `Labels`

確認したいもの:
- `dependencies`
- `type/bug`
- `type/feature`
- `type/docs`
- `type/tech-debt`
- `priority/high`
- `priority/medium`
- `priority/low`
- `area/ui`
- `area/domain`
- `area/storage`
- `area/ci`
- `area/docs`
- `security`

補足:
- ラベル定義は `.github/labels.json` を正本として扱う
- ラベル同期が必要なら `Sync GitHub Labels` workflow を使う

## 3. 実施後に見る場所

### ブランチ保護確認

- PR を 1 本開く
- required checks に `typecheck` `test` `build` が出ることを確認する

### CODEOWNERS 確認

- `src/ui/` や `docs/` を含む PR で reviewer 自動提案を確認する

### テンプレート確認

- 新規 PR 作成画面で PR テンプレートが出る
- New issue 画面で `Bug` `Feature` `Tech Debt` `Docs` が選べる

### Dependabot 確認

- `Insights` → `Dependency graph` → `Dependabot` 付近で有効化状況を確認する
- すぐに PR が来なくても、設定ファイルがあれば週次実行対象になる

## 4. 実施順のおすすめ

1. `main` ブランチ保護
2. Merge 設定
3. Auto-merge
4. ラベル確認
5. PR / Issue テンプレート表示確認
6. Dependabot 有効化確認

## 5. このあとコード側で再開する候補

管理画面設定が終わったら、次に再開しやすいのは次の 2 つである。

1. Playwright の環境制約を解消して `#32` を再開する
2. `useRouletteApp.ts` の責務分割方針を整理する
