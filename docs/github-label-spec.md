# GitHub Label Specification

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-05-17
- 目的: Issue / PR の整理に使うラベル体系を定義する

## 基本方針

- ラベルは役割ごとに接頭辞を付ける
- 1 件の Issue / PR に、`type` と `priority` は原則 1 つずつ付ける
- `area` は必要に応じて複数付けてよい

## 推奨ラベル一覧

| ラベル | 用途 | 色の例 |
| --- | --- | --- |
| `type/bug` | 不具合 | `d73a4a` |
| `type/feature` | 機能追加 | `0e8a16` |
| `type/docs` | ドキュメント | `1d76db` |
| `type/tech-debt` | 技術的負債 | `6f42c1` |
| `priority/high` | 高優先 | `b60205` |
| `priority/medium` | 中優先 | `fbca04` |
| `priority/low` | 低優先 | `c2e0c6` |
| `area/ui` | UI | `bfd4f2` |
| `area/domain` | 抽選ロジックなどドメイン | `d4c5f9` |
| `area/storage` | localStorage など保存処理 | `f9d0c4` |
| `area/ci` | CI / GitHub Actions | `5319e7` |
| `area/docs` | README や設計資料 | `0e8a16` |
| `security` | セキュリティ関連 | `b60205` |
| `dependencies` | 依存更新 | `0366d6` |

## 運用ルール

### Issue

- 不具合: `type/bug`
- 機能追加: `type/feature`
- 運用改善や構造整理: `type/tech-debt`
- 文書のみ: `type/docs`

### Pull Request

- `type/*` を 1 つ付与する
- 必要なら `area/*` を追加する
- 依存更新 PR には `dependencies` を付ける

## 既存 Issue への適用例

- #20 `type/tech-debt`, `priority/high`, `area/ci`
- #21 `type/docs`, `priority/medium`, `area/docs`
- #22 `type/tech-debt`, `priority/medium`, `area/docs`
- #23 `type/tech-debt`, `priority/medium`, `area/ci`
- #24 `type/docs`, `priority/medium`, `area/docs`

## 備考

- この仕様書は、ラベル実作成前の正本として扱う
- 実際の GitHub ラベル作成後は README または運用資料からこの仕様書へリンクする
