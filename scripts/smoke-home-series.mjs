// Verifică toggle-ul de restrângere pe seriile de provocări de pe home:
// marchează cele 7 lecții clasice ca terminate (direct în stare), apoi seria 1
// devine vizibilă → toggle o ascunde, persistă, iar seriile terminate 100%
// pornesc restrânse implicit.
import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/';
const CLASSIC_IDS = ['salutari', 'prezentari', 'numere', 'familie', 'mancare', 'culori', 'animale'];
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

console.log('Smoke serii home:');

// Marchează clasicele ca terminate în starea profilului activ
await page.evaluate((ids) => {
  const registry = JSON.parse(localStorage.getItem('invatam_germana_users'));
  const key = `invatam_germana::${registry.activeUserId}`;
  const state = JSON.parse(localStorage.getItem(key));
  state.lessonsCompleted = state.lessonsCompleted || {};
  for (const id of ids) {
    state.lessonsCompleted[id] = { completed: true, stars: 3, bestScore: 100 };
  }
  localStorage.setItem(key, JSON.stringify(state));
}, CLASSIC_IDS);
await page.reload();
await page.waitForSelector('.home-screen', { timeout: 5000 });

const toggle = await page.$('.home-screen .series-toggle[data-series="0"]');
const units = await page.$('.home-screen .series-units[data-series="0"]');
if (!toggle || !units) bad('seria 1 de provocări nu apare pe home după terminarea clasicelor');
else {
  const visible1 = await units.isVisible();
  if (visible1) ok('seria 1 (neterminată) e expandată implicit'); else bad('seria 1 nu e vizibilă implicit');

  await toggle.click();
  await page.waitForTimeout(150);
  const visible2 = await units.isVisible();
  if (!visible2) ok('toggle ascunde lecțiile seriei'); else bad('lecțiile nu s-au ascuns');

  const pref = await page.evaluate(() => localStorage.getItem('ui_series_home_0'));
  if (pref === '1') ok('preferința persistată'); else bad('preferința nu s-a salvat');

  await page.reload();
  await page.waitForSelector('.home-screen', { timeout: 5000 });
  const stillCollapsed = await page.$eval('.home-screen .series-units[data-series="0"]', el => el.classList.contains('is-collapsed'));
  if (stillCollapsed) ok('rămâne restrânsă după reload'); else bad('starea nu s-a păstrat la reload');

  // Seriile terminate 100% pornesc restrânse implicit (fără preferință salvată)
  await page.evaluate(() => {
    localStorage.removeItem('ui_series_home_0');
    const registry = JSON.parse(localStorage.getItem('invatam_germana_users'));
    const key = `invatam_germana::${registry.activeUserId}`;
    const state = JSON.parse(localStorage.getItem(key));
    for (let i = 1; i <= 10; i++) {
      state.lessonsCompleted[`lp-${i}`] = { completed: true, stars: 3, bestScore: 100 };
    }
    localStorage.setItem(key, JSON.stringify(state));
  });
  await page.reload();
  await page.waitForSelector('.home-screen', { timeout: 5000 });
  const doneCollapsed = await page.$eval('.home-screen .series-units[data-series="0"]', el => el.classList.contains('is-collapsed'));
  if (doneCollapsed) ok('seria terminată 100% pornește restrânsă implicit'); else bad('seria terminată nu e restrânsă implicit');
  const s2 = await page.$('.home-screen .series-toggle[data-series="1"]');
  if (s2) ok('seria 2 s-a deblocat după terminarea seriei 1'); else bad('seria 2 nu apare');
}

await browser.close();
if (failures) { console.error(`\n${failures} verificări eșuate`); process.exit(1); }
console.log('\nToate verificările au trecut.');
