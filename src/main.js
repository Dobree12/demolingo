// ============================================
// Main Entry Point — Router & App Bootstrap
// ============================================

import './styles/index.css';
import './styles/screens.css';
import { loadState, getRegistry } from './engine/storage.js';
import { checkAndUpdateStreak } from './engine/progress.js';
import { initTimeTracker } from './engine/timeTracker.js';
import { migrateSRSHistory } from './engine/srs.js';
import { initSync } from './engine/sync.js';
import { renderHome, attachHomeEvents } from './screens/home.js';
import { renderLesson, attachLessonEvents } from './screens/lesson.js';
import { renderResults, attachResultsEvents } from './screens/results.js';
import { renderCognates, attachCognatesEvents } from './screens/cognates.js';
import { renderProfile, attachProfileEvents } from './screens/profile.js';
import { renderSettings, attachSettingsEvents } from './screens/settings.js';
import { renderPractice, attachPracticeEvents } from './screens/practice.js';
import { renderUsers, attachUsersEvents } from './screens/users.js';
import { renderSection, attachSectionEvents } from './screens/section.js';
import { renderThemeGallery, attachThemeGalleryEvents } from './screens/themeGallery.js';
import { renderDictionary, attachDictionaryEvents } from './screens/dictionary.js';

// --- App State ---
let currentScreen = 'home';
let currentParams = {};

// --- Theme ---
function applyTheme() {
  const state = loadState();
  document.documentElement.setAttribute('data-theme', state.theme || 'light');
}

// --- Router ---
// Fiecare ecran e o intrare în history (params în history.state), ca butonul
// Înapoi al telefonului să rămână în aplicație, iar refresh-ul să păstreze
// ecranul. Lecția și rezultatele sunt tranzitorii: ieșirea din ele înlocuiește
// intrarea, ca Înapoi să nu repornească lecția.
const TRANSIENT = new Set(['lesson', 'results']);
function toHistoryState(screen, params) {
  // JSON aruncă funcțiile (ex. `check` din badge-uri), pe care pushState nu le clonează
  return { screen, params: JSON.parse(JSON.stringify(params || {})) };
}

function navigate(screen, params = {}, { replace = false } = {}) {
  const entry = toHistoryState(screen, params);
  const url = `#/${screen}`;
  if (replace || TRANSIENT.has(currentScreen)) history.replaceState(entry, '', url);
  else history.pushState(entry, '', url);
  show(screen, params);
}

function show(screen, params) {
  currentScreen = screen;
  currentParams = params;
  render();
  window.scrollTo(0, 0);
}

window.addEventListener('popstate', (e) => {
  const entry = e.state;
  if (currentScreen === 'lesson' && entry?.screen !== 'lesson') {
    if (!confirm('Ești sigur că vrei să ieși din lecție? Progresul nu va fi salvat.')) {
      // rămâi în lecție: pune la loc intrarea, fără re-randare
      history.pushState(toHistoryState('lesson', currentParams), '', '#/lesson');
      return;
    }
  }
  if (!entry?.screen || !getRegistry().activeUserId) {
    show(getRegistry().activeUserId ? 'home' : 'users', {});
    return;
  }
  show(entry.screen, entry.params || {});
});

function render() {
  const app = document.getElementById('app');
  if (!app) return;
  
  let html = '';
  
  switch (currentScreen) {
    case 'home':
      html = renderHome(navigate);
      break;
    case 'lesson':
      html = renderLesson(navigate, currentParams);
      break;
    case 'results':
      html = renderResults(navigate, currentParams);
      break;
    case 'cognates':
      html = renderCognates(navigate);
      break;
    case 'profile':
      html = renderProfile(navigate);
      break;
    case 'settings':
      html = renderSettings(navigate);
      break;
    case 'practice':
      html = renderPractice(navigate);
      break;
    case 'users':
      html = renderUsers(navigate);
      break;
    case 'section':
      html = renderSection(navigate, currentParams);
      break;
    case 'themeGallery':
      html = renderThemeGallery(navigate, currentParams);
      break;
    case 'dictionary':
      html = renderDictionary(navigate);
      break;
    default:
      html = renderHome(navigate);
  }
  
  app.innerHTML = html;
  
  // Attach events after render
  requestAnimationFrame(() => {
    switch (currentScreen) {
      case 'home': attachHomeEvents(navigate); break;
      case 'lesson': attachLessonEvents(navigate, currentParams); break;
      case 'results': attachResultsEvents(navigate, currentParams); break;
      case 'cognates': attachCognatesEvents(navigate); break;
      case 'profile': attachProfileEvents(navigate); break;
      case 'settings': attachSettingsEvents(navigate); break;
      case 'practice': attachPracticeEvents(navigate); break;
      case 'users': attachUsersEvents(navigate); break;
      case 'section': attachSectionEvents(navigate, currentParams); break;
      case 'themeGallery': attachThemeGalleryEvents(navigate, currentParams); break;
      case 'dictionary': attachDictionaryEvents(navigate); break;
    }
  });
}

// --- Boot ---
function boot() {
  applyTheme();
  initTimeTracker();
  initSync();

  // Fără profil activ → ecranul de alegere a profilului
  const registry = getRegistry();
  if (!registry.activeUserId) {
    navigate('users', {}, { replace: true });
    return;
  }

  checkAndUpdateStreak();
  migrateSRSHistory();

  // După refresh: reia ecranul din history (rezultatele nu au sens reluate)
  const saved = history.state;
  if (saved?.screen && saved.screen !== 'results') {
    navigate(saved.screen, saved.params || {}, { replace: true });
  } else {
    navigate('home', {}, { replace: true });
  }
}

// --- Start ---
document.addEventListener('DOMContentLoaded', boot);

// Offline + „Adaugă pe ecranul principal" (doar în build, ca să nu cacheze dev-ul)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((e) => console.warn('SW:', e));
  });
}

// --- Expose navigate globally for debugging ---
window.__navigate = navigate;
