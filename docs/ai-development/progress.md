# AI 開発運用 Progress

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-22
- 最終更新日: 2026-07-04
- ステータス: Active / human decisions waiting and Issue #60 blocked by Storage Conflict Guard

## 目的

この文書は、AI 開発運用で現在地、停止条件、次にやる作業を短く確認するための進捗入口です。詳細な履歴は `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に残します。

## 現在地

| 項目 | 状態 |
| --- | --- |
| 既存要件正本 | `docs/requirements.md` が正本 |
| AI 運用入口 | `docs/ai-development/requirements.md` |
| 人間判断キュー | `.github/agent-decisions.yml`。Issue #54 / #55 / #56 / #58 が waiting-human |
| Development-ready queue | Issue #60 / #61 / #57 / #59 |
| 現在の実装ブロッカー | Issue #60 は Storage Conflict Guard 未通過。full current tree enumeration と residual search を保証できる tooling 経路が必要 |
| ChatGPT スケジュール | 旧 12 本は開発サイクルとして使わない。実装短周期、レビュー 1 時間、人間確認 / Slack 1 時間の 3 本運用を維持 |
| Slack 投稿方針 | 新しい判断材料があり人間回答が必要な時だけ投稿。通常報告、既知事項の再通知、問題なし報告は投稿しない |

## PR / Issue 現在地

| 優先 | 対象 | 状態 | 次アクション |
| ---: | --- | --- | --- |
| P0 | Issue #60 `Implement: 現在ファイルのSlack内部識別子を公開用プレースホルダーへ置換する` | open / `ready-for-automation` / Storage Conflict Guard 未通過 | full current tree を列挙できる checkout または connector 経路を確保してから再実行する。現在ファイルの置換だけを行い、履歴書き換え・大量ログ削除はしない |
| P1 | Issue #61 `Improve: 最後の1件で表示される抽選不可メッセージを現行仕様に合わせて明確化する` | open / `ready-for-automation` | 現行要件を維持し、eligible 1件時のUIメッセージとテストを改善する。#60 の公開前ブロッカーと実装停止条件を確認してから扱う |
| P2 | Issue #57 `Docs: 候補名120文字制限の文字数基準を明文化する` | open / `ready-for-automation` | 120文字制限の JavaScript 文字列長基準を文書化する |
| P2 | Issue #59 `Cleanup: handleClearCandidates の到達不能なタイマークリア処理を整理する` | open / `ready-for-automation` | 到達不能な timer clear ブロックだけを削除する |
| P3 | Issue #56 `公開前: Slack内部URL/IDを公開リポジトリから除去または匿名化する` | open / `needs-human-decision` / `HD-20260702-001` | #60 で現在ファイル対応を進める。履歴書き換え・大量ログ削除など広い判断が必要な場合は #56 に戻す |
| P3 | Issue #58 `Decision: 最後の1件を抽選できない挙動を維持するか変更するか決める` | open / `needs-human-decision` / `HD-20260702-002` | #61 で現行仕様内の文言改善を進める。仕様変更が必要なら #58 に戻す |
| P4 | Issue #54 `Decision: HD-20260630-001 PR #18 vitest major update の扱い` | open / `needs-human-decision` | #60 の公開前ブロッカー対応後に確認する |
| P4 | Issue #55 `Decision: HD-20260630-002 PR #27 plugin-react major update の扱い` | open / `needs-human-decision` | #60 / #54 の後に確認する |
| P4 | PR #18 `vitest` major update | open / mergeable false / CI failure | Issue #54 の判断が反映されるまで merge / close / recreate / dependency update はしない |
| P4 | PR #27 `@vitejs/plugin-react` major update | open / mergeable false / CI failure / peer dependency mismatch | Issue #55 の判断が反映されるまで merge / close / recreate / dependency update はしない |

## 直近の実施内容

### 2026-07-04 13:30 JST Human-check / Slack Cycle

- 人間確認 / Slack 1 時間サイクルで Issue #54 / #55 / #56 / #58 と `.github/agent-decisions.yml` を確認した。
- Issue #54 / #55 にはコメントがなく、人間判断回答は見つからなかった。
- Issue #56 / #58 のコメントは子 Issue #60 / #61 の切り出し記録であり、人間判断回答ではなかった。
- PR #18 / #27 は open / blocked のままで、関連 Decision Issue の回答待ちは解除されていない。
- 既定 Slack チャンネルで `HD-20260630-001`、`HD-20260630-002`、`HD-20260702-001`、`HD-20260702-002` を検索したが回答候補は見つからなかった。
- PR #18 の既存 Slack thread に返信はなく、PR #27 / plugin-react / Vite 8 の方針回答候補も見つからなかった。
- 新しい判断材料がなかったため、Slack 投稿は行っていない。
- 実装、dependency update、PR close / recreate、agent-decisions 反映、requirements 反映、関連 PR コメント追加は行っていない。
- Completion score: 60 / 100。公開可否: 不可。運用適性: 停止記録としては適切だが、実装完了や公開 readiness としては扱えない。
- 詳細ログ: `docs/ai-development/logs/2026-07-04-1330-human-slack-cycle-decision-queue.md`

### 2026-07-03 08:30 JST Human-check / Slack Cycle

- 人間確認 / Slack 1 時間サイクルで Issue #54 / #55 / #56 / #58 と `.github/agent-decisions.yml` を確認した。
- Issue #54 / #55 にはコメントがなく、人間判断回答は見つからなかった。
- Issue #56 / #58 のコメントは子 Issue #60 / #61 の切り出し記録であり、人間判断回答ではなかった。
- PR #18 / #27 は open / blocked のままで、関連 Decision Issue の回答待ちは解除されていない。
- PR #18 の既存 Slack thread に返信はなく、既定チャンネル検索でも `HD-20260630-002`、`HD-20260702-001`、`HD-20260702-002` の回答候補は見つからなかった。
- 新しい判断材料がなかったため、Slack 投稿は行っていない。
- 実装、dependency update、PR close / recreate、agent-decisions 反映、requirements 反映、関連 PR コメント追加は行っていない。
- Completion score: 60 / 100。公開可否: 不可。運用適性: 停止記録としては適切だが、実装完了や公開 readiness としては扱えない。
- 詳細ログ: `docs/ai-development/logs/2026-07-03-0830-human-slack-cycle-decision-queue.md`

### 2026-07-03 07:10 JST Implementation Fast Cycle

- 実装短周期サイクルで Issue #60 を選択した。
- Storage Conflict Guard 未通過のため、実装前に停止した。
- full current tree enumeration と residual search を保証できる checkout または connector 経路がなく、#60 の受け入れ条件を満たせないと判断した。
- Slack 内部識別子の置換、履歴書き換え、大量ログ削除、Slack 投稿、product code / dependency / workflow 変更、PR 作成、merge / close / recreate は行っていない。
- Completion score: 55 / 100。公開可否: 不可。運用適性: 停止記録としては適切だが、#60 の実装完了や公開 readiness としては扱えない。
- 詳細ログ: `docs/ai-development/logs/2026-07-03-0710-implementation-fast-cycle-issue-60-stopped.md`

### 2026-07-02 18:40 JST Development-sized Issue Split

- 開発サイクルで処理しやすい粒度として Issue #60 と #61 を作成した。
- #60 は #56 の子 Issue として、現在ファイルの Slack 内部識別子プレースホルダー化だけを扱う。履歴書き換え、大量ログ削除、公開可否の最終判断は含めない。
- #61 は #58 の子 Issue として、現行要件を維持したまま最後の1件時の抽選不可メッセージを改善する。最後の1件を確定表示または抽選許可する仕様変更は含めない。
- #56 / #58 に、子 Issue を Development Lane で扱う旨をコメントした。
- 実装、Slack 投稿、大量削除、履歴書き換え、PR 作成、merge は行っていない。
- 詳細ログ: `docs/ai-development/logs/2026-07-02-1840-development-sized-publication-fixes.md`

### 2026-07-02 18:16 JST Publication Review Finding Intake

- 公開前レビュー指摘を確認し、妥当性を triage した。
- Issue #56, #57, #58, #59 を作成した。
- #56 と #58 を `.github/agent-decisions.yml` に `HD-20260702-001` / `HD-20260702-002` として登録した。
- #56 を P0 公開前ブロッカー、#58 を P1 UX / 仕様判断、#57 / #59 を P2 ready-for-automation としてこの進捗入口に載せた。
- 実装、Slack 投稿、大量削除、履歴書き換え、PR 作成、merge は行っていない。
- 詳細ログ: `docs/ai-development/logs/2026-07-02-1816-publication-review-finding-intake.md`

## 最近の詳細ログ

- 2026-07-04 JST: `docs/ai-development/logs/2026-07-04-1330-human-slack-cycle-decision-queue.md`
- 2026-07-03 JST: `docs/ai-development/logs/2026-07-03-0830-human-slack-cycle-decision-queue.md`
- 2026-07-03 JST: `docs/ai-development/logs/2026-07-03-0710-implementation-fast-cycle-issue-60-stopped.md`
- 2026-07-03 JST: `docs/ai-development/logs/2026-07-03-0615-review-cycle-issue-60.md`
- 2026-07-03 JST: `docs/ai-development/logs/2026-07-03-0610-implementation-fast-cycle-issue-60-stopped.md`
- 2026-07-03 JST: `docs/ai-development/logs/2026-07-03-0510-implementation-fast-cycle-issue-60-stopped.md`
- 2026-07-03 JST: `docs/ai-development/logs/2026-07-03-0310-implementation-fast-cycle-issue-60-stopped.md`
- 2026-07-03 JST: `docs/ai-development/logs/2026-07-03-0117-review-cycle-issue-60-storage-conflict.md`
- 2026-07-03 JST: `docs/ai-development/logs/2026-07-03-0110-implementation-cycle-issue-60-stopped.md`
- 2026-07-02 JST: `docs/ai-development/logs/2026-07-02-2210-implementation-cycle-issue-60-stopped.md`
- 2026-07-02 JST: `docs/ai-development/logs/2026-07-02-1840-development-sized-publication-fixes.md`
- 2026-07-02 JST: `docs/ai-development/logs/2026-07-02-1816-publication-review-finding-intake.md`
- 2026-07-01 JST: `docs/ai-development/logs/2026-07-01-1830-human-slack-cycle-decision-queue.md`
- 2026-07-01 JST: `docs/ai-development/logs/2026-07-01-0830-human-slack-cycle-decision-queue.md`
- 2026-07-01 JST: `docs/ai-development/logs/2026-07-01-0730-human-slack-cycle-decision-queue.md`
- 2026-07-01 JST: `docs/ai-development/logs/2026-07-01-decision-queue-refresh.md`
- 2026-06-30 JST: `docs/ai-development/logs/2026-06-30-decision-queue-setup.md`
- 2026-06-30 JST: `docs/ai-development/logs/2026-06-30-parent-update-adoption.md`

## 次にやる作業

1. Issue #60 は、full current tree を列挙できる checkout または connector 経路を確保できるまで実装完了へ進めない。経路を確保できたら、現在ファイルの Slack 内部識別子を公開用プレースホルダーへ置換し、履歴書き換えや大量ログ削除が必要になった場合は停止して #56 に戻す。
2. #60 の blocker が解消した後、Issue #61 を処理する。現行要件を維持し、最後の1件時の抽選不可メッセージと関連テストを改善する。仕様変更が必要になった場合は停止して #58 に戻す。
3. #61 完了後、#57 と #59 を小さな文書改善 / cleanup として処理する。
4. #56 / #58 は親 Issue として維持し、子 Issue の範囲外判断が必要な場合だけ Human Decision Lane で扱う。
5. #54 / #55 / PR #18 / PR #27 は既存の依存更新判断待ちとして維持し、#60 の公開前ブロッカー対応後に順次扱う。
6. 条件未達の場合は実装せず、停止理由と次に必要な判断を `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に残す。

## Open Blockers

- Issue #60: Storage Conflict Guard 未通過。current files 全体の列挙と residual search を保証できる tooling 経路が必要。
- Issue #56: `HD-20260702-001` の広い人間判断待ち。#60 の現在ファイル置換は子 Issue として分離済みだが、履歴書き換え、大量ログ削除、公開可否最終判断は #56 に戻す。
- Issue #58: `HD-20260702-002` の仕様変更判断待ち。#61 の文言改善は実装可能だが、最後の1件の抽選許可または確定表示は #58 に戻す。
- Issue #54 / PR #18: `HD-20260630-001` の人間判断待ち。PR は mergeable false、CI failure と fresh CI success なしが残っている。
- Issue #55 / PR #27: `HD-20260630-002` の人間判断待ち。PR は mergeable false、CI failure と Vite 7 / plugin-react 6 peer dependency mismatch が残っている。

## 回答待ち

- `HD-20260702-001`: Issue #56 で Slack 内部情報の履歴対応 / ログ保持方針 / 大量削除要否を決める。#60 の現在ファイル置換は子 Issue として分離済みだが、Storage Conflict Guard が通るまで完了扱いにしない。
- `HD-20260702-002`: Issue #58 で最後の1件を現状維持 / 確定表示 / 1件抽選許可 / その他のどれで扱うか決める。#61 の現行仕様内文言改善は子 Issue として進行可能。
- `HD-20260630-001`: Issue #54 で PR #18 を `recreate` / `close` / `keep` / `その他` のどれで扱うか決める。
- `HD-20260630-002`: Issue #55 で PR #27 を Vite 8 とセットで recreate / close / keep on hold / その他のどれで扱うか決める。

## 読み込み順

1. `AGENTS.md`
2. `docs/ai-development/agent-instructions.md`
3. `docs/requirements.md`
4. `docs/ai-development/requirements.md`
5. `docs/ai-development/goal.md`
6. `docs/ai-development/completion-scorecard.md`
7. `docs/ai-development/progress.md`
8. `docs/ai-development/work-log.md` または関連 `docs/ai-development/logs/`
9. `.github/agent-decisions.yml`
10. 関連 Issue / PR / handover
11. 選んだ作業に対応する親 playbook

運用レビューやスケジュール準備では、必要に応じて次も読む。

- `docs/ai-development/automation-lock.md`

## 更新ルール

- 各サイクルは、作業終了時にこの文書の「現在地」「次にやる作業」を必要に応じて更新する。
- 詳細な作業履歴、停止理由、検証結果は `docs/ai-development/work-log.md` または `docs/ai-development/logs/` に記録する。
- 仕様判断はこの文書に確定事項として書かず、`docs/requirements.md` または `docs/ai-development/requirements.md` のどちらが適切か判断する。
