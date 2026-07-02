// Verifică butonul de restrângere „Lecții de bază": implicit ascuns, toggle,
// persistă preferința, iar lecțiile clasice rămân accesibile când e deschis.
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

console.log('Smoke restrângere lecții:');

const map = await page.$('#classic-map');
if (!map) bad('blocul de lecții clasice lipsește');
else {
  const collapsedByDefault = await map.evaluate(el => el.classList.contains('is-collapsed'));
  if (collapsedByDefault) ok('implicit ascuns'); else bad('NU e ascuns implicit');

  // vizibil? (display:none când e restrâns)
  const visible1 = await map.isVisible();
  if (!visible1) ok('lecțiile clasice nu se văd când e restrâns'); else bad('se văd deși e restrâns');

  await page.click('#btn-toggle-classic');
  await page.waitForTimeout(200);
  const visible2 = await map.isVisible();
  if (visible2) ok('apar după apăsarea butonului'); else bad('nu apar după toggle');

  const pref = await page.evaluate(() => localStorage.getItem('ui_classicOpen'));
  if (pref === '1') ok('preferința e persistată (deschis)'); else bad('preferința nu s-a salvat');

  // reîncarcă → rămâne deschis
  await page.reload();
  await page.waitForSelector('.home-screen');
  const stillOpen = await page.$eval('#classic-map', el => !el.classList.contains('is-collapsed'));
  if (stillOpen) ok('rămâne deschis după reload'); else bad('nu s-a păstrat starea la reload');

  // click pe prima lecție funcționează
  const firstLesson = await page.$('#classic-map .lesson-node[id^="lesson-"]');
  if (firstLesson) {
    await firstLesson.click();
    await page.waitForTimeout(400);
    const inLesson = await page.$('.lesson-screen');
    if (inLesson) ok('lecția clasică pornește din blocul deschis'); else bad('lecția nu pornește');
  } else bad('nicio lecție clasică deblocată în bloc');
}

await browser.close();
if (failures) { console.error(`\n${failures} verificări eșuate`); process.exit(1); }
console.log('\nToate verificările au trecut.');
