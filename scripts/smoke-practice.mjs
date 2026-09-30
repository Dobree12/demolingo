// Smoke: Hub de Practică (repetiție SRS + repară greșelile), migrarea SRS,
// rutarea cu history (Înapoi / refresh) și butoanele de backup.
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:5173/';
const results = [];
const ok = (name) => results.push(`  ✅ ${name}`);
const fail = (name, err) => { results.push(`  ❌ ${name}: ${err}`); process.exitCode = 1; };

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('dialog', d => d.accept());

const MISTAKE = {
  type: 'multiChoice',
  question: 'Ce înseamnă "Katze"?',
  correct: 'pisică',
  options: ['pisică', 'câine', 'pește', 'pasăre'],
};

try {
  await page.goto(BASE);
  await page.click('#btn-show-new-user');
  await page.fill('#new-user-name', 'Practica');
  await page.click('#btn-create-user');
  await page.waitForSelector('.home-screen');

  // Stare cu chei SRS vechi (amestecate) + o greșeală
  await page.evaluate((mistake) => {
    const reg = JSON.parse(localStorage.getItem('invatam_germana_users'));
    const key = `invatam_germana::${reg.activeUserId}`;
    const s = JSON.parse(localStorage.getItem(key));
    const past = new Date(Date.now() - 86400000).toISOString();
    s.exerciseHistory = [
      { word: 'die Katze', interval: 1, repetitions: 1, easeFactor: 2.5, nextReview: past, lastReview: past },
      { word: 'câine', interval: 1, repetitions: 1, easeFactor: 2.5, nextReview: past, lastReview: past },
      { word: 'Hund', interval: 1, repetitions: 1, easeFactor: 2.5, nextReview: past, lastReview: past },
    ];
    s.mistakes = [{ exercise: mistake, lessonId: 'x', timestamp: past }];
    localStorage.setItem(key, JSON.stringify(s));
  }, MISTAKE);
  await page.reload();
  await page.waitForSelector('.home-screen');

  const words = await page.evaluate(() => {
    const reg = JSON.parse(localStorage.getItem('invatam_germana_users'));
    return JSON.parse(localStorage.getItem(`invatam_germana::${reg.activeUserId}`)).exerciseHistory.map(w => w.word).sort();
  });
  if (words.join(',') !== 'Hund,Katze') throw new Error(`chei SRS: ${words}`);
  ok('Migrare SRS: chei canonice, fără intrări românești');

  await page.evaluate(() => window.__navigate('practice'));
  await page.waitForSelector('#btn-fix-mistakes');
  await page.waitForSelector('#btn-start-review');
  ok('Practică: butoane „Repară greșelile" + „Începe repetiția"');

  // Repară greșelile → răspuns corect din prima → greșeala dispare
  await page.click('#btn-fix-mistakes');
  await page.waitForSelector('.lesson-screen');
  await page.click('.mc-option[data-value="pisică"]');
  await page.click('#btn-continue');
  await page.waitForSelector('.results-screen');
  const left = await page.evaluate(() => {
    const reg = JSON.parse(localStorage.getItem('invatam_germana_users'));
    return JSON.parse(localStorage.getItem(`invatam_germana::${reg.activeUserId}`)).mistakes.length;
  });
  if (left !== 0) throw new Error(`${left} greșeli rămase`);
  ok('Greșeala dispare după răspuns corect din prima');

  // Înapoi de pe rezultate nu repornește lecția
  await page.goBack();
  await page.waitForSelector('.practice-screen');
  ok('Înapoi (history) de pe rezultate → Practică');

  // Repetiție SRS
  await page.click('#btn-start-review');
  await page.waitForSelector('.lesson-screen');
  const title = await page.textContent('.lesson-title-text');
  if (!title.includes('Repetiție')) throw new Error(title);
  ok('Sesiune de repetiție pornește');

  // Refresh păstrează ecranul
  await page.evaluate(() => window.__navigate('dictionary'));
  await page.waitForSelector('.dict-screen');
  await page.reload();
  await page.waitForSelector('.dict-screen', { timeout: 5000 });
  ok('Refresh păstrează ecranul curent');

  // Backup: butoanele există, exportul descarcă un JSON valid
  await page.evaluate(() => window.__navigate('settings'));
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#btn-export-profile'),
  ]);
  const path = await download.path();
  const data = JSON.parse((await import('node:fs')).readFileSync(path, 'utf8'));
  if (data.app !== 'invatam-germana' || data.profile.name !== 'Practica') throw new Error('export invalid');
  ok('Export progres → JSON valid');

  if (errors.length) throw new Error(errors.join(' | '));
  ok('Fără erori JS');
} catch (e) {
  fail('flux', e.message);
}

await browser.close();
console.log(results.join('\n'));
