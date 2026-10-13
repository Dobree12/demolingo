// ============================================
// Escapare HTML — pentru text pus în atribute (data-value="…") sau în conținut
// ============================================
// Fără ea, un `"` dintr-o traducere (ex. „leg dich hin" = întinde-te) închidea
// atributul înainte de vreme: valoarea citită din dataset era tăiată și
// exercițiul nu mai recunoștea răspunsul corect. `dataset` decodează automat
// entitățile, deci comparațiile cu datele originale rămân valabile.

export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
