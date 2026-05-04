import type { Material, Style } from '../model/catalog-types';
import type { CatalogItem } from '../model/catalog-types';

export type CatalogFilters = {
  materialId: Material['id'] | null;
  styleId: Style['id'] | null;
};

export const filterCatalog = (
  items: readonly CatalogItem[],
  filters: CatalogFilters,
) => {
  return items.filter((item) => {
    const matchesMaterial =
      filters.materialId === null || item.material.id === filters.materialId;
    const matchesStyle =
      filters.styleId === null || item.style?.id === filters.styleId;

    return matchesMaterial && matchesStyle;
  });
};
