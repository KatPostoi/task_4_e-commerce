import type { ImageAsset } from '../../../shared/types/domain';
import { createMockImage } from '../../../shared/lib/mock-image';

export type AboutStat = {
  value: string;
  label: string;
};

export type AboutPrinciple = {
  id: string;
  title: string;
  description: string;
};

export type AboutStoryBlock = {
  id: string;
  title: string;
  description: string;
};

export type AboutPageContent = {
  eyebrow: string;
  title: string;
  summary: string;
  heroImage: ImageAsset;
  stats: AboutStat[];
  storyEyebrow: string;
  storyTitle: string;
  storyDescription: string;
  storyBlocks: AboutStoryBlock[];
  principlesEyebrow: string;
  principlesTitle: string;
  principlesDescription: string;
  principles: AboutPrinciple[];
};

export const aboutPageContent: AboutPageContent = {
  eyebrow: 'Baguette Workshop',
  title: 'Делаем рамки, которые не спорят с работой, а подчёркивают её.',
  summary:
    'Baguette Basket — это компактный MVP витрины багетной мастерской: готовые решения, конструктор индивидуальной рамы и понятный путь от выбора материала до заказа.',
  heroImage: createMockImage('О мастерской', {
    background: '#f8efe3',
    accent: '#e3c393',
    foreground: '#6f4424',
  }),
  stats: [
    {
      value: '4',
      label: 'базовых материала для быстрого выбора',
    },
    {
      value: '6',
      label: 'готовых позиций в стартовом каталоге',
    },
    {
      value: '24ч',
      label: 'на подтверждение и сбор локального заказа',
    },
  ],
  storyEyebrow: 'Что важно',
  storyTitle: 'Мы собираем мастерскую вокруг понятного выбора, а не вокруг перегруженного сервиса.',
  storyDescription:
    'В референсе много сложной инфраструктуры, но для MVP важнее оставить только полезный продуктовый путь: увидеть варианты, понять материалы, собрать собственную рамку и оформить локальный заказ.',
  storyBlocks: [
    {
      id: 'curation',
      title: 'Не каталог ради каталога',
      description:
        'Мы показываем ограниченный набор стартовых решений, чтобы пользователь не терялся в десятках однотипных карточек и быстрее находил подходящее настроение рамки.',
    },
    {
      id: 'path',
      title: 'Плавный переход к кастомному заказу',
      description:
        'Если готовый вариант не подходит, пользователь без авторизации переходит в конструктор, выбирает материал, размеры и сразу видит понятную стоимость.',
    },
    {
      id: 'mvp',
      title: 'Только то, что реально работает в MVP',
      description:
        'Никаких личных кабинетов, админок и скрытых flows: вся основная логика собирается на фронтенде, а изменяемые данные живут в `localStorage`.',
    },
  ],
  principlesEyebrow: 'Наш подход',
  principlesTitle: 'Принципы, которые держат и визуал, и архитектуру проекта.',
  principlesDescription:
    'Мы переносим из референса не технический шум, а только полезный визуальный ритм и продуктовые ориентиры.',
  principles: [
    {
      id: 'precision',
      title: 'Точная геометрия',
      description:
        'Мы исходим не из шаблонного ассортимента, а из размеров конкретной работы и реальных пропорций будущей рамы.',
    },
    {
      id: 'materials',
      title: 'Материалы с понятным характером',
      description:
        'В MVP оставлены только материалы и стили, которые действительно читаются и легко сравниваются между собой.',
    },
    {
      id: 'clarity',
      title: 'Прозрачный процесс',
      description:
        'Каждый шаг от подбора багета до доставки описан простым языком и не требует личного кабинета или сложных сценариев.',
    },
  ],
};
