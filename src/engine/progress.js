// ============================================
// Progress Engine — XP, Levels, Streaks, Badges, Daily Goals
// ============================================

import { loadState, updateState } from './storage.js';

// --- XP & Levels ---
const XP_PER_CORRECT = 10;
const XP_BONUS_PERFECT = 50;
const XP_BONUS_LESSON_COMPLETE = 30;
const XP_BONUS_STREAK_3 = 5;   // bonus for 3 correct in a row

const LEVEL_THRESHOLDS = [
  0,     // Level 1
  100,   // Level 2
  250,   // Level 3
  500,   // Level 4
  850,   // Level 5
  1300,  // Level 6
  1900,  // Level 7
  2600,  // Level 8
  3500,  // Level 9
  4500,  // Level 10
  6000,  // Level 11
  8000,  // Level 12
  10500, // Level 13
  13500, // Level 14
  17000, // Level 15
];

const LEVEL_NAMES = [
  'Începător',        // 1
  'Începător',        // 2
  'Începător Avansat',// 3
  'Elementar',        // 4
  'Elementar',        // 5
  'Elementar Avansat',// 6
  'Intermediar',      // 7
  'Intermediar',      // 8
  'Intermediar Avansat', // 9
  'Avansat',          // 10
  'Avansat',          // 11
  'Expert',           // 12
  'Expert',           // 13
  'Maestru',          // 14
  'Maestru Suprem',   // 15
];

export function getLevelForXP(xp) {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
      break;
    }
  }
  return level;
}

export function getLevelName(level) {
  return LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)];
}

export function getXPForNextLevel(level) {
  if (level >= LEVEL_THRESHOLDS.length) return Infinity;
  return LEVEL_THRESHOLDS[level];
}

export function getXPProgress(xp, level) {
  const current = LEVEL_THRESHOLDS[level - 1] || 0;
  const next = LEVEL_THRESHOLDS[level] || current + 1000;
  return {
    current: xp - current,
    needed: next - current,
    percent: Math.min(100, ((xp - current) / (next - current)) * 100),
  };
}

export function addXP(amount) {
  const state = loadState();
  const oldLevel = state.level;
  const newXP = state.xp + amount;
  const newLevel = getLevelForXP(newXP);
  const leveledUp = newLevel > oldLevel;
  
  updateState({ xp: newXP, level: newLevel });
  
  return { xp: newXP, level: newLevel, leveledUp, xpGained: amount };
}

// --- Streak ---
export function checkAndUpdateStreak() {
  const state = loadState();
  const today = new Date().toDateString();
  const lastActive = state.lastActiveDate;
  
  if (lastActive === today) return state.streak;
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  let newStreak;
  if (lastActive === yesterday.toDateString()) {
    newStreak = state.streak + 1;
  } else if (!lastActive) {
    newStreak = 1;
  } else {
    newStreak = 1; // streak broken
  }
  
  updateState({ 
    streak: newStreak, 
    lastActiveDate: today,
    dailyMinutesToday: lastActive === today ? state.dailyMinutesToday : 0,
    dailyGoalCompleted: false,
  });
  
  return newStreak;
}

export function getStreak() {
  return loadState().streak;
}

// --- Daily Goal ---
export function updateDailyTime(minutes) {
  const state = loadState();
  const newMinutes = state.dailyMinutesToday + minutes;
  const completed = newMinutes >= state.dailyGoalMinutes;
  updateState({ 
    dailyMinutesToday: newMinutes, 
    dailyGoalCompleted: completed 
  });
  return { minutes: newMinutes, goal: state.dailyGoalMinutes, completed };
}

export function setDailyGoal(minutes) {
  updateState({ dailyGoalMinutes: minutes });
}

// --- Lesson Completion ---
export function completeLesson(lessonId, score, totalExercises) {
  const state = loadState();
  const stars = score >= 90 ? 3 : score >= 70 ? 2 : 1;
  const existing = state.lessonsCompleted[lessonId];
  const isNew = !existing || !existing.completed;
  
  const lessonsCompleted = {
    ...state.lessonsCompleted,
    [lessonId]: {
      completed: true,
      stars: Math.max(stars, existing?.stars || 0),
      bestScore: Math.max(score, existing?.bestScore || 0),
      completedAt: new Date().toISOString(),
    },
  };
  
  const totalLessonsCompleted = state.totalLessonsCompleted + (isNew ? 1 : 0);
  
  updateState({ lessonsCompleted, totalLessonsCompleted });
  
  // Add bonus XP
  let bonusXP = XP_BONUS_LESSON_COMPLETE;
  if (score === 100) bonusXP += XP_BONUS_PERFECT;
  const xpResult = addXP(bonusXP);
  
  // Check badges
  const newBadges = checkBadges();
  
  return { stars, score, bonusXP, xpResult, newBadges, isNew };
}

export function isLessonCompleted(lessonId) {
  const state = loadState();
  return state.lessonsCompleted[lessonId]?.completed || false;
}

export function isLessonUnlocked(lessonId, lessons) {
  if (lessonId === lessons[0]?.id) return true; // first lesson always unlocked
  const idx = lessons.findIndex(l => l.id === lessonId);
  if (idx <= 0) return true;
  return isLessonCompleted(lessons[idx - 1].id);
}

// --- Words ---
export function addWordLearned(word) {
  const state = loadState();
  if (!state.wordsLearned.includes(word)) {
    updateState({ wordsLearned: [...state.wordsLearned, word] });
  }
}

export function addMistake(mistake) {
  const state = loadState();
  const mistakes = [mistake, ...state.mistakes].slice(0, 50); // keep last 50
  updateState({ mistakes, totalWrong: state.totalWrong + 1 });
}

export function recordCorrect() {
  const state = loadState();
  updateState({ totalCorrect: state.totalCorrect + 1 });
}

// O „încercare" = orice verificare de răspuns, corectă sau greșită
export function recordAttempt() {
  const state = loadState();
  updateState({ totalAttempts: (state.totalAttempts || 0) + 1 });
}

// --- Badges ---
const BADGE_DEFINITIONS = [
  { id: 'first_lesson', icon: '🎓', name: 'Prima lecție', description: 'Ai completat prima ta lecție!', check: s => s.totalLessonsCompleted >= 1 },
  { id: 'streak_3', icon: '🔥', name: '3 zile la rând', description: 'Serie de 3 zile consecutive!', check: s => s.streak >= 3 },
  { id: 'streak_7', icon: '🔥', name: 'O săptămână!', description: 'Serie de 7 zile consecutive!', check: s => s.streak >= 7 },
  { id: 'streak_30', icon: '💎', name: 'O lună!', description: 'Serie de 30 de zile consecutive!', check: s => s.streak >= 30 },
  { id: 'words_10', icon: '📚', name: 'Primele 10 cuvinte', description: 'Ai învățat 10 cuvinte noi!', check: s => s.wordsLearned.length >= 10 },
  { id: 'words_50', icon: '📖', name: '50 de cuvinte', description: 'Ai învățat 50 de cuvinte!', check: s => s.wordsLearned.length >= 50 },
  { id: 'words_100', icon: '🏆', name: '100 de cuvinte', description: 'Ai învățat 100 de cuvinte! Ești un campion!', check: s => s.wordsLearned.length >= 100 },
  { id: 'xp_500', icon: '⭐', name: '500 XP', description: 'Ai acumulat 500 de puncte de experiență!', check: s => s.xp >= 500 },
  { id: 'xp_1000', icon: '🌟', name: '1000 XP', description: 'O mie de puncte XP! Incredibil!', check: s => s.xp >= 1000 },
  { id: 'perfect', icon: '💯', name: 'Perfecțiune', description: 'Ai terminat o lecție cu scor perfect!', check: s => Object.values(s.lessonsCompleted).some(l => l.bestScore === 100) },
  { id: 'lessons_5', icon: '🎯', name: '5 lecții complete', description: 'Ai terminat 5 lecții! Continui excelent!', check: s => s.totalLessonsCompleted >= 5 },
  { id: 'level_5', icon: '🏅', name: 'Nivel 5', description: 'Ai ajuns la nivelul 5!', check: s => s.level >= 5 },
];

export function checkBadges() {
  const state = loadState();
  const newBadges = [];
  
  for (const badge of BADGE_DEFINITIONS) {
    if (!state.badges.includes(badge.id) && badge.check(state)) {
      newBadges.push(badge);
    }
  }
  
  if (newBadges.length > 0) {
    updateState({ badges: [...state.badges, ...newBadges.map(b => b.id)] });
  }
  
  return newBadges;
}

export function getAllBadges() {
  const state = loadState();
  return BADGE_DEFINITIONS.map(b => ({
    ...b,
    earned: state.badges.includes(b.id),
  }));
}

export function getStats() {
  const state = loadState();
  return {
    xp: state.xp,
    level: state.level,
    levelName: getLevelName(state.level),
    streak: state.streak,
    wordsLearned: state.wordsLearned.length,
    totalCorrect: state.totalCorrect,
    totalWrong: state.totalWrong,
    accuracy: state.totalCorrect + state.totalWrong > 0 
      ? Math.round((state.totalCorrect / (state.totalCorrect + state.totalWrong)) * 100) 
      : 0,
    totalLessonsCompleted: state.totalLessonsCompleted,
    totalAttempts: state.totalAttempts || 0,
    totalMinutes: state.totalMinutes || 0,
    dailyMinutes: Math.round(state.dailyMinutesToday),
    dailyGoal: state.dailyGoalMinutes,
    dailyGoalCompleted: state.dailyGoalCompleted,
    xpProgress: getXPProgress(state.xp, state.level),
  };
}
