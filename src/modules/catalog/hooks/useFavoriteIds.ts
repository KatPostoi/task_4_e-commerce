import { storageKeys } from '../../../shared/config/storage-keys';
import { usePersistentState } from '../../../shared/hooks/usePersistentState';

const normalizeFavoriteIds = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => {
    return typeof item === 'string' && item.trim().length > 0;
  });
};

export const useFavoriteIds = () => {
  const [favoriteIds, setFavoriteIds] = usePersistentState<string[]>(
    storageKeys.favorites,
    {
      initialValue: [],
      normalize: normalizeFavoriteIds,
    },
  );

  const toggle = (productId: string) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    );
  };

  const isFavorite = (productId: string) => favoriteIds.includes(productId);

  return {
    favoriteIds,
    isFavorite,
    toggle,
  };
};
