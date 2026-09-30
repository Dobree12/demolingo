// Smoke: exercițiul de vorbit nu se mai blochează. Recunoașterea vocală e
// simulată (window.__speechMode) ca să acoperim situațiile de pe telefon/PC:
//   'silent-end'  → browserul se oprește doar cu onend (bug-ul raportat)
//   'hang'        → nu răspunde deloc (oprire din buton)
//   'error'       → microfon blocat / indisponibil
//   'ok'          → cuvântul e recunoscut
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:5173/';
const results = [];
const ok = (name) => results.push(`  ✅ ${name}`);
const fail = (name, err) => { results.push(`  ❌ ${name}: ${err}`); process.exitCode = 1; };

const browser = await chromium.launch();
const ctx = await browser.newContext();
await ctx.addInitScript(() => {
  window.__speechMode = 'silent-end';
  class FakeRecognition {
    start() {
      const mode = window.__speechMode;
      if (mode === 'error') { setTimeout(() => this.onerror?.({ error: 'not-allowed' }), 50); return; }
      if (mode === 'silent-end') { setTimeout(() => this.onend?.(), 100); return; }
      if (mode === 'ok') {
        setTimeout(() => {
          const alt = { transcript: window.__speechText || '', confidence: 0.9 };
          this.onresult?.({ results: [Object.assign([alt], { length: 1 })] });
          this.onend?.();
        }, 100);
      }
      // 'hang': nimic până la abort()
    }
    stop() { this.onend?.(); }
    abort() { setTimeout(() => { this.onerror?.({ error: 'aborted' }); this.onend?.(); }, 10); }
  }
  window.SpeechRecognition = FakeRecognition;
  window.webkitSpeechRecognition = FakeRecognition;
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('dialog', d => d.accept());

const SPEAK = { type: 'speak', word: 'der Hund', translation: 'câinele' };
const NEXT = { type: 'multiChoice', question: 'Ce înseamnă "Katze"?', correct: 'pisică', options: ['pisică', 'câine', 'pește', 'cal'] };
const startLesson = () => page.evaluate(([a, b]) => window.__navigate('lesson', {
  exercises: [a, b], title: 'Vorbit', icon: '🗣️', unitId: 'speak-test',
}), [SPEAK, NEXT]);
const label = () => page.textContent('#btn-record');

try {
  await page.goto(BASE);
  await page.click('#btn-show-new-user');
  await page.fill('#new-user-name', 'Microfon');
  await page.click('#btn-create-user');
  await page.waitForSelector('.home-screen');

  // 1. Browserul se oprește fără rezultat → nu rămâne blocat
  await startLesson();
  await page.waitForSelector('#btn-record');
  await page.click('#btn-record');
  await page.waitForSelector('#speak-result:not(.hidden)');
  if ((await label()).includes('Ascult')) throw new Error('butonul a rămas în „Ascult..."');
  await page.click('#btn-record');
  await page.waitForFunction(() => document.getElementById('speak-result')?.textContent.includes('Tot nu te aud'));
  ok('Oprire fără rezultat → butonul revine, se poate reîncerca; sugestie după 2 încercări');

  // „Nu pot vorbi acum" → trece la exercițiul următor, fără greșeală
  const wrongBefore = await page.evaluate(() => {
    const reg = JSON.parse(localStorage.getItem('invatam_germana_users'));
    return JSON.parse(localStorage.getItem(`invatam_germana::${reg.activeUserId}`)).mistakes.length;
  });
  await page.click('#btn-cant-speak');
  await page.waitForSelector('.mc-option');
  const wrongAfter = await page.evaluate(() => {
    const reg = JSON.parse(localStorage.getItem('invatam_germana_users'));
    return JSON.parse(localStorage.getItem(`invatam_germana::${reg.activeUserId}`)).mistakes.length;
  });
  if (wrongAfter !== wrongBefore) throw new Error('sărirea a fost trecută ca greșeală');
  ok('„Nu pot vorbi acum" → exercițiul următor, fără greșeală');

  // 2. Nu răspunde deloc → apăsarea din nou oprește ascultarea
  await page.evaluate(() => { window.__speechMode = 'hang'; });
  await startLesson();
  await page.waitForSelector('#btn-record');
  await page.click('#btn-record');
  if (!(await label()).includes('Ascult')) throw new Error('nu a pornit ascultarea');
  await page.click('#btn-record');
  await page.waitForFunction(() => !document.getElementById('btn-record').textContent.includes('Ascult'));
  ok('Ascultare fără răspuns → oprită din buton');

  // „Nu pot vorbi acum" chiar în timp ce ascultă
  await page.click('#btn-record');
  await page.click('#btn-cant-speak');
  await page.waitForSelector('.mc-option');
  ok('„Nu pot vorbi acum" funcționează și în timp ce ascultă');

  // 3. Microfon blocat → mesaj + „Treci mai departe"
  await page.evaluate(() => { window.__speechMode = 'error'; });
  await startLesson();
  await page.waitForSelector('#btn-record');
  await page.click('#btn-record');
  await page.waitForSelector('#btn-skip-speak');
  await page.click('#btn-skip-speak');
  await page.waitForSelector('.mc-option');
  ok('Microfon blocat → „Treci mai departe" funcționează');

  // 4. Cuvânt recunoscut → răspuns corect
  await page.evaluate(() => { window.__speechMode = 'ok'; window.__speechText = 'der hund'; });
  await startLesson();
  await page.waitForSelector('#btn-record');
  await page.click('#btn-record');
  await page.waitForSelector('.feedback-bar-correct');
  ok('Cuvânt recunoscut → răspuns corect');

  if (errors.length) throw new Error(errors.slice(0, 3).join(' | '));
  ok('Fără erori JS');
} catch (e) {
  fail('flux', e.message);
}

await browser.close();
console.log(results.join('\n'));
