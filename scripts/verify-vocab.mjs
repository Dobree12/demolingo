// ============================================
// Verificare vocabular — gard de corectitudine la build
// ============================================
// Extrage fiecare cuvânt/frază germană din lessons.js și sections.js și
// verifică existența în dicționarul curat (src/data/dictionary.js).
// O frază trece dacă forma normalizată există ca intrare SAU dacă fiecare
// token există. Eșuează build-ul la cuvinte necunoscute (typo-uri, cuvinte
// neverificate). Rulare: npm run verify

import { lessons } from '../src/data/lessons.js';
import { sections } from '../src/data/sections.js';
import { hasGermanEntry, dictionary } from '../src/data/dictionary.js';
import { normalizeGerman, normalizeRomanian } from '../src/utils/normalize.js';

const failures = [];
const checkedCount = { total: 0 };

// Setul de forme românești din dicționar — folosit ca să NU raportăm
// cuvintele românești citate în întrebări drept "germane necunoscute".
const romanianForms = new Set();
for (const entry of dictionary) {
  romanianForms.add(normalizeRomanian(entry.ro));
  if (entry.roDisplay) romanianForms.add(normalizeRomanian(entry.roDisplay));
}

function tokenLooksRomanian(token) {
  if (romanianForms.has(token)) return true;
  for (const ro of romanianForms) {
    // formă articulată: "copil" → "copilul", "vulpe" → "vulpea" etc.
    if (token.startsWith(ro) && token.length - ro.length <= 3) return true;
    if (ro.split(' ').includes(token)) return true;
  }
  return false;
}

function looksRomanian(text) {
  const norm = normalizeRomanian(text);
  if (romanianForms.has(norm)) return true;
  const tokens = norm.split(' ').filter(Boolean);
  return tokens.length > 0 && tokens.every(tokenLooksRomanian);
}

function germanPhrasePasses(phrase) {
  const norm = normalizeGerman(phrase);
  if (!norm) return true;
  if (hasGermanEntry(norm)) return true;
  // toate token-urile trebuie să existe (articolele sunt și ele intrări)
  const tokens = norm.split(' ').filter(Boolean);
  return tokens.length > 1 && tokens.every(t => hasGermanEntry(t));
}

function check(phrase, context) {
  checkedCount.total++;
  if (!germanPhrasePasses(phrase)) {
    failures.push(`[${context}] "${phrase}"`);
  }
}

function extractQuoted(text) {
  const out = [];
  const re = /"([^"]+)"|„([^"”]+)”/g;
  let m;
  while ((m = re.exec(text)) !== null) out.push(m[1] || m[2]);
  return out;
}

function checkExercise(ex, context) {
  switch (ex.type) {
    case 'translate_ro_de':
      check(ex.answer, `${context} › answer`);
      break;
    case 'translate_de_ro':
      check(ex.prompt, `${context} › prompt`);
      break;
    case 'listen':
      check(ex.word, `${context} › word`);
      check(ex.answer, `${context} › answer`);
      break;
    case 'speak':
      check(ex.word, `${context} › word`);
      break;
    case 'fillBlank': {
      const full = ex.sentence.replace(/_+/g, ex.answer);
      check(full, `${context} › sentence`);
      break;
    }
    case 'match':
      ex.pairs.forEach((p, i) => check(p[0], `${context} › pair #${i + 1}`));
      break;
    case 'picturePick':
      check(ex.wordDe, `${context} › wordDe`);
      ex.options.forEach((o, i) => check(o, `${context} › option #${i + 1}`));
      break;
    case 'wordBank':
      // answer/bank sunt românește; doar promptul e german
      check(ex.promptDe, `${context} › promptDe`);
      break;
    case 'multiChoice': {
      const correctIsGerman = germanPhrasePasses(ex.correct);
      if (correctIsGerman) {
        ex.options.forEach((o, i) => check(o, `${context} › option #${i + 1}`));
      } else {
        // întrebarea poate cita un cuvânt german: 'Ce înseamnă "neun"?'
        for (const quoted of extractQuoted(ex.question || '')) {
          if (looksRomanian(quoted)) continue;
          check(quoted, `${context} › question quote`);
        }
      }
      break;
    }
    case 'dialogue': {
      ex.lines.forEach((line, i) => {
        if (line.de) check(line.de, `${context} › line #${i + 1}`);
        if (line.answer) check(line.answer, `${context} › answer`);
      });
      (ex.bank || []).forEach((t, i) => check(t, `${context} › bank #${i + 1}`));
      (ex.options || []).forEach((o, i) => check(o, `${context} › option #${i + 1}`));
      break;
    }
  }
}

// --- Lecții clasice ---
for (const lesson of lessons) {
  for (const w of lesson.words || []) {
    check(w.de, `${lesson.id} › words`);
  }
  (lesson.exercises || []).forEach((ex, i) => {
    checkExercise(ex, `${lesson.id} › ex #${i + 1} (${ex.type})`);
  });
}

// --- Secțiuni ---
for (const section of sections) {
  for (const unit of section.units || []) {
    for (const w of unit.words || []) {
      check(w.de, `${section.id}/${unit.id} › words`);
    }
    (unit.exercises || []).forEach((ex, i) => {
      checkExercise(ex, `${section.id}/${unit.id} › ex #${i + 1} (${ex.type})`);
    });
  }
  for (const theme of section.themes || []) {
    for (const w of theme.words || []) {
      check(w.de, `${section.id}/${theme.id} › words`);
    }
  }
}

// --- Raport ---
if (failures.length > 0) {
  console.error(`\n❌ Verificare vocabular EȘUATĂ — ${failures.length} cuvinte negăsite în dicționar:\n`);
  for (const f of failures) console.error('  ' + f);
  console.error('\nAdaugă cuvintele în src/data/dictionary.js (verificate cu PONS/dexonline) sau corectează typo-ul.\n');
  process.exit(1);
} else {
  console.log(`✅ Vocabular verificat: ${checkedCount.total} verificări, toate cuvintele există în dicționar (${dictionary.length} intrări).`);
}
