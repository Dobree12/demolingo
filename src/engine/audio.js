// ============================================
// Audio Engine — Text-to-Speech + Speech Recognition
// ============================================

let voices = [];
let voicesReadyPromise = null;
let cachedGermanVoice = null;

// Quality preference order: prefer named neural/natural voices, then native German voices.
const GERMAN_VOICE_PREFERENCES = [
  // Microsoft Edge / Windows — Neural voices (highest quality)
  /Microsoft.*(Katja|Conrad|Amala|Killian).*Neural/i,
  /Microsoft.*(Katja|Conrad|Amala|Killian)/i,
  // Google Chrome
  /Google Deutsch/i,
  /Google.*German/i,
  // Apple (macOS / iOS)
  /Anna.*(Enhanced|Premium)/i,
  /Helena.*(Enhanced|Premium)/i,
  /Petra.*(Enhanced|Premium)/i,
  /Anna|Helena|Petra|Markus|Yannick/i,
  // Other markers of higher quality
  /(natural|neural|enhanced|premium|wavenet)/i,
];

function loadVoices() {
  voices = window.speechSynthesis?.getVoices() || [];
  return voices;
}

function waitForVoices() {
  if (voicesReadyPromise) return voicesReadyPromise;
  voicesReadyPromise = new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve([]); return; }
    loadVoices();
    if (voices.length > 0) { resolve(voices); return; }

    let attempts = 0;
    const tick = () => {
      loadVoices();
      if (voices.length > 0 || attempts > 20) {
        resolve(voices);
      } else {
        attempts++;
        setTimeout(tick, 150);
      }
    };
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
      if (voices.length > 0) resolve(voices);
    };
    tick();
  });
  return voicesReadyPromise;
}

if (window.speechSynthesis) waitForVoices();

function pickBestGermanVoice() {
  if (cachedGermanVoice) return cachedGermanVoice;
  if (!voices.length) loadVoices();

  const germanVoices = voices.filter(v => /^de(-|_|$)/i.test(v.lang));
  if (germanVoices.length === 0) {
    cachedGermanVoice = voices.find(v => v.lang === 'de') || null;
    return cachedGermanVoice;
  }

  for (const pattern of GERMAN_VOICE_PREFERENCES) {
    const match = germanVoices.find(v => pattern.test(v.name));
    if (match) { cachedGermanVoice = match; return match; }
  }
  // Prefer local voices over remote ones, then de-DE specifically
  const local = germanVoices.find(v => v.localService && v.lang === 'de-DE')
    || germanVoices.find(v => v.localService)
    || germanVoices.find(v => v.lang === 'de-DE')
    || germanVoices[0];
  cachedGermanVoice = local;
  return local;
}

function speakWith(text, { rate, pitch = 1, lang = 'de-DE' }) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return; }
    window.speechSynthesis.cancel();

    const go = () => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      utter.rate = rate;
      utter.pitch = pitch;
      utter.volume = 1;
      const voice = pickBestGermanVoice();
      if (voice) utter.voice = voice;

      utter.onend = () => resolve();
      utter.onerror = (e) => { console.warn('TTS error:', e?.error); resolve(); };

      // Safety: some browsers stall — kick the queue
      window.speechSynthesis.speak(utter);
      setTimeout(() => {
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      }, 100);
    };

    if (voices.length === 0) {
      waitForVoices().then(go);
    } else {
      go();
    }
  });
}

export function speak(text, lang = 'de-DE') {
  // Natural speed for learners: 0.92 sounds close to native but understandable
  return speakWith(text, { rate: 0.92, pitch: 1.02, lang });
}

export function speakSlow(text, lang = 'de-DE') {
  return speakWith(text, { rate: 0.65, pitch: 1, lang });
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
