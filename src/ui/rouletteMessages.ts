import type { DrawAvailability } from '../domain/roulette';

export const DRAW_LOCK_MESSAGE = '抽選中は候補や設定を変更できません';
export const STORAGE_ERROR_MESSAGE =
  '状態の保存に失敗しました。ブラウザ設定を確認してください';
export const RESET_DRAWN_CONFIRM_MESSAGE =
  '抽選済み状態をリセットしますか？';
export const CLEAR_CANDIDATES_CONFIRM_MESSAGE =
  '候補リストをすべて削除しますか？';
export const CANDIDATE_UPDATED_MESSAGE = '候補名を更新しました';
export const RESET_DRAWN_COMPLETED_MESSAGE =
  '抽選済み状態をリセットしました';
export const CLEAR_CANDIDATES_COMPLETED_MESSAGE =
  '候補リストをすべて削除しました';

export function getAvailabilityMessage(
  availability: DrawAvailability,
): string | null {
  if (availability.canDraw) {
    return null;
  }

  if (availability.reason === 'ALL_DRAWN') {
    return '抽選可能な候補がありません。リセットしてください';
  }

  return '抽選には2件以上の候補が必要です';
}

export function getDrawResultMessage(candidateName: string): string {
  return `結果: ${candidateName}`;
}
