// Smoke test ad-hoc pentru tipurile noi de exerciții: sentenceBuild (Despre
// mine) + listenChoice/trueFalse/sortCategories (randare directă în motor).
import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/';
let failures = 0;
const ok = (m) => console.log('  ✅ ' + m);
const bad = (m) => { console.log('  ❌ ' + m); failures++; };

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(BASE);
await page.evaluate(() => localStorage.clear());
await page.reload();

// Creează profil (aceiași pași ca smoke-test.mjs)
await page.waitForSelector('#btn-show-new-user', { timeout: 5000 });
await page.click('#btn-show-new-user');
await page.fill('#new-user-name', 'Test');
await page.click('#btn-create-user');
await page.waitForSelector('.home-screen', { timeout: 5000 });

console.log('Smoke tipuri noi:');

// --- sentenceBuild via secțiunea „Despre mine" ---
await page.evaluate(() => window.__navigate('home'));
await page.waitForTimeout(400);
const dm = await page.$('.home-section-card[data-section-id="despre-mine"]');
if (!dm) bad('Secțiunea „Despre mine" lipsește de pe home');
else {
  await dm.click();
  await page.waitForTimeout(300);
  await page.click('.lesson-node[data-unit-id="dm-1"]');
  await page.waitForTimeout(500);
  const sb = await page.$('.exercise-sentence-build');
  if (sb) ok('sentenceBuild se randează'); else bad('sentenceBuild NU se randează');
  // Construiește propoziția corectă: Hallo ich heisse Paula
  const target = ['Hallo', 'ich', 'heisse', 'Paula'];
  for (const t of target) {
    const tile = await page.$(`.sb-tile[data-token="${t}"]`);
    if (tile) await tile.click();
  }
  await page.click('#btn-sb-check');
  await page.waitForTimeout(400);
  const fb = await page.$('#feedback-area .feedback-bar-correct');
  if (fb) ok('sentenceBuild: răspuns corect → feedback pozitiv');
  else bad('sentenceBuild: feedback corect nu a apărut');
}

// --- Randare directă listenChoice / trueFalse / sortCategories ---
const probe = async (label, exercise, expectSelector) => {
  await page.evaluate((ex) => {
    window.__navigate('lesson', { exercises: [ex], title: 'Probe', icon: '🧪', unitId: 'probe' });
  }, exercise);
  await page.waitForTimeout(300);
  const el = await page.$(expectSelector);
  if (el) ok(`${label} se randează`); else bad(`${label} NU se randează (${expectSelector})`);
};

// window.__navigate expus? Dacă nu, folosim hash/route via click. Verificăm.
const hasNav = await page.evaluate(() => typeof window.__navigate === 'function');
if (!hasNav) {
  console.log('  ℹ️  window.__navigate indisponibil — sar probele directe (acoperite de generator sanity-check)');
} else {
  await probe('listenChoice', { type: 'listenChoice', word: 'Hund', correct: 'câine', options: ['câine', 'pisică', 'cal'] }, '.exercise-listen-choice');
  await probe('trueFalse', { type: 'trueFalse', de: 'Hund', ro: 'pisică', correct: 'câine', isTrue: false }, '.exercise-true-false');
  await probe('sortCategories', { type: 'sortCategories', categories: [{ id: 'a', label: '🐾 Animale' }, { id: 'b', label: '🍎 Mâncare' }], items: [{ de: 'Hund', cat: 'a' }, { de: 'Brot', cat: 'b' }] }, '.exercise-sort-categories');
}

await browser.close();
if (failures) { console.error(`\n${failures} verificări eșuate`); process.exit(1); }
console.log('\nToate verificările au trecut.');
