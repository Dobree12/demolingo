// ============================================
// Storage Engine — localStorage abstraction
// ============================================

const STORAGE_KEY = 'invatam_germana';

const defaultState = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
  dailyGoalMinutes: 10,
  dailyMinutesToday: 0,
  dailyGoalCompleted: false,
  hearts: 5,
  heartsLastRefill: null,
  lessonsCompleted: {},    // { lessonId: { completed: true, stars: 3, bestScore: 95 } }
  exerciseHistory: [],      // for SRS: [{ word, lastReview, interval, easeFactor, nextReview }]
  wordsLearned: [],         // unique words the user has practiced correctly
  wordsMastered: [],        // words with interval > 21 days 
  badges: [],               // earned badge IDs
  totalCorrect: 0,
  totalWrong: 0,
  totalLessonsCompleted: 0,
  sessionStartTime: null,
  theme: 'light',
  createdAt: null,
  mistakes: [],             // recent mistakes for practice hub
};

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const fresh = { ...defaultState, createdAt: new Date().toISOString() };
      saveState(fresh);
      return fresh;
    }
    return { ...defaultState, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load state:', e);
    return { ...defaultState };
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

export function updateState(updates) {
  const state = loadState();
  const newState = { ...state, ...updates };
  saveState(newState);
  return newState;
}

export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  return loadState();
}
