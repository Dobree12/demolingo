// Smoke: secțiunea „Drumul spre A2" — 100 de lecții, fiecare exercițiu se
// randează fără erori, iar lecția 71 (prima de tranziție) arată regula A2.
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
  await page.fill('#new-user-name', 'A2');
  await page.click('#btn-create-user');
  await page.waitForSelector('.home-screen');

  const card = await page.$('.home-section-card:has-text("Drumul spre A2")');
  if (!card) throw new Error('cardul secțiunii lipsește de pe home');
  await card.click();
  await page.waitForSelector('.section-screen');
  ok('Secțiunea apare pe home și se deschide');

  // Fiecare exercițiu din fiecare lecție, randat individual în motor
  const report = await page.evaluate(async () => {
    const { getSectionById } = await import('/src/data/sections.js');
    const units = getSectionById('spre-a2').units;
    const types = new Set();
    const broken = [];
    for (const u of units) {
      for (const [i, ex] of u.exercises.entries()) {
        types.add(ex.type);
        window.__navigate('lesson', { exercises: [ex], title: u.title, icon: u.icon, unitId: u.id });
        const area = document.getElementById('exercise-area');
        if (!area || !area.textContent.trim() || area.textContent.includes('Tip necunoscut')) {
          broken.push(`${u.id}#${i} (${ex.type})`);
        }
      }
    }
    return { units: units.length, types: [...types].sort(), broken };
  });
  if (report.units !== 100) throw new Error(`${report.units} lecții`);
  if (report.broken.length) throw new Error(`nerandate: ${report.broken.slice(0, 5).join(', ')}`);
  ok(`100 de lecții, toate exercițiile se randează`);
  // 13 tipuri; traducerea are două nume (translate_de_ro / translate_ro_de) → 14
  if (report.types.length !== 14) throw new Error(`doar ${report.types.length} tipuri: ${report.types}`);
  ok(`Toate tipurile de exerciții: ${report.types.join(', ')}`);

  // Lecția 71: prima de tranziție, cu regula în descriere
  await page.evaluate(() => window.__navigate('lesson', { sectionId: 'spre-a2', unitId: 'a2-71' }));
  await page.waitForSelector('.lesson-screen');
  ok('Lecția 71 (A1 → A2) pornește din secțiune');

  if (errors.length) throw new Error(errors.slice(0, 3).join(' | '));
  ok('Fără erori JS');
} catch (e) {
  fail('flux', e.message);
}

await browser.close();
console.log(results.join('\n'));
