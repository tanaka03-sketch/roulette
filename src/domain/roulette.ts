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

export const STORAGE_VERSION = 1 as const;
export const CANDIDATE_NAME_MAX_LENGTH = 120 as const;
export const CANDIDATE_NAME_REQUIRED_MESSAGE = '候補を入力してください';
export const CANDIDATE_NAME_TOO_LONG_MESSAGE =
  `候補名は${CANDIDATE_NAME_MAX_LENGTH}文字以内で入力してください`;

export type RouletteStorageData = {
  version: typeof STORAGE_VERSION;
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

export type CandidateNameValidationResult =
  | { isValid: true; normalizedName: string }
  | { isValid: false; message: string };

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

export function cloneCandidate(candidate: RouletteCandidate): RouletteCandidate {
  return { ...candidate };
}

export function cloneRouletteState(state: RouletteState): RouletteState {
  return {
    candidates: state.candidates.map(cloneCandidate),
    settings: { ...state.settings },
  };
}

export function validateCandidateName(value: string): CandidateNameValidationResult {
  const normalizedName = value.trim();

  if (normalizedName.length === 0) {
    return {
      isValid: false,
      message: CANDIDATE_NAME_REQUIRED_MESSAGE,
    };
  }

  if (normalizedName.length > CANDIDATE_NAME_MAX_LENGTH) {
    return {
      isValid: false,
      message: CANDIDATE_NAME_TOO_LONG_MESSAGE,
    };
  }

  return {
    isValid: true,
    normalizedName,
  };
}

export function createCandidateId(): string {
  if (
    typeof globalThis.crypto !== 'undefined' &&
    typeof globalThis.crypto.randomUUID === 'function'
  ) {
    return globalThis.crypto.randomUUID();
  }

  return `cand_${Date.now()}_${Math.floor(Math.random() * 1_000_000)}`;
}

export function getEligibleCandidates(
  candidates: RouletteCandidate[],
  settings: RouletteSettings,
): RouletteCandidate[] {
  if (!settings.excludeDrawnCandidates) {
    return candidates.map(cloneCandidate);
  }

  return candidates.filter((candidate) => !candidate.drawn).map(cloneCandidate);
}

export function getDrawAvailability(
  candidates: RouletteCandidate[],
  settings: RouletteSettings,
): DrawAvailability {
  if (candidates.length === 0) {
    return {
      canDraw: false,
      eligibleCount: 0,
      reason: 'NO_CANDIDATES',
    };
  }

  const eligibleCount = getEligibleCandidates(candidates, settings).length;

  if (eligibleCount === 0) {
    return {
      canDraw: false,
      eligibleCount,
      reason: 'ALL_DRAWN',
    };
  }

  if (eligibleCount === 1) {
    return {
      canDraw: false,
      eligibleCount,
      reason: 'NOT_ENOUGH_CANDIDATES',
    };
  }

  return {
    canDraw: true,
    eligibleCount,
  };
}

export function pickRandomCandidate(
  candidates: RouletteCandidate[],
  randomValue = Math.random(),
): RouletteCandidate {
  if (candidates.length === 0) {
    throw new Error('pickRandomCandidate requires at least one candidate');
  }

  const normalizedRandom = Number.isFinite(randomValue)
    ? Math.max(0, Math.min(randomValue, 1))
    : Math.random();
  const index = Math.min(
    Math.floor(normalizedRandom * candidates.length),
    candidates.length - 1,
  );

  return cloneCandidate(candidates[index]!);
}

export function markCandidateAsDrawn(
  candidates: RouletteCandidate[],
  candidateId: string,
  now: string,
): RouletteCandidate[] {
  return candidates.map((candidate) => {
    if (candidate.id !== candidateId) {
      return cloneCandidate(candidate);
    }

    return {
      ...candidate,
      drawn: true,
      updatedAt: now,
    };
  });
}
