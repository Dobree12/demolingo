// ============================================
// Speak Exercise Renderer
// ============================================

/**
 * Renders a speaking exercise.
 * @param {{ word: string, translation: string }} exercise
 * @returns {string} HTML string
 */
export function renderSpeak(exercise) {
  return `
    <div class="exercise-speak">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🗣️ Spune în germană</span>
      </div>

      <div class="speak-word-card card animate-scaleIn">
        <div class="speak-word-label">🇩🇪 Spune acest cuvânt:</div>
        <div class="speak-word-text">${exercise.word}</div>
        <div class="speak-word-translation">🇷🇴 ${exercise.translation}</div>
      </div>

      <div class="speak-hear-area animate-fadeIn" style="animation-delay: 0.1s;">
        <button class="speak-hear-btn" id="btn-hear-word">
          🔊 Ascultă mai întâi
        </button>
      </div>

      <div class="speak-record-area animate-fadeInUp" style="animation-delay: 0.2s;">
        <button class="speak-record-btn" id="btn-record">
          <span class="speak-record-icon">🎤</span>
          <span class="speak-record-label">Vorbește</span>
        </button>
        <p class="speak-record-hint">Apasă și spune cuvântul în germană</p>
      </div>

      <div class="speak-result hidden" id="speak-result"></div>
    </div>

    <style>
      .exercise-speak {
        padding: var(--space-md);
      }

      .exercise-header {
        text-align: center;
        margin-bottom: var(--space-lg);
      }

      .speak-word-card {
        text-align: center;
        padding: var(--space-xl) var(--space-lg);
        margin-bottom: var(--space-lg);
      }

      .speak-word-label {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: var(--space-sm);
      }

      .speak-word-text {
        font-size: var(--font-size-4xl);
        font-weight: var(--font-weight-extrabold);
        color: var(--text-primary);
        margin-bottom: var(--space-sm);
        line-height: 1.2;
      }

      .speak-word-translation {
        font-size: var(--font-size-lg);
        color: var(--text-secondary);
        font-weight: var(--font-weight-semibold);
      }

      .speak-hear-area {
        text-align: center;
        margin-bottom: var(--space-xl);
      }

      .speak-hear-btn {
        background: var(--bg-card);
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        padding: var(--space-md) var(--space-xl);
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-bold);
        color: var(--color-xp);
        cursor: pointer;
        transition: all var(--transition-fast);
        font-family: var(--font-family);
        box-shadow: var(--shadow-button-secondary);
      }

      .speak-hear-btn:hover {
        border-color: var(--color-xp);
        background: rgba(28, 176, 246, 0.05);
      }

      .speak-hear-btn:active {
        transform: translateY(3px);
        box-shadow: none;
      }

      .speak-record-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: var(--space-lg);
      }

      .speak-record-btn {
        width: 140px;
        height: 140px;
        border-radius: var(--border-radius-full);
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
        border: none;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-xs);
        box-shadow: 0 6px 0 var(--color-primary-dark), var(--shadow-lg);
        transition: all var(--transition-fast);
      }

      .speak-record-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 9px 0 var(--color-primary-dark), var(--shadow-xl);
      }

      .speak-record-btn:active {
        transform: translateY(4px);
        box-shadow: 0 2px 0 var(--color-primary-dark);
      }

      .speak-record-btn.recording {
        background: linear-gradient(135deg, var(--color-hearts), var(--color-hearts-dark));
        box-shadow: 0 6px 0 var(--color-hearts-dark), var(--shadow-lg);
        animation: pulse 1s infinite;
      }

      .speak-record-icon {
        font-size: 3rem;
      }

      .speak-record-label {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-extrabold);
        color: var(--text-inverse);
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .speak-record-hint {
        margin-top: var(--space-md);
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        font-weight: var(--font-weight-semibold);
      }

      .speak-result {
        text-align: center;
        padding: var(--space-lg);
        background: var(--bg-secondary);
        border-radius: var(--border-radius-lg);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--text-primary);
        animation: fadeInUp var(--transition-normal) forwards;
      }
    </style>
  `;
}
