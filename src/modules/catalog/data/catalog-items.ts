import type { CatalogItem } from '../model/catalog-types';
import { materialById } from './materials';
import { styleById } from './styles';
import catalogImage21 from '../../../shared/assets/images/catalog/2.1.png';
import catalogImage22 from '../../../shared/assets/images/catalog/2.2.png';
import catalogImage23 from '../../../shared/assets/images/catalog/2.3.png';
import catalogImage24 from '../../../shared/assets/images/catalog/2.4.png';
import catalogImage25 from '../../../shared/assets/images/catalog/2.5.png';
import catalogImage26 from '../../../shared/assets/images/catalog/2.6.png';

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
    image: {
      src: catalogImage21,
      alt: 'Rhythm 30×40',
    },
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
    image: {
      src: catalogImage22,
      alt: 'Cabinet 40×50',
    },
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
    image: {
      src: catalogImage23,
      alt: 'Studio 50×70',
    },
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
    image: {
      src: catalogImage24,
      alt: 'Noir 30×30',
    },
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
    image: {
      src: catalogImage25,
      alt: 'Museum 60×80',
    },
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
    image: {
      src: catalogImage26,
      alt: 'Lightline 21×30',
    },
    materialId: 'ash-ivory',
    styleId: 'minimal',
  },
];

export const catalogItemById = new Map(
  catalogItems.map((catalogItem) => [catalogItem.id, catalogItem] as const),
);
