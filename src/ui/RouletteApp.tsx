import { useRouletteApp } from './useRouletteApp';

function getAvailabilityHint(canDraw: boolean, eligibleCount: number, totalCount: number) {
  if (canDraw) {
    return `${eligibleCount}件 / ${totalCount}件 から抽選できます`;
  }

  if (totalCount === 0) {
    return '候補を追加すると抽選を始められます';
  }

  if (eligibleCount === 0) {
    return '抽選可能な候補がありません。リセットしてください';
  }

  return '抽選には2件以上の候補が必要です';
}

export function RouletteApp() {
  const {
    availability,
    candidateName,
    candidates,
    editingCandidateId,
    editingCandidateName,
    eligibleCount,
    excludeDrawnCandidates,
    feedbackMessage,
    isDrawing,
    lastResult,
    storageError,
    totalCount,
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
  } = useRouletteApp();

  const availabilityHint = getAvailabilityHint(
    availability.canDraw,
    eligibleCount,
    totalCount,
  );

  return (
    <main className="app-shell">
      <div className="page-grid">
        <section className="panel hero-panel">
          <div>
            <p className="eyebrow">Single User Roulette</p>
            <h1>候補を登録して、その場で引けるルーレット</h1>
            <p className="lead">
              認証なし、サーバー保存なしのクライアント完結型です。状態は
              <code>localStorage</code>
              に保存され、同名候補も内部 ID で区別されます。
            </p>
          </div>
          <div className="summary-grid" aria-label="候補の集計">
            <div className="summary-item">
              <span className="summary-label">全候補</span>
              <strong>{totalCount}</strong>
            </div>
            <div className="summary-item">
              <span className="summary-label">抽選対象</span>
              <strong>{eligibleCount}</strong>
            </div>
            <div className="summary-item">
              <span className="summary-label">抽選済み</span>
              <strong>{candidates.filter((candidate) => candidate.drawn).length}</strong>
            </div>
          </div>
        </section>

        <div className="content-grid">
          <section className="panel section-panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Candidates</p>
                <h2>候補管理</h2>
              </div>
            </div>

            <div className="form-stack">
              <label className="field-label" htmlFor="candidateName">
                候補名
              </label>
              <div className="input-row">
                <input
                  id="candidateName"
                  className="text-input"
                  type="text"
                  value={candidateName}
                  maxLength={120}
                  placeholder="例: ランチ / 企画案 / 発表順"
                  disabled={isDrawing}
                  onChange={(event) => setCandidateName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleAddCandidate();
                    }
                  }}
                />
                <button
                  className="primary-button"
                  type="button"
                  disabled={isDrawing}
                  onClick={handleAddCandidate}
                >
                  追加
                </button>
              </div>
              <p className="helper-text">空文字や空白だけの候補は登録できません。</p>
            </div>

            <div className="candidate-list-wrap">
              <div className="section-subheading">
                <h3>候補一覧</h3>
                <span>{totalCount}件</span>
              </div>
              {candidates.length === 0 ? (
                <p className="empty-state">まだ候補がありません。</p>
              ) : (
                <ul className="candidate-list">
                  {candidates.map((candidate, index) => {
                    const isEditing = editingCandidateId === candidate.id;
                    const candidateDisplayLabel = `候補 #${index + 1}`;
                    const candidateActionLabel = `${candidateDisplayLabel}「${candidate.name}」`;

                    return (
                      <li key={candidate.id} className="candidate-row">
                        {isEditing ? (
                          <div className="candidate-edit-grid">
                            <input
                              className="text-input"
                              type="text"
                              value={editingCandidateName}
                              maxLength={120}
                              aria-label={`${candidateDisplayLabel}の候補名`}
                              disabled={isDrawing}
                              onChange={(event) =>
                                setEditingCandidateName(event.target.value)
                              }
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  event.preventDefault();
                                  handleSaveCandidateEdit();
                                }
                              }}
                            />
                            <div className="candidate-action-row">
                              <button
                                className="secondary-button"
                                type="button"
                                disabled={isDrawing}
                                onClick={handleSaveCandidateEdit}
                              >
                                保存
                              </button>
                              <button
                                className="ghost-button"
                                type="button"
                                disabled={isDrawing}
                                onClick={handleCancelEditingCandidate}
                              >
                                キャンセル
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="candidate-copy">
                              <span className="candidate-name">{candidate.name}</span>
                              <span className="candidate-meta">{candidateDisplayLabel}</span>
                              <span
                                className={
                                  candidate.drawn
                                    ? 'candidate-badge is-drawn'
                                    : 'candidate-badge'
                                }
                              >
                                {candidate.drawn ? '抽選済み' : '未抽選'}
                              </span>
                            </div>
                            <div className="candidate-action-row is-inline">
                              <button
                                className="ghost-button"
                                type="button"
                                disabled={isDrawing}
                                onClick={() => handleStartEditingCandidate(candidate)}
                                aria-label={`${candidateActionLabel}を編集`}
                              >
                                編集
                              </button>
                              <button
                                className="ghost-button"
                                type="button"
                                disabled={isDrawing}
                                onClick={() => handleDeleteCandidate(candidate.id)}
                                aria-label={`${candidateActionLabel}を削除`}
                              >
                                削除
                              </button>
                            </div>
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>

          <section className="panel section-panel draw-panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Draw</p>
                <h2>抽選</h2>
              </div>
            </div>

            <label className="toggle-row">
              <input
                type="checkbox"
                checked={excludeDrawnCandidates}
                disabled={isDrawing}
                onChange={handleToggleExcludeDrawnCandidates}
              />
              <span>抽選済み候補を次回抽選から除外する</span>
            </label>

            <div className="result-board" aria-live="polite">
              <p className="result-label">現在の状態</p>
              {isDrawing ? (
                <div className="drawing-state">
                  <div className="spinner-bar" />
                  <strong>抽選中...</strong>
                </div>
              ) : lastResult ? (
                <>
                  <strong className="result-name">{lastResult.name}</strong>
                  <p className="result-caption">最新の抽選結果です。</p>
                </>
              ) : (
                <>
                  <strong className="result-name">準備完了</strong>
                  <p className="result-caption">候補を登録して抽選を始めてください。</p>
                </>
              )}
            </div>

            <button
              className="primary-button draw-button"
              type="button"
              disabled={!availability.canDraw || isDrawing}
              onClick={handleStartDraw}
            >
              {isDrawing ? '抽選中...' : '抽選開始'}
            </button>
            <p className="helper-text">{availabilityHint}</p>

            <div className="action-row">
              <button
                className="secondary-button"
                type="button"
                disabled={isDrawing}
                onClick={handleResetDrawnCandidates}
              >
                抽選済み状態をリセット
              </button>
              <button
                className="danger-button"
                type="button"
                disabled={isDrawing}
                onClick={handleClearCandidates}
              >
                候補をすべて削除
              </button>
            </div>

            {feedbackMessage ? <p className="status-banner">{feedbackMessage}</p> : null}
            {storageError ? <p className="error-banner">{storageError}</p> : null}
          </section>
        </div>
      </div>
    </main>
  );
}
