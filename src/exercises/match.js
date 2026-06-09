// ============================================
// Match Pairs Exercise Renderer
// ============================================

/**
 * Shuffles an array using Fisher-Yates algorithm.
 * @param {any[]} arr
 * @returns {any[]}
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Renders a match-the-pairs exercise.
 * @param {{ pairs: [string, string][] }} exercise
 * @returns {string} HTML string
 */
export function renderMatch(exercise) {
  // Build indexed items then shuffle each column independently
  const leftItems = exercise.pairs.map((pair, i) => ({
    value: pair[0],
    index: i,
  }));
  const rightItems = exercise.pairs.map((pair, i) => ({
    value: pair[1],
    index: i,
  }));

  const shuffledLeft = shuffle(leftItems);
  const shuffledRight = shuffle(rightItems);

  const leftHTML = shuffledLeft
    .map(
      (item, i) => `
      <button class="match-item card card-interactive animate-fadeInUp"
              data-side="left"
              data-value="${item.value}"
              data-index="${item.index}"
              style="animation-delay: ${i * 0.07}s;">
        <span class="match-flag">🇩🇪</span>
        <span class="match-text">${item.value}</span>
      </button>
    `
    )
    .join('');

  const rightHTML = shuffledRight
    .map(
      (item, i) => `
      <button class="match-item card card-interactive animate-fadeInUp"
              data-side="right"
              data-value="${item.value}"
              data-index="${item.index}"
              style="animation-delay: ${i * 0.07 + 0.1}s;">
        <span class="match-flag">🇷🇴</span>
        <span class="match-text">${item.value}</span>
      </button>
    `
    )
    .join('');

  return `
    <div class="exercise-match">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🔗 Potrivește perechile</span>
      </div>

      <div class="match-columns">
        <div class="match-column match-column-left">
          <div class="match-column-header">🇩🇪 Germană</div>
          ${leftHTML}
        </div>
        <div class="match-column match-column-right">
          <div class="match-column-header">🇷🇴 Română</div>
          ${rightHTML}
        </div>
      </div>
    </div>

    <style>
      .exercise-match {
        padding: var(--space-md);
      }

      .exercise-header {
        text-align: center;
        margin-bottom: var(--space-lg);
      }

      .match-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-md);
      }

      .match-column {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
      }

      .match-column-header {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        text-align: center;
        padding-bottom: var(--space-xs);
        border-bottom: 2px solid var(--border-color);
        margin-bottom: var(--space-xs);
      }

      .match-item {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        padding: var(--space-md);
        border-radius: var(--border-radius-md);
        font-family: var(--font-family);
        cursor: pointer;
        transition: all var(--transition-fast);
        min-height: 52px;
      }

      .match-flag {
        font-size: 1rem;
        flex-shrink: 0;
      }

      .match-text {
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }

      /* Selected state */
      .match-item.match-selected {
        border-color: var(--color-xp) !important;
        background: rgba(28, 176, 246, 0.1) !important;
        box-shadow: 0 0 0 3px rgba(28, 176, 246, 0.2);
        transform: scale(1.03);
      }

      /* Matched / done */
      .match-item.match-done {
        border-color: var(--color-success) !important;
        background: var(--color-success-bg) !important;
        opacity: 0.7;
        pointer-events: none;
        box-shadow: none;
      }

      .match-item.match-correct-anim {
        animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      .match-item.match-wrong-anim {
        animation: shake 0.5s;
        border-color: var(--color-error) !important;
        background: var(--color-error-bg) !important;
      }

      @media (max-width: 400px) {
        .match-item {
          padding: var(--space-sm);
          min-height: 44px;
        }

        .match-text {
          font-size: var(--font-size-sm);
        }
      }
    </style>
  `;
}
