// ============================================
// „Despre mine" — 100 de propoziții casual din viața de zi cu zi
// ============================================
// Exerciții sentenceBuild autoreate (exceptate de la garda de vocabular din
// verify-vocab.mjs), organizate pe 10 unități tematice × 10 propoziții.
// Fiecare intrare e o pereche [română, germană]; builder-ul de mai jos produce
// banca de piese automat: tokenii răspunsului + 3 distractori aleși determinist
// dintr-un pool comun (renderSentenceBuild amestecă apoi ordinea).
// Convenție proiect: text german în ASCII (a/o/u/ss în loc de ä/ö/ü/ß).

import { makeRng } from './generator.js';

// Distractori plauzibili, cuvinte germane scurte și uzuale.
const DISTRACTORS = [
  'und', 'auch', 'sehr', 'nicht', 'heute', 'morgen', 'gern', 'hier', 'dort',
  'mit', 'fur', 'ein', 'eine', 'ist', 'gut', 'viel', 'immer', 'jetzt', 'noch',
  'bitte', 'wir', 'du', 'sie', 'das', 'schon', 'aber', 'oder', 'man',
];

function tokenize(s) {
  return s.replace(/[.,!?;:„""«»()]/g, '').split(/\s+/).filter(Boolean);
}

// Un exercițiu sentenceBuild: tokenii răspunsului + 3 distractori (determinist
// pe `seed`, ca build-ul și rularea să coincidă).
function makeSentenceExercise(ro, de, seed) {
  const rng = makeRng(seed);
  const answerTokens = tokenize(de);
  const inAnswer = new Set(answerTokens.map(t => t.toLowerCase()));
  const pool = DISTRACTORS.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const distractors = [];
  for (const d of pool) {
    if (distractors.length >= 3) break;
    if (!inAnswer.has(d.toLowerCase())) distractors.push(d);
  }
  return { type: 'sentenceBuild', promptRo: ro, answer: de, bank: answerTokens.concat(distractors) };
}

// 10 teme × 10 propoziții = 100 de exerciții.
const THEMES = [
  {
    title: 'La cumpărături',
    icon: '🛒',
    description: 'Prețuri, plată, unde găsești ce cauți',
    items: [
      ['Merg la cumpărături.', 'Ich gehe einkaufen.'],
      ['Unde este laptele?', 'Wo ist die Milch?'],
      ['Cât costă?', 'Wie viel kostet das?'],
      ['Pot să plătesc cu cardul?', 'Kann ich mit Karte zahlen?'],
      ['Cât să vă plătesc?', 'Wie viel muss ich zahlen?'],
      ['Aș dori o pâine, vă rog.', 'Ich mochte ein Brot, bitte.'],
      ['Aveți mere?', 'Haben Sie Apfel?'],
      ['Este prea scump.', 'Das ist zu teuer.'],
      ['Iau asta.', 'Ich nehme das.'],
      ['Unde este casa de marcat?', 'Wo ist die Kasse?'],
    ],
  },
  {
    title: 'La restaurant',
    icon: '🍽️',
    description: 'Comanzi, întrebi, plătești',
    items: [
      ['Aș dori o cafea.', 'Ich mochte einen Kaffee.'],
      ['Nota, vă rog.', 'Die Rechnung, bitte.'],
      ['Ce recomandați?', 'Was empfehlen Sie?'],
      ['O masă pentru două persoane, vă rog.', 'Einen Tisch fur zwei, bitte.'],
      ['Apa este gratuită?', 'Ist das Wasser gratis?'],
      ['A fost foarte gustos.', 'Es war sehr lecker.'],
      ['Sunt vegetarian.', 'Ich bin Vegetarier.'],
      ['Mai vreau un pahar de apă.', 'Ich mochte noch ein Glas Wasser.'],
      ['Pot să plătesc separat?', 'Kann ich getrennt zahlen?'],
      ['Poftă bună!', 'Guten Appetit!'],
    ],
  },
  {
    title: 'Hobby-uri și pasiuni',
    icon: '🎨',
    description: 'Ce îți place să faci',
    items: [
      ['Îmi place să gătesc.', 'Ich koche gern.'],
      ['Îmi place să citesc.', 'Ich lese gern.'],
      ['Îmi place să vorbesc.', 'Ich rede gern.'],
      ['Îmi place muzica.', 'Ich mag Musik.'],
      ['Joc tenis.', 'Ich spiele Tennis.'],
      ['Ascult muzică.', 'Ich hore Musik.'],
      ['Îmi place să dansez.', 'Ich tanze gern.'],
      ['Îmi place să călătoresc.', 'Ich reise gern.'],
      ['Pictez în timpul liber.', 'Ich male in meiner Freizeit.'],
      ['Îmi place natura.', 'Ich mag die Natur.'],
    ],
  },
  {
    title: 'Familie și prieteni',
    icon: '👪',
    description: 'Oamenii din viața ta',
    items: [
      ['Vorbesc la telefon cu sora mea.', 'Ich telefoniere mit meiner Schwester.'],
      ['Am doi copii.', 'Ich habe zwei Kinder.'],
      ['Fratele meu locuiește în Berlin.', 'Mein Bruder wohnt in Berlin.'],
      ['Îmi iubesc familia.', 'Ich liebe meine Familie.'],
      ['Mama mea gătește foarte bine.', 'Meine Mutter kocht sehr gut.'],
      ['Mă întâlnesc cu prietenii.', 'Ich treffe meine Freunde.'],
      ['Soțul meu lucrează mult.', 'Mein Mann arbeitet viel.'],
      ['Astăzi o vizitez pe bunica.', 'Heute besuche ich meine Oma.'],
      ['Vorbesc mult cu prietena mea.', 'Ich rede viel mit meiner Freundin.'],
      ['Copiii mei merg la școală.', 'Meine Kinder gehen in die Schule.'],
    ],
  },
  {
    title: 'Rutina zilnică',
    icon: '⏰',
    description: 'O zi obișnuită',
    items: [
      ['Mă trezesc la șapte.', 'Ich stehe um sieben auf.'],
      ['Beau o cafea dimineața.', 'Ich trinke morgens einen Kaffee.'],
      ['Astăzi am gătit paste.', 'Heute habe ich Nudeln gekocht.'],
      ['Merg la muncă cu autobuzul.', 'Ich fahre mit dem Bus zur Arbeit.'],
      ['Seara mă uit la un film.', 'Abends schaue ich einen Film.'],
      ['Fac curat în casă.', 'Ich putze die Wohnung.'],
      ['Gătesc cina.', 'Ich koche das Abendessen.'],
      ['Mă culc târziu.', 'Ich gehe spat ins Bett.'],
      ['După-amiază fac o plimbare.', 'Nachmittags mache ich einen Spaziergang.'],
      ['Dimineața fac duș.', 'Morgens dusche ich.'],
    ],
  },
  {
    title: 'La telefon',
    icon: '📞',
    description: 'Suni, scrii, vorbești',
    items: [
      ['Îmi place să vorbesc la telefon.', 'Ich telefoniere gern.'],
      ['Te sun mai târziu.', 'Ich rufe dich spater an.'],
      ['Poți să vorbești mai rar?', 'Kannst du langsamer sprechen?'],
      ['Nu te aud bine.', 'Ich hore dich nicht gut.'],
      ['Îți trimit un mesaj.', 'Ich schicke dir eine Nachricht.'],
      ['Care este numărul tău?', 'Wie ist deine Nummer?'],
      ['Sună-mă diseară.', 'Ruf mich heute Abend an.'],
      ['Vorbesc cu ea acum.', 'Ich spreche jetzt mit ihr.'],
      ['Sunt ocupat acum.', 'Ich bin gerade beschaftigt.'],
      ['Ne auzim mâine.', 'Wir horen uns morgen.'],
    ],
  },
  {
    title: 'Timp liber și weekend',
    icon: '🎉',
    description: 'Relaxare și distracție',
    items: [
      ['La weekend dorm mult.', 'Am Wochenende schlafe ich viel.'],
      ['Merg la plimbare în parc.', 'Ich gehe im Park spazieren.'],
      ['Mă uit la televizor.', 'Ich schaue fern.'],
      ['Mâine merg la piscină.', 'Morgen gehe ich ins Schwimmbad.'],
      ['Duminică stau acasă.', 'Am Sonntag bleibe ich zu Hause.'],
      ['Îmi place să merg la cinema.', 'Ich gehe gern ins Kino.'],
      ['Astăzi este frumos afară.', 'Heute ist es schon draussen.'],
      ['Astăzi facem grătar.', 'Heute grillen wir.'],
      ['Citesc o carte bună.', 'Ich lese ein gutes Buch.'],
      ['Ne relaxăm împreună.', 'Wir entspannen zusammen.'],
    ],
  },
  {
    title: 'Sănătate și la doctor',
    icon: '🩺',
    description: 'Când nu te simți bine',
    items: [
      ['Mă doare capul.', 'Ich habe Kopfschmerzen.'],
      ['Nu mă simt bine.', 'Es geht mir nicht gut.'],
      ['Am nevoie de un doctor.', 'Ich brauche einen Arzt.'],
      ['Sunt răcit.', 'Ich bin erkaltet.'],
      ['Am febră.', 'Ich habe Fieber.'],
      ['Mă doare stomacul.', 'Ich habe Bauchschmerzen.'],
      ['Trebuie să iau medicamente.', 'Ich muss Medikamente nehmen.'],
      ['Sunt obosit astăzi.', 'Ich bin heute mude.'],
      ['Unde este farmacia?', 'Wo ist die Apotheke?'],
      ['Însănătoșire grabnică!', 'Gute Besserung!'],
    ],
  },
  {
    title: 'Direcții și oraș',
    icon: '🧭',
    description: 'Găsești drumul prin oraș',
    items: [
      ['Unde este gara?', 'Wo ist der Bahnhof?'],
      ['Cum ajung în centru?', 'Wie komme ich ins Zentrum?'],
      ['Este departe?', 'Ist es weit?'],
      ['Mergeți drept înainte.', 'Gehen Sie geradeaus.'],
      ['La stânga sau la dreapta?', 'Links oder rechts?'],
      ['Caut un hotel.', 'Ich suche ein Hotel.'],
      ['Autobuzul vine imediat.', 'Der Bus kommt gleich.'],
      ['Unde este toaleta?', 'Wo ist die Toilette?'],
      ['M-am rătăcit.', 'Ich habe mich verlaufen.'],
      ['Există o farmacie aici?', 'Gibt es hier eine Apotheke?'],
    ],
  },
  {
    title: 'Sentimente și opinii',
    icon: '💬',
    description: 'Ce simți și ce crezi',
    items: [
      ['Sunt foarte fericită.', 'Ich bin sehr glucklich.'],
      ['Cred că este bine.', 'Ich denke, das ist gut.'],
      ['Îmi place foarte mult.', 'Das gefallt mir sehr.'],
      ['Nu-mi place asta.', 'Das mag ich nicht.'],
      ['Sunt de acord.', 'Ich bin einverstanden.'],
      ['Ai dreptate.', 'Du hast recht.'],
      ['Este minunat!', 'Das ist wunderbar!'],
      ['Nu știu exact.', 'Ich weiss nicht genau.'],
      ['Sunt puțin obosit.', 'Ich bin ein bisschen mude.'],
      ['Mă bucur foarte mult.', 'Ich freue mich sehr.'],
    ],
  },
];

// Construiește unitățile pentru secțiunea „Despre mine" (după cele 2 autoreate).
// `startIndex` = numărul primei unități noi (ex. 3 → dm-3, dm-4, ...).
export function buildAboutMeUnits(prefix = 'dm', startIndex = 3) {
  return THEMES.map((theme, ti) => ({
    id: `${prefix}-${startIndex + ti}`,
    title: theme.title,
    icon: theme.icon,
    description: theme.description,
    generated: true,
    exercises: theme.items.map(([ro, de], i) =>
      makeSentenceExercise(ro, de, `${prefix}:${ti}:${i}`)
    ),
  }));
}

function rshuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Unități suplimentare pe serii de 10, REUTILIZÂND cele 100 de propoziții:
// fiecare unitate ia un eșantion (6) dintr-o temă, amestecat determinist, ca
// reluările să pară proaspete. Deblocare secvențială (via section.series).
export function buildAboutMeSeriesUnits(count = 100, prefix = 'dmg') {
  const out = [];
  for (let n = 0; n < count; n++) {
    const theme = THEMES[n % THEMES.length];
    const id = `${prefix}-${n + 1}`;
    const rng = makeRng(`ame:${id}`);
    const chosen = rshuffle(theme.items, rng).slice(0, 6);
    out.push({
      id,
      title: theme.title,
      icon: theme.icon,
      description: `Exersează · ${theme.title}`,
      generated: true,
      exercises: chosen.map(([ro, de], i) => makeSentenceExercise(ro, de, `${id}:${i}`)),
    });
  }
  return out;
}
