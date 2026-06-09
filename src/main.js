// ============================================
// Main Entry Point — Router & App Bootstrap
// ============================================

import './styles/index.css';
import './styles/screens.css';
import { loadState, updateState } from './engine/storage.js';
import { checkAndUpdateStreak } from './engine/progress.js';
import { renderHome, attachHomeEvents } from './screens/home.js';
import { renderLesson, attachLessonEvents } from './screens/lesson.js';
import { renderResults, attachResultsEvents } from './screens/results.js';
import { renderCognates, attachCognatesEvents } from './screens/cognates.js';
import { renderProfile, attachProfileEvents } from './screens/profile.js';
import { renderSettings, attachSettingsEvents } from './screens/settings.js';
import { renderPractice, attachPracticeEvents } from './screens/practice.js';

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
    }
  });
}

// --- Boot ---
function boot() {
  applyTheme();
  checkAndUpdateStreak();
  navigate('home');
  
  // Track session time
  const startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const minutes = Math.round((Date.now() - startTime) / 60000);
    if (minutes > 0) {
      const state = loadState();
      const today = new Date().toDateString();
      if (state.lastActiveDate === today) {
        updateState({ dailyMinutesToday: state.dailyMinutesToday + minutes });
      }
    }
  });
}

// --- Start ---
document.addEventListener('DOMContentLoaded', boot);

// --- Expose navigate globally for debugging ---
window.__navigate = navigate;
