# AI 開発運用 Completion Scorecard

- 対象リポジトリ: `tanaka03-sketch/roulette`
- 作成日: 2026-06-24
- 最終更新日: 2026-06-30
- ステータス: Active
- 親参照: `tanaka03-sketch/ai-development-operations:playbooks/completion-scorecard.md`

## 目的

開発中または完了候補の Issue、PR、文書更新、運用変更を、目的に対して 100 点満点で記録し、公開して大丈夫か、継続運用に適しているか、追加レビューが必要かを判断するためのスコアカードです。

この文書はプロダクト要件の正本ではありません。プロダクト仕様の正本は `docs/requirements.md`、AI 開発運用の目的は `docs/ai-development/goal.md` です。

## 採点対象

次のいずれかを進める場合は、関連 Issue / PR / log / この文書のどこかに completion score を残します。

- 実装 PR
- 依存関係更新 PR
- レビュー指摘 triage
- CI failure 対応
- 文書体系や運用手順の更新
- スケジュール運用変更
- production readiness / publish readiness に関わる確認
- Service Publication Review を必要とする公開前確認

## 親準拠の 100 点配分

| 分野 | 点数 | 見ること |
| --- | ---: | --- |
| 目的適合 | 30 | Issue / PR の目的、対象範囲、完了条件、`docs/requirements.md`、`docs/ai-development/goal.md` に合っているか |
| 公開可否 | 20 | 公開して大丈夫か。秘密情報、個人情報、破壊的変更、権限、ライセンス、説明不足がないか |
| 運用適合 | 20 | 3 サイクル運用、親 loop / gate、ロック、handover、再開性、rollback、記録に耐えるか |
| レビュー品質 | 15 | Design Review、Code Review、Review Triage、Minimal Implementation Review、人間判断が必要な論点の扱いが十分か |
| 検証と引き継ぎ | 15 | `npm run typecheck`、`npm test`、`npm run build`、必要な手動確認、未確認事項、次アクションが残っているか |
| 合計 | 100 |  |

## 総合判定

| 点数 | 判定 | 扱い |
| ---: | --- | --- |
| 90-100 | publish-ready / operation-ready | 公開または運用へ進めてよい候補。ただし人間承認が必要な条件は別途満たす |
| 80-89 | limited-ready | 限定公開または内部運用は可。公開前に不足点を Issue / PR / log に残す |
| 60-79 | needs-fix | 目的に対して不足がある。次 iteration または別 Issue に戻す |
| 0-59 | blocked | 公開または運用に進めない。目的、仕様、権限、検証、レビューのいずれかへ戻す |
| scoring blocked | 採点不可 | 目的、受入条件、対象出力、検証方法のいずれかが不明。実装へ進めない |

`roulette` の自律運用では、95 点未満を完全完了として扱いません。80 点未満は公開・merge readiness として扱いません。

## 公開可否レビュー

公開して大丈夫かは、最低限次を確認します。ウェブサービス / アプリとして公開してよい状態かを詳しく判定する場合は、親 `playbooks/service-publication-review.md` を使います。

- README の「公開利用時の注意」と矛盾しない
- 秘密情報、認証情報、内部 URL、個人情報が含まれていない
- 誤解を招く説明、未検証の断定、古い仕様がない
- 初期版の単一ユーザー、認証なし、サーバー保存なし、外部 API なし、`localStorage` 保存の前提を崩していない
- 個人情報、社内情報、未公開情報など端末内に残したくない情報の入力に向かないことを隠していない
- 破壊的変更、権限変更、データ移行、本番判断を AI が単独で決めていない
- 人間承認が必要な条件は Slack 確認、Repository Decision Queue、または `needs-human-decision` Issue へ切り出されている
- 公開後に戻せる rollback または訂正方針がある

## 運用適合レビュー

運用に適しているかは、最低限次を確認します。

- scheduled run / cycle / loop / gate のどこで扱うかが明確
- ChatGPT 側メモリーロック、更新対象、Storage Conflict Guard の要否が明確
- 同じ Issue / PR / file を複数サイクルが同時更新しない
- 失敗時の stop condition と handover が書ける
- Review cycle が独立して確認できる材料がある
- 次回のエージェントまたは人間が再開できる状態が GitHub 上に残る

## 必須確認

採点時は必ず次を短く書きます。

- 総合点:
- 判定:
- 公開可否:
- 運用適性:
- 100 点に足りない理由:
- 次に 1 つだけ進める改善:
- 人間確認事項:

## テンプレート

```md
## Completion Scorecard

- 対象:
- 関連 Issue / PR:
- 採点日:
- 採点者 / サイクル:
- 目的:

| 分野 | 点数 | 理由 | 不足 / 次アクション |
| --- | ---: | --- | --- |
| 目的適合 |  / 30 |  |  |
| 公開可否 |  / 20 |  |  |
| 運用適合 |  / 20 |  |  |
| レビュー品質 |  / 15 |  |  |
| 検証と引き継ぎ |  / 15 |  |  |
| 合計 |  / 100 |  |  |

### 判定

- [ ] publish-ready / operation-ready
- [ ] limited-ready
- [ ] needs-fix
- [ ] blocked
- [ ] scoring blocked

### 公開して大丈夫か

- 判定:
- 理由:
- 必要な人間判断:
- Service Publication Review の要否:

### 運用に適しているか

- 判定:
- 理由:
- 必要な補強:

### 100 点に足りない理由
- 

### 次に 1 つだけ進める改善
- 

### 人間確認事項
- 
```

## 現在の運用スコア

### 2026-06-30 親リポジトリ更新反映

- 対象: 親リポジトリ更新に合わせた AI 開発運用文書・テンプレートの再整合
- 関連 Issue / PR: なし。ユーザー直接依頼
- 採点日: 2026-06-30 20:48 JST 以降
- 採点者 / サイクル: 手動導入 / Scheduled Maintenance

#### 総合点

- 点数: 88 / 100
- 判定: limited-ready

#### 公開可否

- 判定: 条件付きで公開候補
- 理由: `docs/requirements.md` を正本として維持し、AI 開発運用文書とテンプレートの参照先を親リポジトリの現行 playbook へ合わせる変更であり、プロダクト仕様や公開挙動には影響しない。ただし既存の PR #18 / PR #27 などの回答待ち blocker は別途残る。

#### 運用適性

- 判定: 運用に適している
- 理由: 旧 12 本サイクルに戻さず、親の Issue Intake / Implementation PR / Review Triage / CI Failure / Scheduled Maintenance、Spec Gate、Storage Conflict Guard、Minimal Implementation Review、Completion Scorecard、Service Publication Review、Repository Decision Queue に合わせたため。

#### 分野別

| 分野 | 点数 | 理由 | 不足 / 次アクション |
| --- | ---: | --- | --- |
| 目的適合 | 27 / 30 | 親更新後の実在 playbook / template を roulette 側に反映 | 実スケジュール出力と継続運用で確認が必要 |
| 公開可否 | 17 / 20 | プロダクトコードや要件正本を変更せず、公開挙動に影響なし | 既存 PR blocker の解消は別タスク |
| 運用適合 | 18 / 20 | 3 サイクル、ChatGPT 側ロック、親 loop / gate を維持 | `.github/agent-decisions.yml` の実運用は今後確認 |
| レビュー品質 | 13 / 15 | Minimal Implementation Review、Service Publication Review、人間判断キューを追加 | 実 PR / Issue での利用確認が必要 |
| 検証と引き継ぎ | 13 / 15 | 文書更新ログを追加し、検証未実行理由を明記 | コード検証はコード変更時に実施 |
| 合計 | 88 / 100 |  |  |

#### 100 点に足りない理由

- 実際の open PR / Issue に対して、新しい human-decision template と `.github/agent-decisions.yml` を使った判断反映がまだ未実施。
- 既存の回答待ち blocker はこの文書更新とは別に残っている。
- スケジュールプロンプトそのものの再登録・変更は今回明示依頼がないため行っていない。

#### 次に 1 つだけ進める改善

- 人間確認 / Slack サイクルで、PR #18 または PR #27 の回答待ちを GitHub の Decision record へ移す必要があるかを 1 件だけ判定する。

#### 人間確認事項

- スケジュールの再登録・再有効化、公開、本番運用 readiness、CAB の最終判断は引き続き人間承認。
