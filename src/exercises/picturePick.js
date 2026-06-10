// ============================================
// Picture Pick Exercise — choose the right picture for a word
// ============================================
// Exercise shape:
//   {
//     type: 'picturePick',
//     wordDe: 'Milch',           // German prompt (spoken)
//     correct: 'Milch',          // which option is correct
//     options: ['Milch','Tee','Kaffee']  // each gets an emoji from wordAssets
//   }

import { getEmojiForWord } from '../data/wordAssets.js';

export function renderPicturePick(exercise) {
  const cardsHTML = exercise.options
    .map((opt, i) => {
      const emoji = getEmojiForWord(opt) || '🎴';
      return `
        <button class="pp-card card-interactive animate-fadeInUp"
                data-value="${opt}"
                style="animation-delay:${i * 0.08}s">
          <span class="pp-emoji">${emoji}</span>
          <span class="pp-label">${opt}</span>
          <span class="pp-index">${i + 1}</span>
        </button>
      `;
    })
    .join('');

  return `
    <div class="exercise-picture-pick">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🖼️ Alege imaginea</span>
      </div>

      <div class="pp-prompt animate-fadeIn">
        <button class="pp-speaker" id="btn-pp-speak" aria-label="Ascultă">🔊</button>
        <span class="pp-prompt-text">${exercise.wordDe}</span>
      </div>

      <div class="pp-grid">${cardsHTML}</div>
    </div>

    <style>
      .exercise-picture-pick { padding: var(--space-md); }

      .pp-prompt {
        display: flex; align-items: center; justify-content: center;
        gap: var(--space-md); margin-bottom: var(--space-xl);
      }
      .pp-prompt-text {
        font-size: var(--font-size-2xl); font-weight: var(--font-weight-extrabold);
        color: var(--text-primary);
      }
      .pp-speaker {
        background: var(--color-xp); color: white; border: none;
        width: 48px; height: 48px; border-radius: 50%;
        font-size: 22px; cursor: pointer;
        box-shadow: 0 3px 0 rgba(0,0,0,0.15);
      }
      .pp-speaker:active { transform: translateY(2px); box-shadow: none; }

      .pp-grid {
        display: grid; grid-template-columns: repeat(3, 1fr);
        gap: var(--space-md);
      }
      .pp-card {
        position: relative;
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        padding: var(--space-lg) var(--space-md);
        display: flex; flex-direction: column; align-items: center;
        gap: var(--space-sm); cursor: pointer;
        box-shadow: var(--shadow-button-secondary);
        transition: all var(--transition-fast);
        font-family: var(--font-family);
      }
      .pp-card:active { transform: translateY(3px); box-shadow: none; }
      .pp-emoji { font-size: 56px; line-height: 1; }
      .pp-label {
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }
      .pp-index {
        position: absolute; bottom: 8px; right: 10px;
        font-size: var(--font-size-xs); color: var(--text-muted);
        background: var(--bg-secondary); border-radius: 4px;
        padding: 1px 6px;
      }

      .pp-card.pp-correct {
        border-color: var(--color-success) !important;
        background: var(--color-success-bg) !important;
      }
      .pp-card.pp-wrong {
        border-color: var(--color-error) !important;
        background: var(--color-error-bg) !important;
        animation: shake 0.5s;
      }
      .pp-card.pp-disabled { pointer-events: none; }

      @media (max-width: 480px) {
        .pp-grid { grid-template-columns: repeat(2, 1fr); }
        .pp-emoji { font-size: 44px; }
      }
    </style>
  `;
}
