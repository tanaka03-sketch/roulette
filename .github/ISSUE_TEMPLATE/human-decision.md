---
name: Human decision
about: AI が独断で決めてはいけない論点の判断用
title: "Decision: HD-YYYYMMDD-NNN "
labels: ["ai-development", "needs-human-decision"]
assignees: []
---

# Decision: HD-YYYYMMDD-NNN 短い件名

## 必須ラベル

この Issue には、全リポジトリ共通で次のラベルを付けます。

```text
needs-human-decision
```

判断結果を `.github/agent-decisions.yml` に反映したら、このラベルを外します。自動作業へ戻せる場合は、次のラベルを付けます。

```text
ready-for-automation
```

## 判断してほしいこと


## 背景


## 対象リポジトリ / 関連先

- repository: `tanaka03-sketch/roulette`
- related issue:
- related PR:
- related files:

## 選択肢

### 1. 推奨案

- 内容:
- 理由:
- リスク:
- 採用した場合の次アクション:

### 2. 代替案

- 内容:
- 理由:
- リスク:
- 採用した場合の次アクション:

### 3. 保留

- 内容:
- 理由:
- リスク:
- 採用した場合の次アクション:

### 4. その他 / 自由記述

- 内容:
- 理由:
- 採用した場合の次アクション:

## AI 推奨

- 推奨:
- 理由:

## 判断方法

次の形式でコメントしてください。

```md
HD-YYYYMMDD-NNN は 1 を採用します。
理由: 
```

## 判断結果

- selected option:
- decided by:
- decided at:
- rationale:

## 反映先

- [ ] `.github/agent-decisions.yml`
- [ ] 関連 Issue / PR
- [ ] `docs/ai-development/requirements.md`
- [ ] `docs/ai-development/progress.md`
- [ ] `docs/ai-development/work-log.md` または `docs/ai-development/logs/`
- [ ] その他:

## 完了条件

- [ ] `needs-human-decision` ラベルが付いている
- [ ] Decision ID が `.github/agent-decisions.yml` と一致している
- [ ] 人間の判断コメントがある
- [ ] 判断結果が `.github/agent-decisions.yml` または関連記録に反映されている
- [ ] 反映後に `needs-human-decision` ラベルが外れている、または残す理由が明記されている
- [ ] 必要な次タスクが作られている
