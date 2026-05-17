# GitHubリポジトリ監査レポート

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 監査日: 2026-05-17
- 監査観点: README、ディレクトリ構成、ブランチ戦略、Issue / PR 運用、不要ファイル、重複コード、命名規則、Secrets 漏洩リスク、CI/CD、ドキュメント、技術的負債、アーカイブ候補、依存関係、GitHub Actions、ラベル設計、CODEOWNERS、テスト構成、package 管理、Docker、env 管理、release 運用

## 1. リポジトリ全体サマリー

### プロジェクトの目的

ブラウザ上で候補項目を登録し、ルーレット形式でランダムに 1 件を選出するクライアント完結型アプリを提供する。状態保存はブラウザの `localStorage` を利用する。

### 現在の状態

- 実装は成立している。
- UI、抽選ロジック、保存処理が概ね分離されている。
- 単体テストと UI テストが存在する。
- GitHub Actions による基本 CI も構成されている。
- 一方で GitHub 運用は初期段階で、PR ベース開発、CODEOWNERS、テンプレート、Release 戦略などの整備が不足している。

### 技術スタック

- React 19
- TypeScript 5
- Vite 7
- Vitest
- Testing Library
- GitHub Actions
- npm

### 保守性評価

- 72 / 100

### 危険度評価

- Medium

### 改善優先度

- High

## 2. 問題点一覧

| カテゴリ | 問題 | 影響 | 優先度 | 修正方法 |
| --- | --- | --- | --- | --- |
| Git運用 | PR 0件で、`main` 直接更新中心の運用に見える | レビュー抜け、品質ゲート形骸化 | 高 | `main` 保護、PR 必須化、レビュー必須化 |
| CI/CD | CI が 1 ジョブの直列実行のみ | 失敗原因の切り分けが弱い | 中 | `typecheck` `test` `build` を分割し、`concurrency` を追加 |
| Security | `.gitignore` に `.env` 系が未記載 | 将来の Secret 誤コミット事故 | 高 | `.env`, `.env.*`, `!.env.example` を追加 |
| Security | GitHub Actions の `permissions` が未明記 | `GITHUB_TOKEN` の権限が広くなりやすい | 中 | `permissions: contents: read` を明示 |
| Security | Actions が SHA pin ではなくバージョンタグ参照 | サプライチェーン耐性が弱い | 中 | `actions/checkout` などを commit SHA pin へ変更 |
| Documentation | README に運用ルールや参加手順が不足 | onboarding がやや弱い | 中 | Node 版、開発規約、PR 方針、Issue 方針を追記 |
| Documentation | `docs/` と `requirements/` に文書が分散 | 正本と旧版の区別ミス | 中 | 旧ドラフトを `docs/archive/` に寄せる |
| Naming | 文書の置き場と命名方針が統一されていない | 探しづらさ、誤参照 | 中 | 文書配置ルールを README か docs index に明記 |
| Testing | coverage gate、E2E、a11y テストがない | 回帰検知の範囲が限定的 | 中 | coverage 閾値、Playwright、axe などを導入 |
| Dependency | Dependabot / Renovate が未導入 | 更新漏れ、脆弱性放置 | 中 | Dependabot か Renovate を導入 |
| Release | Release 0件、タグ戦略なし | 変更履歴、配布単位が曖昧 | 高 | SemVer と GitHub Releases を開始 |
| DevEx | Node バージョン固定ファイルが見当たらない | ローカルと CI の差異発生 | 中 | `.nvmrc` などを追加 |
| Architecture | `useRouletteApp.ts` に UI 制御と状態管理が集約 | 将来の肥大化リスク | 中 | application 層や文言定数への分割 |
| GitHub運用 | ラベル体系が汎用寄り | triage と進行管理が弱い | 中 | `type/*` `priority/*` `area/*` へ拡張 |
| Repo設定 | CODEOWNERS 不在 | レビュー責任が曖昧 | 中 | `.github/CODEOWNERS` を追加 |

## 3. 不要・整理対象

### 未使用ファイル

現時点で未使用と断定できるファイルは多くない。ただし `requirements/roulette-requirements-2026-05-13.md` は旧ドラフトであり、現行の正本と分離して扱うべきである。

### 古いブランチ

- `test/write-check-20260513`
  - テスト用ブランチ名であり、一時利用の可能性が高い。
  - 用途完了済みなら削除候補。

### 放置 Issue

公開情報上、長期放置の open issue は確認できなかった。

### 巨大ファイル

確認範囲では検出なし。

### 重複コード

大きな重複は確認できない。軽微には、文言定義と状態複製の考え方が複数箇所に散在している。

### 使われていないライブラリ

`package.json` の依存数は少なく、明確な不要依存は断定できない。

### 古い Workflow

古い workflow は確認できない。workflow は `ci.yml` 1 本のみ。

### コメントアウトされたコード

確認範囲では検出なし。

### dead code

`clearRouletteState` はテスト対象ではあるが、現行 UI の主要経路では使われていない可能性がある。低優先度の整理候補。

## 4. 推奨ディレクトリ構成

```text
project/
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
├── docs/
│   ├── requirements/
│   ├── architecture/
│   ├── adr/
│   └── archive/
├── src/
│   ├── app/
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   ├── ui/
│   └── test/
├── tests/
│   ├── e2e/
│   └── a11y/
├── scripts/
├── .env.example
├── package.json
└── README.md
```

### 理由

- 現在の `domain` `storage` `ui` 分離は良い土台である。
- 将来の拡張を考えると `application` と `infrastructure` の追加で責務を明確化しやすい。
- 文書は `docs/` に統一し、旧版は `docs/archive/` へ移すと迷いが減る。
- E2E と単体テストを分けると CI 設計が明確になる。

## 5. GitHub運用改善提案

### ブランチ戦略

- `main` は保護対象にする。
- 作業ブランチは `feature/*` `fix/*` `chore/*` を推奨する。

### PR テンプレート

以下を含める。

- 目的
- 変更点
- 確認手順
- 影響範囲
- スクリーンショット欄

### Issue テンプレート

以下を分ける。

- Bug
- Feature
- Tech Debt
- Docs

### ラベル設計

以下の軸で設計する。

- `type/*`
- `priority/*`
- `area/*`
- `phase/*`
- `security`
- `tech-debt`

### Release 戦略

- GitHub Releases を正式運用する。
- `v0.x.y` の SemVer を採用する。

### Conventional Commits

- `feat:`
- `fix:`
- `docs:`
- `test:`
- `chore:`

を最低限の規約として導入する。

### CODEOWNERS

少なくとも以下の責任範囲を定義する。

- `src/domain`
- `src/ui`
- `.github`
- `docs`

### Review ルール

- 1 approval 必須
- CI success 必須
- squash merge 推奨

### Auto Merge

- 小規模変更に限定して有効化を検討する。

### Dependabot / Renovate

- 小規模リポジトリのため、まずは Dependabot で十分。

### CI 高速化

- `concurrency` の導入
- ジョブ分割
- キャッシュ活用
- 将来的な差分実行

## 6. セキュリティレビュー

| リスクレベル | 内容 | 根拠 | 推奨対応 |
| --- | --- | --- | --- |
| High | `.env` 系 ignore 未整備 | `.gitignore` に `.env` 系記載が見当たらない | `.env` ルール追加 |
| Medium | Actions の `permissions` 未指定 | `ci.yml` に `permissions` なし | 最小権限を明示 |
| Medium | Actions の SHA pin なし | `actions/checkout@v4`, `setup-node@v4` | commit SHA pin |
| Medium | 依存更新自動化なし | Dependabot / Renovate 不在 | Dependabot 導入 |
| Low | Secret の直書きは確認範囲で未検出 | 実装に API key 類は見当たらない | 継続監視 |
| Low | Docker 脆弱性は現時点で対象外 | Dockerfile 不在 | 必要時に別途監査 |

### 未確認事項

- `npm audit` 相当の外部脆弱性照合は、実行環境から npm registry へ接続制限があり未実施。

## 7. 技術的負債ランキング

| Rank | 内容 | 将来リスク | 解消コスト | 推奨時期 |
| --- | --- | --- | --- | --- |
| 1 | PR 前提の開発フロー未整備 | 品質低下、属人化 | 低 | 今すぐ |
| 2 | Release / versioning 不在 | 配布単位不明、変更履歴断絶 | 中 | 今すぐ |
| 3 | `.env` / Secret 予防策不足 | 誤コミット事故 | 低 | 今すぐ |
| 4 | CI の最小構成止まり | 回帰原因の切り分け困難 | 中 | 近いうち |
| 5 | ドキュメント配置の二重化 | 誤参照、運用混乱 | 低 | 近いうち |
| 6 | `useRouletteApp.ts` の肥大化予備軍 | 将来変更の難化 | 中 | 中期 |
| 7 | E2E / a11y テスト不在 | ブラウザ実挙動の見逃し | 中 | 中期 |

## 8. 今すぐやるべき TOP 10

1. `main` を保護して PR 必須にする。
2. `.gitignore` に `.env` 系ルールを追加する。
3. `.github/CODEOWNERS` を追加する。
4. PR テンプレートと Issue テンプレートを追加する。
5. ラベルを `type/priority/area` 体系へ整理する。
6. Release と SemVer 運用を開始する。
7. Dependabot を導入する。
8. workflow に `permissions` と `concurrency` を追加する。
9. 旧ドラフト文書を `docs/archive/` に寄せる。
10. Node バージョン固定ファイルを追加する。

## 9. 追加分析

### DDD 適合性

小規模ながら `domain` 分離があり、入口としては良い。

### Clean Architecture 適合性

`ui` と `storage` の分離はできているが、application 層は未分離。

### レイヤ分離

中程度に良好。

### Frontend / Backend 責務

Backend を持たない SPA として責務は明快。

### API 設計品質

API 不在のため対象外。

### Terraform / IaC / Kubernetes

対象外。

### Observability / Logging

未整備。フロント単体でも、将来的にはエラー収集方針があると望ましい。

### Error Handling

`localStorage` 異常系への配慮があり、これは良い点。

### Feature Flag 設計

未導入。

### キャッシュ戦略

CI の npm cache 以外は特段不要。

### scalability

現仕様の単一ユーザー用途なら十分。ただし複数ユーザーやサーバー保存には未対応。

### onboarding 容易性

中程度。README はあるが、開発規約と運用ルールの追記余地がある。

## 10. 最終整理

### 今すぐ直すべき項目

- `main` 保護
- PR 必須化
- `.env` ignore 追加
- CODEOWNERS 追加
- PR / Issue テンプレート追加
- Actions の最小権限化

### 中長期で改善すべき項目

- `useRouletteApp.ts` の分割
- application 層追加
- E2E / a11y テスト導入
- 依存更新自動化
- 文書体系統一
- Release 運用の定着

### 理想的な GitHub 運用モデル

- `main` は保護
- 作業は短命ブランチ
- Conventional Commits 採用
- PR ベース開発
- CI success 必須
- CODEOWNERS による責任分担
- Dependabot で依存更新
- SemVer と GitHub Releases で変更履歴管理
- Issue は `type/priority/area` で triage する

## 根拠

- `README.md`
- `.github/workflows/ci.yml`
- `package.json`
- `package-lock.json`
- `src/ui/RouletteApp.tsx`
- `src/ui/useRouletteApp.ts`
- `src/domain/roulette.ts`
- `src/domain/roulette.test.ts`
- `src/storage/rouletteStorage.ts`
- `src/storage/rouletteStorage.test.ts`
- `requirements/roulette-requirements-2026-05-13.md`
- GitHub 上の Branches / Issues / Pull Requests / Releases / Labels の公開状態
