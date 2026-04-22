import type { Material } from '../model/catalog-types';
import frameWoodImg from '../../../shared/assets/images/frame_wood.png';
import frameMdfImg from '../../../shared/assets/images/frame_mdf.png';
import framePlasticImg from '../../../shared/assets/images/frame_plastic.png';
import frameAluminumImg from '../../../shared/assets/images/frame_aluminum.png';

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
    image: {
      src: frameWoodImg,
      alt: 'Натуральный дуб',
    },
    highlights: ['Натуральная текстура', 'Самый универсальный тон', 'Подходит для светлых интерьеров'],
  },
  {
    id: 'walnut-smoked',
    slug: 'walnut-smoked',
    title: 'МДФ',
    shortDescription: 'Плотный стабильный профиль для более классической подачи.',
    description:
      'МДФ подходит для более плотных рам и даёт понятную, устойчивую основу для интерьерных и галерейных решений.',
    pricePerCm: 22,
    swatchHex: '#6f4b33',
    image: {
      src: frameMdfImg,
      alt: 'МДФ',
    },
    highlights: ['Более выразительный контур', 'Подходит для тёмных акцентов', 'Хорош для крупных форматов'],
  },
  {
    id: 'ash-ivory',
    slug: 'ash-ivory',
    title: 'Пластик',
    shortDescription: 'Лёгкий нейтральный материал для современной подачи.',
    description:
      'Пластиковый профиль хорошо работает там, где нужно сохранить воздух и не перегружать стену массивным багетом.',
    pricePerCm: 17,
    swatchHex: '#d9c5a1',
    image: {
      src: framePlasticImg,
      alt: 'Пластик',
    },
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
    image: {
      src: frameAluminumImg,
      alt: 'Чёрный алюминий',
    },
    highlights: ['Чистый графичный контур', 'Самый лаконичный профиль', 'Сильный контраст на светлых стенах'],
  },
];

export const materialById = new Map(
  materials.map((material) => [material.id, material] as const),
);
