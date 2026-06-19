# Review Job Instructions

## 対象ジョブ

- 文書体系レビュー
- セキュリティ・権限レビュー
- CAB / 変更審査レビュー
- 本番運用 readiness レビュー
- 統合レビュー

## 目的

親リポジトリ `tanaka03-sketch/ai-development-operations` の標準フローを参照しつつ、`tanaka03-sketch/roulette` の既存正本と運用方針に矛盾がないか確認します。

レビュー系ジョブは候補 Finding を出すことが目的です。原則として新規 Issue は作成せず、Issue 化や優先順位付けは Issue / Finding Triage に渡します。

## 必ず参照するもの

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/requirements.md`
4. `docs/ai-development/requirements.md`
5. `docs/ai-development/work-log.md`
6. 関連 Issue / PR

## 観点

- 文書体系レビュー: README、文書カタログ、要件正本、AI 運用文書の責務重複を確認する。
- セキュリティ・権限レビュー: 認証なし、サーバー保存なし、単一ユーザー、localStorage 前提から外れていないか確認する。
- CAB / 変更審査レビュー: 人間承認が必要な変更、rollback 困難な変更、高リスク変更を洗い出す。
- 本番運用 readiness レビュー: README、要件、実装タスク、検証状況、handover の整合を確認する。
- 統合レビュー: 直近レビューの候補 Finding、重複、依存、人間判断事項を整理する。

## 停止条件

- 仕様判断が必要だが正本に根拠がない。
- セキュリティ、権限、個人情報、入力検証の判断が未確定。
- destructive change、データ削除、認証・認可・secret 変更が含まれる。
- 本番リリース可否や CAB 最終判断が必要。

## 出力

- 候補 Finding
- 根拠資料
- 既存 Issue との重複可能性
- Issue 未作成理由
- 人間確認事項
- 次アクション
- `docs/ai-development/work-log.md` へ追記すべき要約
