# AI 開発運用 ロック手順

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-22
- 最終更新日: 2026-06-23
- ステータス: Active
- ロック状態の正本: ChatGPT 側メモリー `/workspace/memory/locks/roulette-schedule-lock.json`
- GitHub 側の旧状態ファイル: `docs/ai-development/automation-lock.json` は非推奨マーカーとしてのみ保持

## 目的

ChatGPT スケジュールが複数ジョブを実行する場合、前のジョブがまだ作業中のまま後続ジョブが走ると、Issue、PR、進捗ファイル、作業ログが競合する可能性があります。

そのため、今後は GitHub リポジトリ内のファイルではなく、ChatGPT 側メモリーの `roulette-schedule-lock.json` をロック状態の正本として使います。GitHub 側の `automation-lock.json` は、過去運用との互換説明と非推奨マーカーであり、ライブなロック状態として更新しません。

## 基本方針

- すべてのスケジュールジョブは、GitHub 変更や Issue / PR 操作の前に ChatGPT 側メモリーのロック状態を読む。
- `locked` が `true` で、`expiresAt` が現在時刻より未来の場合は作業しない。
- `locked` が `false`、または `expiresAt` を過ぎている場合だけロック取得を試みる。
- ロック取得は ChatGPT 側メモリー `/workspace/memory/locks/roulette-schedule-lock.json` の更新で行う。
- メモリーの読み取り、更新、保存に失敗した場合は、GitHub 変更を行わず停止する。
- 作業終了時は、必要な `progress.md` と `work-log.md` の更新後に、ChatGPT 側メモリーのロックを解放する。

## ロック状態ファイル

ChatGPT 側メモリーの `/workspace/memory/locks/roulette-schedule-lock.json` は次の構造を使います。

```json
{
  "locked": false,
  "owner": null,
  "job": null,
  "runId": null,
  "startedAt": null,
  "expiresAt": null,
  "updatedAt": "2026-06-22T23:08:00Z",
  "note": "Initial unlocked state for tanaka03-sketch/roulette ChatGPT schedule lock. This file is the active lock state; GitHub-side automation-lock.json is deprecated."
}
```

## 取得手順

1. `/workspace/memory/locks/roulette-schedule-lock.json` を取得し、内容を確認する。
2. `locked` が `true` で `expiresAt` が未来なら、後続ジョブは実行しない。
3. 停止した場合は、チャット出力で「メモリーロック中のためスキップ」と報告する。GitHub 側の作業ログ更新も行わない。
4. ロック取得可能なら、次の内容へ更新する。

```json
{
  "locked": true,
  "owner": "ChatGPT schedule",
  "job": "実行するジョブ名",
  "runId": "スケジュール実行を識別できる値。なければ開始時刻",
  "startedAt": "ISO-8601 UTC",
  "expiresAt": "ISO-8601 UTC。原則 startedAt から 45 分後",
  "updatedAt": "ISO-8601 UTC",
  "note": "Working."
}
```

5. メモリーへの保存が成功した場合だけ作業を進める。
6. 保存できない場合は、ロック未取得として停止する。

## 解放手順

作業終了時、または停止条件により終了する時は、必要な `progress.md` と `work-log.md` の更新後、ChatGPT 側メモリーのロックを次の状態へ戻します。

```json
{
  "locked": false,
  "owner": null,
  "job": null,
  "runId": null,
  "startedAt": null,
  "expiresAt": null,
  "updatedAt": "ISO-8601 UTC",
  "note": "Released by the last completed job."
}
```

## 期限切れロックの扱い

`expiresAt` を過ぎたロックは、前回ジョブが異常終了した可能性があるため、次のジョブが引き継いでよいです。ただし、作業前に `work-log.md` と直近 Issue / PR を確認し、前回の中途半端な更新がないかを確認します。

期限切れロックを上書きした場合は、作業後に `work-log.md` へ次を記録します。

- 期限切れだったロックの `job`
- `startedAt`
- `expiresAt`
- 引き継いだジョブ
- 確認したファイル / Issue / PR

## 人間による解除

明らかにロックが残り続けている場合、人間または次の ChatGPT ジョブが、メモリー内の `/workspace/memory/locks/roulette-schedule-lock.json` を確認して `locked: false` に戻してよいです。その場合も、可能なら `work-log.md` に理由を残します。

## GitHub 側旧ロックファイルの扱い

`docs/ai-development/automation-lock.json` は、過去に GitHub ファイル更新の SHA 競合を使っていたことを示す非推奨マーカーとして残します。

- ライブなロック状態として読まない。
- ロック取得や解放のために更新しない。
- 削除が必要になった場合は、文書カタログや必読順序への影響を確認し、別 Issue または別 PR で扱う。

## 注意点

この方式は ChatGPT 側メモリーを使った運用ロックです。GitHub リポジトリだけを見ても現在のロック状態は分かりません。スケジュールジョブは、必ずメモリーを確認できる実行環境でだけ GitHub 変更を行ってください。

GitHub Actions 上のワークフローには、必要に応じて GitHub Actions の `concurrency` も併用します。ChatGPT スケジュール側の排他は、ChatGPT 側メモリーのロックを優先します。
