// ============================================
// Generator determinist de exerciții
// ============================================
// Produce exerciții variate dintr-un pool de cuvinte {de, ro, article?}.
// IMPORTANT: folosește DOAR cuvinte care există deja în dicționar, ca să
// treacă de scripts/verify-vocab.mjs. Generarea e determinist-seeded pe un
// `seed` (de obicei id-ul unității), deci ce validează build-ul == ce rulează
// aplicația, iar conținutul nu se reamestecă la fiecare randare.

import { hasEmoji } from './wordAssets.js';
import { hasGermanEntry, findByDe } from './dictionary.js';

// Etichete (emoji + română) pentru coșurile din sortCategories, pe id-ul de
// categorie din dicționar. Categoriile fără etichetă tot pot apărea (label = id).
const CATEGORY_LABELS = {
  salutari: '👋 Salutări', expresii: '💬 Expresii', adjective: '📏 Adjective',
  numere: '🔢 Numere', natura: '🌳 Natură', locuri: '📍 Locuri', corp: '🧍 Corp',
  animale: '🐾 Animale', timp: '⏰ Timp', luni: '📅 Luni', casa: '🏠 Casă',
  haine: '👕 Haine', familie: '👪 Familie', culori: '🎨 Culori', vreme: '🌤️ Vreme',
  zile: '📆 Zile', meserii: '💼 Meserii', bauturi: '🥤 Băuturi',
  transport: '🚗 Transport', tari: '🌍 Țări', mancare: '🍎 Mâncare', verbe: '🏃 Verbe',
};

// --- RNG seeded (fnv1a + mulberry32) ---
function fnv1a(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed) {
  return mulberry32(fnv1a(String(seed)));
}

function shuffle(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample(arr, n, rnd) {
  return shuffle(arr, rnd).slice(0, n);
}

// Forma afișată germană (cu articol pentru substantive)
function displayDe(w) {
  return w.article ? `${w.article} ${w.de}` : w.de;
}

// Distractori de pe aceeași „parte" (ro sau de), evitând duplicate de sens
function distractors(word, pool, key, n, rnd) {
  const seen = new Set([word[key]]);
  const out = [];
  for (const w of shuffle(pool, rnd)) {
    if (seen.has(w[key])) continue;
    seen.add(w[key]);
    out.push(w);
    if (out.length >= n) break;
  }
  return out;
}

// --- Constructori de exerciții ---
// Fiecare întoarce un exercițiu valid sau null dacă nu se poate construi.

function mcDeRo(word, pool, rnd) {
  const d = distractors(word, pool, 'ro', 3, rnd);
  if (d.length < 3) return null;
  return {
    type: 'multiChoice',
    question: `Ce înseamnă "${word.de}"?`,
    correct: word.ro,
    options: shuffle([word.ro, ...d.map(w => w.ro)], rnd),
  };
}

function mcRoDe(word, pool, rnd) {
  const d = distractors(word, pool, 'de', 3, rnd);
  if (d.length < 3) return null;
  const correct = displayDe(word);
  return {
    type: 'multiChoice',
    question: `Cum se spune "${word.ro}" în germană?`,
    correct,
    options: shuffle([correct, ...d.map(displayDe)], rnd),
  };
}

function translateDeRo(word, _pool, _rnd) {
  return { type: 'translate_de_ro', prompt: displayDe(word), answer: word.ro };
}

function translateRoDe(word, _pool, _rnd) {
  return { type: 'translate_ro_de', prompt: word.ro, answer: displayDe(word) };
}

function listen(word) {
  const w = displayDe(word);
  return { type: 'listen', word: w, answer: w };
}

function speak(word) {
  return { type: 'speak', word: displayDe(word), translation: word.ro };
}

function match(word, pool, rnd) {
  const others = distractors(word, pool, 'de', 3, rnd);
  if (others.length < 3) return null;
  const four = shuffle([word, ...others], rnd);
  return {
    type: 'match',
    pairs: four.map(w => [displayDe(w), w.ro]),
  };
}

function picturePick(word, pool, rnd) {
  if (!hasEmoji(word.de)) return null;
  const withEmoji = pool.filter(w => w.de !== word.de && hasEmoji(w.de));
  const d = sample(withEmoji, 2, rnd);
  if (d.length < 2) return null;
  return {
    type: 'picturePick',
    wordDe: word.de,
    correct: word.de,
    options: shuffle([word.de, ...d.map(w => w.de)], rnd),
  };
}

// Auzi cuvântul german (TTS), alegi sensul românesc — fără tastare.
function listenChoice(word, pool, rnd) {
  const d = distractors(word, pool, 'ro', 3, rnd);
  if (d.length < 3) return null;
  return {
    type: 'listenChoice',
    word: displayDe(word),
    correct: word.ro,
    options: shuffle([word.ro, ...d.map(w => w.ro)], rnd),
  };
}

// „<cuvânt german> = <traducere>?" → Adevărat / Fals (jumătate din cazuri false).
function trueFalse(word, pool, rnd) {
  const makeTrue = rnd() < 0.5;
  if (makeTrue) {
    return { type: 'trueFalse', de: displayDe(word), ro: word.ro, correct: word.ro, isTrue: true };
  }
  const d = distractors(word, pool, 'ro', 1, rnd);
  if (!d.length) return null;
  return { type: 'trueFalse', de: displayDe(word), ro: d[0].ro, correct: word.ro, isTrue: false };
}

// Sortare pe 2 categorii — grupează cuvintele din pool după categoria lor din
// dicționar și alege 2 categorii cu suficiente cuvinte. Ignoră `word` (produce
// un set „batch"); varietatea vine din starea rnd.
function sortCategories(_word, pool, rnd) {
  const byCat = new Map();
  for (const w of pool) {
    const cat = findByDe(w.de)?.category;
    if (!cat || cat === 'functionale') continue; // funcționalele nu se sortează intuitiv
    if (!byCat.has(cat)) byCat.set(cat, []);
    byCat.get(cat).push(w);
  }
  const eligible = shuffle([...byCat.keys()].filter(c => byCat.get(c).length >= 2), rnd);
  if (eligible.length < 2) return null;
  const chosen = eligible.slice(0, 2);
  const categories = chosen.map(c => ({ id: c, label: CATEGORY_LABELS[c] || c }));
  const items = [];
  for (const c of chosen) {
    for (const w of sample(byCat.get(c), 3, rnd)) items.push({ de: displayDe(w), cat: c });
  }
  if (items.length < 4) return null;
  return { type: 'sortCategories', categories, items: shuffle(items, rnd) };
}

const BUILDERS = {
  mcDeRo,
  mcRoDe,
  translateDeRo,
  translateRoDe,
  listen,
  speak,
  match,
  picturePick,
  listenChoice,
  trueFalse,
  sortCategories,
};

// Seturi de tipuri pe nivel de dificultate (pentru seriile de antrenament)
export const TYPE_SETS = {
  easy: ['picturePick', 'mcDeRo', 'mcRoDe', 'match', 'listenChoice', 'trueFalse'],
  medium: ['mcDeRo', 'mcRoDe', 'translateDeRo', 'match', 'listen', 'listenChoice', 'trueFalse', 'sortCategories'],
  hard: ['translateRoDe', 'translateDeRo', 'listen', 'speak', 'match', 'mcRoDe', 'trueFalse', 'sortCategories'],
};

// Generează `count` exerciții din `words`, cu distractori din `pool`.
// `types` = listă de nume din BUILDERS; se rotește prin ele.
export function generateExercises({ words, pool, count, seed, types }) {
  const rnd = makeRng(seed);
  const distractorPool = pool && pool.length >= 4 ? pool : words;
  const typeOrder = shuffle(types, rnd);
  const wordOrder = shuffle(words, rnd);
  const out = [];

  let wi = 0;
  let ti = 0;
  let guard = 0;
  while (out.length < count && guard < count * 6) {
    guard++;
    const typeName = typeOrder[ti % typeOrder.length];
    ti++;
    const word = wordOrder[wi % wordOrder.length];
    wi++;
    const build = BUILDERS[typeName];
    let ex = build(word, distractorPool, rnd);
    // fallback robust: dacă tipul nu se poate construi (ex. fără emoji), încearcă mcDeRo
    if (!ex) ex = mcDeRo(word, distractorPool, rnd);
    if (ex) out.push(ex);
  }
  return out;
}

// Tipuri folosite pentru a „umfla" lecțiile existente la 10x volum.
const AUGMENT_TYPES = [
  'mcDeRo', 'mcRoDe', 'translateDeRo', 'translateRoDe',
  'listen', 'speak', 'match', 'picturePick',
  'listenChoice', 'trueFalse', 'sortCategories',
];

// Extinde lista de exerciții autoreate până la ~factor× volum, adăugând
// exerciții generate din cuvintele unității. Folosește doar cuvinte care
// există în dicționar (altfel ar pica verify-vocab). Determinist pe `seed`.
export function augmentExercises(baseExercises, words, factor, seed) {
  const valid = (words || [])
    .map(w => ({ de: w.de, ro: w.ro, article: w.article }))
    .filter(w => w.de && w.ro && hasGermanEntry(w.de));
  if (valid.length < 4) return baseExercises;
  const target = Math.round(baseExercises.length * factor);
  const need = target - baseExercises.length;
  if (need <= 0) return baseExercises;
  const generated = generateExercises({
    words: valid,
    pool: valid,
    count: need,
    seed: `aug:${seed}`,
    types: AUGMENT_TYPES,
  }).map(ex => ({ ...ex, gen: true })); // marcaj: exercițiu generat (vs autoreat)
  return baseExercises.concat(generated);
}
