// ============================================
// True / False Exercise — „der Hund = pisică?" → ✅ / ❌
// ============================================
// Recunoaștere rapidă: se afișează un cuvânt german și o traducere propusă
// (uneori corectă, alteori nu); utilizatorul decide dacă potrivirea e corectă.
// Exercise shape:
//   {
//     type: 'trueFalse',
//     de: 'der Hund',      // cuvânt german (afișat + redat TTS)
//     ro: 'pisică',        // traducerea propusă (poate fi greșită)
//     correct: 'câine',    // traducerea reală (pentru feedback)
//     isTrue: false         // potrivirea propusă este corectă?
//   }

export function renderTrueFalse(exercise) {
  return `
    <div class="exercise-true-false">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🤔 Adevărat sau fals?</span>
      </div>

      <div class="tf-card animate-fadeIn">
        <div class="tf-de">
          <button class="tf-speaker" id="btn-tf-speak" aria-label="Ascultă">🔊</button>
          <span class="tf-de-text">${exercise.de}</span>
        </div>
        <span class="tf-equals">=</span>
        <span class="tf-ro-text">${exercise.ro}</span>
      </div>

      <div class="tf-buttons">
        <button class="tf-btn tf-true card-interactive animate-fadeInUp" data-value="true">
          <span class="tf-btn-icon">✅</span>
          <span class="tf-btn-label">Adevărat</span>
        </button>
        <button class="tf-btn tf-false card-interactive animate-fadeInUp" data-value="false" style="animation-delay: 0.08s;">
          <span class="tf-btn-icon">❌</span>
          <span class="tf-btn-label">Fals</span>
        </button>
      </div>
    </div>

    <style>
      .exercise-true-false { padding: var(--space-md); }

      .tf-card {
        display: flex; flex-direction: column; align-items: center;
        gap: var(--space-sm);
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        padding: var(--space-xl) var(--space-lg);
        margin-bottom: var(--space-xl);
      }
      .tf-de { display: flex; align-items: center; gap: var(--space-md); }
      .tf-de-text {
        font-size: var(--font-size-2xl); font-weight: var(--font-weight-extrabold);
        color: var(--text-primary);
      }
      .tf-speaker {
        background: var(--color-xp); color: white; border: none;
        width: 44px; height: 44px; border-radius: 50%;
        font-size: 20px; cursor: pointer; flex-shrink: 0;
        box-shadow: 0 3px 0 rgba(0,0,0,0.15);
      }
      .tf-speaker:active { transform: translateY(2px); box-shadow: none; }
      .tf-equals { font-size: var(--font-size-xl); color: var(--text-muted); }
      .tf-ro-text {
        font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);
        color: var(--color-secondary);
      }

      .tf-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }
      .tf-btn {
        display: flex; flex-direction: column; align-items: center; gap: var(--space-xs);
        padding: var(--space-lg); min-height: 96px; cursor: pointer;
        border: 2px solid var(--border-color); border-radius: var(--border-radius-lg);
        background: var(--bg-card); box-shadow: var(--shadow-button-secondary);
        font-family: var(--font-family); transition: all var(--transition-fast);
      }
      .tf-btn:active { transform: translateY(3px); box-shadow: none; }
      .tf-btn-icon { font-size: 40px; line-height: 1; }
      .tf-btn-label {
        font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }

      .tf-btn.mc-correct {
        border-color: var(--color-success) !important;
        background: var(--color-success-bg) !important; box-shadow: none;
      }
      .tf-btn.mc-wrong {
        border-color: var(--color-error) !important;
        background: var(--color-error-bg) !important;
        animation: shake 0.5s; box-shadow: none;
      }
      .tf-btn.mc-disabled { pointer-events: none; opacity: 0.7; }
      .tf-btn.mc-disabled.mc-correct, .tf-btn.mc-disabled.mc-wrong { opacity: 1; }
    </style>
  `;
}
