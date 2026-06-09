// ============================================
// Cognates Screen — Romanian-German similar words explorer
// ============================================

import { cognates, getCognateCategories } from '../data/cognates.js';
import { speak } from '../engine/audio.js';
import { renderMascot } from '../components/mascot.js';

// Category emoji map
const CATEGORY_ICONS = {
  'sănătate': '🏥',
  'general': '📋',
  'obiecte': '🔧',
  'transport': '🚂',
  'mâncare': '🍽️',
  'cultură': '🎭',
  'activități': '⚽',
  'călătorii': '✈️',
  'locuri': '📍',
  'oameni': '👥',
  'educație': '📚',
  'natură': '🌿',
};

export function renderCognates(navigate) {
  const categories = getCognateCategories();
  const categoryNames = Object.keys(categories);

  const categoriesHTML = categoryNames.map((catName, catIdx) => {
    const words = categories[catName];
    const icon = CATEGORY_ICONS[catName] || '📂';
    const delay = 0.2 + catIdx * 0.1;

    const wordsHTML = words.map(word => `
      <div class="cognate-row" style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-sm) var(--space-md);
        border-bottom: 1px solid var(--border-color);
        transition: background var(--transition-fast);
      ">
        <div style="display: flex; align-items: center; gap: var(--space-sm); flex: 1; min-width: 0;">
          <span style="
            font-weight: var(--font-weight-semibold);
            color: var(--text-primary);
            font-size: var(--font-size-md);
          ">${word.ro}</span>
          <span style="color: var(--text-muted); font-size: var(--font-size-sm);">→</span>
          <span style="
            font-weight: var(--font-weight-bold);
            color: var(--color-xp-dark);
            font-size: var(--font-size-md);
          ">${word.de}</span>
        </div>
        <button class="cognate-speak-btn" data-word="${word.de}" style="
          background: rgba(28, 176, 246, 0.1);
          border: none;
          border-radius: var(--border-radius-full);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all var(--transition-fast);
          flex-shrink: 0;
        " title="Ascultă pronunția">
          🔊
        </button>
      </div>
    `).join('');

    return `
      <div class="card animate-fadeInUp" style="animation-delay: ${delay}s; padding: 0; overflow: hidden; margin-bottom: var(--space-md);">
        <div style="
          padding: var(--space-md) var(--space-lg);
          background: var(--bg-secondary);
          border-bottom: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        ">
          <span style="font-size: 1.3rem;">${icon}</span>
          <h3 style="
            font-size: var(--font-size-md);
            font-weight: var(--font-weight-bold);
            color: var(--text-primary);
            text-transform: capitalize;
          ">${catName}</h3>
          <span class="badge badge-xp" style="margin-left: auto;">${words.length} cuvinte</span>
        </div>
        <div>
          ${wordsHTML}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: var(--space-lg);
    ">
      <!-- Header -->
      <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg);">
        <button class="btn btn-secondary btn-sm" id="btn-back-cognates" style="padding: 8px 12px;">
          ← Înapoi
        </button>
      </div>

      <!-- Title -->
      <div class="animate-fadeInDown" style="text-align: center; margin-bottom: var(--space-lg);">
        <h1 style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-extrabold); color: var(--text-primary); margin-bottom: var(--space-xs);">
          🇷🇴↔🇩🇪 Cuvinte Similare
        </h1>
        <p style="font-size: var(--font-size-md); color: var(--text-secondary); max-width: 400px; margin: 0 auto; line-height: 1.6;">
          Româna și germana au surprinzător de multe cuvinte care se aseamănă! Descoperă-le și vei vedea că germana e mai ușoară decât crezi! 🤩
        </p>
      </div>

      <!-- Mascot -->
      <div class="animate-scaleIn" style="display: flex; justify-content: center; margin-bottom: var(--space-xl);">
        ${renderMascot('thinking', 'lg', 'Știai că româna și germana au multe cuvinte similare?')}
      </div>

      <!-- Stats -->
      <div class="animate-fadeInUp" style="
        display: flex;
        justify-content: center;
        gap: var(--space-lg);
        margin-bottom: var(--space-xl);
        animation-delay: 0.1s;
      ">
        <div style="text-align: center;">
          <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-extrabold); color: var(--color-primary);">
            ${cognates.length}
          </div>
          <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">Cuvinte similare</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-extrabold); color: var(--color-secondary);">
            ${categoryNames.length}
          </div>
          <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">Categorii</div>
        </div>
      </div>

      <!-- Categories -->
      ${categoriesHTML}

      <!-- Bottom Spacing -->
      <div style="height: var(--space-xl);"></div>
    </div>
  `;
}

export function attachCognatesEvents(navigate) {
  // Back button
  document.getElementById('btn-back-cognates')?.addEventListener('click', () => {
    navigate('home');
  });

  // Speak buttons
  document.querySelectorAll('.cognate-speak-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const word = btn.dataset.word;
      if (word) {
        // Visual feedback
        btn.style.transform = 'scale(1.2)';
        btn.style.background = 'rgba(28, 176, 246, 0.25)';
        setTimeout(() => {
          btn.style.transform = 'scale(1)';
          btn.style.background = 'rgba(28, 176, 246, 0.1)';
        }, 300);
        speak(word);
      }
    });
  });
}
