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

  // ============================================
  // VOCABULAR EXTINS A1 (iunie 2026) — verificat PONS/dexonline
  // ============================================

  // --- Numere 11–20 ---
  { de: 'elf', ro: 'unsprezece', category: 'numere' },
  { de: 'zwolf', ro: 'doisprezece', original: 'zwölf', category: 'numere' },
  { de: 'dreizehn', ro: 'treisprezece', category: 'numere' },
  { de: 'vierzehn', ro: 'paisprezece', category: 'numere' },
  { de: 'funfzehn', ro: 'cincisprezece', original: 'fünfzehn', category: 'numere' },
  { de: 'sechzehn', ro: 'șaisprezece', category: 'numere' },
  { de: 'siebzehn', ro: 'șaptesprezece', category: 'numere' },
  { de: 'achtzehn', ro: 'optsprezece', category: 'numere' },
  { de: 'neunzehn', ro: 'nouăsprezece', category: 'numere' },
  { de: 'zwanzig', ro: 'douăzeci', category: 'numere' },

  // --- Zilele săptămânii ---
  { de: 'Montag', article: 'der', ro: 'luni', category: 'zile' },
  { de: 'Dienstag', article: 'der', ro: 'marți', category: 'zile' },
  { de: 'Mittwoch', article: 'der', ro: 'miercuri', category: 'zile' },
  { de: 'Donnerstag', article: 'der', ro: 'joi', category: 'zile' },
  { de: 'Freitag', article: 'der', ro: 'vineri', category: 'zile' },
  { de: 'Samstag', article: 'der', ro: 'sâmbătă', category: 'zile' },
  { de: 'Sonntag', article: 'der', ro: 'duminică', category: 'zile' },
  { de: 'Woche', article: 'die', ro: 'săptămână', category: 'zile' },
  { de: 'Wochenende', article: 'das', ro: 'weekend', category: 'zile' },

  // --- Lunile anului ---
  { de: 'Januar', article: 'der', ro: 'ianuarie', category: 'luni' },
  { de: 'Februar', article: 'der', ro: 'februarie', category: 'luni' },
  { de: 'Marz', article: 'der', ro: 'martie', original: 'März', category: 'luni' },
  { de: 'April', article: 'der', ro: 'aprilie', category: 'luni' },
  { de: 'Mai', article: 'der', ro: 'mai', category: 'luni' },
  { de: 'Juni', article: 'der', ro: 'iunie', category: 'luni' },
  { de: 'Juli', article: 'der', ro: 'iulie', category: 'luni' },
  { de: 'August', article: 'der', ro: 'august', category: 'luni' },
  { de: 'September', article: 'der', ro: 'septembrie', category: 'luni' },
  { de: 'Oktober', article: 'der', ro: 'octombrie', category: 'luni' },
  { de: 'November', article: 'der', ro: 'noiembrie', category: 'luni' },
  { de: 'Dezember', article: 'der', ro: 'decembrie', category: 'luni' },

  // --- Timp ---
  { de: 'Monat', article: 'der', ro: 'lună (calendaristică)', category: 'timp' },
  { de: 'Jahr', article: 'das', ro: 'an', category: 'timp' },
  { de: 'Zeit', article: 'die', ro: 'timp', category: 'timp' },
  { de: 'Stunde', article: 'die', ro: 'oră', category: 'timp' },
  { de: 'Minute', article: 'die', ro: 'minut', category: 'timp' },
  { de: 'Uhr', article: 'die', ro: 'ceas', category: 'timp' },
  { de: 'heute', ro: 'azi', category: 'timp' },
  { de: 'gestern', ro: 'ieri', category: 'timp' },
  { de: 'jetzt', ro: 'acum', category: 'timp' },

  // --- Corp ---
  { de: 'Kopf', article: 'der', ro: 'cap', category: 'corp' },
  { de: 'Auge', article: 'das', ro: 'ochi', category: 'corp' },
  { de: 'Ohr', article: 'das', ro: 'ureche', category: 'corp' },
  { de: 'Nase', article: 'die', ro: 'nas', category: 'corp' },
  { de: 'Mund', article: 'der', ro: 'gură', category: 'corp' },
  { de: 'Hand', article: 'die', ro: 'mână', category: 'corp' },
  { de: 'Fuss', article: 'der', ro: 'picior (laba)', original: 'Fuß', category: 'corp' },
  { de: 'Herz', article: 'das', ro: 'inimă', category: 'corp' },
  { de: 'Haar', article: 'das', ro: 'păr', category: 'corp' },
  { de: 'Bein', article: 'das', ro: 'picior', category: 'corp' },
  { de: 'Arm', article: 'der', ro: 'braț', category: 'corp' },
  { de: 'Zahn', article: 'der', ro: 'dinte', category: 'corp' },
  { de: 'Finger', article: 'der', ro: 'deget', category: 'corp' },
  { de: 'Gesicht', article: 'das', ro: 'față', category: 'corp' },
  { de: 'Bauch', article: 'der', ro: 'burtă', category: 'corp' },
  { de: 'Rucken', article: 'der', ro: 'spate', original: 'Rücken', category: 'corp' },

  // --- Haine ---
  { de: 'Hemd', article: 'das', ro: 'cămașă', category: 'haine' },
  { de: 'Hose', article: 'die', ro: 'pantaloni', category: 'haine' },
  { de: 'Schuh', article: 'der', ro: 'pantof', category: 'haine' },
  { de: 'Jacke', article: 'die', ro: 'jachetă', category: 'haine' },
  { de: 'Kleid', article: 'das', ro: 'rochie', category: 'haine' },
  { de: 'Mantel', article: 'der', ro: 'palton', category: 'haine' },
  { de: 'Mutze', article: 'die', ro: 'căciulă', original: 'Mütze', category: 'haine' },
  { de: 'Socke', article: 'die', ro: 'șosetă', category: 'haine' },
  { de: 'Hut', article: 'der', ro: 'pălărie', category: 'haine' },
  { de: 'Rock', article: 'der', ro: 'fustă', category: 'haine' },
  { de: 'Pullover', article: 'der', ro: 'pulover', category: 'haine' },

  // --- Casă și mobilă ---
  { de: 'Zimmer', article: 'das', ro: 'cameră', category: 'casa' },
  { de: 'Kuche', article: 'die', ro: 'bucătărie', original: 'Küche', category: 'casa' },
  { de: 'Bad', article: 'das', ro: 'baie', category: 'casa' },
  { de: 'Tisch', article: 'der', ro: 'masă', category: 'casa' },
  { de: 'Stuhl', article: 'der', ro: 'scaun', category: 'casa' },
  { de: 'Bett', article: 'das', ro: 'pat', category: 'casa' },
  { de: 'Tur', article: 'die', ro: 'ușă', original: 'Tür', category: 'casa' },
  { de: 'Fenster', article: 'das', ro: 'fereastră', category: 'casa' },
  { de: 'Lampe', article: 'die', ro: 'lampă', category: 'casa' },
  { de: 'Sofa', article: 'das', ro: 'canapea', category: 'casa' },
  { de: 'Schrank', article: 'der', ro: 'dulap', category: 'casa' },
  { de: 'Garten', article: 'der', ro: 'grădină', category: 'casa' },

  // --- Vreme și anotimpuri ---
  { de: 'Wetter', article: 'das', ro: 'vreme', category: 'vreme' },
  { de: 'Wolke', article: 'die', ro: 'nor', category: 'vreme' },
  { de: 'Wind', article: 'der', ro: 'vânt', category: 'vreme' },
  { de: 'Sturm', article: 'der', ro: 'furtună', category: 'vreme' },
  { de: 'Nebel', article: 'der', ro: 'ceață', category: 'vreme' },
  { de: 'Himmel', article: 'der', ro: 'cer', category: 'vreme' },
  { de: 'Sommer', article: 'der', ro: 'vară', category: 'vreme' },
  { de: 'Winter', article: 'der', ro: 'iarnă', category: 'vreme' },
  { de: 'Fruhling', article: 'der', ro: 'primăvară', original: 'Frühling', category: 'vreme' },
  { de: 'Herbst', article: 'der', ro: 'toamnă', category: 'vreme' },

  // --- Meserii ---
  { de: 'Lehrer', article: 'der', ro: 'profesor', category: 'meserii' },
  { de: 'Arzt', article: 'der', ro: 'medic', category: 'meserii' },
  { de: 'Student', article: 'der', ro: 'student', category: 'meserii' },
  { de: 'Koch', article: 'der', ro: 'bucătar', category: 'meserii' },
  { de: 'Kellner', article: 'der', ro: 'chelner', category: 'meserii' },
  { de: 'Polizist', article: 'der', ro: 'polițist', category: 'meserii' },
  { de: 'Bauer', article: 'der', ro: 'fermier', category: 'meserii' },
  { de: 'Fahrer', article: 'der', ro: 'șofer', category: 'meserii' },
  { de: 'Verkaufer', article: 'der', ro: 'vânzător', original: 'Verkäufer', category: 'meserii' },

  // --- Locuri ---
  { de: 'Schule', article: 'die', ro: 'școală', category: 'locuri' },
  { de: 'Universitat', article: 'die', ro: 'universitate', original: 'Universität', category: 'locuri' },
  { de: 'Arbeit', article: 'die', ro: 'muncă', category: 'locuri' },
  { de: 'Buro', article: 'das', ro: 'birou', original: 'Büro', category: 'locuri' },
  { de: 'Krankenhaus', article: 'das', ro: 'spital', category: 'locuri' },
  { de: 'Restaurant', article: 'das', ro: 'restaurant', category: 'locuri' },
  { de: 'Bahnhof', article: 'der', ro: 'gară', category: 'locuri' },
  { de: 'Flughafen', article: 'der', ro: 'aeroport', category: 'locuri' },
  { de: 'Stadt', article: 'die', ro: 'oraș', category: 'locuri' },
  { de: 'Land', article: 'das', ro: 'țară', category: 'locuri' },
  { de: 'Park', article: 'der', ro: 'parc', category: 'locuri' },
  { de: 'Kino', article: 'das', ro: 'cinema', category: 'locuri' },
  { de: 'Museum', article: 'das', ro: 'muzeu', category: 'locuri' },
  { de: 'Kirche', article: 'die', ro: 'biserică', category: 'locuri' },
  { de: 'Supermarkt', article: 'der', ro: 'supermarket', category: 'locuri' },
  { de: 'Strasse', article: 'die', ro: 'stradă', original: 'Straße', category: 'locuri' },
  { de: 'Markt', article: 'der', ro: 'piață', category: 'locuri' },

  // --- Natură ---
  { de: 'Meer', article: 'das', ro: 'mare', category: 'natura' },
  { de: 'Gras', article: 'das', ro: 'iarbă', category: 'natura' },
  { de: 'Wald', article: 'der', ro: 'pădure', category: 'natura' },
  { de: 'Fluss', article: 'der', ro: 'râu', category: 'natura' },
  { de: 'See', article: 'der', ro: 'lac', category: 'natura' },
  { de: 'Insel', article: 'die', ro: 'insulă', category: 'natura' },
  { de: 'Strand', article: 'der', ro: 'plajă', category: 'natura' },
  { de: 'Feld', article: 'das', ro: 'câmp', category: 'natura' },
  { de: 'Stein', article: 'der', ro: 'piatră', category: 'natura' },
  { de: 'Erde', article: 'die', ro: 'pământ', category: 'natura' },

  // --- Mâncare (extins) ---
  { de: 'Tomate', article: 'die', ro: 'roșie', category: 'mancare' },
  { de: 'Kartoffel', article: 'die', ro: 'cartof', category: 'mancare' },
  { de: 'Salat', article: 'der', ro: 'salată', category: 'mancare' },
  { de: 'Kuchen', article: 'der', ro: 'prăjitură', category: 'mancare' },
  { de: 'Schokolade', article: 'die', ro: 'ciocolată', category: 'mancare' },
  { de: 'Reis', article: 'der', ro: 'orez', category: 'mancare' },
  { de: 'Nudeln', article: 'die', ro: 'tăiței', category: 'mancare' },
  { de: 'Butter', article: 'die', ro: 'unt', category: 'mancare' },
  { de: 'Wurst', article: 'die', ro: 'cârnat', category: 'mancare' },
  { de: 'Huhn', article: 'das', ro: 'pui', category: 'mancare' },
  { de: 'Erdbeere', article: 'die', ro: 'căpșună', category: 'mancare' },
  { de: 'Gemuse', article: 'das', ro: 'legume', original: 'Gemüse', category: 'mancare' },
  { de: 'Obst', article: 'das', ro: 'fructe', category: 'mancare' },
  { de: 'Zucker', article: 'der', ro: 'zahăr', category: 'mancare' },
  { de: 'Salz', article: 'das', ro: 'sare', category: 'mancare' },

  // --- Animale (extins) ---
  { de: 'Lowe', article: 'der', ro: 'leu', original: 'Löwe', category: 'animale' },
  { de: 'Elefant', article: 'der', ro: 'elefant', category: 'animale' },
  { de: 'Schaf', article: 'das', ro: 'oaie', category: 'animale' },
  { de: 'Tiger', article: 'der', ro: 'tigru', category: 'animale' },
  { de: 'Affe', article: 'der', ro: 'maimuță', category: 'animale' },
  { de: 'Wolf', article: 'der', ro: 'lup', category: 'animale' },
  { de: 'Freund', article: 'der', ro: 'prieten', category: 'oameni' },

  // --- Culori (extins) ---
  { de: 'grau', ro: 'gri', category: 'culori' },

  // --- Verbe (extins) ---
  { de: 'schlafen', ro: 'a dormi', category: 'verbe' },
  { de: 'arbeiten', ro: 'a munci', category: 'verbe' },
  { de: 'lernen', ro: 'a învăța', category: 'verbe' },
  { de: 'lesen', ro: 'a citi', category: 'verbe' },
  { de: 'schreiben', ro: 'a scrie', category: 'verbe' },
  { de: 'sprechen', ro: 'a vorbi', category: 'verbe' },
  { de: 'horen', ro: 'a auzi', original: 'hören', category: 'verbe' },
  { de: 'sehen', ro: 'a vedea', category: 'verbe' },
  { de: 'gehen', ro: 'a merge', category: 'verbe' },
  { de: 'laufen', ro: 'a alerga', category: 'verbe' },
  { de: 'kommen', ro: 'a veni', category: 'verbe' },
  { de: 'fahren', ro: 'a conduce', category: 'verbe' },
  { de: 'kaufen', ro: 'a cumpăra', category: 'verbe' },
  { de: 'spielen', ro: 'a (se) juca', category: 'verbe' },
  { de: 'machen', ro: 'a face', category: 'verbe' },
  { de: 'wohnen', ro: 'a locui', category: 'verbe' },
  { de: 'haben', ro: 'a avea', category: 'verbe' },
  { de: 'sein', ro: 'a fi', category: 'verbe' },
  { de: 'sagen', ro: 'a spune', category: 'verbe' },
  { de: 'geben', ro: 'a da', category: 'verbe' },
  { de: 'finden', ro: 'a găsi', category: 'verbe' },
  { de: 'brauchen', ro: 'a avea nevoie', category: 'verbe' },
  { de: 'mogen', ro: 'a plăcea', original: 'mögen', category: 'verbe' },
  { de: 'wissen', ro: 'a ști', category: 'verbe' },
  { de: 'denken', ro: 'a gândi', category: 'verbe' },

  // --- Adjective (extins) ---
  { de: 'kalt', ro: 'rece', category: 'adjective' },
  { de: 'warm', ro: 'cald', category: 'adjective' },
  { de: 'neu', ro: 'nou', category: 'adjective' },
  { de: 'alt', ro: 'vechi / bătrân', category: 'adjective' },
  { de: 'jung', ro: 'tânăr', category: 'adjective' },
  { de: 'glucklich', ro: 'fericit', original: 'glücklich', category: 'adjective' },
  { de: 'traurig', ro: 'trist', category: 'adjective' },
  { de: 'schnell', ro: 'rapid', category: 'adjective' },
  { de: 'langsam', ro: 'lent', category: 'adjective' },
  { de: 'teuer', ro: 'scump', category: 'adjective' },
  { de: 'billig', ro: 'ieftin', category: 'adjective' },
  { de: 'hasslich', ro: 'urât', original: 'hässlich', category: 'adjective' },
  { de: 'lang', ro: 'lung', category: 'adjective' },
  { de: 'kurz', ro: 'scurt', category: 'adjective' },
  { de: 'hoch', ro: 'înalt', category: 'adjective' },
  { de: 'voll', ro: 'plin', category: 'adjective' },
  { de: 'leer', ro: 'gol', category: 'adjective' },
  { de: 'richtig', ro: 'corect', category: 'adjective' },
  { de: 'falsch', ro: 'greșit', category: 'adjective' },
  { de: 'einfach', ro: 'simplu', category: 'adjective' },
  { de: 'schwer', ro: 'greu', category: 'adjective' },
  { de: 'leicht', ro: 'ușor', category: 'adjective' },
  { de: 'stark', ro: 'puternic', category: 'adjective' },
  { de: 'schwach', ro: 'slab', category: 'adjective' },

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
