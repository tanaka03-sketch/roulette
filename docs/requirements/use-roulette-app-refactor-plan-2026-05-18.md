# `useRouletteApp` 責務分割方針

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-05-18
- 対象: `src/ui/useRouletteApp.ts`
- 対応 Issue: `#37`

## 目的

`useRouletteApp.ts` に集まっている UI 制御、候補操作、抽選進行、永続化連携、利用者向けメッセージ管理を棚卸しし、機能追加前に安全な分割順を決める。

この文書は実装そのものではなく、段階的な整理方針を決めるための設計メモである。

## 現状の責務

現状の `useRouletteApp.ts` は、主に次の責務を 1 ファイルで持っている。

1. 画面状態の保持
   - `state`
   - `candidateName`
   - `editingCandidateId`
   - `editingCandidateName`
   - `feedbackMessage`
   - `storageError`
   - `isDrawing`
   - `lastResult`

2. 導出値の計算
   - `availability`
   - `eligibleCandidates`
   - `eligibleCount`
   - `totalCount`

3. 永続化連携
   - 初期状態の `loadRouletteState()` 呼び出し
   - `state` 変更時の `saveRouletteState()` 呼び出し
   - 保存失敗時の `storageError` 設定

4. 候補操作
   - 追加
   - 編集開始
   - 編集キャンセル
   - 編集保存
   - 削除

5. 抽選進行制御
   - 抽選可能判定に応じたメッセージ設定
   - 抽選中ロック
   - タイマー開始
   - 当選候補の反映
   - 抽選済み状態の更新

6. 補助操作
   - 抽選済み候補除外設定の切り替え
   - 抽選済み状態リセット
   - 候補全削除

7. 利用者向け文言管理
   - 進行制御メッセージ
   - バリデーションエラー
   - 永続化エラー
   - 成功メッセージ
   - confirm 文言

## 現状の評価

### 実装上の事実

- 画面から見た主な操作は 1 hook にまとまっており、現時点の規模では追跡不能ではない
- 候補名のバリデーションは `src/domain/roulette.ts` に寄せられており、追加・編集の検証自体は重複していない
- `loadRouletteState()` と `saveRouletteState()` は `storage` 層へ分離済みで、永続化の詳細は hook に直接埋め込まれていない

### 懸念

- 利用者向けメッセージ、confirm 文言、抽選進行制御が同じ hook に混在していて、仕様変更時の影響範囲が読みにくい
- 候補操作と抽選操作が同じ state を直接更新しており、テストしたい振る舞いの単位が大きい
- 将来 UI 分岐や演出設定が増えると、変更のたびに hook 全体を読む必要が出やすい

## 分割の基本方針

大きなレイヤ追加から始めるのではなく、依存の薄いところから順番に分ける。

1. まずは文言と純粋な補助関数を外へ出す
2. 次に state 更新ロジックを操作単位で小さくまとめる
3. 永続化連携は state 管理から見て副作用として境界を明確にする
4. 最後に必要なら application 層相当の集約点を追加する

## 分割候補

### A. 文言定数モジュール

候補ファイル:
- `src/ui/rouletteMessages.ts`

切り出し対象:
- `DRAW_LOCK_MESSAGE`
- `getAvailabilityMessage()`
- `storageError` 用の固定文言
- confirm 文言
- 操作成功メッセージ

目的:
- 画面制御と文言変更の関心を分ける
- 文言レビューをしやすくする
- 将来の文言差し替えや i18n の足場を作る

優先度:
- 高

### B. 候補操作の更新関数整理

候補ファイル:
- `src/ui/rouletteStateUpdates.ts`

切り出し対象:
- 候補追加時の state 更新
- 編集保存時の state 更新
- 削除時の state 更新
- 抽選済み状態リセット
- 候補全削除

目的:
- `setState()` の更新式を操作ごとに小さくする
- `lastResult` や editing 状態の追従条件を見通しやすくする
- テストしやすい純粋関数へ寄せる

優先度:
- 高

### C. 抽選進行制御の分離

候補ファイル:
- `src/ui/useRouletteDrawFlow.ts`

切り出し対象:
- 抽選開始前ガード
- タイマー進行
- winner 確定後の state 反映
- 抽選中ロックの扱い

目的:
- ルーレット演出時間や抽選ルール変更を局所化する
- `window.setTimeout()` と UI 側 state 更新の関係を明確にする

優先度:
- 中

### D. 永続化連携の境界整理

候補ファイル:
- `src/ui/usePersistedRouletteState.ts`

切り出し対象:
- `loadRouletteState()` による初期化
- `saveRouletteState()` の副作用処理
- 保存失敗時メッセージ管理

目的:
- state 本体の管理と保存副作用を分ける
- 将来 `localStorage` 以外の保存先が増えても差し替えやすくする

優先度:
- 中

### E. application 層追加の検討

候補ファイル:
- `src/application/rouletteAppService.ts`

想定用途:
- 候補操作、抽選、永続化の調停点を UI から分離する

判断:
- 現時点では保留

理由:
- 今の規模では、先に UI 近辺の責務分離だけで十分な可能性が高い
- application 層を先に置くと、抽象化のための抽象化になりやすい

## 推奨実施順

### Step 1. 文言定数を切り出す

期待効果:
- 最も低リスクで読みやすさが上がる

変更範囲:
- `useRouletteApp.ts`
- 新規文言ファイル
- 必要なら文言単体テスト

### Step 2. 候補操作の純粋更新関数を切り出す

期待効果:
- 追加、編集、削除、リセットの差分が見やすくなる
- 回帰テストの追加単位を作りやすい

変更範囲:
- `useRouletteApp.ts`
- 新規 state update ファイル
- 単体テスト追加

### Step 3. 抽選進行制御を分ける

期待効果:
- timer と抽選進行ロジックの責務が明確になる
- ルーレット演出変更時の影響範囲を狭められる

変更範囲:
- `useRouletteApp.ts`
- 新規 draw flow hook
- 既存 UI テストの調整

### Step 4. 永続化 hook を検討する

期待効果:
- 保存副作用の境界が明確になる
- 将来の保存先変更に備えやすい

変更範囲:
- `useRouletteApp.ts`
- 新規 persisted state hook
- storage 関連テストの見直し

## 後回しでよいもの

- application 層の新設
- 大規模なディレクトリ再編
- state 管理ライブラリへの移行

これらは、画面やルールが増えて現行構造の限界が見えてから再判断でよい。

## テスト観点

分割時は、見た目よりも次の回帰を優先して守る。

1. 候補追加、編集、削除の基本操作
2. 同名候補の識別表示と編集対象維持
3. 抽選開始中の操作ロック
4. 抽選結果反映と `drawn` 更新
5. `localStorage` 保存失敗時のエラーメッセージ
6. 再読み込み後の状態復元

## 結論

現時点でおすすめなのは、`useRouletteApp.ts` を一気に分解することではなく、文言定数と純粋更新関数から小さく外へ出す進め方である。

まずは Step 1 と Step 2 を対象に、小さなリファクタ Issue を個別に切るのが安全である。
