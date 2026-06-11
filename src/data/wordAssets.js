// ============================================
// Emoji & visual asset map for German words
// ============================================
// Lookup is case/diacritic-insensitive. Add new entries any time —
// they wire automatically into picturePick + multiChoice card visuals.

const RAW_MAP = {
  // Greetings
  'hallo': '👋', 'tschuss': '👋', 'auf wiedersehen': '🤝',
  'guten morgen': '🌅', 'guten tag': '☀️', 'guten abend': '🌆', 'gute nacht': '🌙',
  'danke': '🙏', 'bitte': '🙏', 'ja': '✅', 'nein': '❌',
  'entschuldigung': '🙇',

  // People & pronouns
  'ich': '🙋', 'du': '👉', 'wir': '👥', 'sie': '👨‍👩‍👧',
  'mann': '👨', 'frau': '👩', 'kind': '🧒', 'freund': '🧑‍🤝‍🧑',
  'familie': '👨‍👩‍👧‍👦', 'mutter': '👩', 'vater': '👨', 'bruder': '👦', 'schwester': '👧',

  // Numbers 1-20
  'eins': '1️⃣', 'zwei': '2️⃣', 'drei': '3️⃣', 'vier': '4️⃣', 'funf': '5️⃣',
  'sechs': '6️⃣', 'sieben': '7️⃣', 'acht': '8️⃣', 'neun': '9️⃣', 'zehn': '🔟',

  // Drinks (matches beverage.png style)
  'wasser': '💧', 'milch': '🥛', 'tee': '🍵', 'kaffee': '☕',
  'saft': '🧃', 'bier': '🍺', 'wein': '🍷', 'cola': '🥤',
  'orangensaft': '🍊', 'apfelsaft': '🍎',

  // Food
  'brot': '🍞', 'kase': '🧀', 'butter': '🧈', 'ei': '🥚', 'eier': '🥚',
  'fleisch': '🥩', 'fisch': '🐟', 'huhn': '🍗', 'wurst': '🌭',
  'apfel': '🍎', 'banane': '🍌', 'orange': '🍊', 'erdbeere': '🍓',
  'kartoffel': '🥔', 'tomate': '🍅', 'salat': '🥗', 'suppe': '🍲',
  'pizza': '🍕', 'pasta': '🍝', 'kuchen': '🍰', 'schokolade': '🍫',
  'reis': '🍚', 'nudeln': '🍜',

  // Animals
  'hund': '🐕', 'katze': '🐈', 'vogel': '🐦', 'fisch ': '🐠',
  'pferd': '🐎', 'kuh': '🐄', 'schwein': '🐖', 'schaf': '🐑',
  'maus': '🐁', 'bar': '🐻', 'lowe': '🦁', 'elefant': '🐘',

  // Colors
  'rot': '🟥', 'blau': '🟦', 'grun': '🟩', 'gelb': '🟨',
  'schwarz': '⬛', 'weiss': '⬜', 'orange ': '🟧', 'lila': '🟪',
  'braun': '🟫', 'rosa': '💗', 'grau': '🩶',

  // Time & days
  'heute': '📅', 'morgen': '🌅', 'gestern': '⏪', 'jetzt': '⌛',
  'montag': '1️⃣', 'dienstag': '2️⃣', 'mittwoch': '3️⃣', 'donnerstag': '4️⃣',
  'freitag': '5️⃣', 'samstag': '6️⃣', 'sonntag': '7️⃣',

  // Nature & weather
  'sonne': '☀️', 'mond': '🌙', 'stern': '⭐', 'wolke': '☁️',
  'regen': '🌧️', 'schnee': '❄️', 'wind': '💨',
  'baum': '🌳', 'blume': '🌸', 'gras': '🌱', 'meer': '🌊', 'berg': '🏔️',

  // Places
  'haus': '🏠', 'schule': '🏫', 'universitat': '🎓', 'arbeit': '💼',
  'buro': '🏢', 'krankenhaus': '🏥', 'restaurant': '🍽️', 'café': '☕',
  'bahnhof': '🚉', 'flughafen': '✈️', 'stadt': '🏙️', 'land': '🏞️',
  'park': '🌳', 'kino': '🎬', 'museum': '🏛️', 'kirche': '⛪',

  // Transportation
  'auto': '🚗', 'bus': '🚌', 'zug': '🚆', 'fahrrad': '🚲',
  'flugzeug': '✈️', 'schiff': '🚢', 'taxi': '🚕', 'u-bahn': '🚇',

  // Verbs & actions
  'essen': '🍽️', 'trinken': '🥤', 'schlafen': '😴', 'arbeiten': '💼',
  'lernen': '📚', 'lesen': '📖', 'schreiben': '✍️', 'sprechen': '🗣️',
  'horen': '👂', 'sehen': '👀', 'gehen': '🚶', 'laufen': '🏃',
  'kommen': '🚶‍♂️', 'fahren': '🚗', 'kaufen': '🛒', 'spielen': '⚽',

  // Adjectives
  'gut': '👍', 'schlecht': '👎', 'gross': '⬆️', 'klein': '⬇️',
  'schon': '✨', 'hasslich': '😬', 'alt': '👴', 'jung': '👶',
  'neu': '🆕', 'heiss': '🔥', 'kalt': '🧊', 'warm': '☀️',
  'mude': '😴', 'glucklich': '😄', 'traurig': '😢',

  // Countries (relevant ones)
  'rumanien': '🇷🇴', 'deutschland': '🇩🇪', 'osterreich': '🇦🇹',
  'schweiz': '🇨🇭', 'frankreich': '🇫🇷', 'italien': '🇮🇹', 'spanien': '🇪🇸',
  'england': '🇬🇧', 'usa': '🇺🇸',

  // Body
  'kopf': '🗣️', 'auge': '👁️', 'ohr': '👂', 'nase': '👃',
  'mund': '👄', 'hand': '✋', 'fuss': '🦶', 'herz': '❤️',

  // Phrases / fillers
  'freut mich': '😊', 'wie heisst du': '❓', 'wie geht es dir': '🤔',
  'ich heisse': '👋', 'ich komme aus': '🌍',
};

import { normalizeGerman } from '../utils/normalize.js';

// Lookup keys are stored in ASCII form; normalizeGerman strips any umlauts
// the caller might pass in, plus articles below.
const normalize = (s) => normalizeGerman(s).replace(/^(der|die|das|ein|eine|einen)\s+/, '');

const LOOKUP = (() => {
  const m = new Map();
  for (const key of Object.keys(RAW_MAP)) {
    m.set(normalize(key), RAW_MAP[key]);
  }
  return m;
})();

export function getEmojiForWord(word) {
  if (!word) return null;
  const key = normalize(word);
  if (LOOKUP.has(key)) return LOOKUP.get(key);

  // Try the first significant word in a phrase ("ich komme aus" → "ich" etc.)
  const tokens = key.split(/\s+/).filter(Boolean);
  for (const tok of tokens) {
    if (LOOKUP.has(tok)) return LOOKUP.get(tok);
  }
  return null;
}

export function hasEmoji(word) {
  return getEmojiForWord(word) !== null;
}
