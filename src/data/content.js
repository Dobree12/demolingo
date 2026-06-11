// ============================================
// Content resolver — un singur motor de lecție pentru tot conținutul
// ============================================
// Lecțiile clasice, unitățile din secțiuni și quiz-urile generate pe loc
// trec toate prin resolveUnit(); ecranul de lecție nu știe diferența.

import { getLessonById } from './lessons.js';
import { getSectionById } from './sections.js';

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
    return unit || null;
  }

  // Lecție clasică
  return getLessonById(params.lessonId);
}
