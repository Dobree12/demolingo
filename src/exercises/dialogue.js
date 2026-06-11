// ============================================
// Dialogue Exercise — conversație animată cu o replică de completat
// ============================================
// Exercise shape:
//   {
//     type: 'dialogue',
//     scene: 'La cafenea',                       // context (RO), opțional
//     characters: [{ name: 'Anna', emoji: '👩' }, { name: 'Max', emoji: '🧑' }],
//     lines: [
//       { who: 0, de: 'Hallo! Wie geht es dir?', ro: 'Bună! Ce mai faci?' },
//       { who: 1, blank: true, answer: 'Mir geht es gut', ro: 'Sunt bine' },
//       { who: 0, de: 'Das freut mich!', ro: 'Mă bucur!' },
//     ],
//     mode: 'wordBank',                          // sau 'multiChoice'
//     bank: ['Mir','geht','es','gut','schlecht'],// pentru wordBank (piese germane)
//     options: ['Mir geht es gut', '...'],       // pentru multiChoice
//   }

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function renderDialogue(exercise) {
  const chars = exercise.characters;

  const linesHTML = exercise.lines.map((line, i) => {
    const char = chars[line.who] || chars[0];
    const side = line.who === 0 ? 'left' : 'right';
    if (line.blank) {
      return `
        <div class="dlg-line dlg-${side} dlg-blank" data-line="${i}">
          <span class="dlg-avatar">${char.emoji}</span>
          <div class="dlg-bubble">
            <span class="dlg-name">${char.name}</span>
            <span class="dlg-bubble-text dlg-dots">…</span>
            <span class="dlg-ro">${line.ro}</span>
          </div>
        </div>
      `;
    }
    return `
      <div class="dlg-line dlg-${side}" data-line="${i}">
        <span class="dlg-avatar">${char.emoji}</span>
        <div class="dlg-bubble">
          <span class="dlg-name">${char.name}</span>
          <span class="dlg-bubble-text">${line.de}</span>
          <span class="dlg-ro">${line.ro}</span>
        </div>
      </div>
    `;
  }).join('');

  let interactHTML = '';
  if (exercise.mode === 'multiChoice') {
    interactHTML = shuffle(exercise.options)
      .map(opt => `
        <button class="dlg-option mc-option card-interactive" data-value="${opt}">${opt}</button>
      `).join('');
    interactHTML = `<div class="dlg-options">${interactHTML}</div>`;
  } else {
    const tiles = shuffle(exercise.bank)
      .map((t, i) => `
        <button class="wb-tile card-interactive" data-token="${t}" data-idx="${i}">${t}</button>
      `).join('');
    interactHTML = `
      <div class="wb-answer-row" id="dlg-answer">
        <div class="wb-placeholder">Formează replica lipsă din cuvinte</div>
      </div>
      <div class="wb-bank" id="dlg-bank">${tiles}</div>
      <div class="exercise-actions">
        <button class="btn btn-secondary" id="btn-dlg-clear">↶ Șterge</button>
        <button class="btn btn-primary" id="btn-dlg-check" disabled>VERIFICĂ</button>
      </div>
    `;
  }

  return `
    <div class="exercise-dialogue">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">💬 Completează conversația</span>
        ${exercise.scene ? `<span class="dlg-scene">📍 ${exercise.scene}</span>` : ''}
      </div>

      <div class="dlg-chat">${linesHTML}</div>

      <div class="dlg-interact" id="dlg-interact">${interactHTML}</div>
    </div>

    <style>
      .exercise-dialogue { padding: var(--space-md); }
      .dlg-scene {
        display: inline-block; margin-left: var(--space-sm);
        font-size: var(--font-size-xs); color: var(--text-secondary);
        background: var(--bg-secondary); border-radius: 999px;
        padding: 4px 12px; font-weight: var(--font-weight-bold);
      }

      .dlg-chat {
        display: flex; flex-direction: column; gap: var(--space-md);
        margin: var(--space-lg) 0;
      }
      .dlg-line {
        display: flex; align-items: flex-end; gap: var(--space-sm);
        opacity: 0; transform: translateY(12px) scale(0.96);
        transition: opacity 0.4s ease, transform 0.4s ease;
      }
      .dlg-line.dlg-shown { opacity: 1; transform: none; }
      .dlg-right { flex-direction: row-reverse; }

      .dlg-avatar {
        font-size: 36px; line-height: 1; flex-shrink: 0;
      }
      .dlg-bubble {
        display: flex; flex-direction: column; gap: 2px;
        max-width: 78%;
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: 18px; padding: var(--space-sm) var(--space-md);
        box-shadow: var(--shadow-sm);
      }
      .dlg-left .dlg-bubble { border-bottom-left-radius: 4px; }
      .dlg-right .dlg-bubble {
        border-bottom-right-radius: 4px;
        background: var(--color-success-bg);
      }
      .dlg-name {
        font-size: var(--font-size-xs); font-weight: var(--font-weight-bold);
        color: var(--text-muted);
      }
      .dlg-bubble-text {
        font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }
      .dlg-ro {
        font-size: var(--font-size-xs); color: var(--text-secondary); font-style: italic;
      }
      .dlg-blank .dlg-bubble { border-style: dashed; border-color: var(--color-xp); }
      .dlg-dots {
        animation: dlgPulse 1.2s ease-in-out infinite;
        letter-spacing: 3px;
      }
      .dlg-filled .dlg-bubble {
        border-style: solid; border-color: var(--color-success);
        background: var(--color-success-bg);
        animation: dlgPop 0.4s ease;
      }
      @keyframes dlgPulse {
        0%, 100% { opacity: 0.35; }
        50% { opacity: 1; }
      }
      @keyframes dlgPop {
        0% { transform: scale(0.92); }
        60% { transform: scale(1.04); }
        100% { transform: scale(1); }
      }

      .dlg-interact {
        opacity: 0; transition: opacity 0.4s ease;
        pointer-events: none;
      }
      .dlg-interact.dlg-shown { opacity: 1; pointer-events: auto; }

      .dlg-options { display: flex; flex-direction: column; gap: var(--space-sm); }
      .dlg-option {
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg); padding: var(--space-md);
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer; text-align: center;
        box-shadow: 0 3px 0 var(--border-color);
        font-family: var(--font-family);
        transition: transform 0.1s;
      }
      .dlg-option:active { transform: translateY(2px); box-shadow: none; }
      .dlg-option.mc-correct { border-color: var(--color-success); background: var(--color-success-bg); }
      .dlg-option.mc-wrong { border-color: var(--color-error); background: var(--color-error-bg); animation: shake 0.5s; }
      .dlg-option.mc-disabled { pointer-events: none; }

      /* piese word-bank (stil propriu — wordBank.js își injectează stilurile doar
         când e randat el) */
      .exercise-dialogue .wb-answer-row {
        min-height: 60px; padding: var(--space-md);
        border-bottom: 2px solid var(--border-color);
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        align-items: center; margin-bottom: var(--space-md);
      }
      .exercise-dialogue .wb-placeholder {
        color: var(--text-muted); font-style: italic; font-size: var(--font-size-sm);
      }
      .exercise-dialogue .wb-bank {
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        justify-content: center; margin-bottom: var(--space-lg);
      }
      .exercise-dialogue .wb-tile {
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-md); padding: 12px 18px;
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer;
        box-shadow: 0 3px 0 var(--border-color);
        transition: transform 0.1s, opacity 0.2s;
        font-family: var(--font-family);
      }
      .exercise-dialogue .wb-tile:active { transform: translateY(2px); box-shadow: none; }
      .exercise-dialogue .wb-tile.wb-used { opacity: 0; pointer-events: none; }
      .exercise-dialogue .wb-chip {
        background: var(--color-xp-bg, #e0f2fe); border: 2px solid var(--color-xp);
        border-radius: var(--border-radius-md); padding: 10px 16px;
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer; font-family: var(--font-family);
      }
      .exercise-dialogue .exercise-actions {
        display: flex; gap: var(--space-md); justify-content: space-between;
      }
      .exercise-dialogue .exercise-actions .btn { flex: 1; }
      .exercise-dialogue .exercise-actions .btn[disabled] { opacity: 0.5; pointer-events: none; }
    </style>
  `;
}
