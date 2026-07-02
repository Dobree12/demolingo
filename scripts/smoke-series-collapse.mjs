// Verifică dropdown-ul de restrângere pe serii în ecranul de secțiune
// (secțiunea „Despre mine"): toggle, ascunde unitățile, persistă la reload.
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
await page.click('#btn-show-new-user');
await page.fill('#new-user-name', 'Test');
await page.click('#btn-create-user');
await page.waitForSelector('.home-screen', { timeout: 5000 });

console.log('Smoke restrângere serii:');

await page.click('.home-section-card[data-section-id="despre-mine"]');
await page.waitForSelector('.series-toggle', { timeout: 5000 });

const toggle = await page.$('.series-toggle[data-series="0"]');
const units = await page.$('.series-units[data-series="0"]');
if (!toggle || !units) { bad('seria 1 lipsește'); }
else {
  const visibleBefore = await units.isVisible();
  if (visibleBefore) ok('seria 1 vizibilă implicit'); else bad('seria 1 nu e vizibilă implicit');

  await toggle.click();
  await page.waitForTimeout(150);
  const visibleAfter = await units.isVisible();
  if (!visibleAfter) ok('unitățile se ascund după toggle'); else bad('nu se ascund');

  const pref = await page.evaluate(() => localStorage.getItem('ui_series_despre-mine_0'));
  if (pref === '1') ok('preferința de restrângere persistată'); else bad('preferința nu s-a salvat');

  // Navighează în SPA (home → înapoi în secțiune) pentru a testa persistența
  await page.evaluate(() => window.__navigate('home'));
  await page.waitForSelector('.home-screen', { timeout: 5000 });
  await page.click('.home-section-card[data-section-id="despre-mine"]');
  await page.waitForSelector('.series-toggle', { timeout: 5000 });
  const stillCollapsed = await page.$eval('.series-units[data-series="0"]', el => el.classList.contains('is-collapsed'));
  if (stillCollapsed) ok('rămâne restrânsă după renavigare'); else bad('nu s-a păstrat starea');

  // re-expandează și pornește o unitate
  await page.click('.series-toggle[data-series="0"]');
  await page.waitForTimeout(150);
  const node = await page.$('.series-units[data-series="0"] .lesson-node[data-unit-id]');
  if (node) {
    await node.click();
    await page.waitForTimeout(400);
    const inLesson = await page.$('.lesson-screen');
    if (inLesson) ok('unitatea pornește după re-expandare'); else bad('unitatea nu pornește');
  } else bad('nicio unitate deblocată în serie');
}

await browser.close();
if (failures) { console.error(`\n${failures} verificări eșuate`); process.exit(1); }
console.log('\nToate verificările au trecut.');
