type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

type ReadStorageOptions<T> = {
  fallback: T;
  normalize?: (value: unknown) => T;
  storage?: StorageLike | null;
};

const resolveStorage = (storage?: StorageLike | null): StorageLike | null => {
  if (storage !== undefined) {
    return storage;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
};

export const safeJsonParse = <T>(rawValue: string, fallback: T): T => {
  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
};

export const readLocalStorageValue = <T>(
  key: string,
  { fallback, normalize, storage }: ReadStorageOptions<T>,
): T => {
  const storageRef = resolveStorage(storage);

  if (!storageRef) {
    return fallback;
  }

  const rawValue = storageRef.getItem(key);
  if (rawValue === null) {
    return fallback;
  }

  const parsedValue = safeJsonParse<unknown>(rawValue, fallback);
  return normalize ? normalize(parsedValue) : (parsedValue as T);
};

export const writeLocalStorageValue = <T>(
  key: string,
  value: T,
  storage?: StorageLike | null,
): boolean => {
  const storageRef = resolveStorage(storage);

  if (!storageRef) {
    return false;
  }

  try {
    storageRef.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const removeLocalStorageValue = (
  key: string,
  storage?: StorageLike | null,
): boolean => {
  const storageRef = resolveStorage(storage);

  if (!storageRef) {
    return false;
  }

  try {
    storageRef.removeItem(key);
    return true;
  } catch {
    return false;
  }
};
