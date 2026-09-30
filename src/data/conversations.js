// ============================================
// Conversații cu prietena și cu sora — viața de zi cu zi
// ============================================
// Paula (cursanta) vorbește cu Maria, Ileana sau Anuța: casă,
// curățenie, rufe, gătit, cumpărături, copii, oaspeți, sfaturi.
// Replica de completat e mereu a Paulei (who: 0) și se alege determinist,
// deci aceeași conversație revine în lecții diferite cu altă replică lipsă.
// Nivelul (A1+ / A2− / A2) se potrivește cu seriile din pathA2.js.
// Toate cuvintele germane sunt în dictionary.js. Germană în ASCII.

export const PAULA = { name: 'Paula', emoji: '👩' };
const MARIA = { name: 'Maria', emoji: '👩‍🦰' };
const ILEANA = { name: 'Ileana', emoji: '👱‍♀️' };
const ANUTA = { name: 'Anuța', emoji: '👩‍🦱' };
export const FRIENDS = [MARIA, ILEANA, ANUTA];

export const CONVERSATIONS = [
  // ---------------- A1+ ----------------
  {
    level: 'A1+', friend: MARIA, scene: 'Cafea acasă',
    lines: [
      [1, 'Hallo Paula! Wie geht es dir?', 'Bună, Paula! Ce mai faci?'],
      [0, 'Hallo Maria! Mir geht es gut, danke.', 'Bună, Maria! Sunt bine, mulțumesc.'],
      [1, 'Hast du Zeit fur einen Kaffee?', 'Ai timp de o cafea?'],
      [0, 'Ja, gern! Komm rein.', 'Da, cu plăcere! Intră.'],
      [1, 'Deine Wohnung ist so schon!', 'Apartamentul tău e așa de frumos!'],
      [0, 'Danke! Ich habe gestern geputzt.', 'Mulțumesc! Am făcut curat ieri.'],
    ],
  },
  {
    level: 'A1+', friend: ILEANA, scene: 'Curățenie mare',
    lines: [
      [1, 'Was machst du heute?', 'Ce faci azi?'],
      [0, 'Ich putze die Wohnung.', 'Fac curat în apartament.'],
      [1, 'Soll ich dir helfen?', 'Să te ajut?'],
      [0, 'Ja, gern! Kannst du die Fenster putzen?', 'Da, cu plăcere! Poți să speli geamurile?'],
      [1, 'Klar! Und du saugst Staub?', 'Sigur! Și tu dai cu aspiratorul?'],
      [0, 'Ja, und dann wische ich den Boden.', 'Da, și apoi șterg pe jos.'],
    ],
  },
  {
    level: 'A1+', friend: ANUTA, scene: 'Rufele',
    lines: [
      [1, 'Die Waschmaschine ist fertig.', 'Mașina de spălat a terminat.'],
      [0, 'Super! Ich hange die Wasche auf.', 'Super! Întind rufele.'],
      [1, 'Draussen ist es sonnig.', 'Afară e soare.'],
      [0, 'Ja, dann trocknet sie schnell.', 'Da, atunci se usucă repede.'],
      [1, 'Und wer bugelt?', 'Și cine calcă?'],
      [0, 'Ich bugle morgen.', 'Calc eu mâine.'],
    ],
  },
  {
    level: 'A1+', friend: ILEANA, scene: 'Gătim împreună',
    lines: [
      [1, 'Was kochst du heute?', 'Ce gătești azi?'],
      [0, 'Ich koche Suppe mit Gemuse.', 'Gătesc supă de legume.'],
      [1, 'Lecker! Brauchst du Hilfe?', 'Gustos! Ai nevoie de ajutor?'],
      [0, 'Ja, kannst du die Kartoffeln schalen?', 'Da, poți să cureți cartofii?'],
      [1, 'Klar. Wo ist das Messer?', 'Sigur. Unde e cuțitul?'],
      [0, 'Das Messer liegt in der Schublade.', 'Cuțitul e în sertar.'],
    ],
  },
  {
    level: 'A1+', friend: MARIA, scene: 'Cumpărături',
    lines: [
      [1, 'Ich gehe zum Supermarkt. Brauchst du etwas?', 'Merg la supermarket. Îți trebuie ceva?'],
      [0, 'Ja, bitte. Ich brauche Milch und Eier.', 'Da, te rog. Am nevoie de lapte și ouă.'],
      [1, 'Sonst noch etwas?', 'Altceva?'],
      [0, 'Vielleicht Brot. Danke!', 'Poate pâine. Mulțumesc!'],
      [1, 'Kein Problem!', 'Nicio problemă!'],
    ],
  },
  {
    level: 'A1+', friend: ILEANA, scene: 'La telefon',
    lines: [
      [1, 'Hallo, hier ist Ileana!', 'Alo, sunt Ileana!'],
      [0, 'Hallo Ileana! Wie geht es dir?', 'Bună, Ileana! Ce mai faci?'],
      [1, 'Gut! Kommst du am Sonntag zum Essen?', 'Bine! Vii duminică la masă?'],
      [0, 'Ja, gern! Was soll ich mitbringen?', 'Da, cu plăcere! Ce să aduc?'],
      [1, 'Vielleicht einen Kuchen.', 'Poate o prăjitură.'],
      [0, 'Gut, ich backe einen Kuchen.', 'Bine, fac eu o prăjitură.'],
    ],
  },
  {
    level: 'A1+', friend: MARIA, scene: 'Despre copii',
    lines: [
      [1, 'Wie geht es deinen Kindern?', 'Ce fac copiii tăi?'],
      [0, 'Gut, danke! Mein Sohn geht jetzt in die Schule.', 'Bine, mulțumesc! Fiul meu merge acum la școală.'],
      [1, 'Schon! Und deine Tochter?', 'Frumos! Și fiica ta?'],
      [0, 'Sie ist noch klein. Sie spielt den ganzen Tag.', 'E încă mică. Se joacă toată ziua.'],
    ],
  },
  {
    level: 'A1+', friend: ANUTA, scene: 'Rochia nouă',
    lines: [
      [1, 'Wie findest du mein Kleid?', 'Cum ți se pare rochia mea?'],
      [0, 'Es ist sehr schon! Ist es neu?', 'E foarte frumoasă! E nouă?'],
      [1, 'Ja, ich habe es gestern gekauft.', 'Da, am cumpărat-o ieri.'],
      [0, 'Die Farbe steht dir gut.', 'Culoarea îți stă bine.'],
      [1, 'Danke! Es war nicht teuer.', 'Mulțumesc! Nu a fost scumpă.'],
    ],
  },

  // ---------------- A2− ----------------
  {
    level: 'A2−', friend: ILEANA, scene: 'Vasele după masă',
    lines: [
      [1, 'Das Essen war lecker!', 'Mâncarea a fost gustoasă!'],
      [0, 'Danke! Hilfst du mir beim Abwasch?', 'Mulțumesc! Mă ajuți la vase?'],
      [1, 'Klar. Ich spule und du trocknest ab.', 'Sigur. Eu spăl și tu ștergi.'],
      [0, 'Gut. Wo ist das Geschirrtuch?', 'Bine. Unde e prosopul de vase?'],
      [1, 'Es hangt neben dem Herd.', 'Atârnă lângă aragaz.'],
    ],
  },
  {
    level: 'A2−', friend: MARIA, scene: 'Gunoiul',
    lines: [
      [1, 'Hast du den Mull rausgebracht?', 'Ai scos gunoiul?'],
      [0, 'Nein, noch nicht. Ich mache das gleich.', 'Nu, încă nu. Îl scot imediat.'],
      [1, 'Das Papier kommt in die blaue Tonne.', 'Hârtia merge în tomberonul albastru.'],
      [0, 'Und das Plastik in die gelbe Tonne, oder?', 'Și plasticul în tomberonul galben, nu?'],
      [1, 'Genau!', 'Exact!'],
    ],
  },
  {
    level: 'A2−', friend: ILEANA, scene: 'Vin musafiri',
    lines: [
      [1, 'Wann kommen deine Gaste?', 'Când vin musafirii tăi?'],
      [0, 'Um sieben Uhr. Ich muss noch aufraumen.', 'La ora șapte. Mai trebuie să fac ordine.'],
      [1, 'Soll ich den Tisch decken?', 'Să pun eu masa?'],
      [0, 'Ja, bitte. Die Teller sind im Schrank.', 'Da, te rog. Farfuriile sunt în dulap.'],
      [1, 'Und die Glaser?', 'Și paharele?'],
      [0, 'Die Glaser stehen auf dem Regal.', 'Paharele sunt pe raft.'],
    ],
  },
  {
    level: 'A2−', friend: ANUTA, scene: 'În grădină',
    lines: [
      [1, 'Deine Blumen sind wunderschon!', 'Florile tale sunt minunate!'],
      [0, 'Danke! Ich giesse sie jeden Morgen.', 'Mulțumesc! Le ud în fiecare dimineață.'],
      [1, 'Was pflanzt du im Fruhling?', 'Ce plantezi primăvara?'],
      [0, 'Tomaten und Salat.', 'Roșii și salată.'],
      [1, 'Toll! Ich mochte auch einen Garten.', 'Grozav! Aș vrea și eu o grădină.'],
    ],
  },
  {
    level: 'A2−', friend: MARIA, scene: 'Planuri de weekend',
    lines: [
      [1, 'Was machst du am Wochenende?', 'Ce faci în weekend?'],
      [0, 'Am Samstag putze ich das Haus.', 'Sâmbătă fac curat în casă.'],
      [1, 'Und am Sonntag?', 'Și duminică?'],
      [0, 'Am Sonntag habe ich frei. Gehen wir spazieren?', 'Duminică sunt liberă. Mergem la plimbare?'],
      [1, 'Gute Idee! Ich rufe dich an.', 'Bună idee! Te sun.'],
    ],
  },
  {
    level: 'A2−', friend: ILEANA, scene: 'Obosită',
    lines: [
      [1, 'Du siehst mude aus.', 'Arăți obosită.'],
      [0, 'Ja, ich habe schlecht geschlafen.', 'Da, am dormit prost.'],
      [1, 'Trink einen Tee und leg dich hin.', 'Bea un ceai și întinde-te.'],
      [0, 'Gute Idee. Ich habe auch Kopfschmerzen.', 'Bună idee. Mă doare și capul.'],
      [1, 'Gute Besserung!', 'Să te faci bine!'],
    ],
  },
  {
    level: 'A2−', friend: ANUTA, scene: 'Rețeta de prăjitură',
    lines: [
      [1, 'Dein Kuchen ist so lecker! Wie machst du ihn?', 'Prăjitura ta e așa de bună! Cum o faci?'],
      [0, 'Mit Mehl, Zucker, Eiern und Butter.', 'Cu făină, zahăr, ouă și unt.'],
      [1, 'Wie lange backst du ihn?', 'Cât timp o coci?'],
      [0, 'Vierzig Minuten im Ofen.', 'Patruzeci de minute în cuptor.'],
      [1, 'Kannst du mir das Rezept schicken?', 'Poți să-mi trimiți rețeta?'],
      [0, 'Na klar! Ich schicke es dir heute.', 'Sigur! Ți-o trimit azi.'],
    ],
  },
  {
    level: 'A2−', friend: ILEANA, scene: 'Ceva s-a stricat',
    lines: [
      [1, 'Die Lampe in der Kuche ist kaputt.', 'Lampa din bucătărie e stricată.'],
      [0, 'Oh nein! Ich kaufe morgen eine neue.', 'Oh, nu! Cumpăr mâine una nouă.'],
      [1, 'Und das Fenster schliesst nicht richtig.', 'Și fereastra nu se închide bine.'],
      [0, 'Ich rufe den Hausmeister an.', 'Îl sun pe administrator.'],
      [1, 'Gute Idee.', 'Bună idee.'],
    ],
  },

  // ---------------- A2 ----------------
  {
    level: 'A2', friend: MARIA, scene: 'Curățenie generală',
    lines: [
      [1, 'Was hast du gestern gemacht?', 'Ce ai făcut ieri?'],
      [0, 'Ich habe die ganze Wohnung geputzt.', 'Am făcut curat în tot apartamentul.'],
      [1, 'Die ganze Wohnung? Das ist viel Arbeit!', 'Tot apartamentul? E mult de muncă!'],
      [0, 'Ja, ich habe gesaugt, gewischt und die Fenster geputzt.', 'Da, am dat cu aspiratorul, am șters pe jos și am spălat geamurile.'],
      [1, 'Jetzt kannst du dich ausruhen.', 'Acum te poți odihni.'],
    ],
  },
  {
    level: 'A2', friend: ILEANA, scene: 'Bluza albastră',
    lines: [
      [1, 'Hast du meine blaue Bluse gesehen?', 'Ai văzut bluza mea albastră?'],
      [0, 'Ja, ich habe sie gestern gewaschen.', 'Da, am spălat-o ieri.'],
      [1, 'Wo ist sie jetzt?', 'Unde e acum?'],
      [0, 'Sie hangt im Bad. Sie ist noch nass.', 'Atârnă în baie. E încă udă.'],
      [1, 'Schade, ich wollte sie heute anziehen.', 'Păcat, voiam s-o îmbrac azi.'],
    ],
  },
  {
    level: 'A2', friend: MARIA, scene: 'Cine face treburile?',
    lines: [
      [1, 'Wer macht bei euch den Haushalt?', 'Cine face treburile casei la voi?'],
      [0, 'Meistens ich, aber mein Mann kocht am Wochenende.', 'De obicei eu, dar soțul meu gătește în weekend.'],
      [1, 'Das ist gut! Mein Mann macht nie etwas.', 'E bine! Soțul meu nu face niciodată nimic.'],
      [0, 'Du musst mit ihm sprechen.', 'Trebuie să vorbești cu el.'],
      [1, 'Du hast recht.', 'Ai dreptate.'],
    ],
  },
  {
    level: 'A2', friend: ILEANA, scene: 'Pantofi comandați',
    lines: [
      [1, 'Ich habe neue Schuhe bestellt.', 'Mi-am comandat pantofi noi.'],
      [0, 'Wirklich? Welche Farbe?', 'Serios? Ce culoare?'],
      [1, 'Schwarz. Aber sie sind zu klein.', 'Negri. Dar sunt prea mici.'],
      [0, 'Dann schick sie zuruck.', 'Atunci trimite-i înapoi.'],
      [1, 'Ja, das mache ich morgen.', 'Da, fac asta mâine.'],
    ],
  },
  {
    level: 'A2', friend: ILEANA, scene: 'Vizită la mama',
    lines: [
      [1, 'Wann besuchen wir Mama?', 'Când o vizităm pe mama?'],
      [0, 'Am Samstag, wenn du Zeit hast.', 'Sâmbătă, dacă ai timp.'],
      [1, 'Gut. Ich bringe Blumen mit.', 'Bine. Aduc eu flori.'],
      [0, 'Und ich backe ihren Lieblingskuchen.', 'Și eu fac prăjitura ei preferată.'],
      [1, 'Sie wird sich freuen!', 'O să se bucure!'],
    ],
  },
  {
    level: 'A2', friend: MARIA, scene: 'Un sfat bun',
    lines: [
      [1, 'Ich bin so gestresst. Ich habe keine Zeit fur mich.', 'Sunt așa de stresată. Nu am timp pentru mine.'],
      [0, 'Du arbeitest zu viel. Du musst eine Pause machen.', 'Muncești prea mult. Trebuie să iei o pauză.'],
      [1, 'Du hast recht. Aber die Wohnung ist so unordentlich.', 'Ai dreptate. Dar apartamentul e așa de dezordonat.'],
      [0, 'Die Wohnung kann warten. Deine Gesundheit ist wichtiger.', 'Apartamentul poate să aștepte. Sănătatea ta e mai importantă.'],
      [1, 'Danke, du bist eine gute Freundin.', 'Mulțumesc, ești o prietenă bună.'],
    ],
  },
  {
    level: 'A2', friend: ILEANA, scene: 'Frigiderul gol',
    lines: [
      [1, 'Der Kuhlschrank ist fast leer.', 'Frigiderul e aproape gol.'],
      [0, 'Ich weiss. Wir mussen einkaufen gehen.', 'Știu. Trebuie să mergem la cumpărături.'],
      [1, 'Ich schreibe eine Einkaufsliste.', 'Scriu o listă de cumpărături.'],
      [0, 'Schreib auch Kaffee und Waschmittel auf.', 'Scrie și cafea și detergent.'],
      [1, 'Mache ich!', 'Așa fac!'],
    ],
  },
  {
    level: 'A2', friend: ANUTA, scene: 'Vecinii',
    lines: [
      [1, 'Deine Nachbarn sind so laut!', 'Vecinii tăi sunt așa de gălăgioși!'],
      [0, 'Ja, sie haben ein kleines Baby.', 'Da, au un bebeluș.'],
      [1, 'Oh, das ist anstrengend.', 'Oh, asta e obositor.'],
      [0, 'Ja, aber das Baby ist sehr suss.', 'Da, dar bebelușul e foarte dulce.'],
      [1, 'Und du schlafst trotzdem gut?', 'Și totuși dormi bine?'],
      [0, 'Nicht immer, aber es geht.', 'Nu mereu, dar merge.'],
    ],
  },
];

const LEVEL_ORDER = { 'A1+': 0, 'A2−': 1, 'A2': 2 };

function shuffle(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const tokensOf = (s) => s.replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean);
const PAULA_LINES = CONVERSATIONS.flatMap(c => c.lines.filter(l => l[0] === 0).map(l => ({ level: c.level, de: l[1] })));
const FILLERS = ['nicht', 'sehr', 'und', 'oder', 'auch', 'heute', 'mit'];

// Conversațiile potrivite unui nivel: cele de la nivelul curent, apoi cele anterioare
export function conversationsFor(level) {
  const max = LEVEL_ORDER[level];
  return CONVERSATIONS.filter(c => LEVEL_ORDER[c.level] <= max)
    .sort((a, b) => LEVEL_ORDER[b.level] - LEVEL_ORDER[a.level]);
}

// Exercițiu de dialog dintr-o conversație. `pick` alege replica Paulei care
// lipsește (rotire între lecții); `build` = construiești replica din piese.
export function conversationExercise(conv, { rnd, pick = 0, build = false }) {
  const paulaIdx = conv.lines.map((l, i) => (l[0] === 0 ? i : -1)).filter(i => i >= 0);
  const blankIdx = paulaIdx[pick % paulaIdx.length];
  const answer = conv.lines[blankIdx][1];
  const lines = conv.lines.map(([who, de, ro], i) => (i === blankIdx
    ? { who, blank: true, answer, ro }
    : { who, de, ro }));
  const ex = {
    type: 'dialogue',
    scene: `👭 ${conv.scene}`,
    characters: [PAULA, conv.friend],
    lines,
  };
  if (build) {
    const tokens = tokensOf(answer);
    const lower = new Set(tokens.map(t => t.toLowerCase()));
    const extra = shuffle(FILLERS.filter(w => !lower.has(w)), rnd).slice(0, 2);
    return { ...ex, mode: 'wordBank', bank: [...tokens, ...extra] };
  }
  // variante: alte replici ale Paulei, de lungime apropiată
  const len = answer.length;
  const others = PAULA_LINES.filter(l => l.de !== answer)
    .sort((a, b) => Math.abs(a.de.length - len) - Math.abs(b.de.length - len))
    .slice(0, 8);
  const distract = shuffle(others, rnd).slice(0, 2).map(l => l.de);
  return { ...ex, mode: 'multiChoice', options: shuffle([answer, ...distract], rnd) };
}
