# lockfile 本命対応メモ

- 作成日: 2026-05-16
- 対象: `tanaka03-sketch/roulette`
- 関連: `docs/requirements/ci-remediation-plan-2026-05-16.md`
- 関連 Issue: `#13`

## 1. 目的

CI の暫定復旧後に、npm の lockfile 運用を正式化し、依存関係の再現性と CI 安定性を高める。

## 2. 本命対応で想定する差分

### 2.1 追加または更新するファイル

- `package-lock.json`
- `.github/workflows/ci.yml`
- `README.md`
- 必要に応じて `docs/requirements.md`
- 必要に応じて `docs/requirements/ci-remediation-plan-2026-05-16.md`

### 2.2 想定変更内容

#### `package-lock.json`

- 現行 `package.json` から生成した lockfile を追加する。
- 生成元 Node.js / npm の情報が過度に古くならない環境で作成する。
- 生成後は差分が `package.json` と整合していることを確認する。

#### `.github/workflows/ci.yml`

- lockfile 導入後は `cache: npm` の再導入を検討する。
- 依存導入コマンドは `npm install` のまま維持する案と `npm ci` に切り替える案がある。
- 再現性重視なら `npm ci` が有力候補。

#### `README.md`

- セットアップ手順と検証手順を lockfile 運用に合わせる。
- `npm ci` を採る場合は Verify または Setup の記述も合わせて見直す。
- CI Note は暫定対応から本命対応完了に合わせて更新する。

## 3. 推奨の実施順

1. lockfile を生成できる環境を確保する。
2. `package-lock.json` を追加する。
3. `.github/workflows/ci.yml` の依存導入方式を確定する。
4. README と CI Note を更新する。
5. GitHub Actions の結果を確認する。
6. Issue #13 のチェックリストを更新する。

## 4. 受入観点

- `package-lock.json` が `package.json` と矛盾しない。
- CI が依存導入、テスト、ビルドまで到達する。
- README と CI の手順が一致している。
- 暫定対応の説明が残り続けず、本命対応完了後の状態に更新される。

## 5. この場で未実施の理由

- 現在の実行環境では npm レジストリへの取得が `403 Forbidden` で失敗し、lockfile を生成できなかった。
- そのため、本命対応は lockfile を生成できる環境での反映が前提となる。
