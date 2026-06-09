// ============================================
// Profile Screen — Stats, level info & badges
// ============================================

import { getStats, getAllBadges } from '../engine/progress.js';
import { loadState } from '../engine/storage.js';
import { renderMascot } from '../components/mascot.js';

export function renderProfile(navigate) {
  const stats = getStats();
  const badges = getAllBadges();
  const state = loadState();

  const earnedCount = badges.filter(b => b.earned).length;
  const mascotState = stats.level > 3 ? 'celebrating' : 'happy';
  const mascotMessage = stats.level > 3
    ? 'Ești un adevărat campion! 🏆'
    : 'Continuă să înveți, ești minunat! 💛';

  // Stats items
  const statItems = [
    { icon: '⭐', label: 'XP Total', value: stats.xp, color: 'var(--color-xp)' },
    { icon: '🔥', label: 'Serie zilnică', value: `${stats.streak} zile`, color: 'var(--color-streak)' },
    { icon: '📚', label: 'Cuvinte învățate', value: stats.wordsLearned, color: 'var(--color-secondary)' },
    { icon: '🎯', label: 'Precizie', value: `${stats.accuracy}%`, color: 'var(--color-primary)' },
    { icon: '✅', label: 'Lecții completate', value: stats.totalLessonsCompleted, color: 'var(--color-primary-dark)' },
    { icon: '⏱️', label: 'Obiectiv zilnic', value: `${stats.dailyMinutes}/${stats.dailyGoal} min`, color: 'var(--color-accent)' },
  ];

  const statsGridHTML = statItems.map((item, idx) => `
    <div class="card animate-fadeInUp" style="
      padding: var(--space-md);
      text-align: center;
      animation-delay: ${0.3 + idx * 0.08}s;
    ">
      <div style="font-size: 1.5rem; margin-bottom: var(--space-xs);">${item.icon}</div>
      <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-extrabold); color: ${item.color};">
        ${item.value}
      </div>
      <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 2px;">
        ${item.label}
      </div>
    </div>
  `).join('');

  // Badges
  const badgesHTML = badges.map((badge, idx) => `
    <div class="card animate-fadeInUp" style="
      padding: var(--space-md);
      text-align: center;
      animation-delay: ${0.6 + idx * 0.06}s;
      ${!badge.earned ? 'opacity: 0.45; filter: grayscale(0.8);' : 'border-color: var(--color-accent-light);'}
    ">
      <div style="font-size: 2rem; margin-bottom: var(--space-xs); position: relative; display: inline-block;">
        ${badge.icon}
        ${!badge.earned ? '<span style="position: absolute; bottom: -2px; right: -6px; font-size: 0.8rem;">🔒</span>' : ''}
      </div>
      <div style="font-size: var(--font-size-sm); font-weight: var(--font-weight-bold); color: var(--text-primary);">
        ${badge.name}
      </div>
      <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 2px; line-height: 1.4;">
        ${badge.description}
      </div>
      ${badge.earned ? '<div style="margin-top: var(--space-xs);"><span class="badge badge-xp" style="font-size: 0.65rem;">✅ Obținut</span></div>' : ''}
    </div>
  `).join('');

  return `
    <div style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: var(--space-lg);
    ">
      <!-- Header -->
      <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg);">
        <button class="btn btn-secondary btn-sm" id="btn-back-profile" style="padding: 8px 12px;">
          ← Înapoi
        </button>
      </div>

      <!-- Title -->
      <div class="animate-fadeInDown" style="text-align: center; margin-bottom: var(--space-lg);">
        <h1 style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-extrabold); color: var(--text-primary);">
          👤 Profilul Meu
        </h1>
      </div>

      <!-- Mascot -->
      <div class="animate-scaleIn" style="display: flex; justify-content: center; margin-bottom: var(--space-xl);">
        ${renderMascot(mascotState, 'lg', mascotMessage)}
      </div>

      <!-- Level Progress -->
      <div class="card animate-fadeInUp" style="margin-bottom: var(--space-xl); animation-delay: 0.15s;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md);">
          <div style="display: flex; align-items: center; gap: var(--space-sm);">
            <span class="badge badge-level" style="font-size: var(--font-size-sm); padding: 6px 14px;">
              Nivel ${stats.level}
            </span>
            <span style="font-size: var(--font-size-md); font-weight: var(--font-weight-bold); color: var(--text-primary);">
              ${stats.levelName}
            </span>
          </div>
        </div>
        <div class="progress-bar-container" style="height: 14px; margin-bottom: var(--space-sm);">
          <div class="progress-bar-fill" style="width: ${stats.xpProgress.percent}%; background: linear-gradient(90deg, var(--color-secondary), #CE82FF);"></div>
        </div>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); text-align: center;">
          ${stats.xpProgress.current} / ${stats.xpProgress.needed} XP pentru nivelul următor
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="animate-fadeInUp" style="animation-delay: 0.2s;">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-md);">
          📊 Statistici
        </h2>
      </div>
      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-md);
        margin-bottom: var(--space-xl);
      ">
        ${statsGridHTML}
      </div>

      <!-- Badges Section -->
      <div class="animate-fadeInUp" style="animation-delay: 0.5s;">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-sm);">
          🏅 Insigne
        </h2>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
          ${earnedCount} din ${badges.length} deblocate
        </p>
      </div>
      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-md);
        margin-bottom: var(--space-xl);
      ">
        ${badgesHTML}
      </div>

      <!-- Bottom Spacing -->
      <div style="height: var(--space-xl);"></div>
    </div>
  `;
}

export function attachProfileEvents(navigate) {
  // Back button
  document.getElementById('btn-back-profile')?.addEventListener('click', () => {
    navigate('home');
  });
}
