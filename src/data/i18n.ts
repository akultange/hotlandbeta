export const langs = ['ru', 'en'] as const;
export type Lang = (typeof langs)[number];
export type L = { ru: string; en: string };

export const tr = (l: L, lang: Lang) => l[lang];
export const langPaths = () => langs.map((lang) => ({ params: { lang } }));

/** Same page in another language. */
export function altPath(path: string, lang: Lang) {
  return /^\/(ru|en)(\/|$)/.test(path) ? path.replace(/^\/(ru|en)/, `/${lang}`) : `/${lang}/`;
}

export const ui = {
  ru: {
    nav: { about: 'О нас', program: 'Афиша', artists: 'Шоу', vip: 'Членство', menu: 'Меню', gallery: 'Галерея' },
    // the short form is only for the header pill and the phone dock; everywhere else the button says it in full
    book: 'Забронировать',
    bookTable: 'Забронировать стол',
    menuOpen: 'Меню',
    menuClose: 'Закрыть',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    call: 'Позвонить',
    directions: 'Маршрут',
    more: 'Подробнее',
    entry: 'Вход',
    priceOnRequest: 'Цена по запросу',
    gate: {
      title: 'Вам есть 18?',
      text: 'За этой дверью мужской клуб',
      yes: 'Да, мне есть 18',
      no: 'Нет',
      bye: 'Клуб и сайт только для совершеннолетних.',
    },
    footer: {
      club: 'Клуб', visit: 'Визит', contact: 'Связь', other: 'Ещё',
      careers: 'Вакансии', terms: 'Условия брони', privacy: 'Конфиденциальность', cookies: 'Cookies',
      rules: 'Правила дома', map: 'Карта', parties: 'Праздники',
      adults: 'Сайт содержит информацию для взрослых.',
      credit: 'Сайт сделали в LADZE studio',
    },
    form: {
      type: 'Что бронируем',
      guests: 'Гостей', occasion: 'Повод', wishes: 'Пожелания',
      name: 'Имя', phone: 'Телефон', messenger: 'Как с вами связаться',
      consent: 'Мне есть 18 лет, принимаю политику конфиденциальности',
      submit: 'Отправить',
      faster: 'Быстрее в мессенджере',
      termsTitle: 'Коротко об условиях',
      terms: ['Депозит и минимальный счёт назовёт менеджер, когда подтвердит бронь.', 'Телефон отдыхает у входа в запечатанном чехле до конца вечера.', 'Фото и видео в зале запрещены. Без исключений.', 'Вход строго 18+, с паспортом. Дресс-код: элегантно, без спортивного.'],
      allTerms: 'Все условия',
      occasions: { none: 'Без повода', birthday: 'День рождения', bachelor: 'Мальчишник', corporate: 'Корпоратив', hire: 'Клуб целиком', other: 'Другое' },
      call: 'Звонок',
      sending: 'Отправляем…',
      failTitle: 'Не получилось отправить заявку',
      failText: 'Всё, что вы ввели, сохранено: попробуйте отправить ещё раз. Или отправьте заявку в WhatsApp, данные уже в сообщении.',
      sendWa: 'В WhatsApp',
      retry: 'Отправить ещё раз',
    },
    waHello: 'Здравствуйте! Хочу забронировать в HOTLAND',
  },
  en: {
    nav: { about: 'About us', program: 'Events', artists: 'The show', vip: 'Membership', menu: 'Menu', gallery: 'Gallery' },
    book: 'Book',
    bookTable: 'Book a table',
    menuOpen: 'Menu',
    menuClose: 'Close',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    call: 'Call',
    directions: 'Directions',
    more: 'Learn more',
    entry: 'Entry',
    priceOnRequest: 'Price on request',
    gate: {
      title: 'Are you 18 or over?',
      text: 'Behind this door is a gentlemen’s club',
      yes: 'Yes, I’m 18+',
      no: 'No',
      bye: 'The club and this site are for adults only.',
    },
    footer: {
      club: 'Club', visit: 'Visit', contact: 'Contact', other: 'More',
      careers: 'Careers', terms: 'Booking terms', privacy: 'Privacy', cookies: 'Cookies',
      rules: 'House rules', map: 'Map', parties: 'Parties',
      adults: 'This site contains content for adults.',
      credit: 'Site by LADZE studio',
    },
    form: {
      type: 'What are you booking',
      guests: 'Guests', occasion: 'Occasion', wishes: 'Anything we should know',
      name: 'Name', phone: 'Phone', messenger: 'How should we reach you',
      consent: 'I’m over 18, and I accept the privacy policy',
      submit: 'Send',
      faster: 'Quicker by message',
      termsTitle: 'Terms in short',
      terms: ['Your manager will tell you the deposit and minimum spend when confirming.', 'Your phone rests at the door, sealed in a pouch until you leave.', 'No photos or video inside. No exceptions.', 'Strictly 18+, with ID. Dress code: smart, no sportswear.'],
      allTerms: 'Full terms',
      occasions: { none: 'No occasion', birthday: 'Birthday', bachelor: 'Bachelor party', corporate: 'Corporate night', hire: 'The whole club', other: 'Other' },
      call: 'Phone call',
      sending: 'Sending…',
      failTitle: 'We couldn’t send your request',
      failText: 'Nothing you typed is lost: try sending it again. Or send it on WhatsApp, your details are already in the message.',
      sendWa: 'Send on WhatsApp',
      retry: 'Try again',
    },
    waHello: 'Hello! I’d like to book at HOTLAND',
  },
} as const;
