const storageNamespace = 'baguette-basket';

export const storageSchemaVersion = 1;

export const storageKeys = {
  cart: `${storageNamespace}:cart:v${storageSchemaVersion}`,
  customFrames: `${storageNamespace}:custom-frames:v${storageSchemaVersion}`,
  orders: `${storageNamespace}:orders:v${storageSchemaVersion}`,
} as const;
