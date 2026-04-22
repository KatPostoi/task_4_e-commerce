import type {
  DimensionsCm,
  EntityId,
  ImageAsset,
} from '../../../shared/types/domain';

export type Material = {
  id: EntityId;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  pricePerCm: number;
  swatchHex: string;
  image: ImageAsset;
  highlights: string[];
};

export type MaterialSnapshot = Pick<
  Material,
  'id' | 'title' | 'pricePerCm' | 'swatchHex'
>;

export type Style = {
  id: EntityId;
  slug: string;
  name: string;
  coefficient: number;
  description: string;
};

export type StyleSnapshot = Pick<Style, 'id' | 'name' | 'coefficient'>;

export type CatalogItem = {
  id: EntityId;
  slug: string;
  title: string;
  description: string;
  source: 'default';
  colorLabel: string;
  size: DimensionsCm;
  price: number;
  stock: number;
  image: ImageAsset;
  materialId: Material['id'];
  styleId: Style['id'] | null;
};
