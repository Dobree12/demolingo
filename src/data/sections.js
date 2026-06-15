// ============================================
// Secțiuni de conținut — în afara căii de lecții
// ============================================
// Trei secțiuni: cuvinte uzuale (foarte ușor, vizual), propoziții scurte
// (word-bank + dialoguri) și galerii tematice imagine-cuvânt.
// Unitățile au aceeași formă ca lecțiile și rulează prin același motor.
// Convenție proiect: text german în ASCII (a/o/u/ss în loc de ä/ö/ü/ß).

import { augmentExercises } from './generator.js';

export const sections = [
  // ------------------------------------------------
  // 1. CUVINTE UZUALE — vocabular de bază, emoji-first
  // ------------------------------------------------
  {
    id: 'cuvinte-uzuale',
    title: 'Cuvinte uzuale',
    icon: '💬',
    description: 'Cuvintele de zi cu zi, cu imagini',
    kind: 'units',
    units: [
      {
        id: 'cu-1',
        title: 'Primele cuvinte',
        icon: '🌟',
        description: 'Da, nu, mulțumesc — esențialul absolut',
        words: [
          { de: 'Hallo', ro: 'Bună' },
          { de: 'Ja', ro: 'Da' },
          { de: 'Nein', ro: 'Nu' },
          { de: 'Danke', ro: 'Mulțumesc' },
          { de: 'Bitte', ro: 'Te rog / Cu plăcere' },
          { de: 'Entschuldigung', ro: 'Scuze' },
        ],
        exercises: [
          { type: 'picturePick', wordDe: 'Hallo', correct: 'Hallo', options: ['Hallo', 'Danke', 'Nein'] },
          { type: 'multiChoice', question: 'Ce înseamnă "Danke"?', correct: 'Mulțumesc', options: ['Mulțumesc', 'Te rog', 'Da', 'Pa'] },
          { type: 'picturePick', wordDe: 'Ja', correct: 'Ja', options: ['Ja', 'Nein', 'Danke'] },
          { type: 'multiChoice', question: 'Cum spui "Nu" în germană?', correct: 'Nein', options: ['Nein', 'Ja', 'Bitte', 'Hallo'] },
          { type: 'picturePick', wordDe: 'Danke', correct: 'Danke', options: ['Danke', 'Ja', 'Nein'] },
          { type: 'multiChoice', question: 'Ce înseamnă "Bitte"?', correct: 'Te rog', options: ['Te rog', 'Mulțumesc', 'Da', 'Pa'] },
          { type: 'picturePick', wordDe: 'Nein', correct: 'Nein', options: ['Nein', 'Ja', 'Hallo'] },
          { type: 'multiChoice', question: 'Cum saluți pe cineva?', correct: 'Hallo', options: ['Hallo', 'Nein', 'Danke', 'Bitte'] },
          { type: 'multiChoice', question: 'Ce înseamnă "Entschuldigung"?', correct: 'Scuze', options: ['Scuze', 'Mulțumesc', 'La revedere', 'Da'] },
        ],
      },
      {
        id: 'cu-2',
        title: 'Oameni și familie',
        icon: '👨‍👩‍👧',
        description: 'Bărbat, femeie, copil, familie',
        words: [
          { de: 'Mann', ro: 'bărbat' },
          { de: 'Frau', ro: 'femeie' },
          { de: 'Kind', ro: 'copil' },
          { de: 'Familie', ro: 'familie' },
          { de: 'Mutter', ro: 'mamă' },
          { de: 'Vater', ro: 'tată' },
        ],
        exercises: [
          { type: 'picturePick', wordDe: 'Mann', correct: 'Mann', options: ['Mann', 'Frau', 'Kind'] },
          { type: 'picturePick', wordDe: 'Frau', correct: 'Frau', options: ['Frau', 'Mann', 'Familie'] },
          { type: 'multiChoice', question: 'Ce înseamnă "Kind"?', correct: 'Copil', options: ['Copil', 'Bărbat', 'Femeie', 'Mamă'] },
          { type: 'picturePick', wordDe: 'Familie', correct: 'Familie', options: ['Familie', 'Kind', 'Mann'] },
          { type: 'multiChoice', question: 'Cum spui "mamă" în germană?', correct: 'Mutter', options: ['Mutter', 'Vater', 'Frau', 'Kind'] },
          { type: 'picturePick', wordDe: 'Kind', correct: 'Kind', options: ['Kind', 'Mann', 'Frau'] },
          { type: 'multiChoice', question: 'Ce înseamnă "Vater"?', correct: 'Tată', options: ['Tată', 'Mamă', 'Frate', 'Copil'] },
        ],
      },
      {
        id: 'cu-3',
        title: 'Lucruri de zi cu zi',
        icon: '🏠',
        description: 'Casă, apă, pâine, animale de companie',
        words: [
          { de: 'Haus', ro: 'casă' },
          { de: 'Auto', ro: 'mașină' },
          { de: 'Wasser', ro: 'apă' },
          { de: 'Brot', ro: 'pâine' },
          { de: 'Hund', ro: 'câine' },
          { de: 'Katze', ro: 'pisică' },
        ],
        exercises: [
          { type: 'picturePick', wordDe: 'Haus', correct: 'Haus', options: ['Haus', 'Auto', 'Baum'] },
          { type: 'picturePick', wordDe: 'Wasser', correct: 'Wasser', options: ['Wasser', 'Brot', 'Kaffee'] },
          { type: 'multiChoice', question: 'Ce înseamnă "Auto"?', correct: 'Mașină', options: ['Mașină', 'Casă', 'Câine', 'Apă'] },
          { type: 'picturePick', wordDe: 'Hund', correct: 'Hund', options: ['Hund', 'Katze', 'Maus'] },
          { type: 'picturePick', wordDe: 'Brot', correct: 'Brot', options: ['Brot', 'Wasser', 'Apfel'] },
          { type: 'multiChoice', question: 'Cum spui "pisică" în germană?', correct: 'Katze', options: ['Katze', 'Hund', 'Maus', 'Kuh'] },
          { type: 'picturePick', wordDe: 'Katze', correct: 'Katze', options: ['Katze', 'Hund', 'Vogel'] },
        ],
      },
    ],
  },

  // ------------------------------------------------
  // 2. PROPOZIȚII SCURTE — word-bank + dialoguri animate
  // ------------------------------------------------
  {
    id: 'propozitii-scurte',
    title: 'Propoziții scurte',
    icon: '🗨️',
    description: 'Propoziții simple și conversații de zi cu zi',
    kind: 'units',
    units: [
      {
        id: 'ps-1',
        title: 'Conversații simple',
        icon: '💬',
        description: 'Salută, prezintă-te, spune cum te simți',
        words: [
          { de: 'Wie geht es dir?', ro: 'Ce mai faci?' },
          { de: 'Mir geht es gut', ro: 'Mă simt bine' },
          { de: 'Ich heisse Anna', ro: 'Mă numesc Anna' },
          { de: 'Ich komme aus Rumanien', ro: 'Vin din România' },
        ],
        exercises: [
          {
            type: 'dialogue',
            scene: 'Pe stradă',
            characters: [{ name: 'Anna', emoji: '👩' }, { name: 'Max', emoji: '🧑' }],
            lines: [
              { who: 0, de: 'Hallo! Wie geht es dir?', ro: 'Bună! Ce mai faci?' },
              { who: 1, blank: true, answer: 'Mir geht es gut', ro: 'Mă simt bine' },
              { who: 0, de: 'Das freut mich!', ro: 'Mă bucur!' },
            ],
            mode: 'wordBank',
            bank: ['Mir', 'geht', 'es', 'gut', 'schlecht', 'nicht'],
          },
          {
            type: 'wordBank',
            promptDe: 'Ich bin mude.',
            answer: 'Eu sunt obosit',
            bank: ['Eu', 'sunt', 'obosit', 'fericit', 'azi'],
          },
          {
            type: 'dialogue',
            scene: 'La școală',
            characters: [{ name: 'Lehrer', emoji: '👨‍🏫' }, { name: 'Anna', emoji: '👩' }],
            lines: [
              { who: 0, de: 'Wie heisst du?', ro: 'Cum te cheamă?' },
              { who: 1, blank: true, answer: 'Ich heisse Anna', ro: 'Mă numesc Anna' },
              { who: 0, de: 'Freut mich, Anna!', ro: 'Îmi pare bine, Anna!' },
            ],
            mode: 'multiChoice',
            options: ['Ich heisse Anna', 'Ich bin mude', 'Gute Nacht'],
          },
          {
            type: 'wordBank',
            promptDe: 'Das ist gut.',
            answer: 'Asta este bine',
            bank: ['Asta', 'este', 'bine', 'rău', 'nu'],
          },
          {
            type: 'dialogue',
            scene: 'La o cafea',
            characters: [{ name: 'Max', emoji: '🧑' }, { name: 'Elena', emoji: '👧' }],
            lines: [
              { who: 0, de: 'Woher kommst du?', ro: 'De unde vii?' },
              { who: 1, blank: true, answer: 'Ich komme aus Rumanien', ro: 'Vin din România' },
              { who: 0, de: 'Sehr schon!', ro: 'Foarte frumos!' },
            ],
            mode: 'wordBank',
            bank: ['Ich', 'komme', 'aus', 'Rumanien', 'Deutschland', 'bin'],
          },
          {
            type: 'wordBank',
            promptDe: 'Ich lerne Deutsch.',
            answer: 'Eu învăț germană',
            bank: ['Eu', 'învăț', 'germană', 'română', 'vorbesc'],
          },
        ],
      },
      {
        id: 'ps-2',
        title: 'La cafenea',
        icon: '☕',
        description: 'Comandă ceva de băut și de mâncat',
        words: [
          { de: 'Ich mochte einen Kaffee', ro: 'Aș dori o cafea' },
          { de: 'Ich trinke Wasser', ro: 'Eu beau apă' },
          { de: 'Das schmeckt gut', ro: 'Are gust bun' },
        ],
        exercises: [
          {
            type: 'dialogue',
            scene: 'La cafenea',
            characters: [{ name: 'Kellner', emoji: '🧑‍🍳' }, { name: 'Anna', emoji: '👩' }],
            lines: [
              { who: 0, de: 'Guten Tag! Was mochten Sie?', ro: 'Bună ziua! Ce doriți?' },
              { who: 1, blank: true, answer: 'Ich mochte einen Kaffee', ro: 'Aș dori o cafea' },
              { who: 0, de: 'Gerne! Sofort.', ro: 'Cu plăcere! Imediat.' },
            ],
            mode: 'wordBank',
            bank: ['Ich', 'mochte', 'einen', 'Kaffee', 'Tee', 'Wasser'],
          },
          {
            type: 'wordBank',
            promptDe: 'Der Kaffee ist heiss.',
            answer: 'Cafeaua este fierbinte',
            bank: ['Cafeaua', 'este', 'fierbinte', 'rece', 'bună'],
          },
          {
            type: 'dialogue',
            scene: 'Acasă',
            characters: [{ name: 'Max', emoji: '🧑' }, { name: 'Elena', emoji: '👧' }],
            lines: [
              { who: 0, de: 'Was trinkst du?', ro: 'Ce bei?' },
              { who: 1, blank: true, answer: 'Ich trinke Wasser', ro: 'Eu beau apă' },
              { who: 0, de: 'Gut! Wasser ist gesund.', ro: 'Bine! Apa e sănătoasă.' },
            ],
            mode: 'wordBank',
            bank: ['Ich', 'trinke', 'Wasser', 'Milch', 'esse'],
          },
          {
            type: 'wordBank',
            promptDe: 'Ich esse Brot mit Kase.',
            answer: 'Eu mănânc pâine cu brânză',
            bank: ['Eu', 'mănânc', 'pâine', 'cu', 'brânză', 'lapte'],
          },
          {
            type: 'dialogue',
            scene: 'La cafenea',
            characters: [{ name: 'Kellner', emoji: '🧑‍🍳' }, { name: 'Max', emoji: '🧑' }],
            lines: [
              { who: 0, de: 'Mochtest du Tee oder Kaffee?', ro: 'Vrei ceai sau cafea?' },
              { who: 1, blank: true, answer: 'Ich mochte Tee, bitte', ro: 'Aș dori ceai, te rog' },
              { who: 0, de: 'Sehr gut!', ro: 'Foarte bine!' },
            ],
            mode: 'multiChoice',
            options: ['Ich mochte Tee, bitte', 'Gute Nacht', 'Ich bin ein Kind'],
          },
          {
            type: 'wordBank',
            promptDe: 'Das schmeckt gut!',
            answer: 'Are gust bun',
            bank: ['Are', 'gust', 'bun', 'rău', 'asta'],
          },
        ],
      },
    ],
  },

  // ------------------------------------------------
  // 3. IMAGINI ȘI CUVINTE — galerii tematice (stil carduri cu emoji)
  // ------------------------------------------------
  {
    id: 'imagini-cuvinte',
    title: 'Imagini și cuvinte',
    icon: '🖼️',
    description: 'Învață vizual, pe teme: atinge, ascultă, ghicește',
    kind: 'themes',
    themes: [
      {
        id: 'bauturi',
        title: 'Băuturi',
        icon: '🥤',
        words: [
          { de: 'Wasser', ro: 'apă' },
          { de: 'Milch', ro: 'lapte' },
          { de: 'Tee', ro: 'ceai' },
          { de: 'Kaffee', ro: 'cafea' },
          { de: 'Saft', ro: 'suc' },
          { de: 'Cola', ro: 'cola' },
          { de: 'Bier', ro: 'bere' },
          { de: 'Wein', ro: 'vin' },
        ],
      },
      {
        id: 'mancare',
        title: 'Mâncare',
        icon: '🍽️',
        words: [
          { de: 'Brot', ro: 'pâine' },
          { de: 'Kase', ro: 'brânză' },
          { de: 'Apfel', ro: 'măr' },
          { de: 'Banane', ro: 'banană' },
          { de: 'Ei', ro: 'ou' },
          { de: 'Fisch', ro: 'pește' },
          { de: 'Suppe', ro: 'supă' },
          { de: 'Pizza', ro: 'pizza' },
        ],
      },
      {
        id: 'animale',
        title: 'Animale',
        icon: '🐾',
        words: [
          { de: 'Hund', ro: 'câine' },
          { de: 'Katze', ro: 'pisică' },
          { de: 'Pferd', ro: 'cal' },
          { de: 'Kuh', ro: 'vacă' },
          { de: 'Maus', ro: 'șoarece' },
          { de: 'Bar', ro: 'urs' },
          { de: 'Vogel', ro: 'pasăre' },
          { de: 'Schwein', ro: 'porc' },
        ],
      },
      {
        id: 'culori',
        title: 'Culori',
        icon: '🎨',
        words: [
          { de: 'rot', ro: 'roșu' },
          { de: 'blau', ro: 'albastru' },
          { de: 'grun', ro: 'verde' },
          { de: 'gelb', ro: 'galben' },
          { de: 'schwarz', ro: 'negru' },
          { de: 'weiss', ro: 'alb' },
          { de: 'braun', ro: 'maro' },
          { de: 'rosa', ro: 'roz' },
        ],
      },
      {
        id: 'natura',
        title: 'Natură',
        icon: '🌳',
        words: [
          { de: 'Sonne', ro: 'soare' },
          { de: 'Mond', ro: 'lună' },
          { de: 'Stern', ro: 'stea' },
          { de: 'Baum', ro: 'copac' },
          { de: 'Blume', ro: 'floare' },
          { de: 'Regen', ro: 'ploaie' },
          { de: 'Schnee', ro: 'zăpadă' },
          { de: 'Berg', ro: 'munte' },
        ],
      },
      {
        id: 'transport',
        title: 'Transport',
        icon: '🚗',
        words: [
          { de: 'Auto', ro: 'mașină' },
          { de: 'Bus', ro: 'autobuz' },
          { de: 'Zug', ro: 'tren' },
          { de: 'Fahrrad', ro: 'bicicletă' },
          { de: 'Flugzeug', ro: 'avion' },
          { de: 'Schiff', ro: 'vapor' },
          { de: 'Taxi', ro: 'taxi' },
        ],
      },
      {
        id: 'corp',
        title: 'Corpul',
        icon: '🧍',
        words: [
          { de: 'Kopf', ro: 'cap' },
          { de: 'Auge', ro: 'ochi' },
          { de: 'Ohr', ro: 'ureche' },
          { de: 'Nase', ro: 'nas' },
          { de: 'Mund', ro: 'gură' },
          { de: 'Hand', ro: 'mână' },
          { de: 'Fuss', ro: 'picior' },
          { de: 'Herz', ro: 'inimă' },
        ],
      },
      {
        id: 'haine',
        title: 'Haine',
        icon: '👕',
        words: [
          { de: 'Hemd', ro: 'cămașă' },
          { de: 'Hose', ro: 'pantaloni' },
          { de: 'Schuh', ro: 'pantof' },
          { de: 'Jacke', ro: 'jachetă' },
          { de: 'Kleid', ro: 'rochie' },
          { de: 'Mantel', ro: 'palton' },
          { de: 'Mutze', ro: 'căciulă' },
          { de: 'Socke', ro: 'șosetă' },
        ],
      },
      {
        id: 'casa',
        title: 'Casa',
        icon: '🛋️',
        words: [
          { de: 'Tisch', ro: 'masă' },
          { de: 'Stuhl', ro: 'scaun' },
          { de: 'Bett', ro: 'pat' },
          { de: 'Tur', ro: 'ușă' },
          { de: 'Fenster', ro: 'fereastră' },
          { de: 'Lampe', ro: 'lampă' },
          { de: 'Schrank', ro: 'dulap' },
          { de: 'Sofa', ro: 'canapea' },
        ],
      },
      {
        id: 'vreme',
        title: 'Vreme',
        icon: '🌤️',
        words: [
          { de: 'Sonne', ro: 'soare' },
          { de: 'Wolke', ro: 'nor' },
          { de: 'Regen', ro: 'ploaie' },
          { de: 'Schnee', ro: 'zăpadă' },
          { de: 'Wind', ro: 'vânt' },
          { de: 'Sturm', ro: 'furtună' },
          { de: 'Nebel', ro: 'ceață' },
          { de: 'Himmel', ro: 'cer' },
        ],
      },
      {
        id: 'meserii',
        title: 'Meserii',
        icon: '💼',
        words: [
          { de: 'Lehrer', ro: 'profesor' },
          { de: 'Arzt', ro: 'medic' },
          { de: 'Koch', ro: 'bucătar' },
          { de: 'Kellner', ro: 'chelner' },
          { de: 'Polizist', ro: 'polițist' },
          { de: 'Bauer', ro: 'fermier' },
          { de: 'Student', ro: 'student' },
          { de: 'Verkaufer', ro: 'vânzător' },
        ],
      },
      {
        id: 'fructe-legume',
        title: 'Fructe și legume',
        icon: '🥗',
        words: [
          { de: 'Apfel', ro: 'măr' },
          { de: 'Banane', ro: 'banană' },
          { de: 'Tomate', ro: 'roșie' },
          { de: 'Kartoffel', ro: 'cartof' },
          { de: 'Erdbeere', ro: 'căpșună' },
          { de: 'Salat', ro: 'salată' },
          { de: 'Gemuse', ro: 'legume' },
          { de: 'Obst', ro: 'fructe' },
        ],
      },
    ],
  },
];

// 10x volum la unitățile vizuale simple (cuvinte uzuale): adăugăm exerciții
// generate din cuvintele fiecărei unități. Dialogurile (propoziții scurte) și
// Antrenamentul (deja generat) rămân neatinse.
for (const unit of getSectionById('cuvinte-uzuale')?.units || []) {
  unit.exercises = augmentExercises(unit.exercises, unit.words, 10, `unit:${unit.id}`);
}

export function getSectionById(id) {
  return sections.find(s => s.id === id);
}

export function getAllSections() {
  return sections;
}
