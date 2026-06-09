// ============================================
// Hearts Engine — Friendly hearts system (no paywall)
// ============================================

import { loadState, updateState } from './storage.js';

const MAX_HEARTS = 5;

export function getHearts() {
  return loadState().hearts;
}

export function loseHeart() {
  const state = loadState();
  const newHearts = Math.max(0, state.hearts - 1);
  updateState({ hearts: newHearts });
  return newHearts;
}

export function refillHearts() {
  updateState({ hearts: MAX_HEARTS });
  return MAX_HEARTS;
}

export function hasHearts() {
  return loadState().hearts > 0;
}

export function getMaxHearts() {
  return MAX_HEARTS;
}

// Called at lesson start — always refill to full
export function startLessonHearts() {
  refillHearts();
  return MAX_HEARTS;
}
