# Design Update Job Instructions

## 対象ジョブ

- 設計・実装方針レビュー
- 要件・設計修正

## 目的

`docs/requirements.md` を正本として、実装前に必要な設計・要件・運用追補を整理します。AI 運用上の未確定事項は `docs/ai-development/requirements.md` に集約します。

## 判断先

| 内容 | 更新先 |
| --- | --- |
| プロダクト仕様、受入条件、対象外範囲 | `docs/requirements.md` |
| 実装タスク分解 | `docs/implementation-tasks.md` |
| AI ジョブ上の確認、Slack 回答待ち | `docs/ai-development/requirements.md` |
| 作業履歴、停止理由 | `docs/ai-development/work-log.md` |
| 実装者への具体指示 | `docs/ai-development/agent-instructions.md` または job instruction |

## roulette 固有の確認

- 認証、外部 API、サーバー保存を追加していないか。
- `localStorage` 保存対象が要件の範囲内か。
- 入力検証、XSS 対策、長い候補名、同名候補の識別が要件と合っているか。
- モバイル変更時に README の Mobile verification 観点が検証へ入っているか。

## 停止条件

- 仕様判断の正本が不明。
- 既存正本と矛盾する。
- Slack または人間回答待ちがある。
- 権限、個人情報、認証、secret、データ削除に関わる判断が未承認。

## 出力

- 対象 Issue / PR
- 更新すべき文書と理由
- 作成した設計修正 PR または未変更理由
- Open blocker / 回答待ち
- 実装へ進められるかの判断
- 次アクション
