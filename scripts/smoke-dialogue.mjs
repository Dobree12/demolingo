// Test focalizat pe exercițiul de dialog (ps-1, primul exercițiu)
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:5173';
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));

try {
  await page.goto(BASE);
  await page.waitForSelector('#btn-show-new-user, .home-screen', { timeout: 5000 });
  if (await page.$('#btn-show-new-user')) {
    await page.click('#btn-show-new-user');
    await page.fill('#new-user-name', 'Dlg');
    await page.click('#btn-create-user');
    await page.waitForSelector('.home-screen', { timeout: 5000 });
  }

  await page.click('.home-section-card[data-section-id="propozitii-scurte"]');
  await page.waitForSelector('.lesson-node[data-unit-id="ps-1"]', { timeout: 5000 });
  await page.click('.lesson-node[data-unit-id="ps-1"]');
  await page.waitForSelector('.exercise-dialogue', { timeout: 5000 });
  console.log('✅ Dialogul se randează');

  // bulele se dezvăluie secvențial (TTS lipsește headless → speak resolve imediat)
  await page.waitForSelector('.dlg-line.dlg-shown', { timeout: 8000 });
  await page.waitForSelector('#dlg-interact.dlg-shown', { timeout: 8000 });
  console.log('✅ Bulele se animă și zona de interacțiune apare');

  // construim răspunsul corect: Mir geht es gut
  for (const token of ['Mir', 'geht', 'es', 'gut']) {
    await page.click(`#dlg-bank .wb-tile[data-token="${token}"]`);
  }
  await page.click('#btn-dlg-check');
  await page.waitForSelector('#btn-continue', { timeout: 5000 });
  const blank = await page.textContent('.dlg-filled .dlg-bubble-text');
  if (!blank.includes('Mir geht es gut')) throw new Error('bula nu s-a completat');
  console.log('✅ Word-bank: răspuns corect completează bula');

  // următorul exercițiu: wordBank clasic — îl greșim ca să testăm retry pe dialog-flow
  await page.click('#btn-continue');
  await page.waitForSelector('.exercise-word-bank', { timeout: 5000 });
  console.log('✅ Trecerea la exercițiul următor funcționează');

} catch (e) {
  console.log('❌ ' + e.message);
  process.exitCode = 1;
}
if (errors.length) {
  console.log('⚠️ Erori browser:'); errors.forEach(e => console.log('  ' + e));
  process.exitCode = 1;
}
await browser.close();
