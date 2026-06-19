import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_STATE, STORAGE_KEYS, type RouletteState } from '../domain/roulette';
import {
  clearRouletteState,
  loadRouletteState,
  saveRouletteState,
} from './rouletteStorage';

function createState(): RouletteState {
  return {
    candidates: [
      {
        id: 'candidate-1',
        name: '候補A',
        drawn: true,
        createdAt: '2026-05-16T00:00:00.000Z',
        updatedAt: '2026-05-16T01:00:00.000Z',
      },
      {
        id: 'candidate-2',
        name: '候補A',
        drawn: false,
        createdAt: '2026-05-16T00:00:00.000Z',
        updatedAt: '2026-05-16T00:00:00.000Z',
      },
    ],
    settings: {
      excludeDrawnCandidates: false,
    },
  };
}

describe('rouletteStorage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it('returns the default state when storage is empty', () => {
    expect(loadRouletteState()).toEqual(DEFAULT_STATE);
  });

  it('saves and loads roulette state', () => {
    const state = createState();

    saveRouletteState(state);

    expect(loadRouletteState()).toEqual(state);
  });

  it('throws when localStorage is unavailable during save', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });

    expect(() => saveRouletteState(createState())).toThrow(
      'localStorage is unavailable',
    );
  });

  it('falls back to the default state when localStorage access is blocked', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });

    expect(loadRouletteState()).toEqual(DEFAULT_STATE);
  });

  it('falls back to the default state when getItem throws', () => {
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });

    expect(loadRouletteState()).toEqual(DEFAULT_STATE);
  });

  it('falls back to the default state when stored JSON is broken', () => {
    window.localStorage.setItem(STORAGE_KEYS.rouletteState, '{invalid json');

    expect(loadRouletteState()).toEqual(DEFAULT_STATE);
  });

  it('falls back to the default state when stored data shape is invalid', () => {
    window.localStorage.setItem(
      STORAGE_KEYS.rouletteState,
      JSON.stringify({
        version: 999,
        candidates: [],
        settings: { excludeDrawnCandidates: true },
      }),
    );

    expect(loadRouletteState()).toEqual(DEFAULT_STATE);
  });

  it('removes persisted state when clearRouletteState is called', () => {
    saveRouletteState(createState());

    clearRouletteState();

    expect(window.localStorage.getItem(STORAGE_KEYS.rouletteState)).toBeNull();
    expect(loadRouletteState()).toEqual(DEFAULT_STATE);
  });
});
