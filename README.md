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

- **Code:** this repository, `akultange/hotlandbeta`, is Luka's and Gio's working copy, copied from `gilavi/hotland` (private) on 19 November 2026. It is public: nothing secret goes in it.
- **Our copy online:** every push to `main` publishes it on GitHub Pages, https://akultange.github.io/hotlandbeta/ru/ (Settings → Pages → Source: GitHub Actions). The workflow, `.github/workflows/pages.yml`, runs `npm run build:github`: the preview build, after which `tools/build/github-pages.mjs` moves the site's addresses under the `/hotlandbeta/` folder and leaves out the Cloudflare and Timeweb files. Pages has no server, so the forms there send nothing. A run takes a few minutes; the Actions tab shows each one.
- **The club's versions** are the Cloudflare preview (built from `gilavi/hotland`) and the Timeweb copy, both below. They change only when we take the work there: a Timeweb upload built from here, and a push to `gilavi/hotland` for the Cloudflare link.
- **Site:** Cloudflare (Gio's account): https://hotland.club-site.workers.dev. The pages are static files in `dist/`. A small server function (`worker/index.ts`) handles only `/api/booking`, `/api/careers` and `/api/event`. `npm run deploy` builds the preview with `noindex` and publishes both. The first time on a machine, run `npx wrangler login`.
- **Cloudflare deploys on push** to `gilavi/hotland`: it builds every push to that repository's `main` and publishes it to the preview within a minute or two. It runs `npm run build:preview`, then `npx wrangler deploy`, from the Worker's Settings → Builds, connected to `gilavi/hotland`. Build logs are on the Worker's Deployments tab. Other branches and pull requests get their own preview link, which shows up with the build. `npm run deploy` still works for a deploy by hand.
- **Pushing.** Here: akultange, and Gio once he is added under Settings → Collaborators. A pull request is optional, for when you want a second look first.
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

`public/og/hotland-ru.jpg` and `hotland-en.jpg` (1200×630) are what WhatsApp, Telegram and Instagram show when a link is shared. They are photographs of the site's own 18+ door with one line under the name; `tools/og/og.mjs` takes them again (its header says how). Every page also gets prefilled WhatsApp links: event and occasion pages add their name to the message.
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

`/[lang]/` home · `about` · `program` (+ `program/[event]`) · `artists` · `menu` · `membership` (+ `birthday`, `bachelor`, `corporate`, `hire`; it lived at `/vip/` until 2026-11-20, `public/_redirects` forwards the old address) · `booking` (+ `thanks`) · `contacts` · `careers` · `privacy` · `cookies` · `terms` · `goodbye` · `404`

## Design — v8 "Concrete and burgundy"

After the club's brand board (November 2026): a dark concrete wall, the name in steel, one line of red light in the seam. A premium gentlemen's club, not a cabaret; membership, not VIP.

- **Surfaces:** black concrete (the page), graphite concrete with the formwork's joints and tie holes (`.soot`), and one light surface, a brushed-metal plate (`.velvet` / `.plate`). The stone is two small maps laid over a surface's own colour with `background-blend-mode: overlay` (`public/img/concrete/`, made by `tools/concrete.py`; tokens `--stone`, `--stone-size` in `global.css`).
- **Colour:** deep burgundy (`--bordeaux` #65081f, with a lit and a deep step either side) is the brand's colour, and it is only ever a surface: buttons, the top card, fields of light on concrete. On black it is too dark to read as text, so nothing is written in it. Bright red (`--light` #ff2b3d) is only ever light: the seam, a thin line under the current page, a focus ring. A title's second half is concrete grey (`em` in a title), small marks are steel. No gradients across letters; steel is a smooth fall of light (`--metal`, `#g-metal`, `#g-steel`).
- **Type:** one face, Geologica, served by the site (`tools/fonts/build.py`): `Geologica Sharp` for titles, names and numerals (its sharpness axis at 100: the joints of the letters cut to a point), `Geologica` for text. No italics. Wide-set capitals for the name and for controls.
- **The name:** HOTLAND as outlines (`src/data/wordmark.ts`, written by `tools/fonts/wordmark.py`): heavy for the hero's window, fine and set wide for the wall, the header, the cards (`Name.astro`), with the blade of red light between the T and the L. The club's final logo replaces these when it arrives.
- **The 18+ door** (`AgeGate.astro`, `styles/gate.css`): two slabs of concrete with the name across them and the light in the joint. It stands on the home header's own layout (`styles/first-screen.css`: the name, the question and the two buttons are where the header's name, motto and buttons will be), so opening it does not cut to another picture. "Yes": the slabs slide apart in one movement; on an upright phone's home page the two lights come to rest on the edges of the header's gap; everywhere else they leave with the slabs; then the header's plates and the phone's dock come in.
  - The opening is worked out once, at the tap, and handed to the browser as animations of transform and opacity only (Web Animations, no GSAP), so it runs off the main thread and stays even while the page starts up behind it. The comment above `open()` in `AgeGate.astro` has the timeline. The page's own set-up (`scripts/motion.ts`) is done behind the shut door and only let go at "Yes".
  - The light's hand-over: a copy of the header's own line is put into the door's group of lights and added to the door's line (`mix-blend-mode: plus-lighter`), so the cross-fade is exact, with no doubling and no dip; the door's name ends exactly on the header's name (its place is measured at the tap, not worked out).
  - Arriving: the line is struck and spreads along the joint, its light reaches the name (the letters come up in brightness where they stand, from the line outward), one band of light crosses the steel, then the question. Every piece is ONE animation of ONE property on its own element (the flicker on the core, the growth on the edge, the breathing on the group): only then does the browser play it off the main thread, which the page's own start-up holds for hundreds of milliseconds in these same seconds. While the door is shut the page behind it does not run, and is drawn only once the arrival is over.
  - The door asks on every page except the three documents (`gate={false}` on the layout, `[legal].astro`): its own «Конфиденциальность» link has to lead to a page that can be read before answering. After the door's own language link the door simply stands (`html.door-still`); no header plates are pictured over it during a page change.
- **Home hero:** the film behind frosted glass. Wide screens: HOTLAND cut clear out of the frost (no line of light across it: the club took it out on 2026-11-20, the phone keeps its gap). Under the name: one line that says what the place is and two buttons; the motto is not in the header. A phone held upright: the line grown into a gap, the film sharp inside it, the name on one line across it.
- **Controls:** square-cut plates (2px corners): bordeaux lacquer for the main action, the wall edged in steel for the second; the header's pieces are smoked glass. Nothing round, no shine sweeping a button, no card that tilts under the pointer; shadows are black.
- **"This one", said two ways:** where you are (the header, tabs that change what the page shows) is the thin line of red light under the word (`--nav-on`); what you chose (a tile, a pill in a form) is the steel plate with ink text (`--steel-pill`). Never a burgundy "selected" state.
- **Sizes:** one sub-title size (`--sub`), section titles `.t-l`; capitals 12px/.14em, buttons 13px; lines of light 1.5px.
- **Big titles in polished steel** (2026-11-20, after the club's references): `.t-xxl`, `.t-xl`, `.t-l` are heavy, tight capitals in Inter Tight (`styles/fonts-title.css`, served by the site; SIL OFL 1.1) with a smooth steel gradient clipped to the letters (`--steel-type`; a title's second half is the same metal in shadow, `--steel-dim`). Capitals are by style only, so the words stay as written for screen readers and search. Everything else (text, controls, sub-titles, prices) stays Geologica. Poster dates take the same steel.
- **Steel corners** (`Corners.astro`, `#hl-corner` in the layout): a bevelled, tapering bracket at the top left and bottom right of a panel that matters: the membership field, the footer's card.
- **Black liquid metal** (`public/img/metal/flow.webp`, `flow-dark.webp`): the sheet behind the membership cards and on the footer's card. Drawn from nothing by `tools/metal/flow.py` (a folded surface lit as polished metal; `python3 tools/metal/flow.py out.png <seed> <steepness>`, then saved as WebP at 1920px), so a new sheet costs nothing.
- **No icons:** the 3D icons (stiletto, cherries, lips, key…) are retired (`Icon3d.astro` explains); the blade of light stands in on the thank-you page and the 404.
- **No overline text:** no small caps labels above headings, no breadcrumbs, no rules over titles. A section starts with its heading.
- **Photography:** shown big, in its own colour, cut hard (no feathered masks that turn a picture into a soft blob), with a hairline rim where pictures stand side by side; a full-bleed band may still fade into the page at its foot. Text never sits on a photo.
- **Artists' stage** (`ModelsStage.astro`, `styles/spotlight.css`): crisp portraits in a row, the middle one lit, the rest dimmed by brightness only (no blur, no spotlight cone); the name under the light carries the red line.
- **Favicon:** the line of red light on black (`public/favicon.svg`, `apple-touch-icon.png`).
- **Building blocks:** `Header`, `Name`, `PageTitle`, `PosterCard`, `MemberCards`, `Photo`, `AgeGate`.

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
