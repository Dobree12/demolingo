// ============================================
// Main Entry Point — Router & App Bootstrap
// ============================================

import './styles/index.css';
import './styles/screens.css';
import { loadState, getRegistry } from './engine/storage.js';
import { checkAndUpdateStreak } from './engine/progress.js';
import { initTimeTracker } from './engine/timeTracker.js';
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
function navigate(screen, params = {}) {
  currentScreen = screen;
  currentParams = params;
  render();
  window.scrollTo(0, 0);
}

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

  // Fără profil activ → ecranul de alegere a profilului
  const registry = getRegistry();
  if (!registry.activeUserId) {
    navigate('users');
    return;
  }

  checkAndUpdateStreak();
  navigate('home');
}

// --- Start ---
document.addEventListener('DOMContentLoaded', boot);

// --- Expose navigate globally for debugging ---
window.__navigate = navigate;
