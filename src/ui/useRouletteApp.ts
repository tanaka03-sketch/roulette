import { useEffect, useRef, useState } from 'react';
import {
  createCandidateId,
  getDrawAvailability,
  getEligibleCandidates,
  pickRandomCandidate,
  validateCandidateName,
  type RouletteCandidate,
} from '../domain/roulette';
import {
  CANDIDATE_UPDATED_MESSAGE,
  CLEAR_CANDIDATES_COMPLETED_MESSAGE,
  CLEAR_CANDIDATES_CONFIRM_MESSAGE,
  DRAW_LOCK_MESSAGE,
  RESET_DRAWN_COMPLETED_MESSAGE,
  RESET_DRAWN_CONFIRM_MESSAGE,
  getAvailabilityMessage,
} from './rouletteMessages';
import {
  DRAW_DURATION_MS,
  finalizeDraw,
  type FinalizedDraw,
} from './rouletteDrawFlow';
import { usePersistedRouletteState } from './usePersistedRouletteState';
import {
  appendCandidate,
  createCandidate,
  removeCandidate,
  renameCandidate,
  resetDrawnCandidates,
} from './rouletteStateUpdates';

export function useRouletteApp() {
  const { state, setState, storageError } = usePersistedRouletteState();
  const [candidateName, setCandidateName] = useState('');
  const [editingCandidateId, setEditingCandidateId] = useState<string | null>(null);
  const [editingCandidateName, setEditingCandidateName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastResult, setLastResult] = useState<RouletteCandidate | null>(null);
  const drawTimerRef = useRef<number | null>(null);

  const availability = getDrawAvailability(state.candidates, state.settings);
  const eligibleCandidates = getEligibleCandidates(state.candidates, state.settings);

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

    const validationResult = validateCandidateName(candidateName);
    if (!validationResult.isValid) {
      setFeedbackMessage(validationResult.message);
      return;
    }

    const now = new Date().toISOString();
    setState((currentState) => ({
      ...currentState,
      candidates: appendCandidate(
        currentState.candidates,
        createCandidate(createCandidateId(), validationResult.normalizedName, now),
      ),
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

    const validationResult = validateCandidateName(editingCandidateName);
    if (!validationResult.isValid) {
      setFeedbackMessage(validationResult.message);
      return;
    }

    const now = new Date().toISOString();
    setState((currentState) => ({
      ...currentState,
      candidates: renameCandidate(
        currentState.candidates,
        editingCandidateId,
        validationResult.normalizedName,
        now,
      ),
    }));
    if (lastResult?.id === editingCandidateId) {
      setLastResult((currentResult) =>
        currentResult === null
          ? null
          : {
              ...currentResult,
              name: validationResult.normalizedName,
              updatedAt: now,
            },
      );
    }
    resetEditingState();
    setFeedbackMessage(CANDIDATE_UPDATED_MESSAGE);
  }

  function handleDeleteCandidate(candidateId: string) {
    if (guardDuringDraw()) {
      return;
    }

    setState((currentState) => ({
      ...currentState,
      candidates: removeCandidate(currentState.candidates, candidateId),
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
      const finalizedDraw: FinalizedDraw = finalizeDraw(state.candidates, winner, now);

      setState((currentState) => ({
        ...currentState,
        candidates: finalizedDraw.candidates,
      }));

      setLastResult(finalizedDraw.lastResult);
      setIsDrawing(false);
      drawTimerRef.current = null;
      setFeedbackMessage(finalizedDraw.feedbackMessage);
    }, DRAW_DURATION_MS);
  }

  function handleResetDrawnCandidates() {
    if (guardDuringDraw()) {
      return;
    }

    const shouldReset = window.confirm(RESET_DRAWN_CONFIRM_MESSAGE);
    if (!shouldReset) {
      return;
    }

    const now = new Date().toISOString();
    setState((currentState) => ({
      ...currentState,
      candidates: resetDrawnCandidates(currentState.candidates, now),
    }));
    setLastResult(null);
    setFeedbackMessage(RESET_DRAWN_COMPLETED_MESSAGE);
  }

  function handleClearCandidates() {
    if (guardDuringDraw()) {
      return;
    }

    const shouldClear = window.confirm(CLEAR_CANDIDATES_CONFIRM_MESSAGE);
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
    setFeedbackMessage(CLEAR_CANDIDATES_COMPLETED_MESSAGE);
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
