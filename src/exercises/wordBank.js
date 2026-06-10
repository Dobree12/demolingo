// ============================================
// Word Bank Exercise — tap tiles to build a translation
// ============================================
// Exercise shape:
//   {
//     type: 'wordBank',
//     promptDe: 'Tea or coffee?',          // shown + spoken
//     answer: 'Ceai sau cafea',            // ordered correct tokens (case-insensitive match)
//     bank: ['Ceai','sau','cafea','bun','apă'],  // tokens to choose from (includes distractors)
//   }

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function renderWordBank(exercise) {
  const tokens = shuffle(exercise.bank);
  const tilesHTML = tokens
    .map((t, i) => `
      <button class="wb-tile card-interactive animate-fadeInUp" data-token="${t}" data-idx="${i}" style="animation-delay:${i * 0.04}s">
        ${t}
      </button>
    `)
    .join('');

  return `
    <div class="exercise-word-bank">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">📝 Scrie asta în română</span>
      </div>

      <div class="wb-prompt animate-fadeIn">
        <button class="wb-speaker" id="btn-wb-speak" aria-label="Ascultă">🔊</button>
        <span class="wb-prompt-text">${exercise.promptDe}</span>
      </div>

      <div class="wb-answer-row" id="wb-answer">
        <div class="wb-placeholder">Apasă cuvintele pentru a forma răspunsul</div>
      </div>

      <div class="wb-bank" id="wb-bank">${tilesHTML}</div>

      <div class="exercise-actions">
        <button class="btn btn-secondary" id="btn-wb-clear">↶ Șterge</button>
        <button class="btn btn-primary" id="btn-wb-check" disabled>VERIFICĂ</button>
      </div>
    </div>

    <style>
      .exercise-word-bank { padding: var(--space-md); }
      .wb-prompt {
        display: flex; align-items: center; gap: var(--space-md);
        padding: var(--space-md) var(--space-lg);
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg); margin-bottom: var(--space-lg);
      }
      .wb-prompt-text {
        font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }
      .wb-speaker {
        background: var(--color-xp); color: white; border: none;
        width: 44px; height: 44px; border-radius: 50%;
        font-size: 20px; cursor: pointer; flex-shrink: 0;
        box-shadow: 0 3px 0 rgba(0,0,0,0.15);
      }
      .wb-speaker:active { transform: translateY(2px); box-shadow: none; }

      .wb-answer-row {
        min-height: 70px; padding: var(--space-md);
        border-bottom: 2px solid var(--border-color);
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        align-items: center; margin-bottom: var(--space-lg);
      }
      .wb-placeholder {
        color: var(--text-muted); font-style: italic; font-size: var(--font-size-sm);
      }

      .wb-bank {
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        justify-content: center; margin-bottom: var(--space-xl);
      }
      .wb-tile {
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-md); padding: 12px 18px;
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer;
        box-shadow: 0 3px 0 var(--border-color);
        transition: transform 0.1s, opacity 0.2s;
        font-family: var(--font-family);
      }
      .wb-tile:active { transform: translateY(2px); box-shadow: none; }
      .wb-tile.wb-used { opacity: 0; pointer-events: none; }

      .wb-chip {
        background: var(--color-xp-bg, #e0f2fe); border: 2px solid var(--color-xp);
        border-radius: var(--border-radius-md); padding: 10px 16px;
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer; font-family: var(--font-family);
      }

      .exercise-actions {
        display: flex; gap: var(--space-md); justify-content: space-between;
      }
      .exercise-actions .btn { flex: 1; }
      .exercise-actions .btn[disabled] { opacity: 0.5; pointer-events: none; }
    </style>
  `;
}
