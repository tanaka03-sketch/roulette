# roulette

ブラウザ上で候補項目を登録し、ルーレット形式でランダムに1件を選出するアプリです。

## 概要

初期版では、認証やサーバー側状態管理を持たないクライアント完結型アプリとして実装します。
候補リスト、抽選済み状態、抽選済み候補を除外するかどうかの設定は、ブラウザの `localStorage` に保存します。

## 公開利用時の注意

- このアプリは単一ユーザー向けです。
- 候補名、抽選済み状態、設定はブラウザの `localStorage` に保存されるため、共有端末や共用ブラウザでは前回利用者の内容が残ることがあります。
- 共有端末で使う場合は、利用後に候補を全削除し、必要に応じてブラウザストレージも消去してください。
- 個人情報、社内情報、未公開情報など、端末内に残したくない内容の入力には向きません。
- 初期版の抽選は `Math.random()` ベースであり、監査性や厳密な公平性が必要な用途には向きません。

## 主な機能

- 候補項目の追加、編集、削除
- 候補一覧の表示
- ルーレットまたは同等の演出による抽選
- 抽選結果の表示
- 抽選済み候補を次回抽選から除外するかどうかの切り替え
- 抽選済み状態のリセット
- ページ再読み込み後の状態復元
- PC / スマートフォン対応

## Setup

推奨 Node.js バージョンは `22` です。リポジトリ直下の `.nvmrc` を利用できます。

```bash
npm install
npm run dev
```

開発サーバー起動後は、 Vite の表示するローカル URL から利用します。

## Environment

- 現時点では、アプリ起動に必須の環境変数はありません。
- 将来追加する場合は `.env.example` を更新し、ローカルでは `.env` を使用してください。
- `.env` と `.env.*` は Git 管理対象外です。
- 本番アプリには AI 開発運用ログやデバッグ出力を残しません。production build では `console` と `debugger` を除去します。

## Verify

```bash
npm run typecheck
npm test
npm run build
```

### Mobile verification

スマートフォン対応を変更した場合は、開発サーバーを起動したうえでブラウザ DevTools の幅 390px 前後を基準に次を確認します。

- 候補追加フォーム、候補一覧、抽選パネルが横スクロールなしで表示されること
- 候補名が長い場合も行内で折り返され、編集・削除ボタンが操作できること
- 抽選開始、抽選済み状態リセット、候補全削除の各ボタンが画面幅内に収まること
- 抽選結果の長い候補名が表示領域からはみ出さないこと

## CI Note

- GitHub Actions の CI は `main` への push と pull request で自動実行されます。
- CI は `actions/setup-node@v4` の `cache: npm` を有効にしたうえで、`typecheck` `test` `build` の 3 ジョブに分かれて実行されます。
- 各ジョブでは `npm ci` を実行してから担当するチェックを実行します。
- `package-lock.json` はリポジトリ管理下に置き、ローカル手順と CI の依存関係解決方式をそろえています。
- CI の整備経緯は `docs/requirements/ci-remediation-plan-2026-05-16.md` と Issue `#13` を参照してください。

## GitHub Operations

- ラベル定義は `.github/labels.json` で管理します。
- ラベル同期は `Actions` の `Sync GitHub Labels` workflow を手動実行して行います。
- ブランチ保護や merge 設定は `docs/github-admin-checklist.md` に従って管理画面で設定します。

## Documents

### 入口と正本

- [文書カタログ](docs/requirements/document-catalog-2026-05-18.md)
- [要件定義書](docs/requirements.md)
- [実装タスク分解](docs/implementation-tasks.md)
- [Phase 1 詳細設計](docs/phase1-foundation-design.md)
- [Changelog](CHANGELOG.md)
- [Release Policy](docs/release-policy.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)
- [License](LICENSE)

### 運用手順

- [GitHub Admin Checklist](docs/github-admin-checklist.md)
- [GitHub Settings Playbook](docs/github-settings-playbook.md)
- [GitHub Label Specification](docs/github-label-spec.md)
- [AI 開発運用ログ方針](docs/ai-development/logging-policy.md)
- [Release 運用チェックリスト](docs/requirements/release-handoff-2026-05-18.md)
- [モバイル確認方針](docs/requirements/mobile-verification-plan-2026-05-18.md)
- [package-lock 受け渡し手順](docs/requirements/package-lock-handoff-2026-05-16.md)

### 改善計画と設計メモ

- [リポジトリ監査レポート](docs/requirements/repository-audit-2026-05-17.md)
- [リポジトリ改善バックログ](docs/requirements/repository-improvement-backlog-2026-05-17.md)
- [リポジトリ改善ロードマップ](docs/requirements/repository-improvement-roadmap-2026-05-17.md)
- [コードレビュー結果](docs/requirements/code-review-2026-05-18.md)
- [コードレビュー後続バックログ](docs/requirements/code-review-followup-backlog-2026-05-18.md)
- [useRouletteApp 責務分割方針](docs/requirements/use-roulette-app-refactor-plan-2026-05-18.md)
- [CI 修正方針ドラフト](docs/requirements/ci-remediation-plan-2026-05-16.md)

### 作業ドラフト

- [Phase 1 Issue ドラフト](docs/issue-drafts-phase1.md)
- [CI Issue ドラフト](docs/issue-drafts-ci.md)

## 初期版の前提

- ユーザー認証なし
- 管理画面分離なし
- 外部 API 連携なし
- サーバー側保存なし
- 同名候補は許可し、内部 ID で区別
