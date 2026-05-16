# roulette

ブラウザ上で候補項目を登録し、ルーレット形式でランダムに1件を選出するアプリです。

## 概要

初期版では、認証やサーバー側状態管理を持たないクライアント完結型アプリとして実装します。
候補リスト、抽選済み状態、抽選済み候補を除外するかどうかの設定は、ブラウザの `localStorage` に保存します。

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

```bash
npm install
npm run dev
```

開発サーバー起動後は、Vite の表示するローカル URL から利用します。

## Documents

- [要件定義書](docs/requirements.md)
- [実装タスク分解](docs/implementation-tasks.md)
- [Phase 1 詳細設計](docs/phase1-foundation-design.md)
- [Phase 1 Issue ドラフト](docs/issue-drafts-phase1.md)

## 初期版の前提

- ユーザー認証なし
- 管理画面分離なし
- 外部 API 連携なし
- サーバー側保存なし
- 同名候補は許可し、内部 ID で区別
