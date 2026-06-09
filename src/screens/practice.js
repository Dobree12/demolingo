// ============================================
// Practice Hub Screen — Review mistakes & SRS words
// ============================================

import { loadState } from '../engine/storage.js';
import { getWordsDueForReview, getReviewStats } from '../engine/srs.js';
import { speak } from '../engine/audio.js';
import { renderMascot } from '../components/mascot.js';

export function renderPractice(navigate) {
  const state = loadState();
  const reviewStats = getReviewStats();
  const dueWords = getWordsDueForReview();
  const mistakes = state.mistakes.slice(0, 20);
  
  const hasDueWords = dueWords.length > 0;
  const hasMistakes = mistakes.length > 0;
  const isEmpty = !hasDueWords && !hasMistakes;
  
  return `
    <div class="practice-screen">
      <button class="screen-back-btn" id="btn-back-practice">← Înapoi</button>
      <h1 class="screen-title">🔄 Hub de Practică</h1>
      <p class="screen-subtitle">Repetă cuvintele și corectează greșelile pentru a le fixa în memorie!</p>
      
      ${isEmpty ? `
        <div class="practice-empty animate-scaleIn">
          ${renderMascot('happy', 'lg', 'Nu ai nimic de repetat acum! Completează lecții noi și revino mai târziu! 🌟')}
          <p class="practice-empty-text">Cuvintele de repetat vor apărea aici automat.</p>
          <button class="btn btn-primary btn-full" id="btn-practice-home" style="margin-top: 24px;">
            🏠 Înapoi la lecții
          </button>
        </div>
      ` : `
        <!-- Stats -->
        <div class="card" style="margin-bottom: var(--space-lg);">
          <div class="flex-between">
            <div>
              <p style="font-size: var(--font-size-xs); color: var(--text-muted); text-transform: uppercase;">Cuvinte de repetat</p>
              <p style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-xp);">${reviewStats.dueForReview}</p>
            </div>
            <div>
              <p style="font-size: var(--font-size-xs); color: var(--text-muted); text-transform: uppercase;">Cuvinte stăpânite</p>
              <p style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-primary);">${reviewStats.mastered}</p>
            </div>
            <div>
              <p style="font-size: var(--font-size-xs); color: var(--text-muted); text-transform: uppercase;">Total urmărite</p>
              <p style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-secondary);">${reviewStats.totalTracked}</p>
            </div>
          </div>
        </div>
        
        ${hasDueWords ? `
          <h2 style="font-size: var(--font-size-lg); font-weight: 800; margin-bottom: var(--space-md);">
            📖 Cuvinte de repetat (${dueWords.length})
          </h2>
          <div style="display: flex; flex-direction: column; gap: var(--space-sm); margin-bottom: var(--space-xl);">
            ${dueWords.slice(0, 15).map((w, i) => `
              <div class="card animate-fadeInUp" style="animation-delay: ${i * 0.05}s; padding: var(--space-md); display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <span style="font-weight: 800; font-size: var(--font-size-md);">${w.word}</span>
                  <span style="font-size: var(--font-size-xs); color: var(--text-muted); margin-left: 8px;">
                    interval: ${w.interval} zile
                  </span>
                </div>
                <button class="speaker-btn-inline practice-speak-btn" data-word="${w.word}" style="background: none; border: none; font-size: 20px; cursor: pointer;">🔊</button>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${hasMistakes ? `
          <h2 style="font-size: var(--font-size-lg); font-weight: 800; margin-bottom: var(--space-md);">
            ❌ Greșeli recente (${mistakes.length})
          </h2>
          <div style="display: flex; flex-direction: column; gap: var(--space-sm); margin-bottom: var(--space-xl);">
            ${mistakes.slice(0, 10).map((m, i) => {
              const ex = m.exercise;
              const display = ex.prompt || ex.question || ex.word || ex.sentence || '';
              const answer = ex.answer || ex.correct || '';
              return `
                <div class="card animate-fadeInUp" style="animation-delay: ${i * 0.05}s; padding: var(--space-md);">
                  <p style="font-weight: 700; font-size: var(--font-size-sm); color: var(--text-primary);">${display}</p>
                  <p style="font-size: var(--font-size-xs); color: var(--color-primary); margin-top: 4px;">
                    ✅ Răspuns corect: <strong>${answer}</strong>
                  </p>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}
      `}
    </div>
  `;
}

export function attachPracticeEvents(navigate) {
  document.getElementById('btn-back-practice')?.addEventListener('click', () => navigate('home'));
  document.getElementById('btn-practice-home')?.addEventListener('click', () => navigate('home'));
  
  // Speak buttons
  document.querySelectorAll('.practice-speak-btn').forEach(btn => {
    btn.addEventListener('click', () => speak(btn.dataset.word));
  });
}
