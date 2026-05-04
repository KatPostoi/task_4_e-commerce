import type {
  Material,
  MaterialSnapshot,
  Style,
  StyleSnapshot,
} from '../../catalog/model/catalog-types';
import type {
  DimensionsCm,
  EntityId,
  ImageAsset,
  PersistedCollection,
  TimestampedRecord,
} from '../../../shared/types/domain';
import {
  asNumber,
  asNullableString,
  asString,
  createPersistedCollection,
  isObjectRecord,
  normalizeDimensions,
  normalizeImageAsset,
  normalizePersistedCollection,
} from '../../../shared/lib/guards';

export type ConstructorFormValues = {
  widthInput: string;
  heightInput: string;
  materialId: Material['id'] | null;
  styleId: Style['id'] | null;
  note: string;
};

export type ConstructorNormalizedDimensions = DimensionsCm;

export type ConstructorDraft = {
  material: Material;
  style: Style;
  dimensions: ConstructorNormalizedDimensions;
  note: string;
  price: number;
};

export type CustomFrame = TimestampedRecord & {
  id: EntityId;
  slug: string;
  source: 'custom';
  title: string;
  description: string;
  size: DimensionsCm;
  price: number;
  image: ImageAsset;
  material: MaterialSnapshot;
  style: StyleSnapshot;
  note: string | null;
};

export type CustomFramesState = PersistedCollection<CustomFrame>;

const normalizeMaterialSnapshot = (value: unknown): MaterialSnapshot | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const rawId =
    typeof value.id === 'number'
      ? value.id
      : typeof value.id === 'string'
        ? Number(value.id)
        : NaN;
  const id = Number.isInteger(rawId) && rawId > 0 ? rawId : NaN;
  const title = asString(value.title);
  const pricePerCm = asNumber(value.pricePerCm, NaN);
  const swatchHex = asString(value.swatchHex);

  if (!Number.isFinite(id) || !title || !Number.isFinite(pricePerCm) || !swatchHex) {
    return null;
  }

  return { id, title, pricePerCm, swatchHex };
};

const normalizeStyleSnapshot = (value: unknown): StyleSnapshot | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const id = asString(value.id);
  const name = asString(value.name);
  const coefficient = asNumber(value.coefficient, NaN);

  if (!id || !name || !Number.isFinite(coefficient)) {
    return null;
  }

  return { id, name, coefficient };
};

export const createEmptyCustomFramesState = (): CustomFramesState => {
  return createPersistedCollection<CustomFrame>();
};

export const normalizeCustomFrame = (value: unknown): CustomFrame | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const id = asString(value.id);
  const slug = asString(value.slug, id);
  const title = asString(value.title);
  const description = asString(value.description);
  const size = normalizeDimensions(value.size);
  const price = asNumber(value.price, NaN);
  const image = normalizeImageAsset(value.image);
  const material = normalizeMaterialSnapshot(value.material);
  const style = normalizeStyleSnapshot(value.style);
  const note = asNullableString(value.note);
  const createdAt = asString(value.createdAt);
  const updatedAt = asString(value.updatedAt, createdAt);

  if (
    !id ||
    !slug ||
    !title ||
    !description ||
    !size ||
    !Number.isFinite(price) ||
    !image ||
    !material ||
    !style ||
    !createdAt ||
    !updatedAt
  ) {
    return null;
  }

  return {
    id,
    slug,
    source: 'custom',
    title,
    description,
    size,
    price,
    image,
    material,
    style,
    note,
    createdAt,
    updatedAt,
  };
};

export const normalizeCustomFramesState = (
  value: unknown,
): CustomFramesState => {
  return normalizePersistedCollection(value, normalizeCustomFrame);
};
