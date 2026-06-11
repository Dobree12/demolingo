// ============================================
// Lesson Screen — Exercise flow controller
// ============================================
// Motorul unic de exerciții: rulează atât lecțiile clasice, cât și
// unitățile din secțiuni și quiz-urile generate (vezi data/content.js).

import { resolveUnit } from '../data/content.js';
import { addXP, addWordLearned, addMistake, recordCorrect, recordAttempt, completeLesson, getLevelName } from '../engine/progress.js';
import { updateWordSRS } from '../engine/srs.js';
import { speak, speakSlow, playSound, startListening } from '../engine/audio.js';
import { getCorrectMessage, getRandomMessage, wrongMessages, skipMessages, midLessonEncouragement } from '../data/messages.js';
import { renderMascot, getMascotReaction } from '../components/mascot.js';
import { launchConfetti, launchStars } from '../components/confetti.js';
import { showToast, showXPToast, showBadgeToast, showLevelUpToast } from '../components/toast.js';
import { normalizeAnswer } from '../utils/normalize.js';
import { renderMultiChoice } from '../exercises/multiChoice.js';
import { renderTranslate } from '../exercises/translate.js';
import { renderMatch } from '../exercises/match.js';
import { renderFillBlank } from '../exercises/fillBlank.js';
import { renderListen } from '../exercises/listen.js';
import { renderSpeak } from '../exercises/speak.js';
import { renderWordBank } from '../exercises/wordBank.js';
import { renderPicturePick } from '../exercises/picturePick.js';
import { renderDialogue } from '../exercises/dialogue.js';

let currentExerciseIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let consecutiveCorrect = 0;
let lessonData = null;
let exerciseLocked = false;
let currentAttempt = 0;        // încercări greșite la exercițiul curent (0 = niciuna)
let currentMaxAttempts = 3;    // dinamic, după complexitatea răspunsului

export function renderLesson(navigate, params) {
  const lesson = resolveUnit(params);
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

  return renderLessonUI(navigate);
}

function renderLessonUI(navigate) {
  const lesson = lessonData;
  const exercise = lesson.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex) / lesson.exercises.length) * 100;

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
    case 'dialogue': exerciseHTML = renderDialogue(exercise); break;
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
  const lesson = lessonData || resolveUnit(params);
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
    case 'dialogue':
      attachDialogueEvents(exercise, navigate, params);
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
// Dialogue exercise — conversație animată cu replică de completat
// ============================================

function attachDialogueEvents(exercise, navigate, params) {
  const lines = exercise.lines;
  const blankIndex = lines.findIndex(l => l.blank);
  const blankLine = lines[blankIndex];
  const bubbles = Array.from(document.querySelectorAll('.dlg-line'));
  const interact = document.getElementById('dlg-interact');

  const pause = (ms) => new Promise(r => setTimeout(r, ms));
  const stillHere = () => bubbles[0]?.isConnected;

  // Dezvăluie bulele în secvență, cu TTS pe fiecare replică germană
  const revealUpTo = async (from, to) => {
    for (let i = from; i <= to && i < lines.length; i++) {
      if (!stillHere()) return;
      bubbles[i]?.classList.add('dlg-shown');
      if (!lines[i].blank && lines[i].de) {
        await speak(lines[i].de);
        await pause(300);
      } else {
        await pause(400);
      }
    }
  };

  (async () => {
    await pause(400);
    await revealUpTo(0, blankIndex);
    if (stillHere()) interact?.classList.add('dlg-shown');
  })();

  const completeBlank = (answerText) => {
    const bubble = bubbles[blankIndex];
    if (bubble) {
      const textEl = bubble.querySelector('.dlg-bubble-text');
      if (textEl) textEl.textContent = answerText;
      bubble.classList.remove('dlg-blank');
      bubble.classList.add('dlg-filled');
    }
    if (interact) interact.style.display = 'none';
    // Continuă conversația după răspunsul corect
    (async () => {
      await speak(answerText);
      await pause(300);
      await revealUpTo(blankIndex + 1, lines.length - 1);
    })();
  };

  if (exercise.mode === 'multiChoice') {
    document.querySelectorAll('.dlg-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (exerciseLocked) return;
        const selected = btn.dataset.value;
        const isCorrect = normalizeAnswer(selected) === normalizeAnswer(blankLine.answer);
        document.querySelectorAll('.dlg-option').forEach(b => {
          b.classList.add('mc-disabled');
          if (normalizeAnswer(b.dataset.value) === normalizeAnswer(blankLine.answer)) b.classList.add('mc-correct');
          if (b === btn && !isCorrect) b.classList.add('mc-wrong');
        });
        if (isCorrect) completeBlank(blankLine.answer);
        handleAnswer(isCorrect, blankLine.answer, navigate, params);
      });
    });
    return;
  }

  // mode: wordBank — construiește replica din piese
  const answerRow = document.getElementById('dlg-answer');
  const checkBtn = document.getElementById('btn-dlg-check');
  const clearBtn = document.getElementById('btn-dlg-clear');
  const placeholder = answerRow?.querySelector('.wb-placeholder');
  const selected = [];

  const refreshState = () => {
    if (placeholder) placeholder.style.display = selected.length === 0 ? '' : 'none';
    if (checkBtn) checkBtn.disabled = selected.length === 0;
  };

  const removeChip = (chip, tileEl) => {
    if (exerciseLocked) return;
    const idx = selected.findIndex(s => s.tileEl === tileEl);
    if (idx >= 0) selected.splice(idx, 1);
    chip.remove();
    tileEl.classList.remove('wb-used');
    refreshState();
  };

  document.querySelectorAll('#dlg-bank .wb-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      if (exerciseLocked) return;
      selected.push({ token: tile.dataset.token, tileEl: tile });
      tile.classList.add('wb-used');
      const chip = document.createElement('button');
      chip.className = 'wb-chip animate-fadeInUp';
      chip.textContent = tile.dataset.token;
      chip.addEventListener('click', () => removeChip(chip, tile));
      answerRow?.appendChild(chip);
      refreshState();
    });
  });

  clearBtn?.addEventListener('click', () => {
    if (exerciseLocked) return;
    selected.splice(0).forEach(s => s.tileEl.classList.remove('wb-used'));
    answerRow?.querySelectorAll('.wb-chip').forEach(c => c.remove());
    refreshState();
  });

  checkBtn?.addEventListener('click', () => {
    if (exerciseLocked || selected.length === 0) return;
    const built = selected.map(s => s.token).join(' ');
    if (normalizeAnswer(built) === normalizeAnswer(blankLine.answer)) {
      completeBlank(blankLine.answer);
      handleAnswer(true, blankLine.answer, navigate, params);
    } else {
      handleWrongAttempt(exercise, blankLine.answer, navigate, params);
    }
  });
}

// ============================================
// Retry / hint mechanism
// ============================================

// Numărul de etape de hint depinde de complexitatea răspunsului:
// cuvânt scurt → 3, cuvânt lung → 4, frază scurtă → 5, propoziție lungă → 6.
function computeMaxAttempts(answer) {
  const norm = normalizeAnswer(answer);
  const words = norm.split(' ').filter(Boolean).length;
  if (words === 1) return norm.length <= 6 ? 3 : 4;
  if (words <= 3) return 5;
  return 6;
}

// Hint progresiv: chiar de la prima greșeală se dezvăluie începutul
// (primul cuvânt întreg la fraze), apoi tot mai mult, până la răspunsul
// complet la ultima etapă.
function buildHint(answer, attempt, maxAttempts) {
  if (attempt >= maxAttempts) return answer;

  const len = answer.length;
  const firstSpace = answer.indexOf(' ');
  const multiWord = firstSpace > 0 && firstSpace < len - 1;

  // De la ~35% (prima greșeală) la ~85% (penultima etapă)
  const steps = Math.max(1, maxAttempts - 1);
  const frac = 0.35 + 0.5 * ((attempt - 1) / steps);
  let revealLen = Math.ceil(len * Math.min(0.9, frac));
  if (attempt === 1 && multiWord) revealLen = Math.max(revealLen, firstSpace);

  // Păstrează mereu cel puțin un caracter ascuns înainte de etapa finală
  revealLen = Math.min(revealLen, len - 1);
  revealLen = Math.max(1, revealLen);

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

function handleWrongAttempt(exercise, correctAnswer, navigate, params) {
  exerciseLocked = true;
  recordAttempt();
  const isFirstFail = currentAttempt === 0;

  if (isFirstFail) {
    currentMaxAttempts = computeMaxAttempts(correctAnswer);
    wrongCount++;
    consecutiveCorrect = 0;
    addMistake({
      exercise,
      lessonId: lessonData?.id || params.lessonId,
      timestamp: new Date().toISOString(),
    });
    const word = exercise.word || exercise.prompt || exercise.correct;
    if (word) updateWordSRS(word, 1);
  }

  currentAttempt = Math.min(currentAttempt + 1, currentMaxAttempts + 1);

  playSound('wrong');
  showRetryFeedback(exercise, correctAnswer, currentAttempt, navigate, params);
}

function showRetryFeedback(exercise, correctAnswer, attempt, navigate, params) {
  const feedbackArea = document.getElementById('feedback-area');
  if (!feedbackArea) return;

  const isFinal = attempt >= currentMaxAttempts;
  const hint = buildHint(correctAnswer, attempt, currentMaxAttempts);
  const mascotState = isFinal ? 'thinking' : 'encouraging';
  const shownAttempt = Math.min(attempt, currentMaxAttempts);

  let bodyHTML = '';
  if (isFinal) {
    bodyHTML = `
      <p class="feedback-answer">Răspunsul corect: <strong>${correctAnswer}</strong></p>
      <p class="feedback-text">Scrie-l ca să continui — sau treci peste.</p>
    `;
  } else {
    bodyHTML = `
      <p class="feedback-text">Aproape! Iată un indiciu: <span class="hint-letters">${hint}</span></p>
    `;
  }

  feedbackArea.innerHTML = `
    <div class="feedback-bar feedback-bar-wrong feedback-wrong">
      <div class="feedback-content">
        <div class="feedback-mascot">${renderMascot(mascotState, 'sm')}</div>
        <div class="feedback-info">
          <p class="feedback-title">Încercare ${shownAttempt}/${currentMaxAttempts}</p>
          ${bodyHTML}
        </div>
      </div>
      <button class="btn btn-danger btn-full" id="btn-try-again">ÎNCEARCĂ DIN NOU</button>
      ${isFinal ? `
        <button class="btn btn-secondary btn-full" id="btn-skip-exercise" style="margin-top: var(--space-sm);">
          Treci peste →
        </button>
      ` : ''}
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

    showPersistentHint(hint, shownAttempt, isFinal ? correctAnswer : null);
  });

  document.getElementById('btn-skip-exercise')?.addEventListener('click', () => {
    feedbackArea.classList.add('hidden');
    showToast(getRandomMessage(skipMessages), 'info');
    goToNextExercise(navigate, params);
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
      <span class="hint-label">💡 Indiciu (${attempt}/${currentMaxAttempts}):</span>
      <span class="hint-text">${hint}</span>
    `;
  }
}

function handleAnswer(isCorrect, correctAnswer, navigate, params) {
  exerciseLocked = true;
  recordAttempt();
  const exercise = lessonData.exercises[currentExerciseIndex];

  if (isCorrect) {
    correctCount++;
    if (currentAttempt === 0) consecutiveCorrect++;
    else consecutiveCorrect = 0;
    recordCorrect();

    // XP scales down with retries: 0→10, 1→8, 2→6, 3→4, 4→2, 5+→1
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

    // Track mistake
    addMistake({
      exercise: exercise,
      lessonId: lessonData?.id || params.lessonId,
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
    goToNextExercise(navigate, params);
  });
}

function goToNextExercise(navigate, params) {
  currentExerciseIndex++;
  currentAttempt = 0;
  currentMaxAttempts = 3;
  if (currentExerciseIndex >= lessonData.exercises.length) {
    finishLesson(navigate, params);
  } else {
    exerciseLocked = false;
    const app = document.getElementById('app');
    app.innerHTML = renderLessonUI(navigate);
    attachLessonEvents(navigate, params);
  }
}

function finishLesson(navigate, params) {
  const totalExercises = lessonData.exercises.length;
  const score = Math.round((correctCount / totalExercises) * 100);

  const result = completeLesson(lessonData.id, score, totalExercises);

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
    title: `${lessonData.icon} ${lessonData.title}`,
    lessonParams: params,
    score,
    stars: result.stars,
    correctCount,
    totalExercises,
    xpGained: result.bonusXP,
    newBadges: result.newBadges,
  });
}
