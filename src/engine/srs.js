// ============================================
// SRS Engine — SM-2 Spaced Repetition Algorithm
// ============================================

import { loadState, updateState } from './storage.js';

/**
 * SM-2 Algorithm implementation for word review scheduling
 * 
 * Quality ratings:
 * 0 - Complete blackout (no idea)
 * 1 - Incorrect, but remembered after seeing answer
 * 2 - Incorrect, but answer felt familiar  
 * 3 - Correct with serious difficulty
 * 4 - Correct with some hesitation
 * 5 - Perfect, immediate recall
 */

const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;

export function calculateSM2(item, quality) {
  let { interval, repetitions, easeFactor } = item;
  
  easeFactor = easeFactor || DEFAULT_EASE_FACTOR;
  interval = interval || 0;
  repetitions = repetitions || 0;
  
  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect response — reset
    repetitions = 0;
    interval = 1;
  }
  
  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < MIN_EASE_FACTOR) easeFactor = MIN_EASE_FACTOR;
  
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);
  
  return {
    interval,
    repetitions,
    easeFactor: Math.round(easeFactor * 100) / 100,
    nextReview: nextReview.toISOString(),
    lastReview: new Date().toISOString(),
  };
}

export function getWordSRSData(word) {
  const state = loadState();
  return state.exerciseHistory.find(w => w.word === word);
}

export function updateWordSRS(word, quality) {
  const state = loadState();
  let existing = state.exerciseHistory.find(w => w.word === word);
  
  if (!existing) {
    existing = { 
      word, 
      interval: 0, 
      repetitions: 0, 
      easeFactor: DEFAULT_EASE_FACTOR,
      nextReview: new Date().toISOString(),
      lastReview: null,
    };
  }
  
  const updated = { word, ...calculateSM2(existing, quality) };
  
  const history = state.exerciseHistory.filter(w => w.word !== word);
  history.push(updated);
  
  // Update mastered words
  let wordsMastered = [...state.wordsMastered];
  if (updated.interval >= 21 && !wordsMastered.includes(word)) {
    wordsMastered.push(word);
  }
  
  updateState({ exerciseHistory: history, wordsMastered });
  
  return updated;
}

export function getWordsDueForReview() {
  const state = loadState();
  const now = new Date();
  
  return state.exerciseHistory.filter(w => {
    const nextReview = new Date(w.nextReview);
    return nextReview <= now;
  }).sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));
}

export function getReviewStats() {
  const state = loadState();
  const due = getWordsDueForReview();
  
  return {
    totalTracked: state.exerciseHistory.length,
    dueForReview: due.length,
    mastered: state.wordsMastered.length,
  };
}
