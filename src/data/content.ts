// All page content in Russian and English. The facts (prices, sets, events, photos and films in /public/media)
// come from the club's own content pack (HOTLAND-site, sixth version); nothing here comes from another club.
// The words were rewritten on 2026-11-11 in the club's own voice: a late-night cabaret, theatre rather than a strip
// club, never compared with another venue by name. Plain enough to read at a glance, with a wink.
// Dates, prices, inclusions and the address are PLACEHOLDERS until the club confirms them.
import type { L } from './i18n';

/** A file in /public/media. */
export const media = (file: string) => `/media/${file}`;

type Shot = { img: string; alt: L; loop?: string };

/* ---------- Manifesto and house rules ---------- */

export const manifesto = {
  title: { ru: 'Город остаётся за дверью', en: 'The city stays outside' } as L,
  text: { ru: 'Внутри свет, шёлк и музыка до утра. Что было в HOTLAND, остаётся между нами. Даже если очень хочется рассказать.', en: 'Inside: light, silk and music until morning. What happens at HOTLAND stays between us. Even when you’re dying to tell.' } as L,
  shot: { img: 'manifesto.webp', loop: 'manifesto-loop.mp4', alt: { ru: 'Портрет в кружевной маске, полоса багрового света', en: 'A portrait in a lace mask, a stripe of crimson light' } } as Shot,
};

export const houseRulesTitle: L = { ru: 'Правила дома', en: 'House rules' };
export const houseRules: L[] = [
  { ru: 'Телефон отдыхает у входа в запечатанном чехле до конца вечера.', en: 'Your phone rests at the door, sealed in a pouch until you leave.' },
  { ru: 'Фото и видео в зале запрещены. Для всех. Даже для вас.', en: 'No photos or video inside. For everyone. Yes, you too.' },
  { ru: 'Личный менеджер встречает у двери и ведёт вас весь вечер.', en: 'A personal host meets you at the door and looks after you all night.' },
  { ru: 'Вход строго 18+, с паспортом. Дресс-код: элегантно, без спортивного.', en: 'Strictly 18+, with ID. Dress code: smart, no sportswear.' },
];

/* ---------- One night in four acts ---------- */

export type Act = { time: string; title: L; text: L; img: string; imgPhone: string; film: string; filmPhone: string; alt: L };

export const night = {
  title: { ru: 'Одна ночь в четырёх актах', en: 'One night in four acts' } as L,
  lead: { ru: 'Двери открываются в 22:00. Потом ужин, два шоу и бар до рассвета. Антракт можно взять когда угодно.', en: 'Doors open at 22:00. Then dinner, two shows and the bar until dawn. Take an interval whenever you like.' } as L,
  acts: [
    {
      time: '22:00',
      title: { ru: 'Двери и ужин', en: 'Doors & dinner' },
      text: { ru: 'Встречаем у двери и ведём к столу. Начните с ужина: аплодировать на голодный желудок тяжело.', en: 'We meet you at the door and see you to your table. Start with dinner: applause is hard work on an empty stomach.' },
      img: 'night-1-2200-doors.webp', imgPhone: 'night-1-2200-doors-phone.webp', film: 'night-1-2200-doors.mp4', filmPhone: 'night-1-2200-doors-phone.mp4',
      alt: { ru: 'Хостес в чёрном атласе распахивает двери клуба и с улыбкой приглашает внутрь', en: 'A hostess in black satin opens the club doors and invites you in with a smile' },
    },
    {
      time: '23:30',
      title: { ru: 'Первое шоу', en: 'First show' },
      text: { ru: 'Гаснет свет, поднимается занавес. Шоу-балет, бурлеск, акробатика под потолком и живой голос.', en: 'The lights go down, the curtain goes up. Show ballet, burlesque, aerial work under the ceiling and a live voice.' },
      img: 'night-2-2330-first-show.webp', imgPhone: 'night-2-2330-first-show-phone.webp', film: 'night-2-2330-first-show.mp4', filmPhone: 'night-2-2330-first-show-phone.mp4',
      alt: { ru: 'Первое шоу: артистка в кристаллах делает шаг к залу, за ней раскрываются чёрные веера из перьев', en: 'The first show: an artist in crystals steps towards the room as black feather fans open behind her' },
    },
    {
      time: '01:30',
      title: { ru: 'Второе шоу', en: 'Second show' },
      text: { ru: 'Новая программа для тех, кто остался. Свет ниже, музыка громче, номера смелее.', en: 'A new programme for those who stayed. Lower lights, louder music, bolder numbers.' },
      img: 'night-3-0130-second-show.webp', imgPhone: 'night-3-0130-second-show-phone.webp', film: 'night-3-0130-second-show.mp4', filmPhone: 'night-3-0130-second-show-phone.mp4',
      alt: { ru: 'Второе шоу: артистка в кристаллах на краю сцены у пилона смотрит в камеру', en: 'The second show: an artist in crystals on the edge of the stage by the pole looks into the camera' },
    },
    {
      time: '06:00',
      title: { ru: 'До утра', en: 'Until morning' },
      text: { ru: 'Караоке, VIP-комнаты и бар, пока над Москвой не рассветёт. Такси вызовем мы.', en: 'Karaoke, the VIP rooms and the bar, until the sun is up over Moscow. We’ll call your car.' },
      img: 'night-4-0600-till-morning.webp', imgPhone: 'night-4-0600-till-morning-phone.webp', film: 'night-4-0600-till-morning.mp4', filmPhone: 'night-4-0600-till-morning-phone.mp4',
      alt: { ru: 'До утра: девушка в пайетках у бара, туфли в одной руке, шампанское в другой, за окном рассвет', en: 'Till morning: a woman in sequins at the bar, heels in one hand and champagne in the other, dawn in the window' },
    },
  ] as Act[],
};

/* ---------- The show: six acts ---------- */

export const cast = {
  title: { ru: 'Ради этого шоу остаются', en: 'The show people stay for' } as L,
  // (no head count of artists: the casting call on the same pages says the club is casting its first company)
  lead: { ru: 'Двадцать номеров: балет, бурлеск, акробатика, пилон и живой голос на одной сцене.', en: 'Twenty numbers: ballet, burlesque, aerial, pole and a live voice, all on one stage.' } as L,
};

export type ShowAct = { title: L; text: L } & Shot;

export const acts: ShowAct[] = [
  { title: { ru: 'Пилон', en: 'Pole' }, text: { ru: 'Сила, линия и ни одного лишнего движения. Номер на серебряном пилоне в центре зала.', en: 'Strength, line and not one wasted move. A number on the silver pole in the middle of the room.' }, img: 'artist-1-pole.webp', loop: 'artist-1-pole-loop.mp4', alt: { ru: 'Артистка в чёрном бархатном боди у серебряного пилона', en: 'An artist in a black velvet bodysuit at the silver pole' } },
  { title: { ru: 'Шоу-балет', en: 'Show ballet' }, text: { ru: 'Костюмы, свет и хореография, как в большом театре. Только ближе. Каждую ночь в 23:30 и 01:30.', en: 'Costume, light and choreography, like a grand theatre, only closer. Every night at 23:30 and 01:30.' }, img: 'artist-4-show-ballet.webp', loop: 'artist-4-show-ballet-loop.mp4', alt: { ru: 'Шоу-балет: артистка в чёрном уборе из перьев и багровой накидке', en: 'Show ballet: an artist in a black feather headdress and a crimson cape' } },
  { title: { ru: 'Бурлеск', en: 'Burlesque' }, text: { ru: 'Перья, перчатки и искусство снимать их очень медленно.', en: 'Feathers, gloves and the fine art of taking them off very slowly.' }, img: 'artist-2-burlesque.webp', loop: 'artist-2-burlesque-loop.mp4', alt: { ru: 'Бурлеск: чёрный веер из перьев закрывает лицо, длинные серебряные перчатки', en: 'Burlesque: a black feather fan hides the face, long silver gloves' } },
  { title: { ru: 'Живой вокал', en: 'Live vocals' }, text: { ru: 'Джаз и соул между номерами. Можно заказать песню и посвятить её кому угодно.', en: 'Jazz and soul between the numbers. Request a song and dedicate it to whoever you like.' }, img: 'artist-5-live-vocal.webp', loop: 'artist-5-live-vocal-loop.mp4', alt: { ru: 'Живой вокал: винтажный серебряный микрофон в руке в атласной перчатке, дым', en: 'Live vocals: a vintage silver microphone in a satin-gloved hand, smoke' } },
  { title: { ru: 'Воздушная акробатика', en: 'Aerial' }, text: { ru: 'Кольцо под самым потолком. Зал замолкает. Официанты тоже.', en: 'A hoop right under the ceiling. The room goes quiet. So do the waiters.' }, img: 'artist-3-aerial.webp', loop: 'artist-3-aerial-loop.mp4', alt: { ru: 'Артистка в багровом на воздушном кольце высоко над сценой', en: 'An artist in crimson on an aerial hoop high above the stage' } },
  { title: { ru: 'Дуэты', en: 'Duets' }, text: { ru: 'Двое в одном луче света. Самый смелый номер программы. Моргать не советуем.', en: 'Two in one beam of light. The boldest number of the night. We don’t recommend blinking.' }, img: 'artist-6-duets.webp', loop: 'artist-6-duets-loop.mp4', alt: { ru: 'Дуэт: два силуэта спина к спине в узком луче белого света', en: 'A duet: two silhouettes back to back in a narrow beam of white light' } },
];

/* ---------- Gallery: twelve more nights ---------- */

export const galleryTitle: L = { ru: 'Галерея', en: 'Gallery' };

export const gallery: (Shot & { ratio: string })[] = [
  { img: 'gallery-01-velvet-wall.webp', ratio: '2/3', alt: { ru: 'Артистка в чёрном боди с кристаллами у бархатной стены', en: 'An artist in a black crystal bodysuit by a velvet wall' } },
  { img: 'gallery-02-backstage-mirror.webp', ratio: '3/4', alt: { ru: 'За кулисами: артистка красит губы у зеркала с лампами', en: 'Backstage: an artist puts on lipstick at a mirror lined with bulbs' } },
  { img: 'gallery-03-vip-sofa.webp', ratio: '3/4', alt: { ru: 'VIP-комната: девушка в атласном платье на багровом бархатном диване', en: 'The VIP room: a woman in a satin dress on a crimson velvet sofa' } },
  { img: 'gallery-04-pole-spin.webp', ratio: '2/3', alt: { ru: 'Артистка на пилоне в движении, волосы в полёте, багровый свет', en: 'An artist spinning on the pole, hair flying, crimson light' } },
  { img: 'gallery-05-three-fans.webp', ratio: '16/9', alt: { ru: 'Шоу-балет: три артистки с веерами из перьев на сцене', en: 'Show ballet: three artists with feather fans on stage' } },
  { img: 'gallery-06-light-stripe.webp', ratio: '3/4', alt: { ru: 'Портрет: полоса багрового света на глазах', en: 'Portrait: a stripe of crimson light across the eyes' } },
  { img: 'gallery-07-glove-champagne.webp', ratio: '1/1', alt: { ru: 'Рука в атласной перчатке с браслетом держит бокал шампанского', en: 'A gloved hand with a crystal bracelet holding a coupe of champagne' } },
  { img: 'gallery-08-hostess-door.webp', ratio: '2/3', alt: { ru: 'Хостес в платье-смокинге у входа, бархатный канат', en: 'The hostess in a tuxedo dress at the door by the velvet rope' } },
  { img: 'gallery-09-singer.webp', ratio: '3/4', alt: { ru: 'Певица в платье с пайетками у винтажного микрофона', en: 'A singer in a sequin gown at a vintage microphone' } },
  { img: 'gallery-10-aerial-silks.webp', ratio: '3/4', alt: { ru: 'Воздушная гимнастка на багровых полотнах над сценой', en: 'An aerialist on crimson silks high above the stage' } },
  { img: 'gallery-11-champagne-tower.webp', ratio: '16/9', alt: { ru: 'Башня из бокалов шампанского у мраморной стойки', en: 'A champagne tower at the marble bar' } },
  { img: 'gallery-12-staircase.webp', ratio: '2/3', alt: { ru: 'Девушка в длинном чёрном платье на винтовой лестнице', en: 'A woman in a long black gown on the spiral staircase' } },
];
/** A gallery picture by its number (1–12). */
export const g = (n: number) => gallery[n - 1];

/* ---------- Events ---------- */

export const eventsLead: L = { ru: 'На особые вечера только по\u00a0брони. Нажмите на\u00a0афишу, и\u00a0место за\u00a0вами.', en: 'Special nights are by reservation only. Tap a poster and the seat is yours.' };

/** zoom and drop: how much closer the poster frames its photo and film, and how far it lowers them (% of the poster's
 *  height; the black at the top of the shot fades into the poster; a negative drop raises them), so the girl stands as
 *  big and as low as on the other posters. Courchevel's shot is wider than the rest, with her face high up.
 *  pos: which part of a photo taller than the poster shows (CSS object-position, photo and film alike; the posters
 *  show the top of the shot unless told otherwise), for a girl who stands lower in her photo than the others do. */
export type Event = { slug: string; date: string; title: L; text: L; entry: number; dress?: L; zoom?: number; drop?: number; pos?: string } & Shot & { loop: string };

export const events: Event[] = [
  // the coming nights (placeholders until the club confirms them; moved from November to December on 2026-11-14)
  {
    slug: 'courchevel', date: '2026-12-13', entry: 3000, zoom: 1.2, drop: 18,
    title: { ru: 'Courchevel', en: 'Courchevel' },
    text: { ru: 'Альпийский шик без лыжных ботинок: белый мех, снег и ледяное шампанское до утра.', en: 'Alpine chic, no ski boots required: white fur, snow and ice-cold champagne until morning.' },
    img: 'poster-2-courchevel.webp', loop: 'poster-2-courchevel-loop.mp4',
    alt: { ru: 'Courchevel: блондинка в белом меху и кристаллах, бокал шампанского, падает снег', en: 'Courchevel: a blonde in white fur and crystals, a glass of champagne, falling snow' },
  },
  {
    slug: 'velvet', date: '2026-12-14', entry: 3000,
    title: { ru: 'Velvet', en: 'Velvet' },
    text: { ru: 'Бархат, шёлк и багровый свет. Дресс-код красный: платье, галстук или хотя бы носки.', en: 'Velvet, silk and crimson light. Dress code: red. A dress, a tie, or at least your socks.' },
    dress: { ru: 'Красный', en: 'Red' },
    img: 'poster-1-velvet.webp', loop: 'poster-1-velvet-loop.mp4',
    alt: { ru: 'Velvet: артистка в бархатном корсете и длинных перчатках на фоне багрового занавеса', en: 'Velvet: an artist in a velvet corset and opera gloves before a crimson curtain' },
  },
  {
    slug: 'ritual', date: '2026-12-15', entry: 3500,
    title: { ru: 'Ritual', en: 'Ritual' },
    text: { ru: 'Фирменная ночь HOTLAND: свечи, маски и тайны. Та самая ночь, о которой потом не рассказывают.', en: 'HOTLAND’s signature night: candles, masks and secrets. The night nobody talks about afterwards.' },
    img: 'poster-3-ritual.webp', loop: 'poster-3-ritual-loop.mp4',
    alt: { ru: 'Ritual: девушка в кружевной маске среди чёрных свечей и багрового воска', en: 'Ritual: a woman in a lace mask among black candles and crimson wax' },
  },
];

/** Nights that have been (the events page shows them under the coming ones, smaller and in black and white, each
 *  leading to the gallery). PLACEHOLDERS, like the coming nights, until the club sends its own. */
export const pastEvents: (Omit<Event, 'loop'> & { loop?: string })[] = [
  {
    slug: 'silver', date: '2026-11-07', entry: 3000,
    title: { ru: 'Silver', en: 'Silver' },
    text: { ru: 'Серебро, блёстки и шампанское: ночь, когда сверкал весь зал.', en: 'Silver, sequins and champagne: the night the whole room sparkled.' },
    img: 'poster-4-new-year.webp', loop: 'poster-4-new-year-loop.mp4',
    alt: { ru: 'Silver: артистка в серебряном платье с бокалом шампанского, вокруг летят блёстки', en: 'Silver: an artist in a silver dress with a glass of champagne, sequins flying' },
  },
  {
    slug: 'neon', date: '2026-10-31', entry: 3000, zoom: 1.15, drop: -14, pos: '50% 100%',
    title: { ru: 'Neon', en: 'Neon' },
    text: { ru: 'Неон, цилиндры и перья: Хеллоуин по\u2011нашему.', en: 'Neon, top hats and feathers: Halloween, our way.' },
    img: 'gallery-14-top-hat.webp',
    alt: { ru: 'Neon: артистка в цилиндре и розовых рукавах под неоновым кольцом', en: 'Neon: an artist in a top hat and pink sleeves under a neon ring' },
  },
  {
    slug: 'pink', date: '2026-10-24', entry: 3000,
    title: { ru: 'Pink', en: 'Pink' },
    text: { ru: 'Розовое шампанское башней и красные перчатки. Самая сладкая ночь осени.', en: 'Pink champagne in a tower and red satin gloves. The sweetest night of the autumn.' },
    img: 'gallery-15-pink-champagne.webp',
    alt: { ru: 'Pink: башня из бокалов с розовым шампанским, рука в красной атласной перчатке', en: 'Pink: a tower of glasses of pink champagne, a hand in a red satin glove' },
  },
  {
    slug: 'blue', date: '2026-10-17', entry: 3000, zoom: 1.6, drop: -17,
    title: { ru: 'Blue', en: 'Blue' },
    text: { ru: 'Синий свет и живой джаз: грустил в ту ночь только саксофон.', en: 'Blue light and live jazz: only the saxophone had the blues.' },
    img: 'gallery-22-teal-singer.webp',
    alt: { ru: 'Blue: певица в чёрном платье с блёстками у микрофона в бирюзовых лучах, за ней артистки', en: 'Blue: a singer in a glittering black gown at the microphone in teal beams, artists behind her' },
  },
];

/* ---------- VIP: three cards, five zones ---------- */

export const vip = {
  title: { ru: 'Три карты VIP', en: 'Three VIP cards' } as L,
  lead: { ru: 'Четыре VIP-зоны и три караоке-зала. Выберите карту, остальное менеджер возьмёт на себя.', en: 'Four VIP zones and three karaoke rooms. Pick a card; your host takes care of the rest.' } as L,
  request: { ru: 'Запросить карту', en: 'Request this card' } as L,
};

export const tiers: { name: string; sub: L; items: L[] }[] = [
  { name: 'Silver', sub: { ru: 'Стол в главном зале', en: 'A table in the main hall' }, items: [{ ru: 'Бутылка на выбор и закуски', en: 'A bottle of your choice and snacks' }, { ru: 'Места с видом на сцену', en: 'Seats facing the stage' }, { ru: 'Встреча у входа без очереди', en: 'Met at the door, no queue' }] },
  { name: 'Black', sub: { ru: 'Ложа у сцены', en: 'A box by the stage' }, items: [{ ru: 'Ужин-сет на каждого гостя', en: 'A dinner set for every guest' }, { ru: 'Две бутылки на выбор', en: 'Two bottles of your choice' }, { ru: 'Номер для виновника торжества прямо у ложи', en: 'A number for the guest of honour, right at your box' }] },
  { name: 'Crimson', sub: { ru: 'VIP-комната на всю ночь', en: 'A VIP room for the whole night' }, items: [{ ru: 'Ужин от шефа и шампанское без счёта', en: 'Chef’s dinner, and champagne nobody counts' }, { ru: 'Своё шоу в вашей комнате', en: 'A show of your own in your room' }, { ru: 'Личный менеджер на весь вечер', en: 'Your own host for the whole night' }] },
];

/** The club's zones (VIP page). `book`: the booking form's choice that a zone's link opens with; `cta`: that link's
 *  words, naming what you book (a zone may be a room, not a table). */
export const zones: ({ title: L; text: L; book: 'table' | 'vip' | 'lounge'; cta: L } & Shot)[] = [
  { book: 'table', cta: { ru: 'Забронировать стол', en: 'Book a table' }, title: { ru: 'Стол в зале', en: 'A table in the hall' }, text: { ru: 'Главный зал и вся сцена перед вами', en: 'The main hall, the whole stage in front of you' }, img: 'gallery-05-three-fans.webp', alt: { ru: 'Шоу-балет: три артистки с веерами из перьев на сцене', en: 'Show ballet: three artists with feather fans on stage' } },
  { book: 'table', cta: { ru: 'Забронировать ложу', en: 'Book the box' }, title: { ru: 'Ложа у сцены', en: 'A box by the stage' }, text: { ru: 'Ближе к сцене только артистки', en: 'Only the artists are closer to the stage' }, img: 'night-3-0130-second-show.webp', alt: { ru: 'Артистка в кристаллах на краю сцены у пилона', en: 'An artist in crystals on the edge of the stage by the pole' } },
  { book: 'vip', cta: { ru: 'Забронировать комнату', en: 'Book the room' }, title: { ru: 'VIP-комната', en: 'VIP room' }, text: { ru: 'Дверь закрывается, а вечер продолжается', en: 'The door closes; the night doesn’t' }, img: 'gallery-03-vip-sofa.webp', alt: { ru: 'VIP-комната: девушка в атласном платье на багровом бархатном диване', en: 'The VIP room: a woman in a satin dress on a crimson velvet sofa' } },
  { book: 'vip', cta: { ru: 'Забронировать зал', en: 'Book the room' }, title: { ru: 'Караоке-зал', en: 'Karaoke room' }, text: { ru: 'Свой зал, свой плейлист и никаких свидетелей', en: 'Your own room, your own playlist, no witnesses' }, img: 'gallery-09-singer.webp', alt: { ru: 'Певица в платье с пайетками у винтажного микрофона', en: 'A singer in a sequin gown at a vintage microphone' } },
  { book: 'lounge', cta: { ru: 'Забронировать кальянную', en: 'Book the lounge' }, title: { ru: 'Кальянная', en: 'Hookah lounge' }, text: { ru: 'Диваны, кальян и пауза между актами', en: 'Sofas, a hookah and a pause between acts' }, img: 'hookah-lounge.webp', loop: 'hookah-lounge-loop.mp4', alt: { ru: 'Кальянный лаунж: девушка в чёрном атласе выдыхает дым на бархатном диване', en: 'Hookah lounge: a woman in black satin exhales smoke on a velvet banquette' } },
];

/* ---------- Parties ---------- */

export const parties = {
  title: { ru: 'Ваш праздник, <em>ваш сценарий</em>', en: 'Your party, <em>your script</em>' } as L,
  lead: { ru: 'С вас повод, с нас всё остальное: банкет, напитки, шоу и менеджер от первого звонка до такси домой.', en: 'You bring the occasion, we bring the rest: the banquet, the drinks, the show and a host from the first call to the car home.' } as L,
  included: [
    { ru: 'Банкетное меню от нашей кухни', en: 'A banquet menu from our kitchen' },
    { ru: 'Напитки пакетом, без счёта за каждый бокал', en: 'Drinks as a package, no tab for every glass' },
    { ru: 'Шоу-программа под ваш повод', en: 'A show made for your occasion' },
    { ru: 'Личный менеджер от первого звонка до такси домой', en: 'Your own host, from the first call to the car home' },
  ] as L[],
  cta: { ru: 'Отправить заявку', en: 'Send a request' } as L,
};

export type Occasion = { slug: 'birthday' | 'bachelor' | 'corporate' | 'hire'; title: L; text: L; more: string[] } & Shot;

export const occasions: Occasion[] = [
  { slug: 'birthday', title: { ru: 'День рождения', en: 'Birthday' }, text: { ru: 'Торт выносят на сцену, артистки поздравляют виновника, музыку выбираете вы. Возраст называть не обязательно.', en: 'The cake comes out on stage, the artists toast the guest of honour and you choose the music. Nobody asks your age.' }, img: 'party-1-birthday.webp', alt: { ru: 'День рождения: шоколадный торт с одной бенгальской свечой на чёрном мраморе', en: 'Birthday: a dark chocolate cake with one sparkler on black marble' }, more: ['gallery-07-glove-champagne.webp', 'gallery-11-champagne-tower.webp', 'gallery-05-three-fans.webp'] },
  { slug: 'bachelor', title: { ru: 'Мальчишник', en: 'Bachelor party' }, text: { ru: 'Отдельная зона, программа для жениха и машина до дома. Что было на мальчишнике, остаётся между нами.', en: 'A private zone, a programme for the groom and a car home. What happens at the bachelor party stays between us.' }, img: 'party-2-bachelor.webp', alt: { ru: 'Мальчишник: мужские руки в чёрных костюмах чокаются бокалами для виски', en: 'Bachelor party: hands in black suits raising crystal whisky tumblers' }, more: ['set-3-crimson.webp', 'gallery-04-pole-spin.webp', 'party-2-whisky.webp'] },
  { slug: 'corporate', title: { ru: 'Корпоратив', en: 'Corporate night' }, text: { ru: 'Закрытый зал, банкет и шоу для команды. Счёт на компанию, подробности между нами.', en: 'A private hall, a banquet and a show for the team. The bill goes to the company; the details stay between us.' }, img: 'party-3-corporate.webp', alt: { ru: 'Корпоратив: длинный банкетный стол, серебро, хрусталь, бархатные кресла', en: 'Corporate night: a long banquet table, silver, crystal, velvet chairs' }, more: ['gallery-11-champagne-tower.webp', 'gallery-05-three-fans.webp', 'gallery-09-singer.webp'] },
  { slug: 'hire', title: { ru: 'Клуб целиком', en: 'The whole club' }, text: { ru: 'Весь HOTLAND только для ваших гостей: сцена, бар, VIP-комнаты и своя программа. Для остальных в этот вечер закрыто.', en: 'All of HOTLAND for your guests only: the stage, the bar, the VIP rooms and a programme of your own. Closed to everyone else that night.' }, img: 'party-4-whole-club.webp', alt: { ru: 'Клуб целиком: пустая сцена, бархатный занавес, один луч', en: 'Private hire: an empty stage, a velvet curtain, a single silver spotlight' }, more: ['gallery-10-aerial-silks.webp', 'gallery-03-vip-sofa.webp', 'gallery-12-staircase.webp'] },
];

/* ---------- Bar menu ---------- */

/** A line of the menu: its name, a volume, a few words under it, the price (null: on request; `from`: «от»), and
 *  `own` for the club's own (the house cocktails), which the menu marks in crimson. */
export type Item = { name: L; vol?: L; desc?: L; price: number | null; from?: boolean; own?: boolean };
const it = (ru: string, en: string, price: number | null, extra: Partial<Item> = {}): Item => ({ name: { ru, en }, price, ...extra });
const vol = (ru: string): L => ({ ru, en: ru.replace(',', '.').replace(' л', ' l').replace(' мл', ' ml') });
const d = (ru: string, en: string): L => ({ ru, en });

export const barMenu = {
  title: { ru: 'Меню', en: 'Menu' } as L,
  /** the menu page's second line under its name, as every page header has (may contain <em>) */
  sub: { ru: 'Кухня работает <em>до&nbsp;утра</em>, как и&nbsp;мы', en: 'The kitchen stays up <em>till morning</em>, as we do' } as L,
  lead: { ru: 'Коктейли, шампанское и классика бара. Кухня работает до утра, как и мы.', en: 'Cocktails, champagne and the bar classics. The kitchen works until morning. So do we.' } as L,
  /** the menu page's lead, under its name and second line */
  intro: { ru: 'Коктейли, шампанское и классика бара.', en: 'Cocktails, champagne and the bar classics.' } as L,
  note: { ru: 'Цены в рублях, обслуживание включено.', en: 'Prices in roubles, service included.' } as L,
  onRequest: { ru: 'по запросу', en: 'on request' } as L,
  tabs: { bar: { ru: 'Бар', en: 'Bar' } as L, kitchen: { ru: 'Кухня', en: 'Kitchen' } as L, entry: { ru: 'Вход и шоу', en: 'Entry & show' } as L },
  shots: {
    bar: { img: 'bar-menu-bar.webp', loop: 'bar-menu-bar-loop.mp4', alt: { ru: 'Бар: артистка с голубыми волосами и татуировками, в чёрном кружеве и чулках, сидит на стойке и льёт шампанское из бутылки', en: 'The bar: a blue-haired, tattooed artist in black lace and stockings sits on the bar and pours champagne from the bottle' } } as Shot,
    kitchen: { img: 'bar-menu-kitchen.webp', loop: 'bar-menu-kitchen-loop.mp4', alt: { ru: 'Кухня: артистка с голубыми волосами в чёрном атласе на красном бархатном диване ест клубнику в шоколаде; торт, свечи и бокалы', en: 'The kitchen: a blue-haired artist in black satin on a red velvet banquette eats a chocolate strawberry; cake, candles and coupes' } },
    entry: { img: 'bar-menu-entry.webp', loop: 'bar-menu-entry-loop.mp4', alt: { ru: 'Шоу: артистка с голубыми волосами танцует у пилона на круглой сцене, позади красный занавес, на столах свечи', en: 'The show: a blue-haired artist dances at the pole on the round stage, a red curtain behind her, candles on the tables' } },
  },
};

export const bar: { title: L; items: Item[] }[] = [
  { title: { ru: 'Пиво', en: 'Beer' }, items: [
    it('Светлое разливное', 'Draught lager', 650, { vol: vol('0,5 л') }),
    it('Тёмное разливное', 'Draught dark', 690, { vol: vol('0,5 л') }),
    it('Пшеничное', 'Wheat beer', 720, { vol: vol('0,5 л') }),
    it('Лагер в бутылке', 'Bottled lager', 750, { vol: vol('0,33 л') }),
    it('Сидр', 'Cider', 690, { vol: vol('0,33 л') }),
    it('Безалкогольное', 'Alcohol-free beer', 550, { vol: vol('0,33 л') }),
  ] },
  { title: { ru: 'Коктейли', en: 'Cocktails' }, items: [
    it('Stargazer', 'Stargazer', 1400, { desc: d('Джин, личи, роза', 'Gin, lychee, rose'), own: true }),
    it('Just Between Us', 'Just Between Us', 1500, { desc: d('Бурбон, вишня, дым', 'Bourbon, cherry, smoke'), own: true }),
    it('Негрони', 'Negroni', 1200),
    it('Эспрессо мартини', 'Espresso martini', 1300),
    it('Апероль шприц', 'Aperol spritz', 1200),
    it('Мохито', 'Mojito', 1100),
  ] },
  { title: { ru: 'Шампанское и вино', en: 'Champagne & wine' }, items: [
    it('Шампанское, бокал', 'Champagne, glass', 1900, { vol: vol('125 мл') }),
    it('Шампанское, бутылка', 'Champagne, bottle', 18000, { vol: vol('0,75 л'), from: true }),
    it('Вино, бокал', 'Wine, glass', 950, { vol: vol('150 мл'), from: true }),
    it('Вино, бутылка', 'Wine, bottle', 6500, { vol: vol('0,75 л'), from: true }),
  ] },
  { title: { ru: 'Крепкое', en: 'Spirits' }, items: [
    it('Водка премиум', 'Premium vodka', 600, { vol: vol('50 мл') }),
    it('Виски', 'Whisky', 900, { vol: vol('50 мл'), from: true }),
    it('Текила', 'Tequila', 800, { vol: vol('50 мл') }),
    it('Ром', 'Rum', 750, { vol: vol('50 мл') }),
  ] },
  { title: { ru: 'Без алкоголя', en: 'Soft drinks' }, items: [
    it('Энергетик', 'Energy drink', 600, { vol: vol('0,25 л') }),
    it('Кола, тоник, спрайт', 'Cola, tonic, lemonade', 450, { vol: vol('0,25 л') }),
    it('Сок', 'Juice', 450, { vol: vol('0,25 л') }),
  ] },
  { title: { ru: 'Вода, кофе и чай', en: 'Water, coffee & tea' }, items: [
    it('Вода', 'Water', 400, { vol: vol('0,5 л') }),
    it('Эспрессо', 'Espresso', 350),
    it('Чай, чайник', 'Tea, pot', 600),
  ] },
];

export const kitchen: Item[] = [
  it('Тартар из говядины', 'Beef tartare', 1400, { desc: d('Вяленый желток, бриошь', 'Cured yolk, brioche') }),
  it('Устрицы, 6 шт.', 'Oysters, 6 pcs', 2900, { desc: d('Шалот, лимон, мигнонет', 'Shallot, lemon, mignonette') }),
  it('Карпаччо из сибаса', 'Sea bass carpaccio', 1300, { desc: d('Цитрус, оливковое масло, укроп', 'Citrus, olive oil, dill') }),
  it('Хачапури по-аджарски', 'Adjarian khachapuri', 1200, { desc: d('С трюфелем, на компанию', 'With truffle, to share') }),
  it('Стейк рибай, 300 г', 'Ribeye steak, 300 g', 4900, { desc: d('Перечный соус, печёный картофель', 'Pepper sauce, baked potato') }),
  it('Сырная тарелка', 'Cheese board', 1900, { desc: d('Европейские и фермерские сыры, мёд', 'European and farm cheeses, honey') }),
  it('«Красный бархат»', 'Red Velvet', 900, { desc: d('Фирменный десерт клуба', 'The club’s own dessert') }),
  it('Фрукты на льду', 'Fruit on ice', 2500, { desc: d('Сезонные, на серебряном блюде', 'Seasonal, on a silver platter') }),
];

export const entryShows: Item[] = [
  it('Вход', 'Entry', 1000, { desc: d('Любая ночь, кроме особых вечеров', 'Any night except special nights') }),
  it('Особый вечер', 'Special night', 3000, { from: true, desc: d('Courchevel, Velvet, Ritual: смотрите афишу', 'Courchevel, Velvet, Ritual: see Events') }),
  it('Номер у вашего стола', 'A number at your table', 5000, { from: true, desc: d('Сколько длится и где, подскажет менеджер', 'How long and where: ask your host') }),
  it('VIP и караоке', 'VIP & karaoke', null, { desc: d('Карты Silver, Black и Crimson', 'Silver, Black and Crimson cards') }),
];

/* ---------- Bottle sets ---------- */

export const sets = {
  title: { ru: 'Сеты <em>для стола</em>', en: 'Bottle <em>sets</em>' } as L,
  lead: { ru: 'Бутылка, лёд, миксеры и немного шоу. Сет выносят к столу с огнём, соседи обернутся.', en: 'A bottle, ice, mixers and a little show. The set comes to your table on fire. The next table will look.' } as L,
  cta: { ru: 'Заказать сет', en: 'Order this set' } as L,
  items: [
    { name: { ru: 'Классика', en: 'Classic' }, what: { ru: 'Водка премиум 0,7 л, шесть энергетиков, лёд и лимон', en: 'Premium vodka 0.7 l, six energy drinks, ice and lemon' }, perks: [{ ru: 'Номер артистки у вашего стола', en: 'An artist’s number at your table' }, { ru: '10 купюр HOTLAND, чтобы благодарить артисток', en: '10 HOTLAND notes to thank the artists with' }], price: 25000, img: 'set-1-classic.webp', alt: { ru: 'Сет «Классика»: чёрное ведро со льдом, водка и энергетики', en: 'Classic set: a black ice bucket, vodka and energy drinks' } },
    { name: { ru: 'Премьер', en: 'Premier' }, what: { ru: 'Водка люкс 1 л, девять энергетиков, фруктовая тарелка', en: 'Luxury vodka 1 l, nine energy drinks, a fruit platter' }, perks: [{ ru: 'Два номера у вашего стола', en: 'Two numbers at your table' }, { ru: '20 купюр HOTLAND, чтобы благодарить артисток', en: '20 HOTLAND notes to thank the artists with' }, { ru: 'Выносим с огнём', en: 'Brought out on fire' }], price: 45000, img: 'set-2-premier.webp', alt: { ru: 'Сет «Премьер»: светящаяся ладья со льдом, водка и девять энергетиков', en: 'Premier set: a glowing ice boat, vodka and nine energy drinks' } },
    { name: { ru: 'Crimson', en: 'Crimson' }, what: { ru: 'Шампанское 1,5 л и водка люкс 1 л, двенадцать миксеров, икра и фрукты', en: 'Champagne 1.5 l and luxury vodka 1 l, twelve mixers, caviar and fruit' }, perks: [{ ru: 'Своё шоу в VIP-комнате', en: 'A show of your own in a VIP room' }, { ru: '50 купюр HOTLAND, чтобы благодарить артисток', en: '50 HOTLAND notes to thank the artists with' }, { ru: 'Выносим с огнём под вашу музыку', en: 'Brought out on fire, to your music' }], price: 95000, img: 'set-3-crimson.webp', loop: 'set-3-crimson-loop.mp4', alt: { ru: 'Сет «Кримсон»: медная чаша в багровом свете, магнум с бенгальским огнём', en: 'Crimson set: a copper bowl in crimson light, a magnum with a sparkler' } },
  ] as ({ name: L; what: L; perks: L[]; price: number } & Shot)[],
};

/* ---------- Hookah lounge ---------- */

export const hookah = {
  title: { ru: 'Кальянная', en: 'Hookah lounge' } as L,
  lead: { ru: 'Медленный дым, мягкий свет и никакой спешки. Лучшее место для антракта.', en: 'Slow smoke, soft light and no hurry. The best seat for the interval.' } as L,
  flavorsTitle: { ru: 'Вкусы', en: 'Flavours' } as L,
  flavors: [
    { ru: 'Клубника со сливками', en: 'Strawberry and cream' },
    { ru: 'Мята со льдом', en: 'Iced mint' },
    { ru: 'Двойное яблоко', en: 'Double apple' },
    { ru: 'Вишня и ваниль', en: 'Cherry and vanilla' },
    { ru: 'Личи и роза', en: 'Lychee and rose' },
    { ru: 'Лесные ягоды', en: 'Wild berries' },
  ] as L[],
  offers: [
    it('Кальян', 'Hookah', 4500, { desc: d('Любой вкус, на всю компанию', 'Any flavour, for the whole table') }),
    it('Хостес за вашим столом', 'A hostess at your table', 12000, { desc: d('Час беседы с артисткой, кальян от нас', 'An hour’s conversation with one of our artists; the hookah is on us') }),
  ],
  cta: { ru: 'Забронировать кальянную', en: 'Book the lounge' } as L,
  shot: zones[4] as Shot,
};

/* ---------- Visit ---------- */

export const visit = {
  title: { ru: 'Как нас <em>найти</em>', en: 'Finding <em>us</em>' } as L,
  rows: [
    { k: { ru: 'Часы', en: 'Hours' }, v: { ru: '22:00–06:00, каждую ночь', en: '22:00–06:00, every night' } },
    { k: { ru: 'Шоу', en: 'Shows' }, v: { ru: '23:30 и 01:30', en: '23:30 and 01:30' } },
    { k: { ru: 'Дресс-код', en: 'Dress code' }, v: { ru: 'Элегантно, без спортивного', en: 'Smart, no sportswear' } },
    { k: { ru: 'Вход', en: 'Entry' }, v: { ru: 'Строго 18+, с паспортом', en: 'Strictly 18+, with ID' } },
  ] as { k: L; v: L }[],
  shot: { img: 'contacts-door.webp', loop: 'contacts-door-loop.mp4', alt: { ru: 'Вход в клуб: чёрная дверь, бархатный канат, снег на мокрой брусчатке', en: 'The way in: a black door, a velvet rope, snow on wet cobbles' } } as Shot,
};

/* ---------- Careers ---------- */

export const careers = {
  title: { ru: 'Собираем <em>первый состав</em>', en: 'Casting <em>the first company</em>' } as L,
  lead: { ru: 'HOTLAND открывается, и мы собираем труппу: артисток, хостес, бар и зал. Расскажите о себе, портфолио приветствуется.', en: 'HOTLAND is opening and we’re casting the company: artists, hosts, the bar and the floor. Tell us about yourself; a portfolio helps.' } as L,
  roles: [
    { ru: 'Артистки шоу', en: 'Show artists' },
    { ru: 'Хостес', en: 'Hostesses' },
    { ru: 'Официанты', en: 'Waiters' },
    { ru: 'Бармены', en: 'Bartenders' },
    { ru: 'Менеджеры зала', en: 'Floor managers' },
  ] as L[],
  cta: { ru: 'Написать в Telegram', en: 'Message us on Telegram' } as L,
  shot: { img: 'careers.webp', alt: { ru: 'Гримёрка: зеркало в лампах, багровая помада, серебряный гребень, веер из перьев, в зеркале никого', en: 'Dressing room: a bulb-lit mirror, crimson lipstick, a silver comb, a feather fan; the mirror is empty' } } as Shot,
};

/* ---------- Closing ---------- */

export const closing = {
  title: { ru: 'Ваш стол <em>уже ждёт</em>', en: 'Your table <em>is waiting</em>' } as L,
  text: { ru: 'Каждую ночь с 22:00. Что бы ни случилось, останется между нами.', en: 'Every night from 22:00. Whatever happens stays between us.' } as L,
};

/* ---------- Booking ---------- */

export const bookingFine: L = { ru: 'Депозит и минимальный счёт назовёт менеджер, когда подтвердит бронь.', en: 'Your host will tell you the deposit and minimum spend when confirming.' };

export const bookingTypes: { id: string; label: L }[] = [
  { id: 'table', label: { ru: 'Стол', en: 'Table' } },
  { id: 'vip', label: { ru: 'VIP-карта', en: 'VIP card' } },
  { id: 'set', label: { ru: 'Сет для стола', en: 'Bottle set' } },
  { id: 'lounge', label: { ru: 'Кальянная', en: 'Hookah lounge' } },
  { id: 'event', label: { ru: 'Праздник', en: 'A party' } },
  { id: 'ticket', label: { ru: 'Особый вечер', en: 'Special night' } },
];
