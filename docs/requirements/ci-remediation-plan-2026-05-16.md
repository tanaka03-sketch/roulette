# CI 修正方針ドラフト

- 作成日: 2026-05-16
- 対象: `tanaka03-sketch/roulette`
- 関連正本: `docs/requirements.md`

## 1. 目的

GitHub Actions の CI が依存関係導入段階で停止している状態を解消し、テストとビルドまで到達する継続的検証フローを回復する。

## 2. 現状の確認結果

### 2.1 実装上の事実

- CI は `main` への push と pull request を契機に実行される。
- CI は `actions/checkout@v4`、`actions/setup-node@v4`、`npm install`、`npm test`、`npm run build` の順で実行される。
- `package.json` には `test` と `build` が定義されている。
- ドメイン、ストレージ、UI に対するテストコードが存在する。

### 2.2 失敗状況

- 2026-05-16 時点の直近 CI は、ロックファイル未検出により失敗していた。
- GitHub Actions 上の注釈では、`package-lock.json`、`npm-shrinkwrap.json`、`yarn.lock` のいずれかが必要とされていた。
- この失敗により、`npm test` と `npm run build` は未実行のまま停止していた。

### 2.3 現在の作業環境で確認できた制約

- こちらの実行環境では npm レジストリへの取得が `403 Forbidden` で失敗し、`package-lock.json` の生成を完了できなかった。
- そのため、本命案である「ロックファイル追加」をこの場で自動反映するには追加判断または別経路が必要である。

### 2.4 実施済みの暫定対応

- 2026-05-16 に `.github/workflows/ci.yml` から `cache: npm` を除去した。
- これにより、ロックファイル未配置による即時失敗は回避できる見込みである。
- ただし、依存関係の再現性を担保する本命対応は未完了である。

## 3. 修正方針候補

### 3.1 推奨案

npm を正式なパッケージ管理方式として扱い、`package-lock.json` をリポジトリ管理下に追加したうえで、CI とローカル手順を整合させる。

#### 採用理由

- 依存関係の再現性を高めやすい。
- 今後 `npm ci` へ移行する余地を残せる。
- CI 運用をローカル手順と揃えやすい。

### 3.2 当面の暫定運用

ロックファイル方針が固まるまで、`cache: npm` を外した CI で依存導入、テスト、ビルド到達を優先する。

#### 位置づけ

- 一時的な復旧策として有効。
- 依存関係の再現性改善は別途残る。
- 長期運用の正本としては推奨しない。

## 4. 推奨実施順

1. 暫定対応後の CI が `npm test` まで到達することを確認する。
2. 暫定対応後の CI が `npm run build` まで到達することを確認する。
3. `package-lock.json` を生成し、リポジトリ管理下に置く。
4. 必要に応じて依存導入コマンドを `npm ci` に見直す。
5. Node.js と GitHub Actions アクションの更新方針を別途整理する。

## 5. 受入条件

- CI が依存関係導入の段階で停止しない。
- CI が `npm test` を実行する。
- CI が `npm run build` を実行する。
- README と CI のパッケージ運用方針に明らかな矛盾がない。
- 今後のメンテナが、ロックファイル運用の前提を文書から理解できる。

## 6. 未確定事項

- 依存導入コマンドを `npm install` のまま維持するか、`npm ci` に切り替えるか。
- Node.js 22 を継続利用するか、LTS 基準に寄せるか。
- `actions/checkout` と `actions/setup-node` の更新タイミングをどう決めるか。
- 本命案のための `package-lock.json` をどの環境で生成・反映するか。

## 7. 次の実務候補

- 暫定対応後の CI 実行結果確認
- `package-lock.json` 運用ルールの README 追記
- CI 修正 PR の受入観点整理
- 本命対応としての lockfile 追加
