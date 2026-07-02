// ============================================
// Sort into Categories Exercise — pune fiecare cuvânt în coșul potrivit
// ============================================
// Se afișează un set de cuvinte germane și 2 coșuri (categorii). Utilizatorul
// atinge un cuvânt, apoi coșul unde crede că se potrivește. Cuvântul plasat
// corect rămâne în coș (verde); plasarea greșită scutură coșul și numără ca o
// greșeală. Când toate cuvintele sunt plasate corect, exercițiul e rezolvat.
// Exercise shape:
//   {
//     type: 'sortCategories',
//     categories: [ { id:'animale', label:'🐾 Animale' }, { id:'mancare', label:'🍎 Mâncare' } ],
//     items: [ { de:'der Hund', cat:'animale' }, { de:'das Brot', cat:'mancare' }, ... ]
//   }

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function renderSortCategories(exercise) {
  const items = shuffle(exercise.items);
  const chipsHTML = items
    .map((it, i) => `
      <button class="sc-item card-interactive animate-fadeInUp"
              data-de="${it.de}" data-cat="${it.cat}" style="animation-delay:${i * 0.05}s">
        ${it.de}
      </button>
    `)
    .join('');

  const bucketsHTML = exercise.categories
    .map(cat => `
      <div class="sc-bucket" data-cat="${cat.id}">
        <div class="sc-bucket-label">${cat.label}</div>
        <div class="sc-bucket-drop" data-cat="${cat.id}"></div>
      </div>
    `)
    .join('');

  return `
    <div class="exercise-sort-categories">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🗂️ Sortează pe categorii</span>
      </div>

      <p class="sc-instruction animate-fadeIn">Atinge un cuvânt, apoi coșul potrivit</p>

      <div class="sc-pool" id="sc-pool">${chipsHTML}</div>

      <div class="sc-buckets">${bucketsHTML}</div>
    </div>

    <style>
      .exercise-sort-categories { padding: var(--space-md); }
      .sc-instruction {
        text-align: center; color: var(--text-secondary);
        font-size: var(--font-size-md); margin-bottom: var(--space-lg);
      }

      .sc-pool {
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        justify-content: center; min-height: 56px; margin-bottom: var(--space-xl);
      }
      .sc-item {
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-md); padding: 12px 18px;
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer;
        box-shadow: 0 3px 0 var(--border-color);
        transition: transform 0.1s, opacity 0.2s;
        font-family: var(--font-family);
      }
      .sc-item:active { transform: translateY(2px); box-shadow: none; }
      .sc-item.sc-selected {
        border-color: var(--color-xp); background: var(--color-xp-bg, #e0f2fe);
        transform: translateY(-2px);
      }
      .sc-item.sc-placed { opacity: 0; pointer-events: none; }

      .sc-buckets {
        display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);
      }
      .sc-bucket {
        display: flex; flex-direction: column; gap: var(--space-sm);
        background: var(--bg-secondary); border: 2px dashed var(--border-color);
        border-radius: var(--border-radius-lg); padding: var(--space-md);
        min-height: 140px; cursor: pointer;
        transition: all var(--transition-fast);
      }
      .sc-bucket.sc-bucket-active {
        border-color: var(--color-xp); border-style: solid;
        background: var(--color-xp-bg, #e0f2fe);
      }
      .sc-bucket.sc-bucket-wrong { animation: shake 0.5s; border-color: var(--color-error); }
      .sc-bucket-label {
        text-align: center; font-size: var(--font-size-md);
        font-weight: var(--font-weight-bold); color: var(--text-primary);
      }
      .sc-bucket-drop {
        display: flex; flex-wrap: wrap; gap: var(--space-xs);
        align-content: flex-start; flex: 1;
      }
      .sc-chip {
        background: var(--color-success-bg); border: 2px solid var(--color-success);
        border-radius: var(--border-radius-md); padding: 6px 12px;
        font-size: var(--font-size-sm); font-weight: var(--font-weight-bold);
        color: var(--text-primary); font-family: var(--font-family);
        animation: fadeInUp 0.3s;
      }
    </style>
  `;
}
