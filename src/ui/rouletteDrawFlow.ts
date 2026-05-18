import {
  markCandidateAsDrawn,
  type RouletteCandidate,
} from '../domain/roulette';
import { getDrawResultMessage } from './rouletteMessages';

export const DRAW_DURATION_MS = 900;

export type FinalizedDraw = {
  candidates: RouletteCandidate[];
  lastResult: RouletteCandidate;
  feedbackMessage: string;
};

export function finalizeDraw(
  candidates: RouletteCandidate[],
  winner: RouletteCandidate,
  now: string,
): FinalizedDraw {
  return {
    candidates: markCandidateAsDrawn(candidates, winner.id, now),
    lastResult: {
      ...winner,
      drawn: true,
      updatedAt: now,
    },
    feedbackMessage: getDrawResultMessage(winner.name),
  };
}
