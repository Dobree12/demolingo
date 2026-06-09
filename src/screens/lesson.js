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

let currentExerciseIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let consecutiveCorrect = 0;
let lessonData = null;
let hearts = 5;
let exerciseLocked = false;
let sessionStartTime = null;

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
  }
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
  
  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswer = exercise.answer.toLowerCase();
  const alts = (exercise.alts || []).map(a => a.toLowerCase());
  
  const isCorrect = userAnswer === correctAnswer || alts.includes(userAnswer);
  
  input.classList.add(isCorrect ? 'input-success' : 'input-error');
  handleAnswer(isCorrect, exercise.answer, navigate, params);
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
  
  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswer = exercise.answer.toLowerCase();
  const isCorrect = userAnswer === correctAnswer;
  
  input.classList.add(isCorrect ? 'input-success' : 'input-error');
  handleAnswer(isCorrect, exercise.answer, navigate, params);
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
          selectedLeft.el.classList.add('match-wrong-anim');
          selectedRight.el.classList.add('match-wrong-anim');
          setTimeout(() => {
            selectedLeft.el.classList.remove('match-selected', 'match-wrong-anim');
            selectedRight.el.classList.remove('match-selected', 'match-wrong-anim');
          }, 600);
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
  
  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswer = exercise.answer.toLowerCase();
  // Be lenient — remove punctuation and extra spaces
  const normalize = s => s.replace(/[?.!,]/g, '').replace(/\s+/g, ' ').trim();
  const isCorrect = normalize(userAnswer) === normalize(correctAnswer);
  
  input.classList.add(isCorrect ? 'input-success' : 'input-error');
  handleAnswer(isCorrect, exercise.answer, navigate, params);
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

function handleAnswer(isCorrect, correctAnswer, navigate, params) {
  exerciseLocked = true;
  const exercise = lessonData.exercises[currentExerciseIndex];
  
  if (isCorrect) {
    correctCount++;
    consecutiveCorrect++;
    recordCorrect();
    
    // Add XP (variable — psychology technique #2)
    const baseXP = 10;
    const streakBonus = consecutiveCorrect >= 3 ? 5 : 0;
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
