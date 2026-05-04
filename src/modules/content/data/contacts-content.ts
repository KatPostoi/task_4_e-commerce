export type ContactLink = {
  label: string;
  href: string;
};

export type ContactsContent = {
  address: string[];
  phone: string;
  email: string;
  workingHours: string[];
  socials: ContactLink[];
};

export const contactsContent: ContactsContent = {
  address: ['г. Ростов-на-Дону, ул. Текучёва 189, стр. 1'],
  phone: '+7 903 777 17 90',
  email: 'info@frame.ru',
  workingHours: ['Пн-Пт: 10:00-19:00', 'Сб-Вс: 11:00-17:00'],
  socials: [
    {
      label: 'Telegram',
      href: 'https://t.me/baguettebasket',
    },
    {
      label: 'VK',
      href: 'https://vk.com/baguettebasket',
    },
  ],
};
