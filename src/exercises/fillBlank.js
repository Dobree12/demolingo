// ============================================
// Fill-in-the-Blank Exercise Renderer
// ============================================

/**
 * Renders a fill-in-the-blank exercise.
 * @param {{ sentence: string, answer: string, hint: string }} exercise
 * @returns {string} HTML string
 */
export function renderFillBlank(exercise) {
  // Replace ___ (or multiple underscores) with a styled blank indicator
  const sentenceHTML = exercise.sentence.replace(
    /_{2,}/g,
    '<span class="fillblank-gap">______</span>'
  );

  return `
    <div class="exercise-fillblank">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">✏️ Completează propoziția</span>
      </div>

      <div class="fillblank-sentence card animate-scaleIn">
        <p class="fillblank-text">${sentenceHTML}</p>
      </div>

      ${exercise.hint ? `
        <div class="fillblank-hint animate-fadeIn">
          💡 <em>${exercise.hint}</em>
        </div>
      ` : ''}

      <div class="fillblank-input-area animate-fadeInUp">
        <input
          type="text"
          id="fillblank-input"
          class="input"
          placeholder="Scrie cuvântul lipsă..."
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
        />
      </div>

      <button class="btn btn-primary btn-full btn-lg animate-fadeInUp" id="btn-check-fillblank"
              style="animation-delay: 0.15s; margin-top: var(--space-md);">
        VERIFICĂ ✏️
      </button>
    </div>

    <style>
      .exercise-fillblank {
        padding: var(--space-md);
      }

      .exercise-header {
        text-align: center;
        margin-bottom: var(--space-lg);
      }

      .fillblank-sentence {
        text-align: center;
        padding: var(--space-xl) var(--space-lg);
        margin-bottom: var(--space-md);
      }

      .fillblank-text {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        color: var(--text-primary);
        line-height: 1.6;
      }

      .fillblank-gap {
        display: inline-block;
        border-bottom: 3px solid var(--color-primary);
        color: var(--color-primary);
        font-weight: var(--font-weight-extrabold);
        padding: 0 var(--space-xs);
        margin: 0 var(--space-xs);
        min-width: 80px;
        text-align: center;
        letter-spacing: 2px;
      }

      .fillblank-hint {
        text-align: center;
        font-size: var(--font-size-md);
        color: var(--text-secondary);
        margin-bottom: var(--space-lg);
        padding: var(--space-sm) var(--space-md);
        background: var(--color-warning-bg);
        border-radius: var(--border-radius-md);
      }

      .fillblank-input-area {
        margin-bottom: var(--space-sm);
      }
    </style>
  `;
}
