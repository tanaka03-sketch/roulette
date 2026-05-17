import {
  DEFAULT_STATE,
  STORAGE_KEYS,
  STORAGE_VERSION,
  cloneRouletteState,
  type RouletteCandidate,
  type RouletteSettings,
  type RouletteState,
  type RouletteStorageData,
} from '../domain/roulette';

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function requireLocalStorage(): Storage {
  const storage = getLocalStorage();
  if (storage === null) {
    throw new Error('localStorage is unavailable');
  }

  return storage;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isRouletteCandidate(value: unknown): value is RouletteCandidate {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.drawn === 'boolean' &&
    typeof value.createdAt === 'string' &&
    typeof value.updatedAt === 'string'
  );
}

function isRouletteSettings(value: unknown): value is RouletteSettings {
  if (!isRecord(value)) {
    return false;
  }

  return typeof value.excludeDrawnCandidates === 'boolean';
}

function isRouletteStorageData(value: unknown): value is RouletteStorageData {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.version === STORAGE_VERSION &&
    Array.isArray(value.candidates) &&
    value.candidates.every(isRouletteCandidate) &&
    isRouletteSettings(value.settings)
  );
}

function createDefaultState(): RouletteState {
  return cloneRouletteState(DEFAULT_STATE);
}

export function loadRouletteState(): RouletteState {
  const storage = getLocalStorage();
  if (storage === null) {
    return createDefaultState();
  }

  let rawValue: string | null;
  try {
    rawValue = storage.getItem(STORAGE_KEYS.rouletteState);
  } catch {
    return createDefaultState();
  }

  if (rawValue === null) {
    return createDefaultState();
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;
    if (!isRouletteStorageData(parsed)) {
      return createDefaultState();
    }

    return {
      candidates: parsed.candidates.map((candidate) => ({ ...candidate })),
      settings: { ...parsed.settings },
    };
  } catch {
    return createDefaultState();
  }
}

export function saveRouletteState(state: RouletteState): void {
  const storage = requireLocalStorage();

  const payload: RouletteStorageData = {
    version: STORAGE_VERSION,
    candidates: state.candidates.map((candidate) => ({ ...candidate })),
    settings: { ...state.settings },
  };

  storage.setItem(STORAGE_KEYS.rouletteState, JSON.stringify(payload));
}

export function clearRouletteState(): void {
  const storage = getLocalStorage();
  if (storage === null) {
    return;
  }

  try {
    storage.removeItem(STORAGE_KEYS.rouletteState);
  } catch {
    // Ignore blocked storage cleanup failures and keep the app usable.
  }
}
