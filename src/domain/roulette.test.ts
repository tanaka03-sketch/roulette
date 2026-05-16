import { describe, expect, it } from 'vitest';
import {
  getDrawAvailability,
  getEligibleCandidates,
  markCandidateAsDrawn,
  pickRandomCandidate,
  type RouletteCandidate,
  type RouletteSettings,
} from './roulette';

function createCandidate(overrides: Partial<RouletteCandidate>): RouletteCandidate {
  return {
    id: 'candidate-1',
    name: '候補',
    drawn: false,
    createdAt: '2026-05-16T00:00:00.000Z',
    updatedAt: '2026-05-16T00:00:00.000Z',
    ...overrides,
  };
}

describe('getEligibleCandidates', () => {
  it('excludes drawn candidates when excludeDrawnCandidates is true', () => {
    const candidates = [
      createCandidate({ id: 'a', drawn: false }),
      createCandidate({ id: 'b', drawn: true }),
    ];
    const settings: RouletteSettings = { excludeDrawnCandidates: true };

    expect(
      getEligibleCandidates(candidates, settings).map((candidate) => candidate.id),
    ).toEqual(['a']);
  });

  it('keeps duplicate names as separate candidates by id', () => {
    const candidates = [
      createCandidate({ id: 'a', name: '重複' }),
      createCandidate({ id: 'b', name: '重複' }),
    ];
    const settings: RouletteSettings = { excludeDrawnCandidates: false };

    expect(
      getEligibleCandidates(candidates, settings).map((candidate) => candidate.id),
    ).toEqual(['a', 'b']);
  });
});

describe('getDrawAvailability', () => {
  it('returns NO_CANDIDATES when no candidates exist', () => {
    expect(getDrawAvailability([], { excludeDrawnCandidates: true })).toEqual({
      canDraw: false,
      eligibleCount: 0,
      reason: 'NO_CANDIDATES',
    });
  });

  it('returns NOT_ENOUGH_CANDIDATES when only one eligible candidate exists', () => {
    const candidates = [createCandidate({ id: 'a' })];

    expect(getDrawAvailability(candidates, { excludeDrawnCandidates: true })).toEqual({
      canDraw: false,
      eligibleCount: 1,
      reason: 'NOT_ENOUGH_CANDIDATES',
    });
  });

  it('returns ALL_DRAWN when exclude mode leaves no eligible candidates', () => {
    const candidates = [
      createCandidate({ id: 'a', drawn: true }),
      createCandidate({ id: 'b', drawn: true }),
    ];

    expect(getDrawAvailability(candidates, { excludeDrawnCandidates: true })).toEqual({
      canDraw: false,
      eligibleCount: 0,
      reason: 'ALL_DRAWN',
    });
  });

  it('allows drawing when at least two eligible candidates exist', () => {
    const candidates = [createCandidate({ id: 'a' }), createCandidate({ id: 'b' })];

    expect(getDrawAvailability(candidates, { excludeDrawnCandidates: true })).toEqual({
      canDraw: true,
      eligibleCount: 2,
    });
  });
});

describe('pickRandomCandidate', () => {
  it('uses injected randomValue for deterministic selection', () => {
    const candidates = [
      createCandidate({ id: 'a' }),
      createCandidate({ id: 'b' }),
      createCandidate({ id: 'c' }),
    ];

    expect(pickRandomCandidate(candidates, 0).id).toBe('a');
    expect(pickRandomCandidate(candidates, 0.5).id).toBe('b');
    expect(pickRandomCandidate(candidates, 1).id).toBe('c');
  });

  it('throws when called with an empty list', () => {
    expect(() => pickRandomCandidate([])).toThrowError(
      'pickRandomCandidate requires at least one candidate',
    );
  });
});

describe('markCandidateAsDrawn', () => {
  it('updates only the targeted candidate and does not mutate the input array', () => {
    const original = [
      createCandidate({ id: 'a', updatedAt: '2026-05-16T00:00:00.000Z' }),
      createCandidate({ id: 'b', updatedAt: '2026-05-16T00:00:00.000Z' }),
    ];

    const updated = markCandidateAsDrawn(original, 'b', '2026-05-16T01:00:00.000Z');

    expect(updated).toEqual([
      createCandidate({ id: 'a', updatedAt: '2026-05-16T00:00:00.000Z' }),
      createCandidate({
        id: 'b',
        drawn: true,
        updatedAt: '2026-05-16T01:00:00.000Z',
      }),
    ]);
    expect(original[1].drawn).toBe(false);
  });
});
