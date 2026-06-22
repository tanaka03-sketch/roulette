# AI 自律開発運用の最終目標

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-22
- 最終更新日: 2026-06-23
- ステータス: Active

## 目的

この文書は、定期実行される AI 開発ジョブが毎回最初に確認する「最終的に何を達成したいか」の入口です。

最終目標は、`roulette` を既存要件に沿って安全に改善し続けられる状態にすることです。AI は、文書体系レビュー、Issue triage、設計修正、実装、検証を小さな単位で回し、未確定事項や高リスク判断を推測で進めず、人間確認へ戻します。

## プロダクト上のゴール

プロダクト仕様の正本は `docs/requirements.md` です。この文書では仕様を重複管理しません。

`roulette` は、ブラウザ上で候補を登録し、ルーレット形式でランダムに 1 件を選ぶクライアント完結型アプリとして維持します。

初期版の固定前提:

- 認証なし
- サーバー保存なし
- 外部 API 連携なし
- 単一ユーザー向け
- 状態保存は `localStorage`
- 基本検証は `npm run typecheck`、`npm test`、`npm run build`

## AI 開発運用上のゴール

定期実行の目的は、レビューだけで指摘を増やすことではありません。候補 Finding を集め、重複確認と優先順位付けを行い、実装できる単位へ分解し、検証結果まで記録して改善サイクルを閉じることです。

目指す状態:

- すべてのジョブが `AGENTS.md`、この文書、`docs/ai-development/progress.md`、`docs/ai-development/work-log.md` を読んでから動く。
- 作業中のジョブがある場合、後続ジョブは ChatGPT 側メモリー `/workspace/memory/locks/roulette-schedule-lock.json` を見て安全に停止する。
- GitHub 側 `docs/ai-development/automation-lock.json` は非推奨マーカーとしてのみ扱い、ライブなロック状態として使わない。
- 実装ジョブは、設計確定済み、未確定事項なし、Open ブロッカーなし、小さく分解済み、検証方法明確な Issue だけを扱う。
- 外部情報の検索結果は、根拠 URL と採用判断を残してから運用改善へ反映する。
- `docs/requirements.md` と AI 運用文書の役割分担を崩さない。

## 外部情報収集の方針

インターネット検索は、AI 自律開発の運用改善、GitHub Actions / GitHub API の一般仕様確認、テストやレビュー観点の改善に使います。対象リポジトリや親リポジトリで確認できる内容の代用にはしません。

採用する情報は、次の観点で評価します。

- 一次情報または信頼できる公開情報か。
- `roulette` の小規模・クライアント完結型という前提に合うか。
- 複雑さより、停止条件、記録、検証、重複防止を強めるか。
- 人間承認が必要な領域を AI が勝手に進めない設計か。

## 参考にした公開情報

- OpenAI Agents SDK の tracing は、エージェント実行の可視化とデバッグに役立つ考え方として参照: https://openai.github.io/openai-agents-python/tracing/
- OpenAI Agents orchestration は、役割分担と handoff / tools の考え方として参照: https://developers.openai.com/api/docs/guides/agents/orchestration
- Anthropic の Building Effective Agents は、単純で組み合わせ可能なワークフロー、評価ループ、段階的な自律化の考え方として参照: https://www.anthropic.com/research/building-effective-agents
- Anthropic の evals 解説は、エージェント運用を継続改善する評価観点として参照: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- GitHub Actions concurrency は、同時実行制御の公式仕様として参照。ただし ChatGPT スケジュール側では ChatGPT 側メモリーのロックを優先する: https://docs.github.com/en/actions/concepts/workflows-and-actions/concurrency

## 成功条件

- 定期実行が、目的、進捗、ChatGPT 側メモリーロック、正本、ジョブ別指示を毎回読み込む。
- 作業結果が `docs/ai-development/progress.md` と `docs/ai-development/work-log.md` に蓄積される。
- Open ブロッカー、回答待ち、高リスク判断がある場合に実装が止まる。
- 改善提案が Issue / PR / 文書更新に変換され、検証結果まで追える。
- 不要な Issue 量産、要件の二重管理、対象外機能への拡張を避けられる。
