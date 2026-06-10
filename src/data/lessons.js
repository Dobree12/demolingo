// ============================================
// Lesson Content — 7 A1-level units
// ============================================

export const lessons = [
  // ==========================================
  // UNIT 1: Greetings / Salutări
  // ==========================================
  {
    id: 'salutari',
    title: 'Salutări',
    titleDe: 'Begrussungen',
    icon: '👋',
    description: 'Învață să saluti în germană',
    unit: 1,
    words: [
      { de: 'Hallo', ro: 'Bună', example: 'Hallo! Wie geht es dir?', exampleRo: 'Bună! Ce mai faci?' },
      { de: 'Guten Morgen', ro: 'Bună dimineața', example: 'Guten Morgen! Wie geht es Ihnen?', exampleRo: 'Bună dimineața! Ce mai faceți?' },
      { de: 'Guten Tag', ro: 'Bună ziua', example: 'Guten Tag, Herr Muller!', exampleRo: 'Bună ziua, domnul Muller!' },
      { de: 'Guten Abend', ro: 'Bună seara', example: 'Guten Abend! Willkommen!', exampleRo: 'Bună seara! Bine ați venit!' },
      { de: 'Gute Nacht', ro: 'Noapte bună', example: 'Gute Nacht! Schlaf gut!', exampleRo: 'Noapte bună! Somn ușor!' },
      { de: 'Tschuss', ro: 'Pa / La revedere', example: 'Tschuss! Bis morgen!', exampleRo: 'Pa! Pe mâine!' },
      { de: 'Auf Wiedersehen', ro: 'La revedere (formal)', example: 'Auf Wiedersehen, Frau Schmidt!', exampleRo: 'La revedere, doamna Schmidt!' },
      { de: 'Danke', ro: 'Mulțumesc', example: 'Danke schon!', exampleRo: 'Mulțumesc frumos!' },
      { de: 'Bitte', ro: 'Te rog / Cu plăcere', example: 'Bitte schon!', exampleRo: 'Cu plăcere!' },
      { de: 'Ja', ro: 'Da', example: 'Ja, naturlich!', exampleRo: 'Da, desigur!' },
      { de: 'Nein', ro: 'Nu', example: 'Nein, danke.', exampleRo: 'Nu, mulțumesc.' },
      { de: 'Entschuldigung', ro: 'Scuzați-mă', example: 'Entschuldigung, wo ist der Bahnhof?', exampleRo: 'Scuzați-mă, unde este gara?' },
    ],
    exercises: [
      { type: 'multiChoice', question: 'Ce înseamnă "Hallo"?', correct: 'Bună', options: ['Bună', 'Pa', 'Mulțumesc', 'Noapte bună'] },
      { type: 'multiChoice', question: 'Cum spui "Bună dimineața" în germană?', correct: 'Guten Morgen', options: ['Guten Morgen', 'Guten Tag', 'Guten Abend', 'Gute Nacht'] },
      { type: 'translate_ro_de', prompt: 'Bună ziua', answer: 'Guten Tag' },
      { type: 'translate_de_ro', prompt: 'Tschuss', answer: 'Pa' , alts: ['La revedere'] },
      { type: 'listen', word: 'Guten Morgen', answer: 'Guten Morgen' },
      { type: 'match', pairs: [['Hallo', 'Bună'], ['Danke', 'Mulțumesc'], ['Bitte', 'Te rog'], ['Ja', 'Da']] },
      { type: 'fillBlank', sentence: '_____ Morgen! Wie geht es dir?', answer: 'Guten', hint: 'Bună dimineața' },
      { type: 'multiChoice', question: 'Cum mulțumești în germană?', correct: 'Danke', options: ['Bitte', 'Danke', 'Hallo', 'Nein'] },
      { type: 'speak', word: 'Guten Tag', translation: 'Bună ziua' },
      { type: 'translate_ro_de', prompt: 'Mulțumesc', answer: 'Danke' },
      { type: 'listen', word: 'Auf Wiedersehen', answer: 'Auf Wiedersehen' },
      { type: 'wordBank', promptDe: 'Guten Morgen!', answer: 'Bună dimineața', bank: ['Bună', 'dimineața', 'ziua', 'seara', 'noapte'] },
      { type: 'multiChoice', question: 'Ce înseamnă "Nein"?', correct: 'Nu', options: ['Da', 'Nu', 'Te rog', 'Scuze'] },
    ],
  },

  // ==========================================
  // UNIT 2: Introductions / Prezentări
  // ==========================================
  {
    id: 'prezentari',
    title: 'Prezentări',
    titleDe: 'Vorstellungen',
    icon: '🙋',
    description: 'Învață să te prezinți',
    unit: 2,
    words: [
      { de: 'Ich', ro: 'Eu', example: 'Ich bin Maria.', exampleRo: 'Eu sunt Maria.' },
      { de: 'Du', ro: 'Tu', example: 'Du bist nett.', exampleRo: 'Tu ești drăguțu/ă.' },
      { de: 'bin', ro: 'sunt', example: 'Ich bin Student.', exampleRo: 'Eu sunt student.' },
      { de: 'heisse', ro: 'mă numesc', example: 'Ich heisse Anna.', exampleRo: 'Mă numesc Anna.' },
      { de: 'Wie heisst du?', ro: 'Cum te numești?', example: 'Hallo! Wie heisst du?', exampleRo: 'Bună! Cum te numești?' },
      { de: 'Wie geht es dir?', ro: 'Ce mai faci?', example: 'Hallo! Wie geht es dir?', exampleRo: 'Bună! Ce mai faci?' },
      { de: 'Gut', ro: 'Bine', example: 'Mir geht es gut.', exampleRo: 'Sunt bine.' },
      { de: 'Schlecht', ro: 'Rău', example: 'Mir geht es schlecht.', exampleRo: 'Sunt rău / Nu mă simt bine.' },
      { de: 'Freut mich', ro: 'Îmi pare bine (de cunoștință)', example: 'Freut mich, dich kennenzulernen!', exampleRo: 'Îmi pare bine de cunoștință!' },
      { de: 'Ich komme aus', ro: 'Eu vin din / Sunt din', example: 'Ich komme aus Rumanien.', exampleRo: 'Eu sunt din România.' },
      { de: 'Rumanien', ro: 'România', example: 'Ich komme aus Rumanien.', exampleRo: 'Eu vin din România.' },
      { de: 'Deutschland', ro: 'Germania', example: 'Deutschland ist schon.', exampleRo: 'Germania e frumoasă.' },
    ],
    exercises: [
      { type: 'multiChoice', question: 'Cum spui "Eu sunt" în germană?', correct: 'Ich bin', options: ['Ich bin', 'Du bist', 'Ich heisse', 'Ich komme'] },
      { type: 'translate_ro_de', prompt: 'Mă numesc Anna', answer: 'Ich heisse Anna' },
      { type: 'listen', word: 'Wie heisst du?', answer: 'Wie heisst du' },
      { type: 'fillBlank', sentence: 'Ich _____ aus Rumanien.', answer: 'komme', hint: 'Eu vin din România' },
      { type: 'match', pairs: [['Ich', 'Eu'], ['Du', 'Tu'], ['Gut', 'Bine'], ['Schlecht', 'Rău']] },
      { type: 'multiChoice', question: 'Ce înseamnă "Freut mich"?', correct: 'Îmi pare bine', options: ['Îmi pare bine', 'Mă numesc', 'Sunt bine', 'La revedere'] },
      { type: 'speak', word: 'Ich heisse', translation: 'Mă numesc' },
      { type: 'translate_de_ro', prompt: 'Wie geht es dir?', answer: 'Ce mai faci?', alts: ['Ce mai faci', 'Cum te simți'] },
      { type: 'multiChoice', question: 'Cum spui "România" în germană?', correct: 'Rumanien', options: ['Rumanien', 'Deutschland', 'Osterreich', 'Russland'] },
      { type: 'fillBlank', sentence: '_____ mich, dich kennenzulernen!', answer: 'Freut', hint: 'Îmi pare bine de cunoștință' },
      { type: 'translate_ro_de', prompt: 'Eu sunt din România', answer: 'Ich komme aus Rumanien' },
      { type: 'listen', word: 'Freut mich', answer: 'Freut mich' },
      { type: 'wordBank', promptDe: 'Ich heisse Anna.', answer: 'Mă numesc Anna', bank: ['Mă', 'numesc', 'Anna', 'sunt', 'eu', 'din'] },
    ],
  },

  // ==========================================
  // UNIT 3: Numbers / Numere
  // ==========================================
  {
    id: 'numere',
    title: 'Numere',
    titleDe: 'Zahlen',
    icon: '🔢',
    description: 'Numerele de la 1 la 20',
    unit: 3,
    words: [
      { de: 'eins', ro: 'unu (1)', example: 'Ich habe eins.', exampleRo: 'Am unu.' },
      { de: 'zwei', ro: 'doi (2)', example: 'Zwei Kaffee, bitte.', exampleRo: 'Două cafele, vă rog.' },
      { de: 'drei', ro: 'trei (3)', example: 'Ich habe drei Bucher.', exampleRo: 'Am trei cărți.' },
      { de: 'vier', ro: 'patru (4)', example: 'Vier Jahreszeiten.', exampleRo: 'Patru anotimpuri.' },
      { de: 'funf', ro: 'cinci (5)', example: 'Funf Minuten, bitte.', exampleRo: 'Cinci minute, vă rog.' },
      { de: 'sechs', ro: 'șase (6)', example: 'Sechs Tage.', exampleRo: 'Șase zile.' },
      { de: 'sieben', ro: 'șapte (7)', example: 'Sieben Tage in der Woche.', exampleRo: 'Șapte zile în săptămână.' },
      { de: 'acht', ro: 'opt (8)', example: 'Acht Uhr.', exampleRo: 'Ora opt.' },
      { de: 'neun', ro: 'nouă (9)', example: 'Neun Katzen.', exampleRo: 'Nouă pisici.' },
      { de: 'zehn', ro: 'zece (10)', example: 'Zehn Euro, bitte.', exampleRo: 'Zece euro, vă rog.' },
    ],
    exercises: [
      { type: 'multiChoice', question: 'Ce înseamnă "drei"?', correct: 'trei', options: ['doi', 'trei', 'patru', 'cinci'] },
      { type: 'multiChoice', question: 'Cum spui "cinci" în germană?', correct: 'funf', options: ['vier', 'funf', 'sechs', 'drei'] },
      { type: 'match', pairs: [['eins', 'unu'], ['zwei', 'doi'], ['drei', 'trei'], ['vier', 'patru']] },
      { type: 'listen', word: 'sieben', answer: 'sieben' },
      { type: 'translate_ro_de', prompt: 'zece', answer: 'zehn' },
      { type: 'translate_de_ro', prompt: 'acht', answer: 'opt' },
      { type: 'fillBlank', sentence: '_____ Kaffee, bitte.', answer: 'Zwei', hint: 'Două cafele, vă rog' },
      { type: 'speak', word: 'funf', translation: 'cinci' },
      { type: 'multiChoice', question: 'Ce înseamnă "neun"?', correct: 'nouă', options: ['opt', 'nouă', 'zece', 'șase'] },
      { type: 'match', pairs: [['funf', 'cinci'], ['sechs', 'șase'], ['sieben', 'șapte'], ['acht', 'opt']] },
      { type: 'listen', word: 'zehn', answer: 'zehn' },
      { type: 'translate_ro_de', prompt: 'șapte', answer: 'sieben' },
    ],
  },

  // ==========================================
  // UNIT 4: Family / Familie
  // ==========================================
  {
    id: 'familie',
    title: 'Familie',
    titleDe: 'Familie',
    icon: '👨‍👩‍👧‍👦',
    description: 'Membrii familiei',
    unit: 4,
    words: [
      { de: 'die Mutter', ro: 'mama', example: 'Meine Mutter heisst Elena.', exampleRo: 'Mama mea se numește Elena.' },
      { de: 'der Vater', ro: 'tatăl', example: 'Mein Vater ist Lehrer.', exampleRo: 'Tatăl meu este profesor.' },
      { de: 'die Schwester', ro: 'sora', example: 'Meine Schwester ist jung.', exampleRo: 'Sora mea este tânără.' },
      { de: 'der Bruder', ro: 'fratele', example: 'Mein Bruder spielt Fussball.', exampleRo: 'Fratele meu joacă fotbal.' },
      { de: 'die Grossmutter', ro: 'bunica', example: 'Meine Grossmutter kocht gut.', exampleRo: 'Bunica mea gătește bine.' },
      { de: 'der Grossvater', ro: 'bunicul', example: 'Mein Grossvater liest gern.', exampleRo: 'Bunicul meu citește cu plăcere.' },
      { de: 'das Kind', ro: 'copilul', example: 'Das Kind spielt im Park.', exampleRo: 'Copilul se joacă în parc.' },
      { de: 'die Eltern', ro: 'părinții', example: 'Meine Eltern sind nett.', exampleRo: 'Părinții mei sunt drăguți.' },
      { de: 'der Mann', ro: 'soțul / bărbatul', example: 'Der Mann ist gross.', exampleRo: 'Bărbatul este înalt.' },
      { de: 'die Frau', ro: 'soția / femeia', example: 'Die Frau ist arztin.', exampleRo: 'Femeia este doctoriță.' },
    ],
    exercises: [
      { type: 'multiChoice', question: 'Ce înseamnă "die Mutter"?', correct: 'mama', options: ['mama', 'sora', 'bunica', 'soția'] },
      { type: 'match', pairs: [['die Mutter', 'mama'], ['der Vater', 'tatăl'], ['die Schwester', 'sora'], ['der Bruder', 'fratele']] },
      { type: 'translate_ro_de', prompt: 'bunica', answer: 'die Grossmutter' },
      { type: 'listen', word: 'der Bruder', answer: 'der Bruder' },
      { type: 'fillBlank', sentence: 'Mein _____ spielt Fussball.', answer: 'Bruder', hint: 'Fratele meu joacă fotbal' },
      { type: 'multiChoice', question: 'Cum spui "copilul" în germană?', correct: 'das Kind', options: ['der Mann', 'das Kind', 'die Frau', 'der Bruder'] },
      { type: 'translate_de_ro', prompt: 'die Eltern', answer: 'părinții', alts: ['parintii'] },
      { type: 'speak', word: 'die Mutter', translation: 'mama' },
      { type: 'match', pairs: [['die Grossmutter', 'bunica'], ['der Grossvater', 'bunicul'], ['das Kind', 'copilul'], ['die Eltern', 'părinții']] },
      { type: 'multiChoice', question: 'Ce înseamnă "der Mann"?', correct: 'soțul / bărbatul', options: ['copilul', 'fratele', 'soțul / bărbatul', 'tatăl'] },
      { type: 'translate_ro_de', prompt: 'sora', answer: 'die Schwester' },
      { type: 'listen', word: 'die Grossmutter', answer: 'die Grossmutter' },
    ],
  },

  // ==========================================
  // UNIT 5: Food & Drink / Mâncare și Băuturi
  // ==========================================
  {
    id: 'mancare',
    title: 'Mâncare și Băuturi',
    titleDe: 'Essen und Trinken',
    icon: '🍽️',
    description: 'Alimente și băuturi de bază',
    unit: 5,
    words: [
      { de: 'das Brot', ro: 'pâinea', example: 'Ich esse Brot.', exampleRo: 'Eu mănânc pâine.' },
      { de: 'das Wasser', ro: 'apa', example: 'Ich trinke Wasser.', exampleRo: 'Eu beau apă.' },
      { de: 'die Milch', ro: 'laptele', example: 'Die Milch ist frisch.', exampleRo: 'Laptele e proaspăt.' },
      { de: 'der Kaffee', ro: 'cafeaua', example: 'Ich trinke Kaffee.', exampleRo: 'Eu beau cafea.' },
      { de: 'der Tee', ro: 'ceaiul', example: 'Mochtest du Tee?', exampleRo: 'Vrei ceai?' },
      { de: 'der Apfel', ro: 'mărul', example: 'Der Apfel ist rot.', exampleRo: 'Mărul este roșu.' },
      { de: 'die Suppe', ro: 'supa', example: 'Die Suppe ist heiss.', exampleRo: 'Supa este fierbinte.' },
      { de: 'das Fleisch', ro: 'carnea', example: 'Ich esse kein Fleisch.', exampleRo: 'Eu nu mănânc carne.' },
      { de: 'der Kase', ro: 'brânza', example: 'Ich mag Kase.', exampleRo: 'Îmi place brânza.' },
      { de: 'essen', ro: 'a mânca', example: 'Was mochtest du essen?', exampleRo: 'Ce vrei să mănânci?' },
      { de: 'trinken', ro: 'a bea', example: 'Was mochtest du trinken?', exampleRo: 'Ce vrei să bei?' },
    ],
    exercises: [
      { type: 'multiChoice', question: 'Ce înseamnă "das Brot"?', correct: 'pâinea', options: ['pâinea', 'carnea', 'brânza', 'supa'] },
      { type: 'translate_ro_de', prompt: 'apa', answer: 'das Wasser' },
      { type: 'match', pairs: [['das Brot', 'pâinea'], ['das Wasser', 'apa'], ['die Milch', 'laptele'], ['der Kaffee', 'cafeaua']] },
      { type: 'listen', word: 'der Kaffee', answer: 'der Kaffee' },
      { type: 'fillBlank', sentence: 'Ich trinke _____.', answer: 'Wasser', hint: 'Eu beau apă' },
      { type: 'multiChoice', question: 'Cum spui "a bea" în germană?', correct: 'trinken', options: ['essen', 'trinken', 'Kaffee', 'Wasser'] },
      { type: 'translate_de_ro', prompt: 'der Apfel', answer: 'mărul', alts: ['marul', 'mar'] },
      { type: 'speak', word: 'das Brot', translation: 'pâinea' },
      { type: 'match', pairs: [['der Tee', 'ceaiul'], ['die Suppe', 'supa'], ['der Kase', 'brânza'], ['das Fleisch', 'carnea']] },
      { type: 'fillBlank', sentence: 'Was mochtest du _____?', answer: 'essen', hint: 'Ce vrei să mănânci?' },
      { type: 'multiChoice', question: 'Ce înseamnă "die Milch"?', correct: 'laptele', options: ['apa', 'laptele', 'cafeaua', 'ceaiul'] },
      { type: 'translate_ro_de', prompt: 'brânza', answer: 'der Kase' },
      { type: 'picturePick', wordDe: 'Milch', correct: 'Milch', options: ['Milch', 'Tee', 'Kaffee'] },
      { type: 'picturePick', wordDe: 'Apfel', correct: 'Apfel', options: ['Apfel', 'Brot', 'Kase'] },
      { type: 'wordBank', promptDe: 'Ich trinke Wasser.', answer: 'Eu beau apă', bank: ['Eu', 'beau', 'apă', 'mănânc', 'cafea', 'lapte'] },
    ],
  },

  // ==========================================
  // UNIT 6: Colors / Culori
  // ==========================================
  {
    id: 'culori',
    title: 'Culori',
    titleDe: 'Farben',
    icon: '🎨',
    description: 'Culorile principale',
    unit: 6,
    words: [
      { de: 'rot', ro: 'roșu', example: 'Der Apfel ist rot.', exampleRo: 'Mărul este roșu.' },
      { de: 'blau', ro: 'albastru', example: 'Der Himmel ist blau.', exampleRo: 'Cerul este albastru.' },
      { de: 'grun', ro: 'verde', example: 'Das Gras ist grun.', exampleRo: 'Iarba este verde.' },
      { de: 'gelb', ro: 'galben', example: 'Die Sonne ist gelb.', exampleRo: 'Soarele este galben.' },
      { de: 'schwarz', ro: 'negru', example: 'Die Katze ist schwarz.', exampleRo: 'Pisica este neagră.' },
      { de: 'weiss', ro: 'alb', example: 'Der Schnee ist weiss.', exampleRo: 'Zăpada este albă.' },
      { de: 'braun', ro: 'maro', example: 'Der Hund ist braun.', exampleRo: 'Câinele este maro.' },
      { de: 'orange', ro: 'portocaliu', example: 'Die Orange ist orange.', exampleRo: 'Portocala este portocalie.' },
      { de: 'rosa', ro: 'roz', example: 'Die Blume ist rosa.', exampleRo: 'Floarea este roz.' },
      { de: 'lila', ro: 'mov', example: 'Das Kleid ist lila.', exampleRo: 'Rochia este mov.' },
    ],
    exercises: [
      { type: 'multiChoice', question: 'Ce înseamnă "rot"?', correct: 'roșu', options: ['albastru', 'roșu', 'verde', 'galben'] },
      { type: 'multiChoice', question: 'Cum spui "verde" în germană?', correct: 'grun', options: ['gelb', 'blau', 'grun', 'rot'] },
      { type: 'match', pairs: [['rot', 'roșu'], ['blau', 'albastru'], ['grun', 'verde'], ['gelb', 'galben']] },
      { type: 'translate_ro_de', prompt: 'negru', answer: 'schwarz' },
      { type: 'listen', word: 'blau', answer: 'blau' },
      { type: 'fillBlank', sentence: 'Der Apfel ist _____.', answer: 'rot', hint: 'Mărul este roșu' },
      { type: 'speak', word: 'grun', translation: 'verde' },
      { type: 'translate_de_ro', prompt: 'weiss', answer: 'alb' },
      { type: 'match', pairs: [['schwarz', 'negru'], ['weiss', 'alb'], ['braun', 'maro'], ['rosa', 'roz']] },
      { type: 'multiChoice', question: 'Ce înseamnă "gelb"?', correct: 'galben', options: ['verde', 'galben', 'roșu', 'albastru'] },
      { type: 'translate_ro_de', prompt: 'albastru', answer: 'blau' },
      { type: 'listen', word: 'schwarz', answer: 'schwarz' },
      { type: 'picturePick', wordDe: 'rot', correct: 'rot', options: ['rot', 'blau', 'grun'] },
      { type: 'picturePick', wordDe: 'gelb', correct: 'gelb', options: ['gelb', 'schwarz', 'weiss'] },
    ],
  },

  // ==========================================
  // UNIT 7: Animals / Animale
  // ==========================================
  {
    id: 'animale',
    title: 'Animale',
    titleDe: 'Tiere',
    icon: '🐾',
    description: 'Animalele cele mai comune',
    unit: 7,
    words: [
      { de: 'der Hund', ro: 'câinele', example: 'Der Hund ist treu.', exampleRo: 'Câinele este fidel.' },
      { de: 'die Katze', ro: 'pisica', example: 'Die Katze schlaft.', exampleRo: 'Pisica doarme.' },
      { de: 'der Vogel', ro: 'pasărea', example: 'Der Vogel singt.', exampleRo: 'Pasărea cântă.' },
      { de: 'der Fisch', ro: 'peștele', example: 'Der Fisch schwimmt.', exampleRo: 'Peștele înoată.' },
      { de: 'das Pferd', ro: 'calul', example: 'Das Pferd ist schnell.', exampleRo: 'Calul este rapid.' },
      { de: 'die Kuh', ro: 'vaca', example: 'Die Kuh gibt Milch.', exampleRo: 'Vaca dă lapte.' },
      { de: 'das Schwein', ro: 'porcul', example: 'Das Schwein ist rosa.', exampleRo: 'Porcul este roz.' },
      { de: 'die Maus', ro: 'șoarecele', example: 'Die Maus ist klein.', exampleRo: 'Șoarecele este mic.' },
      { de: 'der Bar', ro: 'ursul', example: 'Der Bar ist gross.', exampleRo: 'Ursul este mare.' },
      { de: 'der Fuchs', ro: 'vulpea', example: 'Der Fuchs ist schlau.', exampleRo: 'Vulpea este șireată.' },
    ],
    exercises: [
      { type: 'multiChoice', question: 'Ce înseamnă "der Hund"?', correct: 'câinele', options: ['pisica', 'câinele', 'pasărea', 'peștele'] },
      { type: 'match', pairs: [['der Hund', 'câinele'], ['die Katze', 'pisica'], ['der Vogel', 'pasărea'], ['der Fisch', 'peștele']] },
      { type: 'translate_ro_de', prompt: 'pisica', answer: 'die Katze' },
      { type: 'listen', word: 'das Pferd', answer: 'das Pferd' },
      { type: 'fillBlank', sentence: 'Die _____ gibt Milch.', answer: 'Kuh', hint: 'Vaca dă lapte' },
      { type: 'multiChoice', question: 'Cum spui "vulpea" în germană?', correct: 'der Fuchs', options: ['der Bar', 'der Fuchs', 'die Maus', 'der Hund'] },
      { type: 'speak', word: 'die Katze', translation: 'pisica' },
      { type: 'translate_de_ro', prompt: 'das Schwein', answer: 'porcul', alts: ['porc'] },
      { type: 'match', pairs: [['das Pferd', 'calul'], ['die Kuh', 'vaca'], ['der Bar', 'ursul'], ['der Fuchs', 'vulpea']] },
      { type: 'multiChoice', question: 'Ce înseamnă "die Maus"?', correct: 'șoarecele', options: ['calul', 'ursul', 'șoarecele', 'porcul'] },
      { type: 'translate_ro_de', prompt: 'ursul', answer: 'der Bar' },
      { type: 'listen', word: 'der Fuchs', answer: 'der Fuchs' },
      { type: 'picturePick', wordDe: 'Hund', correct: 'Hund', options: ['Hund', 'Katze', 'Vogel'] },
      { type: 'picturePick', wordDe: 'Pferd', correct: 'Pferd', options: ['Pferd', 'Kuh', 'Schwein'] },
    ],
  },
];

export function getLessonById(id) {
  return lessons.find(l => l.id === id);
}

export function getAllLessons() {
  return lessons;
}

export function getLessonWords(lessonId) {
  const lesson = getLessonById(lessonId);
  return lesson ? lesson.words : [];
}
