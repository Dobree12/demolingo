// ============================================
// Banc de propoziții scurte — accent pe verbe (nivel A1)
// ============================================
// Continuarea „provocărilor", dar pe propoziții scurte în loc de cuvinte
// izolate. Fiecare propoziție germană e scrisă manual și verificată token cu
// token: TOATE cuvintele există deja în src/data/dictionary.js, deci trece de
// scripts/verify-vocab.mjs (o frază trece dacă fiecare token e o intrare).
// Gramatica e ținută deliberat simplă și corectă: predicate cu „ist/sein",
// „haben", verbe la persoana I/II și construcția modală „ich mochte + infinitiv"
// (infinitivul la final, ca în germană). Traducerile RO sunt scrise de mână ca
// să fie naturale (acordul adjectivelor etc.).
//
// Generarea exercițiilor e determinist-seeded (vezi makeRng din generator.js),
// la fel ca restul conținutului: ce validează build-ul == ce rulează aplicația.

import { makeRng } from './generator.js';

// Câmpuri per propoziție:
//   de  — propoziția germană (toate cuvintele în dicționar)
//   ro  — traducerea românească (naturală, scrisă de mână)
//   v   — verbul de „ascuns" la fillBlank (accent pe verbe)
//   vh  — indiciu RO pentru verbul ascuns (opțional; altfel se folosește `ro`)
export const SENTENCE_GROUPS = [
  {
    key: 'v_sein', name: 'Verbul „a fi" (sein)', icon: '🟰',
    sentences: [
      { de: 'Ich bin mude.', ro: 'Sunt obosit.', v: 'bin', vh: 'sunt' },
      { de: 'Du bist jung.', ro: 'Tu ești tânăr.', v: 'bist', vh: 'ești' },
      { de: 'Ich bin gesund.', ro: 'Sunt sănătos.', v: 'bin', vh: 'sunt' },
      { de: 'Du bist stark.', ro: 'Tu ești puternic.', v: 'bist', vh: 'ești' },
      { de: 'Ich bin glucklich.', ro: 'Sunt fericit.', v: 'bin', vh: 'sunt' },
      { de: 'Ich bin Student.', ro: 'Eu sunt student.', v: 'bin', vh: 'sunt' },
      { de: 'Du bist mein Freund.', ro: 'Tu ești prietenul meu.', v: 'bist', vh: 'ești' },
      { de: 'Das Kind ist mude.', ro: 'Copilul este obosit.', v: 'ist', vh: 'este' },
    ],
  },
  {
    key: 'v_haben', name: 'Verbul „a avea" (haben)', icon: '📦',
    sentences: [
      { de: 'Ich habe einen Hund.', ro: 'Eu am un câine.', v: 'habe', vh: 'am' },
      { de: 'Ich habe eine Katze.', ro: 'Eu am o pisică.', v: 'habe', vh: 'am' },
      { de: 'Ich habe einen Bruder.', ro: 'Eu am un frate.', v: 'habe', vh: 'am' },
      { de: 'Ich habe eine Schwester.', ro: 'Eu am o soră.', v: 'habe', vh: 'am' },
      { de: 'Ich habe Zeit.', ro: 'Am timp.', v: 'habe', vh: 'am' },
      { de: 'Ich habe einen Apfel.', ro: 'Am un măr.', v: 'habe', vh: 'am' },
    ],
  },
  {
    key: 'v_essentrinken', name: 'A mânca și a bea', icon: '🍴',
    sentences: [
      { de: 'Ich esse Brot.', ro: 'Eu mănânc pâine.', v: 'esse', vh: 'mănânc' },
      { de: 'Ich esse einen Apfel.', ro: 'Mănânc un măr.', v: 'esse', vh: 'mănânc' },
      { de: 'Ich esse Kase.', ro: 'Mănânc brânză.', v: 'esse', vh: 'mănânc' },
      { de: 'Ich trinke Wasser.', ro: 'Eu beau apă.', v: 'trinke', vh: 'beau' },
      { de: 'Ich trinke Kaffee.', ro: 'Beau cafea.', v: 'trinke', vh: 'beau' },
      { de: 'Du trinkst Tee.', ro: 'Tu bei ceai.', v: 'trinkst', vh: 'bei' },
      { de: 'Die Suppe schmeckt gut.', ro: 'Supa are gust bun.', v: 'schmeckt', vh: 'are gust' },
    ],
  },
  {
    key: 'v_mochte', name: 'Aș vrea să... (mochte)', icon: '💭',
    sentences: [
      { de: 'Ich mochte Wasser trinken.', ro: 'Aș vrea să beau apă.', v: 'trinken', vh: 'să beau' },
      { de: 'Ich mochte Kaffee trinken.', ro: 'Aș vrea să beau cafea.', v: 'trinken', vh: 'să beau' },
      { de: 'Ich mochte Brot essen.', ro: 'Aș vrea să mănânc pâine.', v: 'essen', vh: 'să mănânc' },
      { de: 'Ich mochte Deutsch lernen.', ro: 'Aș vrea să învăț germană.', v: 'lernen', vh: 'să învăț' },
      { de: 'Ich mochte schlafen.', ro: 'Aș vrea să dorm.', v: 'schlafen', vh: 'să dorm' },
      { de: 'Ich mochte Fussball spielen.', ro: 'Aș vrea să joc fotbal.', v: 'spielen', vh: 'să joc' },
      { de: 'Was mochtest du essen?', ro: 'Ce vrei să mănânci?', v: 'mochtest', vh: 'vrei' },
      { de: 'Was mochtest du trinken?', ro: 'Ce vrei să bei?', v: 'mochtest', vh: 'vrei' },
    ],
  },
  {
    key: 'v_kommen', name: 'A veni / a te prezenta', icon: '🚶',
    sentences: [
      { de: 'Ich komme aus Rumanien.', ro: 'Eu vin din România.', v: 'komme', vh: 'vin' },
      { de: 'Du kommst aus Deutschland.', ro: 'Tu vii din Germania.', v: 'kommst', vh: 'vii' },
      { de: 'Ich komme aus Osterreich.', ro: 'Eu vin din Austria.', v: 'komme', vh: 'vin' },
      { de: 'Woher kommst du?', ro: 'De unde vii?', v: 'kommst', vh: 'vii' },
      { de: 'Wie heisst du?', ro: 'Cum te cheamă?', v: 'heisst', vh: 'te cheamă' },
      { de: 'Ich heisse Anna.', ro: 'Mă numesc Anna.', v: 'heisse', vh: 'mă numesc' },
    ],
  },
  {
    key: 'd_descrieri', name: 'Descrieri scurte', icon: '🔎',
    sentences: [
      { de: 'Der Kaffee ist heiss.', ro: 'Cafeaua este fierbinte.', v: 'ist', vh: 'este' },
      { de: 'Das Wasser ist kalt.', ro: 'Apa este rece.', v: 'ist', vh: 'este' },
      { de: 'Der Apfel ist rot.', ro: 'Mărul este roșu.', v: 'ist', vh: 'este' },
      { de: 'Die Sonne ist gelb.', ro: 'Soarele este galben.', v: 'ist', vh: 'este' },
      { de: 'Der Berg ist hoch.', ro: 'Muntele este înalt.', v: 'ist', vh: 'este' },
      { de: 'Das Auto ist schnell.', ro: 'Mașina este rapidă.', v: 'ist', vh: 'este' },
      { de: 'Die Blume ist schon.', ro: 'Floarea este frumoasă.', v: 'ist', vh: 'este' },
      { de: 'Das Haus ist gross.', ro: 'Casa este mare.', v: 'ist', vh: 'este' },
    ],
  },
  {
    key: 'q_intrebari', name: 'Întrebări uzuale', icon: '❓',
    sentences: [
      { de: 'Wie geht es dir?', ro: 'Ce mai faci?', v: 'geht', vh: 'merge / faci' },
      { de: 'Wie heisst du?', ro: 'Cum te cheamă?', v: 'heisst', vh: 'te cheamă' },
      { de: 'Woher kommst du?', ro: 'De unde vii?', v: 'kommst', vh: 'vii' },
      { de: 'Was mochtest du trinken?', ro: 'Ce vrei să bei?', v: 'mochtest', vh: 'vrei' },
      { de: 'Was mochtest du essen?', ro: 'Ce vrei să mănânci?', v: 'mochtest', vh: 'vrei' },
    ],
  },
  {
    key: 'v_machen', name: 'A învăța și a face', icon: '📚',
    sentences: [
      { de: 'Ich lerne Deutsch.', ro: 'Eu învăț germană.', v: 'lerne', vh: 'învăț' },
      { de: 'Das Kind spielt Fussball.', ro: 'Copilul joacă fotbal.', v: 'spielt', vh: 'joacă' },
      { de: 'Du mochtest Deutsch lernen.', ro: 'Tu ai vrea să înveți germană.', v: 'lernen', vh: 'să înveți' },
      { de: 'Ich mochte arbeiten.', ro: 'Aș vrea să muncesc.', v: 'arbeiten', vh: 'să muncesc' },
      { de: 'Ich mochte lesen.', ro: 'Aș vrea să citesc.', v: 'lesen', vh: 'să citesc' },
    ],
  },
  {
    key: 'w_vreme', name: 'Vremea (es gibt)', icon: '🌦️',
    sentences: [
      { de: 'Es gibt Schnee.', ro: 'Este zăpadă.', v: 'gibt', vh: 'există / dă' },
      { de: 'Es gibt Regen.', ro: 'Este ploaie.', v: 'gibt', vh: 'există / dă' },
      { de: 'Es gibt Wind.', ro: 'Este vânt.', v: 'gibt', vh: 'există / dă' },
      { de: 'Es gibt Nebel.', ro: 'Este ceață.', v: 'gibt', vh: 'există / dă' },
      { de: 'Der Schnee ist kalt.', ro: 'Zăpada este rece.', v: 'ist', vh: 'este' },
      { de: 'Die Sonne ist warm.', ro: 'Soarele este cald.', v: 'ist', vh: 'este' },
    ],
  },
  {
    key: 'v_infinitiv', name: 'Verbe la infinitiv', icon: '🔁',
    sentences: [
      { de: 'Ich mochte essen.', ro: 'Aș vrea să mănânc.', v: 'essen', vh: 'să mănânc' },
      { de: 'Ich mochte trinken.', ro: 'Aș vrea să beau.', v: 'trinken', vh: 'să beau' },
      { de: 'Ich mochte schlafen.', ro: 'Aș vrea să dorm.', v: 'schlafen', vh: 'să dorm' },
      { de: 'Ich mochte lernen.', ro: 'Aș vrea să învăț.', v: 'lernen', vh: 'să învăț' },
      { de: 'Ich mochte arbeiten.', ro: 'Aș vrea să muncesc.', v: 'arbeiten', vh: 'să muncesc' },
      { de: 'Ich mochte spielen.', ro: 'Aș vrea să mă joc.', v: 'spielen', vh: 'să mă joc' },
      { de: 'Ich mochte lesen.', ro: 'Aș vrea să citesc.', v: 'lesen', vh: 'să citesc' },
      { de: 'Ich mochte schreiben.', ro: 'Aș vrea să scriu.', v: 'schreiben', vh: 'să scriu' },
      { de: 'Ich mochte gehen.', ro: 'Aș vrea să merg.', v: 'gehen', vh: 'să merg' },
      { de: 'Ich mochte fahren.', ro: 'Aș vrea să conduc.', v: 'fahren', vh: 'să conduc' },
    ],
  },
];

// Distractori RO pentru wordBank (nu sunt verificați de verify-vocab — doar
// promptul german al exercițiului e validat).
const RO_FILLERS = ['și', 'un', 'este', 'foarte', 'bine', 'aici', 'mâine', 'azi', 'cu', 'la', 'mereu', 'acolo'];

function shuffle(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Cuvinte (fără punctuație) dintr-o frază — pentru wordBank.
function words(text) {
  return text.replace(/[.,!?;:]/g, '').split(/\s+/).filter(Boolean);
}

// Ascunde verbul `v` din propoziția germană (primul cuvânt-întreg care se
// potrivește), pentru fillBlank.
function blankVerb(de, v) {
  return de.replace(new RegExp(`(^|\\s)${v}(?=\\s|[.,!?]|$)`), `$1_____`);
}

// --- Constructori de exerciții pe propoziție ---
const SENTENCE_BUILDERS = {
  translate_de_ro: (s) => ({ type: 'translate_de_ro', prompt: s.de, answer: s.ro }),
  translate_ro_de: (s) => ({ type: 'translate_ro_de', prompt: s.ro, answer: s.de }),
  listen: (s) => ({ type: 'listen', word: s.de, answer: s.de }),
  speak: (s) => ({ type: 'speak', word: s.de, translation: s.ro }),
  fillBlank: (s) => ({ type: 'fillBlank', sentence: blankVerb(s.de, s.v), answer: s.v, hint: s.vh || s.ro }),
  wordBank: (s, rnd) => {
    const answerWords = words(s.ro);
    const distractors = shuffle(RO_FILLERS.filter(w => !answerWords.includes(w)), rnd).slice(0, 2);
    return {
      type: 'wordBank',
      promptDe: s.de,
      answer: s.ro,
      bank: shuffle([...answerWords, ...distractors], rnd),
    };
  },
};

// Ordine de tipuri cu accent pe propoziții/verbe (fillBlank ascunde verbul).
const SENTENCE_TYPES = [
  'translate_de_ro', 'fillBlank', 'wordBank', 'translate_ro_de', 'listen', 'speak',
];

// Generează `count` exerciții dintr-un set de propoziții, determinist pe `seed`.
export function generateSentenceExercises({ sentences, count, seed }) {
  const rnd = makeRng(seed);
  const typeOrder = shuffle(SENTENCE_TYPES, rnd);
  const order = shuffle(sentences, rnd);
  const out = [];
  const seen = new Set();
  let guard = 0;
  // La fiecare pas rotim ȘI tipul ȘI propoziția, ca să obținem un mix de tipuri
  // (lungimile diferite — 6 tipuri vs N propoziții — dau perechi variate).
  while (out.length < count && guard < count * 8) {
    const k = guard;
    guard++;
    const typeName = typeOrder[k % typeOrder.length];
    const s = order[k % order.length];
    const key = `${typeName}:${s.de}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(SENTENCE_BUILDERS[typeName](s, rnd));
  }
  return out;
}
