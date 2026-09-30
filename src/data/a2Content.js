// ============================================
// Drumul spre A2 — 100 de lecții, de la A1 spre A2, cu toate tipurile
// ============================================
// Lecțiile 1–70 (seriile 1–7): A1 din TOT conținutul existent — cuvinte pe
//   categorii (picturePick, sortCategories, match, listenChoice, trueFalse,
//   multiChoice, translate, listen, speak), propoziții (sentenceBuild, wordBank,
//   fillBlank...) și un dialog în fiecare lecție. Dificultatea crește pe serii:
//   1–2 recunoaștere, 3–5 mix, 6–7 cu tastare.
// Lecțiile 71–100 (seriile 8–10): trecerea A1 → A2. Fiecare temă A2 are 3
//   lecții (recunoaștere → mix → tot mixul). Proporția de A2 crește progresiv
//   de la ~40% la 100%; restul e recapitulare A1.
//
// 10 teme A2 × 8 propoziții, fiecare cu o regulă scurtă în română (`tip`),
// afișată la prima lecție a temei. Toate cuvintele germane există în
// dictionary.js (categoria `a2` pentru cele noi), deci trec de verify-vocab.
// Text german în ASCII (a/o/u/ss), ca în restul proiectului.

import { dictionary, findByDe } from './dictionary.js';
import { makeRng, generateExercises, TYPE_SETS } from './generator.js';
import { SENTENCE_GROUPS, SENTENCE_GROUPS_EXTRA, SENTENCE_TYPES_FULL, generateSentenceExercises } from './sentenceBank.js';
import { generateDialogues } from './sectionContent.js';

export const A2_GROUPS = [
  {
    key: 'a2_modale', name: 'Pot, trebuie, vreau', icon: '💪',
    tip: 'Verbul modal stă pe locul 2, infinitivul merge la final: Ich kann gut schwimmen.',
    sentences: [
      { de: 'Ich kann gut schwimmen.', ro: 'Pot să înot bine.', v: 'kann', vh: 'pot' },
      { de: 'Kannst du mir helfen?', ro: 'Poți să mă ajuți?', v: 'Kannst', vh: 'poți' },
      { de: 'Ich muss heute arbeiten.', ro: 'Trebuie să muncesc azi.', v: 'muss', vh: 'trebuie' },
      { de: 'Du musst viel Wasser trinken.', ro: 'Trebuie să bei multă apă.', v: 'musst', vh: 'trebuie (tu)' },
      { de: 'Wir wollen ins Kino gehen.', ro: 'Vrem să mergem la cinema.', v: 'wollen', vh: 'vrem' },
      { de: 'Ich will Deutsch lernen.', ro: 'Vreau să învăț germană.', v: 'will', vh: 'vreau' },
      { de: 'Hier darf man nicht rauchen.', ro: 'Aici nu este voie să se fumeze.', v: 'darf', vh: 'are voie' },
      { de: 'Er kann heute nicht kommen.', ro: 'El nu poate să vină azi.', v: 'kann', vh: 'poate' },
    ],
  },
  {
    key: 'a2_perfekt_haben', name: 'Ce am făcut (Perfekt cu haben)', icon: '📖',
    tip: 'Trecutul vorbit: haben pe locul 2 + participiul (ge…t / ge…en) la final.',
    sentences: [
      { de: 'Ich habe Brot gekauft.', ro: 'Am cumpărat pâine.', v: 'gekauft', vh: 'cumpărat' },
      { de: 'Ich habe gestern gearbeitet.', ro: 'Am muncit ieri.', v: 'gearbeitet', vh: 'muncit' },
      { de: 'Wir haben Pizza gegessen.', ro: 'Am mâncat pizza.', v: 'gegessen', vh: 'mâncat' },
      { de: 'Hast du Kaffee getrunken?', ro: 'Ai băut cafea?', v: 'getrunken', vh: 'băut' },
      { de: 'Er hat ein Buch gelesen.', ro: 'El a citit o carte.', v: 'gelesen', vh: 'citit' },
      { de: 'Ich habe Deutsch gelernt.', ro: 'Am învățat germană.', v: 'gelernt', vh: 'învățat' },
      { de: 'Was hast du gemacht?', ro: 'Ce ai făcut?', v: 'gemacht', vh: 'făcut' },
      { de: 'Ich habe gut geschlafen.', ro: 'Am dormit bine.', v: 'geschlafen', vh: 'dormit' },
    ],
  },
  {
    key: 'a2_perfekt_sein', name: 'Unde am fost (Perfekt cu sein)', icon: '🧳',
    tip: 'Verbele de mișcare și schimbare folosesc sein: Ich bin gegangen, wir sind gefahren.',
    sentences: [
      { de: 'Ich bin nach Hause gegangen.', ro: 'Am mers acasă.', v: 'gegangen', vh: 'mers' },
      { de: 'Wir sind mit dem Zug gefahren.', ro: 'Am mers cu trenul.', v: 'gefahren', vh: 'mers (cu vehiculul)' },
      { de: 'Er ist gestern gekommen.', ro: 'El a venit ieri.', v: 'gekommen', vh: 'venit' },
      { de: 'Bist du in Deutschland gewesen?', ro: 'Ai fost în Germania?', v: 'gewesen', vh: 'fost' },
      { de: 'Ich bin zu Hause geblieben.', ro: 'Am rămas acasă.', v: 'geblieben', vh: 'rămas' },
      { de: 'Das Kind ist schnell gelaufen.', ro: 'Copilul a alergat repede.', v: 'gelaufen', vh: 'alergat' },
      { de: 'Wir sind ins Kino gegangen.', ro: 'Am mers la cinema.', v: 'sind', vh: 'suntem (auxiliar)' },
      { de: 'Ich bin fruh aufgestanden.', ro: 'M-am trezit devreme.', v: 'aufgestanden', vh: 'trezit' },
    ],
  },
  {
    key: 'a2_akkusativ', name: 'Pe cine? Ce? (acuzativ)', icon: '🎯',
    tip: 'La acuzativ doar masculinul se schimbă: der → den, ein → einen, mein → meinen.',
    sentences: [
      { de: 'Ich sehe den Hund.', ro: 'Văd câinele.', v: 'den', vh: 'articol acuzativ' },
      { de: 'Ich kaufe einen Mantel.', ro: 'Cumpăr un palton.', v: 'einen', vh: 'un (acuzativ)' },
      { de: 'Ich liebe dich.', ro: 'Te iubesc.', v: 'dich', vh: 'pe tine' },
      { de: 'Kennst du den Lehrer?', ro: 'Îl cunoști pe profesor?', v: 'Kennst', vh: 'cunoști' },
      { de: 'Ich besuche meinen Vater.', ro: 'Îl vizitez pe tatăl meu.', v: 'meinen', vh: 'pe al meu' },
      { de: 'Wir brauchen einen Tisch.', ro: 'Avem nevoie de o masă.', v: 'einen', vh: 'un (acuzativ)' },
      { de: 'Ich finde den Film gut.', ro: 'Filmul mi se pare bun.', v: 'finde', vh: 'mi se pare' },
      { de: 'Hast du einen Bruder?', ro: 'Ai un frate?', v: 'Hast', vh: 'ai' },
    ],
  },
  {
    key: 'a2_dativ', name: 'Cu cine? Cui? (dativ)', icon: '🤝',
    tip: 'După mit, bei, zu, nach vine dativul: der/das → dem, die → der. mir = mie, dir = ție.',
    sentences: [
      { de: 'Ich fahre mit dem Auto.', ro: 'Merg cu mașina.', v: 'dem', vh: 'articol dativ' },
      { de: 'Ich gebe dir das Buch.', ro: 'Îți dau cartea.', v: 'dir', vh: 'ție' },
      { de: 'Das Kleid gefallt mir.', ro: 'Rochia îmi place.', v: 'mir', vh: 'mie' },
      { de: 'Ich helfe meiner Mutter.', ro: 'O ajut pe mama mea.', v: 'meiner', vh: 'a mea (dativ)' },
      { de: 'Wir wohnen bei den Eltern.', ro: 'Locuim la părinți.', v: 'bei', vh: 'la (cineva)' },
      { de: 'Er spricht mit der Lehrerin.', ro: 'El vorbește cu profesoara.', v: 'spricht', vh: 'vorbește' },
      { de: 'Das Essen schmeckt mir.', ro: 'Mâncarea îmi place.', v: 'schmeckt', vh: 'are gust' },
      { de: 'Ich gehe mit meinem Freund.', ro: 'Merg cu prietenul meu.', v: 'meinem', vh: 'al meu (dativ)' },
    ],
  },
  {
    key: 'a2_separabile', name: 'Verbe care se despart', icon: '✂️',
    tip: 'Verbele separabile își trimit prefixul la final: aufstehen → Ich stehe um sieben Uhr auf.',
    sentences: [
      { de: 'Ich stehe um sieben Uhr auf.', ro: 'Mă trezesc la ora șapte.', v: 'auf', vh: 'prefixul lui aufstehen' },
      { de: 'Ich rufe dich morgen an.', ro: 'Te sun mâine.', v: 'an', vh: 'prefixul lui anrufen' },
      { de: 'Wir kaufen im Supermarkt ein.', ro: 'Facem cumpărături la supermarket.', v: 'kaufen', vh: 'cumpărăm' },
      { de: 'Er sieht am Abend fern.', ro: 'El se uită seara la televizor.', v: 'fern', vh: 'prefixul lui fernsehen' },
      { de: 'Der Zug fahrt um acht Uhr ab.', ro: 'Trenul pleacă la ora opt.', v: 'ab', vh: 'prefixul lui abfahren' },
      { de: 'Kommst du heute mit?', ro: 'Vii și tu azi?', v: 'mit', vh: 'prefixul lui mitkommen' },
      { de: 'Ich mache das Fenster auf.', ro: 'Deschid fereastra.', v: 'mache', vh: 'fac' },
      { de: 'Mach bitte die Tur zu.', ro: 'Închide te rog ușa.', v: 'zu', vh: 'prefixul lui zumachen' },
    ],
  },
  {
    key: 'a2_ora', name: 'Ora și programul', icon: '🕒',
    tip: 'halb acht = 7:30 (jumătate spre opt). um … Uhr = la ora …; am Montag = luni.',
    sentences: [
      { de: 'Wie spat ist es?', ro: 'Cât este ceasul?', v: 'spat', vh: 'târziu' },
      { de: 'Es ist halb acht.', ro: 'Este șapte și jumătate.', v: 'halb', vh: 'jumătate' },
      { de: 'Es ist Viertel nach drei.', ro: 'Este trei și un sfert.', v: 'nach', vh: 'după' },
      { de: 'Es ist zehn vor neun.', ro: 'Este nouă fără zece.', v: 'vor', vh: 'înainte de' },
      { de: 'Der Film beginnt um acht Uhr.', ro: 'Filmul începe la ora opt.', v: 'beginnt', vh: 'începe' },
      { de: 'Am Montag arbeite ich.', ro: 'Luni muncesc.', v: 'arbeite', vh: 'muncesc' },
      { de: 'Ich habe um drei Uhr Zeit.', ro: 'Am timp la ora trei.', v: 'um', vh: 'la (ora)' },
      { de: 'Am Wochenende schlafe ich lange.', ro: 'În weekend dorm mult.', v: 'schlafe', vh: 'dorm' },
    ],
  },
  {
    key: 'a2_comparativ', name: 'Mai mare, mai bun', icon: '📊',
    tip: 'Comparativ = adjectiv + -er, apoi „als" (decât): schnell → schneller als. gut → besser.',
    sentences: [
      { de: 'Der Berg ist hoher als das Haus.', ro: 'Muntele este mai înalt decât casa.', v: 'als', vh: 'decât' },
      { de: 'Mein Bruder ist alter als ich.', ro: 'Fratele meu este mai mare decât mine.', v: 'alter', vh: 'mai în vârstă' },
      { de: 'Der Zug ist schneller als der Bus.', ro: 'Trenul este mai rapid decât autobuzul.', v: 'schneller', vh: 'mai rapid' },
      { de: 'Tee ist besser als Kaffee.', ro: 'Ceaiul este mai bun decât cafeaua.', v: 'besser', vh: 'mai bun' },
      { de: 'Ich trinke lieber Tee.', ro: 'Prefer să beau ceai.', v: 'lieber', vh: 'mai degrabă' },
      { de: 'Die Katze ist kleiner als der Hund.', ro: 'Pisica este mai mică decât câinele.', v: 'kleiner', vh: 'mai mică' },
      { de: 'Heute ist es warmer als gestern.', ro: 'Azi este mai cald decât ieri.', v: 'warmer', vh: 'mai cald' },
      { de: 'Das Auto ist teurer als das Fahrrad.', ro: 'Mașina este mai scumpă decât bicicleta.', v: 'teurer', vh: 'mai scump' },
    ],
  },
  {
    key: 'a2_conectori', name: 'Pentru că, că, dar', icon: '🔗',
    tip: 'După weil, dass, wenn verbul fuge la final. După aber și denn ordinea rămâne normală.',
    sentences: [
      { de: 'Ich bleibe zu Hause, weil ich krank bin.', ro: 'Rămân acasă pentru că sunt bolnav.', v: 'weil', vh: 'pentru că' },
      { de: 'Ich lerne Deutsch, weil ich in Deutschland wohne.', ro: 'Învăț germană pentru că locuiesc în Germania.', v: 'wohne', vh: 'locuiesc' },
      { de: 'Ich glaube, dass er kommt.', ro: 'Cred că vine.', v: 'dass', vh: 'că' },
      { de: 'Ich weiss, dass du mude bist.', ro: 'Știu că ești obosit.', v: 'bist', vh: 'ești' },
      { de: 'Ich mochte kommen, aber ich habe keine Zeit.', ro: 'Aș vrea să vin, dar nu am timp.', v: 'aber', vh: 'dar' },
      { de: 'Das Wetter ist schlecht, aber wir gehen in den Park.', ro: 'Vremea este rea, dar mergem în parc.', v: 'aber', vh: 'dar' },
      { de: 'Ich trinke Kaffee, denn ich bin mude.', ro: 'Beau cafea, căci sunt obosit.', v: 'denn', vh: 'căci' },
      { de: 'Wenn es regnet, bleibe ich zu Hause.', ro: 'Dacă plouă, rămân acasă.', v: 'regnet', vh: 'plouă' },
    ],
  },
  {
    key: 'a2_ziua', name: 'Povestește-ți ziua', icon: '🗓️',
    tip: 'Când începi cu timpul (Heute, Am Abend…), verbul rămâne pe locul 2: Heute gehe ich…',
    sentences: [
      { de: 'Heute gehe ich ins Buro.', ro: 'Azi merg la birou.', v: 'gehe', vh: 'merg' },
      { de: 'Morgen fahre ich nach Osterreich.', ro: 'Mâine merg în Austria.', v: 'fahre', vh: 'merg (cu vehiculul)' },
      { de: 'Am Abend lese ich ein Buch.', ro: 'Seara citesc o carte.', v: 'lese', vh: 'citesc' },
      { de: 'Zuerst trinke ich Kaffee, dann esse ich Brot.', ro: 'Mai întâi beau cafea, apoi mănânc pâine.', v: 'dann', vh: 'apoi' },
      { de: 'Im Sommer fahren wir ans Meer.', ro: 'Vara mergem la mare.', v: 'fahren', vh: 'mergem' },
      { de: 'Nach der Arbeit gehe ich einkaufen.', ro: 'După muncă merg la cumpărături.', v: 'einkaufen', vh: 'a face cumpărături' },
      { de: 'Manchmal koche ich Suppe.', ro: 'Uneori gătesc supă.', v: 'koche', vh: 'gătesc' },
      { de: 'Am Sonntag besuchen wir die Grossmutter.', ro: 'Duminică o vizităm pe bunica.', v: 'besuchen', vh: 'vizităm' },
    ],
  },
];

// Cuvintele-cheie ale fiecărei teme A2 (intrări din dicționar) — pentru
// exercițiile pe cuvânt: match, listenChoice, trueFalse, multiChoice, listen.
const A2_THEME_WORDS = {
  a2_modale: ['kann', 'kannst', 'muss', 'musst', 'will', 'wollen', 'darf'],
  a2_perfekt_haben: ['gekauft', 'gearbeitet', 'gegessen', 'getrunken', 'gelesen', 'gelernt', 'gemacht', 'gespielt', 'geschlafen'],
  a2_perfekt_sein: ['gegangen', 'gefahren', 'gekommen', 'gewesen', 'geblieben', 'gelaufen', 'aufgestanden'],
  a2_akkusativ: ['meinen', 'Buch', 'Film', 'kennst', 'besuche', 'finde', 'hast'],
  a2_dativ: ['meinem', 'meiner', 'bei', 'helfe', 'gebe', 'gefallt', 'Lehrerin'],
  a2_separabile: ['stehe', 'rufe', 'sieht', 'fahrt', 'einkaufen', 'mache', 'mach'],
  a2_ora: ['spat', 'fruh', 'halb', 'Viertel', 'um', 'vor', 'lange'],
  a2_comparativ: ['besser', 'lieber', 'hoher', 'alter', 'schneller', 'kleiner', 'warmer', 'teurer'],
  a2_conectori: ['weil', 'dass', 'aber', 'denn', 'wenn', 'krank', 'glaube'],
  a2_ziua: ['manchmal', 'koche', 'lese', 'besuchen', 'zuerst', 'dann', 'regnet'],
};

const toWord = e => ({ de: e.de, ro: e.ro, article: e.article });
const A2_WORD_POOL = dictionary.filter(e => e.category === 'a2').map(toWord);
const themeWords = key => A2_THEME_WORDS[key].map(findByDe).filter(Boolean).map(toWord);

// Dialoguri A2 (întrebare → replica lipsă aleasă/construită → încheiere)
const A2_DIALOGUES = [
  {
    opener: { de: 'Was hast du gestern gemacht?', ro: 'Ce ai făcut ieri?' },
    answers: [
      { de: 'Ich habe gearbeitet', ro: 'Am muncit' },
      { de: 'Ich habe Deutsch gelernt', ro: 'Am învățat germană' },
      { de: 'Ich habe Pizza gegessen', ro: 'Am mâncat pizza' },
    ],
    closer: { de: 'Sehr gut!', ro: 'Foarte bine!' },
  },
  {
    opener: { de: 'Kannst du mir helfen?', ro: 'Poți să mă ajuți?' },
    answers: [
      { de: 'Ja ich kann dir helfen', ro: 'Da, pot să te ajut' },
      { de: 'Nein ich muss arbeiten', ro: 'Nu, trebuie să muncesc' },
    ],
    closer: { de: 'Danke!', ro: 'Mulțumesc!' },
  },
  {
    opener: { de: 'Wie spat ist es?', ro: 'Cât este ceasul?' },
    answers: [
      { de: 'Es ist halb acht', ro: 'Este șapte și jumătate' },
      { de: 'Es ist zehn vor neun', ro: 'Este nouă fără zece' },
      { de: 'Es ist Viertel nach drei', ro: 'Este trei și un sfert' },
    ],
    closer: { de: 'Danke!', ro: 'Mulțumesc!' },
  },
  {
    opener: { de: 'Kommst du heute mit?', ro: 'Vii și tu azi?' },
    answers: [
      { de: 'Nein ich bin krank', ro: 'Nu, sunt bolnav' },
      { de: 'Ja gern', ro: 'Da, cu plăcere' },
      { de: 'Nein ich habe keine Zeit', ro: 'Nu, nu am timp' },
    ],
    closer: { de: 'Gut!', ro: 'Bine!' },
  },
  {
    opener: { de: 'Was trinkst du lieber?', ro: 'Ce preferi să bei?' },
    answers: [
      { de: 'Ich trinke lieber Tee', ro: 'Prefer să beau ceai' },
      { de: 'Ich trinke lieber Kaffee', ro: 'Prefer să beau cafea' },
      { de: 'Ich trinke lieber Wasser', ro: 'Prefer să beau apă' },
    ],
    closer: { de: 'Sehr gut!', ro: 'Foarte bine!' },
  },
];
const A2_ALL_ANSWERS = A2_DIALOGUES.flatMap(d => d.answers);
const CHARS = [
  [{ name: 'Anna', emoji: '👩' }, { name: 'Max', emoji: '🧑' }],
  [{ name: 'Elena', emoji: '👧' }, { name: 'Lukas', emoji: '🧑' }],
  [{ name: 'Maria', emoji: '👩' }, { name: 'Tom', emoji: '👦' }],
];
const DIALOGUE_FILLERS = ['nicht', 'sehr', 'und', 'oder'];

function shuffle(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Dialog A2: multiChoice la început, piese (wordBank) când `build` e true
function a2Dialogue(rnd, build) {
  const t = A2_DIALOGUES[Math.floor(rnd() * A2_DIALOGUES.length)];
  const ans = t.answers[Math.floor(rnd() * t.answers.length)];
  const chars = CHARS[Math.floor(rnd() * CHARS.length)];
  const ex = {
    type: 'dialogue',
    scene: t.opener.ro,
    characters: chars,
    lines: [
      { who: 0, de: t.opener.de, ro: t.opener.ro },
      { who: 1, blank: true, answer: ans.de, ro: ans.ro },
      { who: 0, de: t.closer.de, ro: t.closer.ro },
    ],
  };
  if (build) {
    const tokens = ans.de.split(' ');
    const extra = shuffle(DIALOGUE_FILLERS.filter(w => !tokens.includes(w)), rnd).slice(0, 2);
    return { ...ex, mode: 'wordBank', bank: [...tokens, ...extra] };
  }
  const distract = shuffle(A2_ALL_ANSWERS.filter(a => a.de !== ans.de), rnd).slice(0, 2);
  return { ...ex, mode: 'multiChoice', options: shuffle([ans.de, ...distract.map(d => d.de)], rnd) };
}

// Amestecă listele păstrând varietatea: ia pe rând din fiecare
function interleave(lists) {
  const out = [];
  const max = Math.max(...lists.map(l => l.length));
  for (let i = 0; i < max; i++) for (const l of lists) if (i < l.length) out.push(l[i]);
  return out;
}

// --- Partea A1 (lecțiile 1–70) ---

// Categorii de cuvinte (cu emoji acolo unde există → picturePick)
const A1_WORD_CATS = [
  'animale', 'mancare', 'culori', 'bauturi', 'familie', 'numere', 'casa', 'haine',
  'corp', 'natura', 'transport', 'locuri', 'vreme', 'zile', 'meserii', 'luni',
  'verbe', 'adjective', 'timp',
];
const catWords = cat => dictionary.filter(e => e.category === cat).map(toWord);
const A1_SENTENCE_GROUPS = [...SENTENCE_GROUPS, ...SENTENCE_GROUPS_EXTRA];
const A1_SENTENCES = A1_SENTENCE_GROUPS.flatMap(g => g.sentences);

const A1_SENTENCE_TYPES = {
  easy: ['sentenceBuild', 'mcDeRo', 'listenChoice', 'trueFalse', 'match'],
  medium: ['sentenceBuild', 'mcDeRo', 'mcRoDe', 'wordBank', 'fillBlank', 'listen', 'match', 'trueFalse'],
  hard: SENTENCE_TYPES_FULL,
};

function a1Level(series) {
  if (series <= 2) return 'easy';
  if (series <= 5) return 'medium';
  return 'hard';
}

const LEVEL_LABEL = { easy: 'ușor', medium: 'mediu', hard: 'greu' };

function buildA1Unit(n, id) {
  const series = Math.ceil(n / 10);
  const level = a1Level(series);
  const cat = A1_WORD_CATS[(n - 1) % A1_WORD_CATS.length];
  const group = A1_SENTENCE_GROUPS[(n - 1) % A1_SENTENCE_GROUPS.length];
  const words = catWords(cat);
  const nextCat = A1_WORD_CATS[n % A1_WORD_CATS.length];
  // sortCategories are nevoie de 2 categorii în pool → vecina din listă
  const pool = words.concat(catWords(nextCat));

  const wordEx = generateExercises({ words, pool, count: 4, seed: `${id}:w`, types: TYPE_SETS[level] });
  const sentEx = generateSentenceExercises({
    sentences: group.sentences, count: 3, seed: `${id}:s`, types: A1_SENTENCE_TYPES[level],
  });
  const dialogue = generateDialogues({ count: 1, seed: `${id}:d` });
  const exercises = interleave([wordEx, sentEx]);
  exercises.splice(Math.min(3, exercises.length), 0, ...dialogue);

  return {
    id,
    title: group.name,
    icon: group.icon,
    description: `A1 · Seria ${series} · ${LEVEL_LABEL[level]}`,
    generated: true,
    words: words.concat(group.sentences.map(s => ({ de: s.de, ro: s.ro }))),
    exercises,
  };
}

// --- Partea A1 → A2 (lecțiile 71–100) ---

// Pe etapa din temă: 0 recunoaștere, 1 mix, 2 tot mixul (cu tastare)
const A2_SENTENCE_STAGES = [
  ['sentenceBuild', 'mcDeRo', 'listenChoice', 'trueFalse', 'match', 'mcRoDe'],
  ['sentenceBuild', 'mcDeRo', 'mcRoDe', 'listenChoice', 'fillBlank', 'wordBank', 'match', 'listen'],
  ['sentenceBuild', 'fillBlank', 'translate_de_ro', 'translate_ro_de', 'listen', 'speak',
    'wordBank', 'mcRoDe', 'listenChoice', 'trueFalse', 'match'],
];
const A2_WORD_STAGES = [
  ['match', 'listenChoice', 'trueFalse', 'mcDeRo'],
  ['match', 'mcRoDe', 'listenChoice', 'listen'],
  ['translateDeRo', 'translateRoDe', 'listen', 'speak', 'match'],
];

const TRANSITION_COUNT = 30;
const UNIT_SIZE = 9; // exerciții per lecție de tranziție (inclusiv dialogul)

function buildTransitionUnit(i, id) {
  const t = Math.floor((i - 1) / 3);   // tema A2 (0–9)
  const stage = (i - 1) % 3;           // etapa în temă
  const group = A2_GROUPS[t];
  const series = 7 + Math.ceil(i / 10);
  const rnd = makeRng(`${id}:mix`);

  // Proporția A2 crește liniar: ~40% la lecția 71 → 100% la lecția 100
  const share = 0.4 + 0.6 * ((i - 1) / (TRANSITION_COUNT - 1));
  const a2Total = Math.round((UNIT_SIZE - 1) * share);
  const a1Count = UNIT_SIZE - 1 - a2Total;
  const a2WordCount = Math.min(2, Math.max(1, Math.floor(a2Total / 3)));
  const a2SentCount = a2Total - a2WordCount;

  const a2Words = generateExercises({
    words: themeWords(group.key), pool: A2_WORD_POOL, count: a2WordCount,
    seed: `${id}:w`, types: A2_WORD_STAGES[stage],
  });
  const a2Sent = generateSentenceExercises({
    sentences: group.sentences, count: a2SentCount, seed: `${id}:s`, types: A2_SENTENCE_STAGES[stage],
  });
  // Recapitulare A1: propoziții deja învățate, pe tipurile mai grele
  const a1Review = a1Count > 0 ? generateSentenceExercises({
    sentences: shuffle(A1_SENTENCES, rnd).slice(0, 8), count: a1Count, seed: `${id}:a1`, types: A1_SENTENCE_TYPES.hard,
  }) : [];

  // Dialogul: A1 la prima etapă a primelor teme, apoi A2 (cu piese la etapa 3)
  const dialogue = stage === 0 && t < 3
    ? generateDialogues({ count: 1, seed: `${id}:d` })[0]
    : a2Dialogue(rnd, stage === 2);

  const exercises = interleave([a2Sent, a1Review, a2Words]);
  exercises.splice(Math.min(4, exercises.length), 0, dialogue);

  const pct = Math.round(share * 100);
  return {
    id,
    title: group.name,
    icon: group.icon,
    description: stage === 0 ? `💡 ${group.tip}` : `A1 → A2 · Seria ${series} · ${pct}% A2`,
    generated: true,
    words: group.sentences.map(s => ({ de: s.de, ro: s.ro })),
    exercises,
  };
}

export function buildA2Units(prefix) {
  const out = [];
  for (let n = 1; n <= 70; n++) out.push(buildA1Unit(n, `${prefix}-${n}`));
  for (let i = 1; i <= TRANSITION_COUNT; i++) out.push(buildTransitionUnit(i, `${prefix}-${70 + i}`));
  return out;
}

