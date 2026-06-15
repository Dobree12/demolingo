// ============================================
// Section Screen — lista unităților dintr-o secțiune
// ============================================
// Pentru kind 'units' afișează unitățile cu deblocare secvențială
// (refolosește stilul .lesson-node); pentru kind 'themes' afișează
// cardurile tematice care duc la galeria de imagini.

import { getSectionById } from '../data/sections.js';
import { loadState } from '../engine/storage.js';
import { isLessonCompleted } from '../engine/progress.js';

export function renderSection(navigate, params) {
  const section = getSectionById(params.sectionId);
  if (!section) {
    navigate('home');
    return '<p>Secțiunea nu a fost găsită.</p>';
  }

  let listHTML = '';

  if (section.kind === 'themes') {
    listHTML = `
      <div class="theme-grid">
        ${section.themes.map((theme, idx) => `
          <button class="theme-card card-interactive animate-fadeInUp"
                  data-theme-id="${theme.id}"
                  style="animation-delay: ${0.1 + idx * 0.07}s">
            <span class="theme-card-icon">${theme.icon}</span>
            <span class="theme-card-title">${theme.title}</span>
            <span class="theme-card-count">${theme.words.length} cuvinte</span>
          </button>
        `).join('')}
      </div>
    `;
  } else {
    const state = loadState();
    const units = section.units;

    // Un nod (unitate) — refolosit de randarea simplă și de cea pe serii.
    const nodeHTML = (unit, gi, delayIdx) => {
      const completed = isLessonCompleted(unit.id);
      const unlocked = gi === 0 || isLessonCompleted(units[gi - 1].id);
      const stars = state.lessonsCompleted[unit.id]?.stars || 0;
      return `
        <div class="lesson-node animate-fadeInUp ${completed ? 'lesson-completed' : ''} ${unlocked ? 'lesson-unlocked' : 'lesson-locked'}"
             style="animation-delay: ${0.1 + delayIdx * 0.06}s"
             ${unlocked ? `data-unit-id="${unit.id}"` : ''}>
          <div class="lesson-node-circle">
            <span class="lesson-node-icon">${completed ? '✅' : unlocked ? unit.icon : '🔒'}</span>
          </div>
          <div class="lesson-node-info">
            <h3 class="lesson-node-title">${unit.title}</h3>
            ${completed ? `
              <div class="lesson-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
            ` : unlocked ? `
              <p class="lesson-node-desc">${unit.description || ''}</p>
            ` : `
              <p class="lesson-node-desc" style="opacity: 0.5;">Completează unitatea anterioară</p>
            `}
          </div>
          ${unlocked ? '<span class="lesson-node-arrow">→</span>' : ''}
        </div>
      `;
    };

    if (section.series) {
      // Randare pe serii: arăt seriile atinse (completată sau curentă) și un
      // singur card-teaser cu lacăt pentru următoarea serie neatinsă.
      const size = section.seriesSize || 10;
      const seriesCount = Math.ceil(units.length / size);
      const seriesDone = [];
      for (let s = 0; s < seriesCount; s++) {
        const slice = units.slice(s * size, s * size + size);
        seriesDone[s] = slice.every(u => isLessonCompleted(u.id));
      }
      const reached = s => s === 0 || seriesDone[s - 1];

      const blocks = [];
      let delayIdx = 0;
      for (let s = 0; s < seriesCount; s++) {
        if (reached(s)) {
          const slice = units.slice(s * size, s * size + size);
          const doneCount = slice.filter(u => isLessonCompleted(u.id)).length;
          blocks.push(`
            <div class="series-header animate-fadeInUp" style="animation-delay: ${0.05 + delayIdx * 0.04}s">
              <span class="series-header-title">Seria ${s + 1} / ${seriesCount}</span>
              <span class="series-header-progress">${doneCount}/${slice.length}</span>
            </div>
          `);
          blocks.push(`<div class="lesson-map">${slice
            .map((unit, i) => nodeHTML(unit, s * size + i, delayIdx + i))
            .join('')}</div>`);
          delayIdx += slice.length + 1;
        } else {
          // teaser pentru prima serie neatinsă, apoi ne oprim
          blocks.push(`
            <div class="series-teaser animate-fadeInUp" style="animation-delay: ${0.05 + delayIdx * 0.04}s">
              <span class="series-teaser-lock">🔒</span>
              <div>
                <strong>Seria ${s + 1}</strong>
                <p>Termină seria ${s} ca să deblochezi următoarele 10</p>
              </div>
            </div>
          `);
          break;
        }
      }
      listHTML = blocks.join('');
    } else {
      listHTML = `
        <div class="lesson-map">
          ${units.map((unit, idx) => nodeHTML(unit, idx, idx)).join('')}
        </div>
      `;
    }
  }

  return `
    <div class="section-screen">
      <button class="screen-back-btn" id="btn-back-section">← Înapoi</button>
      <h1 class="screen-title">${section.icon} ${section.title}</h1>
      <p class="screen-subtitle">${section.description}</p>
      ${listHTML}
      <div style="height: 32px;"></div>
    </div>

    <style>
      .section-screen { max-width: 600px; margin: 0 auto; padding: var(--space-lg); min-height: 100vh; }
      .theme-grid {
        display: grid; grid-template-columns: repeat(2, 1fr);
        gap: var(--space-md); margin-top: var(--space-lg);
      }
      .theme-card {
        display: flex; flex-direction: column; align-items: center;
        gap: var(--space-xs); padding: var(--space-lg) var(--space-md);
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-button-secondary);
        cursor: pointer; font-family: var(--font-family);
        transition: all var(--transition-fast);
      }
      .theme-card:active { transform: translateY(3px); box-shadow: none; }
      .theme-card-icon { font-size: 44px; line-height: 1; }
      .theme-card-title {
        font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }
      .theme-card-count { font-size: var(--font-size-xs); color: var(--text-secondary); }

      .series-header {
        display: flex; align-items: center; justify-content: space-between;
        margin: var(--space-lg) 0 var(--space-xs);
        padding-bottom: var(--space-xs);
        border-bottom: 2px solid var(--border-color);
      }
      .series-header-title {
        font-size: var(--font-size-sm); font-weight: var(--font-weight-extrabold);
        color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;
      }
      .series-header-progress {
        font-size: var(--font-size-xs); font-weight: var(--font-weight-bold);
        color: var(--color-secondary);
        background: rgba(206, 130, 255, 0.12);
        padding: 2px 10px; border-radius: 999px;
      }
      .series-teaser {
        display: flex; align-items: center; gap: var(--space-md);
        margin-top: var(--space-lg); padding: var(--space-lg);
        background: var(--bg-card); border: 2px dashed var(--border-color);
        border-radius: var(--border-radius-lg); opacity: 0.75;
      }
      .series-teaser-lock { font-size: 32px; }
      .series-teaser strong { color: var(--text-primary); font-size: var(--font-size-md); }
      .series-teaser p { margin: 2px 0 0; font-size: var(--font-size-xs); color: var(--text-secondary); }
    </style>
  `;
}

export function attachSectionEvents(navigate, params) {
  const section = getSectionById(params.sectionId);
  if (!section) return;

  document.getElementById('btn-back-section')?.addEventListener('click', () => navigate('home'));

  if (section.kind === 'themes') {
    document.querySelectorAll('.theme-card').forEach(card => {
      card.addEventListener('click', () => {
        navigate('themeGallery', { sectionId: section.id, themeId: card.dataset.themeId });
      });
    });
  } else {
    document.querySelectorAll('.lesson-node[data-unit-id]').forEach(node => {
      node.addEventListener('click', () => {
        navigate('lesson', { sectionId: section.id, unitId: node.dataset.unitId });
      });
    });
  }
}
