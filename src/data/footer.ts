// What every footer version lists (Footer.astro and its v4 / v5 takes): the sections, the smaller links, the
// legal pages, and the line icons for the ways to reach the club (24-unit drawings, stroked, no fill).
import { type Lang, ui } from './i18n';

export type FLink = { label: string; href: string };

export function footerLinks(lang: Lang) {
  const t = ui[lang];
  const f = t.footer;
  const p = (s: string) => `/${lang}/${s}/`;
  return {
    sections: [
      { label: t.nav.program, href: p('program') },
      { label: t.nav.vip, href: p('vip') },
      { label: t.nav.menu, href: p('menu') },
      { label: t.nav.gallery, href: p('gallery') },
      { label: t.nav.about, href: p('about') },
    ] as FLink[],
    more: [
      { label: f.careers, href: p('careers') },
      { label: f.parties, href: `${p('vip')}#occasions` },
      { label: f.rules, href: `${p('about')}#rules` },
    ] as FLink[],
    legal: [
      { label: f.terms, href: p('terms') },
      { label: f.privacy, href: p('privacy') },
      { label: f.cookies, href: p('cookies') },
    ] as FLink[],
  };
}

export const ICONS = {
  whatsapp: ['M3.5 20.5 4.8 16A8.6 8.6 0 1 1 8 19.3z', 'M9.3 8.3c.3-.4.9-.4 1.2 0l.8 1.5c.2.3.1.7-.1 1l-.5.5c.6 1.2 1.5 2.1 2.7 2.7l.5-.5c.3-.2.7-.3 1-.1l1.5.8c.4.3.4.9 0 1.2-.6.6-1.5.9-2.4.7-2.4-.6-4.3-2.5-4.9-4.9-.2-.9.1-1.8.7-2.4z'],
  telegram: ['M20.6 3.6 2.9 10.4c-.8.3-.8 1.4 0 1.7l4.4 1.6 1.7 5.4c.2.7 1.1.9 1.6.4l2.5-2.4 4.4 3.2c.6.4 1.4.1 1.6-.6l3-14.6c.2-.9-.7-1.6-1.5-1.5z', 'm7.3 13.7 9.4-6.2-6.6 7.4'],
  mail: ['M4 6h16a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5v-11A.5.5 0 0 1 4 6z', 'm3.8 6.6 8.2 6.4 8.2-6.4'],
  phone: ['M8.4 3.6 9.9 7c.3.7.1 1.5-.5 2l-1.3 1.1a11.6 11.6 0 0 0 5.8 5.8l1.1-1.3c.5-.6 1.3-.8 2-.5l3.4 1.5c.7.3 1.1 1.1.9 1.9l-.5 2.1c-.2.8-.9 1.4-1.8 1.4C10.6 21 3 13.4 3 4.9c0-.9.6-1.6 1.4-1.8l2.1-.5c.8-.2 1.6.2 1.9 1z'],
  ask: ['M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.5v-3.5H5A1.5 1.5 0 0 1 3.5 15V6A1.5 1.5 0 0 1 5 4.5z'],
  pin: ['M12 21.2s-6.8-5.9-6.8-11.4a6.8 6.8 0 0 1 13.6 0c0 5.5-6.8 11.4-6.8 11.4z', 'M12 7.3a2.5 2.5 0 1 1 0 5a2.5 2.5 0 1 1 0-5z'],
} as const;
export type IconName = keyof typeof ICONS;
