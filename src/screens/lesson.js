// ============================================
// Lesson Screen — Exercise flow controller
// ============================================

import { getLessonById } from '../data/lessons.js';
import { getHearts, loseHeart, startLessonHearts, hasHearts } from '../engine/hearts.js';
import { addXP, addWordLearned, addMistake, recordCorrect, completeLesson, updateDailyTime, getLevelName } from '../engine/progress.js';
import { updateWordSRS } from '../engine/srs.js';
import { speak, speakSlow, playSound, startListening } from '../engine/audio.js';
import { getCorrectMessage, getRandomMessage, wrongMessages, heartsLostMessages, midLessonEncouragement } from '../data/messages.js';
import { renderMascot, getMascotReaction } from '../components/mascot.js';
import { launchConfetti, launchStars } from '../components/confetti.js';
import { showToast, showXPToast, showBadgeToast, showLevelUpToast } from '../components/toast.js';
import { renderMultiChoice } from '../exercises/multiChoice.js';
import { renderTranslate } from '../exercises/translate.js';
import { renderMatch } from '../exercises/match.js';
import { renderFillBlank } from '../exercises/fillBlank.js';
import { renderListen } from '../exercises/listen.js';
import { renderSpeak } from '../exercises/speak.js';
import { renderWordBank } from '../exercises/wordBank.js';
import { renderPicturePick } from '../exercises/picturePick.js';

let currentExerciseIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let consecutiveCorrect = 0;
let lessonData = null;
let hearts = 5;
let exerciseLocked = false;
let sessionStartTime = null;
let currentAttempt = 0; // wrong attempts for current exercise (0 = none yet)
const MAX_ATTEMPTS = 5;

export function renderLesson(navigate, params) {
  const lesson = getLessonById(params.lessonId);
  if (!lesson) {
    navigate('home');
    return '<p>Lecția nu a fost găsită.</p>';
  }
  
  lessonData = lesson;
  currentExerciseIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  consecutiveCorrect = 0;
  exerciseLocked = false;
  currentAttempt = 0;
  hearts = startLessonHearts();
  sessionStartTime = Date.now();
  
  return renderLessonUI(navigate);
}

function renderLessonUI(navigate) {
  const lesson = lessonData;
  const exercise = lesson.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex) / lesson.exercises.length) * 100;
  
  // Hearts display
  const heartsHTML = Array.from({ length: 5 }, (_, i) => 
    `<span class="heart-icon ${i < hearts ? 'heart-active' : 'heart-empty'}">${i < hearts ? '❤️' : '🤍'}</span>`
  ).join('');
  
  // Exercise content
  let exerciseHTML = '';
  switch (exercise.type) {
    case 'multiChoice': exerciseHTML = renderMultiChoice(exercise); break;
    case 'translate_ro_de': 
    case 'translate_de_ro': exerciseHTML = renderTranslate(exercise); break;
    case 'match': exerciseHTML = renderMatch(exercise); break;
    case 'fillBlank': exerciseHTML = renderFillBlank(exercise); break;
    case 'listen': exerciseHTML = renderListen(exercise); break;
    case 'speak': exerciseHTML = renderSpeak(exercise); break;
    case 'wordBank': exerciseHTML = renderWordBank(exercise); break;
    case 'picturePick': exerciseHTML = renderPicturePick(exercise); break;
    default: exerciseHTML = `<p>Tip necunoscut: ${exercise.type}</p>`;
  }
  
  // Mid-lesson encouragement (every 4 exercises)
  const showEncouragement = currentExerciseIndex > 0 && currentExerciseIndex % 4 === 0 && consecutiveCorrect >= 2;
  
  return `
    <div class="lesson-screen">
      <!-- Lesson Header -->
      <div class="lesson-header">
        <button class="lesson-close-btn" id="btn-close-lesson">✕</button>
        <div class="progress-bar-container" style="flex: 1;">
          <div class="progress-bar-fill" style="width: ${progress}%;"></div>
        </div>
        <div class="lesson-hearts">${heartsHTML}</div>
      </div>
      
      <!-- Lesson Title -->
      <div class="lesson-title-bar">
        <span class="lesson-title-text">${lesson.icon} ${lesson.title}</span>
        <span class="lesson-counter">${currentExerciseIndex + 1}/${lesson.exercises.length}</span>
      </div>
      
      ${showEncouragement ? `
        <div class="lesson-encouragement animate-fadeInDown">
          ${getRandomMessage(midLessonEncouragement)}
        </div>
      ` : ''}
      
      <!-- Exercise Area -->
      <div class="exercise-area animate-fadeInUp" id="exercise-area">
        ${exerciseHTML}
      </div>
      
      <!-- Feedback Area (hidden by default) -->
      <div class="feedback-area hidden" id="feedback-area"></div>
    </div>
  `;
}

export function attachLessonEvents(navigate, params) {
  const lesson = getLessonById(params.lessonId);
  if (!lesson) return;
  
  // Close button
  document.getElementById('btn-close-lesson')?.addEventListener('click', () => {
    if (confirm('Ești sigur că vrei să ieși din lecție? Progresul nu va fi salvat.')) {
      navigate('home');
    }
  });
  
  // Attach exercise-specific events
  const exercise = lesson.exercises[currentExerciseIndex];
  attachExerciseEvents(exercise, navigate, params);
}

function attachExerciseEvents(exercise, navigate, params) {
  switch (exercise.type) {
    case 'multiChoice':
      attachMultiChoiceEvents(exercise, navigate, params);
      break;
    case 'translate_ro_de':
    case 'translate_de_ro':
      attachTranslateEvents(exercise, navigate, params);
      break;
    case 'match':
      attachMatchEvents(exercise, navigate, params);
      break;
    case 'fillBlank':
      attachFillBlankEvents(exercise, navigate, params);
      break;
    case 'listen':
      attachListenEvents(exercise, navigate, params);
      break;
    case 'speak':
      attachSpeakEvents(exercise, navigate, params);
      break;
    case 'wordBank':
      attachWordBankEvents(exercise, navigate, params);
      break;
    case 'picturePick':
      attachPicturePickEvents(exercise, navigate, params);
      break;
  }
}

function attachWordBankEvents(exercise, navigate, params) {
  const answerRow = document.getElementById('wb-answer');
  const bank = document.getElementById('wb-bank');
  const checkBtn = document.getElementById('btn-wb-check');
  const clearBtn = document.getElementById('btn-wb-clear');
  const placeholder = answerRow?.querySelector('.wb-placeholder');

  // Speaker — speak the German prompt
  document.getElementById('btn-wb-speak')?.addEventListener('click', () => speak(exercise.promptDe));
  setTimeout(() => speak(exercise.promptDe), 400);

  // Track the selected chips in order
  const selected = [];

  const refreshState = () => {
    if (placeholder) placeholder.style.display = selected.length === 0 ? '' : 'none';
    if (checkBtn) checkBtn.disabled = selected.length === 0;
  };

  const addChip = (token, tileEl) => {
    if (exerciseLocked) return;
    selected.push({ token, tileEl });
    tileEl.classList.add('wb-used');

    const chip = document.createElement('button');
    chip.className = 'wb-chip animate-fadeInUp';
    chip.textContent = token;
    chip.addEventListener('click', () => removeChip(chip, tileEl));
    answerRow.appendChild(chip);
    refreshState();
  };

  const removeChip = (chip, tileEl) => {
    if (exerciseLocked) return;
    const idx = selected.findIndex(s => s.tileEl === tileEl);
    if (idx >= 0) selected.splice(idx, 1);
    chip.remove();
    tileEl.classList.remove('wb-used');
    refreshState();
  };

  bank?.querySelectorAll('.wb-tile').forEach(tile => {
    tile.addEventListener('click', () => addChip(tile.dataset.token, tile));
  });

  clearBtn?.addEventListener('click', () => {
    if (exerciseLocked) return;
    selected.splice(0).forEach(s => s.tileEl.classList.remove('wb-used'));
    answerRow.querySelectorAll('.wb-chip').forEach(c => c.remove());
    refreshState();
  });

  checkBtn?.addEventListener('click', () => {
    if (exerciseLocked || selected.length === 0) return;
    const built = selected.map(s => s.token).join(' ');
    const userAnswer = normalizeAnswer(built);
    const correctAnswer = normalizeAnswer(exercise.answer);
    if (userAnswer === correctAnswer) {
      handleAnswer(true, exercise.answer, navigate, params);
    } else {
      handleWrongAttempt(exercise, exercise.answer, navigate, params);
    }
  });
}

function attachPicturePickEvents(exercise, navigate, params) {
  document.getElementById('btn-pp-speak')?.addEventListener('click', () => speak(exercise.wordDe));
  setTimeout(() => speak(exercise.wordDe), 400);

  document.querySelectorAll('.pp-card').forEach(card => {
    card.addEventListener('click', () => {
      if (exerciseLocked) return;
      const selected = card.dataset.value;
      const isCorrect = selected === exercise.correct;
      document.querySelectorAll('.pp-card').forEach(c => {
        c.classList.add('pp-disabled');
        if (c.dataset.value === exercise.correct) c.classList.add('pp-correct');
        if (c.dataset.value === selected && !isCorrect) c.classList.add('pp-wrong');
      });
      handleAnswer(isCorrect, exercise.correct, navigate, params);
    });
  });
}

function attachMultiChoiceEvents(exercise, navigate, params) {
  document.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (exerciseLocked) return;
      const selected = btn.dataset.value;
      const isCorrect = selected === exercise.correct;
      handleAnswer(isCorrect, exercise.correct, navigate, params);
      
      // Highlight correct/wrong
      document.querySelectorAll('.mc-option').forEach(b => {
        b.classList.add('mc-disabled');
        if (b.dataset.value === exercise.correct) b.classList.add('mc-correct');
        if (b.dataset.value === selected && !isCorrect) b.classList.add('mc-wrong');
      });
    });
  });
}

function attachTranslateEvents(exercise, navigate, params) {
  const input = document.getElementById('translate-input');
  const checkBtn = document.getElementById('btn-check-translate');
  
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !exerciseLocked) {
        checkTranslation(exercise, navigate, params);
      }
    });
    input.focus();
  }
  
  checkBtn?.addEventListener('click', () => {
    if (!exerciseLocked) checkTranslation(exercise, navigate, params);
  });
  
  // Speaker button
  document.getElementById('btn-speak-word')?.addEventListener('click', () => {
    const word = exercise.type === 'translate_de_ro' ? exercise.prompt : exercise.answer;
    speak(word);
  });
}

function checkTranslation(exercise, navigate, params) {
  const input = document.getElementById('translate-input');
  if (!input) return;

  const userAnswer = normalizeAnswer(input.value);
  const correctAnswer = normalizeAnswer(exercise.answer);
  const alts = (exercise.alts || []).map(normalizeAnswer);

  const isCorrect = userAnswer === correctAnswer || alts.includes(userAnswer);

  if (isCorrect) {
    input.classList.add('input-success');
    handleAnswer(true, exercise.answer, navigate, params);
  } else {
    input.classList.add('input-error');
    handleWrongAttempt(exercise, exercise.answer, navigate, params);
  }
}

function attachFillBlankEvents(exercise, navigate, params) {
  const input = document.getElementById('fillblank-input');
  const checkBtn = document.getElementById('btn-check-fillblank');
  
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !exerciseLocked) checkFillBlank(exercise, navigate, params);
    });
    input.focus();
  }
  
  checkBtn?.addEventListener('click', () => {
    if (!exerciseLocked) checkFillBlank(exercise, navigate, params);
  });
}

function checkFillBlank(exercise, navigate, params) {
  const input = document.getElementById('fillblank-input');
  if (!input) return;

  const userAnswer = normalizeAnswer(input.value);
  const correctAnswer = normalizeAnswer(exercise.answer);
  const isCorrect = userAnswer === correctAnswer;

  if (isCorrect) {
    input.classList.add('input-success');
    handleAnswer(true, exercise.answer, navigate, params);
  } else {
    input.classList.add('input-error');
    handleWrongAttempt(exercise, exercise.answer, navigate, params);
  }
}

function attachMatchEvents(exercise, navigate, params) {
  let selectedLeft = null;
  let selectedRight = null;
  let matchedPairs = 0;
  const totalPairs = exercise.pairs.length;
  
  document.querySelectorAll('.match-item').forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('match-done')) return;
      
      const side = item.dataset.side;
      const value = item.dataset.value;
      const index = item.dataset.index;
      
      if (side === 'left') {
        document.querySelectorAll('.match-item[data-side="left"]').forEach(i => i.classList.remove('match-selected'));
        item.classList.add('match-selected');
        selectedLeft = { value, index, el: item };
      } else {
        document.querySelectorAll('.match-item[data-side="right"]').forEach(i => i.classList.remove('match-selected'));
        item.classList.add('match-selected');
        selectedRight = { value, index, el: item };
      }
      
      // Check if both sides selected
      if (selectedLeft && selectedRight) {
        const pair = exercise.pairs[selectedLeft.index];
        const isMatch = pair && pair[1] === selectedRight.value;
        
        if (isMatch) {
          selectedLeft.el.classList.add('match-done', 'match-correct-anim');
          selectedRight.el.classList.add('match-done', 'match-correct-anim');
          matchedPairs++;
          playSound('click');
          
          if (matchedPairs === totalPairs) {
            setTimeout(() => handleAnswer(true, '', navigate, params), 500);
          }
        } else {
          const leftEl = selectedLeft.el;
          const rightEl = selectedRight.el;
          leftEl.classList.add('match-wrong-anim');
          rightEl.classList.add('match-wrong-anim');
          playSound('wrong');
          setTimeout(() => {
            leftEl.classList.remove('match-selected', 'match-wrong-anim');
            rightEl.classList.remove('match-selected', 'match-wrong-anim');
          }, 1200);
        }
        
        selectedLeft = null;
        selectedRight = null;
      }
    });
  });
}

function attachListenEvents(exercise, navigate, params) {
  // Play button
  document.getElementById('btn-play-audio')?.addEventListener('click', () => speak(exercise.word));
  document.getElementById('btn-play-slow')?.addEventListener('click', () => {
    speakSlow(exercise.word);
  });
  
  // Auto play on load
  setTimeout(() => speak(exercise.word), 500);
  
  // Check answer
  const input = document.getElementById('listen-input');
  const checkBtn = document.getElementById('btn-check-listen');
  
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !exerciseLocked) checkListenAnswer(exercise, navigate, params);
    });
    input.focus();
  }
  
  checkBtn?.addEventListener('click', () => {
    if (!exerciseLocked) checkListenAnswer(exercise, navigate, params);
  });
}

function checkListenAnswer(exercise, navigate, params) {
  const input = document.getElementById('listen-input');
  if (!input) return;

  const userAnswer = normalizeAnswer(input.value);
  const correctAnswer = normalizeAnswer(exercise.answer);
  const isCorrect = userAnswer === correctAnswer;

  if (isCorrect) {
    input.classList.add('input-success');
    handleAnswer(true, exercise.answer, navigate, params);
  } else {
    input.classList.add('input-error');
    handleWrongAttempt(exercise, exercise.answer, navigate, params);
  }
}

function attachSpeakEvents(exercise, navigate, params) {
  // Play reference pronunciation
  document.getElementById('btn-hear-word')?.addEventListener('click', () => speak(exercise.word));
  
  // Auto play reference
  setTimeout(() => speak(exercise.word), 500);
  
  // Record button
  const recordBtn = document.getElementById('btn-record');
  let isRecording = false;
  
  recordBtn?.addEventListener('click', async () => {
    if (exerciseLocked) return;
    
    if (isRecording) return;
    isRecording = true;
    recordBtn.classList.add('recording');
    recordBtn.innerHTML = '🔴 Ascult...';
    
    try {
      const results = await startListening('de-DE');
      
      recordBtn.classList.remove('recording');
      recordBtn.innerHTML = '🎤 Încearcă din nou';
      isRecording = false;
      
      if (results.length > 0) {
        const expected = exercise.word.toLowerCase().replace(/[?.!,]/g, '').trim();
        const match = results.some(r => {
          const spoken = r.transcript.replace(/[?.!,]/g, '').trim();
          return spoken === expected || spoken.includes(expected) || expected.includes(spoken);
        });
        
        const resultDiv = document.getElementById('speak-result');
        if (resultDiv) {
          resultDiv.innerHTML = `<p>Ai spus: "<strong>${results[0].transcript}</strong>"</p>`;
          resultDiv.classList.remove('hidden');
        }
        
        handleAnswer(match, exercise.word, navigate, params);
      } else {
        const resultDiv = document.getElementById('speak-result');
        if (resultDiv) {
          resultDiv.innerHTML = `<p>Nu am auzit nimic. Încearcă din nou! 🎤</p>`;
          resultDiv.classList.remove('hidden');
        }
      }
    } catch (e) {
      console.error('Speech recognition error:', e);
      recordBtn.classList.remove('recording');
      recordBtn.innerHTML = '🎤 Încearcă din nou';
      isRecording = false;
      
      // If speech recognition not available, provide skip option
      const resultDiv = document.getElementById('speak-result');
      if (resultDiv) {
        resultDiv.innerHTML = `
          <p>Recunoașterea vocală nu este disponibilă în acest browser. 😔</p>
          <button class="btn btn-secondary btn-sm" id="btn-skip-speak">Treci mai departe →</button>
        `;
        resultDiv.classList.remove('hidden');
        document.getElementById('btn-skip-speak')?.addEventListener('click', () => {
          handleAnswer(true, '', navigate, params);
        });
      }
    }
  });
}

// ============================================
// Retry / hint mechanism for text-input exercises
// ============================================

// Normalize input so users on US keyboards don't need umlauts/ß
function normalizeAnswer(s) {
  return s
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss')
    .replace(/[.,!?;:]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildHint(answer, level) {
  if (level >= MAX_ATTEMPTS) return answer;
  if (level <= 1) return '';

  const len = answer.length;
  const firstSpace = answer.indexOf(' ');
  const hasMultipleWords = firstSpace > 0 && firstSpace < len - 1;

  let revealLen;
  if (level === 2) {
    // Reveal first whole word if multi-word, else ~40% of the word
    revealLen = hasMultipleWords ? firstSpace : Math.ceil(len * 0.4);
  } else if (level === 3) {
    // Reveal ~65%
    revealLen = Math.ceil(len * 0.65);
  } else {
    // level 4: reveal almost everything (all but last 1-2 chars)
    revealLen = Math.max(1, len - (len > 6 ? 2 : 1));
  }

  // Always keep at least one hidden character so the hint has tension
  revealLen = Math.min(revealLen, len - 1);
  revealLen = Math.max(0, revealLen);

  let result = '';
  for (let i = 0; i < len; i++) {
    const c = answer[i];
    if (i < revealLen || c === ' ' || c === '-' || c === "'") {
      result += c;
    } else {
      result += '_';
    }
  }
  return result;
}

function updateHeartsDisplay() {
  const container = document.querySelector('.lesson-hearts');
  if (!container) return;
  container.innerHTML = Array.from({ length: 5 }, (_, i) =>
    `<span class="heart-icon ${i < hearts ? 'heart-active' : 'heart-empty'}">${i < hearts ? '❤️' : '🤍'}</span>`
  ).join('');
}

function handleWrongAttempt(exercise, correctAnswer, navigate, params) {
  exerciseLocked = true;
  const isFirstFail = currentAttempt === 0;
  currentAttempt = Math.min(currentAttempt + 1, MAX_ATTEMPTS);

  if (isFirstFail) {
    wrongCount++;
    consecutiveCorrect = 0;
    hearts = loseHeart();
    addMistake({
      exercise,
      lessonId: params.lessonId,
      timestamp: new Date().toISOString(),
    });
    const word = exercise.word || exercise.prompt || exercise.correct;
    if (word) updateWordSRS(word, 1);
    updateHeartsDisplay();
  }

  playSound('wrong');

  if (hearts <= 0) {
    showHeartsGone(navigate, params);
    return;
  }

  showRetryFeedback(exercise, correctAnswer, currentAttempt, navigate, params);
}

function showRetryFeedback(exercise, correctAnswer, attempt, navigate, params) {
  const feedbackArea = document.getElementById('feedback-area');
  if (!feedbackArea) return;

  const isFinal = attempt >= MAX_ATTEMPTS;
  const hint = buildHint(correctAnswer, attempt);
  const mascotState = isFinal ? 'thinking' : 'encouraging';

  let bodyHTML = '';
  if (isFinal) {
    bodyHTML = `
      <p class="feedback-answer">Răspunsul corect: <strong>${correctAnswer}</strong></p>
      <p class="feedback-text">Scrie-l ca să continui.</p>
    `;
  } else if (attempt >= 2) {
    bodyHTML = `
      <p class="feedback-text">Indiciu: <span class="hint-letters">${hint}</span></p>
    `;
  } else {
    bodyHTML = `<p class="feedback-text">Aproape! Mai încearcă o dată.</p>`;
  }

  feedbackArea.innerHTML = `
    <div class="feedback-bar feedback-bar-wrong feedback-wrong">
      <div class="feedback-content">
        <div class="feedback-mascot">${renderMascot(mascotState, 'sm')}</div>
        <div class="feedback-info">
          <p class="feedback-title">Încercare ${attempt}/${MAX_ATTEMPTS}</p>
          ${bodyHTML}
        </div>
      </div>
      <button class="btn btn-danger btn-full" id="btn-try-again">ÎNCEARCĂ DIN NOU</button>
    </div>
  `;

  feedbackArea.classList.remove('hidden');

  document.getElementById('btn-try-again')?.addEventListener('click', () => {
    feedbackArea.classList.add('hidden');
    exerciseLocked = false;

    const input = document.querySelector('#translate-input, #fillblank-input, #listen-input');
    if (input) {
      input.value = '';
      input.classList.remove('input-error');
      input.focus();
    }

    if (attempt >= 2) {
      showPersistentHint(hint, attempt, isFinal ? correctAnswer : null);
    }
  });
}

function showPersistentHint(hint, attempt, fullAnswer) {
  const exerciseArea = document.getElementById('exercise-area');
  if (!exerciseArea) return;

  let hintBox = document.getElementById('hint-box');
  if (!hintBox) {
    hintBox = document.createElement('div');
    hintBox.id = 'hint-box';
    hintBox.className = 'hint-box animate-fadeInDown';
    exerciseArea.insertBefore(hintBox, exerciseArea.firstChild);
  }

  if (fullAnswer) {
    hintBox.innerHTML = `
      <span class="hint-label">💡 Răspuns:</span>
      <span class="hint-text"><strong>${fullAnswer}</strong></span>
    `;
  } else {
    hintBox.innerHTML = `
      <span class="hint-label">💡 Indiciu (${attempt}/${MAX_ATTEMPTS}):</span>
      <span class="hint-text">${hint}</span>
    `;
  }
}

function handleAnswer(isCorrect, correctAnswer, navigate, params) {
  exerciseLocked = true;
  const exercise = lessonData.exercises[currentExerciseIndex];

  if (isCorrect) {
    correctCount++;
    if (currentAttempt === 0) consecutiveCorrect++;
    else consecutiveCorrect = 0;
    recordCorrect();

    // XP scales down with retries: 0→10, 1→8, 2→6, 3→4, 4→2, 5→1
    const baseXP = currentAttempt === 0 ? 10 : Math.max(1, 10 - currentAttempt * 2);
    const streakBonus = currentAttempt === 0 && consecutiveCorrect >= 3 ? 5 : 0;
    const xpGained = baseXP + streakBonus;
    addXP(xpGained);
    
    // Track word learned
    if (exercise.word) addWordLearned(exercise.word);
    if (exercise.prompt) addWordLearned(exercise.prompt);
    if (exercise.correct) addWordLearned(exercise.correct);
    
    // Update SRS
    const word = exercise.word || exercise.prompt || exercise.correct;
    if (word) updateWordSRS(word, 4); // quality 4 = correct with some effort
    
    // Sound & visual feedback
    playSound('correct');
    
    // Variable reward intensity
    const roll = Math.random();
    if (roll < 0.1 && consecutiveCorrect >= 3) {
      launchConfetti('high');
    } else if (roll < 0.3) {
      launchStars(3);
    }
    
    showFeedback(true, getCorrectMessage(), correctAnswer, navigate, params);
    setTimeout(() => showXPToast(xpGained), 500);
    
  } else {
    wrongCount++;
    consecutiveCorrect = 0;
    hearts = loseHeart();
    
    // Track mistake
    addMistake({
      exercise: exercise,
      lessonId: params.lessonId,
      timestamp: new Date().toISOString(),
    });
    
    // Update SRS
    const word = exercise.word || exercise.prompt || exercise.correct;
    if (word) updateWordSRS(word, 1); // quality 1 = wrong but recognized after
    
    playSound('wrong');
    
    showFeedback(false, getRandomMessage(wrongMessages), correctAnswer, navigate, params);
  }
}

function showFeedback(isCorrect, message, correctAnswer, navigate, params) {
  const feedbackArea = document.getElementById('feedback-area');
  if (!feedbackArea) return;
  
  const mascotState = getMascotReaction(isCorrect, consecutiveCorrect);
  
  feedbackArea.innerHTML = `
    <div class="feedback-bar ${isCorrect ? 'feedback-bar-correct' : 'feedback-bar-wrong'} feedback-${isCorrect ? 'correct' : 'wrong'}">
      <div class="feedback-content">
        <div class="feedback-mascot">
          ${renderMascot(mascotState, 'sm')}
        </div>
        <div class="feedback-info">
          <p class="feedback-title">${isCorrect ? '✅ Corect!' : '❌ Nu chiar...'}</p>
          <p class="feedback-text">${message}</p>
          ${!isCorrect && correctAnswer ? `<p class="feedback-answer">Răspunsul corect: <strong>${correctAnswer}</strong></p>` : ''}
        </div>
      </div>
      <button class="btn ${isCorrect ? 'btn-primary' : 'btn-danger'} btn-full" id="btn-continue">
        CONTINUĂ
      </button>
    </div>
  `;
  
  feedbackArea.classList.remove('hidden');
  
  document.getElementById('btn-continue')?.addEventListener('click', () => {
    feedbackArea.classList.add('hidden');
    
    // Check if hearts are gone
    if (hearts <= 0) {
      showHeartsGone(navigate, params);
      return;
    }
    
    // Next exercise or finish
    currentExerciseIndex++;
    currentAttempt = 0;
    if (currentExerciseIndex >= lessonData.exercises.length) {
      finishLesson(navigate, params);
    } else {
      exerciseLocked = false;
      const app = document.getElementById('app');
      app.innerHTML = renderLessonUI(navigate);
      attachLessonEvents(navigate, params);
    }
  });
}

function showHeartsGone(navigate, params) {
  const msg = getRandomMessage(heartsLostMessages);
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="hearts-gone-screen">
      <div class="hearts-gone-content animate-scaleIn">
        ${renderMascot('encouraging', 'xl', msg)}
        <div class="hearts-gone-actions" style="margin-top: 32px;">
          <button class="btn btn-primary btn-full btn-lg" id="btn-retry-lesson">
            🔄 Încearcă din nou
          </button>
          <button class="btn btn-secondary btn-full" id="btn-go-home" style="margin-top: 12px;">
            🏠 Acasă
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('btn-retry-lesson')?.addEventListener('click', () => {
    app.innerHTML = renderLesson(navigate, params);
    attachLessonEvents(navigate, params);
  });
  
  document.getElementById('btn-go-home')?.addEventListener('click', () => navigate('home'));
}

function finishLesson(navigate, params) {
  const totalExercises = lessonData.exercises.length;
  const score = Math.round((correctCount / totalExercises) * 100);
  const sessionMinutes = Math.round((Date.now() - sessionStartTime) / 60000);
  
  const result = completeLesson(params.lessonId, score, totalExercises);
  
  // Update daily time
  updateDailyTime(Math.max(1, sessionMinutes));
  
  playSound('complete');
  launchConfetti(score === 100 ? 'high' : 'normal');
  
  // Show badges
  setTimeout(() => {
    result.newBadges.forEach((badge, i) => {
      setTimeout(() => showBadgeToast(badge), i * 1500);
    });
    if (result.xpResult.leveledUp) {
      setTimeout(() => showLevelUpToast(result.xpResult.level, getLevelName(result.xpResult.level)), 800);
    }
  }, 1000);
  
  navigate('results', { 
    lessonId: params.lessonId, 
    score, 
    stars: result.stars,
    correctCount,
    totalExercises,
    xpGained: result.bonusXP,
    newBadges: result.newBadges,
  });
}
