// ============================================
// Lecții suplimentare — 100 de provocări în serii de 10
// ============================================
// Continuă calea de lecții după cele 7 clasice. Fiecare nod e un mini-set de
// ~5–7 exerciții generate determinist din vocabularul verificat (vezi
// data/generator.js), cu dificultate crescătoare. Pe Home harta de lecții le
// afișează pe serii de 10, cu deblocare secvențială: 1 deschis + 9 cu lacăt,
// iar când termini cele 10 apare următoarea serie. Conținutul fiind generat
// din dicționar, trece prin verify-vocab ca orice lecție.

import { dictionary } from './dictionary.js';
import { generateExercises, TYPE_SETS } from './generator.js';

// Grupuri tematice (categorie din dicționar → pool de cuvinte pentru un nod)
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

function wordsForCat(cat) {
  return dictionary
    .filter(e => e.category === cat)
    .map(e => ({ de: e.de, ro: e.ro, article: e.article }));
}

const POOLS = Object.fromEntries(GROUPS.map(g => [g.cat, wordsForCat(g.cat)]));

const TOTAL = 100;
export const EXTRA_SERIES_SIZE = 10;

// Numărul primei lecții suplimentare (după cele 7 clasice), pentru numerotare
const CLASSIC_COUNT = 7;

function difficultyForSeries(series) {
  if (series <= 3) return 'easy';
  if (series <= 7) return 'medium';
  return 'hard';
}

function buildExtraLessons() {
  const out = [];
  for (let n = 1; n <= TOTAL; n++) {
    const series = Math.ceil(n / EXTRA_SERIES_SIZE);
    const group = GROUPS[(n - 1) % GROUPS.length];
    const level = difficultyForSeries(series);
    const words = POOLS[group.cat];
    const nextGroup = GROUPS[n % GROUPS.length];
    const pool = level === 'hard' ? words.concat(POOLS[nextGroup.cat]) : words;
    const count = level === 'easy' ? 5 : level === 'medium' ? 6 : 7;
    const id = `lp-${n}`;
    const exercises = generateExercises({
      words,
      pool,
      count,
      seed: id,
      types: TYPE_SETS[level],
    });
    out.push({
      id,
      title: `Lecția ${CLASSIC_COUNT + n}`,
      titleDe: group.name,
      icon: group.icon,
      description: `Seria ${series} · ${group.name}`,
      unit: CLASSIC_COUNT + n,
      extra: true,        // marcaj: lecție suplimentară (afișată pe serii)
      series,
      words: words.map(w => ({ de: w.de, ro: w.ro })),
      exercises,
    });
  }
  return out;
}

export const extraLessons = buildExtraLessons();
