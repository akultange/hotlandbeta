# HOTLAND website — Just between us

Built with [Astro](https://astro.build). Russian (`/ru/`) and English (`/en/`). A static site, with one small server part for the forms.

## Run

```bash
npm install
npm run dev            # http://localhost:4321
npm run build:preview  # the preview, output in dist/ (a build needs the site's address: build:preview, build:timeweb,
                       # or SITE_URL=https://… npm run build:prod; a plain `astro build` without SITE_URL stops)
npm run check          # the type check: the pages and scripts, and the Cloudflare worker
npm run deploy         # by hand: build the preview (not indexed by search engines) and publish it to Cloudflare
```

The build does a little more after Astro (`tools/build/assets.mjs`): it makes smaller copies of the photographs and
3D icons that the pages ask for (`src/data/images.ts`; kept in `node_modules/.cache/hotland-images`, so a second build
is quick), puts each picture's and film's fingerprint in its address (`?v=…`, so a replaced photo is never shown stale
from a visitor's cache), and lists each page's scripts for the browser to fetch early. Nothing to prepare by hand: a
new photo in `public/media/` gets its copies on the next build.

## Code and hosting

- **Code:** private GitHub repository `gilavi/hotland`. Push with the gilavi account.
- **Site:** Cloudflare (Gio's account): https://hotland.club-site.workers.dev. The pages are static files in `dist/`. A small server function (`worker/index.ts`) handles only `/api/booking`, `/api/careers` and `/api/event`. `npm run deploy` builds the preview with `noindex` and publishes both. The first time on a machine, run `npx wrangler login`.
- **Deploys happen on push.** Cloudflare builds every push to `main` and publishes it to the preview within a minute or two. It runs `npm run build:preview`, then `npx wrangler deploy`, from the Worker's Settings → Builds, connected to `gilavi/hotland`. Build logs are on the Worker's Deployments tab. Other branches and pull requests get their own preview link, which shows up with the build. `npm run deploy` still works for a deploy by hand.
- **Pushing.** Everyone with write access (gilavi, akultange) can push straight to `main`. A pull request is optional, for when you want a second look first.
- **Versions side by side.** Where a part has more than one version, the preview shows them all with a small switch, and production shows only the default.
  - The hero has v1, v2 and v3, chosen in `src/components/Hero.astro` (`DEFAULT`).
  - The footer and the contact links are listed in `src/data/variants.ts` (`def`, and `opts` for the versions).
  - Adding `?footer=v5` (or another part's name and version) to the address picks a version.
  - Once a version is chosen, set it as the default. Its rivals' markup can go later, unless the client wants them kept.
  - Settled: the posters lead to the booking form (Luka's), so the night pages are gone. The VIP zones are Luka's keyhole.
  - Settled, others kept: the footer is v4, the calling card (chosen 2026-11-12). v5, Luka's 3D sign and Gio's steel stay in the code and the preview switch in case the client goes back; switching back is the `def` line.

## Hosting in Russia: Timeweb

Cloudflare is slow in Russia without a VPN, so the copy the club looks at lives on Timeweb's regular hosting:
https://cp482107.tw1.ru/ru/ (not indexed by search engines either). Apache and PHP 8.2 there, no Node.
- **Build:** `npm run build:timeweb` (the preview build, with the Timeweb address for links and link previews), then
  zip what's inside `dist/` (the files themselves, not the folder) and in the hosting panel's «Файловый менеджер»
  upload it into the site's `public_html` and extract it there, replacing what's there.
- **What runs there:** `public/.htaccess` (https only, the bare address to `/ru/`, the 404 page, compression, how
  long browsers keep pages, the forms' addresses, security headers) and `public/api/index.php`, which takes the forms
  and the anonymous counts there (see the next section). Upload `.htaccess` as it is (binary mode), so nothing
  rewrites it. `public/.assetsignore` keeps these files off Cloudflare.
- **Private folder:** the forms' outbox, counts and rate limits live in `public_html/api/private/`, which the PHP
  makes itself: the web server refuses that folder, and every file in it is a PHP file that shows nothing even if
  run. (Not next to `public_html`: with «Изолировать сайт» on, Timeweb doesn't let the site read there, and what it
  writes there lands in a copy only the site itself sees.) The settings: `secrets.php` (a copy of
  `public/api/secrets.example.php`, filled in) in `public_html/api/`. `https://<site>/api/health` says where things
  are kept (`"store": "inside"`), whether the settings were found, and whether the Cloudflare worker is collecting.
  No settings in it.
- **What Timeweb decides:** its nginx serves the pictures, fonts, scripts and stylesheets itself, so the `.htaccess`
  cache rules reach only the pages and the PHP. Check after an upload (below); if `/_astro/` and `/fonts/` don't come
  back with a long lifetime, ask Timeweb's support to set one for the site. Every such file has its contents'
  fingerprint in its name or address, so any lifetime is safe.
- **SSL:** the technical address (`*.tw1.ru`) has it already; for the club's own domain, «Домены и SSL», the free
  certificate.
- **Checks after an upload** (in a terminal; `H=https://cp482107.tw1.ru`):
  ```sh
  curl -sI $H/ru/ | grep -iE 'HTTP|cache-control|content-encoding|strict-transport'
  curl -sI $H/fonts/<a font file> | grep -iE 'cache-control|expires|content-type'
  curl -s -o /dev/null -w '%{http_code}\n' $H/api/secrets.php                     # 403 or 404
  curl -s -o /dev/null -w '%{http_code}\n' -X POST -H 'Content-Type: application/json' -d '{}' $H/api/booking   # 400
  ```

## Bookings, call-backs, questions and job applications → Telegram

Every form posts to the site's own server part, which sends each request to the managers' Telegram chat. If sending
fails, everything the visitor typed stays in place with a «send again» button, and WhatsApp with the request already
written. Spam is filtered by a hidden trap field, a minimum fill-in time and a limit per address (5 requests in 10
minutes).

- **On Cloudflare** (the preview) the worker (`worker/index.ts`) posts straight to Telegram.
- **On Timeweb** (Russia), servers can't reach Telegram (blocked since 2026), so `public/api/index.php` writes each
  request to its outbox (`hotland-private/outbox/`), and once a minute the Cloudflare worker, outside Russia,
  collects the outbox, posts each request to the chat and tells Timeweb which ones went. The connection goes from
  outside Russia in, which the blocks don't stop; a request waits at most a minute. Nothing is ever lost: until it
  is posted, it stays in the outbox. The visitor is told it went once the worker has been collecting (it came in the
  last 10 minutes, and nothing waits longer than that); otherwise they get «send again» and WhatsApp. An e-mail copy
  of every request is optional (`MAIL_TO` in `secrets.php`).

One-time setup:
1. In Telegram, message @BotFather, send `/newbot`, and copy the token.
2. Add the bot to the managers' group (or press Start in a chat with it) and send any message.
3. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id` (a group id starts with `-100`).
4. In Cloudflare (Workers & Pages → `hotland` → Settings → Variables and Secrets), add three secrets:
   `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and `RELAY_SECRET` (a long random string, 40+ letters and digits).
   Or from a terminal: `npx wrangler secret put TELEGRAM_BOT_TOKEN` and so on. They are stored in Cloudflare, not in
   the code.
5. On Timeweb, in `hotland-private/secrets.php`, the same `RELAY_SECRET` (and `MAIL_TO`, if wanted).
6. The outbox's address is `OUTBOX_URL` in `wrangler.jsonc` (the Timeweb address now); with the club's own domain,
   change it there.

## Measurement

Every page view and every tap on Book, Call, WhatsApp, Telegram and Directions, plus form sent or failed, is logged anonymously, with no cookies and no personal data. To see them, open Cloudflare, then Workers & Pages, then `hotland`, then Logs, and filter by `t = event`. On Timeweb they are in `hotland-private/logs/`. No third-party script is loaded, on purpose.

## Link previews

`public/og/hotland-ru.jpg` and `hotland-en.jpg` (1200×630) are what WhatsApp, Telegram and Instagram show when a link is shared. `tools/og/og.swift` regenerates them. Every page also gets prefilled WhatsApp links: event and occasion pages add their name to the message.
- Wrangler's automatic setup tries to add the `@astrojs/cloudflare` server adapter. Keep the site static: don't accept that setup.
- Why Cloudflare: its hosting rules cover illegal or harmful content but have no rule against legal adult or suggestive content. GitHub Pages bans "sexually themed or suggestive" content, and Vercel's free plan is non-commercial only.
- For launch: connect the club's own domain in Cloudflare (Workers & Pages, the `hotland` Worker, then Domains), remove `PUBLIC_NOINDEX=1` from the `build:preview` script (or build with `SITE_URL=https://… npm run build:prod`, which is indexable), and set `SITE_URL` to the real domain.

## Where to change things

| What | File |
|---|---|
| Club name, address, phone, messengers, hours, show times, currency | `src/data/site.ts` |
| Buttons, menu labels, form text, 18+ check text (RU/EN) | `src/data/i18n.ts` |
| Events, artists, menu and prices, packages, occasions, FAQ, rules, careers | `src/data/content.ts` |
| Colors, fonts, spacing | `src/styles/global.css` (tokens at the top) |
| Logo (emblem + wordmark) — hand-built SVG approximation, replace with the official vector | `src/components/Logo.astro` |
| Motion (currently not loaded) | `src/scripts/motion.ts` |

## Pages

`/[lang]/` home · `about` · `program` (+ `program/[event]`) · `artists` · `menu` · `vip` (+ `birthday`, `bachelor`, `corporate`, `hire`) · `booking` (+ `thanks`) · `contacts` · `careers` · `privacy` · `cookies` · `terms` · `goodbye` · `404`

## Design — v6 "Black chrome", with a crimson accent

- **Surfaces:** true black (default), charcoal bands (`.soot`, framed by hairlines) and one light surface, a brushed-metal plate (`.velvet` / `.plate`). Components read colours from surface variables in `global.css`.
- **Navigation:** every section is a visible link in the header (logo · sections · RU/EN · Book). On phones the sections become a sideways-scrolling row under the logo, and the burger opens a full menu with contacts.
- **No overline text:** no small caps labels above headings, no breadcrumbs, no rules over titles. A section starts with its heading; `SecIndex` now renders a real heading.
- **Metal:** brushed silver for the masthead, emblem, membership cards, numerals and the 18+ seal (`public/img/metal/brushed.jpg`, `--sheen`, `#g-metal`, the guilloche `rosette.svg`).
- **Crimson accent:** emphasised words in headlines are red chrome (`--red-chrome`); booking buttons are crimson anodised metal; crimson also marks active links, hovers, link arrows, "tonight" dots and the "+" in 18+.
- **Type:** Noto Serif Display, condensed and heavy, in capitals for headlines, with light italics for emphasis. Forum for the HOTLAND wordmark and card names. Golos Text for text.
- **Photography:** shown big. Sources are colour (`public/img/club/`, `public/img/color/`, lingerie studio portraits in `color/artists/`). CSS shows them in black and white, and hovering brings back the real colour. Masks fade the edges so pictures dissolve into the black page instead of sitting in frames; text never sits on a photo. (A crimson cast is available through `--tint`, but is off.)
- **Home hero:** one wide black-and-white film of the girls (`public/video/hero-wide.mp4`, 9 s, cut from Honey Bunny's club video; phones get the vertical `hero-45.mp4`) dissolving into black, with the silver HOTLAND masthead underneath and one row with the tagline, a line of info and the booking button. Pause button and reduced-motion support included.
- **Building blocks:** `Mast`, `Header`, `PageTitle` (giant title; the photo fills the right side and fades into the page), `ArtistCard`, `EventRow`, `MemberCards`, `Photo`.

Media from earlier design rounds is kept in `_unused/` (ignored by git, not published).

## Before launch (TODO)

- [ ] Official HOTLAND logo as SVG (replace the approximation in `Logo.astro`)
- [ ] Replace the videos with HOTLAND's own footage (currently cut from Honey Bunny's site video, with Honey Bunny signage and intimate scenes removed)
- [ ] Real club name, city, address, phone, messenger links, hours, currency (`site.ts`)
- [ ] Real domain: `SITE_URL` in the build scripts (`package.json`) and `OUTBOX_URL` in `wrangler.jsonc`
- [ ] Photos: currently taken from Honey Bunny (hb-club.ru), including the lingerie studio portraits. Confirm every artist shown agrees to appear on HOTLAND, then replace with a HOTLAND shoot (higher resolution too: the studio portraits are only ~520 px wide)
- [ ] Delete `_unused/` once the direction is settled
- [ ] Set the Telegram bot secrets (see "Bookings and job applications → Telegram")
- [ ] Legal text for privacy, cookies and booking terms, written by a lawyer
- [ ] Map embed on the contacts page
- [x] Self-host the fonts (`tools/fonts/build.py`: per face and alphabet, a core file with what the pages use and the rest in a second file)
- [ ] Cookie banner, only if tracking pixels are added
