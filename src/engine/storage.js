// ============================================
// Storage Engine — localStorage abstraction
// Multi-profil: un registru + o cheie de stare per utilizator.
// Fără autentificare — profilurile sunt locale acestui browser.
// ============================================

const REGISTRY_KEY = 'invatam_germana_users';
const LEGACY_KEY = 'invatam_germana';
const BACKUP_KEY = 'invatam_germana_backup_v1';

const userKey = (id) => `invatam_germana::${id}`;

const defaultState = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
  dailyGoalMinutes: 10,
  dailyMinutesToday: 0,
  dailyGoalCompleted: false,
  lessonsCompleted: {},    // { lessonId: { completed: true, stars: 3, bestScore: 95 } }
  exerciseHistory: [],      // for SRS: [{ word, lastReview, interval, easeFactor, nextReview }]
  wordsLearned: [],         // unique words the user has practiced correctly
  wordsMastered: [],        // words with interval > 21 days
  badges: [],               // earned badge IDs
  totalCorrect: 0,
  totalWrong: 0,
  totalLessonsCompleted: 0,
  totalAttempts: 0,         // every answer submission, correct or wrong
  totalMinutes: 0,          // lifetime active learning minutes
  theme: 'light',
  createdAt: null,
  mistakes: [],             // recent mistakes for practice hub
  activityLog: {},          // { 'AAAA-LL-ZZ': { minutes, xp, answers, correct, lessons } }
};

// --- Registry ---

function readRegistry() {
  try {
    const raw = localStorage.getItem(REGISTRY_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read user registry:', e);
  }
  return null;
}

function writeRegistry(registry) {
  try {
    localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
  } catch (e) {
    console.error('Failed to save user registry:', e);
  }
}

export function getRegistry() {
  let registry = readRegistry();
  if (registry) return registry;

  // Prima rulare: migrează starea veche (un singur progres global) într-un profil.
  registry = { version: 1, activeUserId: null, users: [] };
  const legacy = localStorage.getItem(LEGACY_KEY);
  if (legacy) {
    const user = {
      id: 'u_' + Date.now(),
      name: 'Profilul meu',
      avatar: '🙂',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
    localStorage.setItem(userKey(user.id), legacy);
    localStorage.setItem(BACKUP_KEY, legacy);
    localStorage.removeItem(LEGACY_KEY);
    registry.users.push(user);
    registry.activeUserId = user.id;
  }
  writeRegistry(registry);
  return registry;
}

export function getUsers() {
  return getRegistry().users;
}

export function getActiveUser() {
  const registry = getRegistry();
  return registry.users.find((u) => u.id === registry.activeUserId) || null;
}

export function createUser(name, avatar) {
  const registry = getRegistry();
  const user = {
    id: 'u_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    name: (name || 'Profil nou').trim().slice(0, 24),
    avatar: avatar || '🙂',
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  };
  registry.users.push(user);
  registry.activeUserId = user.id;
  writeRegistry(registry);
  saveState({ ...defaultState, createdAt: new Date().toISOString() });
  return user;
}

export function switchUser(id) {
  const registry = getRegistry();
  const user = registry.users.find((u) => u.id === id);
  if (!user) return null;
  registry.activeUserId = id;
  user.lastActiveAt = new Date().toISOString();
  writeRegistry(registry);
  return user;
}

export function renameUser(id, name) {
  const registry = getRegistry();
  const user = registry.users.find((u) => u.id === id);
  if (!user) return;
  user.name = (name || user.name).trim().slice(0, 24);
  writeRegistry(registry);
}

export function deleteUser(id) {
  const registry = getRegistry();
  registry.users = registry.users.filter((u) => u.id !== id);
  localStorage.removeItem(userKey(id));
  if (registry.activeUserId === id) {
    registry.activeUserId = registry.users.length ? registry.users[0].id : null;
  }
  writeRegistry(registry);
}

// Citește statistici de bază ale unui profil fără să schimbi userul activ
// (pentru cardurile din ecranul de profiluri).
export function peekUserState(id) {
  try {
    const raw = localStorage.getItem(userKey(id));
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to peek user state:', e);
  }
  return { ...defaultState };
}

// --- Export / import (backup sau mutat pe alt dispozitiv, fără server) ---

const EXPORT_APP = 'invatam-germana';

export function exportActiveProfile() {
  const user = getActiveUser();
  if (!user) return null;
  return {
    app: EXPORT_APP,
    version: 1,
    exportedAt: new Date().toISOString(),
    profile: { name: user.name, avatar: user.avatar },
    state: loadState(),
  };
}

// Importă mereu ca profil NOU (nu suprascrie nimic) și îl face activ.
// Aruncă Error cu mesaj pentru utilizator dacă fișierul nu e valid.
export function importProfile(data) {
  if (!data || data.app !== EXPORT_APP || typeof data.state !== 'object' || !data.state) {
    throw new Error('Fișierul nu este un export din Învățăm Germană.');
  }
  const base = { ...defaultState, ...data.state };
  for (const [k, v] of Object.entries(defaultState)) {
    if (Array.isArray(v) && !Array.isArray(base[k])) base[k] = v;
    if (typeof v === 'number' && typeof base[k] !== 'number') base[k] = v;
  }
  if (typeof base.lessonsCompleted !== 'object' || !base.lessonsCompleted) base.lessonsCompleted = {};
  // numele/avatarul ajung în HTML → fără caractere de markup
  const clean = (s, max) => String(s || '').replace(/[<>&"'`]/g, '').slice(0, max);
  const user = createUser(clean(data.profile?.name, 24) || 'Profil importat', clean(data.profile?.avatar, 8) || undefined);
  saveState(base);
  return user;
}

// --- Per-user state ---

function activeKey() {
  const registry = getRegistry();
  return registry.activeUserId ? userKey(registry.activeUserId) : null;
}

export function loadState() {
  try {
    const key = activeKey();
    if (!key) return { ...defaultState };
    const raw = localStorage.getItem(key);
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
    const key = activeKey();
    if (!key) return; // niciun profil activ — nu persista nimic
    localStorage.setItem(key, JSON.stringify(state));
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
  const key = activeKey();
  if (key) localStorage.removeItem(key);
  return loadState();
}
