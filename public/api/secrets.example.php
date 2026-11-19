<?php
// The forms' settings, for regular PHP hosting (Timeweb). Put a copy named secrets.php, filled in, in the folder
// hotland-private NEXT TO public_html (not inside it):
//
//   <the account's folder>/
//     hotland-private/secrets.php   ← here
//     public_html/                  ← the site
//
// If the site can't reach that folder (Timeweb's «Изолировать сайт» keeps a site inside its own folder; GET
// /api/health then says "store": "inside"), put it here instead, as public_html/api/secrets.php: the web server
// refuses it, and run as a page it shows nothing.
//
// Requests reach the managers' Telegram through the Cloudflare worker, which collects them once a minute (servers in
// Russia can't reach Telegram, blocked in 2026). For that, RELAY_SECRET: a long random string, the same as the
// worker's secret RELAY_SECRET. An e-mail copy is optional (MAIL_TO). Without either, every request still waits in
// the outbox, but visitors are asked to write in a messenger instead.
return [
  'RELAY_SECRET' => '',          // e.g. 48 random letters and digits; the same in Cloudflare (worker → Settings → Variables and Secrets)
  'MAIL_TO' => '',               // optional: an e-mail copy of every request, e.g. bookings@club.ru; several: 'a@club.ru, b@club.ru'
  'MAIL_FROM' => '',             // optional: a mailbox on the site's domain (the host may require one)
  'TELEGRAM_BOT_TOKEN' => '',    // only on hosting outside Russia: Telegram directly
  'TELEGRAM_CHAT_ID' => '',
];
