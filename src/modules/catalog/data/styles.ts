import type { Style } from '../model/catalog-types';

export const styles: Style[] = [
  {
    id: 'minimal',
    slug: 'minimal',
    name: 'Минимализм',
    coefficient: 1,
    description: 'Самый сдержанный вариант без дополнительной декоративности.',
  },
  {
    id: 'classic',
    slug: 'classic',
    name: 'Классика',
    coefficient: 1.18,
    description: 'Немного больше объёма и тепла, подходит для более насыщенной подачи.',
  },
  {
    id: 'gallery',
    slug: 'gallery',
    name: 'Галерейный',
    coefficient: 1.32,
    description: 'Выразительный профиль для плакатов и серийных развесок.',
  },
  {
    id: 'vintage',
    slug: 'vintage',
    name: 'Винтаж',
    coefficient: 1.45,
    description: 'Самый характерный стиль с акцентом на декоративность и глубину.',
  },
];

export const styleById = new Map(styles.map((style) => [style.id, style] as const));
