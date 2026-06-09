// ============================================
// Romanian-German Cognates Data
// ============================================

export const cognates = [
  { ro: 'spital', de: 'Spital', meaning: 'hospital', category: 'sănătate' },
  { ro: 'scandal', de: 'Skandal', meaning: 'scandal', category: 'general' },
  { ro: 'rucksac', de: 'Rucksack', meaning: 'backpack', category: 'obiecte' },
  { ro: 'șină', de: 'Schiene', meaning: 'rail/track', category: 'transport' },
  { ro: 'cartof', de: 'Kartoffel', meaning: 'potato', category: 'mâncare' },
  { ro: 'bere', de: 'Bier', meaning: 'beer', category: 'mâncare' },
  { ro: 'dans', de: 'Tanz', meaning: 'dance', category: 'general' },
  { ro: 'muzică', de: 'Musik', meaning: 'music', category: 'cultură' },
  { ro: 'sport', de: 'Sport', meaning: 'sport', category: 'activități' },
  { ro: 'telefon', de: 'Telefon', meaning: 'telephone', category: 'obiecte' },
  { ro: 'hotel', de: 'Hotel', meaning: 'hotel', category: 'călătorii' },
  { ro: 'restaurant', de: 'Restaurant', meaning: 'restaurant', category: 'mâncare' },
  { ro: 'parc', de: 'Park', meaning: 'park', category: 'locuri' },
  { ro: 'familie', de: 'Familie', meaning: 'family', category: 'oameni' },
  { ro: 'universitate', de: 'Universität', meaning: 'university', category: 'educație' },
  { ro: 'profesor', de: 'Professor', meaning: 'professor', category: 'educație' },
  { ro: 'student', de: 'Student', meaning: 'student', category: 'educație' },
  { ro: 'natură', de: 'Natur', meaning: 'nature', category: 'natură' },
  { ro: 'pasaport', de: 'Pass / Reisepass', meaning: 'passport', category: 'călătorii' },
  { ro: 'ciocolată', de: 'Schokolade', meaning: 'chocolate', category: 'mâncare' },
  { ro: 'lampă', de: 'Lampe', meaning: 'lamp', category: 'obiecte' },
  { ro: 'clasă', de: 'Klasse', meaning: 'class', category: 'educație' },
  { ro: 'mașină', de: 'Maschine', meaning: 'machine', category: 'obiecte' },
  { ro: 'poliție', de: 'Polizei', meaning: 'police', category: 'general' },
  { ro: 'banană', de: 'Banane', meaning: 'banana', category: 'mâncare' },
  { ro: 'tomată', de: 'Tomate', meaning: 'tomato', category: 'mâncare' },
  { ro: 'supă', de: 'Suppe', meaning: 'soup', category: 'mâncare' },
  { ro: 'garaj', de: 'Garage', meaning: 'garage', category: 'locuri' },
  { ro: 'balcon', de: 'Balkon', meaning: 'balcony', category: 'locuri' },
  { ro: 'radio', de: 'Radio', meaning: 'radio', category: 'obiecte' },
];

export function getCognateCategories() {
  const cats = {};
  cognates.forEach(c => {
    if (!cats[c.category]) cats[c.category] = [];
    cats[c.category].push(c);
  });
  return cats;
}
