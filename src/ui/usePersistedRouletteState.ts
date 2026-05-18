import { useEffect, useState } from 'react';
import type { RouletteState } from '../domain/roulette';
import { loadRouletteState, saveRouletteState } from '../storage/rouletteStorage';
import { STORAGE_ERROR_MESSAGE } from './rouletteMessages';

export function usePersistedRouletteState(): {
  state: RouletteState;
  setState: React.Dispatch<React.SetStateAction<RouletteState>>;
  storageError: string | null;
} {
  const [state, setState] = useState<RouletteState>(() => loadRouletteState());
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    try {
      saveRouletteState(state);
      setStorageError(null);
    } catch {
      setStorageError(STORAGE_ERROR_MESSAGE);
    }
  }, [state]);

  return {
    state,
    setState,
    storageError,
  };
}
