import { storageSchemaVersion } from '../config/storage-keys';
import { createTimestamp } from './ids';
import type {
  DimensionsCm,
  ImageAsset,
  PersistedCollection,
} from '../types/domain';

export const isObjectRecord = (
  value: unknown,
): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const isFiniteNumber = (value: unknown): value is number => {
  return typeof value === 'number' && Number.isFinite(value);
};

export const isPositiveInteger = (value: unknown): value is number => {
  return Number.isInteger(value) && Number(value) > 0;
};

export const asString = (value: unknown, fallback = ''): string => {
  return isNonEmptyString(value) ? value.trim() : fallback;
};

export const asNullableString = (value: unknown): string | null => {
  return isNonEmptyString(value) ? value.trim() : null;
};

export const asNumber = (value: unknown, fallback = 0): number => {
  return isFiniteNumber(value) ? value : fallback;
};

export const asPositiveInteger = (value: unknown, fallback = 1): number => {
  return isPositiveInteger(value) ? value : fallback;
};

export const normalizeDimensions = (value: unknown): DimensionsCm | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const widthCm = asNumber(value.widthCm, NaN);
  const heightCm = asNumber(value.heightCm, NaN);

  if (!Number.isFinite(widthCm) || !Number.isFinite(heightCm)) {
    return null;
  }

  if (widthCm <= 0 || heightCm <= 0) {
    return null;
  }

  return { widthCm, heightCm };
};

export const normalizeImageAsset = (value: unknown): ImageAsset | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const src = asString(value.src);
  const alt = asString(value.alt);

  if (!src || !alt) {
    return null;
  }

  return { src, alt };
};

export const createPersistedCollection = <T>(
  items: T[] = [],
): PersistedCollection<T> => {
  return {
    schemaVersion: storageSchemaVersion,
    items,
    updatedAt: createTimestamp(),
  };
};

export const normalizePersistedCollection = <T>(
  value: unknown,
  normalizeItem: (item: unknown) => T | null,
): PersistedCollection<T> => {
  if (!isObjectRecord(value)) {
    return createPersistedCollection();
  }

  const rawItems = Array.isArray(value.items) ? value.items : [];
  const items = rawItems
    .map((item) => normalizeItem(item))
    .filter((item): item is T => item !== null);

  return {
    schemaVersion: storageSchemaVersion,
    items,
    updatedAt: asString(value.updatedAt, createTimestamp()),
  };
};
