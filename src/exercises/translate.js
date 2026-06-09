// ============================================
// Translate Exercise Renderer
// ============================================

/**
 * Renders a translation exercise (RO→DE or DE→RO).
 * @param {{ type: string, prompt: string, answer: string }} exercise
 * @returns {string} HTML string
 */
export function renderTranslate(exercise) {
  const isRoDe = exercise.type === 'translate_ro_de';
  const headerText = isRoDe ? 'Tradu în germană 🇩🇪' : 'Tradu în română 🇷🇴';
  const flagEmoji = isRoDe ? '🇩🇪' : '🇷🇴';
  const sourceLabel = isRoDe ? '🇷🇴 Română' : '🇩🇪 Germană';
  const targetLabel = isRoDe ? '🇩🇪 Germană' : '🇷🇴 Română';
  const placeholder = isRoDe ? 'Scrie traducerea în germană...' : 'Scrie traducerea în română...';

  return `
    <div class="exercise-translate">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">📝 ${headerText}</span>
      </div>

      <div class="translate-prompt-card card animate-scaleIn">
        <div class="translate-source-label">${sourceLabel}</div>
        <div class="translate-prompt-text">${exercise.prompt}</div>
        <button class="translate-speak-btn" id="btn-speak-word" title="Ascultă pronunția">
          🔊
        </button>
      </div>

      <div class="translate-arrow animate-fadeIn">⬇️</div>

      <div class="translate-answer-section animate-fadeInUp">
        <div class="translate-target-label">${targetLabel}</div>
        <input
          type="text"
          id="translate-input"
          class="input"
          placeholder="${placeholder}"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
        />
      </div>

      <button class="btn btn-primary btn-full btn-lg animate-fadeInUp" id="btn-check-translate"
              style="animation-delay: 0.2s; margin-top: var(--space-lg);">
        VERIFICĂ ${flagEmoji}
      </button>
    </div>

    <style>
      .exercise-translate {
        padding: var(--space-md);
      }

      .exercise-header {
        text-align: center;
        margin-bottom: var(--space-lg);
      }

      .translate-prompt-card {
        position: relative;
        text-align: center;
        padding: var(--space-xl) var(--space-lg);
        margin-bottom: var(--space-md);
      }

      .translate-source-label,
      .translate-target-label {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: var(--space-sm);
      }

      .translate-prompt-text {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-extrabold);
        color: var(--text-primary);
        line-height: 1.3;
      }

      .translate-speak-btn {
        position: absolute;
        top: var(--space-md);
        right: var(--space-md);
        background: none;
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius-full);
        width: 44px;
        height: 44px;
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all var(--transition-fast);
      }

      .translate-speak-btn:hover {
        border-color: var(--color-xp);
        background: rgba(28, 176, 246, 0.1);
      }

      .translate-speak-btn:active {
        transform: scale(0.9);
      }

      .translate-arrow {
        text-align: center;
        font-size: 1.5rem;
        margin: var(--space-sm) 0;
      }

      .translate-answer-section {
        margin-bottom: var(--space-sm);
      }
    </style>
  `;
}
