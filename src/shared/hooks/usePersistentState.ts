import { useEffect, useState } from 'react';
import {
  readLocalStorageValue,
  writeLocalStorageValue,
} from '../lib/local-storage';

type UsePersistentStateOptions<T> = {
  initialValue: T | (() => T);
  normalize?: (value: unknown) => T;
};

const resolveInitialValue = <T,>(value: T | (() => T)): T => {
  return typeof value === 'function' ? (value as () => T)() : value;
};

export const usePersistentState = <T,>(
  key: string,
  { initialValue, normalize }: UsePersistentStateOptions<T>,
) => {
  const [value, setValue] = useState<T>(() => {
    const fallback = resolveInitialValue(initialValue);

    return readLocalStorageValue(key, {
      fallback,
      normalize,
    });
  });

  useEffect(() => {
    writeLocalStorageValue(key, value);
  }, [key, value]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) {
        return;
      }

      const fallback = resolveInitialValue(initialValue);
      const nextValue = readLocalStorageValue(key, {
        fallback,
        normalize,
      });

      setValue(nextValue);
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [initialValue, key, normalize]);

  return [value, setValue] as const;
};
