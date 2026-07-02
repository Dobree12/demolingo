// ============================================
// Listen & Choose Exercise — auzi cuvântul german, alegi sensul
// ============================================
// Mai ușor decât `listen` (fără tastare): se redă cuvântul german prin TTS,
// iar utilizatorul alege traducerea românească corectă.
// Exercise shape:
//   {
//     type: 'listenChoice',
//     word: 'der Hund',          // german, redat prin TTS (NU e afișat ca text)
//     correct: 'câine',          // răspunsul corect (românește)
//     options: ['câine','pisică','cal']   // variante românești
//   }

export function renderListenChoice(exercise) {
  const optionsHTML = exercise.options
    .map(
      (option, i) => `
      <button class="lc-option card card-interactive animate-fadeInUp"
              data-value="${option}"
              style="animation-delay: ${i * 0.08}s;">
        <span class="lc-option-letter">${String.fromCharCode(65 + i)}</span>
        <span class="lc-option-text">${option}</span>
      </button>
    `
    )
    .join('');

  return `
    <div class="exercise-listen-choice">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🔊 Ascultă și alege</span>
      </div>

      <div class="lc-speaker-wrap animate-fadeIn">
        <button class="lc-speaker" id="btn-lc-speak" aria-label="Ascultă din nou">🔊</button>
        <p class="lc-hint">Apasă difuzorul ca să auzi din nou</p>
      </div>

      <div class="lc-options-grid">
        ${optionsHTML}
      </div>
    </div>

    <style>
      .exercise-listen-choice { padding: var(--space-md); }

      .lc-speaker-wrap {
        display: flex; flex-direction: column; align-items: center;
        gap: var(--space-sm); margin-bottom: var(--space-xl);
      }
      .lc-speaker {
        background: var(--color-xp); color: white; border: none;
        width: 96px; height: 96px; border-radius: 50%;
        font-size: 44px; cursor: pointer;
        box-shadow: 0 4px 0 rgba(0,0,0,0.15);
        transition: transform var(--transition-fast);
      }
      .lc-speaker:active { transform: translateY(3px); box-shadow: none; }
      .lc-hint { font-size: var(--font-size-sm); color: var(--text-muted); }

      .lc-options-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);
      }
      .lc-option {
        display: flex; align-items: center; gap: var(--space-md);
        padding: var(--space-lg) var(--space-md); min-height: 72px;
        text-align: left; cursor: pointer;
        transition: all var(--transition-fast);
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        background: var(--bg-card); box-shadow: var(--shadow-button-secondary);
        font-family: var(--font-family);
      }
      .lc-option:active { transform: translateY(3px); box-shadow: none; }
      .lc-option-letter {
        display: flex; align-items: center; justify-content: center;
        width: 36px; height: 36px; border-radius: var(--border-radius-full);
        background: var(--bg-secondary); border: 2px solid var(--border-color);
        font-size: var(--font-size-sm); font-weight: var(--font-weight-bold);
        color: var(--text-secondary); flex-shrink: 0;
      }
      .lc-option-text {
        font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }

      .lc-option.mc-correct {
        border-color: var(--color-success) !important;
        background: var(--color-success-bg) !important; box-shadow: none;
      }
      .lc-option.mc-correct .lc-option-letter {
        background: var(--color-success); border-color: var(--color-success);
        color: var(--text-inverse);
      }
      .lc-option.mc-wrong {
        border-color: var(--color-error) !important;
        background: var(--color-error-bg) !important;
        animation: shake 0.5s; box-shadow: none;
      }
      .lc-option.mc-wrong .lc-option-letter {
        background: var(--color-error); border-color: var(--color-error);
        color: var(--text-inverse);
      }
      .lc-option.mc-disabled { pointer-events: none; opacity: 0.7; }
      .lc-option.mc-disabled.mc-correct, .lc-option.mc-disabled.mc-wrong { opacity: 1; }

      @media (max-width: 400px) {
        .lc-options-grid { grid-template-columns: 1fr; }
      }
    </style>
  `;
}
