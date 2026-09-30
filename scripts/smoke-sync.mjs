// Smoke: sincronizare cu api/progress.php + pagina de urmărire.
// Rulează pe build-ul de producție servit de PHP, cu structura de pe server:
//   <home>/site/                  ← conținutul lui dist/
//   <home>/demolingo-config.php   ← cheile (write/read)
//   php -S 127.0.0.1:8090 -t <home>/site
// Variabile: SYNC_BASE (implicit http://127.0.0.1:8090/), WRITE_KEY, READ_KEY.
import { chromium } from 'playwright';

const BASE = process.env.SYNC_BASE || 'http://127.0.0.1:8090/';
const API = new URL('api/progress.php', BASE).href;
const WRITE_KEY = process.env.WRITE_KEY || 'scriere-test-1234567890';
const READ_KEY = process.env.READ_KEY || 'citire-test-1234567890';

const results = [];
const ok = (name) => results.push(`  ✅ ${name}`);
const fail = (name, err) => { results.push(`  ❌ ${name}: ${err}`); process.exitCode = 1; };

const browser = await chromium.launch();
const errors = [];
async function newPage() {
  const ctx = await browser.newContext({ serviceWorkers: 'block' });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(e.message));
  page.on('dialog', d => d.accept());
  return page;
}
async function createProfile(page, name) {
  await page.goto(BASE);
  await page.click('#btn-show-new-user');
  await page.fill('#new-user-name', name);
  await page.click('#btn-create-user');
  await page.waitForSelector('.home-screen');
}
const serverState = async (page, key = READ_KEY) => {
  const res = await page.request.get(API, { headers: { 'X-Key': key } });
  return { status: res.status(), body: res.status() === 200 ? await res.json() : null };
};

try {
  // --- Cheia de citire pusă în aplicație → refuzată la activare ---
  const wrongPc = await newPage();
  await createProfile(wrongPc, 'PC-ul meu');
  await wrongPc.evaluate(() => window.__navigate('settings'));
  await wrongPc.fill('#sync-key-input', READ_KEY);
  await wrongPc.click('#btn-sync-enable');
  await wrongPc.waitForSelector('.toast-error');
  if (await wrongPc.$('#btn-sync-now')) throw new Error('cheia de citire a activat sincronizarea');
  if (await wrongPc.evaluate(() => localStorage.getItem('invatam_germana_sync'))) throw new Error('setări salvate cu cheia de citire');
  ok('Cheia de citire în aplicație → refuzată cu mesaj clar');

  // --- Calculatorul cursantului (progres real: stare > 64 KB, limita keepalive) ---
  const learner = await newPage();
  await createProfile(learner, 'Paula');
  await learner.evaluate(() => {
    const reg = JSON.parse(localStorage.getItem('invatam_germana_users'));
    const key = `invatam_germana::${reg.activeUserId}`;
    const s = JSON.parse(localStorage.getItem(key));
    const past = new Date(Date.now() - 86400000).toISOString();
    Object.assign(s, { xp: 150, level: 2, totalAttempts: 20, totalCorrect: 17, totalWrong: 3, totalLessonsCompleted: 1,
      lessonsCompleted: { 'a2-1': { completed: true, stars: 3, bestScore: 100, completedAt: new Date().toISOString() } },
      exerciseHistory: Array.from({ length: 400 }, (_, i) => ({ word: `Wort${i}`, interval: 6, repetitions: 2, easeFactor: 2.5, nextReview: past, lastReview: past })),
      mistakes: Array.from({ length: 50 }, (_, i) => ({ exercise: { type: 'sentenceBuild', promptRo: `Propoziția numărul ${i} care e destul de lungă. `.repeat(30), answer: `Das ist der Satz Nummer ${i} und er ist lang genug`, bank: ['Das', 'ist', 'der', 'Satz', 'Nummer', 'und', 'er', 'lang', 'genug', 'heute', 'mit'] }, lessonId: `lp-${i}`, timestamp: past })),
    });
    localStorage.setItem(key, JSON.stringify(s));
  });
  await learner.reload();
  await learner.waitForSelector('.home-screen');
  // mărimea DUPĂ boot (migrarea SRS aruncă intrările care nu sunt în dicționar)
  const size = await learner.evaluate(() => {
    const reg = JSON.parse(localStorage.getItem('invatam_germana_users'));
    return localStorage.getItem(`invatam_germana::${reg.activeUserId}`).length;
  });
  if (size < 70000) throw new Error(`starea de test are doar ${size} octeți`);
  await learner.reload();
  await learner.evaluate(() => window.__navigate('settings'));
  await learner.fill('#sync-key-input', WRITE_KEY);
  await learner.click('#btn-sync-enable');
  await learner.waitForSelector('#btn-sync-now');
  let srv = await serverState(learner);
  if (srv.status !== 200 || srv.body.state.xp !== 150 || srv.body.profile.name !== 'Paula') {
    throw new Error(`după activare: ${srv.status} ${JSON.stringify(srv.body)?.slice(0, 120)}`);
  }
  ok(`Activare → progresul existent (${Math.round(size / 1024)} KB) urcă pe server (nimic pierdut)`);

  // O lecție terminată se trimite automat, cu jurnalul zilei
  await learner.evaluate(() => window.__navigate('lesson', {
    exercises: [{ type: 'multiChoice', question: 'Ce înseamnă "Hund"?', correct: 'câine', options: ['câine', 'pisică', 'pește', 'cal'] }],
    title: 'Test', icon: '🧪', unitId: 'sync-test',
  }));
  await learner.click('.mc-option[data-value="câine"]');
  await learner.click('#btn-continue');
  await learner.waitForSelector('.results-screen');
  await learner.waitForTimeout(800);
  srv = await serverState(learner);
  const today = Object.values(srv.body.state.activityLog || {}).pop();
  if (srv.body.state.totalAttempts !== 21 || !today?.answers || !today?.lessons) {
    throw new Error(`după lecție: attempts=${srv.body.state.totalAttempts} log=${JSON.stringify(srv.body.state.activityLog)}`);
  }
  ok('Lecția terminată se trimite automat, cu jurnalul zilnic');

  // --- Chei ---
  if ((await serverState(learner, 'gresita-1234567890')).status !== 403) throw new Error('cheie greșită acceptată la citire');
  const postRead = await learner.request.post(API, { data: { key: READ_KEY, state: { totalAttempts: 999 } } });
  if (postRead.status() !== 403) throw new Error(`cheia de citire poate scrie (${postRead.status()})`);
  ok('Cheie greșită → 403; cheia de citire nu poate scrie');

  // --- Protecția la regres ---
  const regress = await learner.request.post(API, { data: { key: WRITE_KEY, state: { totalAttempts: 1, xp: 0 } } });
  if (regress.status() !== 409) throw new Error(`regres acceptat (${regress.status()})`);
  ok('Stare cu mai puțin progres → refuzată (409)');

  // --- Browser nou (ex. golit): activarea oferă restaurarea de pe server ---
  const fresh = await newPage();
  await createProfile(fresh, 'Calculator nou');
  await fresh.evaluate(() => window.__navigate('settings'));
  await fresh.fill('#sync-key-input', WRITE_KEY);
  await fresh.click('#btn-sync-enable');
  await fresh.waitForSelector('#btn-sync-now');
  const localXp = await fresh.evaluate(() => {
    const reg = JSON.parse(localStorage.getItem('invatam_germana_users'));
    return JSON.parse(localStorage.getItem(`invatam_germana::${reg.activeUserId}`)).xp;
  });
  if (localXp !== srv.body.state.xp) throw new Error(`xp local ${localXp} ≠ server ${srv.body.state.xp}`);
  ok('Browser nou + activare → progresul e adus de pe server');

  // --- Pagina de urmărire (calculatorul tău) ---
  const viewer = await newPage();
  await viewer.goto(new URL('progres.html', BASE).href);
  await viewer.fill('#key-input', READ_KEY);
  await viewer.click('.dash-btn[type="submit"]');
  await viewer.waitForSelector('.dash-tile');
  const text = await viewer.textContent('.dash');
  const bars = await viewer.$$('.dash-bar-col');
  if (!text.includes('Paula') || bars.length !== 30) throw new Error(`pagina: bars=${bars.length}`);
  if (!text.includes('Drumul spre A2')) throw new Error('progresul pe secțiuni lipsește');
  await viewer.reload();
  await viewer.waitForSelector('.dash-tile'); // cheia e ținută minte
  ok('progres.html: cheie de citire → statistici, grafic 30 zile, secțiuni; cheia e reținută');

  if (errors.length) throw new Error(errors.slice(0, 3).join(' | '));
  ok('Fără erori JS');
} catch (e) {
  fail('flux', e.message);
}

await browser.close();
console.log(results.join('\n'));
