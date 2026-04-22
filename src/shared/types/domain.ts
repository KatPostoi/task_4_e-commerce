export type EntityId = string;

export type FrameSource = 'default' | 'custom';

export type DimensionsCm = {
  widthCm: number;
  heightCm: number;
};

export type ImageAsset = {
  src: string;
  alt: string;
};

export type TimestampedRecord = {
  createdAt: string;
  updatedAt: string;
};

export type PersistedCollection<T> = {
  schemaVersion: number;
  items: T[];
  updatedAt: string;
};
