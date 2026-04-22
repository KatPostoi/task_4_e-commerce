import type { Material } from '../model/catalog-types';
import { createMockImage } from '../../../shared/lib/mock-image';

export const materials: Material[] = [
  {
    id: 'oak-natural',
    slug: 'oak-natural',
    title: 'Натуральный дуб',
    shortDescription: 'Тёплый древесный профиль для спокойных интерьерных работ.',
    description:
      'Натуральный дуб даёт мягкий, узнаваемый древесный тон и хорошо подходит для графики, постеров и небольших фотографий.',
    pricePerCm: 18,
    swatchHex: '#c89f6a',
    image: createMockImage('Натуральный дуб', {
      background: '#f7ecd9',
      accent: '#d5b07a',
      foreground: '#7c5632',
    }),
    highlights: ['Натуральная текстура', 'Самый универсальный тон', 'Подходит для светлых интерьеров'],
  },
  {
    id: 'walnut-smoked',
    slug: 'walnut-smoked',
    title: 'Копчёный орех',
    shortDescription: 'Глубокий тёмный материал с музейным характером.',
    description:
      'Копчёный орех даёт более плотную рамку и хорошо держит композицию вокруг контрастных отпечатков и классических постеров.',
    pricePerCm: 22,
    swatchHex: '#6f4b33',
    image: createMockImage('Копчёный орех', {
      background: '#efe0d4',
      accent: '#9a6b4d',
      foreground: '#4d2e1d',
    }),
    highlights: ['Более выразительный контур', 'Подходит для тёмных акцентов', 'Хорош для крупных форматов'],
  },
  {
    id: 'ash-ivory',
    slug: 'ash-ivory',
    title: 'Светлый ясень',
    shortDescription: 'Лёгкий нейтральный материал для современной подачи.',
    description:
      'Светлый ясень работает там, где нужно сохранить воздух и не перегружать стену массивным профилем.',
    pricePerCm: 17,
    swatchHex: '#d9c5a1',
    image: createMockImage('Светлый ясень', {
      background: '#faf3e8',
      accent: '#ead7b9',
      foreground: '#8b6d48',
    }),
    highlights: ['Мягкий нейтральный цвет', 'Подходит для минималистичных решений', 'Хорошо сочетается с белыми паспарту'],
  },
  {
    id: 'aluminum-black',
    slug: 'aluminum-black',
    title: 'Чёрный алюминий',
    shortDescription: 'Строгий графичный профиль с современным ощущением.',
    description:
      'Чёрный алюминий подходит для постеров, фотографий и типографики, где важен резкий аккуратный силуэт.',
    pricePerCm: 15,
    swatchHex: '#2d2f35',
    image: createMockImage('Чёрный алюминий', {
      background: '#efece8',
      accent: '#7b7d84',
      foreground: '#23252b',
    }),
    highlights: ['Чистый графичный контур', 'Самый лаконичный профиль', 'Сильный контраст на светлых стенах'],
  },
];

export const materialById = new Map(
  materials.map((material) => [material.id, material] as const),
);
