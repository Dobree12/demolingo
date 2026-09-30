// Generează iconițele PNG ale aplicației (PWA + iOS) din public/icon.svg.
// Rulare: node scripts/make-icons.mjs   (necesită playwright instalat)
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const root = process.argv[2] || '.';
const svg = readFileSync(`${root}/public/icon.svg`, 'utf8');
const browser = await chromium.launch();
for (const [size, name] of [[192, 'icon-192.png'], [512, 'icon-512.png'], [180, 'apple-touch-icon.png']]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(`<html><body style="margin:0">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
  await page.screenshot({ path: `${root}/public/${name}`, omitBackground: false });
  await page.close();
}
await browser.close();
console.log('ok');
