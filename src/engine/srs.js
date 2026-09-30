// ============================================
// SRS Engine — SM-2 Spaced Repetition Algorithm
// ============================================

import { loadState, updateState } from './storage.js';
import { dictionary, findByDe } from '../data/dictionary.js';
import { generateExercises } from '../data/generator.js';

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

// Cheia SRS = forma `de` din dicționar (fără articol), ca același cuvânt să
// aibă o singură intrare indiferent de tipul exercițiului. Exercițiile cu mai
// multe cuvinte (match, sortCategories) sau pe propoziții nu au cheie — pentru
// ele rămâne lista de greșeli.
export function srsKeyFor(exercise) {
  if (!exercise) return null;
  const candidates = [];
  switch (exercise.type) {
    case 'multiChoice': {
      // „Cum se spune "X" în germană?" → X e românesc (poate coincide cu un
      // cuvânt german, ex. „da"), deci cheia e răspunsul corect.
      const question = exercise.question || '';
      const quoted = /"([^"]+)"/.exec(question);
      if (quoted && !/^Cum (se )?spu/i.test(question)) candidates.push(quoted[1]);
      candidates.push(exercise.correct);
      break;
    }
    case 'translate_de_ro': candidates.push(exercise.prompt); break;
    case 'translate_ro_de': candidates.push(exercise.answer); break;
    case 'listen':
    case 'speak':
    case 'listenChoice': candidates.push(exercise.word); break;
    case 'trueFalse': candidates.push(exercise.de); break;
    case 'picturePick': candidates.push(exercise.wordDe); break;
    default: return null;
  }
  for (const c of candidates) {
    const entry = c ? findByDe(c) : null;
    if (entry) return entry.de;
  }
  return null;
}

// Istoricul vechi folosea chei amestecate (prompt românesc, propoziții...).
// Le aducem la forma canonică; ce nu e în dicționar se aruncă. Idempotent.
export function migrateSRSHistory() {
  const state = loadState();
  const byKey = new Map();
  let changed = false;
  for (const item of state.exerciseHistory) {
    const key = findByDe(item.word)?.de;
    if (key !== item.word) changed = true;
    if (!key) continue;
    const prev = byKey.get(key);
    if (!prev || (item.lastReview || '') > (prev.lastReview || '')) {
      if (prev) changed = true;
      byKey.set(key, { ...item, word: key });
    } else {
      changed = true;
    }
  }
  const mastered = [...new Set(state.wordsMastered.map(w => findByDe(w)?.de).filter(Boolean))];
  if (mastered.join('|') !== state.wordsMastered.join('|')) changed = true;
  if (changed) updateState({ exerciseHistory: [...byKey.values()], wordsMastered: mastered });
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

// Tipuri pe un singur cuvânt (fiecare exercițiu actualizează SRS-ul acelui cuvânt)
const REVIEW_TYPES = ['mcDeRo', 'mcRoDe', 'translateDeRo', 'translateRoDe', 'listen', 'listenChoice', 'trueFalse', 'picturePick'];
const REVIEW_MAX = 14;

// Sesiune de repetiție din cuvintele scadente (cele mai vechi primele).
// Distractorii vin din aceleași categorii, completate din tot dicționarul.
export function buildReviewExercises() {
  const words = getWordsDueForReview()
    .slice(0, REVIEW_MAX)
    .map(w => findByDe(w.word))
    .filter(Boolean)
    .map(e => ({ de: e.de, ro: e.ro, article: e.article, category: e.category }));
  if (!words.length) return [];
  const cats = new Set(words.map(w => w.category));
  const toWord = e => ({ de: e.de, ro: e.ro, article: e.article });
  let pool = dictionary.filter(e => cats.has(e.category)).map(toWord);
  if (pool.length < 8) pool = dictionary.filter(e => e.category !== 'functionale').map(toWord);
  return generateExercises({
    words: words.map(toWord),
    pool,
    count: Math.min(REVIEW_MAX, Math.max(words.length, 6)),
    seed: `review:${Date.now()}`,
    types: REVIEW_TYPES,
  });
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
