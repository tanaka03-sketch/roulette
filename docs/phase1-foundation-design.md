# Phase 1 詳細設計メモ

- 更新日: 2026-05-15
- 対象タスク:
  - TASK-001 データ型と保存キーを定義する
  - TASK-002 抽選ロジックを UI から分離して実装する
- 参照元:
  - `docs/requirements.md`
  - `docs/implementation-tasks.md`

## 1. この文書の目的

Phase 1 の実装を始める際に、データ構造、保存形式、ロジック分割、関数インターフェースを事前に揃える。
実装者ごとに型や責務の解釈がばらつかない状態を目指す。

## 2. 想定するファイル分割

初期版では、少なくとも以下の責務で分けることを推奨する。

```text
src/
  domain/
    roulette.ts        # 型、定数、純粋関数
  storage/
    rouletteStorage.ts # localStorage の読み書き
  ui/
    ...                # 画面表示とイベント処理
```

フレームワークに合わせてフォルダ名は調整してよいが、以下は守る。

- 抽選ロジックは UI コンポーネントに直接埋め込まない
- `localStorage` へのアクセスは 1 か所に寄せる
- 型定義、保存キー、抽選関数を分散させない

## 3. TASK-001 詳細設計

### 3.1 型定義

候補は名称ではなく内部 ID で管理する。
`name` の重複は許可する。

```ts
export type RouletteCandidate = {
  id: string;
  name: string;
  drawn: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RouletteSettings = {
  excludeDrawnCandidates: boolean;
};

export type RouletteState = {
  candidates: RouletteCandidate[];
  settings: RouletteSettings;
};
```

### 3.2 補助型

UI とロジックの分岐を明確にするため、抽選前の判定結果も型で表現する。

```ts
export type DrawAvailability =
  | { canDraw: true; eligibleCount: number }
  | {
      canDraw: false;
      eligibleCount: number;
      reason: 'NO_CANDIDATES' | 'NOT_ENOUGH_CANDIDATES' | 'ALL_DRAWN';
    };
```

この型を使う理由は次のとおり。

- ボタン活性・非活性判定とメッセージ表示の根拠を統一できる
- `excludeDrawnCandidates` の ON / OFF による分岐を UI 側で重複実装せずに済む
- テスト時に期待値を比較しやすい

### 3.3 保存キー

保存キーは散在させず、定数として管理する。
初期版では1つの状態オブジェクトとして保存する。

```ts
export const STORAGE_KEYS = {
  rouletteState: 'roulette.state.v1',
} as const;
```

保存キーを1本にまとめる理由は次のとおり。

- 候補一覧、設定、将来のメタ情報をまとめて扱える
- 読み込み時の整合性チェックが簡単になる
- クリア時の処理が単純になる

### 3.4 保存フォーマット

`localStorage` には以下の JSON を保存する。

```ts
export type RouletteStorageData = {
  version: 1;
  candidates: RouletteCandidate[];
  settings: RouletteSettings;
};
```

保存データ例:

```json
{
  "version": 1,
  "candidates": [
    {
      "id": "cand_001",
      "name": "A賞",
      "drawn": false,
      "createdAt": "2026-05-15T13:00:00.000Z",
      "updatedAt": "2026-05-15T13:00:00.000Z"
    }
  ],
  "settings": {
    "excludeDrawnCandidates": true
  }
}
```

### 3.5 初期値

```ts
export const DEFAULT_SETTINGS: RouletteSettings = {
  excludeDrawnCandidates: true,
};

export const DEFAULT_STATE: RouletteState = {
  candidates: [],
  settings: DEFAULT_SETTINGS,
};
```

初期値で `excludeDrawnCandidates` を `true` にする理由は、ルーレットの期待として「一度当たったものは外れる」挙動が自然だからである。

### 3.6 ID 生成方針

ID は表示名から作らない。
候補追加時に一意な値を生成する。

推奨順:

1. `crypto.randomUUID()`
2. 利用できない場合はタイムスタンプと乱数の組み合わせ

例:

```ts
export function createCandidateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `cand_${Date.now()}_${Math.floor(Math.random() * 1_000_000)}`;
}
```

## 4. TASK-002 詳細設計

### 4.1 純粋関数として切り出す対象

最低限、以下の関数を純粋関数として用意する。

```ts
export function getEligibleCandidates(
  candidates: RouletteCandidate[],
  settings: RouletteSettings,
): RouletteCandidate[];

export function getDrawAvailability(
  candidates: RouletteCandidate[],
  settings: RouletteSettings,
): DrawAvailability;

export function pickRandomCandidate(
  candidates: RouletteCandidate[],
  randomValue?: number,
): RouletteCandidate;

export function markCandidateAsDrawn(
  candidates: RouletteCandidate[],
  candidateId: string,
  now: string,
): RouletteCandidate[];
```

### 4.2 関数責務

#### `getEligibleCandidates`

役割:

- 抽選対象候補の絞り込みだけを担当する
- UI 用の表示文言は返さない

ルール:

- `excludeDrawnCandidates` が `true` の場合、`drawn === false` の候補のみ返す
- `excludeDrawnCandidates` が `false` の場合、全候補を返す
- 入力配列は破壊しない

#### `getDrawAvailability`

役割:

- 抽選可能かどうかの判定と理由コードの返却を行う

判定順:

1. 候補総数が 0 件なら `NO_CANDIDATES`
2. 抽選対象候補数が 0 件で、かつ総候補数が 1 件以上なら `ALL_DRAWN`
3. 抽選対象候補数が 1 件なら `NOT_ENOUGH_CANDIDATES`
4. それ以外は `canDraw: true`

この順にする理由:

- 「候補が未登録」と「除外設定の結果もう引けない」は利用者向けメッセージが異なるため
- 条件分岐が UI 側に漏れないようにするため

#### `pickRandomCandidate`

役割:

- 候補配列から 1 件選ぶだけに責務を限定する

ルール:

- 空配列を渡された場合はエラーを投げる
- テストしやすいように `randomValue` を引数で注入できるようにする
- `randomValue` が未指定なら内部で `Math.random()` を使う

実装イメージ:

```ts
export function pickRandomCandidate(
  candidates: RouletteCandidate[],
  randomValue = Math.random(),
): RouletteCandidate {
  if (candidates.length === 0) {
    throw new Error('pickRandomCandidate requires at least one candidate');
  }

  const index = Math.floor(randomValue * candidates.length);
  return candidates[Math.min(index, candidates.length - 1)];
}
```

`Math.min` を入れる理由は、注入値が `1` だった場合でも配列外参照を防ぐためである。

#### `markCandidateAsDrawn`

役割:

- 当選した候補だけを `drawn: true` に更新する
- `updatedAt` を更新する
- 他要素は不変で返す

ルール:

- `excludeDrawnCandidates` の ON / OFF 判定はこの関数に持ち込まない
- この関数は「対象候補を抽選済みにする」という単機能に保つ

### 4.3 UI 側の呼び出し順

UI 側では次の順で呼び出す。

1. `getDrawAvailability(state.candidates, state.settings)`
2. `canDraw === false` なら理由コードに応じてメッセージ表示
3. `getEligibleCandidates(state.candidates, state.settings)`
4. `pickRandomCandidate(eligibleCandidates)`
5. 設定が `excludeDrawnCandidates === true` の場合だけ `markCandidateAsDrawn(...)`
6. 状態保存と結果表示

この順にすることで、抽選可否判定、対象絞り込み、乱数選択、状態更新の責務が混ざらない。

## 5. ストレージ層の責務

`storage/rouletteStorage.ts` では次の関数を持つことを推奨する。

```ts
export function loadRouletteState(): RouletteState;
export function saveRouletteState(state: RouletteState): void;
export function clearRouletteState(): void;
```

### 5.1 `loadRouletteState`

要件:

- キーが存在しない場合は `DEFAULT_STATE` を返す
- JSON パースに失敗した場合は `DEFAULT_STATE` を返す
- `version !== 1` の場合は `DEFAULT_STATE` を返す
- 型が崩れている場合は `DEFAULT_STATE` を返す

### 5.2 `saveRouletteState`

要件:

- 受け取った状態を保存用フォーマットに変換して保存する
- `try/catch` で `localStorage` 例外を握りつぶさず、呼び出し側が必要なら通知できる形にする

実装候補:

- 例外をそのまま投げる
- `Result` 型で成功/失敗を返す

初期版ではシンプルに例外送出でもよいが、UI 側でトーストや警告表示を出したいなら `Result` 型の方が扱いやすい。

## 6. テスト観点

### 6.1 TASK-001

- `DEFAULT_STATE` が空候補と既定設定を持つこと
- 保存キーが固定値であること
- 保存データの `version` が 1 であること
- 同名候補でも別 ID を生成できること

### 6.2 TASK-002

- `getEligibleCandidates` が除外設定 ON で未抽選のみ返すこと
- `getEligibleCandidates` が除外設定 OFF で全候補を返すこと
- `getDrawAvailability` が 0 件、1 件、全件抽選済み、2 件以上を正しく判定すること
- `pickRandomCandidate` が注入した `randomValue` に応じた候補を返すこと
- `markCandidateAsDrawn` が対象候補だけを更新すること
- いずれの関数も入力配列を破壊しないこと

## 7. 実装時の注意

- 候補名のトリムは UI 側の追加・編集処理で行い、抽選ロジック側では行わない
- `drawn` 状態の更新は候補 ID で行い、候補名では行わない
- `localStorage` データをそのまま信用せず、必ず読み込み時に検証する
- 抽選ロジックでブラウザ API に直接触れない
- 日時は `new Date().toISOString()` に統一する

## 8. 実装レビューで見るポイント

- 型定義と保存フォーマットがずれていないか
- UI が候補名文字列で候補を識別していないか
- `pickRandomCandidate` がテストしづらい形になっていないか
- `loadRouletteState` が壊れたデータで落ちないか
- `excludeDrawnCandidates` の分岐が複数箇所に散っていないか
