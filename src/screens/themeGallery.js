// ============================================
// Theme Gallery — grilă de carduri emoji-cuvânt (stil beverage.png)
// ============================================
// Mod explorare: atingi un card → auzi cuvântul german și vezi traducerea.
// Buton de quiz: generează picturePick-uri pe loc și intră în motorul de lecție.

import { getSectionById } from '../data/sections.js';
import { getEmojiForWord } from '../data/wordAssets.js';
import { speak } from '../engine/audio.js';

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getTheme(params) {
  const section = getSectionById(params.sectionId);
  return section?.themes?.find(t => t.id === params.themeId) || null;
}

export function renderThemeGallery(navigate, params) {
  const theme = getTheme(params);
  if (!theme) {
    navigate('home');
    return '<p>Tema nu a fost găsită.</p>';
  }

  const cardsHTML = theme.words.map((word, idx) => {
    const emoji = getEmojiForWord(word.de) || '🎴';
    return `
      <button class="tg-card card-interactive animate-fadeInUp"
              data-de="${word.de}" data-idx="${idx}"
              style="animation-delay: ${0.05 + idx * 0.06}s">
        <span class="tg-emoji">${emoji}</span>
        <span class="tg-de">${word.de}</span>
        <span class="tg-ro">${word.ro}</span>
        <span class="tg-speaker">🔊</span>
      </button>
    `;
  }).join('');

  return `
    <div class="tg-screen">
      <button class="screen-back-btn" id="btn-back-gallery">← Înapoi</button>
      <h1 class="screen-title">${theme.icon} ${theme.title}</h1>
      <p class="screen-subtitle">Atinge un card ca să auzi cuvântul în germană</p>

      <div class="tg-grid">${cardsHTML}</div>

      <button class="btn btn-primary btn-full btn-lg animate-fadeInUp" id="btn-theme-quiz"
              style="margin-top: var(--space-xl); animation-delay: 0.5s;">
        🎯 Începe quiz
      </button>
      <div style="height: 32px;"></div>
    </div>

    <style>
      .tg-screen { max-width: 600px; margin: 0 auto; padding: var(--space-lg); min-height: 100vh; }
      .tg-grid {
        display: grid; grid-template-columns: repeat(3, 1fr);
        gap: var(--space-md); margin-top: var(--space-lg);
      }
      .tg-card {
        position: relative;
        display: flex; flex-direction: column; align-items: center;
        gap: 4px; padding: var(--space-lg) var(--space-sm);
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-button-secondary);
        cursor: pointer; font-family: var(--font-family);
        transition: all var(--transition-fast);
      }
      .tg-card:active { transform: translateY(3px); box-shadow: none; }
      .tg-card.tg-playing { border-color: var(--color-xp); background: rgba(28, 176, 246, 0.08); }
      .tg-emoji { font-size: 48px; line-height: 1; }
      .tg-de {
        font-size: var(--font-size-md); font-weight: var(--font-weight-extrabold);
        color: var(--text-primary);
      }
      .tg-ro { font-size: var(--font-size-xs); color: var(--text-secondary); font-style: italic; }
      .tg-speaker {
        position: absolute; top: 6px; right: 8px;
        font-size: 14px; opacity: 0.5;
      }

      @media (max-width: 480px) {
        .tg-grid { grid-template-columns: repeat(2, 1fr); }
        .tg-emoji { font-size: 42px; }
      }
    </style>
  `;
}

export function attachThemeGalleryEvents(navigate, params) {
  const theme = getTheme(params);
  if (!theme) return;

  document.getElementById('btn-back-gallery')?.addEventListener('click', () => {
    navigate('section', { sectionId: params.sectionId });
  });

  // Explorare: atinge → ascultă
  document.querySelectorAll('.tg-card').forEach(card => {
    card.addEventListener('click', async () => {
      document.querySelectorAll('.tg-card').forEach(c => c.classList.remove('tg-playing'));
      card.classList.add('tg-playing');
      await speak(card.dataset.de);
      card.classList.remove('tg-playing');
    });
  });

  // Quiz generat: fiecare cuvânt vs 2 distractori din aceeași temă
  document.getElementById('btn-theme-quiz')?.addEventListener('click', () => {
    const words = theme.words;
    const exercises = shuffle(words).map(word => {
      const distractors = shuffle(words.filter(w => w.de !== word.de)).slice(0, 2).map(w => w.de);
      return {
        type: 'picturePick',
        wordDe: word.de,
        correct: word.de,
        options: shuffle([word.de, ...distractors]),
      };
    });
    navigate('lesson', {
      exercises,
      title: theme.title,
      icon: theme.icon,
      unitId: `theme:${theme.id}`,
      sectionId: params.sectionId,
      themeId: theme.id,
    });
  });
}
