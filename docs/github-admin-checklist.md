# GitHub Admin Checklist

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-05-17
- 最終更新日: 2026-05-18
- 目的: GitHub 管理画面で必要な最小操作を、上から順にそのまま実施できるようにする

## 先にやること

- GitHub リポジトリの Settings を開く
- 以降はこの順番で進める

## 1. `main` ブランチ保護

場所の目安:
- `Settings` → `Branches` → `Add branch protection rule`

設定内容:
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

終わったら確認すること:
- `main` へ直接 push できない
- PR なしでは merge できない
- CI の 3 ジョブが成功しないと merge できない

## 2. Merge 設定

場所の目安:
- `Settings` → `General` → `Pull Requests`

設定内容:
- Allow squash merging: ON
- Allow merge commits: OFF でも可
- Allow rebase merging: OFF でも可
- Automatically delete head branches: ON

## 3. Auto-merge

場所の目安:
- `Settings` → `General` → `Pull Requests`

設定内容:
- Allow auto-merge: ON

## 4. ラベル作成

場所の目安:
- `Issues` → `Labels` → `New label`

作るラベル:
- `type/bug` `d73a4a`
- `type/feature` `0e8a16`
- `type/docs` `1d76db`
- `type/tech-debt` `6f42c1`
- `priority/high` `b60205`
- `priority/medium` `fbca04`
- `priority/low` `c2e0c6`
- `area/ui` `bfd4f2`
- `area/domain` `d4c5f9`
- `area/storage` `f9d0c4`
- `area/ci` `5319e7`
- `area/docs` `0e8a16`
- `security` `b60205`
- `dependencies` `0366d6`

## 5. 起票済み Issue への推奨ラベル

- `#20`: `type/tech-debt`, `priority/high`, `area/ci`
- `#21`: `type/docs`, `priority/medium`, `area/docs`
- `#22`: `type/tech-debt`, `priority/medium`, `area/docs`
- `#23`: `type/tech-debt`, `priority/medium`, `area/ci`
- `#24`: `type/docs`, `priority/medium`, `area/docs`

## 参照資料

- `docs/github-settings-playbook.md`
- `docs/github-label-spec.md`
