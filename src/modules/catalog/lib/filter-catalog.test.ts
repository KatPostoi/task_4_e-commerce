import { describe, expect, it } from 'vitest';
import { createCatalogItem } from '../../../test/fixtures';
import { filterCatalog } from './filter-catalog';

describe('filterCatalog', () => {
  const items = [
    createCatalogItem({
      id: 'wood-classic',
      material: {
        id: 1,
        title: 'Дерево',
        material: 'wood',
        description: 'Деревянная рама',
        pricePerCm: 30,
        swatchHex: '#AA7744',
        image: {
          src: '/wood.png',
          alt: 'Wood frame',
        },
      },
      style: {
        id: 'classic',
        name: 'Классика',
        coefficient: 1.2,
      },
    }),
    createCatalogItem({
      id: 'metal-modern',
      material: {
        id: 2,
        title: 'Металл',
        material: 'metal',
        description: 'Металлическая рама',
        pricePerCm: 40,
        swatchHex: '#777777',
        image: {
          src: '/metal.png',
          alt: 'Metal frame',
        },
      },
      style: {
        id: 'modern',
        name: 'Модерн',
        coefficient: 1.4,
      },
    }),
    createCatalogItem({
      id: 'metal-no-style',
      material: {
        id: 2,
        title: 'Металл',
        material: 'metal',
        description: 'Металлическая рама без стиля',
        pricePerCm: 35,
        swatchHex: '#666666',
        image: {
          src: '/metal-2.png',
          alt: 'Metal frame 2',
        },
      },
      style: null,
    }),
  ];

  it('returns all items when filters are empty', () => {
    expect(
      filterCatalog(items, {
        materialId: null,
        styleId: null,
      }),
    ).toHaveLength(3);
  });

  it('filters by material and style together', () => {
    expect(
      filterCatalog(items, {
        materialId: 2,
        styleId: 'modern',
      }).map((item) => item.id),
    ).toEqual(['metal-modern']);
  });

  it('excludes items with null style when a style filter is provided', () => {
    expect(
      filterCatalog(items, {
        materialId: 2,
        styleId: 'classic',
      }),
    ).toEqual([]);
  });
});
