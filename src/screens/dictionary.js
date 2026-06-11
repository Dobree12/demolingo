// ============================================
// Dictionary Screen — căutare RO ↔ DE în dicționarul curat
// ============================================

import { dictionary, searchDictionary } from '../data/dictionary.js';
import { getEmojiForWord } from '../data/wordAssets.js';
import { speak } from '../engine/audio.js';

const SHOWN_CATEGORIES = {
  salutari: '👋 Salutări',
  expresii: '💬 Expresii',
  familie: '👨‍👩‍👧 Familie',
  mancare: '🍽️ Mâncare',
  bauturi: '🥤 Băuturi',
  culori: '🎨 Culori',
  animale: '🐾 Animale',
  natura: '🌳 Natură',
  transport: '🚗 Transport',
  numere: '🔢 Numere',
};

function entryRowHTML(entry) {
  const emoji = getEmojiForWord(entry.de) || '';
  const deDisplay = entry.article ? `${entry.article} ${entry.de}` : entry.de;
  return `
    <div class="dict-row card animate-fadeIn">
      <span class="dict-emoji">${emoji}</span>
      <div class="dict-words">
        <span class="dict-de">${deDisplay}</span>
        <span class="dict-ro">${entry.ro}</span>
      </div>
      <button class="dict-speak" data-word="${entry.de}" aria-label="Ascultă">🔊</button>
    </div>
  `;
}

export function renderDictionary(navigate) {
  return `
    <div class="dict-screen">
      <button class="screen-back-btn" id="btn-back-dict">← Înapoi</button>
      <h1 class="screen-title">📖 Dicționar</h1>
      <p class="screen-subtitle">${dictionary.length} cuvinte verificate · caută în română sau germană</p>

      <input type="text" id="dict-search" class="exercise-input" placeholder="🔍 Caută un cuvânt..."
             autocomplete="off" style="width: 100%; margin: var(--space-md) 0;">

      <div id="dict-results"></div>
      <div style="height: 32px;"></div>
    </div>

    <style>
      .dict-screen { max-width: 600px; margin: 0 auto; padding: var(--space-lg); min-height: 100vh; }
      .dict-category-title {
        font-size: var(--font-size-md); font-weight: var(--font-weight-extrabold);
        color: var(--text-primary); margin: var(--space-lg) 0 var(--space-sm);
      }
      .dict-row {
        display: flex; align-items: center; gap: var(--space-md);
        padding: var(--space-sm) var(--space-md); margin-bottom: var(--space-sm);
      }
      .dict-emoji { font-size: 26px; width: 32px; text-align: center; flex-shrink: 0; }
      .dict-words { flex: 1; display: flex; flex-direction: column; min-width: 0; }
      .dict-de { font-size: var(--font-size-md); font-weight: var(--font-weight-bold); color: var(--text-primary); }
      .dict-ro { font-size: var(--font-size-sm); color: var(--text-secondary); }
      .dict-speak {
        background: none; border: none; font-size: 20px; cursor: pointer;
        padding: var(--space-xs); flex-shrink: 0;
      }
      .dict-empty {
        text-align: center; color: var(--text-secondary);
        padding: var(--space-xl) 0; font-style: italic;
      }
    </style>
  `;
}

function renderResults(query) {
  const container = document.getElementById('dict-results');
  if (!container) return;

  if (query && query.trim()) {
    const results = searchDictionary(query);
    container.innerHTML = results.length
      ? results.map(entryRowHTML).join('')
      : '<p class="dict-empty">Niciun rezultat. Încearcă alt cuvânt 🙂</p>';
  } else {
    // Fără căutare: arată dicționarul grupat pe categorii prietenoase
    container.innerHTML = Object.entries(SHOWN_CATEGORIES).map(([cat, label]) => {
      const entries = dictionary.filter(e => e.category === cat);
      if (!entries.length) return '';
      return `
        <h2 class="dict-category-title">${label}</h2>
        ${entries.map(entryRowHTML).join('')}
      `;
    }).join('');
  }

  container.querySelectorAll('.dict-speak').forEach(btn => {
    btn.addEventListener('click', () => speak(btn.dataset.word));
  });
}

export function attachDictionaryEvents(navigate) {
  document.getElementById('btn-back-dict')?.addEventListener('click', () => navigate('home'));

  const input = document.getElementById('dict-search');
  let debounce = null;
  input?.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => renderResults(input.value), 200);
  });

  renderResults('');
}
