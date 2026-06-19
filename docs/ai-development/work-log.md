# AI 開発運用 Work Log

## 2026-06-19 AI 開発運用導入

- ジョブ種別: 導入 / 文書体系整備 / スケジュール準備
- 対象リポジトリ: `tanaka03-sketch/roulette`
- 親リポジトリ: `tanaka03-sketch/ai-development-operations`

### 参照した既存正本

- `README.md`
- `CONTRIBUTING.md`
- `docs/requirements.md`
- `docs/implementation-tasks.md`
- `docs/requirements/document-catalog-2026-05-18.md`
- `.github/PULL_REQUEST_TEMPLATE.md`

### 参照した親リポジトリ資料

- `README.md`

次の指定パスは取得できませんでした。見つかった README 方針と対象リポジトリの既存正本を優先して導入しました。

- `adoption/child-repository-contract.md`
- `adoption/agent-development-procedure-setup.md`
- `templates/requirements/requirements-definition.md`
- `templates/ai-development/agent-instructions.md`
- `templates/ai-development/work-log.md`
- `templates/ai-development/job-instructions/*.md`

### 実施内容

- `AGENTS.md` を追加し、必読順序、正本、停止条件、人間承認、禁止操作、検証コマンドを明文化。
- `docs/ai-development/` 配下に AI 開発運用入口、共通指示、作業ログ、ジョブ別指示を追加。
- PR テンプレートと Issue テンプレートを AI 開発運用に合わせて更新・追加。
- 定期実行 12 本を `Asia/Tokyo` で登録する前提を文書化。

### Open Blockers

現時点ではありません。

### 回答待ち

現時点ではありません。

### 検証

文書・テンプレート導入のみのため、コード検証は未実行です。

- `npm run typecheck`: 未実行（コード変更なし）
- `npm test`: 未実行（コード変更なし）
- `npm run build`: 未実行（コード変更なし）

### 次アクション

- 導入 PR を確認し、問題なければ merge する。
- 定期実行結果を見ながら、必要ならジョブ別指示を roulette の実運用に合わせて調整する。
