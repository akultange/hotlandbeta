// The gallery page (/ru/gallery/, /en/gallery/): 18 pictures and 16 films. The pictures are the club's new set of
// photographs (2026-11-13; the earlier 42 left the gallery, their files stay for the rest of the site) and the bar
// card's three films, which come to life in the walk when you stop in front of them; all in a shuffled order
// (`order`). Captions (RU and EN) and alt texts describe each picture for screen
// readers and the full-screen viewer. Files live in /public/media (gal-NN-*.webp, with 720 px thumbnails) and
// /public/video (the teaser).
import type { L } from './i18n';

export type GalleryPhoto = {
  /** The picture at full size. */
  src: string;
  /** A 720 px wide copy, for phones and the grid. */
  thumb?: string;
  /** Width of the full-size file in pixels (for srcset). */
  w: number;
  /** Width / height, as CSS aspect-ratio. */
  ratio: string;
  cap: L;
  /** A second line under the caption, for the big moments. */
  sub?: L;
  alt: L;
  /** A short film of the same scene: it comes to life when the picture is in focus. */
  film?: string;
  /** A wide picture, shown centred as a big moment. */
  wide?: boolean;
};

export type GalleryFilm = {
  src: string;
  poster: string;
  ratio: string;
  /** The same film cut for a portrait screen. */
  srcPhone?: string;
  posterPhone?: string;
  ratioPhone?: string;
  /** The hour of the night, for the four acts. */
  time?: string;
  cap: L;
  alt: L;
};

const m = (file: string) => `/media/${file}`;
const shot = (name: string, w: number, ratio: string, cap: L, alt: L, more: Partial<GalleryPhoto> = {}): GalleryPhoto => ({
  src: m(`${name}.webp`), thumb: m(`${name}-thumb.webp`), w, ratio, cap, alt, ...more,
});

/** Every picture of the walk: the club's new set of photographs, and the bar card's three films (the menu page's
 *  tabs) as pictures that come to life when you stop in front of them. */
const pictures: GalleryPhoto[] = [
  shot('gal-01-pole-red-smoke', 1152, '2/3', { ru: 'В красном дыму', en: 'In the red smoke' }, { ru: 'Артистка с голубыми волосами вниз головой на пилоне, вокруг красный дым и бархатный занавес', en: 'An artist with blue hair upside down on the pole, red smoke and a velvet curtain around her' }),
  shot('gal-02-duet-red-blue', 1152, '2/3', { ru: 'Дуэт', en: 'The duet' }, { ru: 'Две артистки в чёрном кружеве обнимаются в красном и синем свете', en: 'Two artists in black lace embrace in red and blue light' }),
  shot('gal-03-on-the-bar', 1152, '2/3', { ru: 'На стойке', en: 'On the bar' }, { ru: 'Артистка в прозрачном чёрном боди лежит на мраморной стойке бара, ноги вверх', en: 'An artist in a sheer black bodysuit lies on the marble bar, legs raised' }),
  shot('gal-04-blue-velvet-chair', 1152, '2/3', { ru: 'Бархатный стул', en: 'The velvet chair' }, { ru: 'Артистка с голубыми волосами и татуировками, в чёрном корсете и чулках, на красном бархатном стуле', en: 'A blue-haired, tattooed artist in a black corset and stockings on a red velvet chair' }),
  shot('gal-05-foam-from-above', 1152, '2/3', { ru: 'Пена', en: 'Foam' }, { ru: 'Вид сверху: артистка лежит в белой пене, руки раскинуты', en: 'From above: an artist lies in white foam, arms spread' }),
  shot('gal-06-dressing-room', 1152, '2/3', { ru: 'Гримёрка', en: 'The dressing room' }, { ru: 'За кулисами: две артистки у зеркала в гримёрке, позади вешалка с костюмами', en: 'Backstage: two artists at the dressing-room mirror, a rail of costumes behind them' }),
  shot('gal-07-red-stripes', 1152, '2/3', { ru: 'Полосы света', en: 'Stripes of light' }, { ru: 'Артистка в полосах красного света у бархатного занавеса и пилона', en: 'An artist in stripes of red light by a velvet curtain and the pole' }),
  shot('gal-08-over-the-shoulder', 1408, '1/1', { ru: 'Через плечо', en: 'Over the shoulder' }, { ru: 'Артистка спиной, в длинных чёрных кружевных перчатках, смотрит через плечо', en: 'An artist seen from behind in long black lace gloves, looking over her shoulder' }),
  shot('gal-09-duet-curtain', 1152, '2/3', { ru: 'У занавеса', en: 'By the curtain' }, { ru: 'Две артистки в чёрном белье и чулках у красного занавеса и пилона', en: 'Two artists in black lingerie and stockings by the red curtain and the pole' }),
  shot('gal-10-red-light', 1152, '2/3', { ru: 'Красный свет', en: 'Red light' }, { ru: 'Артистка в красном латексе, с косами, на зеркальном полу под красным прожектором', en: 'An artist in red latex, her hair in braids, on a mirrored floor under a red spotlight' }),
  shot('gal-11-foam-bath', 1152, '2/3', { ru: 'Пенная ванна', en: 'The foam bath' }, { ru: 'Артистка в пенной ванне, позади огни бара', en: 'An artist in a foam bath, the lights of the bar behind her' }),
  shot('gal-12-corset-chair', 1152, '2/3', { ru: 'Корсет', en: 'The corset' }, { ru: 'Брюнетка в чёрном корсете и чулках на красном бархатном стуле', en: 'A brunette in a black corset and stockings on a red velvet chair' }),
  shot('gal-13-blue-stripes', 1152, '2/3', { ru: 'Под лучами', en: 'Under the beams' }, { ru: 'Артистка с голубыми волосами, руки подняты, по телу полосы красного света', en: 'A blue-haired artist, arms raised, stripes of red light across her body' }),
  shot('gal-14-armchair-duet', 1152, '2/3', { ru: 'Кресло', en: 'The armchair' }, { ru: 'Две артистки в чёрных корсетах: рыжая стоит за креслом, брюнетка сидит в нём', en: 'Two artists in black corsets: a redhead behind the armchair, a brunette seated in it' }),
  shot('gal-15-behind-the-curtain', 1152, '2/3', { ru: 'За занавесом', en: 'Behind the curtain' }, { ru: 'Артистка выглядывает из-за красного бархатного занавеса', en: 'An artist peeks out from behind the red velvet curtain' }),
  shot('bar-menu-bar', 848, '4/5', { ru: 'Бар', en: 'The bar' }, { ru: 'Бар: артистка с голубыми волосами и татуировками, в чёрном кружеве и чулках, сидит на стойке и льёт шампанское из бутылки', en: 'The bar: a blue-haired, tattooed artist in black lace and stockings sits on the bar and pours champagne from the bottle' }, { film: m('bar-menu-bar-loop.mp4') }),
  shot('bar-menu-kitchen', 848, '4/5', { ru: 'Кухня до утра', en: 'Kitchen till morning' }, { ru: 'Кухня: артистка с голубыми волосами в чёрном атласе на красном бархатном диване ест клубнику в шоколаде; торт, свечи и бокалы', en: 'The kitchen: a blue-haired artist in black satin on a red velvet banquette eats a chocolate strawberry; cake, candles and coupes' }, { film: m('bar-menu-kitchen-loop.mp4') }),
  shot('bar-menu-entry', 848, '4/5', { ru: 'Шоу', en: 'The show' }, { ru: 'Шоу: артистка с голубыми волосами танцует у пилона на круглой сцене, позади красный занавес, на столах свечи', en: 'The show: a blue-haired artist dances at the pole on the round stage, a red curtain behind her, candles on the tables' }, { film: m('bar-menu-entry-loop.mp4') }),
];

/** The walk's order: shuffled (the client: "put everything in random order"), with the three films spread through it
 *  (the first picture is one, so the walk shows at once that its pictures can come to life), no two duets and no two
 *  foam pictures side by side. */
const order = [
  'bar-menu-kitchen', 'gal-06-dressing-room', 'gal-08-over-the-shoulder', 'gal-01-pole-red-smoke', 'gal-15-behind-the-curtain',
  'gal-03-on-the-bar', 'bar-menu-entry', 'gal-05-foam-from-above', 'gal-09-duet-curtain', 'gal-13-blue-stripes',
  'gal-07-red-stripes', 'gal-02-duet-red-blue', 'gal-10-red-light', 'gal-04-blue-velvet-chair', 'bar-menu-bar',
  'gal-11-foam-bath', 'gal-12-corset-chair', 'gal-14-armchair-duet',
];
export const galleryPhotos: GalleryPhoto[] = order.map((name) => {
  const p = pictures.find((x) => x.src === m(`${name}.webp`));
  if (!p) throw new Error(`gallery: no picture ${name}`);
  return p;
});

const loop = (name: string, ratio: string, cap: L, alt: L): GalleryFilm => ({ src: m(`${name}-loop.mp4`), poster: m(`${name}-thumb.webp`), ratio, cap, alt });
const act = (name: string, time: string, cap: L, alt: L): GalleryFilm => ({
  src: m(`${name}.mp4`), poster: m(`${name}.webp`), ratio: '16/9',
  srcPhone: m(`${name}-phone.mp4`), posterPhone: m(`${name}-phone.webp`), ratioPhone: '4/5', time, cap, alt,
});

export const galleryFilms: GalleryFilm[] = [
  { src: '/video/hero-d.mp4', poster: '/video/hero-d.webp', ratio: '16/9', srcPhone: '/video/hero-m.mp4', posterPhone: '/video/hero-m.webp', ratioPhone: '9/16',
    cap: { ru: 'Тизер HOTLAND', en: 'The HOTLAND teaser' },
    alt: { ru: 'Ночь в HOTLAND: артистка на круглой сцене, лучи, пилон, лазеры, а в конце «тсс»: только между нами', en: 'A night at HOTLAND: an artist on the round stage, beams, the pole, lasers, and at the end a “shh”: just between us' } },
  act('night-1-2200-doors', '22:00', { ru: 'Двери и ужин', en: 'Doors and dinner' }, { ru: 'Хостес в чёрном атласе распахивает двери клуба и с улыбкой приглашает внутрь', en: 'A hostess in black satin opens the club doors and invites you in with a smile' }),
  act('night-2-2330-first-show', '23:30', { ru: 'Первое шоу', en: 'The first show' }, { ru: 'Первое шоу: артистка в кристаллах делает шаг к залу, за ней раскрываются чёрные веера из перьев', en: 'The first show: an artist in crystals steps towards the room as black feather fans open behind her' }),
  act('night-3-0130-second-show', '01:30', { ru: 'Второе шоу', en: 'The second show' }, { ru: 'Второе шоу: артистка в кристаллах на краю сцены у пилона смотрит в камеру', en: 'The second show: an artist in crystals on the edge of the stage by the pole looks into the camera' }),
  act('night-4-0600-till-morning', '06:00', { ru: 'До утра', en: 'Till morning' }, { ru: 'До утра: девушка в пайетках у бара, туфли в одной руке, шампанское в другой, за окном рассвет', en: 'Till morning: a woman in sequins at the bar, heels in one hand and champagne in the other, dawn in the window' }),
  loop('poster-1-velvet', '9/16', { ru: 'Velvet', en: 'Velvet' }, { ru: 'Velvet: артистка в бархатном корсете и длинных перчатках на фоне багрового занавеса', en: 'Velvet: an artist in a velvet corset and opera gloves before a crimson curtain' }),
  loop('poster-2-courchevel', '9/16', { ru: 'Courchevel', en: 'Courchevel' }, { ru: 'Courchevel: блондинка в белом меху и кристаллах, бокал шампанского, падает снег', en: 'Courchevel: a blonde in white fur and crystals, a glass of champagne, falling snow' }),
  loop('poster-3-ritual', '9/16', { ru: 'Ritual', en: 'Ritual' }, { ru: 'Ritual: девушка в кружевной маске среди чёрных свечей и багрового воска', en: 'Ritual: a woman in a lace mask among black candles and crimson wax' }),
  loop('poster-4-new-year', '9/16', { ru: 'Новый год', en: 'New Year' }, { ru: 'Новый год: девушка в серебряных пайетках с бокалом, серебряное конфетти', en: 'New Year: a woman in silver sequins with a glass, silver confetti' }),
  loop('artist-1-pole', '3/4', { ru: 'Пилон', en: 'The pole' }, { ru: 'Артистка в чёрном бархатном боди у серебряного пилона', en: 'An artist in a black velvet bodysuit at the silver pole' }),
  loop('artist-3-aerial', '3/4', { ru: 'Воздушное кольцо', en: 'The aerial hoop' }, { ru: 'Артистка в багровом на воздушном кольце высоко над сценой', en: 'An artist in crimson on an aerial hoop high above the stage' }),
  loop('artist-5-live-vocal', '3/4', { ru: 'Живой вокал', en: 'Live vocals' }, { ru: 'Живой вокал: винтажный серебряный микрофон в руках в атласных перчатках', en: 'Live vocals: a vintage silver microphone in satin-gloved hands' }),
  loop('bar-menu-bar', '4/5', { ru: 'Бар', en: 'The bar' }, { ru: 'Бар: артистка с голубыми волосами и татуировками, в чёрном кружеве и чулках, сидит на стойке и льёт шампанское из бутылки', en: 'The bar: a blue-haired, tattooed artist in black lace and stockings sits on the bar and pours champagne from the bottle' }),
  loop('bar-menu-kitchen', '4/5', { ru: 'Кухня до утра', en: 'Kitchen till morning' }, { ru: 'Кухня: артистка с голубыми волосами в чёрном атласе на красном бархатном диване ест клубнику в шоколаде; торт, свечи и бокалы', en: 'The kitchen: a blue-haired artist in black satin on a red velvet banquette eats a chocolate strawberry; cake, candles and coupes' }),
  loop('bar-menu-entry', '4/5', { ru: 'Шоу', en: 'The show' }, { ru: 'Шоу: артистка с голубыми волосами танцует у пилона на круглой сцене, позади красный занавес, на столах свечи', en: 'The show: a blue-haired artist dances at the pole on the round stage, a red curtain behind her, candles on the tables' }),
  loop('hookah-lounge', '4/5', { ru: 'Кальянная', en: 'The hookah lounge' }, { ru: 'Кальянная: девушка в чёрном атласе выдыхает дым на бархатном диване', en: 'Hookah lounge: a woman in black satin exhales smoke on a velvet banquette' }),
];

/** "31 фото и 14 фильмов" / "31 photos, 14 films", in its parts: the page links each half to its section. */
export function galleryCount(lang: 'ru' | 'en') {
  const p = galleryPhotos.length;
  const f = galleryFilms.length;
  if (lang === 'en') return { photos: `${p} photos`, and: ', ', films: `${f} films` };
  const n10 = f % 10;
  const n100 = f % 100;
  const films = n10 === 1 && n100 !== 11 ? 'фильм' : n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14) ? 'фильма' : 'фильмов';
  return { photos: `${p} фото`, and: ' и ', films: `${f} ${films}` };
}

export const galleryText = {
  title: { ru: 'Галерея', en: 'Gallery' } as L,
  description: { ru: 'Галерея HOTLAND: шоу, артистки, бар и ночь до утра. Почти всё, что можно показать.', en: 'The HOTLAND gallery: the show, the artists, the bar and the night until morning. Almost everything we’re allowed to show.' } as L,
  photos: { ru: 'Фото', en: 'Photos' } as L,
  films: { ru: 'Фильмы ночи', en: 'Films of the night' } as L,
  filmsLead: { ru: 'Короткие сцены из клуба. Нажмите на любую, чтобы смотреть на весь экран.', en: 'Short scenes from the club. Choose one to watch it full screen.' } as L,
  /** The page's last word before the footer's invitation. */
  end: { ru: 'Остальное только вживую: в\u00a0зале не\u00a0снимают.', en: 'The rest you’ll only see in person: no cameras inside.' } as L,
};
