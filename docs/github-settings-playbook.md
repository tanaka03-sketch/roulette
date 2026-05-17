# GitHub Settings Playbook

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-05-17
- 目的: GitHub の設定画面で行うべき変更を、迷わず実施できるようにする

## 1. `main` ブランチ保護

### 推奨設定

- Branch protection rule の対象: `main`
- Require a pull request before merging: 有効
- Require approvals: 1
- Dismiss stale pull request approvals when new commits are pushed: 有効を推奨
- Require status checks to pass before merging: 有効
- 必須 status check:
  - `test`
- Require conversation resolution before merging: 有効を推奨
- Restrict who can push to matching branches: 必要なら有効
- Allow force pushes: 無効
- Allow deletions: 無効

### 理由

- 直接 push によるレビュー抜けを防ぐ
- CI 成功前の merge を防ぐ
- 変更が入ったあとに古い approval のまま進む事故を減らす

## 2. Pull Request 設定

### 推奨設定

- Allow squash merging: 有効
- Allow merge commits: 無効または低優先
- Allow rebase merging: チーム運用次第だが、まずは無効でもよい
- Automatically delete head branches: 有効

### 理由

- 履歴を読みやすく保ちやすい
- 使い終わったブランチの掃除を減らせる

## 3. Auto-merge

### 推奨設定

- Auto-merge: 有効
- 条件は branch protection の成功を前提にする

### 理由

- レビュー済みかつ CI 成功済みの小変更をスムーズに反映しやすい

## 4. Secrets / Variables 運用

### 現状

- このアプリは現時点で必須の環境変数を持たない

### 今後のルール

- 新しい環境変数が必要になったら `.env.example` を更新する
- Secret は GitHub Actions Secrets に保存する
- `.env` 本体はコミットしない

## 5. 実施後チェック

以下が満たされていれば最低ラインに到達。

- `main` へ直接 push できない
- PR 作成時に CI が走る
- CI 未成功では merge できない
- approval なしでは merge できない
- squash merge が使える

## 6. 関連資料

- `docs/requirements/repository-audit-2026-05-17.md`
- `docs/requirements/repository-improvement-backlog-2026-05-17.md`
- `docs/requirements/repository-improvement-roadmap-2026-05-17.md`
- `CONTRIBUTING.md`
