# AI 開発運用 疑似ロック手順

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-22
- 最終更新日: 2026-06-23
- ステータス: Active
- 親参照: `tanaka03-sketch/ai-development-operations:operations/scheduled-run-lock.md`

## 目的

将来 ChatGPT スケジュールを有効化する場合、前のジョブが作業中のまま後続ジョブが走ると、Issue、PR、進捗ファイル、作業ログが競合する可能性があります。

親リポジトリの方針に合わせ、ロック本体は GitHub ファイルではなく ChatGPT 側メモリーに置きます。

## 現在の扱い

現時点では、親 README の方針に合わせて 12 本のスケジュールを有効運用しません。この文書は将来有効化する場合の手順メモです。

`docs/ai-development/automation-lock.json` は過去の互換用ファイルとして残る場合がありますが、現在のロック判定元として使いません。

## ロックの考え方

| 場所 | 用途 |
| --- | --- |
| ChatGPT 側メモリー `roulette-schedule-lock.json` | 現在作業中のスケジュールがあるかを判定するロック本体 |
| `docs/ai-development/progress.md` | 前回までの作業、現在地、次アクションを確認・更新する |
| `docs/ai-development/work-log.md` または `docs/ai-development/logs/` | 実行結果、停止理由、未確定事項を記録する |
| `docs/ai-development/automation-lock.json` | 後方互換の参照ファイル。ロック判定には使わない |

## 標準手順

### 1. 作業開始前に読む

将来スケジュールを有効化した場合、定期実行エージェントは次を読む。

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/ai-development/goal.md`
4. `docs/ai-development/progress.md`
5. `docs/ai-development/automation-lock.md`
6. ChatGPT 側メモリー `roulette-schedule-lock.json`

### 2. ロック取得を判断する

- メモリー側ロックが `locked: false` の場合だけ、作業開始前にロック取得を試みる。
- メモリー側ロックが `locked: true` で `expires_at` が未来の場合は、先行スケジュールが作業中と判断し、作業を開始しない。
- メモリー側ロックが `locked: true` で `expires_at` が過去の場合は、stale lock として扱い、直近の進捗と作業ログを確認してから判断する。
- GitHub 側 `docs/ai-development/automation-lock.json` はロック判定に使わない。

### 3. ロック取得時に書く内容

```json
{
  "locked": true,
  "owner": "schedule-name-or-run-id",
  "purpose": "今回実行する作業の概要",
  "started_at": "YYYY-MM-DDTHH:mm:ss+09:00",
  "expires_at": "YYYY-MM-DDTHH:mm:ss+09:00",
  "heartbeat_at": "YYYY-MM-DDTHH:mm:ss+09:00",
  "progress_file": "tanaka03-sketch/roulette:docs/ai-development/progress.md",
  "notes": "作業中",
  "lock_source": "chatgpt-memory",
  "updated_at": "YYYY-MM-DDTHH:mm:ss+09:00"
}
```

### 4. 作業終了時

作業が完了、失敗、中断のいずれであっても、まず `docs/ai-development/progress.md`、`docs/ai-development/work-log.md`、または `docs/ai-development/logs/` に結果を残します。

記録する内容:

- 実行したジョブ
- 取得したメモリー側ロック
- やった作業
- 更新したファイル / Issue / PR
- どこまでやったか
- 次にやる作業
- 停止理由または未確定事項

その後、メモリー側ロックを `locked: false` に戻します。

## 失敗時の扱い

ロック取得、進捗更新、ロック解放のいずれかに失敗した場合は、追加の GitHub 変更を行わず、失敗内容と人間が確認すべき点を出力します。

## 注意点

- ChatGPT メモリーによる疑似ロックは、厳密な分散ロックではありません。
- 重要な本番操作、データ移行、権限変更では、人間承認と別の排他制御を使います。
- スケジュール登録または再有効化は、人間承認または追加方針が出てから行います。
