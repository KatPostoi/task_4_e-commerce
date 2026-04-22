import type { Material, Style } from '../model/catalog-types';

export type MaterialOption = {
  id: Material['id'];
  label: string;
  pricePerCm: number;
};

export type StyleOption = {
  id: Style['id'];
  label: string;
  coefficient: number;
};

export const buildMaterialOptions = (
  items: readonly Material[],
): MaterialOption[] => {
  return [...items]
    .sort((left, right) => left.title.localeCompare(right.title, 'ru'))
    .map((item) => ({
      id: item.id,
      label: item.title,
      pricePerCm: item.pricePerCm,
    }));
};

export const buildStyleOptions = (items: readonly Style[]): StyleOption[] => {
  return [...items]
    .sort((left, right) => left.name.localeCompare(right.name, 'ru'))
    .map((item) => ({
      id: item.id,
      label: item.name,
      coefficient: item.coefficient,
    }));
};
