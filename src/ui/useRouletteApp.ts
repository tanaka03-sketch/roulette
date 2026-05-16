import { useEffect, useMemo, useRef, useState } from 'react';
import {
  createCandidateId,
  getDrawAvailability,
  getEligibleCandidates,
  markCandidateAsDrawn,
  pickRandomCandidate,
  type DrawAvailability,
  type RouletteCandidate,
  type RouletteState,
} from '../domain/roulette';
import { loadRouletteState, saveRouletteState } from '../storage/rouletteStorage';

function getAvailabilityMessage(availability: DrawAvailability): string | null {
  if (availability.canDraw) {
    return null;
  }

  if (availability.reason === 'ALL_DRAWN') {
    return '抽選可能な候補がありません。リセットしてください';
  }

  return '抽選には2件以上の候補が必要です';
}

export function useRouletteApp() {
  const [state, setState] = useState<RouletteState>(() => loadRouletteState());
  const [candidateName, setCandidateName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastResult, setLastResult] = useState<RouletteCandidate | null>(null);
  const drawTimerRef = useRef<number | null>(null);

  const availability = useMemo(
    () => getDrawAvailability(state.candidates, state.settings),
    [state.candidates, state.settings],
  );

  useEffect(() => {
    try {
      saveRouletteState(state);
      setStorageError(null);
    } catch {
      setStorageError('状態の保存に失敗しました。ブラウザ設定を確認してください');
    }
  }, [state]);

  useEffect(() => {
    return () => {
      if (drawTimerRef.current !== null) {
        window.clearTimeout(drawTimerRef.current);
      }
    };
  }, []);

  const eligibleCandidates = useMemo(
    () => getEligibleCandidates(state.candidates, state.settings),
    [state.candidates, state.settings],
  );

  function handleAddCandidate() {
    const trimmedName = candidateName.trim();
    if (trimmedName.length === 0) {
      setFeedbackMessage('候補を入力してください');
      return;
    }

    const now = new Date().toISOString();
    setState((currentState) => ({
      ...currentState,
      candidates: [
        ...currentState.candidates,
        {
          id: createCandidateId(),
          name: trimmedName,
          drawn: false,
          createdAt: now,
          updatedAt: now,
        },
      ],
    }));
    setCandidateName('');
    setFeedbackMessage(null);
  }

  function handleDeleteCandidate(candidateId: string) {
    setState((currentState) => ({
      ...currentState,
      candidates: currentState.candidates.filter(
        (candidate) => candidate.id !== candidateId,
      ),
    }));
    setLastResult((currentResult) =>
      currentResult?.id === candidateId ? null : currentResult,
    );
  }

  function handleToggleExcludeDrawnCandidates() {
    setState((currentState) => ({
      ...currentState,
      settings: {
        ...currentState.settings,
        excludeDrawnCandidates: !currentState.settings.excludeDrawnCandidates,
      },
    }));
    setFeedbackMessage(null);
  }

  function handleStartDraw() {
    if (isDrawing) {
      return;
    }

    if (!availability.canDraw) {
      setFeedbackMessage(getAvailabilityMessage(availability));
      return;
    }

    const winner = pickRandomCandidate(eligibleCandidates);
    setIsDrawing(true);
    setFeedbackMessage(null);

    drawTimerRef.current = window.setTimeout(() => {
      const now = new Date().toISOString();
      setState((currentState) => ({
        ...currentState,
        candidates: markCandidateAsDrawn(currentState.candidates, winner.id, now),
      }));
      setLastResult({
        ...winner,
        drawn: true,
        updatedAt: now,
      });
      setIsDrawing(false);
      setFeedbackMessage(`結果: ${winner.name}`);
    }, 900);
  }

  function handleResetDrawnCandidates() {
    const shouldReset = window.confirm('抽選済み状態をリセットしますか？');
    if (!shouldReset) {
      return;
    }

    const now = new Date().toISOString();
    setState((currentState) => ({
      ...currentState,
      candidates: currentState.candidates.map((candidate) => ({
        ...candidate,
        drawn: false,
        updatedAt: now,
      })),
    }));
    setLastResult(null);
    setFeedbackMessage('抽選済み状態をリセットしました');
  }

  return {
    availability,
    candidateName,
    candidates: state.candidates,
    eligibleCount: eligibleCandidates.length,
    excludeDrawnCandidates: state.settings.excludeDrawnCandidates,
    feedbackMessage,
    isDrawing,
    lastResult,
    storageError,
    totalCount: state.candidates.length,
    setCandidateName,
    handleAddCandidate,
    handleDeleteCandidate,
    handleResetDrawnCandidates,
    handleStartDraw,
    handleToggleExcludeDrawnCandidates,
  };
}
