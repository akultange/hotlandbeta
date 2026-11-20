// The link-preview pictures (public/og/hotland-ru.jpg, hotland-en.jpg; 1200 x 630): the club's door, with one line
// under the name. They are photographs of the site's own 18+ door (AgeGate.astro), so they follow its look.
//
//   1. npm run dev                      (the site at http://127.0.0.1:4321, or pass BASE=...)
//   2. node tools/og/og.mjs             (needs Playwright and a Chrome: npm i -D playwright, or point
//                                        PLAYWRIGHT_FROM at a folder that has it; CHROME at the browser)
// It writes PNGs next to the JPEGs' place; turn them into JPEGs (quality 88 to 90) with any image tool.
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require('playwright');
const base = process.env.BASE || 'http://127.0.0.1:4321';
const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public/og');
const lines = { ru: 'Премиальный мужской клуб в Москве', en: 'A premium gentlemen’s club in Moscow' };

const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
for (const lang of ['ru', 'en']) {
  // (15px wider than the picture: where scrollbars take room, the door stops short of the window's right edge)
  const ctx = await browser.newContext({ viewport: { width: 1230, height: 630 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${base}/${lang}/`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: `
    .gate { right: auto !important; width: 1200px; }
    .gate-in { --cy: 286px; --ny: 286px; --nh: 58px; } /* (the club's logo is 15 times as wide as it is tall: 58px is 888px of the 1200) */
    .gate-edge { --line-h: 384px !important; }
    .gate-face { --wy: 45%; }
    .gate-foot, .gate-copy > :not(#gate-text) { display: none !important; }
    .gate-in .gate-copy { top: 392px !important; }
    #gate-text { max-width: none !important; font: 500 21px/1 var(--sans) !important; letter-spacing: .3em; text-transform: uppercase; color: #c3c4c8 !important; }
  ` });
  await page.evaluate((line) => { document.getElementById('gate-text').textContent = line; }, lines[lang]);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(out, `hotland-${lang}.png`), clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await ctx.close();
}
await browser.close();
console.log('written to', out);
