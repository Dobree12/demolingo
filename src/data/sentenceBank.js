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

// ============================================
// Grupuri suplimentare — seriile 16–25 (doar propoziții, vocabular deja învățat)
// ============================================
// Aceleași reguli: fiecare token german există în dictionary.js. Formele
// conjugate noi (gehe, kaufe, wohne...) și cuvintele funcționale (in, im, dem...)
// au fost adăugate în dicționar, verificate cu PONS.
export const SENTENCE_GROUPS_EXTRA = [
  {
    key: 'e_oras', name: 'În oraș', icon: '🏙️',
    sentences: [
      { de: 'Ich gehe in die Stadt.', ro: 'Merg în oraș.', v: 'gehe', vh: 'merg' },
      { de: 'Ich gehe ins Kino.', ro: 'Merg la cinema.', v: 'gehe', vh: 'merg' },
      { de: 'Wo ist der Bahnhof?', ro: 'Unde este gara?', v: 'ist', vh: 'este' },
      { de: 'Der Supermarkt ist gross.', ro: 'Supermarketul este mare.', v: 'ist', vh: 'este' },
      { de: 'Ich fahre mit dem Bus.', ro: 'Merg cu autobuzul.', v: 'fahre', vh: 'merg (cu un vehicul)' },
      { de: 'Wir gehen in den Park.', ro: 'Mergem în parc.', v: 'gehen', vh: 'mergem' },
      { de: 'Die Kirche ist alt.', ro: 'Biserica este veche.', v: 'ist', vh: 'este' },
      { de: 'Das Museum ist schon.', ro: 'Muzeul este frumos.', v: 'ist', vh: 'este' },
    ],
  },
  {
    key: 'e_cumparaturi', name: 'La cumpărături', icon: '🛒',
    sentences: [
      { de: 'Ich kaufe Brot.', ro: 'Cumpăr pâine.', v: 'kaufe', vh: 'cumpăr' },
      { de: 'Ich kaufe einen Apfel.', ro: 'Cumpăr un măr.', v: 'kaufe', vh: 'cumpăr' },
      { de: 'Was kostet das?', ro: 'Cât costă asta?', v: 'kostet', vh: 'costă' },
      { de: 'Das ist teuer.', ro: 'Asta este scump.', v: 'ist', vh: 'este' },
      { de: 'Das ist billig.', ro: 'Asta este ieftin.', v: 'ist', vh: 'este' },
      { de: 'Ich brauche Milch.', ro: 'Am nevoie de lapte.', v: 'brauche', vh: 'am nevoie' },
      { de: 'Der Markt ist voll.', ro: 'Piața este plină.', v: 'ist', vh: 'este' },
      { de: 'Ich mochte Kase kaufen.', ro: 'Aș vrea să cumpăr brânză.', v: 'kaufen', vh: 'să cumpăr' },
    ],
  },
  {
    key: 'e_acasa', name: 'Acasă', icon: '🏠',
    sentences: [
      { de: 'Ich wohne in Deutschland.', ro: 'Locuiesc în Germania.', v: 'wohne', vh: 'locuiesc' },
      { de: 'Das Bett ist neu.', ro: 'Patul este nou.', v: 'ist', vh: 'este' },
      { de: 'Die Lampe ist klein.', ro: 'Lampa este mică.', v: 'ist', vh: 'este' },
      { de: 'Ich schlafe im Bett.', ro: 'Dorm în pat.', v: 'schlafe', vh: 'dorm' },
      { de: 'Das Fenster ist gross.', ro: 'Fereastra este mare.', v: 'ist', vh: 'este' },
      { de: 'Der Tisch ist alt.', ro: 'Masa este veche.', v: 'ist', vh: 'este' },
      { de: 'Wir haben ein Sofa.', ro: 'Avem o canapea.', v: 'haben', vh: 'avem' },
      { de: 'Die Tur ist neu.', ro: 'Ușa este nouă.', v: 'ist', vh: 'este' },
    ],
  },
  {
    key: 'e_familie', name: 'Familia mea', icon: '👪',
    sentences: [
      { de: 'Meine Mutter ist jung.', ro: 'Mama mea este tânără.', v: 'ist', vh: 'este' },
      { de: 'Mein Vater ist stark.', ro: 'Tatăl meu este puternic.', v: 'ist', vh: 'este' },
      { de: 'Mein Bruder spielt Fussball.', ro: 'Fratele meu joacă fotbal.', v: 'spielt', vh: 'joacă' },
      { de: 'Meine Schwester lernt Deutsch.', ro: 'Sora mea învață germană.', v: 'lernt', vh: 'învață' },
      { de: 'Die Familie ist gross.', ro: 'Familia este mare.', v: 'ist', vh: 'este' },
      { de: 'Das Kind spielt im Park.', ro: 'Copilul se joacă în parc.', v: 'spielt', vh: 'se joacă' },
      { de: 'Mein Freund kommt heute.', ro: 'Prietenul meu vine azi.', v: 'kommt', vh: 'vine' },
      { de: 'Ich liebe meine Familie.', ro: 'Îmi iubesc familia.', v: 'liebe', vh: 'iubesc' },
    ],
  },
  {
    key: 'e_masa', name: 'La masă', icon: '🍽️',
    sentences: [
      { de: 'Die Suppe ist heiss.', ro: 'Supa este fierbinte.', v: 'ist', vh: 'este' },
      { de: 'Ich esse gern Pizza.', ro: 'Mănânc cu plăcere pizza.', v: 'esse', vh: 'mănânc' },
      { de: 'Der Fisch schmeckt gut.', ro: 'Peștele are gust bun.', v: 'schmeckt', vh: 'are gust' },
      { de: 'Du isst ein Ei.', ro: 'Tu mănânci un ou.', v: 'isst', vh: 'mănânci' },
      { de: 'Wir trinken Saft.', ro: 'Bem suc.', v: 'trinken', vh: 'bem' },
      { de: 'Der Wein ist rot.', ro: 'Vinul este roșu.', v: 'ist', vh: 'este' },
      { de: 'Das Brot ist gut.', ro: 'Pâinea este bună.', v: 'ist', vh: 'este' },
      { de: 'Die Banane ist gelb.', ro: 'Banana este galbenă.', v: 'ist', vh: 'este' },
    ],
  },
  {
    key: 'e_timp', name: 'Timpul', icon: '⏰',
    sentences: [
      { de: 'Der Tag ist schon.', ro: 'Ziua este frumoasă.', v: 'ist', vh: 'este' },
      { de: 'Die Nacht ist kalt.', ro: 'Noaptea este rece.', v: 'ist', vh: 'este' },
      { de: 'Heute ist Montag.', ro: 'Azi este luni.', v: 'ist', vh: 'este' },
      { de: 'Morgen ist Dienstag.', ro: 'Mâine este marți.', v: 'ist', vh: 'este' },
      { de: 'Das Jahr ist neu.', ro: 'Anul este nou.', v: 'ist', vh: 'este' },
      { de: 'Ich habe heute Zeit.', ro: 'Am timp azi.', v: 'habe', vh: 'am' },
      { de: 'Der Monat ist kurz.', ro: 'Luna este scurtă.', v: 'ist', vh: 'este' },
      { de: 'Die Stunde ist lang.', ro: 'Ora este lungă.', v: 'ist', vh: 'este' },
    ],
  },
  {
    key: 'e_calatorie', name: 'Călătorie', icon: '✈️',
    sentences: [
      { de: 'Der Zug kommt jetzt.', ro: 'Trenul vine acum.', v: 'kommt', vh: 'vine' },
      { de: 'Ich fahre nach Deutschland.', ro: 'Merg în Germania.', v: 'fahre', vh: 'merg (cu un vehicul)' },
      { de: 'Das Flugzeug ist gross.', ro: 'Avionul este mare.', v: 'ist', vh: 'este' },
      { de: 'Wir fahren mit dem Taxi.', ro: 'Mergem cu taxiul.', v: 'fahren', vh: 'mergem' },
      { de: 'Das Fahrrad ist neu.', ro: 'Bicicleta este nouă.', v: 'ist', vh: 'este' },
      { de: 'Der Bus ist voll.', ro: 'Autobuzul este plin.', v: 'ist', vh: 'este' },
      { de: 'Ich gehe zu Fuss.', ro: 'Merg pe jos.', v: 'gehe', vh: 'merg' },
      { de: 'Das Schiff ist langsam.', ro: 'Vaporul este lent.', v: 'ist', vh: 'este' },
    ],
  },
  {
    key: 'e_natura', name: 'Natura', icon: '🌳',
    sentences: [
      { de: 'Der Himmel ist blau.', ro: 'Cerul este albastru.', v: 'ist', vh: 'este' },
      { de: 'Der Baum ist hoch.', ro: 'Copacul este înalt.', v: 'ist', vh: 'este' },
      { de: 'Die Blume ist rosa.', ro: 'Floarea este roz.', v: 'ist', vh: 'este' },
      { de: 'Der Mond ist schon.', ro: 'Luna este frumoasă.', v: 'ist', vh: 'este' },
      { de: 'Es gibt heute Regen.', ro: 'Azi este ploaie.', v: 'gibt', vh: 'există / dă' },
      { de: 'Der Schnee ist weiss.', ro: 'Zăpada este albă.', v: 'ist', vh: 'este' },
      { de: 'Der Sturm kommt heute.', ro: 'Furtuna vine azi.', v: 'kommt', vh: 'vine' },
      { de: 'Der Stern ist klein.', ro: 'Steaua este mică.', v: 'ist', vh: 'este' },
    ],
  },
  {
    key: 'e_munca', name: 'Muncă și școală', icon: '💼',
    sentences: [
      { de: 'Ich arbeite heute.', ro: 'Muncesc azi.', v: 'arbeite', vh: 'muncesc' },
      { de: 'Die Schule ist gross.', ro: 'Școala este mare.', v: 'ist', vh: 'este' },
      { de: 'Der Lehrer ist gut.', ro: 'Profesorul este bun.', v: 'ist', vh: 'este' },
      { de: 'Ich lerne heute Deutsch.', ro: 'Învăț germană azi.', v: 'lerne', vh: 'învăț' },
      { de: 'Der Arzt arbeitet im Krankenhaus.', ro: 'Medicul lucrează la spital.', v: 'arbeitet', vh: 'lucrează' },
      { de: 'Der Koch macht Suppe.', ro: 'Bucătarul face supă.', v: 'macht', vh: 'face' },
      { de: 'Der Student lernt viel.', ro: 'Studentul învață mult.', v: 'lernt', vh: 'învață' },
      { de: 'Ich mochte heute lesen.', ro: 'Aș vrea să citesc azi.', v: 'lesen', vh: 'să citesc' },
    ],
  },
  {
    key: 'e_conversatie', name: 'Conversație', icon: '💬',
    sentences: [
      { de: 'Was machst du heute?', ro: 'Ce faci azi?', v: 'machst', vh: 'faci' },
      { de: 'Ich sehe dich morgen.', ro: 'Te văd mâine.', v: 'sehe', vh: 'văd' },
      { de: 'Kommst du mit?', ro: 'Vii și tu?', v: 'kommst', vh: 'vii' },
      { de: 'Was trinkst du?', ro: 'Ce bei?', v: 'trinkst', vh: 'bei' },
      { de: 'Wo wohnst du?', ro: 'Unde locuiești?', v: 'wohnst', vh: 'locuiești' },
      { de: 'Du sprichst gut Deutsch.', ro: 'Tu vorbești bine germană.', v: 'sprichst', vh: 'vorbești' },
      { de: 'Ich hore Musik.', ro: 'Ascult muzică.', v: 'hore', vh: 'ascult' },
      { de: 'Ich schreibe dir morgen.', ro: 'Îți scriu mâine.', v: 'schreibe', vh: 'scriu' },
    ],
  },
];

// Distractori RO pentru wordBank (nu sunt verificați de verify-vocab — doar
// promptul german al exercițiului e validat).
const RO_FILLERS = ['și', 'un', 'este', 'foarte', 'bine', 'aici', 'mâine', 'azi', 'cu', 'la', 'mereu', 'acolo'];

// Distractori GERMANI pentru sentenceBuild (piese în plus în bancă). Toate
// sunt cuvinte din dicționar, dar sentenceBuild oricum nu e verificat.
const DE_FILLERS = ['und', 'nicht', 'sehr', 'gut', 'heute', 'mit', 'oder', 'jetzt'];

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

// Alege `n` propoziții diferite de `s` din pool (după textul german).
function othersFrom(s, pool, n, rnd) {
  const seen = new Set([s.de]);
  const out = [];
  for (const x of shuffle(pool, rnd)) {
    if (seen.has(x.de)) continue;
    seen.add(x.de);
    out.push(x);
    if (out.length >= n) break;
  }
  return out;
}

// --- Constructori de exerciții pe propoziție ---
// Semnătura: (s, rnd, pool) — pool = toate propozițiile grupului (pentru
// distractori). Constructorii care nu pot produce un exercițiu întorc null.
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
  // Construiește propoziția GERMANĂ din piese (scriere fără tastatură germană).
  sentenceBuild: (s, rnd) => {
    const answerWords = words(s.de);
    const lower = new Set(answerWords.map(w => w.toLowerCase()));
    const distractors = shuffle(DE_FILLERS.filter(w => !lower.has(w)), rnd).slice(0, 3);
    return {
      type: 'sentenceBuild',
      promptRo: s.ro,
      answer: s.de,
      bank: [...answerWords, ...distractors],
    };
  },
  // Potrivește propoziții germane cu traducerile lor.
  match: (s, rnd, pool) => {
    const others = othersFrom(s, pool, 3, rnd);
    if (others.length < 3) return null;
    const four = shuffle([s, ...others], rnd);
    return { type: 'match', pairs: four.map(x => [x.de, x.ro]) };
  },
  // „Ce înseamnă «propoziția germană»?" — variante românești.
  mcDeRo: (s, rnd, pool) => {
    const others = othersFrom(s, pool, 3, rnd);
    if (others.length < 3) return null;
    return {
      type: 'multiChoice',
      question: `Ce înseamnă "${s.de}"?`,
      correct: s.ro,
      options: shuffle([s.ro, ...others.map(x => x.ro)], rnd),
    };
  },
  // „Cum se spune «propoziția românească» în germană?" — variante germane.
  mcRoDe: (s, rnd, pool) => {
    const others = othersFrom(s, pool, 3, rnd);
    if (others.length < 3) return null;
    return {
      type: 'multiChoice',
      question: `Cum se spune "${s.ro}" în germană?`,
      correct: s.de,
      options: shuffle([s.de, ...others.map(x => x.de)], rnd),
    };
  },
  // Auzi propoziția germană (TTS), alegi sensul românesc.
  listenChoice: (s, rnd, pool) => {
    const others = othersFrom(s, pool, 3, rnd);
    if (others.length < 3) return null;
    return {
      type: 'listenChoice',
      word: s.de,
      correct: s.ro,
      options: shuffle([s.ro, ...others.map(x => x.ro)], rnd),
    };
  },
  // „«Propoziție germană» = «traducere»?" → Adevărat/Fals.
  trueFalse: (s, rnd, pool) => {
    const makeTrue = rnd() < 0.5;
    if (makeTrue) return { type: 'trueFalse', de: s.de, ro: s.ro, correct: s.ro, isTrue: true };
    const others = othersFrom(s, pool, 1, rnd);
    if (!others.length) return null;
    return { type: 'trueFalse', de: s.de, ro: others[0].ro, correct: s.ro, isTrue: false };
  },
};

// Ordine de tipuri cu accent pe propoziții/verbe (fillBlank ascunde verbul).
const SENTENCE_TYPES = [
  'translate_de_ro', 'fillBlank', 'wordBank', 'translate_ro_de', 'listen', 'speak',
];

// Mixul complet — toate tipurile de exerciții, pe propoziții (seriile 16–25).
export const SENTENCE_TYPES_FULL = [
  'sentenceBuild', 'mcDeRo', 'match', 'translate_de_ro', 'listenChoice', 'wordBank',
  'trueFalse', 'mcRoDe', 'fillBlank', 'listen', 'speak', 'translate_ro_de',
];

// Generează `count` exerciții dintr-un set de propoziții, determinist pe `seed`.
// `types` (opțional) alege mixul; implicit rămâne mixul istoric, ca lecțiile
// existente (lp-101..150, psg-*) să nu-și schimbe conținutul.
export function generateSentenceExercises({ sentences, count, seed, types = SENTENCE_TYPES }) {
  const rnd = makeRng(seed);
  const typeOrder = shuffle(types, rnd);
  const order = shuffle(sentences, rnd);
  const out = [];
  const seen = new Set();
  let guard = 0;
  // La fiecare pas rotim ȘI tipul ȘI propoziția, ca să obținem un mix de tipuri
  // (lungimile diferite — N tipuri vs M propoziții — dau perechi variate).
  while (out.length < count && guard < count * 8) {
    const k = guard;
    guard++;
    const typeName = typeOrder[k % typeOrder.length];
    const s = order[k % order.length];
    const key = `${typeName}:${s.de}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const ex = SENTENCE_BUILDERS[typeName](s, rnd, sentences);
    if (ex) out.push(ex);
  }
  return out;
}
