// ============================================
// Home Screen — Dashboard with lesson map & stats
// ============================================

import { loadState, getActiveUser } from '../engine/storage.js';
import { getStats, getLevelName, getXPProgress, isLessonCompleted, isLessonUnlocked, checkAndUpdateStreak } from '../engine/progress.js';
import { getAllLessons } from '../data/lessons.js';
import { getAllSections } from '../data/sections.js';
import { getRandomMessage, welcomeMessages, comebackMessages, streakMessages } from '../data/messages.js';
import { renderMascot } from '../components/mascot.js';
import { getReviewStats } from '../engine/srs.js';

export function renderHome(navigate) {
  const state = loadState();
  const stats = getStats();
  const lessons = getAllLessons();
  const streak = checkAndUpdateStreak();
  const reviewStats = getReviewStats();
  const activeUser = getActiveUser();
  
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

  // --- Harta de lecții ---
  // Cele 7 clasice se afișează normal; cele 100 suplimentare (`extra`) se
  // afișează pe serii de 10 cu deblocare secvențială: doar seria atinsă e
  // vizibilă (1 deschis + 9 cu lacăt), iar terminarea celor 10 o deblochează
  // pe următoarea.
  const nodeHTML = (lesson, delayIdx) => {
    const completed = isLessonCompleted(lesson.id);
    const unlocked = isLessonUnlocked(lesson.id, lessons);
    const stars = state.lessonsCompleted[lesson.id]?.stars || 0;
    return `
      <div class="lesson-node animate-fadeInUp ${completed ? 'lesson-completed' : ''} ${unlocked ? 'lesson-unlocked' : 'lesson-locked'}"
           style="animation-delay: ${0.3 + delayIdx * 0.05}s;"
           data-lesson-id="${lesson.id}"
           ${unlocked ? `id="lesson-${lesson.id}"` : ''}>
        <div class="lesson-node-circle">
          <span class="lesson-node-icon">${completed ? '✅' : unlocked ? lesson.icon : '🔒'}</span>
        </div>
        <div class="lesson-node-info">
          <h3 class="lesson-node-title">${lesson.title}</h3>
          <p class="lesson-node-subtitle">${lesson.titleDe}</p>
          ${completed ? `
            <div class="lesson-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
          ` : unlocked ? `
            <p class="lesson-node-desc">${lesson.description}</p>
          ` : `
            <p class="lesson-node-desc" style="opacity: 0.5;">Completează lecția anterioară</p>
          `}
        </div>
        ${unlocked ? '<span class="lesson-node-arrow">→</span>' : ''}
      </div>
    `;
  };

  const classicLessons = lessons.filter(l => !l.extra);
  const extra = lessons.filter(l => l.extra);

  // Lecțiile de bază sunt restrânse implicit (preferință UI persistată global).
  // Un buton le arată/ascunde — nu se șterge nimic.
  const classicOpen = localStorage.getItem('ui_classicOpen') === '1';
  const classicDone = classicLessons.filter(l => isLessonCompleted(l.id)).length;

  let lessonMapHTML = `
    <button class="lessons-collapse-btn" id="btn-toggle-classic" aria-expanded="${classicOpen}">
      <span class="lessons-collapse-label">📖 Lecții de bază</span>
      <span class="lessons-collapse-meta">
        <span class="lessons-collapse-count">${classicDone}/${classicLessons.length}</span>
        <span class="lessons-collapse-caret">${classicOpen ? '▴' : '▾'}</span>
      </span>
    </button>
    <div class="lesson-map classic-map ${classicOpen ? '' : 'is-collapsed'}" id="classic-map">${classicLessons.map((l, i) => nodeHTML(l, i)).join('')}</div>
  `;

  if (extra.length) {
    const size = 10;
    const seriesCount = Math.ceil(extra.length / size);
    const seriesDone = [];
    for (let s = 0; s < seriesCount; s++) {
      seriesDone[s] = extra.slice(s * size, s * size + size).every(l => isLessonCompleted(l.id));
    }
    const firstExtraUnlocked = isLessonUnlocked(extra[0].id, lessons);
    const reached = s => (s === 0 ? firstExtraUnlocked : seriesDone[s - 1]);

    const blocks = ['<h2 class="home-extra-title">🏆 Provocări</h2>'];
    let di = classicLessons.length;
    for (let s = 0; s < seriesCount; s++) {
      if (reached(s)) {
        const slice = extra.slice(s * size, s * size + size);
        const done = slice.filter(l => isLessonCompleted(l.id)).length;
        blocks.push(`
          <div class="series-header">
            <span class="series-header-title">Seria ${s + 1} / ${seriesCount}</span>
            <span class="series-header-progress">${done}/${slice.length}</span>
          </div>
        `);
        blocks.push(`<div class="lesson-map">${slice.map((l, i) => nodeHTML(l, di + i)).join('')}</div>`);
        di += slice.length + 1;
      } else {
        const label = s === 0
          ? 'Termină lecțiile de bază ca să deblochezi provocările'
          : `Termină seria ${s} ca să deblochezi următoarele 10`;
        blocks.push(`
          <div class="series-teaser">
            <span class="series-teaser-lock">🔒</span>
            <div><strong>Seria ${s + 1}</strong><p>${label}</p></div>
          </div>
        `);
        break;
      }
    }
    lessonMapHTML += blocks.join('');
  }

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
            ${activeUser ? `
              <button class="home-user-chip" id="btn-switch-user" title="Schimbă profilul">
                <span class="home-user-chip-avatar">${activeUser.avatar}</span>
                <span class="home-user-chip-name">${activeUser.name}</span>
              </button>
            ` : ''}
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
            <span class="home-stat-icon">🎯</span>
            <span class="home-stat-value">${stats.accuracy}%</span>
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
      ${lessonMapHTML}
      
      <!-- Sections -->
      <div class="home-lessons-title animate-fadeInUp" style="animation-delay: 0.75s;">
        <h2>🧩 Secțiuni</h2>
      </div>
      <div class="home-sections">
        ${getAllSections().map((section, idx) => {
          const total = section.units ? section.units.length : (section.themes?.length || 0);
          const done = section.units
            ? section.units.filter(u => state.lessonsCompleted[u.id]?.completed).length
            : null;
          return `
            <button class="home-section-card card-interactive animate-fadeInUp"
                    data-section-id="${section.id}"
                    style="animation-delay: ${0.8 + idx * 0.08}s">
              <span class="home-section-icon">${section.icon}</span>
              <div class="home-section-info">
                <span class="home-section-title">${section.title}</span>
                <span class="home-section-desc">${section.description}</span>
              </div>
              <span class="home-section-progress">${done !== null ? `${done}/${total}` : `${total} teme`}</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Dictionary Link -->
      <div class="home-cognates-card animate-fadeInUp" style="animation-delay: 1s;">
        <button class="btn btn-accent btn-full" id="btn-dictionary">
          📖 Dicționar
        </button>
      </div>

      <!-- Cognates Link -->
      <div class="home-cognates-card animate-fadeInUp" style="animation-delay: 1.05s;">
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
  
  // Toggle „Lecții de bază" — arată/ascunde blocul clasic, persistă preferința
  const classicToggle = document.getElementById('btn-toggle-classic');
  classicToggle?.addEventListener('click', () => {
    const map = document.getElementById('classic-map');
    if (!map) return;
    const nowCollapsed = map.classList.toggle('is-collapsed');
    const open = !nowCollapsed;
    localStorage.setItem('ui_classicOpen', open ? '1' : '0');
    classicToggle.setAttribute('aria-expanded', String(open));
    const caret = classicToggle.querySelector('.lessons-collapse-caret');
    if (caret) caret.textContent = open ? '▴' : '▾';
  });

  // Settings
  document.getElementById('btn-settings')?.addEventListener('click', () => navigate('settings'));

  // Schimbă profilul
  document.getElementById('btn-switch-user')?.addEventListener('click', () => navigate('users'));
  
  // Profile
  document.getElementById('btn-profile')?.addEventListener('click', () => navigate('profile'));
  
  // Practice
  document.getElementById('btn-practice')?.addEventListener('click', () => navigate('practice'));
  
  // Cognates
  document.getElementById('btn-cognates')?.addEventListener('click', () => navigate('cognates'));

  // Dictionary
  document.getElementById('btn-dictionary')?.addEventListener('click', () => navigate('dictionary'));

  // Sections
  document.querySelectorAll('.home-section-card').forEach(card => {
    card.addEventListener('click', () => navigate('section', { sectionId: card.dataset.sectionId }));
  });
}
