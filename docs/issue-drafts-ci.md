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

現在の GitHub Actions CI は `actions/setup-node@v4` で `cache: npm` を有効化しているが、リポジトリ内に認識可能なロックファイルがないため、依存関係導入前に停止している。
このため `npm test` と `npm run build` まで到達できていない。

README では npm ベースのセットアップが案内されており、`package.json` には `test` と `build` が定義されている。
まずは CI がテストとビルドまで到達する前提を回復したい。

## 対応要件

- NFR-011 `main` への push 時に GitHub Actions の CI が自動実行される
- NFR-012 pull request 時にも GitHub Actions の CI が自動実行される
- NFR-013 CI は依存関係導入、テスト、ビルドまで到達できる構成を維持する
- NFR-014 CI の依存関係解決方式は、リポジトリのパッケージ運用方針と整合している
- AC-015 `main` への push 時に GitHub Actions の CI が自動起動する
- AC-016 pull request 時にも GitHub Actions の CI が自動起動する
- AC-017 CI が依存関係導入、テスト、ビルドまで到達し、ロックファイル運用と矛盾しない

## 推奨方針

- npm を正式運用とし、`package-lock.json` をリポジトリ管理下に置く
- CI がロックファイルを認識したうえで依存導入、テスト、ビルドまで進むようにする
- 必要に応じて `npm install` と `npm ci` のどちらを採るかを合わせて整理する

## 作業内容

- 現行 CI 失敗原因を再確認する
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

- ロックファイルを採用する場合、生成物が適切に管理されているか
- CI の修正が暫定回避だけで終わっていないか
- README と CI の前提がずれていないか
- テストとビルドのどちらか片方だけで満足していないか

## チェックリスト

- [ ] CI 失敗原因を確認した
- [ ] 依存関係運用方針を確定した
- [ ] GitHub Actions 設定を見直した
- [ ] CI が `npm test` を実行した
- [ ] CI が `npm run build` を実行した
- [ ] README との整合を確認した
```
