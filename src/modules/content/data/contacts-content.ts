export type ContactLink = {
  label: string;
  href: string;
};

export type ContactsContent = {
  eyebrow: string;
  title: string;
  summary: string;
  quickInfoTitle: string;
  quickInfoDescription: string;
  studioTitle: string;
  studioDescription: string;
  responseTitle: string;
  responseDescription: string;
  visitNotes: string[];
  address: string[];
  phone: string;
  email: string;
  workingHours: string[];
  socials: ContactLink[];
};

export const contactsContent: ContactsContent = {
  eyebrow: 'Связаться с мастерской',
  title: 'Минимальные контакты для MVP.',
  summary:
    'Пока страница контактов остаётся компактной: только адрес, способы связи, часы работы и внешние ссылки без лишних секций.',
  quickInfoTitle: 'Связь без посредников',
  quickInfoDescription:
    'Мы оставляем только реальные каналы связи: телефон, email и быстрые внешние ссылки. Без фальшивых внутренних страниц и без декоративных секций.',
  studioTitle: 'Шоу-рум и самовывоз',
  studioDescription:
    'Небольшая офлайн-точка нужна не для формальности, а чтобы пользователь понимал, где посмотреть образцы и куда приедет заказ.',
  responseTitle: 'Как лучше связаться',
  responseDescription:
    'Быстрее всего мы реагируем на звонок или короткое сообщение с размерами и типом работы. Email удобен, если нужно приложить фотографии, референсы и подробности задачи.',
  visitNotes: [
    'Для самовывоза достаточно заранее подтвердить готовность заказа по телефону или в мессенджере.',
    'Если нужен нестандартный формат, лучше сразу отправить размеры и короткое описание задачи.',
    'Соцсети оставлены как быстрые внешние точки контакта, но основная коммуникация идёт через телефон и email.',
  ],
  address: ['Москва, Нижняя Красносельская, 35с1', 'Шоу-рум и точка самовывоза'],
  phone: '+7 (999) 123-45-67',
  email: 'hello@baguettebasket.ru',
  workingHours: ['Пн-Пт: 10:00-19:00', 'Сб-Вс: 11:00-17:00'],
  socials: [
    {
      label: 'Telegram',
      href: 'https://t.me/baguettebasket',
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/79991234567',
    },
    {
      label: 'Pinterest',
      href: 'https://www.pinterest.com/baguettebasket/',
    },
  ],
};
