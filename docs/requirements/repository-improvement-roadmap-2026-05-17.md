# リポジトリ改善ロードマップ

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-05-17
- 最終更新日: 2026-05-18
- 参照元:
  - `docs/requirements/repository-audit-2026-05-17.md`
  - `docs/requirements/repository-improvement-backlog-2026-05-17.md`

## 目的

監査結果を、迷わず着手できる順序に並べ替え、短期で事故を減らしつつ中長期で保守性を上げる。

## 実施方針

- まずは GitHub 運用事故を減らす
- 次に CI / Dependency / Documentation を整える
- 最後にテスト拡張とアーキテクチャ整理へ進む

## フェーズ別ロードマップ

### Phase 0: 今すぐ着手

対象期間の目安: 次の 1 週間

#### 0-1. GitHub 運用ガードレールの整備

- `main` 保護
- PR 必須化
- 最低 1 review approval
- CI success を merge 条件化
- 状態: 未着手

#### 0-2. Secret 事故予防

- `.gitignore` に `.env` ルール追加
- `.env.example` の扱い整理
- README に env 運用注意を追記
- 状態: 完了

#### 0-3. レビュー責任の可視化

- `.github/CODEOWNERS` 追加
- 状態: 完了

### Phase 1: 近いうちに整備

対象期間の目安: 次の 2 から 3 週間

#### 1-1. 開発フローの標準化

- PR テンプレート追加
- Issue テンプレート追加
- ラベル体系見直し
- 状態: 一部完了

#### 1-2. CI の安全性と見通し改善

- workflow に最小権限 `permissions` を追加
- `concurrency` を設定
- `typecheck` `test` `build` の責務を整理
- 状態: 完了

#### 1-3. 依存関係メンテナンス自動化

- Dependabot 導入
- npm と GitHub Actions を監視対象にする
- 状態: 完了

#### 1-4. 文書体系の整理

- 正本と旧版の保管ルールを定義
- 旧ドラフトの保管場所を統一
- README から正本への導線を整理
- 状態: 方針整理完了
- 進捗メモ:
  - `docs/requirements/document-catalog-2026-05-18.md` を追加済み
  - 正本、運用手順、改善計画、作業ドラフトの分類を整理済み
  - 実ファイル移動は必要性が出た段階で別判断にする

### Phase 2: 中期改善

対象期間の目安: 次の 1 から 2 か月

#### 2-1. Release 運用開始

- SemVer 採用
- GitHub Releases 運用開始
- changelog の管理方法決定
- 状態: 方針整理完了
- 進捗メモ:
  - `docs/release-policy.md` に versioning ルールを定義済み
  - `docs/requirements/release-handoff-2026-05-18.md` に手動 Release 手順を追加済み
  - 実運用としての初回 Release は未実施

#### 2-2. ローカル開発の安定化

- Node バージョン固定ファイル追加
- README にセットアップ前提を追記
- 状態: 完了

#### 2-3. テストの守備範囲拡大

- coverage gate 追加
- 最低限の E2E シナリオ追加
- a11y テストの導入検討
- 状態: 一部完了

### Phase 3: 中長期改善

対象期間の目安: 機能追加が増える前

#### 3-1. UI 状態管理の責務整理

- `useRouletteApp.ts` の責務分割
- 文言定数の分離
- 永続化連携の責務を明確化
- 状態: 方針整理と段階実装完了
- 進捗メモ:
  - `docs/requirements/use-roulette-app-refactor-plan-2026-05-18.md` を追加済み
  - `src/ui/rouletteMessages.ts` で文言定数を分離済み
  - `src/ui/rouletteStateUpdates.ts` で候補操作更新を分離済み
  - `src/ui/rouletteDrawFlow.ts` で抽選完了時の進行処理を分離済み
  - `src/ui/usePersistedRouletteState.ts` で永続化連携を分離済み

#### 3-2. レイヤ整理

- 必要に応じて application 層追加
- `domain` `ui` `infrastructure` の境界を明文化
- 状態: 未着手

## 優先順位の考え方

### 最優先

以下は、低コストで事故を減らす効果が大きいため最優先とする。

1. `main` 保護
2. `.env` 誤コミット防止
3. CODEOWNERS
4. Actions 最小権限化

### 次点

以下は、開発効率と継続運用の質を上げる。

1. PR / Issue テンプレート
2. ラベル体系整理
3. Dependabot
4. 文書整理

### 中長期

以下は、今すぐ壊れるリスクは高くないが、後から効いてくる。

1. Release 運用
2. E2E / coverage gate
3. `useRouletteApp.ts` 分割

## マイルストーン案

| マイルストーン | 含める項目 | 完了イメージ |
| --- | --- | --- |
| M1: 運用事故予防 | `main` 保護、`.env` 対策、CODEOWNERS、permissions | 事故りにくい最低ラインに到達 |
| M2: 開発フロー整備 | テンプレート、ラベル、CI 整理、Dependabot | 日常開発が回しやすい状態 |
| M3: 継続保守強化 | Release、Node 固定、文書整理、coverage | 継続運用の見通しが立つ |
| M4: 拡張準備 | E2E、レイヤ整理、hook 分割 | 機能拡張しやすい状態 |

## 着手順のおすすめ

1. GitHub 設定で `main` を保護する
2. 初回 Release を手動で実施する
3. 文書カタログを前提に README の Documents 節を分類表示へ並べ替える
4. Playwright のブロック解除後に `#32` を再開する

## 判断が必要になりやすいポイント

今後、実施フェーズに入ると次の判断が必要になる可能性がある。

### 1. 誰を CODEOWNERS にするか

- 単独運用者を 1 名で設定する
- 将来の共同開発前提で複数名を設定する
- いったん雛形だけ作り、後で埋める

### 2. 依存更新を Dependabot と Renovate のどちらにするか

- 小規模向けに Dependabot を採用する
- カスタマイズ性重視で Renovate にする

### 3. Release を手動運用にするか自動化するか

- まずは手動で開始する
- Conventional Commits 前提で半自動化する

本ロードマップでは、現時点では以下をおすすめ前提として扱う。

- CODEOWNERS は単独運用者を想定した最小構成
- 依存更新は Dependabot
- Release はまず手動開始

## 補足

- Playwright を使うモバイル E2E は、ブラウザ取得が `403 Forbidden` で止まる環境制約があるため、別途 `#32` で継続管理する
