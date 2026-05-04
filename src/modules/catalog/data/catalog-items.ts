import type { CatalogItem } from '../model/catalog-types';
import catalogImage21 from '../../../shared/assets/images/catalog/2.1.png';
import catalogImage22 from '../../../shared/assets/images/catalog/2.2.png';
import catalogImage23 from '../../../shared/assets/images/catalog/2.3.png';
import catalogImage24 from '../../../shared/assets/images/catalog/2.4.png';
import catalogImage25 from '../../../shared/assets/images/catalog/2.5.png';
import catalogImage26 from '../../../shared/assets/images/catalog/2.6.png';
import catalogImage27 from '../../../shared/assets/images/catalog/2.7.png';
import catalogImage28 from '../../../shared/assets/images/catalog/2.8.png';
import catalogImage29 from '../../../shared/assets/images/catalog/2.9.png';
import catalogImage210 from '../../../shared/assets/images/catalog/2.10.png';
import catalogImage211 from '../../../shared/assets/images/catalog/2.11.png';
import catalogImage212 from '../../../shared/assets/images/catalog/2.12.png';
import { materialById } from './materials';
import { styleById } from './styles';

type CatalogSeedItem = Omit<CatalogItem, 'material' | 'style' | 'source'> & {
  materialId: number;
  styleId: string | null;
};

const catalogItemsSeed: CatalogSeedItem[] = [
  {
    id: 'frame-1',
    slug: 'baguette-1',
    title: 'Деревянный багет',
    description: '6144 руб./м.п',
    colorLabel: 'Коричневый',
    size: { widthCm: 25, heightCm: 25 },
    price: 6144,
    stock: 1,
    image: {
      src: catalogImage21,
      alt: 'goodsFrame',
    },
    materialId: 1,
    styleId: 'minimalism',
  },
  {
    id: 'frame-2',
    slug: 'baguette-2',
    title: 'Деревянный багет',
    description: '11700 руб./м.п',
    colorLabel: 'Золотой',
    size: { widthCm: 25, heightCm: 25 },
    price: 11700,
    stock: 1,
    image: {
      src: catalogImage22,
      alt: 'goodsFrame',
    },
    materialId: 1,
    styleId: 'baroque',
  },
  {
    id: 'frame-3',
    slug: 'baguette-3',
    title: 'Деревянный багет',
    description: '11250 руб./м.п',
    colorLabel: 'Бронзовый',
    size: { widthCm: 25, heightCm: 25 },
    price: 11250,
    stock: 1,
    image: {
      src: catalogImage23,
      alt: 'goodsFrame',
    },
    materialId: 1,
    styleId: 'rococo',
  },
  {
    id: 'frame-4',
    slug: 'baguette-4',
    title: 'Деревянный багет',
    description: '2300 руб./м.п',
    colorLabel: 'Коричневый',
    size: { widthCm: 25, heightCm: 25 },
    price: 2300,
    stock: 1,
    image: {
      src: catalogImage24,
      alt: 'goodsFrame',
    },
    materialId: 1,
    styleId: 'classicism',
  },
  {
    id: 'frame-5',
    slug: 'baguette-5',
    title: 'Пластиковый багет',
    description: '2865 руб./м.п',
    colorLabel: 'Черный',
    size: { widthCm: 25, heightCm: 25 },
    price: 2865,
    stock: 1,
    image: {
      src: catalogImage25,
      alt: 'goodsFrame',
    },
    materialId: 2,
    styleId: 'minimalism',
  },
  {
    id: 'frame-6',
    slug: 'baguette-6',
    title: 'Пластиковый багет',
    description: '1350 руб./м.п',
    colorLabel: 'Черно-золотой',
    size: { widthCm: 25, heightCm: 25 },
    price: 1350,
    stock: 1,
    image: {
      src: catalogImage26,
      alt: 'goodsFrame',
    },
    materialId: 2,
    styleId: 'art-deco',
  },
  {
    id: 'frame-7',
    slug: 'baguette-7',
    title: 'Пластиковый багет',
    description: '2675 руб./м.п',
    colorLabel: 'Молочный',
    size: { widthCm: 25, heightCm: 25 },
    price: 2675,
    stock: 1,
    image: {
      src: catalogImage27,
      alt: 'goodsFrame',
    },
    materialId: 2,
    styleId: 'minimalism',
  },
  {
    id: 'frame-8',
    slug: 'baguette-8',
    title: 'Пластиковый багет',
    description: '2675 руб./м.п',
    colorLabel: 'Коричневый',
    size: { widthCm: 25, heightCm: 25 },
    price: 2675,
    stock: 1,
    image: {
      src: catalogImage28,
      alt: 'goodsFrame',
    },
    materialId: 2,
    styleId: 'minimalism',
  },
  {
    id: 'frame-9',
    slug: 'baguette-9',
    title: 'Деревянный багет',
    description: '2800 руб./м.п',
    colorLabel: 'Розовый',
    size: { widthCm: 25, heightCm: 25 },
    price: 2800,
    stock: 1,
    image: {
      src: catalogImage29,
      alt: 'goodsFrame',
    },
    materialId: 1,
    styleId: 'minimalism',
  },
  {
    id: 'frame-10',
    slug: 'baguette-10',
    title: 'Алюминиевый багет',
    description: '2800 руб./м.п',
    colorLabel: 'Белый',
    size: { widthCm: 25, heightCm: 25 },
    price: 2800,
    stock: 1,
    image: {
      src: catalogImage210,
      alt: 'goodsFrame',
    },
    materialId: 4,
    styleId: 'minimalism',
  },
  {
    id: 'frame-11',
    slug: 'baguette-11',
    title: 'Алюминиевый багет',
    description: '1200 руб./м.п',
    colorLabel: 'Коричневый',
    size: { widthCm: 25, heightCm: 25 },
    price: 1200,
    stock: 1,
    image: {
      src: catalogImage211,
      alt: 'goodsFrame',
    },
    materialId: 4,
    styleId: 'minimalism',
  },
  {
    id: 'frame-12',
    slug: 'baguette-12',
    title: 'Алюминиевый багет',
    description: '2600 руб./м.п',
    colorLabel: 'Золотой',
    size: { widthCm: 25, heightCm: 25 },
    price: 2600,
    stock: 1,
    image: {
      src: catalogImage212,
      alt: 'goodsFrame',
    },
    materialId: 4,
    styleId: 'minimalism',
  },
];

export const catalogItems: CatalogItem[] = catalogItemsSeed.map(
  ({ materialId, styleId, ...item }) => {
    const material = materialById.get(materialId);

    if (!material) {
      throw new Error(`Unknown material: ${materialId}`);
    }

    const style = styleId ? styleById.get(styleId) ?? null : null;

    if (styleId && !style) {
      throw new Error(`Unknown style: ${styleId}`);
    }

    return {
      ...item,
      source: 'default',
      material: {
        id: material.id,
        title: material.title,
        material: material.material,
        description: material.description,
        pricePerCm: material.pricePerCm,
        swatchHex: material.swatchHex,
        image: material.image,
      },
      style: style
        ? {
            id: style.id,
            name: style.name,
            coefficient: style.coefficient,
          }
        : null,
    };
  },
);

export const catalogItemById = new Map(
  catalogItems.map((catalogItem) => [catalogItem.id, catalogItem] as const),
);
