# package-lock 受け渡し手順

- 作成日: 2026-05-16
- 対象: `tanaka03-sketch/roulette`
- 関連 Issue: `#13`
- 関連文書:
  - `docs/requirements/ci-remediation-plan-2026-05-16.md`
  - `docs/requirements/ci-lockfile-followup-2026-05-16.md`

## 1. 目的

この手順は、`package-lock.json` を生成できる環境で lockfile を作成し、その後の GitHub 反映と CI 確認を進めるための受け渡し用メモである。

## 2. この場で未実施の理由

現在の作業環境では npm レジストリ取得が `403 Forbidden` で失敗するため、`npm install` を完了できず、`package-lock.json` を生成できない。

## 3. 最短手順

lockfile を生成できる環境で、リポジトリ直下で次を実行する。

```bash
npm install
```

実行後、`package-lock.json` が生成されたら、そのファイルをこの作業に渡す。

## 4. 生成後に確認したいこと

- `package-lock.json` が `package.json` と同じ依存関係を前提に生成されていること
- 生成時に意図しない `package.json` の変更が入っていないこと
- 可能なら `npm test` と `npm run build` も同じ環境で通ること

## 5. 受け渡し後にこちらで続ける作業

1. `package-lock.json` を GitHub に反映する
2. 必要なら `.github/workflows/ci.yml` を `npm ci` 前提へ見直す
3. README の CI Note を本命対応完了後の内容へ更新する
4. GitHub Actions の結果を確認する
5. Issue `#13` のチェックリストを更新する

## 6. 受け渡し時にあると助かるもの

- `package-lock.json`
- 可能なら `npm test` の結果
- 可能なら `npm run build` の結果

## 7. 補足

もし `npm install` 後に `package.json` まで変わった場合は、その差分もあわせて確認してから反映する。
