import type { CatalogItem } from '../model/catalog-types';
import { createMockImage } from '../../../shared/lib/mock-image';
import { materialById } from './materials';
import { styleById } from './styles';

const calculateCatalogPrice = (
  widthCm: number,
  heightCm: number,
  materialId: string,
  styleId: string | null,
) => {
  const material = materialById.get(materialId);
  const style = styleId ? styleById.get(styleId) : null;

  if (!material) {
    return 0;
  }

  return Math.round(
    (widthCm + heightCm) * material.pricePerCm * (style?.coefficient ?? 1),
  );
};

export const catalogItems: CatalogItem[] = [
  {
    id: 'frame-rhythm',
    slug: 'frame-rhythm',
    title: 'Rhythm 30×40',
    description:
      'Лёгкая дубовая рамка для постеров и графики, когда нужен спокойный акцент без лишней тяжести.',
    source: 'default',
    colorLabel: 'тёплый дуб',
    size: { widthCm: 30, heightCm: 40 },
    price: calculateCatalogPrice(30, 40, 'oak-natural', 'minimal'),
    stock: 8,
    image: createMockImage('Rhythm 30x40', {
      background: '#fbf3e6',
      accent: '#d7b17a',
      foreground: '#7c5632',
    }),
    materialId: 'oak-natural',
    styleId: 'minimal',
  },
  {
    id: 'frame-cabinet',
    slug: 'frame-cabinet',
    title: 'Cabinet 40×50',
    description:
      'Более плотная рама в копчёном орехе для фото, принтов и типографики в камерных интерьерах.',
    source: 'default',
    colorLabel: 'тёмный орех',
    size: { widthCm: 40, heightCm: 50 },
    price: calculateCatalogPrice(40, 50, 'walnut-smoked', 'classic'),
    stock: 4,
    image: createMockImage('Cabinet 40x50', {
      background: '#f3e6db',
      accent: '#a97759',
      foreground: '#4d2e1d',
    }),
    materialId: 'walnut-smoked',
    styleId: 'classic',
  },
  {
    id: 'frame-studio',
    slug: 'frame-studio',
    title: 'Studio 50×70',
    description:
      'Галерейный формат для постеров среднего размера и серийных композиций на одной стене.',
    source: 'default',
    colorLabel: 'светлый ясень',
    size: { widthCm: 50, heightCm: 70 },
    price: calculateCatalogPrice(50, 70, 'ash-ivory', 'gallery'),
    stock: 6,
    image: createMockImage('Studio 50x70', {
      background: '#faf2e8',
      accent: '#ead8bf',
      foreground: '#8b6d48',
    }),
    materialId: 'ash-ivory',
    styleId: 'gallery',
  },
  {
    id: 'frame-noir',
    slug: 'frame-noir',
    title: 'Noir 30×30',
    description:
      'Квадратная чёрная рамка для обложек, небольших арт-принтов и контрастных типографических серий.',
    source: 'default',
    colorLabel: 'матовый графит',
    size: { widthCm: 30, heightCm: 30 },
    price: calculateCatalogPrice(30, 30, 'aluminum-black', 'gallery'),
    stock: 10,
    image: createMockImage('Noir 30x30', {
      background: '#efede9',
      accent: '#8b8c93',
      foreground: '#23252b',
    }),
    materialId: 'aluminum-black',
    styleId: 'gallery',
  },
  {
    id: 'frame-museum',
    slug: 'frame-museum',
    title: 'Museum 60×80',
    description:
      'Крупный формат с декоративным характером, когда рама должна стать полноправной частью композиции.',
    source: 'default',
    colorLabel: 'ореховый винтаж',
    size: { widthCm: 60, heightCm: 80 },
    price: calculateCatalogPrice(60, 80, 'walnut-smoked', 'vintage'),
    stock: 2,
    image: createMockImage('Museum 60x80', {
      background: '#f0e2d6',
      accent: '#b07a57',
      foreground: '#593522',
    }),
    materialId: 'walnut-smoked',
    styleId: 'vintage',
  },
  {
    id: 'frame-lightline',
    slug: 'frame-lightline',
    title: 'Lightline 21×30',
    description:
      'Самый лёгкий стартовый формат для открыток, небольших иллюстраций и серий на полке.',
    source: 'default',
    colorLabel: 'светлый нейтральный',
    size: { widthCm: 21, heightCm: 30 },
    price: calculateCatalogPrice(21, 30, 'ash-ivory', 'minimal'),
    stock: 12,
    image: createMockImage('Lightline 21x30', {
      background: '#fcf5eb',
      accent: '#ecdbbf',
      foreground: '#92714c',
    }),
    materialId: 'ash-ivory',
    styleId: 'minimal',
  },
];

export const catalogItemById = new Map(
  catalogItems.map((catalogItem) => [catalogItem.id, catalogItem] as const),
);
