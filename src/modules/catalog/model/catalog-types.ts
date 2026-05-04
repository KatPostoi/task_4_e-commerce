import type {
  DimensionsCm,
  EntityId,
  ImageAsset,
} from '../../../shared/types/domain';

export type Material = {
  id: number;
  title: string;
  material: string;
  description: string;
  pricePerCm: number;
  swatchHex: string;
  image: ImageAsset;
};

export type MaterialSnapshot = Pick<
  Material,
  'id' | 'title' | 'pricePerCm' | 'swatchHex'
>;

export type CatalogMaterial = Pick<
  Material,
  'id' | 'title' | 'material' | 'description' | 'pricePerCm' | 'swatchHex' | 'image'
>;

export type Style = {
  id: EntityId;
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
  material: CatalogMaterial;
  style: StyleSnapshot | null;
};
