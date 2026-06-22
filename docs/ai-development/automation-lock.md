# AI 開発運用 疑似ロック手順

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-22
- ステータス: Active
- 状態ファイル: `docs/ai-development/automation-lock.json`

## 目的

ChatGPT スケジュールが 5 分おきに複数ジョブを実行する場合、前のジョブがまだ作業中のまま後続ジョブが走ると、Issue、PR、進捗ファイル、作業ログが競合する可能性があります。

そのため、GitHub 上の `docs/ai-development/automation-lock.json` を疑似ロックとして使い、先行ジョブが作業中のときは後続ジョブを停止します。

## 基本方針

- すべてのスケジュールジョブは、作業前にロック状態を読む。
- `locked` が `true` で、`expiresAt` が現在時刻より未来の場合は作業しない。
- `locked` が `false`、または `expiresAt` を過ぎている場合だけロック取得を試みる。
- ロック取得は GitHub contents API の現在 SHA を指定した更新で行う。
- 更新時に SHA 競合が起きた場合は、他ジョブが先に取得したものとして停止する。
- 作業終了時は、`progress.md` と `work-log.md` を更新してからロックを解放する。

## ロック状態ファイル

`docs/ai-development/automation-lock.json` は次の構造を使います。

```json
{
  "locked": false,
  "owner": null,
  "job": null,
  "runId": null,
  "startedAt": null,
  "expiresAt": null,
  "updatedAt": "2026-06-22T02:45:00Z",
  "note": "Initial unlocked state."
}
```

## 取得手順

1. `docs/ai-development/automation-lock.json` を取得し、内容と blob SHA を確認する。
2. `locked` が `true` で `expiresAt` が未来なら、後続ジョブは実行しない。
3. 停止した場合は、可能なら `docs/ai-development/work-log.md` に「ロック中のためスキップ」と記録する。ただし記録更新も競合しそうな場合は、チャット出力のみでよい。
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

5. 更新が成功した場合だけ作業を進める。
6. 更新が失敗した場合は、同時実行競合として停止する。

## 解放手順

作業終了時、または停止条件により終了する時は、`progress.md` と `work-log.md` を更新したあと、`automation-lock.json` を次の状態へ戻します。

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

期限切れロックを上書きした場合は、`work-log.md` に次を記録します。

- 期限切れだったロックの `job`
- `startedAt`
- `expiresAt`
- 引き継いだジョブ
- 確認したファイル / Issue / PR

## 人間による解除

明らかにロックが残り続けている場合、人間が `automation-lock.json` を `locked: false` に戻してよいです。その場合も `work-log.md` に理由を残します。

## 注意点

この方式は GitHub ファイル更新の SHA 競合を使った疑似ロックです。完全な分散ロックではありませんが、ChatGPT スケジュールの順次運用では、同時書き込みと後続ジョブの暴走を避けるための実用的な安全策として扱います。

GitHub Actions 上のワークフローには、必要に応じて GitHub Actions の `concurrency` も併用します。ChatGPT スケジュール側の排他は、このファイルロックを優先します。
