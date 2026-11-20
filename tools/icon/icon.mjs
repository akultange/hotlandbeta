// The touch icon (public/apple-touch-icon.png, 180 x 180): the favicon's drawing (public/favicon.svg, the club's sign
// in red light on black), set a little smaller in its square, as a home-screen icon wants, and rasterised by Chrome.
//
//   node tools/icon/icon.mjs      (needs Playwright and a Chrome: npm i -D playwright, or point PLAYWRIGHT_FROM at
//                                  a folder that has it; CHROME at the browser)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require('playwright');
const pub = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public');
const svg = fs.readFileSync(path.join(pub, 'favicon.svg'), 'utf8');
// the drawing without its own black square, 82% of its size around the middle of a 64-unit square
const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<rect width="64" height="64"[^>]*\/>/, '');
const page = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="180" height="180">
  <rect width="64" height="64" fill="#0d0e0f"/><g transform="translate(32 32) scale(.82) translate(-32 -32)">${inner}</g></svg>`;
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const p = await (await browser.newContext({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 })).newPage();
await p.setContent(`<body style="margin:0;background:#0d0e0f">${page}</body>`);
await p.screenshot({ path: path.join(pub, 'apple-touch-icon.png'), clip: { x: 0, y: 0, width: 180, height: 180 } });
await browser.close();
console.log('written', path.join(pub, 'apple-touch-icon.png'));
