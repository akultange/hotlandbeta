// The site's icon, from the club's own artwork: public/favicon.svg (the browser tab) and public/apple-touch-icon.png
// (180 x 180, a phone's home screen). Both are the club's glowing sign (its file "Sign Glow", as data/art.ts holds
// it: aura, contour and white-hot core, every gradient the club's own) on the site's black, seen close: the sign
// is twenty times as tall as it is wide, so whole it is a hair in a square. The icon shows its middle, the needle
// running through the square's whole height and the spur (the L's foot in the logo) a third of the square wide.
//
//   node tools/icon/icon.mjs      (needs Playwright and a Chrome for the PNG: npm i -D playwright, or point
//                                  PLAYWRIGHT_FROM at a folder that has it; CHROME at the browser)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const pub = path.resolve(here, '../../public');
const ts = fs.readFileSync(path.resolve(here, '../../src/data/art.ts'), 'utf8');
const S = JSON.parse(ts.match(/export const signGlow = (\{.*\}) as const;/)[1]);
const art = S.aura + S.sign + S.core;
// only the gradients the sign points to
const used = new Set([...art.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]));
const defs = [...S.defs.matchAll(/<(linearGradient|radialGradient)\b[^>]*?(?:\/>|>[\s\S]*?<\/\1>)/g)].map((m) => m[0]).filter((d) => used.has(/id="([^"]+)"/.exec(d)[1])).join('');
// The drawing in a 64-unit square: the artwork at 0.46 of its size, the point between the needle and the spur's
// tip (76.5, 302.5 in the artwork's units) at the square's middle.
const SCALE = 0.46, AT = [76.5, 302.5], MID = [32, 32.5], GROUND = '#0b0b0c';
const svg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"${size ? ` width="${size}" height="${size}"` : ''}>
  <!-- the club's sign ("Sign Glow"), seen close: written by tools/icon/icon.mjs from src/data/art.ts -->
  <defs>${defs}</defs>
  <rect width="64" height="64" fill="${GROUND}"/>
  <g transform="translate(${(MID[0] - AT[0] * SCALE).toFixed(2)} ${(MID[1] - AT[1] * SCALE).toFixed(2)}) scale(${SCALE})">${art}</g>
</svg>
`;
fs.writeFileSync(path.join(pub, 'favicon.svg'), svg());
console.log('written', path.join(pub, 'favicon.svg'));

const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require('playwright');
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const p = await (await browser.newContext({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 })).newPage();
await p.setContent(`<body style="margin:0;background:${GROUND}">${svg(180)}</body>`);
await p.screenshot({ path: path.join(pub, 'apple-touch-icon.png'), clip: { x: 0, y: 0, width: 180, height: 180 } });
await browser.close();
console.log('written', path.join(pub, 'apple-touch-icon.png'));
