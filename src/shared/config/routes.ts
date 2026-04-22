export const routeSegments = {
  about: '',
  process: 'process',
  contacts: 'contacts',
  catalog: 'catalog',
  design: 'design',
  basket: 'basket',
} as const;

export type AppRouteKey = keyof typeof routeSegments;

export const routePaths = {
  about: '/',
  process: '/process',
  contacts: '/contacts',
  catalog: '/catalog',
  design: '/design',
  basket: '/basket',
} as const satisfies Record<AppRouteKey, string>;

export type PublicRouteItem = {
  key: AppRouteKey;
  label: string;
  path: (typeof routePaths)[AppRouteKey];
  description: string;
};

export const publicRouteItems = [
  {
    key: 'about',
    label: 'О нас',
    path: routePaths.about,
    description: 'Входная страница и история мастерской.',
  },
  {
    key: 'process',
    label: 'Процесс',
    path: routePaths.process,
    description: 'Путь от выбора багета до готовой рамы.',
  },
  {
    key: 'contacts',
    label: 'Контакты',
    path: routePaths.contacts,
    description: 'Минимальная публичная страница с контактами.',
  },
  {
    key: 'catalog',
    label: 'Каталог',
    path: routePaths.catalog,
    description: 'Витрина готовых товаров и материалов.',
  },
  {
    key: 'design',
    label: 'Конструктор',
    path: routePaths.design,
    description: 'Сборка кастомной рамы без авторизации.',
  },
  {
    key: 'basket',
    label: 'Корзина',
    path: routePaths.basket,
    description: 'Локальная корзина и будущий checkout.',
  },
] as const satisfies readonly PublicRouteItem[];
