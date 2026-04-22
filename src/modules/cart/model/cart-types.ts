import type {
  MaterialSnapshot,
  StyleSnapshot,
} from '../../catalog/model/catalog-types';
import type { DeliveryService } from '../../delivery/model/delivery-types';
import type {
  DimensionsCm,
  EntityId,
  FrameSource,
  ImageAsset,
  PersistedCollection,
  TimestampedRecord,
} from '../../../shared/types/domain';
import {
  asNumber,
  asPositiveInteger,
  asString,
  createPersistedCollection,
  isObjectRecord,
  normalizeDimensions,
  normalizeImageAsset,
  normalizePersistedCollection,
} from '../../../shared/lib/guards';

export type ProductSnapshot = {
  id: EntityId;
  source: FrameSource;
  slug: string;
  title: string;
  description: string;
  image: ImageAsset;
  size: DimensionsCm;
  colorLabel: string;
  unitPrice: number;
  material: MaterialSnapshot;
  style: StyleSnapshot | null;
};

export type CartItem = TimestampedRecord & {
  id: EntityId;
  productId: EntityId;
  source: FrameSource;
  quantity: number;
  snapshot: ProductSnapshot;
};

export type CartState = PersistedCollection<CartItem>;

export type DeliverySelection = {
  serviceId: DeliveryService['id'];
  title: string;
  price: number;
};

export type CartTotals = {
  itemsCount: number;
  itemsTotal: number;
  deliveryTotal: number;
  discountTotal: number;
  grandTotal: number;
};

const normalizeMaterialSnapshot = (value: unknown): MaterialSnapshot | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const id = asString(value.id);
  const title = asString(value.title);
  const pricePerCm = asNumber(value.pricePerCm, NaN);
  const swatchHex = asString(value.swatchHex);

  if (!id || !title || !Number.isFinite(pricePerCm) || !swatchHex) {
    return null;
  }

  return { id, title, pricePerCm, swatchHex };
};

const normalizeStyleSnapshot = (value: unknown): StyleSnapshot | null => {
  if (value === null) {
    return null;
  }

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

export const normalizeProductSnapshot = (
  value: unknown,
): ProductSnapshot | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const id = asString(value.id);
  const source = value.source === 'custom' ? 'custom' : 'default';
  const slug = asString(value.slug, id);
  const title = asString(value.title);
  const description = asString(value.description);
  const image = normalizeImageAsset(value.image);
  const size = normalizeDimensions(value.size);
  const colorLabel = asString(value.colorLabel);
  const unitPrice = asNumber(value.unitPrice, NaN);
  const material = normalizeMaterialSnapshot(value.material);
  const style = normalizeStyleSnapshot(value.style);

  if (
    !id ||
    !slug ||
    !title ||
    !description ||
    !image ||
    !size ||
    !colorLabel ||
    !Number.isFinite(unitPrice) ||
    !material
  ) {
    return null;
  }

  return {
    id,
    source,
    slug,
    title,
    description,
    image,
    size,
    colorLabel,
    unitPrice,
    material,
    style,
  };
};

export const createEmptyCartState = (): CartState => {
  return createPersistedCollection<CartItem>();
};

export const normalizeCartItem = (value: unknown): CartItem | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const id = asString(value.id);
  const productId = asString(value.productId);
  const source = value.source === 'custom' ? 'custom' : 'default';
  const quantity = asPositiveInteger(value.quantity);
  const snapshot = normalizeProductSnapshot(value.snapshot);
  const createdAt = asString(value.createdAt);
  const updatedAt = asString(value.updatedAt, createdAt);

  if (!id || !productId || !snapshot || !createdAt || !updatedAt) {
    return null;
  }

  return {
    id,
    productId,
    source,
    quantity,
    snapshot,
    createdAt,
    updatedAt,
  };
};

export const normalizeCartState = (value: unknown): CartState => {
  return normalizePersistedCollection(value, normalizeCartItem);
};
