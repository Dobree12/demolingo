// ============================================
// Normalizare text german — partajat între app și scriptul de verificare
// ============================================
// Fără importuri DOM/Vite: trebuie să ruleze și în Node (scripts/verify-vocab.mjs).

// Convenția proiectului: textul german e scris în ASCII (a/o/u/ss).
// Normalizăm totuși defensiv umlauts, ca orice input (sau date vechi) să se potrivească.
export function normalizeGerman(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss')
    .replace(/[.,!?;:„"”«»()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Normalizare pentru română: în plus față de germană, iartă diacriticele
// (ă/â/î/ș/ț), ca răspunsurile tastate pe tastatură US să se potrivească.
export function normalizeRomanian(s) {
  return normalizeGerman(s)
    .replace(/ă/g, 'a')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/ș|ş/g, 's')
    .replace(/ț|ţ/g, 't');
}

// Normalizare pentru compararea răspunsurilor — acceptă ambele limbi.
export function normalizeAnswer(s) {
  return normalizeRomanian(s);
}
