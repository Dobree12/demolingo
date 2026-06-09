// ============================================
// Results Screen — Celebration after lesson completion
// ============================================

import { renderMascot } from '../components/mascot.js';
import { launchConfetti } from '../components/confetti.js';
import { getLessonCompleteMessage } from '../data/messages.js';
import { getLessonById } from '../data/lessons.js';
import { playSound } from '../engine/audio.js';

export function renderResults(navigate, params) {
  const { lessonId, score, stars, correctCount, totalExercises, xpGained, newBadges } = params;
  const lesson = getLessonById(lessonId);
  const lessonTitle = lesson ? `${lesson.icon} ${lesson.title}` : 'Lecție';
  const message = getLessonCompleteMessage(score);

  // Stars display
  const starsHTML = Array.from({ length: 3 }, (_, i) => {
    const earned = i < stars;
    const size = i === 1 ? '64px' : '48px'; // middle star bigger
    const delay = 0.3 + i * 0.2;
    return `
      <span class="results-star ${earned ? 'results-star-earned' : 'results-star-empty'} animate-popIn"
            style="font-size: ${size}; animation-delay: ${delay}s; opacity: 0;">
        ${earned ? '⭐' : '☆'}
      </span>
    `;
  }).join('');

  // Badges HTML
  const badgesHTML = newBadges && newBadges.length > 0 ? `
    <div class="results-badges animate-fadeInUp" style="animation-delay: 1s;">
      <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-md);">
        🏅 Insigne noi deblocate!
      </h3>
      <div style="display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap;">
        ${newBadges.map(badge => `
          <div class="card animate-scaleIn" style="padding: var(--space-md); text-align: center; min-width: 120px;">
            <div style="font-size: 2rem; margin-bottom: var(--space-xs);">${badge.icon}</div>
            <div style="font-size: var(--font-size-sm); font-weight: var(--font-weight-bold); color: var(--text-primary);">${badge.name}</div>
            <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 2px;">${badge.description}</div>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  // Mascot state based on score
  const mascotState = score === 100 ? 'celebrating' : score >= 80 ? 'excited' : score >= 60 ? 'happy' : 'encouraging';

  return `
    <div class="results-screen" style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--space-xl) var(--space-lg);
      text-align: center;
      overflow-y: auto;
    ">
      <!-- Lesson Title -->
      <div class="animate-fadeInDown" style="margin-bottom: var(--space-md);">
        <span style="font-size: var(--font-size-sm); color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; font-weight: var(--font-weight-bold);">
          Lecție completă
        </span>
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-extrabold); color: var(--text-primary); margin-top: var(--space-xs);">
          ${lessonTitle}
        </h2>
      </div>

      <!-- Mascot -->
      <div class="animate-scaleIn" style="margin-bottom: var(--space-lg);">
        ${renderMascot(mascotState, 'xl', message)}
      </div>

      <!-- Stars -->
      <div style="display: flex; align-items: flex-end; justify-content: center; gap: var(--space-sm); margin-bottom: var(--space-xl);">
        ${starsHTML}
      </div>

      <!-- Score Card -->
      <div class="card animate-fadeInUp" style="width: 100%; max-width: 360px; padding: var(--space-lg); animation-delay: 0.6s; margin-bottom: var(--space-lg);">
        <!-- Score Percentage -->
        <div style="margin-bottom: var(--space-lg);">
          <div style="font-size: var(--font-size-4xl); font-weight: var(--font-weight-extrabold); color: ${score >= 80 ? 'var(--color-primary)' : score >= 60 ? 'var(--color-accent)' : 'var(--color-hearts)'};">
            ${score}%
          </div>
          <div style="font-size: var(--font-size-sm); color: var(--text-secondary);">Scor</div>
        </div>

        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);">
          <!-- Correct Count -->
          <div style="
            background: var(--color-success-bg);
            border-radius: var(--border-radius-md);
            padding: var(--space-md);
          ">
            <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-extrabold); color: var(--color-primary);">
              ${correctCount}/${totalExercises}
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 2px;">
              ✅ Corecte
            </div>
          </div>

          <!-- XP Earned -->
          <div style="
            background: rgba(28, 176, 246, 0.1);
            border-radius: var(--border-radius-md);
            padding: var(--space-md);
          ">
            <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-extrabold); color: var(--color-xp);">
              +${xpGained}
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 2px;">
              ⭐ XP câștigat
            </div>
          </div>
        </div>
      </div>

      <!-- New Badges -->
      ${badgesHTML}

      <!-- Action Buttons -->
      <div class="animate-fadeInUp" style="width: 100%; max-width: 360px; margin-top: var(--space-lg); display: flex; flex-direction: column; gap: var(--space-md); animation-delay: 1.2s;">
        <button class="btn btn-primary btn-full btn-lg" id="btn-results-continue">
          🏠 Continuă
        </button>
        <button class="btn btn-secondary btn-full" id="btn-results-retry">
          🔄 Repetă lecția
        </button>
      </div>

      <!-- Bottom Spacing -->
      <div style="height: var(--space-xl);"></div>
    </div>
  `;
}

export function attachResultsEvents(navigate, params) {
  // Launch confetti on mount
  setTimeout(() => {
    launchConfetti(params.score === 100 ? 'high' : 'normal');
  }, 300);

  // Play celebration sound
  setTimeout(() => playSound('complete'), 100);

  // Continue button → Home
  document.getElementById('btn-results-continue')?.addEventListener('click', () => {
    navigate('home');
  });

  // Retry button → Restart lesson
  document.getElementById('btn-results-retry')?.addEventListener('click', () => {
    navigate('lesson', { lessonId: params.lessonId });
  });
}
