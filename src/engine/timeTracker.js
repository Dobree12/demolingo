// ============================================
// Time Tracker — minute de învățare activă
// ============================================
// Heartbeat: la fiecare 30s adaugă 0.5 min DOAR dacă tab-ul e vizibil
// și a existat interacțiune recentă. Un tab uitat deschis nu contează.

import { loadState, updateState } from './storage.js';
import { updateDailyTime } from './progress.js';

const TICK_MS = 30_000;          // verificare la 30 de secunde
const IDLE_LIMIT_MS = 90_000;    // fără interacțiune 90s = inactiv
const FLUSH_EVERY_TICKS = 4;     // scrie în state la ~2 minute

let lastInteraction = Date.now();
let pendingMinutes = 0;
let ticksSinceFlush = 0;
let started = false;

function markInteraction() {
  lastInteraction = Date.now();
}

export function flushTime() {
  if (pendingMinutes <= 0) return;
  const state = loadState();
  updateState({ totalMinutes: (state.totalMinutes || 0) + pendingMinutes });
  updateDailyTime(pendingMinutes);
  pendingMinutes = 0;
  ticksSinceFlush = 0;
}

export function initTimeTracker() {
  if (started) return;
  started = true;

  document.addEventListener('pointerdown', markInteraction, { passive: true });
  document.addEventListener('keydown', markInteraction, { passive: true });

  setInterval(() => {
    const active =
      document.visibilityState === 'visible' &&
      Date.now() - lastInteraction < IDLE_LIMIT_MS;
    if (!active) return;
    pendingMinutes += 0.5;
    ticksSinceFlush++;
    if (ticksSinceFlush >= FLUSH_EVERY_TICKS) flushTime();
  }, TICK_MS);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushTime();
  });
  window.addEventListener('pagehide', flushTime);
}
