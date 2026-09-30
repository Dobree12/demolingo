// ============================================
// Sincronizare cu serverul (api/progress.php) — un singur utilizator
// ============================================
// Se activează DOAR pe calculatorul cursantului (Setări → Sincronizare), cu
// cheia de scriere. Starea rămâne locală (merge și offline); o copie se
// trimite după fiecare lecție și periodic cât timp aplicația e deschisă.
// Setările stau într-o cheie globală, legate de profilul care a fost activ la
// activare — celelalte profiluri de pe același calculator nu se trimit.

import { loadState, saveState, getActiveUser } from './storage.js';

const SYNC_KEY = 'invatam_germana_sync';
const API = '/api/progress.php';
const INTERVAL_MS = 3 * 60 * 1000;

function readSettings() {
  try {
    return JSON.parse(localStorage.getItem(SYNC_KEY)) || null;
  } catch {
    return null;
  }
}

function writeSettings(s) {
  try {
    if (s) localStorage.setItem(SYNC_KEY, JSON.stringify(s));
    else localStorage.removeItem(SYNC_KEY);
  } catch (e) {
    console.error('sync settings:', e);
  }
}

export function getSyncStatus() {
  return readSettings();
}

function patchSettings(patch) {
  const s = readSettings();
  if (s) writeSettings({ ...s, ...patch });
}

// Sincronizarea se aplică doar profilului pentru care a fost activată
function activeSettings() {
  const s = readSettings();
  const user = getActiveUser();
  if (!s?.key || !user || user.id !== s.profileId) return null;
  return { s, user };
}

export async function fetchServerState(key) {
  const res = await fetch(API, { headers: { 'X-Key': key }, cache: 'no-store' });
  if (res.status === 404) return null;
  if (res.status === 403) throw new Error('Cheie greșită.');
  if (!res.ok) throw new Error(`Serverul a răspuns ${res.status}.`);
  return res.json();
}

async function postState(key, user, state, force = false) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, force, profile: { name: user.name, avatar: user.avatar }, state }),
    keepalive: true,
  });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

let lastPushed = '';
let inFlight = null;

// Trimite starea dacă s-a schimbat de la ultima trimitere. Nu aruncă niciodată.
export function pushNow({ force = false } = {}) {
  const ctx = activeSettings();
  if (!ctx) return Promise.resolve(false);
  const state = loadState();
  const snapshot = JSON.stringify(state);
  if (!force && snapshot === lastPushed) return Promise.resolve(true);
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const { status, body } = await postState(ctx.s.key, ctx.user, state, force);
      if (status === 200) {
        lastPushed = snapshot;
        patchSettings({ lastSyncAt: new Date().toISOString(), lastError: null, conflict: null });
        return true;
      }
      if (status === 409) {
        patchSettings({ lastError: 'regression', conflict: body.server || {} });
      } else {
        patchSettings({ lastError: body.error || `http_${status}` });
      }
      return false;
    } catch {
      patchSettings({ lastError: 'offline' });
      return false;
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

// Activare pe calculatorul cursantului. Dacă serverul are deja mai mult
// progres, întoarce { needsChoice } ca UI-ul să întrebe ce păstrăm.
export async function enableSync(key) {
  const user = getActiveUser();
  if (!user) throw new Error('Alege mai întâi un profil.');
  const server = await fetchServerState(key); // aruncă la cheie greșită
  writeSettings({ key, profileId: user.id, enabledAt: new Date().toISOString() });
  const local = loadState();
  const serverAttempts = server?.state?.totalAttempts || 0;
  if (server && serverAttempts > (local.totalAttempts || 0)) {
    return { needsChoice: true, server };
  }
  const ok = await pushNow({ force: false });
  return { needsChoice: false, ok };
}

export function disableSync() {
  writeSettings(null);
  lastPushed = '';
}

// Înlocuiește starea locală cu cea de pe server (după confirmare în UI)
export async function restoreFromServer() {
  const ctx = activeSettings();
  if (!ctx) throw new Error('Sincronizarea nu e activă pentru acest profil.');
  const server = await fetchServerState(ctx.s.key);
  if (!server?.state) throw new Error('Pe server nu există progres salvat.');
  saveState(server.state);
  lastPushed = JSON.stringify(loadState());
  patchSettings({ lastSyncAt: new Date().toISOString(), lastError: null, conflict: null });
  return server;
}

let started = false;

export function initSync() {
  if (started) return;
  started = true;
  setInterval(() => { pushNow(); }, INTERVAL_MS);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') pushNow();
  });
  window.addEventListener('online', () => pushNow());
  // la pornire: trimite ce s-a adunat offline
  setTimeout(() => pushNow(), 5000);
}
