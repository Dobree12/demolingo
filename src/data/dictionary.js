// ============================================
// Dicționar RO–DE curat și verificat
// ============================================
// Fiecare intrare a fost verificată manual la curatare (iunie 2026) contra
// dicționarelor PONS (pons.com/traducere/germana-romana) și dexonline.ro.
// Convenție proiect: textul german e scris în ASCII (a/o/u/ss în loc de ä/ö/ü/ß);
// forma originală cu diacritice germane e în câmpul `original` unde diferă.
// Scriptul scripts/verify-vocab.mjs blochează build-ul dacă lecțiile folosesc
// cuvinte care nu există aici.

import { normalizeGerman, normalizeRomanian } from '../utils/normalize.js';

export const dictionary = [
  // --- Salutări ---
  { de: 'Hallo', ro: 'Bună', category: 'salutari' },
  { de: 'Guten Morgen', ro: 'Bună dimineața', category: 'salutari' },
  { de: 'Guten Tag', ro: 'Bună ziua', category: 'salutari' },
  { de: 'Guten Abend', ro: 'Bună seara', category: 'salutari' },
  { de: 'Gute Nacht', ro: 'Noapte bună', category: 'salutari' },
  { de: 'Tschuss', ro: 'Pa', original: 'Tschüss', category: 'salutari' },
  { de: 'Auf Wiedersehen', ro: 'La revedere', category: 'salutari' },
  { de: 'Danke', ro: 'Mulțumesc', category: 'salutari' },
  { de: 'Bitte', ro: 'Te rog', category: 'salutari' },
  { de: 'Ja', ro: 'Da', category: 'salutari' },
  { de: 'Nein', ro: 'Nu', category: 'salutari' },
  { de: 'Entschuldigung', ro: 'Scuze', category: 'salutari' },

  // --- Expresii uzuale ---
  { de: 'Freut mich', ro: 'Îmi pare bine', category: 'expresii' },
  { de: 'Wie heisst du?', ro: 'Cum te cheamă?', original: 'Wie heißt du?', category: 'expresii' },
  { de: 'Wie geht es dir?', ro: 'Ce mai faci?', category: 'expresii' },
  { de: 'Mir geht es gut', ro: 'Mă simt bine', category: 'expresii' },
  { de: 'Ich komme aus', ro: 'Vin din', category: 'expresii' },

  // --- Pronume și cuvinte funcționale ---
  { de: 'ich', ro: 'eu', category: 'functionale' },
  { de: 'du', ro: 'tu', category: 'functionale' },
  { de: 'Sie', ro: 'dumneavoastră', category: 'functionale' },
  { de: 'es', ro: 'el / ea (neutru)', category: 'functionale' },
  { de: 'mir', ro: 'mie / îmi', category: 'functionale' },
  { de: 'mich', ro: 'pe mine / mă', category: 'functionale' },
  { de: 'dir', ro: 'ție / îți', category: 'functionale' },
  { de: 'dich', ro: 'pe tine / te', category: 'functionale' },
  { de: 'der', ro: 'articol hotărât (masculin)', category: 'functionale' },
  { de: 'die', ro: 'articol hotărât (feminin)', category: 'functionale' },
  { de: 'das', ro: 'articol hotărât (neutru) / asta', category: 'functionale' },
  { de: 'ein', ro: 'un', category: 'functionale' },
  { de: 'eine', ro: 'o', category: 'functionale' },
  { de: 'einen', ro: 'un (acuzativ)', category: 'functionale' },
  { de: 'mein', ro: 'al meu', category: 'functionale' },
  { de: 'wie', ro: 'cum', category: 'functionale' },
  { de: 'was', ro: 'ce', category: 'functionale' },
  { de: 'wo', ro: 'unde', category: 'functionale' },
  { de: 'woher', ro: 'de unde', category: 'functionale' },
  { de: 'aus', ro: 'din', category: 'functionale' },
  { de: 'mit', ro: 'cu', category: 'functionale' },
  { de: 'und', ro: 'și', category: 'functionale' },
  { de: 'oder', ro: 'sau', category: 'functionale' },
  { de: 'nicht', ro: 'nu (negație)', category: 'functionale' },
  { de: 'sehr', ro: 'foarte', category: 'functionale' },

  // --- Verbe ---
  { de: 'bin', ro: 'sunt', category: 'verbe' },
  { de: 'bist', ro: 'ești', category: 'verbe' },
  { de: 'ist', ro: 'este', category: 'verbe' },
  { de: 'sind', ro: 'sunt (plural)', category: 'verbe' },
  { de: 'habe', ro: 'am', category: 'verbe' },
  { de: 'heisse', ro: 'mă numesc', original: 'heiße', category: 'verbe' },
  { de: 'heisst', ro: 'te numești', original: 'heißt', category: 'verbe' },
  { de: 'komme', ro: 'vin', category: 'verbe' },
  { de: 'kommst', ro: 'vii', category: 'verbe' },
  { de: 'geht', ro: 'merge', category: 'verbe' },
  { de: 'gibt', ro: 'dă', category: 'verbe' },
  { de: 'essen', ro: 'a mânca', category: 'verbe' },
  { de: 'esse', ro: 'mănânc', category: 'verbe' },
  { de: 'trinken', ro: 'a bea', category: 'verbe' },
  { de: 'trinke', ro: 'beau', category: 'verbe' },
  { de: 'trinkst', ro: 'bei', category: 'verbe' },
  { de: 'mochte', ro: 'aș dori', original: 'möchte', category: 'verbe' },
  { de: 'mochtest', ro: 'ai dori', original: 'möchtest', category: 'verbe' },
  { de: 'mochten', ro: 'ați dori', original: 'möchten', category: 'verbe' },
  { de: 'spielt', ro: 'se joacă', category: 'verbe' },
  { de: 'lerne', ro: 'învăț', category: 'verbe' },
  { de: 'schmeckt', ro: 'are gust', category: 'verbe' },
  { de: 'freut', ro: 'bucură', category: 'verbe' },
  { de: 'kennenzulernen', ro: 'a face cunoștință', category: 'verbe' },

  // --- Adjective și adverbe ---
  { de: 'gut', ro: 'bine / bun', category: 'adjective' },
  { de: 'schlecht', ro: 'rău', category: 'adjective' },
  { de: 'gute', ro: 'bună', category: 'adjective' },
  { de: 'guten', ro: 'bun (acuzativ)', category: 'adjective' },
  { de: 'gross', ro: 'mare', original: 'groß', category: 'adjective' },
  { de: 'klein', ro: 'mic', category: 'adjective' },
  { de: 'schon', ro: 'frumos', original: 'schön', category: 'adjective' },
  { de: 'mude', ro: 'obosit', original: 'müde', category: 'adjective' },
  { de: 'heiss', ro: 'fierbinte', original: 'heiß', category: 'adjective' },
  { de: 'gesund', ro: 'sănătos', category: 'adjective' },
  { de: 'gerne', ro: 'cu plăcere', category: 'adjective' },
  { de: 'sofort', ro: 'imediat', category: 'adjective' },

  // --- Numere ---
  { de: 'eins', ro: 'unu', category: 'numere' },
  { de: 'zwei', ro: 'doi', category: 'numere' },
  { de: 'drei', ro: 'trei', category: 'numere' },
  { de: 'vier', ro: 'patru', category: 'numere' },
  { de: 'funf', ro: 'cinci', original: 'fünf', category: 'numere' },
  { de: 'sechs', ro: 'șase', category: 'numere' },
  { de: 'sieben', ro: 'șapte', category: 'numere' },
  { de: 'acht', ro: 'opt', category: 'numere' },
  { de: 'neun', ro: 'nouă', category: 'numere' },
  { de: 'zehn', ro: 'zece', category: 'numere' },

  // --- Timp ---
  { de: 'Morgen', ro: 'dimineață / mâine', category: 'timp' },
  { de: 'Tag', ro: 'zi', category: 'timp' },
  { de: 'Abend', ro: 'seară', category: 'timp' },
  { de: 'Nacht', ro: 'noapte', category: 'timp' },

  // --- Familie și oameni ---
  { de: 'Mutter', article: 'die', ro: 'mamă', category: 'familie' },
  { de: 'Vater', article: 'der', ro: 'tată', category: 'familie' },
  { de: 'Schwester', article: 'die', ro: 'soră', category: 'familie' },
  { de: 'Bruder', article: 'der', ro: 'frate', category: 'familie' },
  { de: 'Grossmutter', article: 'die', ro: 'bunică', original: 'Großmutter', category: 'familie' },
  { de: 'Grossvater', article: 'der', ro: 'bunic', original: 'Großvater', category: 'familie' },
  { de: 'Kind', article: 'das', ro: 'copil', category: 'familie' },
  { de: 'Eltern', article: 'die', ro: 'părinți', category: 'familie' },
  { de: 'Mann', article: 'der', ro: 'bărbat / soț', category: 'familie' },
  { de: 'Frau', article: 'die', ro: 'femeie / soție', category: 'familie' },
  { de: 'Familie', article: 'die', ro: 'familie', category: 'familie' },

  // --- Mâncare ---
  { de: 'Brot', article: 'das', ro: 'pâine', category: 'mancare' },
  { de: 'Apfel', article: 'der', ro: 'măr', category: 'mancare' },
  { de: 'Suppe', article: 'die', ro: 'supă', category: 'mancare' },
  { de: 'Fleisch', article: 'das', ro: 'carne', category: 'mancare' },
  { de: 'Kase', article: 'der', ro: 'brânză', original: 'Käse', category: 'mancare' },
  { de: 'Banane', article: 'die', ro: 'banană', category: 'mancare' },
  { de: 'Ei', article: 'das', ro: 'ou', category: 'mancare' },
  { de: 'Pizza', article: 'die', ro: 'pizza', category: 'mancare' },

  // --- Băuturi ---
  { de: 'Wasser', article: 'das', ro: 'apă', category: 'bauturi' },
  { de: 'Milch', article: 'die', ro: 'lapte', category: 'bauturi' },
  { de: 'Kaffee', article: 'der', ro: 'cafea', category: 'bauturi' },
  { de: 'Tee', article: 'der', ro: 'ceai', category: 'bauturi' },
  { de: 'Saft', article: 'der', ro: 'suc', category: 'bauturi' },
  { de: 'Cola', article: 'die', ro: 'cola', category: 'bauturi' },
  { de: 'Bier', article: 'das', ro: 'bere', category: 'bauturi' },
  { de: 'Wein', article: 'der', ro: 'vin', category: 'bauturi' },

  // --- Culori ---
  { de: 'rot', ro: 'roșu', category: 'culori' },
  { de: 'blau', ro: 'albastru', category: 'culori' },
  { de: 'grun', ro: 'verde', original: 'grün', category: 'culori' },
  { de: 'gelb', ro: 'galben', category: 'culori' },
  { de: 'schwarz', ro: 'negru', category: 'culori' },
  { de: 'weiss', ro: 'alb', original: 'weiß', category: 'culori' },
  { de: 'braun', ro: 'maro', category: 'culori' },
  { de: 'orange', ro: 'portocaliu', category: 'culori' },
  { de: 'rosa', ro: 'roz', category: 'culori' },
  { de: 'lila', ro: 'mov', category: 'culori' },

  // --- Animale ---
  { de: 'Hund', article: 'der', ro: 'câine', category: 'animale' },
  { de: 'Katze', article: 'die', ro: 'pisică', category: 'animale' },
  { de: 'Vogel', article: 'der', ro: 'pasăre', category: 'animale' },
  { de: 'Fisch', article: 'der', ro: 'pește', category: 'animale' },
  { de: 'Pferd', article: 'das', ro: 'cal', category: 'animale' },
  { de: 'Kuh', article: 'die', ro: 'vacă', category: 'animale' },
  { de: 'Schwein', article: 'das', ro: 'porc', category: 'animale' },
  { de: 'Maus', article: 'die', ro: 'șoarece', category: 'animale' },
  { de: 'Bar', article: 'der', ro: 'urs', original: 'Bär', category: 'animale' },
  { de: 'Fuchs', article: 'der', ro: 'vulpe', category: 'animale' },

  // --- Natură ---
  { de: 'Sonne', article: 'die', ro: 'soare', category: 'natura' },
  { de: 'Mond', article: 'der', ro: 'lună', category: 'natura' },
  { de: 'Stern', article: 'der', ro: 'stea', category: 'natura' },
  { de: 'Baum', article: 'der', ro: 'copac', category: 'natura' },
  { de: 'Blume', article: 'die', ro: 'floare', category: 'natura' },
  { de: 'Regen', article: 'der', ro: 'ploaie', category: 'natura' },
  { de: 'Schnee', article: 'der', ro: 'zăpadă', category: 'natura' },
  { de: 'Berg', article: 'der', ro: 'munte', category: 'natura' },

  // --- Transport ---
  { de: 'Auto', article: 'das', ro: 'mașină', category: 'transport' },
  { de: 'Bus', article: 'der', ro: 'autobuz', category: 'transport' },
  { de: 'Zug', article: 'der', ro: 'tren', category: 'transport' },
  { de: 'Fahrrad', article: 'das', ro: 'bicicletă', category: 'transport' },
  { de: 'Flugzeug', article: 'das', ro: 'avion', category: 'transport' },
  { de: 'Schiff', article: 'das', ro: 'vapor', category: 'transport' },
  { de: 'Taxi', article: 'das', ro: 'taxi', category: 'transport' },

  // --- Locuri și diverse ---
  { de: 'Haus', article: 'das', ro: 'casă', category: 'locuri' },
  { de: 'Fussball', article: 'der', ro: 'fotbal', original: 'Fußball', category: 'sport' },
  { de: 'Deutsch', ro: 'germană (limba)', category: 'limbi' },

  // --- Țări ---
  { de: 'Rumanien', ro: 'România', original: 'Rumänien', category: 'tari' },
  { de: 'Deutschland', ro: 'Germania', category: 'tari' },
  { de: 'Osterreich', ro: 'Austria', original: 'Österreich', category: 'tari' },
  { de: 'Russland', ro: 'Rusia', category: 'tari' },

  // --- Nume proprii folosite în lecții ---
  { de: 'Anna', ro: 'Anna (nume)', category: 'nume' },
];

// --- Lookup ---

const ARTICLE_RE = /^(der|die|das|ein|eine|einen)\s+/;

const DE_LOOKUP = (() => {
  const m = new Map();
  for (const entry of dictionary) {
    m.set(normalizeGerman(entry.de), entry);
    if (entry.article) {
      m.set(normalizeGerman(`${entry.article} ${entry.de}`), entry);
    }
  }
  return m;
})();

// Există această formă germană în dicționar? (acceptă și „der/die/das X")
export function hasGermanEntry(word) {
  const norm = normalizeGerman(word);
  if (DE_LOOKUP.has(norm)) return true;
  const stripped = norm.replace(ARTICLE_RE, '');
  return stripped !== norm && DE_LOOKUP.has(stripped);
}

export function findByDe(word) {
  const norm = normalizeGerman(word);
  if (DE_LOOKUP.has(norm)) return DE_LOOKUP.get(norm);
  const stripped = norm.replace(ARTICLE_RE, '');
  return DE_LOOKUP.get(stripped) || null;
}

// Căutare în ambele direcții, pentru ecranul Dicționar
export function searchDictionary(query) {
  const q = normalizeRomanian(query);
  if (!q) return [];
  return dictionary.filter(entry =>
    normalizeGerman(entry.de).includes(q) ||
    normalizeRomanian(entry.ro).includes(q) ||
    (entry.original && normalizeGerman(entry.original).includes(q))
  );
}

export function getAllCategories() {
  return [...new Set(dictionary.map(e => e.category))];
}
