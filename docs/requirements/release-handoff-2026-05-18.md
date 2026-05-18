# Release 運用チェックリスト

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-05-18
- 対応 Issue: `#38`
- 参照資料:
  - `docs/release-policy.md`
  - `CHANGELOG.md`
  - `docs/requirements/repository-improvement-backlog-2026-05-17.md`

## 目的

手動 Release 運用を迷わず実施できるように、作業順と確認項目を時系列で整理する。

## 役割分担

- `CHANGELOG.md`
  - 利用者向け変更履歴の正本
- GitHub Release
  - タグ付きの配布単位と公開メモ
- `docs/release-policy.md`
  - versioning の基本ルール

## 事前条件

Release 作業に入る前に、次を満たしていることを確認する。

1. `main` に取り込みたい変更がそろっている
2. `npm run typecheck` `npm test` `npm run build` が通っている
3. 利用者向けに残すべき変更が `CHANGELOG.md` の `Unreleased` に反映されている
4. 緊急修正や未解決の重大不具合がない

## バージョン番号の決め方

- 機能追加や利用者から見た仕様変更が中心なら `0.y.0` の `y` を上げる
- バグ修正、文書修正、小さな改善が中心なら `0.y.z` の `z` を上げる
- `1.0.0` は、主要機能と運用ルールが安定した段階で別途判断する

## Release 作業手順

### 1. 変更内容を確定する

- `main` に入っている変更を確認する
- 今回の Release に含めないものがあれば先に整理する
- `CHANGELOG.md` の `Unreleased` を見直す

### 2. 次のバージョン番号を決める

- `docs/release-policy.md` のルールに沿って番号を選ぶ
- 迷う場合は、利用者影響があるかどうかを基準に `y` か `z` を決める

### 3. `CHANGELOG.md` を Release 用に更新する

- `Unreleased` 配下の内容を新しいバージョン見出しへ移す
- 例: `## [0.2.0] - 2026-05-18`
- 次回用に空の `Unreleased` を残す

### 4. GitHub 上でタグを作成する

- タグ名は `v0.y.z` 形式にする
- タグ説明には、その版の要約を 1 から 3 行で記載する

### 5. GitHub Release を作成する

- 作成したタグを選ぶ
- タイトルは `v0.y.z` にする
- 本文には `CHANGELOG.md` の該当版の内容を要約して転記する
- 必要なら既知の制約や注意点を追記する

### 6. Release 後の確認をする

- タグと Release が対応していること
- `CHANGELOG.md` と Release 本文に大きな差がないこと
- README などから参照が必要な場合は更新漏れがないこと

## 最小テンプレート

### `CHANGELOG.md` 用

```md
## [0.2.0] - 2026-05-18

### Added

- 追加内容

### Changed

- 変更内容

### Fixed

- 修正内容
```

### GitHub Release 本文用

```md
## Summary

- 主要な変更 1
- 主要な変更 2

## Notes

- 既知の制約や補足
```

## よく迷う点

### ドキュメントだけの変更でも Release するか

- 利用者や開発運用への影響が明確なら、patch 版として Release してよい
- 下書きメモだけの更新なら、次の機能変更に含めてもよい

### 複数の小修正が続いた場合

- 細かく切りすぎるより、利用者視点で意味のある単位にまとめる

### 自動化はいつ考えるか

- 手動 Release を数回回して不便な点が見えた段階で検討する
- 現時点では Conventional Commits や自動 changelog 生成は必須ではない

## 次の改善候補

1. 初回 Release のひな形を作る
2. `CHANGELOG.md` の見出しルールを固定化する
3. 将来必要になったら Release 自動化 Issue を別で切る
