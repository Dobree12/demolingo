// ============================================
// Multi-Choice Exercise Renderer
// ============================================

/**
 * Renders a multiple choice exercise.
 * @param {{ question: string, correct: string, options: string[] }} exercise
 * @returns {string} HTML string
 */
export function renderMultiChoice(exercise) {
  const optionsHTML = exercise.options
    .map(
      (option, i) => `
      <button class="mc-option card card-interactive animate-fadeInUp"
              data-value="${option}"
              style="animation-delay: ${i * 0.08}s;">
        <span class="mc-option-letter">${String.fromCharCode(65 + i)}</span>
        <span class="mc-option-text">${option}</span>
      </button>
    `
    )
    .join('');

  return `
    <div class="exercise-multi-choice">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🎯 Alege răspunsul corect</span>
      </div>

      <div class="mc-question animate-fadeIn">
        <p class="mc-question-text">${exercise.question}</p>
      </div>

      <div class="mc-options-grid">
        ${optionsHTML}
      </div>
    </div>

    <style>
      .exercise-multi-choice {
        padding: var(--space-md);
      }

      .exercise-header {
        text-align: center;
        margin-bottom: var(--space-lg);
      }

      .mc-question {
        text-align: center;
        margin-bottom: var(--space-xl);
      }

      .mc-question-text {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-extrabold);
        color: var(--text-primary);
        line-height: 1.3;
      }

      .mc-options-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-md);
      }

      .mc-option {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        padding: var(--space-lg) var(--space-md);
        min-height: 72px;
        text-align: left;
        cursor: pointer;
        transition: all var(--transition-fast);
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        background: var(--bg-card);
        box-shadow: var(--shadow-button-secondary);
        font-family: var(--font-family);
      }

      .mc-option:active {
        transform: translateY(3px);
        box-shadow: none;
      }

      .mc-option-letter {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: var(--border-radius-full);
        background: var(--bg-secondary);
        border: 2px solid var(--border-color);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        color: var(--text-secondary);
        flex-shrink: 0;
      }

      .mc-option-text {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }

      /* States applied by lesson.js */
      .mc-option.mc-correct {
        border-color: var(--color-success) !important;
        background: var(--color-success-bg) !important;
        box-shadow: none;
      }

      .mc-option.mc-correct .mc-option-letter {
        background: var(--color-success);
        border-color: var(--color-success);
        color: var(--text-inverse);
      }

      .mc-option.mc-wrong {
        border-color: var(--color-error) !important;
        background: var(--color-error-bg) !important;
        animation: shake 0.5s;
        box-shadow: none;
      }

      .mc-option.mc-wrong .mc-option-letter {
        background: var(--color-error);
        border-color: var(--color-error);
        color: var(--text-inverse);
      }

      .mc-option.mc-disabled {
        pointer-events: none;
        opacity: 0.7;
      }

      .mc-option.mc-disabled.mc-correct,
      .mc-option.mc-disabled.mc-wrong {
        opacity: 1;
      }

      @media (max-width: 400px) {
        .mc-options-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;
}
