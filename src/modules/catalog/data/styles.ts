import type { Style } from '../model/catalog-types';

export const styles: Style[] = [
  {
    id: 'baroque',
    name: 'Барокко',
    coefficient: 1.8,
    description: 'Декоративный стиль с наиболее выразительным профилем и акцентной подачей.',
  },
  {
    id: 'minimalism',
    name: 'Минимализм',
    coefficient: 1,
    description: 'Самый сдержанный и лаконичный вариант без лишней декоративности.',
  },
  {
    id: 'rococo',
    name: 'Рококо',
    coefficient: 1.6,
    description: 'Декоративный профиль с мягкой пластикой и более насыщенным силуэтом.',
  },
  {
    id: 'classicism',
    name: 'Классицизм',
    coefficient: 1.4,
    description: 'Сдержанный классический стиль с читаемой формой и ровным ритмом.',
  },
  {
    id: 'art-deco',
    name: 'Ар-деко',
    coefficient: 1.5,
    description: 'Графичный декоративный стиль с контрастной и более современной подачей.',
  },
];

export const styleById = new Map(styles.map((style) => [style.id, style] as const));
