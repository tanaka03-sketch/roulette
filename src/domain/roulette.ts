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

export type RouletteStorageData = {
  version: typeof ROULETTE_STORAGE_VERSION;
  candidates: RouletteCandidate[];
  settings: RouletteSettings;
};

export type DrawAvailability =
  | { canDraw: true; eligibleCount: number }
  | {
      canDraw: false;
      eligibleCount: number;
      reason: 'NO_CANDIDATES' | 'NOT_ENOUGH_CANDIDATES' | 'ALL_DRAWN';
    };

export const ROULETTE_STORAGE_VERSION = 1 as const;

export const STORAGE_KEYS = {
  rouletteState: 'roulette.state.v1',
} as const;

export const DEFAULT_SETTINGS: RouletteSettings = {
  excludeDrawnCandidates: true,
};

export const DEFAULT_STATE: RouletteState = {
  candidates: [],
  settings: DEFAULT_SETTINGS,
};

export function createCandidateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `cand_${Date.now()}_${Math.floor(Math.random() * 1_000_000)}`;
}
