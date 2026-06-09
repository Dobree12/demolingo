// ============================================
// Audio Engine — Text-to-Speech + Speech Recognition
// ============================================

let speechSynthReady = false;
let voices = [];

// --- Text-to-Speech ---
function loadVoices() {
  voices = window.speechSynthesis?.getVoices() || [];
  speechSynthReady = voices.length > 0;
}

// Voices load async in some browsers
if (window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function getGermanVoice() {
  if (!voices.length) loadVoices();
  // Try to find a German voice (de-DE preferred)
  return voices.find(v => v.lang === 'de-DE') 
    || voices.find(v => v.lang.startsWith('de'))
    || voices.find(v => v.lang === 'de')
    || null;
}

export function speak(text, lang = 'de-DE') {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      resolve();
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85; // Slightly slower for learners
    utterance.pitch = 1;
    
    const germanVoice = getGermanVoice();
    if (germanVoice) {
      utterance.voice = germanVoice;
    }
    
    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      console.warn('Speech error:', e);
      resolve(); // Don't reject, just continue
    };
    
    window.speechSynthesis.speak(utterance);
  });
}

export function speakSlow(text, lang = 'de-DE') {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return; }
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.6; // Much slower
    utterance.pitch = 1;
    
    const germanVoice = getGermanVoice();
    if (germanVoice) utterance.voice = germanVoice;
    
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    
    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeech() {
  window.speechSynthesis?.cancel();
}

// --- Speech Recognition ---
let recognition = null;

export function isSpeechRecognitionSupported() {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function startListening(lang = 'de-DE') {
  return new Promise((resolve, reject) => {
    if (!isSpeechRecognitionSupported()) {
      reject(new Error('Speech recognition not supported'));
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognition.continuous = false;
    
    recognition.onresult = (event) => {
      const results = [];
      for (let i = 0; i < event.results[0].length; i++) {
        results.push({
          transcript: event.results[0][i].transcript.toLowerCase().trim(),
          confidence: event.results[0][i].confidence,
        });
      }
      resolve(results);
    };
    
    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        resolve([]);
      } else {
        reject(new Error(`Speech recognition error: ${event.error}`));
      }
    };
    
    recognition.onend = () => {
      // If no result was returned
    };
    
    recognition.start();
  });
}

export function stopListening() {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
}

// --- Utility: Play a sound effect ---
export function playSound(type) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  switch (type) {
    case 'correct':
      oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.4);
      break;
      
    case 'wrong':
      oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.3);
      break;
      
    case 'complete':
      [523.25, 587.33, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.12 + 0.3);
        osc.start(audioCtx.currentTime + i * 0.12);
        osc.stop(audioCtx.currentTime + i * 0.12 + 0.3);
      });
      break;
      
    case 'click':
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.05);
      break;
  }
}
