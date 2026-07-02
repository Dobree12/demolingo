// Smoke test pentru fluxurile principale (rulat local cu Playwright, nu intră în build)
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:5173';
const results = [];
const ok = (name) => results.push(`  ✅ ${name}`);
const fail = (name, err) => { results.push(`  ❌ ${name}: ${err}`); process.exitCode = 1; };

const browser = await chromium.launch();
const page = await browser.newPage();
const consoleErrors = [];
page.on('pageerror', e => consoleErrors.push(e.message));
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });

try {
  // 1. Boot fără profil → ecranul de profiluri
  await page.goto(BASE);
  await page.waitForSelector('#btn-show-new-user', { timeout: 5000 });
  ok('Boot fără profil → ecranul de profiluri');

  // 2. Creare profil → home
  await page.click('#btn-show-new-user');
  await page.fill('#new-user-name', 'Test');
  await page.click('#btn-create-user');
  await page.waitForSelector('.home-screen', { timeout: 5000 });
  ok('Creare profil → home');

  // 3. Chip-ul de profil există, fără inimi în stats
  const chip = await page.textContent('#btn-switch-user');
  if (!chip.includes('Test')) throw new Error('chip-ul nu arată numele');
  const statsRow = await page.textContent('.home-stats-row');
  if (statsRow.includes('❤️')) throw new Error('inimile încă apar pe home');
  ok('Chip profil + fără inimi pe home');

  // 4. Secțiunile apar pe home
  const sectionCards = await page.$$('.home-section-card');
  if (sectionCards.length !== 4) throw new Error(`${sectionCards.length} secțiuni în loc de 4`);
  ok('4 secțiuni pe home');

  // 5. Secțiune → unitate → exercițiu picturePick
  await page.click('.home-section-card[data-section-id="cuvinte-uzuale"]');
  await page.waitForSelector('.lesson-node[data-unit-id="cu-1"]', { timeout: 5000 });
  await page.click('.lesson-node[data-unit-id="cu-1"]');
  await page.waitForSelector('.pp-card', { timeout: 5000 });
  ok('Unitate de secțiune pornește în motorul de lecție');

  // 6. Răspuns corect la picturePick
  await page.click('.pp-card[data-value="Hallo"]');
  await page.waitForSelector('#btn-continue', { timeout: 5000 });
  ok('picturePick: răspuns + feedback');
  // ieșire din lecție
  await page.click('#btn-continue');
  page.once('dialog', d => d.accept());
  await page.click('#btn-close-lesson');
  await page.waitForSelector('.home-screen', { timeout: 5000 });

  // 7. Galeria tematică
  await page.click('.home-section-card[data-section-id="imagini-cuvinte"]');
  await page.waitForSelector('.theme-card', { timeout: 5000 });
  await page.click('.theme-card[data-theme-id="bauturi"]');
  await page.waitForSelector('.tg-card', { timeout: 5000 });
  const tgCount = await page.$$eval('.tg-card', els => els.length);
  if (tgCount !== 8) throw new Error(`${tgCount} carduri în loc de 8`);
  ok('Galeria tematică (8 băuturi)');

  // 8. Quiz generat din temă
  await page.click('#btn-theme-quiz');
  await page.waitForSelector('.pp-card', { timeout: 5000 });
  ok('Quiz generat din temă pornește');
  page.once('dialog', d => d.accept());
  await page.click('#btn-close-lesson');
  await page.waitForSelector('.home-screen', { timeout: 5000 });

  // 9. Hint la PRIMA greșeală + skip la final (lecție clasică, translate)
  // Lecțiile de bază sunt restrânse implicit — deschidem blocul întâi.
  await page.click('#btn-toggle-classic');
  await page.waitForSelector('#classic-map .lesson-node[id="lesson-salutari"]', { state: 'visible', timeout: 5000 });
  await page.click('#lesson-salutari');
  await page.waitForSelector('.exercise-area', { timeout: 5000 });
  // sari peste exerciții până găsim un input text (multiChoice-urile le răspundem greșit nu putem — răspundem corect nu știm; folosim unitatea ps-1? simplu: căutăm direct)
  // Lecția salutari ex1 e multiChoice — alegem orice opțiune și continuăm până apare un input
  for (let i = 0; i < 6; i++) {
    const input = await page.$('#translate-input, #fillblank-input, #listen-input');
    if (input) break;
    const opt = await page.$('.mc-option, .pp-card');
    if (opt) {
      await opt.click();
      await page.waitForSelector('#btn-continue', { timeout: 5000 });
      await page.click('#btn-continue');
      await page.waitForTimeout(300);
      continue;
    }
    // match / altele: ieșim din buclă
    break;
  }
  const input = await page.$('#translate-input');
  if (input) {
    await input.fill('xyz');
    await page.click('#btn-check-translate');
    await page.waitForSelector('#btn-try-again', { timeout: 5000 });
    const fb = await page.textContent('#feedback-area');
    if (!fb.includes('indiciu') && !fb.includes('Indiciu') && !fb.includes('_')) {
      throw new Error('niciun indiciu la prima greșeală');
    }
    ok('Indiciu la prima greșeală');

    // repetăm greșeala până apare „Treci peste"
    let skipFound = false;
    for (let i = 0; i < 8; i++) {
      await page.click('#btn-try-again');
      await page.fill('#translate-input', 'xyz');
      await page.click('#btn-check-translate');
      await page.waitForSelector('#btn-try-again', { timeout: 5000 });
      if (await page.$('#btn-skip-exercise')) { skipFound = true; break; }
    }
    if (!skipFound) throw new Error('„Treci peste" nu a apărut');
    await page.click('#btn-skip-exercise');
    ok('„Treci peste" apare și avansează');
  } else {
    results.push('  ⚠️ nu am ajuns la un exercițiu cu input text — hint-urile netestate automat');
  }

  // 10. Dicționarul
  await page.goto(BASE);
  await page.waitForSelector('#btn-dictionary', { timeout: 5000 });
  await page.click('#btn-dictionary');
  await page.waitForSelector('#dict-search', { timeout: 5000 });
  await page.fill('#dict-search', 'caine');
  await page.waitForTimeout(400);
  const dictText = await page.textContent('#dict-results');
  if (!dictText.includes('Hund')) throw new Error('căutarea „caine" nu găsește Hund');
  ok('Dicționar: căutare RO→DE (caine → Hund)');

  // 11. Profilul arată timpul + răspunsurile
  await page.goto(BASE);
  await page.waitForSelector('#btn-profile', { timeout: 5000 });
  await page.click('#btn-profile');
  await page.waitForTimeout(500);
  const profileText = await page.textContent('body');
  if (!profileText.includes('Timp total') || !profileText.includes('Răspunsuri date')) {
    throw new Error('statisticile noi lipsesc de pe profil');
  }
  ok('Profil: timp total + răspunsuri date');

  // 12. Migrare: stare veche → profil implicit
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('invatam_germana', JSON.stringify({ xp: 555, level: 4, streak: 9 }));
  });
  await page.goto(BASE);
  await page.waitForSelector('.home-screen', { timeout: 5000 });
  const migrated = await page.evaluate(() => {
    const reg = JSON.parse(localStorage.getItem('invatam_germana_users'));
    const state = JSON.parse(localStorage.getItem('invatam_germana::' + reg.activeUserId));
    return { users: reg.users.length, xp: state.xp, backup: !!localStorage.getItem('invatam_germana_backup_v1'), legacy: !!localStorage.getItem('invatam_germana') };
  });
  if (migrated.users !== 1 || migrated.xp !== 555 || !migrated.backup || migrated.legacy) {
    throw new Error(JSON.stringify(migrated));
  }
  ok('Migrare stare veche → profil implicit (XP păstrat, backup creat)');

} catch (e) {
  fail('Test', e.message);
}

console.log('\nSmoke test:');
console.log(results.join('\n'));
if (consoleErrors.length) {
  console.log('\n⚠️ Erori în consola browserului:');
  consoleErrors.slice(0, 10).forEach(e => console.log('  ' + e));
  process.exitCode = 1;
}
await browser.close();
