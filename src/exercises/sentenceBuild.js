// ============================================
// Sentence Build Exercise — „Scrie asta" (construiește propoziția în germană)
// ============================================
// Se arată o propoziție mai lungă în română; utilizatorul construiește
// varianta germană atingând cuvinte-piese (fără tastatură germană). Difuzorul
// redă propoziția germană țintă (ajutor la cerere). Comparația iartă
// punctuația (vezi normalizeAnswer), deci `answer` poate avea virgule/puncte,
// iar piesele din `bank` sunt cuvinte simple.
// Exercise shape:
//   {
//     type: 'sentenceBuild',
//     promptRo: 'Bună, mă numesc Paula și am 49 de ani.',   // afișat (română)
//     answer: 'Hallo, ich heisse Paula und ich bin 49 Jahre alt.',  // țintă germană
//     bank: ['Hallo','ich','heisse','Paula','und','bin','49','Jahre','alt', ...]
//   }

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function renderSentenceBuild(exercise) {
  const tokens = shuffle(exercise.bank);
  const tilesHTML = tokens
    .map((t, i) => `
      <button class="sb-tile card-interactive animate-fadeInUp" data-token="${t}" style="animation-delay:${i * 0.04}s">
        ${t}
      </button>
    `)
    .join('');

  return `
    <div class="exercise-sentence-build">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">✍️ Scrie asta în germană</span>
      </div>

      <div class="sb-prompt animate-fadeIn">
        <button class="sb-speaker" id="btn-sb-speak" aria-label="Ascultă în germană">🔊</button>
        <span class="sb-prompt-text">${exercise.promptRo}</span>
      </div>

      <div class="sb-answer-row" id="sb-answer">
        <div class="sb-placeholder">Apasă cuvintele pentru a forma propoziția</div>
      </div>

      <div class="sb-bank" id="sb-bank">${tilesHTML}</div>

      <div class="exercise-actions">
        <button class="btn btn-secondary" id="btn-sb-clear">↶ Șterge</button>
        <button class="btn btn-primary" id="btn-sb-check" disabled>VERIFICĂ</button>
      </div>
    </div>

    <style>
      .exercise-sentence-build { padding: var(--space-md); }
      .sb-prompt {
        display: flex; align-items: center; gap: var(--space-md);
        padding: var(--space-md) var(--space-lg);
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg); margin-bottom: var(--space-lg);
      }
      .sb-prompt-text {
        font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);
        color: var(--text-primary); line-height: 1.35;
      }
      .sb-speaker {
        background: var(--color-xp); color: white; border: none;
        width: 44px; height: 44px; border-radius: 50%;
        font-size: 20px; cursor: pointer; flex-shrink: 0;
        box-shadow: 0 3px 0 rgba(0,0,0,0.15);
      }
      .sb-speaker:active { transform: translateY(2px); box-shadow: none; }

      .sb-answer-row {
        min-height: 70px; padding: var(--space-md);
        border-bottom: 2px solid var(--border-color);
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        align-items: center; margin-bottom: var(--space-lg);
      }
      .sb-placeholder {
        color: var(--text-muted); font-style: italic; font-size: var(--font-size-sm);
      }

      .sb-bank {
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        justify-content: center; margin-bottom: var(--space-xl);
      }
      .sb-tile {
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-md); padding: 12px 18px;
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer;
        box-shadow: 0 3px 0 var(--border-color);
        transition: transform 0.1s, opacity 0.2s; font-family: var(--font-family);
      }
      .sb-tile:active { transform: translateY(2px); box-shadow: none; }
      .sb-tile.sb-used { opacity: 0; pointer-events: none; }

      .sb-chip {
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
