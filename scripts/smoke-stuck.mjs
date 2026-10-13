// Smoke: exercițiile nu se mai blochează.
//  - text cu ghilimele / caractere HTML în variante (bug-ul din lecția 283, „leg")
//  - „Treci peste" după 3 încercări greșite la match și sortCategories
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

const NEXT = { type: 'multiChoice', question: 'Ce înseamnă "Hund"?', correct: 'câine', options: ['câine', 'pisică', 'pește', 'cal'] };
const run = (exercises) => page.evaluate((exs) => window.__navigate('lesson', {
  exercises: exs, title: 'Test', icon: '🧪', unitId: 'stuck-test',
}), exercises);

// Rezolvă un match potrivind după data-index (aceeași pereche pe ambele coloane)
async function solveMatch() {
  const n = await page.$$eval('.match-item[data-side="left"]', els => els.length);
  for (let i = 0; i < n; i++) {
    await page.click(`.match-item[data-side="left"][data-index="${i}"]`);
    await page.click(`.match-item[data-side="right"][data-index="${i}"]`);
  }
}

try {
  await page.goto(BASE);
  await page.click('#btn-show-new-user');
  await page.fill('#new-user-name', 'Blocaj');
  await page.click('#btn-create-user');
  await page.waitForSelector('.home-screen');

  // 1. Exercițiul real din lecția 283 (lp-276, al doilea exercițiu)
  await page.evaluate(async () => {
    const { getLessonById } = await import('/src/data/lessons.js');
    const l = getLessonById('lp-276');
    window.__navigate('lesson', { exercises: [l.exercises[1]], title: l.titleDe, icon: l.icon, unitId: 'lp-276-ex2' });
  });
  await page.waitForSelector('.match-item');
  await solveMatch();
  await page.waitForSelector('.feedback-bar-correct');
  ok('Lecția 283, exercițiul 2 (cu „leg") se rezolvă');

  // 2. Ghilimele drepte + caractere HTML în variante → tot se potrivesc
  await run([{ type: 'match', pairs: [
    ['leg', 'pune! („leg dich hin" = întinde-te)'], ['der Hund', 'câine <mare> & bun'],
    ['die Katze', "pisica 'mea'"], ['das Haus', 'casă'],
  ] }, NEXT]);
  await page.waitForSelector('.match-item');
  await solveMatch();
  await page.waitForSelector('.feedback-bar-correct');
  const shown = await page.textContent('.exercise-match');
  if (!shown.includes('„leg dich hin" = întinde-te') || !shown.includes('<mare>')) throw new Error('textul nu e afișat întreg');
  ok('Match cu " < > & \' în text → se potrivește și se afișează corect');

  await run([{ type: 'multiChoice', question: 'Ce înseamnă "leg"?', correct: 'pune! („leg dich hin" = întinde-te)',
    options: ['pune! („leg dich hin" = întinde-te)', 'ia!', 'du-te!', 'vino!'] }, NEXT]);
  await page.click('.mc-option >> nth=0');
  await page.waitForSelector('.feedback-bar');
  const correctMarked = await page.$eval('.mc-option.mc-correct', el => el.dataset.value);
  if (correctMarked !== 'pune! („leg dich hin" = întinde-te)') throw new Error(`valoare citită: ${correctMarked}`);
  ok('Alegere multiplă cu ghilimele → valoarea completă e recunoscută');

  // 3. Match: 3 potriviri greșite → „Treci peste" → exercițiul următor
  await run([{ type: 'match', pairs: [['eins', 'unu'], ['zwei', 'doi'], ['drei', 'trei'], ['vier', 'patru']] }, NEXT]);
  await page.waitForSelector('.match-item');
  for (let k = 0; k < 3; k++) {
    await page.click('.match-item[data-side="left"][data-index="0"]');
    await page.click('.match-item[data-side="right"][data-index="1"]');
    await page.waitForTimeout(1300); // animația de greșeală
  }
  await page.waitForSelector('#btn-stuck-skip');
  await page.click('#btn-stuck-skip');
  await page.waitForSelector('.mc-option');
  ok('Match: după 3 greșeli apare „Treci peste" și merge mai departe');

  // 4. sortCategories: 3 plasări greșite → „Treci peste"
  await run([{ type: 'sortCategories',
    categories: [{ id: 'animale', label: '🐾 Animale' }, { id: 'culori', label: '🎨 Culori' }],
    items: [{ de: 'der Hund', cat: 'animale' }, { de: 'die Katze', cat: 'animale' }, { de: 'rot', cat: 'culori' }, { de: 'blau', cat: 'culori' }],
  }, NEXT]);
  await page.waitForSelector('.sc-item');
  // după o plasare greșită cuvântul rămâne selectat (un nou clic l-ar deselecta)
  await page.click('.sc-item[data-cat="animale"] >> nth=0');
  for (let k = 0; k < 3; k++) {
    await page.click('.sc-bucket[data-cat="culori"]');
    await page.waitForTimeout(700);
  }
  await page.waitForSelector('#btn-stuck-skip');
  await page.click('#btn-stuck-skip');
  await page.waitForSelector('.mc-option');
  const mistakes = await page.evaluate(() => {
    const reg = JSON.parse(localStorage.getItem('invatam_germana_users'));
    return JSON.parse(localStorage.getItem(`invatam_germana::${reg.activeUserId}`)).mistakes.map(m => m.exercise.type);
  });
  if (!mistakes.includes('sortCategories') || !mistakes.includes('match')) throw new Error(`greșeli: ${mistakes}`);
  ok('Sortare: după 3 greșeli „Treci peste"; exercițiile sărite ajung la Practică');

  if (errors.length) throw new Error(errors.slice(0, 3).join(' | '));
  ok('Fără erori JS');
} catch (e) {
  fail('flux', e.message);
}

await browser.close();
console.log(results.join('\n'));
