import {
  type PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';
import type { CatalogItem } from '../../catalog/model/catalog-types';
import type { CustomFrame } from '../../constructor/model/constructor-types';
import { storageKeys } from '../../../shared/config/storage-keys';
import { usePersistentState } from '../../../shared/hooks/usePersistentState';
import {
  createEmptyCartState,
  normalizeCartState,
  type CartState,
} from './cart-types';
import { CartContext, type CartContextValue } from './cart-context';
import {
  clearCartState,
  createCartViewItems,
  createCatalogSnapshot,
  createCustomSnapshot,
  getCartItemsCount,
  hasProductInCart,
  insertSnapshot,
  removeCartItem,
  removeManyCartItems,
  setCartItemQuantity,
  toggleSnapshot,
} from '../storage/cart-storage';

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartState, setCartState] = usePersistentState<CartState>(
    storageKeys.cart,
    {
      initialValue: createEmptyCartState,
      normalize: normalizeCartState,
    },
  );

  const items = useMemo(() => {
    return createCartViewItems(cartState.items);
  }, [cartState.items]);

  const itemCount = useMemo(() => {
    return getCartItemsCount(cartState.items);
  }, [cartState.items]);

  const addCatalogItem = useCallback((item: CatalogItem) => {
    setCartState((currentState) =>
      insertSnapshot(currentState, createCatalogSnapshot(item)),
    );
  }, [setCartState]);

  const addCustomFrame = useCallback((frame: CustomFrame) => {
    setCartState((currentState) =>
      insertSnapshot(currentState, createCustomSnapshot(frame)),
    );
  }, [setCartState]);

  const toggleCatalogItem = useCallback((item: CatalogItem) => {
    setCartState((currentState) =>
      toggleSnapshot(currentState, createCatalogSnapshot(item)),
    );
  }, [setCartState]);

  const toggleCustomFrame = useCallback((frame: CustomFrame) => {
    setCartState((currentState) =>
      toggleSnapshot(currentState, createCustomSnapshot(frame)),
    );
  }, [setCartState]);

  const setQuantity = useCallback((itemId: string, quantity: number) => {
    setCartState((currentState) =>
      setCartItemQuantity(currentState, itemId, quantity),
    );
  }, [setCartState]);

  const increment = useCallback((itemId: string) => {
    setCartState((currentState) => {
      const target = currentState.items.find((item) => item.id === itemId);

      if (!target) {
        return currentState;
      }

      return setCartItemQuantity(currentState, itemId, target.quantity + 1);
    });
  }, [setCartState]);

  const decrement = useCallback((itemId: string) => {
    setCartState((currentState) => {
      const target = currentState.items.find((item) => item.id === itemId);

      if (!target) {
        return currentState;
      }

      return setCartItemQuantity(currentState, itemId, target.quantity - 1);
    });
  }, [setCartState]);

  const remove = useCallback((itemId: string) => {
    setCartState((currentState) => removeCartItem(currentState, itemId));
  }, [setCartState]);

  const removeMany = useCallback((itemIds: string[]) => {
    setCartState((currentState) => removeManyCartItems(currentState, itemIds));
  }, [setCartState]);

  const clear = useCallback(() => {
    setCartState(clearCartState());
  }, [setCartState]);

  const isProductInCart = useCallback((productId: string) => {
    return hasProductInCart(cartState.items, productId);
  }, [cartState.items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount,
    addCatalogItem,
    addCustomFrame,
    toggleCatalogItem,
    toggleCustomFrame,
    setQuantity,
    increment,
    decrement,
    remove,
    removeMany,
    clear,
    isProductInCart,
  }), [
    items,
    itemCount,
    addCatalogItem,
    addCustomFrame,
    toggleCatalogItem,
    toggleCustomFrame,
    setQuantity,
    increment,
    decrement,
    remove,
    removeMany,
    clear,
    isProductInCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
