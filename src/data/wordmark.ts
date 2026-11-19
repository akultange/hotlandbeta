// The HOTLAND logotype as vector outlines, shared by the home hero (Hero.astro) and the footer's masthead
// (Mast.astro), so the name is set in one face everywhere on the page.
// HOTLAND in Noto Sans Display Black (weight 900) at its narrowest width (62.5%), as outlines: units of 1/1000 em,
// baseline at y 0, capitals 714 high. As vectors the word is sharp at any size, needs no web font to load and can
// be cut out of black for the film. [advance, ink left, ink right, outline]
export const GLYPHS: Record<string, [number, number, number, string]> = {
  H: [595, 56, 539, 'M539 0L369 0L369-298L227-298L227 0L56 0L56-714L227-714L227-444L369-444L369-714L539-714L539 0Z'],
  O: [607, 37, 570, 'M570-358C570-298 564.5-245 553-199.5C541.5-154 524.5-115.5 502-84C479.5-52.5 451.5-29 418.5-13.5C385.5 2 347.5 10 304 10C261.5 10 223.5 2 190.5-14C157.5-30 129.5-53.5 106.5-84.5C83.5-115.5 66-154 54.5-200C43-246 37-299 37-359C37-438.5 47-505 67.5-559.5C88-614 118-655 157.5-683C197-711 246-725 304-725C362-725 411-711 450.5-683.5C490-656 520-615 540-560.5C560-506 570-438.5 570-358ZM215-358C215-309.5 218.5-269 225-236.5C231.5-204 241.5-180 255-163.5C268.5-147 284.5-139 304-139C324-139 340.5-147 353.5-162.5C366.5-178 376-202 382.5-234.5C389-267 392-308 392-358C392-433.5 384.5-489 370-525C355.5-561 333.5-579 304-579C284.5-579 268.5-571 255-554.5C241.5-538 231.5-513.5 225-481C218.5-448.5 215-407.5 215-358Z'],
  T: [452, 17, 435, 'M311 0L141 0L141-567L17-567L17-714L435-714L435-567L311-567L311 0Z'],
  L: [418, 56, 406, 'M56 0L56-714L227-714L227-146L406-146L406 0L56 0Z'],
  A: [565, 0, 565, 'M382 0L358-139L209-139L185 0L0 0L169-714L394-714L565 0L382 0ZM305-445C302.5-463 299.5-480.5 297-497C294.5-513.5 292-530 290-545.5C288-561 286-575.5 284-589C282-570.5 279-548.5 275-524C271-499.5 266.5-473.5 262-447L234-285L332-285L305-445Z'],
  N: [642, 56, 586, 'M586 0L387 0L211-444L207-444C208.5-424 209.5-405.5 210.5-388C211.5-370.5 212.5-354.5 213-339.5C213.5-324.5 214-310.5 214.5-297.5C215-284.5 215-273 215-263L215 0L56 0L56-714L254-714L429-282L433-282C432.5-300 431.5-317 430.5-333.5C429.5-350 428.5-365 428-379.5C427.5-394 427-407.5 426.5-420C426-432.5 426-444.5 426-455L426-714L586-714L586 0Z'],
  D: [574, 56, 537, 'M537-372C537-293.5 525-226 501.5-170.5C478-115 443.5-72.5 399-43.5C354.5-14.5 300.5 0 237 0L56 0L56-714L249-714C310.5-714 362.5-701 405.5-674.5C448.5-648 481-609.5 503.5-559C526-508.5 537-446 537-372ZM360-365C360-413.5 356-452.5 347.5-482C339-511.5 326.5-533 309.5-546.5C292.5-560 271.5-567 246-567L227-567L227-148L236-148C279.5-148 311-165.5 330.5-200.5C350-235.5 360-290.5 360-365Z'],
};
// display kerning for the heavy capitals: the font's text spacing left N-D at 112 units and H-O at 93, and L-A touching
export const KERN: Record<string, number> = { HO: -20, OT: -8, TL: -10, LA: 14, AN: -6, ND: -44 };
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
