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
    listHTML = `
      <div class="lesson-map">
        ${section.units.map((unit, idx) => {
          const completed = isLessonCompleted(unit.id);
          const unlocked = idx === 0 || isLessonCompleted(section.units[idx - 1].id);
          const unitData = state.lessonsCompleted[unit.id];
          const stars = unitData?.stars || 0;
          return `
            <div class="lesson-node animate-fadeInUp ${completed ? 'lesson-completed' : ''} ${unlocked ? 'lesson-unlocked' : 'lesson-locked'}"
                 style="animation-delay: ${0.1 + idx * 0.08}s"
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
        }).join('')}
      </div>
    `;
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
