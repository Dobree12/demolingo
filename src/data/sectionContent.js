// ============================================
// Conținut generat pentru Secțiuni — 100 unități / secțiune, pe serii de 10
// ============================================
// Trei seturi de câte 100 de unități, generate determinist din vocabularul și
// propozițiile verificate (vezi generator.js + sentenceBank.js), afișate pe
// serii de 10 cu deblocare secvențială (1 deschis + 9 cu lacăt). Tot conținutul
// folosește doar cuvinte/propoziții din dicționar → trece de verify-vocab.

import { dictionary } from './dictionary.js';
import { generateExercises, TYPE_SETS, makeRng } from './generator.js';
import { SENTENCE_GROUPS, generateSentenceExercises } from './sentenceBank.js';

// --- Grupuri de vocabular (categorie din dicționar) ---
const GROUPS = [
  { cat: 'numere', name: 'Numere', icon: '🔢' },
  { cat: 'culori', name: 'Culori', icon: '🎨' },
  { cat: 'animale', name: 'Animale', icon: '🐾' },
  { cat: 'mancare', name: 'Mâncare', icon: '🍽️' },
  { cat: 'bauturi', name: 'Băuturi', icon: '🥤' },
  { cat: 'corp', name: 'Corpul', icon: '🧍' },
  { cat: 'haine', name: 'Haine', icon: '👕' },
  { cat: 'casa', name: 'Casa', icon: '🏠' },
  { cat: 'natura', name: 'Natură', icon: '🌳' },
  { cat: 'transport', name: 'Transport', icon: '🚗' },
  { cat: 'locuri', name: 'Locuri', icon: '🏙️' },
  { cat: 'zile', name: 'Zilele săptămânii', icon: '📅' },
  { cat: 'luni', name: 'Lunile anului', icon: '🗓️' },
  { cat: 'vreme', name: 'Vreme', icon: '🌤️' },
  { cat: 'meserii', name: 'Meserii', icon: '💼' },
  { cat: 'familie', name: 'Familie', icon: '👨‍👩‍👧' },
  { cat: 'verbe', name: 'Verbe', icon: '🏃' },
  { cat: 'adjective', name: 'Adjective', icon: '✨' },
  { cat: 'timp', name: 'Timp', icon: '⏰' },
];

// Categorii „concrete" (au emoji) — pentru unitățile vizuale (picturePick)
const VISUAL_GROUPS = GROUPS.filter(g =>
  ['numere', 'culori', 'animale', 'mancare', 'bauturi', 'corp', 'haine',
   'casa', 'natura', 'transport', 'locuri', 'vreme', 'meserii', 'familie'].includes(g.cat));

function wordsForCat(cat) {
  return dictionary
    .filter(e => e.category === cat)
    .map(e => ({ de: e.de, ro: e.ro, article: e.article }));
}
const POOLS = Object.fromEntries(GROUPS.map(g => [g.cat, wordsForCat(g.cat)]));

const SERIES_SIZE = 10;
const seriesOf = n => Math.ceil(n / SERIES_SIZE);

// --- 100 unități de cuvinte uzuale (vizual/ușor) ---
export function buildVocabUnits(count, prefix) {
  const out = [];
  for (let n = 1; n <= count; n++) {
    const group = GROUPS[(n - 1) % GROUPS.length];
    const id = `${prefix}-${n}`;
    out.push({
      id,
      title: `${group.name} ${Math.ceil(n / GROUPS.length)}`,
      icon: group.icon,
      description: `Seria ${seriesOf(n)} · ${group.name}`,
      generated: true,
      words: POOLS[group.cat].map(w => ({ de: w.de, ro: w.ro })),
      exercises: generateExercises({
        words: POOLS[group.cat],
        pool: POOLS[group.cat],
        count: 5,
        seed: id,
        types: TYPE_SETS.easy,
      }),
    });
  }
  return out;
}

// --- 100 unități vizuale (picturePick prioritar) ---
const VISUAL_TYPES = ['picturePick', 'picturePick', 'match', 'mcDeRo', 'mcRoDe'];
export function buildVisualUnits(count, prefix) {
  const out = [];
  for (let n = 1; n <= count; n++) {
    const group = VISUAL_GROUPS[(n - 1) % VISUAL_GROUPS.length];
    const id = `${prefix}-${n}`;
    out.push({
      id,
      title: `${group.name} ${Math.ceil(n / VISUAL_GROUPS.length)}`,
      icon: group.icon,
      description: `Seria ${seriesOf(n)} · ${group.name}`,
      generated: true,
      words: POOLS[group.cat].map(w => ({ de: w.de, ro: w.ro })),
      exercises: generateExercises({
        words: POOLS[group.cat],
        pool: POOLS[group.cat],
        count: 5,
        seed: `vis:${id}`,
        types: VISUAL_TYPES,
      }),
    });
  }
  return out;
}

// --- Generator de dialoguri scurte (Q&A) -------------------------------------
// Replica lipsă (a doua bulă) e aleasă din variante germane verificate.
const D_ANSWERS = {
  feel: [
    { de: 'Mir geht es gut', ro: 'Mă simt bine' },
    { de: 'Ich bin mude', ro: 'Sunt obosit' },
    { de: 'Ich bin glucklich', ro: 'Sunt fericit' },
  ],
  origin: [
    { de: 'Ich komme aus Rumanien', ro: 'Vin din România' },
    { de: 'Ich komme aus Deutschland', ro: 'Vin din Germania' },
    { de: 'Ich komme aus Osterreich', ro: 'Vin din Austria' },
  ],
  drink: [
    { de: 'Ich mochte Kaffee trinken', ro: 'Aș vrea să beau cafea' },
    { de: 'Ich mochte Wasser trinken', ro: 'Aș vrea să beau apă' },
    { de: 'Ich trinke Tee', ro: 'Beau ceai' },
  ],
  eat: [
    { de: 'Ich mochte Brot essen', ro: 'Aș vrea să mănânc pâine' },
    { de: 'Ich esse einen Apfel', ro: 'Mănânc un măr' },
    { de: 'Ich esse Kase', ro: 'Mănânc brânză' },
  ],
  name: [
    { de: 'Ich heisse Anna', ro: 'Mă numesc Anna' },
  ],
};
const D_TEMPLATES = [
  { opener: { de: 'Wie geht es dir?', ro: 'Ce mai faci?' }, pool: 'feel', closer: { de: 'Das freut mich!', ro: 'Mă bucur!' } },
  { opener: { de: 'Woher kommst du?', ro: 'De unde vii?' }, pool: 'origin', closer: { de: 'Sehr schon!', ro: 'Foarte frumos!' } },
  { opener: { de: 'Was mochtest du trinken?', ro: 'Ce vrei să bei?' }, pool: 'drink', closer: { de: 'Gerne!', ro: 'Cu plăcere!' } },
  { opener: { de: 'Was mochtest du essen?', ro: 'Ce vrei să mănânci?' }, pool: 'eat', closer: { de: 'Sehr gut!', ro: 'Foarte bine!' } },
  { opener: { de: 'Wie heisst du?', ro: 'Cum te cheamă?' }, pool: 'name', closer: { de: 'Freut mich!', ro: 'Îmi pare bine!' } },
];
const ALL_ANSWERS = Object.values(D_ANSWERS).flat();
const CHAR_PAIRS = [
  [{ name: 'Anna', emoji: '👩' }, { name: 'Max', emoji: '🧑' }],
  [{ name: 'Elena', emoji: '👧' }, { name: 'Lukas', emoji: '🧑' }],
  [{ name: 'Maria', emoji: '👩' }, { name: 'Tom', emoji: '👦' }],
];

function rshuffle(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateDialogues({ count, seed }) {
  const rnd = makeRng(seed);
  const out = [];
  for (let i = 0; i < count; i++) {
    const t = D_TEMPLATES[Math.floor(rnd() * D_TEMPLATES.length)];
    const pool = D_ANSWERS[t.pool];
    const ans = pool[Math.floor(rnd() * pool.length)];
    const distract = rshuffle(ALL_ANSWERS.filter(a => a.de !== ans.de), rnd).slice(0, 2);
    const chars = CHAR_PAIRS[Math.floor(rnd() * CHAR_PAIRS.length)];
    out.push({
      type: 'dialogue',
      scene: t.opener.ro,
      characters: chars,
      lines: [
        { who: 0, de: t.opener.de, ro: t.opener.ro },
        { who: 1, blank: true, answer: ans.de, ro: ans.ro },
        { who: 0, de: t.closer.de, ro: t.closer.ro },
      ],
      mode: 'multiChoice',
      options: rshuffle([ans.de, ...distract.map(d => d.de)], rnd),
    });
  }
  return out;
}

// --- 100 unități de propoziții (dialoguri + exerciții pe frază) ---
export function buildSentenceUnits(count, prefix) {
  const out = [];
  for (let n = 1; n <= count; n++) {
    const group = SENTENCE_GROUPS[(n - 1) % SENTENCE_GROUPS.length];
    const id = `${prefix}-${n}`;
    const exercises = [
      ...generateDialogues({ count: 2, seed: `dlg:${id}` }),
      ...generateSentenceExercises({ sentences: group.sentences, count: 4, seed: id }),
    ];
    out.push({
      id,
      title: `${group.name}`,
      icon: group.icon,
      description: `Seria ${seriesOf(n)} · ${group.name}`,
      generated: true,
      words: group.sentences.map(s => ({ de: s.de, ro: s.ro })),
      exercises,
    });
  }
  return out;
}
