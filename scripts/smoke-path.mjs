// Smoke: Provocări seriile 26–50 (lp-251 … lp-500) — fiecare exercițiu se
// randează, toate tipurile apar, conversațiile au personajele cerute, iar
// seria 26 arată nivelul în antet când e atinsă.
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

try {
  await page.goto(BASE);
  await page.click('#btn-show-new-user');
  await page.fill('#new-user-name', 'Traseu');
  await page.click('#btn-create-user');
  await page.waitForSelector('.home-screen');

  const report = await page.evaluate(async () => {
    const { getAllLessons } = await import('/src/data/lessons.js');
    const units = getAllLessons().filter(l => l.level);
    const types = new Set();
    const friends = new Set();
    const broken = [];
    for (const u of units) {
      for (const [i, ex] of u.exercises.entries()) {
        types.add(ex.type);
        if (ex.type === 'dialogue') ex.characters.forEach(c => friends.add(c.name));
        window.__navigate('lesson', { exercises: [ex], title: u.titleDe, icon: u.icon, unitId: u.id });
        const area = document.getElementById('exercise-area');
        if (!area || !area.textContent.trim() || area.textContent.includes('Tip necunoscut')) {
          broken.push(`${u.id}#${i} (${ex.type})`);
        }
      }
    }
    return {
      count: units.length, first: units[0].id, last: units.at(-1).id,
      series: [units[0].series, units.at(-1).series],
      types: [...types].sort(), friends: [...friends].sort(), broken,
    };
  });
  if (report.count !== 250 || report.first !== 'lp-251' || report.last !== 'lp-500') {
    throw new Error(`${report.count} lecții ${report.first}…${report.last}`);
  }
  if (report.series.join('-') !== '26-50') throw new Error(`serii ${report.series}`);
  ok('250 de lecții noi (lp-251 … lp-500), seriile 26–50');
  if (report.broken.length) throw new Error(`nerandate: ${report.broken.slice(0, 5).join(', ')}`);
  ok('Toate exercițiile se randează');
  if (report.types.length !== 14) throw new Error(`doar ${report.types.length} tipuri: ${report.types}`);
  ok('Toate tipurile de exerciții apar');
  for (const name of ['Paula', 'Maria', 'Ileana', 'Anuța']) {
    if (!report.friends.includes(name)) throw new Error(`lipsește personajul ${name}`);
  }
  ok(`Conversații cu: ${report.friends.join(', ')}`);

  // Seria 26 deblocată → antetul arată nivelul și tema
  await page.evaluate(async () => {
    const { getAllLessons } = await import('/src/data/lessons.js');
    const reg = JSON.parse(localStorage.getItem('invatam_germana_users'));
    const key = `invatam_germana::${reg.activeUserId}`;
    const s = JSON.parse(localStorage.getItem(key));
    const done = {};
    for (const l of getAllLessons()) {
      if (l.level) break;
      done[l.id] = { completed: true, stars: 3, bestScore: 100, completedAt: new Date().toISOString() };
    }
    s.lessonsCompleted = done;
    localStorage.setItem(key, JSON.stringify(s));
    window.__navigate('home');
  });
  await page.waitForSelector('.series-header-title:has-text("A1+")');
  const header = await page.textContent('.series-header-title:has-text("A1+")');
  if (!header.includes('Seria 26')) throw new Error(`antet: ${header}`);
  ok(`Antet pe Home: „${header.trim()}"`);

  if (errors.length) throw new Error(errors.slice(0, 3).join(' | '));
  ok('Fără erori JS');
} catch (e) {
  fail('flux', e.message);
}

await browser.close();
console.log(results.join('\n'));
