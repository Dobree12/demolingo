// ============================================
// Content resolver — un singur motor de lecție pentru tot conținutul
// ============================================
// Lecțiile clasice, unitățile din secțiuni și quiz-urile generate pe loc
// trec toate prin resolveUnit(); ecranul de lecție nu știe diferența.

import { getLessonById } from './lessons.js';
import { getSectionById } from './sections.js';

// Câte exerciții rulează o sesiune. Lecțiile au un pool de ~10x; dintr-un
// pool mare eșantionăm un subset proaspăt la fiecare intrare, ca sesiunea să
// rămână scurtă, iar reluările să acopere alte exerciții (senzație de varietate).
const SESSION_MAX = 14;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sampleUnit(unit) {
  if (!unit || !unit.exercises || unit.exercises.length <= SESSION_MAX) return unit;
  // Păstrăm exercițiile autoreate la început, în ordinea lor (progresie/intro
  // proiectate), apoi completăm până la SESSION_MAX cu generate alese aleator —
  // așa primul exercițiu rămâne stabil, dar reluările aduc varietate.
  const authored = unit.exercises.filter(e => !e.gen).slice(0, SESSION_MAX);
  const generated = unit.exercises.filter(e => e.gen);
  const remaining = SESSION_MAX - authored.length;
  const fill = remaining > 0 ? shuffle(generated).slice(0, remaining) : [];
  return { ...unit, exercises: authored.concat(fill) };
}

export function resolveUnit(params) {
  // Quiz generat pe loc (de ex. din galeria tematică)
  if (params.exercises) {
    return {
      id: params.unitId || 'generated',
      title: params.title || 'Exercițiu',
      icon: params.icon || '✨',
      exercises: params.exercises,
    };
  }

  // Unitate dintr-o secțiune
  if (params.sectionId && params.unitId) {
    const section = getSectionById(params.sectionId);
    const unit = section?.units?.find(u => u.id === params.unitId);
    return sampleUnit(unit || null);
  }

  // Lecție clasică
  return sampleUnit(getLessonById(params.lessonId));
}
