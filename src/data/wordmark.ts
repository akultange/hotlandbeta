// The HOTLAND logotype as vector outlines, shared by the home hero (Hero.astro) and the footer's masthead
// (Mast.astro), so the name is set in one face everywhere on the page.
// HOTLAND in Geologica (weight 800, cut sharp: SHRP 100), the site's own face, as outlines (tools/fonts/wordmark.py
// writes them): the O runs from 725 above the line to 10 below it. As vectors the word is sharp at any size,
// needs no web font to load and can be cut out of black for the film. [advance, ink left, ink right, outline]
export const GLYPHS: Record<string, [number, number, number, string]> = {
  H: [787, 80, 707, 'M80 -5.1L80 -709.9L265.2 -709.9L265.2 -454.9L522 -454.9L522 -709.9L707.2 -709.9L707.2 -5.1L522 -5.1L522 -286L265.2 -286L265.2 -5.1Z'],
  O: [829, 37, 792, 'M414.4 10C359.8 10 309.4 0.7 263.3 -17.9C217.2 -36.6 177.2 -62.5 143.3 -95.7C109.3 -128.9 83.1 -167.9 64.5 -212.5C45.9 -257.2 36.6 -305.5 36.6 -357.5C36.6 -409.9 45.9 -458.4 64.5 -503C83.1 -547.6 109.3 -586.6 143.3 -619.8C177.2 -653 217.2 -678.9 263.3 -697.3C309.4 -715.8 359.8 -725 414.4 -725C469 -725 519.2 -715.6 565.1 -696.8C611 -678 651 -651.8 684.9 -618.3C718.9 -584.7 745.3 -545.7 764 -501.2C782.8 -456.8 792.2 -408.8 792.2 -357.5C792.2 -305.5 782.8 -257.2 764 -212.5C745.3 -167.9 718.9 -128.9 684.9 -95.7C651 -62.5 611 -36.6 565.1 -17.9C519.2 0.7 469 10 414.4 10ZM414.4 -163.6C441.1 -163.6 465.7 -168.1 488 -177.1C510.4 -186.2 529.8 -199.1 546.2 -216.1C562.6 -233 575.3 -253.4 584.4 -277.3C593.4 -301.1 597.9 -327.9 597.9 -357.5C597.9 -397 590 -431.3 574.3 -460.3C558.5 -489.4 536.8 -511.8 509.2 -527.7C481.5 -543.5 449.9 -551.4 414.4 -551.4C387.7 -551.4 363.1 -546.9 340.7 -537.9C318.3 -528.8 299 -515.9 282.5 -498.9C266.1 -482 253.4 -461.6 244.4 -437.8C235.4 -413.9 230.9 -387.2 230.9 -357.5C230.9 -318 238.8 -283.7 254.5 -254.7C270.3 -225.6 292 -203.2 319.6 -187.3C347.3 -171.5 378.8 -163.6 414.4 -163.6Z'],
  T: [588, -2, 572, 'M200.9 -5.1L200.9 -541L-2.1 -541L34.7 -709.9L571.7 -709.9L571.7 -541L387.1 -541L387.1 -5.1Z'],
  L: [570, 80, 558, 'M80 -5.1L80 -709.9L265.2 -709.9L265.2 -174L558.5 -174L521.7 -5.1Z'],
  A: [741, 1, 740, 'M0.9 -5.1L261.1 -709.9L478.8 -709.9L739.6 -5.1L530.5 -5.1L486.1 -139.4L248.4 -139.4L204.5 -5.1ZM288.9 -293.3L444.6 -293.3L367.1 -515.8Z'],
  N: [792, 80, 712, 'M80 -5.1L80 -709.9L264.2 -709.9L532.7 -304.6L532.7 -709.9L711.8 -709.9L711.8 -5.1L527.5 -5.1L259.1 -416.4L259.1 -5.1Z'],
  D: [737, 80, 701, 'M80 -5.1L80 -709.9L328.7 -709.9C402.8 -709.9 467.8 -695 523.7 -665.2C579.5 -635.5 623 -594.2 654 -541.2C685.1 -488.3 700.6 -427.1 700.6 -357.4C700.6 -304.9 691.7 -257.1 674 -213.8C656.3 -170.6 631.1 -133.4 598.3 -102.3C565.5 -71.2 526.3 -47.3 480.8 -30.4C435.3 -13.5 384.6 -5.1 328.7 -5.1ZM265.2 -177.5L321.9 -177.5C349.4 -177.5 374.3 -181.3 396.8 -188.8C419.2 -196.2 438.6 -207.6 455.1 -222.7C471.5 -237.9 484.1 -256.7 493 -279.2C501.8 -301.7 506.3 -327.7 506.3 -357.4C506.3 -397.2 498.5 -430.5 483 -457.2C467.6 -484 446 -504 418.2 -517.4C390.5 -530.8 358.4 -537.5 321.9 -537.5L265.2 -537.5Z'],
};
// The same letters at weight 400: the name as the wall carries it, in fine steel capitals set wide apart
// (the 18+ door, AgeGate.astro; the header).
export const FINE: Record<string, [number, number, number, string]> = {
  H: [751, 92, 659, 'M91.8 -5.1L91.8 -709.9L204.6 -709.9L204.6 -429.7L545.9 -429.7L545.9 -709.9L658.7 -709.9L658.7 -5.1L545.9 -5.1L545.9 -326.3L204.6 -326.3L204.6 -5.1Z'],
  O: [837, 48, 789, 'M418.7 10C365.7 10 316.7 0.7 271.5 -17.9C226.3 -36.6 187 -62.5 153.6 -95.7C120.2 -128.9 94.2 -167.9 75.7 -212.5C57.1 -257.2 47.9 -305.5 47.9 -357.5C47.9 -409.9 57.1 -458.4 75.7 -503C94.2 -547.6 120.2 -586.6 153.6 -619.8C187 -653 226.3 -678.9 271.5 -697.3C316.7 -715.8 365.7 -725 418.7 -725C471.4 -725 520.3 -715.6 565.3 -696.8C610.2 -678 649.5 -651.8 683.1 -618.3C716.6 -584.7 742.7 -545.7 761.4 -501.2C780.1 -456.8 789.4 -408.8 789.4 -357.5C789.4 -305.5 780.1 -257.2 761.4 -212.5C742.7 -167.9 716.6 -128.9 683.1 -95.7C649.5 -62.5 610.2 -36.6 565.3 -17.9C520.3 0.7 471.4 10 418.7 10ZM418.7 -96.6C454.3 -96.6 487.4 -102.8 518.1 -115.1C548.8 -127.4 575.6 -145 598.6 -167.9C621.5 -190.8 639.4 -218.2 652.3 -250.3C665.2 -282.4 671.6 -318.1 671.6 -357.5C671.6 -410.1 660.4 -456 638.1 -495.1C615.7 -534.2 585.4 -564.5 547.2 -586.1C508.9 -607.6 466.1 -618.4 418.7 -618.4C383 -618.4 349.9 -612.2 319.2 -599.9C288.5 -587.6 261.7 -570 238.7 -547.1C215.8 -524.2 197.9 -496.8 185 -464.8C172.1 -432.8 165.7 -397.1 165.7 -357.5C165.7 -304.9 176.9 -259 199.3 -219.9C221.6 -180.8 251.9 -150.5 290.2 -128.9C328.4 -107.4 371.2 -96.6 418.7 -96.6Z'],
  T: [564, 16, 537, 'M225.3 -5.1L225.3 -606.4L15.8 -606.4L38.4 -709.9L536.7 -709.9L536.7 -606.4L338.5 -606.4L338.5 -5.1Z'],
  L: [548, 92, 523, 'M91.8 -5.1L91.8 -709.9L204.6 -709.9L204.6 -108.6L523 -108.6L500.3 -5.1Z'],
  A: [698, 11, 687, 'M10.8 -5.1L284.5 -709.9L406.6 -709.9L687.5 -5.1L560.5 -5.1L495.4 -173.1L196.8 -173.1L134.2 -5.1ZM226.2 -270.2L465 -270.2L343.1 -577.2Z'],
  N: [757, 92, 665, 'M91.8 -5.1L91.8 -709.9L199.5 -709.9L555.1 -197.9L555.1 -709.9L665.2 -709.9L665.2 -5.1L557.5 -5.1L201.9 -523.1L201.9 -5.1Z'],
  D: [717, 92, 670, 'M91.8 -5.1L91.8 -709.9L312.3 -709.9C382.2 -709.9 444.1 -694.9 497.9 -664.9C551.6 -634.9 593.7 -593.3 624.1 -540.2C654.4 -487.2 669.6 -426 669.6 -356.9C669.6 -305.4 660.9 -258.2 643.6 -215.1C626.2 -172 601.6 -134.8 569.8 -103.6C538 -72.3 500.3 -48.1 456.6 -30.9C412.9 -13.7 364.8 -5.1 312.3 -5.1ZM204.6 -110.1L298.5 -110.1C336.5 -110.1 371 -115.7 402 -127C433.1 -138.2 459.7 -154.6 482.1 -176C504.5 -197.5 521.7 -223.5 533.8 -253.9C545.8 -284.3 551.8 -318.7 551.8 -356.9C551.8 -408.3 541.3 -452.5 520.3 -489.6C499.3 -526.6 469.8 -555.1 431.8 -575C393.8 -595 349.4 -604.9 298.5 -604.9L204.6 -604.9Z'],
};
// display spacing for the giant word, on top of the font's own
export const KERN: Record<string, number> = { HO: 0, OT: -8, TL: 84, LA: -44, AN: -8, ND: 0 };
/** Scale an outline by s, then move it (absolute M, L and C commands only). */
export const place = (d: string, s: number, dx: number, dy: number) =>
  d.replace(/([MLC])([^MLCZ]*)/g, (_m, c: string, a: string) =>
    c + (a.match(/-?\d*\.?\d+/g) || []).map((n, i) => +(+n * s + (i % 2 ? dy : dx)).toFixed(1)).join(' '));
/** One line of capitals with its first stem on x 0: each letter's outline in place, where each letter starts, and the ink width. */
export function line(text: string) {
  let x = -GLYPHS[text[0]][1];
  const at: number[] = [];
  const paths = [...text].map((ch, i) => {
    const [adv, , , d] = GLYPHS[ch];
    at.push(x);
    const out = place(d, 1, x, 0);
    x += adv + (KERN[ch + (text[i + 1] ?? '')] ?? 0);
    return out;
  });
  const [adv, , right] = GLYPHS[text[text.length - 1]];
  return { paths, at, width: Math.round(x - adv + right) };
}
/** The capitals' box for a one-line word: the O reaches 11 above the capitals and 10 below the baseline. */
export const lineBox = (width: number) => `0 -725 ${width} 735`;
/** Capitals set wide apart, as the wall carries the name: the font's own spacing plus `track` between letters, the
 *  first letter's ink on x 0. Also each end's side bearing, for a word that has to meet another one at a set gap. */
export function spaced(text: string, track: number, set = FINE) {
  let x = -set[text[0]][1];
  const paths = [...text].map((ch) => {
    const [adv, , , d] = set[ch];
    const out = place(d, 1, x, 0);
    x += adv + track;
    return out;
  });
  const [adv, , right] = set[text[text.length - 1]];
  return { paths, width: Math.round(x - track - adv + right), before: set[text[0]][1], after: adv - right };
}

/** The name as the wall carries it, everywhere it is set small or fine (the 18+ door, the header, the phone's home
 *  header, the cards): HOT and LAND in the fine capitals, set wide and evenly, and the line of red light standing
 *  where the L begins, so the L grows out of the light (as on the club's brand board). In the outlines' units:
 *  each half's letters (one outline per letter, the half's ink starting at x 0) and width, the space from the T's
 *  ink to the line (`gap`), and the whole lockup's width. */
export const NAME_TRACK = 420;
export function nameHalves(track = NAME_TRACK) {
  const hot = spaced('HOT', track);
  const land = spaced('LAND', track);
  const gap = hot.after + track + land.before;
  return { hot, land, gap, width: hot.width + gap + land.width, box: (w: number) => `0 -725 ${w} 735` };
}
