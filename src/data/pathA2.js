// ============================================
// Provocări, seriile 26–50 — de la A1+ spre A2, progresiv
// ============================================
// Continuă calea de pe Home după cele 250 de lecții (lp-251 … lp-500).
// Fiecare serie = o temă nouă cu 10 propoziții scrise de mână + un dialog.
// Nivelul crește pe serii: 26–33 A1+, 34–42 A2−, 43–50 A2. În fiecare serie:
//   lecțiile 1–3  recunoaștere (alegi, asculți, potrivești, construiești)
//   lecțiile 4–7  mix (completezi, asculți și scrii, piese)
//   lecțiile 8–9  tot mixul, cu traducere tastată și vorbire
//   lecția 10     recapitulare: tema + propoziții din temele anterioare
// Fiecare lecție are propoziții din temă, un exercițiu pe cuvintele temei,
// unul pe vocabular A1 (imagini / sortare pe categorii), o conversație de zi
// cu zi cu Maria / Ileana / Anuța (conversations.js) și, în lecțiile 1, 4, 7
// și 10, dialogul scurt al temei.
// Toate cuvintele germane sunt în dictionary.js (cele noi: categoria `a2plus`,
// separată, ca lecțiile existente să nu se schimbe). Germană în ASCII.

import { dictionary, findByDe } from './dictionary.js';
import { makeRng, generateExercises } from './generator.js';
import { generateSentenceExercises } from './sentenceBank.js';
import { conversationsFor, conversationExercise, PAULA, FRIENDS } from './conversations.js';

// Câmpuri per propoziție: de, ro, v (cuvântul ascuns la fillBlank), vh (indiciu RO)
export const PATH_THEMES = [
  // ---------------- A1+ (seriile 26–33) ----------------
  {
    key: 'p_negatie', level: 'A1+', name: 'Nu și niciun (nicht, kein)', icon: '🚫', cats: ['mancare', 'bauturi'],
    tip: '„nicht" neagă verbul sau adjectivul; „kein/keine" neagă un substantiv: Ich habe kein Auto.',
    words: ['kein', 'keine', 'keinen', 'nicht', 'trinkt', 'Fleisch'],
    dialog: { opener: { de: 'Hast du ein Auto?', ro: 'Ai mașină?' }, closer: { de: 'Gut!', ro: 'Bine!' },
      answers: [{ de: 'Nein ich habe kein Auto', ro: 'Nu, nu am mașină' }, { de: 'Ja ich habe ein Auto', ro: 'Da, am o mașină' }] },
    sentences: [
      { de: 'Ich habe kein Auto.', ro: 'Nu am mașină.', v: 'kein', vh: 'niciun' },
      { de: 'Er trinkt keinen Kaffee.', ro: 'El nu bea cafea.', v: 'keinen', vh: 'niciun (acuzativ)' },
      { de: 'Wir haben keine Milch.', ro: 'Nu avem lapte.', v: 'keine', vh: 'nicio' },
      { de: 'Das ist nicht mein Buch.', ro: 'Asta nu este cartea mea.', v: 'nicht', vh: 'nu' },
      { de: 'Ich esse kein Fleisch.', ro: 'Nu mănânc carne.', v: 'kein', vh: 'niciun' },
      { de: 'Der Bus kommt nicht.', ro: 'Autobuzul nu vine.', v: 'nicht', vh: 'nu' },
      { de: 'Ich bin nicht mude.', ro: 'Nu sunt obosit.', v: 'nicht', vh: 'nu' },
      { de: 'Heute regnet es nicht.', ro: 'Azi nu plouă.', v: 'regnet', vh: 'plouă' },
      { de: 'Das ist nicht teuer.', ro: 'Asta nu este scump.', v: 'teuer', vh: 'scump' },
      { de: 'Ich habe keine Zeit.', ro: 'Nu am timp.', v: 'keine', vh: 'nicio' },
    ],
  },
  {
    key: 'p_posesive', level: 'A1+', name: 'Al meu, al tău, al lui', icon: '🔑', cats: ['familie', 'casa'],
    tip: 'mein/dein/sein/ihr/unser + substantiv; la feminin și plural primesc -e: meine Mutter, unsere Kinder.',
    words: ['dein', 'deine', 'seine', 'ihre', 'unser', 'unsere', 'Tochter', 'Sohn'],
    dialog: { opener: { de: 'Ist das dein Buch?', ro: 'E cartea ta?' }, closer: { de: 'Danke!', ro: 'Mulțumesc!' },
      answers: [{ de: 'Ja das ist mein Buch', ro: 'Da, e cartea mea' }, { de: 'Nein das ist nicht mein Buch', ro: 'Nu, nu e cartea mea' }] },
    sentences: [
      { de: 'Das ist dein Buch.', ro: 'Aceasta este cartea ta.', v: 'dein', vh: 'al tău' },
      { de: 'Wo ist deine Tasche?', ro: 'Unde este geanta ta?', v: 'deine', vh: 'a ta' },
      { de: 'Sein Auto ist neu.', ro: 'Mașina lui este nouă.', v: 'Sein', vh: 'al lui' },
      { de: 'Ihre Tochter ist klein.', ro: 'Fiica ei este mică.', v: 'Ihre', vh: 'a ei' },
      { de: 'Unser Haus ist gross.', ro: 'Casa noastră este mare.', v: 'Unser', vh: 'al nostru' },
      { de: 'Unsere Kinder spielen im Garten.', ro: 'Copiii noștri se joacă în grădină.', v: 'Unsere', vh: 'ai noștri' },
      { de: 'Ist das deine Jacke?', ro: 'Este geaca ta?', v: 'deine', vh: 'a ta' },
      { de: 'Meine Tochter heisst Anna.', ro: 'Fiica mea se numește Anna.', v: 'heisst', vh: 'se numește' },
      { de: 'Seine Mutter ist Arztin.', ro: 'Mama lui este medic.', v: 'Seine', vh: 'a lui' },
      { de: 'Ihr Mann kocht gut.', ro: 'Soțul ei gătește bine.', v: 'kocht', vh: 'gătește' },
    ],
  },
  {
    key: 'p_intrebari', level: 'A1+', name: 'Cine? Când? De ce?', icon: '❓', cats: ['locuri', 'zile'],
    tip: 'Cuvântul de întrebare stă primul, verbul imediat după: Wann kommst du? Warum lernst du?',
    words: ['wer', 'wann', 'warum', 'welcher', 'Hunger', 'Toilette'],
    dialog: { opener: { de: 'Wann kommst du?', ro: 'Când vii?' }, closer: { de: 'Gut!', ro: 'Bine!' },
      answers: [{ de: 'Ich komme morgen', ro: 'Vin mâine' }, { de: 'Ich komme heute', ro: 'Vin azi' }] },
    sentences: [
      { de: 'Wer ist das?', ro: 'Cine este acesta?', v: 'Wer', vh: 'cine' },
      { de: 'Wann kommst du?', ro: 'Când vii?', v: 'Wann', vh: 'când' },
      { de: 'Warum lernst du Deutsch?', ro: 'De ce înveți germană?', v: 'Warum', vh: 'de ce' },
      { de: 'Wie viel kostet das Brot?', ro: 'Cât costă pâinea?', v: 'kostet', vh: 'costă' },
      { de: 'Wie alt bist du?', ro: 'Câți ani ai?', v: 'alt', vh: 'bătrân / de vârstă' },
      { de: 'Wo ist die Toilette?', ro: 'Unde este toaleta?', v: 'Wo', vh: 'unde' },
      { de: 'Was machst du am Wochenende?', ro: 'Ce faci în weekend?', v: 'machst', vh: 'faci' },
      { de: 'Wie lange bleibst du?', ro: 'Cât timp rămâi?', v: 'bleibst', vh: 'rămâi' },
      { de: 'Welcher Bus fahrt zum Bahnhof?', ro: 'Ce autobuz merge la gară?', v: 'Welcher', vh: 'care' },
      { de: 'Hast du Hunger?', ro: 'Ți-e foame?', v: 'Hunger', vh: 'foame' },
    ],
  },
  {
    key: 'p_imperativ', level: 'A1+', name: 'Rugăminți (imperativ)', icon: '👉', cats: ['casa', 'verbe'],
    tip: 'Imperativul cu „tu": verbul fără -st, la început: du kommst → Komm! Politicos: + bitte.',
    words: ['komm', 'warte', 'hilf', 'gib', 'geh', 'schreib', 'offne', 'sprich'],
    dialog: { opener: { de: 'Kannst du mir helfen?', ro: 'Poți să mă ajuți?' }, closer: { de: 'Danke!', ro: 'Mulțumesc!' },
      answers: [{ de: 'Ja gern', ro: 'Da, cu plăcere' }, { de: 'Nein ich habe keine Zeit', ro: 'Nu, nu am timp' }] },
    sentences: [
      { de: 'Komm bitte!', ro: 'Vino, te rog!', v: 'Komm', vh: 'vino' },
      { de: 'Setz dich!', ro: 'Așază-te!', v: 'Setz', vh: 'așază' },
      { de: 'Sprich bitte langsam!', ro: 'Vorbește rar, te rog!', v: 'Sprich', vh: 'vorbește' },
      { de: 'Warte hier!', ro: 'Așteaptă aici!', v: 'Warte', vh: 'așteaptă' },
      { de: 'Hilf mir bitte!', ro: 'Ajută-mă, te rog!', v: 'Hilf', vh: 'ajută' },
      { de: 'Trink Wasser!', ro: 'Bea apă!', v: 'Trink', vh: 'bea' },
      { de: 'Offne das Fenster!', ro: 'Deschide fereastra!', v: 'Offne', vh: 'deschide' },
      { de: 'Schreib mir morgen!', ro: 'Scrie-mi mâine!', v: 'Schreib', vh: 'scrie' },
      { de: 'Gib mir das Buch!', ro: 'Dă-mi cartea!', v: 'Gib', vh: 'dă' },
      { de: 'Geh nach Hause!', ro: 'Du-te acasă!', v: 'Geh', vh: 'du-te' },
    ],
  },
  {
    key: 'p_loc', level: 'A1+', name: 'Unde este? (pe, sub, lângă)', icon: '📍', cats: ['casa', 'animale'],
    tip: 'La întrebarea „wo?" (unde) vine dativul: auf dem Tisch, unter dem Bett, in der Stadt.',
    words: ['unter', 'neben', 'hinter', 'liegt', 'steht', 'Kuhlschrank', 'Wand', 'Bild'],
    dialog: { opener: { de: 'Wo ist die Katze?', ro: 'Unde este pisica?' }, closer: { de: 'Danke!', ro: 'Mulțumesc!' },
      answers: [{ de: 'Die Katze ist unter dem Bett', ro: 'Pisica este sub pat' }, { de: 'Die Katze ist im Garten', ro: 'Pisica este în grădină' }] },
    sentences: [
      { de: 'Das Buch liegt auf dem Tisch.', ro: 'Cartea este pe masă.', v: 'auf', vh: 'pe' },
      { de: 'Die Katze ist unter dem Bett.', ro: 'Pisica este sub pat.', v: 'unter', vh: 'sub' },
      { de: 'Die Lampe steht neben dem Sofa.', ro: 'Lampa este lângă canapea.', v: 'neben', vh: 'lângă' },
      { de: 'Ich wohne in der Stadt.', ro: 'Locuiesc la oraș.', v: 'der', vh: 'articol dativ (feminin)' },
      { de: 'Der Park ist hinter der Schule.', ro: 'Parcul este în spatele școlii.', v: 'hinter', vh: 'în spatele' },
      { de: 'Das Auto steht vor dem Haus.', ro: 'Mașina este în fața casei.', v: 'vor', vh: 'în fața' },
      { de: 'Die Milch ist im Kuhlschrank.', ro: 'Laptele este în frigider.', v: 'im', vh: 'în (in dem)' },
      { de: 'Wir sitzen im Garten.', ro: 'Stăm în grădină.', v: 'sitzen', vh: 'stăm (așezați)' },
      { de: 'Das Bild hangt an der Wand.', ro: 'Tabloul atârnă pe perete.', v: 'hangt', vh: 'atârnă' },
      { de: 'Der Hund schlaft vor der Tur.', ro: 'Câinele doarme în fața ușii.', v: 'schlaft', vh: 'doarme' },
    ],
  },
  {
    key: 'p_cumparaturi', level: 'A1+', name: 'La magazin', icon: '🛍️', cats: ['mancare', 'haine'],
    tip: 'La magazin: „Ich nehme…" (iau), „Ich suche…" (caut), „zu teuer / zu klein" (prea scump / prea mic).',
    words: ['nehme', 'suche', 'bezahle', 'Kasse', 'Karte', 'Euro', 'Kilo', 'Tute'],
    dialog: { opener: { de: 'Was kostet das?', ro: 'Cât costă asta?' }, closer: { de: 'Danke!', ro: 'Mulțumesc!' },
      answers: [{ de: 'Das kostet drei Euro', ro: 'Costă trei euro' }, { de: 'Das kostet zehn Euro', ro: 'Costă zece euro' }] },
    sentences: [
      { de: 'Ich mochte ein Kilo Tomaten.', ro: 'Aș vrea un kilogram de roșii.', v: 'Kilo', vh: 'kilogram' },
      { de: 'Das kostet drei Euro.', ro: 'Costă trei euro.', v: 'kostet', vh: 'costă' },
      { de: 'Haben Sie Brot?', ro: 'Aveți pâine?', v: 'Haben', vh: 'aveți' },
      { de: 'Ich nehme den Kase.', ro: 'Iau brânza.', v: 'nehme', vh: 'iau' },
      { de: 'Wo ist die Kasse?', ro: 'Unde este casa de marcat?', v: 'Kasse', vh: 'casa (de plată)' },
      { de: 'Ich bezahle mit Karte.', ro: 'Plătesc cu cardul.', v: 'bezahle', vh: 'plătesc' },
      { de: 'Das ist zu teuer.', ro: 'Este prea scump.', v: 'zu', vh: 'prea' },
      { de: 'Brauchen Sie eine Tute?', ro: 'Aveți nevoie de o pungă?', v: 'Brauchen', vh: 'aveți nevoie' },
      { de: 'Ich suche eine Jacke.', ro: 'Caut o geacă.', v: 'suche', vh: 'caut' },
      { de: 'Die Hose ist zu klein.', ro: 'Pantalonii sunt prea mici.', v: 'klein', vh: 'mic' },
    ],
  },
  {
    key: 'p_restaurant', level: 'A1+', name: 'La restaurant', icon: '🍽️', cats: ['mancare', 'bauturi'],
    tip: '„Ich habe Hunger / Durst" = mi-e foame / sete. Nota se cere așa: Die Rechnung, bitte.',
    words: ['Speisekarte', 'Rechnung', 'Durst', 'lecker', 'Glas', 'Fruhstuck', 'zusammen'],
    dialog: { opener: { de: 'Was mochten Sie essen?', ro: 'Ce doriți să mâncați?' }, closer: { de: 'Sehr gut!', ro: 'Foarte bine!' },
      answers: [{ de: 'Ich nehme die Suppe', ro: 'Iau supa' }, { de: 'Ich esse kein Fleisch', ro: 'Nu mănânc carne' }] },
    sentences: [
      { de: 'Die Speisekarte, bitte.', ro: 'Meniul, vă rog.', v: 'Speisekarte', vh: 'meniul' },
      { de: 'Ich habe Hunger.', ro: 'Mi-e foame.', v: 'Hunger', vh: 'foame' },
      { de: 'Ich habe Durst.', ro: 'Mi-e sete.', v: 'Durst', vh: 'sete' },
      { de: 'Ich nehme die Suppe.', ro: 'Iau supa.', v: 'nehme', vh: 'iau' },
      { de: 'Das Essen ist lecker.', ro: 'Mâncarea este gustoasă.', v: 'lecker', vh: 'gustos' },
      { de: 'Die Rechnung, bitte.', ro: 'Nota, vă rog.', v: 'Rechnung', vh: 'nota de plată' },
      { de: 'Ich trinke ein Glas Wein.', ro: 'Beau un pahar de vin.', v: 'Glas', vh: 'pahar' },
      { de: 'Zum Fruhstuck esse ich Brot.', ro: 'La micul dejun mănânc pâine.', v: 'Fruhstuck', vh: 'micul dejun' },
      { de: 'Am Abend kochen wir zusammen.', ro: 'Seara gătim împreună.', v: 'zusammen', vh: 'împreună' },
      { de: 'Wir essen heute im Restaurant.', ro: 'Azi mâncăm la restaurant.', v: 'essen', vh: 'mâncăm' },
    ],
  },
  {
    key: 'p_descrieri', level: 'A1+', name: 'Oamenii din viața mea', icon: '👨‍👩‍👧‍👦', cats: ['familie', 'corp'],
    tip: 'Vârsta: „Er ist achtzig Jahre alt". Pluralul: ein Kind → zwei Kinder, ein Jahr → zwei Jahre.',
    words: ['Kinder', 'Jahre', 'Haare', 'Augen', 'verheiratet', 'Personen', 'achtzig', 'Klavier'],
    dialog: { opener: { de: 'Hast du Kinder?', ro: 'Ai copii?' }, closer: { de: 'Schon!', ro: 'Frumos!' },
      answers: [{ de: 'Ja ich habe zwei Kinder', ro: 'Da, am doi copii' }, { de: 'Nein ich habe keine Kinder', ro: 'Nu, nu am copii' }] },
    sentences: [
      { de: 'Meine Mutter hat blaue Augen.', ro: 'Mama mea are ochi albaștri.', v: 'Augen', vh: 'ochi' },
      { de: 'Mein Vater ist gross und stark.', ro: 'Tatăl meu este înalt și puternic.', v: 'stark', vh: 'puternic' },
      { de: 'Meine Schwester hat lange Haare.', ro: 'Sora mea are părul lung.', v: 'Haare', vh: 'păr' },
      { de: 'Mein Bruder ist verheiratet.', ro: 'Fratele meu este căsătorit.', v: 'verheiratet', vh: 'căsătorit' },
      { de: 'Wir sind vier Personen.', ro: 'Suntem patru persoane.', v: 'Personen', vh: 'persoane' },
      { de: 'Meine Grossmutter ist achtzig Jahre alt.', ro: 'Bunica mea are optzeci de ani.', v: 'achtzig', vh: 'optzeci' },
      { de: 'Mein Sohn geht in die Schule.', ro: 'Fiul meu merge la școală.', v: 'geht', vh: 'merge' },
      { de: 'Meine Tochter spielt Klavier.', ro: 'Fiica mea cântă la pian.', v: 'Klavier', vh: 'pian' },
      { de: 'Mein Mann arbeitet viel.', ro: 'Soțul meu muncește mult.', v: 'arbeitet', vh: 'muncește' },
      { de: 'Ich habe zwei Kinder.', ro: 'Am doi copii.', v: 'Kinder', vh: 'copii' },
    ],
  },

  // ---------------- A2− (seriile 34–42) ----------------
  {
    key: 'p_reflexive', level: 'A2−', name: 'Rutina mea (verbe reflexive)', icon: '🪥', cats: ['corp', 'casa'],
    tip: 'Verbele reflexive au „mich/dich/sich/uns": Ich wasche mich. Wir treffen uns.',
    words: ['wasche', 'dusche', 'ziehe', 'putze', 'freue', 'treffen', 'sich', 'uns'],
    dialog: { opener: { de: 'Was machst du am Morgen?', ro: 'Ce faci dimineața?' }, closer: { de: 'Gut!', ro: 'Bine!' },
      answers: [{ de: 'Ich dusche am Morgen', ro: 'Fac duș dimineața' }, { de: 'Ich ziehe mich an', ro: 'Mă îmbrac' }] },
    sentences: [
      { de: 'Ich wasche mich.', ro: 'Mă spăl.', v: 'mich', vh: 'mă (pe mine)' },
      { de: 'Ich ziehe mich an.', ro: 'Mă îmbrac.', v: 'ziehe', vh: 'trag / îmbrac' },
      { de: 'Ich dusche am Morgen.', ro: 'Fac duș dimineața.', v: 'dusche', vh: 'fac duș' },
      { de: 'Wir treffen uns im Park.', ro: 'Ne întâlnim în parc.', v: 'uns', vh: 'ne' },
      { de: 'Ich freue mich auf das Wochenende.', ro: 'Mă bucur de weekend.', v: 'freue', vh: 'bucur' },
      { de: 'Er rasiert sich.', ro: 'El se bărbierește.', v: 'sich', vh: 'se' },
      { de: 'Ich putze mir die Zahne.', ro: 'Îmi spăl dinții.', v: 'putze', vh: 'curăț' },
      { de: 'Setz dich bitte.', ro: 'Așază-te, te rog.', v: 'dich', vh: 'te' },
      { de: 'Ich muss mich beeilen.', ro: 'Trebuie să mă grăbesc.', v: 'beeilen', vh: 'a se grăbi' },
      { de: 'Ich lege mich ins Bett.', ro: 'Mă pun în pat.', v: 'lege', vh: 'pun / așez' },
    ],
  },
  {
    key: 'p_doctor', level: 'A2−', name: 'La doctor', icon: '🩺', cats: ['corp', 'adjective'],
    tip: 'Durerea: „Mein Bauch tut weh" (mă doare burta) sau „Ich habe Kopfschmerzen" (mă doare capul).',
    words: ['Kopfschmerzen', 'Fieber', 'weh', 'Termin', 'Tabletten', 'erkaltet', 'Besserung'],
    dialog: { opener: { de: 'Was fehlt Ihnen?', ro: 'Ce vă supără?' }, closer: { de: 'Gute Besserung!', ro: 'Însănătoșire grabnică!' },
      answers: [{ de: 'Ich habe Kopfschmerzen', ro: 'Mă doare capul' }, { de: 'Ich habe Fieber', ro: 'Am febră' }, { de: 'Mein Bauch tut weh', ro: 'Mă doare burta' }] },
    sentences: [
      { de: 'Ich habe Kopfschmerzen.', ro: 'Mă doare capul.', v: 'Kopfschmerzen', vh: 'dureri de cap' },
      { de: 'Mir ist schlecht.', ro: 'Mi-e rău.', v: 'schlecht', vh: 'rău' },
      { de: 'Ich habe Fieber.', ro: 'Am febră.', v: 'Fieber', vh: 'febră' },
      { de: 'Mein Bauch tut weh.', ro: 'Mă doare burta.', v: 'weh', vh: 'doare (tut weh)' },
      { de: 'Ich brauche einen Termin.', ro: 'Am nevoie de o programare.', v: 'Termin', vh: 'programare' },
      { de: 'Sie mussen im Bett bleiben.', ro: 'Trebuie să stați în pat.', v: 'mussen', vh: 'trebuie (dvs.)' },
      { de: 'Nehmen Sie die Tabletten.', ro: 'Luați pastilele.', v: 'Tabletten', vh: 'pastile' },
      { de: 'Ich bin erkaltet.', ro: 'Sunt răcit.', v: 'erkaltet', vh: 'răcit' },
      { de: 'Gute Besserung!', ro: 'Însănătoșire grabnică!', v: 'Besserung', vh: 'însănătoșire' },
      { de: 'Der Arzt untersucht mich.', ro: 'Medicul mă consultă.', v: 'untersucht', vh: 'consultă' },
    ],
  },
  {
    key: 'p_vreme', level: 'A2−', name: 'Vremea și anotimpurile', icon: '🌦️', cats: ['vreme', 'natura'],
    tip: 'Vremea începe cu „es": Es regnet. Es schneit. Es ist sonnig. Viitorul apropiat: Morgen wird es warm.',
    words: ['sonnig', 'windig', 'schneit', 'Regenschirm', 'seit', 'wird', 'dunkel'],
    dialog: { opener: { de: 'Wie ist das Wetter heute?', ro: 'Cum e vremea azi?' }, closer: { de: 'Danke!', ro: 'Mulțumesc!' },
      answers: [{ de: 'Es ist sonnig', ro: 'E însorit' }, { de: 'Es schneit', ro: 'Ninge' }, { de: 'Es ist windig', ro: 'E vânt' }] },
    sentences: [
      { de: 'Es ist sonnig.', ro: 'Este însorit.', v: 'sonnig', vh: 'însorit' },
      { de: 'Es schneit.', ro: 'Ninge.', v: 'schneit', vh: 'ninge' },
      { de: 'Es ist windig.', ro: 'Bate vântul.', v: 'windig', vh: 'cu vânt' },
      { de: 'Im Winter ist es kalt.', ro: 'Iarna este frig.', v: 'kalt', vh: 'frig' },
      { de: 'Morgen wird es warm.', ro: 'Mâine va fi cald.', v: 'wird', vh: 'va fi / devine' },
      { de: 'Wie ist das Wetter heute?', ro: 'Cum este vremea azi?', v: 'Wetter', vh: 'vremea' },
      { de: 'Es regnet seit gestern.', ro: 'Plouă de ieri.', v: 'seit', vh: 'de (din)' },
      { de: 'Im Fruhling bluhen die Blumen.', ro: 'Primăvara înfloresc florile.', v: 'bluhen', vh: 'înfloresc' },
      { de: 'Der Himmel ist grau.', ro: 'Cerul este gri.', v: 'grau', vh: 'gri' },
      { de: 'Nimm einen Regenschirm mit!', ro: 'Ia-ți o umbrelă!', v: 'Regenschirm', vh: 'umbrelă' },
    ],
  },
  {
    key: 'p_directii', level: 'A2−', name: 'Drumul și transportul', icon: '🧭', cats: ['transport', 'locuri'],
    tip: 'Direcții: geradeaus (drept înainte), links (stânga), rechts (dreapta). „zum" = zu dem.',
    words: ['geradeaus', 'links', 'rechts', 'weit', 'Fahrkarte', 'Verspatung', 'fliegen', 'steige'],
    dialog: { opener: { de: 'Wie komme ich zum Bahnhof?', ro: 'Cum ajung la gară?' }, closer: { de: 'Danke!', ro: 'Mulțumesc!' },
      answers: [{ de: 'Gehen Sie geradeaus', ro: 'Mergeți drept înainte' }, { de: 'Dann gehen Sie links', ro: 'Apoi mergeți la stânga' }] },
    sentences: [
      { de: 'Wie komme ich zum Bahnhof?', ro: 'Cum ajung la gară?', v: 'zum', vh: 'la (zu dem)' },
      { de: 'Gehen Sie geradeaus.', ro: 'Mergeți drept înainte.', v: 'geradeaus', vh: 'drept înainte' },
      { de: 'Dann gehen Sie links.', ro: 'Apoi mergeți la stânga.', v: 'links', vh: 'la stânga' },
      { de: 'Nehmen Sie die zweite Strasse rechts.', ro: 'Luați a doua stradă la dreapta.', v: 'rechts', vh: 'la dreapta' },
      { de: 'Der Bus fahrt alle zehn Minuten.', ro: 'Autobuzul trece la fiecare zece minute.', v: 'alle', vh: 'fiecare / toate' },
      { de: 'Ich steige am Markt aus.', ro: 'Cobor la piață.', v: 'steige', vh: 'urc / cobor (steige aus)' },
      { de: 'Ich brauche eine Fahrkarte.', ro: 'Am nevoie de un bilet.', v: 'Fahrkarte', vh: 'bilet' },
      { de: 'Der Zug hat Verspatung.', ro: 'Trenul are întârziere.', v: 'Verspatung', vh: 'întârziere' },
      { de: 'Wir fliegen nach Rumanien.', ro: 'Zburăm în România.', v: 'fliegen', vh: 'zburăm' },
      { de: 'Ist es weit?', ro: 'Este departe?', v: 'weit', vh: 'departe' },
    ],
  },
  {
    key: 'p_hobby', level: 'A2−', name: 'Timp liber', icon: '🎨', cats: ['verbe', 'zile'],
    tip: '„gern" după verb = îmi place: Ich lese gern. „Hast du Lust auf…?" = ai chef de…?',
    words: ['wandern', 'tanzt', 'Hobby', 'Lust', 'Theater', 'Bucher', 'Filme', 'Instrument'],
    dialog: { opener: { de: 'Was ist dein Hobby?', ro: 'Care e hobby-ul tău?' }, closer: { de: 'Schon!', ro: 'Frumos!' },
      answers: [{ de: 'Ich lese gern Bucher', ro: 'Îmi place să citesc cărți' }, { de: 'Ich hore gern Musik', ro: 'Îmi place să ascult muzică' }] },
    sentences: [
      { de: 'Ich lese gern Bucher.', ro: 'Îmi place să citesc cărți.', v: 'gern', vh: 'cu plăcere' },
      { de: 'Am Wochenende gehe ich wandern.', ro: 'În weekend merg în drumeții.', v: 'wandern', vh: 'a face drumeții' },
      { de: 'Spielst du ein Instrument?', ro: 'Cânți la un instrument?', v: 'Spielst', vh: 'cânți / joci' },
      { de: 'Ich hore gern Musik.', ro: 'Îmi place să ascult muzică.', v: 'hore', vh: 'ascult' },
      { de: 'Wir gehen ins Theater.', ro: 'Mergem la teatru.', v: 'Theater', vh: 'teatru' },
      { de: 'Ich fotografiere gern.', ro: 'Îmi place să fotografiez.', v: 'fotografiere', vh: 'fotografiez' },
      { de: 'Er tanzt sehr gut.', ro: 'El dansează foarte bine.', v: 'tanzt', vh: 'dansează' },
      { de: 'Mein Hobby ist Kochen.', ro: 'Hobby-ul meu este gătitul.', v: 'Hobby', vh: 'hobby' },
      { de: 'Ich sehe gern Filme.', ro: 'Îmi place să mă uit la filme.', v: 'Filme', vh: 'filme' },
      { de: 'Hast du Lust auf Kino?', ro: 'Ai chef de cinema?', v: 'Lust', vh: 'chef' },
    ],
  },
  {
    key: 'p_viitor', level: 'A2−', name: 'Planuri (ich werde)', icon: '🔮', cats: ['timp', 'luni'],
    tip: 'Viitorul: werden pe locul 2 + infinitivul la final: Ich werde Deutsch lernen.',
    words: ['werde', 'wirst', 'werden', 'bald', 'Urlaub', 'Nachste', 'anrufen'],
    dialog: { opener: { de: 'Was wirst du morgen machen?', ro: 'Ce vei face mâine?' }, closer: { de: 'Viel Gluck!', ro: 'Mult noroc!' },
      answers: [{ de: 'Ich werde arbeiten', ro: 'Voi munci' }, { de: 'Ich werde Deutsch lernen', ro: 'Voi învăța germană' }] },
    sentences: [
      { de: 'Ich werde morgen arbeiten.', ro: 'Mâine voi munci.', v: 'werde', vh: 'voi' },
      { de: 'Wir werden nach Berlin fahren.', ro: 'Vom merge la Berlin.', v: 'werden', vh: 'vom' },
      { de: 'Es wird regnen.', ro: 'Va ploua.', v: 'wird', vh: 'va' },
      { de: 'Was wirst du machen?', ro: 'Ce vei face?', v: 'wirst', vh: 'vei' },
      { de: 'Ich werde Deutsch lernen.', ro: 'Voi învăța germană.', v: 'lernen', vh: 'a învăța' },
      { de: 'Er wird bald kommen.', ro: 'El va veni curând.', v: 'bald', vh: 'curând' },
      { de: 'Nachste Woche habe ich Urlaub.', ro: 'Săptămâna viitoare am concediu.', v: 'Urlaub', vh: 'concediu' },
      { de: 'Im Sommer werden wir ans Meer fahren.', ro: 'Vara vom merge la mare.', v: 'werden', vh: 'vom' },
      { de: 'Ich werde dich anrufen.', ro: 'Te voi suna.', v: 'anrufen', vh: 'a suna' },
      { de: 'Bald wird es dunkel.', ro: 'În curând se întunecă.', v: 'dunkel', vh: 'întuneric' },
    ],
  },
  {
    key: 'p_war_hatte', level: 'A2−', name: 'Am fost, am avut (war, hatte)', icon: '⌛', cats: ['locuri', 'adjective'],
    tip: 'Pentru „a fi" și „a avea" la trecut se folosește forma scurtă: ich war (am fost), ich hatte (am avut).',
    words: ['war', 'warst', 'waren', 'hatte', 'hatten', 'toll', 'Gluck', 'Wien'],
    dialog: { opener: { de: 'Wo warst du gestern?', ro: 'Unde ai fost ieri?' }, closer: { de: 'Schon!', ro: 'Frumos!' },
      answers: [{ de: 'Ich war im Kino', ro: 'Am fost la cinema' }, { de: 'Ich war zu Hause', ro: 'Am fost acasă' }] },
    sentences: [
      { de: 'Ich war gestern im Kino.', ro: 'Ieri am fost la cinema.', v: 'war', vh: 'am fost' },
      { de: 'Wo warst du?', ro: 'Unde ai fost?', v: 'warst', vh: 'ai fost' },
      { de: 'Wir waren in Wien.', ro: 'Am fost la Viena.', v: 'waren', vh: 'am fost (noi)' },
      { de: 'Das Wetter war schon.', ro: 'Vremea a fost frumoasă.', v: 'war', vh: 'a fost' },
      { de: 'Ich hatte keine Zeit.', ro: 'Nu am avut timp.', v: 'hatte', vh: 'am avut' },
      { de: 'Er hatte Hunger.', ro: 'Lui îi era foame.', v: 'hatte', vh: 'avea' },
      { de: 'Die Party war toll.', ro: 'Petrecerea a fost grozavă.', v: 'toll', vh: 'grozav' },
      { de: 'Hattest du Gluck?', ro: 'Ai avut noroc?', v: 'Hattest', vh: 'ai avut' },
      { de: 'Es war sehr kalt.', ro: 'A fost foarte frig.', v: 'war', vh: 'a fost' },
      { de: 'Wir hatten Urlaub.', ro: 'Am avut concediu.', v: 'hatten', vh: 'am avut (noi)' },
    ],
  },
  {
    key: 'p_perfekt2', level: 'A2−', name: 'Ce s-a întâmplat (Perfekt)', icon: '📰', cats: ['verbe', 'timp'],
    tip: 'Verbele cu prefix (anrufen, anfangen) au „ge" la mijloc: angerufen, angefangen. Cele cu ver-/be- nu au „ge": verstanden.',
    words: ['gesehen', 'gewartet', 'gefunden', 'geholfen', 'geschrieben', 'angerufen', 'verstanden', 'gesagt'],
    dialog: { opener: { de: 'Was hast du gesagt?', ro: 'Ce ai spus?' }, closer: { de: 'Gut!', ro: 'Bine!' },
      answers: [{ de: 'Ich habe dich gesehen', ro: 'Te-am văzut' }, { de: 'Ich habe das nicht verstanden', ro: 'Nu am înțeles asta' }] },
    sentences: [
      { de: 'Ich habe dich gesehen.', ro: 'Te-am văzut.', v: 'gesehen', vh: 'văzut' },
      { de: 'Wir haben lange gewartet.', ro: 'Am așteptat mult.', v: 'gewartet', vh: 'așteptat' },
      { de: 'Hast du das Buch gefunden?', ro: 'Ai găsit cartea?', v: 'gefunden', vh: 'găsit' },
      { de: 'Er hat mir geholfen.', ro: 'El m-a ajutat.', v: 'geholfen', vh: 'ajutat' },
      { de: 'Ich habe einen Brief geschrieben.', ro: 'Am scris o scrisoare.', v: 'geschrieben', vh: 'scris' },
      { de: 'Sie hat mich angerufen.', ro: 'Ea m-a sunat.', v: 'angerufen', vh: 'sunat' },
      { de: 'Wir haben viel gelacht.', ro: 'Am râs mult.', v: 'gelacht', vh: 'râs' },
      { de: 'Ich habe das nicht verstanden.', ro: 'Nu am înțeles asta.', v: 'verstanden', vh: 'înțeles' },
      { de: 'Der Film hat um acht angefangen.', ro: 'Filmul a început la opt.', v: 'angefangen', vh: 'început' },
      { de: 'Was hast du gesagt?', ro: 'Ce ai spus?', v: 'gesagt', vh: 'spus' },
    ],
  },
  {
    key: 'p_fur_ohne', level: 'A2−', name: 'Pentru, fără, prin (für, ohne)', icon: '🎁', cats: ['familie', 'mancare'],
    tip: 'După für, ohne, durch, um vine mereu acuzativul: für dich, ohne meinen Bruder, durch den Park.',
    words: ['fur', 'ohne', 'durch', 'Geschenk', 'Hilfe', 'Prufung', 'langweilig'],
    dialog: { opener: { de: 'Fur wen ist das Geschenk?', ro: 'Pentru cine e cadoul?' }, closer: { de: 'Danke!', ro: 'Mulțumesc!' },
      answers: [{ de: 'Das ist fur dich', ro: 'E pentru tine' }, { de: 'Das ist fur meine Mutter', ro: 'E pentru mama mea' }] },
    sentences: [
      { de: 'Das Geschenk ist fur dich.', ro: 'Cadoul este pentru tine.', v: 'fur', vh: 'pentru' },
      { de: 'Ich trinke Kaffee ohne Zucker.', ro: 'Beau cafea fără zahăr.', v: 'ohne', vh: 'fără' },
      { de: 'Wir gehen durch den Park.', ro: 'Mergem prin parc.', v: 'durch', vh: 'prin' },
      { de: 'Ich lerne fur die Prufung.', ro: 'Învăț pentru examen.', v: 'Prufung', vh: 'examen' },
      { de: 'Er kommt ohne seine Frau.', ro: 'El vine fără soția lui.', v: 'ohne', vh: 'fără' },
      { de: 'Danke fur die Hilfe.', ro: 'Mulțumesc pentru ajutor.', v: 'Hilfe', vh: 'ajutor' },
      { de: 'Ich kaufe Blumen fur meine Mutter.', ro: 'Cumpăr flori pentru mama mea.', v: 'fur', vh: 'pentru' },
      { de: 'Wir fahren um den See.', ro: 'Mergem în jurul lacului.', v: 'um', vh: 'în jurul' },
      { de: 'Ohne dich ist es langweilig.', ro: 'Fără tine e plictisitor.', v: 'langweilig', vh: 'plictisitor' },
      { de: 'Ich mache das fur meine Familie.', ro: 'Fac asta pentru familia mea.', v: 'mache', vh: 'fac' },
    ],
  },

  // ---------------- A2 (seriile 43–50) ----------------
  {
    key: 'p_dativ_verbe', level: 'A2', name: 'Îmi place, îți mulțumesc (verbe cu dativ)', icon: '🙏', cats: ['haine', 'familie'],
    tip: 'Unele verbe cer dativul: helfen, danken, gefallen, gehören, passen → Das gehört mir. Ich danke dir.',
    words: ['gehort', 'danke', 'passen', 'zeige', 'schenkt', 'Ihnen', 'Schuhe', 'seiner'],
    dialog: { opener: { de: 'Wie geht es Ihnen?', ro: 'Ce mai faceți?' }, closer: { de: 'Schon!', ro: 'Frumos!' },
      answers: [{ de: 'Mir geht es gut', ro: 'Îmi merge bine' }, { de: 'Danke sehr gut', ro: 'Mulțumesc, foarte bine' }] },
    sentences: [
      { de: 'Das Buch gehort mir.', ro: 'Cartea este a mea.', v: 'gehort', vh: 'aparține' },
      { de: 'Ich danke dir.', ro: 'Îți mulțumesc.', v: 'dir', vh: 'ție' },
      { de: 'Der Film gefallt uns.', ro: 'Filmul ne place.', v: 'uns', vh: 'nouă' },
      { de: 'Ich helfe dir gern.', ro: 'Te ajut cu plăcere.', v: 'helfe', vh: 'ajut' },
      { de: 'Das Kleid steht dir gut.', ro: 'Rochia îți stă bine.', v: 'steht', vh: 'stă' },
      { de: 'Ich gebe dem Kind einen Apfel.', ro: 'Îi dau copilului un măr.', v: 'dem', vh: 'articol dativ' },
      { de: 'Er schenkt seiner Frau Blumen.', ro: 'El îi dăruiește soției lui flori.', v: 'seiner', vh: 'a lui (dativ)' },
      { de: 'Die Schuhe passen mir nicht.', ro: 'Pantofii nu mi se potrivesc.', v: 'passen', vh: 'se potrivesc' },
      { de: 'Wie geht es Ihnen?', ro: 'Ce mai faceți?', v: 'Ihnen', vh: 'dumneavoastră (dativ)' },
      { de: 'Ich zeige dir die Stadt.', ro: 'Îți arăt orașul.', v: 'zeige', vh: 'arăt' },
    ],
  },
  {
    key: 'p_wohin', level: 'A2', name: 'Unde pun? Unde stă? (wohin / wo)', icon: '📦', cats: ['casa', 'animale'],
    tip: 'Mișcare spre (wohin?) → acuzativ: auf den Tisch. Poziție (wo?) → dativ: auf dem Tisch.',
    words: ['lege', 'hange', 'stell', 'setze', 'sitzt', 'springt', 'Flasche'],
    dialog: { opener: { de: 'Wo ist das Buch?', ro: 'Unde e cartea?' }, closer: { de: 'Danke!', ro: 'Mulțumesc!' },
      answers: [{ de: 'Das Buch liegt auf dem Tisch', ro: 'Cartea e pe masă' }, { de: 'Das Buch ist im Zimmer', ro: 'Cartea e în cameră' }] },
    sentences: [
      { de: 'Ich lege das Buch auf den Tisch.', ro: 'Pun cartea pe masă.', v: 'den', vh: 'articol acuzativ (mișcare)' },
      { de: 'Das Buch liegt auf dem Tisch.', ro: 'Cartea stă pe masă.', v: 'dem', vh: 'articol dativ (poziție)' },
      { de: 'Ich hange das Bild an die Wand.', ro: 'Agăț tabloul pe perete.', v: 'hange', vh: 'agăț' },
      { de: 'Wir gehen in die Kuche.', ro: 'Mergem în bucătărie.', v: 'die', vh: 'articol acuzativ (feminin)' },
      { de: 'Wir sind in der Kuche.', ro: 'Suntem în bucătărie.', v: 'der', vh: 'articol dativ (feminin)' },
      { de: 'Stell die Flasche in den Kuhlschrank.', ro: 'Pune sticla în frigider.', v: 'Stell', vh: 'pune (în picioare)' },
      { de: 'Die Flasche steht im Kuhlschrank.', ro: 'Sticla este în frigider.', v: 'steht', vh: 'stă (în picioare)' },
      { de: 'Die Katze springt auf das Sofa.', ro: 'Pisica sare pe canapea.', v: 'springt', vh: 'sare' },
      { de: 'Die Katze sitzt auf dem Sofa.', ro: 'Pisica stă pe canapea.', v: 'sitzt', vh: 'stă (așezată)' },
      { de: 'Ich setze mich neben dich.', ro: 'Mă așez lângă tine.', v: 'setze', vh: 'așez' },
    ],
  },
  {
    key: 'p_ob_obwohl', level: 'A2', name: 'Dacă, deși, când (ob, obwohl, als)', icon: '🧩', cats: ['adjective', 'vreme'],
    tip: 'După ob, obwohl, als, wenn, damit verbul merge la final: …, ob er kommt. „als" = când (o dată, în trecut).',
    words: ['ob', 'obwohl', 'damit', 'wohnte', 'spazieren', 'frage', 'sagt'],
    dialog: { opener: { de: 'Kommt er heute?', ro: 'Vine azi?' }, closer: { de: 'Danke!', ro: 'Mulțumesc!' },
      answers: [{ de: 'Ich weiss nicht ob er kommt', ro: 'Nu știu dacă vine' }, { de: 'Er sagt dass er krank ist', ro: 'Spune că e bolnav' }] },
    sentences: [
      { de: 'Ich weiss nicht, ob er kommt.', ro: 'Nu știu dacă vine.', v: 'ob', vh: 'dacă' },
      { de: 'Wenn ich Zeit habe, lese ich.', ro: 'Când am timp, citesc.', v: 'Wenn', vh: 'când / dacă' },
      { de: 'Als ich klein war, wohnte ich in Rumanien.', ro: 'Când eram mic, locuiam în România.', v: 'Als', vh: 'când (în trecut)' },
      { de: 'Obwohl es regnet, gehen wir spazieren.', ro: 'Deși plouă, mergem la plimbare.', v: 'Obwohl', vh: 'deși' },
      { de: 'Ich frage, ob du Zeit hast.', ro: 'Întreb dacă ai timp.', v: 'frage', vh: 'întreb' },
      { de: 'Wenn es warm ist, gehen wir schwimmen.', ro: 'Când e cald, mergem să înotăm.', v: 'schwimmen', vh: 'a înota' },
      { de: 'Als wir in Wien waren, war es kalt.', ro: 'Când am fost la Viena, era frig.', v: 'waren', vh: 'am fost (noi)' },
      { de: 'Ich lerne Deutsch, damit ich arbeiten kann.', ro: 'Învăț germană ca să pot munci.', v: 'damit', vh: 'ca să' },
      { de: 'Obwohl ich mude bin, arbeite ich.', ro: 'Deși sunt obosit, muncesc.', v: 'mude', vh: 'obosit' },
      { de: 'Er sagt, dass er krank ist.', ro: 'El spune că este bolnav.', v: 'sagt', vh: 'spune' },
    ],
  },
  {
    key: 'p_superlativ', level: 'A2', name: 'Cel mai bun (superlativ)', icon: '🏆', cats: ['animale', 'transport'],
    tip: 'Superlativul: am + adjectiv + -sten (am schönsten) sau der/die/das + -ste (der schnellste Zug). gut → am besten.',
    words: ['beste', 'liebsten', 'grossten', 'schonsten', 'schnellste', 'kalteste', 'altesten', 'grosser'],
    dialog: { opener: { de: 'Was trinkst du am liebsten?', ro: 'Ce bei cel mai des (cu cea mai mare plăcere)?' }, closer: { de: 'Sehr gut!', ro: 'Foarte bine!' },
      answers: [{ de: 'Ich trinke am liebsten Tee', ro: 'Cel mai mult îmi place ceaiul' }, { de: 'Ich trinke am liebsten Kaffee', ro: 'Cel mai mult îmi place cafeaua' }] },
    sentences: [
      { de: 'Das ist das beste Restaurant.', ro: 'Acesta este cel mai bun restaurant.', v: 'beste', vh: 'cel mai bun' },
      { de: 'Mein Bruder ist am grossten.', ro: 'Fratele meu este cel mai înalt.', v: 'grossten', vh: 'cel mai mare' },
      { de: 'Der Sommer ist am schonsten.', ro: 'Vara este cea mai frumoasă.', v: 'schonsten', vh: 'cel mai frumos' },
      { de: 'Ich trinke am liebsten Tee.', ro: 'Cel mai mult îmi place să beau ceai.', v: 'liebsten', vh: 'cel mai plăcut' },
      { de: 'Berlin ist grosser als Wien.', ro: 'Berlinul este mai mare decât Viena.', v: 'grosser', vh: 'mai mare' },
      { de: 'Das ist der schnellste Zug.', ro: 'Acesta este cel mai rapid tren.', v: 'schnellste', vh: 'cel mai rapid' },
      { de: 'Heute ist der kalteste Tag.', ro: 'Azi este cea mai rece zi.', v: 'kalteste', vh: 'cel mai rece' },
      { de: 'Sie spricht besser Deutsch als ich.', ro: 'Ea vorbește germana mai bine decât mine.', v: 'besser', vh: 'mai bine' },
      { de: 'Wer ist am altesten?', ro: 'Cine este cel mai în vârstă?', v: 'altesten', vh: 'cel mai în vârstă' },
      { de: 'Das ist so teuer wie ein Auto.', ro: 'Asta este la fel de scump ca o mașină.', v: 'so', vh: 'la fel de' },
    ],
  },
  {
    key: 'p_hotel', level: 'A2', name: 'La hotel', icon: '🏨', cats: ['numere', 'zile'],
    tip: '„Haben Sie ein Zimmer frei?" = aveți o cameră liberă? Nopțile: eine Nacht → zwei Nächte.',
    words: ['reserviert', 'frei', 'Nachte', 'Schlussel', 'Stock', 'Aufzug', 'inklusive', 'viele'],
    dialog: { opener: { de: 'Haben Sie ein Zimmer frei?', ro: 'Aveți o cameră liberă?' }, closer: { de: 'Danke!', ro: 'Mulțumesc!' },
      answers: [{ de: 'Ja fur wie viele Nachte', ro: 'Da, pentru câte nopți?' }, { de: 'Ja wir haben ein Zimmer frei', ro: 'Da, avem o cameră liberă' }] },
    sentences: [
      { de: 'Ich habe ein Zimmer reserviert.', ro: 'Am rezervat o cameră.', v: 'reserviert', vh: 'rezervat' },
      { de: 'Haben Sie ein Zimmer frei?', ro: 'Aveți o cameră liberă?', v: 'frei', vh: 'liber' },
      { de: 'Fur wie viele Nachte?', ro: 'Pentru câte nopți?', v: 'Nachte', vh: 'nopți' },
      { de: 'Das Fruhstuck ist inklusive.', ro: 'Micul dejun este inclus.', v: 'inklusive', vh: 'inclus' },
      { de: 'Wann ist das Fruhstuck?', ro: 'Când este micul dejun?', v: 'Wann', vh: 'când' },
      { de: 'Der Schlussel, bitte.', ro: 'Cheia, vă rog.', v: 'Schlussel', vh: 'cheia' },
      { de: 'Das Zimmer ist im zweiten Stock.', ro: 'Camera este la etajul doi.', v: 'Stock', vh: 'etaj' },
      { de: 'Wir bleiben drei Nachte.', ro: 'Rămânem trei nopți.', v: 'bleiben', vh: 'rămânem' },
      { de: 'Wo ist der Aufzug?', ro: 'Unde este liftul?', v: 'Aufzug', vh: 'lift' },
      { de: 'Ich mochte auschecken.', ro: 'Aș vrea să plec din hotel (check-out).', v: 'auschecken', vh: 'a face check-out' },
    ],
  },
  {
    key: 'p_munca', level: 'A2', name: 'La serviciu', icon: '💼', cats: ['meserii', 'numere'],
    tip: 'Meseria: „Ich arbeite als Verkäuferin" (lucrez ca vânzătoare). Programul: von neun bis fünf.',
    words: ['Chef', 'Kollegen', 'Stelle', 'Besprechung', 'nett', 'freundlich', 'Spass', 'Verkauferin'],
    dialog: { opener: { de: 'Was machst du beruflich?', ro: 'Cu ce te ocupi?' }, closer: { de: 'Interessant!', ro: 'Interesant!' },
      answers: [{ de: 'Ich arbeite als Verkauferin', ro: 'Lucrez ca vânzătoare' }, { de: 'Ich bin Lehrer', ro: 'Sunt profesor' }, { de: 'Ich bin Arzt', ro: 'Sunt medic' }] },
    sentences: [
      { de: 'Ich arbeite als Verkauferin.', ro: 'Lucrez ca vânzătoare.', v: 'als', vh: 'ca (în calitate de)' },
      { de: 'Ich habe morgen ein Vorstellungsgesprach.', ro: 'Mâine am un interviu de angajare.', v: 'Vorstellungsgesprach', vh: 'interviu de angajare' },
      { de: 'Mein Chef ist nett.', ro: 'Șeful meu este drăguț.', v: 'nett', vh: 'drăguț' },
      { de: 'Ich arbeite von neun bis funf.', ro: 'Lucrez de la nouă la cinci.', v: 'bis', vh: 'până la' },
      { de: 'Wir haben heute eine Besprechung.', ro: 'Azi avem o ședință.', v: 'Besprechung', vh: 'ședință' },
      { de: 'Ich schreibe eine E-Mail.', ro: 'Scriu un e-mail.', v: 'schreibe', vh: 'scriu' },
      { de: 'Die Arbeit macht mir Spass.', ro: 'Munca îmi face plăcere.', v: 'Spass', vh: 'plăcere / distracție' },
      { de: 'Ich suche eine neue Stelle.', ro: 'Caut un loc de muncă nou.', v: 'Stelle', vh: 'post / loc de muncă' },
      { de: 'Meine Kollegen sind freundlich.', ro: 'Colegii mei sunt prietenoși.', v: 'freundlich', vh: 'prietenos' },
      { de: 'Heute habe ich frei.', ro: 'Azi sunt liber.', v: 'frei', vh: 'liber' },
    ],
  },
  {
    key: 'p_opinii', level: 'A2', name: 'Ce cred și ce simt', icon: '💬', cats: ['animale', 'culori'],
    tip: 'Părerea: „Ich finde das…", „Meiner Meinung nach…" (după părerea mea — verbul vine imediat după).',
    words: ['interessant', 'Meinung', 'froh', 'Angst', 'stolz', 'egal', 'sicher', 'hoffe'],
    dialog: { opener: { de: 'Wie findest du das?', ro: 'Cum ți se pare?' }, closer: { de: 'Gut!', ro: 'Bine!' },
      answers: [{ de: 'Ich finde das interessant', ro: 'Mi se pare interesant' }, { de: 'Das gefallt mir nicht', ro: 'Nu-mi place' }, { de: 'Das ist mir egal', ro: 'Mi-e egal' }] },
    sentences: [
      { de: 'Ich finde das interessant.', ro: 'Mi se pare interesant.', v: 'interessant', vh: 'interesant' },
      { de: 'Meiner Meinung nach ist das gut.', ro: 'După părerea mea, asta e bine.', v: 'Meinung', vh: 'părere' },
      { de: 'Ich glaube, das ist richtig.', ro: 'Cred că e corect.', v: 'richtig', vh: 'corect' },
      { de: 'Das gefallt mir nicht.', ro: 'Nu-mi place asta.', v: 'gefallt', vh: 'place' },
      { de: 'Ich bin froh, dass du da bist.', ro: 'Mă bucur că ești aici.', v: 'froh', vh: 'bucuros' },
      { de: 'Ich habe Angst vor Hunden.', ro: 'Mi-e frică de câini.', v: 'Angst', vh: 'frică' },
      { de: 'Ich bin stolz auf dich.', ro: 'Sunt mândru de tine.', v: 'stolz', vh: 'mândru' },
      { de: 'Das ist mir egal.', ro: 'Mi-e egal.', v: 'egal', vh: 'egal' },
      { de: 'Ich bin sicher, dass es klappt.', ro: 'Sunt sigur că va merge.', v: 'sicher', vh: 'sigur' },
      { de: 'Ich hoffe, es geht dir gut.', ro: 'Sper că îți merge bine.', v: 'hoffe', vh: 'sper' },
    ],
  },
  {
    key: 'p_weekend', level: 'A2', name: 'Povestea weekendului', icon: '📷', cats: ['zile', 'locuri'],
    tip: 'Când povestești: Perfekt pentru acțiuni (habe gemacht, bin gefahren), „war/hatte" pentru a fi / a avea.',
    words: ['getroffen', 'besucht', 'spannend', 'schones', 'Freundin', 'gefahren', 'geschlafen'],
    dialog: { opener: { de: 'Was hast du am Wochenende gemacht?', ro: 'Ce ai făcut în weekend?' }, closer: { de: 'Schon!', ro: 'Frumos!' },
      answers: [{ de: 'Ich habe lange geschlafen', ro: 'Am dormit mult' }, { de: 'Ich war im Kino', ro: 'Am fost la cinema' }, { de: 'Ich habe meine Eltern besucht', ro: 'Mi-am vizitat părinții' }] },
    sentences: [
      { de: 'Am Samstag habe ich lange geschlafen.', ro: 'Sâmbătă am dormit mult.', v: 'geschlafen', vh: 'dormit' },
      { de: 'Dann bin ich in die Stadt gefahren.', ro: 'Apoi am mers în oraș.', v: 'bin', vh: 'sunt (auxiliar)' },
      { de: 'Ich habe eine Freundin getroffen.', ro: 'M-am întâlnit cu o prietenă.', v: 'getroffen', vh: 'întâlnit' },
      { de: 'Wir haben Kaffee getrunken.', ro: 'Am băut cafea.', v: 'getrunken', vh: 'băut' },
      { de: 'Das Wetter war schon.', ro: 'Vremea a fost frumoasă.', v: 'war', vh: 'a fost' },
      { de: 'Am Abend waren wir im Kino.', ro: 'Seara am fost la cinema.', v: 'waren', vh: 'am fost (noi)' },
      { de: 'Der Film war spannend.', ro: 'Filmul a fost captivant.', v: 'spannend', vh: 'captivant' },
      { de: 'Am Sonntag habe ich meine Eltern besucht.', ro: 'Duminică mi-am vizitat părinții.', v: 'besucht', vh: 'vizitat' },
      { de: 'Wir haben zusammen gegessen.', ro: 'Am mâncat împreună.', v: 'gegessen', vh: 'mâncat' },
      { de: 'Es war ein schones Wochenende.', ro: 'A fost un weekend frumos.', v: 'schones', vh: 'frumos' },
    ],
  },
];

// Setări pe nivel: câte exerciții pe lecție și ce tipuri apar la fiecare etapă
const LEVELS = {
  'A1+': { count: 7 },
  'A2−': { count: 8 },
  'A2': { count: 9 },
};

// Etape în serie (tipurile din SENTENCE_BUILDERS / generator)
const SENTENCE_STAGES = [
  ['sentenceBuild', 'mcDeRo', 'listenChoice', 'trueFalse', 'match', 'mcRoDe'],
  ['sentenceBuild', 'mcRoDe', 'fillBlank', 'wordBank', 'listen', 'listenChoice', 'match', 'trueFalse'],
  ['sentenceBuild', 'fillBlank', 'translate_de_ro', 'translate_ro_de', 'listen', 'speak', 'wordBank', 'mcRoDe'],
];
const THEME_WORD_STAGES = [
  ['mcDeRo', 'listenChoice', 'trueFalse', 'match'],
  ['mcRoDe', 'match', 'listen', 'listenChoice'],
  ['translateDeRo', 'translateRoDe', 'listen', 'speak'],
];
const A1_WORD_STAGES = [
  ['picturePick', 'match', 'mcDeRo'],
  ['sortCategories', 'picturePick', 'listenChoice'],
  ['sortCategories', 'translateRoDe', 'listen'],
];
// La nivel mai mare, etapele „ușoare" folosesc deja tipurile etapei următoare
const LEVEL_STAGE_SHIFT = { 'A1+': 0, 'A2−': 0, 'A2': 1 };

const toWord = e => ({ de: e.de, ro: e.ro, article: e.article });
const THEME_POOL = dictionary.filter(e => e.category === 'a2plus').map(toWord);
const catWords = cat => dictionary.filter(e => e.category === cat).map(toWord);
const themeWords = t => t.words.map(findByDe).filter(Boolean).map(toWord);

function shuffle(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function themeDialogue(theme, rnd, build) {
  const d = theme.dialog;
  const ans = d.answers[Math.floor(rnd() * d.answers.length)];
  const ex = {
    type: 'dialogue',
    scene: d.opener.ro,
    // prietena întreabă, Paula (cursanta) răspunde
    characters: [PAULA, FRIENDS[Math.floor(rnd() * FRIENDS.length)]],
    lines: [
      { who: 1, de: d.opener.de, ro: d.opener.ro },
      { who: 0, blank: true, answer: ans.de, ro: ans.ro },
      { who: 1, de: d.closer.de, ro: d.closer.ro },
    ],
  };
  if (build) {
    const tokens = ans.de.split(' ');
    const extra = shuffle(['nicht', 'sehr', 'und', 'oder', 'auch'].filter(w => !tokens.includes(w)), rnd).slice(0, 2);
    return { ...ex, mode: 'wordBank', bank: [...tokens, ...extra] };
  }
  // variante: celelalte răspunsuri ale temei + unul din alt dialog
  const others = PATH_THEMES.flatMap(t => t.dialog.answers).filter(a => a.de !== ans.de);
  const own = d.answers.filter(a => a.de !== ans.de);
  const distract = [...own, ...shuffle(others, rnd)].slice(0, 2);
  return { ...ex, mode: 'multiChoice', options: shuffle([ans.de, ...distract.map(a => a.de)], rnd) };
}

function interleave(lists) {
  const out = [];
  const max = Math.max(...lists.map(l => l.length));
  for (let i = 0; i < max; i++) for (const l of lists) if (i < l.length) out.push(l[i]);
  return out;
}

const SERIES_SIZE = 10;
const LEVEL_LABEL = ['recunoaștere', 'exersare', 'scriere'];

// Lecțiile lp-(startN+1) … lp-(startN+250), numerotate după cele clasice
export function buildPathLessons({ startN, classicCount, startSeries }) {
  const out = [];
  PATH_THEMES.forEach((theme, t) => {
    const series = startSeries + t;
    const { count } = LEVELS[theme.level];
    const [cat1, cat2] = theme.cats;
    const a1Words = catWords(cat1);
    const a1Pool = a1Words.concat(catWords(cat2));
    const tWords = themeWords(theme);

    for (let k = 1; k <= SERIES_SIZE; k++) {
      const n = startN + t * SERIES_SIZE + k;
      const id = `lp-${n}`;
      const rnd = makeRng(`${id}:mix`);
      const isReview = k === SERIES_SIZE;
      const baseStage = k <= 3 ? 0 : k <= 7 ? 1 : 2;
      const stage = Math.min(2, baseStage + LEVEL_STAGE_SHIFT[theme.level]);

      // Recapitularea: tema + câte 2 propoziții din fiecare din ultimele 4 teme
      const sentences = isReview
        ? theme.sentences.concat(PATH_THEMES.slice(Math.max(0, t - 4), t)
          .flatMap(p => shuffle(p.sentences, rnd).slice(0, 2)))
        : theme.sentences;
      const sentenceTypes = isReview ? [...new Set(SENTENCE_STAGES.flat())] : SENTENCE_STAGES[stage];

      const sentEx = generateSentenceExercises({ sentences, count: count - 3, seed: `${id}:s`, types: sentenceTypes });
      const themeEx = generateExercises({
        words: tWords, pool: THEME_POOL, count: 1, seed: `${id}:t`, types: THEME_WORD_STAGES[stage],
      });
      const a1Ex = generateExercises({
        words: a1Words, pool: a1Pool, count: 1, seed: `${id}:a1`, types: A1_WORD_STAGES[stage],
      });
      // Conversație cu Maria / Ileana / Anuța în fiecare lecție (rotire prin
      // banca nivelului, cu altă replică lipsă la fiecare trecere)
      const convs = conversationsFor(theme.level);
      const slot = t * SERIES_SIZE + (k - 1);
      const conversation = conversationExercise(convs[slot % convs.length], {
        rnd, pick: Math.floor(slot / convs.length), build: stage === 2,
      });

      const exercises = interleave([sentEx, [...themeEx, ...a1Ex]]);
      exercises.splice(Math.min(3, exercises.length), 0, conversation);
      // Dialogul scurt al temei: în lecțiile 1, 4, 7 și la recapitulare
      if (k === 1 || k === 4 || k === 7 || isReview) {
        exercises.splice(Math.min(6, exercises.length), 0, themeDialogue(theme, rnd, stage === 2));
      }

      out.push({
        id,
        title: `Lecția ${classicCount + n}`,
        titleDe: theme.name,
        icon: isReview ? '🔁' : theme.icon,
        description: k === 1
          ? `💡 ${theme.tip}`
          : isReview ? `Seria ${series} · ${theme.level} · recapitulare` : `Seria ${series} · ${theme.level} · ${LEVEL_LABEL[stage]}`,
        unit: classicCount + n,
        extra: true,
        series,
        level: theme.level,
        words: theme.sentences.map(s => ({ de: s.de, ro: s.ro })),
        exercises,
      });
    }
  });
  return out;
}
