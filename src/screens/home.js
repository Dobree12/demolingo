// ============================================
// Home Screen — Dashboard with lesson map & stats
// ============================================

import { loadState } from '../engine/storage.js';
import { getStats, getLevelName, getXPProgress, isLessonCompleted, isLessonUnlocked, checkAndUpdateStreak } from '../engine/progress.js';
import { getAllLessons } from '../data/lessons.js';
import { getRandomMessage, welcomeMessages, comebackMessages, streakMessages } from '../data/messages.js';
import { renderMascot } from '../components/mascot.js';
import { getReviewStats } from '../engine/srs.js';

export function renderHome(navigate) {
  const state = loadState();
  const stats = getStats();
  const lessons = getAllLessons();
  const streak = checkAndUpdateStreak();
  const reviewStats = getReviewStats();
  
  // Determine welcome message
  const today = new Date().toDateString();
  const lastActive = state.lastActiveDate;
  let welcomeMsg;
  
  if (!lastActive || lastActive === today) {
    welcomeMsg = getRandomMessage(welcomeMessages);
  } else {
    const daysSince = Math.floor((new Date() - new Date(lastActive)) / 86400000);
    if (daysSince > 2) {
      welcomeMsg = getRandomMessage(comebackMessages);
    } else {
      welcomeMsg = getRandomMessage(welcomeMessages);
    }
  }
  
  // Streak message
  const streakMsg = streakMessages[streak] || (streak > 0 ? `🔥 ${streak} zile la rând!` : '');
  
  return `
    <div class="home-screen">
      <!-- Header -->
      <div class="home-header">
        <div class="home-header-top">
          <div class="home-logo">
            <span class="home-logo-mark" aria-hidden="true">
              <svg viewBox="0 0 60 60" width="32" height="32">
                <defs><clipPath id="logoClip"><circle cx="30" cy="30" r="28"/></clipPath></defs>
                <g clip-path="url(#logoClip)">
                  <rect width="60" height="20" fill="#1a1a1a"/>
                  <rect y="20" width="60" height="20" fill="#DD0000"/>
                  <rect y="40" width="60" height="20" fill="#FFCE00"/>
                </g>
                <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="3"/>
              </svg>
            </span>
            <span class="home-logo-text">Învățăm Germană</span>
          </div>
          <div class="home-header-actions">
            <button class="home-icon-btn" id="btn-settings" title="Setări">⚙️</button>
          </div>
        </div>
        
        <!-- Stats Row -->
        <div class="home-stats-row">
          <div class="home-stat" id="btn-profile" style="cursor: pointer;">
            <span class="home-stat-icon">🔥</span>
            <span class="home-stat-value">${stats.streak}</span>
          </div>
          <div class="home-stat">
            <span class="home-stat-icon">⭐</span>
            <span class="home-stat-value">${stats.xp} XP</span>
          </div>
          <div class="home-stat">
            <span class="home-stat-icon">❤️</span>
            <span class="home-stat-value">${state.hearts}</span>
          </div>
          <div class="home-stat">
            <span class="home-stat-icon">📚</span>
            <span class="home-stat-value">${stats.wordsLearned}</span>
          </div>
        </div>
      </div>
      
      <!-- Welcome Section -->
      <div class="home-welcome animate-fadeInUp">
        <div class="home-welcome-mascot">
          ${renderMascot(streak > 3 ? 'excited' : 'waving', 'lg')}
        </div>
        <p class="home-welcome-text">${welcomeMsg}</p>
        ${streakMsg ? `<p class="home-streak-text">${streakMsg}</p>` : ''}
      </div>

      <!-- Daily Goal -->
      <div class="home-daily-goal animate-fadeInUp" style="animation-delay: 0.1s;">
        <div class="daily-goal-header">
          <span>🎯 Obiectiv zilnic</span>
          <span class="daily-goal-time">${stats.dailyMinutes}/${stats.dailyGoal} min</span>
        </div>
        <div class="progress-bar-container" style="height: 10px;">
          <div class="progress-bar-fill" style="width: ${Math.min(100, (stats.dailyMinutes / stats.dailyGoal) * 100)}%; ${stats.dailyGoalCompleted ? 'background: linear-gradient(90deg, #FFC800, #FF9600);' : ''}"></div>
        </div>
        ${stats.dailyGoalCompleted ? '<p class="daily-goal-complete">✅ Obiectiv completat! Bravo!</p>' : ''}
      </div>
      
      <!-- Level Progress -->
      <div class="home-level-card animate-fadeInUp" style="animation-delay: 0.15s;">
        <div class="level-info">
          <span class="badge badge-level">Nivel ${stats.level}</span>
          <span class="level-name">${stats.levelName}</span>
        </div>
        <div class="progress-bar-container" style="height: 12px;">
          <div class="progress-bar-fill" style="width: ${stats.xpProgress.percent}%; background: linear-gradient(90deg, var(--color-secondary), #CE82FF);"></div>
        </div>
        <p class="level-xp-text">${stats.xpProgress.current}/${stats.xpProgress.needed} XP pentru nivelul următor</p>
      </div>

      <!-- Review Section -->
      ${reviewStats.dueForReview > 0 ? `
        <div class="home-review-card animate-fadeInUp" style="animation-delay: 0.2s;">
          <button class="btn btn-accent btn-full" id="btn-practice">
            🔄 Repetă ${reviewStats.dueForReview} cuvinte
          </button>
        </div>
      ` : ''}

      <!-- Lesson Map -->
      <div class="home-lessons-title animate-fadeInUp" style="animation-delay: 0.25s;">
        <h2>📖 Lecții</h2>
      </div>
      <div class="lesson-map">
        ${lessons.map((lesson, idx) => {
          const completed = isLessonCompleted(lesson.id);
          const unlocked = isLessonUnlocked(lesson.id, lessons);
          const lessonData = state.lessonsCompleted[lesson.id];
          const stars = lessonData?.stars || 0;
          const delay = 0.3 + idx * 0.08;
          
          return `
            <div class="lesson-node animate-fadeInUp ${completed ? 'lesson-completed' : ''} ${unlocked ? 'lesson-unlocked' : 'lesson-locked'}"
                 style="animation-delay: ${delay}s;"
                 data-lesson-id="${lesson.id}"
                 ${unlocked ? `id="lesson-${lesson.id}"` : ''}>
              <div class="lesson-node-circle">
                <span class="lesson-node-icon">${completed ? '✅' : unlocked ? lesson.icon : '🔒'}</span>
              </div>
              <div class="lesson-node-info">
                <h3 class="lesson-node-title">${lesson.title}</h3>
                <p class="lesson-node-subtitle">${lesson.titleDe}</p>
                ${completed ? `
                  <div class="lesson-stars">
                    ${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}
                  </div>
                ` : unlocked ? `
                  <p class="lesson-node-desc">${lesson.description}</p>
                ` : `
                  <p class="lesson-node-desc" style="opacity: 0.5;">Completează lecția anterioară</p>
                `}
              </div>
              ${unlocked ? '<span class="lesson-node-arrow">→</span>' : ''}
            </div>
          `;
        }).join('')}
      </div>
      
      <!-- Cognates Link -->
      <div class="home-cognates-card animate-fadeInUp" style="animation-delay: 0.8s;">
        <button class="btn btn-secondary btn-full" id="btn-cognates">
          🇷🇴↔🇩🇪 Cuvinte similare Română-Germană
        </button>
      </div>

      <!-- Bottom Spacing -->
      <div style="height: 32px;"></div>
    </div>
  `;
}

export function attachHomeEvents(navigate) {
  const lessons = getAllLessons();

  // Lesson clicks + radial-glow mouse tracking for desktop pointers
  lessons.forEach(lesson => {
    const el = document.getElementById(`lesson-${lesson.id}`);
    if (el) {
      el.addEventListener('click', () => navigate('lesson', { lessonId: lesson.id }));
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    }
  });
  
  // Settings
  document.getElementById('btn-settings')?.addEventListener('click', () => navigate('settings'));
  
  // Profile
  document.getElementById('btn-profile')?.addEventListener('click', () => navigate('profile'));
  
  // Practice
  document.getElementById('btn-practice')?.addEventListener('click', () => navigate('practice'));
  
  // Cognates
  document.getElementById('btn-cognates')?.addEventListener('click', () => navigate('cognates'));
}
