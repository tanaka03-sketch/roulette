# CI Issue ドラフト

- 更新日: 2026-05-16
- 対象:
  - CI-001 GitHub Actions の依存関係運用を整合させる
- 参照:
  - `docs/requirements.md`
  - `docs/requirements/ci-remediation-plan-2026-05-16.md`
  - `README.md`

この文書は GitHub Issue にそのまま転記できる本文ドラフトである。

---

## Issue CI-001: GitHub Actions の依存関係運用を整合させる

### タイトル案

`CI: lockfile 運用と GitHub Actions 設定を整合させる`

### 本文案

```md
## 背景

GitHub Actions CI はロックファイル未検出により、依存関係導入前に停止していた。
そのため `npm test` と `npm run build` まで到達できていなかった。

2026-05-16 時点で、暫定対応として `.github/workflows/ci.yml` から `cache: npm` は除去済みである。
次は、この暫定対応後に CI が最後まで到達するかを確認しつつ、本命対応である lockfile 運用を確定したい。

README では npm ベースのセットアップが案内されており、`package.json` には `test` と `build` が定義されている。
CI とローカルの前提を揃えた状態にしたい。

## 対応要件

- NFR-011 `main` への push 時に GitHub Actions の CI が自動実行される
- NFR-012 pull request 時にも GitHub Actions の CI が自動実行される
- NFR-013 CI は依存関係導入、テスト、ビルドまで到達できる構成を維持する
- NFR-014 CI の依存関係解決方式は、リポジトリのパッケージ運用方針と整合している
- AC-015 `main` への push 時に GitHub Actions の CI が自動起動する
- AC-016 pull request 時にも GitHub Actions の CI が自動起動する
- AC-017 CI が依存関係導入、テスト、ビルドまで到達し、ロックファイル運用と矛盾しない

## 推奨方針

- まずは暫定対応後の CI 結果を確認する
- そのうえで npm を正式運用とし、`package-lock.json` をリポジトリ管理下に置く本命対応へ進む
- 必要に応じて `npm install` と `npm ci` のどちらを採るかを合わせて整理する

## 作業内容

- 暫定対応後の CI 実行結果を確認する
- npm ロックファイル運用方針をコードとドキュメントに反映する
- GitHub Actions 設定がロックファイル前提と矛盾しないことを確認する
- CI が `npm test` まで到達することを確認する
- CI が `npm run build` まで到達することを確認する
- README のセットアップ / 検証手順との不整合がないことを確認する

## 完了条件

- GitHub Actions CI が依存関係導入で停止しない
- GitHub Actions CI が `npm test` を実行する
- GitHub Actions CI が `npm run build` を実行する
- ロックファイル運用と CI 設定の前提が一致している
- README と CI の手順に明らかな矛盾がない

## レビュー観点

- 暫定対応後の CI 結果が確認できているか
- lockfile を採用する場合、生成物が適切に管理されているか
- CI の修正が暫定回避だけで終わっていないか
- README と CI の前提がずれていないか
- テストとビルドのどちらか片方だけで満足していないか

## チェックリスト

- [ ] 暫定対応後の CI 結果を確認した
- [ ] 依存関係運用方針を確定した
- [ ] GitHub Actions 設定を見直した
- [ ] CI が `npm test` を実行した
- [ ] CI が `npm run build` を実行した
- [ ] README との整合を確認した
```
