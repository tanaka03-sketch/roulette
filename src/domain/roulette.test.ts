
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
    expect(original[1]?.drawn).toBe(false);
  });
});