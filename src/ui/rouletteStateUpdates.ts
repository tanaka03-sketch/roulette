import type { RouletteCandidate } from '../domain/roulette';

export function createCandidate(
  id: string,
  name: string,
  now: string,
): RouletteCandidate {
  return {
    id,
    name,
    drawn: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function appendCandidate(
  candidates: RouletteCandidate[],
  candidate: RouletteCandidate,
): RouletteCandidate[] {
  return [...candidates, candidate];
}

export function renameCandidate(
  candidates: RouletteCandidate[],
  candidateId: string,
  name: string,
  now: string,
): RouletteCandidate[] {
  return candidates.map((candidate) => {
    if (candidate.id !== candidateId) {
      return candidate;
    }

    return {
      ...candidate,
      name,
      updatedAt: now,
    };
  });
}

export function removeCandidate(
  candidates: RouletteCandidate[],
  candidateId: string,
): RouletteCandidate[] {
  return candidates.filter((candidate) => candidate.id !== candidateId);
}

export function resetDrawnCandidates(
  candidates: RouletteCandidate[],
  now: string,
): RouletteCandidate[] {
  return candidates.map((candidate) => ({
    ...candidate,
    drawn: false,
    updatedAt: now,
  }));
}
