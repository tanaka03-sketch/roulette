# Contributing

## 基本方針

- 変更は可能な限り pull request 経由で行う
- 小さく分かりやすい変更単位で進める
- ドキュメントと実装の差分をできるだけ残さない

## 推奨ブランチ名

- `feature/...`
- `fix/...`
- `chore/...`
- `docs/...`

## 推奨コミット接頭辞

- `feat:`
- `fix:`
- `docs:`
- `test:`
- `chore:`
- `ci:`

## ローカル確認

```bash
npm run typecheck
npm test
npm run build
```

## pull request の考え方

- 変更目的を最初に明確にする
- 影響範囲を短くまとめる
- 必要ならスクリーンショットを添える
- 仕様変更時は関連ドキュメントも更新する

## ドキュメント運用

- 現行の正本は `docs/` 配下を優先して参照する
- 旧版資料は `docs/archive/` に保管する
- Release の考え方は `docs/release-policy.md` を参照する
