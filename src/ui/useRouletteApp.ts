import { useEffect, useRef, useState } from 'react';
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

const DRAW_LOCK_MESSAGE = '抽選中は候補や設定を変更できません';

export function useRouletteApp() {
  const [state, setState] = useState<RouletteState>(() => loadRouletteState());
  const [candidateName, setCandidateName] = useState('');
  const [editingCandidateId, setEditingCandidateId] = useState<string | null>(null);
  const [editingCandidateName, setEditingCandidateName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastResult, setLastResult] = useState<RouletteCandidate | null>(null);
  const drawTimerRef = useRef<number | null>(null);

  const availability = getDrawAvailability(state.candidates, state.settings);
  const eligibleCandidates = getEligibleCandidates(state.candidates, state.settings);

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

  function resetEditingState() {
    setEditingCandidateId(null);
    setEditingCandidateName('');
  }

  function guardDuringDraw(): boolean {
    if (!isDrawing) {
      return false;
    }

    setFeedbackMessage(DRAW_LOCK_MESSAGE);
    return true;
  }

  function handleAddCandidate() {
    if (guardDuringDraw()) {
      return;
    }

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

  function handleStartEditingCandidate(candidate: RouletteCandidate) {
    if (guardDuringDraw()) {
      return;
    }

    setEditingCandidateId(candidate.id);
    setEditingCandidateName(candidate.name);
    setFeedbackMessage(null);
  }

  function handleCancelEditingCandidate() {
    if (guardDuringDraw()) {
      return;
    }

    resetEditingState();
  }

  function handleSaveCandidateEdit() {
    if (guardDuringDraw()) {
      return;
    }

    if (editingCandidateId === null) {
      return;
    }

    const trimmedName = editingCandidateName.trim();
    if (trimmedName.length === 0) {
      setFeedbackMessage('候補を入力してください');
      return;
    }

    const now = new Date().toISOString();
    setState((currentState) => ({
      ...currentState,
      candidates: currentState.candidates.map((candidate) => {
        if (candidate.id !== editingCandidateId) {
          return candidate;
        }

        return {
          ...candidate,
          name: trimmedName,
          updatedAt: now,
        };
      }),
    }));
    if (lastResult?.id === editingCandidateId) {
      setLastResult((currentResult) =>
        currentResult === null
          ? null
          : {
              ...currentResult,
              name: trimmedName,
              updatedAt: now,
            },
      );
    }
    resetEditingState();
    setFeedbackMessage('候補名を更新しました');
  }

  function handleDeleteCandidate(candidateId: string) {
    if (guardDuringDraw()) {
      return;
    }

    setState((currentState) => ({
      ...currentState,
      candidates: currentState.candidates.filter(
        (candidate) => candidate.id !== candidateId,
      ),
    }));
    setLastResult((currentResult) =>
      currentResult?.id === candidateId ? null : currentResult,
    );
    if (editingCandidateId === candidateId) {
      resetEditingState();
    }
  }

  function handleToggleExcludeDrawnCandidates() {
    if (guardDuringDraw()) {
      return;
    }

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
      drawTimerRef.current = null;
      setFeedbackMessage(`結果: ${winner.name}`);
    }, 900);
  }

  function handleResetDrawnCandidates() {
    if (guardDuringDraw()) {
      return;
    }

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

  function handleClearCandidates() {
    if (guardDuringDraw()) {
      return;
    }

    const shouldClear = window.confirm('候補リストをすべて削除しますか？');
    if (!shouldClear) {
      return;
    }

    if (drawTimerRef.current !== null) {
      window.clearTimeout(drawTimerRef.current);
      drawTimerRef.current = null;
      setIsDrawing(false);
    }

    setState((currentState) => ({
      ...currentState,
      candidates: [],
    }));
    setCandidateName('');
    resetEditingState();
    setLastResult(null);
    setFeedbackMessage('候補リストをすべて削除しました');
  }

  return {
    availability,
    candidateName,
    candidates: state.candidates,
    editingCandidateId,
    editingCandidateName,
    eligibleCount: eligibleCandidates.length,
    excludeDrawnCandidates: state.settings.excludeDrawnCandidates,
    feedbackMessage,
    isDrawing,
    lastResult,
    storageError,
    totalCount: state.candidates.length,
    setCandidateName,
    setEditingCandidateName,
    handleAddCandidate,
    handleCancelEditingCandidate,
    handleClearCandidates,
    handleDeleteCandidate,
    handleResetDrawnCandidates,
    handleSaveCandidateEdit,
    handleStartDraw,
    handleStartEditingCandidate,
    handleToggleExcludeDrawnCandidates,
  };
}
